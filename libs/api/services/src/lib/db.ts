import { DB_ID_PREFIXES } from "@dansr/common-constants";
import {
    db,
    generateDbId,
    usersTable,
    type InsertUser,
} from "@dansr/common-db";
import { eq } from "drizzle-orm";

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

    async function getUserById(id: string) {
        const [user] = await db
            .select()
            .from(table)
            .where(eq(table.id, id))
            .limit(1);

        return user;
    }

    return {
        getUserByWalletAddress,
        createUserByWalletAddress,
        getUserById,
    };
}
