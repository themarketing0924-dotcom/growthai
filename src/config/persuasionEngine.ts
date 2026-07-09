export const PERSUASION_ENGINE = {
  title: '설득 엔진 설계도',
  shortTitle: '설득 엔진',
  description:
    '마케팅 거장 12명의 검증된 프레임을 하나의 AI 에이전트에 통합해, 랜딩·상세·블로그·문의·런칭 페이지를 전환형 구조로 자동 설계하는 시스템입니다.',
  layers: [
    {
      name: '인식 진단',
      masters: ['Schwartz', 'Miller'],
      role: '방문자가 어떤 상태인지 파악하고, 현재 인식 수준에 맞는 메시지만 노출합니다.',
    },
    {
      name: '감정 자극',
      masters: ['Robbins', 'Kern'],
      role: '고통을 크게, 원하는 미래를 선명하게 보여줘서 클릭과 체류를 늘립니다.',
    },
    {
      name: '신뢰 제거',
      masters: ['Abraham', 'Cialdini', 'Hopkins'],
      role: '보증, 사회적 증거, 테스트 검증으로 구매 전 불안을 낮춥니다.',
    },
    {
      name: '행동 유도',
      masters: ['Kennedy', 'Brunson', 'Sugarman'],
      role: '희소성, 직접반응, Hook-Story-Offer, 구매 트리거로 즉시 행동을 유도합니다.',
    },
    {
      name: '런칭 빌드업',
      masters: ['Walker', 'Vaynerchuk'],
      role: '예열-공개-마감-재노출 흐름으로 기대감을 만들고 콘텐츠 복제를 자동화합니다.',
    },
    {
      name: '품질 검수',
      masters: ['Hopkins'],
      role: '카피, 문장 길이, 오퍼 명확도, CTA 일관성을 마지막에 점검합니다.',
    },
  ],
  sites: [
    {
      page: '홈',
      stack: 'Halbert + Schwartz + Brunson',
      output: '강한 헤드라인, 인식 단계별 메시지, HSO 구조, 1차/2차 CTA',
    },
    {
      page: '에이전트 소개/판매',
      stack: 'Brunson + Kennedy + Abraham',
      output: '가치 사다리, 희소성, 리스크 제거, 월정액 전환 문구',
    },
    {
      page: '블로그',
      stack: 'Patel + Miller + Schwartz',
      output: '검색형 주제, 문제 해결형 구조, 독자 인식 수준별 제목',
    },
    {
      page: '사례/신뢰',
      stack: 'Cialdini + Abraham + Hopkins',
      output: '숫자, 후기, 전후 비교, 증거 문장, 검수된 신뢰 섹션',
    },
    {
      page: '문의/상담',
      stack: 'Kennedy + Abraham',
      output: '응답 시간, 제안 가능 항목, 불안 제거, 마지막 반박 처리',
    },
    {
      page: '런칭/이벤트',
      stack: 'Walker + Vaynerchuk',
      output: '예열 시퀀스, 라이브 전환, 콘텐츠 복제 캘린더',
    },
    {
      page: '문장 검수',
      stack: 'Hopkins',
      output: '테스트 가능한 카피, 불필요한 문장 제거, CTA 일관성 점검',
    },
  ],
  prompt: `너는 GrowthAI의 "설득 엔진" 에이전트다.\n\n목표:\n- 방문자를 인식 수준별로 분류하고\n- 페이지 역할에 맞는 설득 구조를 설계하고\n- 랜딩, 상세페이지, 블로그, 문의, 런칭 페이지를 전환형 구조로 바꾼다.\n\n핵심 규칙:\n1. Claude Hopkins: 문장 품질, 테스트 가능성, 카피 검수부터 시작한다.\n2. Eugene Schwartz: 방문자의 인식 단계(완전 무인식~최고 인식)를 먼저 진단한다.\n3. Tony Robbins: 고통과 쾌락을 동시에 자극하되 과장은 하지 않는다.\n4. Jay Abraham: 보증, 리스크 제거, 추가가치, Keep Bonus를 설계한다.\n5. Dan Kennedy: 희소성, 배제, 직접반응 CTA를 명확하게 넣는다.\n6. Russell Brunson: Hook-Story-Offer 흐름과 가치 사다리를 만든다.\n7. Frank Kern: 숨은 욕망과 시각화를 사용해 감정적으로 설득한다.\n8. Cialdini: 사회적 증거, 권위, 호혜성, 일관성, 희소성을 섹션별로 배치한다.\n9. Jeff Walker: 예열-공개-마감의 런칭 타임라인을 설계한다.\n10. Donald Miller: 고객을 영웅으로 두고 문제-해결-변화 구조로 쓴다.\n11. Gary Halbert: 첫 문장과 헤드라인을 강하게 시작한다.\n12. Eugene Sugarman: 구매 트리거를 문장 중간에 자연스럽게 삽입한다.\n13. Gary Vaynerchuk: 무료 가치 제공 후 요청하고, 콘텐츠 복제 구조로 반복 발행한다.\n\n출력 형식:\n- 인식 단계 진단\n- 페이지 역할 분석\n- 적용할 거장 조합\n- 섹션별 카피 초안\n- CTA 3개\n- 반박 처리 문구\n- 테스트 체크리스트\n\n금지:\n- 추상적인 설명만 길게 쓰지 말 것\n- 같은 문장을 반복하지 말 것\n- CTA 없이 끝내지 말 것\n- '좋은 느낌'만 말하고 실행 문구가 없으면 안 됨\n`,
  usage: [
    '홈, 상세페이지, 에이전트 페이지를 새로 쓸 때 먼저 이 설계도를 적용한다.',
    '블로그 글감을 만들 때 방문자 인식 단계부터 분류한다.',
    '문구 검수 시 Hopkins 기준으로 과장, 중복, 불명확 CTA를 제거한다.',
  ],
};

export type PersuasionEngineLayer = (typeof PERSUASION_ENGINE.layers)[number];
