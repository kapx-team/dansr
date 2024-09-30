import { DB_ID_PREFIXES } from "@dansr/common-constants";
import {
    float,
    mediumint,
    mysqlTable,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";
import {
    getCommonSchemaAttributes,
    getDbIdLength,
    getDbNameColumn,
} from "../utils/general";

export const linksTable = mysqlTable("links", {
    ...getCommonSchemaAttributes(DB_ID_PREFIXES.LINK),
    creatorId: varchar("creator_id", {
        length: getDbIdLength(DB_ID_PREFIXES.CREATOR),
    }),
    name: getDbNameColumn(),
    expiresAt: timestamp("expires_at").notNull(),
    tokenMint: varchar("token_mint", { length: 44 }).notNull(),
    baseAmount: float("base_amount").notNull(),
    walletAddress: varchar("wallet_address", { length: 44 }).notNull(),
    numberOfBids: mediumint("number_of_bids").notNull(),
});
