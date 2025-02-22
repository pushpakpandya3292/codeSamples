import prisma from "@/prisma/db";
import { stripe } from "@/stripe";

export const createCustomer = async (uid: string) => {
  const user = await prisma.user.findUnique({
    where: { uid },
    select: { email: true, fullName: true, customerId: true },
  });
  if (user?.customerId) return user.customerId;

  const initialCustomer = await stripe.customers.list({
    email: user?.email,
    limit: 1,
  });
  if (initialCustomer.data.length > 0) {
    return initialCustomer.data[0].id;
  }

  const customer = await stripe.customers.create({
    email: user?.email,
    name: user?.fullName,
  });
  await prisma.user.update({
    where: { uid },
    data: { customerId: customer.id },
  });
  return customer.id;
};

export const createAnonymousCustomer = async (
  email: string,
  fullName: string
) => {
  const initialCustomer = await stripe.customers.list({
    email: email,
    limit: 1,
  });
  if (initialCustomer.data.length > 0) {
    return initialCustomer.data[0].id;
  }

  const customer = await stripe.customers.create({
    email: email,
    name: fullName,
  });

  return customer.id;
};
