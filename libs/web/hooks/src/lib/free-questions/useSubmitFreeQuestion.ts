import { apiClient } from "@dansr/web-utils";
import { useMutation } from "@tanstack/react-query";

export function useSubmitFreeQuestion() {
    return useMutation({
        mutationFn: apiClient.freeQuestions.addFreeQuestion,
    });
}
