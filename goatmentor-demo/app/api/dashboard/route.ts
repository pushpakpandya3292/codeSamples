import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const user = await prisma.user.findUnique({
    where: { uid: uid },
    include: {
      applications: {
        include: {
          position: { select: { title: true, tags: true, uid: true } },
        },
        select: { status: true, uid: true },
      },
      enrollments: {
        include: {
          course: { select: { title: true, uid: true, thumbnail: true } },
        },
        select: { uid: true, progress: true },
      },
    },
  });

  return NextResponse.json(
    {
      courses: user?.enrollments,
      applications: user?.applications,
      message: "User fetched",
    },
    { status: 200 }
  );
}
