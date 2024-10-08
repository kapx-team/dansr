import { Logo } from "@dansr/common-ui/server";
import { Sidebar } from "@dansr/web-ui";
import { DashboardPageContainer } from "@dansr/web-ui/server";
import type { Metadata } from "next";

export const metadata = {
    title: "Dashboard | Dansr",
    description: "",
} satisfies Metadata;

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="hidden h-full overflow-x-hidden lg:block">
                <Sidebar />

                <DashboardPageContainer>{children}</DashboardPageContainer>
            </div>

            <div className="mx-auto flex h-screen max-w-[500px] flex-col items-center justify-center space-y-4 p-8 lg:hidden">
                <Logo />
                <h1 className="text-center font-body text-3xl">
                    Please use tablet or desktop device to use the app!
                </h1>
            </div>
        </>
    );
}
