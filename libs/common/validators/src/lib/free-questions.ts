import { z } from "zod";

export const addFreeQuestionsSchema = z.object({
    question: z
        .string({
            required_error: "Question is required",
            invalid_type_error: "Question must be a string",
        })
        .min(10, { message: "Question must be at least 10 characters" }),
    creatorHandle: z
        .string({
            required_error: "Creator handle is required",
            invalid_type_error: "Creator handle must be a string",
        })
        .min(3, { message: "Creator handle must be at least 3 characters" })
        .transform((value) => value.replace(/^@+/, "")),
    userHandle: z
        .string({
            required_error: "Your handle is required",
            invalid_type_error: "Your handle must be a string",
        })
        .min(3, { message: "Your handle must be at least 3 characters" })
        .transform((value) => value.replace(/^@+/, "")),
});

export type AddFreeQuestionSchema = z.infer<typeof addFreeQuestionsSchema>;
