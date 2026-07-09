/**
 * GalleryPage — 수강생 포트폴리오
 * aicitybuilders.com/gallery 구조 벤치마킹 + GrowthAI 골드/블랙 스타일
 * 메인 배너: 우주 궤도 파티클 애니메이션 (순수 Framer Motion, canvas 없음)
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, TrendingUp, Users, Award, ChevronRight, ChevronLeft, X, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ════════════════════════════════════
   우주 애니메이션 컴포넌트
════════════════════════════════════ */
const ORBITALS = [
  { r: 80,  dur: 7,  size: 8,  color: '#C9A84C', delay: 0,   rev: false },
  { r: 130, dur: 13, size: 5,  color: '#D4BA6A', delay: 2.5, rev: true  },
  { r: 185, dur: 20, size: 6,  color: '#A88330', delay: 1,   rev: false },
  { r: 240, dur: 29, size: 4,  color: '#C9A84C', delay: 4,   rev: true  },
  { r: 295, dur: 40, size: 3,  color: '#D4BA6A', delay: 1.5, rev: false },
];

function SpaceBanner() {
  const stars = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: (i * 17 + 7) % 100,
      y: (i * 23 + 13) % 100,
      size: (i % 3) * 0.7 + 0.5,
      delay: (i * 0.37) % 4,
      dur: 2.5 + (i % 5) * 0.6,
      op: 0.15 + (i % 4) * 0.12,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>

      {/* ── 강제 다크 배경 (라이트 모드 대응) ── */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000' }} />

      {/* 배경 그라데이션 성운 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.18) 0%, rgba(120,80,200,0.08) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute"
        style={{
          width: 320, height: 320, top: '8%', left: '12%',
          background: 'radial-gradient(circle, rgba(100,60,220,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute"
        style={{
          width: 220, height: 220, bottom: '12%', right: '8%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* 점 격자 오버레이 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 별 반짝임 — 골드 색상으로 더 잘 보이게 */}
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            backgroundColor: s.id % 3 === 0 ? '#C9A84C' : '#ffffff',
          }}
          animate={{ opacity: [s.op * 0.4, s.op + 0.2, s.op * 0.2] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* 궤도 시스템 — 중앙 */}
      <div
        className="absolute"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {/* 중심 코어 글로우 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 30, height: 30, top: -15, left: -15,
            background: 'radial-gradient(circle, #C9A84C 0%, rgba(201,168,76,0.3) 60%, transparent 100%)',
            boxShadow: '0 0 40px 14px rgba(201,168,76,0.6)',
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {ORBITALS.map((orb, i) => (
          <div key={i}>
            {/* 궤도 링 — 더 잘 보이게 opacity 높임 */}
            <div
              className="absolute rounded-full"
              style={{
                width: orb.r * 2, height: orb.r * 2,
                top: -orb.r, left: -orb.r,
                border: '1px solid rgba(201,168,76,0.22)',
              }}
            />
            {/* 공전 dot */}
            <motion.div
              className="absolute"
              style={{
                width: orb.r * 2, height: orb.r * 2,
                top: -orb.r, left: -orb.r,
              }}
              animate={{ rotate: orb.rev ? -360 : 360 }}
              transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: orb.size, height: orb.size,
                  backgroundColor: orb.color,
                  top: -orb.size / 2,
                  left: '50%', marginLeft: -orb.size / 2,
                  boxShadow: `0 0 ${orb.size * 4}px ${orb.color}99, 0 0 ${orb.size * 1.5}px ${orb.color}`,
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   포트폴리오 데이터
════════════════════════════════════ */
const CATEGORIES = ['전체', '유튜브 채널', 'AI 영상', '자동화', '쇼핑몰', '비즈니스'] as const;
type Cat = typeof CATEGORIES[number];

interface Work {
  id: number; category: string; emoji: string;
  title: string; name: string; period: string;
  result: string; metric: string; metricLabel: string;
  tags: string[];
}

const WORKS: Work[] = [
  { id: 1,  category: '유튜브 채널', emoji: '🎬', title: '30일 만에 구독자 1,000명 달성',          name: '김○○', period: '수강 1개월',  result: '구독자 1,247명 / 월 수익 ₩320,000',         metric: '1,247',  metricLabel: '구독자',    tags: ['유튜브쇼츠', 'AI대본'] },
  { id: 2,  category: 'AI 영상',    emoji: '🍳', title: 'AI 나레이션 요리 채널 런칭',              name: '이○○', period: '첫 영상',     result: '첫 영상 3만 뷰 · 구독자 820명',             metric: '3만',    metricLabel: '첫 영상 뷰', tags: ['ElevenLabs', 'CapCut'] },
  { id: 3,  category: '자동화',     emoji: '⚙️', title: 'N8N 카카오 자동답장 시스템 구축',        name: '박○○', period: '수강 2주',    result: '고객 응대 시간 90% 절감 / 18분으로',         metric: '90%',    metricLabel: '시간 절감', tags: ['N8N', '카카오'] },
  { id: 4,  category: '쇼핑몰',     emoji: '🛒', title: 'AI 상품 설명 자동 생성 시스템',           name: '최○○', period: '수강 3주',    result: '상품 등록 시간 70% 단축 · 매출 32% 증가',   metric: '32%',    metricLabel: '매출 증가', tags: ['ChatGPT', '쇼핑몰자동화'] },
  { id: 5,  category: '유튜브 채널', emoji: '🏠', title: '부동산 AI 분석 채널 개설',               name: '정○○', period: '수강 6개월', result: '구독자 5,000명 · 광고 수익 월 ₩850,000',    metric: '5,000',  metricLabel: '구독자',    tags: ['유튜브', 'AI분석'] },
  { id: 6,  category: '비즈니스',   emoji: '💼', title: 'AI 마케팅 대행 1인 기업 창업',            name: '한○○', period: '수강 3개월', result: '월 순수익 ₩4,500,000 달성 · 고객사 8곳',    metric: '450만',  metricLabel: '월 순수익', tags: ['마케팅대행', '1인기업'] },
  { id: 7,  category: 'AI 영상',    emoji: '📚', title: '영어 학원 AI 홍보 영상 제작',             name: '강○○', period: '수강 1개월', result: '수강생 40% 증가 · 매출 ₩12M → ₩17M',      metric: '40%',    metricLabel: '수강생 증가', tags: ['HeyGen', '학원홍보'] },
  { id: 8,  category: '자동화',     emoji: '☕', title: 'SNS 자동 포스팅 시스템 구축',             name: '윤○○', period: '수강 2주',    result: '인스타 팔로워 2배 · 방문객 25% 증가',        metric: '2배',    metricLabel: '팔로워 성장', tags: ['N8N', '인스타'] },
  { id: 9,  category: '쇼핑몰',     emoji: '⭐', title: 'AI 고객 리뷰 관리 자동화',               name: '서○○', period: '수강 1개월', result: '별점 4.2 → 4.8 · 재구매율 18% 증가',        metric: '4.8★',   metricLabel: '평균 별점', tags: ['자동화', '리뷰관리'] },
  { id: 10, category: '비즈니스',   emoji: '🚀', title: 'AI 강의 플랫폼 1인 창업',                name: '조○○', period: '수강 4개월', result: '퇴사 후 月 ₩8,200,000 달성 · 수강생 340명', metric: '820만',  metricLabel: '월 수익',   tags: ['강의플랫폼', '1인창업'] },
  { id: 11, category: '유튜브 채널', emoji: '🎵', title: 'AI 음악 리뷰 유튜브 채널',               name: '송○○', period: '수강 2개월', result: '구독자 3,200명 · 협찬 문의 월 5건',          metric: '3,200',  metricLabel: '구독자',    tags: ['유튜브', 'AI음악'] },
  { id: 12, category: 'AI 영상',    emoji: '✈️', title: 'AI 여행 브이로그 자동화 채널',            name: '임○○', period: '수강 2개월', result: '월 영상 16편 자동 제작 · 구독자 2,100명',    metric: '16편',   metricLabel: '월 제작량', tags: ['여행브이로그', 'AI자동화'] },
];

const STATS = [
  { Icon: Users,      value: '1,200+', label: '누적 수강생'       },
  { Icon: TrendingUp, value: '94%',    label: '수강생 성과 달성률' },
  { Icon: Award,      value: '₩420K', label: '수강생 평균 월수익' },
  { Icon: Star,       value: '4.9',    label: '수강생 만족도'      },
];

/* ════════════════════════════════════
   후기 데이터 (9개 = 3페이지)
════════════════════════════════════ */
const TESTIMONIALS = [
  { quote: '"GrowthAI 덕분에 퇴사 후 3개월 만에 월 수익 500만 원을 달성했습니다. 정말 인생이 바뀌었어요."', name: '한○○', role: '1인 기업가', ep: 'EP 01' },
  { quote: '"유튜브 자동화 시스템을 구축한 후 콘텐츠 제작 시간이 80% 줄었습니다. 이제 전략에만 집중해요."', name: '김○○', role: '유튜버',    ep: 'EP 02' },
  { quote: '"AI가 처음엔 두려웠는데 강의를 듣고 나니 이제 AI 없이는 일을 못할 것 같아요."',               name: '박○○', role: '소상공인',  ep: 'EP 01' },
  { quote: '"N8N으로 고객 응대를 자동화했더니 하루 4시간이 절약됐습니다. 그 시간에 새 사업을 시작했어요."',  name: '최○○', role: '소상공인',  ep: 'EP 03' },
  { quote: '"ChatGPT 프롬프트 하나로 상품 설명을 200개 자동 생성했습니다. 매출이 바로 늘었어요."',          name: '정○○', role: '온라인 셀러', ep: 'EP 02' },
  { quote: '"AI 영상 제작을 배우고 나서 유튜브 채널 개설 2개월 만에 수익 창출 조건을 달성했습니다."',       name: '이○○', role: '유튜버',    ep: 'EP 01' },
  { quote: '"마케팅 이론과 AI를 결합하는 방식이 너무 신선했어요. 실전에서 바로 적용할 수 있었습니다."',      name: '강○○', role: '마케터',    ep: 'EP 03' },
  { quote: '"코딩을 전혀 모르는데도 나만의 AI 자동화 시스템을 구축했습니다. 믿기 어렵지만 사실이에요."',    name: '윤○○', role: '프리랜서',  ep: 'EP 02' },
  { quote: '"수강 3개월 만에 1인 마케팅 대행사를 창업했습니다. 지금은 고객사 8곳과 함께하고 있어요."',      name: '송○○', role: '대행사 대표', ep: 'EP 04' },
];
const TESTI_PER_PAGE = 3;

/* ════════════════════════════════════
   포트폴리오 카드 (클릭 애니메이션 + 모달)
════════════════════════════════════ */
function WorkCard({ work, index, onClick }: { work: Work; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="group relative flex flex-col border rounded-2xl overflow-hidden transition-colors duration-200"
      style={{
        cursor: 'pointer',
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.015)',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        borderColor: 'rgba(201,168,76,0.35)',
        backgroundColor: 'rgba(201,168,76,0.03)',
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.96, transition: { duration: 0.12 } }}
      onClick={onClick}
      layout
    >
      {/* 호버 시 우측하단 "자세히" 힌트 */}
      <div
        className="absolute bottom-3 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ color: '#C9A84C', fontSize: 11, fontWeight: 600 }}
      >
        리포트 보기 <ArrowUpRight size={11} />
      </div>

      {/* 헤더 */}
      <div
        className="px-6 pt-6 pb-4 flex items-start justify-between gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.055) 0%, transparent 60%)' }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px] shrink-0"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
        >
          {work.emoji}
        </div>
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shrink-0"
          style={{ color: '#C9A84C', backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.18)' }}
        >
          {work.category}
        </span>
      </div>

      {/* 본문 */}
      <div className="px-6 pb-4 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-white font-bold text-[15px] sm:text-[16px] leading-snug mb-1">{work.title}</h3>
          <p className="text-white/30 text-[12px]">{work.name} · {work.period}</p>
        </div>

        {/* 수치 하이라이트 */}
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-xl"
          style={{ backgroundColor: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)' }}
        >
          <div className="shrink-0">
            <p className="font-extrabold tracking-tight leading-none" style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: '#C9A84C' }}>
              {work.metric}
            </p>
            <p className="text-white/30 text-[10px] mt-0.5">{work.metricLabel}</p>
          </div>
          <div className="flex-1 border-l border-white/8 pl-4">
            <p className="text-white/50 text-[12px] leading-relaxed">{work.result}</p>
          </div>
        </div>
      </div>

      {/* 태그 */}
      <div className="px-6 pb-8 pt-2 flex flex-wrap gap-1.5 border-t border-white/5">
        {work.tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] border" style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)', borderColor: 'rgba(255,255,255,0.06)' }}>
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════
   상세 모달
════════════════════════════════════ */
function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }} />

      {/* 모달 패널 */}
      <motion.div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ backgroundColor: '#111', border: '1px solid rgba(201,168,76,0.3)' }}
        initial={{ scale: 0.9, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 12, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div
          className="px-6 pt-6 pb-5 flex items-start justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}
            >
              {work.emoji}
            </div>
            <div>
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ color: '#C9A84C', backgroundColor: 'rgba(201,168,76,0.12)' }}
              >
                {work.category}
              </span>
              <p className="text-white/35 text-[12px] mt-1">{work.name} · {work.period}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
          >
            <X size={14} />
          </button>
        </div>

        {/* 본문 */}
        <div className="px-6 pb-6 flex flex-col gap-5">
          <h2 className="apple-white-gradient font-extrabold text-[20px] leading-snug">{work.title}</h2>

          {/* 핵심 수치 */}
          <motion.div
            className="rounded-xl px-5 py-4"
            style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-5">
              <div className="shrink-0">
                <p className="font-extrabold tracking-tight text-[32px] leading-none" style={{ color: '#C9A84C' }}>
                  {work.metric}
                </p>
                <p className="text-white/35 text-[11px] mt-1">{work.metricLabel}</p>
              </div>
              <div className="flex-1 border-l border-white/10 pl-5">
                <p className="text-white/65 text-[13px] leading-relaxed">{work.result}</p>
              </div>
            </div>
          </motion.div>

          {/* 별 5개 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 400 }}
              >
                <Star size={14} fill="#C9A84C" color="#C9A84C" />
              </motion.div>
            ))}
            <span className="text-white/30 text-[11px] ml-2">수강생 성과 인증</span>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/6">
            <button
              onClick={() => navigate(`/portfolio/${work.id}`)}
              className="w-full h-11 rounded-xl font-bold text-[14px] text-black cursor-pointer border-none transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: '#C9A84C' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4BA6A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C9A84C'; }}
            >
              <ArrowUpRight size={14} />
              전체 리포트 보기
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/enroll')}
                className="flex-1 h-9 rounded-xl font-semibold text-[12px] cursor-pointer border-none transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}
              >
                나도 시작하기 →
              </button>
              <button
                onClick={onClose}
                className="px-4 h-9 rounded-xl font-semibold text-[12px] cursor-pointer border transition-all"
                style={{ backgroundColor: 'transparent', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════
   메인 컴포넌트
════════════════════════════════════ */
export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState<Cat>('전체');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [testPage, setTestPage] = useState(0);
  const navigate = useNavigate();

  const totalTestiPages = Math.ceil(TESTIMONIALS.length / TESTI_PER_PAGE);
  const currentTestis = TESTIMONIALS.slice(testPage * TESTI_PER_PAGE, (testPage + 1) * TESTI_PER_PAGE);

  const filtered = activeCat === '전체' ? WORKS : WORKS.filter(w => w.category === activeCat);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title="수강생 포트폴리오 | GrowthAI"
        description="수강생의 실제 결과와 포트폴리오를 소개하는 사례 페이지입니다."
        canonical="/gallery"
        image={DEFAULT_OG_IMAGE}
        keywords={['포트폴리오', '수강생 사례', '결과', 'GrowthAI']}
      />

      {/* 모달 */}
      <AnimatePresence>
        {selectedWork && (
          <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
        )}
      </AnimatePresence>

      {/* ══ HERO — 우주 궤도 애니메이션 배너 ══ */}
      <section
        className="relative pt-16 overflow-hidden"
        style={{ minHeight: 540, backgroundColor: '#000' }}
      >
        {/* 우주 애니메이션 (z-index 0) */}
        <SpaceBanner />

        {/* 하단 블랙 페이드 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #000)', zIndex: 1 }}
        />

        {/* 텍스트 콘텐츠 */}
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-28" style={{ zIndex: 2 }}>

          <motion.p
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            STUDENT PORTFOLIO
          </motion.p>

          <motion.h1
            className="font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ fontSize: 'clamp(34px, 6vw, 72px)', color: '#ffffff' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            수강생
            <span className="apple-gold-gradient"> 포트폴리오</span>
          </motion.h1>

          <motion.p
            className="text-[15px] sm:text-[17px] leading-relaxed max-w-lg"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            GrowthAI 수강생들의 실제 결과물과 비즈니스 성과를 확인하세요.
          </motion.p>

          {/* 스크롤 힌트 */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="w-px h-8 mx-auto"
              style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.7), transparent)' }}
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* ══ 통계 바 ══ */}
      <section style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {STATS.map(({ Icon, value, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center text-center md:px-8"
              style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon size={18} style={{ color: '#C9A84C', opacity: 0.85, marginBottom: 8 }} />
              <p className="font-extrabold tracking-tight leading-none mb-1.5" style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: '#C9A84C' }}>
                {value}
              </p>
              <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 포트폴리오 그리드 ══ */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">

        {/* 카테고리 필터 */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="px-4 py-2 rounded-full text-[13px] font-semibold border transition-all cursor-pointer hover:border-white/40 hover:text-white/80"
              style={
                activeCat === cat
                  ? { backgroundColor: '#C9A84C', color: '#0a0a0a', borderColor: '#C9A84C' }
                  : { backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.3)' }
              }
            >
              {cat}
              {cat !== '전체' && (
                <span className="ml-1.5 text-[10px] opacity-50">
                  {WORKS.filter(w => w.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* 카드 그리드 */}
        <AnimatePresence mode="popLayout">
          <motion.div key={activeCat} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" layout>
            {filtered.map((work, i) => (
              <WorkCard key={work.id} work={work} index={i} onClick={() => navigate(`/portfolio/${work.id}`)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ══ 수강생 후기 (페이지네이션 + 애니메이션) ══ */}
      <section className="max-w-6xl mx-auto px-6 pb-10">

        {/* 헤더 */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: '#C9A84C' }}>
              TESTIMONIALS
            </p>
            <p className="text-white/30 text-[13px]">수강생 {TESTIMONIALS.length}명의 실제 후기</p>
          </div>

          {/* 페이지네이션 — 우측 상단 */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setTestPage(p => Math.max(0, p - 1))}
              disabled={testPage === 0}
              className="w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer transition-all"
              style={{
                borderColor: testPage === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(201,168,76,0.35)',
                backgroundColor: testPage === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(201,168,76,0.08)',
                color: testPage === 0 ? 'rgba(255,255,255,0.2)' : '#C9A84C',
              }}
              whileTap={testPage > 0 ? { scale: 0.92 } : {}}
            >
              <ChevronLeft size={16} />
            </motion.button>

            {Array.from({ length: totalTestiPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setTestPage(i)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border text-[13px] font-bold cursor-pointer transition-all"
                style={
                  testPage === i
                    ? { backgroundColor: '#C9A84C', borderColor: '#C9A84C', color: '#0a0a0a' }
                    : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }
                }
                whileHover={testPage !== i ? { borderColor: 'rgba(201,168,76,0.4)', color: '#C9A84C' } : {}}
                whileTap={{ scale: 0.92 }}
              >
                {i + 1}
              </motion.button>
            ))}

            <motion.button
              onClick={() => setTestPage(p => Math.min(totalTestiPages - 1, p + 1))}
              disabled={testPage === totalTestiPages - 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer transition-all"
              style={{
                borderColor: testPage === totalTestiPages - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(201,168,76,0.35)',
                backgroundColor: testPage === totalTestiPages - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(201,168,76,0.08)',
                color: testPage === totalTestiPages - 1 ? 'rgba(255,255,255,0.2)' : '#C9A84C',
              }}
              whileTap={testPage < totalTestiPages - 1 ? { scale: 0.92 } : {}}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* 후기 카드 그리드 — 페이지 전환 애니메이션 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={testPage}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentTestis.map((t, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-4 rounded-2xl p-6 border border-white/8 bg-white/[0.015]"
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.28)', y: -3, transition: { duration: 0.2 } }}
              >
                {/* 따옴표 + 별점 */}
                <div className="flex items-center justify-between">
                  <span className="text-[30px] leading-none" style={{ color: '#C9A84C', opacity: 0.35 }}>"</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={11} fill="#C9A84C" color="#C9A84C" style={{ opacity: 0.8 }} />
                    ))}
                  </div>
                </div>

                <p className="text-white/60 text-[13px] sm:text-[14px] leading-relaxed flex-1 italic">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
                    style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white/75 text-[12px] font-semibold">{t.name}</p>
                    <p className="text-white/30 text-[11px]">{t.role} · {t.ep} 수료</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 하단 페이지 인디케이터 (점) */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalTestiPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setTestPage(i)}
              className="cursor-pointer border-none p-0"
              style={{
                width: testPage === i ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: testPage === i ? '#C9A84C' : 'rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </section>

      {/* ══ CTA 배너 ══ */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-white/8 text-center px-8 py-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 120%, rgba(201,168,76,0.12) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>
              NEXT SUCCESS STORY
            </p>
            <h2 className="apple-white-gradient font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}>
              다음 주인공은 <span className="apple-gold-gradient">당신</span>입니다
            </h2>
            <p className="text-white/45 text-[14px] sm:text-[16px] mb-8 max-w-md mx-auto leading-relaxed">
              지금 수강 신청하고 AI로 비즈니스를 혁신하세요.<br />첫 성과까지 평균 17일이면 충분합니다.
            </p>
            <button
              onClick={() => navigate('/enroll')}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl font-bold text-[15px] transition-all cursor-pointer border-none"
              style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4BA6A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C9A84C'; }}
            >
              수강 신청하기 <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
