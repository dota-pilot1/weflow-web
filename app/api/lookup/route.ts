import { supabaseAdmin } from "@/lib/supabase/server";
import { normalizeLookupCode } from "@/lib/lookup-code";

const notFound = () =>
  Response.json(
    {
      ok: false,
      error:
        "일치하는 접수 내역이 없습니다. 조회 코드와 휴대폰 번호를 다시 확인해주세요.",
    },
    { status: 404 }
  );

type LookupResult = {
  type: "reservation" | "inquiry";
  status: string;
  createdAt: string;
  projectType: string;
  industry: string;
  source?: string;
  desiredDate?: string;
  desiredTime?: string;
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "잘못된 요청 형식입니다." },
      { status: 400 }
    );
  }

  const code =
    typeof body.code === "string" ? normalizeLookupCode(body.code) : null;
  const phoneLast4 =
    typeof body.phoneLast4 === "string" ? body.phoneLast4.trim() : "";

  if (!code || !/^\d{4}$/.test(phoneLast4)) {
    return Response.json(
      { ok: false, error: "조회 코드와 휴대폰 번호 뒤 4자리를 입력해주세요." },
      { status: 400 }
    );
  }

  const phoneMatches = (phone: string) =>
    phone.replace(/\D/g, "").endsWith(phoneLast4);

  const { data: reservation } = await supabaseAdmin
    .from("reservations")
    .select(
      "phone, status, created_at, project_type, industry, desired_date, desired_time, custom_time"
    )
    .eq("lookup_code", code)
    .maybeSingle();

  if (reservation) {
    if (!phoneMatches(reservation.phone)) return notFound();
    const result: LookupResult = {
      type: "reservation",
      status: reservation.status,
      createdAt: reservation.created_at,
      projectType: reservation.project_type,
      industry: reservation.industry,
      desiredDate: reservation.desired_date,
      desiredTime: reservation.custom_time ?? reservation.desired_time,
    };
    return Response.json({ ok: true, result });
  }

  const { data: inquiry } = await supabaseAdmin
    .from("inquiries")
    .select("phone, status, created_at, project_type, industry, source")
    .eq("lookup_code", code)
    .maybeSingle();

  if (inquiry) {
    if (!phoneMatches(inquiry.phone)) return notFound();
    const result: LookupResult = {
      type: "inquiry",
      status: inquiry.status,
      createdAt: inquiry.created_at,
      projectType: inquiry.project_type,
      industry: inquiry.industry,
      source: inquiry.source,
    };
    return Response.json({ ok: true, result });
  }

  return notFound();
}
