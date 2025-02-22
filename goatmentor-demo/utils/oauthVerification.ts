import prisma from "@/prisma/db";
import { SsoApp } from "@prisma/client";

export const oauthVerification = async (searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<string | SsoApp> => {
  const redirectUri = searchParams.redirect_uri;
  const clientId = searchParams.client_id;

  if (!redirectUri || !clientId) {
    return "Please provide both client_id and redirect_uri parameters";
  }
  const client = await prisma.ssoApp.findUnique({
    where: { clientId: clientId as string },
  });
  if (!client) {
    return "Invalid client_id";
  } else if (!client.redirectUris.includes(redirectUri as string)) {
    return "Invalid redirect_uri";
  }

  return client;
};
