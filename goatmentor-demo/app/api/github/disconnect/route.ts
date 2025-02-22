import prisma from "@/prisma/db";
import decodeToken from "@/utils/decodeToken";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const uid = await decodeToken(token);
  if (typeof uid !== "string") return uid;

  const response = await prisma.application.findFirst({
    where: {
      userId: uid,
    },
  });

  await prisma.application.updateMany({
    where: {
      userId: uid,
      positionId: request.cookies.get("active_application")?.value,
    },
    data: { github: null },
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
