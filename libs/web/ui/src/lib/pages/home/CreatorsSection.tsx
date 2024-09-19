"use client";

import { creatorsSectionImg, xIconImg } from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CreatorsSection() {
    const router = useRouter();

    return (
        <div>
            <PageContainer className="relative flex flex-col items-center justify-center gap-4 py-4 lg:py-16">
                <h1 className="flex flex-col text-center lg:text-[66px] text-3xl font-bold mb-4 lg:mb-8">
                    Who’s danswering?
                </h1>

                <p className="text-center max-w-[680px] mb-16 text-sm md:text-base font-medium ">
                    Stay tuned for the big reveal! We’re onboarding top names
                    from across industries. Who will be the first to answer your
                    questions?
                </p>
            </PageContainer>

            <Image
                src={creatorsSectionImg}
                alt="creators-section"
                className="w-full object-cover"
            />

            <PageContainer className="relative flex items-center justify-center gap-5 py-16 lg:py-16">
                <Link
                    href="http://x.com/askdansr"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        background: `rgba(255, 255, 255, 0.2)`,
                    }}
                    className="text-white py-4 px-9 rounded-lg font-heading text-center flex items-center justify-center gap-2"
                >
                    <span>Follow Us On</span>{" "}
                    <span>
                        <Image
                            src={xIconImg}
                            alt="x-icon"
                            className="w-[18px] h-[18px]"
                        />
                    </span>
                </Link>

                <Button onClick={() => router.push(`#question-form`)}>
                    Ask a Question
                </Button>
            </PageContainer>
        </div>
    );
}
