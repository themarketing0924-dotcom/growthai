import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CheckCircle2, ChevronRight, BarChart3, Users, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

/* ════════════════════════════════════════
   DESIGN TOKENS — 전 섹션 공통 (Sellscore + Apple style)
   ────────────────────────────────────────
   BG:           #000000
   SURFACE-1:    #0a0a0a   (섹션 배경 교체용)
   SURFACE-2:    #111111   (카드 배경)
   BORDER:       rgba(255,255,255,0.08)
   GOLD:         #C9A84C
   GOLD-DIM:     rgba(201,168,76,0.15)
   TEXT-H:       #ffffff
   TEXT-BODY:    rgba(255,255,255,0.55)
   TEXT-MUTED:   rgba(255,255,255,0.28)
   LABEL:        #C9A84C  + tracking-widest uppercase text-[11px]
   H1:           clamp(36px,6vw,72px)  font-bold
   H2:           clamp(28px,4vw,48px)  font-bold
   H3:           18px~20px  font-semibold
   BODY:         15px~16px  leading-relaxed
   SECTION-PY:   py-28 (112px)
   CARD-P:       p-6 sm:p-8
   RADIUS:       rounded-2xl (카드)  rounded-full (배지/버튼)
   EASE:         [0.16, 1, 0.3, 1]   (Toss/Apple 시그니처)
   ANIMATION:    fadeUp (y:40→0, opacity 0→1), stagger 0.08s
════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── 공용 섹션 페이드업 애니메이션 ─── */
function FadeUp({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── 섹션 라벨 (LABEL 토큰) ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A84C] mb-4">{children}</p>
  );
}

/* ─── 섹션 헤드라인 ─── */
function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-bold text-white leading-[1.15] tracking-toss break-keep ${className}`}
      style={{ fontSize: 'var(--text-heading)' }}
    >
      {children}
    </h2>
  );
}

export default function MainLandingPage() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(5).fill(false));
  const heroRef = useRef<HTMLElement>(null);

  /* 히어로 패럴랙스 & 스케일 축소 */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };
  const checkCount = checkedItems.filter(Boolean).length;

  return (
    <>
      <Seo
        title="GrowthAI — AI 온라인 강의와 수익화 퍼널 교육"
        description="AI 도구 사용법을 넘어 온라인 강의, 랜딩페이지, 콘텐츠, 자동화 퍼널을 수익 구조로 연결하는 GrowthAI 교육입니다."
        canonical="/"
        image={DEFAULT_OG_IMAGE}
        siteName={SITE_NAME}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://www.growthai.kr/#website',
              'url': 'https://www.growthai.kr/',
              'name': 'GrowthAI',
              'description': 'AI 온라인 강의와 수익화 퍼널 교육',
              'inLanguage': 'ko-KR',
              'publisher': {
                '@id': 'https://www.growthai.kr/#organization'
              }
            },
            {
              '@type': 'EducationalOrganization',
              '@id': 'https://www.growthai.kr/#organization',
              'name': 'GrowthAI',
              'url': 'https://www.growthai.kr/',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://www.growthai.kr/ceo-photo-smooth.png'
              },
              'sameAs': [
                'https://www.youtube.com/@aicitybuilders'
              ]
            }
          ]
        }}
      />

      <div
        className="bg-black text-white min-h-screen overflow-x-hidden"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "SF Pro Display", sans-serif' }}
      >
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* ══════════════════════════════════════════
            [S1] HERO — 패럴랙스 + 애플 스타일 타이포
        ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-24 px-6 text-center overflow-hidden">
          {/* 배경 그라디언트 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,168,76,0.12),transparent)] pointer-events-none" />
          {/* 미묘한 그리드 패턴 */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />

          <motion.div
            className="relative z-10 w-full max-w-3xl mx-auto"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            {/* 배지 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/8 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">AI 온라인 강의 · 무료 진단 · 수익화 퍼널</span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-bold text-white leading-[1.12] mb-6 break-keep"
              style={{ fontSize: 'var(--text-hero)', letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              AI를 배우는 데서 끝내지 말고,<br />
              고객이 들어오고 결제하는<br />
              <span style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #e8c96a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                온라인 수익 구조로 바꾸세요.
              </span>
            </motion.h1>

            {/* 서브 */}
            <motion.p
              className="text-white/55 mb-10 leading-relaxed break-keep"
              style={{ fontSize: 'var(--text-body-lg)', maxWidth: '540px', margin: '0 auto 2.5rem' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              GrowthAI는 ChatGPT 사용법만 가르치지 않습니다. 랜딩페이지, 콘텐츠, 강의 상품, 프롬프트, 자동화 에이전트를&nbsp;
              <strong className="text-white font-semibold">하나의 판매 퍼널</strong>로 연결해 실제 문의와 결제까지 이어지게 만듭니다.
              <br />먼저 <strong className="text-white font-semibold">3분 무료 진단</strong>으로 지금 막힌 지점을 확인하세요.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
            >
              <Link
                to="/diagnose"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg,#C9A84C,#e8c96a)', color: '#000', fontSize: '15px', boxShadow: '0 0 32px rgba(201,168,76,0.35)' }}
              >
                내 수익화 구조 무료 진단받기 <ChevronRight size={16} />
              </Link>
              <Link to="/enroll"
                className="text-white/55 border-white/12 inline-flex items-center gap-2 px-6 py-4 rounded-full border font-medium text-sm transition-all hover:border-white/20"
                style={{ fontSize: '14px' }}
              >
                강의 전체 보기
              </Link>
            </motion.div>

            <motion.p
              className="text-white/25 mt-5 text-[12px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              무료 진단 후 강의, 가이드, 에이전트 중 맞는 다음 단계를 안내합니다.
            </motion.p>
          </motion.div>
        </section>

        {/* 섹션 구분선 */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ══════════════════════════════════════════
            [S2] 공감 체크리스트
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: '#0a0a0a' }}>
          <div className="max-w-2xl mx-auto">
            <FadeUp className="text-center mb-14">
              <SectionLabel>공감 체크</SectionLabel>
              <SectionTitle>혹시 지금, 이런 상황 아니신가요?</SectionTitle>
              <p className="text-white/45 mt-4 text-[15px] leading-relaxed">
                해당되는 항목을 체크해보세요.
              </p>
            </FadeUp>

            <div className="space-y-3">
              {[
                'AI 강의는 많이 봤지만 내 상품 판매로 연결되지 않는다.',
                '홈페이지, 블로그, 영상, SNS가 따로 놀고 있다.',
                '무료 자료는 있지만 상담이나 결제까지 이어지는 흐름이 없다.',
                '프롬프트는 쌓였는데 반복 가능한 업무 시스템은 없다.',
                '온라인 강의나 구독 상품을 만들고 싶지만 구조가 막막하다.',
              ].map((text, idx) => (
                <FadeUp key={idx} delay={idx * 0.07}>
                  <button
                    onClick={() => toggleCheck(idx)}
                    className="w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 flex items-center gap-4"
                    style={{
                      background: checkedItems[idx] ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)',
                      borderColor: checkedItems[idx] ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all"
                      style={{
                        background: checkedItems[idx] ? '#C9A84C' : 'transparent',
                        borderColor: checkedItems[idx] ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                      }}>
                      {checkedItems[idx] && <CheckCircle2 size={13} color="#000" />}
                    </div>
                    <span className={`text-[14px] sm:text-[15px] font-medium leading-snug ${checkedItems[idx] ? 'text-white' : 'text-white/60'}`}>
                      {text}
                    </span>
                  </button>
                </FadeUp>
              ))}
            </div>

            {checkCount >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-2xl border text-center"
                style={{ background: 'rgba(201,168,76,0.06)', borderColor: 'rgba(201,168,76,0.3)' }}
              >
                <p className="font-bold text-[15px]" style={{ color: '#C9A84C' }}>⚠️ 경고: {checkCount}개 해당 — 지금 구조를 점검해야 할 때입니다.</p>
              </motion.div>
            )}
          </div>
        </section>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ══════════════════════════════════════════
            [S3] 5단계 파이프라인 문제 진단
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-black">
          <div className="max-w-3xl mx-auto">
            <FadeUp className="text-center mb-16">
              <SectionLabel>퍼널 진단</SectionLabel>
              <SectionTitle>수익은 페이지 하나가 아니라 흐름에서 나옵니다.</SectionTitle>
              <p className="text-white/45 mt-4 text-[15px] leading-relaxed break-keep" style={{ maxWidth: '480px', margin: '1rem auto 0' }}>
                <span style={{ color: '#C9A84C', fontWeight: 600 }}>유입, 신뢰, 교육, 제안, 결제</span>가 한 줄로 연결되어야 합니다.
                GrowthAI는 이 흐름을 강의와 실습으로 하나씩 완성합니다.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { step: '01', title: '유입 설계', desc: '검색, 숏폼, 블로그에서 들어올 이유 만들기', icon: <Users size={20} strokeWidth={1.5} /> },
                { step: '02', title: '신뢰 설계', desc: '누가 왜 가르치는지 한눈에 증명하기', icon: <ShieldCheck size={20} strokeWidth={1.5} /> },
                { step: '03', title: '교육 설계', desc: '무료 가이드와 맛보기 강의로 이해시키기', icon: <BarChart3 size={20} strokeWidth={1.5} /> },
                { step: '04', title: '상품 설계', desc: '입문, 실전, VVIP로 선택지를 분명히 나누기', icon: <CheckCircle2 size={20} strokeWidth={1.5} /> },
                { step: '05', title: '자동화 설계', desc: '문의, 과제, 구독, 시스템으로 자동 연결', icon: <Zap size={20} strokeWidth={1.5} /> },
                { step: '06', title: '팬덤·재구매 설계', desc: '후기, 지인 추천, 커뮤니티 팬덤으로 순환 유도', icon: <Sparkles size={20} strokeWidth={1.5} /> },
              ].map((item, i) => (
                <FadeUp key={item.step} delay={i * 0.07}>
                    <div className="h-full p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] border-white/8 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                        {item.icon}
                      </div>
                      <span className="text-white/30 text-[10px] font-bold tracking-[0.18em] uppercase">STEP {item.step}</span>
                    </div>
                    <h3 className="text-[17px] font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ══════════════════════════════════════════
            [S4] K.S.P. 프레임워크 — 맥북 스타일 3열
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: '#0a0a0a' }}>
          <div className="max-w-3xl mx-auto">
            <FadeUp className="text-center mb-16">
              <SectionLabel>학습 경로</SectionLabel>
              <SectionTitle>처음 배우는 사람도 다음 단계가 보여야 합니다.</SectionTitle>
              <p className="text-white/30 mt-3 text-[14px] tracking-widest uppercase">
                무료 진단 → 온라인 강의 → 자동화 실행
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { num: '01', key: 'Diagnose', sub: '막힌 지점 찾기', desc: '내 사이트와 콘텐츠가 왜 문의와 결제로 이어지지 않는지 먼저 확인합니다.' },
                { num: '02', key: 'Learn', sub: '강의로 구조 만들기', desc: 'AI 도구 사용법이 아니라 랜딩, 콘텐츠, 상품, 자동화를 연결하는 방법을 배웁니다.' },
                { num: '03', key: 'Launch', sub: '결과물로 실행하기', desc: '과제와 템플릿을 따라 내 강의, 상세페이지, 에이전트, 구독 상품을 실제로 만듭니다.' },
              ].map((item, i) => (
                <FadeUp key={item.num} delay={i * 0.1}>
                  <div className="h-full p-7 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
                    <div className="text-[48px] font-black leading-none mb-6" style={{ color: 'rgba(201,168,76,0.15)', letterSpacing: '-0.04em' }}>{item.num}</div>
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: '#C9A84C' }}>{item.key}</p>
                    <h3 className="text-[18px] font-semibold text-white mb-3">{item.sub}</h3>
                    <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ══════════════════════════════════════════
            [S5] 운영자 권위 — 좌우 레이아웃
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-black">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <FadeUp className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-3xl overflow-hidden mx-auto md:mx-0"
              style={{ border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 0 40px rgba(201,168,76,0.1)' } as React.CSSProperties}>
              <img src="/IMG_5545.PNG" alt="KOI LEE" className="w-full h-full object-cover object-top" />
            </FadeUp>
            <FadeUp delay={0.1} className="flex-1 text-center md:text-left">
              <SectionLabel>왜 GrowthAI인가</SectionLabel>
              <blockquote className="font-bold text-white leading-snug mb-4 break-keep"
                style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
                "AI를 잘 쓰는 사람보다, AI로 팔리는 구조를 만드는 사람이 살아남습니다."
              </blockquote>
              <p className="text-white/50 text-[14px] leading-relaxed mb-6 break-keep">
                GrowthAI는 도구 목록을 늘리는 교육이 아닙니다. 고객이 처음 보는 순간부터 무료 자료를 받고, 강의를 듣고, 상품을 구매하고, 다시 찾는&nbsp;
                <strong className="text-white font-semibold">전체 흐름을 설계하는 교육</strong>입니다.
              </p>
              <Link to="/about" className="inline-flex items-center gap-1.5 text-[14px] font-semibold hover:gap-3 transition-all" style={{ color: '#C9A84C' }}>
                운영자 철학 보기 <ChevronRight size={15} />
              </Link>
            </FadeUp>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ══════════════════════════════════════════
            [S6] 소셜 프루프 (후기 3개)
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: '#0a0a0a' }}>
          <div className="max-w-3xl mx-auto">
            <FadeUp className="text-center mb-16">
              <SectionLabel>성과 사례</SectionLabel>
              <SectionTitle>수강생은 도구가 아니라 결과물을 가져가야 합니다.</SectionTitle>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { author: '온라인 강의 준비생', text: '막연히 강의를 만들려고 했는데, 무료 가이드부터 결제 페이지까지 어떤 순서로 만들어야 하는지 보였습니다.' },
                { author: '1인 사업자', text: 'AI 툴을 배우는 데서 멈추지 않고 블로그, 랜딩, 상담 흐름을 하나로 묶을 수 있었습니다.' },
                { author: '프리랜서 강사', text: '프롬프트보다 먼저 상품 구조와 제안 문장을 정리하니 문의 응대가 훨씬 쉬워졌습니다.' },
              ].map((review, idx) => (
                <FadeUp key={idx} delay={idx * 0.08}>
                  <div className="h-full flex flex-col p-6 sm:p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
                    <div className="text-[13px] mb-4" style={{ color: '#C9A84C' }}>★★★★★</div>
                    <p className="text-white/50 text-[14px] leading-relaxed flex-grow mb-5">
                      "{review.text}"
                    </p>
                    <p className="text-white/30 text-[12px] font-semibold">— {review.author}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ══════════════════════════════════════════
            [S7] 하단 CTA — 풀스크린 강조
        ══════════════════════════════════════════ */}
        <section className="py-36 px-6 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,168,76,0.08),transparent)] pointer-events-none" />
          <FadeUp className="relative z-10 max-w-2xl mx-auto text-center">
            <SectionLabel>지금 바로</SectionLabel>
            <SectionTitle className="mb-6">
              지금 필요한 건 더 많은 AI 정보가 아니라,<br />
              내 상품으로 이어지는 실행 순서입니다.
            </SectionTitle>
            <p className="text-white/45 text-[15px] leading-relaxed mb-12 break-keep" style={{ maxWidth: '440px', margin: '0 auto 3rem' }}>
              무료 진단으로 막힌 지점을 확인하고, 강의와 가이드 중 지금 필요한 다음 단계를 선택하세요.
            </p>
            <Link
              to="/diagnose"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold transition-all duration-300 hover:scale-[1.04]"
              style={{ background: 'linear-gradient(135deg,#C9A84C,#e8c96a)', color: '#000', fontSize: '16px', boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}
            >
              무료 진단으로 내 다음 단계 찾기
            </Link>
            <p className="text-white/20 mt-5 text-[12px]">
              * 맞춤형 진단 리포트 및 [거장 12인 전자책(99,000원 상당)]은 한시적으로만 무료 제공됩니다.
            </p>
          </FadeUp>
        </section>

        <Footer lang="ko" />
      </div>
    </>
  );
}
