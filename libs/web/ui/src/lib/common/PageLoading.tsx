"use client";

import { LoadingSpinner } from "@dansr/common-ui";
import { Logo } from "@dansr/common-ui/server";
import { useIsClient } from "usehooks-ts";

export function PageLoading() {
    const isClient = useIsClient();
    return (
        <div className="fixed z-50 inset-0 flex flex-col justify-center items-center gap-4">
            <div
                style={{
                    visibility: isClient ? "visible" : "hidden",
                }}
            >
                <LoadingSpinner />
            </div>
            <Logo />
        </div>
    );
}
