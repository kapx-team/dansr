"use client";

import { cn } from "@dansr/common-utils";
import { LoadingSpinner } from "./LoadingSpinner";

export type ButtonProps = React.ComponentProps<"button"> & {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isDisabled?: boolean;
    size?: "sm" | "md" | "lg";
};

export function Button({
    children,
    className,
    isLoading,
    leftIcon,
    rightIcon,
    isDisabled,
    size = "md",
    ...props
}: ButtonProps) {
    const sizeClasses = {
        sm: "py-2 px-4",
        md: "py-4 px-9",
        lg: "py-6 px-12",
    };

    return (
        <button
            className={cn(
                "bg-gradient-primary text-white rounded-lg font-heading text-center",
                className,
                isDisabled && "opacity-50 cursor-not-allowed",
                sizeClasses[size]
            )}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <span className="flex justify-center items-center space-x-2">
                    {leftIcon}

                    <span>{children}</span>

                    {rightIcon}
                </span>
            )}
        </button>
    );
}
