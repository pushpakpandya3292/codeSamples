import { adminApp } from "@/firebase-admin";
import prisma from "@/prisma/db";
import verifyRole from "@/utils/verifyRole";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

const auth = getAuth(adminApp);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const uid = await verifyRole(
    request.headers.get("Authorization") || "",
    "admin"
  );
  if (typeof uid !== "string") return uid;

  const data = await request.json();
  const user = await prisma.user.update({
    where: { uid: params.uid },
    data: data,
  });

  return NextResponse.json(
    { user, message: "User Updated Successfully" },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const uid = await verifyRole(
    request.headers.get("Authorization") || "",
    "admin"
  );
  if (typeof uid !== "string") return uid;

  const firebaseRequest = auth.deleteUser(params.uid);
  const dbRequest = prisma.user.delete({ where: { uid: params.uid } });

  const [firebaseResponse, user] = await Promise.all([
    firebaseRequest,
    dbRequest,
  ]);
  return NextResponse.json(
    { user, message: "User Deleted Successfully" },
    { status: 200 }
  );
}
