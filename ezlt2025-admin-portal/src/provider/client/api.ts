import service from "@/services";
import { Client } from "./types";
import { ENDPOINTS } from "../constant";

export async function listing(
  props?: Client.ListingAPIPayload,
): Promise<Client.ListingResponse> {
  return service({
    method: "GET",
    url: ENDPOINTS.GET_CLIENTS,
    queryParams: {
      page: props?.page,
      limit: props?.limit,
      "filters[user]": props?.filterId,
      userId: props?.userId,
    },
  });
}
