"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-brand-50)] via-[var(--color-bg-soft)] to-white py-16 sm:py-24">
      {/* Decorative radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-xl px-4 text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 ring-8 ring-rose-50/50">
          <svg
            className="h-7 w-7 text-rose-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mt-8 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-fg)]">
          잠시 문제가 발생했습니다
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[var(--color-fg-soft)] leading-relaxed">
          요청을 처리하는 도중 일시적인 오류가 발생했어요.
          <br />
          아래의 &apos;다시 시도&apos; 버튼을 누르거나 홈으로 돌아가 주세요.
        </p>

        {error.digest && (
          <p className="mt-3 text-[11px] font-mono text-[var(--color-fg-mute)] bg-white/55 border border-[var(--color-border)] rounded px-2 py-1 inline-block">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-primary cursor-pointer"
          >
            다시 시도하기
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-fg-soft)] ring-1 ring-[var(--color-border)] hover:bg-slate-50 transition"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  );
}
