import { apiEnv } from "@dansr/api-env";
import { TwitterApi } from "twitter-api-v2";

export const xAppClient = new TwitterApi({
    appKey: apiEnv.X_APP_KEY,
    appSecret: apiEnv.X_APP_SECRET,
});

export function getXUserClient(token: string, tokenSecret: string) {
    return new TwitterApi({
        appKey: apiEnv.X_APP_KEY,
        appSecret: apiEnv.X_APP_SECRET,
        accessToken: token,
        accessSecret: tokenSecret,
    });
}

export function getXAskDansrClient() {
    return new TwitterApi({
        appKey: apiEnv.X_APP_KEY,
        appSecret: apiEnv.X_APP_SECRET,
        accessToken: apiEnv.ASK_DANSR_X_ACCESS_TOKEN,
        accessSecret: apiEnv.ASK_DANSR_X_ACCESS_SECRET,
    });
}
