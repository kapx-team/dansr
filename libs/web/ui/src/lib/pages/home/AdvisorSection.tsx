import { dansrBeemanImg, dansrSidImg } from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ReactNode } from "react";

type AdvisorSectionProps = React.ComponentProps<"section">;

export function AdvisorSection({ className, ...props }: AdvisorSectionProps) {
    return (
        <section id="advisor-section" className={cn(className)} {...props}>
            <PageContainer className="flex flex-col items-center text-center justify-center gap-5">
                <h2 className="lg:text-[66px] md:text-4xl text-3xl lg:leading-[79px]">
                    Learning from the best
                </h2>

                <p className="font-medium max-w-[1058px]">
                    Our advisory board includes seasoned veterans who provide
                    invaluable insights.
                </p>

                <div className="flex justify-center items-start gap-10 xl:gap-20 flex-wrap">
                    <AdvisorCard
                        name="Beeman"
                        descriptionLines={[
                            <p key="line-1">
                                Founder of Pubkey & Tokengater, Deanlist Citizen
                            </p>,
                        ]}
                        imageSrc={dansrBeemanImg}
                    />

                    <AdvisorCard
                        name="Sid kapur"
                        descriptionLines={[
                            <p key="line-1">
                                Serial entrepreneur and venture studio owner
                                (KAPX)
                            </p>,
                            <p key="line-2">Founder of Gloo and MoneySmart</p>,
                        ]}
                        imageSrc={dansrSidImg}
                    />
                </div>

                <div className="space-y-4 pt-10">
                    <Button variant="outline" size="lg">
                        Become an Advisor
                    </Button>

                    <p className="italic opacity-80">
                        Help shape the future of the platform. Join our advisory
                        board and contribute your expertise.
                    </p>
                </div>
            </PageContainer>
        </section>
    );
}

function AdvisorCard({
    name,
    descriptionLines,
    imageSrc,
}: {
    name: string;
    descriptionLines?: ReactNode[];
    imageSrc: string | StaticImageData;
}) {
    return (
        <div className="flex flex-col items-center gap-4 max-w-[460px]">
            <Image src={imageSrc} alt={name} className="pb-4" />
            <h3 className="text-2xl">{name}</h3>

            <div className="flex flex-col gap-1 text-base">
                {descriptionLines?.map((line) => {
                    return line;
                })}
            </div>
        </div>
    );
}
