"use client";

import { Fragment, useState } from "react";

const CATEGORIES = [
  "피트니스",
  "뷰티",
  "교육",
  "생활서비스",
  "전문직",
  "부동산",
  "외식",
  "금융",
  "반려동물",
  "키즈",
  "자동차",
  "웨딩",
  "기업",
] as const;

type Category = (typeof CATEGORIES)[number];

export type CaseAdminRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string | null;
  challenge: string | null;
  approach: string | null;
  metric_label: string | null;
  metric_before: string | null;
  metric_after: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

type FormState = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  challenge: string;
  approach: string;
  metric_label: string;
  metric_before: string;
  metric_after: string;
  display_order: number;
  published: boolean;
};

const emptyForm = (): FormState => ({
  slug: "",
  title: "",
  category: "피트니스",
  summary: "",
  challenge: "",
  approach: "",
  metric_label: "",
  metric_before: "",
  metric_after: "",
  display_order: 0,
  published: true,
});

const fromRow = (r: CaseAdminRow): FormState => ({
  slug: r.slug,
  title: r.title,
  category: (CATEGORIES as readonly string[]).includes(r.category)
    ? (r.category as Category)
    : "피트니스",
  summary: r.summary ?? "",
  challenge: r.challenge ?? "",
  approach: r.approach ?? "",
  metric_label: r.metric_label ?? "",
  metric_before: r.metric_before ?? "",
  metric_after: r.metric_after ?? "",
  display_order: r.display_order,
  published: r.published,
});

const toPayload = (f: FormState) => ({
  slug: f.slug.trim(),
  title: f.title.trim(),
  category: f.category,
  summary: f.summary.trim() || null,
  challenge: f.challenge.trim() || null,
  approach: f.approach.trim() || null,
  metric_label: f.metric_label.trim() || null,
  metric_before: f.metric_before.trim() || null,
  metric_after: f.metric_after.trim() || null,
  display_order: Number(f.display_order) || 0,
  published: f.published,
});

export default function AdminCasesPanel({
  initialCases,
}: {
  initialCases: CaseAdminRow[];
}) {
  const [cases, setCases] = useState<CaseAdminRow[]>(initialCases);
  // editingId: null = none, "new" = creating, "<uuid>" = editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCreate = () => {
    setForm({ ...emptyForm(), display_order: (cases.at(-1)?.display_order ?? 0) + 1 });
    setEditingId("new");
    setError(null);
  };

  const startEdit = (row: CaseAdminRow) => {
    setForm(fromRow(row));
    setEditingId(row.id);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError(null);
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      if (editingId === "new") {
        const res = await fetch("/api/admin/cases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toPayload(form)),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "추가 실패");
        setCases((prev) => [...prev, json.case as CaseAdminRow]);
      } else if (editingId) {
        const res = await fetch(`/api/admin/cases/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toPayload(form)),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "수정 실패");
        setCases((prev) =>
          prev.map((c) => (c.id === editingId ? (json.case as CaseAdminRow) : c))
        );
      }
      setEditingId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (row: CaseAdminRow) => {
    const next = !row.published;
    setCases((prev) =>
      prev.map((c) => (c.id === row.id ? { ...c, published: next } : c))
    );
    const res = await fetch(`/api/admin/cases/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: next }),
    });
    if (!res.ok) {
      // 롤백
      setCases((prev) =>
        prev.map((c) => (c.id === row.id ? { ...c, published: !next } : c))
      );
      alert("노출 상태 변경 실패");
    }
  };

  const remove = async (row: CaseAdminRow) => {
    if (!confirm(`"${row.title}" 사례를 정말 삭제하시겠습니까?`)) return;
    const prev = cases;
    setCases((p) => p.filter((c) => c.id !== row.id));
    const res = await fetch(`/api/admin/cases/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("삭제 실패");
      setCases(prev);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-fg-mute)]">
          홈페이지 `/cases` 에 표시되는 28+개 업종 사례를 관리합니다.
        </p>
        <button
          onClick={startCreate}
          disabled={editingId !== null}
          className="rounded-lg bg-[var(--color-brand-600)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-50"
        >
          + 새 사례 추가
        </button>
      </div>

      {editingId === "new" && (
        <CaseForm
          form={form}
          setForm={setForm}
          onSubmit={submit}
          onCancel={cancelEdit}
          submitting={submitting}
          error={error}
          mode="create"
        />
      )}

      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-[var(--color-border)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--color-bg-soft)] text-xs text-[var(--color-fg-soft)]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold w-16">순서</th>
                <th className="px-4 py-3 text-left font-semibold">제목</th>
                <th className="px-4 py-3 text-left font-semibold">slug</th>
                <th className="px-4 py-3 text-left font-semibold">카테고리</th>
                <th className="px-4 py-3 text-left font-semibold">노출</th>
                <th className="px-4 py-3 text-right pr-4 font-semibold">관리</th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-sm text-[var(--color-fg-mute)]"
                  >
                    등록된 사례가 없습니다.
                  </td>
                </tr>
              )}
              {cases.map((c) => (
                <Fragment key={c.id}>
                  <tr
                    className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg-soft)]/40"
                  >
                    <td className="px-4 py-3 text-[var(--color-fg-mute)]">
                      {c.display_order}
                    </td>
                    <td className="px-4 py-3 font-semibold">{c.title}</td>
                    <td className="px-4 py-3 text-xs text-[var(--color-fg-mute)] font-mono">
                      {c.slug}
                    </td>
                    <td className="px-4 py-3 text-xs">{c.category}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublished(c)}
                        className={[
                          "px-2 py-1 rounded-full text-[10px] font-bold ring-1",
                          c.published
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : "bg-slate-100 text-slate-500 ring-slate-200",
                        ].join(" ")}
                      >
                        {c.published ? "● 공개" : "○ 비공개"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right pr-2">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => startEdit(c)}
                          disabled={editingId !== null}
                          className="px-2.5 py-1 rounded text-xs font-semibold text-[var(--color-brand-700)] bg-[var(--color-brand-50)] ring-1 ring-[var(--color-brand-100)] hover:bg-[var(--color-brand-100)] disabled:opacity-40"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => remove(c)}
                          disabled={editingId !== null}
                          className="px-2.5 py-1 rounded text-xs font-semibold text-rose-700 bg-rose-50 ring-1 ring-rose-200 hover:bg-rose-100 disabled:opacity-40"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editingId === c.id && (
                    <tr className="bg-[var(--color-brand-50)]/30">
                      <td colSpan={6} className="px-4 py-4">
                        <CaseForm
                          form={form}
                          setForm={setForm}
                          onSubmit={submit}
                          onCancel={cancelEdit}
                          submitting={submitting}
                          error={error}
                          mode="edit"
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CaseForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  submitting,
  error,
  mode,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitting: boolean;
  error: string | null;
  mode: "create" | "edit";
}) {
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm({ ...form, [k]: v });

  return (
    <div className="rounded-xl bg-white p-5 ring-1 ring-[var(--color-brand-200)]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">
          {mode === "create" ? "새 사례 추가" : "사례 수정"}
        </h3>
        <button
          onClick={onCancel}
          className="text-xs text-[var(--color-fg-mute)] hover:text-[var(--color-fg)]"
        >
          ✕ 취소
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="제목 *">
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={input}
            placeholder="예: PT샵"
          />
        </Field>
        <Field label="slug *" hint="소문자/숫자/하이픈만">
          <input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className={input + " font-mono"}
            placeholder="pt"
            disabled={mode === "edit"}
          />
        </Field>
        <Field label="카테고리 *">
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value as Category)}
            className={input}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="정렬 순서">
          <input
            type="number"
            value={form.display_order}
            onChange={(e) =>
              set("display_order", Number(e.target.value) || 0)
            }
            className={input}
          />
        </Field>
        <Field label="카드 요약 (1줄)" className="sm:col-span-2">
          <input
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            className={input}
            placeholder="체험 PT 신청까지의 이탈을 줄였습니다."
          />
        </Field>
        <Field label="일반적 고민" className="sm:col-span-2">
          <textarea
            rows={3}
            value={form.challenge}
            onChange={(e) => set("challenge", e.target.value)}
            className={input + " resize-y"}
            placeholder="이 업종에서 흔히 겪는 문제"
          />
        </Field>
        <Field label="WEFLOW의 접근" className="sm:col-span-2">
          <textarea
            rows={3}
            value={form.approach}
            onChange={(e) => set("approach", e.target.value)}
            className={input + " resize-y"}
            placeholder="우리가 어떻게 해결했나"
          />
        </Field>
        <Field label="지표 라벨">
          <input
            value={form.metric_label}
            onChange={(e) => set("metric_label", e.target.value)}
            className={input}
            placeholder="월 평균 체험 신청"
          />
        </Field>
        <Field label="BEFORE 값">
          <input
            value={form.metric_before}
            onChange={(e) => set("metric_before", e.target.value)}
            className={input}
            placeholder="14건"
          />
        </Field>
        <Field label="AFTER 값">
          <input
            value={form.metric_after}
            onChange={(e) => set("metric_after", e.target.value)}
            className={input}
            placeholder="52건"
          />
        </Field>
        <Field label="공개 여부">
          <label className="mt-2 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="h-4 w-4 accent-[var(--color-brand-600)]"
            />
            홈페이지 노출
          </label>
        </Field>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {error}
        </p>
      )}

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-soft)] rounded-lg"
        >
          취소
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="px-5 py-2 text-sm font-semibold text-white bg-[var(--color-brand-600)] rounded-lg hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? "저장 중..." : mode === "create" ? "추가" : "저장"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
        {label}
        {hint && (
          <span className="ml-1.5 font-normal text-[10px] text-[var(--color-fg-mute)]">
            {hint}
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const input =
  "w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm placeholder:text-[var(--color-fg-mute)]/60 focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-100)] bg-white";
