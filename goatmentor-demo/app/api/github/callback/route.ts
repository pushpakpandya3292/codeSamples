import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { NextRequest } from "next/server";
import fetch from "node-fetch";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${
      process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    }&client_secret=${
      process.env.GITHUB_CLIENT_SECRET
    }&code=${request.nextUrl.searchParams.get("code")}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
    }
  );
  const data: any = await response.json();

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      Accept: "application/json",
    },
  });
  const userData: any = await userResponse.json();
  const username = userData.login;

  await prisma.application.updateMany({
    where: {
      userId: uid,
      positionId: request.cookies.get("active_application")?.value,
    },
    data: { github: username },
  });

  return new Response(
    `
  <html>
    <script>
      window.close();
    </script>
  </html>
  `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
