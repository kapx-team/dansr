import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import type { GetWalletSignInMessageSchema } from "@dansr/common-validators";
import { apiClient } from "@dansr/web-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWalletSigninMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: GetWalletSignInMessageSchema) =>
            apiClient.auth.getWalletSigninMessage(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: REACT_QUERY_KEYS.AUTHENTICATED_USER,
            });
        },
    });
}
