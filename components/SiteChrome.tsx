"use client";

import { usePathname } from "next/navigation";

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
  const isAdmin = usePathname().startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {floatingBar}
    </>
  );
}
