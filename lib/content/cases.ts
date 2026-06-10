// 성공사례 카테고리 정의 + 시각 메타.
// 실제 28개 업종 콘텐츠는 Supabase `cases` 테이블에서 로드합니다.

export type CaseCategory =
  | "피트니스"
  | "뷰티"
  | "교육"
  | "생활서비스"
  | "전문직"
  | "부동산"
  | "외식"
  | "금융"
  | "반려동물"
  | "키즈"
  | "자동차"
  | "웨딩"
  | "기업";

export const CATEGORY_META: Record<
  CaseCategory,
  { emoji: string; gradient: string; ring: string }
> = {
  피트니스: {
    emoji: "🏋️",
    gradient: "from-rose-100 to-orange-100",
    ring: "ring-rose-200",
  },
  뷰티: {
    emoji: "💅",
    gradient: "from-pink-100 to-purple-100",
    ring: "ring-pink-200",
  },
  교육: {
    emoji: "📚",
    gradient: "from-blue-100 to-indigo-100",
    ring: "ring-blue-200",
  },
  생활서비스: {
    emoji: "🧹",
    gradient: "from-emerald-100 to-teal-100",
    ring: "ring-emerald-200",
  },
  전문직: {
    emoji: "⚖️",
    gradient: "from-slate-100 to-blue-100",
    ring: "ring-slate-200",
  },
  부동산: {
    emoji: "🏢",
    gradient: "from-amber-100 to-orange-100",
    ring: "ring-amber-200",
  },
  외식: {
    emoji: "☕",
    gradient: "from-red-100 to-pink-100",
    ring: "ring-red-200",
  },
  금융: {
    emoji: "💼",
    gradient: "from-blue-100 to-cyan-100",
    ring: "ring-blue-200",
  },
  반려동물: {
    emoji: "🐶",
    gradient: "from-amber-100 to-yellow-100",
    ring: "ring-amber-200",
  },
  키즈: {
    emoji: "🧸",
    gradient: "from-yellow-100 to-pink-100",
    ring: "ring-yellow-200",
  },
  자동차: {
    emoji: "🚗",
    gradient: "from-slate-100 to-zinc-100",
    ring: "ring-slate-200",
  },
  웨딩: {
    emoji: "💐",
    gradient: "from-rose-100 to-pink-100",
    ring: "ring-rose-200",
  },
  기업: {
    emoji: "🏛️",
    gradient: "from-blue-100 to-slate-100",
    ring: "ring-blue-200",
  },
};

export const ALL_CATEGORIES: CaseCategory[] = [
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
];
