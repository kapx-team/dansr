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

        return response;
    }

    async function getXSigninUrl() {
        const response = await apiInstance
            .post("auth/x/signin")
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

    return {
        getAuthenticatedUser,
        getXSigninUrl,
        xSigninCallback,
        signOutUser,
    };
}
