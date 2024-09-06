import { DB_ID_PREFIXES } from "@dansr/common-constants";
import {
    boolean,
    decimal,
    mysqlTable,
    uniqueIndex,
} from "drizzle-orm/mysql-core";
import { getCommonSchemaAttributes, getDbIdColumn } from "../utils/general";

export const creatorsTable = mysqlTable(
    "creators",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.CREATOR),
        userId: getDbIdColumn("user_id", DB_ID_PREFIXES.USER),
        earnings: decimal("earnings", {
            precision: 18,
            scale: 2,
        }).default("0.00"),
        isVerified: boolean("is_verified").default(false),
    },
    (table) => {
        return {
            userIdUniqueIdx: uniqueIndex("user_id_unique_idx").on(table.userId),
        };
    }
);
