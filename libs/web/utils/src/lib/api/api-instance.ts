import { webEnv } from "@dansr/web-env";
import ky from "ky";
import { getApiAuthService } from "./auth";
import { getApiBidsService } from "./bids";
import { getApiCreatorsService } from "./creators";
import { getApiFreeQuestionsService } from "./free-questions";
import { getApiLinksService } from "./links";
import { getApiUsersService } from "./users";
export const apiInstance = ky.create({
    prefixUrl: webEnv.NEXT_PUBLIC_API_URL,
    credentials: "include",
    retry: 0,
    throwHttpErrors: false,
});

export const apiClient = {
    bids: getApiBidsService(apiInstance),
    links: getApiLinksService(apiInstance),
    auth: getApiAuthService(apiInstance),
    freeQuestions: getApiFreeQuestionsService(apiInstance),
    creators: getApiCreatorsService(apiInstance),
    users: getApiUsersService(apiInstance),
};
