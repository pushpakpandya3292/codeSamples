import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as api from "./api";
import { Cart } from "./types";

const KEY = "Cart";

export function getKeyFromProps(props: any, type: "CART"): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

// document CART info
export function useCart(
  props: Cart.CartProps,
): UseQueryResult<Cart.CartResponse> {
  return useQuery(getKeyFromProps(props, "CART"), () => api.cart(props));
}

export function useCartUpdate(
  props: Cart.CartAPIPatchPayload,
): UseMutationResult<
  Cart.CartPatchResponse,
  {
    message?: string;
  },
  Cart.CartAPIPatchPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.update({ ...props, ...payload }), {
    mutationKey: `${KEY}|Update`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
      queryClient.invalidateQueries(["STATS"]);
    },
    retry: 0,
  });
}

export function useCartUpdateManualDetails(
  props: Cart.CartAPIPatchPayload,
): UseMutationResult<
  Cart.CartPatchResponse,
  {
    message?: string;
  },
  Cart.CartAPIPutPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.updateManualDetails(payload), {
    mutationKey: `${KEY}|UpdateManualDetails`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
      queryClient.invalidateQueries(["STATS"]);
    },
    retry: 0,
  });
}


export function useCartUpdateGeneral(
  props: Cart.CartAPIPatchPayload,
): UseMutationResult<
  Cart.CartPatchResponse,
  {
    message?: string;
  },
  Cart.CartAPIPatchPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.updateGeneral({ ...props, ...payload }), {
    mutationKey: `${KEY}|Update`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
    },
    retry: 0,
  });
}

export function useCartOrderStatus(
  props: Cart.CartAPIPatchPayload,
): UseMutationResult<
  Cart.CartOrderStatusResponse,
  {
    message?: string;
  },
  Cart.CartOrderStatusAPIPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.updateOrderStatus(payload), {
    mutationKey: `${KEY}|OrderStatusUpdate`,
    onSuccess: () => {
      queryClient.invalidateQueries([KEY]);
    },
    retry: 0,
  });
}

export function useUserCart(
  props: Cart.UserCartprops,
): UseQueryResult<Cart.UsserCartResponse> {
  return useQuery(getKeyFromProps(props, "CART"), () => api.userCart(props));
}

export function useUserOrders(
  props: Cart.UserOrdersprops,
): UseQueryResult<Cart.UserOrdersResponse> {
  return useQuery(getKeyFromProps(props, "CART"), () => api.userOrders(props));
}
