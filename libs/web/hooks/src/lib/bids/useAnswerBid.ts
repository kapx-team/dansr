import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import type { AnswerBidSchema } from "@dansr/common-validators";
import { apiClient } from "@dansr/web-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAnswerBid() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { bidId: string } & AnswerBidSchema) =>
            apiClient.bids.answerBid(data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: REACT_QUERY_KEYS.LINK_BIDS(data.result?.linkId),
            });
        },
    });
}
