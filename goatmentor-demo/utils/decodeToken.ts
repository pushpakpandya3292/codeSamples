import { adminApp } from "@/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

const auth = getAuth(adminApp);

export default async function decodeToken(accessToken: string) {
  const decodedToken = await auth
    .verifySessionCookie(accessToken, true)
    .catch((error) => console.log(error));

  if (decodedToken) return decodedToken.uid;

  return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
}
