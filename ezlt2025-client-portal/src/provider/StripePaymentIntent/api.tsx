import service from "@/services";
import { StripeIntent } from "./types";
import { ENDPOINTS } from "../constant/endpoints";

export async function StripePaymentIntent(
  payload: StripeIntent.StripeIntentAPIMutationPayload,
): Promise<StripeIntent.StripeIntentResponse> {
  return service({
    url: ENDPOINTS.STRIPEINTENT,
    method: "POST",
    body: payload.data,
  });
}
