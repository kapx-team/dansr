"use client";

import { Button, ToastNotification } from "@dansr/common-ui";
import { extractErrorMessage, logError } from "@dansr/common-utils";
import {
    useAuthenticatedUser,
    useWalletSigninMessage,
    useWalletSigninRequest,
} from "@dansr/web-hooks";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import bs58 from "bs58";
import { useState } from "react";

const toast = new ToastNotification("handle-wallet-signin-message");

export function WalletLogin() {
    const { data, isLoading, refetch } = useAuthenticatedUser();

    const wallet = useWallet();

    const walletSigninMessageMutation = useWalletSigninMessage();
    const walletSigninRequestMutation = useWalletSigninRequest();

    const [isSigningIn, setIsSigningIn] = useState(false);

    async function handleWalletSignin() {
        setIsSigningIn(true);
        try {
            if (!wallet.publicKey) {
                toast.error("Please connect your wallet!");
                return;
            }

            toast.loading("Signing in with wallet...");

            const messageResponse =
                await walletSigninMessageMutation.mutateAsync({
                    walletAddress: wallet.publicKey?.toBase58(),
                });

            if (!messageResponse.success) {
                throw new Error(messageResponse.message);
            }

            const message = messageResponse.result.message;

            const messageUint8 = new TextEncoder().encode(message);

            if (!wallet.signMessage) {
                throw new Error("Wallet don't support signing message!");
            }

            toast.loading("Please sign the message...");

            const signature = await wallet.signMessage(messageUint8);

            if (!signature) {
                throw new Error("Failed to sign the message");
            }

            const signatureBase58 = bs58.encode(signature);

            const signinResponse =
                await walletSigninRequestMutation.mutateAsync({
                    requestId: messageResponse.result.requestId,
                    signature: signatureBase58,
                });

            if (!signinResponse.success) {
                throw new Error(signinResponse.message);
            }

            toast.success("Signed in successfully!");
            refetch();
        } catch (error) {
            logError("handleSigninMessage =>", error);
            toast.error(extractErrorMessage(error, "Failed to sign in!"));
        }
        setIsSigningIn(false);
    }

    if (isLoading) {
        return null;
    }

    if (data) {
        return null;
    }

    if (!wallet.connected) {
        return (
            <UnifiedWalletButton
                buttonClassName="bg-transparent"
                overrideContent={
                    <Button className="w-full">Connect Wallet</Button>
                }
            />
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p>{wallet.publicKey?.toBase58()}</p>
            <Button onClick={handleWalletSignin} isLoading={isSigningIn}>
                Sign In with Wallet
            </Button>
            <Button
                size="sm"
                onClick={() => wallet.disconnect()}
                isLoading={wallet.disconnecting}
            >
                Disconnect
            </Button>
        </div>
    );
}
