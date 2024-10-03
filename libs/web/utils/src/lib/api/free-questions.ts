import type { AddFreeQuestionApiResponse } from "@dansr/common-types";
import type { AddFreeQuestionSchema } from "@dansr/common-validators";
import type { KyInstance } from "ky";

export function getApiFreeQuestionsService(apiInstance: KyInstance) {
    async function addFreeQuestion(data: AddFreeQuestionSchema) {
        const response = await apiInstance
            .post("free-questions", { json: data })
            .json<AddFreeQuestionApiResponse>();

        if (!response.success) {
            throw new Error("Failed to add free question!");
        }

        return response.result;
    }

    return {
        addFreeQuestion,
    };
}
