import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { index, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { getCommonSchemaAttributes } from "../utils/general";

export const freeQuestionsTable = mysqlTable(
    "free_questions",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.FREE_QUESTION),
        question: text("question").notNull(),
        creatorHandle: varchar("creator_handle", { length: 20 }),
        userHandle: varchar("user_handle", { length: 20 }),
    },
    (table) => {
        return {
            creatorHandleIdx: index("creator_handle_idx").on(
                table.creatorHandle
            ),
            userHandleIdx: index("user_handle_idx").on(table.userHandle),
        };
    }
);
