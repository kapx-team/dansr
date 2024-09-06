import { AUTH_COOKIE_NAME } from "@dansr/common-constants";
import type { User } from "@dansr/common-db";
import { extractErrorMessage } from "@dansr/common-utils";
import { cookies } from "next/headers";

type GetAuthenticatedUserResponse = {
    user: User | null;
    error: string | null;
};

export async function getAuthenticatedUser(): Promise<GetAuthenticatedUserResponse> {
    try {
        const cookie = cookies().get(AUTH_COOKIE_NAME);

        if (!cookie) {
            throw new Error("No cookie found");
        }

        const { value } = cookie;

        return { user: null, error: null };
    } catch (error) {
        return { user: null, error: extractErrorMessage(error) };
    }
}
