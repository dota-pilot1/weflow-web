import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json(
      { ok: false, error: "유효한 날짜(YYYY-MM-DD) 형식이 필요합니다." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("desired_time")
    .eq("desired_date", date);

  if (error) {
    return Response.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  // Extract desired_time values
  const bookedTimes = data ? data.map((r) => r.desired_time) : [];

  return Response.json({ ok: true, bookedTimes });
}
