import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL not found in environment variables!");
}

export default {
    schema: "./src/lib/schema/*",
    out: "./src/lib/migrations",
    dialect: "mysql",
    dbCredentials: {
        url: DATABASE_URL,
    },
    breakpoints: true,
    migrations: {
        schema: "public",
    },
} satisfies Config;
