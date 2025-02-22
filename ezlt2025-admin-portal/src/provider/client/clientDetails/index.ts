import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as api from "./api";
import { ClinetDetail } from "./types";

const KEY = "CLIENTDETAIL";

export function getKeyFromProps(props: any, type: "LISTING"): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

export function useClientDetail(
  props?: ClinetDetail.ListingProps,
): UseQueryResult<ClinetDetail.ListingResponse> {
  return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props), {
    enabled: props?.id ? true : false,
  });
}

export function useActionUpdate(
  props: ClinetDetail.UpdatePatch = {},
): UseMutationResult<
  ClinetDetail.UpdateResponse,
  {
    message?: string;
  },
  ClinetDetail.UpdatePatchProps
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.update(payload), {
    mutationKey: `${KEY}|Update`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
    },
    retry: 0,
  });
}

export function useDeactivateUser(
  props: ClinetDetail.DeactivateUserProps,
): UseMutationResult<void, Error, string> {
  return useMutation(() => api.deactivateUser(props));
}

export function useActivateUser(
  props: ClinetDetail.ActivateUserProps,
): UseMutationResult<void, Error, string> {
  return useMutation(() => api.activateUser(props));
}

export function useDeleteUser(
  props: ClinetDetail.DeleteUserProps,
): UseMutationResult<void, Error, string> {
  return useMutation(() => api.deleteUser(props));
}
