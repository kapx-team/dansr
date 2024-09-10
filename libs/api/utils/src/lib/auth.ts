import { apiEnv } from "@dansr/api-env";
import { AUTH_COOKIE_NAME } from "@dansr/common-constants";
import * as crypto from "crypto";
import { addDays } from "date-fns";

export function getAccessTokenCookieData(accessToken?: string) {
    return {
        name: AUTH_COOKIE_NAME,
        value: accessToken || "",
        path: "/",
        httpOnly: true,
        secure: apiEnv.VERCEL_ENV !== "development",
        sameSite: apiEnv.VERCEL_ENV === "development" ? "lax" : "none",
        expires: addDays(new Date(), 7),
        domain:
            apiEnv.VERCEL_ENV === "development" ? "localhost" : ".dansr.com",
    } as const;
}

const ENCRYPTION_ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
const ENCRYPTION_SECRET = apiEnv.ENCRYPTION_SECRET;

function deriveKey(secret: string): Buffer {
    return crypto.scryptSync(secret, "salt", 32);
}

export function encryptToken(token: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = deriveKey(ENCRYPTION_SECRET);
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decryptToken(encryptedToken: string): string {
    const [ivHex, encryptedHex] = encryptedToken.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const key = deriveKey(ENCRYPTION_SECRET);
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ]);
    return decrypted.toString();
}
