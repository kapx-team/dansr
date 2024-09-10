"use client";

import { useAuthenticatedUser } from "@dansr/web-hooks";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { XLogin } from "../auth/XLogin";

const linkClassName =
    "text-white hover:text-white text-2xl md:text-sm lg:text-base ";

export function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const { data } = useAuthenticatedUser();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav className="fixed top-0 z-50 w-full border-b-[0.5px] border-white border-opacity-30 bg-dark-1 lg:px-10">
            <UnifiedWalletButton />

            <XLogin />
        </nav>
    );
}
