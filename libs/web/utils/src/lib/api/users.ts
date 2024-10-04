import type { GetUserBidsApiResponse } from "@dansr/common-types";
import type { KyInstance } from "ky";

export function getApiUsersService(apiInstance: KyInstance) {
    async function getUserBids(userId: string) {
        const response = await apiInstance
            .get(`users/${userId}/bids`)
            .json<GetUserBidsApiResponse>();

        if (!response.success) {
            throw new Error(response.message);
        }

        return response.result;
    }

    return {
        getUserBids,
    };
}
