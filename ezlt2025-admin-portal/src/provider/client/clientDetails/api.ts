import service from "@/services";
import { ClinetDetail } from "./types";
import { ENDPOINTS } from "@/provider/constant";

export async function listing(
  props?: ClinetDetail.ListingAPIPayload,
): Promise<ClinetDetail.ListingResponse> {
  return service({
    method: "GET",
    url: `${ENDPOINTS.USER_DETAILS}/${props?.id}`,
  });
}

export async function update(
  props: ClinetDetail.UpdatePatchProps,
): Promise<ClinetDetail.UpdateResponse> {
  return service({
    url: `${ENDPOINTS.USER_DETAILS_UPDATE}?clientDetailId=${props.clientDetailId}`,
    method: "PATCH",
    body: props.data,
  });
}

export async function deactivateUser(
  props: ClinetDetail.DeactivateUserProps,
): Promise<void> {
  return service({
    method: "POST",
    url: `${ENDPOINTS.GET_CLIENTS}/${props.id}/deactivate`,
    body: { reason: props?.reason },
  });
}

export async function activateUser(
  props: ClinetDetail.ActivateUserProps,
): Promise<void> {
  return service({
    method: "POST",
    url: `${ENDPOINTS.GET_CLIENTS}/${props.id}/activate`,
  });
}

export async function deleteUser(
  props: ClinetDetail.DeleteUserProps,
): Promise<void> {
  return service({
    method: "DELETE",
    url: `${ENDPOINTS.GET_CLIENTS}/${props.id}/deleteUser`,
  });
}
