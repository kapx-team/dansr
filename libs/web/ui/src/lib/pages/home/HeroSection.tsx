import {
    creatorAvatar1Img,
    creatorAvatar2Img,
    questionMarkImg,
} from "@dansr/common-assets";
import { Logo, PageContainer } from "@dansr/common-ui/server";
import Image from "next/image";
import { QuestionForm } from "./QuestionForm";

export function HeroSection() {
    return (
        <PageContainer className="relative flex flex-col items-center justify-center gap-4 py-14 lg:py-24">
            <h1 className="flex flex-col text-center lg:text-[66px] gap-2 lg:gap-8 text-3xl font-bold mb-4 lg:mb-8">
                <span>Got a question for someone famous?</span>
                <span className="flex items-center justify-center gap-3">
                    Get your
                    <span className="-mt-2">
                        <Logo className="lg:w-40 w-20" />
                    </span>
                </span>
            </h1>

            <p className="text-center max-w-[670px] mb-8 lg:mb-16 text-sm md:text-base font-medium">
                If you could ask a question to absolutely anyone on X and would
                be guaranteed a response that would appear on your feed, what
                would that question be — and to whom? Tell us below, and we may
                just get a{" "}
                <span className="font-bold">
                    <span className="text-red-500">d</span>irect{" "}
                    <span className="text-red-500">answer</span>
                </span>
                !
            </p>

            <Image
                src={questionMarkImg}
                alt="question-mark"
                className="absolute top-72 right-4 hidden xl:block"
            />

            <Image
                src={creatorAvatar1Img}
                alt="creator-avatar-1"
                className="absolute top-[640px] left-0 hidden xl:block"
            />

            <Image
                src={creatorAvatar2Img}
                alt="creator-avatar-2"
                className="absolute top-[430px] right-0 hidden xl:block"
            />

            <QuestionForm />
        </PageContainer>
    );
}
