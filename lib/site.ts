export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://weflow-web-phi.vercel.app";

export const COMPANY = {
  name: "WEFLOW",
  tagline: "제작부터 관리까지 비즈니스 성장을 함께합니다.",
  ceo: "신서준",
  bizNumber: "884-07-03480",
  email: "contact@weflowlab.kr",
  hours: "연중무휴 24시간 상담가능",
  copyright: "© 2026 WEFLOW. All rights reserved.",
};

export const LINKS = {
  phone: "010-2971-7280",
  phoneTel: "tel:01029717280",
  kakao: "http://pf.kakao.com/_xntCbX",
  blog: "https://m.blog.naver.com/weflowlab",
  instagram:
    "https://www.instagram.com/weflowlab.kr?igsh=b2c1eTdwbHo2bWRt",
  facebook:
    "https://www.facebook.com/profile.php?id=61590187124682&sk=about",
};

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/service", label: "서비스" },
  { href: "/pricing", label: "제작플랜&가격안내" },
  { href: "/cases", label: "성공사례" },
  { href: "/reservation", label: "예약" },
];

export const FOOTER_SERVICE = [
  { href: "/service", label: "홈페이지 제작 과정" },
  { href: "/service", label: "랜딩페이지 제작 과정" },
  { href: "/service", label: "광고 운영 · 관리 안내" },
];

export const FOOTER_CARE = [
  { href: "/pricing", label: "WE 케어" },
  { href: "/pricing", label: "FLOW 케어" },
  { href: "/pricing", label: "WEFLOW 케어" },
];

export const FOOTER_CONTACT = [
  { href: LINKS.phoneTel, label: "전화문의", external: true },
  { href: `mailto:${COMPANY.email}`, label: "이메일 문의", external: true },
  { href: LINKS.kakao, label: "카카오 채널 문의", external: true },
  { href: LINKS.instagram, label: "인스타 문의", external: true },
  { href: LINKS.facebook, label: "페이스북 문의", external: true },
];
