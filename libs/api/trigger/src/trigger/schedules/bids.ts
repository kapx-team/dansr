import {
    BID_PAYMENT_STATUSES,
    BID_STATUSES,
    TRIGGER_SCHEDULES,
} from "@dansr/common-constants";
import { db, linkBidsTable, linksTable } from "@dansr/common-db";
import { logger, schedules } from "@trigger.dev/sdk/v3";
import { and, eq, getTableColumns } from "drizzle-orm";
import { refundUnselectedBid } from "../tasks/bids";

export const checkUnselectedBidsToRefund = schedules.task({
    id: TRIGGER_SCHEDULES.CHECK_UNSELECTED_BIDS_FOR_REFUND,
    cron: "0 * * * *",
    queue: {
        concurrencyLimit: 1,
    },
    run: async () => {
        const pendingUnselectedBidsToRefund = await db
            .select({
                ...getTableColumns(linkBidsTable),
                link: getTableColumns(linksTable),
            })
            .from(linkBidsTable)
            .where(
                and(
                    eq(linkBidsTable.status, BID_STATUSES.NOT_SELECTED),
                    eq(linkBidsTable.refundStatus, BID_PAYMENT_STATUSES.PENDING)
                )
            )
            .innerJoin(linksTable, eq(linkBidsTable.linkId, linksTable.id));

        if (pendingUnselectedBidsToRefund.length === 0) {
            logger.log("no-pending-bids-found", {
                pendingUnselectedBidsToRefund,
            });
        } else {
            logger.log("pending-bids-found", { pendingUnselectedBidsToRefund });

            for (const bid of pendingUnselectedBidsToRefund) {
                await refundUnselectedBid.trigger({
                    bidId: bid.id,
                });
            }
        }
    },
});
