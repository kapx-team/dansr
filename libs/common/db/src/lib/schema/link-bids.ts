import {
    BID_ANSWER_STATUSES,
    BID_PAYMENT_STATUSES,
    BID_STATUSES,
    DB_ID_PREFIXES,
} from "@dansr/common-constants";
import {
    float,
    mysqlTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";
import {
    getCommonSchemaAttributes,
    getDbIdLength,
    getMysqlEnumFromConstants,
} from "../utils/general";

export const linkBidsTable = mysqlTable("link_bids", {
    ...getCommonSchemaAttributes(DB_ID_PREFIXES.LINK_BID),
    linkId: varchar("link_id", {
        length: getDbIdLength(DB_ID_PREFIXES.LINK),
    }),
    userId: varchar("user_id", {
        length: getDbIdLength(DB_ID_PREFIXES.USER),
    }),
    amount: float("amount").notNull(),
    bidTxSignature: varchar("bid_tx_signature", {
        length: 70,
    }),
    bidderXUsername: varchar("bidder_x_username", {
        length: 20,
    }).notNull(),
    message: text("message").notNull(),
    status: getMysqlEnumFromConstants({
        constants: BID_STATUSES,
        columnName: "status",
    })
        .notNull()
        .default(BID_STATUSES.PENDING),
    refundStatus: getMysqlEnumFromConstants({
        constants: BID_PAYMENT_STATUSES,
        columnName: "refund_status",
    })
        .notNull()
        .default(BID_PAYMENT_STATUSES.PENDING),
    answerStatus: getMysqlEnumFromConstants({
        constants: BID_ANSWER_STATUSES,
        columnName: "answer_status",
    })
        .notNull()
        .default(BID_ANSWER_STATUSES.PENDING),
    answer: text("answer"),
    answeredOn: timestamp("answered_on"),
    reference: varchar("reference", {
        length: 44,
    }).notNull(),
    refundedOn: timestamp("refunded_on"),
    refundTxSignature: varchar("refund_tx_signature", {
        length: 70,
    }),
    creatorPaymentStatus: getMysqlEnumFromConstants({
        constants: BID_PAYMENT_STATUSES,
        columnName: "creator_payment_status",
    })
        .notNull()
        .default(BID_PAYMENT_STATUSES.PENDING),
    creatorPaymentTxSignature: varchar("creator_payment_tx_signature", {
        length: 70,
    }),
    creatorPaidOn: timestamp("creator_paid_on"),
    creatorPaymentAmount: float("creator_payment_amount"),
});
