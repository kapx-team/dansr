import { apiEnv } from "@dansr/api-env";
import { getToken } from "@dansr/api-functions";
import { getDansrBidsWalletAndKeypair } from "@dansr/api-utils";
import { BID_PAYMENT_STATUSES, TRIGGER_TASKS } from "@dansr/common-constants";
import { db, linkBidsTable, linksTable } from "@dansr/common-db";
import { getSolanaConnection } from "@dansr/common-utils";
import {
    createTransferInstruction,
    getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
    ComputeBudgetProgram,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import { task } from "@trigger.dev/sdk/v3";
import BigNumber from "bignumber.js";
import { and, eq, getTableColumns } from "drizzle-orm";

export const payCreatorForAnsweringBid = task({
    id: TRIGGER_TASKS.PAY_CREATOR_FOR_ANSWERING_BID,
    run: async (payload: { bidId: string }) => {
        const { bidId } = payload;

        const [bid] = await db
            .select({
                ...getTableColumns(linkBidsTable),
                link: getTableColumns(linksTable),
            })
            .from(linkBidsTable)
            .innerJoin(linksTable, eq(linkBidsTable.linkId, linksTable.id))
            .where(
                and(
                    eq(linkBidsTable.id, bidId),
                    eq(
                        linkBidsTable.creatorPaymentStatus,
                        BID_PAYMENT_STATUSES.PENDING
                    )
                )
            );

        if (!bid) {
            throw new Error("Pending bid not found!");
        }

        const token = await getToken(bid.link.tokenMint);

        if (!token) {
            throw new Error("Token not found!");
        }

        const DANSR_COMMISSION_IN_PERCENTAGE = 15;
        const creatorSharePercentage = 100 - DANSR_COMMISSION_IN_PERCENTAGE;
        const creatorAmount = BigNumber(bid.amount)
            .times(creatorSharePercentage)
            .div(100);
        const creatorWallet = new PublicKey(bid.link.walletAddress);

        const isSolTokenMint =
            token.address === "So11111111111111111111111111111111111111112";

        const { wallet: dansrWallet, keypair: dansrKeypair } =
            getDansrBidsWalletAndKeypair();

        const connection = getSolanaConnection(apiEnv.SOLANA_RPC_URL);

        const tx = new Transaction();

        if (!isSolTokenMint) {
            const tokenMintPubkey = new PublicKey(bid.link.tokenMint);
            const dansrTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                dansrKeypair,
                tokenMintPubkey,
                dansrWallet
            );
            const creatorTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                dansrKeypair,
                tokenMintPubkey,
                creatorWallet
            );

            const tokenTransferInstruction = createTransferInstruction(
                dansrTokenAccount.address,
                creatorTokenAccount.address,
                dansrWallet,
                BigInt(creatorAmount.times(10 ** token.decimals).toNumber())
            );

            tx.add(tokenTransferInstruction);
        } else {
            const solTransferInstruction = SystemProgram.transfer({
                fromPubkey: dansrWallet,
                toPubkey: creatorWallet,
                lamports: creatorAmount.times(LAMPORTS_PER_SOL).toNumber(),
            });

            tx.add(solTransferInstruction);
        }

        const priorityFee = await connection.getRecentPrioritizationFees();
        const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: priorityFee[0].prioritizationFee,
        });
        tx.add(addPriorityFee);

        const txSig = await sendAndConfirmTransaction(
            connection,
            tx,
            [dansrKeypair],
            {
                commitment: "confirmed",
            }
        );

        console.log("Transaction sent:", txSig);

        if (!txSig) {
            throw new Error("Transaction failed!");
        }

        await db.transaction(async (trx) => {
            await trx
                .update(linkBidsTable)
                .set({
                    creatorPaidOn: new Date(),
                    creatorPaymentStatus: BID_PAYMENT_STATUSES.PAID,
                    creatorPaymentTxSignature: txSig,
                    creatorPaymentAmount: creatorAmount.toNumber(),
                })
                .where(eq(linkBidsTable.id, bidId));
        });
    },
});
