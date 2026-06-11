// 업종별 제작 샘플(데모) 사이트 데이터 — /demo/[slug]
// 히어로 카루셀·성공사례 썸네일이 이 데모들의 실제 스크린샷을 사용한다.

export type Demo = {
  slug: string;
  domain: string;
  brand: string;
  category: string; // 성공사례 카테고리와 매핑
  heroStyle: "split" | "center";
  radius: "full" | "lg";
  colors: {
    primary: string;
    dark: string;
    soft: string;
    ink: string;
    accent: string;
  };
  nav: string[];
  hero: {
    badge: string;
    h1a: string;
    h1b: string;
    sub: string;
    cta: string;
    ghost: string;
  };
  stats: { value: string; label: string }[];
  features: { icon: string; title: string; desc: string }[];
  programs: {
    name: string;
    desc: string;
    price: string;
    note?: string;
    highlight?: boolean;
  }[];
  reviews: { text: string; by: string }[];
  form: { title: string; submit: string };
};

export const DEMOS: Demo[] = [
  {
    slug: "pilates",
    domain: "lia-pilates.kr",
    brand: "리아 필라테스",
    category: "필라테스",
    heroStyle: "center",
    radius: "full",
    colors: {
      primary: "#5d8a72",
      dark: "#3f6351",
      soft: "#eef5f0",
      ink: "#22302a",
      accent: "#d9a441",
    },
    nav: ["스튜디오 소개", "클래스", "강사진", "오시는 길"],
    hero: {
      badge: "1:1 · 그룹 기구 필라테스 전문",
      h1a: "바른 자세에서 시작되는",
      h1b: "단단하고 우아한 몸",
      sub: "국제 자격 강사진의 체형 분석 후, 나에게 맞는 클래스를 제안해 드립니다.",
      cta: "무료 체험 예약",
      ghost: "클래스 보기",
    },
    stats: [
      { value: "1,200+", label: "누적 회원" },
      { value: "98%", label: "재등록률" },
      { value: "8년", label: "운영 경력" },
    ],
    features: [
      {
        icon: "target",
        title: "체형 분석 맞춤 수업",
        desc: "첫 방문 시 자세 분석 후 개인별 커리큘럼을 설계합니다.",
      },
      {
        icon: "clock",
        title: "원하는 시간에",
        desc: "오전 6시부터 밤 10시까지, 앱에서 간편하게 예약하세요.",
      },
      {
        icon: "crown",
        title: "프리미엄 기구",
        desc: "독일 정품 리포머·캐딜락 풀 세트를 갖췄습니다.",
      },
    ],
    programs: [
      {
        name: "그룹 클래스",
        desc: "최대 6인 소수정원 기구 수업",
        price: "월 220,000원",
      },
      {
        name: "1:1 퍼스널",
        desc: "체형 교정 집중 맞춤 수업",
        price: "회 90,000원",
        highlight: true,
        note: "첫 체험 50%",
      },
      {
        name: "듀엣 클래스",
        desc: "친구·커플과 함께하는 2인 수업",
        price: "회 60,000원",
      },
    ],
    reviews: [
      {
        text: "허리 통증 때문에 시작했는데 3개월 만에 자세가 완전히 달라졌어요.",
        by: "회원 김O진",
      },
      {
        text: "선생님이 매 수업 컨디션을 체크해 주셔서 믿고 다닙니다.",
        by: "회원 박O영",
      },
    ],
    form: { title: "무료 체험 수업 신청", submit: "체험 예약하기" },
  },
  {
    slug: "law",
    domain: "haeon-law.kr",
    brand: "법무법인 해온",
    category: "전문직",
    heroStyle: "split",
    radius: "lg",
    colors: {
      primary: "#1f3a5f",
      dark: "#16293f",
      soft: "#eef2f7",
      ink: "#101826",
      accent: "#b08d3e",
    },
    nav: ["사무소 소개", "업무 분야", "구성원", "승소 사례"],
    hero: {
      badge: "민사 · 형사 · 기업 자문",
      h1a: "어려운 법률 문제,",
      h1b: "결과로 증명합니다",
      sub: "대형 로펌 출신 변호사가 사건 접수부터 종결까지 직접 수행합니다.",
      cta: "법률 상담 신청",
      ghost: "승소 사례 보기",
    },
    stats: [
      { value: "2,400+", label: "수행 사건" },
      { value: "92%", label: "승소·합의율" },
      { value: "15년", label: "평균 경력" },
    ],
    features: [
      {
        icon: "chat",
        title: "변호사 직접 상담",
        desc: "사무장이 아닌 담당 변호사가 처음부터 상담합니다.",
      },
      {
        icon: "search",
        title: "투명한 진행 보고",
        desc: "사건 진행 상황을 단계마다 문자로 알려드립니다.",
      },
      {
        icon: "wallet",
        title: "합리적 수임료",
        desc: "착수금·성공보수를 계약 전에 명확히 안내합니다.",
      },
    ],
    programs: [
      {
        name: "전화 상담",
        desc: "30분 사건 방향 진단",
        price: "무료",
      },
      {
        name: "방문 상담",
        desc: "서면 검토 포함 심층 상담",
        price: "110,000원",
        highlight: true,
        note: "수임 시 공제",
      },
      {
        name: "기업 자문",
        desc: "월 단위 계약·법무 자문",
        price: "월 990,000원~",
      },
    ],
    reviews: [
      {
        text: "복잡한 임대차 분쟁이었는데 예상보다 빠르게 합의로 끝났습니다.",
        by: "의뢰인 정O수",
      },
      {
        text: "진행 상황을 계속 공유해 주셔서 불안하지 않았어요.",
        by: "의뢰인 한O희",
      },
    ],
    form: { title: "법률 상담 신청", submit: "상담 신청하기" },
  },
  {
    slug: "car",
    domain: "speed-carcenter.kr",
    brand: "스피드카센터",
    category: "자동차",
    heroStyle: "split",
    radius: "lg",
    colors: {
      primary: "#e8890c",
      dark: "#1c1917",
      soft: "#fdf6ec",
      ink: "#1c1917",
      accent: "#2563eb",
    },
    nav: ["정비 안내", "판금 · 도색", "작업 사례", "오시는 길"],
    hero: {
      badge: "수입차 · 국산차 전문 정비",
      h1a: "수리부터 도색까지,",
      h1b: "견적 먼저 투명하게",
      sub: "사진만 보내면 10분 안에 예상 견적을 보내드립니다. 보험 처리도 한 번에.",
      cta: "10분 견적 받기",
      ghost: "작업 사례",
    },
    stats: [
      { value: "9,800+", label: "누적 정비" },
      { value: "10분", label: "평균 견적 회신" },
      { value: "12개월", label: "수리 보증" },
    ],
    features: [
      {
        icon: "zap",
        title: "당일 수리",
        desc: "경정비·소도색은 예약 당일 출고를 원칙으로 합니다.",
      },
      {
        icon: "wallet",
        title: "정찰제 견적",
        desc: "작업 전 확정 견적, 추가 비용은 사전 동의 후 진행합니다.",
      },
      {
        icon: "phone",
        title: "긴급 출동",
        desc: "반경 10km 내 긴급 출동 서비스를 운영합니다.",
      },
    ],
    programs: [
      {
        name: "경정비 패키지",
        desc: "엔진오일 + 필터 + 21종 점검",
        price: "79,000원~",
      },
      {
        name: "판금 · 도색",
        desc: "부위별 정찰제, 열처리 부스 보유",
        price: "120,000원~",
        highlight: true,
        note: "보험 처리 가능",
      },
      {
        name: "신차 패키지",
        desc: "유리막 코팅 + 틴팅 + 블랙박스",
        price: "590,000원~",
      },
    ],
    reviews: [
      {
        text: "범퍼 도색 견적이 다른 곳 절반이었는데 마감은 더 깔끔해요.",
        by: "고객 이O준",
      },
      {
        text: "보험 처리까지 알아서 해주셔서 전화 한 통으로 끝났습니다.",
        by: "고객 송O민",
      },
    ],
    form: { title: "빠른 견적 문의", submit: "견적 받기" },
  },
  {
    slug: "pt",
    domain: "iron-ptgym.kr",
    brand: "아이언 PT짐",
    category: "PT · 헬스",
    heroStyle: "center",
    radius: "lg",
    colors: {
      primary: "#d6453d",
      dark: "#18181b",
      soft: "#fdf0ef",
      ink: "#18181b",
      accent: "#f59e0b",
    },
    nav: ["짐 소개", "PT 프로그램", "트레이너", "후기"],
    hero: {
      badge: "바디프로필 · 다이어트 · 재활 전문",
      h1a: "3개월 뒤의 몸이",
      h1b: "지금 결정됩니다",
      sub: "생활습관 코칭과 식단 관리까지, 회원 전담 트레이너가 끝까지 책임집니다.",
      cta: "무료 상담 + 인바디",
      ghost: "변화 사례 보기",
    },
    stats: [
      { value: "850+", label: "바디 변화 사례" },
      { value: "1:1", label: "전담 트레이너" },
      { value: "24시", label: "회원 전용 출입" },
    ],
    features: [
      {
        icon: "target",
        title: "목표 역산 설계",
        desc: "목표일 기준으로 주차별 운동·식단을 역산해 설계합니다.",
      },
      {
        icon: "chart",
        title: "주간 데이터 리포트",
        desc: "인바디·식단 데이터를 매주 리포트로 받아보세요.",
      },
      {
        icon: "chat",
        title: "식단 코칭 채팅",
        desc: "매 끼니 사진을 보내면 트레이너가 바로 피드백합니다.",
      },
    ],
    programs: [
      {
        name: "PT 10회",
        desc: "운동 입문 · 자세 교정",
        price: "550,000원",
      },
      {
        name: "PT 30회",
        desc: "체형 변화 집중 + 식단 코칭",
        price: "1,350,000원",
        highlight: true,
        note: "헬스장 이용 무료",
      },
      {
        name: "바디프로필",
        desc: "12주 촬영 패키지 (스튜디오 포함)",
        price: "1,900,000원",
      },
    ],
    reviews: [
      {
        text: "30회 끝나고 인생 첫 복근을 봤습니다. 식단 관리가 진짜 달라요.",
        by: "회원 최O혁",
      },
      {
        text: "재활 목적으로 시작했는데 무릎 통증 없이 스쿼트해요.",
        by: "회원 윤O아",
      },
    ],
    form: { title: "무료 상담 신청", submit: "상담 신청하기" },
  },
  {
    slug: "insurance",
    domain: "theplan-fp.kr",
    brand: "더플랜 보험설계",
    category: "보험 설계",
    heroStyle: "split",
    radius: "full",
    colors: {
      primary: "#2563eb",
      dark: "#1e3a8a",
      soft: "#eff4ff",
      ink: "#0f1c33",
      accent: "#10b981",
    },
    nav: ["서비스 소개", "보장 분석", "상담 후기", "자주 묻는 질문"],
    hero: {
      badge: "내 보험료, 제대로 쓰이고 있을까요?",
      h1a: "보험료는 줄이고,",
      h1b: "보장은 키우는 설계",
      sub: "가입 권유가 아닌 분석 먼저. 현재 증권을 무료로 진단해 드립니다.",
      cta: "무료 보장 분석",
      ghost: "상담 후기 보기",
    },
    stats: [
      { value: "3,100+", label: "보장 분석 건수" },
      { value: "평균 23%", label: "보험료 절감" },
      { value: "11개사", label: "비교 설계" },
    ],
    features: [
      {
        icon: "search",
        title: "증권 정밀 진단",
        desc: "중복·누락 보장을 한 장의 리포트로 정리해 드립니다.",
      },
      {
        icon: "layers",
        title: "11개 보험사 비교",
        desc: "한 회사가 아닌 시장 전체에서 최적 조합을 찾습니다.",
      },
      {
        icon: "headset",
        title: "평생 관리",
        desc: "청구 대행부터 갱신 관리까지 담당 설계사가 전담합니다.",
      },
    ],
    programs: [
      {
        name: "보장 분석",
        desc: "현재 증권 진단 리포트",
        price: "무료",
        highlight: true,
        note: "가입 의무 없음",
      },
      {
        name: "리모델링 설계",
        desc: "절감 + 보장 강화 재설계",
        price: "무료",
      },
      {
        name: "법인 컨설팅",
        desc: "CEO 플랜 · 단체보험 설계",
        price: "상담 후 안내",
      },
    ],
    reviews: [
      {
        text: "10년 묵힌 보험 정리하고 월 9만 원 아꼈습니다. 강요가 없어서 좋았어요.",
        by: "고객 강O태",
      },
      {
        text: "암 진단비 청구를 대신 처리해 주셔서 3일 만에 받았어요.",
        by: "고객 임O선",
      },
    ],
    form: { title: "무료 보장 분석 신청", submit: "분석 신청하기" },
  },
  {
    slug: "interior",
    domain: "moodhome.kr",
    brand: "무드홈 인테리어",
    category: "생활 서비스",
    heroStyle: "center",
    radius: "full",
    colors: {
      primary: "#8a6d4f",
      dark: "#5c4733",
      soft: "#f6f1ea",
      ink: "#2e2418",
      accent: "#3f6351",
    },
    nav: ["포트폴리오", "시공 과정", "비용 안내", "상담"],
    hero: {
      badge: "주거 · 상업 공간 토탈 인테리어",
      h1a: "공간이 바뀌면",
      h1b: "일상이 달라집니다",
      sub: "실측부터 3D 시안, 시공, A/S까지. 담당 디렉터 한 명이 끝까지 책임집니다.",
      cta: "무료 실측 신청",
      ghost: "포트폴리오 보기",
    },
    stats: [
      { value: "480+", label: "시공 완료" },
      { value: "3D", label: "시안 무료 제공" },
      { value: "2년", label: "하자 보증" },
    ],
    features: [
      {
        icon: "ruler",
        title: "무료 실측 · 3D 시안",
        desc: "계약 전 3D 시안으로 완성된 모습을 먼저 확인하세요.",
      },
      {
        icon: "wallet",
        title: "확정 견적제",
        desc: "자재 등급별 확정 견적, 시공 중 추가금이 없습니다.",
      },
      {
        icon: "wrench",
        title: "2년 무상 A/S",
        desc: "시공 후 2년간 하자 보수를 무상으로 지원합니다.",
      },
    ],
    programs: [
      {
        name: "부분 시공",
        desc: "주방 · 욕실 · 도배 단품",
        price: "180만원~",
      },
      {
        name: "전체 리모델링",
        desc: "철거부터 마감까지 올수리",
        price: "평당 120만원~",
        highlight: true,
        note: "3D 시안 포함",
      },
      {
        name: "상업 공간",
        desc: "카페 · 사무실 · 매장",
        price: "상담 후 안내",
      },
    ],
    reviews: [
      {
        text: "3D 시안과 완공이 거의 똑같아요. 추가금 없다는 약속도 지켜졌고요.",
        by: "고객 오O라",
      },
      {
        text: "30평 올수리 5주 약속을 정확히 지켰습니다. 먼지 관리도 깔끔했어요.",
        by: "고객 신O호",
      },
    ],
    form: { title: "무료 실측 상담 신청", submit: "실측 신청하기" },
  },
  {
    slug: "beauty",
    domain: "blanc-beauty.kr",
    brand: "블랑 네일&뷰티",
    category: "뷰티",
    heroStyle: "center",
    radius: "full",
    colors: {
      primary: "#d6608c",
      dark: "#4a2235",
      soft: "#fdf0f5",
      ink: "#3a222c",
      accent: "#8a5cf6",
    },
    nav: ["시술 메뉴", "디자인", "이벤트", "예약 안내"],
    hero: {
      badge: "네일 · 속눈썹 · 왁싱 원스톱",
      h1a: "손끝부터 달라지는",
      h1b: "나만의 분위기",
      sub: "이달의 아트부터 손상 케어까지, 1:1 맞춤 시술로 완성해 드립니다.",
      cta: "예약 문의",
      ghost: "이달의 디자인",
    },
    stats: [
      { value: "4.9", label: "예약 앱 평점" },
      { value: "70%", label: "단골 비율" },
      { value: "당일", label: "예약 가능" },
    ],
    features: [
      {
        icon: "palette",
        title: "이달의 아트 30종",
        desc: "매달 새 시즌 아트를 합리적인 이벤트가로 만나보세요.",
      },
      {
        icon: "crown",
        title: "프리미엄 제품만",
        desc: "정품 젤·글루만 사용해 손상과 알러지를 줄입니다.",
      },
      {
        icon: "clock",
        title: "예약제 1:1 시술",
        desc: "대기 없이 정시에 시작하는 100% 예약제로 운영합니다.",
      },
    ],
    programs: [
      {
        name: "이달의 아트",
        desc: "시즌 한정 디자인 젤네일",
        price: "55,000원",
        highlight: true,
        note: "첫 방문 20%",
      },
      {
        name: "케어 + 원컬러",
        desc: "큐티클 정리 포함 기본 젤",
        price: "38,000원",
      },
      {
        name: "속눈썹 연장",
        desc: "자연·볼륨 래쉬 선택",
        price: "60,000원~",
      },
    ],
    reviews: [
      {
        text: "디자인 상담을 꼼꼼하게 해주셔서 항상 만족스러워요. 한 달 넘게 안 깨져요.",
        by: "고객 윤O지",
      },
      {
        text: "예약제라 기다림이 없고 매장이 정말 깨끗해요.",
        by: "고객 김O아",
      },
    ],
    form: { title: "예약 문의", submit: "예약 문의하기" },
  },
  {
    slug: "academy",
    domain: "lead-english.kr",
    brand: "리드 영어학원",
    category: "교육",
    heroStyle: "split",
    radius: "lg",
    colors: {
      primary: "#4f46e5",
      dark: "#1e1b4b",
      soft: "#eef2ff",
      ink: "#171633",
      accent: "#f59e0b",
    },
    nav: ["학원 소개", "커리큘럼", "강사진", "성적 사례"],
    hero: {
      badge: "초·중등 내신 + 수능 대비 전문",
      h1a: "성적이 오르는 데는",
      h1b: "구조가 있습니다",
      sub: "레벨 테스트로 정확한 시작점을 찾고, 주간 리포트로 성장을 증명합니다.",
      cta: "무료 레벨 테스트",
      ghost: "커리큘럼 보기",
    },
    stats: [
      { value: "92%", label: "내신 1등급 상승" },
      { value: "12명", label: "반 정원 제한" },
      { value: "주 1회", label: "학부모 리포트" },
    ],
    features: [
      {
        icon: "search",
        title: "정밀 레벨 테스트",
        desc: "어휘·문법·독해 4영역을 진단해 정확한 반 배정을 합니다.",
      },
      {
        icon: "chart",
        title: "주간 성적 리포트",
        desc: "매주 시험 결과와 학습 태도를 학부모님께 보고합니다.",
      },
      {
        icon: "chat",
        title: "1:1 클리닉",
        desc: "수업 후 남아서 모르는 문제를 끝까지 해결합니다.",
      },
    ],
    programs: [
      {
        name: "초등 정규반",
        desc: "주 2회 · 파닉스~문법 기초",
        price: "월 280,000원",
      },
      {
        name: "중등 내신반",
        desc: "주 3회 · 학교별 내신 대비",
        price: "월 380,000원",
        highlight: true,
        note: "레벨테스트 무료",
      },
      {
        name: "고등 수능반",
        desc: "주 3회 · 모의고사 분석",
        price: "월 450,000원",
      },
    ],
    reviews: [
      {
        text: "두 학기 만에 영어 내신 4등급에서 1등급이 됐어요. 리포트가 큰 도움이 됩니다.",
        by: "학부모 박O미",
      },
      {
        text: "숙제 검사와 클리닉이 꼼꼼해서 아이가 스스로 공부하게 됐어요.",
        by: "학부모 정O호",
      },
    ],
    form: { title: "무료 레벨 테스트 신청", submit: "테스트 신청하기" },
  },
  {
    slug: "realty",
    domain: "hangyeol-realty.kr",
    brand: "한결 공인중개사",
    category: "부동산",
    heroStyle: "split",
    radius: "lg",
    colors: {
      primary: "#0f766e",
      dark: "#134e4a",
      soft: "#f0fdfa",
      ink: "#11302d",
      accent: "#d9a441",
    },
    nav: ["매물 보기", "단지 정보", "중개 서비스", "오시는 길"],
    hero: {
      badge: "아파트 · 상가 · 사무실 전문",
      h1a: "발품 대신 데이터로,",
      h1b: "정직한 중개",
      sub: "실거래가 분석과 단지별 리포트로 합리적인 거래를 도와드립니다.",
      cta: "매물 상담 신청",
      ghost: "이번 주 추천 매물",
    },
    stats: [
      { value: "1,700+", label: "누적 중개 거래" },
      { value: "0건", label: "중개 사고" },
      { value: "18년", label: "지역 경력" },
    ],
    features: [
      {
        icon: "search",
        title: "실거래가 리포트",
        desc: "최근 1년 거래 데이터를 분석해 적정가를 제시합니다.",
      },
      {
        icon: "pin",
        title: "단지 밀착 정보",
        desc: "학군·주차·관리비까지 거주자만 아는 정보를 드립니다.",
      },
      {
        icon: "layers",
        title: "계약 안전 검증",
        desc: "등기·권리관계를 이중 확인해 안전한 계약을 보장합니다.",
      },
    ],
    programs: [
      {
        name: "매매 중개",
        desc: "아파트·빌라·주택",
        price: "법정 수수료",
      },
      {
        name: "전월세 중개",
        desc: "보증보험 가입 지원 포함",
        price: "법정 수수료",
        highlight: true,
        note: "대출 상담 무료",
      },
      {
        name: "상가 · 사무실",
        desc: "권리금 협상 대행",
        price: "상담 후 안내",
      },
    ],
    reviews: [
      {
        text: "시세 자료를 정리해서 보여주시니 믿고 계약할 수 있었어요.",
        by: "고객 이O정",
      },
      {
        text: "집 보러 다닌 3일 동안 단지 장단점을 솔직하게 말씀해 주셨습니다.",
        by: "고객 조O근",
      },
    ],
    form: { title: "매물 상담 신청", submit: "상담 신청하기" },
  },
  {
    slug: "cafe",
    domain: "mori-coffee.kr",
    brand: "모리커피 로스터스",
    category: "외식",
    heroStyle: "center",
    radius: "full",
    colors: {
      primary: "#6b4f3a",
      dark: "#2d2016",
      soft: "#faf6f1",
      ink: "#2d2016",
      accent: "#c2410c",
    },
    nav: ["원두 소개", "메뉴", "베이커리", "단체 주문"],
    hero: {
      badge: "직접 로스팅하는 스페셜티 커피",
      h1a: "매일 아침 볶는 원두,",
      h1b: "숲처럼 깊은 한 잔",
      sub: "산지 직거래 생두를 매장에서 로스팅합니다. 원두 구독과 단체 주문도 받아요.",
      cta: "원두 구독 신청",
      ghost: "메뉴 보기",
    },
    stats: [
      { value: "매일", label: "당일 로스팅" },
      { value: "4.8", label: "방문자 평점" },
      { value: "300+", label: "원두 구독자" },
    ],
    features: [
      {
        icon: "zap",
        title: "당일 로스팅 원칙",
        desc: "로스팅 후 3일 이내 원두만 추출에 사용합니다.",
      },
      {
        icon: "globe",
        title: "산지 직거래",
        desc: "에티오피아·콜롬비아 농장과 직접 계약합니다.",
      },
      {
        icon: "pin",
        title: "단체 · 케이터링",
        desc: "사무실 정기 배송과 행사 케이터링을 운영합니다.",
      },
    ],
    programs: [
      {
        name: "원두 구독",
        desc: "2주마다 200g × 2종 배송",
        price: "월 32,000원",
        highlight: true,
        note: "첫 달 무료배송",
      },
      {
        name: "오피스 정기배송",
        desc: "사무실 맞춤 블렌드 1kg~",
        price: "월 58,000원~",
      },
      {
        name: "케이터링",
        desc: "행사장 커피 부스 운영",
        price: "상담 후 안내",
      },
    ],
    reviews: [
      {
        text: "구독 원두 향이 진짜 달라요. 회사 사람들이 다 어디 원두냐고 물어봐요.",
        by: "구독자 한O빈",
      },
      {
        text: "사무실 정기배송 6개월째인데 한 번도 늦은 적이 없습니다.",
        by: "고객 류O석",
      },
    ],
    form: { title: "구독 · 단체 주문 문의", submit: "문의하기" },
  },
  {
    slug: "petcare",
    domain: "popo-petsalon.kr",
    brand: "포포 애견미용",
    category: "반려동물",
    heroStyle: "center",
    radius: "full",
    colors: {
      primary: "#e09032",
      dark: "#54360f",
      soft: "#fdf6ec",
      ink: "#3d2c12",
      accent: "#0f766e",
    },
    nav: ["미용 메뉴", "스타일 갤러리", "호텔링", "예약"],
    hero: {
      badge: "1:1 예약제 · 무마취 위생미용",
      h1a: "우리 아이 첫 미용도",
      h1b: "겁먹지 않게, 천천히",
      sub: "분리 미용실에서 한 마리씩, 아이의 속도에 맞춰 진행합니다.",
      cta: "미용 예약하기",
      ghost: "스타일 갤러리",
    },
    stats: [
      { value: "1:1", label: "단독 미용" },
      { value: "3,800+", label: "누적 미용" },
      { value: "CCTV", label: "실시간 공유" },
    ],
    features: [
      {
        icon: "headset",
        title: "성향 상담 먼저",
        desc: "예민한 부위·싫어하는 것을 먼저 확인하고 시작합니다.",
      },
      {
        icon: "window",
        title: "전 과정 영상 공유",
        desc: "미용 중 모습을 실시간 영상으로 보내드립니다.",
      },
      {
        icon: "crown",
        title: "스타일 맞춤 제안",
        desc: "견종·모질에 맞는 스타일을 사진으로 제안해 드립니다.",
      },
    ],
    programs: [
      {
        name: "위생 미용",
        desc: "목욕 + 부분컷 + 발톱",
        price: "35,000원~",
      },
      {
        name: "전체 미용",
        desc: "스타일컷 + 스파 목욕",
        price: "55,000원~",
        highlight: true,
        note: "첫 방문 15%",
      },
      {
        name: "스파 & 호텔링",
        desc: "탄산 스파 · 1박 호텔",
        price: "40,000원~",
      },
    ],
    reviews: [
      {
        text: "미용 무서워하던 아이가 여기는 꼬리 흔들면서 들어가요.",
        by: "보호자 신O영",
      },
      {
        text: "영상으로 계속 보여주셔서 처음으로 안심하고 맡겼습니다.",
        by: "보호자 강O둘",
      },
    ],
    form: { title: "미용 예약 문의", submit: "예약 문의하기" },
  },
  {
    slug: "kids",
    domain: "nolja-kidscafe.kr",
    brand: "놀자 키즈카페",
    category: "키즈",
    heroStyle: "center",
    radius: "lg",
    colors: {
      primary: "#f97316",
      dark: "#7c2d12",
      soft: "#fff7ed",
      ink: "#431407",
      accent: "#2563eb",
    },
    nav: ["시설 안내", "이용 요금", "생일파티", "안전 수칙"],
    hero: {
      badge: "350평 실내 대형 키즈카페",
      h1a: "아이는 신나게,",
      h1b: "부모는 편안하게",
      sub: "월령별 분리 존과 보육교사 상주로, 마음 놓고 놀 수 있는 공간입니다.",
      cta: "생일파티 예약",
      ghost: "시설 둘러보기",
    },
    stats: [
      { value: "350평", label: "실내 플레이존" },
      { value: "상주", label: "안전 교사" },
      { value: "매일", label: "전체 소독" },
    ],
    features: [
      {
        icon: "target",
        title: "월령별 분리 존",
        desc: "0~3세 베이비존과 어린이존을 완전히 분리했습니다.",
      },
      {
        icon: "headset",
        title: "보육교사 상주",
        desc: "전담 교사가 플레이존을 상시 순회하며 돌봅니다.",
      },
      {
        icon: "crown",
        title: "프라이빗 파티룸",
        desc: "생일파티 전용룸과 데코·케이크 패키지를 운영합니다.",
      },
    ],
    programs: [
      {
        name: "평일 자유이용",
        desc: "아이 1인 종일권",
        price: "15,000원",
      },
      {
        name: "주말 자유이용",
        desc: "아이 1인 3시간",
        price: "18,000원",
      },
      {
        name: "생일파티 패키지",
        desc: "파티룸 2시간 + 데코 + 식사",
        price: "199,000원~",
        highlight: true,
        note: "주중 20%",
      },
    ],
    reviews: [
      {
        text: "베이비존이 분리돼 있어서 둘째 데리고도 안심돼요.",
        by: "보호자 임O나",
      },
      {
        text: "생일파티 준비를 다 해주셔서 사진만 찍었네요. 아이가 너무 좋아했어요.",
        by: "보호자 황O준",
      },
    ],
    form: { title: "생일파티 · 단체 예약 문의", submit: "예약 문의하기" },
  },
  {
    slug: "wedding",
    domain: "moment-snap.kr",
    brand: "모먼트 웨딩스냅",
    category: "웨딩",
    heroStyle: "center",
    radius: "full",
    colors: {
      primary: "#b76e79",
      dark: "#4c2b30",
      soft: "#faf2f3",
      ink: "#3b272a",
      accent: "#d9a441",
    },
    nav: ["포트폴리오", "상품 안내", "작가 소개", "예약 일정"],
    hero: {
      badge: "본식 스냅 · 야외 촬영 전문",
      h1a: "스쳐가는 순간을",
      h1b: "평생의 장면으로",
      sub: "두 명의 작가가 식 전 준비부터 행진까지, 놓치기 쉬운 순간을 담습니다.",
      cta: "촬영 예약 문의",
      ghost: "포트폴리오 보기",
    },
    stats: [
      { value: "900+", label: "촬영 커플" },
      { value: "2인", label: "작가 동시 촬영" },
      { value: "2주", label: "셀렉본 전달" },
    ],
    features: [
      {
        icon: "instagram",
        title: "자연스러운 무보정 톤",
        desc: "과한 보정 없이 그날의 빛과 분위기를 살립니다.",
      },
      {
        icon: "zap",
        title: "빠른 전달",
        desc: "전체 원본 3일, 셀렉 보정본 2주 내 전달합니다.",
      },
      {
        icon: "chat",
        title: "사전 동선 미팅",
        desc: "예식장 답사 후 동선과 컷 리스트를 함께 짭니다.",
      },
    ],
    programs: [
      {
        name: "본식 스냅",
        desc: "2인 작가 · 원본 전체 제공",
        price: "890,000원",
        highlight: true,
        note: "얼리버드 10%",
      },
      {
        name: "야외 스냅",
        desc: "2시간 · 의상 2벌",
        price: "590,000원",
      },
      {
        name: "데이트 스냅",
        desc: "1시간 · 일상 기록",
        price: "350,000원",
      },
    ],
    reviews: [
      {
        text: "식 끝나고 우느라 못 본 부모님 표정이 사진에 다 있었어요.",
        by: "신부 김O은",
      },
      {
        text: "동선 미팅 덕분에 당일 촬영이 하나도 어색하지 않았습니다.",
        by: "신랑 박O철",
      },
    ],
    form: { title: "촬영 예약 문의", submit: "예약 문의하기" },
  },
  {
    slug: "corp",
    domain: "hanju-tech.kr",
    brand: "한주테크",
    category: "기업",
    heroStyle: "split",
    radius: "lg",
    colors: {
      primary: "#0f4c81",
      dark: "#0b2942",
      soft: "#eef4f9",
      ink: "#102438",
      accent: "#10b981",
    },
    nav: ["회사 소개", "제품 · 기술", "인증 현황", "견적 문의"],
    hero: {
      badge: "정밀 부품 가공 전문 기업",
      h1a: "0.01mm의 차이가",
      h1b: "품질을 결정합니다",
      sub: "20년 가공 노하우와 전수 검사 시스템으로 납기와 품질을 함께 지킵니다.",
      cta: "견적 문의",
      ghost: "회사 소개서 받기",
    },
    stats: [
      { value: "20년", label: "업력" },
      { value: "ISO 9001", label: "품질 인증" },
      { value: "99.8%", label: "납기 준수율" },
    ],
    features: [
      {
        icon: "target",
        title: "정밀 가공 설비",
        desc: "5축 MCT 12대로 복합 형상도 일괄 가공합니다.",
      },
      {
        icon: "search",
        title: "전수 검사",
        desc: "3차원 측정기로 전 수량을 검사 후 출고합니다.",
      },
      {
        icon: "trending",
        title: "납기 관리 시스템",
        desc: "공정별 진행률을 고객사에 실시간 공유합니다.",
      },
    ],
    programs: [
      {
        name: "시제품 가공",
        desc: "도면 1장부터 소량 대응",
        price: "견적 문의",
      },
      {
        name: "양산 가공",
        desc: "월 10만 개 생산 능력",
        price: "견적 문의",
        highlight: true,
        note: "샘플 무료",
      },
      {
        name: "설계 자문",
        desc: "가공성 검토 · 원가 절감",
        price: "무료",
      },
    ],
    reviews: [
      {
        text: "납기가 급한 건이었는데 주말 가동까지 해주셔서 라인을 지켰습니다.",
        by: "OO전자 구매팀",
      },
      {
        text: "불량률이 타사 대비 확연히 낮아 3년째 거래 중입니다.",
        by: "OO모터스 품질팀",
      },
    ],
    form: { title: "견적 · 기술 문의", submit: "문의하기" },
  },
];

export const getDemo = (slug: string) => DEMOS.find((d) => d.slug === slug);

// 성공사례(DB) 카테고리 → 가장 가까운 데모 슬러그
const CATEGORY_TO_DEMO: Record<string, string> = {
  피트니스: "pt",
  전문직: "law",
  자동차: "car",
  금융: "insurance",
  생활서비스: "interior",
  뷰티: "beauty",
  교육: "academy",
  부동산: "realty",
  외식: "cafe",
  반려동물: "petcare",
  키즈: "kids",
  웨딩: "wedding",
  기업: "corp",
};

// 사례 썸네일용 데모 스크린샷 — 케이스 slug가 데모와 일치하면 그걸 우선 사용
export function demoImageFor(
  caseSlug: string,
  category: string
): string | null {
  if (DEMOS.some((d) => d.slug === caseSlug)) return `/demo/${caseSlug}.png`;
  const demo = CATEGORY_TO_DEMO[category];
  return demo ? `/demo/${demo}.png` : null;
}
