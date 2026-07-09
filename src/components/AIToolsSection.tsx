import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TOOLS_DATA, { CAT_META, CatId } from '../data/tools';
import { IconBarChart, IconMonitor, IconPen, IconMegaphone, IconWon, IconGrid, IconArrowUpRight } from './icons/TossIcons';

const CATS_KO = [
  { id: 'all',       label: '전체',          Icon: IconGrid },
  { id: 'ebook',     label: '전자책·논문',   Icon: IconPen },
  { id: 'video',     label: '숏폼·영상',     Icon: IconMonitor },
  { id: 'image',     label: '이미지·디자인', Icon: IconBarChart },
  { id: 'marketing', label: '홍보·마케팅',   Icon: IconMegaphone },
  { id: 'content',   label: '콘텐츠·글쓰기', Icon: IconWon },
];
const CATS_EN = [
  { id: 'all',       label: 'All',           Icon: IconGrid },
  { id: 'ebook',     label: 'eBook',         Icon: IconPen },
  { id: 'video',     label: 'Video',         Icon: IconMonitor },
  { id: 'image',     label: 'Image',         Icon: IconBarChart },
  { id: 'marketing', label: 'Marketing',     Icon: IconMegaphone },
  { id: 'content',   label: 'Content',       Icon: IconWon },
];

const TOTAL = TOOLS_DATA.length;

function fmt(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

export function AIToolsSection({ lang }: { lang: 'ko' | 'en' }) {
  const [active, setActive] = useState('all');
  const CATS = lang === 'ko' ? CATS_KO : CATS_EN;
  const filtered = active === 'all' ? TOOLS_DATA : TOOLS_DATA.filter(t => t.cat === active);

  return (
    <section id="ai-tools" className="relative bg-black py-20 md:py-32 px-4 sm:px-6 border-b border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* ── 헤더 카드 ── */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="p-8 sm:p-10 md:p-12 relative">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              />
              <div className="relative z-10">
                <p className="text-white/30 text-[11px] tracking-[0.22em] uppercase font-semibold mb-5">
                  {lang === 'ko' ? '수강생 전용 GPT 도구 모음' : 'Exclusive GPT Tool Kit'}
                </p>
                <h2 className="text-white font-extrabold leading-[1.08] tracking-tight mb-4"
                  style={{ fontSize: 'clamp(28px, 5.5vw, 52px)' }}>
                  {lang === 'ko' ? <>AI GPT 도구 33<span className="text-white/20">.</span></> : <>33 AI GPT Tools<span className="text-white/20">.</span></>}
                </h2>
                <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-lg mb-10">
                  {lang === 'ko'
                    ? '전자책부터 영상, 이미지, 홍보물까지 — 수강생에게 독점 제공하는 33가지 GPT 도구 모음입니다.'
                    : 'From eBooks to video, image, and marketing — 33 exclusive GPT tools for enrolled students.'}
                </p>
                <div className="flex items-end gap-10 sm:gap-14">
                  {[
                    { value: TOTAL, label: lang === 'ko' ? '전체 도구' : 'Total Tools' },
                    { value: 5,     label: lang === 'ko' ? '카테고리' : 'Categories' },
                    { value: 'GPT', label: lang === 'ko' ? '전용 AI' : 'Exclusive AI' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="text-white font-extrabold tracking-tight leading-none"
                        style={{ fontSize: 'clamp(30px, 5vw, 50px)' }}>{s.value}</div>
                      <div className="text-white/30 text-[10px] uppercase tracking-[0.18em] font-semibold mt-2">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 분포 바 */}
            <div className="px-8 sm:px-10 md:px-12 py-6 border-t border-white/[0.06]">
              <div className="flex h-1 rounded-full overflow-hidden gap-px mb-4">
                {(['ebook','video','image','marketing','content'] as CatId[]).map(id => {
                  const cnt = TOOLS_DATA.filter(t => t.cat === id).length;
                  return <div key={id} style={{ width: `${(cnt / TOTAL) * 100}%`, background: CAT_META[id].color }} />;
                })}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {(['ebook','video','image','marketing','content'] as CatId[]).map(id => {
                  const cnt = TOOLS_DATA.filter(t => t.cat === id).length;
                  return (
                    <button key={id} onClick={() => setActive(id)}
                      className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none">
                      <span className="w-2 h-2 rounded-full" style={{ background: CAT_META[id].color }} />
                      {lang === 'ko' ? CAT_META[id].label_ko : CAT_META[id].label_en} ({cnt})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 탭 필터 ── */}
        <motion.div className="mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }} viewport={{ once: true }}>
          <div className="flex gap-0 border-b border-white/10 min-w-max sm:min-w-0">
            {CATS.map(({ id, label, Icon }) => {
              const isActive = active === id;
              const count = id === 'all' ? TOTAL : TOOLS_DATA.filter(t => t.cat === id).length;
              return (
                <button key={id} onClick={() => setActive(id)}
                  className={`relative flex items-center gap-1.5 px-4 sm:px-5 py-3.5 text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer bg-transparent border-none whitespace-nowrap ${isActive ? 'text-white' : 'text-white/35 hover:text-white/65'}`}>
                  <Icon size={15} />
                  {label}
                  <span className={`text-[11px] ${isActive ? 'text-white/45' : 'text-white/20'}`}>{count}</span>
                  {isActive && <motion.div layoutId="tools-tab-underline" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── 도구 그리드 ── */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((tool, i) => {
              const color = CAT_META[tool.cat].color;
              return (
                <motion.div key={tool.no}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}>
                  <Link to={`/tools/${tool.slug}`}
                    className="group flex flex-col gap-3 p-4 sm:p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.04] transition-all no-underline h-full"
                    style={{ textDecoration: 'none', display: 'flex' }}>

                    {/* 상단: 번호 + 화살표 */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                        style={{ background: `${color}22`, color }}>
                        {String(tool.no).padStart(2, '0')}
                      </div>
                      <IconArrowUpRight size={14} className="text-white/20 group-hover:text-white/55 transition-colors" />
                    </div>

                    {/* 제목 */}
                    <div className="flex-1">
                      <p className="text-white text-[13px] sm:text-[14px] font-semibold leading-snug group-hover:text-white/90 transition-colors">
                        {lang === 'ko' ? tool.title : tool.titleEn}
                      </p>
                      <p className="text-white/35 text-[11px] mt-1 line-clamp-1">
                        {lang === 'ko' ? tool.tagline : tool.taglineEn}
                      </p>
                    </div>

                    {/* 하단: 가격 */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${color}18`, color }}>
                        {lang === 'ko' ? CAT_META[tool.cat].label_ko : CAT_META[tool.cat].label_en}
                      </span>
                      {tool.priceType === 'sub' ? (
                        <span className="text-[11px] font-semibold text-white/40">
                          {lang === 'ko' ? '구독 전용' : 'Sub only'}
                        </span>
                      ) : (
                        <div className="text-right">
                          <span className="text-white/25 text-[10px] line-through mr-1">
                            {fmt(tool.originalPrice)}
                          </span>
                          <span className="text-white text-[12px] font-bold">
                            {fmt(tool.price!)}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── 하단 CTA ── */}
        <motion.div className="mt-12 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <div>
            <p className="text-white font-bold text-[15px] sm:text-[16px] mb-1">
              {lang === 'ko' ? '33개 전체를 구독으로 이용하세요.' : 'Access all 33 tools with subscription.'}
            </p>
            <p className="text-white/35 text-[13px]">
              {lang === 'ko' ? '월 20,750원 · 신규 도구 자동 추가 · 언제든 취소' : '₩20,750/mo · New tools added auto · Cancel anytime'}
            </p>
          </div>
          <motion.button
            className="flex items-center gap-2 px-7 py-3.5 bg-white rounded-full text-black text-[14px] font-bold cursor-pointer border-none"
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            {lang === 'ko' ? '구독 시작하기' : 'Start Subscription'}
            <IconArrowUpRight size={14} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
