import { UseMutationResult, useMutation } from "react-query";

import * as api from "./api";
import { Register } from "./type";

const KEY = "Register";

export function useRegister(
  props: Register.RegisterProps = {},
): UseMutationResult<
  Register.RegisterResponse,
  {
    message?: string;
  },
  Register.RegisterAPIMutationPayload
> {
  return useMutation((payload) => api.Register({ ...props, data: payload }), {
    mutationKey: `${KEY} | Create`,
    retry: 0,
  });
}