import redis, { REDIS_KEYS } from "@dansr/api-services/redis";
import type { JupagToken } from "@dansr/common-db";
import { hoursToSeconds } from "date-fns";
import ky from "ky";

export async function getTokens(verified = true) {
    const basedUrl = new URL(`https://tokens.jup.ag/tokens`);

    if (verified) {
        basedUrl.searchParams.set("tags", "verified");
    }

    const existingTokens = await redis.get(REDIS_KEYS.JUPAG_TOKENS);

    if (existingTokens) {
        return existingTokens as JupagToken[];
    }

    const tokens = await ky.get(basedUrl).json<JupagToken[]>();

    await redis.set(REDIS_KEYS.JUPAG_TOKENS, JSON.stringify(tokens), {
        ex: hoursToSeconds(24),
    });

    return tokens;
}

export async function getToken(mint: string) {
    const tokens = await getTokens();

    return tokens.find((token) => token.address === mint) ?? null;
}
