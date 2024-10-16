import { dansrAtRadarImg } from "@dansr/common-assets";
import { PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import Image from "next/image";

type RadarSectionProps = React.ComponentProps<"section">;

export function RadarSection({ className, ...props }: RadarSectionProps) {
    return (
        <section id="radar-section" className={cn(className)} {...props}>
            <PageContainer className="flex flex-col items-center text-center justify-center gap-5">
                <h2 className="lg:text-[66px] md:text-4xl text-3xl lg:leading-[79px]">
                    Innovating at Radar
                </h2>

                <p className="font-medium pb-5 md:pb-20 max-w-[1058px]">
                    Enhancing on-chain engagement at the Radar Hackathon! We're
                    building the future of direct creator-fan interactions. Join
                    us in crafting meaningful, verified connections.
                </p>

                <Image src={dansrAtRadarImg} alt="dansr-at-radar" />
            </PageContainer>
        </section>
    );
}
