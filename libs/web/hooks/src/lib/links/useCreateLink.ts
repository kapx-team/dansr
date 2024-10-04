import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLink() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiClient.links.createLink,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: REACT_QUERY_KEYS.CREATOR_LINKS(
                    data?.result?.creatorId ?? ""
                ),
            });
        },
    });
}
