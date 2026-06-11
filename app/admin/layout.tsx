import type { Metadata } from "next";

// 어드민 전체 색인 차단 (robots.ts의 disallow와 이중 방어)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
