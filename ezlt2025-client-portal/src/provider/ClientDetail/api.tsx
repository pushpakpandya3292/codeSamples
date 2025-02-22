import service from "@/services";
import { ClinetDetail } from "./types";
import { ENDPOINTS } from "../constant/endpoints";

export async function listing(
  props?: ClinetDetail.ListingAPIPayload
): Promise<ClinetDetail.ListingResponse> {
  return service({
    method: "GET",
    url: `${ENDPOINTS.CLIENTDETAIL}/${props?.id}`,
  });
}
