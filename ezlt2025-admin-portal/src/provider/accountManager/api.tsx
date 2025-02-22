import service from "@/services";
import type { AccountManager } from "./type";
import { ENDPOINTS } from "../constant";

//Listing
export async function listing(
  props?: AccountManager.AccountManagerProps,
): Promise<AccountManager.AccountManagerResponse> {
  return service({
    method: "GET",
    url: ENDPOINTS.ACCOUNT_MANAGER + "/account-manager-listing",
    queryParams: {
      page: props?.page,
      limit: props?.limit,
      status: props?.status,
    },
  });
}

export async function AccountManagerInvite(
  payload: AccountManager.AccountManagerCreateAPIPayload,
): Promise<AccountManager.AccountManagerCreateResponse> {
  return service({
    url: ENDPOINTS.INVITE,
    method: "POST",
    body: payload.data,
  });
}

export async function updateAccountManager(
  props: AccountManager.AccountManagerAPIPatchPayload,
): Promise<AccountManager.AccountManagerPatchResponse> {
  return service({
    method: "PATCH",
    url: ENDPOINTS.ACCOUNT_MANAGER_UPDATE,
    body: props.data,
    queryParams: { accountManagerId: props.accountManagerId },
  });
}

export async function deleteAccountManager(
  props: AccountManager.DeleteAccountManagerProps,
): Promise<void> {
  return service({
    method: "DELETE",
    url: `${ENDPOINTS.ACCOUNT_MANAGER}/${props.selectedAccountManager}/deleteAccountManager`,
  });
}

export async function blockAccountManager(
  props: AccountManager.DeleteAccountManagerProps,
): Promise<void> {
  return service({
    method: "POST",
    url: `${ENDPOINTS.ACCOUNT_MANAGER}/${props.selectedAccountManager}/deactivate`,
  });
}

export async function unblockAccountManager(
  props: AccountManager.DeleteAccountManagerProps,
): Promise<void> {
  return service({
    method: "POST",
    url: `${ENDPOINTS.ACCOUNT_MANAGER}/${props.selectedAccountManager}/activate`,
  });
}
