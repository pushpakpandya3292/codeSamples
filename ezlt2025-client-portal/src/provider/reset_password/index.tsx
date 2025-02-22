import { UseMutationResult, useMutation } from "react-query";

import * as api from "./api";
import { ResetPassword } from "./type";

const KEY = "ResetPassword";

export function useResetPassword(
  props: ResetPassword.ResetPasswordProps = {}
): UseMutationResult<
  ResetPassword.ResetPasswordResponse,
  {
    message?: string;
  },
  ResetPassword.ResetPasswordAPIMutationPayload
> {
  return useMutation(
    (payload) => api.ResetPassword({ ...props, data: payload }),
    {
      mutationKey: `${KEY} | Create`,
      retry: 0,
    }
  );
}
