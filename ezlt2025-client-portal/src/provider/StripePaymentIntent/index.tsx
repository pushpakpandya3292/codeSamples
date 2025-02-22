import { UseMutationResult, useMutation } from "react-query";

import * as api from "./api";
import { StripeIntent } from "./types";

const KEY = "StripePaymentIntent";

export function useStripePaymentIntent(
  props: StripeIntent.StripeIntentProps = {},
): UseMutationResult<
  StripeIntent.StripeIntentResponse,
  {
    message?: string;
  },
  StripeIntent.StripeIntentAPIMutationPayload
> {
  return useMutation(
    async (payload) =>
      await api.StripePaymentIntent({
        ...props,
        ...payload,
      }),
    {
      mutationKey: `${KEY} | Create`,
      retry: 0,
    },
  );
}
