"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

// 9:00 ~ 18:30, 30분 간격, 총 20개 (5×4)
const TIME_SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let m = 9 * 60; m <= 18 * 60 + 30; m += 30) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    out.push(`${h}:${mm}`);
  }
  return out;
})();

const fmtYMD = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function ReservationForm({
  initialProjectType,
  planLabel,
}: {
  /** 외부에서 (예: /pricing에서 클릭) 미리 선택해두는 제작 종류 */
  initialProjectType?: ProjectType;
  /** 사전 선택된 플랜 안내 배지에 표시할 라벨 (예: "MASTER 프리미엄") */
  planLabel?: string;
} = {}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMonth, setViewMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customTime, setCustomTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | "">(
    initialProjectType ?? ""
  );
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { ok: true; id: string; lookupCode?: string }
    | { ok: false; error: string }
    | null
  >(null);

  // ─── 캘린더 ───────────────────────────────────────
  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay(); // 0(일)~6(토)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const canPrevMonth =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  const goPrev = () => {
    if (!canPrevMonth) return;
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1)
    );
  };
  const goNext = () =>
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1)
    );

  // ─── 시간슬롯 비활성 판정 ──────────────────────────
  const now = new Date();
  const isSlotDisabled = (slot: string) => {
    if (!selectedDate) return false;
    if (!isSameDay(selectedDate, today)) return false;
    const [h, m] = slot.split(":").map(Number);
    const slotDate = new Date(today);
    slotDate.setHours(h, m, 0, 0);
    return slotDate.getTime() <= now.getTime();
  };

  // ─── 제출 ─────────────────────────────────────────
  const canSubmit =
    !!selectedDate &&
    (!!selectedTime || !!customTime.trim()) &&
    !!name.trim() &&
    !!phone.trim() &&
    !!projectType &&
    !!industry.trim() &&
    agree &&
    !submitting;

  const submit = async () => {
    if (!canSubmit || !selectedDate) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          desiredDate: fmtYMD(selectedDate),
          desiredTime: selectedTime || customTime.trim(),
          customTime: customTime.trim() || null,
          projectType,
          industry: industry.trim(),
          message: message.trim() || null,
          agreeTerms: agree,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setResult({ ok: false, error: json.error || "제출에 실패했습니다." });
      } else {
        setResult({ ok: true, id: json.id, lookupCode: json.lookupCode });
        // 폼 초기화 (선택값은 유지)
        setName("");
        setPhone("");
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

  // ─── 렌더 ─────────────────────────────────────────
  return (
    <div className="space-y-5">
      {planLabel && (
        <div className="rounded-lg bg-[var(--color-brand-50)] px-4 py-3 text-sm font-semibold text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-100)]">
          <span className="mr-1">👑</span>
          <span className="font-bold">{planLabel}</span>에 대한 상담을 신청 중입니다
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
      {/* LEFT — 캘린더 (sticky on lg+) */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-700)]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-xs">
              1
            </span>
            날짜 선택
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrevMonth}
              aria-label="이전 달"
              className="h-9 w-9 rounded-full text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-muted)] disabled:opacity-30 disabled:hover:bg-transparent"
            >
              ‹
            </button>
            <div className="text-base font-bold">
              {viewMonth.getFullYear()}년 {viewMonth.getMonth() + 1}월
            </div>
            <button
              type="button"
              onClick={goNext}
              aria-label="다음 달"
              className="h-9 w-9 rounded-full text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-muted)]"
            >
              ›
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-xs">
            {["일", "월", "화", "수", "목", "금", "토"].map((w, i) => (
              <div
                key={w}
                className={
                  i === 0
                    ? "text-rose-500 font-semibold py-2"
                    : i === 6
                    ? "text-[var(--color-brand-600)] font-semibold py-2"
                    : "text-[var(--color-fg-mute)] font-semibold py-2"
                }
              >
                {w}
              </div>
            ))}
            {calendarDays.map((d, idx) => {
              if (!d)
                return <div key={`e-${idx}`} className="aspect-square" />;
              const past = d < today;
              const selected = selectedDate && isSameDay(d, selectedDate);
              const isToday = isSameDay(d, today);
              const dow = d.getDay();
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={past}
                  onClick={() => {
                    setSelectedDate(d);
                    setSelectedTime("");
                  }}
                  className={[
                    "aspect-square m-0.5 rounded-full text-sm transition",
                    "flex items-center justify-center",
                    past
                      ? "text-[var(--color-fg-mute)]/40 cursor-not-allowed"
                      : "hover:bg-[var(--color-brand-50)]",
                    selected
                      ? "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-600)] font-semibold"
                      : isToday
                      ? "ring-1 ring-[var(--color-brand-300)] font-semibold"
                      : "",
                    !selected && !past && dow === 0 ? "text-rose-500" : "",
                    !selected && !past && dow === 6
                      ? "text-[var(--color-brand-600)]"
                      : "",
                  ].join(" ")}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <p className="mt-5 text-sm text-[var(--color-fg-soft)]">
              선택일{" "}
              <span className="font-semibold text-[var(--color-brand-700)]">
                {fmtYMD(selectedDate)}
              </span>
            </p>
          )}
        </div>
      </aside>

      {/* RIGHT — 시간 + 폼 */}
      <div className="space-y-6">
        {/* STEP 2 - 시간 선택 */}
        <div className="card p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-700)]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-xs">
              2
            </span>
            시간 선택
          </div>

          {!selectedDate ? (
            <p className="mt-6 py-8 text-center text-sm text-[var(--color-fg-mute)]">
              먼저 날짜를 선택해 주세요.
            </p>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-5 gap-2">
                {TIME_SLOTS.map((t) => {
                  const disabled = isSlotDisabled(t);
                  const active = selectedTime === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelectedTime(t);
                        setCustomTime("");
                      }}
                      className={[
                        "h-10 rounded-lg text-sm font-medium border transition",
                        disabled
                          ? "border-[var(--color-border)] text-[var(--color-fg-mute)]/40 bg-[var(--color-bg-soft)] cursor-not-allowed"
                          : active
                          ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white"
                          : "border-[var(--color-border)] hover:border-[var(--color-brand-300)] hover:bg-[var(--color-brand-50)]",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
                  또는 원하시는 시간대 직접 입력
                </label>
                <input
                  value={customTime}
                  onChange={(e) => {
                    setCustomTime(e.target.value);
                    if (e.target.value) setSelectedTime("");
                  }}
                  placeholder="예: 오후 7시 이후, 19:30 등"
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm placeholder:text-[var(--color-fg-mute)]/60 focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-100)]"
                />
              </div>
            </>
          )}
        </div>

        {/* STEP 3 - 신청 정보 */}
        <div className="card p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-700)]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-xs">
              3
            </span>
            상담 신청 정보
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {submitting ? "전송 중..." : "예약 신청하기"}
          </button>

          {result?.ok === true && (
            <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
              <p className="font-semibold">
                ✓ 예약이 접수되었습니다. 평균 24시간 내에 연락드릴게요.
              </p>
              {result.lookupCode && (
                <>
                  <p className="mt-3">
                    조회 코드{" "}
                    <span className="ml-1 rounded bg-white px-2 py-1 font-mono text-base font-bold tracking-wider ring-1 ring-emerald-200">
                      {result.lookupCode}
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-emerald-600">
                    이 코드와 휴대폰 번호 뒤 4자리로 진행 상황을 조회할 수
                    있어요. 꼭 캡처해두세요!
                  </p>
                  <Link
                    href={`/lookup?code=${result.lookupCode}`}
                    className="mt-3 inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:text-emerald-800"
                  >
                    내 신청 조회하러 가기 →
                  </Link>
                </>
              )}
            </div>
          )}
          {result?.ok === false && (
            <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
              제출 실패: {result.error}
            </p>
          )}
        </div>
      </div>
      </div>
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
