import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string; comment: string } }
) {
  const uid = await decodeToken(request.headers.get("Authorization") || "");
  if (typeof uid !== "string") return uid;

  const like = await prisma.blogCommentLike.create({
    data: { commentId: params.comment, userId: uid },
  });

  return NextResponse.json(
    { like, message: "Liked comment Successfully" },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string; comment: string } }
) {
  const uid = await decodeToken(request.headers.get("Authorization") || "");
  if (typeof uid !== "string") return uid;

  const like = await prisma.blogCommentLike.deleteMany({
    where: { commentId: params.comment, userId: uid },
  });

  return NextResponse.json(
    { like, message: "Unliked comment Successfully" },
    { status: 200 }
  );
}
