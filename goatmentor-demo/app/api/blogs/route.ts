import prisma from "@/prisma/db";
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await verifyRole(token, "blogger");
  if (typeof uid !== "string") return uid;

  const data = await request.json();
  const blog = await prisma.blog.create({ data: { authorId: uid, ...data } });

  return NextResponse.json(
    { blog, message: "Blog Created Successfully" },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const requestUid = await verifyRole(token, "blogger");
  if (typeof requestUid !== "string") return requestUid;

  const { uid, ...data } = await request.json();

  const updateData = { ...data };

  const adminRequest = verifyRole(token, "admin");
  const blogRequest = prisma.blog.findUnique({
    where: { uid },
    select: { authorId: true },
  });
  const [adminUid, initialBlog] = await Promise.all([
    adminRequest,
    blogRequest,
  ]);

  if (typeof adminUid !== "string" && requestUid !== initialBlog?.authorId)
    return adminUid;

  if (data.published !== undefined) {
    if (typeof adminUid !== "string") return adminUid;
    if (data.published) {
      updateData.publishedAt = new Date();
    } else {
      updateData.publishedAt = null;
    }
  }

  const blog = await prisma.blog.update({
    where: { uid },
    data: updateData,
  });

  return NextResponse.json(
    { blog, message: "Blog Updated Successfully" },
    { status: 200 }
  );
}
