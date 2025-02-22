import { stripe } from "@/stripe";
import { createEnrollment } from "@/utils/courses";
import { courseConversion } from "@/utils/trackConversion";
import { pixelCourseConversion } from "@/utils/trackFacebookPixel";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  const sig = request?.headers?.get("stripe-signature") || "";

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      sig,
      WEBHOOK_SECRET
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("Event type", event.type);

  switch (event.type) {
    case "payment_intent.succeeded":
      await createEnrollment(
        event.data.object.metadata.productId,
        event.data.object.customer as string
      );
      const googleConversion = courseConversion({
        amount: event.data.object.amount / 100,
        currency: event.data.object.currency,
        id: event.data.object.id,
        productId: event.data.object.metadata.productId,
        clientId: event.data.object.metadata.clientId,
      });
      const facebookConversion = pixelCourseConversion({
        amount: event.data.object.amount / 100,
        currency: event.data.object.currency,
        id: event.data.object.id,
        productId: event.data.object.metadata.productId,
        customerId: event.data.object.customer as string,
        fbc: event.data.object.metadata.fbc,
        fbp: event.data.object.metadata.fbp,
      });
      await Promise.all([googleConversion, facebookConversion]);
      break;
    case "checkout.session.completed":
      if (event.data.object.amount_total === 0) {
        await createEnrollment(
          event.data.object.metadata.productId,
          event.data.object.customer as string
        );
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse("ok");
}
