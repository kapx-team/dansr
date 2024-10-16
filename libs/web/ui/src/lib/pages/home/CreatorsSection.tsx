"use client";

import { creatorsSectionImg, xIconImg } from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import Image from "next/image";
import { useEffect, useRef } from "react";

type CreatorsSectionProps = React.ComponentProps<"section">;

export function CreatorsSection({ className, ...props }: CreatorsSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;

        if (scrollWidth > clientWidth) {
            scrollContainer.style.setProperty(
                "--scroll-width",
                `${scrollWidth}px`
            );
        }
    }, []);

    return (
        <section
            id="creators-section"
            className={cn("space-y-20", className)}
            {...props}
        >
            <PageContainer className="flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="lg:text-[66px] md:text-4xl text-3xl lg:leading-[79px]">
                    Big Names are coming soon
                </h2>

                <p className="font-medium max-w-[1058px]">
                    Curious who'll be answering your questions? We're onboarding
                    top creators across industries. Stay tuned for the big
                    reveal!
                </p>
            </PageContainer>

            <div className="overflow-x-auto hide-scrollbar">
                <div className="w-[400%] md:w-[300%] lg:w-[280%]">
                    <Image
                        src={creatorsSectionImg}
                        alt="creators-section"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <PageContainer className="flex flex-wrap items-center justify-center gap-5 pt-4 md:pt-8">
                <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                    link="https://x.com/askdansr"
                    openLinkInNewTab
                >
                    <span>Follow Us On</span>

                    <span className="inline-block">
                        <Image
                            src={xIconImg}
                            alt="x-icon"
                            className="w-[18px] h-[18px]"
                        />
                    </span>
                </Button>

                <Button>Ask a Question</Button>
            </PageContainer>
        </section>
    );
}
