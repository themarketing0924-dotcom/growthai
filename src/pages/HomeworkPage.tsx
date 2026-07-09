/**
 * HomeworkPage — 강의 1교시 과제 페이지
 * BasicsPage(강의 교재) 동일 스타일 적용
 * 로그인 후 접근 가능
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Clock, Lock, Upload,
  Link2, FileText, ChevronDown, BookOpen, ExternalLink,
  AlertCircle, Send,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── 과제 데이터 ─── */
interface Task {
  id: string;
  step: string;
  title: string;
  desc: string;
  type: 'link' | 'text' | 'file' | 'screenshot';
  required: boolean;
  example?: string;
  hint?: string;
}

interface Assignment {
  id: string;
  ep: string;
  week: string;
  title: string;
  subtitle: string;
  deadline: string;
  goal: string;
  tasks: Task[];
}

const ASSIGNMENTS: Assignment[] = [
  {
    id: 'hw1',
    ep: 'EP 01',
    week: '1교시',
    title: '케이스스터디 분석 & 내 AI 기업 설계',
    subtitle: '직원 0명, 월 $420K — 이 구조를 내 비즈니스에 적용하기',
    deadline: '2026-07-08',
    goal: '강의에서 배운 AI 1인 기업 케이스를 분석하고, 내가 만들 AI 기업의 수익 모델과 첫 번째 제품을 설계합니다.',
    tasks: [
      {
        id: 't1',
        step: '과제 1',
        title: '내 AI 1인 기업 수익 모델 선택',
        desc: '강의에서 소개한 4가지 수익 모델(SaaS 구독 / 광고 / 콘텐츠 라이선싱 / 엑싯) 중 본인에게 맞는 모델 1가지를 선택하고, 선택 이유를 설명하세요.',
        type: 'text',
        required: true,
        example: '예시: "SaaS 구독 모델을 선택했습니다. 이유는 반복 수익이 발생하고, AI 도구를 활용한 자동화가 가능하기 때문입니다..."',
        hint: '정답은 없습니다. 본인의 상황(자본, 시간, 기술)에 맞는 모델을 골라보세요.',
      },
      {
        id: 't2',
        step: '과제 2',
        title: '타겟 고객 & 첫 번째 제품 설계',
        desc: '내가 만들 AI 기업의 타겟 고객(누구에게 팔 것인가)과 첫 번째 제품/서비스 아이디어를 구체적으로 작성하세요. 가능하면 ChatGPT를 활용해 아이디어를 발전시켜 보세요.',
        type: 'text',
        required: true,
        example: '예시: "타겟 고객: 소자본 1인 창업자 / 첫 번째 제품: AI 블로그 자동 생성 SaaS — 월 $29 구독, Vercel + Claude API 활용"',
        hint: 'ChatGPT에게 "AI 1인 기업 아이디어 발전시켜줘" 라고 요청해보세요.',
      },
      {
        id: 't3',
        step: '과제 3',
        title: '17일 첫 수익 플랜 작성',
        desc: '강의에서 소개한 "평균 17일 첫 수익" 구조를 참고해, 본인만의 17일 실행 계획을 Day별로 작성하세요. (Day 1~17 타임라인)',
        type: 'text',
        required: true,
        example: 'Day 1: 수익 모델 확정\nDay 2-3: 타겟 고객 인터뷰 3명\nDay 4-7: MVP 사이트 제작...',
        hint: '완벽하지 않아도 됩니다. 행동 가능한 계획이 핵심입니다.',
      },
      {
        id: 't4',
        step: '보너스',
        title: '[선택] ChatGPT 대화 스크린샷 제출',
        desc: '과제 1~3 작성 시 ChatGPT와 나눈 대화 스크린샷을 첨부하면 멘토 피드백이 더 구체적으로 제공됩니다.',
        type: 'file',
        required: false,
        hint: 'PNG, JPG 파일 (최대 5MB)',
      },
    ],
  },
  {
    id: 'hw2',
    ep: 'EP 02',
    week: '2교시',
    title: 'Vercel 배포 + Firebase 연동 완성',
    subtitle: '내 AI 사이트를 세상에 공개하고, 데이터를 저장하는 시스템 구축',
    deadline: '2026-07-15',
    goal: 'Claude Code로 만든 사이트를 실제로 배포하고, Firebase Firestore를 연동해 데이터가 저장되는 것을 확인합니다.',
    tasks: [
      {
        id: 't5',
        step: '과제 1',
        title: 'Vercel 배포 완료 + 사이트 URL 제출',
        desc: '내 AI 사이트를 Vercel에 배포하고, 실제 접속 가능한 URL을 제출하세요. 커스텀 도메인 연결 시 추가 점수.',
        type: 'link',
        required: true,
        example: '예시: https://my-ai-site.vercel.app',
        hint: 'vercel.com에서 무료로 배포 가능합니다.',
      },
      {
        id: 't6',
        step: '과제 2',
        title: 'Firebase Firestore 연동 스크린샷',
        desc: 'Firebase 콘솔에서 데이터가 실제로 저장되는 Firestore 스크린샷을 제출하세요.',
        type: 'file',
        required: true,
        hint: 'Firebase Console → Firestore Database 화면 캡처',
      },
    ],
  },
];

/* ─── 제출 폼 상태 ─── */
interface SubmitState {
  [taskId: string]: string;
}

/* ─── 개별 과제 블록 ─── */
function TaskBlock({ task, value, onChange }: { task: Task; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(true);
  const filled = value.trim().length > 0;

  return (
    <div className={`rounded-2xl border transition-all mb-4 ${filled ? 'border-[rgba(201,168,76,0.3)]' : 'border-white/10'}`}>
      {/* 헤더 */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 cursor-pointer border-none bg-transparent text-left"
      >
        <div className="flex items-center gap-3">
          {filled ? (
            <CheckCircle2 size={18} style={{ color: '#C9A84C' }} className="shrink-0" />
          ) : (
            <Circle size={18} className="text-white/20 shrink-0" />
          )}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest mr-2" style={{ color: '#C9A84C', opacity: task.required ? 1 : 0.5 }}>
              {task.step}{!task.required && ' (선택)'}
            </span>
            <p className="text-white font-semibold text-[15px] leading-snug mt-0.5">{task.title}</p>
          </div>
        </div>
        <ChevronDown size={14} className={`text-white/30 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              {/* 과제 설명 */}
              <p className="text-white/55 text-[13px] leading-relaxed mb-4">{task.desc}</p>

              {/* 힌트 */}
              {task.hint && (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl mb-4 bg-white/[0.03] border border-white/8">
                  <AlertCircle size={13} className="text-white/25 shrink-0 mt-0.5" />
                  <p className="text-white/35 text-[12px]">{task.hint}</p>
                </div>
              )}

              {/* 예시 */}
              {task.example && (
                <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2">예시</p>
                  <pre className="text-white/40 text-[12px] leading-relaxed whitespace-pre-wrap font-mono">{task.example}</pre>
                </div>
              )}

              {/* 입력 필드 */}
              {task.type === 'text' && (
                <textarea
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  placeholder="여기에 작성하세요..."
                  rows={5}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] text-white/80 text-[13px] px-4 py-3 resize-none focus:outline-none focus:border-[rgba(201,168,76,0.4)] placeholder-white/20 transition-colors"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                />
              )}
              {task.type === 'link' && (
                <div className="relative">
                  <Link2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="url"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/12 bg-white/[0.03] text-white/80 text-[13px] pl-9 pr-4 py-3 focus:outline-none focus:border-[rgba(201,168,76,0.4)] placeholder-white/20 transition-colors"
                  />
                </div>
              )}
              {(task.type === 'file' || task.type === 'screenshot') && (
                <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed border-white/15 cursor-pointer hover:border-[rgba(201,168,76,0.3)] transition-colors bg-white/[0.02]">
                  <Upload size={20} className="text-white/25" />
                  <p className="text-[12px] text-white/35">{value ? `✅ ${value}` : '파일을 드래그하거나 클릭해서 업로드'}</p>
                  <p className="text-[10px] text-white/20">PNG, JPG, PDF (최대 5MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={e => onChange(e.target.files?.[0]?.name || '')}
                  />
                </label>
              )}

              {filled && (
                <p className="flex items-center gap-1.5 text-[11px] mt-2" style={{ color: '#C9A84C' }}>
                  <CheckCircle2 size={11} /> 작성 완료
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── 메인 컴포넌트 ─── */
export default function HomeworkPage({ lang: _lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeHw, setActiveHw] = useState('hw1');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<SubmitState>({});

  /* 로그인 필요 */
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div className="text-center max-w-sm" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
            <Lock size={28} style={{ color: '#C9A84C' }} />
          </div>
          <h2 className="text-white font-extrabold text-[22px] tracking-tight mb-3">과제 제출</h2>
          <p className="text-white/45 text-[14px] leading-relaxed mb-8">
            과제를 확인하려면 로그인이 필요합니다.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 rounded-xl text-[14px] font-bold cursor-pointer border-none"
            style={{ backgroundColor: '#C9A84C', color: '#000' }}
          >
            로그인 / 회원가입
          </button>
        </motion.div>
      </div>
    );
  }

  const hw = ASSIGNMENTS.find(a => a.id === activeHw)!;
  const requiredTasks = hw.tasks.filter(t => t.required);
  const completedRequired = requiredTasks.filter(t => (answers[t.id] || '').trim().length > 0).length;
  const allDone = completedRequired === requiredTasks.length;

  const handleSubmit = async () => {
    if (!allDone) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  /* 제출 완료 화면 */
  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div className="text-center max-w-sm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.3)' }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle2 size={36} style={{ color: '#C9A84C' }} />
          </motion.div>
          <h2 className="text-white font-extrabold text-[24px] tracking-tight mb-3">과제 제출 완료!</h2>
          <p className="text-white/45 text-[14px] leading-relaxed mb-2">
            {hw.week} 과제가 성공적으로 제출되었습니다.
          </p>
          <p className="text-white/30 text-[12px] mb-8">멘토 피드백은 48시간 이내 제공됩니다.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/basics')}
              className="w-full py-3.5 rounded-xl text-[14px] font-bold cursor-pointer border-none"
              style={{ backgroundColor: '#C9A84C', color: '#000' }}
            >
              📖 강의 교재 계속 보기
            </button>
            <button
              onClick={() => navigate('/live')}
              className="w-full py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer border border-white/15 bg-transparent text-white/60 hover:bg-white/5 transition-all"
            >
              📅 라이브 강의 일정 확인
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Seo
        title="강의 과제 | GrowthAI"
        description="강의 수강 후 제출하는 과제와 실습 미션을 정리한 페이지입니다."
        canonical="/homework"
        image={DEFAULT_OG_IMAGE}
        keywords={['강의 과제', '실습', 'GrowthAI']}
        noindex
      />

      {/* ── 서브 헤더 ── */}
      <div className="fixed top-16 left-0 right-0 z-30 border-b border-white/8" style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={14} style={{ color: '#C9A84C' }} />
            <span className="text-[12px] font-bold" style={{ color: '#C9A84C' }}>GrowthAI</span>
            <span className="text-white/20 text-[12px]">·</span>
            <span className="text-white/50 text-[12px]">과제 제출</span>
          </div>
          <button
            onClick={() => navigate('/basics')}
            className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/60 cursor-pointer bg-transparent border-none transition-colors"
          >
            <BookOpen size={11} />
            강의 교재 보기
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* ── 교시 탭 ── */}
        <div className="flex gap-2 mb-8">
          {ASSIGNMENTS.map(a => (
            <button
              key={a.id}
              onClick={() => { setActiveHw(a.id); setAnswers({}); setSubmitted(false); }}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer border ${
                activeHw === a.id
                  ? 'border-[rgba(201,168,76,0.35)] text-[#C9A84C]'
                  : 'border-white/10 text-white/35 hover:border-white/20 hover:text-white/55'
              }`}
              style={activeHw === a.id ? { backgroundColor: 'rgba(201,168,76,0.08)' } : {}}
            >
              {a.week} 과제
            </button>
          ))}
        </div>

        {/* ── 과제 헤더 ── */}
        <motion.div
          key={activeHw}
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#C9A84C', opacity: 0.8 }}>
                {hw.ep} · {hw.week} 과제
              </p>
              <h1 className="text-white font-extrabold tracking-tight leading-tight mb-2" style={{ fontSize: 'clamp(20px, 4vw, 30px)' }}>
                {hw.title}
              </h1>
              <p className="text-white/45 text-[13px]">{hw.subtitle}</p>
            </div>
            {/* 마감일 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] shrink-0">
              <Clock size={13} className="text-white/30" />
              <div>
                <p className="text-[9px] text-white/25 uppercase tracking-wider">마감일</p>
                <p className="text-[12px] font-semibold text-white/60">{hw.deadline}</p>
              </div>
            </div>
          </div>

          {/* 목표 설명 */}
          <div className="mt-5 p-4 rounded-xl border border-white/8 bg-white/[0.02]">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/25 mb-2">이 과제의 목표</p>
            <p className="text-[13px] text-white/55 leading-relaxed">{hw.goal}</p>
          </div>

          {/* 진도 표시 */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] text-white/30">필수 과제 완료 ({completedRequired}/{requiredTasks.length})</p>
              <p className="text-[11px] font-semibold" style={{ color: allDone ? '#C9A84C' : 'rgba(255,255,255,0.25)' }}>
                {allDone ? '제출 가능 ✓' : '작성 중...'}
              </p>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#C9A84C' }}
                initial={{ width: 0 }}
                animate={{ width: `${(completedRequired / requiredTasks.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <div className="h-px mt-6 bg-white/8" />
        </motion.div>

        {/* ── 과제 블록들 ── */}
        <div>
          {hw.tasks.map(task => (
            <TaskBlock
              key={task.id}
              task={task}
              value={answers[task.id] || ''}
              onChange={v => setAnswers(prev => ({ ...prev, [task.id]: v }))}
            />
          ))}
        </div>

        {/* ── 제출 버튼 ── */}
        <div className="mt-8 sticky bottom-6">
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: allDone ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[13px] font-semibold text-white/70">
                  {allDone ? '모든 필수 과제가 완료됐습니다 🎉' : `필수 과제 ${requiredTasks.length - completedRequired}개 남았습니다`}
                </p>
                <p className="text-[11px] text-white/30 mt-0.5">멘토 피드백은 48시간 이내 제공됩니다</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!allDone || submitting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold cursor-pointer border-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: allDone ? '#C9A84C' : 'rgba(255,255,255,0.08)', color: allDone ? '#000' : 'rgba(255,255,255,0.25)' }}
              >
                {submitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                      ⏳
                    </motion.div>
                    제출 중...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    과제 제출하기
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── 하단 안내 ── */}
        <div className="mt-12 pt-8 border-t border-white/8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all no-underline"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                <ExternalLink size={14} style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white/70">강의 다시 보기</p>
                <p className="text-[11px] text-white/30">YouTube 강의 영상</p>
              </div>
            </a>
            <button
              onClick={() => navigate('/community')}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                <FileText size={14} style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white/70">수강생 커뮤니티</p>
                <p className="text-[11px] text-white/30">질문 & 피드백 공간</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
