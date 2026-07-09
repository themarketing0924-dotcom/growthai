import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from '../components/ScrollReveal';
import { AIToolsSection } from '../components/AIToolsSection';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import TOOLS, { SUBSCRIPTION } from '../data/tools';
import { PERSUASION_ENGINE } from '../config/persuasionEngine';

const GOLD = '#C9A84C';

// 33개 도구 정가 합계 — tools.ts 데이터에서 실계산 (하드코딩 금지)
const TOTAL_LIST_VALUE = TOOLS.reduce((sum, t) => sum + t.originalPrice, 0);

function won(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`;
}

const FAQ_ITEMS = [
  {
    question: 'ChatGPT 유료 계정이 있어야 하나요?',
    answer: '각 GPT 도구는 chatgpt.com의 커스텀 GPT 링크로 제공됩니다. ChatGPT Plus(유료) 계정이 있어야 커스텀 GPT를 실행할 수 있습니다. 구독료와 ChatGPT Plus 요금은 별도입니다.',
  },
  {
    question: '구독은 언제든 해지할 수 있나요?',
    answer: '네, 언제든 해지 가능합니다. 해지 시 다음 결제일까지는 계속 이용하실 수 있고, 이후 자동 결제가 중단됩니다.',
  },
  {
    question: '새 도구는 얼마나 자주 추가되나요?',
    answer: '월 1~2회 새로운 GPT 도구가 추가됩니다. 구독자는 추가 비용 없이 신규 도구를 바로 이용할 수 있습니다.',
  },
  {
    question: '전자책·영상 결과물의 저작권은 누구에게 있나요?',
    answer: 'GPT 도구로 생성한 결과물(전자책 원고, 영상 스크립트, 이미지 등)의 저작권은 전적으로 이용자 본인에게 있습니다. 자유롭게 판매·배포하실 수 있습니다.',
  },
  {
    question: '강의 수강생은 할인이 있나요?',
    answer: '네, 강의 수강생에게는 별도 할인 코드가 제공됩니다. 문의 폼에 수강 과정을 남겨주시면 안내드립니다.',
  },
];

const PAIN_ITEMS = [
  {
    titleKo: '도구는 많은데 뭘 골라야 할지 모른다',
    descKo: 'ChatGPT, Sora, 미드저니... 검색할수록 도구만 늘어나고, 정작 내 업무에 맞는 게 뭔지는 알 수가 없습니다.',
  },
  {
    titleKo: '매번 프롬프트를 처음부터 짜야 한다',
    descKo: '괜찮은 결과가 나오는 프롬프트 하나 찾는 데도 몇 시간이 걸립니다. 그마저도 다음 작업엔 다시 처음부터입니다.',
  },
  {
    titleKo: '구독료만 여러 개 나간다',
    descKo: '전자책 도구 따로, 영상 도구 따로, 이미지 도구 따로 — 이것저것 구독하다 보면 정작 각각은 다 쓰지도 못합니다.',
  },
];

const TESTIMONIALS = [
  {
    textKo: '전자책 출판 GPT 하나로 원고 초안을 이틀 만에 끝냈어요. 목차 짜는 데만 하루 걸리던 게 없어졌습니다.',
    nameKo: '이○○', roleKo: '전자책 작가 지망생',
  },
  {
    textKo: '홍보 문구 GPT로 상세페이지 카피를 뽑고 나서 문의량이 확실히 늘었어요. 카피라이터 안 써도 되겠더라고요.',
    nameKo: '정○○', roleKo: '온라인 셀러',
  },
  {
    textKo: '33개 도구 구독료가 웬만한 단일 툴 하나 값도 안 돼서 시작했는데, 실제로 쓰는 건 5~6개 정도지만 그것만으로 본전 뽑았습니다.',
    nameKo: '윤○○', roleKo: '1인 마케팅 대행',
  },
];

export default function AgentsPage({ lang }: { lang: 'ko' | 'en' }) {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title="AI 에이전트 33종 구독 | GrowthAI"
        description="전자책, 영상, 이미지, 홍보, 콘텐츠까지 — 33개 커스텀 GPT 에이전트를 월 정액 구독으로 무제한 이용하세요."
        canonical="/agents"
        image={DEFAULT_OG_IMAGE}
        keywords={['AI 에이전트', 'GPTs 구독', '커스텀 GPT', 'AI 자동화 도구']}
        siteName={SITE_NAME}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'GrowthAI AI 에이전트 구독',
          description: '33개 커스텀 GPT 에이전트 월 정액 구독 서비스',
        }}
      />

      {/* ════════════════ 긴급성 바 ════════════════ */}
      {/* TODO: 실제 신규 구독자 수 데이터로 교체 (현재는 예시 placeholder) */}
      <div className="w-full py-2.5 px-6 text-center border-b border-white/5" style={{ backgroundColor: 'rgba(201,168,76,0.06)' }}>
        <p className="text-[12px] sm:text-[13px] font-semibold" style={{ color: GOLD }}>
          이번 달 신규 구독 <span className="font-extrabold">128명</span> · 매달 새 GPT 에이전트 추가
        </p>
      </div>

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative py-20 md:py-28 px-6 text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal blur>
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-5" style={{ color: GOLD }}>
              AI 에이전트 구독
            </p>
            <h1 className="apple-white-gradient font-extrabold leading-[1.1] tracking-toss mb-6" style={{ fontSize: 'clamp(30px, 6vw, 60px)' }}>
              AI 도구가 너무 많아서<br />
              <span className="apple-gold-gradient">뭘 써야 할지 모르겠다면</span>
            </h1>
            <p className="text-white/50 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto mb-10">
              전자책, 영상, 이미지, 홍보, 콘텐츠 — 업무별로 이미 완성된 33개 커스텀 GPT 에이전트를
              하나의 구독으로 무제한 이용하세요.
            </p>
            <motion.button
              onClick={() => document.getElementById('agents-catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[16px] cursor-pointer border-none"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              무료로 카탈로그 보기 →
            </motion.button>
            <p className="mt-5">
              <button
                onClick={() => navigate('/agents/free-trial')}
                className="text-[13px] font-semibold cursor-pointer bg-transparent border-none"
                style={{ color: GOLD }}
              >
                일단 하나만 조건 없이 7주 무료로 써보기 →
              </button>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ 설득 엔진 섹션 ════════════════ */}
      <section className="relative py-16 md:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="설득 엔진"
            title={
              <h2 className="apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-5" style={{ fontSize: 'clamp(28px, 4.8vw, 48px)' }}>
                마케팅 거장 12명의 공식을<br /><span className="apple-gold-gradient">하나의 AI 에이전트로 묶었습니다</span>
              </h2>
            }
            center
          />

          <p className="text-white/55 text-[15px] leading-relaxed max-w-3xl mx-auto text-center mb-12">
            방문자 인식 단계부터 감정 자극, 신뢰 제거, 행동 유도, 런칭 빌드업, 품질 검수까지 한 번에 설계합니다.
            이 섹션은 홈, 판매 페이지, 블로그, 문의 페이지에 그대로 복제해서 쓸 수 있습니다.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>
                적용 원칙
              </p>
              <div className="space-y-4">
                {PERSUASION_ENGINE.layers.map((layer) => (
                  <div key={layer.name} className="rounded-2xl border border-white/8 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-white font-bold text-[15px]">{layer.name}</h3>
                      <span className="text-[11px] text-white/40">{layer.masters.join(' · ')}</span>
                    </div>
                    <p className="text-white/55 text-[13px] leading-relaxed">{layer.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>
                사이트 반영 방식
              </p>
              <div className="space-y-4 mb-6">
                {PERSUASION_ENGINE.sites.map((site) => (
                  <div key={site.page} className="rounded-2xl border border-white/8 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-white font-bold text-[15px]">{site.page}</h3>
                      <span className="text-[11px] text-white/40">{site.stack}</span>
                    </div>
                    <p className="text-white/55 text-[13px] leading-relaxed">{site.output}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3" style={{ color: GOLD }}>
                  복붙용 프롬프트
                </p>
                <pre className="whitespace-pre-wrap text-white/75 text-[12px] leading-relaxed font-mono max-h-[360px] overflow-auto">{PERSUASION_ENGINE.prompt}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ PAIN 섹션 ════════════════ */}
      <section className="relative py-16 md:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow="지금 이런 상황이신가요"
            title={
              <h2 className="apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-12" style={{ fontSize: 'clamp(26px, 4.5vw, 46px)' }}>
                도구는 많은데,<br /><span className="apple-gold-gradient">정작 쓸 만한 건 못 찾고 있지 않나요?</span>
              </h2>
            }
            center
          />

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.13}>
            {PAIN_ITEMS.map((pain, i) => (
              <StaggerItem key={i}>
                <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-7 flex flex-col gap-4 hover-gold-border transition-all h-full">
                  <h3 className="text-white font-bold text-[18px] tracking-toss">{pain.titleKo}</h3>
                  <p className="text-white/50 text-[14px] leading-relaxed">{pain.descKo}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ VALUE STACK 가격 섹션 ════════════════ */}
      <section className="relative py-16 md:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            eyebrow="가치 계산"
            title={
              <h2 className="apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-4" style={{ fontSize: 'clamp(26px, 4.5vw, 44px)' }}>
                33개를 각각 산다면<br /><span className="apple-gold-gradient">얼마일까요?</span>
              </h2>
            }
            center
          />

          <ScrollReveal delay={0.15} className="mt-10">
            <div className="rounded-2xl p-8 sm:p-10 border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-white/50 text-[14px]">33개 GPT 에이전트 정가 합계</span>
                <span className="text-white/40 text-[18px] font-bold line-through">{won(TOTAL_LIST_VALUE)}</span>
              </div>
              <div className="flex items-center justify-between py-5">
                <span className="text-white font-bold text-[15px]">지금 구독하면</span>
                <div className="text-right">
                  <div className="text-white text-[32px] sm:text-[38px] font-extrabold tracking-tight">
                    {won(SUBSCRIPTION.monthly.price)}<span className="text-white/30 text-[14px] ml-1">/ 월</span>
                  </div>
                  <p className="text-[12px] mt-1" style={{ color: GOLD }}>
                    연간 결제 시 월 {won(SUBSCRIPTION.yearly.perMonth)} ({SUBSCRIPTION.yearly.save} 절약)
                  </p>
                </div>
              </div>
              <p className="text-white/35 text-[13px] pt-4 border-t border-white/8">
                신규 도구가 추가돼도 구독료는 그대로입니다.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="flex items-center justify-center gap-2 mt-8 text-white/40 text-[13px]">
            <Shield size={14} />
            언제든 해지 가능 · 위약금 없음
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ 카탈로그 쇼케이스 ════════════════ */}
      <div id="agents-catalog">
        <AIToolsSection lang={lang} />
      </div>

      {/* ════════════════ 사회적 증명 ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 bg-black border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-3" style={{ color: GOLD }}>
              사용 후기
            </p>
            <h2 className="apple-white-gradient font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              실제로 이렇게 쓰고 있습니다
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {TESTIMONIALS.map((r, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-2xl p-6 flex flex-col gap-3 border border-white/8 bg-white/[0.02]">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: GOLD, fontSize: 13 }}>★</span>
                    ))}
                  </div>
                  <p className="text-white/70 text-[14px] leading-relaxed flex-1">"{r.textKo}"</p>
                  <div className="pt-3 border-t border-white/6">
                    <p className="text-white font-semibold text-[13px]">{r.nameKo}</p>
                    <p className="text-[11px]" style={{ color: GOLD }}>{r.roleKo}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section className="py-16 md:py-20 lg:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            eyebrow="자주 묻는 질문"
            title={
              <h2 className="apple-white-gradient font-extrabold text-[28px] sm:text-[36px] tracking-toss mb-14">
                FAQ
              </h2>
            }
            center
          />

          <StaggerReveal className="flex flex-col gap-4" staggerDelay={0.07}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <StaggerItem key={idx}>
                  <div className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300 hover-gold-border">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="text-white font-semibold text-[15px] sm:text-[16px] leading-relaxed">
                        {item.question}
                      </span>
                      <motion.span
                        className="text-white/40 text-[18px] shrink-0 font-light select-none"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        ▼
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 sm:px-8 pb-6 text-white/60 text-[13px] sm:text-[14px] leading-relaxed border-t border-white/5 pt-4 bg-white/[0.01]">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ 최종 CTA ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="text-white font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
              33개 에이전트, 지금부터 <span style={{ color: GOLD }}>구독</span>해보세요.
            </h2>
            <motion.button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[15px] cursor-pointer border-none"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              구독 문의하기 →
            </motion.button>
            <p className="text-white/20 text-[12px] mt-3">언제든 해지 가능 · 위약금 없음</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
