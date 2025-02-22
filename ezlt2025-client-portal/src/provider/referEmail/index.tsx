import { UseMutationResult, useMutation, } from "react-query";

import * as api from "./api";
import { referEmail } from "./type";

const KEY = "referEmail";

export function useReferEmail(
  props: referEmail.referEmailProps = {},
): UseMutationResult<
  referEmail.referEmailResponse,
  {
    message?: string;
  },
  referEmail.referEmailAPIMutationPayload
> {

  return useMutation((payload) => api.ReferEmail({ ...props, data: payload }), {
    mutationKey: `${KEY} | Create`,
    retry: 0,
  });
}