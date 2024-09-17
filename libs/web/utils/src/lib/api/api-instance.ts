import { webEnv } from "@dansr/web-env";
import ky from "ky";
import { getApiAuthService } from "./auth";
import { getApiFreeQuestionsService } from "./free-questions";

export const apiInstance = ky.create({
    prefixUrl: webEnv.NEXT_PUBLIC_API_URL,
    credentials: "include",
    retry: 0,
    throwHttpErrors: false,
});

export const apiClient = {
    auth: getApiAuthService(apiInstance),
    freeQuestions: getApiFreeQuestionsService(apiInstance),
};
