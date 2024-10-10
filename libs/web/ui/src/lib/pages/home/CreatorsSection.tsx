"use client";

import { creatorsSectionImg, xIconImg } from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import Image from "next/image";

type CreatorsSectionProps = React.ComponentProps<"section">;

export function CreatorsSection({ className, ...props }: CreatorsSectionProps) {
    return (
        <section
            id="creators-section"
            className={cn("space-y-20", className)}
            {...props}
        >
            <PageContainer className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-[66px] leading-[79px]">
                    Big Names are coming soon
                </h2>

                <p className="font-medium max-w-[1058px]">
                    Curious who'll be answering your questions? We're onboarding
                    top creators across industries. Stay tuned for the big
                    reveal!
                </p>
            </PageContainer>

            <Image
                src={creatorsSectionImg}
                alt="creators-section"
                className="w-full object-cover"
            />

            <PageContainer className="flex flex-wrap items-center justify-center gap-5 pt-8">
                <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2"
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
