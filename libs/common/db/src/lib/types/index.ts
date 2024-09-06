import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
    contactFormSubmissionsTable,
    creatorsTable,
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
