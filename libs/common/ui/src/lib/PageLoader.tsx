"use client";

import { cn } from "@dansr/common-utils";
import { LoadingSpinner } from "./LoadingSpinner";

export function PageLoader({
    pageName,
    className,
}: {
    pageName?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 py-10 text-xl text-primary-1",
                className
            )}
        >
            <LoadingSpinner />

            {pageName && <p>Loading {pageName}</p>}
        </div>
    );
}
