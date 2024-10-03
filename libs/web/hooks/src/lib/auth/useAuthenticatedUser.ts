import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useQuery } from "@tanstack/react-query";
import { usePostHog, type PostHog } from "posthog-js/react";

const queryFn = async (posthog: PostHog) => {
    const user = await apiClient.auth.getAuthenticatedUser();

    posthog?.identify(
        user.id,
        {
            name: user.name,
            email: user.email,
        },
        {
            firstLoginAt: new Date().toUTCString(),
        }
    );

    return user;
};

export function useAuthenticatedUser() {
    const posthog = usePostHog();

    return useQuery({
        queryKey: REACT_QUERY_KEYS.AUTHENTICATED_USER,
        queryFn: () => queryFn(posthog),
        retry: false,
        refetchOnWindowFocus: false,
    });
}
