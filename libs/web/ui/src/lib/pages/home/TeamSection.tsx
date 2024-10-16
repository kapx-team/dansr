import { dansrBhagyaImg, dansrVikhyatImg } from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ReactNode } from "react";

type TeamSectionProps = React.ComponentProps<"section">;

export function TeamSection({ className, ...props }: TeamSectionProps) {
    return (
        <section id="team-section" className={cn(className)} {...props}>
            <PageContainer className="flex flex-col items-center text-center justify-center gap-5">
                <h2 className="lg:text-[66px] md:text-4xl text-3xl lg:leading-[79px]">
                    Meet the team
                </h2>

                <p className="font-medium max-w-[1058px]">
                    We're builders on a mission to close the engagement gap
                    between creators and their fans.
                </p>

                <div className="flex justify-center flex-wrap items-start gap-10 xl:gap-20">
                    <TeamMemberCard
                        name="Bhagya Mudgal"
                        position="Tech Lead"
                        descriptionLines={[
                            <p key="line-1">
                                Former Roles at{" "}
                                <span className="font-bold">Gloo</span>,{" "}
                                <span className="font-bold">IOTric</span>,{" "}
                                <span className="font-bold">Solvent</span>, and{" "}
                                <span className="font-bold">Platos</span>
                            </p>,
                            <p key="line-2">
                                Active{" "}
                                <span className="font-bold">Superteam</span>{" "}
                                Member
                            </p>,
                            <p key="line-3">
                                <span className="font-bold">Deanslist</span>{" "}
                                Citizen
                            </p>,
                            <p key="line-4">
                                Full-stack developer with 3+ years of experience
                            </p>,
                            <p key="line-5">
                                Solana specialist with 2+ years in blockchain
                                development
                            </p>,
                        ]}
                        imageSrc={dansrBhagyaImg}
                    />

                    <TeamMemberCard
                        name="Vikhyat Sapra"
                        position="Growth Strategist"
                        descriptionLines={[
                            <p key="line-1">
                                Former Roles at{" "}
                                <span className="font-bold">Gloo</span>,{" "}
                                <span className="font-bold">Crowwd Labs</span>,
                                and{" "}
                                <span className="font-bold"> Ultrahuman</span>
                            </p>,
                            <p key="line-2">
                                <span className="font-bold">
                                    Network School
                                </span>{" "}
                                V1 Admit
                            </p>,
                            <p key="line-3">
                                <span className="font-bold">Superteam</span>{" "}
                                Contributor
                            </p>,
                            <p key="line-4">
                                4 years of on-chain agency experience in growth
                                and community
                            </p>,
                        ]}
                        imageSrc={dansrVikhyatImg}
                    />
                </div>

                <div className="pt-10 flex flex-col items-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        link="mailto:team@dansr.io"
                    >
                        Be Part of Our Vision
                    </Button>

                    <p className="italic opacity-80">
                        We’re on the lookout for talented individuals to help us
                        build and grow.
                    </p>
                </div>
            </PageContainer>
        </section>
    );
}

function TeamMemberCard({
    name,
    position,
    descriptionLines,
    imageSrc,
}: {
    name: string;
    position: string;
    descriptionLines?: ReactNode[];
    imageSrc: string | StaticImageData;
}) {
    return (
        <div className="flex flex-col items-center gap-4 max-w-[460px]">
            <Image src={imageSrc} alt={name} className="pb-4" />
            <h3 className="text-2xl">
                {name} | {position}
            </h3>

            <div className="flex flex-col gap-1 text-base">
                {descriptionLines?.map((line) => {
                    return line;
                })}
            </div>
        </div>
    );
}
