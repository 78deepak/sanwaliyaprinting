import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Next.js 16 Proxy execution layer for /admin routes.
 * Uses lightweight jose Web Crypto (no database access, no bcrypt).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const { valid } = sessionToken
    ? await verifyAdminSessionToken(sessionToken)
    : { valid: false };

  // If already authenticated and visiting the login page, redirect to dashboard
  if (pathname === "/admin/login") {
    if (valid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
