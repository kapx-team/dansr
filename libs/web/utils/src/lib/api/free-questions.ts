import type { AddFreeQuestionApiResponse } from "@dansr/common-types";
import type { AddFreeQuestionSchema } from "@dansr/common-validators";
import type { KyInstance } from "ky";

export function getApiFreeQuestionsService(apiInstance: KyInstance) {
    async function addFreeQuestion(data: AddFreeQuestionSchema) {
        const response = await apiInstance
            .post("free-questions", { json: data })
            .json<AddFreeQuestionApiResponse>();

        return response;
    }

    return {
        addFreeQuestion,
    };
}
