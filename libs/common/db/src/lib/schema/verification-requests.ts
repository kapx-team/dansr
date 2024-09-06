import {
    CREATOR_VERIFICATION_STATUSES,
    DB_ID_PREFIXES,
} from "@dansr/common-constants";
import { index, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";
import {
    getCommonSchemaAttributes,
    getDbIdColumn,
    getMysqlEnumFromConstants,
} from "../utils/general";

export const verificationRequestsTable = mysqlTable(
    "verification_requests",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.VERIFICATION_REQUEST),
        creatorId: getDbIdColumn("creator_id", DB_ID_PREFIXES.CREATOR),
        status: getMysqlEnumFromConstants({
            constants: CREATOR_VERIFICATION_STATUSES,
            columnName: "status",
        })
            .notNull()
            .default(CREATOR_VERIFICATION_STATUSES.PENDING),
        rejectionReason: text("rejection_reason"),
        reviewerId: getDbIdColumn("reviewer_id", DB_ID_PREFIXES.USER),
        reviewedAt: timestamp("reviewed_at"),
    },
    (table) => {
        return {
            creatorIdIdx: index("creator_id_idx").on(table.creatorId),
        };
    }
);
