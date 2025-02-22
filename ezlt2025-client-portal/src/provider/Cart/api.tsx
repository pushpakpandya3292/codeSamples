import service from "@/services";
import { Cart } from "./types";
import { ENDPOINTS } from "../constant/endpoints";

export async function Create(
  payload: Cart.CreateAPIPayload,
): Promise<Cart.CreateResponse> {
  return service({
    url: ENDPOINTS.CART,
    method: "POST",
    body: payload.data,
  });
}

export async function Delete(
  payload: Cart.DeleteAPIPayload,
): Promise<Cart.DeleteResponse> {
  return service({
    url: `${ENDPOINTS.CART}/${payload.data.id}`,
    method: "DELETE",
  });
}
