export const DB_ID_PREFIXES = {
    USER: "usr",
    CREATOR: "crtr",
    CONTACT_FORM_SUBMISSION: "cfsb",
    VERIFICATION_REQUEST: "verq",
    USER_WALLET_SIGNIN_REQUEST: "usrq",
    FREE_QUESTION: "fqn",
} as const;

export type DbIdPrefix = (typeof DB_ID_PREFIXES)[keyof typeof DB_ID_PREFIXES];
