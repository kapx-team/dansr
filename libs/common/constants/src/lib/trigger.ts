export const TRIGGER_SCHEDULES = {
    CHECK_PENDING_BIDS_FOR_CREATION: "check-pending-bids-for-creation",
    CHECK_EXPIRED_LINKS_FOR_RESULTS: "check-expired-links-for-results",
    CHECK_UNSELECTED_BIDS_FOR_REFUND: "check-unselected-bids-for-refund",
} as const;

export const TRIGGER_TASKS = {
    PAY_CREATOR_FOR_ANSWERING_BID: "pay-creator-for-answering-bid",
    SELECT_WINNING_BIDS_FOR_EXPIRED_LINK:
        "select-winning-bids-for-expired-link",
    REFUND_UNSELECTED_BIDS: "refund-unselected-bids",
} as const;
