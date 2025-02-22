import { mailerlite } from "@/mailerlite";
import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { transporter } from "@/utils/nodemailer";
import { pixelApplicationConversion } from "@/utils/trackFacebookPixel";
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const data = await request.json();
  const initialApplicationRequest = prisma.application.findFirst({
    where: { positionId: params.uid, userId: uid },
  });
  const userRequest = prisma.user.findUnique({
    where: { uid },
    select: { email: true, fullName: true },
  });
  const [initialApplication, user] = await prisma.$transaction([
    initialApplicationRequest,
    userRequest,
  ]);

  const application = initialApplication
    ? await prisma.application.update({
      where: { uid: initialApplication?.uid },
      data: {
        ...data,
        status:
          data.submitted &&
            ["incomplete", "withdrawn"].includes(initialApplication.status)
            ? "pending"
            : data.status === "withdrawn"
              ? "withdrawn"
              : initialApplication.status,
      },
    })
    : await prisma.application.create({
      data: {
        positionId: params.uid,
        userId: uid,
        ...data,
      },
    });

  if (data.submitted && initialApplication?.status === "incomplete") {
    if (user) {
      await mailerlite.subscribers
        .createOrUpdate({
          email: user.email,
          fields: {
            name: user.fullName,
          },
          groups: [process.env.MAILERLITE_APPLICANTS_GROUP ?? ""],
        })
        .catch((error) => console.log(error));
    }

    try {
      await pixelApplicationConversion({
        request,
        userId: uid,
        positionId: params.uid,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (data?.signedContract && data?.contractStatus === 'pending' && user) {
    try {
      const position = await prisma.position.findUnique({
        where: { uid: params.uid },
        select: {
          title: true
        }
      });

      await transporter.sendMail({
        from: `"${user.fullName}" <${user.email}>`,
        to: "goatmentortech@gmail.com",
        subject: `Submission of Signed Contract for ${position?.title} Position`,
        text: `Dear Goatmentor Technologies,\n\nI trust this email finds you well. I am writing to inform you that I have successfully reviewed, signed, and submitted the employment contract for the ${position?.title} position at Goatmentor Technologies, as requested.\n\nI have taken the necessary steps to ensure clarity and compliance with the terms outlined in the contract.\n\nShould you require any further information or documentation from my end, please do not hesitate to contact me at ${user.email}.\n\nThank you once again for this opportunity, and I look forward to the next steps in the onboarding process.\n\nBest regards.`
      });
    } catch (error) {
      console.error(error);
    }
  }
  return NextResponse.json(
    { application, message: "Application Created Successfully" },
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

  const position = await prisma.position.delete({ where: { uid: params.uid } });
  return NextResponse.json(
    { position, message: "Position Deleted Successfully" },
    { status: 200 }
  );
}
