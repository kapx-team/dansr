import { apiClient } from "@dansr/web-utils";
import { useMutation } from "@tanstack/react-query";

export function useGetXSigninUrl() {
    return useMutation({
        mutationFn: ({
            inviteCode,
            redirectUrl,
        }: {
            inviteCode?: string;
            redirectUrl?: string;
        }) => apiClient.auth.getXSigninUrl(inviteCode, redirectUrl),
    });
}
