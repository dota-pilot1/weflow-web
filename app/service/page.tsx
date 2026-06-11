import Link from "next/link";
import {
  PROCESS_6,
  AD_SYSTEMS,
  type AdSystem,
} from "@/lib/content/service";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "서비스 | WEFLOW",
  description:
    "상담부터 사후관리까지 — WEFLOW의 6단계 제작 프로세스와 광고 운영 시스템.",
  alternates: { canonical: "/service" },
};

const TAG_STYLE: Record<AdSystem["tag"], string> = {
  콘텐츠: "bg-rose-50 text-rose-700 ring-rose-200",
  광고: "bg-amber-50 text-amber-700 ring-amber-200",
  SEO: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function ServicePage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <header className="text-center">
            <span className="chip bg-white ring-1 ring-[var(--color-brand-100)] shadow-sm">
              WEFLOW SERVICE
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
              상담부터 사후관리까지,
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WEFLOW가 함께합니다
              </span>
            </h1>
            <p className="mt-5 text-[var(--color-fg-soft)]">
              기획 · 디자인 · 개발 · SEO · 광고 운영까지
              <br />
              단계별 전문 인력이 책임지고 진행합니다.
            </p>
          </header>
        </div>
      </section>

      {/* SECTION 1 — 6단계 제작 과정 (세로 타임라인) */}
      <section className="section-soft">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <span className="chip">PROCESS</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              6단계 제작 프로세스
            </h2>
            <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
              체계적인 단계로 완성도를 보장합니다
            </p>
          </div>

          <ol className="mt-14 relative">
            {/* 세로 연결 라인 */}
            <span
              aria-hidden
              className="absolute left-4 sm:left-7 top-2 bottom-2 w-px bg-[var(--color-brand-200)]"
            />
            {PROCESS_6.map((s) => (
              <li
                key={s.no}
                className="relative pl-12 sm:pl-20 pb-6 last:pb-0"
              >
                {/* 점 */}
                <span
                  aria-hidden
                  className="absolute left-0 sm:left-2 top-2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white ring-2 ring-[var(--color-brand-500)] shadow-sm"
                >
                  <LineIcon
                    name={s.icon}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-brand-600)]"
                  />
                </span>
                {/* 카드 */}
                <div className="card p-5 sm:p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-bold text-[var(--color-brand-600)] tracking-wider">
                      STEP {s.no}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold">
                      {s.label}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 2 — 광고 운영 · 사후관리 시스템 (8개) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          <span className="chip">AD & MANAGEMENT</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            광고 운영 · 사후관리 시스템
          </h2>
          <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
            제작 이후가 진짜 시작입니다. 8가지 채널을 통합 운영합니다.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {AD_SYSTEMS.map((a) => (
            <div
              key={a.title}
              className="group card p-5 sm:p-6 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-50)] ring-1 ring-[var(--color-brand-100)]">
                  <LineIcon
                    name={a.icon}
                    className="h-5 w-5 text-[var(--color-brand-600)]"
                  />
                </div>
                <span
                  className={[
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1",
                    TAG_STYLE[a.tag],
                  ].join(" ")}
                >
                  {a.tag}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-sm sm:text-base">
                {a.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-fg-mute)] leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            제작부터 운영까지, 한 번에 맡기세요
          </h2>
          <p className="mt-3 text-white/85">
            지금 무료 진단 신청하시면 24시간 내에 견적과 함께 답변드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/diagnosis"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition"
            >
              무료 진단 신청 →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3.5 font-bold text-white ring-1 ring-white/30 hover:bg-white/20 transition"
            >
              가격 안내 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
