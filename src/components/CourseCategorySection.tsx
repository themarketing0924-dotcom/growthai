import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconGrid,
  IconBarChart,
  IconMonitor,
  IconPen,
  IconMegaphone,
  IconWon,
  IconArrowUpRight,
  IconCheck,
  IconPlay,
  IconClock,
  CategoryIcon,
} from './icons/TossIcons';

/* ── 탭 정의 ── */
const TABS_KO = [
  { id: 'all',     label: '전체',          Icon: IconGrid },
  { id: 'plan',    label: '기획',          Icon: IconBarChart },
  { id: 'build',   label: 'AI 홈페이지',   Icon: IconMonitor },
  { id: 'seo',     label: 'SEO · 콘텐츠', Icon: IconPen },
  { id: 'promote', label: '홍보',          Icon: IconMegaphone },
  { id: 'revenue', label: '수익화',        Icon: IconWon },
];
const TABS_EN = [
  { id: 'all',     label: 'All',      Icon: IconGrid },
  { id: 'plan',    label: 'Strategy', Icon: IconBarChart },
  { id: 'build',   label: 'Website',  Icon: IconMonitor },
  { id: 'seo',     label: 'SEO',      Icon: IconPen },
  { id: 'promote', label: 'Growth',   Icon: IconMegaphone },
  { id: 'revenue', label: 'Revenue',  Icon: IconWon },
];

/* ── 강의 데이터 ── */
type CourseType = 'plan' | 'build' | 'seo' | 'promote' | 'revenue';

interface Course {
  id: number;
  type: CourseType;
  step: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  tags: string[];
  tagsEn: string[];
  lessons: number;
  hours: number;
  free?: boolean;
  price?: string;
}

const COURSES: Course[] = [
  {
    id: 1, type: 'plan',
    step: 'Step 01',
    title: '1인 기업 시장 분석 완전 정복',
    titleEn: 'Market Analysis for Solo Entrepreneurs',
    desc: 'ChatGPT로 경쟁사를 분석하고 수익 모델을 설계합니다. 사업 시작 전 반드시 거쳐야 할 전략 기획 전 과정.',
    descEn: 'Analyze competitors and design revenue models with ChatGPT before launching.',
    tags: ['시장 분석', '경쟁사 분석', '수익 모델', 'ChatGPT'],
    tagsEn: ['Market Analysis', 'Competitor Research', 'Revenue Model', 'ChatGPT'],
    lessons: 12, hours: 6, free: true,
  },
  {
    id: 2, type: 'plan',
    step: 'Step 01',
    title: '매출 계획 & 타겟 고객 설정 가이드',
    titleEn: 'Revenue Planning & Target Customer Setup',
    desc: '월 매출 목표를 역산해 주간 행동 계획으로 만드는 법. AI로 타겟 고객 페르소나를 설계하고 검증합니다.',
    descEn: 'Reverse-engineer revenue goals into weekly action plans using AI customer personas.',
    tags: ['매출 계획', '고객 페르소나', '목표 설정', 'AI 전략'],
    tagsEn: ['Revenue Planning', 'Customer Persona', 'Goal Setting', 'AI Strategy'],
    lessons: 8, hours: 4, price: '₩55,000',
  },
  {
    id: 3, type: 'build',
    step: 'Step 02',
    title: 'Framer + AI로 홈페이지 하루 만에 완성',
    titleEn: 'Build a Website in One Day with Framer + AI',
    desc: '코딩 없이 Framer와 ChatGPT만으로 전문적인 랜딩 페이지를 하루 안에 완성합니다. 월 10만원 이내 스택 공개.',
    descEn: 'No code needed. Build a professional landing page in one day with Framer and ChatGPT.',
    tags: ['Framer', 'ChatGPT', '무료 플랜', '랜딩 페이지'],
    tagsEn: ['Framer', 'ChatGPT', 'Free Plan', 'Landing Page'],
    lessons: 18, hours: 9, price: '₩55,000',
  },
  {
    id: 4, type: 'build',
    step: 'Step 02',
    title: 'Notion 퍼블릭 페이지로 포트폴리오 사이트',
    titleEn: 'Portfolio Site with Notion Public Pages',
    desc: 'Notion + Super.so로 완전 무료 포트폴리오 사이트를 구축합니다. SEO 최적화부터 커스텀 도메인 연결까지.',
    descEn: 'Build a free portfolio site with Notion + Super.so including SEO and custom domain.',
    tags: ['Notion', 'Super.so', '무료', '포트폴리오'],
    tagsEn: ['Notion', 'Super.so', 'Free', 'Portfolio'],
    lessons: 10, hours: 5, free: true,
  },
  {
    id: 5, type: 'seo',
    step: 'Step 03',
    title: '네이버 · 구글 동시 상위 노출 SEO 글쓰기',
    titleEn: 'Rank on Naver & Google Simultaneously',
    desc: 'ChatGPT로 SEO 최적화 블로그 글을 작성하는 전 과정. 키워드 발굴부터 메타 태그까지 AI로 자동화합니다.',
    descEn: 'Write SEO-optimized blog posts with ChatGPT — from keyword research to meta tags.',
    tags: ['SEO 글쓰기', '키워드 분석', '네이버', 'Google'],
    tagsEn: ['SEO Writing', 'Keyword Research', 'Naver', 'Google'],
    lessons: 22, hours: 11, price: '₩95,000',
  },
  {
    id: 6, type: 'seo',
    step: 'Step 03',
    title: 'AI로 유튜브 · 릴스 · 쇼츠 콘텐츠 자동 생산',
    titleEn: 'Auto-Produce YouTube, Reels & Shorts with AI',
    desc: 'Runway · CapCut AI로 영상 콘텐츠를 대량 생산합니다. 하루 1개 영상 업로드를 위한 자동화 워크플로우.',
    descEn: 'Mass-produce videos with Runway and CapCut AI — full automation workflow.',
    tags: ['유튜브', '릴스', '쇼츠', 'Runway AI', 'CapCut'],
    tagsEn: ['YouTube', 'Reels', 'Shorts', 'Runway AI', 'CapCut'],
    lessons: 15, hours: 8, price: '₩75,000',
  },
  {
    id: 7, type: 'promote',
    step: 'Step 04',
    title: '인스타그램 릴스로 팔로워 0에서 시작하기',
    titleEn: 'Grow from 0 Followers with Instagram Reels',
    desc: 'AI 생성 릴스로 첫 팔로워 1,000명을 만드는 전략. 계정 기획부터 알고리즘 공략까지 전부.',
    descEn: 'Strategy to reach your first 1,000 followers with AI-generated Reels.',
    tags: ['인스타그램', '릴스', '알고리즘', '팔로워 성장'],
    tagsEn: ['Instagram', 'Reels', 'Algorithm', 'Follower Growth'],
    lessons: 14, hours: 7, price: '₩45,000',
  },
  {
    id: 8, type: 'promote',
    step: 'Step 04',
    title: '이메일 마케팅 자동화 — 구독자를 고객으로 전환',
    titleEn: 'Email Marketing Automation',
    desc: 'Mailchimp + ChatGPT로 이메일 시퀀스를 자동화합니다. 환영 → 가치 → 오퍼 구조로 전환율을 극대화합니다.',
    descEn: 'Automate email sequences with Mailchimp + ChatGPT for maximum conversion.',
    tags: ['이메일 마케팅', 'Mailchimp', '자동화', '전환율'],
    tagsEn: ['Email Marketing', 'Mailchimp', 'Automation', 'Conversion'],
    lessons: 11, hours: 6, free: true,
  },
  {
    id: 9, type: 'revenue',
    step: 'Step 05',
    title: '구글 애드센스 승인부터 월 100만원 달성까지',
    titleEn: 'Google AdSense to ₩1M/Month',
    desc: '애드센스 승인 조건 충족부터 고단가 키워드 공략, 수익 최적화까지. 월 100만원 달성 수강생 사례 포함.',
    descEn: 'From AdSense approval to ₩1M/month — high-CPC keywords and revenue optimization.',
    tags: ['애드센스', '고단가 키워드', '트래픽', '수익 최적화'],
    tagsEn: ['AdSense', 'High-CPC Keywords', 'Traffic', 'Revenue Optimization'],
    lessons: 16, hours: 8, price: '₩95,000',
  },
  {
    id: 10, type: 'revenue',
    step: 'Step 05',
    title: '디지털 제품 만들기 — 전자책 · 템플릿 · 미니 강의',
    titleEn: 'Create Digital Products',
    desc: 'AI로 전자책, Notion 템플릿, 미니 강의를 만들고 Gumroad · 크몽에서 판매합니다. 7일 안에 첫 판매 완성.',
    descEn: 'Create and sell eBooks, templates, and mini courses on Gumroad/Kmong in 7 days.',
    tags: ['전자책', 'Notion 템플릿', 'Gumroad', '크몽'],
    tagsEn: ['eBook', 'Notion Templates', 'Gumroad', 'Kmong'],
    lessons: 13, hours: 7, price: '₩65,000',
  },
];

/* ── 분포 바 설정 ── */
const DIST_CONFIG = [
  { id: 'plan',    color: '#8B5CF6', label_ko: '기획',        label_en: 'Strategy' },
  { id: 'build',   color: '#06B6D4', label_ko: 'AI 홈페이지', label_en: 'Website' },
  { id: 'seo',     color: '#10B981', label_ko: 'SEO · 콘텐츠', label_en: 'SEO' },
  { id: 'promote', color: '#F59E0B', label_ko: '홍보',         label_en: 'Growth' },
  { id: 'revenue', color: '#EC4899', label_ko: '수익화',       label_en: 'Revenue' },
];

const TOTAL = COURSES.length;

/* ══════════════════════════════════════════════════
   메인 컴포넌트
══════════════════════════════════════════════════ */
export function CourseCategorySection({ lang }: { lang: 'ko' | 'en' }) {
  const [activeTab, setActiveTab] = useState('all');
  const TABS = lang === 'ko' ? TABS_KO : TABS_EN;

  const filtered = activeTab === 'all'
    ? COURSES
    : COURSES.filter(c => c.type === activeTab);

  return (
    <section
      id="course-category"
      className="relative bg-black py-20 md:py-32 px-4 sm:px-6 border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── 섹션 헤더 카드 ── */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="p-8 sm:p-10 md:p-12 relative">
              {/* 배경 도트 */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="relative z-10">
                <p className="text-white/30 text-[11px] tracking-[0.22em] uppercase font-semibold mb-5">
                  AI City Builders
                </p>
                <h2
                  className="text-white font-extrabold leading-[1.08] tracking-tight mb-4"
                  style={{ fontSize: 'clamp(32px, 6vw, 58px)' }}
                >
                  {lang === 'ko' ? (
                    <>강의 카테고리<span className="text-white/20">.</span></>
                  ) : (
                    <>Course<br />Category<span className="text-white/20">.</span></>
                  )}
                </h2>
                <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-10">
                  {lang === 'ko'
                    ? '기획부터 수익화까지 — AI 1인 기업 완성을 위한 5단계 강의 컬렉션'
                    : 'From strategy to revenue — the complete 5-step AI solo entrepreneur course collection.'}
                </p>

                {/* 통계 */}
                <div className="flex items-end gap-10 sm:gap-14">
                  {[
                    { value: TOTAL, label: lang === 'ko' ? '전체 강의' : 'Courses' },
                    { value: 5,     label: lang === 'ko' ? '단계'     : 'Steps' },
                    { value: 88,    label: lang === 'ko' ? '총 레슨'  : 'Lessons' },
                  ].map(s => (
                    <div key={s.label}>
                      <div
                        className="text-white font-extrabold tracking-tight leading-none"
                        style={{ fontSize: 'clamp(34px, 5.5vw, 56px)' }}
                      >
                        {s.value}
                      </div>
                      <div className="text-white/30 text-[11px] uppercase tracking-[0.18em] font-semibold mt-2">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 분포 바 ── */}
            <div className="px-8 sm:px-10 md:px-12 py-6 border-t border-white/[0.06]">
              <p className="text-white/25 text-[10px] tracking-[0.22em] uppercase font-semibold mb-3">
                Step Distribution
              </p>
              <div className="flex h-1 rounded-full overflow-hidden gap-px mb-4">
                {DIST_CONFIG.map(d => {
                  const cnt = COURSES.filter(c => c.type === d.id).length;
                  return (
                    <div
                      key={d.id}
                      style={{ width: `${(cnt / TOTAL) * 100}%`, background: d.color }}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {DIST_CONFIG.map(d => {
                  const cnt = COURSES.filter(c => c.type === d.id).length;
                  const Icon = CategoryIcon[d.id as keyof typeof CategoryIcon];
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveTab(d.id)}
                      className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: d.color }}
                      />
                      <Icon size={13} className="opacity-70" />
                      {lang === 'ko' ? d.label_ko : d.label_en} ({cnt})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 탭 필터 ── */}
        <motion.div
          className="mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-0 border-b border-white/10 min-w-max sm:min-w-0">
            {TABS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              const count = id === 'all' ? TOTAL : COURSES.filter(c => c.type === id).length;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative flex items-center gap-1.5 px-4 sm:px-5 py-3.5 text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer bg-transparent border-none whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-white/35 hover:text-white/65'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                  <span className={`text-[11px] ${isActive ? 'text-white/45' : 'text-white/20'}`}>
                    {count}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── 컬럼 헤더 ── */}
        <div className="hidden sm:flex items-center px-4 py-2 text-[10px] tracking-[0.18em] uppercase text-white/20 font-semibold mb-0.5">
          <div className="flex-1">{lang === 'ko' ? 'Course' : 'Course'}</div>
          <div className="w-28 text-center">{lang === 'ko' ? 'Step' : 'Step'}</div>
          <div className="w-28 text-right">{lang === 'ko' ? 'Action' : 'Action'}</div>
        </div>

        {/* ── 강의 리스트 ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {filtered.map((course, i) => {
              const Icon = CategoryIcon[course.type];
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: i * 0.04 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all border-b border-white/[0.05] last:border-b-0"
                >
                  {/* 아이콘 + 제목 + 설명 */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5 text-white/50 group-hover:text-white/80 transition-colors">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white text-[15px] sm:text-[16px] font-bold leading-snug mb-1.5">
                        {lang === 'ko' ? course.title : course.titleEn}
                      </h3>
                      <p className="text-white/38 text-[12px] sm:text-[13px] leading-relaxed line-clamp-2 mb-3">
                        {lang === 'ko' ? course.desc : course.descEn}
                      </p>
                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1.5">
                        {(lang === 'ko' ? course.tags : course.tagsEn).map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] text-white/35 border border-white/[0.07]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step + 레슨 수 */}
                  <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-1.5 sm:w-28 flex-shrink-0 pl-14 sm:pl-0">
                    <span className="text-white/25 text-[10px] font-bold tracking-[0.12em] uppercase">
                      {course.step}
                    </span>
                    <div className="flex items-center gap-3 sm:gap-0 sm:flex-col sm:gap-1">
                      <span className="flex items-center gap-1 text-[11px] text-white/25">
                        <IconPlay size={11} />
                        {course.lessons}{lang === 'ko' ? '강' : ''}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/25">
                        <IconClock size={11} />
                        {course.hours}h
                      </span>
                    </div>
                  </div>

                  {/* CTA 버튼 */}
                  <div className="flex-shrink-0 sm:w-28 flex sm:justify-end pl-14 sm:pl-0">
                    <motion.button
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer border-none transition-all ${
                        course.free
                          ? 'bg-white/10 border border-white/15 text-white/80 hover:bg-white/15 hover:text-white'
                          : 'bg-white text-black hover:bg-white/90'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {course.free ? (
                        <>
                          <IconCheck size={13} />
                          {lang === 'ko' ? '무료' : 'Free'}
                        </>
                      ) : (
                        <>
                          {course.price || (lang === 'ko' ? '수강' : 'Enroll')}
                          <IconArrowUpRight size={13} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── 하단 CTA ── */}
        <motion.div
          className="mt-12 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-white font-bold text-[16px] sm:text-[18px] mb-1">
              {lang === 'ko' ? '지금 바로 시작하세요.' : 'Start your journey now.'}
            </p>
            <p className="text-white/35 text-[13px]">
              {lang === 'ko'
                ? 'Step 01 기획 강의는 완전 무료로 제공됩니다.'
                : 'Step 01 Strategy course is completely free.'}
            </p>
          </div>
          <motion.button
            className="flex items-center gap-2 px-7 py-3.5 bg-white rounded-full text-black text-[14px] font-bold cursor-pointer border-none"
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            {lang === 'ko' ? '무료로 시작하기' : 'Start Free'}
            <IconArrowUpRight size={14} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
