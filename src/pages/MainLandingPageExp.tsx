import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function MainLandingPageExp() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Seo
        title="GrowthAI — 2026 한국형 AI PLF 동영상 런치 퍼널"
        description="ChatGPT로 글 고쳐도 안 팔린 이유. 내 서비스만 넣으면 3시간 만에 완성되는 동영상 런치 강좌"
        canonical="/experimental"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#0A0D14] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        {/* HERO SECTION */}
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
              2026 대한민국 맞춤형 초스피드 AI 마케팅 강좌
            </motion.div>

            {/* 메인 헤드라인 */}
            <motion.h1
              className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.2] mb-6 break-keep"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
            >
              ChatGPT로 상세페이지 100번 고쳐도 매출 0원이었죠?<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                답은 카피가 아닙니다. 내 서비스를 파는 [한국형 동영상 런치 퍼널]입니다.
              </span>
            </motion.h1>

            {/* 설명 카피 */}
            <motion.p
              className="text-white/60 text-base sm:text-lg mb-10 leading-relaxed break-keep max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              제프 워커의 PLF 최신 트렌드를 한국 마케팅 실정에 맞춰 재해석했습니다. 
              <strong>이론 정의 + 동영상 구현법 + 실습 과제 + 내 서비스명만 넣으면 3분 만에 스크립트가 터지는 마스터 골조 프롬프트</strong>를 전격 공개합니다.
            </motion.p>

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

        {/* 3가지 핵심 혜택 섹션 */}
        <section className="py-16 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">한국형 문자/알림톡 배관</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                이메일 오픈율 20%의 한계를 넘어 90% 열람 문자와 알림톡으로 예열하고 VOD 영상으로 끌어당깁니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">카메라 노출 없는 VSL</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                얼굴 노출 부담 없이 10분 만에 타격형 세일즈 동영상을 만들어 고객의 구매 의사를 3배 높입니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/40">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C] text-black flex items-center justify-center font-extrabold mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">마스터 골조 프롬프트</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                프롬프트 공부 없이 내 서비스명만 넣으면 3분 만에 동영상 런치 스크립트와 세일즈 문구를 자동 완출.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer lang="ko" />
      </div>
    </>
  );
}
