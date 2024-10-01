import { decryptToken } from "@dansr/api-utils";
import { DB_ID_PREFIXES } from "@dansr/common-constants";
import {
    db,
    freeQuestionsTable,
    generateDbId,
    linkBidsTable,
    linksTable,
    usersTable,
    type InsertFreeQuestion,
    type InsertLinkBid,
    type InsertUser,
} from "@dansr/common-db";
import { and, eq, getTableColumns } from "drizzle-orm";

export function createDbUserService() {
    const table = usersTable;

    async function getUserByWalletAddress(walletAddress: string) {
        const [user] = await db
            .select()
            .from(table)
            .where(eq(table.wallet, walletAddress))
            .limit(1);

        return user;
    }

    async function createUserByWalletAddress(walletAddress: string) {
        const data = {
            id: generateDbId(DB_ID_PREFIXES.USER),
            type: "normal",
            wallet: walletAddress,
            lastLoginAt: new Date(),
        } satisfies InsertUser;

        await db.insert(table).values(data);

        return data;
    }

    async function getUserById(id: string, options?: { withXAuth?: boolean }) {
        const columns = getTableColumns(table);

        const [user] = await db
            .select({
                ...(options?.withXAuth
                    ? {
                          ...columns,
                          xAccessToken: table.xAccessToken,
                          xAccessSecret: table.xAccessSecret,
                      }
                    : columns),
            })
            .from(table)
            .where(eq(table.id, id))
            .limit(1);

        return user;
    }

    async function getUserXAuthCredentials(id: string) {
        const [user] = await db
            .select({
                xAccessToken: table.xAccessToken,
                xAccessSecret: table.xAccessSecret,
            })
            .from(table)
            .where(eq(table.id, id))
            .limit(1);

        return {
            xAccessToken: user?.xAccessToken
                ? decryptToken(user.xAccessToken)
                : null,
            xAccessSecret: user?.xAccessSecret
                ? decryptToken(user.xAccessSecret)
                : null,
        };
    }

    return {
        getUserByWalletAddress,
        createUserByWalletAddress,
        getUserById,
        getUserXAuthCredentials,
    };
}

export function createDbFreeQuestionsService() {
    const table = freeQuestionsTable;

    async function getFreeQuestions() {
        const questions = await db.select().from(table);

        return questions;
    }

    async function addFreeQuestion(data: InsertFreeQuestion) {
        await db.insert(table).values(data);

        return data;
    }

    return {
        getFreeQuestions,
        addFreeQuestion,
    };
}

export function createDbLinksService() {
    const table = linksTable;

    async function getLinkWithCreatorInfo(linkId: string) {
        const [link] = await db
            .select({
                ...getTableColumns(table),
                creator: getTableColumns(usersTable),
            })
            .from(table)
            .where(eq(table.id, linkId))
            .innerJoin(usersTable, eq(linksTable.creatorId, usersTable.id));

        return link ?? null;
    }

    async function createLinkBid(data: InsertLinkBid) {
        await db.insert(linkBidsTable).values(data);

        return data;
    }

    async function getLinkBids(linkId: string) {
        const bids = await db
            .select()
            .from(linkBidsTable)
            .where(eq(linkBidsTable.linkId, linkId));

        return bids;
    }

    async function getBidDetails(bidId: string) {
        const [bid] = await db
            .select()
            .from(linkBidsTable)
            .where(eq(linkBidsTable.id, bidId));

        return bid ?? null;
    }

    async function getLinkBidByUserId({
        userId,
        linkId,
    }: {
        userId: string;
        linkId: string;
    }) {
        const [bid] = await db
            .select()
            .from(linkBidsTable)
            .where(
                and(
                    eq(linkBidsTable.userId, userId),
                    eq(linkBidsTable.linkId, linkId)
                )
            );

        return bid ?? null;
    }

    return {
        getLinkWithCreatorInfo,
        createLinkBid,
        getLinkBids,
        getBidDetails,
        getLinkBidByUserId,
    };
}
