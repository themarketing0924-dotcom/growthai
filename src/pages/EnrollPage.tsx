/**
 * EnrollPage — 수강 신청
 * 강의 카드: Neil Patel Blog 스타일 (블로그형 카드 그리드)
 * 클릭 시 /course/:slug 랜딩 페이지로 이동
 * 결제창: GPT 33종 하단 (PayPal + Toss)
 */
import { useState, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Clock, Users, BookOpen, Check, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PayPalCheckoutButton from '../components/payment/PayPalCheckoutButton';
import TossCheckoutButton from '../components/payment/TossCheckoutButton';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../lib/paypal';
import { TOSS_PRODUCTS } from '../lib/toss';
import { createOrder } from '../lib/firestore';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── 강의 카드 데이터 (좌→우: 가격 오름차순) ─── */
const COURSES = [
  {
    slug: 'monthly',
    category: 'MEMBERSHIP',
    categoryColor: '#8B7FD4',
    badge: '💎 월간 구독',
    title: 'AI 프롬프트 마스터 멤버십',
    subtitle: '매주 신규 프롬프트 · 트렌드 리포트',
    desc: '매주 새로운 AI 프롬프트 템플릿과 유튜브 알고리즘 분석 리포트를 받아보세요. 수강생 전용 Q&A 채널 포함.',
    price: '₩49,000',
    priceUsd: '$39',
    period: '/ 월',
    students: '850+',
    lessons: '매주 업데이트',
    hours: '무제한',
    tags: ['프롬프트', '트렌드', 'Q&A', '템플릿'],
    gradient: 'linear-gradient(135deg, #0a0a14 0%, #0f0a1a 50%, #0a0a14 100%)',
    accentEmoji: '📡',
    featured: false,
  },
  {
    slug: 'bootcamp',
    category: 'BESTSELLER',
    categoryColor: '#C9A84C',
    badge: '🔥 인기 강의',
    title: 'AI 1인 기업 완전 정복',
    subtitle: '배포 · DB · 결제 · 마케팅 4단계 교과',
    desc: '코딩 없이 AI로 1인 기업을 구축하는 완전한 로드맵. 배포부터 결제 시스템, AI 마케팅까지 실전으로 배웁니다.',
    price: '₩490,000',
    priceUsd: '$360',
    period: '평생 수강',
    students: '1,200+',
    lessons: '47개',
    hours: '44시간',
    tags: ['ChatGPT', 'Vercel', 'Firebase', 'N8N'],
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1000 50%, #0d0d0d 100%)',
    accentEmoji: '🚀',
    featured: true,
  },
  {
    slug: 'vvip',
    category: 'PREMIUM',
    categoryColor: '#D4AF37',
    badge: '👑 VVIP 전용',
    title: 'VVIP 1:1 마스터클래스',
    subtitle: '개인 맞춤 코칭 + 수익화 로드맵 설계',
    desc: '1:1 개인 코칭으로 나만의 AI 비즈니스 수익화 로드맵을 설계합니다. 프라이빗 마스터마인드 네트워크 포함.',
    price: '₩2,900,000',
    priceUsd: '$2,190',
    period: '1:1 코칭 포함',
    students: '30명 제한',
    lessons: '전체 포함',
    hours: '1:1 60분 × 8',
    tags: ['1:1코칭', 'VVIP', '에이전트', '전략'],
    gradient: 'linear-gradient(135deg, #0d0a00 0%, #1a1200 50%, #0d0a00 100%)',
    accentEmoji: '✦',
    featured: false,
  },
];

/* ─── 결제 플랜 데이터 ─── */
const PAYMENT_PLANS = [
  {
    slug: 'monthly',
    label: '월간 멤버십 (구독)',
    price: '₩49,000',
    priceNote: '/ $39 · 월',
    desc: '매주 신규 템플릿과 프롬프트 분석 리포트 정기 구독.',
    features: [
      '매주 실전 프롬프트 템플릿',
      '유튜브 최신 트렌드·알고리즘 리포트',
      '수강생 전용 비공개 Q&A',
    ],
    tossProduct: TOSS_PRODUCTS[2],
    paypalPlanId: SUBSCRIPTION_PLANS[0].planId,
    paypalProductId: SUBSCRIPTION_PLANS[0].id,
    paypalProductName: SUBSCRIPTION_PLANS[0].name,
    paypalProductPrice: SUBSCRIPTION_PLANS[0].price,
    featured: false,
  },
  {
    slug: 'bootcamp',
    label: '유튜브 숏폼 실전반',
    price: '₩490,000',
    priceNote: '/ $360 · 평생 소장',
    desc: '대본 작성부터 컷 편집, AI 나레이션까지 초고속 마스터.',
    features: [
      'AI 영상 제작 전 과정 실습',
      '유튜브 알고리즘 및 셋업 치트키',
      '필수 프롬프트 템플릿 라이브러리',
      'GPT 33종 도구 평생 접근',
    ],
    tossProduct: TOSS_PRODUCTS[0],
    paypalProduct: PRODUCTS[0],
    paypalProductId: PRODUCTS[0].id,
    paypalProductName: PRODUCTS[0].name,
    paypalProductPrice: PRODUCTS[0].price,
    featured: true,
  },
  {
    slug: 'vvip',
    label: 'VVIP 마스터클래스',
    price: '₩2,900,000',
    priceNote: '/ $2,190',
    desc: '1:1 맞춤 컨설팅 및 에이전트 구축 등 종합 스케일업.',
    features: [
      '실전 코스 전체 포함 + 무이자 12개월',
      '1:1 마케팅 전략 맞춤형 코칭',
      '비공개 마스터마인드 모임 초대',
      'AI 1인 기업 자동화 에이전트 설계',
    ],
    tossProduct: TOSS_PRODUCTS[1],
    paypalProduct: PRODUCTS[1],
    paypalProductId: PRODUCTS[1].id,
    paypalProductName: PRODUCTS[1].name,
    paypalProductPrice: PRODUCTS[1].price,
    featured: false,
  },
];

/* ─── 33종 GPT 도구 ─── */
interface GptTool { no: number; title: string; cat: string; emoji: string; desc: string; benefits: string[]; price: string; priceUsd: string }
const GPT_TOOLS: GptTool[] = [
  { no: 1,  title: '전자책 출판 지원 솔루션',           cat: '전자책·논문',        emoji: '📚',
    desc: '기획부터 출판까지 단계별 맞춤 가이드로 전자책을 완성합니다.',
    benefits: ['기획·목차·본문 단계별 완성 가이드', '판매 플랫폼 최적화 전략 제공', '30분 내 전자책 초안 완성'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 2,  title: '전자책 출간 코치',                   cat: '전자책·논문',        emoji: '📖',
    desc: '전자책 판매 전략과 마케팅 방법을 전문 코치처럼 안내합니다.',
    benefits: ['채널별 맞춤 판매 전략 수립', '독자 타겟 분석 및 포지셔닝', '수익화 로드맵 단계별 안내'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 3,  title: '기존 원고 기반 전자책 제작',         cat: '전자책·논문',        emoji: '📄',
    desc: '보유한 원고를 전자책으로 변환하고 구성을 최적화합니다.',
    benefits: ['원고 자동 재구성 및 편집 지원', '전자책 포맷 변환 자동화', '표지·목차 레이아웃 설계'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 4,  title: '처음부터 전자책 제작 1',             cat: '전자책·논문',        emoji: '✏️',
    desc: '주제 선정부터 목차 작성까지 제로베이스로 시작합니다.',
    benefits: ['주제 선정 및 시장성 검증 자동화', '독창적 목차 구조 AI 설계', '초보자도 즉시 시작 가능'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 5,  title: '처음부터 전자책 제작 2',             cat: '전자책·논문',        emoji: '📝',
    desc: '본문 작성과 편집, 표지 방향까지 완성도 있게 마무리합니다.',
    benefits: ['챕터별 본문 자동 작성 지원', '전문가 수준 편집 가이드 제공', '완성본 품질 체크리스트 포함'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 6,  title: '전자책 삽화 생성기',                 cat: '전자책·논문',        emoji: '🎨',
    desc: 'AI로 전자책에 어울리는 삽화와 이미지를 자동 생성합니다.',
    benefits: ['콘텐츠 맞춤 삽화 즉시 생성', '다양한 아트 스타일 선택 가능', '상업적 활용 최적화 출력'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 7,  title: '논문 작성 - AI·공학·데이터 연구',   cat: '전자책·논문',        emoji: '🔬',
    desc: '공학·데이터 분야 논문의 구조와 본문을 AI로 작성합니다.',
    benefits: ['연구 구조 및 목차 자동 설계', '데이터 분석 섹션 작성 지원', '학술 참고문헌 형식 자동화'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 8,  title: '논문 작성 솔루션 - 교육·인문·공학', cat: '전자책·논문',        emoji: '🎓',
    desc: '교육·인문 계열 논문을 위한 맞춤형 작성 솔루션입니다.',
    benefits: ['논리적 본문 구성 자동화', '문헌 검토 섹션 자동 작성', '교수 피드백 대응 전략 포함'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 9,  title: '쇼트폼 60 프레임워크',               cat: '쇼트폼·홍보',       emoji: '🎬',
    desc: '60초 안에 시청자를 사로잡는 숏폼 구조 공식을 적용합니다.',
    benefits: ['60초 완성 바이럴 구조 공식', '훅·바디·CTA 자동 설계', '플랫폼별 최적화 버전 생성'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 10, title: '바이럴 숏폼 대본 자동화 STEP 1',    cat: '쇼트폼·홍보',       emoji: '📣',
    desc: '알고리즘 타는 바이럴 숏폼 대본을 AI가 자동으로 생성합니다.',
    benefits: ['알고리즘 반응 훅 문장 자동 생성', '감정 유발 스토리라인 설계', '클릭률 극대화 오프닝 구성'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 11, title: '쇼츠 영상 프롬프트 마스터 STEP 2',  cat: '쇼트폼·홍보',       emoji: '🎥',
    desc: '쇼츠 영상 제작을 위한 완성형 프롬프트를 단계별로 설계합니다.',
    benefits: ['영상 제작 완성형 프롬프트 제공', '캐릭터·배경·나레이션 일체화', 'AI 영상 도구 연동 최적화'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 12, title: '쇼츠 설정 수집기',                   cat: '쇼트폼·홍보',       emoji: '📊',
    desc: '유튜브 쇼츠 최적화를 위한 핵심 설정값을 수집하고 분석합니다.',
    benefits: ['채널 최적화 핵심 설정값 분석', '알고리즘 반응 설정 자동 추천', '경쟁 채널 데이터 수집·비교'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 13, title: '소상공인 홍보물 제작 솔루션',         cat: '쇼트폼·홍보',       emoji: '🏪',
    desc: '소상공인 맞춤형 홍보 콘텐츠를 빠르고 효과적으로 제작합니다.',
    benefits: ['업종별 맞춤 홍보 템플릿 제공', 'SNS·전단·배너 일괄 제작 가능', '즉시 사용 가능한 완성 콘텐츠'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 14, title: '기독교 홍보물 제작 솔루션',           cat: '쇼트폼·홍보',       emoji: '✝️',
    desc: '교회·기독교 단체를 위한 전문 홍보물을 손쉽게 제작합니다.',
    benefits: ['교회 행사 홍보물 전문 설계', '성경 구절 연동 디자인 적용', '신도·지역사회 타겟 맞춤 메시지'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 15, title: '챗GPT 이미지 수정',                  cat: '이미지·비주얼',     emoji: '🖼️',
    desc: 'ChatGPT를 활용하여 기존 이미지를 원하는 대로 수정·편집합니다.',
    benefits: ['기존 이미지 AI 수정·편집 자동화', '배경·색상·요소 정밀 변경', '상업용 품질 결과물 즉시 출력'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 16, title: '이미지 속 글자 수정',                cat: '이미지·비주얼',     emoji: '✍️',
    desc: '이미지 안의 텍스트를 정확하게 수정하고 교체합니다.',
    benefits: ['이미지 내 텍스트 정밀 교체', '폰트·색상·위치 원본 유지', '다국어 텍스트 처리 지원'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 17, title: '만화 프롬프트 메이커',               cat: '이미지·비주얼',     emoji: '🎭',
    desc: '캐릭터와 스토리를 담은 만화 스타일 이미지 프롬프트를 생성합니다.',
    benefits: ['캐릭터 설정 자동 생성 지원', '스토리 패널 구성 AI 설계', '웹툰·SNS 최적화 스타일 제공'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 19, title: '문장 기반 삽화 생성',                cat: '이미지·비주얼',     emoji: '🖌️',
    desc: '문장을 입력하면 내용에 딱 맞는 삽화를 자동으로 생성합니다.',
    benefits: ['텍스트 입력 즉시 맞춤 삽화 생성', '콘텐츠 맥락 자동 해석·반영', '블로그·SNS 즉시 활용 가능'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 23, title: '비포애프터 이미지 프롬프트',         cat: '이미지·비주얼',     emoji: '🔄',
    desc: '변화 전후를 극적으로 보여주는 비포&애프터 이미지를 설계합니다.',
    benefits: ['변화 전후 극적 연출 자동 설계', '마케팅 전환율 극대화 구성', 'SNS 바이럴 최적화 이미지'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 27, title: '대표 이미지 프롬프트 빌더',          cat: '이미지·비주얼',     emoji: '🌟',
    desc: '콘텐츠 대표 썸네일과 커버 이미지를 위한 프롬프트를 완성합니다.',
    benefits: ['클릭률 높은 썸네일 구성 설계', '브랜드 일관성 유지 가이드', '플랫폼별 최적 사이즈 자동 적용'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 28, title: '도식화 프롬프트 설계',               cat: '이미지·비주얼',     emoji: '📐',
    desc: '복잡한 정보를 한눈에 보이는 도식 이미지로 표현합니다.',
    benefits: ['복잡한 정보 시각화 자동화', '인포그래픽 구성 요소 AI 설계', '발표·보고서 즉시 활용 가능'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 29, title: '헤더·도해 이미지 생성기',            cat: '이미지·비주얼',     emoji: '🎯',
    desc: '블로그, SNS, 발표 자료용 헤더 이미지를 자동으로 생성합니다.',
    benefits: ['블로그·SNS 헤더 즉시 생성', '브랜드 컬러 연동 디자인 자동화', '다양한 레이아웃 옵션 선택'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 31, title: '브랜드 로고 솔루션',                 cat: '이미지·비주얼',     emoji: '💎',
    desc: '브랜드 정체성을 담은 전문 로고를 AI로 빠르게 디자인합니다.',
    benefits: ['브랜드 정체성 분석 후 맞춤 설계', '다양한 스타일·컬러 옵션 제공', '고해상도·벡터 출력 지원'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 18, title: '바이브코딩 앱 빌더 (초보자용)',      cat: 'AI 자동화·비즈니스', emoji: '💻',
    desc: '코딩 없이 AI 지시만으로 앱을 만드는 바이브코딩을 실습합니다.',
    benefits: ['코딩 없이 앱 완성 가능', 'AI 지시만으로 기능 추가·수정', '실제 배포 가능한 완성 앱 구현'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 20, title: '감정 보이스',                         cat: 'AI 자동화·비즈니스', emoji: '🎙️',
    desc: '다양한 감정을 담은 AI 나레이션 보이스를 설정하고 활용합니다.',
    benefits: ['다양한 감정 톤 자유 설정', 'AI 나레이션 품질 최적화 가이드', '영상·팟캐스트 즉시 활용'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 21, title: '유튜브 댓글 답글 매니저',             cat: 'AI 자동화·비즈니스', emoji: '💬',
    desc: '유튜브 댓글에 최적화된 진정성 있는 답글을 자동으로 생성합니다.',
    benefits: ['자연스러운 한국어 답글 자동 생성', '구독자 유대감 강화 전략 제공', '악플·질문 유형별 맞춤 대응'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 22, title: '유튜브 설명란·타임라인 자동 생성기', cat: 'AI 자동화·비즈니스', emoji: '⏱️',
    desc: 'SEO 최적화된 유튜브 설명란과 타임코드를 자동으로 생성합니다.',
    benefits: ['SEO 최적화 설명란 자동 작성', '타임코드 자동 생성 및 정렬', '키워드·태그 알고리즘 최적화'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 24, title: '천재 비즈니스 문서 작성',             cat: 'AI 자동화·비즈니스', emoji: '📋',
    desc: '제안서, 보고서, 기획서를 전문가 수준으로 AI가 작성합니다.',
    benefits: ['제안서·보고서·기획서 즉시 완성', '전문가 수준 포맷 자동화', '설득력 있는 비즈니스 언어 적용'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 25, title: '캐릭터 설정 자료 생성기',             cat: 'AI 자동화·비즈니스', emoji: '🦸',
    desc: '콘텐츠에 활용할 AI 캐릭터의 설정과 세계관을 구체적으로 생성합니다.',
    benefits: ['캐릭터 프로필·배경 자동 생성', '스토리 세계관 상세 설계 지원', '콘텐츠 일관성 유지 가이드'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 26, title: '업종별 홍보',                         cat: 'AI 자동화·비즈니스', emoji: '🏆',
    desc: '업종별 특성에 맞는 맞춤형 마케팅 홍보 전략을 제시합니다.',
    benefits: ['업종 특성 분석 맞춤 전략 수립', '고객 타겟 세분화 메시지 설계', '온·오프라인 채널 통합 홍보'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 30, title: '4인 콘텐츠 에이전트',                 cat: 'AI 자동화·비즈니스', emoji: '🤖',
    desc: '4명의 AI 에이전트가 협업하여 완성도 높은 콘텐츠를 생성합니다.',
    benefits: ['4개 AI 에이전트 협업 시스템', '기획·작성·편집·배포 일원화', '콘텐츠 완성 시간 80% 단축'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 32, title: '슬라이드 프롬프트 빌더',              cat: 'AI 자동화·비즈니스', emoji: '🗂️',
    desc: '발표용 슬라이드 제작을 위한 완성형 콘텐츠 프롬프트를 설계합니다.',
    benefits: ['발표 슬라이드 콘텐츠 자동 생성', '스토리텔링 구조 최적화 적용', '청중 맞춤 메시지 및 디자인'],
    price: '₩109,000', priceUsd: '$79' },
  { no: 33, title: '에세이 작성',                         cat: 'AI 자동화·비즈니스', emoji: '📜',
    desc: '주제별 논리적인 구조를 갖춘 에세이를 AI가 단계적으로 작성합니다.',
    benefits: ['논리적 구조 단계별 자동 구성', '주제별 심층 분석 및 근거 제시', '학술·실용 에세이 맞춤 작성'],
    price: '₩109,000', priceUsd: '$79' },
];

const CATS = ['전체', '전자책·논문', '쇼트폼·홍보', '이미지·비주얼', 'AI 자동화·비즈니스'] as const;
type Cat = typeof CATS[number];

/* ─── 강의 썸네일 ─── */
function CourseThumbnail({ course }: { course: typeof COURSES[0] }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ paddingBottom: '56.25%', background: course.gradient }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="absolute"
          style={{
            width: 200, height: 200,
            background: `radial-gradient(circle, ${course.categoryColor}22 0%, transparent 70%)`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <span className="text-[56px] relative z-10" style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }}>
          {course.accentEmoji}
        </span>
        <div
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-black text-[11px] font-bold"
          style={{ backgroundColor: course.categoryColor }}
        >
          <Play size={10} fill="currentColor" />
          맛보기 보기
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-1.5 text-white/50 text-[11px]">
          <Clock size={11} />
          {course.hours}
        </div>
      </div>
    </div>
  );
}

/* ─── Neil Patel 스타일 강의 카드 ─── */
function CourseCard({ course, index }: { course: typeof COURSES[0]; index: number }) {
  const navigate = useNavigate();

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      whileHover={{ borderColor: 'rgba(201,168,76,0.3)', y: -4 }}
      onClick={() => navigate(`/course/${course.slug}`)}
    >
      <div className="overflow-hidden">
        <motion.div className="transition-transform duration-500" whileHover={{ scale: 1.03 }}>
          <CourseThumbnail course={course} />
        </motion.div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color: course.categoryColor }}>
            {course.category}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${course.categoryColor}18`, color: course.categoryColor }}>
            {course.badge}
          </span>
        </div>

        <h2 className="text-white font-extrabold leading-snug mb-1 group-hover:text-white transition-colors" style={{ fontSize: 'clamp(17px, 2.5vw, 22px)' }}>
          {course.title}
        </h2>
        <p className="text-white/35 text-[12px] font-medium mb-3">{course.subtitle}</p>
        <p className="text-white/50 text-[13px] leading-relaxed mb-4 flex-1">{course.desc}</p>

        <div className="flex items-center gap-4 text-white/30 text-[11px] mb-4 pb-4 border-b border-white/6">
          <span className="flex items-center gap-1"><Users size={11} />{course.students}</span>
          <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessons}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{course.hours}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-white/8 text-white/30">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-extrabold text-[20px] tracking-tight">{course.price}</p>
            <p className="text-white/25 text-[11px]">{course.priceUsd} · {course.period}</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all"
            style={{
              backgroundColor: course.featured ? '#C9A84C' : 'rgba(255,255,255,0.08)',
              color: course.featured ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
            }}
          >
            강의 보기
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── 카테고리 컬러 ─── */
const CAT_COLORS: Record<string, string> = {
  '전자책·논문':        '#8B7FD4',
  '쇼트폼·홍보':       '#E05C5C',
  '이미지·비주얼':     '#4AADCC',
  'AI 자동화·비즈니스': '#C9A84C',
};

/* ─── 상품형 GPT 도구 카드 (CourseCard 동일 스타일) ─── */
function GptToolCard({ tool, index }: { tool: GptTool; index: number }) {
  const color = CAT_COLORS[tool.cat] ?? '#C9A84C';
  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ borderColor: `${color}55`, y: -4 }}
    >
      {/* 썸네일 */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}28 0%, #080810 55%, ${color}14 100%)` }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute" style={{ width: 160, height: 160, background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <span className="text-[56px] relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ filter: `drop-shadow(0 0 20px ${color}90)` }}>
            {tool.emoji}
          </span>
          {/* 번호 배지 */}
          <div className="absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg" style={{ backgroundColor: `${color}22`, color, border: `1px solid ${color}44` }}>
            #{String(tool.no).padStart(2, '0')}
          </div>
          {/* 맛보기 버튼 */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-black text-[11px] font-bold" style={{ backgroundColor: color }}>
            <Play size={10} fill="currentColor" />
            미리보기
          </div>
        </div>
      </div>

      {/* 카드 바디 */}
      <div className="flex flex-col flex-1 p-5">
        {/* 카테고리 + 넘버 */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color }}>
            {tool.cat.split('·')[0]}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${color}18`, color }}>
            GPT #{String(tool.no).padStart(2, '0')}
          </span>
        </div>

        {/* 제목 */}
        <h2 className="text-white font-extrabold leading-snug mb-2 group-hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}>
          {tool.title}
        </h2>

        {/* 설명 */}
        <p className="text-white/50 text-[12px] leading-relaxed mb-4">{tool.desc}</p>

        {/* 특장점 3가지 */}
        <ul className="flex flex-col gap-2.5 mb-5 flex-1">
          {tool.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-white/65">
              <Check size={12} style={{ color, marginTop: 2, flexShrink: 0 }} />
              {b}
            </li>
          ))}
        </ul>

        {/* 가격 + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          <div>
            <p className="text-white font-extrabold text-[20px] tracking-tight">{tool.price}</p>
            <p className="text-white/25 text-[11px]">{tool.priceUsd} · 1회 구매 평생 사용</p>
          </div>
          <motion.button
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-bold border-none cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${color} 0%, #EED98A 100%)`, color: '#0a0a0a' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            구매하기
            <ArrowRight size={13} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── 결제 플랜 카드 ─── */
function PaymentCard({
  plan,
  onPayPalSuccess,
  index,
}: {
  plan: typeof PAYMENT_PLANS[0];
  onPayPalSuccess: (details: any, id: string, name: string, price: string) => void;
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col rounded-2xl border bg-white/[0.015] overflow-hidden relative"
      style={{ borderColor: plan.featured ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)' }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {plan.featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="text-black text-[11px] font-extrabold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: '#C9A84C' }}>
            인기 과정
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col gap-4">
        {/* 헤더: 플랜명 + 설명 */}
        <div>
          <p className="text-white/40 text-[11px] tracking-[0.15em] uppercase mb-2">{plan.label}</p>
          <p className="text-white/50 text-[13px] leading-relaxed">{plan.desc}</p>
        </div>

        {/* 가격 + 결제 버튼 (가격 바로 아래 버튼) */}
        <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
          {/* 가격 */}
          <div>
            <p className="text-white font-extrabold text-[34px] tracking-tight leading-none">{plan.price}</p>
            <p className="text-white/30 text-[12px] mt-1">{plan.priceNote}</p>
          </div>

          {/* 국내 결제 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-white/30 text-[10px] tracking-[0.18em] uppercase">🇰🇷 국내 결제 (KRW)</p>
            <div className="w-full" style={{ display: 'flex', flexDirection: 'column' }}>
              <TossCheckoutButton product={plan.tossProduct} />
            </div>
          </div>

          {/* 해외 결제 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-white/30 text-[10px] tracking-[0.18em] uppercase">🌏 해외 결제 (USD)</p>
            <div className="w-full" style={{ display: 'flex', flexDirection: 'column' }}>
              {(plan as any).paypalPlanId ? (
                <PayPalCheckoutButton
                  planId={(plan as any).paypalPlanId}
                  onSuccess={(d) => onPayPalSuccess(d, plan.paypalProductId, plan.paypalProductName, plan.paypalProductPrice)}
                  onError={(err) => console.error('PayPal error:', err)}
                />
              ) : (
                <PayPalCheckoutButton
                  product={(plan as any).paypalProduct}
                  onSuccess={(d) => onPayPalSuccess(d, plan.paypalProductId, plan.paypalProductName, plan.paypalProductPrice)}
                  onError={(err) => console.error('PayPal error:', err)}
                />
              )}
            </div>
          </div>
        </div>

        {/* 혜택 목록 — 버튼 아래 */}
        <ul className="flex flex-col gap-2 border-t border-white/6 pt-3">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-white/50">
              <Check size={12} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── 메인 컴포넌트 ─── */
export default function EnrollPage({ lang: _lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const [activeCat, setActiveCat] = useState<Cat>('전체');
  const { user } = useAuth();
  /* 히어로 패럴랙스 — 배경 글로우만 */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filteredTools = activeCat === '전체'
    ? GPT_TOOLS
    : GPT_TOOLS.filter(t => t.cat === activeCat);

  const handlePayPalSuccess = useCallback(
    async (details: any, productId: string, productName: string, amount: string) => {
      const orderId = details.id || `pp_${Date.now()}`;
      try {
        await createOrder({
          id: orderId,
          userId: user?.uid || 'anonymous',
          productId,
          productName,
          amount: parseFloat(amount),
          currency: 'USD',
          status: 'completed',
          paypalOrderId: orderId,
          paypalPayerId: details.payer?.payer_id || '',
        });
        alert(`✅ 결제가 완료되었습니다! 주문번호: ${orderId}`);
      } catch {
        alert(`결제는 완료됐지만 저장에 실패했습니다. 주문번호: ${orderId}`);
      }
    },
    [user]
  );

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title="수강 신청 | GrowthAI"
        description="AI 마케팅과 자동화 실전 강의를 선택하고 바로 구매할 수 있는 수강 신청 페이지입니다."
        canonical="/enroll"
        image={DEFAULT_OG_IMAGE}
        keywords={['수강 신청', 'AI 강의', 'GrowthAI', '구매 전환']}
      />

      {/* ══ 히어로 — Apple iPhone 17 Pro 스타일 ══ */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center overflow-hidden px-5 sm:px-6 bg-black pt-28 pb-16 sm:pt-0 sm:pb-0 sm:min-h-[100dvh]"
      >
        <video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  className="absolute inset-0 h-full w-full object-cover"
>
  <source src="/videos/enroll-hero.mp4" type="video/mp4" />
</video>

<div className="absolute inset-0 bg-black/55" />
        {/* 배경 글로우 레이어 (패럴랙스) */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY }}>
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(900px, 130vw)', height: '500px', background: 'radial-gradient(ellipse, rgba(201,168,76,0.10) 0%, transparent 65%)', filter: 'blur(90px)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(100,60,220,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase mb-4 sm:mb-6" style={{ color: '#C9A84C' }}>
            GrowthAI · 1인 기업 AI 자동화 시스템
          </p>

          {/* ★ 메인 타이틀 */}
          <h1
            className="font-extrabold tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(32px, 5.5vw, 68px)' }}
          >
            <span className="text-white">누구나 코딩 없이 AI로</span><br />
            <motion.span
              style={{
                backgroundImage: 'linear-gradient(90deg, #EED98A 0%, #C9A84C 35%, #EED98A 70%, #C9A84C 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}
              animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            >
              수익 자동화를 완성합니다.
            </motion.span>
          </h1>

          {/* 서브카피 */}
          <p
            className="max-w-xl mx-auto leading-relaxed mb-8 sm:mb-14 text-white/40"
            style={{ fontSize: 'clamp(13px, 1.8vw, 17px)', letterSpacing: '-0.01em' }}
          >
            33종 AI 전문 도구 + 강의 커리큘럼.<br />
            1,200명이 검증한 1인 기업 로드맵을 지금 시작하세요.
          </p>

          {/* 신뢰 지표 — 숫자 3개 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-16 max-w-xs sm:max-w-xl mx-auto">
            {[
              { value: '1,200+', label: '검증된 수강생' },
              { value: '4.9', label: '수강생 만족도' },
              { value: '2권', label: '베스트셀러 저서' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span
                  className="font-extrabold tracking-tight leading-none"
                  style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', color: '#C9A84C' }}
                >
                  {value}
                </span>
                <span className="text-[11px] sm:text-[12px] tracking-wide text-white/30">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 스크롤 유도 바운스 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          animate={{ y: [0, 8, 0], opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', opacity: { delay: 1.8, duration: 0.8 } }}
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#C9A84C', opacity: 0.5 }}>Scroll</span>
          <ChevronDown size={18} style={{ color: '#C9A84C', opacity: 0.5 }} />
        </motion.div>
      </section>

      {/* ══ 33종 AI GPT 도구 ══ */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="border-t border-white/6 pt-16">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#C9A84C', opacity: 0.8 }}>
              AI GPT TOOLS STORE
            </p>
            <h2 className="apple-white-gradient font-extrabold tracking-tight leading-tight mb-3" style={{ fontSize: 'clamp(22px, 4vw, 34px)' }}>
              AI GPT 전문 도구 <span className="apple-gold-gradient">33종</span>
            </h2>
            <p className="text-white/40 text-[14px]">개별 구매 ₩109,000 · 전체 패키지 구독으로 절약하세요</p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer border hover:border-white/40 hover:text-white/80"
                style={
                  activeCat === cat
                    ? { backgroundColor: '#C9A84C', color: '#0a0a0a', borderColor: '#C9A84C' }
                    : { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)' }
                }
              >
                {cat}
                <span className="ml-1.5 opacity-60">
                  {cat === '전체' ? GPT_TOOLS.length : GPT_TOOLS.filter(t => t.cat === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* 도구 그리드 — 상품형 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {filteredTools.map((tool, i) => (
              <GptToolCard key={tool.no} tool={tool} index={i} />
            ))}
          </div>

          <div className="mt-8 p-5 rounded-2xl border border-white/8 bg-white/[0.02] text-center">
            <p className="text-white/40 text-[13px] leading-relaxed">
              🔑 수강 등록 완료 후 <span className="text-white/70 font-semibold">접속 비밀번호</span>가 이메일로 전달됩니다.<br />
              <span className="text-white/25 text-[11px]">모든 도구는 ChatGPT GPT 링크로 제공 · 별도 설치 불필요</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══ 강의 카드 그리드 ══ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-bold text-[22px] sm:text-[28px] tracking-tight">
            전체 강의 <span className="text-white/25 text-[18px]">{COURSES.length}</span>
          </h2>
          <p className="text-white/30 text-[13px]">클릭하면 맛보기 강의를 무료로 볼 수 있어요</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8">
          {COURSES.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </section>

      {/* ══ 결제 섹션 — 강의 카드와 분리된 독립 CTA ══ */}
      <section className="relative overflow-hidden">
        {/* 배경 글로우 */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.05) 30%, rgba(201,168,76,0.09) 60%, rgba(201,168,76,0.03) 100%)',
        }} />
        {/* 상단 골드 라인 */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.9) 50%, rgba(201,168,76,0.5) 70%, transparent)' }} />
        {/* 코너 장식 */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-28">

          {/* ─ 상단 긴급 카피 ─ */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: '#C9A84C' }}
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              FINAL ENROLLMENT
            </motion.p>
            <h2 className="apple-white-gradient font-extrabold tracking-tight leading-tight mb-5" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
              지금 결제하지 않으면,<br />
              <span className="apple-gold-gradient">경쟁자가 먼저 씁니다.</span>
            </h2>
            <p className="text-white/50 mx-auto" style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', maxWidth: 560, lineHeight: 1.7 }}>
              우리가 수백 시간 연구·개발한 AI 자동화 시스템입니다.<br />
              그 시간을 <strong style={{ color: 'rgba(255,255,255,0.8)' }}>돈으로 사는 것</strong>이 이 과정의 본질입니다.
            </p>

            {/* 신뢰 지표 */}
            <motion.div
              className="flex items-center justify-center gap-8 mt-8 flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { icon: '⚡', label: '즉시 수강 시작' },
                { icon: '🔐', label: '안전한 결제' },
                { icon: '📩', label: '즉시 이메일 발송' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-white/40 text-[12px] tracking-wide">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─ 결제 카드 3열 — 순차 스크롤 등장 ─ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {PAYMENT_PLANS.map((plan, i) => (
              <PaymentCard
                key={plan.slug}
                plan={plan}
                onPayPalSuccess={handlePayPalSuccess}
                index={i}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
