"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { PosthogProvider } from "./PosthogProvider";
import { WalletContextProvider } from "./WalletContextProvider";
const PostHogPageView = dynamic(() => import("./PosthogPageview"), {
    ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PosthogProvider>
            <QueryClientProvider client={queryClient}>
                <PostHogPageView />
                <WalletContextProvider>{children}</WalletContextProvider>
            </QueryClientProvider>
        </PosthogProvider>
    );
}
