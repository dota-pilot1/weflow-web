import { cookies } from "next/headers";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_COOKIE,
  ADMIN_COOKIE_OPTIONS,
  getAdminToken,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }

  if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) {
    return Response.json(
      { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, getAdminToken(), ADMIN_COOKIE_OPTIONS);

  return Response.json({ ok: true });
}
