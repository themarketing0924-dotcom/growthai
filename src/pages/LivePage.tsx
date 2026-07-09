/**
 * LivePage — 라이브 캘린더 & 일정
 * 레퍼런스: AI City Builders PDF
 * 구조: 공지 배너 → 인터랙티브 캘린더 → 시즌 레전드 → 유튜브 배너 → 스케줄 리스트 → 안내사항
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Play, ExternalLink, Info, Bell } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── 캘린더 이벤트 ─── */
const CALENDAR_EVENTS = [
  // Season 2 화/목 20:30 (6/23 개강, 4주 8회)
  { date: '2026-06-23', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-06-25', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-06-30', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-07-02', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-07-07', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-07-09', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-07-14', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  { date: '2026-07-16', time: '20:30', title: '시즌 2 · AI 1인 기업 만들기', season: 'S2', type: 'LIVE' },
  // 특강 / Q&A / VVIP
  { date: '2026-07-05', time: '15:00', title: 'AI 유튜브 채널 셋업 특강', season: 'S2', type: 'LIVE' },
  { date: '2026-07-12', time: '15:00', title: '쇼츠 영상 10분 제작 특강', season: 'S2', type: 'LIVE' },
  { date: '2026-07-15', time: '20:00', title: '수강생 Q&A 세션', season: 'S2', type: 'QnA' },
  { date: '2026-07-19', time: '15:00', title: 'N8N 자동화 특강', season: 'S2', type: 'LIVE' },
  { date: '2026-07-26', time: '15:00', title: '글로벌 수익화 특강', season: 'S2', type: 'LIVE' },
  { date: '2026-08-02', time: '15:00', title: 'VVIP 그룹 마스터마인드', season: 'S2', type: 'VVIP' },
  // 시즌 1 (종료)
  { date: '2026-06-21', time: '15:00', title: 'ChatGPT 프롬프트 마스터 특강', season: 'S1', type: 'LIVE' },
  { date: '2026-06-17', time: '15:00', title: '수강생 질의응답', season: 'S1', type: 'QnA' },
  { date: '2026-06-14', time: '15:00', title: 'Midjourney 썸네일 제작 실습', season: 'S1', type: 'LIVE' },
];

/* ─── 상세 스케줄 (리스트용) ─── */
const SCHEDULE = [
  { date: '2026-07-05', day: '토', time: '오후 3:00 – 5:00', title: '[Step 1] AI 유튜브 채널 셋업 라이브', desc: 'ChatGPT로 채널 콘셉트 잡기 + 첫 영상 대본 작성 실전', type: 'LIVE', status: '접수중', spots: 18 },
  { date: '2026-07-07', day: '화', time: '오후 8:30 – 9:30', title: '[S2 #3] 0원으로 AI 1인 기업 만들기', desc: 'AI 수익화 전략 3단계 — 브랜딩부터 자동화 파이프라인 구축까지', type: 'LIVE', status: '접수중', spots: 28 },
  { date: '2026-07-09', day: '목', time: '오후 8:30 – 9:30', title: '[S2 #4] 0원으로 AI 1인 기업 만들기', desc: 'GPT 도구 33종 실전 활용 + 자동화 템플릿 세팅', type: 'LIVE', status: '접수중', spots: 22 },
  { date: '2026-07-12', day: '토', time: '오후 3:00 – 5:00', title: '[Step 2] 쇼츠 영상 10분 제작 특강', desc: 'CapCut AI + ElevenLabs 나레이션 실습 세션', type: 'LIVE', status: '접수중', spots: 24 },
  { date: '2026-07-15', day: '화', time: '오후 8:00 – 9:30', title: '[Q&A] 수강생 질의응답 세션', desc: '주간 질문 모아서 KOI LEE 멘토가 직접 답변하는 오픈 세션', type: 'QnA', status: '접수중', spots: 50 },
  { date: '2026-07-19', day: '토', time: '오후 3:00 – 5:30', title: '[Step 3] N8N 자동화 — 카카오 자동답장', desc: 'N8N 설치부터 카카오 알림톡 연동까지 핸즈온 실습', type: 'LIVE', status: '접수중', spots: 15 },
  { date: '2026-07-26', day: '토', time: '오후 3:00 – 5:00', title: '[Step 4] 글로벌 수익화 — Gumroad & Udemy', desc: '해외 플랫폼 입점 전략과 AI 번역·더빙 실전 적용', type: 'LIVE', status: '마감임박', spots: 3 },
  { date: '2026-08-02', day: '토', time: '오후 3:00 – 6:00', title: '[VVIP] 1:1 그룹 마스터마인드', desc: 'VVIP 멤버 전용 소그룹 전략 세션 (최대 6인)', type: 'VVIP', status: '마감', spots: 0 },
];

const PAST = [
  { title: '[S1] ChatGPT 프롬프트 마스터 특강', date: '2026-06-21', duration: '1시간 52분', season: 'S1' },
  { title: '[S1] 수강생 질의응답', date: '2026-06-17', duration: '1시간 15분', season: 'S1' },
  { title: '[S1] Midjourney 썸네일 제작 실습', date: '2026-06-14', duration: '2시간 10분', season: 'S1' },
  { title: '[S2 #1] 0원으로 AI 1인 기업 만들기', date: '2026-06-23', duration: '1시간 05분', season: 'S2' },
  { title: '[S2 #2] 0원으로 AI 1인 기업 만들기', date: '2026-06-25', duration: '58분', season: 'S2' },
];

/* ─── 시즌 레전드 ─── */
const SEASONS = [
  { id: 'S2', label: '🚀 시즌 2 · AI 1인 기업 만들기', color: '#C9A84C', active: true },
  { id: 'S1', label: '🏛️ 시즌 1 (종료)', color: '#6B7280', active: false },
];

/* ─── 이벤트 타입 컬러 ─── */
const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  LIVE:  { bg: 'rgba(201,168,76,0.28)', text: '#EED98A',   border: 'rgba(201,168,76,0.55)' },
  QnA:   { bg: 'rgba(99,179,237,0.22)', text: '#90CDF4',   border: 'rgba(99,179,237,0.5)' },
  VVIP:  { bg: 'rgba(212,175,55,0.25)', text: '#F6D860',   border: 'rgba(212,175,55,0.55)' },
};

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

/* ─── 인터랙티브 캘린더 ─── */
function LiveCalendar() {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  /* 이달 이벤트 맵 */
  const eventMap = useMemo(() => {
    const map: Record<number, typeof CALENDAR_EVENTS> = {};
    CALENDAR_EVENTS.forEach(ev => {
      const d = new Date(ev.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(ev);
      }
    });
    return map;
  }, [year, month]);

  /* 그리드 셀 계산 */
  const cells = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = Array(firstDow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month]);

  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0); } else setMonth(m => m+1); };
  const goToday   = () => { setYear(today.getFullYear()); setMonth(today.getMonth()); setSelectedDate(null); };

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    return CALENDAR_EVENTS.filter(e => e.date === selectedDate);
  }, [selectedDate]);

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: '#111', borderColor: 'rgba(255,255,255,0.18)' }}>
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        <button onClick={prevMonth} className="w-9 h-9 rounded-xl flex items-center justify-center border text-white/70 hover:text-white transition-all cursor-pointer" style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold text-[18px] tracking-tight">
            {year}년 {MONTH_KO[month]}
          </h3>
          <button
            onClick={goToday}
            className="text-[11px] font-bold px-3 py-1 rounded-full border text-white/70 hover:text-white transition-all cursor-pointer"
            style={{ borderColor: 'rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            오늘
          </button>
        </div>
        <button onClick={nextMonth} className="w-9 h-9 rounded-xl flex items-center justify-center border text-white/70 hover:text-white transition-all cursor-pointer" style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
        {DAY_LABELS.map((d, i) => (
          <div key={d} className={`py-2.5 text-center text-[12px] font-bold ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-white/70'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) return (
            <div key={idx} className="min-h-[80px]" style={{ borderRight: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)' }} />
          );
          const evs = eventMap[day] || [];
          const todayCell = isToday(day);
          const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const isSelected = selectedDate === dateStr;
          const isSun = idx % 7 === 0;
          const isSat = idx % 7 === 6;

          return (
            <div
              key={idx}
              onClick={() => evs.length > 0 && setSelectedDate(isSelected ? null : dateStr)}
              className={`min-h-[80px] sm:min-h-[96px] p-1.5 sm:p-2 transition-all ${evs.length > 0 ? 'cursor-pointer' : ''}`}
              style={{
                borderRight: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: isSelected ? 'rgba(201,168,76,0.08)' : evs.length > 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                gridColumn: (idx % 7) + 1,
              }}
            >
              {/* 날짜 숫자 */}
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[12px] sm:text-[13px] font-bold mb-1 mx-auto`}
                style={
                  todayCell
                    ? { backgroundColor: '#C9A84C', color: '#000' }
                    : isSun
                    ? { color: '#FC8181' }
                    : isSat
                    ? { color: '#90CDF4' }
                    : { color: 'rgba(255,255,255,0.85)' }
                }
              >
                {day}
              </div>

              {/* 이벤트 카드 */}
              <div className="flex flex-col gap-0.5">
                {evs.slice(0, 2).map((ev, ei) => {
                  const tc = TYPE_COLORS[ev.type] ?? TYPE_COLORS.LIVE;
                  const isS1 = ev.season === 'S1';
                  return (
                    <div
                      key={ei}
                      className="rounded px-1 py-0.5 text-[9px] sm:text-[10px] font-semibold leading-tight overflow-hidden"
                      style={{
                        backgroundColor: isS1 ? 'rgba(107,114,128,0.3)' : tc.bg,
                        color: isS1 ? '#D1D5DB' : tc.text,
                        border: `1px solid ${isS1 ? 'rgba(107,114,128,0.5)' : tc.border}`,
                      }}
                    >
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <span className="hidden sm:inline">{ev.season === 'S2' ? '🚀' : '📼'}</span>
                        <span className="truncate hidden sm:block">{ev.title.slice(0, 10)}…</span>
                        <span className="truncate sm:hidden">{ev.season === 'S2' ? '🚀' : '📼'}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-0.5 opacity-80">
                        <Clock size={8} />
                        <span>{ev.time}</span>
                      </div>
                    </div>
                  );
                })}
                {evs.length > 2 && (
                  <div className="text-[9px] text-white/60 text-center">+{evs.length - 2}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 선택된 날 상세 */}
      <AnimatePresence>
        {selectedDate && selectedEvents.length > 0 && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-4 flex flex-col gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <p className="text-white/40 text-[11px] tracking-[0.15em] uppercase mb-1">
              {selectedDate.replace(/-/g, '.')} 일정
            </p>
            {selectedEvents.map((ev, i) => {
              const tc = TYPE_COLORS[ev.type] ?? TYPE_COLORS.LIVE;
              const isS1 = ev.season === 'S1';
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-[24px]">{ev.season === 'S2' ? '🚀' : '📼'}</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-[13px]">{ev.title}</p>
                    <p className="flex items-center gap-1 text-white/40 text-[11px] mt-0.5">
                      <Clock size={10} /> {ev.time}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: isS1 ? 'rgba(107,114,128,0.2)' : tc.bg, color: isS1 ? '#9CA3AF' : tc.text }}>
                    {isS1 ? '종료' : ev.type}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── 메인 ─── */
export default function LivePage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [activeSeason, setActiveSeason] = useState<string | null>(null);

  const filteredSchedule = activeSeason
    ? SCHEDULE.filter(s => {
        const ev = CALENDAR_EVENTS.find(e => e.date === s.date);
        return ev?.season === activeSeason;
      })
    : SCHEDULE;

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title="라이브 일정 | GrowthAI"
        description="라이브 특강, 수강생 Q&A, 시즌별 일정과 지난 강의를 한 번에 확인하는 공개 일정 페이지입니다."
        canonical="/live"
        image={DEFAULT_OG_IMAGE}
        keywords={['라이브 일정', 'Q&A', '특강', 'GrowthAI']}
      />

      {/* ══ 공지 배너 ══ */}
      <motion.section
        className="pt-24 pb-0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      >
        <div style={{ background: 'linear-gradient(135deg, #0d0b00 0%, #1a1400 50%, #0d0b00 100%)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="max-w-4xl mx-auto px-6 py-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bell size={16} style={{ color: '#C9A84C' }} />
              <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase" style={{ color: '#C9A84C' }}>
                라이브 오픈 공지
              </p>
            </div>
            <h2
              className="font-extrabold text-[20px] sm:text-[26px] leading-snug mb-3"
              style={{ color: '#ffffff', letterSpacing: '-0.02em', wordBreak: 'keep-all' }}
            >
              🚀{' '}
              <span
                className="font-extrabold"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #EED98A 0%, #C9A84C 50%, #EED98A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                GrowthAI 라이브 클래스
              </span>
              {' '}일정 업데이트 예정입니다
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px' }}>
              새로운 시즌 일정은 곧 공개됩니다. 유튜브 채널을 구독하고 알림을 받아보세요.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* ══ 캘린더 섹션 ══ */}
        <motion.section
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center mb-6">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: '#C9A84C', opacity: 0.8 }}>CALENDAR</p>
            <h2 className="font-extrabold text-[24px] sm:text-[30px] tracking-tight mb-1.5" style={{ color: '#ffffff' }}>
              📅 라이브 캘린더
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>
              시즌 2: 매주 화 · 목 저녁 8시 30분 라이브 (6/23 개강)
            </p>
          </div>

          <LiveCalendar />

          {/* 시즌 레전드 */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-5">
            {SEASONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSeason(activeSeason === s.id ? null : s.id)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all cursor-pointer"
                style={
                  activeSeason === s.id
                    ? { backgroundColor: `${s.color}20`, borderColor: `${s.color}60`, color: s.color }
                    : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }
                }
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                {s.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] text-white/30 border border-white/8">
              <span className="w-2 h-2 rounded-full bg-blue-400/60 flex-shrink-0" />
              Q&amp;A 세션
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] text-white/30 border border-white/8">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37' }} />
              VVIP 전용
            </div>
          </div>
        </motion.section>

        {/* ══ 유튜브 배너 ══ */}
        <motion.section
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div
            className="rounded-2xl p-8 text-center flex flex-col items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1200 50%, #0d0d0d 100%)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <Play size={26} style={{ color: '#C9A84C' }} fill="#C9A84C" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-[20px] sm:text-[24px] mb-2">
                무료 라이브는 유튜브에서!
              </h3>
              <p className="text-white/45 text-[14px]">구독하고 라이브 알림을 받아보세요</p>
            </div>
            <a
              href="https://www.youtube.com/@aiflowe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[15px] transition-all hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
            >
              <Play size={16} fill="currentColor" />
              유튜브 채널 바로가기
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.section>

        {/* ══ 스케줄 리스트 탭 ══ */}
        <motion.section
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex gap-2 mb-6">
            {(['upcoming', 'past'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border cursor-pointer"
                style={
                  tab === t
                    ? { backgroundColor: '#C9A84C', color: '#0a0a0a', borderColor: '#C9A84C' }
                    : { backgroundColor: 'transparent', color: 'rgba(255,255,255,0.45)', borderColor: 'rgba(255,255,255,0.12)' }
                }
              >
                {t === 'upcoming' ? '📅 예정된 라이브' : '🎥 지난 녹화'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'upcoming' ? (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                {filteredSchedule.map((item, i) => {
                  const tc = TYPE_COLORS[item.type] ?? TYPE_COLORS.LIVE;
                  return (
                    <motion.div
                      key={i}
                      className="border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all"
                      style={{
                        borderColor: item.status === '마감' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.09)',
                        backgroundColor: item.status === '마감' ? 'rgba(255,255,255,0.005)' : 'rgba(255,255,255,0.02)',
                        opacity: item.status === '마감' ? 0.45 : 1,
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: item.status === '마감' ? 0.45 : 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={item.status !== '마감' ? { borderColor: 'rgba(201,168,76,0.25)' } : {}}
                    >
                      {/* 날짜 블록 */}
                      <div className="shrink-0 w-16 text-center rounded-xl py-2.5 border border-white/8 bg-white/[0.03]">
                        <div className="text-white text-[22px] font-extrabold leading-none">{item.date.slice(8)}</div>
                        <div className="text-white/35 text-[10px] mt-0.5">{item.date.slice(5,7)}월 {item.day}</div>
                      </div>

                      {/* 정보 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full border"
                            style={{ backgroundColor: tc.bg, color: tc.text, borderColor: tc.border }}>
                            {item.type}
                          </span>
                          <span className="text-white/30 text-[12px] flex items-center gap-1">
                            <Clock size={10} /> {item.time}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-[15px] mb-1">{item.title}</h3>
                        <p className="text-white/45 text-[12px] leading-relaxed">{item.desc}</p>
                      </div>

                      {/* 상태 & CTA */}
                      <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end gap-3">
                        <span className={`text-[12px] font-bold ${
                          item.status === '마감임박' ? 'text-red-400' :
                          item.status === '마감' ? 'text-white/20' : 'text-green-400'
                        }`}>
                          {item.status}
                          {item.spots > 0 && item.spots <= 10 && (
                            <span className="text-white/30 text-[10px] ml-1.5">잔여 {item.spots}석</span>
                          )}
                        </span>
                        <button
                          disabled={item.status === '마감'}
                          className="px-5 py-2 rounded-xl text-[13px] font-bold transition-all border-none cursor-pointer"
                          style={
                            item.status === '마감'
                              ? { backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed' }
                              : { backgroundColor: '#C9A84C', color: '#0a0a0a' }
                          }
                        >
                          {item.status === '마감' ? '마감' : '신청하기'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                {PAST.map((rec, i) => (
                  <motion.div
                    key={i}
                    className="border border-white/9 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-all hover:border-white/18"
                    style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] shrink-0"
                        style={{ backgroundColor: rec.season === 'S2' ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.06)' }}>
                        {rec.season === 'S2' ? '🚀' : '🎥'}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-[14px]">{rec.title}</p>
                        <p className="text-white/35 text-[11px] mt-0.5 flex items-center gap-1.5">
                          {rec.date} · <Clock size={10} /> {rec.duration}
                        </p>
                      </div>
                    </div>
                    <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold border border-white/10 text-white/50 hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent">
                      <Play size={11} />
                      시청하기
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ══ 안내사항 ══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="rounded-2xl p-6 border border-white/8" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Info size={16} style={{ color: '#C9A84C' }} />
              <h3 className="text-white font-bold text-[16px]">📌 안내사항</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                <span>시즌 2 라이브는 <span className="text-white/80 font-semibold">6월 23일(화)부터 매주 화 · 목 저녁 8시 30분</span>에 1시간씩 진행됩니다 (4주, 총 8회)</span>,
                '시즌 2 라이브는 시즌 2 수강생만 참여 가능합니다 (세부 커리큘럼은 추후 공지)',
                '시즌 1 라이브는 종료되었으며, 수강생은 각 라이브 페이지에서 VOD 다시보기를 이용하실 수 있습니다',
                '캘린더의 이벤트를 클릭하면 해당 라이브 상세 정보를 확인할 수 있습니다',
                '무료 라이브는 유튜브 채널에서 누구나 시청 가능합니다',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/50 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#C9A84C' }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
