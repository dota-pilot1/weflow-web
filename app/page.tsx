import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <span className="chip">홈페이지 · 랜딩 · 광고 · 운영</span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
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
          홈페이지 제작부터 광고 연동·운영 관리까지
          <br />
          단순 제작이 아닌 문의 구조까지 설계합니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/diagnosis" className="btn-primary">
            무료 진단 신청
          </Link>
          <Link href="/cases" className="btn-secondary">
            성공 사례 보기
          </Link>
          <Link href="/landing" className="btn-secondary">
            WEFLOW 랜딩 페이지
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <div className="card px-5 py-4 text-left">
            <p className="text-sm font-bold">케어 플랜</p>
            <p className="text-xs text-[var(--color-fg-mute)] mt-1">
              제작 · 광고 · 운영
            </p>
          </div>
          <div className="card px-5 py-4 text-left">
            <p className="text-sm font-bold">빠른 제작</p>
            <p className="text-xs text-[var(--color-fg-mute)] mt-1">3일 ~ 7일</p>
          </div>
          <div className="card px-5 py-4 text-left">
            <p className="text-sm font-bold">합리적 비용</p>
            <p className="text-xs text-[var(--color-fg-mute)] mt-1">
              가성비 + 퀄리티
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
