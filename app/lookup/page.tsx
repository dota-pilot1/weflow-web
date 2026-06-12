import LookupForm from "@/components/forms/LookupForm";

export const metadata = {
  title: "접수 현황 조회 | WEFLOW",
  description:
    "조회 코드와 휴대폰 번호 뒤 4자리로 예약·무료진단 접수 현황을 확인하세요.",
  alternates: { canonical: "/lookup" },
};

export default async function LookupPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <header className="text-center">
            <span className="chip bg-white ring-1 ring-[var(--color-brand-100)] shadow-sm">
              접수 현황 조회 · 실시간 확인
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">
              내 신청 조회
            </h1>
            <p className="mt-3 text-[var(--color-fg-soft)]">
              신청 완료 시 발급된 조회 코드와 휴대폰 번호 뒤 4자리로
              <br className="hidden sm:block" />
              진행 상황을 확인할 수 있어요.
            </p>
          </header>
        </div>
      </section>

      <section className="section-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <LookupForm initialCode={sp.code} />
        </div>
      </section>
    </>
  );
}
