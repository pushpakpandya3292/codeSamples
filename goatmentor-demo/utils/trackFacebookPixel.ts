import prisma from "@/prisma/db";
import {
  CustomData,
  EventRequest,
  FacebookAdsApi,
  ServerEvent,
  UserData,
} from "facebook-nodejs-business-sdk";
import { NextRequest } from "next/server";

function initializePixel() {
  return FacebookAdsApi.init(process.env.FACEBOOK_PIXEL_ACCESS_TOKEN ?? "");
}

interface Props {
  id: string;
  customerId: string;
  productId: string;
  currency: string;
  amount: number;
  fbc?: string;
  fbp?: string;
}

export async function pixelCourseConversion({
  id,
  customerId,
  productId,
  currency,
  amount,
  fbc,
  fbp,
}: Props) {
  initializePixel();
  const userRequest = prisma.user.findFirst({
    where: { customerId },
    select: { email: true, phone: true },
  });
  const courseRequest = prisma.course.findUnique({
    where: { uid: productId },
    select: { title: true },
  });

  const [user, course] = await prisma.$transaction([
    userRequest,
    courseRequest,
  ]);

  const userData = new UserData()
    .setEmail(user?.email ?? "")
    .setPhone(user?.phone?.split(/ /)[0].replace(/[^\d]/g, "") ?? "");
  if (fbc) userData.setFbc(fbc);
  if (fbp) userData.setFbp(fbp);

  const customData = new CustomData()
    .setContentName(course?.title ?? "")
    .setContentType("course")
    .setContentIds([productId])
    .setValue(amount)
    .setCurrency(currency)
    .setOrderId(id);

  const event = new ServerEvent()
    .setEventName("Purchase")
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl(`xxxxx`)
    .setActionSource("website");

  const eventRequest = new EventRequest(
    process.env.FACEBOOK_PIXEL_ACCESS_TOKEN ?? "",
    process.env.FACEBOOK_PIXEL_ID ?? "",
    [event]
  );
  const eventResponse = await eventRequest.execute().catch((error) => {
    console.error("ERROR:", error);
  });

  return { eventResponse };
}

interface RegistrationProps {
  request: NextRequest;
  userId: string;
}

export async function pixelRegistrationConversion({
  request,
  userId,
}: RegistrationProps) {
  initializePixel();
  const user = await prisma.user.findFirst({
    where: { uid: userId },
    select: { email: true, phone: true },
  });

  const fbc = request.cookies.get("_fbc")?.value ?? "";
  const fbp = request.cookies.get("_fbp")?.value ?? "";
  const ip = request.headers.get("x-forwarded-for") ?? request.ip ?? "";

  const userData = new UserData()
    .setEmail(user?.email ?? "")
    .setPhone(user?.phone?.split(/ /)[0].replace(/[^\d]/g, "") ?? "");
  if (fbc) userData.setFbc(fbc);
  if (fbp) userData.setFbp(fbp);
  if (ip) userData.setClientIpAddress(ip);

  const event = new ServerEvent()
    .setEventName("CompleteRegistration")
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(userData)
    .setEventSourceUrl(`xxxxx`)
    .setActionSource("website");

  const eventRequest = new EventRequest(
    process.env.FACEBOOK_PIXEL_ACCESS_TOKEN ?? "",
    process.env.FACEBOOK_PIXEL_ID ?? "",
    [event]
  );
  const eventResponse = await eventRequest.execute().catch((error) => {
    console.error("ERROR:", error);
  });

  return { eventResponse };
}

interface ApplicationProps {
  request: NextRequest;
  userId: string;
  positionId: string;
}

export async function pixelApplicationConversion({
  request,
  userId,
  positionId,
}: ApplicationProps) {
  initializePixel();
  const userRequest = prisma.user.findFirst({
    where: { uid: userId },
    select: { email: true, phone: true },
  });
  const positionRequest = prisma.position.findUnique({
    where: { uid: positionId },
    select: { title: true },
  });

  const [user, position] = await prisma.$transaction([
    userRequest,
    positionRequest,
  ]);

  const fbc = request.cookies.get("_fbc")?.value ?? "";
  const fbp = request.cookies.get("_fbp")?.value ?? "";
  const ip = request.headers.get("x-forwarded-for") ?? request.ip ?? "";

  const userData = new UserData()
    .setEmail(user?.email ?? "")
    .setPhone(user?.phone?.split(/ /)[0].replace(/[^\d]/g, "") ?? "");
  if (fbc) userData.setFbc(fbc);
  if (fbp) userData.setFbp(fbp);
  if (ip) userData.setClientIpAddress(ip);

  const customData = new CustomData()
    .setContentName(position?.title ?? "")
    .setContentType("position")
    .setContentIds([positionId]);

  const event = new ServerEvent()
    .setEventName("SubmitApplication")
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl(`xxxx`)
    .setActionSource("website");

  const eventRequest = new EventRequest(
    process.env.FACEBOOK_PIXEL_ACCESS_TOKEN ?? "",
    process.env.FACEBOOK_PIXEL_ID ?? "",
    [event]
  );
  const eventResponse = await eventRequest.execute().catch((error) => {
    console.error("ERROR:", error);
  });

  return { eventResponse };
}

interface SubscriptionProps {
  request: NextRequest;
  email: string;
  name: string;
}

export async function pixelSubscriptionConversion({
  request,
  email,
  name,
}: SubscriptionProps) {
  initializePixel();
  const fbc = request.cookies.get("_fbc")?.value ?? "";
  const fbp = request.cookies.get("_fbp")?.value ?? "";
  const ip = request.headers.get("x-forwarded-for") ?? request.ip ?? "";

  const userData = new UserData().setEmail(email);
  if (fbc) userData.setFbc(fbc);
  if (fbp) userData.setFbp(fbp);
  if (ip) userData.setClientIpAddress(ip);

  const customData = new CustomData()
    .setContentName(name)
    .setContentType("position");

  const event = new ServerEvent()
    .setEventName("Subscribe")
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(userData)
    .setCustomData(customData)
    .setActionSource("website");

  const eventRequest = new EventRequest(
    process.env.FACEBOOK_PIXEL_ACCESS_TOKEN ?? "",
    process.env.FACEBOOK_PIXEL_ID ?? "",
    [event]
  );
  const eventResponse = await eventRequest.execute().catch((error) => {
    console.error("ERROR:", error);
  });

  return { eventResponse };
}
