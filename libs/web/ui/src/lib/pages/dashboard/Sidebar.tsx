"use client";

import { Logo } from "@dansr/common-ui/server";
import Link from "next/link";
import { MdWindow } from "react-icons/md";
import { NavButton } from "./NavButton";

const sidebarRoutes = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: <MdWindow />,
    },
];

export function Sidebar() {
    return (
        <aside className="fixed flex h-full w-[70px] flex-col overflow-y-auto bg-dark-2 px-3 py-10 lg:w-[250px] lg:px-6">
            <div className="flex justify-center">
                <Link href="/">
                    <Logo />
                </Link>
            </div>

            <nav className="mt-10 flex-grow space-y-3">
                {sidebarRoutes?.map((route) => {
                    return (
                        <NavButton
                            key={route.name}
                            icon={route.icon}
                            text={route.name}
                            link={route.link}
                        />
                    );
                })}
            </nav>

            <div className="mt-8 hidden overflow-x-hidden space-y-6 lg:block">
                Sign Out
            </div>
        </aside>
    );
}
