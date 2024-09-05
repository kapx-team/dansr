import type { z } from "zod";
import { extractErrorMessage } from "./general";

export function parseEnv<T extends z.ZodRawShape>({
    schema,
    env,
}: {
    schema: z.ZodObject<T>;
    env: Record<string, unknown>;
}) {
    try {
        const envValidationResult = schema.safeParse(env);

        if (!envValidationResult.success) {
            throw new Error(envValidationResult.error.message);
        }

        return envValidationResult.data;
    } catch (error) {
        console.error(
            "Error parsing environment variables =>",
            extractErrorMessage(error)
        );
        process.exit(1);
    }
}
