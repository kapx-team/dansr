import { apiEnv } from "@dansr/api-env";
import { getDansrBidsWalletAndKeypair } from "@dansr/api-utils";
import { BID_STATUSES, TRIGGER_SCHEDULES } from "@dansr/common-constants";
import { db, linkBidsTable, linksTable } from "@dansr/common-db";
import {
    getSolanaConnection,
    getTxSignature,
    validatePaymentTransfer,
} from "@dansr/common-utils";
import { PublicKey } from "@solana/web3.js";
import { logger, schedules } from "@trigger.dev/sdk/v3";
import BigNumber from "bignumber.js";
import { eq, getTableColumns } from "drizzle-orm";

export const checkPendingBidsForCreation = schedules.task({
    id: TRIGGER_SCHEDULES.CHECK_PENDING_BIDS_FOR_CREATION,
    cron: "*/5 * * * *",
    run: async (payload) => {
        const pendingBids = await db
            .select({
                ...getTableColumns(linkBidsTable),
                link: getTableColumns(linksTable),
            })
            .from(linkBidsTable)
            .where(eq(linkBidsTable.status, BID_STATUSES.PENDING))
            .innerJoin(linksTable, eq(linkBidsTable.linkId, linksTable.id));

        if (pendingBids.length === 0) {
            logger.log("no-pending-bids-found", { pendingBids });
        } else {
            logger.log("pending-bids-found", { pendingBids });

            const { wallet: dansrBidsWallet } = getDansrBidsWalletAndKeypair();

            for (const bid of pendingBids) {
                const connection = getSolanaConnection(apiEnv.SOLANA_RPC_URL);
                const txSig = await getTxSignature(
                    connection,
                    new PublicKey(bid.reference)
                );

                const isSolTokenMint =
                    bid.link.tokenMint ===
                    "So11111111111111111111111111111111111111112";

                if (txSig?.signature) {
                    const isValidTransfer = await validatePaymentTransfer(
                        connection,
                        txSig.signature,
                        {
                            recipient: dansrBidsWallet,
                            amount: new BigNumber(bid.amount),
                            reference: new PublicKey(bid.reference),
                            splToken: !isSolTokenMint
                                ? new PublicKey(bid.link.tokenMint)
                                : undefined,
                        }
                    );

                    logger.log("transaction", { txSig, isValidTransfer });
                }
            }
        }
    },
});
