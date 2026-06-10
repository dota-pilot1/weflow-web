"use client";

import { useState } from "react";

type ProjectType =
  | "랜딩페이지 제작"
  | "홈페이지 제작"
  | "랜딩&홈페이지 제작"
  | "기타(WEFLOW 케어플랜)";

const PROJECT_TYPES: ProjectType[] = [
  "랜딩페이지 제작",
  "홈페이지 제작",
  "랜딩&홈페이지 제작",
  "기타(WEFLOW 케어플랜)",
];

export type ContactSource = "diagnosis" | "inquiry" | "landing";

export default function ContactForm({
  source,
  submitLabel = "신청하기",
  variant = "card",
  initialIndustry,
}: {
  source: ContactSource;
  submitLabel?: string;
  /** card: 카드 박스 안 / bare: 박스 없이 (랜딩 우측 고정 폼용) */
  variant?: "card" | "bare";
  /** 외부에서 (예: /cases에서 클릭) 미리 채워두는 업종 */
  initialIndustry?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [industry, setIndustry] = useState(initialIndustry ?? "");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    { ok: true } | { ok: false; error: string } | null
  >(null);

  const canSubmit =
    !!name.trim() &&
    !!phone.trim() &&
    !!projectType &&
    !!industry.trim() &&
    agree &&
    !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          projectType,
          industry: industry.trim(),
          message: message.trim() || null,
          source,
          agreeTerms: agree,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setResult({ ok: false, error: json.error || "제출에 실패했습니다." });
      } else {
        setResult({ ok: true });
        setName("");
        setPhone("");
        setProjectType("");
        setIndustry("");
        setMessage("");
        setAgree(false);
      }
    } catch (e) {
      setResult({
        ok: false,
        error: e instanceof Error ? e.message : "네트워크 오류",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const wrapperCls = variant === "card" ? "card p-6 sm:p-8" : "";

  return (
    <div className={wrapperCls}>
      {initialIndustry && (
        <div className="mb-5 rounded-lg bg-[var(--color-brand-50)] px-4 py-3 text-sm font-semibold text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-100)]">
          <span className="mr-1">🎯</span>
          <span className="font-bold">{initialIndustry}</span>에 대한 진단을 신청 중입니다
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="이름" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className={inputCls}
          />
        </Field>
        <Field label="연락처" required>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-0000-0000"
            inputMode="tel"
            className={inputCls}
          />
        </Field>
        <Field label="제작 종류" required>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className={inputCls + " pr-10"}
          >
            <option value="">선택해주세요</option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="업종" required>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="예: PT샵, 카페, 학원 등"
            className={inputCls}
          />
        </Field>
        <Field label="추가 요청사항" className="sm:col-span-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="요청사항이 있다면 자유롭게 적어주세요."
            className={inputCls + " resize-y"}
          />
        </Field>
      </div>

      <label className="mt-5 flex items-center gap-2 text-sm text-[var(--color-fg-soft)] cursor-pointer">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 accent-[var(--color-brand-600)]"
        />
        개인정보 수집 및 상담 동의
      </label>

      <button
        type="button"
        onClick={submit}
        disabled={!canSubmit}
        className="btn-primary mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {submitting ? "전송 중..." : submitLabel}
      </button>

      {result?.ok === true && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          ✓ 신청이 접수되었습니다. 평균 24시간 내에 연락드릴게요.
        </p>
      )}
      {result?.ok === false && (
        <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
          제출 실패: {result.error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm placeholder:text-[var(--color-fg-mute)]/60 focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-100)] bg-white";

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
