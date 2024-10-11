import {
    checklistIconImg,
    creatorAvatar1Img,
    creatorAvatar2Img,
    dansrProduct1Img,
} from "@dansr/common-assets";
import { Button } from "@dansr/common-ui";
import { PageContainer } from "@dansr/common-ui/server";
import Image from "next/image";

export function HeroSection() {
    return (
        <section id="hero-section" className="relative pt-14">
            <Image
                src={creatorAvatar1Img}
                alt="creator-avatar-1"
                className="absolute top-[560px] left-[140px] hidden xl:block"
            />

            <Image
                src={creatorAvatar2Img}
                alt="creator-avatar-2"
                className="absolute h-[200px] w-[200px] -top-4 left-[460px] transform -rotate-[18] hidden xl:block"
            />

            <PageContainer className="flex justify-center flex-col-reverse lg:flex-row lg:justify-between items-center gap-4">
                <div className="items-center text-center lg:text-left space-y-6 flex-1 flex flex-col justify-center lg:items-start">
                    <h1 className="lg:text-[68px] leading-[81px] text-3xl">
                        Guaranteed onchain interactions{" "}
                        <span className="inline-block">
                            <Image
                                src={checklistIconImg}
                                alt="checklist-icon"
                                className="transform translate-y-3"
                            />
                        </span>
                    </h1>

                    <p className="max-w-[670px] text-sm md:text-base font-medium pb-3">
                        Bid for attention from X's top voices, ensuring
                        guaranteed interactions - where fans and creators
                        connect for a{" "}
                        <span className="font-bold font-heading">
                            <span className="text-red-500">d</span>irect{" "}
                            <span className="text-red-500">answer</span>
                        </span>
                        !
                    </p>

                    <Button link="/dashboard">Get Started</Button>
                </div>

                <div className="space-y-4">
                    <p className="text-center text-3xl font-heading">
                        Insights into Your Success
                    </p>
                    <Image src={dansrProduct1Img} alt="dansr-product-1" />
                </div>
            </PageContainer>
        </section>
    );
}
