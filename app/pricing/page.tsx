import Link from "next/link";
import {
  BUILD_PLANS,
  CARE_PLANS,
  AD_PLANS,
  PRICING_NOTES,
  PRICING_PERKS,
  type Plan,
} from "@/lib/content/pricing";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "제작플랜 & 가격안내 | WEFLOW",
  description:
    "랜딩페이지부터 홈페이지, 케어 플랜, 광고 운영까지. 합리적인 가격으로 시작하세요.",
  alternates: { canonical: "/pricing" },
};

const won = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <header className="text-center">
            <span className="chip bg-white ring-1 ring-[var(--color-brand-100)] shadow-sm">
              필수 선택형 · 3중 택1 · 파격 세일
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
              제작플랜 & 가격안내
            </h1>
            <p className="mt-4 text-[var(--color-fg-soft)]">
              랜딩페이지부터 홈페이지, 케어 플랜, 광고 운영까지
              <br />
              합리적인 가격으로 시작하세요.
            </p>
          </header>
        </div>
      </section>

      {/* SECTION 1 — 제작 플랜 */}
      <PlanSection
        sectionLabel="제작 플랜"
        sectionTitle="홈페이지 / 랜딩페이지 제작"
        sectionSub="3중 택1 · 모든 항목이 포함됩니다"
        plans={BUILD_PLANS}
        columns={3}
      />

      {/* SECTION 2 — 케어 플랜 */}
      <PlanSection
        sectionLabel="WEFLOW 케어플랜"
        sectionTitle="제작 후 운영까지 한 번에"
        sectionSub="월 정액으로 부담 없이 운영 · 광고 · 관리"
        plans={CARE_PLANS}
        columns={3}
        bgSoft
      />

      {/* SECTION 3 — 광고 플랜 */}
      <PlanSection
        sectionLabel="광고 플랜"
        sectionTitle="키워드 광고 세팅"
        sectionSub="네이버 · 당근 플레이스 키워드 광고를 한 번에 세팅해드립니다"
        plans={AD_PLANS}
        columns={2}
      />

      {/* NOTES */}
      <section className="bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <h3 className="text-lg font-bold">안내 사항</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-fg-soft)] leading-relaxed">
            {PRICING_NOTES.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-[var(--color-brand-500)] mt-0.5">※</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {PRICING_PERKS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-100)]"
              >
                <span className="text-emerald-500">✓</span>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            어떤 플랜이 우리에게 맞을까요?
          </h2>
          <p className="mt-3 text-white/85">
            업종과 목표를 알려주시면, 가장 적합한 플랜을 무료로 진단해드립니다.
          </p>
          <Link
            href="/diagnosis"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition"
          >
            무료 진단 신청 →
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── 섹션 헤더 + 카드 그리드 ─────────────────────────────────
function PlanSection({
  sectionLabel,
  sectionTitle,
  sectionSub,
  plans,
  columns,
  bgSoft,
}: {
  sectionLabel: string;
  sectionTitle: string;
  sectionSub: string;
  plans: Plan[];
  columns: 2 | 3;
  bgSoft?: boolean;
}) {
  const grid =
    columns === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <section className={bgSoft ? "bg-[var(--color-bg-soft)]" : ""}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="text-center">
          <span className="chip">{sectionLabel}</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            {sectionTitle}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-fg-soft)]">
            {sectionSub}
          </p>
        </div>

        <div className={`mt-12 grid ${grid} gap-5 lg:gap-6 items-stretch`}>
          {plans.map((p) => (
            <PlanCard key={p.key} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 단일 카드 ───────────────────────────────────────────
function PlanCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;
  return (
    <div
      className={[
        "relative flex flex-col rounded-2xl p-7 sm:p-8 transition",
        isHighlight
          ? "bg-gradient-to-br from-white to-[var(--color-brand-50)] ring-2 ring-[var(--color-brand-500)] shadow-xl shadow-[var(--color-brand-100)]/50"
          : "bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-brand-300)] hover:shadow-md",
      ].join(" ")}
    >
      {isHighlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--color-brand-600)] to-[var(--color-brand-700)] px-3 py-1 text-xs font-bold text-white shadow-md">
            <LineIcon name="crown" className="h-3.5 w-3.5" />
            추천
          </span>
        </div>
      )}

      {/* 헤더 */}
      <div>
        <h3
          className={[
            "text-xl font-extrabold tracking-tight",
            isHighlight ? "text-[var(--color-brand-700)]" : "",
          ].join(" ")}
        >
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-fg-mute)]">
          {plan.subtitle}
        </p>
      </div>

      {/* features — grow로 균일 높이 */}
      <ul className="mt-6 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-[var(--color-fg-soft)]"
          >
            <span
              className={
                isHighlight
                  ? "text-[var(--color-brand-600)] mt-0.5"
                  : "text-emerald-500 mt-0.5"
              }
            >
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* 가격 */}
      <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-fg-mute)] line-through">
          {plan.prefix ? `${plan.prefix} ` : ""}
          {won(plan.priceOriginal)}원
        </p>
        <p
          className={[
            "mt-1 flex items-baseline gap-1",
            isHighlight
              ? "text-[var(--color-brand-700)]"
              : "text-[var(--color-fg)]",
          ].join(" ")}
        >
          {plan.prefix && (
            <span className="text-base font-semibold">{plan.prefix}</span>
          )}
          <span className="text-3xl font-extrabold tracking-tight">
            {won(plan.priceSale)}
          </span>
          <span className="text-base font-semibold">
            원{plan.suffix ?? ""}
          </span>
        </p>
        <p className="mt-1 text-[10px] text-[var(--color-fg-mute)]">
          VAT 포함
        </p>
      </div>

      {/* CTA */}
      <Link
        href={`/reservation?plan=${plan.key}`}
        className={[
          "mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
          isHighlight
            ? "bg-gradient-to-r from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white hover:brightness-110 shadow-md"
            : "bg-white text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-200)] hover:bg-[var(--color-brand-50)]",
        ].join(" ")}
      >
        상담 신청하기
      </Link>
    </div>
  );
}
