import "server-only";
import { cookies } from "next/headers";

export const ADMIN_EMAIL = "badeagle85@gmail.com";
export const ADMIN_PASSWORD = "1111";
export const ADMIN_COOKIE = "admin_token";

const SECRET = process.env.ADMIN_SESSION_SECRET!;

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return !!token && token === SECRET;
}

export function getAdminToken(): string {
  return SECRET;
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24, // 24h
};
