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
    style?: "solid" | "outline";
};

const buttonTv = tv({
    base: "text-center min-w-[170px] font-bold font-body text-white px-4 py-2",
    variants: {
        style: {
            solid: "rounded-full",
            outline: "",
        },
        color: {
            primary: "bg-primary-2 hover:bg-primary-2/80",
            secondary: "bg-primary-1 hover:bg-primary-1/80",
        },
        size: {
            sm: "text-sm",
            md: "text-sm",
            lg: "text-base",
        },
        disabled: {
            true: "opacity-50 cursor-not-allowed",
        },
    },
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
    style = "solid",
    link,
    ...props
}: ButtonProps) {
    const buttonClassName = buttonTv({
        color,
        size,
        disabled: isDisabled,
        style,
    });

    if (link) {
        return (
            <Link href={link} className={buttonClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={buttonClassName} disabled={isDisabled} {...props}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {leftIcon}

                    <span>{children}</span>

                    {rightIcon}
                </>
            )}
        </button>
    );
}
