import { motion } from 'framer-motion';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const partners = [
  { name: 'ElevenLabs', category: 'AI 보이스', desc: 'AI 음성 생성 툴 — 수강생 할인 코드 제공', discount: '20% 할인', icon: '🎙️', url: '#' },
  { name: 'CapCut Pro', category: '영상 편집', desc: '영상 AI 편집 툴 — 수강생 전용 Pro 요금제 할인', discount: '30% 할인', icon: '🎬', url: '#' },
  { name: 'N8N Cloud', category: '자동화', desc: '자동화 플랫폼 — 무료 트라이얼 + 추가 크레딧', discount: '1개월 무료', icon: '⚙️', url: '#' },
  { name: 'Midjourney', category: 'AI 이미지', desc: 'AI 이미지 생성 — 수강생 전용 그룹 서버 접속', discount: '그룹 접속권', icon: '🖼️', url: '#' },
  { name: 'Notion', category: '문서·기획', desc: 'AI 문서 관리 툴 — Notion AI 플랜 할인', discount: '50% 할인', icon: '📝', url: '#' },
  { name: 'Canva Pro', category: '디자인', desc: '온라인 디자인 툴 — 수강생 1년 Pro 할인', discount: '40% 할인', icon: '🎨', url: '#' },
];

const affiliateSteps = [
  { num: '01', title: '파트너 신청', desc: 'GrowthAI 수강 후 파트너 신청서를 제출하세요.' },
  { num: '02', title: '전용 링크 발급', desc: '수강생·지인 소개용 개인 추적 링크가 발급됩니다.' },
  { num: '03', title: '공유하고 수익 창출', desc: 'SNS, 블로그, 유튜브 어디서든 공유하세요.' },
  { num: '04', title: '수익 정산', desc: '매월 15일 실적 정산 후 익월 말 지급됩니다.' },
];

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <Seo
        title="제휴 서비스 | GrowthAI"
        description="수강생 전용 할인 혜택과 파트너 프로그램을 안내하는 제휴 페이지입니다."
        canonical="/partner"
        image={DEFAULT_OG_IMAGE}
        keywords={['제휴', '파트너 프로그램', '할인 혜택', 'GrowthAI']}
      />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">PARTNER & AFFILIATE</p>
          <h1 className="text-white font-extrabold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            제휴 서비스
          </h1>
          <p className="text-white/50 text-[16px] mt-3 max-w-xl leading-relaxed">
            수강생 전용 할인 혜택과 GrowthAI 파트너 프로그램으로 추가 수익을 창출하세요
          </p>
        </motion.div>

        {/* Partner tools */}
        <section className="mb-20">
          <h2 className="text-white text-[20px] font-bold mb-6 border-b border-white/10 pb-4">🛠️ 수강생 전용 툴 할인 혜택</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[32px]">{p.icon}</span>
                  <span className="text-[11px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-0.5 rounded-full">
                    {p.discount}
                  </span>
                </div>
                <div>
                  <p className="text-white/30 text-[11px] uppercase tracking-widest font-semibold mb-1">{p.category}</p>
                  <h3 className="text-white font-bold text-[17px]">{p.name}</h3>
                  <p className="text-white/50 text-[13px] mt-1.5 leading-relaxed">{p.desc}</p>
                </div>
                <a
                  href={p.url}
                  className="mt-auto w-full py-2.5 border border-white/15 rounded-xl text-white/70 text-[13px] font-medium text-center hover:bg-white/5 hover:text-white transition-all cursor-pointer no-underline block"
                >
                  할인 코드 받기 →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Affiliate program */}
        <section className="mb-16">
          <h2 className="text-white text-[20px] font-bold mb-4 border-b border-white/10 pb-4">💰 GrowthAI 제휴 파트너 프로그램</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { label: '수익 쉐어율', value: '30%', desc: '결제 금액의 30% 지급' },
              { label: '평균 월 수익', value: '₩580K', desc: '활성 파트너 평균 수익' },
              { label: '현재 파트너 수', value: '240+', desc: '수익 창출 중인 파트너' },
            ].map((s) => (
              <div key={s.label} className="border border-white/10 rounded-xl p-6 text-center bg-white/[0.02]">
                <div className="text-white text-[28px] font-extrabold">{s.value}</div>
                <div className="text-white/30 text-[12px] mt-1">{s.label}</div>
                <div className="text-white/50 text-[13px] mt-1">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {affiliateSteps.map((s, i) => (
              <motion.div
                key={s.num}
                className="flex items-start gap-4 border border-white/10 rounded-xl p-5 bg-white/[0.02]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <span className="text-white/20 text-[24px] font-extrabold shrink-0">{s.num}</span>
                <div>
                  <h4 className="text-white font-bold text-[15px] mb-1">{s.title}</h4>
                  <p className="text-white/50 text-[13px] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-white text-black text-[15px] font-bold rounded-full hover:bg-white/90 transition-all border-none cursor-pointer">
              🤝 파트너 신청하기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
