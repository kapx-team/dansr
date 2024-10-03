import type {
    GetLinkBidsApiResponse,
    GetLinkDetailsApiResponse,
    GetLinksApiResponse,
} from "@dansr/common-types";
import type { KyInstance } from "ky";

export function getApiLinksService(apiInstance: KyInstance) {
    async function getLinks() {
        const response = await apiInstance
            .get(`links`)
            .json<GetLinksApiResponse>();

        if (!response.success) {
            throw new Error("Failed to fetch links!");
        }

        return response.result;
    }

    async function getLinkDetails(linkId: string) {
        const response = await apiInstance
            .get(`links/${linkId}`)
            .json<GetLinkDetailsApiResponse>();

        if (!response.success) {
            throw new Error("Failed to fetch link details!");
        }

        return response.result;
    }

    async function getLinkBids(linkId: string) {
        const response = await apiInstance
            .get(`links/${linkId}/bids`)
            .json<GetLinkBidsApiResponse>();

        if (!response.success) {
            throw new Error("Failed to fetch link bids!");
        }

        return response.result;
    }

    return {
        getLinks,
        getLinkDetails,
        getLinkBids,
    };
}
