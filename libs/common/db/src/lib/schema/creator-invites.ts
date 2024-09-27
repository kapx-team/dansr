import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { boolean, index, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { getCommonSchemaAttributes, getDbIdLength } from "../utils/general";

export const creatorInvitesTable = mysqlTable(
    "creator_invites",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.CREATOR_INVITE),
        creatorId: varchar("creator_id", {
            length: getDbIdLength(DB_ID_PREFIXES.CREATOR),
        }),
        isUsed: boolean("is_used").default(false),
        invitedCreatorId: varchar("invited_creator_id", {
            length: getDbIdLength(DB_ID_PREFIXES.CREATOR),
        }),
    },
    (table) => {
        return {
            creatorIdIdx: index("creator_id_idx").on(table.creatorId),
        };
    }
);
