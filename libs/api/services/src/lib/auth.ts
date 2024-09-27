import { apiEnv } from "@dansr/api-env";
import {
    extractDomainFromUrl,
    getAccessTokenCookieData,
} from "@dansr/api-utils";
import {
    AUTH_COOKIE_NAME,
    DB_ID_PREFIXES,
    VALID_AUTH_DOMAINS,
    type UserType,
} from "@dansr/common-constants";
import {
    db,
    generateDbId,
    userWalletSigninRequestsTable,
    type User,
} from "@dansr/common-db";
import { extractErrorMessage } from "@dansr/common-utils";
import { Header, Payload, SIWS } from "@web3auth/sign-in-with-solana";
import { randomUUID } from "crypto";
import { addDays, addMinutes, getUnixTime } from "date-fns";
import { eq } from "drizzle-orm";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createDbUserService } from "./db";
import redis, { REDIS_KEYS } from "./redis";

type GetAuthenticatedUserResponse = {
    user: User | null;
    error: string | null;
    token: string | null;
};

export async function getAuthenticatedUser(
    allowedRoles?: UserType[]
): Promise<GetAuthenticatedUserResponse> {
    try {
        const cookie = cookies().get(AUTH_COOKIE_NAME);

        console.log("cookie", cookie);

        if (!cookie) {
            throw new Error("No cookie found");
        }

        const token = cookie.value;

        console.log("token", token);

        const decoded = await verifyJWT(token);

        console.log("decoded", decoded);

        const dbUserService = createDbUserService();

        const user = await dbUserService.getUserById(decoded.userId);

        console.log("user", user);

        if (!user) {
            throw new Error("User not found!");
        }

        if (allowedRoles && !allowedRoles.includes(user.type)) {
            throw new Error("User does not have the required role!");
        }

        return { user, error: null, token };
    } catch (error) {
        return {
            user: null,
            error: extractErrorMessage(error),
            token: null,
        };
    }
}

export async function isValidAuthDomain(domain: string) {
    if (apiEnv.VERCEL_ENV === "development") {
        return VALID_AUTH_DOMAINS.push("localhost");
    }

    return VALID_AUTH_DOMAINS.includes(domain);
}

export function createWalletAuthService(origin: URL) {
    async function getSignInMessage({
        walletAddress,
        statement,
    }: {
        walletAddress: string;
        statement: string;
    }) {
        const date = new Date();

        const header = new Header();
        header.t = "sip99";

        const requestId = generateDbId(
            DB_ID_PREFIXES.USER_WALLET_SIGNIN_REQUEST
        );

        const payload = new Payload();
        payload.domain = extractDomainFromUrl(origin);
        payload.address = walletAddress;
        payload.uri = origin.toString();
        payload.statement = statement;
        payload.version = "1";
        payload.chainId = 1;
        payload.issuedAt = date.toISOString();
        payload.expirationTime = addMinutes(date, 10).toISOString();
        payload.requestId = requestId;
        payload.nonce = requestId.split("_")[1];

        console.log("payload", payload);

        const message = new SIWS({
            header,
            payload,
        });

        await db.insert(userWalletSigninRequestsTable).values({
            id: requestId,
            header,
            payload,
        });

        return { message, requestId };
    }

    async function verifySignInRequest({
        requestId,
        signature,
    }: {
        requestId: string;
        signature: string;
    }): Promise<
        | { isVerified: true; error: null; payload: Payload }
        | { isVerified: false; error: string; payload: null }
    > {
        try {
            const [request] = await db
                .select()
                .from(userWalletSigninRequestsTable)
                .where(eq(userWalletSigninRequestsTable.id, requestId));

            if (!request) {
                throw new Error("Request not found!");
            }

            if (request.isVerified) {
                throw new Error("Request already verified!");
            }

            const message = new SIWS({
                header: request.header,
                payload: request.payload,
            });

            const isValid = await message.verify({
                payload: request.payload,
                signature: {
                    t: request.header.t,
                    s: signature,
                },
            });

            if (!isValid) {
                throw new Error("Invalid signature!");
            }

            await db
                .update(userWalletSigninRequestsTable)
                .set({ isVerified: true })
                .where(eq(userWalletSigninRequestsTable.id, requestId));

            return { isVerified: true, error: null, payload: request.payload };
        } catch (error) {
            return {
                isVerified: false,
                error: extractErrorMessage(error),
                payload: null,
            };
        }
    }

    return {
        getSignInMessage,
        verifySignInRequest,
    };
}

export function createCookieHandler() {
    function setAuthCookie(accessToken: string) {
        cookies().set(getAccessTokenCookieData(accessToken));
    }

    function deleteAuthCookie() {
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        cookies().delete(AUTH_COOKIE_NAME);
    }

    return {
        setAuthCookie,
        deleteAuthCookie,
    };
}

type JWTPayload = {
    userId: string;
    iat: number;
    exp: number;
    jti: string;
};

export function createJWT(userId: string): string {
    const secret = apiEnv.JWT_SECRET;

    const date = new Date();

    const now = getUnixTime(date);
    const expiresIn = getUnixTime(addDays(date, 7));

    const payload = {
        userId,
        iat: now,
        exp: expiresIn,
        jti: randomUUID(),
    } satisfies JWTPayload;

    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
    });

    return token;
}

export async function verifyJWT(token: string) {
    const isBlacklisted = await isBlacklistedAuthToken(token);

    console.log("isBlacklisted", isBlacklisted);

    if (isBlacklisted) {
        throw new Error("Invalid token!");
    }

    const secret = apiEnv.JWT_SECRET;

    console.log("secret", secret);

    console.log("decode token without verifying", jwt.decode(token));

    const decoded = jwt.verify(token, secret) as JWTPayload;

    console.log("decoded", decoded);

    return decoded;
}

export async function blacklistJWT(token: string) {
    if (await isBlacklistedAuthToken(token)) {
        throw new Error("Token already blacklisted!");
    }

    const secret = apiEnv.JWT_SECRET;

    const decoded = jwt.verify(token, secret) as JWTPayload;

    await blacklistAuthToken({ token, expiresIn: decoded.exp });
}

export async function isBlacklistedAuthToken(token: string) {
    const blackListedToken = await redis.get(
        REDIS_KEYS.BLACKLISTED_AUTH_TOKENS(token)
    );

    if (blackListedToken) {
        return true;
    }

    return false;
}

export async function blacklistAuthToken({
    token,
    expiresIn,
}: {
    token: string;
    expiresIn: number;
}) {
    await redis.set(REDIS_KEYS.BLACKLISTED_AUTH_TOKENS(token), true, {
        ex: expiresIn,
    });
}
