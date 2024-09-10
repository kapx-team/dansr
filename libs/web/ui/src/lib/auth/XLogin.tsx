"use client";

import { logError } from "@dansr/common-utils";
import { useAuthenticatedUser, useGetXSigninUrl } from "@dansr/web-hooks";
import { useRouter } from "next/navigation";

export function XLogin() {
    const router = useRouter();
    const { mutateAsync, isPending } = useGetXSigninUrl();
    const { data } = useAuthenticatedUser();

    async function handleXLogin() {
        try {
            const response = await mutateAsync();

            if (!response.success) {
                throw new Error(response.message);
            }

            if (!response.result.isXAuthorized && !response.result?.url) {
                throw new Error("No URL provided!");
            }

            if (!response.result.isXAuthorized && response.result.url) {
                router.push(response.result.url);
            }
        } catch (error) {
            logError("handleXLogin =>", error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <button onClick={handleXLogin} disabled={isPending}>
                X Login
            </button>

            {data && JSON.stringify(data)}
        </div>
    );
}
