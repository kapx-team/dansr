import type { GetCreatorLinksApiResponse } from "@dansr/common-types";
import type { KyInstance } from "ky";

export function getApiCreatorsService(apiInstance: KyInstance) {
    async function getCreatorLinks(creatorId: string) {
        const response = await apiInstance
            .get(`creators/${creatorId}/links`)
            .json<GetCreatorLinksApiResponse>();

        if (!response.success) {
            throw new Error(response.message);
        }

        return response.result;
    }

    return {
        getCreatorLinks,
    };
}
