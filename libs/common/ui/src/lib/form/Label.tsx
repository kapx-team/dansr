"use client";

import { cn } from "@dansr/common-utils";
import React from "react";

type LabelProps = React.ComponentProps<"label">;

export function Label({ className, ...props }: LabelProps) {
    return <label className={cn("font-body", className)} {...props} />;
}
