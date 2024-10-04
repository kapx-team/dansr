"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavButton({
    icon,
    text,
    link,
}: {
    icon: React.ReactNode;
    text: string;
    link: string;
}) {
    const pathname = usePathname();

    const isRouteActive =
        link === "/dashboard" ? pathname === link : pathname.includes(link);

    return (
        <Link
            href={link}
            className={`flex cursor-pointer items-center justify-center space-x-3 rounded-lg p-2 font-karla lg:justify-start ${
                isRouteActive ? "bg-primary-1" : ""
            }`}
        >
            <span className="text-2xl lg:text-xl">{icon}</span>
            <span className="hidden text-lg lg:block">{text}</span>
        </Link>
    );
}
