// 히어로 우측 비주얼 — 외부 이미지 없이 CSS 애니메이션으로
// "WEFLOW가 만든 고객사 홈페이지에 문의가 들어오는 장면"을 표현한다.
// 업종 3개(필라테스 → 법률 → 카센터)가 12초 주기로 크로스페이드 순환.
const SCENES = [
  {
    key: "pilates",
    url: "pilates-studio.kr",
    grad: "linear-gradient(135deg, #10b981, #059669)",
    h1: "바른 자세, 바른 몸",
    h2: "체험 예약받는 필라테스",
    cta: "체험 신청",
    ghost: "클래스 보기",
    formTitle: "체험 수업 예약",
    submit: "예약하기",
    chips: ["🧘 1:1 레슨", "📅 간편 예약", "📍 오시는 길"],
  },
  {
    key: "law",
    url: "ohlaw-firm.kr",
    grad: "linear-gradient(135deg, #6366f1, #4f46e5)",
    h1: "어려운 법률 문제,",
    h2: "상담으로 이어지는 사무소",
    cta: "상담 신청",
    ghost: "성공 사례",
    formTitle: "법률 상담 신청",
    submit: "상담 신청",
    chips: ["⚖️ 민사 · 형사", "📄 계약 검토", "🤝 방문 상담"],
  },
  {
    key: "car",
    url: "speed-carcenter.kr",
    grad: "linear-gradient(135deg, #f59e0b, #d97706)",
    h1: "수리부터 도색까지,",
    h2: "견적 문의가 오는 카센터",
    cta: "견적 문의",
    ghost: "작업 사례",
    formTitle: "빠른 견적 문의",
    submit: "견적 받기",
    chips: ["🔧 정비 · 수리", "🚗 판금 · 도색", "📞 긴급 출동"],
  },
];

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
    <div className="hv-root" aria-hidden>
      <div className="hv-glow" />

      {/* 고객사 홈페이지 목업 */}
      <div className="card hv-browser">
        <div className="hv-bar-top">
          <span className="hv-dot" style={{ background: "#fca5a5" }} />
          <span className="hv-dot" style={{ background: "#fcd34d" }} />
          <span className="hv-dot" style={{ background: "#86efac" }} />
          <span className="hv-url">
            {SCENES.map((s, i) => (
              <span
                key={s.key}
                className="hv-cycle hv-url-text"
                style={{ animationDelay: `${i * 4}s` }}
              >
                {s.url}
              </span>
            ))}
          </span>
          <span className="hv-made">made by WEFLOW</span>
        </div>

        <div className="hv-body">
          {/* 미니 네비 */}
          <div className="hv-nav">
            <span className="hv-logo" />
            <span className="hv-nav-links">
              <span>소개</span>
              <span>서비스</span>
              <span>후기</span>
              <span>오시는 길</span>
            </span>
            <span className="hv-nav-cta">문의하기</span>
          </div>

          {/* 업종별 미니 랜딩 — 크로스페이드 순환 */}
          <div className="hv-scenes">
            {SCENES.map((s, i) => (
              <div
                key={s.key}
                className="hv-scene hv-cycle"
                style={{ animationDelay: `${i * 4}s` }}
              >
                <div className="hv-hero">
                  <div className="hv-copy">
                    <p className="hv-h">{s.h1}</p>
                    <p
                      className="hv-h hv-h-brand"
                      style={{ backgroundImage: s.grad }}
                    >
                      {s.h2}
                    </p>
                    <span className="hv-line-thin" style={{ width: "88%" }} />
                    <span className="hv-line-thin" style={{ width: "64%" }} />
                    <div className="hv-cta-row">
                      <span
                        className="hv-btn"
                        style={{ backgroundImage: s.grad }}
                      >
                        {s.cta}
                      </span>
                      <span className="hv-btn-ghost">{s.ghost}</span>
                    </div>
                  </div>

                  {/* 미니 문의 폼 */}
                  <div className="hv-form">
                    <p className="hv-form-title">{s.formTitle}</p>
                    <span className="hv-input">성함</span>
                    <span className="hv-input">연락처</span>
                    <span
                      className="hv-submit"
                      style={{ backgroundImage: s.grad }}
                    >
                      {s.submit}
                    </span>
                  </div>
                </div>

                <div className="hv-cards">
                  {s.chips.map((c) => (
                    <span key={c} className="hv-mini">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
            <span className="hv-step-no">{s.no}</span>
            <span className="hv-step-label">{s.label}</span>
            <span className="hv-step-check">✓</span>
          </div>
        ))}
      </div>

      {/* 업종과 짝 맞춘 문의 알림 토스트 (순환) */}
      <div className="hv-toasts">
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
        .hv-body { padding: 22px 24px 24px; }
        .hv-nav { display: flex; align-items: center; gap: 12px; }
        .hv-logo {
          width: 24px; height: 24px; border-radius: 8px;
          background-image: linear-gradient(135deg, var(--color-brand-500), var(--color-brand-700));
        }
        .hv-nav-links {
          display: flex; gap: 12px; margin-left: auto;
          font-size: 10px; font-weight: 600;
          color: var(--color-fg-mute);
        }
        .hv-nav-cta {
          padding: 5px 11px; border-radius: 9999px;
          background-image: linear-gradient(135deg, var(--color-brand-500), var(--color-brand-600));
          color: #fff; font-size: 10px; font-weight: 700;
          white-space: nowrap;
        }

        .hv-scenes { display: grid; margin-top: 28px; }
        .hv-scene { grid-area: 1 / 1; }

        .hv-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 22px;
          align-items: center;
        }
        .hv-copy { display: flex; flex-direction: column; gap: 8px; }
        .hv-h {
          font-size: 18px; font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.25;
          white-space: nowrap;
        }
        .hv-h-brand {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hv-line-thin {
          height: 8px; border-radius: 9999px;
          background: var(--color-bg-muted);
        }
        .hv-cta-row { display: flex; gap: 6px; margin-top: 6px; }
        .hv-btn, .hv-btn-ghost, .hv-submit, .hv-input {
          white-space: nowrap;
        }
        .hv-btn {
          padding: 6px 12px; border-radius: 9999px;
          box-shadow: 0 8px 16px -8px rgba(15, 23, 42, 0.4);
          color: #fff; font-size: 10px; font-weight: 700;
        }
        .hv-btn-ghost {
          padding: 6px 12px; border-radius: 9999px;
          border: 1px solid var(--color-border);
          color: var(--color-fg-soft); font-size: 10px; font-weight: 700;
        }

        .hv-form {
          display: flex; flex-direction: column; gap: 7px;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid var(--color-border);
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
          .hv-hero { grid-template-columns: 1fr; }
          .hv-steps { display: none; }
          .hv-nav-links { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv-float, .hv-chart-bar { animation: none; }
          .hv-cycle { animation: none; }
          .hv-scene:first-child, .hv-toast:first-child, .hv-url-text:first-child {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
