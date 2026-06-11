"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const [activeStyle, setActiveStyle] = useState({
    left: 0,
    width: 0,
    height: 0,
    top: 0,
    opacity: 0,
  });
  const [isFirstLayout, setIsFirstLayout] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      if (!navRef.current) return;
      const activeEl = navRef.current.querySelector(
        ".active-nav-item"
      ) as HTMLElement;
      if (activeEl) {
        setActiveStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          top: activeEl.offsetTop,
          opacity: 1,
        });
        if (isFirstLayout) {
          // Disable transition for first mount layout, then enable it
          setIsFirstLayout(false);
        }
      } else {
        setActiveStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // Delay slightly to ensure fonts or styles are loaded
    const timer = setTimeout(updateLayout, 30);

    window.addEventListener("resize", updateLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLayout);
    };
  }, [pathname, isFirstLayout]);

  return (
    <>
    <header className="sticky top-3 z-40 px-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-full bg-[#0b1220]/95 backdrop-blur shadow-[0_16px_40px_-16px_rgba(11,18,32,0.5)] ring-1 ring-white/10 pl-6 pr-3 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="WEFLOW"
            width={32}
            height={32}
            priority
            className="w-8 h-8"
          />
          <span className="text-lg font-extrabold tracking-tight text-white">
            WEFLOW
          </span>
        </Link>

        <nav ref={navRef} className="relative hidden md:flex items-center gap-2 py-2">
          {/* Sliding Indicator */}
          <div
            className={`absolute bg-white/15 rounded-full pointer-events-none ${
              isFirstLayout ? "" : "transition-all duration-300 ease-out"
            }`}
            style={{
              left: activeStyle.left,
              width: activeStyle.width,
              height: activeStyle.height,
              top: activeStyle.top,
              opacity: activeStyle.opacity,
            }}
          />

          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 relative z-10 ${
                  active
                    ? "active-nav-item text-white"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/diagnosis" className="btn-primary text-sm !py-2.5">
            무료진단 받기
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:bg-white/10"
          aria-label="메뉴"
        >
          <div className="relative w-5 h-3.5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                open ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`md:hidden transition-[grid-template-rows,opacity,margin-top,transform] duration-300 ease-out grid ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-2 translate-y-0"
            : "grid-rows-[0fr] opacity-0 mt-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="relative z-40 mx-auto max-w-7xl rounded-2xl bg-white shadow-xl ring-1 ring-[var(--color-border)]">
            <nav className="px-4 py-4 flex flex-col gap-2">
              <p className="px-1 text-[11px] font-bold tracking-wider text-[var(--color-fg-mute)]">
                MENU
              </p>
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ring-1",
                      active
                        ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] ring-[var(--color-brand-200)]"
                        : "bg-white text-[var(--color-fg)] ring-[var(--color-border)] hover:bg-[var(--color-brand-50)] hover:ring-[var(--color-brand-200)] hover:text-[var(--color-brand-700)]",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={
                        active
                          ? "text-[var(--color-brand-600)]"
                          : "text-[var(--color-fg-mute)]"
                      }
                      aria-hidden
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                );
              })}
              <Link
                href="/diagnosis"
                onClick={() => setOpen(false)}
                className="btn-primary text-sm mt-3"
              >
                무료진단 받기
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <div
      className={`md:hidden fixed inset-0 z-30 bg-black/15 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setOpen(false)}
      aria-hidden
    />
    </>
  );
}
