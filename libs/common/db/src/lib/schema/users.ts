import { DB_ID_PREFIXES, USER_TYPES } from "@dansr/common-constants";
import {
    json,
    mysqlTable,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/mysql-core";
import {
    getCommonSchemaAttributes,
    getDbEmailColumn,
    getDbNameColumn,
    getDbWalletColumn,
    getMysqlEnumFromConstants,
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
        username: varchar("username", { length: 40 }),
        twitterHandle: varchar("twitter_handle", { length: 20 }),
        type: getMysqlEnumFromConstants({
            constants: USER_TYPES,
            columnName: "type",
        }),
        lastLoginAt: timestamp("last_login_at"),
    },
    (table) => {
        return {
            emailUniqueIdx: uniqueIndex("email_unique_idx").on(table.email),
            usernameUniqueIdx: uniqueIndex("username_unique_idx").on(
                table.username
            ),
            walletUniqueIdx: uniqueIndex("wallet_unique_idx").on(table.wallet),
            twitterHandleUniqueIdx: uniqueIndex("twitter_handle_unique_idx").on(
                table.twitterHandle
            ),
        };
    }
);
