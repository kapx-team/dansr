import { createDbFreeQuestionsService } from "@dansr/api-services/db";
import { ApiResponseHandler, validateReqBody } from "@dansr/api-utils";
import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { generateDbId } from "@dansr/common-db";
import type { AddFreeQuestionApiResponse } from "@dansr/common-types";
import { addFreeQuestionsSchema } from "@dansr/common-validators";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const dbUserService = createDbFreeQuestionsService();

        const bodyValidationResult = await validateReqBody({
            req,
            schema: addFreeQuestionsSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const { question, creatorHandle, userHandle } =
            bodyValidationResult.body;

        const freeQuestionId = generateDbId(DB_ID_PREFIXES.FREE_QUESTION);

        const freeQuestion = await dbUserService.addFreeQuestion({
            id: freeQuestionId,
            question,
            creatorHandle,
            userHandle,
        });

        // const xAskDansrClient = getXAskDansrClient();

        // const xPost = await xAskDansrClient.readWrite.v2.tweet(
        //     `"${userHandle}" asked: ${question} to "${creatorHandle}"`
        // );

        // if (xPost?.errors && xPost?.errors?.length > 0) {
        //     throw new Error(xPost?.errors[0].detail);
        // }

        return apiResponseHandler.success<AddFreeQuestionApiResponse>(
            freeQuestion,
            "Free question added successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
