// ============================================================
// 네비게이션 그룹 — Navbar + Footer 공유 데이터 (카테고리 다이어트)
// ============================================================

export const NAV_GROUPS = [
  {
    id: 'funnel',
    labelKo: '시작하기',
    labelEn: 'Start Here',
    items: [
      { path: '/book', labelKo: '무료 소책자 신청', labelEn: 'Free E-Book', descKo: '12인 거장 시크릿 전자책 증정', descEn: 'Get free marketing guide' },
      { path: '/diagnose', labelKo: '세일즈 배관 무료 진단', labelEn: '3-Min Audit', descKo: '내 비즈니스 전환 누수 3분 정밀 점검', descEn: 'Identify sales bottlenecks' },
    ],
  },
  {
    id: 'academy',
    labelKo: 'VOD 교육',
    labelEn: 'VOD Masterclass',
    items: [
      { path: '/product/plf-masterclass', labelKo: '마스터클래스 VOD 패키지', labelEn: 'VOD Package', descKo: '3시간 자동 판매 시스템 구축 가이드', descEn: 'Build 3-hour automated funnel' },
      { path: '/guide/day1', labelKo: '10분 무료 특강 시청', labelEn: 'Free VSL Lecture', descKo: '제프 워커 런치 포뮬러 한국화 특강', descEn: '10-Min VSL training video' },
    ],
  },
  {
    id: 'about',
    labelKo: '회사 소개',
    labelEn: 'About Us',
    items: [
      { path: '/about', labelKo: '운영자 소개', labelEn: 'Founder Story', descKo: '철학, 이력, 교육 방향', descEn: 'Philosophy and profile' },
    ],
  },
];
