import service from "@/services";

// Login
export async function login({
  email,
  password,
  deviceId,
  language,
  fcmToken,
}: {
  email: string;
  password: string;
  deviceId?: string;
  language?: number;
  fcmToken?: string;
}) {
  return service({
    method: "POST",
    noAuth: true,
    url: `/auth/admin/login`,
    body: {
      email,
      password,
      deviceId,
      language,
      fcmToken,
    },
  });
}

export async function getUser(token: string) {
  return service({
    method: "GET",
    url: "/auth/me",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function refreshToken(token: string) {
  return service({
    method: "POST",
    url: "/auth/refresh",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
