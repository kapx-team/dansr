"use client";

import { Logo } from "@dansr/common-ui/server";
import { useAuthenticatedUser } from "@dansr/web-hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type ProtectedRouteProps = React.ComponentProps<"div">;

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data } = useAuthenticatedUser();

    const isAuthPage = pathname === "/auth";
    const isAuthenticated = data?.id;

    const redirect = searchParams.get("r");

    useEffect(() => {
        if (isAuthPage) {
            if (isAuthenticated) {
                router.replace(redirect ?? "/dashboard");
            }
        } else {
            if (!isAuthenticated) {
                router.replace(`/auth?r=${pathname}`);
            }
        }
    }, [isAuthenticated, isAuthPage, router, redirect, pathname]);

    if (isAuthenticated || isAuthPage) {
        return children;
    }

    return (
        <div className="fixed z-50 inset-0 flex justify-center items-center">
            <Logo />
        </div>
    );
}
