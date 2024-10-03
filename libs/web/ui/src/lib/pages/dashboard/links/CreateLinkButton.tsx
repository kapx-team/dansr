"use client";

import { Button } from "@dansr/common-ui";
import { HiPlus } from "react-icons/hi";

export function CreateLinkButton() {
    return (
        <Button leftIcon={<HiPlus className="h-5 w-5" />}>
            Create New Link
        </Button>
    );
}
