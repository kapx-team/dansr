import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { headers } from "next/headers";
import { apiInstance } from "./api-instance";
import { getApiAuthService } from "./auth";
import { getApiCreatorsService } from "./creators";
import { getApiFreeQuestionsService } from "./free-questions";
import { getApiLinksService } from "./links";

export function getServerApiClient(cookieStore: ReadonlyRequestCookies) {
    const serverApiInstance = apiInstance.extend({
        headers: {
            Cookie: cookieStore.toString(),
            "User-Agent":
                headers().get("user-agent") ||
                headers().get("User-Agent") ||
                "",
            "X-Forwarded-For":
                headers().get("x-forwarded-for") ||
                headers().get("X-Forwarded-For") ||
                "",
        },
    });

    return {
        links: getApiLinksService(serverApiInstance),
        auth: getApiAuthService(serverApiInstance),
        freeQuestions: getApiFreeQuestionsService(serverApiInstance),
        creators: getApiCreatorsService(serverApiInstance),
    };
}
