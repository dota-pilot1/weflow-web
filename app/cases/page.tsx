import Link from "next/link";
import {
  CATEGORY_META,
  ALL_CATEGORIES,
  type CaseCategory,
} from "@/lib/content/cases";
import { listPublishedCases } from "@/lib/supabase/queries/cases";

export const metadata = {
  title: "성공사례 | WEFLOW",
  description:
    "다양한 업종의 성공 사례를 확인하세요. 어디서도 볼 수 없는 업종별 전환 최적화 사례.",
};

export const revalidate = 60;

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const selected = (
    ALL_CATEGORIES.includes(sp.category as CaseCategory) ? sp.category : null
  ) as CaseCategory | null;

  const allCases = await listPublishedCases();
  const visible = selected
    ? allCases.filter((c) => c.category === selected)
    : allCases;

  // 카테고리별 카운트 (필터 칩에 표시)
  const counts = ALL_CATEGORIES.reduce(
    (acc, c) => {
      acc[c] = allCases.filter((x) => x.category === c).length;
      return acc;
    },
    {} as Record<CaseCategory, number>
  );

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <header className="text-center">
            <span className="chip bg-white ring-1 ring-[var(--color-brand-100)] shadow-sm">
              REAL CASES · 업종별 전환 최적화
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
              성공 사례
            </h1>
            <p className="mt-4 text-[var(--color-fg-soft)]">
              어디서도 볼 수 없는 업종별 전환 최적화 사례를
              <br />
              직접 확인하세요.
            </p>
          </header>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-2">
          <FilterChip
            href="/cases"
            label={`전체`}
            count={allCases.length}
            active={!selected}
          />
          {ALL_CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              href={`/cases?category=${encodeURIComponent(c)}`}
              label={`${CATEGORY_META[c].emoji} ${c}`}
              count={counts[c]}
              active={selected === c}
            />
          ))}
        </div>

        {/* 카드 그리드 */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {visible.map((c) => (
            <CaseCard
              key={c.slug}
              slug={c.slug}
              title={c.title}
              category={c.category as CaseCategory}
              summary={c.summary}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-sm text-[var(--color-fg-mute)]">
            해당 카테고리의 사례가 없습니다.
          </p>
        )}
      </section>

      {/* 더보기 CTA */}
      <section className="bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            우리 업종 사례가 궁금하신가요?
          </h2>
          <p className="mt-3 text-white/85">
            업종에 맞춘 맞춤 전환 구조를 무료로 진단해드립니다.
          </p>
          <Link
            href="/diagnosis"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition"
          >
            무료 진단 신청 →
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── 필터 칩 ──────────────────────────────────────
function FilterChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition",
        active
          ? "bg-[var(--color-brand-600)] text-white ring-[var(--color-brand-600)]"
          : "bg-white text-[var(--color-fg-soft)] ring-[var(--color-border)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)] hover:ring-[var(--color-brand-200)]",
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "rounded-full px-1.5 text-[10px] font-bold",
          active
            ? "bg-white/20 text-white"
            : "bg-[var(--color-bg-muted)] text-[var(--color-fg-mute)]",
        ].join(" ")}
      >
        {count}
      </span>
    </Link>
  );
}

// ─── 케이스 카드 ──────────────────────────────────
function CaseCard({
  slug,
  title,
  category,
  summary,
}: {
  slug: string;
  title: string;
  category: CaseCategory;
  summary: string | null;
}) {
  const meta = CATEGORY_META[category];
  return (
    <Link
      href={`/cases/${slug}`}
      className={[
        "group flex flex-col rounded-2xl bg-white ring-1 ring-[var(--color-border)] overflow-hidden",
        "hover:ring-[var(--color-brand-300)] hover:shadow-md transition",
      ].join(" ")}
    >
      {/* 이미지 영역 — 카테고리 그라데이션 + 이모지 */}
      <div
        className={[
          "aspect-[4/3] bg-gradient-to-br flex items-center justify-center",
          meta.gradient,
        ].join(" ")}
      >
        <span className="text-5xl sm:text-6xl transition-transform group-hover:scale-110">
          {meta.emoji}
        </span>
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4 flex-1 flex flex-col">
        <span
          className={[
            "inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1",
            "bg-white text-[var(--color-fg-soft)]",
            meta.ring,
          ].join(" ")}
        >
          {category}
        </span>
        <p className="mt-2 font-bold text-sm sm:text-base text-[var(--color-fg)]">
          {title}
        </p>
        {summary && (
          <p className="mt-1.5 text-xs text-[var(--color-fg-soft)] line-clamp-2 leading-relaxed">
            {summary}
          </p>
        )}
        <span className="mt-3 text-xs font-semibold text-[var(--color-brand-700)] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
          자세히 보기 →
        </span>
      </div>
    </Link>
  );
}
