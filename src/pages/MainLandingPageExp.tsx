import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';
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
        title="GrowthAI — 애플 스타일 2026 AI 자동 세일즈 퍼널"
        description="변호사, 의사, 트레이너, 인테리어 등 노하우를 가진 누구나 {00} 입력으로 24시간 자동 판매 시스템 구축"
        canonical="/experimental"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* HERO SECTION - 애플 스타일 중앙 축 완벽 대칭 */}
        <section ref={heroRef} className="relative pt-36 pb-24 px-4 sm:px-6 overflow-hidden">
          {/* 배경 조명 효과 */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C9A84C]/10 rounded-full blur-[150px] pointer-events-none" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-4xl mx-auto text-center relative z-10">
            
            {/* 애플 캡슐 뱃지 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#C9A84C] text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              <span>성능 : 2026 대한민국 12인 거장 프레임워크 × AI</span>
            </motion.div>

            {/* 거대한 타이틀 (Apple H1 Style) */}
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.12] mb-6 break-keep tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              결론부터 말씀드립니다.<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                24시간 자동 세일즈 퍼널부터 만드세요.
              </span>
            </motion.h1>

            {/* 스탯 강조 - 애플 스타일 스피드 강조 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="my-6 text-xl sm:text-2xl font-bold text-[#C9A84C]"
            >
              기존 마케팅 대비 <span className="text-white underline decoration-[#C9A84C]">최대 8배 더 빠른 AI 구축 성능</span>
            </motion.div>

            {/* 본문 설명문 (애플 하이라이트 스타일) */}
            <motion.p
              className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed break-keep max-w-2xl mx-auto font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              상세페이지 글귀를 100번 고치는 것은 의미가 없습니다. <strong className="text-white font-bold">{`"{내 업종/서비스명}"`} 1개만 입력하면 3초 만에 스크립트가 완출되는 마스터 골조 프롬프트</strong>로 내 비즈니스에 획기적인 자동화 배관을 구축하세요.
            </motion.p>

            {/* 적용 가능 업종 칩 뱃지 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto"
            >
              {PROFESSIONS.map((p) => (
                <span key={p} className="px-3.5 py-1.5 rounded-full bg-[#161617] border border-white/10 text-xs font-medium text-white/80">
                  ✓ {p}
                </span>
              ))}
            </motion.div>

            {/* 애플 캡슐 버튼 (CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <button
                onClick={() => navigate('/experimental/diagnose')}
                className="w-full px-8 py-4.5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition-all duration-200 shadow-2xl shadow-[#C9A84C]/30 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <span>3분 무료 진단 & 특강 문자로 받기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <p className="text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              신청 즉시 문자로 10분 마스터클래스 특강과 PDF 가이드북이 발송됩니다.
            </p>
          </motion.div>
        </section>

        {/* 2열 대칭 애플 카드 섹션 (Apple Dual Cards) */}
        <section className="py-20 px-4 sm:px-6 bg-[#000000] border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">SYSTEM ARCHITECTURE</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                GrowthAI 3단계 세일즈 파이프라인
              </h2>
            </div>

            {/* 애플 스타일 2열 대칭 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* 카드 1 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#161617] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
                <div>
                  <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">MODULE 01</span>
                  <h3 className="text-2xl font-bold text-white mb-4">물고기 잡는 법 (VOD 코스)</h3>
                  <p className="text-sm text-white/70 leading-relaxed font-normal">
                    제프 워커 PLF와 12인 거장의 세일즈 퍼널을 AI 에이전트로 직접 만들고 다듬는 실전 노하우를 완전 전수합니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#C9A84C] font-bold">
                  <span>실전 VOD 4모듈 패키지</span>
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {/* 카드 2 - 강조 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#C9A84C]/15 via-[#161617] to-[#161617] border-2 border-[#C9A84C] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-bold text-[10px] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                  핵심 핑거팁 무기
                </div>
                <div>
                  <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">MODULE 02</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{`"{00}"`} 골조 프롬프트</h3>
                  <p className="text-sm text-white/80 leading-relaxed font-normal">
                    초보자 및 나이 드신 대표님도 100% 실행 가능! 내 서비스/업종명 하나만 괄호 안에 입력하면 <strong className="text-white font-bold">3초 만에 스크립트가 자동 완출</strong>됩니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#C9A84C]/30 flex items-center justify-between text-xs text-[#C9A84C] font-bold">
                  <span>3초 스크립트 완출 시스템</span>
                  <Zap className="w-4 h-4 text-[#C9A84C]" />
                </div>
              </div>
            </div>

            {/* 수평 카드 (카드 3) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#161617] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">MODULE 03</span>
                <h3 className="text-2xl font-bold text-white mb-2">24시간 자동 세일즈 배관</h3>
                <p className="text-sm text-white/70 leading-relaxed font-normal max-w-xl">
                  DB 수집 ➔ 문자/알림톡 숏링크 ➔ VOD 릴리즈 ➔ 카운트다운 결제창까지 연결되는 완벽한 자동화 구축.
                </p>
              </div>
              <button
                onClick={() => navigate('/experimental/diagnose')}
                className="shrink-0 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer border-none"
              >
                진단하기 →
              </button>
            </div>

            {/* 사업 경계선 안내 */}
            <div className="mt-10 text-center text-xs text-white/50 bg-[#161617] p-5 rounded-2xl border border-white/10 max-w-3xl mx-auto leading-relaxed">
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
