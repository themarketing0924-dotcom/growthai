/**
 * CourseAIPage — 유료 강의 대시보드
 * /course/ai — 로그인 + 구독 확인 후 전체 강의·프롬프트 열람
 * aicitybuilders.com/ai-coding-course 구조 벤치마킹
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, ChevronDown, CheckCircle2, Lock, Clock,
  ExternalLink, Menu, X, BookOpen, Bookmark,
  Copy, Check, Tag, LogIn, CreditCard,
  Zap, ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CURRICULUM, type Episode, type Lesson } from './BasicsPage';
import { TOOL_CATEGORIES, type PromptTool } from './PromptsPage';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── VideoCard ─── */
function VideoCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 mb-5">
      <div className="flex h-[160px] sm:h-[200px] bg-[#0d0d0d]">
        <div className="flex-1 p-4 border-r border-white/8 flex items-center">
          <pre className="text-[11px] sm:text-[12px] font-mono text-green-400/80 leading-relaxed whitespace-pre-wrap break-all">
            {lesson.thumbCode || '// AI FLOWE\n// 실습 코드'}
          </pre>
        </div>
        <div className="w-[45%] relative flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border-2 border-white/20" style={{ background: 'rgba(201,168,76,0.25)' }}>
            <Play size={20} fill="#C9A84C" className="text-[#C9A84C] ml-0.5" />
          </div>
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-black text-[11px] font-extrabold" style={{ backgroundColor: '#C9A84C' }}>AI</div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02]">
        <span className="text-white/30 text-[11px]">강의 영상</span>
        <a href={lesson.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[12px] font-semibold hover:opacity-80" style={{ color: '#C9A84C' }}>
          YouTube에서 보기 <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

/* ─── 사이드바 에피소드 항목 ─── */
function SidebarEpItem({
  ep, activeEp, activeLesson, onSelectLesson,
}: {
  ep: Episode; activeEp: string; activeLesson: string;
  onSelectLesson: (epId: string, lessonId: string) => void;
}) {
  const [open, setOpen] = useState(ep.id === activeEp);
  return (
    <div>
      <button
        onClick={() => ep.unlocked && setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border-none bg-transparent ${
          ep.id === activeEp ? 'bg-white/6' : 'hover:bg-white/4'
        } ${!ep.unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2.5">
          {ep.unlocked
            ? <span className="text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-md" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>{ep.epNum}</span>
            : <Lock size={12} className="text-white/30 shrink-0" />
          }
          <div>
            <p className="text-[12px] font-semibold text-white/80 leading-tight">{ep.title}</p>
            <p className="text-[10px] text-white/30 mt-0.5 flex items-center gap-1"><Clock size={9} />{ep.duration}</p>
          </div>
        </div>
        {ep.unlocked && <ChevronDown size={13} className={`text-white/30 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />}
      </button>
      <AnimatePresence initial={false}>
        {open && ep.unlocked && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pl-4 pr-1 pb-1">
              {ep.lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(ep.id, lesson.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer border-none text-[11.5px] ${
                    activeLesson === lesson.id ? 'bg-white/10 text-white font-semibold' : 'bg-transparent text-white/45 hover:text-white/70 hover:bg-white/4'
                  }`}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={activeLesson === lesson.id ? { backgroundColor: '#C9A84C', color: '#000' } : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                    {lesson.step.split('-')[1]}
                  </span>
                  <span className="leading-tight">{lesson.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── 복사 버튼 ─── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer border-none transition-all"
      style={{ backgroundColor: copied ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#C9A84C' : 'rgba(255,255,255,0.45)' }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? '복사됨!' : '복사'}
    </button>
  );
}

/* ─── 게이트: 로그인 필요 ─── */
function LoginGate() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.3)' }}>
          <Lock size={28} style={{ color: '#C9A84C' }} />
        </div>
        <h2 className="text-[26px] font-extrabold tracking-tight mb-2">로그인이 필요합니다</h2>
        <p className="text-white/45 text-[14px] mb-8 leading-relaxed">
          AI 마스터 클래스 강의 대시보드는<br />
          회원 전용 콘텐츠입니다.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-[14px] font-bold cursor-pointer border-none transition-all"
            style={{ backgroundColor: '#C9A84C', color: '#000' }}
          >
            <LogIn size={16} />
            Google 로그인
          </button>
          <button
            onClick={() => navigate('/enroll')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[14px] font-semibold cursor-pointer border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-all"
          >
            수강 신청 페이지 보기
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── 게이트: 구독 필요 ─── */
function PurchaseGate() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)', border: '1.5px solid rgba(201,168,76,0.3)' }}>
          <CreditCard size={28} style={{ color: '#C9A84C' }} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold mb-4 border" style={{ color: '#C9A84C', borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.07)' }}>
          <Zap size={9} />
          프리미엄 강의
        </div>
        <h2 className="text-[26px] font-extrabold tracking-tight mb-2">강의를 아직 구매하지 않으셨어요</h2>
        <p className="text-white/45 text-[14px] mb-4 leading-relaxed">
          AI 마스터 클래스 전체 강의 + 프롬프트 33개 +<br />
          멘토링 커뮤니티까지 모두 포함됩니다.
        </p>
        <div className="rounded-2xl border p-5 mb-6 text-left space-y-2" style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.04)' }}>
          {['강의 전 에피소드 무제한 시청', 'AI 프롬프트 도구 33종 전체', '라이브 멘토링 참여권', '과제 제출 + 피드백', '커뮤니티 전용 채널'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 size={14} style={{ color: '#C9A84C' }} className="shrink-0" />
              <span className="text-white/65 text-[13px]">{item}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/enroll')}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[14px] font-extrabold cursor-pointer border-none transition-all hover:scale-105"
          style={{ backgroundColor: '#C9A84C', color: '#000' }}
        >
          지금 수강 신청하기
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  );
}

/* ─── 메인 대시보드 ─── */
type Tab = 'curriculum' | 'prompts';

export default function CourseAIPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [activeEp, setActiveEp] = useState('ep1');
  const [activeLesson, setActiveLesson] = useState('1-1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<Tab>('curriculum');
  const [activeTool, setActiveTool] = useState<PromptTool | null>(null);
  const [openPromptCat, setOpenPromptCat] = useState<string | null>('ebook');

  /* ── 접근 제어 ── */
  if (!user) return <LoginGate />;
  const hasAccess = profile?.subscription?.status === 'active';
  if (!hasAccess) return <PurchaseGate />;

  const currentEp = CURRICULUM.find(e => e.id === activeEp)!;
  const handleSelectLesson = (epId: string, lessonId: string) => {
    setActiveEp(epId);
    setActiveLesson(lessonId);
    setActiveTool(null);
    setSidebarTab('curriculum');
    setSidebarOpen(false);
    setTimeout(() => {
      document.getElementById(`lesson-${lessonId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Seo
        title="유료 강의 대시보드 | GrowthAI"
        description="로그인과 구독 확인 후 열람되는 유료 강의와 프롬프트 대시보드입니다."
        canonical="/course/ai"
        image={DEFAULT_OG_IMAGE}
        keywords={['유료 강의', '대시보드', 'GrowthAI']}
        noindex
      />

      {/* ── 상단 헤더 ── */}
      <div className="fixed top-16 left-0 right-0 z-30 border-b border-white/8" style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border-none cursor-pointer bg-white/8 text-white/60">
              <Menu size={15} />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen size={14} style={{ color: '#C9A84C' }} />
              <span className="text-[12px] font-bold tracking-tight" style={{ color: '#C9A84C' }}>AI FLOWE</span>
              <span className="text-white/20 text-[12px]">·</span>
              <span className="text-white/50 text-[12px]">
                {sidebarTab === 'curriculum' ? `${currentEp.epNum} — ${currentEp.title}` : 'AI 프롬프트 도구'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/homework')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all hover:opacity-80" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>
              <Bookmark size={11} />
              과제 제출
            </button>
          </div>
        </div>
      </div>

      {/* ── 본문 레이아웃 ── */}
      <div className="max-w-7xl mx-auto pt-28 pb-20 flex relative">

        {/* 모바일 백드롭 */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} />
          )}
        </AnimatePresence>

        {/* ── 사이드바 ── */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-28 left-0 h-screen lg:h-[calc(100vh-112px)] w-[260px] z-50 lg:z-auto shrink-0 border-r border-white/8 overflow-y-auto transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          style={{ backgroundColor: '#050505' }}
        >
          {/* 탭 */}
          <div className="flex border-b border-white/8">
            {[
              { key: 'curriculum', label: '강의', icon: <BookOpen size={11} /> },
              { key: 'prompts', label: '프롬프트', icon: <Zap size={11} /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSidebarTab(tab.key as Tab)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[11.5px] font-semibold border-none cursor-pointer transition-all"
                style={sidebarTab === tab.key
                  ? { color: '#C9A84C', backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '2px solid #C9A84C' }
                  : { color: 'rgba(255,255,255,0.35)', backgroundColor: 'transparent' }}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-10 flex items-center justify-center border-none bg-transparent text-white/30 cursor-pointer">
              <X size={13} />
            </button>
          </div>

          {/* 커리큘럼 탭 */}
          {sidebarTab === 'curriculum' && (
            <>
              <nav className="p-2">
                {CURRICULUM.map(ep => (
                  <SidebarEpItem key={ep.id} ep={ep} activeEp={activeEp} activeLesson={activeLesson} onSelectLesson={handleSelectLesson} />
                ))}
              </nav>
              <div className="p-4 mx-2 mb-2 rounded-2xl border border-white/8 bg-white/[0.02]">
                <p className="text-[10.5px] text-white/30 mb-2">수강 진도</p>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '35%', backgroundColor: '#C9A84C' }} />
                </div>
                <p className="text-[10.5px] text-white/40 mt-1.5">EP 1–2 완료 중</p>
              </div>
            </>
          )}

          {/* 프롬프트 탭 */}
          {sidebarTab === 'prompts' && (
            <nav className="p-2">
              {TOOL_CATEGORIES.map(cat => (
                <div key={cat.id}>
                  <button
                    onClick={() => setOpenPromptCat(openPromptCat === cat.id ? null : cat.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left cursor-pointer border-none bg-transparent hover:bg-white/4 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">{cat.emoji}</span>
                      <div>
                        <p className="text-[12px] font-semibold text-white/80">{cat.label}</p>
                        <p className="text-[10px] text-white/30">{cat.tools.length}개</p>
                      </div>
                    </div>
                    <ChevronDown size={12} className={`text-white/30 transition-transform ${openPromptCat === cat.id ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openPromptCat === cat.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="pl-4 pr-1 pb-1">
                          {cat.tools.map(tool => (
                            <button
                              key={tool.id}
                              onClick={() => { setActiveTool(tool); setSidebarOpen(false); }}
                              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left cursor-pointer border-none text-[11px] transition-all ${
                                activeTool?.id === tool.id ? 'bg-white/10 text-white font-semibold' : 'bg-transparent text-white/45 hover:text-white/70 hover:bg-white/4'
                              }`}
                            >
                              <span className="shrink-0 text-[9px] font-bold text-white/25">#{tool.no}</span>
                              <span className="leading-tight truncate">{tool.title}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          )}
        </aside>

        {/* ── 메인 콘텐츠 ── */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10">

          {/* 프롬프트 상세 */}
          {sidebarTab === 'prompts' && activeTool ? (
            <AnimatePresence mode="wait">
              <motion.div key={activeTool.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.18)', color: '#C9A84C' }}>#{activeTool.no}</span>
                    <span className="text-white/25 text-[10px]">{TOOL_CATEGORIES.find(c => c.id === activeTool.catId)?.label}</span>
                  </div>
                  <h1 className="apple-white-gradient font-extrabold text-[24px] sm:text-[30px] tracking-tight mb-2">{activeTool.title}</h1>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTool.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/30 flex items-center gap-1">
                        <Tag size={8} />#{tag}
                      </span>
                    ))}
                  </div>
                  <div className="h-px mt-5 bg-white/8" />
                </div>

                <div className="space-y-7">
                  <p className="text-white/60 text-[14px] leading-relaxed">{activeTool.desc}</p>

                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-3">사용 방법</p>
                    <div className="space-y-2.5">
                      {activeTool.usage.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold text-black mt-0.5" style={{ backgroundColor: '#C9A84C' }}>{i + 1}</span>
                          <p className="text-white/65 text-[13px] leading-snug">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeTool.tips && (
                    <div className="p-4 rounded-xl border" style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.05)' }}>
                      <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>💡 Pro Tip</p>
                      <p className="text-white/65 text-[13px] leading-relaxed">{activeTool.tips}</p>
                    </div>
                  )}

                  {activeTool.samplePrompt && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-bold tracking-widest uppercase text-white/30">샘플 프롬프트</p>
                        <CopyBtn text={activeTool.samplePrompt} />
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
                        <p className="text-white/65 text-[13px] leading-relaxed font-mono whitespace-pre-wrap">{activeTool.samplePrompt}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : sidebarTab === 'prompts' ? (
            /* 프롬프트 선택 전 안내 */
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <Zap size={32} className="text-white/20 mb-3" />
              <p className="text-white/30 text-[14px]">왼쪽에서 프롬프트 도구를 선택하세요</p>
            </div>
          ) : (
            /* ── 커리큘럼 뷰 ── */
            <>
              <motion.div key={activeEp} className="mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#C9A84C', opacity: 0.8 }}>
                  {currentEp.epNum} · 실습 교재
                </p>
                <h1 className="apple-white-gradient font-extrabold tracking-tight leading-tight mb-3" style={{ fontSize: 'clamp(22px, 4vw, 36px)' }}>
                  {currentEp.title}
                </h1>
                <div className="flex items-center gap-3 text-white/35 text-[12px]">
                  <span className="flex items-center gap-1"><Clock size={12} />{currentEp.duration}</span>
                  <span>·</span>
                  <span>{currentEp.lessons.length}개 강의</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={12} style={{ color: '#C9A84C' }} />수강 가능</span>
                </div>
                <div className="h-px mt-6 bg-white/8" />
              </motion.div>

              {currentEp.lessons.map((lesson, idx) => (
                <div key={lesson.id} id={`lesson-${lesson.id}`} className="mb-14 scroll-mt-28">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-extrabold mt-0.5"
                      style={{ backgroundColor: 'rgba(201,168,76,0.18)', color: '#C9A84C', border: '1.5px solid rgba(201,168,76,0.35)' }}>
                      {lesson.step.split('-')[1]}
                    </span>
                    <div>
                      <h2 className="apple-white-gradient font-bold text-[18px] sm:text-[20px] tracking-tight leading-snug">{lesson.title}</h2>
                      <p className="text-white/45 text-[13px] mt-1.5 leading-relaxed max-w-2xl">{lesson.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {lesson.tags.map(tag => (
                          <span key={tag} className="text-[10.5px] px-2.5 py-0.5 rounded-full border border-white/10 text-white/35">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 ml-11">
                    <VideoCard lesson={lesson} />

                    {lesson.milestone && (
                      <motion.div className="flex items-center gap-3 p-4 rounded-xl border mb-5"
                        style={{ borderColor: 'rgba(201,168,76,0.25)', backgroundColor: 'rgba(201,168,76,0.06)' }}
                        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <CheckCircle2 size={18} style={{ color: '#C9A84C' }} className="shrink-0" />
                        <p className="text-[13px] font-semibold" style={{ color: '#C9A84C' }}>{lesson.milestone}</p>
                      </motion.div>
                    )}

                    {lesson.reference && (
                      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}>
                            <Bookmark size={11} style={{ color: '#C9A84C' }} />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-white/35">{lesson.reference.label}</span>
                        </div>
                        <p className="text-white/50 text-[13px] leading-relaxed">{lesson.reference.body}</p>
                      </div>
                    )}
                  </div>

                  {idx < currentEp.lessons.length - 1 && <div className="h-px bg-white/5 my-4" />}
                </div>
              ))}

              {/* 하단 내비게이션 */}
              <div className="border-t border-white/8 pt-10 mt-4">
                <div className="rounded-2xl p-7 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(201,168,76,0.18)' }}>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-3 text-white/30">다음 단계</p>
                  <h3 className="text-white font-extrabold text-[20px] tracking-tight mb-2">배포 → 데이터베이스 → 결제</h3>
                  <p className="text-white/45 text-[13px] leading-relaxed max-w-md mx-auto mb-6">
                    이 순서대로 하면 이제 사이트를 세상에 공개하고, 데이터를 저장하고, 결제까지 직접 연결할 수 있습니다. 핵심은 완벽이 아니라 속도입니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => navigate('/homework')} className="px-6 py-3 rounded-xl text-[13px] font-bold cursor-pointer border-none" style={{ backgroundColor: '#C9A84C', color: '#000' }}>
                      📝 과제 제출하기
                    </button>
                    <button onClick={() => { setSidebarTab('prompts'); setOpenPromptCat('automation'); }} className="px-6 py-3 rounded-xl text-[13px] font-semibold cursor-pointer border border-white/15 bg-transparent text-white/60 hover:bg-white/5 transition-all">
                      🤖 AI 프롬프트 도구 보기
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
