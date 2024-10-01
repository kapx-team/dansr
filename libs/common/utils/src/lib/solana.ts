import { findReference, type ValidateTransferFields } from "@solana/pay";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
    Connection,
    LAMPORTS_PER_SOL,
    ParsedInstruction,
    PublicKey,
    type ParsedAccountData,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
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
        const parsedTransaction =
            await connection.getParsedTransaction(txSignature);

        if (!parsedTransaction) {
            throw new Error("Parsed transaction not found!");
        }

        console.log("parsedTransaction", parsedTransaction);

        const { amount, recipient, splToken } = validateTransferFields;

        let transferInstruction: ParsedInstruction | undefined;

        if (splToken) {
            // SPL Token transfer
            transferInstruction =
                parsedTransaction.transaction.message.instructions.find(
                    (instruction) =>
                        "parsed" in instruction &&
                        instruction.program === "spl-token" &&
                        instruction.parsed.type === "transfer"
                ) as ParsedInstruction;
        } else {
            // SOL transfer
            transferInstruction =
                parsedTransaction.transaction.message.instructions.find(
                    (instruction) =>
                        "parsed" in instruction &&
                        instruction.program === "system" &&
                        instruction.parsed.type === "transfer"
                ) as ParsedInstruction;
        }

        console.log("transferInstruction", transferInstruction);

        if (!transferInstruction || !("parsed" in transferInstruction)) {
            throw new Error("Transfer instruction not found in transaction");
        }

        let decimals = LAMPORTS_PER_SOL;

        if (splToken) {
            decimals = await getNumberDecimals(connection, splToken.toBase58());
        }

        console.log("decimals", decimals);

        const transferAmount = new BigNumber(
            transferInstruction.parsed.info.amount
        ).dividedBy(10 ** decimals);

        if (!transferAmount.isEqualTo(amount)) {
            throw new Error(
                `Transfer amount mismatch. Expected: ${amount}, Actual: ${transferAmount}`
            );
        }

        // Verify the recipient address
        const recipientAddress = transferInstruction.parsed.info.destination;

        if (splToken) {
            const dansrTokenAccount = getAssociatedTokenAddressSync(
                splToken,
                recipient
            );

            if (recipientAddress !== dansrTokenAccount.toBase58()) {
                throw new Error(
                    `Recipient address mismatch. Expected: ${recipient.toBase58()}, Actual: ${recipientAddress}`
                );
            }
        } else {
            if (recipientAddress !== recipient.toBase58()) {
                throw new Error(
                    `Recipient address mismatch. Expected: ${recipient.toBase58()}, Actual: ${recipientAddress}`
                );
            }
        }

        return true;
    } catch (error) {
        logError("validatePaymentTransfer =>", {
            error,
        });
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
