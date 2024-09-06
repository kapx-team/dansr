import {
    findReference,
    validateTransfer,
    type ValidateTransferFields,
} from "@solana/pay";
import { Connection, PublicKey, type ParsedAccountData } from "@solana/web3.js";
import { logError } from "./log";

export function getSolanaConnection(url: string) {
    return new Connection(url, "confirmed");
}

export function shortenAddress(address: string) {
    if (address) {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    return "---";
}

export function isValidSolanaAddress(address: string) {
    try {
        const pubkey = new PublicKey(address);
        return PublicKey.isOnCurve(pubkey.toBuffer());
    } catch (error) {
        return false;
    }
}

export function shortenWalletAddress(address: string, chars = 4) {
    if (address) {
        return `${address.slice(0, chars)}...${address.slice(chars * -1)}`;
    }

    return null;
}

export async function confirmTransaction({
    txSignature,
    connection,
}: {
    txSignature: string;
    connection: Connection;
}) {
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txSignature,
    });
}

export async function getNumberDecimals(
    connection: Connection,
    mintAddress: string
): Promise<number> {
    const info = await connection.getParsedAccountInfo(
        new PublicKey(mintAddress)
    );
    const result = (info.value?.data as ParsedAccountData).parsed.info
        .decimals as number;
    return result;
}

export async function validatePaymentTransfer(
    connection: Connection,
    txSignature: string,
    validateTransferFields: ValidateTransferFields
) {
    try {
        await validateTransfer(connection, txSignature, validateTransferFields);

        return true;
    } catch (error) {
        return false;
    }
}

export async function getTxSignature(
    connection: Connection,
    reference: PublicKey
) {
    try {
        return await findReference(connection, reference, {
            finality: "confirmed",
        });
    } catch (error) {
        logError("getTxSignature =>", error);
        return null;
    }
}
