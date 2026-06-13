"use client";

import Link from "next/link";
import { LINKS } from "@/lib/site";

type Item = {
  label: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    label: "24시간 상담",
    href: LINKS.phoneTel,
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "카카오톡 문의",
    href: LINKS.kakao,
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4C7 4 3 7.2 3 11.2c0 2.5 1.6 4.7 4 6L6 21l4-2.4c.6.1 1.3.1 2 .1 5 0 9-3.2 9-7.5S17 4 12 4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "블로그",
    href: LINKS.blog,
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 9h8M8 13h8M8 17h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "무료진단",
    href: "/diagnosis",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function FloatingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:bottom-5 md:px-4">
      <div className="bg-white/95 backdrop-blur border-t border-[var(--color-border)] shadow-[0_-4px_20px_-8px_rgba(15,23,42,0.12)] md:mx-auto md:max-w-md md:rounded-2xl md:border md:shadow-[0_16px_44px_-16px_rgba(15,23,42,0.3)] md:overflow-hidden">
        <ul className="grid grid-cols-4">
          {items.map((it) => {
            const inner = (
              <span className="flex flex-col items-center justify-center py-2.5 gap-1 text-[var(--color-fg-soft)] hover:text-[var(--color-brand-700)] transition">
                <span>{it.icon}</span>
                <span className="text-[11px] font-medium">{it.label}</span>
              </span>
            );
            return (
              <li key={it.label}>
                {it.external ? (
                  <a
                    href={it.href}
                    target={it.href.startsWith("tel:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={it.href}>{inner}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
