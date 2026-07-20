import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bell } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { PLCVideoPlayer } from '../components/PLCVideoPlayer';

const GOLD = '#C9A84C';

const STORIES = [
  { name: '박○○', role: '30대, 프리랜서 디자이너', result: '월 ₩6,800,000' },
  { name: '이○○', role: '40대, 오프라인 학원장', result: '온라인 전환 후 수강생 3배' },
  { name: '최○○', role: '20대, 직장인 부업', result: '첫 런칭 ₩8,900,000' },
];

export default function GuideDay3Page() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      <Seo
        title="DAY3 영상 — 5일 무료 강의 | GrowthAI"
        description="광고 없이, 잠자는 동안에도 판매가 되는 자동화 구조를 공개합니다."
        canonical="/guide/day3"
        image={DEFAULT_OG_IMAGE}
        keywords={['5일 무료 강의', 'DAY3', 'AI 마케팅 자동화']}
        siteName={SITE_NAME}
      />

      <section className="relative overflow-hidden border-b border-white/5 px-6 py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 55%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal blur>
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-4" style={{ color: GOLD }}>DAY3 · 소유 경험</p>
            <h1 className="apple-white-gradient font-extrabold leading-[1.2] tracking-toss mb-4" style={{ fontSize: 'clamp(26px, 5vw, 46px)' }}>
              오늘이 마지막 무료 강의입니다.<br /><span className="apple-gold-gradient">모든 것을 자동화</span>하는 방법을 보여드립니다
            </h1>
            <p className="text-white/50 text-[14px] sm:text-[16px] mb-10">재생 시간 18분</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <PLCVideoPlayer label="DAY3 · 소유 경험" title="광고 없이, 잠자는 동안에도 팔리는 구조" duration="18:00" />
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            eyebrow="성공 스토리"
            title={<h2 className="apple-white-gradient font-extrabold tracking-tight leading-[1.15]" style={{ fontSize: 'clamp(24px, 4.5vw, 40px)' }}>이미 결과를 만든 사람들</h2>}
            center
          />
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12" staggerDelay={0.1}>
            {STORIES.map((s) => (
              <StaggerItem key={s.name}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center flex flex-col gap-3">
                  <p className="text-white font-bold text-[16px]">{s.name}</p>
                  <p className="text-white/45 text-[13px]">{s.role}</p>
                  <p className="font-extrabold text-[18px] mt-2" style={{ color: GOLD }}>{s.result}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="rounded-2xl p-7 mb-8 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <Bell size={18} style={{ color: GOLD }} className="shrink-0" />
              <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed">
                🔔 DAY5에 특별한 발표가 있습니다. 꼭 확인하세요.
              </p>
            </div>
            <button
              onClick={() => navigate('/guide/offer')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border-none"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
            >
              DAY5 특별 발표 보러가기 <ArrowRight size={16} />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
