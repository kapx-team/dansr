import type { WalletSignInRequestSchema } from "@dansr/common-validators";
import { apiClient } from "@dansr/web-utils";
import { useMutation } from "@tanstack/react-query";

export function useWalletSigninRequest() {
    return useMutation({
        mutationFn: (data: WalletSignInRequestSchema) =>
            apiClient.auth.walletSigninRequest(data),
    });
}
