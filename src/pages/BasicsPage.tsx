/**
 * BasicsPage — AI 1인 기업 무료 교재 리드 수집 랜딩페이지
 * /basics  |  무료 교재 리드 수집 랜딩: 후킹→문제→해결→증거→폼
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, ChevronDown, ChevronUp,
  BookOpen, Zap, Globe, TrendingUp, Code,
  ArrowRight, Shield, Star, Users,
} from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ══════════════════════════════════
   공유 타입·데이터 (CourseAIPage import용)
══════════════════════════════════ */
export interface Lesson {
  id: string; step: string; title: string; desc: string;
  youtubeUrl: string; thumbCode?: string; tags: string[];
  milestone?: string; reference?: { label: string; body: string };
}
export interface Episode {
  id: string; epNum: string; title: string; duration: string;
  unlocked: boolean; lessons: Lesson[];
}

export const CURRICULUM: Episode[] = [
  {
    id: 'ep1', epNum: 'EP 01', title: '입학식 · 케이스스터디', duration: '90분', unlocked: true,
    lessons: [
      { id: '1-1', step: '1-1', title: '오리엔테이션 & AI 1인 기업 로드맵', desc: '이 강의에서 무엇을 배우고, 어떤 순서로 AI 1인 기업을 만들어 나갈지 전체 로드맵을 공유합니다.', youtubeUrl: 'https://youtube.com', thumbCode: 'ROADMAP\n배포 → DB → 결제\n→ 마케팅 → 수익화', tags: ['오리엔테이션', '로드맵', 'AI 기업'] },
      { id: '1-2', step: '1-2', title: 'Case Study — 직원 0명, 월 $420K 실제 사례', desc: '글로벌 AI 1인 기업가들의 실제 수익 데이터를 분석합니다. 직원 없이 87% 순이익률로 월 $420K를 버는 비결을 공개합니다.', youtubeUrl: 'https://youtube.com', thumbCode: '$420K / 월\n직원 0명\n순이익 87%\n첫 수익 평균 17일', tags: ['케이스스터디', '$420K', '87% 순이익'], reference: { label: '참고 자료', body: 'Jake Leader $420K · David Poliku $200K — 모두 직원 없이 AI 도구만으로 만든 수익. 평균 순이익률 87%.' } },
      { id: '1-3', step: '1-3', title: 'AI 1인 기업 수익 모델 4종 완전 분석', desc: 'SaaS 구독 / 광고 / 콘텐츠 라이선싱 / 엑싯 — 4가지 수익 모델의 차이와 본인에게 맞는 모델 선택 기준을 알아봅니다.', youtubeUrl: 'https://youtube.com', thumbCode: '수익 모델 4종\n① SaaS 구독\n② 광고\n③ 콘텐츠 라이선스\n④ 엑싯(M&A)', tags: ['수익 모델', 'SaaS', '17일 첫 수익'], milestone: 'EP 1 완료 → 내 AI 기업 수익 구조가 머릿속에 잡힌다 🧠' },
    ],
  },
  {
    id: 'ep2', epNum: 'EP 02', title: '배포 · 데이터베이스 · 결제', duration: '44시간 57분', unlocked: true,
    lessons: [
      { id: '2-1', step: '2-1', title: 'AI 사이트 Vercel 배포하기', desc: 'Claude Code로 만든 사이트를 Vercel로 세상에 공개합니다. 환경변수 설정, 빌드 오류 해결, 커스텀 도메인 연결까지 실습합니다.', youtubeUrl: 'https://youtube.com', thumbCode: '$ vercel deploy\n✅ Production: ready\nhttps://my-site.vercel.app', tags: ['Vercel', '배포', '도메인 연결'] },
      { id: '2-2', step: '2-2', title: 'Firebase 데이터베이스 연동', desc: 'Firebase Firestore로 사용자 데이터와 주문 정보를 저장하는 시스템을 구축합니다. 실시간 데이터 동기화와 보안 규칙 설정까지.', youtubeUrl: 'https://youtube.com', thumbCode: 'Firestore\n├ users/{uid}\n│  └ email, name\n└ orders/{id}\n   └ amount, status', tags: ['Firebase', 'Firestore', '실시간 DB'] },
      { id: '2-3', step: '2-3', title: '페이팔 비즈니스 계정 등록하기', desc: '글로벌 결제를 받기 위한 필수 단계. 페이팔 비즈니스 계정 생성/가입 절차를 단계별로 진행합니다.', youtubeUrl: 'https://youtube.com', thumbCode: 'PayPal Business\n① Individual\n② Business (추천)\n→ Next →', tags: ['PayPal', '비즈니스 계정', '글로벌 결제'] },
      { id: '2-4', step: '2-4', title: 'Secret Key 발급받기', desc: 'PayPal 연동의 핵심인 Client ID와 Secret Key를 발급받고 안전하게 관리하는 방법을 배웁니다.', youtubeUrl: 'https://youtube.com', thumbCode: 'PayPal API\nClient ID: AZxx...\nSecret:    ████████\n[Live Mode]', tags: ['API Key', 'Client ID', 'Sandbox'] },
      { id: '2-5', step: '2-5', title: '결제 연동 + 테스트 결제까지 개발하기', desc: '실제로 결제를 연동하고 내 웹사이트에 결제 버튼을 달아, 테스트 결제까지 진행하는 전 과정을 실습합니다.', youtubeUrl: 'https://youtube.com', thumbCode: '<PayPalButtons\n  createOrder={...}\n  onApprove={...}\n/>', tags: ['결제 연동', 'React SDK', '테스트 결제'], milestone: '여기까지 하면 → 실제 결제되는 사이트 완성! 🎉' },
    ],
  },
  {
    id: 'ep3', epNum: 'EP 03', title: 'AI 마케팅 · SNS 수익화', duration: '준비 중', unlocked: false,
    lessons: [
      { id: '3-1', step: '3-1', title: 'Google · Naver SEO 자동화', desc: 'AI로 SEO 최적화 콘텐츠를 자동 생산하고 상위 노출을 만듭니다.', youtubeUrl: '', tags: ['SEO', 'Google'] },
      { id: '3-2', step: '3-2', title: '인스타그램 릴스 자동화', desc: 'Runway AI + CapCut으로 릴스 콘텐츠를 대량 생산합니다.', youtubeUrl: '', tags: ['릴스', '자동화'] },
      { id: '3-3', step: '3-3', title: '이메일 마케팅 자동화', desc: 'Mailchimp + N8N으로 이메일 시퀀스를 완전 자동화합니다.', youtubeUrl: '', tags: ['이메일', 'N8N'] },
    ],
  },
];

/* ══════════════════════════════════
   서브 컴포넌트
══════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

function PainItem({ emoji, text, sub }: { emoji: string; text: string; sub: string }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02]"
    >
      <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
      <div>
        <p className="text-white font-semibold text-[15px] leading-snug mb-1">{text}</p>
        <p className="text-white/40 text-[13px]">{sub}</p>
      </div>
    </motion.div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-white/8 bg-white/[0.015]"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
        <span style={{ color: '#C9A84C' }}>{icon}</span>
      </div>
      <p className="text-white font-bold text-[15px]">{title}</p>
      <p className="text-white/45 text-[13px] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function CurriculumItem({ ep, isOpen, onToggle }: { ep: Episode; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: isOpen ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
        style={{ background: isOpen ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold tracking-wider" style={{ color: '#C9A84C' }}>{ep.epNum}</span>
          <span className="text-white font-semibold text-[14px]">{ep.title}</span>
          {!ep.unlocked && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/40">준비 중</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-white/30 text-[12px] hidden sm:block">{ep.duration}</span>
          {isOpen ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 flex flex-col gap-3 pt-2">
              {ep.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-start gap-3 py-3 border-t border-white/5">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: ep.unlocked ? '#C9A84C' : 'rgba(255,255,255,0.2)' }} />
                  <div>
                    <p className="text-white/85 text-[13px] font-medium">{lesson.title}</p>
                    <p className="text-white/35 text-[12px] mt-0.5 leading-relaxed">{lesson.desc}</p>
                    {lesson.milestone && (
                      <p className="text-[11px] mt-2 font-semibold" style={{ color: '#C9A84C' }}>{lesson.milestone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════
   메인 컴포넌트
══════════════════════════════════ */
export default function BasicsPage() {
  const [openEp, setOpenEp] = useState<string | null>('ep1');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Seo
        title="AI 1인 기업 무료 교재 — 소상공인·1인창업가 AI 마케팅 로드맵 | GrowthAI"
        description="AI로 1인 기업을 시작하려는 소상공인, 1인창업가를 위한 무료 교재입니다. 챗GPT·클로드 활용법부터 단계별 로드맵과 핵심 프롬프트까지 무료로 공개합니다."
        canonical="/basics"
        image={DEFAULT_OG_IMAGE}
        keywords={['AI 1인 기업', '1인창업가', '소상공인 AI 활용', 'AI 부업', '무료 교재', 'AI 마케팅 로드맵', 'GrowthAI']}
      />

      {/* ══════════════════════════
          §1  HERO — 후킹 헤드라인
      ══════════════════════════ */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-5 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#C9A84C' }}
          >
            GrowthAI · 무료 교재
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-extrabold tracking-[-0.025em] leading-[1.07] mb-6"
            style={{ fontSize: 'clamp(32px, 5.5vw, 66px)' }}
          >
            <span className="text-white">AI 1인 기업,</span><br />
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #EED98A 0%, #C9A84C 40%, #EED98A 80%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>무료 교재로 시작하세요.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/45 leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}
          >
            코딩 몰라도, 시간 없어도, 자본 없어도 됩니다.<br />
            1,200명이 검증한 AI 1인 기업 로드맵을 지금 바로 받아보세요.
          </motion.p>
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            <button
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[15px] cursor-pointer border-none"
              style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #EED98A 100%)', color: '#000' }}
            >
              무료 교재 지금 바로 받기 <ArrowRight size={16} />
            </button>
            <p className="text-white/20 text-[12px] mt-3">이메일만 입력하면 즉시 전송됩니다 · 스팸 없음</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          §1-2  QUICK VALUE — 먼저 얻는 결과
      ══════════════════════════ */}
      <section className="pb-8 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: '4종', label: 'AI 수익 모델' },
              { value: '30종', label: '실전 프롬프트' },
              { value: '17일', label: '첫 수익 목표' },
            ].map(stat => (
              <div key={stat.label} className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] text-center">
                <p className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#C9A84C' }}>
                  {stat.value}
                </p>
                <p className="text-white/40 text-[12px] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          §2  PAIN — 고객의 고민 나열
      ══════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>혹시 이런 고민 있으신가요?</p>
            <h2 className="text-white font-extrabold tracking-tight leading-tight" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              AI 배우고 싶은데<br /><span style={{ color: 'rgba(255,255,255,0.45)' }}>어디서 어떻게 시작해야 할지 모르겠다면</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {[
              { emoji: '😩', text: '"AI로 돈 번다는 사람은 많은데 나는 왜 안 되지?"', sub: '유튜브, 블로그 다 봤는데 실제 수익은 0원' },
              { emoji: '🤔', text: '"코딩을 모르면 AI 자동화는 나랑 상관없는 얘기 아닌가요?"', sub: '개발자가 아니면 불가능하다고 생각했습니다' },
              { emoji: '⏰', text: '"바쁜 직장인인데, 퇴근 후에 배울 시간이 과연 있을까요?"', sub: '하루 1~2시간으로 실제 결과를 낼 수 있는지 의문' },
              { emoji: '💸', text: '"비싼 강의 샀는데 막상 내 상황에 적용하기가 너무 어렵습니다"', sub: '이론만 많고 실전에서 바로 쓸 수 있는 게 없음' },
              { emoji: '😰', text: '"혼자 하다가 막혀버리면 그냥 포기하게 됩니다"', sub: '물어볼 사람 없고, 혼자 해결이 안 돼서 결국 멈춤' },
            ].map((p) => (
              <PainItem key={p.text} {...p} />
            ))}
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-white/30 text-[13px]">이 고민들, 저도 똑같이 했습니다.</p>
            <div className="w-px h-10 mx-auto mt-3" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          §3  AGITATE + SOLUTION — 공감 & 해결책
      ══════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 border-t border-white/5" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.03), transparent)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4 text-center" style={{ color: '#C9A84C' }}>The Solution</p>
            <h2 className="text-white font-extrabold tracking-tight leading-tight text-center mb-6" style={{ fontSize: 'clamp(24px, 4vw, 44px)' }}>
              문제는 <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.3)' }}>당신의 능력</span>이 아닙니다.<br />
              <span style={{ color: '#C9A84C' }}>시작 순서와 실행 구조를 몰랐을 뿐입니다.</span>
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed text-center max-w-xl mx-auto">
              AI로 수익을 내는 사람들은 특별한 재능이 있는 게 아닙니다.<br />
              <strong className="text-white/80">검증된 시스템</strong>이 있을 뿐입니다.<br />
              그 시스템을 1,200명의 수강생에게 가르쳐온 노하우를 무료 교재로 공개합니다.
            </p>
          </motion.div>

          {/* 솔루션 3단계 */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '01', icon: '🎯', title: '방향 설정', desc: '나에게 맞는 AI 수익 모델을 먼저 선택합니다. 막연히 시작하지 않습니다.' },
              { step: '02', icon: '⚙️', title: '시스템 구축', desc: '코딩 없이 AI 도구로 자동화 파이프라인을 직접 만듭니다.' },
              { step: '03', icon: '💰', title: '수익화 실행', desc: '평균 17일 이내 첫 수익을 만드는 구체적인 실행 플랜을 따릅니다.' },
            ].map((s) => (
              <motion.div
                key={s.step}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] text-center"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#C9A84C' }}>STEP {s.step}</p>
                <p className="text-white font-bold text-[15px] mb-2">{s.title}</p>
                <p className="text-white/40 text-[12px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          §4  BENEFITS — 무료 교재 혜택
      ══════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>무료 교재에 담긴 것</p>
            <h2 className="text-white font-extrabold tracking-tight" style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}>
              이 교재 하나로 시작부터 수익화까지
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <BenefitCard icon={<BookOpen size={20} />} title="AI 수익 로드맵" desc="단계별 실행 플랜을 한눈에 정리한 핵심 가이드" />
            <BenefitCard icon={<Code size={20} />} title="실전 프롬프트 30종" desc="즉시 활용 가능한 업무 자동화 프롬프트 모음" />
            <BenefitCard icon={<TrendingUp size={20} />} title="수익 모델 분석" desc="4가지 AI 수익 모델 비교와 나에게 맞는 선택법" />
            <BenefitCard icon={<Globe size={20} />} title="글로벌 케이스스터디" desc="실제 월 $420K 달성한 사례 분석과 따라 하는 법" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>이런 분께 맞습니다</p>
              <ul className="flex flex-col gap-2 text-white/55 text-[13px] leading-relaxed">
                <li>• 코딩 없이 AI로 수익을 만들고 싶은 분</li>
                <li>• 퇴근 후 1~2시간으로 시작하고 싶은 분</li>
                <li>• 블로그/유튜브/자동화를 연결해 보고 싶은 분</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>받아가실 것</p>
              <ul className="flex flex-col gap-2 text-white/55 text-[13px] leading-relaxed">
                <li>• 첫 수익까지의 체크리스트</li>
                <li>• 실제로 써먹는 프롬프트 샘플</li>
                <li>• 다음 단계로 가는 강의 구조</li>
              </ul>
            </div>
          </div>

          {/* 무료 강조 배너 */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl border text-center"
            style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
          >
            <p className="text-[13px] text-white/50 mb-1">원래 가격 <span className="line-through">₩49,000</span></p>
            <p className="font-extrabold text-[32px] sm:text-[40px] tracking-tight" style={{ color: '#C9A84C' }}>완전 무료</p>
            <p className="text-white/35 text-[12px] mt-1">지금 신청하는 분께만 · 이메일로 즉시 전송</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          §5  CURRICULUM PREVIEW
      ══════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>Curriculum Preview</p>
            <h2 className="text-white font-extrabold tracking-tight" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
              무료 교재로 미리 보는<br />강의 커리큘럼
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {CURRICULUM.map((ep) => (
              <CurriculumItem
                key={ep.id}
                ep={ep}
                isOpen={openEp === ep.id}
                onToggle={() => setOpenEp(openEp === ep.id ? null : ep.id)}
              />
            ))}
          </div>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center text-white/25 text-[12px] mt-6"
          >
            총 3개 에피소드 · 계속 업데이트 중
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════
          §6  SOCIAL PROOF — 수강생 후기
      ══════════════════════════ */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 border-t border-white/5" style={{ background: 'rgba(201,168,76,0.02)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#C9A84C" color="#C9A84C" />)}
            </div>
            <p className="text-white/40 text-[13px]">수강생 1,200명 평균 만족도 4.9점</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: '김○○', role: '직장인 → 부업 수익 월 180만', text: '3개월 만에 첫 디지털 상품 출시하고 월 180만 벌고 있습니다. 이 교재가 시작점이었어요.', stars: 5 },
              { name: '박○○', role: '소상공인 → AI 자동화로 시간 절약', text: '하루 4시간 걸리던 고객 응대를 N8N으로 자동화했습니다. 지금은 그 시간에 콘텐츠 만들어요.', stars: 5 },
              { name: '한○○', role: '50대 원장 → 1인 기업 창업', text: '"AI는 나랑 다른 세상 얘기"라고 생각했는데 교재 보고 바로 시작해서 지금 월 450만 법니다.', stars: 5 },
            ].map((review) => (
              <motion.div
                key={review.name}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] flex flex-col gap-3"
              >
                <div className="flex gap-0.5">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={12} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <p className="text-white/70 text-[13px] leading-relaxed flex-1">"{review.text}"</p>
                <div>
                  <p className="text-white font-semibold text-[13px]">{review.name}</p>
                  <p className="text-[11px]" style={{ color: '#C9A84C' }}>{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          §7  INSTRUCTOR — KOI LEE
      ══════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.25em] uppercase mb-10 text-center"
            style={{ color: '#C9A84C' }}
          >
            Your Instructor
          </motion.p>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* 왼쪽: 사진 + 저서 */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col items-center lg:items-start"
            >
              {/* 프로필 이미지 */}
              <div className="w-64 sm:w-80 lg:w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative shadow-2xl">
                <img
                  src="/IMG_5545.PNG"
                  alt="AI 멘토 KOI LEE"
                  className="w-full h-full object-cover object-top brightness-[1.08]"
                />
                <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 60px 10px #000', pointerEvents: 'none' }} />
              </div>

              {/* 성과 지표 */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm lg:max-w-none mb-6">
                {[
                  { icon: <Users size={14} />, value: '1,200+', label: '수강생' },
                  { icon: <Star size={14} />, value: '4.9', label: '만족도' },
                  { icon: <TrendingUp size={14} />, value: '₩420K', label: '평균 월수익' },
                  { icon: <BookOpen size={14} />, value: '2권', label: '매경 베스트셀러' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 p-3 rounded-xl border border-white/8 bg-white/[0.02]">
                    <span style={{ color: '#C9A84C' }}>{stat.icon}</span>
                    <div>
                      <p className="font-bold text-[15px] leading-none" style={{ color: '#C9A84C' }}>{stat.value}</p>
                      <p className="text-white/35 text-[11px] mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 저서 */}
              <div className="w-full max-w-sm lg:max-w-none">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Published Books</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <img src="/9791164841240.jpg" alt="AI 비즈니스 실전 가이드" className="w-full rounded-xl shadow-xl border border-white/10 hover:scale-105 transition-transform duration-300" />
                    <p className="text-[10px] text-center text-white/35">AI 비즈니스 실전 가이드</p>
                    <p className="text-[9px] text-center text-white/20">매일경제출판사 베스트셀러</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <img src="/9791164841615.jpg" alt="마케팅 수익화 교과서" className="w-full rounded-xl shadow-xl border border-white/10 hover:scale-105 transition-transform duration-300" />
                    <p className="text-[10px] text-center text-white/35">마케팅 수익화 교과서</p>
                    <p className="text-[9px] text-center text-white/20">매일경제출판사 베스트셀러</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 오른쪽: 소개 텍스트 */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <div>
                <p className="text-[12px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#C9A84C' }}>
                  AI 멘토 KOI LEE · GrowthAI 소장
                </p>
                <h3 className="text-white font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
                  AI 자동화 구축·교육<br />통합 전문가
                </h3>
                <p className="text-white/55 text-[15px] leading-relaxed">
                  백만장자 마케팅 전략 + AI 자동화를 결합한 1인 기업 시스템을 직접 구축하고 수강생들에게 전달합니다.<br />
                  글로벌 케이스스터디 분석을 통해 <strong className="text-white/80">검증된 방법만</strong> 가르칩니다.
                </p>
              </div>

              {/* 전문 분야 태그 */}
              <div className="flex flex-wrap gap-2">
                {['AI 자동화', '마케팅 전략', '글로벌 수익화', '바이브코딩'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-[12px] font-semibold border"
                    style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C', background: 'rgba(201,168,76,0.07)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 스토리 포인트 */}
              <div className="flex flex-col gap-4 pt-2">
                {[
                  { label: '매경출판사 베스트셀러 저자', desc: 'AI 마케팅, 수익화 교과서 2권 출간. 대중과 기업 모두에게 검증된 방법론.' },
                  { label: '코로나 위기에 수천 명의 비즈니스를 살린 실전가', desc: '온라인 전환이 불가능하다던 시절, 이미 시스템을 완성했습니다.' },
                  { label: '글로벌 케이스스터디 분석가', desc: '미국, 일본, 동남아 1인 기업가들의 실제 데이터를 분석해 적용합니다.' },
                  { label: '1인 기업 전문 코치 · GrowthAI 창업자', desc: '1,200+ 수강생의 AI 1인 기업 시스템 구축을 직접 지원했습니다.' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <Zap size={14} className="shrink-0 mt-1" style={{ color: '#C9A84C' }} />
                    <div>
                      <p className="text-white font-semibold text-[14px]">{item.label}</p>
                      <p className="text-white/40 text-[13px] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 인용구 */}
              <div className="mt-2 p-5 rounded-2xl border-l-2" style={{ borderColor: '#C9A84C', background: 'rgba(201,168,76,0.04)' }}>
                <p className="text-white/70 text-[14px] leading-relaxed italic">
                  "저도 처음엔 막막했습니다. 도구는 배웠는데 수익은 0원이었죠.<br />
                  그 질문이 GrowthAI의 시작이었습니다."
                </p>
                <p className="text-[12px] mt-2 font-semibold" style={{ color: '#C9A84C' }}>— KOI LEE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          §8  LEAD FORM — 리드 수집
      ══════════════════════════ */}
      <section id="lead-form" className="py-16 sm:py-24 px-5 sm:px-6 border-t border-white/5" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.04), transparent)' }}>
        <div className="max-w-xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>무료 교재 신청</p>
            <h2 className="text-white font-extrabold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              지금 바로 받으세요
            </h2>
            <p className="text-white/40 text-[14px]">입력 즉시 이메일로 발송됩니다 · 완전 무료</p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-8 rounded-3xl border"
              style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-extrabold text-[22px] mb-2">신청 완료!</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">
                <strong className="text-white/80">{form.email}</strong>로<br />
                무료 교재를 발송했습니다.<br />
                메일함을 확인해 주세요 (스팸함 포함).
              </p>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-6 sm:p-8 rounded-3xl border"
              style={{ borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(255,255,255,0.02)' }}
            >
              {/* 이름 */}
              <div>
                <label className="block text-[12px] font-semibold mb-2 text-white/60">이름 *</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-white text-[14px] outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', colorScheme: 'dark' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-[12px] font-semibold mb-2 text-white/60">이메일 *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-white text-[14px] outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', colorScheme: 'dark' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-[12px] font-semibold mb-2 text-white/60">연락처 <span className="text-white/25">(선택)</span></label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border text-white text-[14px] outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', colorScheme: 'dark' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>

              {/* 혜택 체크 */}
              <div className="flex flex-col gap-2 py-2">
                {['AI 수익 로드맵 무료 교재', '실전 프롬프트 30종', '글로벌 케이스스터디'].map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle size={13} style={{ color: '#C9A84C' }} />
                    <span className="text-white/55 text-[12px]">{b}</span>
                  </div>
                ))}
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-[15px] cursor-pointer border-none transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #EED98A 100%)', color: '#000' }}
              >
                {loading ? '전송 중...' : '무료 교재 받기 →'}
              </button>

              <p className="text-center text-white/20 text-[11px]">
                <Shield size={10} className="inline mr-1" />
                개인정보는 교재 발송 외 사용되지 않습니다
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* ══════════════════════════
          §8-1  FAQ — 반론 처리
      ══════════════════════════ */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#C9A84C' }}>FAQ</p>
            <h2 className="text-white font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              자주 묻는 질문
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: '비싼가요?', a: '무료 교재 신청은 완전 무료입니다. 이후 더 깊이 배우고 싶을 때만 선택적으로 이어가면 됩니다.' },
              { q: '초보도 가능한가요?', a: '가능합니다. 코딩이 아니라 순서와 구조를 먼저 배우는 방식으로 설계했습니다.' },
              { q: '시간이 없는데 가능한가요?', a: '가능합니다. 퇴근 후 1~2시간 기준으로 시작할 수 있게 구성했습니다.' },
              { q: '혼자 해도 되나요?', a: '네. 다만 막히지 않도록 체크리스트와 다음 단계 안내를 함께 드립니다.' },
              { q: '무료 교재는 언제 받나요?', a: '입력 직후 이메일로 바로 발송됩니다.' },
            ].map(item => (
              <details key={item.q} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <summary className="cursor-pointer list-none text-white font-semibold text-[15px] flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-white/25">+</span>
                </summary>
                <p className="text-white/45 text-[13px] leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          §9  FINAL CTA
      ══════════════════════════ */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-white/25 text-[13px] mb-4">지금 이 순간에도 누군가는 AI로 첫 수익을 만들고 있습니다.</p>
            <h2 className="text-white font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
              다음 차례는 <span style={{ color: '#C9A84C' }}>당신</span>입니다.
            </h2>
            <button
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[15px] cursor-pointer border-none"
              style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #EED98A 100%)', color: '#000' }}
            >
              무료 교재 지금 받기 <ArrowRight size={16} />
            </button>
            <p className="text-white/20 text-[12px] mt-3">무료 · 즉시 발송 · 다음 단계는 원할 때만 선택</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
