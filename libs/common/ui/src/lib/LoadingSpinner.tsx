"use client";

import { Oval } from "react-loader-spinner";

type Props = {
    size?: number;
    color?: string;
};

export function LoadingSpinner({ size = 30, color = "#ffffff" }: Props) {
    return (
        <Oval
            height={size}
            width={size}
            color={color}
            secondaryColor={color}
            strokeWidth={4}
        />
    );
}
