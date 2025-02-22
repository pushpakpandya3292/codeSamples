import { UseMutationResult, useMutation } from "react-query";

import * as api from "./api";
import { Questionnaire } from "./type";

const KEY = "Questionnaire";

export function useQuestionnaire(
  props: Questionnaire.QuestionnaireProps = {},
): UseMutationResult<
  Questionnaire.QuestionnaireResponse,
  {
    message?: string;
  },
  Questionnaire.QuestionnaireAPIMutationPayload
> {
  return useMutation((payload) => api.questionnaire({ ...props, data: payload }), {
    mutationKey: `${KEY} | Create`,
    onSuccess: () => {
    },
    onError: (err: any) => {
    },
    retry: 0,
  });
}