"use client";

import { usePathname } from "next/navigation";
import FloatingContact from "@/components/FloatingContact";

export default function SiteChrome({
  header,
  footer,
  floatingBar,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  floatingBar: React.ReactNode;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isBare =
    path.startsWith("/admin") ||
    path === "/landing" ||
    path.startsWith("/landing/") ||
    path.startsWith("/demo");

  if (isBare) {
    return <>{children}</>;
  }

  const shellClass = path === "/" ? "home-shell" : "page-shell";

  return (
    <>
      <div className={shellClass}>
        {header}
        <main className="flex-1">{children}</main>
      </div>
      {footer}
      {floatingBar}
      <FloatingContact />
    </>
  );
}
