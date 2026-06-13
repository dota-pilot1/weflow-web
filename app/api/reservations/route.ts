import { supabaseAdmin } from "@/lib/supabase/server";
import { generateLookupCode } from "@/lib/lookup-code";
import { sendLookupSms } from "@/lib/sms";

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
  const desiredDate =
    typeof body.desiredDate === "string" ? body.desiredDate : "";
  const desiredTime =
    typeof body.desiredTime === "string" ? body.desiredTime.trim() : "";
  const customTime =
    typeof body.customTime === "string" && body.customTime.trim()
      ? body.customTime.trim()
      : null;
  const projectType =
    typeof body.projectType === "string" ? body.projectType : "";
  const industry =
    typeof body.industry === "string" ? body.industry.trim() : "";
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : null;
  const agreeTerms = body.agreeTerms === true;

  if (
    !name ||
    !phone ||
    !desiredDate ||
    !desiredTime ||
    !projectType ||
    !industry
  ) {
    return Response.json(
      { ok: false, error: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }
  if (!agreeTerms) {
    return Response.json(
      { ok: false, error: "개인정보 수집 및 상담 동의가 필요합니다." },
      { status: 400 }
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(desiredDate)) {
    return Response.json(
      { ok: false, error: "날짜 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  // 중복 예약 여부 체크
  const { data: existing, error: checkError } = await supabaseAdmin
    .from("reservations")
    .select("id")
    .eq("desired_date", desiredDate)
    .eq("desired_time", desiredTime)
    .limit(1);

  if (checkError) {
    return Response.json(
      { ok: false, error: checkError.message },
      { status: 500 }
    );
  }

  if (existing && existing.length > 0) {
    return Response.json(
      { ok: false, error: "이미 예약 완료된 시간대입니다. 다른 시간을 선택해주세요." },
      { status: 400 }
    );
  }

  const lookupCode = generateLookupCode();

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .insert({
      name,
      phone,
      desired_date: desiredDate,
      desired_time: desiredTime,
      custom_time: customTime,
      project_type: projectType,
      industry,
      message,
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
