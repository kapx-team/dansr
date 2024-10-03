import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useQuery } from "@tanstack/react-query";

export function useCreatorLinks(creatorId: string) {
    return useQuery({
        queryKey: REACT_QUERY_KEYS.CREATOR_LINKS(creatorId),
        queryFn: () => apiClient.creators.getCreatorLinks(creatorId),
        enabled: !!creatorId,
    });
}
