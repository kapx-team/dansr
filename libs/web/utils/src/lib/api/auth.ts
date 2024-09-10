import type { GetXSigninUrlApiResponse } from "@dansr/common-types";
import type { KyInstance } from "ky";

export function getApiAuthService(apiInstance: KyInstance) {
    async function getXSigninUrl() {
        const response = await apiInstance
            .post("auth/x/signin")
            .json<GetXSigninUrlApiResponse>();

        return response;
    }

    return {
        getXSigninUrl,
    };
}
