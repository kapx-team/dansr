import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { getDbIdLength } from "@dansr/common-db";
import { isValidSolanaAddress } from "@dansr/common-utils";
import { z } from "zod";

export const getWalletSignInMessageSchema = z.object({
    walletAddress: z
        .string({
            required_error: "Wallet address is required!",
            invalid_type_error: "Invalid wallet address!",
        })
        .refine((value) => isValidSolanaAddress(value), {
            message: "Invalid wallet address!",
        }),
});

export const xSigninCallbackSchema = z.object({
    oauthToken: z
        .string({
            required_error: "OAuth token is required!",
            invalid_type_error: "Invalid OAuth token!",
        })
        .min(1, { message: "OAuth token is required!" }),
    oauthVerifier: z
        .string({
            required_error: "OAuth verifier is required!",
            invalid_type_error: "Invalid OAuth verifier!",
        })
        .min(1, { message: "OAuth verifier is required!" }),
});

export type XSigninCallbackSchema = z.infer<typeof xSigninCallbackSchema>;

export const walletSignInRequestSchema = z.object({
    requestId: z
        .string({
            required_error: "Request ID is required!",
            invalid_type_error: "Invalid request ID!",
        })
        .min(getDbIdLength(DB_ID_PREFIXES.USER_WALLET_SIGNIN_REQUEST), {
            message: "Invalid request ID!",
        }),
    signature: z
        .string({
            required_error: "Signature is required!",
            invalid_type_error: "Invalid signature!",
        })
        .min(1, { message: "Signature is required!" }),
});

export const xSigninSchema = z.object({
    inviteCode: z
        .string({
            required_error: "Invite code is required!",
            invalid_type_error: "Invalid invite code!",
        })
        .optional(),
});
