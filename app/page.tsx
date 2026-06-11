import Link from "next/link";
import {
  BENEFITS,
  PROCESS_SIX,
  CASES_PREVIEW,
  REVIEWS,
  DIAGNOSIS_CTA,
} from "@/lib/content/home";
import ProcessSixCarousel from "@/components/landing/ProcessSixCarousel";
import HeroVisual from "@/components/landing/HeroVisual";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-20 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <span className="chip">홈페이지 · 랜딩 · 광고 · 운영</span>
            <h1 className="mt-6 text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
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

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link href="/diagnosis" className="btn-primary">
                무료 진단 신청
              </Link>
              <Link href="/cases" className="btn-secondary">
                성공 사례 보기
              </Link>
              <Link
                href="/landing"
                className="text-sm font-semibold text-[var(--color-fg-mute)] hover:text-[var(--color-brand-700)] transition px-2 py-2"
              >
                WEFLOW 랜딩 페이지 →
              </Link>
            </div>

            <dl className="mt-12 flex items-start justify-center lg:justify-start divide-x divide-[var(--color-border)]">
              {[
                ["케어 플랜", "제작 · 광고 · 운영"],
                ["빠른 제작", "3일 ~ 7일"],
                ["합리적 비용", "가성비 + 퀄리티"],
              ].map(([title, desc]) => (
                <div key={title} className="px-5 first:pl-0 text-left">
                  <dt className="text-sm font-bold">{title}</dt>
                  <dd className="text-xs text-[var(--color-fg-mute)] mt-1">
                    {desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* BENEFITS - 케어 플랜 6칸 */}
      <section className="section-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {BENEFITS.title}
            </h2>
            <p className="mt-3 text-[var(--color-fg-soft)]">{BENEFITS.sub}</p>
          </div>

          <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 scroll-pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:mx-0 sm:px-0">
            {BENEFITS.cards.map((c) => (
              <div
                key={c.title}
                className="card p-6 hover:shadow-md transition-shadow min-w-[280px] snap-start sm:min-w-0"
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
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

      {/* PROCESS — 6단계 자동 캐러셀 */}
      <ProcessSixCarousel
        title={PROCESS_SIX.title}
        sub={PROCESS_SIX.sub}
        steps={PROCESS_SIX.steps}
      />

      {/* REVIEWS — 25개 양방향 마퀴 */}
      <section className="py-24 sm:py-28 overflow-hidden">
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

        {/* 모바일: 손으로 넘기는 스냅 스와이프 */}
        <div className="sm:hidden mt-10 flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 scroll-pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.text} review={r} className="w-[280px] shrink-0 snap-start" />
          ))}
        </div>

        {/* 데스크톱: 양방향 자동 마퀴 */}
        <div className="hidden sm:block mt-10 space-y-4">
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

function ReviewCard({
  review,
  className,
}: {
  review: { text: string; by: string };
  className?: string;
}) {
  return (
    <div className={`card p-5 ${className ?? ""}`}>
      <div className="text-[var(--color-accent-500)] text-sm">★★★★★</div>
      <p className="mt-2 text-sm text-[var(--color-fg)] leading-relaxed">
        {review.text}
      </p>
      <p className="mt-3 text-xs text-[var(--color-fg-mute)]">— {review.by}</p>
    </div>
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
          <ReviewCard key={i} review={r} className="shrink-0 w-[300px] sm:w-[360px]" />
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
