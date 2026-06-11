import { supabase } from "@/lib/supabase/client";
import type { CaseCategory } from "@/lib/content/cases";

export type CaseRow = {
  id: string;
  slug: string;
  title: string;
  category: CaseCategory;
  summary: string | null;
  challenge: string | null;
  approach: string | null;
  metric_label: string | null;
  metric_before: string | null;
  metric_after: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type CaseListItem = Pick<
  CaseRow,
  "id" | "slug" | "title" | "category" | "summary" | "display_order"
>;

export async function listPublishedCases(): Promise<CaseListItem[]> {
  const { data, error } = await supabase
    .from("cases")
    .select("id, slug, title, category, summary, display_order")
    .eq("published", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CaseListItem[];
}

// 사이트맵용 — 공개된 사례의 slug와 수정 시각만
export async function listCaseSlugs(): Promise<
  Pick<CaseRow, "slug" | "updated_at">[]
> {
  const { data, error } = await supabase
    .from("cases")
    .select("slug, updated_at")
    .eq("published", true);
  if (error) throw error;
  return (data ?? []) as Pick<CaseRow, "slug" | "updated_at">[];
}

export async function getCaseBySlug(slug: string): Promise<CaseRow | null> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as CaseRow | null;
}
