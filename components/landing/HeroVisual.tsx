"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEMOS } from "@/lib/content/demos";

// 히어로 우측 비주얼 — WEFLOW가 만든 실제 데모 사이트 스크린샷 카루셀.
// 주소창·스크린샷·문의 토스트가 하나의 인덱스 상태로 묶여 항상 동기화된다.
// 4초 자동 순환 + 좌우 버튼/점 인디케이터로 수동 이동(타이머 리셋).
const SCENE_SLUGS = ["pilates", "law", "car"] as const;
const SCENES = SCENE_SLUGS.map((slug) => DEMOS.find((d) => d.slug === slug)!);

// 업종과 짝을 맞춘 문의 알림
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

const AUTO_MS = 4000;

export default function HeroVisual() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // idx가 deps에 있어 수동 이동 시 4초 타이머가 새로 시작된다.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % SCENES.length),
      AUTO_MS
    );
    return () => clearInterval(t);
  }, [paused, idx]);

  const prev = () => setIdx((i) => (i - 1 + SCENES.length) % SCENES.length);
  const next = () => setIdx((i) => (i + 1) % SCENES.length);

  return (
    <div
      className="hv-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hv-glow" aria-hidden />

      {/* 데모 사이트 브라우저 목업 */}
      <div className="card hv-browser">
        <div className="hv-bar-top">
          <span className="hv-dot" style={{ background: "#fca5a5" }} />
          <span className="hv-dot" style={{ background: "#fcd34d" }} />
          <span className="hv-dot" style={{ background: "#86efac" }} />
          <span className="hv-url" aria-hidden>
            {SCENES.map((s, i) => (
              <span
                key={s.slug}
                className={`hv-fade hv-url-text ${i === idx ? "is-active" : ""}`}
              >
                {s.domain}
              </span>
            ))}
          </span>
        </div>

        <div className="hv-shots">
          {SCENES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/demo/${s.slug}`}
              target="_blank"
              className={`hv-fade hv-shot ${i === idx ? "is-active" : ""}`}
              tabIndex={i === idx ? 0 : -1}
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

          <span className="hv-made">made by WEFLOW</span>
          <span className="hv-open" aria-hidden>
            실제 사이트 보기 ↗
          </span>
        </div>
      </div>

      {/* 카루셀 컨트롤 — 브라우저 좌상단 바깥, 지표 카드와 대칭인 플로팅 필 */}
      <div className="card hv-ctrl">
        <button
          type="button"
          onClick={prev}
          aria-label="이전 제작 샘플"
          className="hv-ctrl-btn"
        >
          ‹
        </button>
        {SCENES.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`${s.brand} 샘플 보기`}
            className={`hv-ctrl-dot ${i === idx ? "is-active" : ""}`}
          />
        ))}
        <button
          type="button"
          onClick={next}
          aria-label="다음 제작 샘플"
          className="hv-ctrl-btn"
        >
          ›
        </button>
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

      {/* 업종과 짝 맞춘 문의 알림 토스트 */}
      <div className="hv-toasts" aria-hidden>
        {TOASTS.map((t, i) => (
          <div
            key={t.title}
            className={`card hv-fade hv-toast ${i === idx ? "is-active" : ""}`}
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
          padding: 10px 14px;
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
        /* 플로팅 컨트롤 — 브라우저 좌상단 모서리 바로 위, 왼쪽 라인에 정렬 */
        .hv-ctrl {
          position: absolute;
          z-index: 2;
          top: -14px;
          left: 18%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 9px;
          border-radius: 0.8rem;
          box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.22);
        }
        .hv-ctrl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          padding: 0 0 2px;
          background: #fff;
          color: var(--color-fg);
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .hv-ctrl-btn:hover {
          background: var(--color-brand-50);
          color: var(--color-brand-700);
          border-color: var(--color-brand-300);
        }
        .hv-ctrl-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          border: none;
          padding: 0;
          background: var(--color-bg-muted);
          cursor: pointer;
          transition: background 0.2s ease, width 0.2s ease;
        }
        .hv-ctrl-dot.is-active {
          width: 16px;
          background: var(--color-brand-500);
        }
        .hv-made {
          position: absolute;
          left: 12px;
          bottom: 12px;
          z-index: 3;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-brand-700);
          font-size: 9.5px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
        }

        /* 스크린샷 무대 — 통계 밴드까지만 크롭(1280×800), 하단은 페이드 처리 */
        .hv-shots {
          position: relative;
          aspect-ratio: 1280 / 800;
          background: var(--color-bg-soft);
        }
        .hv-shots::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 44px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.95));
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

        /* 공통 크로스페이드 — is-active만 보이고 클릭된다 */
        .hv-fade {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.55s ease, visibility 0s linear 0.55s;
        }
        .hv-fade.is-active {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.55s ease, visibility 0s;
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
          right: -8px;
          bottom: 6px;
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

        @keyframes hv-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hv-grow {
          0%, 100% { transform: scaleY(0.86); }
          50% { transform: scaleY(1); }
        }

        @media (max-width: 480px) {
          .hv-browser { width: 94%; margin-inline: auto; }
          .hv-steps { display: none; }
          .hv-url { max-width: 110px; }
          .hv-ctrl { left: 3%; top: -14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv-float, .hv-chart-bar { animation: none; }
          .hv-fade { transition: none; }
        }
      `}</style>
    </div>
  );
}
