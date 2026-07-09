// ============================================================
// 네비게이션 그룹 — Navbar + Footer 공유 데이터
// ============================================================

export const NAV_GROUPS = [
  {
    id: 'about',
    labelKo: '소개',
    labelEn: 'About',
    items: [
      { path: '/ceo',    labelKo: 'CEO 소개',  labelEn: 'About CEO',  descKo: '강사 철학 & 프로필', descEn: 'Philosophy & Profile' },
      { path: '/basics', labelKo: '강의 교재', labelEn: 'Curriculum', descKo: '커리큘럼 & 자료',   descEn: 'Materials & Syllabus' },
    ],
  },
  {
    id: 'courses',
    labelKo: '강의',
    labelEn: 'Courses',
    items: [
      { path: '/enroll',   labelKo: '수강 신청',     labelEn: 'Enroll',         descKo: '플랜 & 가격 확인',       descEn: 'Plans & Pricing'     },
      { path: '/live',     labelKo: '라이브 강의',   labelEn: 'Live Class',     descKo: '실시간 강의 일정',       descEn: 'Live Schedule'       },
      { path: '/prompts',  labelKo: '교재 프롬프트', labelEn: 'Prompt Library', descKo: '33개 GPT 프롬프트 도구', descEn: '33 GPT Prompt Tools' },
      { path: '/homework', labelKo: '과제 제출',     labelEn: 'Homework',       descKo: '과제 & 실습 관리',       descEn: 'Assignments'         },
    ],
  },
  {
    id: 'content',
    labelKo: '콘텐츠',
    labelEn: 'Content',
    items: [
      { path: '/blog',      labelKo: '블로그',     labelEn: 'Blog',      descKo: 'AI & 마케팅 인사이트', descEn: 'AI & Marketing Insights' },
      { path: '/gallery',   labelKo: '포트폴리오', labelEn: 'Portfolio', descKo: '수강생 성과 & 결과물', descEn: 'Student Results'          },
      { path: '/community', labelKo: '커뮤니티',   labelEn: 'Community', descKo: '수강생 전용 공간',     descEn: 'Student Community'        },
    ],
  },
  {
    id: 'partner',
    labelKo: '파트너십',
    labelEn: 'Partner',
    items: [
      { path: '/partner', labelKo: '제휴 안내', labelEn: 'Partnership', descKo: '비즈니스 제휴 문의', descEn: 'Business Inquiry'   },
      { path: '/contact', labelKo: '문의하기',  labelEn: 'Contact Us',  descKo: '빠른 상담 요청',     descEn: 'Quick Consultation' },
    ],
  },
];
