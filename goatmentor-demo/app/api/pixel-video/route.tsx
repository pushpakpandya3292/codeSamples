import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const user = await prisma.user.update({
    where: { uid },
    data: { watchedPixelWinner: true },
  });

  return NextResponse.json(
    { user, message: "Video watched Successfully" },
    { status: 201 }
  );
}
