import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Target, Zap, Search as SearchIcon, FileText, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = 'https://www.growthai.kr';
const SITE_NAME = 'GrowthAI — 마케팅 × AI 강의';
const GLOSSARY_DESCRIPTION = 'AI 마케팅, SEO, AEO, GEO, 랜딩페이지, 구매전환, 리드 수집, 세일즈 퍼널 용어를 한국 1인 창업가와 소상공인 기준으로 정리한 GrowthAI 마케팅 용어집입니다.';

interface Term {
  name: string;
  category: '구매전환' | '검색 노출' | '자동화' | '콘텐츠';
  categoryKey: 'conversion' | 'search' | 'automation' | 'content';
  desc: string;
  use: string;
  searchKeywords: string;
}

const CATEGORIES = ['전체', '검색 노출', '구매전환', '콘텐츠', '자동화'] as const;

const catColors: Record<string, string> = {
  '구매전환': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  '검색 노출': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  '자동화': 'bg-green-500/20 text-green-300 border-green-500/30',
  '콘텐츠': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

const TERMS: Term[] = [
  { name: 'A/B 테스트', category: '구매전환', categoryKey: 'conversion', desc: '두 가지 헤드라인, 버튼, 가격, 섹션 순서를 비교해 어떤 쪽이 더 많은 신청과 구매를 만드는지 확인하는 방법입니다.', use: '무료 PDF 버튼 문구와 히어로 카피를 비교합니다.', searchKeywords: 'A/B 테스트 AB test 전환율' },
  { name: 'AEO', category: '검색 노출', categoryKey: 'search', desc: '사람의 질문에 검색엔진과 AI가 답하기 쉽게 제목, 요약, FAQ, 정의 문장을 정리하는 방식입니다.', use: '각 글 첫 문단에 질문의 답을 짧게 먼저 둡니다.', searchKeywords: 'AEO answer engine optimization 답변 최적화' },
  { name: 'AI 에이전트', category: '자동화', categoryKey: 'automation', desc: '반복되는 조사, 카피 작성, SEO 점검, 고객 응대 같은 업무를 목표에 맞춰 대신 실행하는 AI 작업 도구입니다.', use: '12명 거장 원리를 하나의 전환 설계 에이전트로 묶습니다.', searchKeywords: 'AI 에이전트 GPTs 업무 자동화' },
  { name: 'CAC', category: '구매전환', categoryKey: 'conversion', desc: '고객 한 명을 얻기 위해 들어간 광고비, 콘텐츠 제작비, 인건비를 포함한 전체 비용입니다.', use: '무료 트래픽과 리드 수집으로 광고 의존도를 낮춥니다.', searchKeywords: 'CAC 고객획득비용 광고비' },
  { name: 'CTA', category: '구매전환', categoryKey: 'conversion', desc: '방문자가 다음 행동을 하게 만드는 버튼이나 문장입니다. 예: 무료 PDF 받기, 상담 신청, 강의 보기.', use: '한 섹션에 하나의 행동만 남겨 클릭을 분산시키지 않습니다.', searchKeywords: 'CTA 버튼 행동 유도' },
  { name: 'CRM', category: '자동화', categoryKey: 'automation', desc: '리드를 모으고, 메시지를 보내고, 상담과 구매 상태를 관리하는 고객 관계 관리 시스템입니다.', use: 'PDF 신청 후 카카오, 문자, 이메일로 영상 순서를 보냅니다.', searchKeywords: 'CRM 고객관리 카카오 이메일 문자' },
  { name: 'FAQ 스키마', category: '검색 노출', categoryKey: 'search', desc: '자주 묻는 질문과 답변을 검색엔진이 이해하기 쉬운 구조로 표시하는 방식입니다.', use: '초보 가능 여부, 무료 이유, 적용 업종 질문을 페이지 하단에 둡니다.', searchKeywords: 'FAQ 스키마 구조화 데이터 질문 답변' },
  { name: 'GEO', category: '검색 노출', categoryKey: 'search', desc: '생성형 AI 검색에서 브랜드와 콘텐츠가 답변 후보로 이해되도록 명확한 정의, 사례, 출처 구조를 만드는 관점입니다.', use: '글마다 핵심 정의, 적용 예시, 다음 행동을 고정합니다.', searchKeywords: 'GEO generative engine optimization 생성형 AI 검색' },
  { name: 'KPI', category: '구매전환', categoryKey: 'conversion', desc: '마케팅이 잘 되고 있는지 판단하는 핵심 지표입니다. 방문자, 체류시간, 신청률, 구매율이 대표적입니다.', use: '예쁜 디자인보다 신청률과 구매율을 기준으로 봅니다.', searchKeywords: 'KPI 목표 지표 성과' },
  { name: 'LTV', category: '구매전환', categoryKey: 'conversion', desc: '고객 한 명이 장기적으로 만들어주는 총 매출 가치입니다. 구독, 재구매, 업셀 구조와 연결됩니다.', use: '무료 PDF에서 강의, 에이전트 구독, 맞춤 구축으로 이어집니다.', searchKeywords: 'LTV 고객생애가치 재구매 업셀' },
  { name: 'SEO', category: '검색 노출', categoryKey: 'search', desc: '구글, 네이버, 다음이 페이지 주제와 품질을 이해해 검색 결과에 노출할 수 있게 만드는 기본 구조입니다.', use: '제목, 설명, H1, 내부링크, 이미지 alt, 사이트맵을 함께 정리합니다.', searchKeywords: 'SEO 검색엔진 최적화 구글 네이버 다음' },
  { name: 'USP', category: '구매전환', categoryKey: 'conversion', desc: '고객이 왜 다른 곳이 아니라 당신을 선택해야 하는지 한 문장으로 말하는 차별화 약속입니다.', use: '“100개의 AI 도구보다 중요한 단 하나의 판매 구조”처럼 압축합니다.', searchKeywords: 'USP 차별화 고유 판매 제안' },
  { name: '검색 의도', category: '검색 노출', categoryKey: 'search', desc: '사용자가 검색창에 단어를 입력한 진짜 이유입니다. 정보 탐색, 비교, 구매, 문제 해결 의도로 나뉩니다.', use: '블로그는 정보형, 랜딩은 전환형으로 역할을 분리합니다.', searchKeywords: '검색 의도 search intent 정보 탐색 구매 비교' },
  { name: '구조화 데이터', category: '검색 노출', categoryKey: 'search', desc: '검색엔진이 페이지의 의미를 더 쉽게 이해하도록 JSON-LD 같은 형식으로 정보를 정리하는 방법입니다.', use: '용어집에는 DefinedTermSet, FAQ, Breadcrumb 구조를 넣습니다.', searchKeywords: '구조화 데이터 structured data schema JSON-LD' },
  { name: '내부 링크', category: '검색 노출', categoryKey: 'search', desc: '사이트 안의 관련 페이지끼리 연결해 검색엔진과 사용자가 주제 흐름을 이해하게 만드는 링크입니다.', use: '용어집에서 무료 PDF, 블로그, 강의 페이지로 연결합니다.', searchKeywords: '내부 링크 internal link 허브' },
  { name: '랜딩페이지', category: '구매전환', categoryKey: 'conversion', desc: '방문자에게 하나의 행동을 시키기 위해 만든 페이지입니다. 리드 수집, 상담 신청, 구매에 집중합니다.', use: '문제 제기, 해결, 신뢰, 무료 PDF, 영상, 신청 순서로 설계합니다.', searchKeywords: '랜딩페이지 landing page 리드 수집 구매' },
  { name: '리드', category: '구매전환', categoryKey: 'conversion', desc: '아직 구매하지 않았지만 연락처를 남기고 관심을 표현한 잠재고객입니다.', use: '무료 PDF와 3분 영상으로 첫 리드를 모읍니다.', searchKeywords: '리드 lead 잠재고객 이메일 카카오 전화번호' },
  { name: '리드 마그넷', category: '구매전환', categoryKey: 'conversion', desc: '잠재고객이 연락처를 남길 이유가 되는 무료 자료입니다. PDF, 체크리스트, 템플릿, 무료 영상이 대표적입니다.', use: '12명 마케팅 거장 원리 요약 PDF를 제공합니다.', searchKeywords: '리드 마그넷 lead magnet 무료 PDF 체크리스트' },
  { name: '리타게팅', category: '자동화', categoryKey: 'automation', desc: '사이트 방문자나 영상 시청자에게 다시 메시지를 보내 구매 전환 가능성을 높이는 방식입니다.', use: '미구매자는 다음 런칭 대기 리스트로 이동시킵니다.', searchKeywords: '리타게팅 retargeting 재방문 광고' },
  { name: '메타 설명', category: '검색 노출', categoryKey: 'search', desc: '검색 결과에서 제목 아래 보일 수 있는 요약 문장입니다. 클릭할 이유를 짧게 보여줘야 합니다.', use: '키워드, 대상, 결과, 무료 혜택을 1문장에 넣습니다.', searchKeywords: '메타 설명 meta description 클릭률' },
  { name: '세일즈 퍼널', category: '구매전환', categoryKey: 'conversion', desc: '유입, 리드 수집, 신뢰 형성, 제안, 구매, 재구매로 이어지는 판매 흐름입니다.', use: '무료 PDF → 영상 → 저가 상품 → 강의 → 에이전트 구독으로 설계합니다.', searchKeywords: '세일즈 퍼널 sales funnel 구매 여정' },
  { name: '사회적 증거', category: '콘텐츠', categoryKey: 'content', desc: '후기, 사례, 숫자, 사용자 반응처럼 다른 사람도 선택했다는 신뢰 신호입니다.', use: '댓글형 후기와 사례 카드를 전환 직전에 배치합니다.', searchKeywords: '사회적 증거 후기 사례 숫자' },
  { name: '오픈 카트', category: '구매전환', categoryKey: 'conversion', desc: '정해진 기간 동안 강의, 코칭, 구독 상품 판매를 여는 런칭 단계입니다.', use: '3단계 프리런칭 영상 후 정식 신청을 엽니다.', searchKeywords: '오픈 카트 open cart 판매 개시 마감' },
  { name: '자동화 시퀀스', category: '자동화', categoryKey: 'automation', desc: '신청 후 정해진 순서대로 문자, 카카오톡, 이메일, 영상 링크가 발송되는 흐름입니다.', use: '1.0, 2.0, 3.0 영상과 판매 페이지를 순서대로 보냅니다.', searchKeywords: '자동화 시퀀스 문자 카카오 이메일' },
  { name: '콘텐츠 허브', category: '콘텐츠', categoryKey: 'content', desc: '하나의 핵심 주제 아래 여러 글을 묶어 검색엔진과 사용자가 전문성을 이해하게 만드는 구조입니다.', use: 'AI 마케팅, SEO, 전환, 자동화 주제를 허브로 나눕니다.', searchKeywords: '콘텐츠 허브 blog hub cluster topic' },
  { name: '훅', category: '콘텐츠', categoryKey: 'content', desc: '첫 3초 또는 첫 문장에서 시선을 붙잡는 문장입니다. 문제, 숫자, 반전, 손실 회피가 자주 쓰입니다.', use: '“새 툴이 나올 때마다 또 배우실 건가요?”처럼 시작합니다.', searchKeywords: '훅 hook 3초 후킹' },
  { name: '헤드라인', category: '구매전환', categoryKey: 'conversion', desc: '페이지에서 가장 먼저 읽히는 핵심 문장입니다. 누가, 어떤 문제를, 어떤 결과로 해결하는지 보여줘야 합니다.', use: '“100개의 AI 도구보다 중요한 건, 단 하나의 판매 구조입니다.”', searchKeywords: '헤드라인 headline 제목' },
  { name: '이메일 마케팅', category: '자동화', categoryKey: 'automation', desc: '이메일로 구독자에게 소식, 혜택, 교육 콘텐츠를 정기적으로 보내 관계와 매출을 함께 만드는 채널입니다.', use: '무료 PDF 신청자에게 3일간 교육 이메일을 자동 발송합니다.', searchKeywords: '이메일 마케팅 email marketing 뉴스레터' },
  { name: '인바운드 마케팅', category: '콘텐츠', categoryKey: 'content', desc: '광고로 쫓아가는 대신 콘텐츠와 정보로 잠재고객이 스스로 찾아오게 만드는 마케팅 방식입니다.', use: '블로그와 용어집처럼 검색으로 찾아오는 콘텐츠를 먼저 쌓습니다.', searchKeywords: '인바운드 마케팅 inbound marketing 허브스팟' },
  { name: '콘텐츠 마케팅', category: '콘텐츠', categoryKey: 'content', desc: '제품을 직접 팔지 않고 유용한 정보를 꾸준히 제공해 신뢰와 검색 유입을 함께 쌓는 전략입니다.', use: '블로그 30개 이상을 주제 허브로 묶어 꾸준히 발행합니다.', searchKeywords: '콘텐츠 마케팅 content marketing' },
  { name: '다이렉트 리스폰스', category: '구매전환', categoryKey: 'conversion', desc: '막연한 브랜드 인지도가 아니라 지금 바로 신청, 문의, 구매 같은 즉각 반응을 목표로 설계하는 마케팅입니다.', use: '모든 페이지 끝에 하나의 명확한 다음 행동(CTA)만 남깁니다.', searchKeywords: '다이렉트 리스폰스 direct response marketing 즉각반응' },
  { name: '그로스 해킹', category: '구매전환', categoryKey: 'conversion', desc: '적은 예산으로 빠른 실험과 데이터 분석을 반복해 성장 지점을 찾아내는 마케팅 접근법입니다.', use: '헤드라인, 가격, 순서를 매주 A/B 테스트로 검증합니다.', searchKeywords: '그로스 해킹 growth hacking 성장실험' },
  { name: 'ROAS', category: '구매전환', categoryKey: 'conversion', desc: '광고비 1원당 얼마의 매출이 발생했는지 보여주는 광고 성과 지표입니다.', use: '무료 콘텐츠로 유입을 늘려 광고 의존도와 ROAS 부담을 함께 낮춥니다.', searchKeywords: 'ROAS return on ad spend 광고비대비매출' },
  { name: '이탈률', category: '구매전환', categoryKey: 'conversion', desc: '일정 기간 동안 구독이나 서비스 이용을 그만둔 고객의 비율입니다.', use: '에이전트 구독 고객에게 매달 새 프롬프트를 추가해 이탈률을 낮춥니다.', searchKeywords: '이탈률 churn rate 해지율' },
  { name: 'E-E-A-T', category: '검색 노출', categoryKey: 'search', desc: '경험, 전문성, 권위성, 신뢰성을 뜻하는 구글의 콘텐츠 품질 평가 기준입니다.', use: '실제 적용 사례와 운영자 경력을 각 글에 함께 표기합니다.', searchKeywords: 'E-E-A-T EEAT 경험 전문성 권위성 신뢰성' },
  { name: '제로클릭 검색', category: '검색 노출', categoryKey: 'search', desc: '검색 결과 화면의 AI 요약이나 정보 박스에서 바로 답을 확인하고 사이트를 클릭하지 않는 검색 행태입니다.', use: '핵심 정의를 첫 문단에 먼저 둬 AI 요약에도 인용되게 합니다.', searchKeywords: '제로클릭 검색 zero click search AI 요약' },
  { name: 'NPS', category: '구매전환', categoryKey: 'conversion', desc: '고객이 이 서비스를 주변에 추천할 의향이 얼마나 되는지 0~10점으로 측정하는 지표입니다.', use: '수강 후기 요청 시 추천 점수와 이유를 함께 받아 사례로 씁니다.', searchKeywords: 'NPS net promoter score 순추천지수' },
  { name: '코호트 분석', category: '구매전환', categoryKey: 'conversion', desc: '같은 시기에 시작한 고객 그룹을 묶어 시간이 지나며 어떻게 행동하는지 비교하는 분석 방법입니다.', use: '1기, 2기 수강생 그룹별로 완주율과 재구매율을 비교합니다.', searchKeywords: '코호트 분석 cohort analysis 그룹분석' },
  { name: '어트리뷰션', category: '자동화', categoryKey: 'automation', desc: '고객이 구매까지 오는 동안 어떤 채널과 접점이 실제로 기여했는지 배분해 분석하는 방법입니다.', use: '신청서에 유입 경로를 남겨 블로그·유튜브·이메일 기여도를 비교합니다.', searchKeywords: '어트리뷰션 attribution 기여도 분석' },
  { name: '프리미엄', category: '구매전환', categoryKey: 'conversion', desc: '기본 기능은 무료로 제공하고, 더 깊은 기능이나 콘텐츠는 유료로 여는 가격 구조입니다.', use: '무료 진단과 가이드는 열어두고, 강의와 에이전트 구독은 유료로 운영합니다.', searchKeywords: '프리미엄 freemium 무료유료' },
  { name: '마케팅 오토메이션', category: '자동화', categoryKey: 'automation', desc: '이메일, 문자, 카카오 메시지 같은 반복 마케팅 업무를 조건에 따라 자동으로 실행하는 시스템입니다.', use: '신청 즉시 안내, 3일 후 리마인드, 7일 후 오퍼가 자동으로 나갑니다.', searchKeywords: '마케팅 오토메이션 marketing automation' },
  { name: '세그멘테이션', category: '자동화', categoryKey: 'automation', desc: '고객을 관심사, 행동, 구매 단계에 따라 그룹으로 나눠 각각 다른 메시지를 보내는 방법입니다.', use: '무료 PDF만 받은 그룹과 강의 구매 그룹에 다른 메시지를 보냅니다.', searchKeywords: '세그멘테이션 segmentation 고객분류' },
  { name: '옴니채널', category: '자동화', categoryKey: 'automation', desc: '블로그, 유튜브, 카카오, 이메일 등 여러 채널에서 일관된 메시지로 고객 경험을 이어주는 전략입니다.', use: '하나의 핵심 메시지를 블로그, 쇼츠, 카카오 채널에 동일한 톤으로 재구성합니다.', searchKeywords: '옴니채널 omnichannel 채널통합' },
];

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

export default function MarketingGlossaryPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  useEffect(() => {
    document.title = `AI 마케팅 용어집 | ${SITE_NAME}`;
    setMeta('description', GLOSSARY_DESCRIPTION);
    setMeta('keywords', 'AI 마케팅, SEO, AEO, GEO, 랜딩페이지, 구매전환, 리드 수집, 세일즈 퍼널');
    setMeta('robots', 'index, follow');
    setOg('og:type', 'website');
    setOg('og:title', `AI 마케팅 용어집 | ${SITE_NAME}`);
    setOg('og:description', GLOSSARY_DESCRIPTION);
    setOg('og:url', `${SITE_URL}/marketing-glossary`);
    setOg('og:site_name', SITE_NAME);
    setOg('og:locale', 'ko_KR');
    setCanonical(`${SITE_URL}/marketing-glossary`);

    // defined terms JSON-LD
    setJsonLd('glossary-defined-terms-schema', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/marketing-glossary#webpage`,
          url: `${SITE_URL}/marketing-glossary`,
          name: `AI 마케팅 용어집 | ${SITE_NAME}`,
          description: GLOSSARY_DESCRIPTION,
          inLanguage: 'ko-KR',
          isPartOf: {
            '@type': 'WebSite',
            name: 'GrowthAI',
            url: SITE_URL
          }
        },
        {
          '@type': 'DefinedTermSet',
          '@id': `${SITE_URL}/marketing-glossary#terms`,
          name: 'GrowthAI AI 마케팅 용어집',
          hasDefinedTerm: TERMS.map(term => ({
            '@type': 'DefinedTerm',
            name: term.name,
            description: term.desc
          }))
        }
      ]
    });
  }, []);

  const handleCopyLink = (termName: string) => {
    const link = `${window.location.origin}/marketing-glossary#${encodeURIComponent(termName)}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedTerm(termName);
      setTimeout(() => setCopiedTerm(null), 2000);
    });
  };

  const getCategoryIcon = (category: Term['category']) => {
    switch (category) {
      case '구매전환': return <Target size={18} strokeWidth={2} />;
      case '검색 노출': return <SearchIcon size={18} strokeWidth={2} />;
      case '자동화': return <Zap size={18} strokeWidth={2} />;
      case '콘텐츠': return <FileText size={18} strokeWidth={2} />;
    }
  };

  // 필터링
  const filteredTerms = TERMS.filter(term => {
    const matchesCategory = activeCategory === '전체' || term.category === activeCategory;
    const cleanQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = !cleanQuery || 
      term.name.toLowerCase().includes(cleanQuery) ||
      term.desc.toLowerCase().includes(cleanQuery) ||
      term.use.toLowerCase().includes(cleanQuery) ||
      term.searchKeywords.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      {/* 백그라운드 그라디언트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,168,76,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* 상단 헤더 영역 */}
        <div className="max-w-3xl mb-12">
          {/* 브레드크럼 */}
          <div className="flex items-center gap-2 text-white/30 text-[12px] sm:text-[13px] mb-5 font-medium">
            <Link to="/" className="hover:text-white transition-colors">홈</Link>
            <span className="text-white/15">/</span>
            <span className="text-white/70">AI 마케팅 용어집</span>
          </div>

          <h1 className="font-bold text-white leading-toss-heading tracking-toss mb-4" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)' }}>
            AI 마케팅 용어집
          </h1>
          <p className="text-white/45 text-[14px] sm:text-[15px] leading-relaxed break-keep">
            검색 노출(SEO/AEO/GEO), 구매 전환율 개선, 자동화 퍼널 구축에 핵심이 되는 용어들을 
            한국 1인 창업가와 소상공인의 실전 활용 관점에 맞추어 명확하게 정리했습니다.
          </p>
        </div>

        {/* 검색창 */}
        <div className="max-w-md relative mb-10">
          <input
            type="text"
            placeholder="용어 검색: SEO, CTA, 랜딩페이지..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-3.5 bg-white/[0.02] border border-white/8 rounded-2xl text-[14px] text-white placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/[0.04] transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
        </div>

        {/* 메인 레이아웃 (좌: 필터메뉴, 우: 용어 그리드) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 데스크탑 사이드바 필터 */}
          <aside className="hidden lg:flex flex-col gap-7 w-52 shrink-0 sticky top-24">
            <div>
              <p className="text-white/30 text-[11px] tracking-[0.18em] uppercase font-semibold mb-3">카테고리</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer border-none ${
                      activeCategory === cat ? 'bg-white/10 text-white' : 'bg-transparent text-white/45 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 모바일 필터 버튼 */}
          <div className="flex lg:hidden w-full items-center justify-between mb-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-white/60 hover:text-white text-[13px] font-medium cursor-pointer bg-transparent border border-white/10 rounded-xl px-3 py-2 transition-colors"
            >
              <SlidersHorizontal size={14} strokeWidth={2} />
              분류 필터
              {activeCategory !== '전체' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              )}
            </button>
            <span className="text-white/30 text-[13px]">{filteredTerms.length}개 용어</span>
          </div>

          {/* 모바일 필터 드롭다운 */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                className="lg:hidden w-full mb-4 p-5 border border-white/10 bg-white/[0.02] rounded-2xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-white/30 text-[11px] tracking-widest uppercase font-semibold mb-3">카테고리</p>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setSidebarOpen(false); }}
                      className={`text-left px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer border-none ${
                        activeCategory === cat ? 'bg-white/10 text-white' : 'bg-transparent text-white/45'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 용어 그리드 영역 */}
          <div className="flex-1 min-w-0 w-full">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <span className="text-white/30 text-[13px]">{filteredTerms.length}개 용어</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filteredTerms.map((term, i) => (
                  <motion.article
                    key={term.name}
                    id={term.name}
                    className="p-6 border border-white/8 bg-white/[0.01] rounded-2xl hover:border-white/20 hover:bg-white/[0.025] transition-all flex flex-col justify-between group scroll-mt-24"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.02 }}
                  >
                    <div>
                      {/* 카테고리 헤더 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] text-white/60">
                            {getCategoryIcon(term.category)}
                          </div>
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catColors[term.category]}`}>
                            {term.category}
                          </span>
                        </div>
                        {/* 용어 주소 복사 링크 */}
                        <button
                          onClick={() => handleCopyLink(term.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-[#C9A84C] text-[11px] bg-transparent border-none cursor-pointer flex items-center gap-1"
                          title="용어 고유 주소 복사"
                        >
                          {copiedTerm === term.name ? (
                            <>
                              <Check size={11} className="text-green-400" />
                              <span className="text-green-400 font-medium">복사됨</span>
                            </>
                          ) : (
                            <span>링크 복사</span>
                          )}
                        </button>
                      </div>

                      {/* 용어명 */}
                      <h3 className="apple-white-gradient font-bold text-[17px] mb-2.5 text-white font-sans">
                        {term.name}
                      </h3>

                      {/* 상세 정의 */}
                      <p className="text-white/50 text-[13px] leading-relaxed mb-4">
                        {term.desc}
                      </p>
                    </div>

                    {/* GrowthAI 적용법 */}
                    <div className="mt-4 pt-3.5 border-t border-white/5">
                      <p className="text-white/40 text-[12px] leading-normal">
                        <strong className="text-[#C9A84C]/90 font-semibold mr-1">GrowthAI 적용:</strong>
                        {term.use}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* 결과 없음 */}
            {filteredTerms.length === 0 && (
              <div className="text-center py-24 border border-dashed border-white/8 rounded-2xl">
                <p className="text-white/20 text-[15px]">검색 결과가 없습니다.</p>
                <button
                  onClick={() => { setActiveCategory('전체'); setSearchQuery(''); }}
                  className="mt-4 text-white/45 hover:text-white text-[13px] underline cursor-pointer bg-transparent border-none"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 하단 검색 가이드라인 (어떻게 검색에 노출되는가) */}
        <section className="mt-24 pt-16 border-t border-white/8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <span className="text-[#C9A84C] text-[11px] font-bold tracking-widest uppercase mb-3 block">검색 최적화 적용법</span>
              <h2 className="text-[20px] font-bold text-white leading-snug break-keep">
                용어를 바르게 알고 구조를 짜면 검색 노출과 판매 전환이 달라집니다.
              </h2>
              <p className="text-white/45 text-[13px] mt-4 leading-relaxed break-keep">
                정보 과잉 시대의 노출(SEO/AEO/GEO)은 키워드 남발이 아닌, 사용자의 검색 의도에 맞춘 명확한 구조화 데이터를 쌓는 일부터 출발합니다.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: '1. 제목과 핵심 내용을 일치시키기', text: '작성하는 글의 최상단 핵심 주제어와 본문, 내부링크가 명확히 하나의 맥락을 통과해야 합니다.' },
                { title: '2. 두괄식 답변 우선 배치', text: '검색 로봇과 생성형 AI는 긴 서론보다, 질문 뒤에 곧장 이어지는 깔끔한 정의를 가장 신뢰도 높은 답변 후보로 추천합니다.' },
                { title: '3. 멀티미디어 보완 설명', text: '이미지, 영상, 차트 등을 추가할 때는 파일 이름, alt 태그, 캡션 등을 성실히 채워 기계가 그 의미를 이해할 수 있도록 도와줍니다.' },
                { title: '4. 맥락 있는 내부 링크 연결', text: '정보를 얻은 유저가 자연스럽게 더 자세한 가이드, 리드 마그넷, 혹은 관련 교육 상품으로 흘러갈 수 있게 통로를 열어두어야 합니다.' },
              ].map((item, index) => (
                <div key={index} className="p-5 rounded-2xl border border-white/6 bg-white/[0.005]">
                  <h3 className="text-[14px] font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/45 text-[12.5px] leading-relaxed break-keep">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}