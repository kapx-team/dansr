"use client";

import { cn } from "@dansr/common-utils";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type InputProps = React.ComponentProps<"input"> & {
    register: UseFormRegisterReturn;
};

export function Input({ className, register, ...props }: InputProps) {
    return (
        <input
            className={cn(
                "bg-white p-2.5 text-black focus:outline-primary-1 rounded-md",
                className
            )}
            {...register}
            {...props}
        />
    );
}
