import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Download, Mail, PlayCircle, Shield, Sparkles, Target } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { createLeadCapture } from '../lib/firestore';

const GOLD = '#C9A84C';

const HOOK_POINTS = [
  'AI는 써봤는데 매출은 그대로인 경우',
  '홈페이지는 만들었는데 문의가 안 오는 경우',
  '블로그는 쓰는데 검색 유입이 약한 경우',
  '영상은 올리는데 결제로 이어지지 않는 경우',
];

const PDF_ITEMS = [
  { title: '거장 12명의 공개된 설득 원리', desc: 'Hopkins, Schwartz, Robbins, Abraham, Kennedy, Brunson의 핵심 원리를 한국형으로 압축했습니다.' },
  { title: '한국 시장 적용 예시', desc: '1인 창업가, 소상공인, 서비스 업종, 강의/코칭 업종에 맞춰 다시 썼습니다.' },
  { title: '복붙용 랜딩 문장', desc: '헤드라인, 문제 제기, 신뢰 문구, CTA까지 바로 쓸 수 있게 정리합니다.' },
  { title: '검색과 전환을 함께 보는 구조', desc: 'Google, Naver 공식 가이드를 함께 반영해 사람도 읽고 검색봇도 읽는 구조로 만듭니다.' },
];

const VIDEO_STEPS = [
  { no: '01', title: '왜 AI보다 구조가 먼저인지', desc: '도구를 배우고 끝나는 흐름과, 매출로 이어지는 흐름의 차이를 보여줍니다.' },
  { no: '02', title: '한국 고객이 반응하는 문장', desc: '손해 회피, 빠른 체험, 구체적 예시 같은 심리를 랜딩에 넣는 법을 설명합니다.' },
  { no: '03', title: '랜딩, 블로그, 영상, 에이전트 적용법', desc: '같은 원리를 채널별로 다르게 쓰는 방법을 보여줍니다.' },
];

const TRUST_POINTS = [
  { title: '검증된 원리', desc: '12명의 마케팅 거장들이 써온 공개된 기법을 분석합니다.' },
  { title: '공식 가이드 반영', desc: 'Google과 Naver의 검색 가이드를 함께 반영합니다.' },
  { title: '한국형 재구성', desc: '1인 창업가와 소상공인이 바로 쓰게 다시 씁니다.' },
  { title: '실행 중심', desc: '무료 PDF, 영상 교육, 무료 체험, 월 구독으로 연결합니다.' },
];

const AUDIENCE_ITEMS = [
  '퇴근 후 1인 창업을 준비하는 분',
  '동네 가게, 예약형, 시술형, 상담형 서비스 업종',
  'AI를 써도 문의와 결제가 늘지 않는 분',
  '강의, 코칭, 프롬프트, 에이전트를 팔고 싶은 분',
];

const FAQ_ITEMS = [
  { q: '왜 무료로 주나요?', a: '먼저 구조를 이해하고 써보게 해야 신뢰가 생기기 때문입니다. PDF는 진입점이고, 뒤에서 영상과 체험으로 이어집니다.' },
  { q: '초보도 이해할 수 있나요?', a: '네. 이 자료는 이론서가 아니라 바로 적용하는 실전형 가이드입니다.' },
  { q: '내 업종에도 맞나요?', a: '건강식품, 주방용품, 교육, 서비스, 에이전트 판매처럼 한국 시장의 다양한 업종에 맞게 예시를 넣습니다.' },
  { q: '그다음에는 무엇이 있나요?', a: '무료 PDF 다음에 영상 교육이 있고, 그 다음 무료 에이전트 체험과 월 구독으로 이어집니다.' },
];

export default function GuideLandingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', business: '', goal: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.goal) return;
    setLoading(true);
    setError('');
    try {
      await createLeadCapture({
        name: form.name,
        email: form.email,
        company: form.business || null,
        goal: form.goal,
        source: 'guide-landing',
      });
      setSubmitted(true);
      navigate('/guide/day1', { state: { name: form.name } });
    } catch {
      setError('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setLoading(false);
    }
  };

  return (
    <div className='bg-black text-white selection:bg-white selection:text-black min-h-screen' style={{ fontFamily: 'var(--font-sans)' }}>
      <Seo
        title='무료 PDF | 변하지 않는 구매전환 원리, AI로 더 빠르게 실행하세요'
        description='12명의 마케팅 거장 검증 원리를 한국 1인 창업가·소상공인 기준으로 재구성한 무료 PDF와 영상 교육. 무료 체험과 월 구독으로 이어집니다.'
        canonical='/guide'
        image={DEFAULT_OG_IMAGE}
        keywords={['무료 PDF', '구매전환 원리', 'AI 마케팅', 'GrowthAI', '네이버 SEO', '구글 SEO']}
        siteName={SITE_NAME}
      />

      <section className='relative overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-20 border-b border-white/5 bg-black'>
        <div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(circle at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 50%)' }} />
        <div className='relative max-w-5xl mx-auto text-center'>
          <ScrollReveal blur>
            <p className='apple-eyebrow-gold mb-6 text-[13px] md:text-[15px] font-semibold tracking-[0.18em] text-center'>
              무료 PDF · 영상 교육 · 무료 에이전트 체험
            </p>
            <h1 className='apple-white-gradient font-bold leading-[1.05] tracking-toss-tight mb-8' style={{ fontSize: 'clamp(44px, 7.5vw, 84px)' }}>
              변하지 않는 구매전환 원리,<br />
              <span className='apple-gold-gradient font-bold'>AI로 더 빠르게 실행하세요.</span>
            </h1>
            <p className='mx-auto text-zinc-400 text-[18px] md:text-[22px] font-medium leading-relaxed max-w-4xl mb-12 text-center'>
              12명의 마케팅 거장들이 검증한 설득 원리를 한국 시장에 맞게 재구성했습니다.<br className='hidden md:inline' />
              랜딩페이지, 블로그, 영상, 에이전트에 <strong className='text-[#f5f5f7] font-semibold'>바로 적용할 수 있는 무료 PDF</strong>를 먼저 드립니다.
            </p>

            <div className='flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto mb-12'>
              {HOOK_POINTS.map((item) => (
                <div key={item} className='rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md px-5 py-3 text-[14px] text-zinc-300 font-medium hover:border-white/20 transition-all duration-300'>
                  {item}
                </div>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border-none bg-[#C9A84C] text-[#0a0a0a] hover:bg-[#D4BA6A] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.25)]'
              >
                무료 PDF 받기 <Download size={16} />
              </button>
              <button
                onClick={() => document.getElementById('video-curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
              >
                영상 교육 보기 <PlayCircle size={16} />
              </button>
              <button
                onClick={() => navigate('/agents/free-trial')}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
              >
                무료 에이전트 체험 <ArrowRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Centered Glassmorphic Laptop/Dashboard Mockup */}
      <section className='px-6 py-16 md:py-24 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto'>
          <ScrollReveal scale>
            {/* The laptop/screen frame */}
            <div className='relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-2 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden'>
              {/* Window controls bar */}
              <div className='flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]'>
                <div className='w-3 h-3 rounded-full bg-[#ff5f56]' />
                <div className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
                <div className='w-3 h-3 rounded-full bg-[#27c93f]' />
                <span className='ml-4 text-[12px] text-zinc-500 font-medium tracking-tight'>GrowthAI Marketing Console</span>
              </div>
              
              {/* Content area simulating dashboard */}
              <div className='grid grid-cols-1 md:grid-cols-4 bg-[#0a0a0c] text-zinc-300 min-h-[360px] text-left text-[13px]'>
                {/* Sidebar */}
                <div className='md:col-span-1 border-r border-white/5 bg-white/[0.01] p-4 space-y-4 hidden md:block'>
                  <div className='text-white font-semibold text-[14px] flex items-center gap-2'>
                    <Sparkles size={14} style={{ color: GOLD }} /> GrowthAI Console
                  </div>
                  <div className='space-y-1'>
                    <div className='px-2 py-1.5 rounded-lg bg-white/[0.05] text-white font-medium'>에이전트 제어판</div>
                    <div className='px-2 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors'>프롬프트 요약</div>
                    <div className='px-2 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors'>자동화 워크플로우</div>
                    <div className='px-2 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors'>SEO 분석 리포트</div>
                  </div>
                  <div className='pt-8 text-[11px] text-zinc-600 font-semibold tracking-wider uppercase'>연동된 계정</div>
                  <div className='text-zinc-500 px-2'>James (Free Trial)</div>
                </div>

                {/* Dashboard body */}
                <div className='md:col-span-3 p-6 space-y-6 flex flex-col justify-between'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between border-b border-white/5 pb-3'>
                      <div className='text-[15px] text-white font-bold flex items-center gap-2'>
                        설득 복사 설계기 (Copywriter Agent v1.2)
                      </div>
                      <span className='px-2 py-0.5 rounded-full text-[11px] bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25'>
                        정상 작동 중
                      </span>
                    </div>

                    <div className='bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3 font-mono text-[12px]'>
                      <div className='text-zinc-500'>[System] 12인의 마케팅 거장 설득 공식 불러오는 중...</div>
                      <div className='text-zinc-400'>[Prompt] &ldquo;변하지 않는 구매전환 원리&rdquo; 핵심 헤드카피 생성 요청.</div>
                      <div className='text-zinc-300 pl-4 border-l-2 border-[#C9A84C] py-1 font-sans text-[14px] leading-relaxed'>
                        &ldquo;변하지 않는 구매전환 원리, <span className='text-white font-semibold'>AI로 더 빠르게 실행하세요.</span>&rdquo;
                      </div>
                      <div className='text-zinc-500'>[Output] 헤드라인 생성 성공. 네이버/구글 SEO 키워드 매칭 완료 (점수: 98/100).</div>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center'>
                    <div className='bg-white/[0.01] border border-white/5 rounded-xl p-3'>
                      <div className='text-zinc-500 text-[11px] mb-1'>전환 최적화</div>
                      <div className='text-white font-bold text-[16px]'>+412%</div>
                    </div>
                    <div className='bg-white/[0.01] border border-white/5 rounded-xl p-3'>
                      <div className='text-zinc-500 text-[11px] mb-1'>실행 소요 시간</div>
                      <div className='text-white font-bold text-[16px]'>3.2초</div>
                    </div>
                    <div className='bg-white/[0.01] border border-white/5 rounded-xl p-3'>
                      <div className='text-zinc-500 text-[11px] mb-1'>SEO 매칭도</div>
                      <div className='text-[#C9A84C] font-bold text-[16px]'>98%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Centered Description under mockup */}
            <p className='mx-auto text-zinc-400 text-[17px] md:text-[21px] font-medium leading-relaxed max-w-4xl mt-12 text-center'>
              강력한 그래픽 성능이 요구되는 작업에서도 상상의 나래를 펼치듯, <br className='hidden md:inline' />
              GrowthAI의 자동화 에이전트와 설득 공식 설계기를 통해 <strong className='text-[#f5f5f7] font-semibold'>클릭 몇 번만으로 매출이 나오는 상세페이지와 랜딩 카피를 구현</strong>합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section id='lead-form' className='px-6 py-16 md:py-28 border-b border-white/5 bg-black relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div className='max-w-3xl mx-auto relative'>
          <ScrollReveal blur>
            <div className='text-center mb-10'>
              <p className='apple-eyebrow-gold mb-3 text-[14px] font-semibold tracking-[0.15em]'>무료 PDF 신청</p>
              <h2 className='apple-white-gradient font-bold leading-tight tracking-toss-tight mb-4' style={{ fontSize: 'clamp(28px, 4.5vw, 48px)' }}>
                먼저 받아보고 판단하세요
              </h2>
              <p className='text-zinc-400 text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto'>
                이름과 이메일을 남기면 <strong className='text-white font-semibold'>무료 PDF, 영상 교육, 무료 에이전트 체험 혜택</strong>이 즉시 이메일로 전송됩니다.
              </p>
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'>
              {!submitted ? (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-zinc-500 text-[12px] font-semibold mb-2 ml-1 uppercase tracking-wider'>이름</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder='성함을 입력하세요'
                        className='w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-[15px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300'
                      />
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-zinc-500 text-[12px] font-semibold mb-2 ml-1 uppercase tracking-wider'>이메일</label>
                        <input
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder='PDF를 받을 이메일'
                          type='email'
                          className='w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-[15px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300'
                        />
                      </div>
                      <div>
                        <label className='block text-zinc-500 text-[12px] font-semibold mb-2 ml-1 uppercase tracking-wider'>업종 / 사업 유형 (선택)</label>
                        <input
                          value={form.business}
                          onChange={(e) => setForm({ ...form, business: e.target.value })}
                          placeholder='예: 1인 창업, 요식업, 강의 등'
                          className='w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-[15px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-zinc-500 text-[12px] font-semibold mb-2 ml-1 uppercase tracking-wider'>해결하고 싶은 가장 큰 마케팅 고민</label>
                      <textarea
                        value={form.goal}
                        onChange={(e) => setForm({ ...form, goal: e.target.value })}
                        placeholder='가장 해결하고 싶은 문제점을 한 줄로 적어주세요'
                        rows={3}
                        className='w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-[15px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300 resize-none'
                      />
                    </div>
                  </div>

                  {error ? <p className='text-red-400 text-[13px] leading-relaxed'>{error}</p> : null}
                  
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-[15px] cursor-pointer border-none disabled:opacity-70 bg-[#C9A84C] text-[#0a0a0a] hover:bg-[#D4BA6A] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.2)]'
                  >
                    {loading ? '정보 저장 중...' : '무료 PDF 가이드북 즉시 받기'} <Mail size={16} />
                  </button>
                  
                  <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-[12px] text-zinc-500'>
                    <span className='flex items-center gap-1.5'><Sparkles size={12} style={{ color: GOLD }} /> 거장 12인의 한국형 원리</span>
                    <span className='flex items-center gap-1.5'><Sparkles size={12} style={{ color: GOLD }} /> 3일 완성 실전 영상 강의</span>
                    <span className='flex items-center gap-1.5'><Sparkles size={12} style={{ color: GOLD }} /> 즉시 사용 가능한 복붙용 템플릿</span>
                  </div>
                </form>
              ) : (
                <div className='text-center py-8'>
                  <div className='w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/10' style={{ backgroundColor: 'rgba(201,168,76,0.08)', color: GOLD }}>
                    <Shield size={36} />
                  </div>
                  <h2 className='apple-white-gradient font-bold leading-tight tracking-toss-tight mb-4' style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
                    요청이 정상 접수되었습니다
                  </h2>
                  <p className='text-zinc-400 text-[15px] sm:text-[16px] leading-relaxed mb-8 max-w-md mx-auto'>
                    입력하신 이메일로 가이드북이 발송되었습니다. <br />
                    이제 영상 교육과 무료 에이전트 체험을 시작해 보세요.
                  </p>
                  <div className='flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto'>
                    <button
                      onClick={() => navigate('/guide/day1')}
                      className='w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-[14px] cursor-pointer border-none bg-[#C9A84C] text-[#0a0a0a] hover:bg-[#D4BA6A] transition-all duration-300'
                    >
                      영상 교육으로 이동 <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => navigate('/agents/free-trial')}
                      className='w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-[14px] cursor-pointer border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] transition-all duration-300'
                    >
                      무료 에이전트 체험 <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='문제 제기'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>AI는 많이 써봤는데,<br className='hidden md:inline' /> 왜 매출은 그대로일까요?</h2>}
            subtitle={
              <p className='text-zinc-400 text-[16px] md:text-[21px] font-medium leading-relaxed max-w-3xl mx-auto mt-6'>
                사이트도 만들고, 영상도 만들고, 글도 써봤지만 <strong className='text-white font-semibold'>실제로 문의가 늘지 않거나 결제로 이어지지 않는 경우</strong>가 많습니다.
              </p>
            }
            center
          />
          <StaggerReveal className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16' staggerDelay={0.08}>
            {[
              { title: '만들었는데 안 팔림', desc: '고객을 끌어당기는 설득 구조가 빠진 예쁜 사이트는 제 역할을 하지 못합니다. 팔리는 구조를 먼저 세워야 합니다.' },
              { title: '검색 유입이 약함', desc: '단순한 글쓰기는 묻힙니다. 사람과 검색봇(Google/Naver)이 모두 신뢰하고 좋아하는 검색 친화적 구조가 필요합니다.' },
              { title: '영상은 있는데 전환이 없음', desc: '조회수가 매출로 연결되지 않는 이유는 교육과 판매 사이를 자연스럽게 이어주는 신뢰 빌드업 흐름이 없기 때문입니다.' },
              { title: 'AI는 썼지만 결과가 없음', desc: '질문 몇 번 해보는 도구 학습은 끝났습니다. 이제 실전 비즈니스를 움직이는 정밀한 프롬프트 엔지니어링이 작동해야 합니다.' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className='h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-8 text-center transition-all duration-300'>
                  <h3 className='text-white font-bold text-[18px] md:text-[20px] mb-3'>{item.title}</h3>
                  <p className='text-zinc-400 text-[14px] md:text-[15px] leading-relaxed'>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='해결 제시'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>답은 더 많은 AI가 아니라,<br className='hidden md:inline' /> 더 잘 팔리는 구조입니다.</h2>}
            subtitle={
              <p className='text-zinc-400 text-[16px] md:text-[21px] font-medium leading-relaxed max-w-3xl mx-auto mt-6'>
                우리는 AI 사용법보다 먼저, 고객의 관심을 끌고 신뢰를 만들고 행동으로 이어지게 하는 <strong className='text-[#C9A84C] font-semibold'>구매전환 구조를 정밀 설계</strong>합니다.
              </p>
            }
            center
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-16'>
            {[
              { title: '설득 구조를 먼저 잡는다', desc: '12인의 설득 거장 공식을 기반으로 고객 심리를 관통하는 세일즈 카피와 흐름을 구축합니다.' },
              { title: '랜딩페이지에 바로 꽂는다', desc: '방문자가 다른 데로 눈을 돌리지 않도록, 한 화면에서 가치 제안과 가입을 완벽히 매칭합니다.' },
              { title: '블로그를 검색 허브로 만든다', desc: '검색 엔진 최적화(SEO)를 통해 광고비 없이도 잠재 고객이 스스로 찾아오는 선순환 유입을 만듭니다.' },
              { title: '영상으로 이해와 체류를 만든다', desc: '단순 텍스트 설명보다 10배 긴 체류 시간과 깊은 공감을 유도해 확실한 브랜딩을 실현합니다.' },
            ].map((item) => (
              <div key={item.title} className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-white/15 transition-all duration-300'>
                <div className='w-10 h-10 rounded-full mb-4 flex items-center justify-center border border-[#C9A84C]/20 bg-[#C9A84C]/5 mx-auto text-[#C9A84C]'>
                  <Target size={18} />
                </div>
                <h4 className='text-white font-bold text-[16px] md:text-[18px] mb-2'>{item.title}</h4>
                <p className='text-zinc-400 text-[13px] md:text-[14px] leading-relaxed'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='신뢰 증거'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>이 구조는 감이 아니라,<br className='hidden md:inline' /> 검증된 원리 위에서 만듭니다.</h2>}
            subtitle={
              <p className='text-zinc-400 text-[16px] md:text-[21px] font-medium leading-relaxed max-w-3xl mx-auto mt-6'>
                12명의 마케팅 거장들이 반복해서 써온 <strong className='text-white font-semibold'>공개된 설득 원리</strong>와 Google, Naver <strong className='text-white font-semibold'>공식 검색 가이드를 함께 반영</strong>합니다.
              </p>
            }
            center
          />
          <StaggerReveal className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16' staggerDelay={0.08}>
            {TRUST_POINTS.map((item) => (
              <StaggerItem key={item.title}>
                <div className='h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-8 text-center transition-all duration-300'>
                  <h3 className='text-white font-bold text-[18px] md:text-[20px] mb-3'>{item.title}</h3>
                  <p className='text-zinc-400 text-[14px] md:text-[15px] leading-relaxed'>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='무료 PDF 구성'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>받는 즉시 바로 쓸 수 있게 만들었습니다</h2>}
            subtitle={
              <p className='text-zinc-400 text-[16px] md:text-[21px] font-medium leading-relaxed max-w-3xl mx-auto mt-6'>
                이론만 모으지 않고, 랜딩·블로그·영상·에이전트에 <strong className='text-white font-semibold'>바로 넣을 수 있는 실전 템플릿 형태로 제공</strong>합니다.
              </p>
            }
            center
          />
          <StaggerReveal className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16' staggerDelay={0.08}>
            {PDF_ITEMS.map((item) => (
              <StaggerItem key={item.title}>
                <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-8 text-center h-full transition-all duration-300'>
                  <div className='w-12 h-12 rounded-full flex items-center justify-center border border-[#C9A84C]/20 bg-[#C9A84C]/5 mx-auto text-[#C9A84C] mb-5'>
                    <BookOpen size={20} />
                  </div>
                  <h3 className='text-white font-bold text-[18px] md:text-[20px] mb-3'>{item.title}</h3>
                  <p className='text-zinc-400 text-[14px] md:text-[15px] leading-relaxed'>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section id='video-curriculum' className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='영상 교육'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>무료 PDF 다음은 영상으로 이해시키겠습니다</h2>}
            subtitle={
              <p className='text-zinc-400 text-[16px] md:text-[21px] font-medium leading-relaxed max-w-3xl mx-auto mt-6'>
                왜 이 구조가 한국 고객에게 먹히는지, <strong className='text-[#C9A84C] font-semibold'>실제 적용되는 생생한 예시</strong>로 확인해 보세요.
              </p>
            }
            center
          />
          <StaggerReveal className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-16' staggerDelay={0.08}>
            {VIDEO_STEPS.map((chapter) => (
              <StaggerItem key={chapter.no}>
                <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-8 text-center h-full transition-all duration-300'>
                  <p className='text-[13px] md:text-[14px] tracking-[0.2em] font-semibold mb-3' style={{ color: GOLD }}>CHAPTER {chapter.no}</p>
                  <h3 className='text-white font-bold text-[17px] md:text-[19px] mb-3'>{chapter.title}</h3>
                  <p className='text-zinc-400 text-[13px] md:text-[14px] leading-relaxed'>{chapter.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
          
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-12'>
            <button
              onClick={() => navigate('/guide/day1')}
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border-none bg-[#C9A84C] text-[#0a0a0a] hover:bg-[#D4BA6A] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
            >
              영상 교육으로 이동 <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/agents/free-trial')}
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
            >
              무료 에이전트 체험 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='이런 분께 맞습니다'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>한국 1인 창업가와 소상공인을 기준으로 만들었습니다</h2>}
            center
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-16'>
            {AUDIENCE_ITEMS.map((item) => (
              <div key={item} className='rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-6 text-center text-zinc-300 font-semibold text-[15px] md:text-[17px] leading-relaxed transition-all duration-300'>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-5xl mx-auto text-center'>
          <SectionTitle
            eyebrow='전환 흐름'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>무료 PDF에서 월 구독까지 자연스럽게 이어집니다</h2>}
            subtitle={
              <p className='text-zinc-400 text-[16px] md:text-[21px] font-medium leading-relaxed max-w-3xl mx-auto mt-6'>
                먼저 배우고, 써보고, 익숙해지면 결제하는 <strong className='text-white font-semibold'>합리적인 신뢰 중심의 세일즈 퍼널</strong>로 설계합니다.
              </p>
            }
            center
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16'>
            {[
              { title: '1. 무료 PDF', desc: '거장 원리와 한국형 적용 예시를 먼저 받습니다.' },
              { title: '2. 영상 교육', desc: '실제 적용 방법을 영상으로 쉽게 이해합니다.' },
              { title: '3. 무료 체험', desc: '자동화 에이전트를 직접 써보며 결과를 확인합니다.' },
              { title: '4. 월 구독', desc: '필요하면 더 쉽게, 더 빠르게 계속 사용합니다.' },
            ].map((step) => (
              <div key={step.title} className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-white/15 transition-all duration-300'>
                <div className='w-10 h-10 rounded-full mb-4 flex items-center justify-center border border-[#C9A84C]/20 bg-[#C9A84C]/5 mx-auto text-[#C9A84C]'>
                  <Target size={16} />
                </div>
                <h3 className='text-white font-bold text-[16px] mb-2'>{step.title}</h3>
                <p className='text-zinc-400 text-[14px] leading-relaxed'>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-6 py-20 md:py-32 border-b border-white/5 bg-black'>
        <div className='max-w-4xl mx-auto text-center'>
          <SectionTitle
            eyebrow='FAQ'
            title={<h2 className='apple-white-gradient font-bold tracking-tight leading-[1.08]' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>자주 묻는 질문</h2>}
            center
          />
          <div className='mt-16 space-y-4 max-w-3xl mx-auto text-left'>
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 hover:border-white/12 transition-all duration-300'>
                <p className='text-white font-bold text-[16px] md:text-[18px] mb-3'>{item.q}</p>
                <p className='text-zinc-400 text-[14px] md:text-[15px] leading-relaxed'>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='relative py-24 md:py-36 px-6 text-center overflow-hidden bg-black border-t border-white/5'>
        <div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)' }} />
        <div className='relative max-w-4xl mx-auto'>
          <ScrollReveal blur>
            <h2 className='apple-white-gradient font-bold leading-tight tracking-toss-tight mb-6' style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}>
              지금 필요한 건 더 많은 정보가 아니라,<br />
              <span className='apple-gold-gradient font-bold'>바로 팔리는 구조</span>입니다
            </h2>
            <p className='text-zinc-400 text-[16px] md:text-[21px] leading-relaxed max-w-2xl mx-auto mb-12'>
              먼저 무료 PDF로 시작하고, 영상으로 이해하고, <br className='hidden sm:inline' />
              무료 체험과 월 구독으로 비즈니스 전환을 시작하세요.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border-none bg-[#C9A84C] text-[#0a0a0a] hover:bg-[#D4BA6A] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.25)]'
              >
                무료 PDF 받기 <Download size={16} />
              </button>
              <button
                onClick={() => navigate('/agents/free-trial')}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] cursor-pointer border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
              >
                무료 에이전트 체험 <ArrowRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
