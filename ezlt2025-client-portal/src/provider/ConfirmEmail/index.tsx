import { UseMutationResult, useMutation } from "react-query";

import * as api from "./api";
import { ConfirmEmail } from "./type";

const KEY = "ConfirmEmail";

export function useConfirmEmail(
  props: ConfirmEmail.ConfirmEmailProps = {},
): UseMutationResult<
  ConfirmEmail.ConfirmEmailResponse,
  {
    message?: string;
  },
  ConfirmEmail.ConfirmEmailAPIMutationPayload
> {
  return useMutation(
    (payload) => api.confirmEmail({ ...props, data: payload }),
    {
      mutationKey: `${KEY} | Create`,
      retry: 0,
    },
  );
}
