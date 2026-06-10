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

type CaseInput = {
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

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "권한 없음" }, { status: 401 });
  }

  let body: CaseInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const category = typeof body.category === "string" ? body.category : "";

  if (!slug || !title || !category) {
    return Response.json(
      { ok: false, error: "slug, title, category 는 필수입니다." },
      { status: 400 }
    );
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return Response.json(
      { ok: false, error: "slug 는 소문자/숫자/하이픈만 허용됩니다." },
      { status: 400 }
    );
  }
  if (!VALID_CATEGORIES.has(category)) {
    return Response.json(
      { ok: false, error: "유효하지 않은 카테고리" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("cases")
    .insert({
      slug,
      title,
      category,
      summary: body.summary ?? null,
      challenge: body.challenge ?? null,
      approach: body.approach ?? null,
      metric_label: body.metric_label ?? null,
      metric_before: body.metric_before ?? null,
      metric_after: body.metric_after ?? null,
      display_order:
        typeof body.display_order === "number" ? body.display_order : 0,
      published: body.published !== false,
    })
    .select("*")
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true, case: data });
}
