import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const PROFESSIONS = [
  '변호사', '의사/약사', '헬스트레이너', '골프 프로', '마사지/테라피스트', 
  '인테리어/설비 전문가', '네트워크 마케터', '지식 강사/코치', '1인 전문 서비스'
];

export default function MainLandingPageExp() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Seo
        title="GrowthAI — 3시간 만에 구축하는 업종별 AI 자동 세일즈 퍼널"
        description="변호사, 의사, 트레이너, 인테리어, 강사 등 노하우를 가진 누구나 {00} 입력으로 24시간 자동 판매 시스템 구축"
        canonical="/experimental"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#0A0D14] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        {/* HERO SECTION - 한국형 두괄식 (결론 우선) 카피 */}
        <section ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-4xl mx-auto text-center relative z-10">
            
            {/* 뱃지 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs sm:text-sm font-semibold mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              2026 대한민국 12인 거장 프레임워크 × AI 자동 세일즈 파이프라인
            </motion.div>

            {/* 메인 두괄식 헤드라인 (결론부터 제시) */}
            <motion.h1
              className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.2] mb-6 break-keep"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
            >
              결론부터 말씀드립니다:<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                내 노하우를 24시간 자동 판매하는 [온라인 세일즈 퍼널]부터 구축하세요.
              </span>
            </motion.h1>

            {/* 설명 카피 */}
            <motion.p
              className="text-white/60 text-base sm:text-lg mb-8 leading-relaxed break-keep max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              글귀 몇 줄 고치는 것은 매출에 아무 도움이 안 됩니다.<br />
              <strong>{`{내 업종/서비스명}`}만 넣으면 3초 만에 런치 스크립트와 자동 세일즈 배관이 완출되는 마스터 골조 프롬프트</strong>로 내 노하우를 24시간 파는 퍼널 시스템을 완성해 드립니다.
            </motion.p>

            {/* 적용 가능 업종 수평 롤링 뱃지 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto"
            >
              {PROFESSIONS.map((p) => (
                <span key={p} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                  ✓ {p}
                </span>
              ))}
            </motion.div>

            {/* 3분 진단 및 특강 문자 신청 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <button
                onClick={() => navigate('/experimental/diagnose')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition-all duration-200 shadow-xl shadow-[#C9A84C]/25 flex items-center justify-center gap-2"
              >
                <span>3분 무료 진단 & 특강 문자로 즉시 받기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <p className="text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              신청 즉시 문자로 10분 마스터클래스 특강과 PDF 가이드북이 발송됩니다.
            </p>
          </motion.div>
        </section>

        {/* 3가지 핵심 시스템 경계선 정의 */}
        <section className="py-16 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-10">
              GrowthAI가 책임지고 구축해 드리는 영역
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold text-white mb-2">물고기 잡는 법 (VOD)</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  제프 워커 PLF + 12인 거장의 세일즈 퍼널을 AI 에이전트로 직접 만드는 핵심 노하우 전수.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/40">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C] text-black flex items-center justify-center font-extrabold mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{`{00}`} 입력 프롬프트</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  초보/연로자를 위한 핑거팁 무기! 내 서비스명만 괄호에 넣으면 3초 만에 스크립트 완출.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold text-white mb-2">24시간 자동 세일즈 배관</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  DB 수집 ➔ 문자/알림톡 숏링크 ➔ VOD 릴리즈 ➔ 카운트다운 결제창까지 자동화 세팅 완결.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-white/40 bg-white/5 p-4 rounded-xl border border-white/10">
              ※ SNS 유료 광고 및 외부 홍보 집행은 대표님의 몫이며, 저희는 고객이 들어왔을 때 24시간 자동으로 수집·예열·결제시키는 <strong>최상위 세일즈 퍼널 배관 구축까지 완전 보장</strong>합니다.
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer lang="ko" />
      </div>
    </>
  );
}
