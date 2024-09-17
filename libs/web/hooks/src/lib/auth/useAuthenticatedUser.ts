import { REACT_QUERY_KEYS } from "@dansr/common-constants";
import { apiClient } from "@dansr/web-utils";
import { useQuery } from "@tanstack/react-query";
import { usePostHog, type PostHog } from "posthog-js/react";

const queryFn = async (posthog: PostHog) => {
    const response = await apiClient.auth.getAuthenticatedUser();

    if (!response.success) {
        return null;
    }

    posthog?.identify(
        response.result.id,
        {
            name: response.result.name,
            email: response.result.email,
        },
        {
            firstLoginAt: new Date().toUTCString(),
        }
    );

    return response.result;
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
