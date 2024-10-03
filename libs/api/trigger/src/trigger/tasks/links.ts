import { BID_STATUSES, TRIGGER_TASKS } from "@dansr/common-constants";
import { db, linkBidsTable, linksTable, usersTable } from "@dansr/common-db";
import { task } from "@trigger.dev/sdk/v3";
import {
    and,
    desc,
    eq,
    getTableColumns,
    inArray,
    notInArray,
} from "drizzle-orm";

export const selectWinningBidsForExpiredLink = task({
    id: TRIGGER_TASKS.SELECT_WINNING_BIDS_FOR_EXPIRED_LINK,
    run: async (payload: { linkId: string }) => {
        const { linkId } = payload;

        const [link] = await db
            .select({
                ...getTableColumns(linksTable),
                creator: getTableColumns(usersTable),
            })
            .from(linksTable)
            .innerJoin(usersTable, eq(linksTable.creatorId, usersTable.id))
            .where(eq(linksTable.id, linkId));

        if (!link) {
            throw new Error("Link not found!");
        }

        if (link.expiresAt > new Date()) {
            throw new Error("Link is not expired!");
        }

        const winningBids = await db
            .select({ id: linkBidsTable.id, amount: linkBidsTable.amount })
            .from(linkBidsTable)
            .where(eq(linkBidsTable.linkId, linkId))
            .orderBy(desc(linkBidsTable.amount))
            .limit(link.numberOfBids);

        await db.transaction(async (trx) => {
            // Set all bids to not selected except the winning ones
            await trx
                .update(linkBidsTable)
                .set({
                    status: BID_STATUSES.NOT_SELECTED,
                })
                .where(
                    and(
                        notInArray(
                            linkBidsTable.id,
                            winningBids.map((bid) => bid.id)
                        ),
                        eq(linkBidsTable.linkId, linkId)
                    )
                );

            // Set the winning bids to selected
            await trx
                .update(linkBidsTable)
                .set({
                    status: BID_STATUSES.SELECTED,
                })
                .where(
                    inArray(
                        linkBidsTable.id,
                        winningBids.map((bid) => bid.id)
                    )
                );

            // Set the link to have winning bids selected
            await trx
                .update(linksTable)
                .set({
                    winningBidsSelected: true,
                })
                .where(eq(linksTable.id, linkId));
        });
    },
});
