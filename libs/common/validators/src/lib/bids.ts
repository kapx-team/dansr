import { z } from "zod";

export const answerBidSchema = z.object({
    answer: z
        .string({
            required_error: "Answer is required",
            invalid_type_error: "Answer must be a string",
        })
        .min(3, {
            message: "Answer must be at least 3 character",
        }),
});
