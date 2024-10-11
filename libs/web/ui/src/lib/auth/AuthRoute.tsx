"use client";

import { useAuthenticatedUser } from "@dansr/web-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PageLoading } from "../common/PageLoading";

type AuthRouteProps = React.ComponentProps<"div">;

export function AuthRoute({ children }: AuthRouteProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data, isLoading } = useAuthenticatedUser();

    const isAuthenticated = data?.id;

    const redirect = searchParams.get("r");

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.replace(redirect ?? "/dashboard");
        }
    }, [isAuthenticated, redirect, isLoading]); // eslint-disable-line

    if (!isAuthenticated) {
        return children;
    }

    return <PageLoading />;
}
