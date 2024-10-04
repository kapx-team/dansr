import type {
    AnswerBidApiResponse,
    GetBidDetailsApiResponse,
} from "@dansr/common-types";
import type { AnswerBidSchema } from "@dansr/common-validators";
import type { KyInstance } from "ky";

export function getApiBidsService(apiInstance: KyInstance) {
    async function answerBid(data: { bidId: string } & AnswerBidSchema) {
        const response = await apiInstance
            .post(`bids/${data.bidId}/answer`, { json: data })
            .json<AnswerBidApiResponse>();

        return response;
    }

    async function getBidDetails(bidId: string) {
        const response = await apiInstance
            .get(`bids/${bidId}`)
            .json<GetBidDetailsApiResponse>();

        if (!response.success) {
            throw new Error(response.message);
        }

        return response.result;
    }

    return {
        answerBid,
        getBidDetails,
    };
}
