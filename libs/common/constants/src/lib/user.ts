export const USER_TYPES = {
    ADMIN: "admin",
    NORMAL: "normal",
    CREATOR: "creator",
} as const;

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];

export const CREATOR_VERIFICATION_STATUSES = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
} as const;

export type CreatorVerificationStatus =
    (typeof CREATOR_VERIFICATION_STATUSES)[keyof typeof CREATOR_VERIFICATION_STATUSES];
