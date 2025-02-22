import prisma from "@/prisma/db";
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await verifyRole(token, "admin");
  if (typeof uid !== "string") return uid;

  const data = await request.json();

  const clientSecret = uuidv4();
  const app = await prisma.ssoApp.create({ data: { clientSecret, ...data } });

  return NextResponse.json(
    { app, message: "App Created Successfully" },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const requestUid = await verifyRole(token, "admin");
  if (typeof requestUid !== "string") return requestUid;

  const { clientId, ...data } = await request.json();

  const app = await prisma.ssoApp.update({
    where: { clientId },
    data: data,
  });

  return NextResponse.json(
    { app, message: "App Updated Successfully" },
    { status: 200 }
  );
}
