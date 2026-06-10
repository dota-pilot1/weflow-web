import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthenticated } from "@/lib/admin-auth";

const VALID_CATEGORIES = new Set([
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
]);

type CasePatch = {
  slug?: string;
  title?: string;
  category?: string;
  summary?: string | null;
  challenge?: string | null;
  approach?: string | null;
  metric_label?: string | null;
  metric_before?: string | null;
  metric_after?: string | null;
  display_order?: number;
  published?: boolean;
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "권한 없음" }, { status: 401 });
  }

  const { id } = await params;
  let body: CasePatch;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.slug !== undefined) {
    const slug = body.slug.trim();
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return Response.json(
        { ok: false, error: "slug 형식이 올바르지 않습니다." },
        { status: 400 }
      );
    }
    patch.slug = slug;
  }
  if (body.title !== undefined) {
    const title = body.title.trim();
    if (!title) {
      return Response.json(
        { ok: false, error: "title 은 필수입니다." },
        { status: 400 }
      );
    }
    patch.title = title;
  }
  if (body.category !== undefined) {
    if (!VALID_CATEGORIES.has(body.category)) {
      return Response.json(
        { ok: false, error: "유효하지 않은 카테고리" },
        { status: 400 }
      );
    }
    patch.category = body.category;
  }
  if (body.summary !== undefined) patch.summary = body.summary;
  if (body.challenge !== undefined) patch.challenge = body.challenge;
  if (body.approach !== undefined) patch.approach = body.approach;
  if (body.metric_label !== undefined) patch.metric_label = body.metric_label;
  if (body.metric_before !== undefined) patch.metric_before = body.metric_before;
  if (body.metric_after !== undefined) patch.metric_after = body.metric_after;
  if (typeof body.display_order === "number")
    patch.display_order = body.display_order;
  if (typeof body.published === "boolean") patch.published = body.published;

  const { data, error } = await supabaseAdmin
    .from("cases")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true, case: data });
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
    .from("cases")
    .delete()
    .eq("id", id);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true });
}
