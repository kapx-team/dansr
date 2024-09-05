"use client";

import { logError, shortenWalletAddress } from "@dansr/common-utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";

export function WalletConnectButton({
    className,
    children,
    isDisabled,
}: {
    children?: React.ReactNode | React.ReactElement;
    className?: string;
    isDisabled?: boolean;
}) {
    const [isConnectingWallet, setIsConnectingWallet] = useState(false);
    const wallet = useWallet();
    const walletModal = useWalletModal();
    const isClient = useIsClient();

    useEffect(() => {
        if (wallet?.wallet?.adapter) {
            (async () => {
                setIsConnectingWallet(true);
                try {
                    await wallet?.connect();
                } catch (error) {
                    logError("Failed to connect wallet =>", error);
                }
                setIsConnectingWallet(false);
            })();
        }
    }, [wallet]);

    if (!isClient) {
        return null;
    }

    if (wallet?.connected && wallet?.publicKey) {
        return (
            <div className="flex flex-col space-y-4 text-center">
                <div>
                    <p>Connected Wallet</p>
                    <p className="text-gradient-1 font-heading font-medium">
                        {shortenWalletAddress(wallet?.publicKey?.toString())}
                    </p>
                </div>
                {children}
                {/* <Button
                    variant="outline"
                    onClick={() => wallet.disconnect()}
                    className={cn("w-full px-4", className)}
                    isDisabled={isDisabled}
                >
                    {wallet?.wallet?.adapter?.icon && (
                        <Image
                            src={wallet?.wallet?.adapter?.icon}
                            alt="wallet-icon"
                            width={20}
                            height={20}
                        />
                    )}

                    <span>Disconnect Wallet</span>
                </Button> */}
            </div>
        );
    }

    return null;
    // <Button
    //     type="button"
    //     className={cn("w-full px-4", className)}
    //     onClick={() => walletModal.setVisible(true)}
    //     isDisabled={isConnectingWallet || isDisabled}
    // >
    //     {wallet?.wallet?.adapter?.icon && (
    //         <Image
    //             src={wallet?.wallet?.adapter?.icon}
    //             alt="wallet-icon"
    //             width={30}
    //             height={30}
    //         />
    //     )}

    //     <span>
    //         {isConnectingWallet ? "Connecting..." : "Connect Wallet"}
    //     </span>
    // </Button>
}
