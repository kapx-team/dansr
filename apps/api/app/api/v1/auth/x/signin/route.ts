import { apiEnv } from "@dansr/api-env";
import { getAuthenticatedUser } from "@dansr/api-services";
import { createDbUserService } from "@dansr/api-services/db";
import redis, { REDIS_KEYS } from "@dansr/api-services/redis";
import { getXUserClient, xAppClient } from "@dansr/api-services/x";
import { ApiResponseHandler, validateReqBody } from "@dansr/api-utils";
import { creatorInvitesTable, db } from "@dansr/common-db";
import type { GetXSigninUrlApiResponse } from "@dansr/common-types";
import { xSigninSchema } from "@dansr/common-validators";
import { addMinutes, getUnixTime } from "date-fns";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { user } = await getAuthenticatedUser();

        console.log("user =>", user);

        const dbUserService = createDbUserService();

        if (user) {
            console.log("user =>", user);
            apiResponseHandler.logger.user(user);

            const { xAccessToken, xAccessSecret } =
                await dbUserService.getUserXAuthCredentials(user.id);

            console.log("xAccessToken =>", xAccessToken);
            console.log("xAccessSecret =>", xAccessSecret);

            if (xAccessToken && xAccessSecret) {
                const xUserClient = getXUserClient(xAccessToken, xAccessSecret);

                try {
                    const xUser = await xUserClient.currentUser();

                    console.log("xUser =>", xUser);

                    if (xUser) {
                        return apiResponseHandler.success<GetXSigninUrlApiResponse>(
                            { isXAuthorized: true },
                            "User is already authorized with X!"
                        );
                    }
                } catch (error) {
                    apiResponseHandler.logger.error(
                        "user needs to reauthorize x",
                        { error }
                    );
                }
            }
        }

        const bodyValidationResult = await validateReqBody({
            req,
            schema: xSigninSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const { inviteCode } = bodyValidationResult.body;

        const callbackUrl = `${apiEnv.FRONTEND_URL}/auth`;

        console.log("callbackUrl =>", callbackUrl);

        const { oauth_token, oauth_token_secret, url } =
            await xAppClient.generateAuthLink(callbackUrl, {
                authAccessType: "read",
            });

        const twentySeconds = getUnixTime(addMinutes(new Date(), 20));

        if (inviteCode) {
            const [invite] = await db
                .select()
                .from(creatorInvitesTable)
                .where(eq(creatorInvitesTable.id, inviteCode));

            if (!invite) {
                return apiResponseHandler.clientError("Invalid invite code!");
            }

            if (invite.isUsed) {
                return apiResponseHandler.clientError(
                    "Invite code already used!"
                );
            }

            await redis.set(
                REDIS_KEYS.X_OAUTH_TOKEN_INVITE_CODE(oauth_token),
                inviteCode,
                {
                    ex: twentySeconds,
                }
            );
        }

        await redis.set(
            REDIS_KEYS.X_OAUTH_TOKEN_SECRET(oauth_token),
            oauth_token_secret,
            {
                ex: twentySeconds,
            }
        );

        if (user) {
            await redis.set(
                REDIS_KEYS.X_OAUTH_TOKEN_USER_ID(oauth_token),
                user.id,
                {
                    ex: twentySeconds,
                }
            );
        }

        return apiResponseHandler.success<GetXSigninUrlApiResponse>(
            { url, isXAuthorized: false },
            "X signin url generated successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
