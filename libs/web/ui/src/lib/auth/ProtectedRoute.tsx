"use client";

import { useAuthenticatedUser } from "@dansr/web-hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PageLoading } from "../common/PageLoading";

type ProtectedRouteProps = React.ComponentProps<"div">;

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data, isLoading, isError } = useAuthenticatedUser();

    const isAuthenticated = data?.id && !isError;

    const redirect = searchParams.get("r");

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.replace(`/auth?r=${pathname}`);
        }
    }, [isAuthenticated, redirect, pathname, isLoading]); // eslint-disable-line

    if (isAuthenticated) {
        return children;
    }

    return <PageLoading />;
}
