import { apiEnv } from "@dansr/api-env";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export function getIp(req: NextRequest) {
    const ip = req?.ip ?? null;

    if (ip) {
        return ip;
    }

    const forwardedFor =
        headers().get("x-forwarded-for") || headers().get("X-Forwarded-For");
    const realIp = headers().get("x-real-ip") || headers().get("X-Real-Ip");

    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    if (realIp) {
        return realIp.trim();
    }

    return apiEnv.VERCEL_ENV === "production" ? null : "127.0.0.1";
}
