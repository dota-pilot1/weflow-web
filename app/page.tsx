import Link from "next/link";
import {
  BENEFITS,
  PROCESS_TIMELINE,
  PROCESS_SIX,
  CASES_PREVIEW,
  REVIEWS,
  DIAGNOSIS_CTA,
} from "@/lib/content/home";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <span className="chip">홈페이지 · 랜딩 · 광고 · 운영</span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            문의로 이어지는
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              홈페이지를 만듭니다
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[var(--color-fg-soft)]">
            홈페이지 제작부터 광고 연동 · 운영 관리까지
            <br />
            단순 제작이 아닌 문의 구조까지 설계합니다.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/diagnosis" className="btn-primary">
              무료 진단 신청
            </Link>
            <Link href="/cases" className="btn-secondary">
              성공 사례 보기
            </Link>
            <Link href="/landing" className="btn-secondary">
              WEFLOW 랜딩 페이지
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="card px-5 py-4 text-left">
              <p className="text-sm font-bold">케어 플랜</p>
              <p className="text-xs text-[var(--color-fg-mute)] mt-1">
                제작 · 광고 · 운영
              </p>
            </div>
            <div className="card px-5 py-4 text-left">
              <p className="text-sm font-bold">빠른 제작</p>
              <p className="text-xs text-[var(--color-fg-mute)] mt-1">
                3일 ~ 7일
              </p>
            </div>
            <div className="card px-5 py-4 text-left">
              <p className="text-sm font-bold">합리적 비용</p>
              <p className="text-xs text-[var(--color-fg-mute)] mt-1">
                가성비 + 퀄리티
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS - 케어 플랜 6칸 */}
      <section className="bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {BENEFITS.title}
            </h2>
            <p className="mt-3 text-[var(--color-fg-soft)]">{BENEFITS.sub}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.cards.map((c) => (
              <div
                key={c.title}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-4 font-bold text-lg">{c.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-fg-soft)]">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2">
              {BENEFITS.flow.map((step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className="flex-1 rounded-xl bg-[var(--color-brand-50)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-brand-700)]">
                    {step}
                  </div>
                  {i < BENEFITS.flow.length - 1 && (
                    <span className="hidden sm:block text-[var(--color-brand-300)]">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASES PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
          <div className="card p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {CASES_PREVIEW.title}
            </h2>
            <p className="mt-4 text-sm text-[var(--color-fg-soft)]">
              {CASES_PREVIEW.sub}
            </p>
            <Link
              href="/cases"
              className="btn-primary mt-8 inline-flex"
            >
              {CASES_PREVIEW.more}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CASES_PREVIEW.items.map((item) => (
              <Link
                key={item.title}
                href="/cases"
                className="card p-4 hover:border-[var(--color-brand-300)] hover:shadow-md transition group"
              >
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                  📷
                </div>
                <div className="mt-3">
                  <p className="text-xs text-[var(--color-brand-600)] font-semibold">
                    {item.category}
                  </p>
                  <p className="mt-0.5 text-sm font-bold">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — 4단계 + 6단계 양옆 나란히 */}
      <section className="bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 4단계 */}
            <div className="card p-8">
              <div>
                <span className="chip">PROCESS</span>
                <h3 className="mt-3 text-2xl font-extrabold">
                  {PROCESS_TIMELINE.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                  {PROCESS_TIMELINE.sub}
                </p>
              </div>
              <ol className="mt-8 space-y-4">
                {PROCESS_TIMELINE.steps.map((s, i) => (
                  <li
                    key={s.label}
                    className="flex items-start gap-4 rounded-xl bg-[var(--color-bg-soft)] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-xl">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[var(--color-brand-600)]">
                        STEP {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="font-bold mt-0.5">{s.label}</p>
                      <p className="text-xs text-[var(--color-fg-mute)] mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* 6단계 */}
            <div className="card p-8">
              <div>
                <span className="chip">DETAILED FLOW</span>
                <h3 className="mt-3 text-2xl font-extrabold">
                  {PROCESS_SIX.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                  {PROCESS_SIX.sub}
                </p>
              </div>
              <ol className="mt-8 space-y-3">
                {PROCESS_SIX.steps.map((s) => (
                  <li
                    key={s.no}
                    className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] px-4 py-3"
                  >
                    <span className="text-xl font-extrabold text-[var(--color-brand-600)] w-10">
                      {s.no}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{s.label}</p>
                      <p className="text-xs text-[var(--color-fg-mute)] mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS — 25개 양방향 마퀴 */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="chip">REVIEWS</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold">
                실제 고객 후기
              </h2>
              <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                별점 5점 후기만 모았습니다.
              </p>
            </div>
            <Link
              href="/diagnosis"
              className="text-sm font-semibold text-[var(--color-brand-700)] hover:underline"
            >
              후기 더보기 →
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Marquee items={REVIEWS.slice(0, 13)} direction="left" />
          <Marquee items={REVIEWS.slice(13)} direction="right" />
        </div>
      </section>

      {/* DIAGNOSIS CTA */}
      <section className="bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            {DIAGNOSIS_CTA.title}
          </h2>
          <p className="mt-3 text-white/85">{DIAGNOSIS_CTA.sub}</p>

          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {DIAGNOSIS_CTA.items.map((item) => (
              <li
                key={item}
                className="rounded-xl bg-white/10 backdrop-blur-sm px-3 py-4 text-sm font-semibold ring-1 ring-white/15"
              >
                <span className="inline-block mr-1 text-emerald-300">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/diagnosis"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition"
          >
            {DIAGNOSIS_CTA.cta} →
          </Link>
        </div>
      </section>
    </>
  );
}

// 가로로 자동 흐르는 후기 마퀴 — CSS 애니메이션만 사용
function Marquee({
  items,
  direction,
}: {
  items: { text: string; by: string }[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative">
      <div
        className="flex gap-3 will-change-transform"
        style={{
          animation: `${
            direction === "left" ? "marquee-l" : "marquee-r"
          } 60s linear infinite`,
        }}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            className="card shrink-0 w-[300px] sm:w-[360px] p-5"
          >
            <div className="text-[var(--color-accent-500)] text-sm">★★★★★</div>
            <p className="mt-2 text-sm text-[var(--color-fg)] leading-relaxed">
              {r.text}
            </p>
            <p className="mt-3 text-xs text-[var(--color-fg-mute)]">— {r.by}</p>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-l {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .group:hover [style*='marquee'] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
