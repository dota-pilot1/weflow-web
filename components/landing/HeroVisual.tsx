import Image from "next/image";
import Link from "next/link";
import { DEMOS } from "@/lib/content/demos";

// 히어로 우측 비주얼 — WEFLOW가 만든 실제 데모 사이트 스크린샷이
// 브라우저 프레임 안에서 12초 주기로 순환한다. 클릭하면 데모를 새 탭으로 연다.
const SCENE_SLUGS = ["pilates", "law", "car"] as const;
const SCENES = SCENE_SLUGS.map(
  (slug) => DEMOS.find((d) => d.slug === slug)!
);

// 업종과 짝을 맞춘 문의 알림 (같은 12초 주기, 4초 간격)
const TOASTS = [
  { icon: "📅", title: "체험 수업 예약 접수", desc: "내일 오후 3시 · 필라테스 체험" },
  { icon: "⚖️", title: "상담 신청이 도착했습니다", desc: "“계약서 검토 문의드립니다”" },
  { icon: "🔧", title: "견적 문의가 도착했습니다", desc: "“범퍼 도색 견적 부탁드려요”" },
];

const BARS = [34, 48, 40, 62, 56, 78, 92];

const STEPS = [
  { no: "01", label: "홈페이지 제작" },
  { no: "02", label: "광고 연동" },
  { no: "03", label: "문의·예약 관리" },
  { no: "04", label: "수정·관리" },
];

export default function HeroVisual() {
  return (
    <div className="hv-root">
      <div className="hv-glow" aria-hidden />

      {/* 데모 사이트 브라우저 목업 — 실제 스크린샷 순환 */}
      <div className="card hv-browser">
        <div className="hv-bar-top" aria-hidden>
          <span className="hv-dot" style={{ background: "#fca5a5" }} />
          <span className="hv-dot" style={{ background: "#fcd34d" }} />
          <span className="hv-dot" style={{ background: "#86efac" }} />
          <span className="hv-url">
            {SCENES.map((s, i) => (
              <span
                key={s.slug}
                className="hv-cycle hv-url-text"
                style={{ animationDelay: `${i * 4}s` }}
              >
                {s.domain}
              </span>
            ))}
          </span>
          <span className="hv-made">made by WEFLOW</span>
        </div>

        <div className="hv-shots">
          {SCENES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/demo/${s.slug}`}
              target="_blank"
              className="hv-shot hv-cycle"
              style={{ animationDelay: `${i * 4}s` }}
              aria-label={`${s.brand} 제작 샘플 새 탭에서 보기`}
            >
              <Image
                src={`/demo/${s.slug}.png`}
                alt={`${s.brand} 홈페이지 제작 샘플`}
                fill
                sizes="(max-width: 1024px) 90vw, 620px"
                className="hv-shot-img"
                priority={i === 0}
              />
            </Link>
          ))}
          <span className="hv-open" aria-hidden>
            실제 사이트 보기 ↗
          </span>
        </div>
      </div>

      {/* 오늘 문의 지표 카드 */}
      <div className="card hv-chart hv-float" aria-hidden>
        <div className="hv-chart-head">
          <span className="hv-chart-title">오늘 문의</span>
          <span className="hv-chart-badge">▲ 20%</span>
        </div>
        <p className="hv-chart-num">
          12<span className="hv-chart-unit">건</span>
        </p>
        <div className="hv-chart-bars">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="hv-chart-bar"
              style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>

      {/* 서비스 프로세스 체크리스트 카드 */}
      <div
        className="card hv-steps hv-float"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      >
        {STEPS.map((s) => (
          <div key={s.no} className="hv-step">
            <span className="hv-step-no">{s.no}</span>
            <span className="hv-step-label">{s.label}</span>
            <span className="hv-step-check">✓</span>
          </div>
        ))}
      </div>

      {/* 업종과 짝 맞춘 문의 알림 토스트 (순환) */}
      <div className="hv-toasts" aria-hidden>
        {TOASTS.map((t, i) => (
          <div
            key={t.title}
            className="card hv-toast hv-cycle"
            style={{ animationDelay: `${i * 4}s` }}
          >
            <span className="hv-toast-icon">{t.icon}</span>
            <span className="hv-toast-text">
              <span className="hv-toast-title">{t.title}</span>
              <span className="hv-toast-desc">{t.desc}</span>
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .hv-root {
          position: relative;
          width: 100%;
          max-width: 760px;
          margin-inline: auto;
          padding: 32px 0 72px 0;
        }
        .hv-glow {
          position: absolute;
          inset: -12% -12% -8% -10%;
          background:
            radial-gradient(42% 38% at 76% 20%, color-mix(in srgb, var(--color-brand-500) 16%, transparent), transparent 72%),
            radial-gradient(34% 32% at 18% 78%, color-mix(in srgb, var(--color-brand-300) 12%, transparent), transparent 70%);
          z-index: 0;
        }

        .hv-browser {
          position: relative;
          z-index: 1;
          width: 82%;
          margin-left: auto;
          border-radius: 1.35rem;
          box-shadow: 0 34px 70px -34px rgba(15, 23, 42, 0.30);
          overflow: hidden;
        }
        .hv-bar-top {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-bg-soft);
        }
        .hv-dot { width: 9px; height: 9px; border-radius: 9999px; }
        .hv-url {
          position: relative;
          margin-left: 10px;
          flex: 1;
          max-width: 180px;
          height: 24px;
          border-radius: 9999px;
          background: #fff;
          border: 1px solid var(--color-border);
          overflow: hidden;
        }
        .hv-url-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding-inline: 12px;
          color: var(--color-fg-mute);
          font-size: 11px;
          white-space: nowrap;
        }
        .hv-made {
          margin-left: auto;
          padding: 3px 9px;
          border-radius: 9999px;
          background: var(--color-brand-50);
          color: var(--color-brand-700);
          font-size: 9.5px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* 실제 스크린샷 무대 — 캡처 비율(1280×860)에 맞춰 크로스페이드 */
        .hv-shots {
          position: relative;
          aspect-ratio: 1280 / 860;
          background: var(--color-bg-soft);
        }
        .hv-shot {
          position: absolute;
          inset: 0;
          display: block;
        }
        .hv-shot-img {
          object-fit: cover;
          object-position: top;
        }
        .hv-open {
          position: absolute;
          right: 12px;
          bottom: 12px;
          z-index: 3;
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(15, 23, 42, 0.78);
          color: #fff;
          font-size: 10.5px;
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .hv-browser:hover .hv-open { opacity: 1; }

        .hv-chart {
          position: absolute;
          z-index: 2;
          top: 4px;
          right: -8px;
          width: 178px;
          padding: 15px;
          border-radius: 1.1rem;
          box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.22);
        }
        .hv-chart-head {
          display: flex; align-items: center; justify-content: space-between;
        }
        .hv-chart-title { font-size: 12px; font-weight: 700; color: var(--color-fg-soft); }
        .hv-chart-badge {
          font-size: 11px; font-weight: 700;
          color: #059669; background: #ecfdf5;
          padding: 2px 8px; border-radius: 9999px;
        }
        .hv-chart-num {
          margin-top: 6px;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .hv-chart-unit {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-fg-mute);
          margin-left: 2px;
        }
        .hv-chart-bars {
          display: flex; align-items: flex-end; gap: 5px;
          height: 56px; margin-top: 12px;
        }
        .hv-chart-bar {
          flex: 1; border-radius: 4px 4px 2px 2px;
          background-image: linear-gradient(180deg, var(--color-brand-500), var(--color-brand-300));
          transform-origin: bottom;
          animation: hv-grow 2.6s ease-in-out infinite;
        }

        .hv-steps {
          position: absolute;
          z-index: 2;
          left: 8px;
          top: 39%;
          width: 166px;
          padding: 12px 14px;
          border-radius: 1rem;
          box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.22);
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .hv-step {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hv-step-no {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: var(--color-brand-600);
        }
        .hv-step-label {
          flex: 1;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-fg-soft);
          white-space: nowrap;
        }
        .hv-step-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          background: var(--color-brand-500);
        }

        .hv-toasts {
          position: absolute;
          right: 22px;
          bottom: 12px;
          width: min(340px, 78%);
          height: 72px;
          z-index: 2;
        }
        .hv-toast {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 1rem;
          box-shadow: 0 20px 40px -18px rgba(15, 23, 42, 0.25);
        }
        .hv-toast-icon {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 12px;
          background: var(--color-brand-50);
          font-size: 18px;
          flex-shrink: 0;
        }
        .hv-toast-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .hv-toast-title { font-size: 13px; font-weight: 700; white-space: nowrap; }
        .hv-toast-desc {
          font-size: 11.5px; color: var(--color-fg-mute);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .hv-float { animation: hv-float 5s ease-in-out infinite; }

        /* 업종 순환 공통 — 12초 주기, 4초씩 노출 */
        .hv-cycle {
          opacity: 0;
          animation: hv-cycle 12s ease-in-out infinite;
        }
        /* 스크린샷 씬은 visibility까지 함께 순환 — 보이는 씬만 클릭된다 */
        .hv-shot.hv-cycle {
          visibility: hidden;
          animation-name: hv-cycle-shot;
        }
        .hv-shots:hover .hv-shot { animation-play-state: paused; }
        @keyframes hv-cycle-shot {
          0% { opacity: 0; visibility: hidden; }
          3%, 30% { opacity: 1; visibility: visible; }
          36%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes hv-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hv-cycle {
          0% { opacity: 0; }
          3%, 30% { opacity: 1; }
          36%, 100% { opacity: 0; }
        }
        @keyframes hv-grow {
          0%, 100% { transform: scaleY(0.86); }
          50% { transform: scaleY(1); }
        }

        @media (max-width: 480px) {
          .hv-browser { width: 94%; margin-inline: auto; }
          .hv-steps { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv-float, .hv-chart-bar { animation: none; }
          .hv-cycle { animation: none; }
          .hv-shot:first-child, .hv-toast:first-child, .hv-url-text:first-child {
            opacity: 1;
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
}
