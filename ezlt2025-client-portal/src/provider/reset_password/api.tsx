import service from "@/services";
import type { ResetPassword } from "./type";
import { ENDPOINTS } from "../constant/endpoints";

export async function ResetPassword(
  payload: ResetPassword.ResetPasswordAPIPayload,
): Promise<ResetPassword.ResetPasswordResponse> {
  return service({
    url: ENDPOINTS.RESET_PASSWORD,
    method: "POST",
    body: payload.data,
  });
}
