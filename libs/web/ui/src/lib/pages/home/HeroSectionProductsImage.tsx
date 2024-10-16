"use client";

import {
    dansrProduct1Img,
    dansrProduct2Img,
    dansrProduct3Img,
    dansrProduct4Img,
} from "@dansr/common-assets";
import Image from "next/image";
import { useEffect, useState } from "react";

const PRODUCT_IMAGES = [
    dansrProduct1Img,
    dansrProduct2Img,
    dansrProduct3Img,
    dansrProduct4Img,
];

const PRODUCT_HEADINGS = [
    "Insights into Your Success",
    "Unlock Engagement with Solana Blink on X!",
    "The Answer You’ve Been Waiting For!",
    "Direct Answers, Direct Earnings!",
];

export function HeroSectionProductsImage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % PRODUCT_IMAGES.length
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="space-y-4">
            <p className="text-center text-3xl font-heading">
                {PRODUCT_HEADINGS[currentImageIndex]}
            </p>

            <Image
                src={PRODUCT_IMAGES[currentImageIndex]}
                alt={`dansr-product-${currentImageIndex + 1}`}
            />
        </div>
    );
}
