import ReservationForm from "@/components/forms/ReservationForm";
import { getPlanByKey, planToProjectType } from "@/lib/content/pricing";

export const metadata = {
  title: "예약 | WEFLOW",
  description:
    "원하시는 날짜와 시간을 선택해 무료 상담을 예약하세요. 평균 24시간 내 연락드립니다.",
  alternates: { canonical: "/reservation" },
};

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const sp = await searchParams;
  const plan = sp.plan ? getPlanByKey(sp.plan) : null;
  const initialProjectType = sp.plan
    ? (planToProjectType(sp.plan) ?? undefined)
    : undefined;
  const planLabel = plan ? `${plan.name} ${plan.subtitle}` : undefined;

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <header className="text-center">
            <span className="chip bg-white ring-1 ring-[var(--color-brand-100)] shadow-sm">
              무료 상담 예약 · 24시간 내 연락 · 맞춤 견적
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">
              예약
            </h1>
            <p className="mt-3 text-[var(--color-fg-soft)]">
              원하시는 날짜와 시간대를 선택해 무료 상담을 예약하세요.
            </p>
          </header>
        </div>
      </section>

      <section className="section-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <ReservationForm
            initialProjectType={initialProjectType}
            planLabel={planLabel}
          />
        </div>
      </section>
    </>
  );
}
