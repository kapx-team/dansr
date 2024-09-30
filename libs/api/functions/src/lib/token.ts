import redis, { REDIS_KEYS } from "@dansr/api-services/redis";
import { hoursToSeconds } from "date-fns";
import ky from "ky";

type JupagToken = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
    created_at: string;
    freeze_authority: string | null;
    mint_authority: string | null;
    permanent_delegate: string | null;
    minted_at: string | null;
    extensions: {
        coingeckoId: string;
    };
};

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
