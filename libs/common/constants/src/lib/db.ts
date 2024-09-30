export const DB_ID_PREFIXES = {
    USER: "usr",
    CREATOR: "crtr",
    CONTACT_FORM_SUBMISSION: "cfsb",
    VERIFICATION_REQUEST: "verq",
    USER_WALLET_SIGNIN_REQUEST: "usrq",
    FREE_QUESTION: "fqn",
    CREATOR_INVITE: "cin",
    LINK: "lnk",
    LINK_BID: "lbd",
} as const;

export type DbIdPrefix = (typeof DB_ID_PREFIXES)[keyof typeof DB_ID_PREFIXES];
