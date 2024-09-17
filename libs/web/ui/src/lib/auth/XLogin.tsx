"use client";

import { logError } from "@dansr/common-utils";
import {
    useAuthenticatedUser,
    useGetXSigninUrl,
    useXSigninCallback,
} from "@dansr/web-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SignoutButton } from "./SignoutButton";

export function XLogin() {
    const router = useRouter();
    const { mutateAsync, isPending } = useGetXSigninUrl();
    const useXSigninCallbackMutation = useXSigninCallback();
    const { data } = useAuthenticatedUser();
    const searchParams = useSearchParams();

    const oauthToken = searchParams.get("oauth_token");
    const oauthVerifier = searchParams.get("oauth_verifier");

    const callbackExecutedRef = useRef(false);

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

    useEffect(() => {
        if (oauthToken && oauthVerifier && !callbackExecutedRef.current) {
            callbackExecutedRef.current = true;

            console.log(
                "oauthToken and oauthVerifier",
                oauthToken,
                oauthVerifier
            );

            useXSigninCallbackMutation
                .mutateAsync({
                    oauthToken,
                    oauthVerifier,
                })
                .then((response) => {
                    if (!response.success) {
                        router.replace("/auth/x-auth-error");
                    } else {
                        router.replace("/");
                    }
                })
                .catch((error) => {
                    logError("X signin callback error:", error);
                    router.replace("/auth/x-auth-error");
                });
        }
    }, [oauthToken, oauthVerifier, useXSigninCallbackMutation, router]);

    return (
        <div className="flex flex-col gap-4">
            {!data && !isPending && (
                <button onClick={handleXLogin} disabled={isPending}>
                    X Login
                </button>
            )}

            {data && (
                <div>
                    <SignoutButton />

                    <div className="break-words w-[500px]">
                        {JSON.stringify(data)}
                    </div>
                </div>
            )}
        </div>
    );
}
