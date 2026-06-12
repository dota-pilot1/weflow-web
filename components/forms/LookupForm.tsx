"use client";

import { useState } from "react";

type LookupResult = {
  type: "reservation" | "inquiry";
  status: "pending" | "in_progress" | "done";
  createdAt: string;
  projectType: string;
  industry: string;
  source?: "diagnosis" | "inquiry" | "landing";
  desiredDate?: string;
  desiredTime?: string;
};

const STATUS_META: Record<
  LookupResult["status"],
  { label: string; badge: string; desc: string }
> = {
  pending: {
    label: "대기",
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    desc: "접수가 확인되었습니다. 담당자가 곧 연락드릴 예정이에요.",
  },
  in_progress: {
    label: "진행중",
    badge:
      "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] ring-[var(--color-brand-200)]",
    desc: "담당자가 상담을 진행하고 있어요.",
  },
  done: {
    label: "완료",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    desc: "상담이 완료되었습니다. 이용해주셔서 감사합니다.",
  },
};

const STATUS_ORDER: LookupResult["status"][] = [
  "pending",
  "in_progress",
  "done",
];

function typeLabel(r: LookupResult): string {
  if (r.type === "reservation") return "상담 예약";
  if (r.source === "diagnosis") return "무료 진단";
  return "문의";
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function LookupForm({
  initialCode,
}: {
  /** 폼 성공 화면에서 넘어올 때 미리 채워두는 조회 코드 */
  initialCode?: string;
} = {}) {
  const [code, setCode] = useState(initialCode ?? "");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  const canSubmit =
    code.trim().length >= 6 && /^\d{4}$/.test(phoneLast4) && !loading;

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), phoneLast4 }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "조회에 실패했습니다.");
      } else {
        setResult(json.result);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {/* 조회 입력 */}
      <div className="card p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
              조회 코드<span className="text-rose-500 ml-0.5">*</span>
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="WF-2J7KQR"
              className={inputCls + " font-mono tracking-wider"}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
              휴대폰 번호 뒤 4자리<span className="text-rose-500 ml-0.5">*</span>
            </label>
            <input
              value={phoneLast4}
              onChange={(e) =>
                setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="0000"
              inputMode="numeric"
              className={inputCls + " font-mono tracking-wider"}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--color-fg-mute)]">
          조회 코드는 예약/무료진단 신청 완료 화면에서 발급된 코드예요. (예:
          WF-2J7KQR)
        </p>

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className="btn-primary mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? "조회 중..." : "접수 현황 조회하기"}
        </button>

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
      </div>

      {/* 조회 결과 */}
      {result && (
        <div className="card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">
              {typeLabel(result)} 접수 현황
            </h2>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                STATUS_META[result.status].badge
              }`}
            >
              {STATUS_META[result.status].label}
            </span>
          </div>

          {/* 진행 단계 표시 */}
          <div className="mt-5 flex items-center gap-2">
            {STATUS_ORDER.map((s, i) => {
              const reached =
                STATUS_ORDER.indexOf(result.status) >= i;
              return (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      reached
                        ? "bg-[var(--color-brand-500)]"
                        : "bg-[var(--color-bg-muted)]"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold whitespace-nowrap ${
                      s === result.status
                        ? "text-[var(--color-brand-700)]"
                        : "text-[var(--color-fg-mute)]"
                    }`}
                  >
                    {STATUS_META[s].label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 rounded-lg bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-fg-soft)]">
            {STATUS_META[result.status].desc}
          </p>

          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <InfoRow label="신청 종류" value={typeLabel(result)} />
            <InfoRow label="접수일" value={fmtDate(result.createdAt)} />
            {result.desiredDate && (
              <InfoRow
                label="희망 일정"
                value={`${result.desiredDate} ${result.desiredTime ?? ""}`}
              />
            )}
            <InfoRow label="제작 종류" value={result.projectType} />
            <InfoRow label="업종" value={result.industry} />
          </dl>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-2">
      <dt className="shrink-0 text-xs font-semibold text-[var(--color-fg-mute)]">
        {label}
      </dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm placeholder:text-[var(--color-fg-mute)]/60 focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-100)] bg-white";
