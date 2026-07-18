/**
 * ToolSalesPage — AI GPT 도구 개별 세일즈 페이지
 * /product/:toolId
 * aicitybuilders.com/ai-money-video-prompts 구조 벤치마킹
 * 상단 카피라이팅 → 소개 영상 → 세일즈 문구 → 결제 CTA
 *
 * 현재 예시: pt1 — 전자책 출판 지원 솔루션 (전자책 완성 시스템)
 * 승인 후 33개 모두 동일 구조로 확장 적용 예정
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PayPalCheckoutButton from '../components/payment/PayPalCheckoutButton';
import TossCheckoutButton from '../components/payment/TossCheckoutButton';
import { PRODUCTS } from '../lib/paypal';
import { TOSS_PRODUCTS } from '../lib/toss';
import { createOrder } from '../lib/firestore';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';
import {
  Check, ChevronDown, Play, ArrowRight,
  Zap, Shield, Star, X,
} from 'lucide-react';

/* ─── 도구별 세일즈 데이터 (확장 예정: 33개) ─── */
interface ToolSalesData {
  id: string;
  title: string;
  tagline: string;
  price: string;
  priceNote: string;
  videoSrc?: string;        // YouTube embed or placeholder
  heroHeadline: string;
  heroSub: string;
  pains: string[];
  oldWayTitle: string;
  oldWayItems: string[];
  solutionTitle: string;
  solutionDesc: string;
  solutionItems: string[];
  howTitle: string;
  howItems: string[];
  resultsItems: string[];
  whyTitle: string;
  whyItems: string[];
  beforeItems: string[];
  afterItems: string[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  badge?: string;
}

const TOOL_SALES: Record<string, ToolSalesData> = {
  'ebook-writer': {
    id: 'ebook-writer',
    title: '전자책 완성 시스템',
    tagline: '아이디어부터 홍보까지 — AI가 끝까지 데려다 줍니다',
    price: '₩49,000',
    priceNote: '단일 결제 · 평생 사용',
    heroHeadline: '한 권의 책을\n\'아이디어부터 홍보까지\'\n완성하는 실행 시스템',
    heroSub: '생각은 있는데, 책은 못 쓰고 계신가요?',
    pains: [
      '무엇부터 시작해야 할지 모릅니다',
      '쓰다가 흐름이 끊깁니다',
      '끝까지 완성해본 경험이 없습니다',
      '기획, 집필, 홍보가 따로 놀고 있습니다',
    ],
    oldWayTitle: '기존 방식의 한계',
    oldWayItems: [
      '글쓰기 방법만 알려줍니다',
      '시작은 쉬운데 끝까지 못 갑니다',
      '구조 없이 감으로 진행합니다',
      '완성 이후를 고려하지 않습니다',
    ],
    solutionTitle: '해결 방식은 다릅니다',
    solutionDesc: '단순 글쓰기 방법이 아닙니다. "책을 완성시키는 전체 시스템"입니다.',
    solutionItems: [
      '주제 발굴부터 자동으로 방향을 잡습니다',
      '단계별로 흐름이 끊기지 않게 설계됩니다',
      '기획 → 집필 → 홍보까지 이어집니다',
      '중간에 멈출 틈 없이 다음 단계로 진행됩니다',
    ],
    howTitle: '실제로 무엇을 해주나요',
    howItems: [
      '주제, 제목, 타깃을 명확히 잡게 만듭니다',
      '독자가 원하는 가치를 구조화합니다',
      '실행 가능한 목차를 자동으로 설계합니다',
      '장 단위로 끊어서 끝까지 쓰게 만듭니다',
      '완성 후 바로 사용할 홍보 콘텐츠까지 만듭니다',
    ],
    resultsItems: [
      '막막함 없이 시작할 수 있습니다',
      '중간에 멈추지 않고 끝까지 갑니다',
      '책의 흐름이 자연스럽게 이어집니다',
      '완성 후 바로 판매/홍보가 가능합니다',
    ],
    whyTitle: '이 시스템이 다른 이유',
    whyItems: [
      "'생각 정리'가 아니라 '완성'까지 설계됩니다",
      "질문이 아니라 '결과 중심 구조'로 움직입니다",
      "단계가 아니라 '흐름'으로 이어집니다",
      '실행을 멈추지 않게 강제합니다',
    ],
    beforeItems: [
      '아이디어만 있고 실행이 안 됨',
      '글을 쓰다 멈추는 반복',
      '구조 없이 막연하게 진행',
      '완성 경험 없음',
    ],
    afterItems: [
      '주제부터 명확하게 정리됨',
      '단계 따라가면 자연스럽게 완성',
      '흐름이 끊기지 않음',
      '한 권의 책 완성 경험 확보',
    ],
    faqs: [
      { q: '정말 끝까지 쓸 수 있을까요?', a: '단계가 자동으로 이어지기 때문에 멈출 지점이 없습니다.' },
      { q: '글을 잘 못 써도 괜찮을까요?', a: "잘 쓰는 것이 아니라 '구조대로 완성하는 것'에 집중합니다." },
      { q: '아이디어가 부족한데 가능할까요?', a: '초기 단계에서 주제부터 도출되도록 설계되어 있습니다.' },
      { q: '혼자 진행해도 괜찮나요?', a: '각 단계가 다음 행동을 자연스럽게 이어줍니다.' },
    ],
    ctaText: '지금 바로 시작하세요',
    badge: '📚 전자책 분야 1위',
  },
};

/* ─── FAQ 아이템 ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-0 text-left cursor-pointer border-none bg-transparent"
      >
        <span className="text-white/80 text-[14px] font-semibold pr-4">{q}</span>
        <ChevronDown size={15} className={`text-white/30 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="text-white/55 text-[13.5px] leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

/* ─── 메인 컴포넌트 ─── */
export default function ToolSalesPage() {
  const { toolId = 'ebook-writer' } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [payError, setPayError] = useState<string | null>(null);

  const data = TOOL_SALES[toolId] ?? TOOL_SALES['ebook-writer'];

  const handlePayPalSuccess = async (details: any) => {
    try {
      if (user) {
        await createOrder({
          id: details.id || `pp_${Date.now()}`,
          userId: user.uid,
          productId: toolId,
          productName: data.title,
          amount: 49000,
          currency: 'KRW',
          status: 'completed',
          paypalOrderId: details.id ?? '',
        });
      }
      navigate('/course/ai');
    } catch {
      setPayError('결제 처리 중 오류가 발생했습니다. 고객센터에 문의해주세요.');
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <Seo
        title={`${data.title} 구매 | AI 마케팅 도구 GrowthAI`}
        description={data.tagline}
        canonical={`/product/${toolId}`}
        image={DEFAULT_OG_IMAGE}
        keywords={[data.title, 'AI 마케팅 도구', '소상공인 AI 도구', '상품 상세', 'GrowthAI']}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: data.title,
            description: data.tagline,
            brand: { '@type': 'Brand', name: 'GrowthAI' },
            offers: {
              '@type': 'Offer',
              price: data.price.replace(/[^0-9]/g, ''),
              priceCurrency: 'KRW',
              availability: 'https://schema.org/InStock',
              url: `https://www.growthai.kr/product/${toolId}`,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      {/* ══════════════════════════════════
          1. HERO — 카피라이팅 헤드라인
      ══════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          {data.badge && (
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-6 border"
              style={{ color: '#C9A84C', borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.07)' }}
            >
              <Zap size={10} />
              {data.badge}
            </motion.div>
          )}

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-extrabold tracking-tight leading-[1.12] mb-6 whitespace-pre-line"
            style={{ fontSize: 'clamp(30px, 5.5vw, 64px)' }}
          >
            {data.heroHeadline.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? <span style={{ color: '#C9A84C' }}>{line}</span> : line}
                {i < 2 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/55 text-[16px] sm:text-[20px] font-semibold mb-4"
          >
            {data.heroSub}
          </motion.p>

          {/* 고통 포인트 */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="inline-block text-left mt-4 mb-8"
          >
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-2">
              {data.pains.map((pain, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-[13px]">•</span>
                  <span className="text-white/60 text-[14px]">{pain}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.button
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
            onClick={() => document.getElementById('purchase')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[14px] font-extrabold cursor-pointer border-none transition-all hover:scale-105"
            style={{ backgroundColor: '#C9A84C', color: '#000' }}
          >
            지금 바로 시작하기
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </section>

      {/* ══════════════════════════════════
          2. 서비스 소개 영상 (3분)
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>서비스 소개</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">3분 안에 전부 보여드립니다</h2>
          </motion.div>

          {/* 영상 플레이스홀더 */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gradient-to-br from-[#0d0a00] to-[#0a0a0a] cursor-pointer group"
            onClick={() => {/* YouTube 연결 예정 */}}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-18 h-18 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center mb-4 border-2 border-white/20 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(201,168,76,0.25)' }}>
                <Play size={28} fill="#C9A84C" className="text-[#C9A84C] ml-1" />
              </div>
              <p className="text-white/60 text-[13px] font-semibold">서비스 소개 영상 (3분)</p>
              <p className="text-white/30 text-[11px] mt-1">클릭하여 재생</p>
            </div>
            {/* 장식 */}
            <div className="absolute top-4 right-4 text-[11px] px-2.5 py-1 rounded-full font-bold" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>
              3:00
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          3. 기존 방식의 한계
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 text-white/30">✍ The Problem</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">{data.oldWayTitle}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.oldWayItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.01]"
              >
                <X size={14} className="shrink-0 mt-0.5 text-red-400/60" />
                <p className="text-white/55 text-[13.5px] leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          4. 해결 방식
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8" style={{ background: 'rgba(201,168,76,0.02)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>💡 The Solution</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight mb-3">{data.solutionTitle}</h2>
            <p className="text-white/50 text-[15px] leading-relaxed">{data.solutionDesc}</p>
          </motion.div>
          <div className="space-y-3">
            {data.solutionItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{ borderColor: 'rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.04)' }}
              >
                <Check size={15} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                <p className="text-white/70 text-[14px] leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          5. 실제로 무엇을 해주나요 (총 12단계)
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 text-white/30">🧩 How It Works</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">{data.howTitle}</h2>
            <p className="text-white/40 text-[13px] mt-2">총 {data.howItems.length}단계로 책 한 권을 완성합니다</p>
          </motion.div>
          <div className="space-y-3">
            {data.howItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-extrabold text-black mt-0.5" style={{ backgroundColor: '#C9A84C' }}>
                  {i + 1}
                </div>
                <div className="flex-1 py-2.5 border-b border-white/6">
                  <p className="text-white/70 text-[14px] leading-snug">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          6. 얻는 결과
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8" style={{ background: 'rgba(201,168,76,0.02)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>🚀 Results</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">얻는 결과</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.resultsItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-colors"
              >
                <Star size={14} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                <p className="text-white/70 text-[13.5px] leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          7. 이 시스템이 다른 이유
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 text-white/30">✅ Why Different</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">{data.whyTitle}</h2>
          </motion.div>
          <div className="space-y-2.5">
            {data.whyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.01]"
              >
                <Check size={14} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                <p className="text-white/65 text-[14px] leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          8. Before / After
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">Before / After</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Before */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }}>
              <p className="text-[12px] font-extrabold tracking-widest uppercase mb-3 text-red-400/60 text-center">Before</p>
              <div className="rounded-2xl border border-red-400/10 bg-red-950/10 p-5 space-y-2.5">
                {data.beforeItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <X size={12} className="shrink-0 mt-0.5 text-red-400/50" />
                    <p className="text-white/45 text-[13px]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* After */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}>
              <p className="text-[12px] font-extrabold tracking-widest uppercase mb-3 text-center" style={{ color: '#C9A84C' }}>After</p>
              <div className="rounded-2xl border p-5 space-y-2.5" style={{ borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
                {data.afterItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={12} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                    <p className="text-white/75 text-[13px]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          9. FAQ
      ══════════════════════════════════ */}
      <section className="py-16 border-b border-white/8">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 text-white/30">🙋 FAQ</p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">많이 하는 고민들</h2>
          </motion.div>
          <div>
            {data.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          10. 구매 / CTA 섹션
      ══════════════════════════════════ */}
      <section id="purchase" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>🚀 {data.ctaText}</p>
            <h2 className="text-[28px] sm:text-[38px] font-extrabold tracking-tight mb-3">
              망설일 필요 없습니다.<br />
              <span style={{ color: '#C9A84C' }}>지금 실행해보면 바로 차이를 느낍니다.</span>
            </h2>
            <p className="text-white/40 text-[14px]">지금 클릭해서 직접 경험해보세요.</p>
          </motion.div>

          {/* 가격 카드 */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl border p-7 mb-8"
            style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(0,0,0,0) 100%)' }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-white font-extrabold text-[20px] tracking-tight">{data.title}</p>
                <p className="text-white/40 text-[12px] mt-0.5">{data.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-[28px] font-extrabold tracking-tight" style={{ color: '#C9A84C' }}>{data.price}</p>
                <p className="text-white/35 text-[11px]">{data.priceNote}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {[
                'ChatGPT 전용 GPT 프롬프트 도구 즉시 사용',
                '업데이트 시 추가 비용 없음',
                '구매 즉시 사용 가능',
                '30일 환불 보장',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={13} style={{ color: '#C9A84C' }} className="shrink-0" />
                  <span className="text-white/65 text-[13px]">{item}</span>
                </div>
              ))}
            </div>

            {/* 결제 버튼 */}
            <div className="space-y-3">
              {/* 토스 결제 */}
              <div>
                <p className="text-white/30 text-[10.5px] font-bold tracking-widest uppercase mb-2">국내 결제 (토스)</p>
                {TOSS_PRODUCTS[0] && (
                  <TossCheckoutButton
                    product={TOSS_PRODUCTS[0]}
                    customerEmail={profile?.email ?? undefined}
                    customerName={profile?.displayName ?? undefined}
                    onError={(e) => setPayError(String(e))}
                    className="w-full py-3.5 rounded-xl font-bold text-[14px]"
                  />
                )}
              </div>
              {/* PayPal 결제 */}
              <div>
                <p className="text-white/30 text-[10.5px] font-bold tracking-widest uppercase mb-2">해외 결제 (PayPal)</p>
                {PRODUCTS[0] && (
                  <PayPalCheckoutButton
                    product={PRODUCTS[0]}
                    onSuccess={handlePayPalSuccess}
                    onError={(e) => setPayError(String(e))}
                  />
                )}
              </div>
              {/* 구글폼 대안 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-white/25 text-[11px]">또는</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <a
                href="https://forms.gle/kVzNby2ZjNL8bPUR9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-[14px] font-semibold border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-all"
              >
                👉 멤버십 신청하기 (구글폼)
              </a>
            </div>

            {payError && (
              <p className="mt-3 text-red-400/70 text-[12px] text-center">{payError}</p>
            )}
          </motion.div>

          {/* 보장 */}
          <div className="flex items-center justify-center gap-2 text-white/30 text-[12px]">
            <Shield size={13} />
            30일 무조건 환불 보장 · 결제 후 즉시 이용 가능
          </div>
        </div>
      </section>
    </div>
  );
}
