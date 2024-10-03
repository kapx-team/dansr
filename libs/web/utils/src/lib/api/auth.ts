import type {
    GetAuthenticatedUserApiResponse,
    GetXSigninUrlApiResponse,
    UserSignOutApiResponse,
    XSigninCallbackApiResponse,
} from "@dansr/common-types";
import type { XSigninCallbackSchema } from "@dansr/common-validators";
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

        if (!response.success) {
            throw new Error("Failed to fetch X signin URL!");
        }

        return response.result;
    }

    async function xSigninCallback(data: XSigninCallbackSchema) {
        const response = await apiInstance
            .post("auth/x/callback", { json: data })
            .json<XSigninCallbackApiResponse>();

        if (!response.success) {
            throw new Error("Failed to signin with X!");
        }

        return response.result;
    }

    async function signOutUser() {
        const response = await apiInstance
            .post("auth/signout")
            .json<UserSignOutApiResponse>();

        if (!response.success) {
            throw new Error("Failed to signout user!");
        }

        return response.result;
    }

    return {
        getAuthenticatedUser,
        getXSigninUrl,
        xSigninCallback,
        signOutUser,
    };
}
