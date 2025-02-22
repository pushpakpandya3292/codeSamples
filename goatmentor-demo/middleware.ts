import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { HOME_PAGES, ONBOARDING_PAGES } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (accessToken) {
      return NextResponse.next({
        headers: { Authorization: accessToken.value },
      });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (HOME_PAGES.some((e) => request.nextUrl.pathname.startsWith(e))) {
    if (request.nextUrl.pathname.match(/(courses|careers)\/[^\/]+$/)) {
      return NextResponse.next();
    }
    if (!accessToken) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url)
      );
    }
  } else if (
    ONBOARDING_PAGES.some((e) => request.nextUrl.pathname.startsWith(e))
  ) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/careers/:path*",
    "/courses/:path*",
    "/admin/:path*",
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
  ],
};
