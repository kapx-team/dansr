import { getAuthenticatedUser } from "@dansr/api-services";
import { createDbUserService } from "@dansr/api-services/db";
import redis, { REDIS_KEYS } from "@dansr/api-services/redis";
import { getXUserClient, xAppClient } from "@dansr/api-services/x";
import { ApiResponseHandler } from "@dansr/api-utils";
import type { GetXSigninUrlApiResponse } from "@dansr/common-types";
import { addMinutes, getSeconds } from "date-fns";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { user } = await getAuthenticatedUser();

        const dbUserService = createDbUserService();

        if (user) {
            apiResponseHandler.logger.user(user);

            const { xAccessToken, xAccessSecret } =
                await dbUserService.getUserXAuthCredentials(user.id);

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

        const { oauth_token, oauth_token_secret, url } =
            await xAppClient.generateAuthLink(
                process.env.VERCEL_URL ||
                    "https://fe79-122-161-65-89.ngrok-free.app/v1/auth/x/callback",
                {
                    authAccessType: "read",
                }
            );

        const twentySeconds = getSeconds(addMinutes(new Date(), 20));

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
