"use client";

import { USER_TYPES } from "@dansr/common-constants";
import { Button } from "@dansr/common-ui";
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
    const { data, isLoading, refetch } = useAuthenticatedUser();
    const searchParams = useSearchParams();

    const oauthToken = searchParams.get("oauth_token");
    const oauthVerifier = searchParams.get("oauth_verifier");
    const inviteCode = searchParams.get("invite_code") || undefined;

    const callbackExecutedRef = useRef(false);

    const redirectUrl = searchParams.get("r") || undefined;

    async function handleXLogin() {
        try {
            const response = await mutateAsync({ inviteCode, redirectUrl });

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
                        refetch();
                    }
                })
                .catch((error) => {
                    logError("X signin callback error:", error);
                    router.replace("/auth/x-auth-error");
                });
        }
    }, [oauthToken, oauthVerifier, useXSigninCallbackMutation, router]); //eslint-disable-line

    if (isLoading) {
        return null;
    }

    if (data) {
        if (data.type !== USER_TYPES.CREATOR) {
            return null;
        }

        return <SignoutButton />;
    }

    return (
        <Button
            onClick={handleXLogin}
            isLoading={isPending || useXSigninCallbackMutation.isPending}
        >
            Sign In with X as Creator
        </Button>
    );
}
