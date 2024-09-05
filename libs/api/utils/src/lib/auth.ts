import { apiEnv } from "@dansr/api-env";
import { AUTH_COOKIE_NAME } from "@dansr/common-constants";
import { addDays } from "date-fns";

export function getAccessTokenCookieData(accessToken?: string) {
    return {
        name: AUTH_COOKIE_NAME,
        value: accessToken || "",
        path: "/",
        httpOnly: true,
        secure: apiEnv.VERCEL_ENV !== "development",
        sameSite: apiEnv.VERCEL_ENV === "development" ? "lax" : "none",
        expires: addDays(new Date(), 7),
        domain:
            apiEnv.VERCEL_ENV === "development" ? "localhost" : ".dansr.com",
    } as const;
}
