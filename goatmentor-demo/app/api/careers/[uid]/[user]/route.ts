import prisma from "@/prisma/db";
import { transporter } from "@/utils/nodemailer";
import fs from 'fs';
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string; user: string } }
) {
  const token = request.headers.get("Authorization") || "";
  const uid = await verifyRole(token, "recruiter");
  if (typeof uid !== "string") return uid;

  const data = await request.json();

  let contractFile: string | null = null;
  if (data?.status === "accepted" && data?.contractFile) {
    contractFile = data?.contractFile
    delete data?.contractFile;
  }

  const application = await prisma.application.updateMany({
    where: { positionId: params.uid, userId: params.user },
    data,
  });

  if (data?.status === "accepted" && contractFile) {
    const filePath = 'public/contract.pdf'
    const pdfBuffer = Buffer.from(contractFile, 'base64');
    fs.writeFileSync(filePath, pdfBuffer);

    const user = await prisma.user.findUnique({
      where: { uid: params?.user },
      select: {
        email: true,
        fullName: true
      }
    })
    const position = await prisma.position.findUnique({
      where: { uid: params?.uid },
      select: {
        title: true
      }
    })

    if (user && position) {
      try {
        await transporter.sendMail({
          from: `"Goatmentor Technologies" <goatmentortech@gmail.com>`,
          to: user.email,
          subject: `Job Application - Contract Signature Required for position ${position.title}`,
          text: `Dear ${user.fullName},\n\nI hope this email finds you well. We appreciate your interest in the ${position.title} position at Goatmentor Technologies. We are pleased to inform you that you have been selected to move forward in the hiring process.\n\nAs the next step, we kindly request you to review the attached employment contract carefully. Please take the time to read through the contract thoroughly.\n\nOnce you have reviewed the contract and are comfortable with its contents, please proceed to sign and date the last page. Afterward, kindly scan or take a clear photo of the signed document.\n\nYou can return the signed contract by replying to this email and attaching the scanned or photographed document. Please ensure that the signed contract is returned to us no later than 2 days. Failure to submit the signed contract by the specified time may result in the delay of your onboarding process.\n\nThank you for your prompt attention to this matter. We look forward to welcoming you to the Goatmentor Technologies team.\n\nBest regards.`,
          attachments: [
            {
              filename: 'contract.pdf',
              path: filePath
            }
          ]
        }).then(() => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            }
          })
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return NextResponse.json(
    { application, message: "Application Updated Successfully" },
    { status: 200 }
  );
}
