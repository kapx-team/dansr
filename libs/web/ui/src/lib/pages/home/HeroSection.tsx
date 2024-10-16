import {
    checklistIconImg,
    creatorAvatar1Img,
    creatorAvatar2Img,
} from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import Image from "next/image";
import { HeroSectionProductsImage } from "./HeroSectionProductsImage";

export function HeroSection() {
    return (
        <section id="hero-section" className="relative pt-14">
            <Image
                src={creatorAvatar1Img}
                alt="creator-avatar-1"
                className="absolute top-[340px] lg:top-[560px] left-0 lg:left-[140px] h-[85px] w-[85px] md:h-[120px] md:w-[120px] lg:h-[200px] lg:w-[200px]"
            />

            <Image
                src={creatorAvatar2Img}
                alt="creator-avatar-2"
                className="absolute h-[65px] w-[65px] md:h-[120px] md:w-[120px] lg:h-[200px] lg:w-[200px] -top-4  lg:left-[20%] right-0 transform -rotate-[18]"
            />

            <PageContainer className="flex justify-center flex-col lg:flex-row lg:justify-between items-center gap-20">
                <div className="items-center text-center lg:text-left space-y-6 flex-1 flex flex-col justify-center lg:items-start">
                    <h1 className="lg:text-[68px] lg:leading-[81px] text-3xl md:text-4xl z-10">
                        Guaranteed onchain interactions{" "}
                        <span className="inline-block">
                            <Image
                                src={checklistIconImg}
                                alt="checklist-icon"
                                className="transform translate-y-3 size-10 md:size-14"
                            />
                        </span>
                    </h1>

                    <p className="max-w-[670px] text-base font-medium pb-3">
                        Bid for attention from X's top voices, ensuring
                        guaranteed interactions - where fans and creators
                        connect for a{" "}
                        <span className="font-bold font-heading">
                            <span className="text-red-500">d</span>irect{" "}
                            <span className="text-red-500">answer</span>
                        </span>
                        !
                    </p>

                    <Button className="z-10" link="/dashboard">
                        Get Started
                    </Button>
                </div>

                <HeroSectionProductsImage />
            </PageContainer>
        </section>
    );
}
