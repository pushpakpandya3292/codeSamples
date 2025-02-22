import service from "@/services";
import type { Register } from "./type";
import { ENDPOINTS } from "../constant/endpoints";

export async function Register(
  payload: Register.RegisterAPIPayload,
): Promise<Register.RegisterResponse> {
  return service({
    url: ENDPOINTS.REGISTER,
    method: "POST",
    body: payload.data,
  });
}
