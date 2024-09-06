import {
    createCookieHandler,
    createJWT,
    createWalletAuthService,
    getAuthenticatedUser,
    isValidAuthDomain,
} from "@dansr/api-services";
import { createDbUserService } from "@dansr/api-services/db";
import {
    ApiResponseHandler,
    extractDomainFromUrl,
    extractOriginUrlFromReq,
    validateReqBody,
} from "@dansr/api-utils";
import type { WalletSignInRequestApiResponse } from "@dansr/common-types";
import { walletSignInRequestSchema } from "@dansr/common-validators";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const origin = extractOriginUrlFromReq(req);

        if (!origin || !isValidAuthDomain(extractDomainFromUrl(origin))) {
            return apiResponseHandler.clientError("Invalid domain!");
        }

        const { user } = await getAuthenticatedUser();

        if (user) {
            apiResponseHandler.logger.user(user);
            return apiResponseHandler.clientError("User already signed in!");
        }

        const bodyValidationResult = await validateReqBody({
            req,
            schema: walletSignInRequestSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const { requestId, signature } = bodyValidationResult.body;

        const walletAuthService = createWalletAuthService(origin);

        const { error, isVerified, payload } =
            await walletAuthService.verifySignInRequest({
                requestId,
                signature,
            });

        if (!isVerified) {
            return apiResponseHandler.clientError(error);
        }

        const dbUserService = createDbUserService();

        const result: WalletSignInRequestApiResponse["result"] = Object.create(
            {}
        );

        const existingUser = await dbUserService.getUserByWalletAddress(
            payload.address
        );

        if (!existingUser) {
            const newUser = await dbUserService.createUserByWalletAddress(
                payload.address
            );

            if (!newUser) {
                throw new Error("Failed to create user!");
            }

            result.id = newUser.id;
        } else {
            result.id = existingUser.id;
        }

        const accessToken = createJWT(result.id);

        const cookieHandler = createCookieHandler();

        cookieHandler.setAuthCookie(accessToken);

        return apiResponseHandler.success<WalletSignInRequestApiResponse>(
            result,
            "User signed in successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
