import { mailerlite } from "@/mailerlite";
import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { pixelRegistrationConversion } from "@/utils/trackFacebookPixel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const user = await prisma.user.findUnique({
    where: { uid: uid },
  });

  if (!user) {
    return NextResponse.json(
      { user, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ user, message: "User fetched" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const data = await request.json();
  const initialUser = await prisma.user.findUnique({ where: { uid: uid } });
  const user =
    initialUser ??
    (await prisma.user.create({
      data: {
        uid: uid,
        ...data,
      },
    }));

  // Add user to mailerlite
  const response = await mailerlite.subscribers
    .createOrUpdate({
      email: user.email,
      fields: {
        name: user.fullName,
      },
      groups: [process.env.MAILERLITE_NEW_USERS_GROUP ?? ""],
    })
    .catch((error) => console.log(error));

  try {
    await pixelRegistrationConversion({ request, userId: user.uid });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(
    {
      user,
      created: !initialUser,
      message: "User Created Successfully",
    },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const data = await request.json();
  const user = await prisma.user.update({
    where: { uid: uid },
    data: data,
  });

  return NextResponse.json(
    { user, message: "User Updated Successfully" },
    { status: 200 }
  );
}
