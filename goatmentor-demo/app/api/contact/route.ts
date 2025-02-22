import decodeToken from "@/utils/decodeToken";
import { transporter } from "@/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import format from "string-template";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const data = await request.json();

  const html = await fetch(new URL("/templates/contactUs.html", request.url));
  const htmlBody = format(await html.text(), data);

  const message = await transporter.sendMail({
    from: `"${data.firstname} ${data.lastname}" <${data.email}>`, // sender address
    to: "", // list of receivers
    subject: `Goatmentor contact from ${data.firstname} ${data.lastname}`, // Subject line
    text: data.message, // plain text body
    html: htmlBody, // html body
  });

  return NextResponse.json(
    { email: message, message: "Message sent successfully" },
    { status: 200 }
  );
}
