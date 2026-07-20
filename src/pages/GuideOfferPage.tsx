import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { CountdownBadges } from '../components/GuideCountdown';

const GOLD = '#C9A84C';

const OFFER_ITEMS = [
  { title: '12주 AI 마케팅 마스터클래스', value: 1970000 },
  { title: '주간 라이브 Q&A × 12회', value: 600000 },
  { title: '카카오 메시지 템플릿 15종', value: 147000 },
  { title: 'AI 광고 카피 생성기 프롬프트 50종', value: 197000 },
  { title: '1:1 퍼널 진단 세션', value: 300000 },
  { title: '전용 카카오 오픈채팅방 평생 이용', value: 97000 },
];

const TOTAL_VALUE = OFFER_ITEMS.reduce((sum, i) => sum + i.value, 0);
const PRICE_TODAY = 497000;
const PRICE_NEXT = 797000;

function won(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`;
}

export default function GuideOfferPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      <Seo
        title="12주 AI 마케팅 마스터클래스 오픈 | GrowthAI"
        description="오늘 단 497,000원. 12주 AI 마케팅 마스터클래스가 지금 열렸습니다."
        canonical="/guide/offer"
        image={DEFAULT_OG_IMAGE}
        keywords={['12주 마스터클래스', 'AI 마케팅', 'GrowthAI']}
        siteName={SITE_NAME}
      />

      {/* ════════════════ 카운트다운 헤더 ════════════════ */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-3">
          <span className="text-[12px] sm:text-[13px] font-bold text-white/60">마감까지</span>
          <CountdownBadges storageKey="guideOfferDeadline" days={7} />
        </div>
      </div>

      {/* ════════════════ 헤드라인 (Star-Story-Solution) ════════════════ */}
      <section className="relative overflow-hidden border-b border-white/5 px-6 py-16 md:py-24 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 55%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal blur>
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-5" style={{ color: GOLD }}>
              오픈 카트 · 지금만 열려 있습니다
            </p>
            <h1 className="apple-white-gradient font-extrabold leading-[1.25] tracking-toss mb-6" style={{ fontSize: 'clamp(24px, 4.5vw, 42px)' }}>
              저는 3년간 광고비로 ₩23,000,000을 태웠습니다.<br />
              지금은 매달 마케팅 비용 <span className="apple-gold-gradient">0원</span>으로 ₩78,000,000을 법니다.
            </h1>
            <p className="text-white/60 text-[15px] sm:text-[18px] leading-relaxed">
              그 사이에 딱 하나가 달라졌습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ 오퍼 밸류 스택 ════════════════ */}
      <section className="px-6 py-16 md:py-20 border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="apple-white-gradient font-extrabold tracking-tight text-center mb-10" style={{ fontSize: 'clamp(22px, 3.5vw, 34px)' }}>
              12주 AI 마케팅 마스터클래스
            </h2>
          </ScrollReveal>

          <StaggerReveal className="flex flex-col gap-3 mb-8" staggerDelay={0.08}>
            {OFFER_ITEMS.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4">
                  <span className="text-white/80 text-[14px] sm:text-[15px]">{item.title}</span>
                  <span className="text-white/35 text-[13px] shrink-0">가치 {won(item.value)}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-2xl p-7 sm:p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <p className="text-white/50 text-[14px] mb-2">총 가치 {won(TOTAL_VALUE)}</p>
              <p className="font-extrabold" style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: GOLD }}>
                오늘 단 {won(PRICE_TODAY)}
              </p>
              <p className="text-white/40 text-[13px] mt-3">
                ⏰ 이 가격은 마감 시각까지만 유효합니다. 다음 오픈 시 {won(PRICE_NEXT)}으로 인상됩니다.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[16px] cursor-pointer border-none"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
            >
              지금 등록하기 <ArrowRight size={16} />
            </button>
            <div className="flex items-center gap-2 text-white/40 text-[12px]">
              <Shield size={13} />
              30일 환불 보장 · 무이자 3개월 할부
            </div>
            <p className="text-white/25 text-[11px] max-w-sm text-center leading-relaxed">
              결제는 상담 후 안내드립니다. 등록하기를 누르면 문의 페이지로 이동합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
