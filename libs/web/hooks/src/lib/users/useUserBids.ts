import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useQuery } from "@tanstack/react-query";

export function useUserBids(userId: string) {
    return useQuery({
        queryKey: REACT_QUERY_KEYS.USER_BIDS(userId),
        queryFn: () => apiClient.users.getUserBids(userId),
        enabled: !!userId,
    });
}
