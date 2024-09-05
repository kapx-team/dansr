export const DB_ID_PREFIXES = {
    USER: "usr",
    CREATOR: "crtr",
    CONTACT_FORM_SUBMISSION: "cfsub",
} as const;

export type DbIdPrefix = (typeof DB_ID_PREFIXES)[keyof typeof DB_ID_PREFIXES];
