import type { AnswerBidApiResponse } from "@dansr/common-types";
import type { AnswerBidSchema } from "@dansr/common-validators";
import type { KyInstance } from "ky";

export function getApiBidsService(apiInstance: KyInstance) {
    async function answerBid(data: { bidId: string } & AnswerBidSchema) {
        const response = await apiInstance
            .post(`bids/${data.bidId}/answer`, { json: data })
            .json<AnswerBidApiResponse>();

        return response;
    }

    return {
        answerBid,
    };
}
