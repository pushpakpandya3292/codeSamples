import service from "@/services";
import { Questionnaire } from "./type";
import { ENDPOINTS } from "../constant/endpoints";

export async function questionnaire(
  payload: Questionnaire.QuestionnaireAPIPayload,
): Promise<Questionnaire.QuestionnaireResponse> {
  return service({
    url: ENDPOINTS.QUESTIONNAIRE,
    body: payload.data,
    method: "POST",
    queryParams: { clientDetailId: payload.data.clientDetailId },
  });
}
