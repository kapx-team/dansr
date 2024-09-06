import {
    blacklistJWT,
    createCookieHandler,
    getAuthenticatedUser,
} from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import type { UserSignOutApiResponse } from "@dansr/common-types";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { user, token } = await getAuthenticatedUser();

        if (!user) {
            return apiResponseHandler.authError("User not signed in!");
        }

        apiResponseHandler.logger.user(user);

        const cookieHandler = createCookieHandler();

        if (token) {
            await blacklistJWT(token);
        }

        cookieHandler.deleteAuthCookie();

        return apiResponseHandler.success<UserSignOutApiResponse>(
            { id: user.id },
            "User signed out successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
