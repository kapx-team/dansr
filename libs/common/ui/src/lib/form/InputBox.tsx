"use client";

import { cn } from "@dansr/common-utils";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type InputBoxProps = React.ComponentProps<"textarea"> & {
    register: UseFormRegisterReturn;
};

export function InputBox({ className, register, ...props }: InputBoxProps) {
    return (
        <textarea
            className={cn(
                "bg-white p-2.5 text-black focus:outline-primary-1 rounded-md",
                className
            )}
            rows={4}
            style={{ resize: "none" }}
            {...register}
            {...props}
        />
    );
}
