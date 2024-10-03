import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { ToastNotification } from "@dansr/common-ui";
import { apiClient } from "@dansr/web-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const toast = new ToastNotification("signout");

export function useSignout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiClient.auth.signOutUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: REACT_QUERY_KEYS.AUTHENTICATED_USER,
            });

            toast.success("Signed out successfully");
            router.push("/");
        },
        onError: (error) => {
            toast.error("Something went wrong while signing out!");
        },
    });
}
