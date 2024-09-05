import { webEnv } from "@dansr/web-env";
import ky from "ky";

export const apiInstance = ky.create({
    prefixUrl: webEnv.NEXT_PUBLIC_API_URL,
    credentials: "same-origin",
    retry: 0,
    throwHttpErrors: false,
});
