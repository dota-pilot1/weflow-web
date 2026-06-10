// 성공사례 28개 업종 (PDF 7페이지 기준)

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

export type Case = {
  slug: string;
  title: string;        // 표시명 + 폼 industry로 전달되는 값
  category: CaseCategory;
  blurb?: string;
};

export const CASES: Case[] = [
  { slug: "pt", title: "PT샵", category: "피트니스" },
  { slug: "pilates", title: "필라테스", category: "피트니스" },
  { slug: "gym", title: "헬스장", category: "피트니스" },
  { slug: "insurance", title: "보험설계 사무소", category: "금융" },
  { slug: "law", title: "법률 사무소", category: "전문직" },
  { slug: "tax", title: "세무사 사무소", category: "전문직" },
  { slug: "realestate", title: "공인중개사", category: "부동산" },
  { slug: "cafe", title: "카페", category: "외식" },
  { slug: "hair", title: "미용실", category: "뷰티" },
  { slug: "nail", title: "네일샵", category: "뷰티" },
  { slug: "skin", title: "피부관리샵", category: "뷰티" },
  { slug: "wax", title: "왁싱샵", category: "뷰티" },
  { slug: "tattoo", title: "반영구샵", category: "뷰티" },
  { slug: "petgroom", title: "애견미용", category: "반려동물" },
  { slug: "petshop", title: "반려동물 용품점", category: "반려동물" },
  { slug: "kidscafe", title: "키즈카페", category: "키즈" },
  { slug: "studycafe", title: "스터디카페", category: "교육" },
  { slug: "english", title: "영어학원", category: "교육" },
  { slug: "math", title: "수학학원", category: "교육" },
  { slug: "exam", title: "입시학원", category: "교육" },
  { slug: "tutor", title: "개인과외", category: "교육" },
  { slug: "cleaning", title: "청소업체", category: "생활서비스" },
  { slug: "interior", title: "인테리어 업체", category: "생활서비스" },
  { slug: "moving", title: "이사 업체", category: "생활서비스" },
  { slug: "cardetail", title: "자동차 디테일링", category: "자동차" },
  { slug: "rentcar", title: "렌터카 업체", category: "자동차" },
  { slug: "wedding", title: "웨딩 · 스냅 업체", category: "웨딩" },
  { slug: "smb", title: "소상공인 기업형 홈페이지", category: "기업" },
];

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
