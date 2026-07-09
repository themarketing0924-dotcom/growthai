import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TOOLS, { CAT_META, SUBSCRIPTION } from '../data/tools';
const PER_MONTH = SUBSCRIPTION.yearly.perMonth ?? Math.round(SUBSCRIPTION.yearly.price / 12);
import { IconArrowUpRight, IconCheck, IconPlay, IconBarChart, IconMonitor, IconPen, IconMegaphone, IconWon } from '../components/icons/TossIcons';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const CAT_ICON = {
  ebook:     IconPen,
  video:     IconMonitor,
  image:     IconBarChart,
  marketing: IconMegaphone,
  content:   IconWon,
};

function fmt(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

export default function ToolDetailPage({ lang }: { lang: 'ko' | 'en' }) {
  const { slug } = useParams<{ slug: string }>();
  const tool = TOOLS.find(t => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <p className="text-white/50 text-[16px]">도구를 찾을 수 없습니다.</p>
        <Link to="/#ai-tools" className="text-white underline text-[14px]">목록으로 돌아가기</Link>
      </div>
    );
  }

  const meta  = CAT_META[tool.cat];
  const Icon  = CAT_ICON[tool.cat];
  const isSub = tool.priceType === 'sub';

  /* 같은 카테고리 관련 도구 (최대 3개) */
  const related = TOOLS.filter(t => t.cat === tool.cat && t.no !== tool.no).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title={`${lang === 'ko' ? tool.title : tool.titleEn} | GrowthAI`}
        description={lang === 'ko' ? tool.desc : tool.descEn}
        canonical={`/tools/${slug}`}
        image={DEFAULT_OG_IMAGE}
        keywords={[tool.title, 'AI 도구', '프롬프트', 'GrowthAI']}
      />

      {/* ── 상단 네비게이션 ── */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-black/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[13px] font-medium no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            {lang === 'ko' ? '도구 목록' : 'Tool List'}
          </Link>
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{ background: `${meta.color}20`, color: meta.color }}
          >
            {lang === 'ko' ? meta.label_ko : meta.label_en}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-24">

        {/* ── 히어로 ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* 번호 + 카테고리 */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold"
              style={{ background: `${meta.color}20`, color: meta.color }}
            >
              {String(tool.no).padStart(2, '0')}
            </div>
            <div
              className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full"
              style={{ background: `${meta.color}15`, color: meta.color }}
            >
              <Icon size={13} />
              {lang === 'ko' ? meta.label_ko : meta.label_en}
            </div>
          </div>

          {/* 제목 */}
          <h1
            className="text-white font-extrabold leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 5.5vw, 52px)' }}
          >
            {lang === 'ko' ? tool.title : tool.titleEn}
          </h1>
          <p className="text-white/50 text-[16px] sm:text-[18px] font-medium mb-6">
            {lang === 'ko' ? tool.tagline : tool.taglineEn}
          </p>
          <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
            {lang === 'ko' ? tool.desc : tool.descEn}
          </p>
        </motion.div>

        {/* ── 본문 2단 레이아웃 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">

          {/* LEFT: 사용 방법 + 예시 프롬프트 */}
          <div className="flex flex-col gap-8">

            {/* 사용 방법 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-white font-bold text-[17px] sm:text-[18px] mb-5">
                {lang === 'ko' ? '이렇게 사용하세요' : 'How to Use'}
              </h2>
              <div className="flex flex-col gap-3">
                {(lang === 'ko' ? tool.howto : tool.howtoEn).map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.02]"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold flex-shrink-0 mt-0.5"
                      style={{ background: `${meta.color}20`, color: meta.color }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-white/70 text-[14px] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 예시 프롬프트 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-white font-bold text-[17px] sm:text-[18px] mb-5">
                {lang === 'ko' ? '이렇게 입력해보세요' : 'Example Prompts'}
              </h2>
              <div className="flex flex-col gap-3">
                {tool.prompts.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.015] hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    onClick={() => navigator.clipboard?.writeText(p.replace(/"/g, ''))}
                    title={lang === 'ko' ? '클릭해서 복사' : 'Click to copy'}
                  >
                    <IconPlay size={14} className="text-white/25 flex-shrink-0 mt-0.5 group-hover:text-white/50 transition-colors" />
                    <p className="text-white/55 text-[13px] sm:text-[14px] leading-relaxed font-mono group-hover:text-white/75 transition-colors">
                      {p}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-white/25 text-[11px] mt-3 ml-1">
                {lang === 'ko' ? '* 클릭하면 클립보드에 복사됩니다' : '* Click to copy to clipboard'}
              </p>
            </motion.div>

          </div>

          {/* RIGHT: 가격 카드 */}
          <motion.div
            className="lg:sticky lg:top-24 flex flex-col gap-4 h-fit"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* 개별 구매 카드 */}
            {!isSub && tool.price && (
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 flex flex-col gap-5">
                <div>
                  <p className="text-white/30 text-[11px] uppercase tracking-[0.15em] font-semibold mb-3">
                    {lang === 'ko' ? '개별 구매' : 'Single Purchase'}
                  </p>
                  {/* 정가 → 할인가 */}
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-white/30 text-[14px] line-through">
                      {fmt(tool.originalPrice)}
                    </span>
                    <span className="text-[11px] font-bold text-white/30 bg-white/10 px-1.5 py-0.5 rounded">
                      {Math.round((1 - tool.price / tool.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <div className="text-white font-extrabold" style={{ fontSize: 'clamp(26px, 4vw, 34px)' }}>
                    {fmt(tool.price)}
                  </div>
                  <p className="text-white/35 text-[12px] mt-1">
                    {lang === 'ko' ? '1회 구매 · 평생 이용' : 'One-time · Lifetime access'}
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-[13px] text-white/45">
                  {[
                    lang === 'ko' ? '이 도구 영구 이용 가능' : 'Permanent access to this tool',
                    lang === 'ko' ? '업데이트 무료 제공' : 'Free updates included',
                    lang === 'ko' ? '예시 프롬프트 전체 포함' : 'All example prompts included',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <IconCheck size={13} className="text-white/30 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <motion.a
                  href={tool.gptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 bg-white rounded-full text-black text-[14px] font-bold cursor-pointer no-underline"
                  whileHover={{ scale: 1.02, backgroundColor: '#e2e2e6' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {lang === 'ko' ? '지금 구매하기' : 'Buy Now'}
                  <IconArrowUpRight size={14} />
                </motion.a>
              </div>
            )}

            {/* 구독 카드 */}
            <div className={`rounded-2xl border p-6 flex flex-col gap-5 ${isSub ? 'border-white/18 bg-white/[0.04]' : 'border-white/8 bg-white/[0.015]'}`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/30 text-[11px] uppercase tracking-[0.15em] font-semibold">
                    {lang === 'ko' ? '구독 플랜' : 'Subscription'}
                  </p>
                  {isSub && (
                    <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-full">
                      {lang === 'ko' ? '구독 전용' : 'Sub Only'}
                    </span>
                  )}
                </div>
                {/* 월간 */}
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-white/30 text-[13px] line-through">
                    {fmt(SUBSCRIPTION.monthly.price * 12)}
                    {lang === 'ko' ? '/년' : '/yr'}
                  </span>
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-1.5 py-0.5 rounded">
                    {SUBSCRIPTION.yearly.save} OFF
                  </span>
                </div>
                <div className="text-white font-extrabold" style={{ fontSize: 'clamp(22px, 3.5vw, 28px)' }}>
                  {fmt(SUBSCRIPTION.yearly.price)}
                  <span className="text-white/40 text-[14px] font-normal ml-1">
                    {lang === 'ko' ? '/년' : '/yr'}
                  </span>
                </div>
                <p className="text-white/35 text-[12px] mt-1">
                  {lang === 'ko'
                    ? `월 ${PER_MONTH.toLocaleString('ko-KR')}원 · 33개 도구 전체`
                    : `₩${PER_MONTH.toLocaleString()}/mo · All 33 tools`}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-[13px] text-white/45">
                {[
                  lang === 'ko' ? '33개 GPT 도구 전체 이용' : 'Access to all 33 GPT tools',
                  lang === 'ko' ? '신규 도구 자동 추가' : 'New tools added automatically',
                  lang === 'ko' ? '커뮤니티 + 강의 영상 포함' : 'Community + video lessons included',
                  lang === 'ko' ? '언제든지 취소 가능' : 'Cancel anytime',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <IconCheck size={13} className="text-white/30 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <motion.button
                className={`flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-bold cursor-pointer border-none ${
                  isSub ? 'bg-white text-black' : 'bg-white/10 text-white/80 border border-white/15'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                {lang === 'ko' ? '구독 시작하기' : 'Start Subscription'}
                <IconArrowUpRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── 관련 도구 ── */}
        {related.length > 0 && (
          <motion.div
            className="mt-16 pt-12 border-t border-white/[0.06]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-[16px] sm:text-[17px] mb-6">
              {lang === 'ko' ? '같은 카테고리 도구' : 'Related Tools'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(t => {
                const rMeta = CAT_META[t.cat];
                return (
                  <Link
                    key={t.no}
                    to={`/tools/${t.slug}`}
                    className="group flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.04] transition-all no-underline"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{ background: `${rMeta.color}20`, color: rMeta.color }}
                    >
                      {String(t.no).padStart(2, '0')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-[13px] font-semibold leading-snug group-hover:text-white/90 transition-colors line-clamp-2">
                        {lang === 'ko' ? t.title : t.titleEn}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white/25 text-[11px]">
                          {t.price ? fmt(t.price) : (lang === 'ko' ? '구독 전용' : 'Sub only')}
                        </span>
                        <IconArrowUpRight size={12} className="text-white/25 group-hover:text-white/50 transition-colors" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
