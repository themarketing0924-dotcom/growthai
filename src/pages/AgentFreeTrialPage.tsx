import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import TOOLS from '../data/tools';

const GOLD = '#C9A84C';

// 무료 체험 리드 마그넷으로 노출할 대표 에이전트 — 사이트의 핵심 타깃(소상공인)과 가장 잘 맞는 도구
const TOOL = TOOLS.find(t => t.slug === 'small-biz-promo')!;

function won(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`;
}

const FAQ_ITEMS = [
  {
    question: '정말 조건 없이 무료인가요?',
    answer: '네. 결제 정보 없이 아래 버튼으로 바로 접속해 7주간 무료로 이용하실 수 있습니다. 정가 ' + won(TOOL.originalPrice) + ' 상당의 도구입니다.',
  },
  {
    question: '왜 무료로 주나요?',
    answer: '먼저 써보고 실제로 도움이 되는지 확인하시라는 취지입니다. 도움이 되셨다면 이후 33개 에이전트 전체 구독으로 넘어오시면 됩니다 — 저희는 그렇게 신뢰를 쌓는 방식을 택했습니다.',
  },
  {
    question: '7주 이후에는 어떻게 되나요?',
    answer: '7주가 지나도 자동으로 결제되지 않습니다. 계속 쓰고 싶으시면 33개 전체 에이전트 구독으로 전환하실 수 있고, 원치 않으시면 그냥 사용을 멈추시면 됩니다.',
  },
  {
    question: 'ChatGPT 계정이 있어야 하나요?',
    answer: '네, 커스텀 GPT를 실행하려면 ChatGPT 계정(Plus 권장)이 필요합니다.',
  },
];

export default function AgentFreeTrialPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title={`${TOOL.title} — 7주 무료 체험 | GrowthAI`}
        description={`${TOOL.desc} 지금 조건 없이 7주간 무료로 사용해보세요.`}
        canonical="/agents/free-trial"
        image={DEFAULT_OG_IMAGE}
        keywords={['AI 에이전트 무료체험', TOOL.title, 'GPTs 무료', '소상공인 AI 홍보']}
        siteName={SITE_NAME}
      />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative py-20 md:py-28 px-6 text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <ScrollReveal blur>
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-5" style={{ color: GOLD }}>
              7주 무료 체험 · 조건 없음
            </p>
            <h1 className="apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-6" style={{ fontSize: 'clamp(28px, 5.5vw, 52px)' }}>
              전단지 문구 하나 쓰는 데<br />
              <span className="apple-gold-gradient">며칠씩 걸리고 계신가요?</span>
            </h1>
            <p className="text-white/50 text-[15px] sm:text-[17px] leading-relaxed max-w-lg mx-auto mb-3">
              {TOOL.title} — {TOOL.tagline}
            </p>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-lg mx-auto mb-10">
              {TOOL.desc}
            </p>
            <motion.a
              href={TOOL.gptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[16px] cursor-pointer no-underline"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              지금 무료로 시작하기 →
            </motion.a>
            <p className="text-white/30 text-[12px] mt-4">
              정가 {won(TOOL.originalPrice)} 상당 · 결제 정보 불필요 · 7주간 무료
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ JAB 1: 왜 무료로 주는가 (Reason-Why) ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 bg-black border-b border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl p-8 sm:p-10" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-[13px] font-extrabold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>
                왜 무료로 드릴까요
              </p>
              <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed">
                먼저 써보고 실제로 시간이 줄어드는지 직접 확인하시라는 취지입니다.<br />
                도움이 되셨다면, 그때 33개 에이전트 전체 구독을 고려해보시면 됩니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ JAB 2: 사용법 (교육 콘텐츠) ════════════════ */}
      <section className="relative py-16 md:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            eyebrow="사용법"
            title={
              <h2 className="apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-12" style={{ fontSize: 'clamp(26px, 4.5vw, 44px)' }}>
                4단계면 <span className="apple-gold-gradient">끝</span>납니다
              </h2>
            }
            center
          />

          <StaggerReveal className="flex flex-col gap-4" staggerDelay={0.1}>
            {TOOL.howto.map((step, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-5 bg-white/[0.02] border border-white/8 rounded-2xl p-6 hover-gold-border transition-all">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-bold shrink-0"
                    style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: GOLD, border: '1px solid rgba(201,168,76,0.25)' }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed pt-1">{step}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.2} className="mt-10">
            <p className="text-white/40 text-[13px] uppercase tracking-[0.15em] font-semibold mb-4 text-center">예시 프롬프트</p>
            <div className="flex flex-col gap-3">
              {TOOL.prompts.map((p, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/8 rounded-xl px-5 py-3.5 text-white/60 text-[13px] sm:text-[14px] font-mono">
                  {p}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ JAB 3: 사회적 증명 ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 bg-black border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-3" style={{ color: GOLD }}>
              실사용 후기
            </p>
            <h2 className="apple-white-gradient font-extrabold tracking-tight" style={{ fontSize: 'clamp(22px, 3.2vw, 34px)' }}>
              소상공인 사장님들이 이렇게 씁니다
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl p-6 flex flex-col gap-3 border border-white/8 bg-white/[0.02]">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: GOLD, fontSize: 13 }}>★</span>
                ))}
              </div>
              <p className="text-white/70 text-[14px] leading-relaxed">
                "오픈 이벤트 카드뉴스 문구 짜는 데 항상 반나절이었는데, 이건 5분 만에 3개 시안이 나와서 그중 골라 쓰기만 했어요."
              </p>
              <div className="pt-3 border-t border-white/6">
                <p className="text-white font-semibold text-[13px]">최○○</p>
                <p className="text-[11px]" style={{ color: GOLD }}>카페 운영</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section className="py-16 md:py-20 lg:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <SectionTitle
            eyebrow="자주 묻는 질문"
            title={<h2 className="apple-white-gradient font-extrabold text-[26px] sm:text-[32px] tracking-toss mb-12">FAQ</h2>}
            center
          />
          <StaggerReveal className="flex flex-col gap-4" staggerDelay={0.08}>
            {FAQ_ITEMS.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="border border-white/10 bg-white/[0.01] rounded-2xl p-6 hover-gold-border transition-all">
                  <p className="text-white font-semibold text-[15px] mb-2">{item.question}</p>
                  <p className="text-white/55 text-[13px] leading-relaxed">{item.answer}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ RIGHT HOOK: 최종 CTA ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-xl mx-auto">
          <ScrollReveal>
            <h2 className="text-white font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
              7주간, <span style={{ color: GOLD }}>완전히 무료</span>입니다.
            </h2>
            <motion.a
              href={TOOL.gptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[15px] cursor-pointer no-underline"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              지금 무료로 시작하기 →
            </motion.a>
            <div className="flex items-center justify-center gap-2 mt-5 text-white/30 text-[12px]">
              <Shield size={13} />
              결제 정보 불필요 · 언제든 중단 가능
            </div>
            <button
              onClick={() => navigate('/agents')}
              className="mt-8 text-[13px] font-semibold cursor-pointer bg-transparent border-none"
              style={{ color: GOLD }}
            >
              33개 에이전트 전체 구독도 궁금하다면 →
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
