import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Shield } from 'lucide-react';
import { IconHourglass, IconChartDown, IconAiNetwork } from './components/icons/TossIcons';
import { PageTransition } from './components/PageTransition';
import { Navbar } from './components/Navbar';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from './components/ScrollReveal';
import CeoPage from './pages/CeoPage';
import BasicsPage from './pages/BasicsPage';
import GalleryPage from './pages/GalleryPage';
import LivePage from './pages/LivePage';
import CommunityPage from './pages/CommunityPage';
import HomeworkPage from './pages/HomeworkPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import EnrollPage from './pages/EnrollPage';
import { VIDEO_URLS } from './config/videos';
import { SITE_CONFIG } from './config/content';
import { Footer } from './components/Footer';
import BlogPage from './pages/BlogPage';
import ToolDetailPage from './pages/ToolDetailPage';
import PromptsPage from './pages/PromptsPage';
import CourseLandingPage from './pages/CourseLandingPage';
import CourseAIPage from './pages/CourseAIPage';
import ToolSalesPage from './pages/ToolSalesPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import LessonPage from './pages/LessonPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './components/Seo';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({ target: heroSectionRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScrollY, [0, 1], ['0%', '22%']);

  const content = SITE_CONFIG[lang];

  /* ── Entrance delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ── Hero 영상 슬로우모션 (0.1배속) ── */
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const setSlowSpeed = () => { video.playbackRate = 0.1; };
    video.addEventListener('loadeddata', setSlowSpeed);
    video.addEventListener('play', setSlowSpeed);
    setSlowSpeed();
    return () => {
      video.removeEventListener('loadeddata', setSlowSpeed);
      video.removeEventListener('play', setSlowSpeed);
    };
  }, []);

  const routeLocation = useLocation();

  const subNavbar = <Navbar entranceComplete lang={lang} setLang={setLang} />;
  const wrap = (Page: React.ReactNode) => (
    <>{subNavbar}<PageTransition>{Page}</PageTransition></>
  );

  return (
    <AnimatePresence mode="wait">
    <Routes location={routeLocation} key={routeLocation.pathname}>
      <Route path="/ceo"       element={wrap(<CeoPage />)} />
      <Route path="/basics"    element={wrap(<BasicsPage />)} />
      <Route path="/gallery"   element={wrap(<GalleryPage />)} />
      <Route path="/live"      element={wrap(<LivePage />)} />
      <Route path="/community" element={wrap(<CommunityPage />)} />
      <Route path="/homework"  element={wrap(<HomeworkPage />)} />
      <Route path="/partner"   element={wrap(<PartnerPage />)} />
      <Route path="/contact"   element={wrap(<ContactPage />)} />
      <Route path="/terms"     element={wrap(<TermsPage />)} />
      <Route path="/privacy"   element={wrap(<PrivacyPage />)} />
      <Route path="/enroll"    element={wrap(<EnrollPage lang={lang} />)} />
      <Route path="/dashboard" element={wrap(<DashboardPage />)} />
      <Route path="/blog"       element={wrap(<BlogPage />)} />
      <Route path="/prompts"    element={wrap(<PromptsPage />)} />
      <Route path="/course/ai"     element={wrap(<CourseAIPage />)} />
      <Route path="/product/:toolId" element={wrap(<ToolSalesPage />)} />
      <Route path="/lesson" element={wrap(<LessonPage />)} />
      <Route path="/portfolio/:workId" element={wrap(<PortfolioDetailPage />)} />
      <Route path="/course/:slug" element={wrap(<CourseLandingPage />)} />
      <Route path="/tools/:slug" element={<ToolDetailPage lang={lang} />} />
      <Route path="/" element={
    <>
      <Seo
        title="GrowthAI — 마케팅 × AI 실전 클래스"
        description="랜딩페이지, 상세페이지, 프롬프트, 자동화, 강의 판매까지 연결되는 구매 전환형 AI 마케팅 사이트입니다."
        canonical="/"
        image={DEFAULT_OG_IMAGE}
        keywords={['AI 마케팅', '랜딩페이지', '상세페이지', '프롬프트', '자동화', '구매 전환']}
        siteName={SITE_NAME}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description: 'AI 마케팅과 구매 전환 구조를 결합한 GrowthAI 메인 사이트',
        }}
      />
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Navbar entranceComplete={entranceComplete} lang={lang} setLang={setLang} />

      {/* ════════════════ SECTION 1: HERO ════════════════ */}
      <section ref={heroSectionRef} className="relative h-screen h-[100dvh] flex flex-col overflow-hidden">
        {/* Video background (Autoplaying smoothly) */}
        {VIDEO_URLS.hero && (
          <video
            ref={heroVideoRef}
            src={VIDEO_URLS.hero}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            autoPlay
            loop
            preload="auto"
          />
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Color correction — 핑크 제거, 블랙+골드 톤 */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(10,8,0,0.55) 0%, rgba(30,20,0,0.45) 50%, rgba(0,0,0,0.6) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 30% 60%, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.05,
          }}
        />

        {/* Watermark text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ paddingTop: 50 }}
        >
          <span
            className="uppercase select-none font-bold tracking-tight text-white/5 opacity-10"
            style={{
              fontSize: 'clamp(100px, 20vw, 400px)',
              lineHeight: 1,
            }}
          >
            {content.hero.watermark}
          </span>
        </div>

        {/* Hero content — 중앙 정렬 */}
        <motion.div
          className="relative z-20 flex flex-col flex-1 px-6 sm:px-10 md:px-16 pt-24 pb-16 items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          style={{ y: heroY }}
          transition={{ duration: 1 }}
        >
          {/* 배지 */}
          <motion.p
            className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-5"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: 10 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.hero.badge}
          </motion.p>

          {/* 메인 헤드라인 */}
          <motion.h1
            className={`apple-white-gradient font-extrabold leading-[1.06] tracking-toss max-w-4xl${lang === 'en' ? ' font-display' : ''}`}
            style={{ fontSize: 'clamp(36px, 6vw, 84px)' }}
            initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
            animate={entranceComplete ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.hero.titleLeft[0]}
            <br />
            <span className="apple-gold-gradient">{content.hero.titleLeft[1]}</span>
          </motion.h1>

          {/* 서브 헤드라인 */}
          <motion.p
            className="mt-4 mb-2 font-bold"
            style={{ fontSize: 'clamp(18px, 2.8vw, 30px)', color: 'rgba(255,255,255,0.55)' }}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={entranceComplete ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.hero.titleRight[0]}{' '}
            <span className="apple-gold-gradient">{content.hero.titleRight[1]}</span>
          </motion.p>

          {/* 설명 */}
          <motion.p
            className="text-[14px] sm:text-[16px] leading-relaxed max-w-2xl mt-5"
            style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'pre-line' }}
            initial={{ opacity: 0, y: 20 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.hero.description}
          </motion.p>
        </motion.div>
      </section>

      {/* ════════════════ SECTION 2: CINEMATIC HOOK ════════════════ */}
      <section className="dark-section relative flex items-center justify-center overflow-hidden py-20 md:py-24 lg:py-32 border-y border-white/5">
        {VIDEO_URLS.section2 && (
          <video
            src={VIDEO_URLS.section2}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline muted autoPlay loop preload="none"
          />
        )}
        <div className="absolute inset-0 bg-black/78 z-10" />
        {/* 골드 글로우 */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-5 md:gap-7">

          {/* 배지 */}
          <motion.span
            className="inline-block text-[11px] tracking-[0.25em] uppercase font-bold px-4 py-1.5 rounded-full border"
            style={{ color: '#C9A84C', borderColor: 'rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            검증된 백만장자 마케팅 × AI 자동화
          </motion.span>

          {/* 메인 슬로건 */}
          <motion.h2
            className="apple-white-gradient font-extrabold tracking-toss leading-[1.12]"
            style={{ fontSize: 'clamp(28px, 5.5vw, 66px)' }}
            initial={{ opacity: 0, y: 36, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            1명이 100명을 이기는 공식,<br />
            <span className="apple-gold-gradient">이제 AI로 10배 더 빠르게!</span>
          </motion.h2>

          {/* 서브 한 줄 */}
          <motion.p
            className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            팔리는 마케팅 공식 + AI 자동화로 혼자서도 팀을 이깁니다.
          </motion.p>

        </div>
      </section>

      {/* ════════════════ PAIN SECTION (Jay Abraham PAS Frame) ════════════════ */}
      <section className="relative py-16 md:py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow={lang === 'ko' ? '지금 이 순간, 당신의 현실' : 'THE REAL PROBLEM'}
            title={
              <h2
                className={`apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-4${lang === 'en' ? ' font-display' : ''}`}
                style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
              >
                {lang === 'ko' ? (
                  <>혼자 다 하려다<br /><span className="apple-gold-gradient">아무것도 못하고 있지 않으신가요?</span></>
                ) : (
                  <>Trying to do everything alone<br /><span className="apple-gold-gradient">— and getting nowhere?</span></>
                )}
              </h2>
            }
            subtitle={
              <p className="text-white/40 text-[14px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto mb-12">
                {lang === 'ko'
                  ? '소상공인, 1인 창업자, 부업 희망자 모두 같은 벽에 부딪힙니다. AI가 도움이 된다고 들었지만, 어디서 시작해야 할지 막막합니다.'
                  : "Solo founders, small business owners, side hustlers — everyone hits the same wall. You know AI can help, but you don't know where to start."}
              </p>
            }
            center
          />

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.13}>
            {[
              {
                iconEl: <IconHourglass size={22} className="text-[#C9A84C]" />,
                iconBg: 'rgba(201,168,76,0.09)', iconBorder: 'rgba(201,168,76,0.25)',
                titleKo: '시간이 없다', titleEn: 'No Time',
                descKo: '영상 편집, SNS 업로드, 고객 응대... 하루가 콘텐츠 생산에만 사라집니다. 정작 수익이 되는 일은 못 합니다.',
                descEn: 'Video editing, posting, customer service... Your entire day disappears on production. No time left for actual revenue.',
              },
              {
                iconEl: <IconChartDown size={22} className="text-[#E05C5C]" />,
                iconBg: 'rgba(224,92,92,0.09)', iconBorder: 'rgba(224,92,92,0.25)',
                titleKo: '수익이 정체됐다', titleEn: 'Revenue Plateaued',
                descKo: '열심히 하는데도 구독자도, 매출도 제자리입니다. 방법을 몰라 감각에만 의존하다 지쳐갑니다.',
                descEn: "Working hard but subscribers and revenue won't budge. Running on gut feeling and burning out.",
              },
              {
                iconEl: <IconAiNetwork size={22} className="text-[#4AADCC]" />,
                iconBg: 'rgba(74,173,204,0.09)', iconBorder: 'rgba(74,173,204,0.25)',
                titleKo: 'AI는 어렵다', titleEn: 'AI Feels Overwhelming',
                descKo: 'ChatGPT, Sora, N8N... 툴은 넘쳐나지만 뭘 써야 할지, 어떻게 연결해야 할지 갈피를 잡지 못합니다.',
                descEn: 'ChatGPT, Sora, N8N... tools everywhere but no roadmap on how to combine them effectively.',
              },
            ].map((pain, i) => (
              <StaggerItem key={i}>
                <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover-gold-border transition-all h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: pain.iconBg, border: `1px solid ${pain.iconBorder}` }}
                  >
                    {pain.iconEl}
                  </div>
                  <h3 className="text-white font-bold text-[20px] tracking-toss">
                    {lang === 'ko' ? pain.titleKo : pain.titleEn}
                  </h3>
                  <p className="text-white/50 text-[14px] leading-relaxed">
                    {lang === 'ko' ? pain.descKo : pain.descEn}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* 진단 — 문제의 진짜 원인 */}
          <ScrollReveal delay={0.2} className="mt-14">
            <div className="rounded-2xl p-8 sm:p-10 text-center mb-10" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="text-[13px] font-extrabold tracking-[0.2em] uppercase mb-4" style={{ color: '#C9A84C' }}>
                {lang === 'ko' ? '진단' : 'DIAGNOSIS'}
              </p>
              <h3 className="font-extrabold leading-[1.2] mb-5" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)', color: '#ffffff' }}>
                {lang === 'ko' ? (
                  <>문제는 AI 도구가 아닙니다.<br /><span style={{ color: '#C9A84C' }}>설득 공식이 없는 겁니다.</span></>
                ) : (
                  <>The problem isn't your AI tools.<br /><span style={{ color: '#C9A84C' }}>You're missing a persuasion formula.</span></>
                )}
              </h3>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-2xl mx-auto">
                {lang === 'ko' ? (
                  <>딸깍 한 번에 월 1,000만 원? 그런 거짓말이 아닙니다.<br />
                  어떤 도구도, 어떤 영상도 — <strong className="text-white/80">보는 사람을 설득하지 못하면</strong> 의미가 없습니다.<br />
                  AI는 실행 속도를 높이는 도구일 뿐, <strong className="text-white/80">팔리게 만드는 건 설득 구조</strong>입니다.</>
                ) : (
                  <>One click to $10K a month? That's not how it works.<br />
                  No tool, no video means anything if it can't <strong className="text-white/80">persuade the person watching</strong>.<br />
                  AI just makes execution faster — <strong className="text-white/80">what actually sells is the persuasion structure</strong> behind it.</>
                )}
              </p>
            </div>
          </ScrollReveal>

          {/* 해결책 — 우리만의 공식 */}
          <ScrollReveal delay={0.3} className="text-center">
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-4" style={{ color: '#C9A84C' }}>
              {lang === 'ko' ? '우리의 해결책' : 'OUR SOLUTION'}
            </p>
            <h3 className="font-extrabold leading-[1.15] mb-5" style={{ fontSize: 'clamp(24px, 3.8vw, 44px)', color: '#ffffff' }}>
              {lang === 'ko' ? (
                <>마케팅 거장들의<br /><span style={{ color: '#C9A84C' }}>단 하나의 설득 공식</span>을<br />AI에 학습시키면</>
              ) : (
                <>Teach AI the one<br /><span style={{ color: '#C9A84C' }}>persuasion formula</span><br />marketing legends use</>
              )}
            </h3>
            <p className="text-white/55 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              {lang === 'ko' ? (
                <>어떤 상품이든, 어떤 아이템이든 —<br />
                <strong className="text-white/85">한번 배워두면 평생 써먹는 설득 구조 + AI 실행</strong>으로<br />
                10배 빠르게 구매 전환을 만들어냅니다.</>
              ) : (
                <>Any product, any offer —<br />
                <strong className="text-white/85">a persuasion structure you learn once and use for life, powered by AI execution,</strong><br />
                converts 10x faster.</>
              )}
            </p>
            <motion.button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[16px] cursor-pointer border-none"
              style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === 'ko' ? '설득 공식 배우러 가기 →' : 'Learn the Formula →'}
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 3: METRICS (숫자로 먼저 신뢰) ════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-32 px-6 flex items-center justify-center overflow-hidden border-b border-white/5">
        {VIDEO_URLS.metrics && (
          <video src={VIDEO_URLS.metrics} className="absolute inset-0 w-full h-full object-cover" playsInline muted autoPlay loop preload="none" />
        )}
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="relative z-20 max-w-6xl mx-auto w-full">
          <ScrollReveal blur className="text-center mb-16">
            <p className="text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-bold eyebrow-gold">
              {content.metrics.subtitle}
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-10 text-center" staggerDelay={0.15}>
            {content.metrics.items.map((m) => (
              <StaggerItem key={m.label}>
                <div
                  className="font-extrabold tracking-toss-tight leading-none"
                  style={{ fontSize: 'clamp(22px, 5.2vw, 96px)', color: '#C9A84C', wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
                >
                  {m.value}
                </div>
                <div className="text-white/50 text-[11px] sm:text-[14px] md:text-[16px] mt-3 sm:mt-5 tracking-wide font-semibold">
                  {m.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 3.5: TESTIMONIALS (숫자 뒤 실제 후기) ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 bg-black border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-3" style={{ color: '#C9A84C' }}>
              {lang === 'ko' ? '수강생 후기' : 'STUDENT STORIES'}
            </p>
            <h2 className="apple-white-gradient font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              {lang === 'ko' ? '"저도 처음엔 똑같았어요"' : '"I was exactly where you are"'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {[
              {
                textKo: '수강 3주 만에 AI로 전자책 완성하고 스마트스토어에 올렸어요. 진짜 되더라고요.',
                textEn: 'In just 3 weeks I finished an AI-written eBook and listed it on my store. It actually works.',
                nameKo: '김○○', roleKo: '직장인 → 부업 창업자',
                nameEn: 'Kim', roleEn: 'Employee → Side-business founder',
              },
              {
                textKo: 'N8N으로 고객 응대 자동화했더니 하루 4시간이 생겼습니다. 그 시간에 매출 만들어요.',
                textEn: 'Automating customer support with N8N gave me back 4 hours a day — now I spend that time making money.',
                nameKo: '박○○', roleKo: '소상공인',
                nameEn: 'Park', roleEn: 'Small business owner',
              },
              {
                textKo: '50대인데 AI 쓸 수 있을까 걱정했는데, 3개월 후 월 450만 원 만들었습니다.',
                textEn: 'I was in my 50s and worried I couldn’t use AI. Three months later I was making ₩4.5M a month.',
                nameKo: '한○○', roleKo: '50대 원장 → 1인 기업가',
                nameEn: 'Han', roleEn: 'Director in his 50s → Solopreneur',
              },
            ].map((r, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-2xl p-6 flex flex-col gap-3 border border-white/8 bg-white/[0.02]">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: '#C9A84C', fontSize: 13 }}>★</span>
                    ))}
                  </div>
                  <p className="text-white/70 text-[14px] leading-relaxed flex-1">
                    "{lang === 'ko' ? r.textKo : r.textEn}"
                  </p>
                  <div className="pt-3 border-t border-white/6">
                    <p className="text-white font-semibold text-[13px]">{lang === 'ko' ? r.nameKo : r.nameEn}</p>
                    <p className="text-[11px]" style={{ color: '#C9A84C' }}>{lang === 'ko' ? r.roleKo : r.roleEn}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 4: FOUNDER PROFILE (숫자 뒤 "누가 만들었나" 신뢰 심화) ════════════════ */}
      <section className="relative bg-black py-16 md:py-20 lg:py-32 px-6 flex items-center border-b border-white/5">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left: 사진 + 프로필 요약 */}
          <ScrollReveal fromLeft className="md:col-span-5 flex flex-col gap-6">
            <span className="text-white/30 text-[12px] tracking-[0.2em] uppercase font-semibold">
              {content.founder.subtitle}
            </span>

            <div className="w-full max-w-[220px] aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src={content.founder.photo}
                alt={content.founder.name}
                className="w-full h-full object-cover object-top brightness-[1.08]"
              />
              <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 50px 8px #000', pointerEvents: 'none' }} />
            </div>

            <div>
              <h2 className="apple-white-gradient font-extrabold tracking-toss mb-2" style={{ fontSize: 'clamp(34px, 5vw, 58px)' }}>
                {content.founder.name}
              </h2>
              <p className="text-white/50 text-[14px] sm:text-[15px] font-medium">
                {content.founder.title}
              </p>
            </div>
            <div className="w-16 h-[2px]" style={{ backgroundColor: '#C9A84C', opacity: 0.55 }} />
            <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed italic bg-white/5 p-5 rounded-xl border border-white/10">
              {content.founder.philosophyQuote}
            </p>
            <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed">
              {content.founder.description}
            </p>
            <button
              onClick={() => navigate('/ceo')}
              className="self-start text-[13px] font-semibold cursor-pointer bg-transparent border-none flex items-center gap-1.5 transition-colors"
              style={{ color: '#C9A84C' }}
            >
              {lang === 'ko' ? '멘토 스토리 더 알아보기' : 'Read the full story'} →
            </button>
          </ScrollReveal>

          {/* Right: 저서 (실제 표지 이미지) */}
          <ScrollReveal fromRight delay={0.12} className="md:col-span-7 flex flex-col gap-8">
            <h3 className="text-white text-[18px] sm:text-[20px] font-bold tracking-tight border-b border-white/10 pb-4">
              {content.founder.booksHeader}
            </h3>
            <StaggerReveal className="flex flex-col gap-6" staggerDelay={0.12}>
              {content.founder.books.map((book, idx) => (
                <StaggerItem key={idx}>
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 flex gap-5 items-start hover:border-white/20 transition-all hover-gold-border">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 sm:w-20 rounded-lg shadow-xl border border-white/10 shrink-0"
                    />
                    <div>
                      <h4 className="text-white text-[16px] sm:text-[18px] font-semibold mb-2">
                        {book.title}
                      </h4>
                      <p className="text-white/55 text-[13px] sm:text-[14px] leading-relaxed">
                        {book.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 5: CURRICULUM (TECHNOLOGY) ════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-32 px-6 border-b border-white/5 overflow-hidden">
        {VIDEO_URLS.technology && (
          <video src={VIDEO_URLS.technology} className="absolute inset-0 w-full h-full object-cover" playsInline muted autoPlay loop preload="none" />
        )}
        <div className="absolute inset-0 bg-black/85 z-10" />
        <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <ScrollReveal blur>
              <h2
                className={`apple-white-gradient font-extrabold leading-[1.1] tracking-toss${lang === 'en' ? ' font-display' : ''}`}
                style={{ fontSize: 'clamp(32px, 5.5vw, 62px)' }}
              >
                {content.technology.title[0]}
                <br />
                <span className="apple-gold-gradient">{content.technology.title[1]}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                {content.technology.description}
              </p>
            </ScrollReveal>
          </div>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.09}>
            {content.technology.features.map((f, i) => (
              <StaggerItem key={f.title}>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 transition-all flex flex-col gap-3 hover-gold-border h-full">
                  <span className="text-[12px] font-bold text-white/30 uppercase tracking-[0.1em]">
                    {lang === 'ko' ? `모듈 0${i + 1}` : `Module 0${i + 1}`}
                  </span>
                  <h3 className="text-white text-[15px] sm:text-[17px] font-bold">
                    {f.title}
                  </h3>
                  <p className="text-white/45 text-[13px] sm:text-[14px] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 6: ROADMAP (ARCHITECTURE) ════════════════ */}
      <section className="py-16 md:py-20 lg:py-32 px-6 bg-black border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            eyebrow={content.architecture.subtitle}
            title={
              <h2
                className={`apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-8${lang === 'en' ? ' font-display' : ''}`}
                style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}
              >
                {content.architecture.heading}
              </h2>
            }
            subtitle={
              <p className="text-white/45 text-[14px] sm:text-[16px] leading-relaxed max-w-xl mx-auto">
                {content.architecture.description}
              </p>
            }
            center
          />

          <StaggerReveal className="mt-16 flex flex-col items-center gap-4" staggerDelay={0.1}>
            {content.architecture.layers.map((l) => (
              <StaggerItem key={l.num} className="w-full max-w-md">
                <div className="min-h-[68px] border border-white/10 bg-white/[0.01] rounded-xl flex items-center justify-between px-6 py-4 transition-all hover-gold-border w-full">
                  <span className="text-white/30 text-[11px] tracking-[0.15em] uppercase font-bold">
                    {lang === 'ko' ? `단계 0${l.num}` : `Step 0${l.num}`}
                  </span>
                  <span className="text-white text-[15px] sm:text-[16px] font-semibold">
                    {l.name}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 7: PRICING ════════════════ */}
      <section id="pricing" className="bg-black py-16 md:py-20 lg:py-32 px-6 border-b border-white/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow={lang === 'ko' ? '수강 신청' : 'PRICING PLANS'}
            title={
              <h2
                className={`apple-white-gradient font-extrabold leading-[1.15] tracking-toss mb-6${lang === 'en' ? ' font-display' : ''}`}
                style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}
              >
                {lang === 'ko' ? '클래스 수강 신청' : 'Choose Your Plan'}
              </h2>
            }
            subtitle={
              <p className="text-white/45 text-[14px] sm:text-[16px] leading-relaxed max-w-xl mx-auto mb-20">
                {lang === 'ko'
                  ? '본인의 성장과 수익화 로드맵에 알맞은 강의 패키지를 선택해 보세요.'
                  : 'Select the program that fits your goals and monetization roadmap.'}
              </p>
            }
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* ── 1. 구독 멤버십 (월간 구독 Pass) ── */}
            <ScrollReveal scale delay={0}
              className="border border-white/10 rounded-2xl p-8 flex flex-col bg-white/[0.01]"
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">
                {lang === 'ko' ? '월간 멤버십 (구독)' : 'Monthly Pass'}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[32px] font-extrabold tracking-tight">₩49,000</span>
                <span className="text-white/30 text-[13px] ml-1">/ $39 ({lang === 'ko' ? '월' : 'mo'})</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                {lang === 'ko' ? '매주 신규 템플릿과 프롬프트 분석 리포트 정기 구독.' : 'Get weekly new templates and prompt analysis reports.'}
              </p>
              <ul className="flex flex-col gap-3.5 mb-10 flex-1 border-t border-white/5 pt-6">
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '매주 실전 프롬프트 템플릿' : 'Weekly practical templates'}
                </li>
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '유튜브 최신 트렌드/알고리즘 리포트' : 'YouTube algorithm trend reports'}
                </li>
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '수강생 전용 비공개 Q&A' : 'Exclusive Q&A channel'}
                </li>
              </ul>
              <button
                onClick={() => navigate('/course/monthly')}
                className="w-full py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', backgroundColor: 'transparent' }}
              >
                {lang === 'ko' ? '자세히 보기 →' : 'View Details →'}
              </button>
            </ScrollReveal>

            {/* ── 2. 실전 코스 (Bootcamp - Featured) ── */}
            <ScrollReveal scale delay={0.1}
              className="rounded-2xl p-8 flex flex-col relative bg-white/[0.03] scale-100 md:scale-105 shadow-xl shadow-black/50 border"
              style={{ borderColor: 'rgba(201,168,76,0.35)' } as React.CSSProperties}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-black text-[11px] font-extrabold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: '#C9A84C' }}>
                  {lang === 'ko' ? '인기 과정' : 'Most Popular'}
                </span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">
                {lang === 'ko' ? '유튜브 숏폼 실전반' : 'Shorts Bootcamp'}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[32px] font-extrabold tracking-tight">₩390,000</span>
                <span className="text-white/30 text-[13px] ml-1">/ $290 ({lang === 'ko' ? '평생 소장' : 'Lifetime'})</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                {lang === 'ko' ? '대본 작성부터 컷 편집, AI 나레이션까지 초고속 마스터.' : 'Master AI copywriting, cutting, and voiceover instantly.'}
              </p>
              <ul className="flex flex-col gap-3.5 mb-10 flex-1 border-t border-white/5 pt-6">
                <li className="flex items-center gap-3 text-white/75 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? 'AI 영상 제작 전 과정 실습' : 'Full AI video creation practice'}
                </li>
                <li className="flex items-center gap-3 text-white/75 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '유튜브 알고리즘 및 셋업 치트키' : 'YouTube setup cheatsheet'}
                </li>
                <li className="flex items-center gap-3 text-white/75 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '필수 프롬프트 템플릿 라이브러리' : 'Essential prompt templates'}
                </li>
              </ul>
              <button
                onClick={() => navigate('/course/bootcamp')}
                className="w-full py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border-none transition-all"
                style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
              >
                {lang === 'ko' ? '자세히 보기 →' : 'View Details →'}
              </button>
            </ScrollReveal>

            {/* ── 3. VVIP 마스터클래스 ── */}
            <ScrollReveal scale delay={0.2}
              className="border border-white/10 rounded-2xl p-8 flex flex-col bg-white/[0.01]"
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">
                {lang === 'ko' ? 'VVIP 마스터클래스' : 'VVIP Masterclass'}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[32px] font-extrabold tracking-tight">₩2,900,000</span>
                <span className="text-white/30 text-[13px] ml-1">/ $2,190</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                {lang === 'ko' ? '1:1 맞춤 컨설팅 및 에이전트 구축 등 종합 스케일업.' : '1:1 VIP consulting, automation, and channel scale-up.'}
              </p>
              <ul className="flex flex-col gap-3.5 mb-10 flex-1 border-t border-white/5 pt-6">
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '실전 코스 전체 포함 + 무이자 12개월' : 'Full bootcamp access + 12mo installment'}
                </li>
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '1:1 마케팅 전략 맞춤형 코칭' : '1:1 personalized strategy consulting'}
                </li>
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? '비공개 마스터마인드 모임 초대' : 'Private mastermind network access'}
                </li>
                <li className="flex items-center gap-3 text-white/70 text-[13px]">
                  <span className="text-white/30">✓</span> {lang === 'ko' ? 'AI 1인 기업 자동화 에이전트 설계' : 'Custom AI agent orchestration'}
                </li>
              </ul>
              <button
                onClick={() => navigate('/course/vvip')}
                className="w-full py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', backgroundColor: 'transparent' }}
              >
                {lang === 'ko' ? '자세히 보기 →' : 'View Details →'}
              </button>
            </ScrollReveal>
          </div>

          {/* 보장 */}
          <ScrollReveal delay={0.3} className="flex items-center justify-center gap-2 mt-10 text-white/40 text-[13px]">
            <Shield size={14} />
            {lang === 'ko' ? '30일 성과 보장 · 결과 없으면 전액 환불' : '30-Day Guarantee — Full refund if you don’t see results'}
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ SECTION 8: FAQ (아코디언 UI) ════════════════ */}
      <section className="py-16 md:py-20 lg:py-32 px-6 bg-black border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            eyebrow={content.faq.subtitle}
            title={
              <h2 className={`apple-white-gradient font-extrabold text-[28px] sm:text-[36px] tracking-toss mb-16${lang === 'en' ? ' font-display' : ''}`}>
                {content.faq.heading}
              </h2>
            }
            center
          />

          <StaggerReveal className="flex flex-col gap-4" staggerDelay={0.07}>
            {content.faq.items.map((item, idx) => {
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

      {/* ════════════════ SECTION 9: CLOSING CTA ════════════════ */}
      <section className="relative py-16 md:py-20 px-6 border-b border-white/5 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-white/25 text-[13px] mb-4">
              {lang === 'ko'
                ? '지금 이 순간에도 누군가는 AI로 첫 수익을 만들고 있습니다.'
                : 'Right now, someone is making their first income with AI.'}
            </p>
            <h2 className="text-white font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
              {lang === 'ko' ? (
                <>다음 차례는 <span style={{ color: '#C9A84C' }}>당신</span>입니다.</>
              ) : (
                <>You're <span style={{ color: '#C9A84C' }}>next</span>.</>
              )}
            </h2>
            <motion.button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[15px] cursor-pointer border-none"
              style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === 'ko' ? '지금 시작하기 →' : 'Get Started →'}
            </motion.button>
            <p className="text-white/20 text-[12px] mt-3">
              {lang === 'ko' ? '30일 성과 보장 · 결과 없으면 전액 환불' : '30-day guarantee — full refund if no results'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer lang={lang} />
    </div>
    </>
  } />
      <Route path="*" element={wrap(<NotFoundPage />)} />
    </Routes>
    </AnimatePresence>
  );
}
