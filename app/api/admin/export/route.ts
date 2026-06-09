import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthenticated } from "@/lib/admin-auth";

type Kind = "reservations" | "inquiries";

const STATUS_KR: Record<string, string> = {
  pending: "대기",
  in_progress: "진행중",
  done: "완료",
};

const SOURCE_KR: Record<string, string> = {
  diagnosis: "무료진단",
  inquiry: "문의",
  landing: "랜딩",
};

const csvEscape = (v: unknown): string => {
  const s = v === null || v === undefined ? "" : String(v);
  if (s.includes(",") || s.includes("\"") || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
};

const buildCsv = (headers: string[], rows: string[][]) => {
  const lines = [headers, ...rows].map((line) =>
    line.map(csvEscape).join(",")
  );
  return "﻿" + lines.join("\r\n"); // UTF-8 BOM for Excel
};

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "권한 없음" }, { status: 401 });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") as Kind | null;
  if (type !== "reservations" && type !== "inquiries") {
    return Response.json(
      { ok: false, error: "type은 reservations 또는 inquiries" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from(type)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  let csv: string;
  let filename: string;
  const today = new Date().toISOString().slice(0, 10);

  if (type === "reservations") {
    const headers = [
      "상태",
      "이름",
      "연락처",
      "희망 날짜",
      "희망 시간",
      "직접 입력 시간",
      "제작 종류",
      "업종",
      "추가 요청사항",
      "동의",
      "접수일시",
    ];
    const rows = (data ?? []).map((r) => [
      STATUS_KR[r.status] ?? r.status,
      r.name,
      r.phone,
      r.desired_date,
      r.desired_time,
      r.custom_time ?? "",
      r.project_type,
      r.industry,
      r.message ?? "",
      r.agree_terms ? "Y" : "N",
      r.created_at,
    ]);
    csv = buildCsv(headers, rows);
    filename = `weflow-reservations-${today}.csv`;
  } else {
    const headers = [
      "상태",
      "이름",
      "연락처",
      "출처",
      "제작 종류",
      "업종",
      "추가 요청사항",
      "동의",
      "접수일시",
    ];
    const rows = (data ?? []).map((r) => [
      STATUS_KR[r.status] ?? r.status,
      r.name,
      r.phone,
      SOURCE_KR[r.source] ?? r.source,
      r.project_type,
      r.industry,
      r.message ?? "",
      r.agree_terms ? "Y" : "N",
      r.created_at,
    ]);
    csv = buildCsv(headers, rows);
    filename = `weflow-inquiries-${today}.csv`;
  }

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
