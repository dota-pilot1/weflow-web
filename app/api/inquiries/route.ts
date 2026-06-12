import { supabaseAdmin } from "@/lib/supabase/server";
import { generateLookupCode } from "@/lib/lookup-code";
import { sendLookupSms } from "@/lib/sms";

const VALID_SOURCE = new Set(["diagnosis", "inquiry", "landing"]);

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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const projectType =
    typeof body.projectType === "string" ? body.projectType : "";
  const industry =
    typeof body.industry === "string" ? body.industry.trim() : "";
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : null;
  const source = typeof body.source === "string" ? body.source : "";
  const agreeTerms = body.agreeTerms === true;

  if (!name || !phone || !projectType || !industry) {
    return Response.json(
      { ok: false, error: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }
  if (!VALID_SOURCE.has(source)) {
    return Response.json(
      { ok: false, error: "유효하지 않은 source 값입니다." },
      { status: 400 }
    );
  }
  if (!agreeTerms) {
    return Response.json(
      { ok: false, error: "개인정보 수집 및 상담 동의가 필요합니다." },
      { status: 400 }
    );
  }

  const lookupCode = generateLookupCode();

  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .insert({
      name,
      phone,
      project_type: projectType,
      industry,
      message,
      source,
      agree_terms: agreeTerms,
      lookup_code: lookupCode,
    })
    .select("id")
    .single();

  if (error) {
    return Response.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }

  // 조회코드 안내 SMS — 실패해도 접수는 성공 처리 (best-effort)
  await sendLookupSms(phone, lookupCode);

  return Response.json({ ok: true, id: data.id, lookupCode });
}
