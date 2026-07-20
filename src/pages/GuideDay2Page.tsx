import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from '../components/ScrollReveal';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { PLCVideoPlayer } from '../components/PLCVideoPlayer';

const GOLD = '#C9A84C';

const SUCCESS_CARDS = [
  { name: '박○○', before: '월 매출 0원 · SNS 팔로워 200명', after: '첫 판매 ₩1,970,000 · 2주 만에' },
  { name: '이○○', before: '오프라인 학원, 온라인 판매 경험 전무', after: '수강생 3배 증가 · 8주 만에' },
  { name: '최○○', before: '직장인, 부업 시작도 못한 상태', after: '첫 런칭 ₩8,900,000 · 4주 만에' },
];

export default function GuideDay2Page() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      <Seo
        title="DAY2 영상 — 5일 무료 강의 | GrowthAI"
        description="어떤 상품이든 팔리게 만드는 오퍼 공식을 공개합니다."
        canonical="/guide/day2"
        image={DEFAULT_OG_IMAGE}
        keywords={['5일 무료 강의', 'DAY2', 'AI 마케팅']}
        siteName={SITE_NAME}
      />

      <section className="relative overflow-hidden border-b border-white/5 px-6 py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 55%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal blur>
            <p className="text-[11px] font-extrabold tracking-[0.28em] uppercase mb-4" style={{ color: GOLD }}>DAY2 · 전환</p>
            <h1 className="apple-white-gradient font-extrabold leading-[1.2] tracking-toss mb-4" style={{ fontSize: 'clamp(26px, 5vw, 46px)' }}>
              어떤 상품이든 팔리게 만드는<br /><span className="apple-gold-gradient">오퍼 공식</span>을 공개합니다
            </h1>
            <p className="text-white/50 text-[14px] sm:text-[16px] mb-10">재생 시간 15분</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <PLCVideoPlayer label="DAY2 · 전환" title="Claude로 실시간 오퍼 만드는 법" duration="15:00" />
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow="성공 사례"
            title={<h2 className="apple-white-gradient font-extrabold tracking-tight leading-[1.15]" style={{ fontSize: 'clamp(24px, 4.5vw, 40px)' }}>Before → After</h2>}
            center
          />
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12" staggerDelay={0.1}>
            {SUCCESS_CARDS.map((c) => (
              <StaggerItem key={c.name}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
                  <p className="text-white font-bold text-[15px]">{c.name}</p>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-xl bg-white/[0.02] border border-white/8 p-3.5">
                      <p className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-white/30 mb-1.5">BEFORE</p>
                      <p className="text-white/55 text-[13px] leading-relaxed">{c.before}</p>
                    </div>
                    <div className="flex justify-center text-white/20 text-[12px]">↓</div>
                    <div className="rounded-xl p-3.5" style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
                      <p className="text-[10px] font-extrabold tracking-[0.15em] uppercase mb-1.5" style={{ color: GOLD }}>AFTER</p>
                      <p className="text-white/85 text-[13px] leading-relaxed font-semibold">{c.after}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.2} className="mt-12 text-center">
            <p className="text-white/70 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              "DAY3 영상에서 실제 수강생이 첫 달 <strong style={{ color: GOLD }}>₩42,000,000</strong> 번 비밀을 공개합니다"
            </p>
            <button
              onClick={() => navigate('/guide/day3')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border-none"
              style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
            >
              DAY3 보러가기 <ArrowRight size={16} />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
