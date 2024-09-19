"use client";

import { cn } from "@dansr/common-utils";
import { LoadingSpinner } from "./LoadingSpinner";

export type ButtonProps = React.ComponentProps<"button"> & {
    isLoading?: boolean;
};

export function Button({
    children,
    className,
    isLoading,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "bg-gradient-primary text-white py-4 px-9 rounded-lg font-heading text-center",
                className
            )}
            {...props}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    );
}
