import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // /admin/* (login 제외) 진입 시 쿠키 검사
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || token !== process.env.ADMIN_SESSION_SECRET) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
