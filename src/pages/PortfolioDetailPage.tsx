/**
 * PortfolioDetailPage — 수강생 포트폴리오 리포트 페이지
 * /portfolio/:workId
 * aicitybuilders.com/gallery 카드 클릭 → 상세 리포트 구조 벤치마킹
 *
 * 예시 데이터: work-6 (한○○ — AI 마케팅 대행 1인 기업 창업)
 * 승인 후 나머지 11개 동일 구조로 확장 적용 예정
 *
 * 구성:
 * 1. 히어로 — 수강생 프로필 카드
 * 2. 핵심 지표 — 성과 수치
 * 3. 서비스 소개 — 무엇을 만들었나
 * 4. 사용 기술 — 어떤 AI 도구로
 * 5. 서비스 가격 — 얼마에 의뢰 가능한가
 * 6. 수강생 스토리 — Before / After
 * 7. 의뢰하기 CTA
 */
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Star, Check,
  Zap, Users,
  ChevronRight, Mail, MessageCircle,
} from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── 포트폴리오 데이터 타입 ─── */
interface TechItem {
  name: string;
  emoji: string;
  desc: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
}

interface Milestone {
  period: string;
  event: string;
}

interface PortfolioDetail {
  id: string;
  emoji: string;
  category: string;
  studentName: string;        // 익명 처리
  studentRole: string;        // 수강 전 직업
  studyPeriod: string;
  title: string;
  serviceTagline: string;
  serviceDesc: string;
  serviceUrl?: string;        // 실제 서비스 URL
  metrics: { value: string; label: string; desc?: string }[];
  techStack: TechItem[];
  serviceFeatures: string[];  // 서비스가 제공하는 것
  pricingPlans: PricingPlan[];
  beforeStory: string;
  afterStory: string;
  milestones: Milestone[];
  testimonial?: string;       // 수강생 직접 후기
  contactEmail?: string;
  contactKakao?: string;
  tags: string[];
}

/* ─── 상세 포트폴리오 데이터 (예시 1개) ─── */
const PORTFOLIO_DETAILS: Record<string, PortfolioDetail> = {

  /* ── 예시 #6: AI 마케팅 대행 1인 기업 ── */
  '6': {
    id: '6',
    emoji: '💼',
    category: '비즈니스',
    studentName: '한○○',
    studentRole: '대기업 마케팅 팀장 → AI 1인 기업가',
    studyPeriod: '수강 3개월',
    title: 'AI 마케팅 대행 1인 기업 창업',
    serviceTagline: 'AI 자동화로 에이전시 수준의 마케팅을 1인이 운영합니다',
    serviceDesc: `10년 대기업 마케팅 경력 + AI 자동화 시스템으로
혼자서 마케팅 대행사를 운영합니다.

ChatGPT 프롬프트 시스템으로 콘텐츠 기획부터 제작까지 자동화하고,
N8N으로 SNS 자동 발행, 성과 리포트 자동 생성까지 구축했습니다.

고객사 8곳을 혼자 관리하며 월 순수익 ₩4,500,000을 달성했습니다.`,
    serviceUrl: '',
    metrics: [
      { value: '₩450만', label: '월 순수익',     desc: '수강 3개월 후 달성' },
      { value: '8곳',    label: '고객사',         desc: '현재 계약 중' },
      { value: '1명',    label: '혼자 운영',       desc: '직원 없는 1인 기업' },
      { value: '90%',    label: '업무 자동화율',   desc: 'AI + N8N 자동화' },
    ],
    techStack: [
      { name: 'ChatGPT',      emoji: '🤖', desc: '콘텐츠 기획·제작 자동화, 프롬프트 시스템 구축' },
      { name: 'N8N',          emoji: '⚡', desc: 'SNS 자동 발행, 성과 리포트 자동 생성 워크플로우' },
      { name: 'Claude Code',  emoji: '💻', desc: '고객사 맞춤형 자동화 도구 자체 개발' },
      { name: 'Midjourney',   emoji: '🎨', desc: 'SNS 비주얼 콘텐츠 대량 제작' },
      { name: 'Vercel',       emoji: '🚀', desc: '고객사 랜딩페이지 납품 · 배포' },
      { name: 'Notion AI',    emoji: '📋', desc: '고객사 리포트 · 전략 문서 자동화' },
    ],
    serviceFeatures: [
      'SNS 콘텐츠 월 30편 자동 제작 및 발행',
      'AI 기반 마케팅 전략 수립 및 월간 리포트',
      '고객사 맞춤형 ChatGPT 프롬프트 시스템 구축',
      '광고 소재 A/B 테스트 및 성과 분석',
      '바이럴 콘텐츠 기획 및 쇼트폼 대본 제작',
      '브랜드 가이드라인 및 톤앤매너 설정',
    ],
    pricingPlans: [
      {
        name: '베이직',
        price: '₩1,200,000',
        period: '/ 월',
        features: [
          'SNS 채널 1개 운영',
          '월 콘텐츠 10편 제작',
          '기본 성과 리포트 제공',
          '카카오톡 1:1 소통',
        ],
      },
      {
        name: '스탠다드',
        price: '₩2,500,000',
        period: '/ 월',
        features: [
          'SNS 채널 2개 통합 운영',
          '월 콘텐츠 30편 제작',
          '광고 운용 관리 포함',
          '주간 성과 리포트',
          '전략 미팅 월 2회',
        ],
        featured: true,
      },
      {
        name: '프리미엄',
        price: '₩4,500,000',
        period: '/ 월',
        features: [
          'SNS 전 채널 통합 관리',
          '무제한 콘텐츠 제작',
          '광고 + 인플루언서 협업',
          '브랜드 전략 수립 포함',
          '주간 미팅 + 즉시 응대',
        ],
      },
    ],
    beforeStory: `회사에서 마케팅 팀장으로 10년을 일했습니다.
팀원 6명을 관리하며 매달 수천만 원의 예산을 썼지만
정작 내 통장에 남는 건 월급 ₩450만원뿐이었습니다.

"AI로 혼자 마케팅 대행사를 운영한다"는 말을 들었을 때
솔직히 믿지 않았습니다. 그냥 허풍이라고 생각했어요.`,
    afterStory: `수강 3개월 후, 지금은 회사를 그만두고
혼자 고객사 8곳을 관리하며 월 ₩4,500,000을 법니다.

가장 놀라운 건 — 예전 팀장 시절보다 일이 훨씬 적습니다.
AI가 기획하고, N8N이 발행하고, Claude가 리포트를 씁니다.
저는 클라이언트와 전략 이야기만 합니다.`,
    milestones: [
      { period: '1주차',  event: 'ChatGPT 프롬프트 시스템 설계 완료' },
      { period: '2주차',  event: 'N8N SNS 자동 발행 워크플로우 구축' },
      { period: '1개월',  event: '첫 고객사 계약 ₩1,200,000' },
      { period: '2개월',  event: '고객사 5곳으로 확장 · 월 ₩3,000,000' },
      { period: '3개월',  event: '퇴사 결정 · 고객사 8곳 · 월 ₩4,500,000' },
    ],
    testimonial: `"AI 도구를 단순히 쓰는 법이 아니라, 어떻게 시스템으로 연결해서
비즈니스를 만드는지 알게 됐습니다. 강의 하나가 제 인생을 바꿨어요."`,
    contactEmail: 'contact@growthai.kr',
    contactKakao: '@growthai',
    tags: ['AI마케팅', '1인기업', '마케팅대행', 'N8N', 'ChatGPT', '자동화', '월450만'],
  },

};

/* 데이터 없을 때 폴백 */
const FALLBACK: PortfolioDetail = PORTFOLIO_DETAILS['6'];

/* ─── 애니메이션 베리언트 ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

/* ─── 메인 컴포넌트 ─── */
export default function PortfolioDetailPage() {
  const { workId = '6' } = useParams<{ workId: string }>();
  const navigate = useNavigate();

  const data = PORTFOLIO_DETAILS[workId] ?? FALLBACK;

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <Seo
        title={`${data.title} | GrowthAI`}
        description={data.serviceTagline}
        canonical={`/portfolio/${data.id}`}
        image={DEFAULT_OG_IMAGE}
        keywords={[data.category, '포트폴리오', '사례', 'GrowthAI']}
      />

      {/* ── 뒤로가기 ── */}
      <div className="border-b border-white/8 sticky top-16 z-20" style={{ backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-4xl mx-auto px-6 h-11 flex items-center gap-3">
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-[12px] cursor-pointer border-none bg-transparent"
          >
            <ArrowLeft size={13} />
            포트폴리오 목록
          </button>
          <span className="text-white/15">/</span>
          <span className="text-white/40 text-[12px] truncate">{data.title}</span>
        </div>
      </div>

      {/* ══════════════════════════════════
          1. 히어로 — 수강생 프로필
      ══════════════════════════════════ */}
      <section className="relative py-16 md:py-24 border-b border-white/8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 65%)' }} />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">

            {/* 이모지 아바타 */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-[48px] md:text-[60px]"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '2px solid rgba(201,168,76,0.3)' }}
            >
              {data.emoji}
            </motion.div>

            {/* 프로필 텍스트 */}
            <div className="flex-1">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ color: '#C9A84C', backgroundColor: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  {data.category}
                </span>
                <span className="text-white/30 text-[11px]">{data.studyPeriod}</span>
                <span className="text-white/15">·</span>
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => <Star key={i} size={11} fill="#C9A84C" color="#C9A84C" />)}
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="font-extrabold tracking-tight leading-tight mb-2"
                style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}
              >
                {data.title}
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={1.5}
                className="text-white/50 text-[14px] leading-relaxed mb-4"
              >
                {data.serviceTagline}
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
                  <Users size={12} />
                  {data.studentName}
                </div>
                <span className="text-white/15">·</span>
                <div className="text-white/40 text-[12px]">{data.studentRole}</div>
                {data.serviceUrl && (
                  <>
                    <span className="text-white/15">·</span>
                    <a href={data.serviceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] hover:opacity-80 transition-opacity" style={{ color: '#C9A84C' }}>
                      서비스 방문하기 <ExternalLink size={10} />
                    </a>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          2. 핵심 지표
      ══════════════════════════════════ */}
      <section className="border-b border-white/8 py-8" style={{ background: 'rgba(201,168,76,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
              viewport={{ once: true }}
              className="text-center py-4 px-3 rounded-2xl border border-white/8 bg-white/[0.02]"
            >
              <p className="font-extrabold tracking-tight leading-none mb-1" style={{ fontSize: 'clamp(20px, 3.5vw, 30px)', color: '#C9A84C' }}>
                {m.value}
              </p>
              <p className="text-white/50 text-[12px] font-semibold">{m.label}</p>
              {m.desc && <p className="text-white/25 text-[10px] mt-0.5">{m.desc}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          3. 서비스 소개
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* 서비스 설명 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>About This Service</p>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight mb-4">서비스 소개</h2>
              <div className="text-white/60 text-[14px] leading-[1.85] whitespace-pre-line">
                {data.serviceDesc}
              </div>
            </motion.div>

            {/* 제공 기능 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4 text-white/30">What's Included</p>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight mb-4">이 서비스가 제공하는 것</h2>
              <div className="space-y-2.5">
                {data.serviceFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={14} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                    <p className="text-white/65 text-[13.5px] leading-snug">{f}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          4. 사용 기술 스택
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 text-white/30">Tech Stack</p>
            <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight">이 서비스를 만든 도구들</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5}
                viewport={{ once: true }}
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[20px]" style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {tech.emoji}
                </div>
                <div>
                  <p className="text-white font-bold text-[13px] mb-0.5">{tech.name}</p>
                  <p className="text-white/40 text-[11.5px] leading-snug">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          5. 서비스 가격
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>Pricing</p>
            <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight">서비스 요금제</h2>
            <p className="text-white/35 text-[13px] mt-2">이 수강생의 서비스를 직접 의뢰할 수 있습니다</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {data.pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true }}
                className="rounded-2xl border p-5 flex flex-col"
                style={{
                  borderColor: plan.featured ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)',
                  background: plan.featured ? 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(0,0,0,0) 100%)' : 'rgba(255,255,255,0.02)',
                }}
              >
                {plan.featured && (
                  <div className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full self-start mb-3" style={{ backgroundColor: 'rgba(201,168,76,0.18)', color: '#C9A84C' }}>
                    인기
                  </div>
                )}
                <p className="text-white font-extrabold text-[16px] mb-1">{plan.name}</p>
                <p className="font-extrabold tracking-tight mb-1" style={{ fontSize: '26px', color: '#C9A84C' }}>{plan.price}</p>
                <p className="text-white/30 text-[11px] mb-4">{plan.period}</p>
                <div className="space-y-2 flex-1 mb-5">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <Check size={12} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                      <p className="text-white/60 text-[12.5px] leading-snug">{f}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-2.5 rounded-xl text-[13px] font-bold cursor-pointer border-none transition-all hover:opacity-90"
                  style={plan.featured
                    ? { backgroundColor: '#C9A84C', color: '#000' }
                    : { backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }
                  }
                >
                  의뢰하기 →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          6. 수강생 스토리 Before / After
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 text-white/30">Student Story</p>
            <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight">{data.studentName} 수강생 이야기</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Before */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }}>
              <p className="text-[11px] font-extrabold tracking-widest uppercase mb-3 text-red-400/60 flex items-center gap-2">
                <span className="w-6 h-px bg-red-400/30" />
                수강 전
              </p>
              <div className="rounded-2xl border border-red-400/10 bg-red-950/5 p-5">
                <p className="text-white/55 text-[14px] leading-[1.85] whitespace-pre-line">{data.beforeStory}</p>
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}>
              <p className="text-[11px] font-extrabold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: '#C9A84C' }}>
                <span className="w-6 h-px" style={{ backgroundColor: 'rgba(201,168,76,0.4)' }} />
                수강 후
              </p>
              <div className="rounded-2xl border p-5" style={{ borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
                <p className="text-white/70 text-[14px] leading-[1.85] whitespace-pre-line">{data.afterStory}</p>
              </div>
            </motion.div>
          </div>

          {/* 타임라인 */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-5 text-white/30 text-center">Timeline</p>
            <div className="relative">
              <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/8 hidden sm:block" />
              <div className="space-y-3">
                {data.milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.3}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="shrink-0 w-20 text-right">
                      <span className="text-[11px] font-bold" style={{ color: '#C9A84C' }}>{m.period}</span>
                    </div>
                    <div className="shrink-0 w-3 h-3 rounded-full border-2 border-black relative z-10 hidden sm:block" style={{ backgroundColor: '#C9A84C' }} />
                    <div className="flex-1 py-3 px-4 rounded-xl border border-white/6 bg-white/[0.02]">
                      <p className="text-white/65 text-[13px]">{m.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 수강생 직접 후기 */}
          {data.testimonial && (
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-10 rounded-2xl border p-6 text-center"
              style={{ borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}
            >
              <p className="text-[32px] mb-3" style={{ color: 'rgba(201,168,76,0.4)' }}>"</p>
              <p className="text-white/70 text-[15px] leading-relaxed italic whitespace-pre-line">{data.testimonial}</p>
              <p className="text-white/35 text-[12px] mt-4">— {data.studentName} · {data.studentRole}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════
          7. 의뢰하기 CTA
      ══════════════════════════════════ */}
      <section id="contact" className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1.5px solid rgba(201,168,76,0.3)' }}>
              <Zap size={26} style={{ color: '#C9A84C' }} />
            </div>
            <h2 className="text-[26px] sm:text-[34px] font-extrabold tracking-tight mb-3">
              이 수강생에게<br />
              <span style={{ color: '#C9A84C' }}>서비스를 의뢰하세요</span>
            </h2>
            <p className="text-white/45 text-[14px] mb-8 leading-relaxed">
              AI 마케팅 대행이 필요하신가요?<br />
              {data.studentName} 수강생이 직접 상담해드립니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href={`mailto:${data.contactEmail}`}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-[14px] font-extrabold border-none transition-all hover:scale-105"
                style={{ backgroundColor: '#C9A84C', color: '#000' }}
              >
                <Mail size={15} />
                이메일 문의하기
              </a>
              <a
                href={`https://pf.kakao.com/${data.contactKakao}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-[14px] font-semibold border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-all"
              >
                <MessageCircle size={15} />
                카카오 채널
              </a>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap justify-center gap-2">
              {data.tags.map(tag => (
                <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/35">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 다른 포트폴리오 보기 ── */}
      <div className="border-t border-white/8 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <p className="text-white/35 text-[13px]">다른 수강생 포트폴리오도 확인해보세요</p>
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-1.5 text-[13px] font-semibold cursor-pointer border-none bg-transparent hover:opacity-80 transition-opacity"
            style={{ color: '#C9A84C' }}
          >
            전체 포트폴리오 보기
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
