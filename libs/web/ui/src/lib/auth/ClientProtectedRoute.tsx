"use client";

import { useAuthenticatedUser } from "@dansr/web-hooks";

type ClientProtectedRouteProps = {
    showPageHeader?: boolean;
    pageName?: string;
    pageHeaderText?: string;
    pageHeaderSubText?: string;
    children: React.ReactElement;
};

export function ClientProtectedRoute({
    showPageHeader = true,
    pageName = "This",
    pageHeaderText = "",
    pageHeaderSubText = "",
    children,
}: ClientProtectedRouteProps) {
    const { isPending, data } = useAuthenticatedUser();

    if (isPending) {
        return <p>Checking Authentication...</p>;
    }

    if (data?.id) {
        return children;
    }

    return (
        <>
            {/* {showPageHeader && (
                <DashboardPageHeader
                    headerText={pageHeaderText}
                    headerSubText={pageHeaderSubText}
                />
            )}

            <SignInPage pageName={pageName} /> */}
        </>
    );
}
