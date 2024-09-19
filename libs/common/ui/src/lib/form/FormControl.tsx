"use client";

import { cn } from "@dansr/common-utils";
import React from "react";

type FormControlProps = React.ComponentProps<"fieldset"> & {
    error?: string;
};

export function FormControl({
    children,
    className,
    error,
    ...props
}: FormControlProps) {
    return (
        <fieldset className={cn("flex flex-col gap-2", className)} {...props}>
            {children}

            {error && <p className="text-red-500">{error}</p>}
        </fieldset>
    );
}
