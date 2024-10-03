import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useQuery } from "@tanstack/react-query";

export function useLinkBids(linkId: string) {
    return useQuery({
        queryKey: REACT_QUERY_KEYS.LINK_BIDS(linkId),
        queryFn: () => apiClient.links.getLinkBids(linkId),
        enabled: !!linkId,
    });
}
