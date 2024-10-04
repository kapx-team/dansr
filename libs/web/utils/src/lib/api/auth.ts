import type {
    GetAuthenticatedUserApiResponse,
    GetWalletSignInMessageApiResponse,
    GetXSigninUrlApiResponse,
    UserSignOutApiResponse,
    WalletSignInRequestApiResponse,
    XSigninCallbackApiResponse,
} from "@dansr/common-types";
import type {
    GetWalletSignInMessageSchema,
    WalletSignInRequestSchema,
    XSigninCallbackSchema,
} from "@dansr/common-validators";
import type { KyInstance } from "ky";

export function getApiAuthService(apiInstance: KyInstance) {
    async function getAuthenticatedUser() {
        const response = await apiInstance
            .get("auth/user")
            .json<GetAuthenticatedUserApiResponse>();

        if (!response.success) {
            throw new Error("Failed to fetch authenticated user!");
        }

        return response.result;
    }

    async function getXSigninUrl(inviteCode?: string) {
        const response = await apiInstance
            .post("auth/x/signin", { json: { inviteCode } })
            .json<GetXSigninUrlApiResponse>();

        return response;
    }

    async function xSigninCallback(data: XSigninCallbackSchema) {
        const response = await apiInstance
            .post("auth/x/callback", { json: data })
            .json<XSigninCallbackApiResponse>();

        return response;
    }

    async function signOutUser() {
        const response = await apiInstance
            .post("auth/signout")
            .json<UserSignOutApiResponse>();

        return response;
    }

    async function getWalletSigninMessage(data: GetWalletSignInMessageSchema) {
        const response = await apiInstance
            .post("auth/wallet/signin-message", { json: data })
            .json<GetWalletSignInMessageApiResponse>();

        return response;
    }

    async function walletSigninRequest(data: WalletSignInRequestSchema) {
        const response = await apiInstance
            .post("auth/wallet/signin", { json: data })
            .json<WalletSignInRequestApiResponse>();

        return response;
    }

    return {
        getAuthenticatedUser,
        getXSigninUrl,
        xSigninCallback,
        signOutUser,
        getWalletSigninMessage,
        walletSigninRequest,
    };
}
