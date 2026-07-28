import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const PROFESSIONS = [
  '변호사', '의사/약사', '헬스트레이너', '프로골퍼', '마사지/테라피스트', 
  '인테리어/설비', '네트워크 마케터', '지식 강사/코치', '1인 전문 서비스'
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
        title="GrowthAI — 2026 대한민국 AI 자동 세일즈 퍼널"
        description="변호사, 의사, 트레이너, 인테리어 등 노하우를 가진 누구나 {00} 입력으로 24시간 자동 판매 시스템 구축"
        canonical="/experimental"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#07090E] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* HERO SECTION */}
        <section ref={heroRef} className="relative pt-36 pb-24 px-4 sm:px-6 overflow-hidden">
          {/* 배경 아우라 그라데이션 */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C9A84C]/10 rounded-full blur-[140px] pointer-events-none" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-4xl mx-auto text-center relative z-10">
            
            {/* 뱃지 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs sm:text-sm font-semibold mb-8 shadow-[0_0_15px_rgba(201,168,76,0.15)]"
            >
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              <span>2026 대한민국 12인 거장 프레임워크 × AI 세일즈 배관</span>
            </motion.div>

            {/* 메인 두괄식 헤드라인 */}
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.2] mb-6 break-keep tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              결론부터 말씀드립니다:<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
                내 노하우를 24시간 파는 [자동 세일즈 퍼널]부터 만드세요.
              </span>
            </motion.h1>

            {/* 설명 카피 */}
            <motion.p
              className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed break-keep max-w-2xl mx-auto font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              상세페이지 글귀 100번 고치는 것은 매출에 아무 도움이 안 됩니다.<br />
              <strong className="text-white font-semibold">{`"{내 업종/서비스명}"`} 1개만 넣으면 3초 만에 세일즈 스크립트와 배관이 완성되는 마스터 골조 프롬프트</strong>로 내 사업에 24시간 파이프라인을 탑재하세요.
            </motion.p>

            {/* 적용 가능 업종 태그 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto"
            >
              {PROFESSIONS.map((p) => (
                <span key={p} className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-white/80 hover:border-[#C9A84C]/40 transition-colors">
                  ✓ {p}
                </span>
              ))}
            </motion.div>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <button
                onClick={() => navigate('/experimental/diagnose')}
                className="w-full px-8 py-4.5 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition-all duration-200 shadow-[0_0_25px_rgba(201,168,76,0.3)] flex items-center justify-center gap-2 group cursor-pointer border-none"
              >
                <span>3분 무료 진단 & 특강 문자로 받기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <p className="text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              신청 즉시 문자로 10분 마스터클래스 특강과 PDF 가이드북이 발송됩니다.
            </p>
          </motion.div>
        </section>

        {/* 3가지 핵심 시스템 정돈 카드 */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#07090E] via-white/[0.02] to-[#07090E] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">SYSTEM ARCHITECTURE</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                GrowthAI가 제공하는 3단계 세일즈 파이프라인
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 카드 1 */}
              <div className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#C9A84C]/40 transition-all shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center font-bold text-lg mb-6">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">물고기 잡는 법 (VOD)</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    제프 워커 PLF + 12인 거장의 세일즈 퍼널을 AI 에이전트로 직접 만들고 다듬는 실전 노하우 완전 전수.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#C9A84C] font-semibold">
                  <Award className="w-4 h-4" /> 실전 VOD 4모듈
                </div>
              </div>

              {/* 카드 2 - 강조 */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#C9A84C]/15 via-black/80 to-black border-2 border-[#C9A84C] shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-bold text-[10px] px-3 py-1 rounded-bl-lg">
                  핵심 핑거팁 무기
                </div>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C] text-black flex items-center justify-center font-extrabold text-lg mb-6 shadow-lg shadow-[#C9A84C]/30">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{`"{00}"`} 골조 프롬프트</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    초보/연로자도 100% 실행 가능! 내 서비스/업종명 하나만 괄호에 입력하면 3초 만에 스크립트 자동 완출.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#C9A84C]/30 flex items-center gap-1.5 text-xs text-[#C9A84C] font-bold">
                  <Zap className="w-4 h-4" /> 3초 완성 프롬프트 제공
                </div>
              </div>

              {/* 카드 3 */}
              <div className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#C9A84C]/40 transition-all shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center font-bold text-lg mb-6">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">24시간 자동 세일즈 배관</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    DB 수집 ➔ 문자/알림톡 숏링크 ➔ VOD 릴리즈 ➔ 카운트다운 결제창까지 유연하게 연결되는 완전 자동화 구축.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#C9A84C] font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> 문자/카톡 퍼널 연동
                </div>
              </div>
            </div>

            {/* 사업 경계선 안내 */}
            <div className="mt-10 text-center text-xs text-white/50 bg-white/[0.02] p-5 rounded-2xl border border-white/10 max-w-3xl mx-auto leading-relaxed">
              💡 <strong>시스템 운영 경계선 안내</strong>: 외부 SNS 유료 광고 및 홍보 마케팅 집행은 수강생 본인의 영역이며, 저희는 잠재고객이 수집되었을 때 24시간 자동으로 예열하고 결제까지 이끄는 <strong>온라인 자동 세일즈 시스템 구축을 완성</strong>해 드립니다.
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer lang="ko" />
      </div>
    </>
  );
}
