import { dansrLogoImg } from "@dansr/common-assets";
import Image from "next/image";
import React from "react";

export function ComingSoon() {
    return (
        <div
            className="flex flex-col items-center justify-center h-full
space-y-2 md:-space-y-2 text-center"
        >
            <Image src={dansrLogoImg} alt="dansr-logo" />

            <h1 className="font-ibrand text-6xl sm:text-[81px] bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00] bg-clip-text text-transparent ">
                coming soon
            </h1>
        </div>
    );
}
