import ContactForm from "@/components/forms/ContactForm";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "무료진단 | WEFLOW",
  description:
    "지금 바로 무료 진단받고, 사이트의 숨겨진 잠재력을 발견하세요. 평균 24시간 내 견적 회신.",
  alternates: { canonical: "/diagnosis" },
};

const DIAGNOSIS_ITEMS = [
  {
    title: "문의 구조 진단",
    desc: "잠재 고객이 문의까지 도달하는 흐름의 이탈 지점을 찾아드립니다.",
  },
  {
    title: "디자인 점검",
    desc: "브랜드와 서비스를 강조하는 화면 구성 제안을 받아보세요.",
  },
  {
    title: "검색 노출 분석",
    desc: "네이버 · 구글 검색 최적화와 로딩 속도 개선 가이드를 드립니다.",
  },
  {
    title: "문의 개선 제안",
    desc: "고객이 정보를 얻고 결제까지 원활하게 이어지는 흐름을 설계합니다.",
  },
];

export default async function DiagnosisPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const sp = await searchParams;
  const initialIndustry = sp.industry?.trim() || undefined;
  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <header className="text-center">
            <span className="chip bg-white ring-1 ring-[var(--color-brand-100)] shadow-sm">
              무료 진단 · 24시간 내 견적 회신
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">
              무료진단 받기
            </h1>
            <p className="mt-3 text-[var(--color-fg-soft)]">
              지금 바로 무료 진단받고, 사이트의 숨겨진 잠재력을 발견하세요.
            </p>
          </header>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* LEFT — 진단 항목 4개 */}
        <aside className="space-y-3 lg:sticky lg:top-24">
          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-bold">
              무료진단에서 이런 걸 확인해드립니다
            </h2>
            <ul className="mt-5 space-y-3">
              {DIAGNOSIS_ITEMS.map((it) => (
                <li
                  key={it.title}
                  className="rounded-xl bg-[var(--color-brand-50)]/60 p-4"
                >
                  <p className="font-semibold text-[var(--color-brand-700)]">
                    <span className="mr-1.5">✓</span>
                    {it.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-fg-soft)] pl-5">
                    {it.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5 bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white border-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <LineIcon name="zap" className="h-4 w-4" />
              24시간 내 연락 보장
            </p>
            <p className="mt-1 text-xs text-white/80">
              제출 즉시 상담 전문가가 검토 후 빠르게 연락드립니다.
            </p>
          </div>
        </aside>

        {/* RIGHT — 폼 */}
        <div>
          <ContactForm
            source="diagnosis"
            submitLabel="무료진단 후 견적 받기"
            initialIndustry={initialIndustry}
          />
        </div>
      </div>
      </section>
    </>
  );
}
