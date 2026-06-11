"use client";

import { useEffect, useRef, useState } from "react";

type Step = { no: string; label: string; desc: string };

const ICONS: Record<string, string> = {
  "01": "💬",
  "02": "🧭",
  "03": "🎨",
  "04": "🛠️",
  "05": "🔍",
  "06": "📈",
};

const AUTO_MS = 4500;

export default function ProcessSixCarousel({
  title,
  sub,
  steps,
}: {
  title: string;
  sub: string;
  steps: Step[];
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, AUTO_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, steps.length]);

  const goTo = (i: number) => {
    setIdx(i);
    setPaused(true);
    // 사용자가 직접 누른 뒤 8초 후 다시 자동 재생
    window.setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section className="section-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="text-center">
          <span className="chip">DETAILED FLOW</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-[var(--color-fg-soft)]">{sub}</p>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 카드 무대 */}
          <div className="relative mx-auto max-w-3xl">
            <div className="relative h-[280px] sm:h-[320px]">
              {steps.map((s, i) => {
                const active = i === idx;
                return (
                  <div
                    key={s.no}
                    aria-hidden={!active}
                    className={[
                      "absolute inset-0 rounded-3xl bg-white shadow-xl ring-1 ring-[var(--color-border)] p-8 sm:p-12",
                      "flex flex-col items-center justify-center text-center",
                      "transition-all duration-700 ease-out",
                      active
                        ? "opacity-100 translate-y-0 scale-100 z-10"
                        : "opacity-0 translate-y-4 scale-[0.98] z-0 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-5xl sm:text-6xl">
                        {ICONS[s.no] ?? "✨"}
                      </span>
                      <span
                        className="text-4xl sm:text-5xl font-extrabold"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.no}
                      </span>
                      <span className="chip">
                        STEP {Number(s.no)}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {s.label}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[var(--color-fg-soft)] leading-relaxed max-w-md">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 탭 + 진행바 */}
          <div className="mt-10 mx-auto max-w-4xl">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {steps.map((s, i) => {
                const active = i === idx;
                return (
                  <button
                    key={s.no}
                    type="button"
                    onClick={() => goTo(i)}
                    className={[
                      "group relative overflow-hidden rounded-xl px-3 py-3 text-left transition",
                      active
                        ? "bg-[var(--color-brand-600)] text-white shadow-md"
                        : "bg-white text-[var(--color-fg-soft)] ring-1 ring-[var(--color-border)] hover:ring-[var(--color-brand-300)]",
                    ].join(" ")}
                    aria-current={active ? "step" : undefined}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider">
                      <span>{ICONS[s.no] ?? "✨"}</span>
                      <span>{s.no}</span>
                    </div>
                    <div
                      className={[
                        "mt-1 text-xs sm:text-sm font-bold truncate",
                        active ? "text-white" : "text-[var(--color-fg)]",
                      ].join(" ")}
                    >
                      {s.label}
                    </div>

                    {/* 활성 탭 진행바 */}
                    {active && !paused && (
                      <span
                        key={`bar-${idx}`}
                        className="absolute left-0 bottom-0 h-[3px] bg-white/90"
                        style={{
                          animation: `weflow-progress ${AUTO_MS}ms linear forwards`,
                        }}
                      />
                    )}
                    {active && paused && (
                      <span className="absolute left-0 bottom-0 h-[3px] w-full bg-white/40" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes weflow-progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </section>
  );
}
