import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { useMemo } from "react";
import { WalletNotification } from "../wallet/WalletNotification";

type WalletContextProviderProps = React.ComponentProps<"div">;

export function WalletContextProvider({
    children,
}: WalletContextProviderProps) {
    const wallets = useMemo(
        () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
        []
    );

    return (
        <UnifiedWalletProvider
            wallets={wallets}
            config={{
                autoConnect: true,
                env: "mainnet-beta",
                metadata: {
                    name: "UnifiedWallet",
                    description: "UnifiedWallet",
                    url: "https://jup.ag",
                    iconUrls: ["https://jup.ag/favicon.ico"],
                },
                notificationCallback: WalletNotification,
                walletlistExplanation: {
                    href: "https://station.jup.ag/docs/additional-topics/wallet-list",
                },
                theme: "dark",
                provider: "solana-wallet-adapter",
            }}
        >
            {children}
        </UnifiedWalletProvider>
    );
}
