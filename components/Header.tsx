"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-block w-8 h-8 rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #60a5fa 0%, #2563eb 50%, #1d4ed8 100%)",
            }}
            aria-hidden
          />
          <span className="text-xl font-extrabold tracking-tight text-[var(--color-fg)]">
            WEFLOW
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? "text-[var(--color-brand-700)] bg-[var(--color-brand-50)]"
                    : "text-[var(--color-fg-soft)] hover:text-[var(--color-brand-700)] hover:bg-[var(--color-bg-soft)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/diagnosis" className="btn-primary text-sm">
            무료진단 받기
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-soft)]"
          aria-label="메뉴"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-soft)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/diagnosis"
              onClick={() => setOpen(false)}
              className="btn-primary text-sm mt-2"
            >
              무료진단 받기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
