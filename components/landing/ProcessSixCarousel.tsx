"use client";

import { useState } from "react";
import LineIcon from "@/components/LineIcon";

type Step = { no: string; label: string; desc: string; icon: string };

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

  const next = () => setIdx((i) => (i + 1) % steps.length);

  return (
    <section className="section-soft relative overflow-hidden">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-brand-500)_0%,transparent_70%)] opacity-[0.06] blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 relative z-10">
        <div className="text-center">
          <span className="chip bg-white border border-[var(--color-brand-100)] shadow-sm">
            Process
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-fg)]">
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
            <div className="relative h-[270px] sm:h-[210px]">
              {steps.map((s, i) => {
                const active = i === idx;
                return (
                  <div
                    key={s.no}
                    aria-hidden={!active}
                    className={[
                      "absolute inset-0 rounded-3xl bg-white/85 backdrop-blur-xl border border-[var(--color-brand-100)] p-7 sm:p-10",
                      "flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-7",
                      "transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)",
                      active
                        ? "opacity-100 translate-y-0 scale-100 z-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)]"
                        : "opacity-0 translate-y-4 scale-95 z-0 pointer-events-none",
                    ].join(" ")}
                  >
                    {/* Left: Glowing Icon Circle */}
                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white to-[var(--color-brand-50)] border border-[var(--color-brand-100)] shadow-[0_8px_16px_rgba(15,23,42,0.03),inset_0_2px_4px_white] transform transition-transform duration-500 hover:rotate-6">
                      <LineIcon
                        name={s.icon}
                        className="h-7 w-7 sm:h-8 sm:w-8 text-[var(--color-brand-600)]"
                      />
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 flex flex-col items-center sm:items-start">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-50)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-100)]/80">
                        STEP {s.no}
                      </span>
                      <h3 className="mt-3 text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-fg)]">
                        {s.label}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-[var(--color-fg-soft)] leading-relaxed max-w-lg">
                        {s.desc}
                      </p>
                    </div>

                    {/* Decorative Background Number */}
                    <span className="absolute right-6 bottom-4 text-7xl sm:text-8xl font-black text-[var(--color-brand-500)]/[0.03] select-none pointer-events-none font-mono tracking-tighter">
                      {s.no}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 탭 + 진행바 */}
          <div className="mt-10 mx-auto max-w-4xl">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {steps.map((s, i) => {
                const active = i === idx;
                return (
                  <button
                    key={s.no}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={[
                      "relative overflow-hidden rounded-2xl px-3 pt-3.5 pb-5 sm:pt-4 sm:pb-6 text-left transition-all duration-300",
                      active
                        ? "bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white shadow-lg shadow-[var(--color-brand-500)]/15 scale-[1.02] border border-[var(--color-brand-500)]/30"
                        : "bg-white/60 text-[var(--color-fg-soft)] border border-[var(--color-border)] hover:bg-white hover:text-[var(--color-fg)] hover:border-[var(--color-brand-300)] hover:shadow-sm",
                    ].join(" ")}
                    aria-current={active ? "step" : undefined}
                  >
                    <div
                      className={[
                        "text-[10px] font-bold tracking-widest",
                        active ? "text-white/70" : "text-[var(--color-brand-500)]",
                      ].join(" ")}
                    >
                      {s.no}
                    </div>
                    <div
                      className={[
                        "mt-1 text-xs sm:text-sm font-bold truncate",
                        active ? "text-white font-extrabold" : "text-[var(--color-fg)]",
                      ].join(" ")}
                    >
                      {s.label}
                    </div>

                    {/* 진행바 — 이 애니메이션이 끝나면 다음 스텝 */}
                    {active && (
                      <div className="absolute left-3 right-3 bottom-2 h-[3px] rounded-full bg-white/30 overflow-hidden">
                        <span
                          key={`bar-${idx}`}
                          onAnimationEnd={next}
                          className="absolute left-0 top-0 bottom-0 bg-white rounded-full"
                          style={{
                            width: 0,
                            animation: `weflow-progress ${AUTO_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      </div>
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
