// 제작플랜 & 가격안내 데이터 (PDF 8~10페이지 명세 그대로)
// 가격 바뀌면 이 파일만 수정.

export type PlanCategory = "build" | "care" | "ad";

export type Plan = {
  key: string;
  name: string;
  subtitle: string;
  category: PlanCategory;
  highlight: boolean;          // 왕관 + 색상 차별화
  features: string[];
  prefix?: "월";                // 월정액 표시
  priceOriginal: number;
  priceSale: number;
  suffix?: "~";                 // "월 89,000원~" 형태
};

// ─── 제작 플랜 (1회성) ─────────────────────────────────────
export const BUILD_PLANS: Plan[] = [
  {
    key: "start",
    name: "START",
    subtitle: "랜딩페이지",
    category: "build",
    highlight: false,
    features: [
      "랜딩페이지 1페이지",
      "3~4일 빠른 제작 기간",
      "반응형 제작 (PC / 모바일)",
      "문의폼 연동",
      "기본 SEO 설정",
    ],
    priceOriginal: 498_000,
    priceSale: 249_000,
  },
  {
    key: "grow",
    name: "GROW",
    subtitle: "홈페이지",
    category: "build",
    highlight: false,
    features: [
      "홈페이지 5페이지",
      "1주 빠른 제작 기간",
      "반응형 제작 (PC / 모바일)",
      "문의폼 연동",
      "카카오톡 상담 연동",
      "기본 SEO 설정",
    ],
    priceOriginal: 1_980_000,
    priceSale: 990_000,
  },
  {
    key: "master",
    name: "MASTER",
    subtitle: "프리미엄",
    category: "build",
    highlight: true,
    features: [
      "홈페이지 + 랜딩페이지",
      "1~2주 빠른 제작 기간",
      "반응형 제작 (PC / 모바일)",
      "프리미엄 디자인",
      "예약 · 문의 시스템",
      "SEO 최적화",
      "광고 전환 구조 설계",
    ],
    priceOriginal: 2_980_000,
    priceSale: 1_490_000,
  },
];

// ─── 케어 플랜 (월정액) ────────────────────────────────────
export const CARE_PLANS: Plan[] = [
  {
    key: "we",
    name: "WE 케어",
    subtitle: "기본 관리 플랜",
    category: "care",
    highlight: false,
    features: [
      "유지보수 월 1회",
      "블로그 월 1회",
      "인스타 월 4회 (주 1회)",
      "스레드 월 4회 (주 1회)",
      "SEO 상단 등록",
    ],
    prefix: "월",
    priceOriginal: 170_000,
    priceSale: 89_000,
    suffix: "~",
  },
  {
    key: "flow",
    name: "FLOW 케어",
    subtitle: "성장 관리 플랜",
    category: "care",
    highlight: false,
    features: [
      "유지보수 월 3회",
      "인스타 월 8회 (주 2회)",
      "스레드 월 8회 (주 2회)",
      "블로그 월 2회",
      "네이버 키워드 세팅 할인 (149,000 → 79,000원)",
      "당근 키워드 광고 세팅 50% 할인",
      "문의 개선",
      "SEO 상단 등록",
    ],
    prefix: "월",
    priceOriginal: 378_000,
    priceSale: 189_000,
    suffix: "~",
  },
  {
    key: "weflow",
    name: "WEFLOW 케어",
    subtitle: "올인원 관리 플랜",
    category: "care",
    highlight: true,
    features: [
      "유지보수 무제한",
      "블로그 월 4회 (주 1회)",
      "인스타 월 12회 (주 3회)",
      "스레드 월 12회 (주 3회)",
      "네이버 키워드 / 당근 플레이스 광고 세팅 무료",
      "월 성과 체크",
      "랜딩 개선",
      "광고 관리",
      "SEO 최적화",
    ],
    prefix: "월",
    priceOriginal: 678_000,
    priceSale: 339_000,
    suffix: "~",
  },
];

// ─── 광고 플랜 (1회성 세팅, 광고비 별도) ───────────────────
export const AD_PLANS: Plan[] = [
  {
    key: "naver",
    name: "네이버 광고",
    subtitle: "키워드 세팅",
    category: "ad",
    highlight: false,
    features: [
      "키워드 분석",
      "광고 세팅 지원",
      "광고 문구 제작",
      "문의 구조 연결",
      "채널 연동 지원",
      "성과 최적화",
    ],
    priceOriginal: 298_000,
    priceSale: 149_000,
    suffix: "~",
  },
  {
    key: "danggn",
    name: "당근 플레이스 광고",
    subtitle: "키워드 세팅",
    category: "ad",
    highlight: false,
    features: [
      "지역 키워드 분석",
      "광고 세팅 지원",
      "광고 문구 제작",
      "지역 타겟 설정",
      "랜딩 연결 지원",
      "성과 최적화",
    ],
    priceOriginal: 158_000,
    priceSale: 79_000,
    suffix: "~",
  },
];

// ─── 하단 안내문 ──────────────────────────────────────────
export const PRICING_NOTES = [
  "모든 가격은 VAT 포함 금액입니다.",
  "도메인은 고객님 명의로 등록되며 비용은 별도입니다. 등록 및 연결 세팅은 무료 지원해드립니다.",
  "광고비는 고객 계정에서 직접 결제되며, 위플로우는 운영 및 세팅만 진행합니다.",
  "유지보수는 텍스트 · 이미지 · 링크 등 경미한 수정 기준입니다. 페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.",
];

export const PRICING_PERKS = [
  "도메인 연결 지원",
  "도메인 등록 대행 가능",
];

// ─── 플랜 키 → ContactForm 제작종류 매핑 ─────────────────
export const planToProjectType = (
  key: string,
):
  | "랜딩페이지 제작"
  | "홈페이지 제작"
  | "랜딩&홈페이지 제작"
  | "기타(WEFLOW 케어플랜)"
  | null => {
  switch (key) {
    case "start":
      return "랜딩페이지 제작";
    case "grow":
      return "홈페이지 제작";
    case "master":
      return "랜딩&홈페이지 제작";
    case "we":
    case "flow":
    case "weflow":
    case "naver":
    case "danggn":
      return "기타(WEFLOW 케어플랜)";
    default:
      return null;
  }
};

// ─── 플랜 키 → 카드에 표시되는 라벨 ────────────────────────
export const getPlanByKey = (key: string): Plan | null =>
  [...BUILD_PLANS, ...CARE_PLANS, ...AD_PLANS].find((p) => p.key === key) ??
  null;
