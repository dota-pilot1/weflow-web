"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AdminCasesPanel, {
  type CaseAdminRow,
} from "@/components/admin/AdminCasesPanel";

type Status = "pending" | "in_progress" | "done";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  desired_date: string;
  desired_time: string;
  custom_time: string | null;
  project_type: string;
  industry: string;
  message: string | null;
  status: Status;
  agree_terms: boolean;
  created_at: string;
};

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  project_type: string;
  industry: string;
  message: string | null;
  source: string;
  status: Status;
  agree_terms: boolean;
  created_at: string;
};

type Tab = "reservations" | "inquiries" | "cases";
type StatusFilter = Status | "all";

const STATUS_META: Record<
  Status,
  { label: string; color: string; ring: string }
> = {
  pending: {
    label: "대기",
    color: "bg-slate-100 text-slate-600",
    ring: "ring-slate-200",
  },
  in_progress: {
    label: "진행중",
    color: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
    ring: "ring-[var(--color-brand-100)]",
  },
  done: {
    label: "완료",
    color: "bg-emerald-50 text-emerald-700",
    ring: "ring-emerald-200",
  },
};

const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "pending", label: "대기" },
  { key: "in_progress", label: "진행중" },
  { key: "done", label: "완료" },
];

const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yy}-${mm}-${dd} ${hh}:${mi}`;
};

export default function AdminDashboard({
  initialReservations,
  initialInquiries,
  initialCases,
}: {
  initialReservations: Reservation[];
  initialInquiries: Inquiry[];
  initialCases: CaseAdminRow[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("reservations");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // ─── Realtime ─────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("admin-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        (payload) => {
          setReservations((prev) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as Reservation, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              return prev.map((r) =>
                r.id === (payload.new as Reservation).id
                  ? (payload.new as Reservation)
                  : r
              );
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((r) => r.id !== (payload.old as Reservation).id);
            }
            return prev;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inquiries" },
        (payload) => {
          setInquiries((prev) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as Inquiry, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              return prev.map((r) =>
                r.id === (payload.new as Inquiry).id
                  ? (payload.new as Inquiry)
                  : r
              );
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((r) => r.id !== (payload.old as Inquiry).id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // ─── 액션 ─────────────────────────────────────────
  const updateStatus = async (
    kind: Tab,
    id: string,
    status: Status
  ) => {
    // 낙관적 업데이트 — 자기 액션은 즉시 반영. Realtime은 다른 탭 동기화용.
    if (kind === "reservations") {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } else {
      setInquiries((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
    const res = await fetch(`/api/admin/${kind}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      alert(json.error || "상태 변경에 실패했습니다.");
      router.refresh(); // 실패 시 서버 상태 다시 가져오기
    }
  };

  const remove = async (kind: Tab, id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    // 낙관적 삭제
    if (kind === "reservations") {
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } else {
      setInquiries((prev) => prev.filter((r) => r.id !== id));
    }
    const res = await fetch(`/api/admin/${kind}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      alert(json.error || "삭제에 실패했습니다.");
      router.refresh();
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const refresh = () => router.refresh();

  const downloadExcel = (kind: Tab | "all") => {
    window.location.href = `/api/admin/export?type=${kind}`;
  };

  // ─── 필터링 ───────────────────────────────────────
  const visibleReservations = useMemo(
    () =>
      reservations.filter((r) => filter === "all" || r.status === filter),
    [reservations, filter]
  );
  const visibleInquiries = useMemo(
    () => inquiries.filter((r) => filter === "all" || r.status === filter),
    [inquiries, filter]
  );

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ─── 카운트 ───────────────────────────────────────
  const currentList = tab === "reservations" ? reservations : inquiries;
  const counts =
    tab === "cases"
      ? ({ all: 0, pending: 0, in_progress: 0, done: 0 } as Record<
          StatusFilter,
          number
        >)
      : ({
          all: currentList.length,
          pending: currentList.filter((r) => r.status === "pending").length,
          in_progress: currentList.filter((r) => r.status === "in_progress")
            .length,
          done: currentList.filter((r) => r.status === "done").length,
        } as Record<StatusFilter, number>);

  // ─── 렌더 ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)]">
      {/* HEADER */}
      <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold tracking-tight">
              WEFLOW 관리자
            </span>
            <span className="chip">실시간</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-soft)]"
            >
              ↻ 새로고침
            </button>
            <button
              onClick={logout}
              className="rounded-lg bg-[var(--color-fg)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* TABS + EXCEL */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-xl bg-white p-1 ring-1 ring-[var(--color-border)]">
            {(
              [
                { key: "reservations", label: `예약 관리 (${reservations.length})` },
                { key: "inquiries", label: `문의 관리 (${inquiries.length})` },
                { key: "cases", label: `케이스 관리 (${initialCases.length})` },
              ] as { key: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key);
                  setFilter("all");
                  setExpanded(new Set());
                }}
                className={[
                  "px-4 py-2 text-sm font-semibold rounded-lg transition",
                  tab === t.key
                    ? "bg-[var(--color-brand-600)] text-white"
                    : "text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-soft)]",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {tab !== "cases" && (
              <button
                onClick={() => downloadExcel(tab)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                ⬇ {tab === "reservations" ? "예약" : "문의"} 엑셀 다운
              </button>
            )}
            <button
              onClick={() => downloadExcel("all")}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              ⬇ 전체 엑셀 다운
            </button>
          </div>
        </div>

        {/* FILTERS — cases 탭에서는 상태 개념 없음 */}
        {tab !== "cases" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={[
                  "px-3 py-1.5 text-xs font-semibold rounded-full ring-1 transition",
                  filter === f.key
                    ? "bg-[var(--color-brand-600)] text-white ring-[var(--color-brand-600)]"
                    : "bg-white text-[var(--color-fg-soft)] ring-[var(--color-border)] hover:bg-[var(--color-bg-soft)]",
                ].join(" ")}
              >
                {f.label} ({counts[f.key]})
              </button>
            ))}
          </div>
        )}

        {/* CONTENT */}
        {tab === "cases" ? (
          <div className="mt-6">
            <AdminCasesPanel initialCases={initialCases} />
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-xl bg-white ring-1 ring-[var(--color-border)]">
            {tab === "reservations" ? (
              <ReservationsTable
                rows={visibleReservations}
                expanded={expanded}
                onToggle={toggleExpand}
                onStatus={(id, s) => updateStatus("reservations", id, s)}
                onDelete={(id) => remove("reservations", id)}
              />
            ) : (
              <InquiriesTable
                rows={visibleInquiries}
                expanded={expanded}
                onToggle={toggleExpand}
                onStatus={(id, s) => updateStatus("inquiries", id, s)}
                onDelete={(id) => remove("inquiries", id)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 예약 테이블 ──────────────────────────────────────
function ReservationsTable({
  rows,
  expanded,
  onToggle,
  onStatus,
  onDelete,
}: {
  rows: Reservation[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-[var(--color-fg-mute)]">
        표시할 예약이 없습니다.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--color-bg-soft)] text-xs text-[var(--color-fg-soft)]">
          <tr>
            <Th>상태</Th>
            <Th>이름</Th>
            <Th>연락처</Th>
            <Th>접수일</Th>
            <Th>희망 일정</Th>
            <Th className="text-right pr-6">관리</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <RowGroup
              key={r.id}
              id={r.id}
              opened={expanded.has(r.id)}
              onToggle={() => onToggle(r.id)}
              detail={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Detail label="제작 종류" value={r.project_type} />
                  <Detail label="업종" value={r.industry} />
                  <Detail
                    label="직접 입력 시간"
                    value={r.custom_time || "—"}
                  />
                  <Detail
                    label="추가 요청사항"
                    value={r.message || "—"}
                    className="sm:col-span-3"
                  />
                </div>
              }
            >
              <Td>
                <StatusBadge status={r.status} />
              </Td>
              <Td>{r.name}</Td>
              <Td>{r.phone}</Td>
              <Td>{fmtDateTime(r.created_at)}</Td>
              <Td>
                {r.desired_date}{" "}
                <span className="text-[var(--color-fg-mute)]">
                  {r.desired_time}
                </span>
              </Td>
              <Td className="text-right pr-2">
                <ActionButtons
                  status={r.status}
                  onChange={(s) => onStatus(r.id, s)}
                  onDelete={() => onDelete(r.id)}
                  opened={expanded.has(r.id)}
                  onToggle={() => onToggle(r.id)}
                />
              </Td>
            </RowGroup>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 문의 테이블 ──────────────────────────────────────
function InquiriesTable({
  rows,
  expanded,
  onToggle,
  onStatus,
  onDelete,
}: {
  rows: Inquiry[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-[var(--color-fg-mute)]">
        표시할 문의가 없습니다.
      </div>
    );
  }
  const sourceLabel = (s: string) =>
    s === "diagnosis" ? "무료진단" : s === "landing" ? "랜딩" : "문의";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--color-bg-soft)] text-xs text-[var(--color-fg-soft)]">
          <tr>
            <Th>상태</Th>
            <Th>이름</Th>
            <Th>연락처</Th>
            <Th>접수일</Th>
            <Th>출처</Th>
            <Th className="text-right pr-6">관리</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <RowGroup
              key={r.id}
              id={r.id}
              opened={expanded.has(r.id)}
              onToggle={() => onToggle(r.id)}
              detail={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Detail label="제작 종류" value={r.project_type} />
                  <Detail label="업종" value={r.industry} />
                  <Detail label="출처" value={sourceLabel(r.source)} />
                  <Detail
                    label="추가 요청사항"
                    value={r.message || "—"}
                    className="sm:col-span-3"
                  />
                </div>
              }
            >
              <Td>
                <StatusBadge status={r.status} />
              </Td>
              <Td>{r.name}</Td>
              <Td>{r.phone}</Td>
              <Td>{fmtDateTime(r.created_at)}</Td>
              <Td>{sourceLabel(r.source)}</Td>
              <Td className="text-right pr-2">
                <ActionButtons
                  status={r.status}
                  onChange={(s) => onStatus(r.id, s)}
                  onDelete={() => onDelete(r.id)}
                  opened={expanded.has(r.id)}
                  onToggle={() => onToggle(r.id)}
                />
              </Td>
            </RowGroup>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 공통 ─────────────────────────────────────────
function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={
        "text-left font-semibold px-4 py-3 " + (className || "")
      }
    >
      {children}
    </th>
  );
}
function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={"px-4 py-3 align-middle " + (className || "")}>
      {children}
    </td>
  );
}

function RowGroup({
  opened,
  detail,
  children,
}: {
  id: string;
  opened: boolean;
  onToggle: () => void;
  detail: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <tr className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg-soft)]/50">
        {children}
      </tr>
      {opened && (
        <tr className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/60">
          <td colSpan={6} className="px-4 py-4">
            {detail}
          </td>
        </tr>
      )}
    </>
  );
}

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold text-[var(--color-fg-mute)]">
        {label}
      </p>
      <p className="mt-1 text-sm whitespace-pre-wrap">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const m = STATUS_META[status];
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1",
        m.color,
        m.ring,
      ].join(" ")}
    >
      {m.label}
    </span>
  );
}

function ActionButtons({
  status,
  onChange,
  onDelete,
  opened,
  onToggle,
}: {
  status: Status;
  onChange: (status: Status) => void;
  onDelete: () => void;
  opened: boolean;
  onToggle: () => void;
}) {
  const btn =
    "px-2.5 py-1.5 text-xs font-semibold rounded-md transition disabled:opacity-40 disabled:cursor-not-allowed";
  return (
    <div className="inline-flex items-center gap-1 flex-wrap justify-end">
      <button
        type="button"
        disabled={status === "in_progress"}
        onClick={() => onChange("in_progress")}
        className={
          btn + " bg-[var(--color-brand-50)] text-[var(--color-brand-700)] hover:bg-[var(--color-brand-100)]"
        }
      >
        진행중
      </button>
      <button
        type="button"
        disabled={status === "done"}
        onClick={() => onChange("done")}
        className={btn + " bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}
      >
        완료
      </button>
      <button
        type="button"
        onClick={onDelete}
        className={btn + " bg-rose-50 text-rose-700 hover:bg-rose-100"}
      >
        삭제
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label="상세 토글"
        className="px-2 py-1.5 text-xs text-[var(--color-fg-soft)] hover:bg-[var(--color-bg-soft)] rounded-md"
      >
        {opened ? "▲" : "▼"}
      </button>
    </div>
  );
}
