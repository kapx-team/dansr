"use client";

import { webEnv } from "@dansr/web-env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (
    typeof window !== "undefined" &&
    webEnv.NEXT_PUBLIC_POSTHOG_KEY &&
    webEnv.NEXT_PUBLIC_VERCEL_ENV === "production"
) {
    posthog.init(webEnv.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
        capture_pageleave: true,
        opt_in_site_apps: true,
        capture_performance: true,
    });
}

export function PosthogProvider({ children }: { children: React.ReactNode }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
