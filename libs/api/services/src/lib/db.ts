import { decryptToken } from "@dansr/api-utils";
import { DB_ID_PREFIXES } from "@dansr/common-constants";
import {
    db,
    generateDbId,
    usersTable,
    type InsertUser,
} from "@dansr/common-db";
import { eq, getTableColumns } from "drizzle-orm";

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
