import { adminApp } from "@/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const accessToken = token.replace("Bearer ", "");

  const auth = getAuth(adminApp);
  const decodedToken = await auth
    .verifySessionCookie(accessToken, true)
    .catch((error) => console.log(error));

  if (decodedToken) {
    const user = await auth.getUser(decodedToken.uid);
    return NextResponse.json({
      message: "User is authenticated",
      user: { uid: user.uid, email: user.email },
    });
  }

  return NextResponse.json(
    {
      error: "Unauthenticated",
      message: "The access token provided is invalid",
    },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get("client_id");
  const redirectUri = url.searchParams.get("redirect_uri");

  const body = await request.json();

  const payload = {
    clientId,
    idToken: body.token,
    expires: Date.now() + 1000 * 60 * 60 * 1, // 1 hour
  };
  const code = await jwt.sign(payload, process.env.JWT_KEY ?? "");

  return NextResponse.json({ code, redirectUri });
}
