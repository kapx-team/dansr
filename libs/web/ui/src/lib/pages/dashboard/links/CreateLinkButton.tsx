"use client";

import { Button } from "@dansr/common-ui";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { CreateLinkModal } from "./CreateLinkModal";

export function CreateLinkButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center"
                leftIcon={<HiPlus className="h-5 w-5" />}
            >
                Create New Link
            </Button>
            <CreateLinkModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
    );
}
