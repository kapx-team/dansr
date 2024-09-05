/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectUser } from "@dansr/common-db";
import { logError, logMessage } from "@dansr/common-utils";
import { randomUUID } from "crypto";
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";
import { NextRequest } from "next/server";
import { getIp } from "./ip";

export class ApiLogger {
    private logger: Logger;

    private withData: Record<string, any> = {
        logId: null,
        user: null,
    };

    constructor(id?: string) {
        this.withData["logId"] = id ?? randomUUID();
        this.logger = new Logger({
            source: "dansr-api",
            logLevel: LogLevel.info,
        });
    }

    req(req: NextRequest) {
        if (req?.nextUrl) {
            const { host, hostname, origin, pathname } = req.nextUrl;

            const query: Record<string, string> = {};

            req.nextUrl.searchParams.forEach((value, key) => {
                query[key] = value;
            });

            delete query["token"];

            this.withData["request"] = {
                ip: getIp(req),
                method: req?.method ?? null,
                url: req?.url ?? null,
                geo: req?.geo ?? null,
                "user-agent": req?.headers?.get("user-agent") ?? null,
                host,
                hostname,
                origin,
                pathname,
                query: [query],
            };
        } else {
            this.withData["request"] = {
                method: req?.method ?? null,
                url: req?.url ?? null,
                "user-agent": req?.headers?.get("user-agent") ?? null,
            };
        }
    }

    status(status: number) {
        this.withData["statusCode"] = status;
    }

    user(user: Partial<SelectUser> | null) {
        if (user) {
            this.withData["user"] = {
                id: user.id,
                email: user.email,
            };
        } else {
            this.withData["user"] = null;
        }
    }

    body(data: Record<string, any>) {
        this.withData = { ...this.withData, body: [data] };
    }

    with(data: Record<string, any>) {
        this.withData = { ...this.withData, ...data };
    }

    response(data: Record<string, any> | Array<Record<string, any>>) {
        this.withData = { ...this.withData, response: [data] };
    }

    info(message: string, args?: Record<string, any>) {
        try {
            this.logger.with(this.withData).info(message, { data: [args] });
            logMessage(message, { ...this.withData, data: [args] });
        } catch (error) {
            logError("Failed to send info to axiom", { error });
        }
    }

    error(message: string, args?: Record<string, any>) {
        try {
            this.logger.with(this.withData).error(message, args);
            logError(message, { ...this.withData, args });
        } catch (error) {
            logError("Failed to send error to axiom", { error });
        }
    }
}
