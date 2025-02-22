import prisma from "@/prisma/db";
import { stripe } from "@/stripe";
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { Stripe } from "stripe";

const createVimeoFolder = (title: string): Promise<any> =>
  fetch("https://api.vimeo.com/me/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.vimeo.*+json;version=3.4",
    },
    body: JSON.stringify({ name: title }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error creating vimeo folder", err);
      return Promise.reject(err);
    });

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await verifyRole(token, "instructor");
  if (typeof uid !== "string") return uid;

  const data = await request.json();

  const folder = await createVimeoFolder(data.title);

  const course = await prisma.course.create({
    data: { instructorId: uid, ...data, vimeoFolder: folder.uri },
  });

  await stripe.products
    .create({
      id: course.uid,
      name: course.title,
      description: course.description,
      images: [course.thumbnail],
      default_price_data: {
        currency: "usd",
        unit_amount: course.price * 100,
      },
    })
    .catch(async (err) => {
      await prisma.course.delete({ where: { uid: course.uid } });
      return Promise.reject(err);
    });

  return NextResponse.json(
    { course, message: "Course Created Successfully" },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const requestUid = await verifyRole(token, "instructor");
  if (typeof requestUid !== "string") return requestUid;

  const { uid, ordinaryPrice, ...data } = await request.json();

  const updateData = { ...data };

  const adminRequest = verifyRole(token, "admin");
  const courseRequest = prisma.course.findUnique({ where: { uid } });
  const [adminUid, initialCourse] = await Promise.all([
    adminRequest,
    courseRequest,
  ]);

  if (
    typeof adminUid !== "string" &&
    requestUid !== initialCourse?.instructorId
  )
    return adminUid;

  if (data.published !== undefined) {
    if (typeof adminUid !== "string") return adminUid;
    if (data.published) {
      updateData.publishedAt = new Date();
    } else {
      updateData.publishedAt = null;
    }
  }

  const course = await prisma.course.update({
    where: { uid },
    data: {
      ordinaryPrice: !ordinaryPrice ? null : ordinaryPrice,
      ...updateData,
    },
  });

  if (initialCourse?.title !== course.title && course.vimeoFolder) {
    await fetch(`https://api.vimeo.com${course.vimeoFolder}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
      body: JSON.stringify({ name: data.title }),
    }).catch((err) => {
      console.log("Error creating vimeo folder", err);
    });
  }

  let price: Stripe.Response<Stripe.Price> | undefined = undefined;
  if (initialCourse?.price !== course.price) {
    price = await stripe.prices.create({
      product: course.uid,
      currency: "usd",
      unit_amount: course.price * 100,
    });
  }

  await stripe.products.update(course.uid, {
    name: course.title,
    description: course.description,
    images: [course.thumbnail],
    ...(Boolean(price) && { default_price: price?.id }),
  });

  return NextResponse.json(
    { course, message: "Course Updated Successfully" },
    { status: 200 }
  );
}
