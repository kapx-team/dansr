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
        profileImageUrl: varchar("profile_image_url", { length: 200 }),
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
        xHandle: varchar("x_handle", { length: 20 }),
        xId: varchar("x_id", { length: 20 }),
        xAccessToken: varchar("x_access_token", { length: 200 }),
        xAccessSecret: varchar("x_access_secret", { length: 200 }),
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
            xHandleUniqueIdx: uniqueIndex("x_handle_unique_idx").on(
                table.xHandle
            ),
        };
    }
);
