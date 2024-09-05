import type { DbIdPrefix } from "@dansr/common-constants";
import { generateId } from "@dansr/common-utils";
import { timestamp, varchar } from "drizzle-orm/mysql-core";

export const generateDbId = (prefix: DbIdPrefix) => {
    return `${prefix}_${generateId()}`;
};

export const getDbIdLength = (prefix: DbIdPrefix) => {
    return prefix.length + 26;
};

export const getCommonSchemaAttributes = (prefix: DbIdPrefix) => {
    return {
        id: varchar("id", { length: getDbIdLength(prefix) }).primaryKey(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").onUpdateNow(),
    };
};

export const getDbIdColumn = (name: string, prefix: DbIdPrefix) => {
    return varchar(name, { length: getDbIdLength(prefix) });
};

export const getDbWalletColumn = () => {
    return varchar("wallet", { length: 44 });
};

export const getDbNameColumn = () => {
    return varchar("name", { length: 50 });
};

export const getDbEmailColumn = () => {
    return varchar("email", { length: 40 });
};
