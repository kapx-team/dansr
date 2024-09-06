import {
    createWalletAuthService,
    getAuthenticatedUser,
    isValidAuthDomain,
} from "@dansr/api-services";
import {
    ApiResponseHandler,
    extractDomainFromUrl,
    extractOriginUrlFromReq,
    validateReqBody,
} from "@dansr/api-utils";
import type { GetWalletSignInMessageApiResponse } from "@dansr/common-types";
import { getWalletSignInMessageSchema } from "@dansr/common-validators";
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
            schema: getWalletSignInMessageSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const { walletAddress } = bodyValidationResult.body;

        const walletAuthService = createWalletAuthService(origin);

        const statement = `Sign this message to sign in to dansr!\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`;

        const { message, requestId } = await walletAuthService.getSignInMessage(
            {
                walletAddress,
                statement,
            }
        );

        return apiResponseHandler.success<GetWalletSignInMessageApiResponse>(
            {
                message: message.prepareMessage(),
                requestId,
            },
            "Wallet sign in message fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
