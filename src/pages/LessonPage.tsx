/**
 * LessonPage — 유료 강의 수강 페이지
 * YouTube 영상 + 커리큘럼 사이드바 + 퀴즈(3문항 4지선다) + 포인트 적립 + 코인 에어드랍
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Lock, Play, ChevronLeft, ChevronRight,
  Coins, Star, Clock, Users, Zap, Trophy, Gift, Check, X
} from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── 임시 강의 데이터 (추후 DB 연동) ─── */
const COURSE = {
  title: '한 권의 책 완성 실행 시스템',
  subtitle: '아이디어부터 홍보까지 — 12단계로 책 한 권을 끝까지 완성하는 AI 실행 시스템',
  rating: 4.9,
  students: 1200,
  totalHours: '15시간 30분',
  totalLessons: 9,
};

const LESSONS = [
  {
    id: 1,
    title: '[AI왕기초] 최신 2025 ver. ChatGPT 완전 입력문 가이드',
    duration: '26분',
    locked: false,
    youtubeId: 'qOnGVYJqLLc',
    description: '책 한 권을 아이디어부터 홍보까지 완성하는 12단계 AI 실행 시스템 소개. 단순 글쓰기 방법이 아닌, 멈추지 않고 끝까지 완성하게 만드는 구조 중심 접근법.',
    keyPoints: [
      '기획 → 집필 → 홍보가 하나의 흐름으로 이어지는 구조',
      '흐름이 끊기지 않도록 단계별 자동 이어짐 설계',
      '완성 후 바로 판매·홍보 가능한 콘텐츠까지 생성',
    ],
    quiz: [
      {
        question: 'ChatGPT GPT-4o와 GPT-3.5의 가장 큰 차이점은 무엇인가요?',
        options: ['응답 속도가 더 빠르다', '이미지·음성 등 멀티모달 처리가 가능하다', '한국어만 지원한다', '무료로만 사용 가능하다'],
        answer: 1,
      },
      {
        question: 'ChatGPT 프롬프트 작성 시 가장 효과적인 방법은?',
        options: ['최대한 짧게 쓴다', '영어로만 작성한다', '구체적인 역할(Role)을 부여한다', '질문 없이 명령만 한다'],
        answer: 2,
      },
      {
        question: '2025년 기준 ChatGPT 무료 버전에서 사용 가능한 기능은?',
        options: ['GPT-4o 무제한 사용', 'DALL·E 이미지 생성', 'GPT-3.5 기반 대화', '플러그인 전체 이용'],
        answer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'ChatGPT로 내 사진을 애니메이션으로 만들기',
    duration: '21분',
    locked: true,
    youtubeId: '',
    description: '준비 중입니다.',
    keyPoints: [],
    quiz: [],
  },
  {
    id: 3,
    title: '사진만 찍으면 광고 포스터를 만들 수 있다고?',
    duration: '17분',
    locked: true,
    youtubeId: '',
    description: '준비 중입니다.',
    keyPoints: [],
    quiz: [],
  },
  {
    id: 4,
    title: 'ChatGPT 스마트폰 모바일 200% 활용',
    duration: '17분',
    locked: true,
    youtubeId: '',
    description: '준비 중입니다.',
    keyPoints: [],
    quiz: [],
  },
  {
    id: 5,
    title: 'N8N 자동화 — 코딩 없이 업무 자동화',
    duration: '32분',
    locked: true,
    youtubeId: '',
    description: '준비 중입니다.',
    keyPoints: [],
    quiz: [],
  },
];

/* ─── 랜딩 섹션 데이터 ─── */
const PAIN_LIST = [
  '무엇부터 시작해야 할지 모릅니다',
  '쓰다가 흐름이 끊깁니다',
  '끝까지 완성해본 경험이 없습니다',
  '기획, 집필, 홍보가 따로 놀고 있습니다',
];
const OLD_WAY = [
  '글쓰기 방법만 알려줍니다',
  '시작은 쉬운데 끝까지 못 갑니다',
  '구조 없이 감으로 진행합니다',
  '완성 이후를 고려하지 않습니다',
];
const NEW_WAY = [
  '주제 발굴부터 자동으로 방향을 잡습니다',
  '단계별로 흐름이 끊기지 않게 설계됩니다',
  '기획 → 집필 → 홍보까지 이어집니다',
  '중간에 멈출 틈 없이 다음 단계로 진행됩니다',
];
const STEPS_12 = [
  '주제 도출 — 내가 쓸 수 있는 주제 자동 발굴',
  '제목 설계 — 독자가 클릭하는 제목 구조',
  '타깃 정의 — 독자의 고통·욕구 명확화',
  '가치 구조화 — 독자가 원하는 핵심 정리',
  '목차 자동 설계 — 실행 가능한 챕터 구성',
  '서문 작성 — 독자를 끌어당기는 오프닝',
  '본문 집필 (챕터별) — 흐름 끊김 없이 완성',
  '마무리 장 — 행동 유도 & 결론 설계',
  '교정 & 편집 — AI 기반 퇴고 자동화',
  '표지 & 레이아웃 — 판매 가능한 형태로',
  '홍보 콘텐츠 생성 — SNS·블로그 자동 제작',
  '출판·배포 전략 — 판매 채널 연결',
];
const BEFORE_AFTER = [
  { before: '아이디어만 있고 실행이 안 됨', after: '주제부터 명확하게 정리됨' },
  { before: '글을 쓰다 멈추는 반복', after: '단계 따라가면 자연스럽게 완성' },
  { before: '구조 없이 막연하게 진행', after: '흐름이 끊기지 않음' },
  { before: '완성 경험 없음', after: '한 권의 책 완성 경험 확보' },
];
const FAQ_LIST = [
  { q: '정말 끝까지 쓸 수 있을까요?', a: '단계가 자동으로 이어지기 때문에 멈출 지점이 없습니다.' },
  { q: '글을 잘 못 써도 괜찮을까요?', a: "잘 쓰는 것이 아니라 '구조대로 완성하는 것'에 집중합니다." },
  { q: '아이디어가 부족한데 가능할까요?', a: '초기 단계에서 주제부터 도출되도록 설계되어 있습니다.' },
  { q: '혼자 진행해도 괜찮나요?', a: '각 단계가 다음 행동을 자연스럽게 이어줍니다.' },
];

/* ─── 포인트 상수 ─── */
const POINTS = { LESSON_COMPLETE: 10, QUIZ_CORRECT: 10 };
const COIN_RATE = 1000; // 1,000P = 1 FLOWE 코인

/* ════════════════════════════════════════
   메인 컴포넌트
════════════════════════════════════════ */
export default function LessonPage() {
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([null, null, null]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('flowe_points');
    return saved ? parseInt(saved) : 0;
  });
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('flowe_completed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [pointGain, setPointGain] = useState<number | null>(null);
  const [showCoinInfo, setShowCoinInfo] = useState(false);

  const lesson = LESSONS[currentLessonIdx];
  const progress = Math.round((completedLessons.size / LESSONS.length) * 100);

  /* 포인트 저장 */
  useEffect(() => {
    localStorage.setItem('flowe_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('flowe_completed', JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  /* 강의 변경 시 퀴즈 리셋 */
  useEffect(() => {
    setSelectedAnswers([null, null, null]);
    setQuizSubmitted(false);
    setQuizScore(0);
  }, [currentLessonIdx]);

  /* 포인트 애니메이션 */
  const addPoints = (amount: number) => {
    setPoints(p => p + amount);
    setPointGain(amount);
    setTimeout(() => setPointGain(null), 2000);
  };

  /* 강의 완료 */
  const handleComplete = () => {
    if (!completedLessons.has(lesson.id)) {
      const newSet = new Set(completedLessons);
      newSet.add(lesson.id);
      setCompletedLessons(newSet);
      addPoints(POINTS.LESSON_COMPLETE);
    }
  };

  /* 퀴즈 제출 */
  const handleQuizSubmit = () => {
    if (selectedAnswers.some(a => a === null)) return;
    let score = 0;
    lesson.quiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    const earned = score * POINTS.QUIZ_CORRECT;
    if (earned > 0) addPoints(earned);
  };

  const goNext = () => {
    if (currentLessonIdx < LESSONS.length - 1) setCurrentLessonIdx(i => i + 1);
  };
  const goPrev = () => {
    if (currentLessonIdx > 0) setCurrentLessonIdx(i => i - 1);
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, sans-serif' }}>
      <Seo
        title="수강 강의 | GrowthAI"
        description="유료 강의 실습과 퀴즈, 포인트 적립이 포함된 수강 페이지입니다."
        canonical="/lesson"
        image={DEFAULT_OG_IMAGE}
        keywords={['수강 강의', '퀴즈', '실습', 'GrowthAI']}
        noindex
      />

      {/* ── 긴박감 배너 ── */}
      <div className="w-full py-2.5 px-4 text-center text-[13px] font-bold" style={{ background: 'linear-gradient(90deg, #7c2d12, #991b1b, #7c2d12)' }}>
        🔥 <span style={{ color: '#fca5a5' }}>이번 기수 마감</span> — 모집 인원 잔여 <strong style={{ color: '#fff' }}>12명</strong>. 마감 후 재오픈 미정.
      </div>

      {/* ── 코스 헤더 ── */}
      <div className="border-b border-white/8 px-5 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-white font-extrabold text-[18px] sm:text-[22px] tracking-tight mb-1">{COURSE.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1 text-[12px] text-white/50">
                <Star size={12} style={{ color: '#C9A84C' }} fill="#C9A84C" /> {COURSE.rating}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-white/50">
                <Users size={12} /> {COURSE.students.toLocaleString()}명
              </span>
              <span className="flex items-center gap-1 text-[12px] text-white/50">
                <Clock size={12} /> {COURSE.totalHours}
              </span>
            </div>
          </div>
          {/* 포인트 + 코인 */}
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {pointGain && (
                <motion.div
                  key={pointGain + Date.now()}
                  className="absolute font-extrabold text-[18px]"
                  style={{ color: '#C9A84C', pointerEvents: 'none', zIndex: 100, right: 120, top: 80 }}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -40 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  +{pointGain}P
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setShowCoinInfo(!showCoinInfo)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)' }}
              whileHover={{ scale: 1.02 }}
            >
              <Coins size={16} style={{ color: '#C9A84C' }} />
              <span className="font-extrabold text-[15px]" style={{ color: '#C9A84C' }}>{points.toLocaleString()}P</span>
            </motion.button>
          </div>
        </div>

        {/* 코인 인포 패널 */}
        <AnimatePresence>
          {showCoinInfo && (
            <motion.div
              className="max-w-7xl mx-auto mt-3 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderColor: 'rgba(201,168,76,0.25)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Gift size={20} style={{ color: '#C9A84C', flexShrink: 0 }} />
              <div className="flex-1">
                <p className="text-white font-bold text-[14px] mb-0.5">🪙 FLOWE 코인 에어드랍</p>
                <p className="text-white/50 text-[12px]">강의 수강 · 퀴즈 정답으로 포인트를 쌓으면, 추후 FLOWE 코인으로 에어드랍됩니다.</p>
              </div>
              <div className="flex gap-4 shrink-0 text-center">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">내 포인트</p>
                  <p className="text-[18px] font-extrabold" style={{ color: '#C9A84C' }}>{points.toLocaleString()}P</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">예상 코인</p>
                  <p className="text-[18px] font-extrabold text-white">{(points / COIN_RATE).toFixed(3)}</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">환율</p>
                  <p className="text-[13px] font-bold text-white/60">{COIN_RATE}P = 1코인</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 진행도 바 */}
        <div className="max-w-7xl mx-auto mt-4">
          <div className="flex items-center justify-between text-[11px] text-white/30 mb-1.5">
            <span>학습 진도: {completedLessons.size}/{LESSONS.length}강</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #C9A84C, #D4BA6A)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
           Apple-style 세일즈 히어로 섹션
          ════════════════════════════════════ */}
      <div className="relative" style={{ background: '#000' }}>

        {/* ① Hero — 메인 카피 */}
        <div className="relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)'
          }} />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <motion.p
              className="uppercase tracking-[0.2em] font-semibold mb-5"
              style={{ fontSize: '13px', color: '#C9A84C' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            >
              AI 책 완성 실행 시스템
            </motion.p>
            <motion.h1
              className="apple-white-gradient font-extrabold leading-[1.05]"
              style={{ fontSize: 'clamp(44px, 7.5vw, 96px)', letterSpacing: '-0.05em', wordBreak: 'keep-all' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.05, ease: [0.16,1,0.3,1] }}
            >
              쓰다 멈춘 그 책.<br />
              <span className="apple-gold-gradient">AI가 끝냅니다.</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 mb-10"
              style={{ fontSize: 'clamp(17px, 2.2vw, 22px)', color: '#86868b', maxWidth: '600px', lineHeight: 1.6, wordBreak: 'keep-all' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16,1,0.3,1] }}
            >
              아이디어부터 홍보까지. 12단계로 책 한 권을 완성하는 AI 실행 시스템.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16,1,0.3,1] }}
            >
              <a
                href="/enroll"
                className="inline-flex items-center gap-2 font-semibold no-underline transition-all hover:opacity-85 active:scale-[0.98]"
                style={{ backgroundColor: '#C9A84C', color: '#000', fontSize: '17px', padding: '14px 28px', borderRadius: '980px', letterSpacing: '-0.01em', wordBreak: 'keep-all' }}
              >
                지금 수강 신청하기
              </a>
              <a
                href="#lesson-player"
                className="inline-flex items-center gap-1 font-semibold no-underline transition-all hover:opacity-75"
                style={{ color: '#C9A84C', fontSize: '17px', letterSpacing: '-0.01em' }}
              >
                미리보기 강의 ↓
              </a>
            </motion.div>
          </div>
        </div>

        {/* ② MacBook 목업 + 영상 */}
        <motion.div
          className="relative px-4 sm:px-8"
          style={{ paddingBottom: '120px' }}
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease: [0.16,1,0.3,1] }}
        >
          {/* 바닥 glow */}
          <div className="absolute left-1/2 pointer-events-none" style={{
            bottom: '60px', transform: 'translateX(-50%)',
            width: '70%', height: '80px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.18), transparent)',
            filter: 'blur(24px)',
          }} />

          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>

            {/* ── 스크린 lid ── */}
            <div style={{
              background: 'linear-gradient(160deg, #3a3a3c 0%, #2a2a2c 40%, #1c1c1e 100%)',
              borderRadius: '16px 16px 0 0',
              padding: '14px 14px 0 14px',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.12), ' +
                'inset 0 -1px 0 rgba(0,0,0,0.4), ' +
                '0 0 0 0.5px rgba(255,255,255,0.06)',
              position: 'relative',
            }}>
              {/* 카메라 */}
              <div style={{
                position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'radial-gradient(circle, #3a3a3c 30%, #1a1a1a 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
              }} />
              {/* Apple 로고 힌트 (골드) */}
              <div style={{
                position: 'absolute', top: '6px', right: '20px',
                fontSize: '11px', color: 'rgba(201,168,76,0.3)', fontWeight: 700, letterSpacing: '0.05em',
              }}>✦</div>

              {/* 스크린 — 베젤 */}
              <div style={{
                background: '#000',
                borderRadius: '6px 6px 0 0',
                overflow: 'hidden',
                aspectRatio: '16/10',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
              }}>
                <iframe
                  src="https://www.youtube.com/embed/_nZHz-f7PjA?rel=0&modestbranding=1"
                  title="AI 책 완성 시스템 — 실사용 가이드"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </div>
            </div>

            {/* ── 힌지 ── */}
            <div style={{
              height: '6px',
              background: 'linear-gradient(180deg, #1a1a1c 0%, #2a2a2c 100%)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '80px', height: '6px',
                background: 'linear-gradient(180deg, #0a0a0c, #1a1a1c)',
                borderRadius: '0 0 3px 3px',
              }} />
            </div>

            {/* ── 바디 (키보드 영역) ── */}
            <div style={{
              height: '32px',
              background: 'linear-gradient(180deg, #2c2c2e 0%, #1c1c1e 100%)',
              borderRadius: '0 0 10px 10px',
              boxShadow:
                '0 60px 100px rgba(0,0,0,0.7), ' +
                '0 20px 40px rgba(0,0,0,0.5), ' +
                'inset 0 1px 0 rgba(255,255,255,0.08), ' +
                '0 0 0 0.5px rgba(255,255,255,0.05)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* 트랙패드 */}
              <div style={{
                width: '18%', height: '10px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '3px',
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06)',
              }} />
            </div>

          </div>
        </motion.div>

        {/* ③ 지표 — Apple-style 대형 숫자 */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '80px 24px' }}>
          <motion.div
            className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-0"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            {[
              { num: '1,200+', label: '수강생', sub: '전국 수강 중' },
              { num: '4.9', label: '만족도', sub: '별점 평균' },
              { num: '12', label: '단계', sub: '구조적 완성 시스템' },
              { num: '30일', label: '성과 보장', sub: '결과 없으면 전액 환불' },
            ].map((s, i) => (
              <div key={i} className="text-center py-8" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <p
                  className="font-extrabold"
                  style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', color: '#f5f5f7', lineHeight: 1 }}
                >
                  {s.num}
                </p>
                <p className="mt-2 font-semibold" style={{ fontSize: '17px', color: '#C9A84C' }}>{s.label}</p>
                <p className="mt-1" style={{ fontSize: '13px', color: '#6e6e73' }}>{s.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ④ Pain — "지금 이런 상황인가요?" */}
        <div style={{ padding: '140px 24px', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="uppercase tracking-[0.2em] font-semibold mb-6"
              style={{ fontSize: '12px', color: '#6e6e73' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              당신의 이야기
            </motion.p>
            <motion.h2
              className="font-extrabold leading-[1.1] mb-16"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.05em', color: '#f5f5f7', wordBreak: 'keep-all' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              쓰고 싶은데<br />시작이 안 됩니다.
            </motion.h2>
            <div className="flex flex-col gap-12">
              {PAIN_LIST.map((p, i) => (
                <motion.p
                  key={i}
                  className="font-semibold"
                  style={{ fontSize: 'clamp(22px, 3vw, 34px)', color: 'rgba(245,245,247,0.55)', letterSpacing: '-0.03em', lineHeight: 1.3, wordBreak: 'keep-all' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16,1,0.3,1] }}
                >
                  "{p}"
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* ⑤ 이 시스템의 차이 */}
        <div style={{ padding: '140px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <p className="uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontSize: '12px', color: '#6e6e73' }}>무엇이 다른가요</p>
              <h2
                className="font-extrabold leading-[1.1]"
                style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.05em', color: '#f5f5f7', wordBreak: 'keep-all' }}
              >
                기존 방법은 시작은 쉽지만<br />
                <span style={{ color: '#86868b' }}>끝까지 못 갑니다.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {/* OLD */}
              <div className="py-12 pr-0 sm:pr-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="uppercase tracking-[0.2em] font-semibold mb-10" style={{ fontSize: '11px', color: '#6e6e73' }}>기존 방식</p>
                <div className="flex flex-col gap-8">
                  {OLD_WAY.map((item, i) => (
                    <motion.p key={i} style={{ fontSize: '19px', color: 'rgba(245,245,247,0.3)', lineHeight: 1.4, letterSpacing: '-0.02em', wordBreak: 'keep-all' }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>
              {/* NEW */}
              <div className="py-12 pl-0 sm:pl-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="uppercase tracking-[0.2em] font-semibold mb-10" style={{ fontSize: '11px', color: '#C9A84C' }}>이 시스템</p>
                <div className="flex flex-col gap-8">
                  {NEW_WAY.map((item, i) => (
                    <motion.p key={i} style={{ fontSize: '19px', color: '#f5f5f7', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em', wordBreak: 'keep-all' }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⑥ 12단계 — Apple spec sheet 스타일 */}
        <div style={{ padding: '140px 24px', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <p className="uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontSize: '12px', color: '#6e6e73' }}>실행 시스템</p>
              <h2
                className="font-extrabold leading-[1.1]"
                style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.05em', color: '#f5f5f7', wordBreak: 'keep-all' }}
              >
                총 12단계.<br />멈출 틈이 없습니다.
              </h2>
            </motion.div>
            <div>
              {STEPS_12.map((step, i) => {
                const [title, desc] = step.split(' — ');
                return (
                  <motion.div
                    key={i}
                    className="flex items-baseline gap-8 py-7"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16,1,0.3,1] }}
                  >
                    <span style={{ fontSize: '13px', color: '#6e6e73', fontWeight: 600, minWidth: '2rem', letterSpacing: '0.05em' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span style={{ fontSize: '17px', color: '#f5f5f7', fontWeight: 600, marginRight: '8px' }}>{title}</span>
                      {desc && <span style={{ fontSize: '15px', color: '#6e6e73' }}>— {desc}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ⑦ Before/After — Apple quote 스타일 */}
        <div style={{ padding: '140px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.p className="uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontSize: '12px', color: '#6e6e73' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              달라지는 것들
            </motion.p>
            <motion.h2
              className="font-extrabold leading-[1.1] mb-20"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.05em', color: '#f5f5f7', wordBreak: 'keep-all' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              시작 전과 후.
            </motion.h2>
            <div className="flex flex-col gap-16">
              {BEFORE_AFTER.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16,1,0.3,1] }}
                >
                  <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'rgba(245,245,247,0.22)', letterSpacing: '-0.03em', textDecoration: 'line-through', marginBottom: '10px', wordBreak: 'keep-all' }}>
                    {item.before}
                  </p>
                  <p style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#f5f5f7', fontWeight: 700, letterSpacing: '-0.04em', wordBreak: 'keep-all' }}>
                    <span style={{ color: '#C9A84C' }}>→ </span>{item.after}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ⑧ FAQ */}
        <div style={{ padding: '140px 24px', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <p className="uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontSize: '12px', color: '#6e6e73' }}>자주 묻는 질문</p>
              <h2 className="font-extrabold leading-[1.1]"
                style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.05em', color: '#f5f5f7', wordBreak: 'keep-all' }}>
                궁금한 점들
              </h2>
            </motion.div>
            {FAQ_LIST.map((item, i) => (
              <motion.div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '36px 0' }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16,1,0.3,1] }}
              >
                <p style={{ fontSize: '19px', color: '#f5f5f7', fontWeight: 600, marginBottom: '12px', letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>{item.q}</p>
                <p style={{ fontSize: '17px', color: '#86868b', lineHeight: 1.6, letterSpacing: '-0.01em', wordBreak: 'keep-all' }}>{item.a}</p>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
          </div>
        </div>

        {/* ⑨ 최종 CTA */}
        <div className="relative overflow-hidden" style={{ padding: '140px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 70%)'
          }} />
          <motion.div
            className="relative max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          >
            <p className="uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontSize: '12px', color: '#6e6e73' }}>지금 시작하세요</p>
            <h2 className="font-extrabold leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(44px, 7vw, 88px)', letterSpacing: '-0.05em', color: '#f5f5f7', wordBreak: 'keep-all' }}>
              망설일<br />필요 없습니다.
            </h2>
            <p className="mb-12" style={{ fontSize: '21px', color: '#86868b', letterSpacing: '-0.01em', wordBreak: 'keep-all' }}>
              지금 실행해보면 바로 차이를 느낄 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/enroll"
                className="inline-flex items-center gap-2 font-semibold no-underline transition-all hover:opacity-85 active:scale-[0.98]"
                style={{ backgroundColor: '#C9A84C', color: '#000', fontSize: '17px', padding: '14px 28px', borderRadius: '980px', letterSpacing: '-0.01em', wordBreak: 'keep-all', boxShadow: '0 0 60px rgba(201,168,76,0.25)' }}
              >
                지금 수강 신청하기
              </a>
              <a href="https://forms.gle/kVzNby2ZjNL8bPUR9" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold no-underline transition-all hover:opacity-75"
                style={{ color: '#C9A84C', fontSize: '17px', letterSpacing: '-0.01em' }}
              >
                멤버십 문의하기 ↗
              </a>
            </div>
            <p className="mt-10" style={{ fontSize: '12px', color: '#424245' }}>🛡 30일 성과 보장 · 결과 없으면 전액 환불</p>
          </motion.div>
        </div>

      </div>

      {/* ── 메인 2컬럼 레이아웃 ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        {/* 좌: 영상 + 내용 */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* YouTube 영상 */}
          <div className="rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02]" style={{ aspectRatio: '16/9' }}>
            {lesson.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                  <Play size={28} style={{ color: '#C9A84C' }} />
                </div>
                <p className="text-white/30 text-[14px]">수강 권한 필요 — 등록 후 시청 가능</p>
              </div>
            )}
          </div>

          {/* 강의 제목 + 완료 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2 block">
                {currentLessonIdx + 1}강 / 총 {LESSONS.length}강
              </span>
              <h2 className="text-white font-bold text-[17px] sm:text-[20px] leading-snug tracking-tight mb-2">{lesson.title}</h2>
              <p className="text-white/50 text-[14px] leading-relaxed">{lesson.description}</p>
            </div>
            <motion.button
              onClick={handleComplete}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] cursor-pointer border-none"
              style={{
                backgroundColor: completedLessons.has(lesson.id) ? 'rgba(201,168,76,0.15)' : '#C9A84C',
                color: completedLessons.has(lesson.id) ? '#C9A84C' : '#000',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {completedLessons.has(lesson.id)
                ? <><CheckCircle2 size={15} /> 완료됨 (+{POINTS.LESSON_COMPLETE}P 적립)</>
                : <><Check size={15} /> 완료하기 (+{POINTS.LESSON_COMPLETE}P)</>
              }
            </motion.button>
          </div>

          {/* 핵심 포인트 */}
          {lesson.keyPoints.length > 0 && (
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>이번 강의 핵심</p>
              <ul className="flex flex-col gap-2">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/70">
                    <Zap size={13} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── 퀴즈 섹션 ── */}
          {lesson.quiz.length > 0 && (
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.03)' }}>
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <div className="flex items-center gap-2">
                  <Trophy size={16} style={{ color: '#C9A84C' }} />
                  <span className="font-extrabold text-[15px] text-white">강의 퀴즈</span>
                  <span className="text-[11px] text-white/30">3문항 · 4지선다</span>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>
                  최대 +{lesson.quiz.length * POINTS.QUIZ_CORRECT}P
                </span>
              </div>

              <div className="p-6 flex flex-col gap-8">
                {lesson.quiz.map((q, qi) => (
                  <motion.div key={qi} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.07 }}>
                    <p className="text-white font-semibold text-[14px] sm:text-[15px] mb-4 leading-snug">
                      <span style={{ color: '#C9A84C' }}>Q{qi + 1}.</span> {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oi) => {
                        const isSelected = selectedAnswers[qi] === oi;
                        const isCorrect  = oi === q.answer;
                        const showResult = quizSubmitted;

                        let borderColor = 'rgba(255,255,255,0.1)';
                        let bg = 'rgba(255,255,255,0.02)';
                        let textColor = 'rgba(255,255,255,0.65)';

                        if (showResult) {
                          if (isCorrect) { borderColor = 'rgba(74,222,128,0.5)'; bg = 'rgba(74,222,128,0.08)'; textColor = '#4ade80'; }
                          else if (isSelected && !isCorrect) { borderColor = 'rgba(248,113,113,0.5)'; bg = 'rgba(248,113,113,0.08)'; textColor = '#f87171'; }
                        } else if (isSelected) {
                          borderColor = 'rgba(201,168,76,0.5)';
                          bg = 'rgba(201,168,76,0.08)';
                          textColor = '#C9A84C';
                        }

                        return (
                          <motion.button
                            key={oi}
                            onClick={() => {
                              if (!quizSubmitted) {
                                const next = [...selectedAnswers];
                                next[qi] = oi;
                                setSelectedAnswers(next);
                              }
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left border cursor-pointer transition-all"
                            style={{ backgroundColor: bg, borderColor, color: textColor }}
                            whileHover={!quizSubmitted ? { scale: 1.01 } : {}}
                            whileTap={!quizSubmitted ? { scale: 0.99 } : {}}
                          >
                            <span className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 text-[11px] font-bold"
                              style={{ borderColor, color: textColor }}>
                              {showResult
                                ? isCorrect ? <Check size={12} /> : isSelected ? <X size={12} /> : String.fromCharCode(65 + oi)
                                : String.fromCharCode(65 + oi)}
                            </span>
                            <span className="text-[13px] leading-snug font-medium">{opt}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* 제출 / 결과 */}
                {!quizSubmitted ? (
                  <motion.button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswers.some(a => a === null)}
                    className="w-full py-3.5 rounded-xl font-extrabold text-[15px] cursor-pointer border-none transition-all"
                    style={{
                      backgroundColor: selectedAnswers.some(a => a === null) ? 'rgba(255,255,255,0.06)' : '#C9A84C',
                      color: selectedAnswers.some(a => a === null) ? 'rgba(255,255,255,0.25)' : '#000',
                    }}
                    whileHover={!selectedAnswers.some(a => a === null) ? { scale: 1.01 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedAnswers.some(a => a === null) ? '모든 문항을 선택해주세요' : '퀴즈 제출하기'}
                  </motion.button>
                ) : (
                  <motion.div
                    className="p-5 rounded-2xl border text-center"
                    style={{
                      borderColor: quizScore === 3 ? 'rgba(74,222,128,0.4)' : 'rgba(201,168,76,0.3)',
                      backgroundColor: quizScore === 3 ? 'rgba(74,222,128,0.06)' : 'rgba(201,168,76,0.06)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="text-[32px] mb-2">
                      {quizScore === 3 ? '🎉' : quizScore >= 2 ? '👍' : '📚'}
                    </div>
                    <p className="text-white font-extrabold text-[18px] mb-1">
                      {quizScore}문항 / 3문항 정답
                    </p>
                    <p className="text-[13px] mb-3" style={{ color: '#C9A84C' }}>
                      +{quizScore * POINTS.QUIZ_CORRECT}P 적립 완료!
                    </p>
                    <p className="text-white/40 text-[12px]">
                      {quizScore === 3
                        ? '완벽합니다! 다음 강의로 이동하세요.'
                        : '오답을 확인하고 다시 도전해보세요.'}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ── 이전 / 다음 강의 ── */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={goPrev}
              disabled={currentLessonIdx === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-[13px] border cursor-pointer flex-1 justify-center"
              style={{
                backgroundColor: 'transparent',
                borderColor: currentLessonIdx === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)',
                color: currentLessonIdx === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
              }}
              whileHover={currentLessonIdx !== 0 ? { borderColor: 'rgba(201,168,76,0.4)', color: '#fff' } : {}}
            >
              <ChevronLeft size={15} /> 이전 강의
            </motion.button>
            <motion.button
              onClick={goNext}
              disabled={currentLessonIdx === LESSONS.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] text-black cursor-pointer border-none flex-1 justify-center"
              style={{ backgroundColor: currentLessonIdx === LESSONS.length - 1 ? 'rgba(255,255,255,0.08)' : '#C9A84C', color: currentLessonIdx === LESSONS.length - 1 ? 'rgba(255,255,255,0.2)' : '#000' }}
              whileHover={currentLessonIdx !== LESSONS.length - 1 ? { backgroundColor: '#D4BA6A' } : {}}
            >
              다음 강의 <ChevronRight size={15} />
            </motion.button>
          </div>

          {/* ══ 랜딩 콘텐츠 (Apple 스타일 섹션은 페이지 상단 세일즈 히어로에 통합됨) ══ */}
          <div className="flex flex-col" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', display: 'none' }}>

            {/* ① 훅 — 고통 공감 */}
            <motion.section
              className="py-20"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A84C' }}>당신의 이야기</p>
              <h2
                className="apple-white-gradient font-extrabold leading-[1.15] mb-12"
                style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.04em', wordBreak: 'keep-all' }}
              >
                쓰다 멈춘 그 책,<br />
                <span className="apple-gold-gradient">AI가 대신 끝냅니다.</span>
              </h2>
              <div className="flex flex-col gap-5">
                {PAIN_LIST.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-5"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16,1,0.3,1] }}
                  >
                    <span className="text-[22px] font-extrabold tabular-nums shrink-0" style={{ color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.04em' }}>
                      0{i + 1}
                    </span>
                    <p className="text-white/60 font-medium leading-snug" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', wordBreak: 'keep-all' }}>{p}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 구분선 */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />

            {/* ② 기존 방식 vs 이 시스템 */}
            <motion.section
              className="py-20"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A84C' }}>무엇이 다른가요</p>
              <h2
                className="font-extrabold leading-[1.15] mb-14"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#fff', wordBreak: 'keep-all' }}
              >
                기존 방법으로는<br />끝까지 못 갑니다.
              </h2>

              {/* 두 컬럼 텍스트 비교 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6 text-white/25">기존 방식</p>
                  <div className="flex flex-col gap-6">
                    {OLD_WAY.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-px h-5 shrink-0 mt-1" style={{ background: 'rgba(255,255,255,0.15)' }} />
                        <p className="text-white/35 leading-snug" style={{ fontSize: '15px', wordBreak: 'keep-all' }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#C9A84C' }}>이 시스템</p>
                  <div className="flex flex-col gap-6">
                    {NEW_WAY.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-px h-5 shrink-0 mt-1" style={{ background: '#C9A84C' }} />
                        <p className="text-white/80 font-medium leading-snug" style={{ fontSize: '15px', wordBreak: 'keep-all' }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 구분선 */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />

            {/* ③ 12단계 */}
            <motion.section
              className="py-20"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A84C' }}>실행 시스템</p>
              <h2
                className="font-extrabold leading-[1.15] mb-14"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#fff', wordBreak: 'keep-all' }}
              >
                총 12단계로<br />책 한 권을 완성합니다.
              </h2>
              <div className="flex flex-col gap-0">
                {STEPS_12.map((step, i) => {
                  const [title, desc] = step.split(' — ');
                  return (
                    <motion.div
                      key={i}
                      className="flex items-start gap-6 py-6"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16,1,0.3,1] }}
                    >
                      <span
                        className="font-extrabold tabular-nums shrink-0 leading-none"
                        style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.04em', color: 'rgba(201,168,76,0.35)', minWidth: '2.5rem' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-bold text-white mb-0.5" style={{ fontSize: '16px' }}>{title}</p>
                        {desc && <p className="text-white/40" style={{ fontSize: '13px' }}>{desc}</p>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* 구분선 */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />

            {/* ④ Before / After — 전체폭 타이포그래피 */}
            <motion.section
              className="py-20"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A84C' }}>변화</p>
              <h2
                className="font-extrabold leading-[1.15] mb-14"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#fff', wordBreak: 'keep-all' }}
              >
                달라지는 것들
              </h2>
              <div className="flex flex-col gap-10">
                {BEFORE_AFTER.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16,1,0.3,1] }}
                  >
                    <p className="line-through mb-2 leading-snug" style={{ fontSize: 'clamp(14px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.22)', wordBreak: 'keep-all' }}>
                      {item.before}
                    </p>
                    <p className="font-bold leading-snug" style={{ fontSize: 'clamp(16px, 2vw, 21px)', color: '#fff', wordBreak: 'keep-all' }}>
                      <span style={{ color: '#C9A84C' }}>→ </span>{item.after}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 구분선 */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />

            {/* ⑤ FAQ */}
            <motion.section
              className="py-20"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A84C' }}>자주 묻는 질문</p>
              <h2
                className="font-extrabold leading-[1.15] mb-14"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#fff', wordBreak: 'keep-all' }}
              >
                궁금하신 점들
              </h2>
              <div className="flex flex-col gap-0">
                {FAQ_LIST.map((item, i) => (
                  <motion.div
                    key={i}
                    className="py-8"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16,1,0.3,1] }}
                  >
                    <p className="font-bold mb-3" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#fff', wordBreak: 'keep-all' }}>
                      {item.q}
                    </p>
                    <p className="leading-relaxed" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', wordBreak: 'keep-all' }}>
                      {item.a}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ⑥ 최종 CTA */}
            <motion.section
              className="py-20 text-center relative overflow-hidden rounded-3xl"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.14), transparent), rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.2)' }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A84C' }}>지금 시작하세요</p>
              <h2
                className="font-extrabold leading-[1.1] mb-4"
                style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', letterSpacing: '-0.04em', color: '#fff', wordBreak: 'keep-all' }}
              >
                망설일 필요 없습니다.
              </h2>
              <p className="mb-12" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', wordBreak: 'keep-all' }}>
                지금 실행해보면 바로 차이를 느낄 수 있습니다.
              </p>
              <div className="flex flex-col items-center gap-4">
                <a
                  href="https://forms.gle/kVzNby2ZjNL8bPUR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-extrabold text-black no-underline transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{ backgroundColor: '#C9A84C', fontSize: '16px', letterSpacing: '-0.02em', boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}
                >
                  멤버십 신청하기 →
                </a>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>🛡 30일 성과 보장 · 결과 없으면 전액 환불</p>
              </div>
            </motion.section>

          </div>

        </div>

        {/* 우: 커리큘럼 사이드바 */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.09)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="px-5 py-4 border-b border-white/8">
              <p className="text-white font-extrabold text-[15px] mb-0.5">강의 커리큘럼</p>
              <p className="text-white/30 text-[12px]">총 {COURSE.totalLessons}강의 체계적인 학습 과정</p>
            </div>
            <div className="flex flex-col divide-y divide-white/6">
              {LESSONS.map((ls, i) => {
                const isCurrent   = i === currentLessonIdx;
                const isCompleted = completedLessons.has(ls.id);
                return (
                  <motion.button
                    key={ls.id}
                    onClick={() => !ls.locked && setCurrentLessonIdx(i)}
                    className="flex items-start gap-3 px-4 py-3.5 text-left w-full border-none cursor-pointer transition-all"
                    style={{
                      backgroundColor: isCurrent ? 'rgba(201,168,76,0.08)' : 'transparent',
                      cursor: ls.locked ? 'not-allowed' : 'pointer',
                    }}
                    whileHover={!ls.locked ? { backgroundColor: 'rgba(255,255,255,0.04)' } : {}}
                  >
                    {/* 번호 or 완료 */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-extrabold text-[12px] mt-0.5"
                      style={{
                        backgroundColor: isCompleted ? '#C9A84C' : isCurrent ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.07)',
                        color: isCompleted ? '#000' : isCurrent ? '#C9A84C' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {isCompleted ? <Check size={13} /> : i + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12px] sm:text-[13px] font-semibold leading-snug truncate"
                        style={{ color: isCurrent ? '#C9A84C' : isCompleted ? 'rgba(255,255,255,0.7)' : ls.locked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)' }}
                      >
                        {ls.title}
                      </p>
                      <p className="text-[11px] text-white/25 mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {ls.duration}
                      </p>
                    </div>

                    {ls.locked ? (
                      <Lock size={13} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: 2 }} />
                    ) : isCompleted ? (
                      <CheckCircle2 size={13} style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }} />
                    ) : null}
                  </motion.button>
                );
              })}
            </div>

            {/* 포인트 요약 */}
            <div className="px-5 py-4 border-t border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/30 font-medium">내 포인트</span>
                <span className="font-extrabold text-[14px]" style={{ color: '#C9A84C' }}>{points.toLocaleString()}P</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-white/30 font-medium">예상 FLOWE 코인</span>
                <span className="font-bold text-[13px] text-white/70">{(points / COIN_RATE).toFixed(3)} 🪙</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8 mb-1">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((points % COIN_RATE) / COIN_RATE * 100, 100)}%`, background: 'linear-gradient(90deg, #C9A84C, #D4BA6A)' }} />
              </div>
              <p className="text-[10px] text-white/20 text-center">{COIN_RATE - (points % COIN_RATE)}P 더 모으면 코인 1개</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
