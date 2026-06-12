import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { listCaseSlugs } from "@/lib/supabase/queries/cases";

export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/service", priority: 0.8 },
  { path: "/pricing", priority: 0.9 },
  { path: "/cases", priority: 0.9 },
  { path: "/reservation", priority: 0.7 },
  { path: "/diagnosis", priority: 0.8 },
  { path: "/lookup", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));

  // DB 장애가 사이트맵 전체를 죽이지 않도록 사례 목록은 best-effort
  try {
    const cases = await listCaseSlugs();
    for (const c of cases) {
      entries.push({
        url: `${SITE_URL}/cases/${c.slug}`,
        lastModified: new Date(c.updated_at),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // ignore — 정적 경로만으로 응답
  }

  return entries;
}
