import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Search, SlidersHorizontal, X, Link as LinkIcon } from 'lucide-react';

const SITE_URL = 'https://www.growthai.kr';
const SITE_NAME = 'GrowthAI — 마케팅 × AI 강의';
const BLOG_DESCRIPTION = 'AI와 디지털 마케팅 실전 인사이트. 소상공인, 1인 크리에이터를 위한 자동화 수익화 전략을 배워보세요.';

/* ─────────────────────────────────────────
   타입
───────────────────────────────────────── */
interface Post {
  id: number;
  category: string;
  level: '입문' | '초급' | '중급' | '고급';
  title: string;
  excerpt: string;
  date: string;
  readMin: number;
  image: string;         // Unsplash URL
  tags: string[];
  featured?: boolean;
  body: string;
}

/* ─────────────────────────────────────────
   카테고리 색상
───────────────────────────────────────── */
const catColor: Record<string, string> = {
  '마케팅 전략':  'bg-blue-500/20   text-blue-300   border-blue-500/30',
  'AI 도구':     'bg-purple-500/20  text-purple-300 border-purple-500/30',
  '유튜브':      'bg-red-500/20     text-red-300    border-red-500/30',
  '자동화':      'bg-green-500/20   text-green-300  border-green-500/30',
  '콘텐츠 제작': 'bg-yellow-500/20  text-yellow-300 border-yellow-500/30',
  '비즈니스':    'bg-orange-500/20  text-orange-300 border-orange-500/30',
  'SNS 마케팅':  'bg-pink-500/20    text-pink-300   border-pink-500/30',
  '이메일 마케팅':'bg-cyan-500/20   text-cyan-300   border-cyan-500/30',
};

const levelColor: Record<string, string> = {
  '입문': 'text-emerald-400 bg-emerald-400/10',
  '초급': 'text-blue-400    bg-blue-400/10',
  '중급': 'text-yellow-400  bg-yellow-400/10',
  '고급': 'text-red-400     bg-red-400/10',
};

/* ─────────────────────────────────────────
   Unsplash 이미지 URL 헬퍼
   (모두 마케팅/AI/비즈니스 관련 퍼블릭 이미지)
───────────────────────────────────────── */
const IMG = {
  marketing:   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format',
  ai_tool:     'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&auto=format',
  youtube:     'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&auto=format',
  automation:  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=450&fit=crop&auto=format',
  content:     'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=450&fit=crop&auto=format',
  business:    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop&auto=format',
  sns:         'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=450&fit=crop&auto=format',
  email:       'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=450&fit=crop&auto=format',
  analytics:   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format',
  copywriting: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop&auto=format',
  video:       'https://images.unsplash.com/photo-1574717024453-354056adf689?w=800&h=450&fit=crop&auto=format',
  global:      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=450&fit=crop&auto=format',
};

/* ─────────────────────────────────────────
   블로그 포스트 데이터 (마케팅 전문)
───────────────────────────────────────── */
const POSTS: Post[] = [
  {
    id: 1,
    category: '마케팅 전략',
    level: '입문',
    featured: true,
    image: IMG.marketing,
    title: '마케팅 거장 5인의 불변 법칙 — AI 시대에도 통하는 이유',
    excerpt: '세스 고딘, 필립 코틀러, 데이비드 오길비, 조셉 슈가맨, 로버트 치알디니. 이 다섯 거장의 마케팅 공식이 왜 AI 시대에 더욱 강력해지는지, 그리고 각 공식을 ChatGPT 프롬프트로 구현하는 법을 공개합니다.',
    date: '2026.06.28',
    readMin: 12,
    tags: ['마케팅이론', 'ChatGPT', '프롬프트', '전략'],
    body: `## 왜 고전 마케팅 이론이 AI 시대에 더 강력한가

AI는 실행 속도를 높여줄 뿐, 무엇을 어떻게 할지는 여전히 사람의 전략에서 나옵니다. 거장들의 법칙을 알면 AI에게 정확한 지시를 내릴 수 있습니다.

### 1. 오길비의 헤드라인 법칙 → AI 적용

"헤드라인이 광고의 80%다." — 데이비드 오길비

\`\`\`
[프롬프트 템플릿]
오길비의 헤드라인 원칙을 적용해서
아래 제품의 SNS 광고 카피 10개를 작성해주세요.
원칙: 호기심 유발, 구체적 혜택 명시, 타겟 특정, 숫자 포함
제품: [제품/서비스 설명]
\`\`\`

### 2. 치알디니의 설득 6원칙 → AI 적용

상호성, 희소성, 권위, 일관성, 호감, 사회적 증거.

각 원칙별 마케팅 카피를 AI로 즉시 생성할 수 있습니다.

\`\`\`
치알디니의 '희소성 원칙'을 활용해서
[제품]의 한정 판매 홍보 문구를 작성해주세요.
톤: 긴박감 있되 과장 없이
\`\`\`

### 3. 세스 고딘의 퍼플카우 전략

"놀랍지 않으면 보이지 않는다."

AI로 차별화 포인트를 찾는 법:
\`\`\`
경쟁사 [A, B, C]와 비교해서
우리 브랜드만 할 수 있는 완전히 다른 접근 10가지를 제안해주세요.
기준: 아무도 하지 않는 것, 타겟이 열광할 것
\`\`\``,
  },
  {
    id: 2,
    category: 'AI 도구',
    level: '초급',
    image: IMG.ai_tool,
    title: 'ChatGPT 마케팅 카피 10배 빠르게 — 실전 프롬프트 공식',
    excerpt: 'AIDA, PAS, BAB 공식을 ChatGPT 프롬프트에 이식하면 30초 만에 전문 카피가 완성됩니다. 바로 복사해서 쓸 수 있는 10가지 템플릿을 공개합니다.',
    date: '2026.06.25',
    readMin: 8,
    tags: ['ChatGPT', '카피라이팅', 'AIDA', 'PAS'],
    body: `## 3대 카피라이팅 공식 × ChatGPT

### AIDA 공식 (Attention → Interest → Desire → Action)

\`\`\`
당신은 15년 경력의 마케팅 카피라이터입니다.
AIDA 공식을 적용해서 아래 제품의 광고 카피를 작성해주세요.

제품: [제품명]
타겟: [타겟 고객]
핵심 혜택: [주요 혜택]
채널: [인스타그램/유튜브/블로그]
\`\`\`

### PAS 공식 (Problem → Agitate → Solution)

\`\`\`
PAS 공식으로 아래 조건의 카피를 작성해주세요.
- 문제: [고객이 겪는 문제]
- 공감: 그 고통으로 인한 감정 3가지
- 해결: [우리 제품/서비스]
톤: 공감적, 친근하게 / 길이: 150자 이내
\`\`\`

### BAB 공식 (Before → After → Bridge)

\`\`\`
BAB 공식으로 변화 스토리 카피를 작성해주세요.
Before: [고객의 현재 상황]
After: [제품 사용 후 모습]
Bridge: [어떻게 변화시키는지]
\`\`\``,
  },
  {
    id: 3,
    category: '유튜브',
    level: '초급',
    image: IMG.youtube,
    title: '2026 유튜브 쇼츠 알고리즘 완전 분석 — 조회수 폭발의 공식',
    excerpt: '반복 시청률, 초반 3초 후킹, 댓글 유도 타이밍. 2026년 대규모 업데이트된 유튜브 알고리즘을 실전 데이터로 분석합니다.',
    date: '2026.06.22',
    readMin: 10,
    tags: ['유튜브', '쇼츠', '알고리즘', '조회수'],
    body: `## 2026 쇼츠 알고리즘 3대 핵심 변화

### 1. 반복 시청률(Rewatch Rate) 최우선

기존 완료율 → 반복 시청률로 가중치 이동.

**높이는 법:**
- 영상 중간에 "다시 보고 싶은" 정보 배치
- 빠른 편집으로 놓친 것 있다는 느낌
- 자막을 빠르게 지나가게 설정

### 2. 초반 3초 후킹 공식

[충격적 사실] + [궁금증] + [가치 약속]

예: "구독자 0명이 28일 만에 1,000명 달성한 방법 (얼굴 공개 X)"

### 3. 댓글 유도 타이밍

마지막 2초에 댓글 유도 자막 삽입이 가장 효과적.`,
  },
  {
    id: 4,
    category: '자동화',
    level: '중급',
    image: IMG.automation,
    title: 'N8N × 카카오 자동답장 30분 완성 가이드 (코딩 없음)',
    excerpt: '소상공인을 위한 N8N 카카오톡 자동답장 세팅. 설치부터 ChatGPT 연동까지 단계별로 설명합니다.',
    date: '2026.06.20',
    readMin: 15,
    tags: ['N8N', '카카오', '자동화', '소상공인'],
    body: `## N8N 카카오 자동답장 구축

### 전체 흐름

카카오 메시지 수신 → N8N Webhook → ChatGPT 답변 생성 → 카카오 자동 발송

### Step 1: N8N 무료 계정 생성

n8n.io에서 클라우드 무료 버전 시작. 별도 서버 불필요.

### Step 2: Webhook URL 설정

카카오 비즈니스 채널 → 챗봇 설정 → Webhook URL 입력.

### Step 3: ChatGPT 시스템 프롬프트

\`\`\`json
{
  "system": "당신은 [업체명]의 상담 직원입니다. 영업시간은 평일 10-18시, 배송 2-3일.",
  "user": "{{$json.content}}"
}
\`\`\`

### 결과

하루 50건 문의 중 자동 처리 87%, 고객 응대 시간 90% 절감.`,
  },
  {
    id: 5,
    category: '콘텐츠 제작',
    level: '입문',
    image: IMG.content,
    title: '블로그 글 하나로 유튜브·인스타·카카오 콘텐츠 동시에 만드는 법',
    excerpt: 'AI로 원소스 멀티유즈(OSMU) 콘텐츠 전략을 구현하면 1시간 작업으로 5개 채널을 동시에 채울 수 있습니다.',
    date: '2026.06.18',
    readMin: 7,
    tags: ['OSMU', '콘텐츠', 'AI', '자동화'],
    body: `## 원소스 멀티유즈(OSMU) 전략

하나의 핵심 콘텐츠를 여러 채널에 맞게 변형하는 전략입니다.

### AI 변환 워크플로우

원본 블로그 글 (2,000자)
↓ ChatGPT로 변환
- 유튜브 스크립트 (10분 분량)
- 쇼츠 대본 3개 (각 60초)
- 인스타 카드뉴스 5장 문구
- 카카오 소식 (200자)
- 트위터/X 스레드 (5개)

### 핵심 프롬프트

\`\`\`
아래 블로그 글을 유튜브 쇼츠 대본으로 변환해주세요.
- 길이: 45~55초 분량
- 시작: 충격적 사실이나 질문으로
- 끝: 구독 유도 CTA
- 자막용 짧은 문장 사용
\`\`\``,
  },
  {
    id: 6,
    category: 'SNS 마케팅',
    level: '입문',
    image: IMG.sns,
    title: '인스타그램 팔로워 0명에서 1만명까지 — AI 성장 전략',
    excerpt: '인스타그램 알고리즘이 좋아하는 콘텐츠 형식, 최적 업로드 시간, AI로 릴스 대본 쓰는 법까지. 90일 성장 플랜을 공개합니다.',
    date: '2026.06.15',
    readMin: 11,
    tags: ['인스타그램', '릴스', '팔로워', 'AI'],
    body: `## 인스타그램 AI 성장 전략

### 알고리즘이 좋아하는 3가지

1. **저장율** — 저장하고 싶은 정보형 콘텐츠
2. **공유율** — "이거 꼭 공유해야 해" 공감 콘텐츠
3. **댓글 참여** — 질문으로 끝나는 캡션

### AI 캡션 생성 프롬프트

\`\`\`
인스타그램 마케팅 캡션을 작성해주세요.
타겟: [타겟 고객]
콘텐츠: [오늘 올릴 내용]
톤: 친근하고 전문적
포함: 질문 1개, 해시태그 15개, CTA
\`\`\`

### 최적 업로드 시간 (한국 기준)

- 오전 7-8시 (출근 전)
- 점심 12-1시
- 저녁 6-8시 (퇴근 후)`,
  },
  {
    id: 7,
    category: '비즈니스',
    level: '중급',
    image: IMG.business,
    title: 'AI 1인 기업 월 수익 500만원 파이프라인 설계법',
    excerpt: '강의 판매, 마케팅 대행, 유튜브 수익화. AI로 세 가지 수익원을 동시에 운영하는 1인 기업 시스템을 실제 사례와 함께 공개합니다.',
    date: '2026.06.12',
    readMin: 10,
    tags: ['1인기업', '수익화', '자동화', '파이프라인'],
    body: `## 1인 기업 AI 수익 파이프라인

### 3개 수익원 동시 운영

**파이프라인 1: 유튜브 수익**
쇼츠 + 롱폼으로 애드센스 + 협찬

**파이프라인 2: 강의/디지털 상품**
노하우 → Gumroad, 클래스101 판매

**파이프라인 3: 마케팅 대행**
AI로 빠르게 → 클라이언트 3-5개 운영

### 실제 수강생 사례

수강 전: 월 150만원 프리랜서
수강 6개월 후:
- 유튜브 구독자 3,200명
- 대행 클라이언트 4개
- 월 순수익 480만원`,
  },
  {
    id: 8,
    category: '이메일 마케팅',
    level: '초급',
    image: IMG.email,
    title: '이메일 마케팅 오픈율 40% 달성하는 제목 작성법',
    excerpt: '평균 이메일 오픈율은 21%. AI와 A/B 테스트를 결합하면 40% 이상도 가능합니다. 클릭을 유도하는 제목 공식을 공개합니다.',
    date: '2026.06.10',
    readMin: 6,
    tags: ['이메일마케팅', '오픈율', 'A/B테스트', 'CTR'],
    body: `## 이메일 오픈율을 높이는 제목 공식

### 호기심 갭(Curiosity Gap) 기법

사람들은 "알고 싶은데 모른다"는 상태를 참지 못합니다.

**예시:**
- ❌ "이번 달 프로모션 안내"
- ✅ "대부분의 마케터가 모르는 이메일 실수 1가지"

### AI 제목 생성 프롬프트

\`\`\`
다음 이메일 내용에 맞는 제목을 10개 작성해주세요.
내용: [이메일 본문 요약]
조건: 오픈율 극대화, 30자 이내, 스팸 단어 제외
스타일: 호기심형, 혜택형, 긴박감형 각 3개씩
\`\`\`

### 오픈율 높은 제목 패턴

1. 숫자 포함: "3가지", "7분 만에"
2. 개인화: "[이름]님만을 위한"
3. 긴박감: "오늘 자정 마감"`,
  },
  {
    id: 9,
    category: '마케팅 전략',
    level: '중급',
    image: IMG.analytics,
    title: '데이터 기반 마케팅 — GA4와 AI로 고객 행동 읽는 법',
    excerpt: 'Google Analytics 4 데이터를 AI에 넣으면 인간이 못 보는 패턴이 보입니다. 실전에서 바로 쓰는 GA4 × ChatGPT 분석 워크플로우.',
    date: '2026.06.08',
    readMin: 13,
    tags: ['GA4', '데이터분석', 'ChatGPT', '마케팅'],
    body: `## GA4 데이터 + AI 분석

### GA4에서 뽑아야 할 핵심 데이터

1. **이탈률 높은 페이지** → 콘텐츠 개선 우선순위
2. **전환 경로** → 어떤 채널에서 구매 전환이 일어나는가
3. **이용자 흐름** → 구매 전 어떤 페이지를 거치는가

### AI 분석 프롬프트

\`\`\`
아래 GA4 데이터를 분석해주세요.
[GA4 데이터 붙여넣기]

분석 요청:
1. 전환율이 낮은 페이지와 원인 추정
2. 상위 전환 채널의 공통점
3. 즉시 개선 가능한 3가지 액션 플랜
\`\`\`

### 실전 인사이트 예시

랜딩 페이지 이탈률 78% → AI 분석 결과: "CTA 버튼이 스크롤 없이 보이지 않음" → 버튼 위치 변경 후 전환율 2.3배 상승`,
  },
  {
    id: 10,
    category: '콘텐츠 제작',
    level: '입문',
    image: IMG.copywriting,
    title: '소상공인을 위한 AI 카피라이팅 — 광고비 없이 매출 올리는 법',
    excerpt: '광고비를 쓰지 않아도 됩니다. 좋은 카피 하나가 무료 SNS에서 바이럴을 만들어냅니다. 소상공인을 위한 AI 카피 작성 가이드.',
    date: '2026.06.05',
    readMin: 8,
    tags: ['소상공인', '카피라이팅', 'SNS', '무료마케팅'],
    body: `## 소상공인 AI 카피라이팅 가이드

### 광고비 없이 매출 올리는 원리

돈이 없으면 시간과 창의성으로 승부해야 합니다. AI가 창의성을 보조합니다.

### 업종별 카피 프롬프트

**카페/음식점:**
\`\`\`
오늘 메뉴 [메뉴명]의 인스타 캡션을 써주세요.
타겟: 20-40대 직장인
분위기: 따뜻하고 친근하게
포함: 오늘만의 특별함, 해시태그 10개
\`\`\`

**온라인 쇼핑몰:**
\`\`\`
[상품명] 상품 설명을 네이버 스마트스토어용으로 작성해주세요.
포함: 핵심 혜택 3가지, 사용 후기 인용, FAQ 3개
SEO 키워드: [주요 키워드]
\`\`\`

### 바이럴 공식

공감 + 정보 + 감동 = 공유하고 싶은 콘텐츠`,
  },
  {
    id: 11,
    category: 'AI 도구',
    level: '중급',
    image: IMG.video,
    title: 'HeyGen으로 AI 아바타 마케팅 영상 만드는 완전 가이드',
    excerpt: '얼굴 없이도 전문적인 마케팅 영상을 만들 수 있습니다. HeyGen AI 아바타 + ElevenLabs 음성 + CapCut 편집으로 완성하는 영상 파이프라인.',
    date: '2026.06.02',
    readMin: 9,
    tags: ['HeyGen', 'AI아바타', '영상제작', 'ElevenLabs'],
    body: `## HeyGen AI 아바타 영상 제작 파이프라인

### 필요한 도구 (모두 무료 플랜 있음)

1. **HeyGen** - AI 아바타 영상 생성
2. **ElevenLabs** - 자연스러운 AI 나레이션
3. **CapCut** - 편집 + 자막

### Step 1: HeyGen 아바타 선택

120+ 아바타 중 브랜드 톤에 맞는 것 선택.
Pro 버전에서는 내 얼굴로 커스텀 아바타 생성 가능.

### Step 2: 대본 작성 (ChatGPT)

\`\`\`
[마케팅 목적]에 맞는 60초 영상 대본을 써주세요.
시작: 문제 제기 / 중간: 해결책 / 끝: CTA
톤: 전문적이면서 친근하게
\`\`\`

### Step 3: ElevenLabs 음성 합성

HeyGen 내장 음성보다 ElevenLabs 음성이 더 자연스러움.
MP3 파일로 내보낸 뒤 HeyGen에 직접 업로드.

### 제작 시간

기존 방식: 1편 제작 4-6시간
AI 파이프라인: 1편 제작 30-45분`,
  },
  {
    id: 12,
    category: 'SNS 마케팅',
    level: '고급',
    image: IMG.global,
    title: '글로벌 SNS 마케팅 — 한국 콘텐츠로 해외 팔로워 10만 달성법',
    excerpt: 'AI 번역과 문화 현지화를 결합하면 한국어 콘텐츠가 영어·스페인어 시장에서도 통합니다. 실제 성공 사례와 함께하는 글로벌 SNS 전략.',
    date: '2026.05.30',
    readMin: 11,
    tags: ['글로벌마케팅', 'SNS', 'AI번역', '해외시장'],
    body: `## 한국 콘텐츠 글로벌화 전략

### AI 현지화 파이프라인

한국어 원본 → ChatGPT 번역 → 문화 현지화 → 현지 해시태그 → 최적 시간 발행

### 영어 시장 진입 순서

1. 기존 한국어 콘텐츠 Top 5 선별
2. 영어 번역 + 현지화 (단순 번역 X)
3. 영미권 해시태그 리서치 (#contentcreator #aimarketing)
4. 미국 시간대에 맞춰 예약 발행 (EST 기준 오전 9시)

### 현지화 프롬프트

\`\`\`
아래 한국어 인스타 캡션을 영어로 현지화해주세요.
단순 번역이 아닌, 미국 20-35세 타겟의 언어와 문화에 맞게 재작성.
포함: 미국에서 인기 있는 해시태그 15개
원문: [한국어 캡션]
\`\`\`

### 수익 비교

한국 인스타 팔로워 1만명 협찬 단가: 50-100만원
미국 영어 팔로워 1만명 협찬 단가: $500-1,500 (약 65-200만원)`,
  },
  {
    id: 13,
    category: '마케팅 전략',
    level: '초급',
    image: IMG.marketing,
    title: '고객 페르소나 만들기 — AI로 30분 안에 완성하는 법',
    excerpt: '막연한 "20대 여성" 대신 구체적인 페르소나가 있어야 광고가 팔립니다. ChatGPT로 고객 페르소나를 정밀하게 구성하는 실전 프롬프트 공개.',
    date: '2026.05.28',
    readMin: 7,
    tags: ['페르소나', '타겟팅', 'ChatGPT', '마케팅'],
    body: `## AI 고객 페르소나 구성법\n\n구체적인 페르소나가 있어야 광고 문구, 채널, 예산 배분이 결정됩니다.\n\n### 페르소나 생성 프롬프트\n\n\`\`\`\n[업종]의 핵심 고객 페르소나를 만들어주세요.\n포함: 나이/성별/직업/소득, 하루 루틴, 가장 큰 고민 3가지, SNS 사용 패턴, 구매 결정 요인\n\`\`\`\n\n### 활용법\n\n페르소나 → 광고 카피 → 채널 선택 → 예산 배분 순으로 적용합니다.`,
  },
  {
    id: 14,
    category: 'AI 도구',
    level: '입문',
    image: IMG.ai_tool,
    title: 'Claude AI vs ChatGPT — 마케터가 알아야 할 실전 차이점',
    excerpt: '두 AI를 언제 어떻게 써야 할까요? 카피라이팅, 전략 기획, 데이터 분석, 코드 작성별로 어떤 AI가 더 나은지 실전 비교합니다.',
    date: '2026.05.25',
    readMin: 9,
    tags: ['Claude', 'ChatGPT', 'AI비교', '마케팅도구'],
    body: `## Claude vs ChatGPT 마케팅 실전 비교\n\n### 카피라이팅\n\nChatGPT: 빠른 초안 다수 생성에 강점\nClaude: 긴 문서 맥락 유지, 논리적 구성에 강점\n\n### 전략 기획\n\nClaude가 긴 컨텍스트(200K 토큰)를 지원해 전체 사업계획서 분석에 유리.\n\n### 선택 기준\n\n- 빠른 아이디어 브레인스토밍 → ChatGPT\n- 긴 문서 분석·전략 수립 → Claude\n- 이미지 생성 → ChatGPT(DALL·E 연동)`,
  },
  {
    id: 15,
    category: '자동화',
    level: '입문',
    image: IMG.automation,
    title: 'Zapier 입문 — 코딩 없이 업무 자동화 시작하는 법',
    excerpt: '구글 시트 → 이메일 자동 발송, 인스타 게시물 → 노션 자동 저장. 소상공인도 30분이면 Zapier로 반복 업무를 자동화할 수 있습니다.',
    date: '2026.05.22',
    readMin: 8,
    tags: ['Zapier', '자동화', '노코드', '소상공인'],
    body: `## Zapier 기초 자동화 가이드\n\n### Zap이란?\n\n트리거(원인) → 액션(결과) 구조로 자동화를 설정하는 플로우입니다.\n\n### 소상공인 추천 Zap 3가지\n\n1. 구글폼 주문 접수 → 카카오톡 알림\n2. 인스타 신규 팔로워 → CRM 자동 등록\n3. 네이버 블로그 발행 → SNS 동시 공유\n\n### 무료 플랜으로 할 수 있는 것\n\n월 100개 Zap 실행, 2단계 자동화까지 무료.`,
  },
  {
    id: 16,
    category: '유튜브',
    level: '중급',
    image: IMG.youtube,
    title: '유튜브 채널 수익화 조건 달성 — AI로 90일 전략',
    excerpt: '구독자 1,000명 + 시청 4,000시간. AI 콘텐츠 전략으로 가장 빠르게 수익화 조건을 달성하는 로드맵을 공개합니다.',
    date: '2026.05.20',
    readMin: 10,
    tags: ['유튜브수익화', '구독자', '시청시간', 'AI전략'],
    body: `## 유튜브 수익화 90일 로드맵\n\n### 1-30일: 니치 확정 + 채널 세팅\n\n경쟁이 적고 검색량이 있는 틈새 주제 선정.\nAI로 100개 영상 아이디어 생성 → 상위 20개 선별.\n\n### 31-60일: 콘텐츠 가속\n\n주 3회 업로드. 쇼츠로 채널 노출 확대.\n\n### 61-90일: 최적화\n\nCTR 낮은 영상 썸네일 교체, 시청 유지율 분석 → 편집 스타일 조정.\n\n### 현실적 수치\n\n꾸준히 실행하면 90일 내 구독자 500-1,500명 달성 가능.`,
  },
  {
    id: 17,
    category: '비즈니스',
    level: '중급',
    image: IMG.business,
    title: '디지털 상품으로 잠자는 수익 만들기 — E-Book, 템플릿, 강의',
    excerpt: '한번 만들면 계속 팔리는 디지털 상품. ChatGPT로 E-Book 초안 작성부터 Gumroad 판매 페이지 세팅까지 완전 가이드.',
    date: '2026.05.18',
    readMin: 11,
    tags: ['디지털상품', 'E-Book', 'Gumroad', '수동수익'],
    body: `## 디지털 상품 제작 & 판매 가이드\n\n### 수익성 높은 디지털 상품 유형\n\n1. PDF 가이드/E-Book (제작 난이도 낮음)\n2. 노션/구글 시트 템플릿\n3. 영상 강의\n4. AI 프롬프트 팩\n\n### ChatGPT E-Book 제작 프롬프트\n\n\`\`\`\n[주제]에 관한 소상공인 대상 실전 가이드 목차를 작성해주세요.\n챕터 수: 7개, 각 챕터 핵심 내용 3줄 요약 포함\n\`\`\`\n\n### 판매 채널\n\n- Gumroad: 해외 타겟, 수수료 10%\n- 클래스101: 국내 강의 판매\n- 네이버 스마트스토어: 템플릿 파일 판매`,
  },
  {
    id: 18,
    category: '이메일 마케팅',
    level: '중급',
    image: IMG.email,
    title: '이메일 자동화 시퀀스 — 구독 → 신뢰 → 구매까지 자동으로',
    excerpt: '웰컴 이메일부터 구매 유도 이메일까지 7단계 자동화 시퀀스. Mailchimp + ChatGPT로 이메일 퍼널을 완성하는 법.',
    date: '2026.05.15',
    readMin: 12,
    tags: ['이메일자동화', 'Mailchimp', '퍼널', 'CRM'],
    body: `## 7단계 이메일 자동화 시퀀스\n\n### Day 1: 웰컴 이메일\n\n구독 감사 + 브랜드 스토리 + 무료 혜택 지급.\n\n### Day 3: 가치 제공\n\n고객 문제를 해결하는 핵심 팁 1가지.\n\n### Day 7: 신뢰 구축\n\n수강생/고객 후기 + 성과 수치.\n\n### Day 14: 소프트 세일\n\n상품 소개, 강요 없이.\n\n### Day 21: 한정 오퍼\n\n기간 한정 할인 or 보너스 제공.\n\n### AI 활용 팁\n\n\`\`\`\n[브랜드 톤]에 맞는 7단계 이메일 시퀀스 전체를 작성해주세요.\n각 이메일: 제목 + 본문 (300자 내외)\n목표: 구독 → 신뢰 → 구매\n\`\`\``,
  },
  {
    id: 19,
    category: '콘텐츠 제작',
    level: '입문',
    image: IMG.content,
    title: 'Canva AI로 전문 디자이너 없이 브랜드 콘텐츠 만드는 법',
    excerpt: 'Canva Magic Studio의 AI 기능으로 SNS 카드뉴스, 유튜브 썸네일, 광고 배너를 10분 만에 완성하세요. 디자인 전공 불필요.',
    date: '2026.05.12',
    readMin: 6,
    tags: ['Canva', 'AI디자인', 'SNS콘텐츠', '브랜딩'],
    body: `## Canva AI 마케팅 콘텐츠 완성 가이드\n\n### Magic Studio 핵심 기능\n\n- **Magic Write**: 카피 자동 생성\n- **Magic Design**: 텍스트 입력 → 디자인 자동 완성\n- **Background Remover**: 배경 1클릭 제거\n- **Text to Image**: AI 이미지 생성\n\n### 브랜드 템플릿 세팅법\n\n브랜드 색상·폰트·로고를 한번만 등록하면 모든 디자인에 자동 적용됩니다.\n\n### 추천 워크플로우\n\n블로그 글 → Magic Write로 카드뉴스 카피 생성 → Magic Design으로 시각화 → 인스타 게시물 발행`,
  },
  {
    id: 20,
    category: 'SNS 마케팅',
    level: '초급',
    image: IMG.sns,
    title: '틱톡 마케팅 입문 — 소상공인이 알아야 할 2026 틱톡 전략',
    excerpt: '10초 영상 하나로 하루 10만 뷰. 틱톡 알고리즘의 핵심을 이해하고 AI로 바이럴 콘텐츠를 양산하는 전략을 공개합니다.',
    date: '2026.05.10',
    readMin: 8,
    tags: ['틱톡', '바이럴', '쇼트폼', '소상공인'],
    body: `## 틱톡 소상공인 마케팅 가이드\n\n### 틱톡 알고리즘의 특징\n\n팔로워 수보다 콘텐츠 품질 우선. 신규 계정도 바이럴 가능.\n\n### 소상공인 성공 공식\n\n1. **제품 사용 전/후** 변화 영상 (Before & After)\n2. **비하인드 스토리** — 제품 제작 과정\n3. **고객 반응** 영상 — 실제 후기\n\n### AI 대본 생성\n\n\`\`\`\n틱톡 바이럴을 위한 30초 대본을 작성해주세요.\n제품: [제품명]\n포맷: 후킹 질문 → 문제 공감 → 해결책(제품) → CTA\n\`\`\`\n\n### 현실적인 결과\n\n꾸준히 주 5회 업로드 시 3개월 내 팔로워 2,000-5,000명 달성 사례 다수.`,
  },
  {
    id: 21,
    category: '마케팅 전략',
    level: '중급',
    image: IMG.analytics,
    title: '판매 퍼널 설계법 — 방문자를 구매자로 바꾸는 4단계',
    excerpt: '인지 → 관심 → 욕구 → 행동. 고전 마케팅 퍼널을 AI로 자동화하면 24시간 영업사원이 생깁니다. 실전 퍼널 설계 가이드.',
    date: '2026.05.08',
    readMin: 9,
    tags: ['퍼널', 'AIDA', '전환율', '자동화'],
    body: `## AI 판매 퍼널 설계\n\n### 4단계 퍼널 구조\n\n**1단계 인지**: SNS 무료 콘텐츠 → 브랜드 노출\n**2단계 관심**: 무료 자료 제공 → 이메일 수집\n**3단계 욕구**: 이메일 시퀀스 → 신뢰 구축\n**4단계 행동**: 한정 오퍼 → 구매 유도\n\n### AI 자동화 포인트\n\n각 단계마다 ChatGPT로 콘텐츠를 미리 제작하고 예약 발행으로 완전 자동화.\n\n### 전환율 벤치마크\n\n방문자 → 리드: 2-5%\n리드 → 구매: 1-3%\n목표: 각 단계 10% 개선으로 전체 전환 2배 상승`,
  },
  {
    id: 22,
    category: 'AI 도구',
    level: '중급',
    image: IMG.video,
    title: 'Midjourney로 브랜드 이미지 제작 — 광고 소재 비용 0원',
    excerpt: '사진 촬영 없이 AI로 제품 광고 이미지, 브랜드 무드보드, SNS 썸네일을 생성하는 Midjourney 실전 프롬프트 가이드.',
    date: '2026.05.05',
    readMin: 10,
    tags: ['Midjourney', 'AI이미지', '광고소재', '브랜딩'],
    body: `## Midjourney 마케팅 이미지 제작\n\n### 기본 프롬프트 구조\n\n[주제] + [스타일] + [조명] + [카메라 앵글] + [퀄리티 옵션]\n\n### 브랜드 광고 이미지 프롬프트\n\n\`\`\`\nminimalist product photography, [제품명] on white marble surface,\nsoft natural lighting, top-down angle, luxury brand aesthetic,\n8k resolution, --ar 1:1 --v 6\n\`\`\`\n\n### SNS 카드뉴스 배경 이미지\n\n\`\`\`\nabstract gradient background, Korean modern aesthetic,\ngold and dark tones, minimalist, suitable for text overlay\n--ar 9:16 --v 6\n\`\`\`\n\n### 주의사항\n\n상업적 사용 시 Midjourney Pro 플랜 필요.`,
  },
  {
    id: 23,
    category: '자동화',
    level: '중급',
    image: IMG.automation,
    title: 'Make.com으로 마케팅 풀 자동화 — Zapier보다 강력한 이유',
    excerpt: '복잡한 조건 분기, 데이터 가공, 대용량 처리. Make.com이 Zapier보다 나은 상황과 실전 활용 시나리오를 비교합니다.',
    date: '2026.05.03',
    readMin: 11,
    tags: ['Make.com', '자동화', 'Zapier비교', '워크플로우'],
    body: `## Make.com vs Zapier 비교\n\n### Make.com이 더 나은 상황\n\n- 조건 분기가 많은 복잡한 자동화\n- 대용량 데이터 처리 (월 1만건 이상)\n- 시각적으로 플로우를 보며 설계하고 싶을 때\n\n### 마케팅 자동화 시나리오\n\n1. 신규 구매자 → CRM 등록 → 환영 이메일 + 카카오 알림 동시 발송\n2. 인스타 DM 수신 → ChatGPT 답변 생성 → 자동 회신\n3. 구글 시트 데이터 → 주간 리포트 → 이메일 발송\n\n### 무료 플랜\n\n월 1,000회 실행, 무제한 시나리오.`,
  },
  {
    id: 24,
    category: '유튜브',
    level: '초급',
    image: IMG.youtube,
    title: '유튜브 썸네일 A/B 테스트 — CTR을 2배 높이는 실전 전략',
    excerpt: 'CTR 4%와 8%의 차이는 오직 썸네일에서 납니다. AI 이미지 도구와 유튜브 스튜디오 A/B 테스트로 클릭률을 2배 높이는 법.',
    date: '2026.04.30',
    readMin: 7,
    tags: ['썸네일', 'CTR', 'A/B테스트', '유튜브'],
    body: `## 유튜브 썸네일 CTR 최적화\n\n### 클릭률 높은 썸네일 공식\n\n얼굴 클로즈업 + 강렬한 감정 표현 + 텍스트 3단어 이내\n\n### A/B 테스트 방법\n\n유튜브 스튜디오 → 콘텐츠 → 영상 선택 → '테스트 및 비교' 클릭.\n2개 썸네일을 각각 50% 시청자에게 노출해 CTR 비교.\n\n### AI 썸네일 제작 도구\n\n- Canva AI: 빠른 제작\n- Midjourney: 고품질 배경 이미지\n- Adobe Firefly: 배경 제거 + 합성\n\n### 결과 분석 주기\n\n최소 48시간 테스트 후 CTR 높은 썸네일로 확정.`,
  },
  {
    id: 25,
    category: '비즈니스',
    level: '고급',
    image: IMG.business,
    title: '온라인 강의 제작 완전 가이드 — 기획부터 판매까지',
    excerpt: '지식을 돈으로 바꾸는 가장 확실한 방법. AI로 강의 커리큘럼을 설계하고, 스마트폰 하나로 촬영·편집·판매하는 전체 프로세스.',
    date: '2026.04.28',
    readMin: 14,
    tags: ['온라인강의', '지식창업', 'AI기획', '수익화'],
    body: `## 온라인 강의 제작 전체 프로세스\n\n### Step 1: 주제 선정 (AI 활용)\n\n\`\`\`\n내가 가진 [전문 분야]를 온라인 강의로 만들 때 가장 수요가 높을 주제 10개를 제안해주세요.\n기준: 입문자가 3개월 내 결과를 낼 수 있는 실용적 내용\n\`\`\`\n\n### Step 2: 커리큘럼 설계\n\n8-12개 모듈, 각 모듈 20-40분 영상 구성이 이상적.\n\n### Step 3: 촬영 세팅 (최소 비용)\n\n스마트폰 + 조명 1개 + 핀 마이크 = 충분.\n\n### Step 4: 판매 채널\n\n- 클래스101: 국내 최대 플랫폼\n- 탈잉: 소규모 클래스\n- 자사 플랫폼: Teachable, Podia`,
  },
  {
    id: 26,
    category: '콘텐츠 제작',
    level: '중급',
    image: IMG.copywriting,
    title: '팟캐스트로 브랜드 권위 쌓기 — AI 대본 작성부터 배포까지',
    excerpt: '팟캐스트는 경쟁이 낮고 충성 청중을 만드는 최고의 채널입니다. AI로 대본을 쓰고 Spotify, 네이버 포드캐스트에 자동 배포하는 법.',
    date: '2026.04.25',
    readMin: 9,
    tags: ['팟캐스트', '브랜딩', 'Spotify', 'AI대본'],
    body: `## 팟캐스트 브랜드 구축 가이드\n\n### 왜 팟캐스트인가?\n\n- 청취 중 다른 활동 가능 → 높은 완청률\n- 영상보다 제작 비용 90% 절감\n- 반복 청취로 강한 팬덤 형성\n\n### AI 대본 작성 프롬프트\n\n\`\`\`\n[주제]에 관한 20분짜리 팟캐스트 에피소드 대본을 작성해주세요.\n구성: 오프닝(2분) → 메인 콘텐츠(15분) → 클로징 CTA(3분)\n톤: 친근하고 전문적, 청취자와 대화하는 느낌\n\`\`\`\n\n### 배포 채널\n\nAnchor(무료) → Spotify, Apple Podcast, 네이버 동시 배포`,
  },
  {
    id: 27,
    category: 'SNS 마케팅',
    level: '초급',
    image: IMG.sns,
    title: '카카오채널로 단골 고객 만들기 — 소상공인 필수 전략',
    excerpt: '카카오 채널 친구 1,000명이 있으면 광고비 0원으로 마케팅이 됩니다. 소상공인이 카카오 채널을 빠르게 키우는 전략.',
    date: '2026.04.22',
    readMin: 7,
    tags: ['카카오채널', '단골고객', '소상공인', 'CRM'],
    body: `## 카카오채널 성장 전략\n\n### 채널 친구를 빠르게 늘리는 법\n\n1. 오프라인 고객에게 채널 추가 시 즉시 혜택 제공\n2. 인스타/블로그에 채널 QR코드 노출\n3. 첫 메시지에 할인 쿠폰 자동 발송\n\n### 정기 메시지 콘텐츠 전략\n\n- 월 2-4회 발송이 최적\n- 혜택 정보 70% + 스토리/소식 30%\n- AI로 자연스러운 메시지 초안 작성\n\n### 실전 결과\n\n채널 친구 500명: 월 매출 기여 약 50-150만원 (업종별 상이)`,
  },
  {
    id: 28,
    category: '마케팅 전략',
    level: '고급',
    image: IMG.analytics,
    title: '가격 전략으로 매출 2배 — 심리적 가격 결정의 과학',
    excerpt: '9,900원 vs 10,000원, 3가지 패키지 구성, 앵커 가격 효과. 행동경제학과 AI를 결합한 가격 전략으로 객단가를 높이는 법.',
    date: '2026.04.20',
    readMin: 10,
    tags: ['가격전략', '심리마케팅', '행동경제학', '객단가'],
    body: `## 심리적 가격 전략 실전 가이드\n\n### 1. 앵커링 효과 (Anchoring)\n\n비싼 옵션을 먼저 보여주면 다음 옵션이 저렴하게 느껴집니다.\n\n구성: 프리미엄(300만원) → 스탠다드(150만원) → 베이직(80만원)\n\n### 2. 황금 중간값 전략\n\n3가지 옵션 중 중간 옵션의 판매율이 가장 높습니다 (약 60%).\n중간 옵션을 핵심 상품으로 설계하세요.\n\n### 3. AI 가격 분석 프롬프트\n\n\`\`\`\n[상품]의 가격을 경쟁사 [A, B, C]와 비교 분석해주세요.\n심리적 가격 책정 원칙을 적용한 최적 가격대 3개를 제안해주세요.\n\`\`\``,
  },
  {
    id: 29,
    category: 'AI 도구',
    level: '초급',
    image: IMG.ai_tool,
    title: 'Notion AI로 업무 자동화 — 1인 기업의 두 번째 뇌',
    excerpt: 'Notion AI로 회의록 자동 정리, 프로젝트 계획서 초안, 콘텐츠 캘린더를 10분 만에 완성하는 실전 활용법.',
    date: '2026.04.18',
    readMin: 8,
    tags: ['Notion', 'AI업무', '생산성', '1인기업'],
    body: `## Notion AI 실전 활용법\n\n### 1인 기업 필수 Notion 구조\n\n- 프로젝트 관리 DB\n- 콘텐츠 캘린더\n- 고객 CRM\n- 아이디어 수집함\n\n### Notion AI 핵심 기능 활용\n\n**회의록 자동 정리:**\n회의 메모 붙여넣기 → "이 내용을 구조화된 회의록으로 정리해줘"\n\n**콘텐츠 아이디어:**\n"[주제]에 관한 블로그 포스트 아이디어 20개를 표로 만들어줘"\n\n**이메일 초안:**\n"아래 요점으로 클라이언트에게 보낼 정중한 이메일 초안을 작성해줘"`,
  },
  {
    id: 30,
    category: '이메일 마케팅',
    level: '입문',
    image: IMG.email,
    title: '뉴스레터 구독자 0명에서 1,000명 — 90일 성장 로드맵',
    excerpt: '뉴스레터는 SNS 알고리즘과 관계없이 직접 고객과 소통하는 가장 강력한 채널입니다. AI로 뉴스레터를 자동화하고 구독자를 빠르게 늘리는 법.',
    date: '2026.04.15',
    readMin: 9,
    tags: ['뉴스레터', '이메일마케팅', '구독자', '성장전략'],
    body: `## 뉴스레터 1,000명 달성 90일 로드맵\n\n### 왜 뉴스레터인가?\n\n- SNS 알고리즘 영향 없음 — 100% 내 구독자에게 도달\n- 오픈율 20-40% vs SNS 도달률 2-5%\n- 구매 전환율 가장 높은 채널\n\n### 1-30일: 기반 세팅\n\n뉴스레터 주제 확정 → Stibee/Mailchimp 세팅 → 무료 자료 리드마그넷 제작\n\n### 31-60일: 콘텐츠 가속\n\n주 1회 발행, SNS 크로스 프로모션, 지인 네트워크 공유 요청\n\n### 61-90일: 유료 구독자 전환\n\n구독자 700명 이상 → 월 구독 모델 또는 유료 강의로 전환\n\n### AI 뉴스레터 작성 프롬프트\n\n\`\`\`\n[주제]에 관한 주간 뉴스레터를 작성해주세요.\n길이: 400-600자, 톤: 친근하고 전문적\n포함: 핵심 인사이트 1개, 실전 팁 3개, CTA 1개\n\`\`\``,
  },
];

const POSTS_PER_PAGE = 24;
const CATEGORIES = ['전체', '마케팅 전략', 'AI 도구', '유튜브', '자동화', '콘텐츠 제작', 'SNS 마케팅', '이메일 마케팅', '비즈니스'];
const LEVELS = ['전체', '입문', '초급', '중급', '고급'];

/* ─────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   SEO 헬퍼 함수
───────────────────────────────────────── */
function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
  el.content = content;
}
function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
  el.content = content;
}
function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
  el.href = url;
}
function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement;
  if (!el) { el = document.createElement('script'); el.id = id; el.type = 'application/ld+json'; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
}
function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeLevel, setActiveLevel]       = useState('전체');
  const [selectedPost, setSelectedPost]     = useState<Post | null>(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [sortBy, setSortBy]                 = useState<'latest' | 'popular'>('latest');
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [copyToast, setCopyToast]           = useState(false);
  const [currentPage, setCurrentPage]       = useState(1);

  /* ── SEO: 상세 포스트 메타태그 ── */
  useEffect(() => {
    if (selectedPost) {
      const postUrl = `${SITE_URL}/blog/${selectedPost.id}`;
      document.title = `${selectedPost.title} | ${SITE_NAME}`;
      setMeta('description', selectedPost.excerpt);
      setMeta('keywords', selectedPost.tags.join(', '));
      setMeta('robots', 'index, follow');
      setMeta('author', 'GrowthAI');
      setOg('og:type', 'article');
      setOg('og:title', selectedPost.title);
      setOg('og:description', selectedPost.excerpt);
      setOg('og:image', selectedPost.image);
      setOg('og:url', postUrl);
      setOg('og:site_name', SITE_NAME);
      setOg('og:locale', 'ko_KR');
      setOg('article:published_time', selectedPost.date);
      setOg('article:section', selectedPost.category);
      selectedPost.tags.forEach(tag => setOg('article:tag', tag));
      setCanonical(postUrl);
      /* JSON-LD Article Schema */
      setJsonLd('blog-post-schema', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: selectedPost.title,
        description: selectedPost.excerpt,
        image: selectedPost.image,
        datePublished: selectedPost.date,
        dateModified: selectedPost.date,
        author: { '@type': 'Organization', name: 'GrowthAI', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'GrowthAI',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/ceo-photo-smooth.png` },
        },
        url: postUrl,
        keywords: selectedPost.tags.join(', '),
        articleSection: selectedPost.category,
        inLanguage: 'ko',
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      });
    } else {
      /* 목록 뷰 SEO */
      document.title = `마케팅 인사이트 블로그 | ${SITE_NAME}`;
      setMeta('description', BLOG_DESCRIPTION);
      setMeta('keywords', 'AI 마케팅, 디지털 마케팅, 유튜브 수익화, 소상공인 AI, 자동화, 콘텐츠 제작');
      setMeta('robots', 'index, follow');
      setOg('og:type', 'website');
      setOg('og:title', `마케팅 인사이트 블로그 | ${SITE_NAME}`);
      setOg('og:description', BLOG_DESCRIPTION);
      setOg('og:url', `${SITE_URL}/blog`);
      setOg('og:site_name', SITE_NAME);
      setOg('og:locale', 'ko_KR');
      setCanonical(`${SITE_URL}/blog`);
      removeJsonLd('blog-post-schema');
      /* BreadcrumbList Schema */
      setJsonLd('blog-breadcrumb-schema', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
        ],
      });
    }
    return () => {
      document.title = SITE_NAME;
    };
  }, [selectedPost]);

  const filtered = POSTS.filter(p => {
    const matchCat   = activeCategory === '전체' || p.category === activeCategory;
    const matchLevel = activeLevel === '전체'    || p.level === activeLevel;
    const matchSearch = searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchLevel && matchSearch;
  });

  /* 필터 변경 시 첫 페이지로 초기화 */
  useEffect(() => { setCurrentPage(1); }, [activeCategory, activeLevel, searchQuery]);

  const openPost = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePost = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ════════ 상세 뷰 ════════ */
  if (selectedPost) {
    /* 카테고리 내 관련글 (같은 카테고리 우선) */
    const relatedPosts = [
      ...POSTS.filter(p => p.id !== selectedPost.id && p.category === selectedPost.category),
      ...POSTS.filter(p => p.id !== selectedPost.id && p.category !== selectedPost.category),
    ].slice(0, 3);

    const postUrl = `${SITE_URL}/blog/${selectedPost.id}`;

    const handleCopyLink = () => {
      navigator.clipboard.writeText(postUrl).then(() => {
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2000);
      });
    };

    const handleNaverShare = () => {
      window.open(
        `https://share.naver.com/web/shareView?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(selectedPost.title)}`,
        '_blank', 'width=500,height=600'
      );
    };

    const handleKakaoShare = () => {
      window.open(
        `https://story.kakao.com/share?url=${encodeURIComponent(postUrl)}`,
        '_blank', 'width=500,height=600'
      );
    };

    return (
      <div className="min-h-screen bg-black text-white">
        {/* 히어로 이미지 */}
        <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
          <img
            src={selectedPost.image}
            alt={`${selectedPost.title} 대표 이미지 — ${selectedPost.category} 카테고리`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

          {/* 브레드크럼 + 뒤로가기 */}
          <div className="relative z-10 pt-24 px-6">
            {/* 구글/네이버 SEO 브레드크럼 (시각적) */}
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/35 mb-3">
              <button onClick={closePost} className="hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none p-0">홈</button>
              <span>/</span>
              <button onClick={closePost} className="hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none p-0">블로그</button>
              <span>/</span>
              <span className="text-white/55">{selectedPost.category}</span>
            </nav>
            <button
              onClick={closePost}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-[14px]"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              블로그 목록
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-24 -mt-8 relative z-10">
          {/* 메타 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-[12px] font-semibold px-3 py-1 rounded-full border ${catColor[selectedPost.category]}`}>
                {selectedPost.category}
              </span>
              <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${levelColor[selectedPost.level]}`}>
                {selectedPost.level}
              </span>
              <span className="flex items-center gap-1.5 text-white/35 text-[13px]">
                <Clock size={13} strokeWidth={2} /> {selectedPost.readMin}분
              </span>
              <span className="text-white/30 text-[13px]">{selectedPost.date}</span>
            </div>

            <h1 className="apple-white-gradient font-extrabold leading-[1.15] tracking-tight mb-6"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              {selectedPost.title}
            </h1>

            <p className="text-white/55 text-[16px] sm:text-[18px] leading-relaxed mb-10 pb-10 border-b border-white/8">
              {selectedPost.excerpt}
            </p>

            {/* 본문 */}
            <div>
              {selectedPost.body.split('\n').map((line, i) => {
                if (line.startsWith('## '))
                  return <h2 key={i} className="apple-white-gradient font-bold text-[20px] sm:text-[24px] mt-10 mb-4">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### '))
                  return <h3 key={i} className="text-white font-semibold text-[17px] sm:text-[19px] mt-8 mb-3">{line.replace('### ', '')}</h3>;
                if (line.startsWith('```') || line === '```')
                  return null;
                if (line.startsWith('- '))
                  return (
                    <div key={i} className="flex items-start gap-2.5 mb-2">
                      <span className="text-white/30 mt-[3px] shrink-0 text-[10px]">●</span>
                      <span className="text-white/65 text-[14px] sm:text-[15px] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
                    </div>
                  );
                if (line === '---')
                  return <hr key={i} className="border-white/8 my-8" />;
                if (line.trim() === '')
                  return <div key={i} className="h-3" />;
                return (
                  <p key={i} className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mb-2"
                    dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
                );
              })}
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/8">
              {selectedPost.tags.map(tag => (
                <span
                  key={tag}
                  className="text-white/35 text-[12px] bg-white/5 border border-white/8 rounded-full px-3 py-1 cursor-pointer hover:border-white/20 hover:text-white/60 transition-all"
                  onClick={() => { setSelectedPost(null); setSearchQuery(tag); }}
                  title={`#${tag} 태그 글 보기`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* 소셜 공유 버튼 (SEO 소셜시그널 + 사용성) */}
            <div className="mt-8 pt-8 border-t border-white/8">
              <p className="text-white/30 text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">이 글 공유하기</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleNaverShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer border-none"
                  style={{ backgroundColor: '#03C75A', color: '#fff' }}
                >
                  <span className="text-[14px] font-black">N</span>
                  네이버 공유
                </button>

                <button
                  onClick={handleKakaoShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer border-none"
                  style={{ backgroundColor: '#FEE500', color: '#3C1E1E' }}
                >
                  <span className="text-[15px]">💬</span>
                  카카오 공유
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer border border-white/12 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <LinkIcon size={13} strokeWidth={2} />
                  링크 복사
                </button>

                {/* 복사 완료 토스트 */}
                <AnimatePresence>
                  {copyToast && (
                    <motion.span
                      className="text-[12px] text-emerald-400"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      ✓ 링크가 복사됐습니다
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 관련 글 보기 (같은 카테고리 우선) */}
            <div className="mt-10 pt-8 border-t border-white/8">
              <p className="text-white/30 text-[11px] tracking-[0.18em] uppercase font-semibold mb-2">관련 글 보기</p>
              <p className="text-white/20 text-[12px] mb-5">{selectedPost.category} 카테고리의 더 많은 글</p>
              <div className="flex flex-col gap-3">
                {relatedPosts.map(p => (
                  <button key={p.id} onClick={() => openPost(p)}
                    className="flex items-center gap-4 p-4 border border-white/8 rounded-2xl hover:border-white/20 hover:bg-white/[0.02] transition-all text-left cursor-pointer bg-transparent group">
                    <img
                      src={p.image}
                      alt={`${p.title} 썸네일 — ${p.category}`}
                      className="w-16 h-12 object-cover rounded-lg shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-white/65 text-[14px] font-medium group-hover:text-white transition-colors line-clamp-2 block">
                        {p.title}
                      </span>
                      <span className="text-white/25 text-[11px] mt-0.5 block">{p.category} · {p.readMin}분</span>
                    </div>
                    <ChevronRight size={15} strokeWidth={2} className="text-white/20 shrink-0 group-hover:text-white/50 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ════════ 목록 뷰 ════════ */
  const featuredPost = POSTS.find(p => p.featured);
  const isFiltered   = activeCategory !== '전체' || activeLevel !== '전체' || searchQuery !== '';
  const displayPosts = isFiltered ? filtered : filtered.filter(p => !p.featured);
  const totalPages   = Math.max(1, Math.ceil(displayPosts.length / POSTS_PER_PAGE));
  const pagedPosts   = displayPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* 페이지 번호 배열 (최대 5개 표시) */
  const pageNumbers = (() => {
    const pages: number[] = [];
    const half = 2;
    let start = Math.max(1, currentPage - half);
    let end   = Math.min(totalPages, currentPage + half);
    if (end - start < 4) {
      if (start === 1) end   = Math.min(totalPages, start + 4);
      else             start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  })();

  const regularPosts = pagedPosts; // alias — 하위 코드 호환

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">

        {/* 헤더 */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          {/* 브레드크럼 (시각적 + SEO) */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/25 mb-4">
            <a href="/" className="hover:text-white/50 transition-colors">홈</a>
            <span>/</span>
            <span className="text-white/45">블로그</span>
          </nav>
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">BLOG · ACADEMY</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}>
                마케팅 인사이트
              </h1>
              <p className="text-white/40 text-[15px] mt-2">거장의 이론 × AI 도구 × 실전 자동화 — 소상공인과 1인 크리에이터를 위한 실전 블로그</p>
            </div>

            {/* 검색창 */}
            <div className="relative w-full sm:w-72">
              <Search size={15} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="글 검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white text-[13px] placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white cursor-pointer bg-transparent border-none p-0">
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8 items-start">

          {/* ── 사이드바 필터 (데스크탑) ── */}
          <aside className="hidden lg:flex flex-col gap-7 w-52 shrink-0 sticky top-24">
            {/* 카테고리 */}
            <div>
              <p className="text-white/30 text-[11px] tracking-[0.18em] uppercase font-semibold mb-3">카테고리</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer border-none ${
                      activeCategory === cat ? 'bg-white/10 text-white' : 'bg-transparent text-white/45 hover:text-white hover:bg-white/5'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 난이도 */}
            <div>
              <p className="text-white/30 text-[11px] tracking-[0.18em] uppercase font-semibold mb-3">난이도</p>
              <div className="flex flex-col gap-1">
                {LEVELS.map(lv => (
                  <button key={lv} onClick={() => setActiveLevel(lv)}
                    className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer border-none ${
                      activeLevel === lv ? 'bg-white/10 text-white' : 'bg-transparent text-white/45 hover:text-white hover:bg-white/5'
                    }`}>
                    {lv === '전체' ? lv : (
                      <span className={`${levelColor[lv]} px-2 py-0.5 rounded-full text-[12px]`}>{lv}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <div className="flex-1 min-w-0">

            {/* 모바일 필터 버튼 */}
            <div className="flex lg:hidden items-center justify-between mb-5">
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 text-white/60 hover:text-white text-[13px] font-medium cursor-pointer bg-transparent border border-white/10 rounded-xl px-3 py-2 transition-colors">
                <SlidersHorizontal size={14} strokeWidth={2} />
                필터
                {(activeCategory !== '전체' || activeLevel !== '전체') && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
              <span className="text-white/30 text-[13px]">{filtered.length}개 글</span>
            </div>

            {/* 모바일 필터 드롭다운 */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  className="lg:hidden mb-6 p-5 border border-white/10 bg-white/[0.02] rounded-2xl"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-white/30 text-[11px] tracking-widest uppercase font-semibold mb-3">카테고리</p>
                      <div className="flex flex-col gap-1">
                        {CATEGORIES.slice(0, 5).map(cat => (
                          <button key={cat} onClick={() => { setActiveCategory(cat); setSidebarOpen(false); }}
                            className={`text-left px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer border-none ${
                              activeCategory === cat ? 'bg-white/10 text-white' : 'bg-transparent text-white/45'
                            }`}>{cat}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-white/30 text-[11px] tracking-widest uppercase font-semibold mb-3">난이도</p>
                      <div className="flex flex-col gap-1">
                        {LEVELS.map(lv => (
                          <button key={lv} onClick={() => { setActiveLevel(lv); setSidebarOpen(false); }}
                            className={`text-left px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer border-none ${
                              activeLevel === lv ? 'bg-white/10 text-white' : 'bg-transparent text-white/45'
                            }`}>{lv}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 정렬 + 결과 수 (데스크탑) */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <span className="text-white/30 text-[13px]">
                {filtered.length}개 글
                {totalPages > 1 && <span className="ml-2 text-white/20">· {currentPage}/{totalPages} 페이지</span>}
              </span>
              <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl p-1">
                {(['latest', 'popular'] as const).map(s => (
                  <button key={s} onClick={() => setSortBy(s)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer border-none ${
                      sortBy === s ? 'bg-white text-black' : 'bg-transparent text-white/45 hover:text-white'
                    }`}>
                    {s === 'latest' ? '최신순' : '인기순'}
                  </button>
                ))}
              </div>
            </div>

            {/* 피처드 포스트 (전체 필터 + 검색 없을 때 + 1페이지만) */}
            {featuredPost && !isFiltered && currentPage === 1 && (
              <motion.button
                onClick={() => openPost(featuredPost)}
                className="w-full text-left mb-6 group cursor-pointer bg-transparent border-none p-0"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all">
                  <div className="relative h-[220px] sm:h-[300px]">
                    <img
                      src={featuredPost.image}
                      alt={`[추천글] ${featuredPost.title} — ${featuredPost.category} 마케팅 인사이트`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <span className="absolute top-4 left-4 text-[11px] font-bold bg-white text-black px-3 py-1 rounded-full uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 bg-white/[0.01]">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${catColor[featuredPost.category]}`}>
                        {featuredPost.category}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${levelColor[featuredPost.level]}`}>
                        {featuredPost.level}
                      </span>
                      <span className="flex items-center gap-1 text-white/30 text-[12px]">
                        <Clock size={12} strokeWidth={2} /> {featuredPost.readMin}분
                      </span>
                    </div>
                    <h2 className="apple-white-gradient font-bold text-[20px] sm:text-[24px] leading-[1.3] mb-3 group-hover:text-white/90 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/45 text-[14px] leading-relaxed line-clamp-2">{featuredPost.excerpt}</p>
                  </div>
                </div>
              </motion.button>
            )}

            {/* 카드 그리드 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + activeLevel + searchQuery + currentPage}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              >
                {regularPosts.map((post, i) => (
                  <motion.button
                    key={post.id}
                    onClick={() => openPost(post)}
                    className="text-left border border-white/8 bg-white/[0.01] rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/[0.03] transition-all cursor-pointer group flex flex-col"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    {/* 썸네일 이미지 */}
                    <div className="relative h-[180px] overflow-hidden">
                      <img
                        src={post.image}
                        alt={`${post.title} — ${post.category} 블로그 썸네일`}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {/* 카테고리 배지 */}
                      <span className={`absolute bottom-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${catColor[post.category]}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* 카드 바디 */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      {/* 난이도 + 읽기 시간 */}
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${levelColor[post.level]}`}>
                          {post.level}
                        </span>
                        <span className="flex items-center gap-1 text-white/28 text-[12px]">
                          <Clock size={11} strokeWidth={2} /> {post.readMin}분
                        </span>
                        <span className="text-white/25 text-[12px] ml-auto">{post.date}</span>
                      </div>

                      {/* 제목 */}
                      <h2 className="apple-white-gradient font-bold text-[14px] sm:text-[15px] leading-[1.45] group-hover:text-white/90 transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h2>

                      {/* 요약 */}
                      <p className="text-white/40 text-[12px] sm:text-[13px] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/6">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-white/28 text-[11px] bg-white/[0.04] rounded-full px-2 py-0.5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* 빈 결과 */}
            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="text-white/20 text-[15px]">검색 결과가 없습니다.</p>
                <button onClick={() => { setActiveCategory('전체'); setActiveLevel('전체'); setSearchQuery(''); }}
                  className="mt-4 text-white/40 hover:text-white text-[13px] underline cursor-pointer bg-transparent border-none">
                  필터 초기화
                </button>
              </div>
            )}

            {/* ── 페이지네이션 ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-12 pt-8 border-t border-white/8">
                {/* 이전 */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-[14px] border transition-all cursor-pointer bg-transparent ${
                    currentPage === 1
                      ? 'border-white/5 text-white/20 cursor-not-allowed'
                      : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                  }`}
                >
                  ←
                </button>

                {/* 첫 페이지 + 말줄임 */}
                {pageNumbers[0] > 1 && (
                  <>
                    <button onClick={() => goToPage(1)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-[13px] border border-white/10 text-white/50 hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent">
                      1
                    </button>
                    {pageNumbers[0] > 2 && <span className="text-white/20 text-[13px] px-1">…</span>}
                  </>
                )}

                {/* 페이지 번호 */}
                {pageNumbers.map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                      page === currentPage
                        ? 'border-transparent text-black'
                        : 'border-white/10 bg-transparent text-white/50 hover:border-white/25 hover:text-white'
                    }`}
                    style={page === currentPage ? { backgroundColor: '#C9A84C' } : {}}
                  >
                    {page}
                  </button>
                ))}

                {/* 마지막 페이지 + 말줄임 */}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                      <span className="text-white/20 text-[13px] px-1">…</span>
                    )}
                    <button onClick={() => goToPage(totalPages)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-[13px] border border-white/10 text-white/50 hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent">
                      {totalPages}
                    </button>
                  </>
                )}

                {/* 다음 */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-[14px] border transition-all cursor-pointer bg-transparent ${
                    currentPage === totalPages
                      ? 'border-white/5 text-white/20 cursor-not-allowed'
                      : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                  }`}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
