import prisma from "@/prisma/db";
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const uid = await verifyRole(
    request.headers.get("Authorization") || "",
    "admin"
  );
  if (typeof uid !== "string") return uid;

  const blog = await prisma.blog.delete({ where: { uid: params.uid } });
  return NextResponse.json(
    { blog, message: "Blog Deleted Successfully" },
    { status: 200 }
  );
}
