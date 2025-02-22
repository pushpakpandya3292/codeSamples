import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { transporter } from "@/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";
import format from "string-template";

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const uid = await decodeToken(request.headers.get("Authorization") || "");
  if (typeof uid !== "string") return uid;

  const data = await request.json();
  const comment = await prisma.blogComment.create({
    data: { blogId: params.uid, userId: uid, ...data },
    include: {
      user: {
        select: { fullName: true },
      },
      blog: {
        select: {
          title: true,
          author: {
            select: { fullName: true, email: true },
          },
        },
      },
    },
  });

  const htmlData = {
    fullname: comment.blog.author.fullName,
    blog: comment.blog.title,
    user: comment.user.fullName,
    comment: comment.content,
    link: "",
  };

  const html = await fetch(new URL("/templates/blogComment.html", request.url));
  const htmlBody = format(await html.text(), htmlData);

  const message = await transporter.sendMail({
    from: `"SSS " <dsdsdsd@gmail.com>`, // sender address
    to: comment.blog.author.email, // list of receivers
    subject: `Blog comment from ${comment.user.fullName}`, // Subject line
    text: comment.content, // plain text body
    html: htmlBody, // html body
  });

  return NextResponse.json(
    { comment, message: "Comment posted Successfully" },
    { status: 200 }
  );
}
