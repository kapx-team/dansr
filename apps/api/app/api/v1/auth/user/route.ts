import { ApiResponseHandler } from "@dansr/api-utils";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        // const { user } = await getAuthenticatedUser(req);

        const { user } = { user: null };

        if (!user) {
            return apiResponseHandler.authError();
        }

        apiResponseHandler.logger.user(user);

        return apiResponseHandler.success(
            user,
            "User details fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
