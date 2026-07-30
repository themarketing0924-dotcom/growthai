// ============================================================
// 네비게이션 그룹 — Navbar + Footer 공유 데이터
// ============================================================

export const NAV_GROUPS = [
  {
    id: 'start',
    labelKo: '처음 오셨다면',
    labelEn: 'Start Here',
    items: [
      { path: '/', labelKo: 'GrowthAI 소개', labelEn: 'About GrowthAI', descKo: 'AI 수익화 교육 전체 구조', descEn: 'AI monetization education system' },
      { path: '/diagnose', labelKo: '무료 진단', labelEn: 'Free Diagnosis', descKo: '내 전환 병목 3분 점검', descEn: 'Find conversion bottlenecks' },
      { path: '/guide', labelKo: '무료 가이드', labelEn: 'Free Guide', descKo: '구매전환 PDF + 영상 교육', descEn: 'Conversion PDF + video training' },
    ],
  },
  {
    id: 'courses',
    labelKo: '온라인 강의',
    labelEn: 'Courses',
    items: [
      { path: '/enroll',   labelKo: '강의 전체 보기', labelEn: 'All Courses',     descKo: '가격, 혜택, 수강 신청',     descEn: 'Plans, benefits, enrollment' },
      { path: '/basics',   labelKo: '기초 커리큘럼',   labelEn: 'Core Curriculum', descKo: '초보자용 학습 로드맵',       descEn: 'Beginner learning roadmap' },
      { path: '/live',     labelKo: '라이브 강의',     labelEn: 'Live Class',      descKo: '실시간 강의와 피드백',       descEn: 'Live classes and feedback' },
      { path: '/homework', labelKo: '과제/실습',       labelEn: 'Practice',        descKo: '배운 내용을 결과물로 전환', descEn: 'Turn lessons into outputs' },
    ],
  },
  {
    id: 'agents',
    labelKo: '도구와 프롬프트',
    labelEn: 'Tools',
    items: [
      { path: '/prompts', labelKo: '프롬프트 라이브러리', labelEn: 'Prompt Library', descKo: '33개 실전 프롬프트 도구', descEn: '33 practical prompt tools' },
      { path: '/agents', labelKo: 'AI 에이전트 구독', labelEn: 'AI Agent Subscription', descKo: '반복 업무 자동화 도구', descEn: 'Automation tools for repeat work' },
      { path: '/agents/free-trial', labelKo: '무료 체험', labelEn: 'Free Trial', descKo: '먼저 써보고 판단하기', descEn: 'Try before subscribing' },
    ],
  },
  {
    id: 'proof',
    labelKo: '사례와 자료',
    labelEn: 'Proof',
    items: [
      { path: '/gallery',   labelKo: '성과 사례', labelEn: 'Results',   descKo: '수강생 결과와 포트폴리오', descEn: 'Student outcomes' },
      { path: '/blog',      labelKo: '블로그',     labelEn: 'Blog',      descKo: 'AI 마케팅 실전 인사이트', descEn: 'AI marketing insights' },
      { path: '/marketing-glossary', labelKo: '마케팅 용어집', labelEn: 'Marketing Glossary', descKo: '필수 마케팅 용어 사전', descEn: 'Essential Marketing Terms' },
      { path: '/community', labelKo: '커뮤니티',   labelEn: 'Community', descKo: '수강생 전용 실행 공간', descEn: 'Student execution space' },
    ],
  },
  {
    id: 'partner',
    labelKo: '신뢰와 문의',
    labelEn: 'Contact',
    items: [
      { path: '/about', labelKo: '운영자 소개', labelEn: 'Founder Story', descKo: '철학, 이력, 교육 방향', descEn: 'Philosophy and profile' },
      { path: '/partner', labelKo: '제휴 안내', labelEn: 'Partnership', descKo: '기업/강의/콘텐츠 제휴', descEn: 'Business partnership' },
      { path: '/contact', labelKo: '상담 문의',  labelEn: 'Contact Us',  descKo: '수강 전 빠른 상담',     descEn: 'Pre-enrollment support' },
    ],
  },
];
