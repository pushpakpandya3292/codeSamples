import service from "@/services";
import { BillSummary } from "./types";
import { ENDPOINTS } from "@/provider/constant";

export async function billSummary(
  props?: BillSummary.BillSummaryAPIPayload,
): Promise<BillSummary.BillSummaryResponse> {
  return service({
    method: "GET",
    url: `${ENDPOINTS.BILL_SUMMARY}/${props?.id?.userId}`,
  });
}
