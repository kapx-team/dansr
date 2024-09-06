import { extractErrorMessage } from "@dansr/common-utils";
import type { NextRequest } from "next/server";
import { z } from "zod";

export function splitArrayIntoGroups<T>(arr: T[], groupSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += groupSize) {
        result.push(arr.slice(i, i + groupSize));
    }
    return result;
}

type ValidatorResult<T> =
    | {
          success: true;
          body: T;
          error: null;
      }
    | {
          success: false;
          body: null;
          error: string;
      };

export async function validateReqBody<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SchemaType extends z.ZodType<any, any, any>,
>({
    req,
    schema,
}: {
    req: NextRequest;
    schema: SchemaType;
}): Promise<ValidatorResult<z.infer<SchemaType>>> {
    try {
        const rawBody = await req.json();
        const bodyValidationResult = schema.safeParse(rawBody);

        if (!bodyValidationResult.success) {
            throw new Error(bodyValidationResult.error.errors[0].message);
        }

        return {
            success: true,
            body: bodyValidationResult.data,
            error: null,
        };
    } catch (error) {
        const errorMessage = extractErrorMessage(error);

        const isInvalidRawBody =
            errorMessage === "Unexpected end of JSON input";

        return {
            success: false,
            body: null,
            error: isInvalidRawBody ? "Invalid request body!" : errorMessage,
        };
    }
}

export function extractOriginUrlFromReq(req: NextRequest) {
    try {
        const url = req.headers.get("origin") || req.headers.get("referer");

        if (!url) {
            throw new Error("No URL found!");
        }

        return new URL(url);
    } catch {
        return null;
    }
}

export function extractDomainFromUrl(url: URL) {
    return url.hostname;
}
