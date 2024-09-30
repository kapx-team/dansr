export const BID_STATUSES = {
    PENDING: "pending",
    CREATED: "created",
    SELECTED: "selected",
    NOT_SELECTED: "not_selected",
} as const;

export type BidStatus = (typeof BID_STATUSES)[keyof typeof BID_STATUSES];

export const BID_PAYMENT_STATUSES = {
    PENDING: "pending",
    PAID: "paid",
    FAILED: "failed",
} as const;

export type BidPaymentStatus =
    (typeof BID_PAYMENT_STATUSES)[keyof typeof BID_PAYMENT_STATUSES];

export const BID_ANSWER_STATUSES = {
    PENDING: "pending",
    ANSWERED: "answered",
    NOT_ANSWERED: "not_answered",
} as const;

export type BidAnswerStatus =
    (typeof BID_ANSWER_STATUSES)[keyof typeof BID_ANSWER_STATUSES];
