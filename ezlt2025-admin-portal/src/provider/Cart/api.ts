import service from "@/services";
import { Cart } from "./types";
import { ENDPOINTS } from "../constant";

export async function cart(
  props: Cart.CartAPIPayload,
): Promise<Cart.CartResponse> {
  return service({
    method: "GET",
    url: `${ENDPOINTS.CART}/${props.id}`,
  });
}

export async function update(
  props: Cart.CartAPIPatchPayload,
): Promise<Cart.CartPatchResponse> {
  return service({
    url: `${ENDPOINTS.CART}/status/${props.id}`,
    method: "PATCH",
    body: props.data,
  });
}

export async function updateOrderStatus(
  props: Cart.CartOrderStatusAPIPayload,
): Promise<Cart.CartOrderStatusResponse> {
  return service({
    url: ENDPOINTS.CART_ORDER_STATUS,
    method: "POST",
    body: props.data,
  });
}

export async function updateManualDetails(
  props: Cart.CartAPIPutPayload,
): Promise<Cart.CartPatchResponse> {
  return service({
    url: `${ENDPOINTS.CART_MANUAL_DETAILS}/${props.id}`,
    method: "PUT",
    body: props.data,
  });
}

export async function updateGeneral(
  props: Cart.CartAPIPatchPayload,
): Promise<Cart.CartPatchResponse> {
  return service({
    url: `${ENDPOINTS.CART}/${props.id}`,
    method: "PATCH",
    body: props.data,
  });
}

export async function userCart(
  props: Cart.UserCartprops,
): Promise<Cart.UsserCartResponse> {
  return service({
    method: "GET",
    url: `${ENDPOINTS.CART}/client/listing`,
    queryParams: {
      limit: props?.limit,
      page:props?.page,
      userId: props?.userId,
      "filters[user]": props?.filterId,
    },
  });
}

export async function userOrders(
  props: Cart.UserOrdersprops,
): Promise<Cart.UserOrdersResponse> {
  return service({
    method: "GET",
    url: `${ENDPOINTS.CART}/order/listing`,
    queryParams: {
      page: props?.page,
      limit: props?.limit,
      userId: props?.userId,
      status: props?.status,
      paymentStatus: props?.paymentStatus,
    },
  });
}
