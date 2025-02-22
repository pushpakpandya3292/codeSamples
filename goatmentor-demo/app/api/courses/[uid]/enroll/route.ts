import prisma from "@/prisma/db";
import { stripe } from "@/stripe";
import decodeToken from "@/utils/decodeToken";
import { createCustomer } from "@/utils/stripeCustomer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;
  const baseUrl = new URL(request.url).origin;

  const enrollment = await prisma.enrollment.findFirst({
    where: { courseId: params.uid, userId: uid },
  });
  if (enrollment)
    return NextResponse.redirect(`${baseUrl}/courses/${params.uid}`, {
      status: 303,
    });

  const product = await stripe.products.retrieve(params.uid).catch(() => null);
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const customerId = await createCustomer(uid);

  const metadata = {
    productId: params.uid,
    clientId: request.cookies.get("ga_client_id")?.value ?? "",
    fbc: request.cookies.get("_fbc")?.value ?? "",
    fbp: request.cookies.get("_fbp")?.value ?? "",
  };

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product.default_price?.toString(),
        quantity: 1,
      },
    ],
    mode: "payment",
    customer: customerId,
    success_url: `${baseUrl}/courses/${params.uid}?success=true`,
    cancel_url: `${baseUrl}/courses/${params.uid}?canceled=true`,
    metadata: metadata,
    payment_intent_data: {
      metadata: metadata,
    },
  });
  return NextResponse.redirect(session.url ?? new URL("/404", request.url), {
    status: 303,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const { lesson, completed } = await request.json();

  const initialEnrollment = await prisma.enrollment.findFirst({
    where: { courseId: params.uid, userId: uid },
    select: { progress: true, uid: true },
  });

  if (!initialEnrollment)
    return NextResponse.json(
      { error: "Enrollment not found" },
      { status: 404 }
    );

  const progress = completed
    ? [
        ...(initialEnrollment?.progress ?? []).filter((e) => e !== lesson),
        lesson,
      ]
    : initialEnrollment?.progress.filter((e) => e !== lesson);

  const enrollment = await prisma.enrollment.update({
    where: { uid: initialEnrollment.uid },
    data: {
      progress: progress,
    },
  });

  return NextResponse.json(
    { enrollment, message: "Enrollment Updated Successfully" },
    { status: 200 }
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const { certificate } = await request.json();

  const enrollment = await prisma.enrollment.updateMany({
    where: { courseId: params.uid, userId: uid },
    data: { certificate },
  });

  return NextResponse.json(
    { enrollment, message: "Enrollment Updated Successfully" },
    { status: 200 }
  );
}
