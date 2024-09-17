import { createCookieHandler, createJWT } from "@dansr/api-services";
import redis, { REDIS_KEYS } from "@dansr/api-services/redis";
import { getXUserClient } from "@dansr/api-services/x";
import {
    ApiResponseHandler,
    encryptToken,
    validateReqBody,
} from "@dansr/api-utils";
import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { db, generateDbId, usersTable } from "@dansr/common-db";
import type { XSigninCallbackApiResponse } from "@dansr/common-types";
import { xSigninCallbackSchema } from "@dansr/common-validators";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const bodyValidationResult = await validateReqBody({
            req,
            schema: xSigninCallbackSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const { oauthToken, oauthVerifier } = bodyValidationResult.body;

        const oauthTokenSecret = (await redis.get(
            REDIS_KEYS.X_OAUTH_TOKEN_SECRET(oauthToken || "")
        )) as string;

        const oauthTokenUserId = (await redis.get(
            REDIS_KEYS.X_OAUTH_TOKEN_USER_ID(oauthToken || "")
        )) as string;

        if (!oauthToken || !oauthVerifier || !oauthTokenSecret) {
            return apiResponseHandler.clientError(
                "You denied the app or your session expired!"
            );
        }

        console.log({
            oauthToken,
            oauthVerifier,
            oauthTokenSecret,
        });

        const xUserClient = getXUserClient(oauthToken, oauthTokenSecret);

        const result = await xUserClient.login(oauthVerifier);

        const encryptedAccessToken = encryptToken(result.accessToken);
        const encryptedAccessSecret = encryptToken(result.accessSecret);

        let userId;

        if (oauthTokenUserId) {
            await db
                .update(usersTable)
                .set({
                    xHandle: result.screenName,
                    xId: result.userId,
                    xAccessToken: encryptedAccessToken,
                    xAccessSecret: encryptedAccessSecret,
                    lastLoginAt: new Date(),
                })
                .where(eq(usersTable.id, oauthTokenUserId));

            userId = oauthTokenUserId;
        } else {
            const [existingXUser] = await db
                .select({ id: usersTable.id })
                .from(usersTable)
                .where(eq(usersTable.xId, result.userId));

            if (!existingXUser) {
                userId = generateDbId(DB_ID_PREFIXES.USER);

                await db.insert(usersTable).values({
                    id: userId,
                    xHandle: result.screenName,
                    xId: result.userId,
                    xAccessToken: encryptedAccessToken,
                    xAccessSecret: encryptedAccessSecret,
                    type: "creator",
                    lastLoginAt: new Date(),
                });
            } else {
                await db
                    .update(usersTable)
                    .set({
                        xHandle: result.screenName,
                        xAccessToken: encryptedAccessToken,
                        xAccessSecret: encryptedAccessSecret,
                        lastLoginAt: new Date(),
                    })
                    .where(eq(usersTable.xId, result.userId));

                userId = existingXUser.id;
            }
        }

        const accessToken = createJWT(userId);

        const cookieHandler = createCookieHandler();

        console.log("Setting auth cookie...");

        cookieHandler.setAuthCookie(accessToken);

        return apiResponseHandler.success<XSigninCallbackApiResponse>(
            {
                userId,
            },
            "Successfully logged in using X!"
        );
    } catch (error) {
        apiResponseHandler.logger.error("Error logging in to X", { error });
        return apiResponseHandler.serverError(
            "Error logging in to X, please try again."
        );
    }
}
