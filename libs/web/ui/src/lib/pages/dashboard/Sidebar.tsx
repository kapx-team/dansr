"use client";

import { Button } from "@dansr/common-ui";
import { Logo } from "@dansr/common-ui/server";
import { useSignout } from "@dansr/web-hooks";
import Link from "next/link";
import { MdLink, MdWindow } from "react-icons/md";
import { NavButton } from "./NavButton";

const sidebarRoutes = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: <MdWindow />,
    },
    {
        name: "Links",
        link: "/dashboard/links",
        icon: <MdLink />,
    },
];

export function Sidebar() {
    const signoutMutation = useSignout();

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

            <Button
                className="mt-8 hidden overflow-x-hidden space-y-6 lg:block"
                onClick={() => signoutMutation.mutate()}
                isLoading={signoutMutation.isPending}
            >
                Sign Out
            </Button>
        </aside>
    );
}
