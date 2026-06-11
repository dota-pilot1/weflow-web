import Link from "next/link";

export const metadata = {
  title: "페이지를 찾을 수 없습니다 | WEFLOW",
  description: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-brand-50)] via-[var(--color-bg-soft)] to-white">
      {/* soft decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(147,197,253,0.55) 0%, rgba(147,197,253,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(191,219,254,0.6) 0%, rgba(191,219,254,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <NotFoundArt />

      <h1 className="mt-10 text-3xl sm:text-4xl font-extrabold tracking-tight">
        찾고 있는 페이지가
        <br />
        <span
          style={{
            backgroundImage:
              "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          여기에 없어요
        </span>
      </h1>

      <p className="mt-5 text-base sm:text-lg text-[var(--color-fg-soft)]">
        주소가 변경되었거나, 더 이상 운영하지 않는 페이지일 수 있어요.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          홈으로 돌아가기
        </Link>
        <Link
          href="/diagnosis"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-bold text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-200)] hover:bg-[var(--color-brand-50)] transition"
        >
          무료 진단 신청 →
        </Link>
      </div>
      </div>
    </section>
  );
}

function NotFoundArt() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <svg
        viewBox="0 0 520 260"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="nfGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="nfGradSoft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
        </defs>

        {/* soft background blob */}
        <ellipse
          cx="260"
          cy="220"
          rx="220"
          ry="18"
          fill="url(#nfGradSoft)"
          opacity="0.6"
        />

        {/* floating sparkles */}
        <circle cx="70" cy="60" r="4" fill="#93c5fd" />
        <circle cx="450" cy="90" r="5" fill="#60a5fa" />
        <circle cx="100" cy="180" r="3" fill="#bfdbfe" />
        <circle cx="430" cy="200" r="3.5" fill="#93c5fd" />

        {/* "4" left */}
        <text
          x="80"
          y="200"
          fontSize="220"
          fontWeight="900"
          fill="url(#nfGrad)"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Pretendard', sans-serif"
        >
          4
        </text>

        {/* magnifying glass as "0" */}
        <g transform="translate(260 130)">
          <circle
            cx="0"
            cy="0"
            r="62"
            fill="white"
            stroke="url(#nfGrad)"
            strokeWidth="14"
          />
          <circle cx="0" cy="0" r="44" fill="#eff6ff" />
          {/* sad face inside */}
          <circle cx="-16" cy="-6" r="4" fill="#1d4ed8" />
          <circle cx="16" cy="-6" r="4" fill="#1d4ed8" />
          <path
            d="M -18 22 Q 0 8 18 22"
            stroke="#1d4ed8"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* handle */}
          <rect
            x="40"
            y="40"
            width="60"
            height="14"
            rx="7"
            fill="url(#nfGrad)"
            transform="rotate(45 40 40)"
          />
        </g>

        {/* "4" right */}
        <text
          x="340"
          y="200"
          fontSize="220"
          fontWeight="900"
          fill="url(#nfGrad)"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Pretendard', sans-serif"
        >
          4
        </text>
      </svg>
    </div>
  );
}
