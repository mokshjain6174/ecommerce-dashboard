import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check for the session cookie
  const session = request.cookies.get("admin_session");

  // 2. If no session and trying to access dashboard -> Redirect to Login
  if (!session && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. If has session and trying to access Login -> Redirect to Dashboard
  if (session && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Protect these routes
export const config = {
  matcher: ["/", "/inventory", "/sales", "/products/:path*", "/login"],
};