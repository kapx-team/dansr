import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useXSigninCallback() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiClient.auth.xSigninCallback,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: REACT_QUERY_KEYS.AUTHENTICATED_USER,
            });
        },
    });
}
