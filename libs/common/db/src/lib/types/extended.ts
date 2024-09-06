import type {
    SelectContactFormSubmission,
    SelectCreator,
    SelectUser,
    SelectVerificationRequest,
} from ".";

export type User = SelectUser;

export type Creator = SelectCreator & {
    user: SelectUser;
};

export type VerificationRequest = SelectVerificationRequest & {
    creator: SelectCreator;
};

export type ContactFormSubmission = SelectContactFormSubmission;
