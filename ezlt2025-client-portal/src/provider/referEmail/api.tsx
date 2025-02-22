import service from "@/services";
import { referEmail } from "./type";
import { ENDPOINTS } from "../constant/endpoints";

export async function ReferEmail(
  payload: referEmail.referEmailAPIPayload,
): Promise<referEmail.referEmailResponse> {
  return service({
    url: ENDPOINTS.REFFER_EMAIL,
    body: payload.data,
    method: "POST",
  });
}
