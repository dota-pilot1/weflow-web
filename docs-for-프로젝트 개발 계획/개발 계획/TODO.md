# WEFLOW 과제 — TODO

> 마감: **2026-06-13 (토)** · 시작: **2026-06-09 (화)** · 남은 일수: 4일

## 진행 상황

| # | 작업 | 상태 | 메모 |
|---|------|------|------|
| 1 | Next.js 프로젝트 부트스트랩 | ✅ 완료 | Next 16.2.7 + React 19 + Tailwind 4 |
| 2 | Supabase 연동 + 데이터 모델 | ⏸ 대기 | 키 받으면 즉시 진행 |
| 3 | 공통 레이아웃 (Header / Footer / FloatingBar) | ✅ 완료 | 데스크탑/모바일 확인 |
| 4 | 예약/문의/무료진단 폼 + API | ⏳ | 폼 컴포넌트 1개로 통합 |
| 5 | 관리자 대시보드 + 실시간 | ⏳ | Supabase Realtime 사용 |
| 6 | 메인 홈 + 서비스 + 가격 + 성공사례 | ⏳ | 정적 페이지 4개 |
| 7 | 랜딩 페이지 (우측 고정 폼) | ⏳ | 별도 페이지 |
| 8 | 반응형 + 외부 링크 + 배포 | ⏳ | Vercel 배포 |

## 완료한 것

- ✅ Next.js 16 + TypeScript + Tailwind 4 + App Router 세팅
- ✅ Pretendard 폰트 적용
- ✅ 디자인 토큰 시스템 (`globals.css`)
- ✅ Header / Footer / FloatingBar 공통 컴포넌트
- ✅ 회사정보/외부링크 상수화 (`lib/site.ts`)
- ✅ GitHub Public 레포 생성 + 푸시 (https://github.com/dota-pilot1/weflow-web)

## 다음에 할 일

**Supabase 키 없이 가능 (먼저 처리)**:
- 메인 홈 본문 (케어 6칸 + 성공사례 + 6단계 + 후기 슬라이더)
- 가격 페이지 (8개 카드 + 왕관 + 세일 강조)
- 성공사례 페이지
- 서비스 페이지
- 랜딩 페이지 UI
- 폼 UI (제출은 mock)

**Supabase 키 받으면**:
- 폼 → DB 저장
- 어드민 대시보드 + 실시간
- 엑셀 다운로드

## 결정 사항

| 항목 | 결정 |
|------|------|
| 디자인 톤 | 클린 화이트 + 파란 포인트 (A안) |
| 백엔드 | Next.js Route Handler + Supabase |
| DB | Supabase Postgres |
| 인증 | 관리자 하드코딩 (badeagle85 / 1111) |
| 배포 | Vercel |
| 레포 | Public, `dota-pilot1/weflow-web` |

## 시간 상한

**3일 룰** — 토요일 오전 마감 점검 시간 확보 위해 금요일 저녁까지 기능 완성.
