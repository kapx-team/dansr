"use client";

import { Logo } from "@dansr/common-ui/server";

export function PageLoading() {
    return (
        <div className="fixed z-50 inset-0 flex justify-center items-center">
            <Logo />
        </div>
    );
}
