import type { DbIdPrefix } from "@dansr/common-constants";
import { generateId } from "@dansr/common-utils";
import { mysqlEnum, timestamp, varchar } from "drizzle-orm/mysql-core";

export function generateDbId(prefix: DbIdPrefix) {
    return `${prefix}_${generateId()}`;
}

export function getDbIdLength(prefix: DbIdPrefix) {
    return prefix.length + 27;
}

export function getCommonSchemaAttributes(prefix: DbIdPrefix) {
    return {
        id: getDbIdColumn("id", prefix).primaryKey(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").onUpdateNow(),
    };
}

export function getDbIdColumn(name: string, prefix: DbIdPrefix) {
    return varchar(name, { length: getDbIdLength(prefix) });
}

export function getDbWalletColumn() {
    return varchar("wallet", { length: 44 });
}

export function getDbNameColumn() {
    return varchar("name", { length: 50 });
}

export function getDbEmailColumn() {
    return varchar("email", { length: 40 });
}

export function getMysqlEnumFromConstants<
    ConstantsType extends Record<string, string>,
>({ constants, columnName }: { constants: ConstantsType; columnName: string }) {
    return mysqlEnum(
        columnName,
        Object.values(constants) as unknown as [string, ...string[]]
    )
        .notNull()
        .$type<ConstantsType[keyof ConstantsType]>();
}
