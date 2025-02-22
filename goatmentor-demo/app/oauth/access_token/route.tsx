import { adminApp } from "@/firebase-admin";
import prisma from "@/prisma/db";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const clientId = url.searchParams.get("client_id");
  const clientSecret = url.searchParams.get("client_secret");
  const code = url.searchParams.get("code");
  const redirectUri = url.searchParams.get("redirect_uri");

  if (!redirectUri || !clientId || !code || !clientSecret) {
    return NextResponse.json(
      {
        error: "invalid_request",
        message:
          "Please provide both client_id, client_secret, code and redirect_uri parameters",
      },
      { status: 400 }
    );
  }

  const payload = jwt.decode(code);
  let getResponse = (message: string) =>
    NextResponse.json({ error: "invalid_request", message }, { status: 400 });
  if (!payload || typeof payload === "string") {
    return getResponse("Invalid code");
  } else if (payload.clientId !== clientId) {
    return getResponse("Invalid client_id");
  } else if (payload.expires < Date.now()) {
    return getResponse("Code has expired");
  }

  const client = await prisma.ssoApp.findUnique({
    where: { clientId },
  });
  if (!client) {
    return getResponse("Invalid client_id");
  } else if (client.clientSecret !== clientSecret) {
    return getResponse("Invalid client_secret");
  } else if (!client.redirectUris.includes(redirectUri)) {
    return getResponse("Invalid redirect_uri");
  }

  // Expire in 14 days
  const expiresIn = 1000 * 60 * 60 * 24 * 14;
  const auth = getAuth(adminApp);
  const sessionCookie = await auth.createSessionCookie(payload.idToken, {
    expiresIn,
  });

  return NextResponse.json({
    access_token: sessionCookie,
    token_type: "Bearer",
    expires_in: expiresIn,
  });
}
