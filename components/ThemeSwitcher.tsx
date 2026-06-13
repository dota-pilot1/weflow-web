"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = [
  { id: "default", label: "Default", color: "#3e63dd" },
  { id: "rose", label: "Rose", color: "#db3d66" },
  { id: "mint", label: "Mint", color: "#1f9d62" },
  { id: "lavender", label: "Lavender", color: "#6e56cf" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "weflow-theme";

const PaletteIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-9.75 0-2.49-2.01-4.5-4.5-4.5H15a1 1 0 0 1-1-1V5.5C14 3.01 11.99 1 9.5 1 4.25 1 0 5.25 0 10.5 0 16.85 5.37 22 12 22z" />
    <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.2" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.2" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="1.2" fill="currentColor" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("default");
  const ref = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage on client-side mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.some((t) => t.id === stored)) {
        Promise.resolve().then(() => {
          setTheme(stored as ThemeId);
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleThemeChange = (nextTheme: ThemeId) => {
    setTheme(nextTheme);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      /* ignore */
    }
    
    // Apply dataset attribute to documentElement
    const root = document.documentElement;
    if (nextTheme === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", nextTheme);
    }
  };

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="테마 색상 변경"
        className="group inline-flex h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white pl-3.5 pr-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-slate-100 whitespace-nowrap shadow-sm"
      >
        <span
          className="h-3 w-3 rounded-full ring-1 ring-slate-950/15 shadow-sm transition-transform duration-200 group-hover:scale-110 shrink-0"
          style={{ backgroundColor: activeTheme.color }}
        />
        <span>
          {activeTheme.label}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:text-slate-600 shrink-0"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2.5 w-40 rounded-xl bg-white border border-slate-200 shadow-lg z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <p className="px-3.5 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            테마 색상
          </p>
          <div className="px-1.5 space-y-0.5">
            {THEMES.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleThemeChange(t.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors duration-150 cursor-pointer select-none ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full ring-1 ring-slate-200"
                      style={{ backgroundColor: t.color }}
                    />
                    <span>{t.label}</span>
                  </span>
                  {isActive && (
                    <CheckIcon className="h-3.5 w-3.5 text-slate-900" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
