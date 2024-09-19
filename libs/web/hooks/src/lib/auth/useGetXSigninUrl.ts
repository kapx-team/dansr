import { apiClient } from "@dansr/web-utils";
import { useMutation } from "@tanstack/react-query";

export function useGetXSigninUrl() {
    return useMutation({
        mutationFn: apiClient.auth.getXSigninUrl,
    });
}
