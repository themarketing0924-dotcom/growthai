/**
 * AboutPage — KOI LEE 스토리텔링 랜딩 페이지
 * 영웅 신화의 법칙 (Hero's Journey) 구조:
 * [평범한 세계] → [소명] → [시련] → [멘토 만남] → [변환] → [귀환·소명]
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ChevronDown, ChevronRight, Star, Users, TrendingUp, BookOpen, Zap, ArrowRight
} from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── 성과 지표 ─── */
const RESULTS = [
  { Icon: Users,      value: '1,200+', label: '수강생',           sub: '검증된 커리큘럼' },
  { Icon: TrendingUp, value: '₩420K',  label: '평균 월수익',      sub: '수강 후 3개월 기준' },
  { Icon: Star,       value: '4.9',    label: '수강생 만족도',    sub: '5점 만점' },
  { Icon: BookOpen,   value: '2권',    label: '매경출판사 저서',  sub: '베스트셀러 2권 출간' },
];

/* ─── 스승 민진홍 소장님 저서 ─── */
const MENTOR_BOOKS = [
  { title: '프롬프트를 만드는 프롬프트 GPTs & Gems',           image: '/9788931574296.jpg' },
  { title: '1400만 직장인을 위한 챗GPT 비즈니스 프롬프트',    image: '/9788931573978.jpg' },
  { title: '5차원 AI',                                         image: '/9788931573053.jpg' },
  { title: 'AI로 만드는 나만의 그림책',                       image: '/9788931535372.jpg' },
  { title: '세상에서 제일 쉬운 챗GPT 프롬프트 엔지니어링',   image: '/9788931507577.jpg' },
  { title: '하루 10분 챗GPT 사용 설명서',                     image: '/9791192451459.jpg' },
  { title: '마케팅 진짜가 나타났다',                          image: '/9791164841240.jpg' },
  { title: '유튜브 마케팅 혁명',                              image: '/9791164841615.jpg' },
];

/* ─── 5가지 페인 포인트 ─── */
const PAIN_POINTS = [
  {
    no: '01', emoji: '🌀',
    hook: '"AI 도구가 너무 많아서 뭐부터 시작해야 할지 모르겠어요."',
    insight: '정보 과잉이 행동 마비를 만듭니다. 문제는 도구가 부족한 게 아니라, 어떤 도구를 어떤 순서로 써야 하는지 아무도 알려주지 않는 겁니다.',
  },
  {
    no: '02', emoji: '💸',
    hook: '"ChatGPT 구독하고 6개월째인데 돈은 한 푼도 못 벌었어요."',
    insight: 'AI는 도구일 뿐, 수익화의 본질은 마케팅입니다. 아무리 좋은 콘텐츠도 유통 전략 없이는 아무도 보지 않습니다.',
  },
  {
    no: '03', emoji: '📢',
    hook: '"열심히 콘텐츠 만들어도 아무도 안 봐요. 마케팅을 모르겠어요."',
    insight: '꾸준함은 전략이 아닙니다. 알고리즘이 좋아하는 구조, 후킹 공식, 유통 타이밍을 알아야 콘텐츠가 퍼집니다.',
  },
  {
    no: '04', emoji: '⚙️',
    hook: '"코딩을 못 하니까 자동화는 꿈도 못 꿔요."',
    insight: 'AI 자동화는 코딩이 필요 없습니다. 올바른 순서와 구조를 알면 누구나 시스템을 만들 수 있습니다.',
  },
  {
    no: '05', emoji: '🔋',
    hook: '"혼자 배우다가 번아웃이 왔어요. 이제 뭘 믿어야 할지도 모르겠어요."',
    insight: '정보가 아니라 검증된 로드맵과 함께하는 멘토가 필요합니다. 혼자 가면 멀리 못 갑니다.',
  },
];

/* ─── 영웅의 여정 (Hero's Journey) 챕터 ─── */
const JOURNEY = [
  {
    chapter: 'Chapter 01', label: '평범한 세계',
    title: '저도 한때 알고리즘의 피해자였습니다.',
    body: '처음엔 저도 새로운 AI 툴이 나올 때마다 쫓아다녔습니다. ChatGPT, Midjourney, N8N… 수백만 원을 강의비와 구독료에 쏟아부었지만, 6개월이 지나도 통장에 남는 건 0원이었습니다. "내가 운이 없는 건가? 아니면 능력이 없는 건가?" 매일 밤 자책하며 잠들었습니다.',
  },
  {
    chapter: 'Chapter 02', label: '소명과 시련',
    title: '\"구조가 없으면, 도구는 다 장난감입니다.\"',
    body: '절박함이 극에 달했을 때, 전 세계 마케팅 거장들의 책과 강의를 닥치는 대로 파고들었습니다. 러셀 브론슨, 알렉스 호르모지, 제프 워커, 세스 고딘… 수천 시간을 소비한 끝에 하나의 진실을 발견했습니다. "고객의 심리에 맞는 구조가 먼저다. 도구는 그 다음이다."',
  },
  {
    chapter: 'Chapter 03', label: '멘토와의 만남',
    title: '스승 민진홍 소장님을 만났습니다.',
    body: '국내 AI 분야 최고 권위자이자 매경출판사 베스트셀러 다수를 집필하신 민진홍 소장님께 직접 사사받으며, 이론으로만 알던 것들이 실전의 언어로 번역되기 시작했습니다. AI가 돈이 되는 구조, 즉 "고객이 먼저 설득되어야 한다"는 핵심 철학이 완성된 순간이었습니다.',
  },
  {
    chapter: 'Chapter 04', label: '변환과 귀환',
    title: '시스템이 완성된 날, 잠자는 동안 첫 결제가 들어왔습니다.',
    body: '설득의 구조를 랜딩페이지에 이식하고, AI로 트래픽을 만들고, 자동화 파이프라인을 붙였더니 — 자는 동안 알림이 울렸습니다. 첫 결제였습니다. 그 날 이후로 저는 이 구조를 더 많은 1인 창업가들에게 나눠야겠다고 결심했습니다.',
  },
];

/* ─── 페인 카드 아코디언 ─── */
function PainCard({ point, isOpen, onToggle }: { point: typeof PAIN_POINTS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: isOpen ? 'rgba(201,168,76,0.4)' : '#2a2a2a' }}
      layout
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: isOpen ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.01)' }}
      >
        <span className="text-2xl shrink-0 mt-0.5">{point.emoji}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-extrabold tracking-widest block mb-1 text-[#C9A84C]">고민 {point.no}</span>
          <p className="text-white font-semibold text-sm sm:text-base leading-snug">{point.hook}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="shrink-0 mt-1"
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-white/[0.06]">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#C9A84C]/8 border border-[#C9A84C]/20">
                <Zap size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <p className="text-sm font-semibold text-[#C9A84C]">{point.insight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── 숫자 카드 ─── */
function StatCard({ Icon, value, label, sub, index }: { Icon: React.ElementType; value: string; label: string; sub: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className="text-center flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#C9A84C]/10 border border-[#C9A84C]/20">
        <Icon size={18} className="text-[#C9A84C]" />
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#C9A84C]">{value}</p>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-[#606060] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ════════════════ 메인 컴포넌트 ════════════════ */
export default function AboutPage() {
  const [openPain, setOpenPain] = useState<number | null>(0);

  return (
    <>
      <Seo
        title="KOI LEE 스토리 | GrowthAI"
        description="평범한 1인 창업가에서 AI 마케팅 구조 설계자가 되기까지. 영웅의 여정을 확인하세요."
        canonical="/about"
        image={DEFAULT_OG_IMAGE}
        siteName={SITE_NAME}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              '@id': 'https://www.growthai.kr/about#webpage',
              'url': 'https://www.growthai.kr/about',
              'name': 'KOI LEE 프로필 | GrowthAI',
              'mainEntity': {
                '@id': 'https://www.growthai.kr/#person'
              }
            },
            {
              '@type': 'Person',
              '@id': 'https://www.growthai.kr/#person',
              'name': 'KOI LEE (이건희)',
              'jobTitle': 'Founder & AI Marketing Architect',
              'worksFor': {
                '@type': 'Organization',
                'name': 'GrowthAI',
                'url': 'https://www.growthai.kr/'
              },
              'url': 'https://www.growthai.kr/about',
              'image': 'https://www.growthai.kr/IMG_5545.PNG',
              'description': '소상공인 및 1인 창업가를 위한 AI 자동화 수익화 퍼널 및 런치 프로토콜(KLP) 설계 마케터',
              'knowsAbout': ['AI Marketing', 'SEO', 'AEO', 'GEO', 'Sales Funnel', 'Product Launch Formula']
            }
          ]
        }}
      />
      <div
        className="bg-[#060B16] text-white min-h-screen"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif', letterSpacing: '-0.01em' }}
      >
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* ══════════════════════════════════
            [1] HERO — 후킹 헤드라인
        ══════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-5 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0b132b_0%,_#060b16_65%)] pointer-events-none" />

          {/* 프로필 이미지 */}
          <motion.div
            className="relative z-10 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#C5A880]/50 shadow-[0_0_40px_rgba(197,168,128,0.25)] mx-auto">
              <img
                src="/profile_placeholder.png"
                alt="KOI LEE"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 mb-6">
              <span className="text-xs font-bold tracking-widest text-[#C5A880] uppercase">AI 마케팅 구조 설계자</span>
            </div>

            {/* 헤드카피 2단계 확대 (text-3xl -> text-5xl, sm:text-4xl -> sm:text-6xl, md:text-5xl -> md:text-7xl) */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.15] mb-6 break-keep text-white tracking-tight">
              저는 <span className="text-[#C5A880]">KOI LEE</span>입니다.<br />
              한때 매달 0원을 버는<br />평범한 창업가였습니다.
            </h1>

            {/* 서브카피 2단계 확대 (text-sm -> text-base, sm:text-base -> sm:text-lg, lg:text-xl 추가) */}
            <p className="text-base sm:text-lg lg:text-xl text-[#a0a0a0] leading-relaxed mb-8 break-keep">
              수백 시간을 AI 툴 공부에 쏟았지만 아무것도 안 됐습니다.<br />
              그리고 마침내 <strong className="text-white font-semibold">진짜 이유</strong>를 알게 됐습니다.
            </p>

            <button 
              onClick={() => {
                document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#C5A880] font-semibold text-base hover:gap-3 transition-all cursor-pointer bg-transparent border-none"
            >
              제 이야기를 읽어보세요 <ChevronRight size={18} />
            </button>
          </motion.div>
        </section>

        {/* ══════════════════════════════════
            [2] 성과 지표 — 권위 확립
        ══════════════════════════════════ */}
        <section className="py-16 px-5 bg-[#101726] border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-xs font-semibold tracking-widest text-[#C5A880] uppercase mb-10">검증된 성과</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {RESULTS.map((r, i) => <StatCard key={r.label} {...r} index={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            [3] 영웅의 여정 — 스토리텔링 4챕터
        ══════════════════════════════════ */}
        <section id="journey" className="py-20 px-5 bg-[#060B16] border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase mb-3">나의 여정</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold break-keep">실패에서 시스템까지,<br />솔직한 이야기</h2>
            </div>

            <div className="relative">
              {/* 수직 타임라인 선 */}
              <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#C5A880]/60 via-[#C5A880]/20 to-transparent" />

              <div className="space-y-10 pl-12 sm:pl-14">
                {JOURNEY.map((item, i) => (
                  <motion.div
                    key={item.chapter}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    className="relative"
                  >
                    {/* 타임라인 닷 */}
                    <div className="absolute -left-[42px] sm:-left-[50px] top-1 w-3 h-3 rounded-full bg-[#C5A880] border-2 border-black shadow-[0_0_8px_rgba(197,168,128,0.6)]" />

                    <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase block mb-1">
                      {item.chapter} — {item.label}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug break-keep">{item.title}</h3>
                    <p className="text-sm text-[#a0a0a0] leading-relaxed break-keep">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            [4] 스승과 책 — 권위 극대화
        ══════════════════════════════════ */}
        <section className="py-20 px-5 bg-[#101726] border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase mb-3">스승과 멘토십</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 break-keep">국내 AI 분야 최고 권위자<br />민진홍 소장님께 직접 사사받았습니다.</h2>
              <p className="text-sm text-[#a0a0a0] break-keep">매경출판사 베스트셀러 다수를 집필하신 대한민국 대표 AI 전문가</p>
            </div>

            {/* 멘토 사진 */}
            <div className="flex flex-col sm:flex-row gap-8 items-center mb-12">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[#C5A880]/30 shrink-0 mx-auto sm:mx-0">
                <img
                  src="/IMG_3774.JPG"
                  alt="민진홍 소장"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-[#C5A880] mb-1">민진홍 소장</p>
                <p className="text-xs text-[#606060] mb-3">AI 전략 연구소 · 매경출판사 베스트셀러 작가</p>
                <blockquote className="text-sm sm:text-base text-[#a0a0a0] italic leading-relaxed border-l-2 border-[#C5A880]/40 pl-4 break-keep">
                  "AI는 인간의 사고 방식을 증폭시키는 도구입니다. 제대로 된 구조와 전략 없이는 아무리 좋은 AI도 소음에 불과합니다."
                </blockquote>
              </div>
            </div>

            {/* 책 그리드 */}
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {MENTOR_BOOKS.map((book) => (
                <div key={book.title} className="group relative aspect-[2/3] rounded-lg overflow-hidden border border-white/10 hover:border-[#C5A880]/40 transition-colors">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-2 opacity-0 group-hover:opacity-100">
                    <p className="text-[9px] text-white font-medium leading-tight">{book.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            [5] 공감 페인 포인트 — 관계 형성
        ══════════════════════════════════ */}
        <section className="py-20 px-5 bg-[#060B16] border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase mb-3">당신의 고민</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 break-keep">저도 똑같이 겪었습니다.</h2>
              <p className="text-sm text-[#a0a0a0]">5가지 고민, 터치해서 답을 확인하세요.</p>
            </div>
            <div className="space-y-3">
              {PAIN_POINTS.map((point, i) => (
                <PainCard
                  key={point.no}
                  point={point}
                  isOpen={openPain === i}
                  onToggle={() => setOpenPain(openPain === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            [6] 공감 약속 — 나도 거기 있었고, 당신도 성공시키겠다
        ══════════════════════════════════ */}
        <section className="py-20 px-5 bg-[#060B16] border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#101726]/80 border border-[#C5A880]/20 rounded-3xl p-8 sm:p-10">
              <p className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase mb-5">당신에게 드리는 약속</p>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-6 break-keep">
                "저도 오랫동안 그 자리에 있었습니다.<br />
                매달 폐업을 고민하고,<br />
                방법을 몰라 혼자 울었던 밤들이 있었습니다."
              </blockquote>
              <div className="space-y-4 text-sm sm:text-base text-[#a0a0a0] leading-relaxed break-keep border-t border-white/10 pt-6">
                <p>
                  그래서 저는 압니다. 지금 대표님이 얼마나 지쳐 있는지.
                  얼마나 많은 것을 시도해 봤는지. 그리고 얼마나 <strong className="text-white font-semibold">결과 없는 노력</strong>에 지쳐 있는지를요.
                </p>
                <p>
                  저는 그 바닥에서 올라왔습니다. 그리고 지금 이 자리에서
                  <strong className="text-white font-semibold"> 1,200명 이상의 소상공인과 1인 창업가</strong>를 같은 바닥에서
                  꺼내드렸습니다.
                </p>
                <p className="text-white font-semibold text-base sm:text-lg">
                  이제 당신 차례입니다. 저를 믿어 주신다면, 제가 직접 구조를 짜드리겠습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            [7] 소명 선언 + CTA
        ══════════════════════════════════ */}
        <section className="py-24 px-5 bg-[#101726] border-t border-white/10 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase mb-5">나의 소명</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight break-keep">
              제가 성공한 이 구조,<br />
              <span className="text-[#C5A880]">이제 당신에게 그대로 드리겠습니다.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed mb-10 max-w-xl mx-auto break-keep">
              수년의 실패, 수백 시간의 연구, 스승의 가르침이 응축된 이 시스템을.<br />
              단 3분의 무료 진단으로 지금 당장 시작하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/diagnose"
                className="w-full sm:w-auto h-12 px-7 rounded-full bg-[#C5A880] text-black font-semibold text-[14px] hover:bg-[#dBC5A8] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,168,128,0.25)]"
              >
                🚀 무료 진단으로 시작하기 <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto h-12 px-7 rounded-full border border-white/15 text-[#a0a0a0] text-[14px] font-semibold hover:border-[#C5A880]/40 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                메인 페이지로 <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <Footer lang="ko" />
      </div>
    </>
  );
}
