import { apiClient } from "@dansr/web-utils";
import { useMutation } from "@tanstack/react-query";

export function useXSigninCallback() {
    return useMutation({
        mutationFn: apiClient.auth.xSigninCallback,
    });
}
