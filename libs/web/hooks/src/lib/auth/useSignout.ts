import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { ToastNotification } from "@dansr/common-ui";
import { apiClient } from "@dansr/web-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const toast = new ToastNotification("signout");

export function useSignout() {
    const queryClient = useQueryClient();

    async function signOutUser() {
        const response = await apiClient.auth.signOutUser();

        if (!response.success) {
            throw new Error("Failed to sign out");
        }

        return response;
    }

    return useMutation({
        mutationFn: signOutUser,
        onSuccess: async () => {
            await queryClient.resetQueries({
                queryKey: REACT_QUERY_KEYS.AUTHENTICATED_USER,
            });

            toast.success("Signed out successfully");
        },
        onError: (error) => {
            toast.error("Something went wrong while signing out!");
        },
    });
}
