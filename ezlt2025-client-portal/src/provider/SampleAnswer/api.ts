import service from "@/services";
import { SampleAnswer } from "./types";
import { ENDPOINTS } from "../constant/endpoints";

export async function sampleAnswersDetailsListing(
  props?: SampleAnswer.SampleAnswerDetailsListingProps,
): Promise<SampleAnswer.SampleAnswerDetailsListingResponse> {
  return service({
    method: "GET",
    url: ENDPOINTS.SAMPLE_ANSWER_DETAILS,
    queryParams: {
      marriageStatus: props?.marriageStatus,
      category: props?.category,
    },
  });
}
