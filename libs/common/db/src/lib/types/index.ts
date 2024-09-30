import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
    contactFormSubmissionsTable,
    creatorInvitesTable,
    creatorsTable,
    freeQuestionsTable,
    linkBidsTable,
    linksTable,
    usersTable,
    userWalletSigninRequestsTable,
    verificationRequestsTable,
} from "../schema";
export * from "./extended";

export type SelectUser = InferSelectModel<typeof usersTable>;
export type InsertUser = InferInsertModel<typeof usersTable>;

export type SelectCreator = InferSelectModel<typeof creatorsTable>;
export type InsertCreator = InferInsertModel<typeof creatorsTable>;

export type SelectVerificationRequest = InferSelectModel<
    typeof verificationRequestsTable
>;
export type InsertVerificationRequest = InferInsertModel<
    typeof verificationRequestsTable
>;

export type SelectContactFormSubmission = InferSelectModel<
    typeof contactFormSubmissionsTable
>;
export type InsertContactFormSubmission = InferInsertModel<
    typeof contactFormSubmissionsTable
>;

export type SelectUserWalletSigninRequest = InferSelectModel<
    typeof userWalletSigninRequestsTable
>;
export type InsertUserWalletSigninRequest = InferInsertModel<
    typeof userWalletSigninRequestsTable
>;

export type SelectFreeQuestion = InferSelectModel<typeof freeQuestionsTable>;
export type InsertFreeQuestion = InferInsertModel<typeof freeQuestionsTable>;

export type SelectCreatorInvite = InferSelectModel<typeof creatorInvitesTable>;
export type InsertCreatorInvite = InferInsertModel<typeof creatorInvitesTable>;

export type SelectLink = InferSelectModel<typeof linksTable>;
export type InsertLink = InferInsertModel<typeof linksTable>;

export type SelectLinkBid = InferSelectModel<typeof linkBidsTable>;
export type InsertLinkBid = InferInsertModel<typeof linkBidsTable>;
