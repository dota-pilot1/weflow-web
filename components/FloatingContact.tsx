"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LINKS } from "@/lib/site";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-end gap-3 font-sans">
      {/* Expanded Menu Popover */}
      <div
        className={[
          "w-60 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-2.5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] flex flex-col gap-1 transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none absolute bottom-16",
        ].join(" ")}
      >
        <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-[var(--color-fg-mute)] tracking-wider">연락 채널 선택</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition p-1"
          >
            닫기
          </button>
        </div>

        {/* 1. 무료 진단 */}
        <Link
          href="/diagnosis"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-[var(--color-brand-50)] text-left text-xs sm:text-sm font-bold text-[var(--color-fg-soft)] hover:text-[var(--color-brand-700)] transition"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-base">
            📋
          </span>
          <div>
            <p className="font-bold">무료 진단 신청</p>
            <p className="text-[10px] text-[var(--color-fg-mute)] font-normal mt-0.5">평균 24시간 내 답변</p>
          </div>
        </Link>

        {/* 2. 카카오톡 */}
        <a
          href={LINKS.kakao}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-[#FEE500]/10 text-left text-xs sm:text-sm font-bold text-[var(--color-fg-soft)] hover:text-[#3A1D1D] transition"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FEE500] text-base">
            💬
          </span>
          <div>
            <p className="font-bold">카카오톡 1:1 상담</p>
            <p className="text-[10px] text-[var(--color-fg-mute)] font-normal mt-0.5">실시간 메시지 문의</p>
          </div>
        </a>

        {/* 3. 전화 */}
        <a
          href={LINKS.phoneTel}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-left text-xs sm:text-sm font-bold text-[var(--color-fg-soft)] hover:text-emerald-700 transition"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white text-base">
            📞
          </span>
          <div>
            <p className="font-bold">전화 바로 연결</p>
            <p className="text-[10px] text-[var(--color-fg-mute)] font-normal mt-0.5">{LINKS.phone}</p>
          </div>
        </a>
      </div>

      {/* Main Floating Trigger Widget */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={[
          "flex items-center gap-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl py-3.5 px-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] text-left cursor-pointer hover:shadow-[0_12px_40px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-300 group outline-none",
          isOpen ? "ring-2 ring-[var(--color-brand-500)]/20" : "",
        ].join(" ")}
      >
        <div className="flex flex-col select-none">
          <p className="text-sm font-extrabold text-[var(--color-fg)] tracking-tight">
            문의 바로가기
          </p>
          <p className="text-[11px] font-medium text-[var(--color-fg-mute)] mt-0.5">
            진단 · 카카오 · 전화
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-600)] text-white font-extrabold text-sm shadow-[0_4px_12px_rgba(31,99,221,0.2)] group-hover:scale-105 transition-transform duration-300">
          W
        </div>
      </button>
    </div>
  );
}
