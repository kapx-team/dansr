"use client";

import { checkImg, crossImg, xIconImg } from "@dansr/common-assets";
import {
    Button,
    FormControl,
    Input,
    InputBox,
    Label,
    ToastNotification,
} from "@dansr/common-ui";
import { extractErrorMessage } from "@dansr/common-utils";
import {
    addFreeQuestionsSchema,
    type AddFreeQuestionSchema,
} from "@dansr/common-validators";
import { useSubmitFreeQuestion } from "@dansr/web-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function QuestionForm() {
    const { mutateAsync, isPending } = useSubmitFreeQuestion();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddFreeQuestionSchema>({
        resolver: zodResolver(addFreeQuestionsSchema),
    });

    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    async function handleSubmitQuestionForm(data: AddFreeQuestionSchema) {
        const toast = new ToastNotification();

        try {
            toast.loading("Submitting question...");
            const response = await mutateAsync(data);

            if (!response.success) {
                throw new Error(response.message);
            }

            setStatus("success");
            toast.success("Question submitted successfully!");
            reset();
        } catch (error) {
            const errorMessage = extractErrorMessage(
                error,
                "Failed to submit question! Please try again later."
            );
            console.error("handleSubmitQuestionForm =>", error);
            toast.error(errorMessage);
            setStatus("error");
        }
    }

    return (
        <form
            className="flex flex-col gap-4 bg-gradient-primary-2 lg:p-8 p-4 rounded-[32px] w-full max-w-[724px] items-center"
            id="question-form"
            onSubmit={handleSubmit(handleSubmitQuestionForm)}
        >
            <div className="bg-primary-1 lg:p-10 p-6 rounded-3xl w-full">
                {status === "success" && (
                    <div className="flex flex-col text-center items-center gap-4">
                        <Image src={checkImg} alt="check-icon" />
                        <div className="space-y-0">
                            <p>Your question is now in the spotlight!</p>
                            <p>
                                Stay tuned to us for a chance to get it{" "}
                                <span className="text-red-500">dansr</span>ed
                            </p>
                        </div>
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
                    </div>
                )}
                {status === "error" && (
                    <div className="flex flex-col items-center gap-4">
                        <Image src={crossImg} alt="cross-icon" />
                        <p>
                            Oops! There was a problem submitting your question.
                        </p>
                    </div>
                )}
                {status === "idle" && (
                    <>
                        <div className="flex gap-4 flex-wrap justify-between mb-10">
                            <FormControl
                                className="lg:w-[47%] w-full"
                                error={errors.creatorHandle?.message}
                            >
                                <Label>Hi</Label>
                                <Input
                                    placeholder="Creator username"
                                    register={register("creatorHandle")}
                                />
                            </FormControl>

                            <FormControl
                                className="lg:w-[47%] w-full"
                                error={errors.userHandle?.message}
                            >
                                <Label>I am</Label>
                                <Input
                                    placeholder="Your X username"
                                    register={register("userHandle")}
                                />
                            </FormControl>
                        </div>

                        <FormControl error={errors.question?.message}>
                            <Label>I want to ask</Label>
                            <InputBox
                                placeholder="Enter your question"
                                register={register("question")}
                            />
                        </FormControl>
                    </>
                )}
            </div>

            {status === "success" && (
                <Button
                    className="w-fit"
                    onClick={() => {
                        reset();
                        setStatus("idle");
                    }}
                >
                    Submit Another Question
                </Button>
            )}

            {status === "error" && (
                <Button
                    className="w-fit"
                    onClick={() => {
                        setStatus("idle");
                    }}
                >
                    Try Again
                </Button>
            )}

            {status === "idle" && (
                <Button className="w-fit" type="submit" isLoading={isPending}>
                    Submit Question
                </Button>
            )}
        </form>
    );
}
