import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import * as api from "./api";
import { Cart } from "./types";

const KEY = "CART";

export function getKeyFromProps(props: any, type: "LISTING"): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

export function useCreateCart(props: Cart.CreatePorps = {}): UseMutationResult<
  Cart.CreateResponse,
  {
    message?: string;
  },
  Cart.CreateAPIMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.Create({ ...props, data: payload }), {
    mutationKey: `${KEY} | Create`,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries(["UserDetail"]);
    },
  });
}

export function useDeleteCart(props: Cart.DeleteProps = {}): UseMutationResult<
  Cart.DeleteResponse,
  {
    message?: string;
  },
  Cart.DeleteAPIMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.Delete({ ...props, data: payload }), {
    mutationKey: `${KEY} | DELETE`,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries(["UserDetail"]);
    },
  });
}
