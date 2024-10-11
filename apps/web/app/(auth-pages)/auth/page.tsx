import { Logo } from "@dansr/common-ui/server";
import { AuthRoute, PageLoading, WalletLogin, XLogin } from "@dansr/web-ui";
import Link from "next/link";
import { Suspense } from "react";

export default function AuthPage() {
    return (
        <Suspense fallback={<PageLoading />}>
            <AuthRoute>
                <div
                    style={{
                        backgroundImage: `url(/images/background.jpeg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="h-screen"
                >
                    <div className="flex flex-col justify-center items-center pt-8 gap-6">
                        <Logo />

                        <Link
                            href="https://docs.google.com/document/d/18Q-7mnFGQ-EqZMlyWpdzAvtOYcTqFwLRppYZjmV0NUU/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: `rgba(255, 255, 255, 0.2)`,
                            }}
                            className="text-white py-4 px-9 rounded-lg font-heading text-center flex items-center justify-center gap-2"
                        >
                            Testing Guide For Radar
                        </Link>
                    </div>

                    <div
                        className="flex flex-col items-center h-full
            space-y-2 md:-space-y-2 text-center pt-36"
                    >
                        <Suspense fallback={<PageLoading />}>
                            <div className="flex flex-col gap-4">
                                <XLogin />
                                <hr className="w-full my-6" />
                                <WalletLogin />
                            </div>
                        </Suspense>

                        <div className="pt-16 px-4 flex justify-center items-center"></div>
                    </div>
                </div>
            </AuthRoute>
        </Suspense>
    );
}
