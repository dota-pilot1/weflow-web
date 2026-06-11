import * as XLSX from "xlsx";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthenticated } from "@/lib/admin-auth";

type Kind = "reservations" | "inquiries" | "all";

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

const RESERVATION_HEADERS = [
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

const INQUIRY_HEADERS = [
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

/* eslint-disable @typescript-eslint/no-explicit-any */
const reservationRow = (r: any): (string | number)[] => [
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
];

const inquiryRow = (r: any): (string | number)[] => [
  STATUS_KR[r.status] ?? r.status,
  r.name,
  r.phone,
  SOURCE_KR[r.source] ?? r.source,
  r.project_type,
  r.industry,
  r.message ?? "",
  r.agree_terms ? "Y" : "N",
  r.created_at,
];
/* eslint-enable @typescript-eslint/no-explicit-any */

const toSheet = (headers: string[], rows: (string | number)[][]) => {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  // 열 너비를 내용에 맞춰 대략 조정
  ws["!cols"] = headers.map((h, i) => ({
    wch: Math.max(
      h.length * 2,
      ...rows.map((r) => String(r[i] ?? "").length + 2)
    ),
  }));
  return ws;
};

async function fetchAll(table: "reservations" | "inquiries") {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "권한 없음" }, { status: 401 });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") as Kind | null;
  if (type !== "reservations" && type !== "inquiries" && type !== "all") {
    return Response.json(
      { ok: false, error: "type은 reservations, inquiries 또는 all" },
      { status: 400 }
    );
  }

  try {
    const wb = XLSX.utils.book_new();

    if (type === "reservations" || type === "all") {
      const rows = (await fetchAll("reservations")).map(reservationRow);
      XLSX.utils.book_append_sheet(
        wb,
        toSheet(RESERVATION_HEADERS, rows),
        "예약"
      );
    }
    if (type === "inquiries" || type === "all") {
      const rows = (await fetchAll("inquiries")).map(inquiryRow);
      XLSX.utils.book_append_sheet(wb, toSheet(INQUIRY_HEADERS, rows), "문의");
    }

    const today = new Date().toISOString().slice(0, 10);
    const name =
      type === "all"
        ? "weflow-all"
        : type === "reservations"
          ? "weflow-reservations"
          : "weflow-inquiries";
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new Response(buf, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${name}-${today}.xlsx"`,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "export 실패";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
