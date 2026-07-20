/**
 * CourseLandingPage — 강의 상세 랜딩 페이지
 * 구조: 3분 맛보기 영상 → 강의 목차 → 맛보기 1편·2편 → 결제창
 * aicitybuilders.com/ai-solo-curriculum 구조 벤치마킹
 */
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, ChevronDown, Check, Lock, Clock, Users,
  BookOpen, Award, Shield, ChevronRight, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PayPalCheckoutButton from '../components/payment/PayPalCheckoutButton';
import TossCheckoutButton from '../components/payment/TossCheckoutButton';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../lib/paypal';
import { TOSS_PRODUCTS } from '../lib/toss';
import { createOrder } from '../lib/firestore';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ════════════════════════════════════════
   타입 정의
════════════════════════════════════════ */
interface Lesson {
  id: string;
  title: string;
  dur: string;
  free: boolean;
}
interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  free: boolean;
  lessons: Lesson[];
}
interface PreviewLessonData {
  no: number;
  title: string;
  ep: string;
  dur: string;
  desc: string;
  points: string[];
  videoId: string;
}
interface CourseData {
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  priceUsd: string;
  period: string;
  rating: number;
  reviewCount: number;
  students: string;
  totalLessons: number;
  totalHours: string;
  previewVideoId: string;
  paypalProduct: any;
  tossProduct: any;
  features: string[];
  curriculum: CurriculumModule[];
  previewLessons: PreviewLessonData[];
}

/* ════════════════════════════════════════
   강의 데이터 (slug별)
════════════════════════════════════════ */
const COURSE_DATA: Record<string, CourseData> = {
  bootcamp: {
    slug: 'bootcamp',
    title: 'AI 1인 기업 완전 정복',
    subtitle: 'AI 1인 기업가를 위한 4단계 교과',
    desc: '코딩 없이 AI로 1인 기업을 구축하는 완전한 로드맵. 배포·DB·결제·마케팅까지 실전으로 배웁니다.',
    price: '₩390,000',
    priceUsd: '$290',
    period: '평생 수강',
    rating: 4.9,
    reviewCount: 847,
    students: '1,200+',
    totalLessons: 47,
    totalHours: '44시간 57분',
    previewVideoId: 'dQw4w9WgXcQ', // YouTube ID placeholder
    paypalProduct: PRODUCTS[0],
    tossProduct: TOSS_PRODUCTS[0],
    features: [
      '평생 수강 (업데이트 포함)',
      'ChatGPT 실전 마케팅 마스터',
      'Vercel 배포 + Firebase DB 구축',
      'PayPal·Toss 결제 시스템 연동',
      'N8N 자동화 에이전트 설계',
      '수강생 전용 커뮤니티 + Q&A',
      '수료증 발급',
    ],
    curriculum: [
      {
        id: 'ep1',
        title: '입학식 · 케이스스터디',
        duration: '90분',
        free: true,
        lessons: [
          { id: 'l1', title: '오리엔테이션 & AI 1인 기업 로드맵', dur: '18:24', free: true },
          { id: 'l2', title: 'Case Study — 직원 0명, 월 $420K', dur: '24:11', free: true },
          { id: 'l3', title: 'AI 1인 기업 수익 모델 4종 완전 분석', dur: '32:07', free: false },
        ],
      },
      {
        id: 'ep2',
        title: '배포 · 데이터베이스 · 결제',
        duration: '44시간 57분',
        free: false,
        lessons: [
          { id: 'l4', title: 'Vercel 배포 — 5분 만에 사이트 올리기', dur: '12:34', free: false },
          { id: 'l5', title: 'Firebase 데이터베이스 설계 & 연동', dur: '28:15', free: false },
          { id: 'l6', title: 'PayPal 계정 생성 & API 키 발급', dur: '19:48', free: false },
          { id: 'l7', title: 'Secret Key 보안 관리 (.env)', dur: '11:22', free: false },
          { id: 'l8', title: '결제 시스템 완전 연동 (PayPal + Toss)', dur: '35:50', free: false },
        ],
      },
      {
        id: 'ep3',
        title: 'AI 마케팅 · SNS 수익화',
        duration: '준비 중',
        free: false,
        lessons: [
          { id: 'l9',  title: 'ChatGPT SEO 콘텐츠 자동 생성', dur: '22:14', free: false },
          { id: 'l10', title: '릴스 & 쇼츠 대본 자동화 시스템', dur: '18:30', free: false },
          { id: 'l11', title: '이메일 마케팅 자동화 (N8N)', dur: '29:45', free: false },
        ],
      },
      {
        id: 'ep4',
        title: 'AI 자동화 에이전트 구축',
        duration: '준비 중',
        free: false,
        lessons: [
          { id: 'l12', title: 'N8N 기초 — 워크플로우 설계', dur: '25:00', free: false },
          { id: 'l13', title: '고객 응대 자동화 에이전트', dur: '33:12', free: false },
          { id: 'l14', title: 'SNS 포스팅 자동화 파이프라인', dur: '28:44', free: false },
        ],
      },
    ],
    previewLessons: [
      {
        no: 1,
        title: '오리엔테이션 & AI 1인 기업 로드맵',
        ep: 'EP 01 · Lesson 1',
        dur: '18:24',
        desc: 'AI 1인 기업의 전체 구조와 수익화 로드맵을 공개합니다. 배포 → DB → 결제 → 마케팅 순서의 이유와 이 강의에서 무엇을 배우는지 전체 그림을 잡아줍니다.',
        points: ['AI 1인 기업의 4단계 구조', '월 $420K 수익 구조 분석', '내 비즈니스 모델 설계법', '수강 순서와 학습 전략'],
        videoId: 'dQw4w9WgXcQ',
      },
      {
        no: 2,
        title: 'Case Study — 직원 0명, 월 $420K',
        ep: 'EP 01 · Lesson 2',
        dur: '24:11',
        desc: '실제로 AI만으로 직원 없이 월 $420,000을 달성한 사례를 분석합니다. 어떤 도구를 어떻게 결합했는지, 당신도 적용 가능한 구체적인 전략을 배웁니다.',
        points: ['$420K 수익 구조 완전 분해', '핵심 AI 도구 3가지', '0→1 수익화 타임라인', '내 사업에 적용하는 방법'],
        videoId: 'dQw4w9WgXcQ',
      },
    ],
  },
  monthly: {
    slug: 'monthly',
    title: 'AI 프롬프트 마스터 멤버십',
    subtitle: '매주 신규 프롬프트 · 트렌드 리포트',
    desc: '매주 새로운 AI 프롬프트 템플릿과 유튜브 알고리즘 분석 리포트를 받아보세요.',
    price: '₩49,000',
    priceUsd: '$39',
    period: '/ 월',
    rating: 4.8,
    reviewCount: 312,
    students: '850+',
    totalLessons: 0,
    totalHours: '매주 업데이트',
    previewVideoId: 'dQw4w9WgXcQ',
    paypalProduct: null,
    tossProduct: TOSS_PRODUCTS[2],
    features: [
      '매주 실전 프롬프트 템플릿 (5개+)',
      '유튜브 알고리즘 트렌드 리포트',
      '수강생 전용 비공개 Q&A 채널',
      'ChatGPT GPT 33종 즉시 접근',
      '월간 라이브 Q&A 세션',
    ],
    curriculum: [
      {
        id: 'w1', title: 'Week 1 — 바이럴 쇼트폼 프롬프트 패키지', duration: '템플릿 5종', free: true,
        lessons: [
          { id: 'w1l1', title: '쇼트폼 훅 프롬프트 7가지 패턴', dur: '템플릿', free: true },
          { id: 'w1l2', title: 'CTA 자동 생성기 프롬프트', dur: '템플릿', free: false },
        ],
      },
      {
        id: 'w2', title: 'Week 2 — 유튜브 알고리즘 분석 리포트', duration: '리포트', free: false,
        lessons: [
          { id: 'w2l1', title: '이번 주 인기 키워드 TOP 20', dur: '리포트', free: false },
          { id: 'w2l2', title: '조회수 100만 영상 구조 분석', dur: '리포트', free: false },
        ],
      },
    ],
    previewLessons: [
      {
        no: 1, title: '멤버십 소개 & 활용법', ep: 'Week 0 · 오리엔테이션', dur: '8:30',
        desc: '멤버십에서 매주 제공되는 콘텐츠를 최대한 활용하는 방법을 안내합니다.',
        points: ['매주 프롬프트 활용법', 'Q&A 채널 참여 방법', '트렌드 리포트 읽는 법', 'GPT 도구 접근 방법'],
        videoId: 'dQw4w9WgXcQ',
      },
      {
        no: 2, title: '첫 번째 프롬프트 패키지 미리보기', ep: 'Week 1 · 샘플', dur: '12:15',
        desc: '첫 번째 주에 제공되는 쇼트폼 프롬프트 패키지를 미리 체험해봅니다.',
        points: ['쇼트폼 훅 7가지 패턴', 'CTA 자동 생성 프롬프트', '실전 적용 시연', '성과 트래킹 방법'],
        videoId: 'dQw4w9WgXcQ',
      },
    ],
  },
  vvip: {
    slug: 'vvip',
    title: 'VVIP 1:1 마스터클래스',
    subtitle: '개인 맞춤 코칭 + 수익화 로드맵 설계',
    desc: '1:1 개인 코칭으로 나만의 AI 비즈니스 수익화 로드맵을 설계합니다.',
    price: '₩2,900,000',
    priceUsd: '$2,190',
    period: '1:1 코칭 포함',
    rating: 5.0,
    reviewCount: 28,
    students: '30명 한정',
    totalLessons: 47,
    totalHours: '전체 포함 + 1:1 480분',
    previewVideoId: 'dQw4w9WgXcQ',
    paypalProduct: PRODUCTS[1],
    tossProduct: TOSS_PRODUCTS[1],
    features: [
      'AI 1인 기업 완전 정복 강의 전체',
      '월 2회 1:1 코칭 세션 (60분 × 4개월)',
      '개인 맞춤 수익화 로드맵 설계',
      '프라이빗 VVIP 단톡방 입장',
      '24시간 내 우선 Q&A 응답',
      'AI 에이전트 자동화 개인 구축 지원',
      'GPT 도구 33종 영구 접근',
    ],
    curriculum: [
      {
        id: 'vv1', title: 'AI 1인 기업 완전 정복 전체 커리큘럼', duration: '44시간 57분', free: true,
        lessons: [
          { id: 'vl1', title: '전체 강의 (47개 레슨) 포함', dur: '44시간+', free: true },
        ],
      },
      {
        id: 'vv2', title: '1:1 코칭 세션 (월 2회 × 4개월)', duration: '480분', free: false,
        lessons: [
          { id: 'vl2', title: '수익화 로드맵 1:1 설계 세션', dur: '60분', free: false },
          { id: 'vl3', title: 'AI 에이전트 구축 코칭', dur: '60분', free: false },
          { id: 'vl4', title: '성과 분석 & 전략 수정', dur: '60분', free: false },
        ],
      },
    ],
    previewLessons: [
      {
        no: 1, title: 'VVIP 소개 & 코칭 프로세스', ep: 'VVIP · 오리엔테이션', dur: '15:00',
        desc: 'VVIP 마스터클래스의 전체 구조와 1:1 코칭이 어떻게 진행되는지 설명합니다.',
        points: ['1:1 코칭 4개월 로드맵', '개인 맞춤 전략 설계 방법', 'VVIP 커뮤니티 활용법', '성과 측정 지표'],
        videoId: 'dQw4w9WgXcQ',
      },
      {
        no: 2, title: 'AI 1인 기업 수익화 전략 심화', ep: 'VVIP · 심화', dur: '28:00',
        desc: '일반 강의에서 다루지 않는 고급 수익화 전략과 스케일업 방법을 공개합니다.',
        points: ['월 1,000만 원 달성 로드맵', 'AI 에이전트 팀 구성 전략', '자동화 수익 파이프라인', '엑싯 전략 설계'],
        videoId: 'dQw4w9WgXcQ',
      },
    ],
  },
};

type CourseSlug = keyof typeof COURSE_DATA;

/* ════════════════════════════════════════
   비디오 플레이어 컴포넌트
════════════════════════════════════════ */
function VideoPlayer({ videoId, title, tag }: { videoId: string; title: string; tag?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ paddingBottom: '56.25%', background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1200 50%, #0d0d0d 100%)' }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* 배경 장식 */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="absolute"
            style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
          />

          {/* 태그 */}
          {tag && (
            <div
              className="absolute top-4 left-4 text-black text-[11px] font-extrabold px-3 py-1 rounded-full"
              style={{ backgroundColor: '#C9A84C' }}
            >
              {tag}
            </div>
          )}

          {/* 재생 버튼 */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all group-hover:scale-105"
              style={{ backgroundColor: '#C9A84C', boxShadow: '0 0 40px rgba(201,168,76,0.5)' }}
            >
              <Play size={22} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: 3 }} />
            </div>
            <p className="text-white/60 text-[13px] font-medium">{title}</p>
          </motion.div>

          {/* 하단 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
               style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   커리큘럼 아코디언
════════════════════════════════════════ */
function CurriculumModule({
  mod,
  index,
  expanded,
  onToggle,
}: {
  mod: CurriculumModule;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-extrabold shrink-0"
            style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="text-left">
            <p className="text-white font-semibold text-[14px] sm:text-[15px] leading-snug">{mod.title}</p>
            <p className="text-white/30 text-[11px] mt-0.5">{mod.lessons.length}개 강의 · {mod.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {mod.free && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
            >
              무료 공개
            </span>
          )}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-white/30" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/6 divide-y divide-white/4">
              {mod.lessons.map(lesson => (
                <div key={lesson.id} className="flex items-center justify-between px-5 py-3 bg-white/[0.01]">
                  <div className="flex items-center gap-3">
                    {lesson.free
                      ? <Play size={13} style={{ color: '#C9A84C' }} />
                      : <Lock size={13} className="text-white/20" />
                    }
                    <span className={`text-[13px] ${lesson.free ? 'text-white/70' : 'text-white/35'}`}>
                      {lesson.title}
                    </span>
                    {lesson.free && (
                      <span className="text-[10px] font-semibold" style={{ color: '#C9A84C' }}>무료</span>
                    )}
                  </div>
                  <span className="text-white/25 text-[11px] shrink-0 ml-3">{lesson.dur}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════
   맛보기 레슨 카드
════════════════════════════════════════ */
function PreviewLesson({
  lesson,
}: {
  lesson: PreviewLessonData;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* 레슨 헤더 */}
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-[14px] mt-0.5"
          style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1.5px solid rgba(201,168,76,0.3)' }}
        >
          {lesson.no}
        </span>
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: '#C9A84C', opacity: 0.7 }}>
            {lesson.ep}
          </p>
          <h3 className="text-white font-bold text-[18px] sm:text-[20px] tracking-tight leading-snug">
            {lesson.title}
          </h3>
        </div>
      </div>

      {/* 비디오 */}
      <VideoPlayer
        videoId={lesson.videoId}
        title={`▶ ${lesson.title} (${lesson.dur})`}
        tag={`맛보기 ${lesson.no}편 · ${lesson.dur}`}
      />

      {/* 설명 + 포인트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-white/55 text-[14px] leading-relaxed">{lesson.desc}</p>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: '#C9A84C' }}>
            이 강의에서 배우는 것
          </p>
          <ul className="flex flex-col gap-2">
            {lesson.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-white/60">
                <Check size={13} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   결제 섹션
════════════════════════════════════════ */
function PaymentSection({ course }: { course: typeof COURSE_DATA.bootcamp }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayPalSuccess = async (details: any) => {
    const orderId = details.id || `pp_${Date.now()}`;
    try {
      await createOrder({
        id: orderId,
        userId: user?.uid || 'anonymous',
        productId: course.slug,
        productName: course.title,
        amount: parseFloat((course.paypalProduct as any)?.price || '0'),
        currency: 'USD',
        status: 'completed',
        paypalOrderId: orderId,
        paypalPayerId: details.payer?.payer_id || '',
      });
      alert(`✅ 결제 완료! 주문번호: ${orderId}`);
    } catch {
      alert('결제는 완료됐지만 저장에 실패했습니다.');
    }
  };

  return (
    <div id="payment" className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
      {/* 결제 헤더 */}
      <div
        className="px-6 py-5 flex items-center justify-between"
        style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.12) 0%, transparent 100%)' }}
      >
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>
            지금 수강 신청
          </p>
          <p className="text-white font-extrabold text-[22px]">{course.price}</p>
          <p className="text-white/30 text-[12px]">{course.priceUsd} · {course.period}</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="flex items-center gap-1 justify-end mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill="#C9A84C" color="#C9A84C" />
            ))}
          </div>
          <p className="text-white/30 text-[11px]">{course.rating} · {course.reviewCount}개 리뷰</p>
        </div>
      </div>

      {/* 혜택 목록 */}
      <div className="px-6 py-4 border-t border-white/6 bg-white/[0.01]">
        <ul className="flex flex-col gap-2.5">
          {course.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/60">
              <Check size={13} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* 결제 버튼 */}
      <div className="px-6 py-5 border-t border-white/6 flex flex-col gap-3">
        {!user && (
          <div className="text-center text-[12px] text-white/30 mb-1">
            💡 로그인하면 수강 기록이 자동 저장됩니다.{' '}
            <button onClick={() => navigate('/')} className="text-white/50 underline cursor-pointer bg-transparent border-none">
              로그인
            </button>
          </div>
        )}

        <p className="text-white/25 text-[11px] text-center tracking-widest uppercase">국내 결제 (KRW)</p>
        <TossCheckoutButton
          product={course.tossProduct}
          customerEmail={user?.email || undefined}
          customerName={user?.displayName || undefined}
        />

        <p className="text-white/25 text-[11px] text-center tracking-widest uppercase mt-1">해외 결제 (USD)</p>
        {course.paypalProduct ? (
          <PayPalCheckoutButton
            product={course.paypalProduct}
            onSuccess={handlePayPalSuccess}
            onError={(err) => console.error('PayPal error:', err)}
          />
        ) : (
          <PayPalCheckoutButton
            planId={(SUBSCRIPTION_PLANS[0] as any).planId}
            onSuccess={handlePayPalSuccess}
            onError={(err) => console.error('PayPal error:', err)}
          />
        )}

        {/* 보장 */}
        <div className="flex items-center justify-center gap-2 mt-2 text-white/30 text-[12px]">
          <Shield size={12} />
          30일 성과 보장 · 결과 없으면 전액 환불
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   메인 컴포넌트
════════════════════════════════════════ */
export default function CourseLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const paymentRef = useRef<HTMLDivElement>(null);

  const course = COURSE_DATA[slug as CourseSlug] || COURSE_DATA.bootcamp;
  const [expandedModules, setExpandedModules] = useState<string[]>([course.curriculum[0].id]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalFree = course.curriculum.reduce((acc, m) => acc + m.lessons.filter(l => l.free).length, 0);
  const totalLessons = course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title={`${course.title} | GrowthAI`}
        description={course.desc}
        canonical={`/course/${course.slug}`}
        image={DEFAULT_OG_IMAGE}
        keywords={[course.title, 'AI 강의', '랜딩페이지', 'GrowthAI']}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: course.title,
          description: course.desc,
          provider: {
            '@type': 'Organization',
            name: 'GrowthAI',
            sameAs: 'https://www.growthai.kr',
          },
          offers: {
            '@type': 'Offer',
            price: course.price.replace(/[^0-9]/g, ''),
            priceCurrency: 'KRW',
            category: course.period,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: course.rating,
            reviewCount: course.reviewCount,
          },
        }}
      />

      {/* ── 상단 고정 바 (스크롤 시) ── */}
      <div
        className="fixed top-16 left-0 right-0 z-30 border-b border-white/8 px-6 flex items-center justify-between gap-4"
        style={{ height: 52, backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center gap-2 text-[12px] min-w-0">
          <button onClick={() => navigate('/enroll')} className="text-white/30 hover:text-white/60 cursor-pointer transition-colors shrink-0">
            강의
          </button>
          <ChevronRight size={12} className="text-white/20 shrink-0" />
          <span className="text-white/60 font-medium truncate">{course.title}</span>
        </div>
        <button
          onClick={scrollToPayment}
          className="shrink-0 h-8 px-4 rounded-xl text-[12px] font-bold text-black cursor-pointer border-none transition-all"
          style={{ backgroundColor: '#C9A84C' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4BA6A'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C9A84C'; }}
        >
          수강 신청 →
        </button>
      </div>

      <div className="pt-[108px] pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* ══ SECTION 1: 헤더 + 3분 맛보기 영상 ══ */}
          <section className="mb-16">

            {/* 브레드크럼 */}
            <div className="flex items-center gap-2 text-[12px] text-white/30 mb-6">
              <button onClick={() => navigate('/enroll')} className="hover:text-white/60 cursor-pointer transition-colors">강의 목록</button>
              <ChevronRight size={12} className="text-white/15" />
              <span className="text-white/50">{course.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

              {/* 왼쪽: 텍스트 */}
              <div className="lg:col-span-3">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>
                    GrowthAI · {course.subtitle}
                  </p>
                  <h1
                    className="apple-white-gradient font-extrabold leading-[1.1] tracking-tight mb-4"
                    style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
                  >
                    {course.title}
                  </h1>
                  <p className="text-white/50 text-[15px] leading-relaxed mb-5">{course.desc}</p>

                  {/* 별점 + 수강생 */}
                  <div className="flex items-center gap-4 text-[13px] mb-5">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="#C9A84C" color="#C9A84C" />
                      ))}
                      <span className="text-white/60 ml-1">{course.rating}</span>
                      <span className="text-white/25">({course.reviewCount}개 리뷰)</span>
                    </div>
                  </div>

                  {/* 메타 */}
                  <div className="flex flex-wrap gap-4 text-[13px] text-white/40">
                    <span className="flex items-center gap-1.5"><Users size={13} />{course.students} 수강</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} />{course.totalHours}</span>
                    <span className="flex items-center gap-1.5"><BookOpen size={13} />{totalFree}개 무료 공개</span>
                    <span className="flex items-center gap-1.5"><Award size={13} />수료증 발급</span>
                  </div>
                </motion.div>
              </div>

              {/* 오른쪽: 3분 맛보기 영상 */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                  <VideoPlayer
                    videoId={course.previewVideoId}
                    title="▶ 3분 맛보기 강의 보기"
                    tag="3분 맛보기"
                  />
                  <button
                    onClick={scrollToPayment}
                    className="w-full mt-3 h-11 rounded-xl font-bold text-[14px] text-black cursor-pointer border-none transition-all"
                    style={{ backgroundColor: '#C9A84C' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4BA6A'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C9A84C'; }}
                  >
                    지금 수강 신청 — {course.price}
                  </button>
                  <p className="text-center text-white/20 text-[11px] mt-2 flex items-center justify-center gap-1">
                    <Shield size={11} /> 30일 성과 보장 · 언제든 환불
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 구분선 + 섹션 네비 */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-1">
            {['강의 목차', '맛보기 강의', '결제 신청'].map((label, i) => (
              <a
                key={label}
                href={`#section-${i + 1}`}
                className="shrink-0 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all cursor-pointer"
                style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                {i + 1}. {label}
              </a>
            ))}
          </div>

          {/* ══ SECTION 2: 강의 목차 ══ */}
          <section id="section-1" className="mb-20 scroll-mt-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="apple-white-gradient font-extrabold text-[20px] sm:text-[24px] tracking-tight">
                강의 목차
              </h2>
              <span className="text-white/30 text-[13px]">
                총 {totalLessons}개 강의 · {course.totalHours}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {course.curriculum.map((mod, i) => (
                <CurriculumModule
                  key={mod.id}
                  mod={mod}
                  index={i}
                  expanded={expandedModules.includes(mod.id)}
                  onToggle={() => toggleModule(mod.id)}
                />
              ))}
            </div>

            {/* 다음 섹션 유도 */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              <p className="text-white/25 text-[13px] mb-3">맛보기 강의를 무료로 확인해보세요 ↓</p>
              <div className="w-px h-8 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)' }} />
            </motion.div>
          </section>

          {/* ══ SECTION 3: 맛보기 강의 1편 · 2편 ══ */}
          <section id="section-2" className="mb-20 scroll-mt-28">
            <div className="mb-8">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: '#C9A84C' }}>
                FREE PREVIEW
              </p>
              <h2 className="apple-white-gradient font-extrabold text-[20px] sm:text-[24px] tracking-tight">
                맛보기 강의 — 무료 공개
              </h2>
              <p className="text-white/35 text-[14px] mt-2">
                결제 전에 직접 수강하고 결정하세요.
              </p>
            </div>

            <div className="flex flex-col gap-14">
              {course.previewLessons.map(lesson => (
                <div key={lesson.no} className="pb-14 border-b border-white/6 last:border-0 last:pb-0">
                  <PreviewLesson lesson={lesson} />
                </div>
              ))}
            </div>

            {/* 다음 단계 유도 */}
            <motion.div
              className="mt-12 rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <p className="text-white/50 text-[14px] mb-2">맛보기 강의가 마음에 드셨나요?</p>
              <p className="text-white font-bold text-[16px] mb-4">
                지금 수강 신청하고 <span className="apple-gold-gradient">전체 {totalLessons}개 강의</span>를 시작하세요
              </p>
              <button
                onClick={scrollToPayment}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-[14px] text-black cursor-pointer border-none"
                style={{ backgroundColor: '#C9A84C' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4BA6A'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C9A84C'; }}
              >
                수강 신청 — {course.price} <ChevronRight size={15} />
              </button>
            </motion.div>
          </section>

          {/* ══ SECTION 4: 결제창 ══ */}
          <section id="section-3" className="scroll-mt-28" ref={paymentRef}>
            <div className="mb-6">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: '#C9A84C' }}>
                ENROLL NOW
              </p>
              <h2 className="apple-white-gradient font-extrabold text-[20px] sm:text-[24px] tracking-tight">
                지금 수강 신청하기
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* 왼쪽: 최종 혜택 요약 */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-5">
                  <p className="text-white font-bold text-[15px] mb-4">이 강의에 포함된 것</p>
                  <ul className="flex flex-col gap-2.5">
                    {course.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/55">
                        <Check size={13} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 수강생 리뷰 미니 */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-5">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="#C9A84C" color="#C9A84C" />)}
                    <span className="text-white/60 text-[13px] ml-1">{course.rating}</span>
                  </div>
                  <p className="text-white/55 text-[13px] italic leading-relaxed">
                    "수강 후 3개월 만에 월 수익 450만 원을 달성했습니다. 이 강의가 없었다면 불가능했을 것 같아요."
                  </p>
                  <p className="text-white/30 text-[11px] mt-2">— 김○○ 수강생 · EP02 수료</p>
                </div>
              </div>

              {/* 오른쪽: 결제 */}
              <div className="lg:col-span-3">
                <PaymentSection course={course as any} />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
