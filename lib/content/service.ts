// 서비스 페이지 데이터 (PDF 6페이지)

export type ProcessStep = {
  no: string;
  label: string;
  desc: string;
  icon: string;
};

export const PROCESS_6: ProcessStep[] = [
  {
    no: "01",
    label: "상담 · 진단",
    desc: "업종 및 제작 방향 확인",
    icon: "chat",
  },
  {
    no: "02",
    label: "기획 · 설계",
    desc: "문의 구조 및 전략 설계",
    icon: "ruler",
  },
  {
    no: "03",
    label: "디자인",
    desc: "브랜드 맞춤 화면 구성",
    icon: "palette",
  },
  {
    no: "04",
    label: "개발 · 테스트",
    desc: "기능 구현 · 최적화 · 검수 · 수정",
    icon: "code",
  },
  {
    no: "05",
    label: "SEO 상단 등록",
    desc: "네이버 · 구글 · 사이트맵 등록",
    icon: "search",
  },
  {
    no: "06",
    label: "광고운영 · 사후관리",
    desc: "인스타 · 블로그 · 네이버 키워드 광고 운영 관리",
    icon: "chart",
  },
];

export type AdSystem = {
  title: string;
  desc: string;
  icon: string;
  tag: "콘텐츠" | "광고" | "SEO";
};

export const AD_SYSTEMS: AdSystem[] = [
  {
    title: "블로그 업로드",
    desc: "정기 블로그 콘텐츠 발행 · 키워드 최적화",
    icon: "pen",
    tag: "콘텐츠",
  },
  {
    title: "인스타 업로드",
    desc: "비주얼 콘텐츠 제작 및 정기 업로드",
    icon: "instagram",
    tag: "콘텐츠",
  },
  {
    title: "스레드 업로드",
    desc: "실시간 텍스트 콘텐츠로 브랜드 노출",
    icon: "at",
    tag: "콘텐츠",
  },
  {
    title: "네이버 키워드 광고",
    desc: "검색 키워드 광고 세팅 및 운영",
    icon: "megaphone",
    tag: "광고",
  },
  {
    title: "당근 플레이스 광고",
    desc: "지역 기반 광고 타겟팅 운영",
    icon: "pin",
    tag: "광고",
  },
  {
    title: "네이버 서치어드바이저",
    desc: "네이버 검색 상단 노출 등록",
    icon: "trending",
    tag: "SEO",
  },
  {
    title: "구글 서치 콘솔",
    desc: "구글 검색 최적화 등록",
    icon: "globe",
    tag: "SEO",
  },
  {
    title: "사이트맵 등록",
    desc: "검색엔진 색인 최적화",
    icon: "map",
    tag: "SEO",
  },
];
