import { adminApp } from "@/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const auth = getAuth(adminApp);

export async function POST(request: NextRequest) {
  // Expire in 14 days
  const expiresIn = 1000 * 60 * 60 * 24 * 14;
  const data = await request.json();

  const sessionCookie = await auth.createSessionCookie(data.token, {
    expiresIn,
  });

  const requestCookie = cookies().set("token", sessionCookie, {
    maxAge: expiresIn,
  });

  return NextResponse.json({ requestCookie });
}
