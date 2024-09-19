"use client";

import {
    Button,
    FormControl,
    Input,
    InputBox,
    Label,
    ToastNotification,
} from "@dansr/common-ui";
import {
    addFreeQuestionsSchema,
    type AddFreeQuestionSchema,
} from "@dansr/common-validators";
import { useSubmitFreeQuestion } from "@dansr/web-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function QuestionForm() {
    const { mutateAsync, isPending } = useSubmitFreeQuestion();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<AddFreeQuestionSchema>({
        resolver: zodResolver(addFreeQuestionsSchema),
    });

    console.log(errors, { values: getValues() });

    async function handleSubmitQuestionForm(data: AddFreeQuestionSchema) {
        const toast = new ToastNotification();

        try {
            toast.loading("Submitting question...");
            await mutateAsync(data);
            toast.success("Question submitted successfully!");
        } catch (error) {
            console.error("handleSubmitQuestionForm =>", error);
            toast.error("Failed to submit question! Please try again later.");
        }
    }

    return (
        <form
            className="flex flex-col gap-4 bg-gradient-primary-2 lg:p-8 p-4 rounded-[32px] w-full max-w-[724px] items-center"
            id="question-form"
            onSubmit={handleSubmit(handleSubmitQuestionForm)}
        >
            <div className="bg-primary-1 lg:p-10 p-6 rounded-3xl w-full">
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
            </div>

            <Button className="w-fit" type="submit" isLoading={isPending}>
                Submit Question
            </Button>
        </form>
    );
}
