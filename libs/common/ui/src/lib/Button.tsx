"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { LoadingSpinner } from "./LoadingSpinner";

export type ButtonProps = React.ComponentProps<"button"> & {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isDisabled?: boolean;
    size?: "sm" | "md" | "lg";
    link?: string;
    color?: "primary" | "secondary";
    variant?: "solid" | "outline";
    openLinkInNewTab?: boolean;
};

const buttonTv = tv({
    base: "text-center min-w-[170px] font-bold font-body text-white px-4 py-2 rounded-full",
    variants: {
        variant: {
            solid: "",
            outline: "",
        },
        color: {
            primary: "hover:bg-primary-2/80",
            secondary: "hover:bg-primary-1/80",
        },
        size: {
            sm: "text-sm",
            md: "text-sm",
            lg: "text-base p-4",
        },
        disabled: {
            true: "opacity-50 cursor-not-allowed",
        },
    },
    compoundVariants: [
        {
            variant: "solid",
            color: "primary",
            class: "bg-primary-2 hover:bg-primary-2/80",
        },
        {
            variant: "outline",
            color: "primary",
            class: "border border-primary-2 hover:bg-primary-2/80 text-primary-2 hover:text-white",
        },
    ],
    defaultVariants: {
        size: "md",
        color: "primary",
        style: "solid",
    },
});

export function Button({
    children,
    className,
    isLoading,
    leftIcon,
    rightIcon,
    isDisabled,
    color = "primary",
    size = "md",
    variant = "solid",
    link,
    openLinkInNewTab,
    ...props
}: ButtonProps) {
    const buttonClassName = buttonTv({
        color,
        size,
        disabled: isDisabled,
        variant,
        className,
    });

    if (link) {
        return (
            <Link
                href={link}
                className={buttonClassName}
                target={openLinkInNewTab ? "_blank" : undefined}
                rel={openLinkInNewTab ? "noopener noreferrer" : undefined}
            >
                {children}
            </Link>
        );
    }

    const loadingSpinnerSize = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    return (
        <button className={buttonClassName} disabled={isDisabled} {...props}>
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <LoadingSpinner size={loadingSpinnerSize[size]} />
                </span>
            ) : (
                <>
                    {leftIcon}

                    {children}

                    {rightIcon}
                </>
            )}
        </button>
    );
}
