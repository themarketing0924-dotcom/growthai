# GrowthAI

> 마케팅 × AI 실전 클래스 — 구매 전환형 AI 마케팅 사이트
> https://www.growthai.kr

랜딩페이지 · 상세페이지 · 프롬프트 · 자동화 · 강의 판매까지 연결되는 GrowthAI 공식 웹사이트입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React 18 + TypeScript + Vite 5 |
| 스타일 | Tailwind CSS 3, Pretendard / Playfair Display 폰트 |
| 애니메이션 | Framer Motion (텍스트 스크램블, 스크롤 리빌, 페이지 트랜지션) |
| 라우팅 | React Router 7 (라우트별 lazy 코드 스플리팅) |
| 인증 | Firebase Auth (Google / Apple / 이메일) |
| 데이터베이스 | Cloud Firestore |
| 결제 | PayPal (해외) + 토스페이먼츠 (국내) |
| 호스팅 | Firebase Hosting (`growthai-d887a`) |

## 시작하기

```bash
npm install
npm run dev            # http://localhost:5173
```

### 환경 변수 (.env)

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 입력합니다.

| 변수 | 설명 |
|------|------|
| `VITE_FIREBASE_API_KEY` | Firebase 웹 API 키 |
| `VITE_FIREBASE_AUTH_DOMAIN` | `프로젝트ID.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `프로젝트ID.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase 발신자 ID |
| `VITE_FIREBASE_APP_ID` | Firebase 앱 ID |
| `VITE_PAYPAL_CLIENT_ID` | PayPal 클라이언트 ID |
| `VITE_TOSS_CLIENT_KEY` | 토스페이먼츠 클라이언트 키 |

## 빌드 & 배포

```bash
npm run build        # tsc 타입체크 + vite build → dist/
firebase deploy      # Firebase Hosting 배포
```

`dist/`는 빌드 산출물이므로 git에 커밋하지 않습니다 (`.gitignore` 처리됨).

## 프로젝트 구조

```
src/
├── App.tsx              # 홈 랜딩 + 라우트 정의 (페이지는 lazy 로드)
├── components/          # Navbar, Footer, Seo, AuthModal, 결제 버튼 등
├── config/
│   ├── content.ts       # 사이트 문구 (한/영)
│   ├── navGroups.ts     # 내비게이션 구성
│   └── videos.ts        # 히어로/섹션 영상 URL
├── contexts/            # AuthContext, ThemeContext
├── data/tools.ts        # AI 툴 데이터
├── lib/                 # firebase, firestore, paypal, toss, referral
└── pages/               # 강의·블로그·프롬프트·대시보드 등 20+ 페이지
public/                  # 정적 에셋, robots.txt, sitemap.xml, favicon
```

## 콘텐츠 수정 위치

- **사이트 문구/FAQ/메트릭**: `src/config/content.ts`
- **내비게이션 메뉴**: `src/config/navGroups.ts`
- **영상 교체**: `src/config/videos.ts`
- **SEO 기본값 (제목/OG 이미지)**: `src/components/Seo.tsx`, `index.html`
- **사이트맵**: `public/sitemap.xml` — 페이지 추가/삭제 시 함께 갱신
