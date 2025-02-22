import { adminApp } from "@/firebase-admin";
import prisma from "@/prisma/db";
import { Role } from "@prisma/client";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const auth = getAuth(adminApp);

export default async function verifyRole(accessToken: string, role: Role) {
  const decodedToken = await auth
    .verifySessionCookie(accessToken, true)
    .catch((error) => console.log(error));

  if (decodedToken) {
    const user = await prisma.user.findUnique({
      where: { uid: decodedToken.uid },
    });
    if (user) {
      if (
        user.roles.includes("admin") ||
        user.roles.includes(role) ||
        role === "user"
      )
        return user.uid;
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
}

export async function routeVerifyRole(role: Role) {
  const cookieStore = cookies();
  const uid = await verifyRole(cookieStore.get("token")?.value ?? "", role);
  if (typeof uid !== "string") throw new Error(`${uid.status}`);
  return uid;
}
