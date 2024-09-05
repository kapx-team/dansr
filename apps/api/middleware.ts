import { applyRatelimit } from "@dansr/api-services/redis";
import { getIp } from "@dansr/api-utils/ip";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const allowedOrigins = [
    "http://localhost:3000",
    "https://dansr.io",
    "https://dev.dansr.io",
];

const CORS_CONFIG: { [key: string]: string } = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, DELETE, PATCH, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

const ACTION_CORS_CONFIG: { [key: string]: string } = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Content-Encoding, Accept-Encoding",
    "Content-Type": "application/json",
};

export default async function middleware(
    req: NextRequest
): Promise<Response | undefined> {
    const ip = getIp(req);

    const { success } = await applyRatelimit(ip);

    const error = new Error("Too many requests!");

    let res = NextResponse.next();

    if (req.method === "OPTIONS") {
        res = NextResponse.json({ message: "ok" }, { status: 200 });
    }

    if (!req.url.includes("actions")) {
        const origin = req.headers.get("origin");

        if (origin) {
            if (allowedOrigins.includes(origin)) {
                res.headers.append("Access-Control-Allow-Origin", origin);
            }
        }

        Object.keys(CORS_CONFIG).forEach((key) => {
            const value = CORS_CONFIG[key];

            res.headers.append(key, value);
        });
    } else {
        Object.keys(ACTION_CORS_CONFIG).forEach((key) => {
            const value = ACTION_CORS_CONFIG[key];

            res.headers.append(key, value);
        });
    }

    return success
        ? res
        : NextResponse.json(
              {
                  success: false,
                  message:
                      error instanceof Error
                          ? error.message
                          : "Too many requests!",
                  result: null,
              },
              { status: 429 }
          );
}

export const config = {
    matcher: "/:path*",
};
