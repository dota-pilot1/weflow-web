import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import {
  BUILD_PLANS,
  CARE_PLANS,
  AD_PLANS,
  type Plan,
} from "@/lib/content/pricing";
import { PROCESS_6 } from "@/lib/content/service";
import { REVIEWS } from "@/lib/content/home";
import { COMPANY, LINKS } from "@/lib/site";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "WEFLOW — 무료 진단 신청",
  description:
    "랜딩페이지부터 홈페이지, 광고 운영까지 한 번에. 지금 무료 진단 신청하세요.",
  // 광고 유입용 페이지 — 홈과 콘텐츠가 겹치므로 색인 제외
  robots: { index: false, follow: true },
};

const won = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

const BENEFITS = [
  {
    title: "빠른 제작 진행",
    desc: "랜딩페이지 3~4일 / 홈페이지 약 1주일. 빠르게 제작하고 빠르게 운영 시작합니다.",
    icon: "zap",
  },
  {
    title: "합리적인 비용",
    desc: "불필요한 비용 없이, 필요한 기능만. 가성비 + 실속 + 퀄리티를 함께 제공합니다.",
    icon: "wallet",
  },
  {
    title: "24시간 상담 가능",
    desc: "정해진 시간만 기다리지 마세요. 문의가 생길 때 언제든 빠른 상담 가능합니다.",
    icon: "headset",
  },
  {
    title: "제작 후 운영 관리",
    desc: "홈페이지 만들고 끝이 아닙니다. 검색 등록 · 수정 · 유지보수까지 함께합니다.",
    icon: "wrench",
  },
  {
    title: "광고 연동 지원",
    desc: "인스타 · 스레드 · 블로그 · 카카오톡 · 당근 플레이스 광고까지 한 번에 연결합니다.",
    icon: "megaphone",
  },
];

const DIAGNOSIS_ITEMS = [
  "문의 구조 진단",
  "디자인 점검",
  "검색 노출 분석",
  "문의 개선 제안",
];

const ALL_PLANS = [...BUILD_PLANS, ...CARE_PLANS, ...AD_PLANS];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 미니 헤더 */}
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white text-xs font-bold">
              W
            </span>
            <span className="text-lg font-extrabold tracking-tight">WEFLOW</span>
          </Link>
          <a
            href={LINKS.phoneTel}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-50)] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-100)] transition"
          >
            <LineIcon name="phone" className="h-3.5 w-3.5" />
            {LINKS.phone}
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
            {/* ───────── LEFT: 콘텐츠 ───────── */}
            <div className="space-y-16 lg:space-y-24 min-w-0">
              {/* HERO */}
              <section>
                <span className="chip">랜딩페이지 · 홈페이지 · 광고 운영</span>
                <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  문의로 이어지는
                  <br />
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    홈페이지를 만듭니다
                  </span>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-[var(--color-fg-soft)] leading-relaxed">
                  기획부터 제작, 광고 연동, 운영 관리까지
                  <br />
                  WEFLOW가 함께합니다.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#form" className="btn-primary">
                    무료 진단 후 견적받기
                  </a>
                  <a href="#form" className="btn-secondary">
                    실제 제작 성공 보기
                  </a>
                </div>
              </section>

              {/* WEFLOW CARE PLAN 혜택 */}
              <section>
                <div className="text-center sm:text-left">
                  <span className="chip">WEFLOW CARE PLAN</span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                    제작부터 운영 · 광고 · 관리까지 한 번에
                  </h2>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BENEFITS.map((b) => (
                    <div key={b.title} className="card p-5 sm:p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-50)] ring-1 ring-[var(--color-brand-100)]">
                        <LineIcon
                          name={b.icon}
                          className="h-5 w-5 text-[var(--color-brand-600)]"
                        />
                      </div>
                      <h3 className="mt-3 font-bold text-base sm:text-lg">
                        {b.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--color-fg-soft)] leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 가격 카드 8개 */}
              <section>
                <div className="text-center sm:text-left">
                  <span className="chip">제작 플랜 & 가격</span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                    합리적인 가격으로 시작하세요
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                    제작 / 케어 / 광고 — 필요한 만큼 선택하세요
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ALL_PLANS.map((p) => (
                    <MiniPlanCard key={p.key} plan={p} />
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--color-fg-mute)]">
                  ※ 모든 가격은 VAT 포함입니다. 도메인 / 광고비는 별도.
                </p>
              </section>

              {/* 제작 진행 6단계 */}
              <section>
                <div className="text-center sm:text-left">
                  <span className="chip">PROCESS</span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                    6단계 제작 프로세스
                  </h2>
                </div>
                <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROCESS_6.map((s) => (
                    <li
                      key={s.no}
                      className="flex items-start gap-3 rounded-xl bg-[var(--color-bg-soft)] p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[var(--color-brand-200)]">
                        <LineIcon
                          name={s.icon}
                          className="h-4 w-4 text-[var(--color-brand-600)]"
                        />
                      </span>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-[var(--color-brand-600)] tracking-wider">
                          STEP {s.no}
                        </p>
                        <p className="font-bold text-sm">{s.label}</p>
                        <p className="text-xs text-[var(--color-fg-mute)] mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 무료진단 4가지 */}
              <section className="rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] p-8 sm:p-10 text-white">
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  무료진단에서 이런 걸 확인해드립니다
                </h2>
                <p className="mt-3 text-white/85">
                  지금 바로 무료 진단받고, 사이트의 숨겨진 잠재력을 발견하세요.
                </p>
                <ul className="mt-7 grid grid-cols-2 gap-3">
                  {DIAGNOSIS_ITEMS.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-sm font-semibold ring-1 ring-white/15"
                    >
                      <span className="text-emerald-300">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href="#form"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-bold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition"
                >
                  무료진단 후 견적 받기 →
                </a>
              </section>

              {/* 후기 마퀴 */}
              <section className="-mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="text-center sm:text-left">
                    <span className="chip">REVIEWS</span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                      실제 고객 후기
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
                      별점 5점 후기만 모았습니다.
                    </p>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <Marquee items={REVIEWS.slice(0, 13)} direction="left" />
                  <Marquee items={REVIEWS.slice(13)} direction="right" />
                </div>
              </section>
            </div>

            {/* ───────── RIGHT: STICKY FORM ───────── */}
            <aside className="lg:sticky lg:top-20" id="form">
              <div className="card p-6 shadow-xl ring-2 ring-[var(--color-brand-200)]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 items-center gap-1 rounded-full bg-rose-100 px-2.5 text-[10px] font-bold text-rose-700">
                    <LineIcon name="clock" className="h-3 w-3" />
                    24시간 내 답변
                  </span>
                </div>
                <h3 className="mt-3 text-xl sm:text-2xl font-extrabold">
                  무료 진단 받기
                </h3>
                <p className="mt-1 text-xs text-[var(--color-fg-mute)]">
                  정보 입력하시면 평균 24시간 내에 답변드립니다.
                </p>
                <div className="mt-5">
                  <ContactForm
                    source="landing"
                    submitLabel="무료진단 후 견적 받기"
                    variant="bare"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* 미니 푸터 */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-[var(--color-fg-mute)]">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div>
              <p className="font-bold text-[var(--color-fg)]">{COMPANY.name}</p>
              <p className="mt-1">
                대표: {COMPANY.ceo} · 사업자등록번호: {COMPANY.bizNumber}
              </p>
              <p>
                이메일: {COMPANY.email} · 운영시간: {COMPANY.hours}
              </p>
            </div>
            <p className="sm:text-right">{COMPANY.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── 작은 가격 카드 (랜딩 전용) ────────────────────
function MiniPlanCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;
  return (
    <div
      className={[
        "rounded-xl p-5 transition",
        isHighlight
          ? "bg-gradient-to-br from-white to-[var(--color-brand-50)] ring-2 ring-[var(--color-brand-500)]"
          : "bg-white ring-1 ring-[var(--color-border)]",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <p
            className={[
              "text-sm font-bold",
              isHighlight ? "text-[var(--color-brand-700)]" : "",
            ].join(" ")}
          >
            {isHighlight && (
              <LineIcon
                name="crown"
                className="mr-1 inline h-3.5 w-3.5 align-[-2px]"
              />
            )}
            {plan.name}
          </p>
          <p className="text-xs text-[var(--color-fg-mute)]">{plan.subtitle}</p>
        </div>
        <div className="text-right whitespace-nowrap">
          <p className="text-[10px] text-[var(--color-fg-mute)] line-through">
            {plan.prefix ? `${plan.prefix} ` : ""}
            {won(plan.priceOriginal)}원
          </p>
          <p
            className={[
              "text-base sm:text-lg font-extrabold leading-tight",
              isHighlight
                ? "text-[var(--color-brand-700)]"
                : "text-[var(--color-fg)]",
            ].join(" ")}
          >
            {plan.prefix && <span className="text-xs">{plan.prefix} </span>}
            {won(plan.priceSale)}
            <span className="text-xs">원{plan.suffix ?? ""}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── 후기 마퀴 ────────────────────────────────────
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
            className="card shrink-0 w-[280px] sm:w-[320px] p-5"
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
