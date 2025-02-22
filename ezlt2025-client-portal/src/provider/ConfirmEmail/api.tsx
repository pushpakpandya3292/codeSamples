import service from "@/services";
import { ConfirmEmail } from "./type";
import { ENDPOINTS } from "../constant/endpoints";

export async function confirmEmail(
  payload: ConfirmEmail.ConfirmEmailAPIPayload,
): Promise<ConfirmEmail.ConfirmEmailResponse> {
  return service({
    url: ENDPOINTS.CONFIRM_EMAIL,
    method: "POST",
    body: payload.data,
  });
}
