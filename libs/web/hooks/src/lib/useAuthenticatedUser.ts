import type { SelectUser } from "@dansr/common-db";
import type { ApiResponseType } from "@dansr/common-types";
import { apiInstance } from "@dansr/web-utils";
import { useQuery } from "@tanstack/react-query";
import { usePostHog, type PostHog } from "posthog-js/react";

const queryFn = async (posthog: PostHog) => {
    const response = await apiInstance
        .get(`/auth/user`)
        .json<ApiResponseType<SelectUser>>();

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
        queryKey: ["authenticated-user"],
        queryFn: () => queryFn(posthog),
        retry: false,
        refetchOnWindowFocus: false,
    });
}
