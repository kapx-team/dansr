import { parseEnv } from "@dansr/common-utils";
import { z } from "zod";

const envSchema = z.object({
    TZ: z.string().optional().default("Etc/UTC"),
    VERCEL_ENV: z
        .union([
            z.literal("production"),
            z.literal("preview"),
            z.literal("development"),
        ])
        .optional()
        .default("development"),
    SEND_EMAILS: z
        .union([z.literal("true"), z.literal("false")])
        .transform((value) => {
            return value === "true";
        }),
    ENABLE_API_RATE_LIMITS: z
        .union([z.literal("true"), z.literal("false")])
        .transform((value) => {
            return value === "true";
        }),
    FRONTEND_URL: z.string().url(),
    ENCRYPTION_SECRET: z.string().min(1),

    SOLANA_RPC_URL: z.string().url(),

    // Database
    DATABASE_URL: z.string().min(1),

    // Resend
    RESEND_API_KEY: z.string().min(1),

    // Redis
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

    // Axiom
    AXIOM_TOKEN: z.string().min(1),
    AXIOM_DATASET: z.union([z.literal("api-dev"), z.literal("api-prod")]),

    // GCP
    GCP_PROJECT_ID: z.string().min(1),
    GCP_PROJECT_PRIVATE_KEY: z.string().min(1),
    GCP_PROJECT_CLIENT_EMAIL: z.string().min(1),
    GCP_PROJECT_BUCKET: z.string().min(1),

    // JWT
    JWT_SECRET: z.string().min(1),

    // X
    X_APP_KEY: z.string().min(1),
    X_APP_SECRET: z.string().min(1),
    X_BEARER_TOKEN: z.string().min(1),
    X_CLIENT_SECRET: z.string().min(1),
    ASK_DANSR_X_ACCESS_TOKEN: z.string().min(1),
    ASK_DANSR_X_ACCESS_SECRET: z.string().min(1),

    // wallets
    DANSR_BID_FEES_WALLET: z.string().min(1).max(44),
    DANSR_BIDS_WALLET_PRIVATE_KEY: z.string().min(1),
});

export const apiEnv = parseEnv({
    schema: envSchema,
    env: process.env,
});
