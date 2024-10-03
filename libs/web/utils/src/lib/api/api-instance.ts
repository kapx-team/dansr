import { webEnv } from "@dansr/web-env";
import ky from "ky";
import { getApiAuthService } from "./auth";
import { getApiCreatorsService } from "./creators";
import { getApiFreeQuestionsService } from "./free-questions";
import { getApiLinksService } from "./links";

export const apiInstance = ky.create({
    prefixUrl: webEnv.NEXT_PUBLIC_API_URL,
    credentials: "include",
    retry: 0,
    throwHttpErrors: false,
});

export const apiClient = {
    links: getApiLinksService(apiInstance),
    auth: getApiAuthService(apiInstance),
    freeQuestions: getApiFreeQuestionsService(apiInstance),
    creators: getApiCreatorsService(apiInstance),
};
