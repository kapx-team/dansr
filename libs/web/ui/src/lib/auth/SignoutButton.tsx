"use client";

import { useSignout } from "@dansr/web-hooks";

export function SignoutButton() {
    const { mutate, isPending } = useSignout();

    return (
        <button onClick={() => mutate()} disabled={isPending}>
            Signout
        </button>
    );
}
