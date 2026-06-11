import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMOS, getDemo } from "@/lib/content/demos";
import LineIcon from "@/components/LineIcon";

// WEFLOW 제작 샘플 — 검색 색인 제외, 빌드 시 정적 생성
export const dynamicParams = false;

export function generateStaticParams() {
  return DEMOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDemo(slug);
  return {
    title: d ? `${d.brand} — WEFLOW 제작 샘플` : "WEFLOW 제작 샘플",
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDemo(slug);
  if (!d) notFound();

  const r = d.radius === "full" ? "rounded-full" : "rounded-xl";
  const vars = {
    "--dp": d.colors.primary,
    "--dd": d.colors.dark,
    "--ds": d.colors.soft,
    "--di": d.colors.ink,
    "--da": d.colors.accent,
  } as React.CSSProperties;

  return (
    <div style={vars} className="min-h-screen bg-white text-[var(--di)]">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center gap-8">
          <span className="flex items-center gap-2.5 font-extrabold tracking-tight text-lg">
            <span className="h-7 w-7 rounded-lg bg-[var(--dp)]" />
            {d.brand}
          </span>
          <nav className="hidden md:flex gap-7 text-sm font-semibold text-[var(--di)]/60 ml-auto">
            {d.nav.map((n) => (
              <span key={n} className="hover:text-[var(--di)] cursor-pointer">
                {n}
              </span>
            ))}
          </nav>
          <a
            href="#contact"
            className={`${r} bg-[var(--dp)] px-5 py-2.5 text-sm font-bold text-white md:ml-2 ml-auto`}
          >
            {d.hero.cta}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${d.colors.soft} 0%, #ffffff 70%)`,
        }}
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: d.colors.primary }}
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ background: d.colors.accent }}
        />

        {d.heroStyle === "split" ? (
          <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <span
                className={`${r} inline-flex items-center gap-2 bg-white px-4 py-1.5 text-xs font-bold ring-1 ring-black/5 shadow-sm text-[var(--dp)]`}
              >
                {d.hero.badge}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight break-keep">
                {d.hero.h1a}
                <br />
                <span className="text-[var(--dp)]">{d.hero.h1b}</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[var(--di)]/65 leading-relaxed break-keep">
                {d.hero.sub}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className={`${r} bg-[var(--dp)] px-7 py-3.5 font-bold text-white shadow-lg shadow-black/10`}
                >
                  {d.hero.cta}
                </a>
                <span
                  className={`${r} bg-white px-7 py-3.5 font-bold ring-1 ring-black/10 cursor-pointer`}
                >
                  {d.hero.ghost}
                </span>
              </div>
            </div>

            {/* 미니 신청 폼 카드 */}
            <div className="rounded-2xl bg-white p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
              <p className="font-extrabold text-lg">{d.form.title}</p>
              <p className="mt-1 text-xs text-[var(--di)]/50">
                연락처를 남기시면 빠르게 연락드립니다.
              </p>
              <div className="mt-5 space-y-3">
                <input
                  placeholder="성함"
                  className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--dp)]"
                />
                <input
                  placeholder="연락처"
                  className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--dp)]"
                />
                <input
                  placeholder="문의 내용"
                  className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--dp)]"
                />
                <button
                  type="button"
                  className={`${r} w-full bg-[var(--dp)] py-3.5 font-bold text-white`}
                >
                  {d.form.submit}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto max-w-4xl px-5 py-20 lg:py-24 text-center">
            <span
              className={`${r} inline-flex items-center gap-2 bg-white px-4 py-1.5 text-xs font-bold ring-1 ring-black/5 shadow-sm text-[var(--dp)]`}
            >
              {d.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-[1.12] tracking-tight break-keep">
              {d.hero.h1a}
              <br />
              <span className="text-[var(--dp)]">{d.hero.h1b}</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[var(--di)]/65 leading-relaxed break-keep max-w-xl mx-auto">
              {d.hero.sub}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className={`${r} bg-[var(--dp)] px-7 py-3.5 font-bold text-white shadow-lg shadow-black/10`}
              >
                {d.hero.cta}
              </a>
              <span
                className={`${r} bg-white px-7 py-3.5 font-bold ring-1 ring-black/10 cursor-pointer`}
              >
                {d.hero.ghost}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* STATS */}
      <section className="bg-[var(--dd)] text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-3 gap-6 text-center">
          {d.stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-white/60 font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight break-keep">
          {d.brand}가 다른 이유
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {d.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-[var(--ds)] p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                <LineIcon name={f.icon} className="h-5 w-5 text-[var(--dp)]" />
              </span>
              <h3 className="mt-5 font-extrabold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--di)]/60 leading-relaxed break-keep">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-[var(--ds)]/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight">
            이용 안내
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {d.programs.map((p) => (
              <div
                key={p.name}
                className={[
                  "rounded-2xl p-7 flex flex-col",
                  p.highlight
                    ? "bg-[var(--dd)] text-white shadow-xl"
                    : "bg-white ring-1 ring-black/5",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg">{p.name}</h3>
                  {p.note && (
                    <span
                      className={`${r} px-2.5 py-1 text-[10px] font-bold bg-[var(--da)] text-white`}
                    >
                      {p.note}
                    </span>
                  )}
                </div>
                <p
                  className={[
                    "mt-2 text-sm leading-relaxed flex-1",
                    p.highlight ? "text-white/65" : "text-[var(--di)]/60",
                  ].join(" ")}
                >
                  {p.desc}
                </p>
                <p className="mt-6 text-2xl font-extrabold tracking-tight">
                  {p.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight">
          고객 후기
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {d.reviews.map((rv) => (
            <figure
              key={rv.by}
              className="rounded-2xl bg-white p-7 ring-1 ring-black/5 shadow-sm"
            >
              <div className="text-[var(--da)] text-sm tracking-wider">
                ★★★★★
              </div>
              <blockquote className="mt-3 font-semibold leading-relaxed break-keep">
                “{rv.text}”
              </blockquote>
              <figcaption className="mt-4 text-xs text-[var(--di)]/45 font-semibold">
                — {rv.by}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[var(--dd)] text-white">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {d.form.title}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            영업시간 내 평균 10분 이내로 연락드립니다.
          </p>
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              placeholder="성함"
              className="rounded-lg bg-white/10 ring-1 ring-white/20 px-4 py-3.5 text-sm placeholder:text-white/40 outline-none focus:ring-white/50"
            />
            <input
              placeholder="연락처"
              className="rounded-lg bg-white/10 ring-1 ring-white/20 px-4 py-3.5 text-sm placeholder:text-white/40 outline-none focus:ring-white/50"
            />
            <button
              type="button"
              className={`${r} bg-[var(--dp)] px-6 py-3.5 font-bold text-white`}
            >
              {d.form.submit}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-5 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--di)]/45">
          <span className="font-semibold">
            © {d.brand}. {d.domain}
          </span>
          <span className="flex items-center gap-4">
            <Link
              href="/"
              className="font-bold text-[var(--di)]/60 hover:text-[var(--di)]"
            >
              made by WEFLOW
            </Link>
            <Link href="/" className="hover:underline">
              ← WEFLOW로 돌아가기
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
