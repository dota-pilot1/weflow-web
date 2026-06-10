import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_META,
  type CaseCategory,
} from "@/lib/content/cases";
import { getCaseBySlug } from "@/lib/supabase/queries/cases";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) return { title: "사례를 찾을 수 없습니다 | WEFLOW" };
  return {
    title: `${c.title} 성공 사례 | WEFLOW`,
    description: c.summary ?? `${c.title} 업종의 전환 최적화 사례`,
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) notFound();

  const meta = CATEGORY_META[c.category as CaseCategory];

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* 뒤로가기 */}
      <Link
        href="/cases"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-fg-soft)] hover:text-[var(--color-brand-700)]"
      >
        ← 전체 사례로
      </Link>

      {/* 헤더 */}
      <header className="mt-6">
        <div className="flex items-center gap-2">
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 bg-white text-[var(--color-fg-soft)]",
              meta.ring,
            ].join(" ")}
          >
            <span>{meta.emoji}</span>
            {c.category}
          </span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
          {c.title}
        </h1>
        {c.summary && (
          <p className="mt-3 text-lg text-[var(--color-fg-soft)] leading-relaxed">
            {c.summary}
          </p>
        )}
      </header>

      {/* 히어로 — 카테고리 그라데이션 */}
      <div
        className={[
          "mt-8 aspect-[16/7] rounded-2xl bg-gradient-to-br flex items-center justify-center overflow-hidden",
          meta.gradient,
        ].join(" ")}
      >
        <span className="text-7xl sm:text-9xl">{meta.emoji}</span>
      </div>

      {/* 지표 (BEFORE / AFTER) */}
      {c.metric_label && c.metric_before && c.metric_after && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
          <MetricCard
            label={c.metric_label}
            value={c.metric_before}
            tag="BEFORE"
            tone="neutral"
          />
          <MetricCard
            label={c.metric_label}
            value={c.metric_after}
            tag="AFTER"
            tone="brand"
          />
        </div>
      )}

      {/* 본문 — 일반적 고민 / WEFLOW 접근 */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {c.challenge && (
          <Section title="이 업종의 일반적 고민" body={c.challenge} />
        )}
        {c.approach && (
          <Section title="WEFLOW의 접근" body={c.approach} highlight />
        )}
      </div>

      {/* CTA */}
      <section className="mt-14 rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white p-8 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          {c.title} 업종 상담을 신청해보세요
        </h2>
        <p className="mt-3 text-white/85">
          업종에 맞춘 전환 구조를 무료로 진단하고 견적까지 안내해드립니다.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href={`/reservation?industry=${encodeURIComponent(c.title)}`}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition"
          >
            이 업종 상담 예약 →
          </Link>
          <Link
            href={`/diagnosis?industry=${encodeURIComponent(c.title)}`}
            className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3.5 font-bold text-white ring-1 ring-white/30 hover:bg-white/25 transition"
          >
            무료 진단부터
          </Link>
        </div>
      </section>
    </article>
  );
}

function Section({
  title,
  body,
  highlight,
}: {
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl p-6 sm:p-7",
        highlight
          ? "bg-[var(--color-brand-50)] ring-1 ring-[var(--color-brand-100)]"
          : "bg-white ring-1 ring-[var(--color-border)]",
      ].join(" ")}
    >
      <h3
        className={[
          "text-sm font-bold tracking-tight",
          highlight ? "text-[var(--color-brand-700)]" : "text-[var(--color-fg)]",
        ].join(" ")}
      >
        {title}
      </h3>
      <p className="mt-3 text-sm sm:text-base text-[var(--color-fg-soft)] leading-relaxed whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tag,
  tone,
}: {
  label: string;
  value: string;
  tag: "BEFORE" | "AFTER";
  tone: "neutral" | "brand";
}) {
  const brand = tone === "brand";
  return (
    <div
      className={[
        "rounded-2xl p-6 sm:p-7",
        brand
          ? "bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white"
          : "bg-[var(--color-bg-soft)] ring-1 ring-[var(--color-border)]",
      ].join(" ")}
    >
      <p
        className={[
          "text-[10px] font-bold tracking-wider",
          brand ? "text-white/80" : "text-[var(--color-fg-mute)]",
        ].join(" ")}
      >
        {tag}
      </p>
      <p
        className={[
          "mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight",
          brand ? "text-white" : "text-[var(--color-fg)]",
        ].join(" ")}
      >
        {value}
      </p>
      <p
        className={[
          "mt-2 text-xs",
          brand ? "text-white/80" : "text-[var(--color-fg-soft)]",
        ].join(" ")}
      >
        {label}
      </p>
    </div>
  );
}
