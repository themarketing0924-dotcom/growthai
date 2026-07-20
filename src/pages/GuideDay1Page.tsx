import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { PLCVideoPlayer } from '../components/PLCVideoPlayer';

const GOLD = '#C9A84C';

export default function GuideDay1Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = (location.state as { name?: string } | null)?.name || '회원';

  return (
    <div className='bg-black text-white selection:bg-white selection:text-black min-h-screen' style={{ fontFamily: 'var(--font-sans)' }}>
      <Seo
        title='영상 교육 1 | 변하지 않는 구매전환 원리'
        description='무료 PDF 다음 단계로, 랜딩과 콘텐츠에 바로 넣는 영상 교육입니다.'
        canonical='/guide/day1'
        image={DEFAULT_OG_IMAGE}
        keywords={['영상 교육', '구매전환 구조', 'AI 마케팅', 'GrowthAI']}
        siteName={SITE_NAME}
      />

      <section className='relative overflow-hidden border-b border-white/5 px-6 py-14 md:py-20'>
        <div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 55%)' }} />
        <div className='relative max-w-3xl mx-auto text-center'>
          <ScrollReveal blur>
            <p className='text-[11px] font-extrabold tracking-[0.28em] uppercase mb-4' style={{ color: GOLD }}>
              무료 PDF 신청 완료
            </p>
            <h1 className='apple-white-gradient font-extrabold leading-[1.2] tracking-toss mb-4' style={{ fontSize: 'clamp(26px, 5vw, 46px)' }}>
              {name}님, 이제부터는<br />
              <span className='apple-gold-gradient'>팔리는 구조</span>를 영상으로 보겠습니다.
            </h1>
            <p className='text-white/50 text-[14px] sm:text-[16px] mb-10'>재생 시간 12분</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <PLCVideoPlayer label='영상 1 · 구조 이해' title='AI보다 먼저 봐야 하는 구매전환 구조' duration='12:00' />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className='mt-10 flex flex-col gap-3'>
            <div className='rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex items-center gap-3 text-left'>
              <MessageCircle size={18} style={{ color: GOLD }} className='shrink-0' />
              <p className='text-white/60 text-[13px] sm:text-[14px] leading-relaxed'>
                이 영상은 랜딩, 블로그, 영상, 에이전트에 바로 적용할 수 있게 만든 실전 설명입니다.
              </p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex items-center gap-3 text-left'>
              <Mail size={18} style={{ color: GOLD }} className='shrink-0' />
              <p className='text-white/60 text-[13px] sm:text-[14px] leading-relaxed'>
                이후에는 무료 체험과 월 구독으로 이어지는 사용 흐름을 확인하시면 됩니다.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className='mt-10 flex flex-col sm:flex-row justify-center gap-3'>
            <button
              onClick={() => navigate('/agents/free-trial')}
              className='inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border-none'
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
            >
              무료 에이전트 체험 <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/guide')}
              className='inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border border-white/15 bg-transparent text-white/80'
            >
              무료 PDF 다시 보기 <ArrowRight size={16} />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
