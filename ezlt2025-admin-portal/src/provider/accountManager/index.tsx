import {
  QueryClient,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import * as api from "./api";
import { AccountManager } from "./type";

const KEY = "AccountManager";

export function getKeyFromProps(props: any, type: "LISTING"): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}
//Listing
export function useAccountManagerListing(
  props?: AccountManager.AccountManagerProps,
): UseQueryResult<AccountManager.AccountManagerResponse> {
  return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
}

//manager invitation
export function useAccountManager(
  props: AccountManager.AccountManagerCreateProps = {},
): UseMutationResult<
  AccountManager.AccountManagerCreateResponse,
  {
    message?: string;
  },
  AccountManager.AccountManagerCreateAPIMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => api.AccountManagerInvite({ ...props, data: payload }),
    {
      mutationKey: `${KEY} | Create`,
      retry: 0,
      onSuccess: () => {
        queryClient.invalidateQueries(["AccountManager"]);
      },
    },
  );
}

export function useAccountManagerUpdate(
  props: AccountManager.AccountManagerPatchProps,
): UseMutationResult<
  AccountManager.AccountManagerPatchResponse,
  {
    message?: string;
  },
  AccountManager.AccountManagerAPIPatchPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.updateAccountManager(payload), {
    mutationKey: `${KEY}|Update`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
    },
    retry: 0,
  });
}

export function useDeleteAccountManager(
  props: AccountManager.DeleteAccountManagerProps,
): UseMutationResult<void, Error, string> {
  return useMutation(() => api.deleteAccountManager(props));
}

export function useBlockAccountManager(
  props: AccountManager.DeleteAccountManagerProps,
): UseMutationResult<void, Error, string> {
  return useMutation(() => api.blockAccountManager(props));
}

export function useUnblockAccountManager(
  props: AccountManager.DeleteAccountManagerProps,
): UseMutationResult<void, Error, string> {
  return useMutation(() => api.unblockAccountManager(props));
}
