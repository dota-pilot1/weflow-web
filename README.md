# WEFLOW

마케팅 에이전시 WEFLOW 홈페이지 + 어드민 대시보드.
Next.js 16 + React 19 + Tailwind 4 + Supabase 기반.

**🌐 배포:** https://weflow-web-phi.vercel.app

---

## 평가관 진입 안내

### 1) 사용자 사이트
https://weflow-web-phi.vercel.app

### 2) 관리자 대시보드
- URL: https://weflow-web-phi.vercel.app/admin/login
- 이메일: `badeagle85@gmail.com`
- 비밀번호: `1111`

> 로그인 페이지에 **"관리자 계정 채우기"** 버튼이 있어 한 번 클릭으로 자동 입력됩니다.

### 3) 동작 확인 흐름
1. `/reservation` 또는 `/diagnosis`에서 폼 제출
2. `/admin` 진입 → 새 행이 **새로고침 없이** 자동 반영 (Supabase Realtime)
3. 진행중/완료/삭제 버튼으로 상태 즉시 변경
4. 우측 상단 "예약 엑셀 다운" / "문의 엑셀 다운"으로 CSV 내보내기

---

## 주요 페이지 라우트

| URL | 페이지 |
|-----|------|
| `/` | 메인 홈 |
| `/reservation` | 예약 (캘린더 + 시간슬롯 20개) |
| `/diagnosis` | 무료진단 |
| `/pricing` | 제작플랜 & 가격안내 (8개 카드) |
| `/cases` | 성공사례 28개 업종 + 카테고리 필터 |
| `/service` | 서비스 (6단계 + 광고 운영) |
| `/landing` | 광고 트래픽용 랜딩 (우측 sticky 폼) |
| `/admin` | 관리자 대시보드 (로그인 필요) |
| `/admin/login` | 관리자 로그인 |

---

## Stack

- **Frontend** Next.js 16.2.7 (App Router, Turbopack) / React 19.2 / TypeScript / Tailwind 4
- **Backend** Supabase (Postgres + Realtime + Auth-free session)
- **Deploy** Vercel
- **Validation** Zod (form schemas)

---

## PDF 명세 ↔ 코드 매핑

| 요구 | 위치 |
|------|------|
| 메인 홈 본문 | [app/page.tsx](app/page.tsx) |
| 케어 플랜 6칸 / 4·6단계 박스 | [app/page.tsx](app/page.tsx) BENEFITS / PROCESS 섹션 |
| 후기 25개 마퀴(좌우 흐름) | [lib/content/home.ts](lib/content/home.ts) `REVIEWS` |
| 8개 가격 카드 | [lib/content/pricing.ts](lib/content/pricing.ts) |
| 28개 성공사례 업종 | [lib/content/cases.ts](lib/content/cases.ts) |
| 예약 폼 (캘린더 + 시간슬롯 + 과거 시간 비활성) | [components/forms/ReservationForm.tsx](components/forms/ReservationForm.tsx) |
| 문의 폼 + 우측 sticky | [components/forms/ContactForm.tsx](components/forms/ContactForm.tsx) |
| 어드민 대시보드 (대기/진행중/완료/전체 필터) | [components/admin/AdminDashboard.tsx](components/admin/AdminDashboard.tsx) |
| 실시간 반영 | AdminDashboard의 `supabase.channel("admin-changes")` 구독 |
| 엑셀 다운로드 (UTF-8 BOM CSV) | [app/api/admin/export/route.ts](app/api/admin/export/route.ts) |
| 어드민 라우트 보호 | [proxy.ts](proxy.ts) + 세션 쿠키 (Next.js 16의 미들웨어 대체 API) |
| 하단 고정 4버튼 (24시간 상담/카카오/블로그/무료진단) | [components/FloatingBar.tsx](components/FloatingBar.tsx) |

---

## Run Locally

```bash
npm install
cp .env.example .env       # 그리고 실제 값 채워넣기
npm run dev                # http://localhost:3000
```

`.env` 값은 Supabase 대시보드 → Settings → API에서 발급.

---

## 환경변수

[.env.example](.env.example) 참고. 운영 배포(Vercel)는 동일한 변수가 Production 환경에 등록되어 있어야 합니다.
