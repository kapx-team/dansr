import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import {
    getCommonSchemaAttributes,
    getDbEmailColumn,
    getDbNameColumn,
} from "../utils/general";

export const contactFormSubmissionsTable = mysqlTable(
    "contact_form_submissions",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.CONTACT_FORM_SUBMISSION),
        name: getDbNameColumn().notNull(),
        email: getDbEmailColumn().notNull(),
        subject: varchar("subject", { length: 40 }).notNull(),
        message: varchar("message", { length: 500 }).notNull(),
    }
);
