import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { json, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import {
    getCommonSchemaAttributes,
    getDbEmailColumn,
    getDbNameColumn,
    getDbWalletColumn,
} from "../utils/general";

export const usersTable = mysqlTable(
    "users",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.USER),
        name: getDbNameColumn(),
        profileImage: varchar("profile_image", { length: 200 }),
        email: getDbEmailColumn(),
        wallet: getDbWalletColumn(),
        notificationPreference: json("notification_preference")
            .default({
                email: false,
            })
            .$type<{
                email: boolean;
            }>(),
    },
    (table) => {
        return {
            emailUniqueIdx: uniqueIndex("email_unique_idx").on(table.email),
            walletUniqueIdx: uniqueIndex("wallet_unique_idx").on(table.wallet),
        };
    }
);
