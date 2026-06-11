// 히어로 우측 비주얼 — 외부 이미지 없이 CSS 애니메이션으로
// "홈페이지에 문의가 들어오는 장면"을 표현한다.
const TOASTS = [
  { icon: "📩", title: "새 문의가 도착했습니다", desc: "“견적 문의드립니다” · 방금 전" },
  { icon: "📞", title: "상담 예약 완료", desc: "내일 오전 10:00 · 전화 상담" },
  { icon: "💬", title: "카카오 채널 문의", desc: "“포트폴리오 보고 연락드려요”" },
];

const BARS = [34, 48, 40, 62, 56, 78, 92];

const STEPS = [
  { no: "01", label: "홈페이지 제작", color: "#3b82f6" },
  { no: "02", label: "광고 연동", color: "#8b5cf6" },
  { no: "03", label: "문의·예약 관리", color: "#10b981" },
  { no: "04", label: "수정·관리", color: "#f59e0b" },
];

export default function HeroVisual() {
  return (
    <div className="hv-root" aria-hidden>
      <div className="hv-glow" />

      {/* 브라우저 목업 */}
      <div className="card hv-browser">
        <div className="hv-bar-top">
          <span className="hv-dot" style={{ background: "#fca5a5" }} />
          <span className="hv-dot" style={{ background: "#fcd34d" }} />
          <span className="hv-dot" style={{ background: "#86efac" }} />
          <span className="hv-url">weflow.co.kr</span>
        </div>

        <div className="hv-body">
          {/* 미니 네비 */}
          <div className="hv-nav">
            <span className="hv-logo" />
            <span className="hv-nav-links">
              <span>서비스</span>
              <span>가격</span>
              <span>사례</span>
              <span>예약</span>
            </span>
            <span className="hv-nav-cta">문의하기</span>
          </div>

          {/* 미니 랜딩 본문 */}
          <div className="hv-hero">
            <div className="hv-copy">
              <p className="hv-h">고객이 찾아오고</p>
              <p className="hv-h hv-h-brand">문의로 이어지는 홈페이지</p>
              <span className="hv-line-thin" style={{ width: "88%" }} />
              <span className="hv-line-thin" style={{ width: "64%" }} />
              <div className="hv-cta-row">
                <span className="hv-btn">무료 진단</span>
                <span className="hv-btn-ghost">사례 보기</span>
              </div>
            </div>

            {/* 미니 문의 폼 */}
            <div className="hv-form">
              <p className="hv-form-title">간편 문의</p>
              <span className="hv-input">성함</span>
              <span className="hv-input">연락처</span>
              <span className="hv-submit">문의 보내기</span>
            </div>
          </div>

          <div className="hv-cards">
            <span className="hv-mini">⚡ 빠른 제작</span>
            <span className="hv-mini">📈 광고 연동</span>
            <span className="hv-mini">🛠️ 운영 관리</span>
          </div>
        </div>
      </div>

      {/* 오늘 문의 지표 카드 */}
      <div className="card hv-chart hv-float">
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
      <div className="card hv-steps hv-float" style={{ animationDelay: "1.2s" }}>
        {STEPS.map((s) => (
          <div key={s.no} className="hv-step">
            <span className="hv-step-no" style={{ color: s.color }}>
              {s.no}
            </span>
            <span className="hv-step-label">{s.label}</span>
            <span className="hv-step-check" style={{ background: s.color }}>
              ✓
            </span>
          </div>
        ))}
      </div>

      {/* 문의 알림 토스트 (순환) */}
      <div className="hv-toasts">
        {TOASTS.map((t, i) => (
          <div
            key={t.title}
            className="card hv-toast"
            style={{ animationDelay: `${i * 3}s` }}
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
          max-width: 600px;
          margin-inline: auto;
          padding: 28px 8px 56px 0;
        }
        .hv-glow {
          position: absolute;
          inset: -10% -16% -6% -8%;
          background:
            radial-gradient(40% 38% at 72% 24%, rgba(59, 130, 246, 0.16), transparent 70%),
            radial-gradient(34% 32% at 18% 78%, rgba(29, 78, 216, 0.10), transparent 70%);
          z-index: 0;
        }
        .hv-browser {
          position: relative;
          z-index: 1;
          width: 76%;
          margin-left: auto;
          border-radius: 1.25rem;
          box-shadow: 0 24px 48px -24px rgba(15, 23, 42, 0.18);
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
          margin-left: 10px;
          flex: 1;
          max-width: 200px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: #fff;
          border: 1px solid var(--color-border);
          color: var(--color-fg-mute);
          font-size: 11px;
        }
        .hv-body { padding: 18px 20px 20px; }
        .hv-nav { display: flex; align-items: center; gap: 12px; }
        .hv-logo {
          width: 24px; height: 24px; border-radius: 8px;
          background-image: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }
        .hv-nav-links {
          display: flex; gap: 12px; margin-left: auto;
          font-size: 10px; font-weight: 600;
          color: var(--color-fg-mute);
        }
        .hv-nav-cta {
          padding: 5px 11px; border-radius: 9999px;
          background-image: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff; font-size: 10px; font-weight: 700;
        }

        .hv-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 16px;
          margin-top: 22px;
          align-items: center;
        }
        .hv-copy { display: flex; flex-direction: column; gap: 8px; }
        .hv-h {
          font-size: 15px; font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.25;
        }
        .hv-h-brand {
          background-image: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hv-line-thin {
          height: 7px; border-radius: 9999px;
          background: var(--color-bg-muted);
        }
        .hv-cta-row { display: flex; gap: 6px; margin-top: 6px; }
        .hv-btn, .hv-btn-ghost, .hv-submit, .hv-input, .hv-nav-cta {
          white-space: nowrap;
        }
        .hv-btn {
          padding: 6px 12px; border-radius: 9999px;
          background-image: linear-gradient(135deg, #3b82f6, #2563eb);
          box-shadow: 0 8px 16px -8px rgba(37, 99, 235, 0.6);
          color: #fff; font-size: 10px; font-weight: 700;
        }
        .hv-btn-ghost {
          padding: 6px 12px; border-radius: 9999px;
          border: 1px solid var(--color-brand-100);
          color: var(--color-brand-700); font-size: 10px; font-weight: 700;
        }

        .hv-form {
          display: flex; flex-direction: column; gap: 7px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid var(--color-brand-100);
          background: var(--color-bg-soft);
        }
        .hv-form-title { font-size: 11px; font-weight: 800; }
        .hv-input {
          padding: 6px 9px; border-radius: 8px;
          background: #fff; border: 1px solid var(--color-border);
          font-size: 9.5px; color: var(--color-fg-mute);
        }
        .hv-submit {
          margin-top: 2px;
          padding: 7px 9px; border-radius: 8px;
          background-image: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff; font-size: 10px; font-weight: 700;
          text-align: center;
        }

        .hv-cards {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 8px; margin-top: 16px;
        }
        .hv-mini {
          display: flex; align-items: center; justify-content: center;
          gap: 4px;
          padding: 7px 4px; border-radius: 8px;
          background: var(--color-bg-soft);
          border: 1px solid var(--color-border);
          font-size: 9.5px; font-weight: 700;
          color: var(--color-fg-soft);
          white-space: nowrap;
        }

        .hv-chart {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          width: 168px;
          padding: 14px;
          border-radius: 1rem;
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
          background-image: linear-gradient(180deg, #3b82f6, #93c5fd);
          transform-origin: bottom;
          animation: hv-grow 2.6s ease-in-out infinite;
        }

        .hv-steps {
          position: absolute;
          z-index: 2;
          left: 0;
          top: 34%;
          width: 150px;
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
        }

        .hv-toasts {
          position: absolute;
          right: 0;
          bottom: 8px;
          width: min(300px, 78%);
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
          opacity: 0;
          animation: hv-toast 9s ease-in-out infinite;
        }
        .hv-toast-icon {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 12px;
          background: var(--color-brand-50);
          font-size: 18px;
        }
        .hv-toast-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .hv-toast-title { font-size: 13px; font-weight: 700; }
        .hv-toast-desc {
          font-size: 11.5px; color: var(--color-fg-mute);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .hv-float { animation: hv-float 5s ease-in-out infinite; }

        @keyframes hv-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hv-toast {
          0% { opacity: 0; transform: translateY(16px) scale(0.97); }
          5%, 28% { opacity: 1; transform: translateY(0) scale(1); }
          33%, 100% { opacity: 0; transform: translateY(-12px) scale(0.98); }
        }
        @keyframes hv-grow {
          0%, 100% { transform: scaleY(0.86); }
          50% { transform: scaleY(1); }
        }

        @media (max-width: 480px) {
          .hv-browser { width: 94%; margin-inline: auto; }
          .hv-hero { grid-template-columns: 1fr; }
          .hv-steps { display: none; }
          .hv-nav-links { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv-float, .hv-chart-bar { animation: none; }
          .hv-toast { animation: none; }
          .hv-toast:first-child { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
