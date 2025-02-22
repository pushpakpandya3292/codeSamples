import { adminApp } from "@/firebase-admin";
import { getAuth } from "firebase-admin/auth";
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
    return NextResponse.json(user.toJSON());
  }

  return NextResponse.json(
    {
      error: "Unauthenticated",
      message: "The access token provided is invalid",
    },
    { status: 401 }
  );
}
