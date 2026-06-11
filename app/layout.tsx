import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingBar from "@/components/FloatingBar";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL, COMPANY, LINKS } from "@/lib/site";

const SITE_TITLE = "WEFLOW | 문의로 이어지는 홈페이지를 만듭니다";
const SITE_DESCRIPTION =
  "홈페이지 제작부터 광고 연동·운영 관리까지. 단순 제작이 아닌 문의 구조까지 설계하는 마케팅 에이전시 WEFLOW.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | WEFLOW",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "WEFLOW",
    "홈페이지 제작",
    "랜딩페이지",
    "마케팅 에이전시",
    "광고 운영",
    "문의 전환",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "WEFLOW",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// 구글·네이버 비즈니스 정보용 구조화 데이터
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: COMPANY.name,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: COMPANY.email,
  telephone: "+82-10-2971-7280",
  openingHours: "Mo-Su 00:00-24:00",
  areaServed: "KR",
  founder: { "@type": "Person", name: COMPANY.ceo },
  sameAs: [LINKS.blog, LINKS.instagram, LINKS.facebook, LINKS.kakao],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("weflow-theme");if(t&&t!=="default")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SiteChrome
          header={<Header />}
          footer={<Footer />}
          floatingBar={<FloatingBar />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
