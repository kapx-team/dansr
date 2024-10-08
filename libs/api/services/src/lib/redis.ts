import { apiEnv } from "@dansr/api-env";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: apiEnv.UPSTASH_REDIS_REST_URL,
    token: apiEnv.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    prefix: "@upstash/ratelimit",
});

export default redis;

export function applyRatelimit(ip: string | null) {
    if (!apiEnv.ENABLE_API_RATE_LIMITS || !ip) {
        const limit = async () => {
            return { success: true, ip };
        };

        return limit();
    }

    return rateLimit.limit(ip);
}

export const REDIS_KEYS = {
    JUPAG_TOKENS: "jupag_tokens",
    BLACKLISTED_AUTH_TOKENS: (token: string) => `b_a_t:${token}`,
    X_OAUTH_TOKEN_SECRET: (token: string) => `x_oauth_token_secret:${token}`,
    X_OAUTH_TOKEN_USER_ID: (token: string) => `x_oauth_token_user_id:${token}`,
    X_OAUTH_TOKEN_INVITE_CODE: (token: string) =>
        `x_oauth_token_invite_code:${token}`,
} as const;
