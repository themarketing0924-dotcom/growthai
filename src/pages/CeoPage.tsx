/**
 * CeoPage — AI 멘토 KOI LEE 스토리텔링 랜딩 페이지
 * Toss.im 스타일 스크롤 애니메이션 + 섹션 간격 최적화 + 모바일 최적화
 */
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'framer-motion';
import {
  ChevronDown, CheckCircle2,
  Zap, TrendingUp, Users, BookOpen, Star
} from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── Toss 시그니처 easing ─── */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── 5가지 페인 포인트 ─── */
const PAIN_POINTS = [
  {
    no: '01',
    emoji: '🌀',
    hook: '"AI 도구가 너무 많아서 뭐부터 시작해야 할지 모르겠어요."',
    story: '구글에 "AI 마케팅"을 검색하면 ChatGPT, Midjourney, Sora, Runway, N8N, Claude, Gemini… 끝도 없이 쏟아집니다. 유튜브엔 "이것만 알면 돼!"라는 영상이 매일 수백 개씩 올라오죠. 열심히 보다 보면 어느새 새벽 2시. 배운 건 많은 것 같은데, 내일 아침에 실제로 뭘 해야 할지 여전히 모릅니다.',
    insight: '정보 과잉이 행동 마비를 만듭니다. 문제는 도구가 부족한 게 아니라, 어떤 도구를 어떤 순서로 써야 하는지 아무도 알려주지 않는 겁니다.',
  },
  {
    no: '02',
    emoji: '💸',
    hook: '"ChatGPT 구독하고 6개월째인데 돈은 한 푼도 못 벌었어요."',
    story: 'ChatGPT Plus를 결제하고, 프롬프트도 열심히 배웠습니다. 블로그 글도 써보고, 인스타 피드도 만들어봤죠. 근데 조회수는 10, 팔로워는 늘지 않고, 매출은 0원. "나만 AI 써도 안 되는 건가?" 하고 자책하게 됩니다. AI는 어딘가에서 돈을 벌어다 준다던데, 내 손에서는 그냥 글 쓰는 기계일 뿐입니다.',
    insight: 'AI는 도구일 뿐, 수익화의 본질은 마케팅입니다. 아무리 좋은 콘텐츠도 유통 전략 없이는 아무도 보지 않습니다.',
  },
  {
    no: '03',
    emoji: '📢',
    hook: '"열심히 콘텐츠 만들어도 아무도 안 봐요. 마케팅을 모르겠어요."',
    story: '매일 영상을 올리고, 릴스를 만들고, 블로그를 씁니다. AI 덕분에 제작 속도는 빨라졌어요. 그런데 조회수는 늘 한 자릿수, 팔로워는 수개월째 제자리. 알고리즘이 문제인지, 콘텐츠가 문제인지, 내가 문제인지 알 수가 없습니다. 주변에 물어보면 "꾸준히 해봐"라는 말밖에 돌아오지 않죠.',
    insight: '꾸준함은 전략이 아닙니다. 알고리즘이 좋아하는 구조, 후킹 공식, 유통 타이밍을 알아야 콘텐츠가 퍼집니다.',
  },
  {
    no: '04',
    emoji: '⚙️',
    hook: '"코딩을 못 하니까 자동화는 꿈도 못 꿔요."',
    story: '"N8N으로 자동화 하면 1인 기업도 직원 10명 분량의 일을 할 수 있다"는 말을 들었습니다. 설레는 마음으로 N8N을 열었지만 첫 화면부터 막막하죠. JSON? API 키? Webhook? 다 모르는 단어입니다. 결국 탭을 닫고 "나는 기술자가 아니니까"라고 스스로를 위로합니다. 하지만 자동화를 못 하면 결국 혼자서 모든 걸 수동으로 해야 한다는 걸 알면서도요.',
    insight: 'AI 자동화는 코딩이 필요 없습니다. 올바른 순서와 구조를 알면 누구나 시스템을 만들 수 있습니다.',
  },
  {
    no: '05',
    emoji: '🔋',
    hook: '"혼자 배우다가 번아웃이 왔어요. 이제 뭘 믿어야 할지도 모르겠어요."',
    story: '유튜브 강의, 인프런 강의, 블로그 포스팅, 오픈 채팅방까지 전부 들어갔습니다. 그런데 다들 조금씩 다른 말을 하고, 6개월 전 영상은 이미 낡은 정보가 됩니다. 어떤 강사는 이걸 하라 하고, 다른 강사는 저걸 하라 합니다. 믿을 수 있는 한 명의 멘토 없이 혼자 정보의 홍수 속에서 방향을 잡으려니 지쳐갑니다.',
    insight: '정보가 아니라 검증된 로드맵과 함께하는 멘토가 필요합니다. 혼자 가면 멀리 못 갑니다.',
  },
];

/* ─── 성과 지표 ─── */
const RESULTS = [
  { Icon: Users,      value: '1,200+', label: '수강생',        sub: '검증된 커리큘럼' },
  { Icon: TrendingUp, value: '₩420K',  label: '평균 월수익',   sub: '수강 후 3개월 기준' },
  { Icon: Star,       value: '4.9',    label: '수강생 만족도', sub: '5점 만점' },
  { Icon: BookOpen,   value: '2권',    label: '매경출판사 저서',  sub: '베스트셀러 2권 출간' },
];

/* ─── 민진홍 소장님 저서 (97* ISBN 파일) ─── */
const MENTOR_BOOKS = [
  { title: '프롬프트를 만드는 프롬프트 GPTs & Gems', image: '/9788931574296.jpg' },
  { title: '1400만 직장인을 위한 챗GPT 비즈니스 프롬프트', image: '/9788931573978.jpg' },
  { title: '5차원 AI', image: '/9788931573053.jpg' },
  { title: 'AI로 만드는 나만의 그림책', image: '/9788931535372.jpg' },
  { title: '세상에서 제일 쉬운 챗GPT 프롬프트 엔지니어링', image: '/9788931507577.jpg' },
  { title: '하루 10분 챗GPT 사용 설명서', image: '/9791192451459.jpg' },
  { title: '마케팅 진짜가 나타났다', image: '/9791164841240.jpg' },
  { title: '유튜브 마케팅 혁명', image: '/9791164841615.jpg' },
];

/* ─── 타임라인 ─── */
const TIMELINE = [
  { week: 'Week 1',  title: '방향을 잡다',      desc: '넘치는 도구 중 내 상황에 맞는 AI 스택 3가지를 결정하고 첫 결과물을 만든다.' },
  { week: 'Week 2',  title: '시스템을 세우다',   desc: '콘텐츠 자동화 파이프라인 초안 완성. AI가 대신 글 쓰고, 편집하고, 배포하는 구조.' },
  { week: 'Week 4',  title: '수익화를 시작하다', desc: '첫 결제 시스템 연동. 광고, 구독, 디지털 상품 중 내 모델에 맞는 수익 채널 오픈.' },
  { week: 'Month 3', title: '혼자 돌아가는 구조', desc: '에이전트 자동화 완성. 자는 동안에도 콘텐츠가 올라가고 주문이 들어오는 시스템.' },
];

/* ─── 페인 포인트 아코디언 ─── */
function PainCard({ point, isOpen, onToggle }: { point: typeof PAIN_POINTS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: isOpen ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)' }}
      layout
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer transition-colors"
        style={{ backgroundColor: isOpen ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.01)' }}
      >
        <span className="text-[26px] sm:text-[28px] shrink-0 mt-0.5">{point.emoji}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-extrabold tracking-widest block mb-1" style={{ color: '#C9A84C' }}>
            고민 {point.no}
          </span>
          <p className="text-white font-bold text-[14px] sm:text-[15px] leading-snug">
            {point.hook}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="shrink-0 mt-1"
        >
          <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/6">
              <p className="text-white/55 text-[13px] sm:text-[14px] leading-relaxed">{point.story}</p>
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-xl"
                style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)' }}
              >
                <Zap size={14} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                <p className="text-[12px] sm:text-[13px] font-semibold" style={{ color: '#C9A84C' }}>{point.insight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── 숫자 카운터 (뷰포트 진입 시 카운트업) ─── */
function StatCard({ Icon, value, label, sub, index }: { Icon: any; value: string; label: string; sub: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className="text-center flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
    >
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.18)' }}>
        <Icon size={20} style={{ color: '#C9A84C' }} />
      </div>
      <motion.p
        className="font-extrabold tracking-tight leading-none"
        style={{ fontSize: 'clamp(26px, 5vw, 40px)', color: '#C9A84C' }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.15, ease: EASE }}
      >
        {value}
      </motion.p>
      <div>
        <p className="text-white/65 text-[13px] sm:text-[14px] font-semibold">{label}</p>
        <p className="text-white/28 text-[11px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   메인 컴포넌트
════════════════════════════════════════ */
export default function CeoPage() {
  const navigate = useNavigate();
  const [openPain, setOpenPain] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement>(null);

  /* 히어로 패럴랙스 */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const togglePain = (i: number) => setOpenPain(openPain === i ? null : i);

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}
    >
      <Seo
        title="CEO 소개 | GrowthAI"
        description="AI 멘토와 브랜드 철학, 강의 설계 이유를 확인하는 소개 페이지입니다."
        canonical="/ceo"
        image={DEFAULT_OG_IMAGE}
        keywords={['CEO 소개', 'AI 멘토', 'GrowthAI', '브랜드 철학']}
      />

      {/* ══════════════════════════════════
          SECTION 1 — 후킹 히어로
      ══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-5 sm:px-6 overflow-hidden pt-16"
      >
        {/* 패럴랙스 배경 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: heroY }}
        >
          <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(700px, 100vw)', height: 'min(700px, 100vw)', background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: 'min(350px, 60vw)', height: 'min(350px, 60vw)', background: 'radial-gradient(circle, rgba(100,60,200,0.06) 0%, transparent 65%)', borderRadius: '50%' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto w-full"
          style={{ opacity: heroOpacity }}
        >
          {/* 배지 */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-7 sm:mb-8"
            style={{ borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.06)' }}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C9A84C' }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: '#C9A84C' }}>
              AI 멘토 KOI LEE · GrowthAI 소장
            </span>
          </motion.div>

          {/* 메인 타이틀 — 단어별 등장 */}
          <div className="overflow-hidden mb-5 sm:mb-6">
            <motion.h1
              className="font-extrabold leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(36px, 6vw, 76px)', color: '#fff' }}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            >
              AI를 써도 수익이 없다면,<br />
              <span style={{ color: '#C9A84C' }}>방법이 아니라 방향이 문제입니다</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-white/50 leading-relaxed max-w-2xl mx-auto mb-9 sm:mb-10 px-2"
            style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: EASE }}
          >
            수강생 1,200명 이상과 함께한 AI 멘토 KOI LEE.<br className="hidden sm:block" />
            왜 지금까지 AI로 수익을 내지 못했는지, 그 진짜 이유를 이 페이지에 담았습니다.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
          >
            <motion.button
              onClick={() => navigate('/enroll')}
              className="h-13 px-7 sm:px-8 rounded-xl font-bold text-[15px] text-black cursor-pointer border-none"
              style={{ backgroundColor: '#C9A84C', height: 52 }}
              whileHover={{ backgroundColor: '#D4BA6A', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              지금 해결책 보기 →
            </motion.button>
            <motion.button
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 sm:px-8 rounded-xl font-semibold text-[15px] cursor-pointer border"
              style={{ height: 52, backgroundColor: 'transparent', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.15)' }}
              whileHover={{ borderColor: 'rgba(201,168,76,0.4)', color: '#fff' }}
              whileTap={{ scale: 0.97 }}
            >
              멘토 스토리 보기
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 스크롤 유도 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          animate={{ y: [0, 8, 0], opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', opacity: { duration: 1, delay: 1 } }}
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(201,168,76,0.4)' }}>Scroll</span>
          <ChevronDown size={18} style={{ color: 'rgba(201,168,76,0.4)' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          SECTION 2 — 5가지 공감 고민
      ══════════════════════════════════ */}
      <section className="py-12 sm:py-20 md:py-36 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">

          <SectionTitle
            eyebrow="공감 고민 TOP 5"
            title={
              <h2 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-5" style={{ fontSize: 'clamp(32px, 5.5vw, 68px)' }}>
                혹시 이런 고민,<br />
                <span className="apple-gold-gradient">당신도 하고 있지 않나요?</span>
              </h2>
            }
            subtitle={
              <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-xl mx-auto mb-10 sm:mb-12">
                수강생 1,200명 이상을 만나며 가장 많이 들은 5가지 고민입니다.<br />
                하나라도 해당된다면, 계속 읽어주세요.
              </p>
            }
            center
          />

          <StaggerReveal className="flex flex-col gap-3" staggerDelay={0.07}>
            {PAIN_POINTS.map((point, i) => (
              <StaggerItem key={i}>
                <PainCard
                  point={point}
                  isOpen={openPain === i}
                  onToggle={() => togglePain(i)}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.1} className="mt-10 sm:mt-12 text-center">
            <p className="text-white/30 text-[13px] tracking-wide">이 고민들의 공통적인 해답이 있습니다</p>
            <div className="w-px h-10 mx-auto mt-3" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)' }} />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 3 — 멘토 스토리 (고급형 레이아웃)
      ══════════════════════════════════ */}
      <section id="story" data-dark="true" className="py-14 sm:py-24 md:py-40 px-5 sm:px-6 border-t border-white/5" style={{ backgroundColor: '#000' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* 왼쪽: 프로필 및 저서 */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <ScrollReveal fromLeft className="w-full">
                {/* 메인 인물 이미지 */}
                <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-2xl relative mx-auto lg:mx-0">
                  <img
                    src="/IMG_5545.PNG"
                    alt="AI 멘토 KOI LEE"
                    className="w-full h-full object-cover object-top brightness-[1.1] contrast-[1.05]"
                  />
                  {/* 테두리 부드럽게 */}
                  <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 60px 10px #000', pointerEvents: 'none' }} />
                </div>
                
                {/* 저서 목록 (사진 아래) */}
                <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50">Published Books</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <img src="/9791164841240.jpg" alt="YouTube로 알리고 Zoom으로 소통하라!" className="w-full rounded-lg shadow-xl border border-white/10 transition-transform duration-300 hover:scale-105" />
                      <p className="text-[10px] text-center text-white/40">매일경제출판사 베스트셀러</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <img src="/9791164841615.jpg" alt="Zoom 온라인 혁명" className="w-full rounded-lg shadow-xl border border-white/10 transition-transform duration-300 hover:scale-105" />
                      <p className="text-[10px] text-center text-white/40">매일경제출판사 베스트셀러</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* 오른쪽: 스토리 텍스트 */}
            <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10 pt-2 lg:pt-6">
              {/* 타이틀 영역 */}
              <div className="mb-4">
                <ScrollReveal>
                  <p className="text-[12px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>
                    AI 멘토 KOI LEE · GrowthAI 소장
                  </p>
                  <h2 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-5" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
                    "저도 처음엔 다들 그렇듯<br />
                    <span className="apple-gold-gradient italic font-serif font-light">막막했습니다.</span>"
                  </h2>
                </ScrollReveal>
              </div>

              {[
                {
                  label: '처음엔 저도 막막했습니다.',
                  text: 'ChatGPT가 처음 나왔을 때, 저도 지금 여러분처럼 유튜브를 밤새 보며 공부했습니다. 도구는 배웠는데 수익은 0원이었죠. "내가 뭘 놓치고 있는 걸까?" — 그 질문이 GrowthAI의 시작이었습니다.',
                  highlight: false,
                },
                {
                  label: '사실, 이게 처음 있는 일이 아닙니다.',
                  text: '코로나가 터지기 1년 전, 저는 스승님 민진홍 소장님과 함께 이미 그 미래를 보고 있었습니다. 미국과 일본에서는 유튜브로 고객을 모집하고 Zoom으로 세일즈하는 비즈니스가 이미 자리잡고 있었습니다. 아무도 믿지 않던 그 미래를, 우리는 책으로 썼습니다.',
                  highlight: true,
                },
                {
                  label: '그리고 1년 후 — 코로나가 세상을 멈춰세웠습니다.',
                  text: '수많은 강사와 소상공인이 오프라인 문을 닫아야 했습니다. 매출이 곤두박질쳤습니다. 하지만 우리는 이미 돈을 벌고 있었습니다. 위기 속에서 더 많은 사람들이 우리를 찾아왔고, 유튜브 영상으로 트래픽을 모아 Zoom으로 자신의 서비스를 팔 수 있는 템플릿까지 만들어 드리며 그들의 비즈니스를 살려냈습니다.',
                  highlight: false,
                },
                {
                  label: '선경지명(先見之明) — 먼저 본 사람이 이깁니다.',
                  text: '그것이 바로 제가 AI 시대에서도 두려움 대신 확신을 갖는 이유입니다. 우리는 이미 한 번 세상보다 먼저 봤고, 그 선택이 옳았다는 것을 증명했습니다. 이제 세 번째 파도 — AI 에이전트 운영 시대가 옵니다.',
                  highlight: false,
                },
                {
                  label: 'GrowthAI를 만든 이유',
                  text: '1,200명이 넘는 수강생들을 가르치며 깨달았습니다. 실패하는 이유는 능력이 부족해서가 아닙니다. 올바른 순서와 검증된 로드맵이 없었기 때문입니다. 코로나 때 우리가 도왔던 것처럼, 이번에도 당신보다 한 발 앞서 준비한 사람이 여기 있습니다.',
                  highlight: false,
                },
              ].map((block, i) => (
                <ScrollReveal key={i} delay={0.08 + i * 0.09}>
                  <div
                    className="pl-5 sm:pl-6 border-l-[3px]"
                    style={{ borderColor: block.highlight ? '#C9A84C' : 'rgba(255,255,255,0.1)' }}
                  >
                    <p className="text-white font-bold text-[16px] sm:text-[18px] mb-2">{block.label}</p>
                    <p className="text-white/60 text-[15px] sm:text-[16px] leading-relaxed">{block.text}</p>
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.4}>
                <div className="mt-2 flex flex-col gap-2.5 p-6 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  {['매일경제출판사 베스트셀러 저자 (2권 출간)', '코로나 위기, 수천 명의 비즈니스를 온라인으로 살려낸 실전가', '유튜브 수익화 전문가', 'AI 마케팅 강사', '소상공인 1인 기업 코치'].map(tag => (
                    <div key={tag} className="flex items-center gap-3 text-[13px] sm:text-[14px] text-white/80 font-medium">
                      <CheckCircle2 size={16} style={{ color: '#C9A84C', flexShrink: 0 }} />
                      {tag}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 3.5 — 민진홍 소장님 (스승)
          사진 오른쪽, 텍스트 왼쪽 (KOI LEE 반전)
      ══════════════════════════════════ */}
      <section className="py-14 sm:py-24 md:py-40 px-5 sm:px-6 border-t border-white/5" style={{ background: 'linear-gradient(to bottom, #050505, #000)' }}>
        <div className="max-w-6xl mx-auto">

          {/* 섹션 레이블 */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14 sm:mb-20">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/30">My Mentor</span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* 왼쪽: 스토리 텍스트 */}
            <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10 order-2 lg:order-1">

              {/* 타이틀 */}
              <ScrollReveal blur>
                <p className="text-[12px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>
                  유튜브 마케팅 연구소장 · ZOOM 마케팅 연구소장
                </p>
                <h2 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
                  "ChatGPT가 세상에 나오자,<br />
                  <span className="apple-gold-gradient italic font-serif font-light">스승님은 또 먼저 움직이셨습니다.</span>"
                </h2>
              </ScrollReveal>

              {/* 스토리 블록들 */}
              {[
                {
                  label: '두 번의 선견지명(先見之明)',
                  text: '일본 광고 프로덕션 출신 마케터로, 세상이 온라인으로 이동하기 전 이미 유튜브·Zoom 비즈니스를 예견하신 분입니다. 코로나 이전 우리가 함께 집필한 책들이 위기의 시대에 수천 명을 살렸습니다. 그리고 AI 시대가 오자 — 또 먼저 움직이셨습니다.',
                  highlight: false,
                },
                {
                  label: 'AI 시대, 또 한 발 앞서 계십니다.',
                  text: 'ChatGPT가 나오자마자 스승님은 AI 책을 집필하기 시작하셨습니다. 챗GPT 비즈니스 프롬프트, GPTs & Gems, 5차원 AI, AI 그림책, 프롬프트 엔지니어링... 이미 이 분야의 바이블을 써내려가고 계십니다. 이것이 단순한 우연이 아닙니다 — 트렌드를 먼저 읽고, 먼저 실행하는 분이십니다.',
                  highlight: true,
                },
                {
                  label: '두 번 모두 맞았습니다.',
                  text: '코로나 때 온라인 비즈니스, AI 시대의 GPT 활용 — 두 번의 변곡점에서 두 번 모두 먼저 봤습니다. 이제 세 번째 물결이 옵니다. AI 에이전트 운영 시대. 저는 그 검증된 스승의 제자로서, 여러분을 가장 빠른 길로 이끌겠습니다.',
                  highlight: false,
                },
              ].map((block, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.1}>
                  <div className="pl-5 sm:pl-6 border-l-[3px]" style={{ borderColor: block.highlight ? '#C9A84C' : 'rgba(255,255,255,0.1)' }}>
                    <p className="text-white font-bold text-[16px] sm:text-[18px] mb-2">{block.label}</p>
                    <p className="text-white/60 text-[15px] sm:text-[16px] leading-relaxed">{block.text}</p>
                  </div>
                </ScrollReveal>
              ))}

              {/* AI 저서 가로 스크롤 */}
              <ScrollReveal delay={0.3}>
                <div className="mt-2">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 mb-4">저서 {MENTOR_BOOKS.length}권 (일부)</p>
                  <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {MENTOR_BOOKS.map((book, i) => (
                      <a
                        key={i}
                        href="https://store.kyobobook.co.kr/person/detail/1113340501"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-[86px] sm:w-[96px] group"
                      >
                        <div className="rounded-xl overflow-hidden border border-white/10 group-hover:border-yellow-500/40 transition-all duration-300 shadow-lg group-hover:scale-[1.04]">
                          <img src={book.image} alt={book.title} className="w-full object-cover" />
                        </div>
                      </a>
                    ))}
                    {/* 외 N권 마무리 카드 */}
                    <a
                      href="https://store.kyobobook.co.kr/person/detail/1113340501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-[86px] sm:w-[96px] group"
                    >
                      <div
                        className="rounded-xl border border-white/10 group-hover:border-yellow-500/40 transition-all duration-300 flex flex-col items-center justify-center gap-1.5"
                        style={{ aspectRatio: '2/3', backgroundColor: 'rgba(201,168,76,0.06)' }}
                      >
                        <span className="text-[22px] font-black" style={{ color: '#C9A84C' }}>+</span>
                        <span className="text-[11px] font-bold text-white/50 leading-tight text-center px-2">외 0권<br/>교보문고</span>
                      </div>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* 오른쪽: 프로필 사진 (KOI LEE와 동일 크기, 반전) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
              <ScrollReveal fromRight className="w-full">
                <div className="w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative mx-auto lg:ml-auto lg:mr-0">
                  <img
                    src="/IMG_3774.JPG"
                    alt="민진홍 소장"
                    className="w-full h-full object-cover object-center brightness-[1.05]"
                  />
                  <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 60px 10px #050505', pointerEvents: 'none' }} />
                  {/* 이름 배지 */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-2xl px-4 py-3 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(201,168,76,0.25)' }}>
                      <p className="text-white font-bold text-[15px] sm:text-[17px]">민진홍 소장</p>
                      <p className="text-[11px] font-medium mt-0.5" style={{ color: '#C9A84C' }}>유튜브 마케팅 연구소 · ZOOM 마케팅 연구소</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 4 — 해결책 타임라인
      ══════════════════════════════════ */}
      <section className="py-12 sm:py-20 md:py-36 px-5 sm:px-6 border-t border-white/5" style={{ background: 'linear-gradient(to bottom, #000, #050505)' }}>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-14 sm:mb-16">
            <SectionTitle
              eyebrow="로드맵"
              title={
                <h2 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
                  수강 후 어떻게 달라지는가
                </h2>
              }
              subtitle={
                <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-xl mx-auto">
                  GrowthAI는 정보를 주는 강의가 아닙니다. 실행하고 결과를 내는 로드맵입니다.
                </p>
              }
              center
            />
          </div>

          {/* 타임라인 */}
          <div className="relative">
            {/* 수직선 — 데스크톱만 */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), rgba(201,168,76,0.08))' }}
            />

            <div className="flex flex-col gap-8 sm:gap-10">
              {TIMELINE.map((step, i) => (
                <ScrollReveal key={i} fromLeft={i % 2 === 0} fromRight={i % 2 === 1} delay={i * 0.06}>
                  <div className={`relative flex flex-col sm:flex-row gap-5 sm:gap-6 ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                    {/* 중간 원 */}
                    <div
                      className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full items-center justify-center z-10 font-extrabold text-[12px] shadow-lg"
                      style={{ backgroundColor: '#C9A84C', color: '#000', boxShadow: '0 0 0 4px rgba(201,168,76,0.15)' }}
                    >
                      {i + 1}
                    </div>

                    {/* 카드 */}
                    <div className={`sm:w-[calc(50%-2.25rem)] ${i % 2 === 0 ? 'sm:pr-5' : 'sm:pl-5'}`}>
                      <motion.div
                        className="rounded-2xl p-5 sm:p-6 border"
                        style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
                        whileHover={{ borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.03)' }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* 모바일 번호 */}
                        <div className="sm:hidden w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-[11px] mb-3"
                          style={{ backgroundColor: '#C9A84C', color: '#000' }}>
                          {i + 1}
                        </div>
                        <span
                          className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
                          style={{ backgroundColor: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}
                        >
                          {step.week}
                        </span>
                        <h3 className="text-white font-bold text-[16px] sm:text-[17px] mb-2">{step.title}</h3>
                        <p className="text-white/45 text-[13px] leading-relaxed">{step.desc}</p>
                      </motion.div>
                    </div>

                    <div className="hidden sm:block sm:w-[calc(50%-2.25rem)]" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 5 — 지표 + 저서
      ══════════════════════════════════ */}
      <section data-dark="true" className="py-12 sm:py-20 md:py-32 px-5 sm:px-6 border-t border-white/5" style={{ background: 'linear-gradient(to bottom, #050505, #000)' }}>
        <div className="max-w-5xl mx-auto">

          {/* 섹션 헤더 */}
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <p className="apple-eyebrow-gold mb-4">검증된 성과</p>
            <h2 className="font-extrabold tracking-tight leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', color: '#fff' }}>
              믿음보다 강한 것은<br />
              <span style={{ color: '#C9A84C' }}>데이터입니다</span>
            </h2>
            <p className="text-white/40 text-[14px] sm:text-[15px] max-w-md mx-auto leading-relaxed">
              강의실이 아닌 실전에서 만들어진 데이터입니다.
            </p>
          </ScrollReveal>

          {/* 성과 지표 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {RESULTS.map(({ Icon, value, label, sub }, i) => (
              <StatCard key={label} Icon={Icon} value={value} label={label} sub={sub} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 6 — 수강생 변화 스토리
      ══════════════════════════════════ */}
      <section className="py-12 sm:py-20 md:py-36 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12 sm:mb-14">
            <SectionTitle
              eyebrow="수강생 변화"
              title={
                <h2 className="apple-white-gradient font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}>
                  "저도 처음엔 똑같았어요"
                </h2>
              }
              center
            />
          </div>

          {/* ── 무한 스크롤 후기 마키 ── */}
          <div className="relative overflow-hidden mb-14 sm:mb-16">
            {/* 좌우 페이드 마스크 */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #000, transparent)' }} />

            <motion.div
              className="flex gap-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
              style={{ width: 'max-content' }}
            >
              {[
                { stars: 5, text: '"수강 3주 만에 AI로 전자책 완성하고 스마트스토어에 올렸어요. 진짜 되더라고요."', name: '김○○', role: '직장인 → 부업 창업자' },
                { stars: 5, text: '"N8N으로 고객 응대 자동화했더니 하루 4시간이 생겼습니다. 그 시간에 매출 만들어요."', name: '박○○', role: '소상공인' },
                { stars: 5, text: '"50대인데 AI 쓸 수 있을까 걱정했는데, 3개월 후 월 450만 원 만들었습니다."', name: '한○○', role: '50대 원장 → 1인 기업가' },
                { stars: 5, text: '"ChatGPT 프롬프트 하나로 유튜브 대본 30분 만에 완성. 이제 주 3개 올려요."', name: '이○○', role: '유튜버' },
                { stars: 5, text: '"코딩 1도 모르는데 AI 앱 배포까지 했습니다. 강의 따라가면 진짜 돼요."', name: '정○○', role: '비전공자 → 앱 런칭' },
                { stars: 5, text: '"바이브코딩으로 고객 관리 앱 만들어서 팀에 도입했어요. 상사가 놀랐습니다."', name: '최○○', role: '직장인' },
                { stars: 5, text: '"수강 3주 만에 AI로 전자책 완성하고 스마트스토어에 올렸어요. 진짜 되더라고요."', name: '김○○', role: '직장인 → 부업 창업자' },
                { stars: 5, text: '"N8N으로 고객 응대 자동화했더니 하루 4시간이 생겼습니다. 그 시간에 매출 만들어요."', name: '박○○', role: '소상공인' },
                { stars: 5, text: '"50대인데 AI 쓸 수 있을까 걱정했는데, 3개월 후 월 450만 원 만들었습니다."', name: '한○○', role: '50대 원장 → 1인 기업가' },
                { stars: 5, text: '"ChatGPT 프롬프트 하나로 유튜브 대본 30분 만에 완성. 이제 주 3개 올려요."', name: '이○○', role: '유튜버' },
                { stars: 5, text: '"코딩 1도 모르는데 AI 앱 배포까지 했습니다. 강의 따라가면 진짜 돼요."', name: '정○○', role: '비전공자 → 앱 런칭' },
                { stars: 5, text: '"바이브코딩으로 고객 관리 앱 만들어서 팀에 도입했어요. 상사가 놀랐습니다."', name: '최○○', role: '직장인' },
              ].map((r, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-2xl px-7 py-6 flex flex-col gap-3"
                  style={{
                    width: '340px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex gap-0.5">
                    {Array(r.stars).fill(0).map((_, j) => (
                      <span key={j} style={{ color: '#C9A84C', fontSize: 13 }}>★</span>
                    ))}
                  </div>
                  <p className="text-white/65 text-[13px] leading-relaxed flex-1">{r.text}</p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/6">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
                      style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <span className="text-white/60 text-[12px] font-semibold">{r.name}</span>
                      <span className="text-white/25 text-[11px] ml-2">{r.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 7 — 최종 CTA
      ══════════════════════════════════ */}
      <section className="py-16 sm:py-24 md:py-44 px-5 sm:px-6 border-t border-white/5 relative overflow-hidden">
        {/* 배경 글로우 레이어 */}
        <div className="absolute inset-0 pointer-events-none apple-glow-pulse"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)' }} />
        {/* 상단 골드 라인 */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 30%, rgba(255,235,150,0.9) 50%, rgba(201,168,76,0.6) 70%, transparent 100%)' }} />

        <div className="relative max-w-3xl mx-auto text-center">

          {/* eyebrow */}
          <motion.p
            className="apple-eyebrow-gold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.15, 1] }}
          >
            지금 시작하기
          </motion.p>

          {/* 메인 헤딩 — shimmer 골드 애니메이션 */}
          <motion.h2
            className="apple-shimmer-gold font-extrabold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(36px, 6.5vw, 80px)', letterSpacing: '-0.04em', wordBreak: 'keep-all' }}
            initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            AI 시대,<br />
            당신은 지금<br className="sm:hidden" /> 어디에 서 있습니까?
          </motion.h2>

          {/* 서브 카피 */}
          <motion.p
            className="text-white/45 leading-relaxed mb-12 max-w-xl mx-auto"
            style={{ fontSize: 'clamp(14px, 1.8vw, 17px)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            지금 이 순간에도 누군가는 AI를 배우고, 격차를 벌리고 있습니다.<br />
            <span className="text-white/65 font-medium">뒤처지는 속도는 빠르고, 따라잡는 시간은 깁니다.</span>
          </motion.p>

          {/* 강의 카드 미리보기 */}
          <StaggerReveal className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10" staggerDelay={0.1}>
            {[
              { label: '월간 멤버십', price: '₩49,000', desc: '/ 월', slug: 'monthly' },
              { label: 'AI 1인 기업 부트캠프', price: '₩490,000', desc: '평생 수강', slug: 'bootcamp', featured: true },
              { label: 'VVIP 1:1 코칭', price: '₩2,900,000', desc: '코칭 포함', slug: 'vvip' },
            ].map((plan) => (
              <StaggerItem key={plan.slug}>
                <motion.button
                  onClick={() => navigate(`/course/${plan.slug}`)}
                  className="w-full sm:flex-1 rounded-xl px-5 py-4 text-left border cursor-pointer transition-all"
                  style={{
                    backgroundColor: (plan as any).featured ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                    borderColor: (plan as any).featured ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)',
                  }}
                  whileHover={{ borderColor: 'rgba(201,168,76,0.5)', backgroundColor: 'rgba(201,168,76,0.12)', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">{plan.label}</p>
                  <p className="font-extrabold text-[18px] sm:text-[20px] mb-0.5" style={{ color: (plan as any).featured ? '#C9A84C' : '#fff' }}>
                    {plan.price}
                  </p>
                  <p className="text-white/30 text-[11px]">{plan.desc}</p>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={() => navigate('/enroll')}
              className="relative px-12 rounded-2xl font-bold text-[16px] sm:text-[17px] text-black cursor-pointer border-none overflow-hidden"
              style={{
                height: 60,
                background: 'linear-gradient(90deg, #C9A84C 0%, #EED98A 50%, #C9A84C 100%)',
                backgroundSize: '200% auto',
              }}
              whileHover={{
                backgroundPosition: 'right center',
                scale: 1.03,
                boxShadow: '0 0 40px rgba(201,168,76,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                backgroundPosition: { duration: 4, ease: 'linear', repeat: Infinity },
                scale: { duration: 0.2 },
              }}
            >
              지금 시작하기 →
            </motion.button>
            <p className="text-white/20 text-[12px] tracking-wide">
              ⚡ 즉시 수강 가능 · 평생 접근
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
