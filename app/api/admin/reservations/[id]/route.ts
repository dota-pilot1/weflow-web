import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthenticated } from "@/lib/admin-auth";

const VALID_STATUS = new Set(["pending", "in_progress", "done"]);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "권한 없음" }, { status: 401 });
  }

  const { id } = await params;
  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }
  if (!body.status || !VALID_STATUS.has(body.status)) {
    return Response.json(
      { ok: false, error: "유효하지 않은 상태값" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("reservations")
    .update({ status: body.status })
    .eq("id", id);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "권한 없음" }, { status: 401 });
  }
  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("reservations")
    .delete()
    .eq("id", id);
  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true });
}
