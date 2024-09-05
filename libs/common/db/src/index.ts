export * from "./lib/schema";
export * from "./lib/types";
export * from "./lib/utils/general";

import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

const DATABASE_URL = process.env["DATABASE_URL"];

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}

const client = new Client({
    url: DATABASE_URL,
});

export const db = drizzle(client);
