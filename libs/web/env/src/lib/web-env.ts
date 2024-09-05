import { parseEnv } from "@dansr/common-utils";
import { z } from "zod";

const envSchema = z.object({
    TZ: z.string().optional().default("Etc/UTC"),
    NEXT_PUBLIC_VERCEL_ENV: z
        .union([
            z.literal("production"),
            z.literal("preview"),
            z.literal("development"),
        ])
        .optional()
        .default("development"),
    NEXT_PUBLIC_API_URL: z.string().url(),

    NEXT_PUBLIC_SOLANA_RPC_URL: z.string().url(),

    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
});

const env = {
    NEXT_PUBLIC_VERCEL_ENV: process.env["NEXT_PUBLIC_VERCEL_ENV"],
    NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"],
    NEXT_PUBLIC_SOLANA_NETWORK: process.env["NEXT_PUBLIC_SOLANA_NETWORK"],
    NEXT_PUBLIC_SOLANA_RPC_URL: process.env["NEXT_PUBLIC_SOLANA_RPC_URL"],
    NEXT_PUBLIC_POSTHOG_KEY: process.env["NEXT_PUBLIC_POSTHOG_KEY"],
};

export const webEnv = parseEnv({
    schema: envSchema,
    env,
});
