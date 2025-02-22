import prisma from "@/prisma/db";
import fetch from "node-fetch";

const GTM_MEASUREMENT_ID = "G-72BWE1F3L0";
const GTM_API_SECRET = "u_KBnn8zTduC9-v_MXaxzg";

interface ConversionProps {
  id: string;
  amount: number;
  currency: string;
  productId: string;
  clientId: string;
}

export const courseConversion = async ({
  id,
  amount,
  currency,
  productId,
  clientId,
}: ConversionProps) => {
  const course = await prisma.course.findUnique({
    where: { uid: productId },
    select: { title: true },
  });
  if (!course) return;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      client_id: clientId,
      events: [
        {
          name: "purchase",
          params: {
            items: [
              {
                item_id: productId,
                item_name: course.title,
                quantity: 1,
                price: amount,
                currency: currency.toUpperCase(),
              },
            ],
            currency: currency.toUpperCase(),
            transaction_id: id,
            value: amount,
          },
        },
      ],
    }),
  };
  const response = await fetch(
    `xxxx`,
    requestOptions
  );
  return { response };
};

