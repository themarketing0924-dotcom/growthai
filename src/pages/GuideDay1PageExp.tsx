import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, ArrowRight, Clock, ShieldCheck, Sparkles, Star, Award, BookOpen } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function GuideDay1PageExp() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state as { name?: string; email?: string; phone?: string; profession?: string } | null;
  const userName = stateData?.name || '대표';

  const [isPlaying, setIsPlaying] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowOffer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Seo 
        title="2026 AI PLF 10분 무료 특강 | GrowthAI" 
        description="내 서비스를 빠르게 파는 동영상 런치 공식 특강" 
      />
      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        <main className="pt-36 pb-24 px-6 sm:px-10 md:px-12 lg:px-16 max-w-6xl mx-auto w-full">
          
          {/* 상단 뱃지 & 헤더 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 shadow-[0_0_15px_rgba(201,168,76,0.15)] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>2026 대한민국 맞춤형 AI PLF 무료 특강 : PLC 1 [기회와 서사]</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold mb-5 leading-snug break-keep text-white tracking-tight">
              {userName}님을 위한 10분 무료 특강:<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent block mt-1">
                "왜 99%의 AI 카피라이팅은 내 서비스를 팔지 못하는가?"
              </span>
            </h1>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed break-keep max-w-2xl mx-auto font-normal">
              단순히 글자 몇 개 수정하는 것은 매출에 도움이 되지 않습니다.  
              내 서비스명 1개만 넣으면 3시간 만에 완성되는 한국형 3단계 세일즈 퍼널의 진실을 공개합니다.
            </p>
          </div>

          {/* 럭셔리 대칭 2컬럼 레이아웃: [좌: 시네마틱 영상 플레이어] vs [우: 타이머 및 해금 오퍼 카드] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 👈 좌측 (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 시네마틱 프레임 비디오 플레이어 */}
              <div 
                className="relative rounded-3xl overflow-hidden border-2 border-[#C9A84C]/45 bg-black shadow-[0_0_40px_rgba(201,168,76,0.15)] aspect-video flex flex-col items-center justify-center group cursor-pointer w-full transform hover:scale-[1.01] transition-all duration-300"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {!isPlaying ? (
                  <div className="relative z-10 text-center p-6 flex flex-col items-center">
                    <motion.div 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 rounded-full bg-[#C9A84C] text-black flex items-center justify-center mb-5 shadow-2xl shadow-[#C9A84C]/40"
                    >
                      <Play className="w-9 h-9 fill-black translate-x-0.5" />
                    </motion.div>
                    <p className="text-base sm:text-lg font-extrabold text-white mb-1">10분 무료 마스터클래스 특강 시청하기</p>
                    <p className="text-xs text-white/50">화면을 클릭하여 영상을 재생하세요.</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#121316] to-[#07090E] p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center mb-4 animate-pulse">
                      <Play className="w-8 h-8 text-[#C9A84C] fill-[#C9A84C]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">2026 한국형 PLF 10분 특강 시청 중...</h3>
                    <p className="text-xs text-white/60 max-w-sm">
                      특강을 시청하시는 동안 우측에 실전 VOD 마스터클래스 & 프롬프트 오퍼 버튼이 해금됩니다.
                    </p>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] sm:text-xs text-white/60 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" /> 시청 시간: 10분 15초
                  </span>
                  <span className="text-[#C9A84C] font-semibold">GrowthAI x 2026 Korean PLF</span>
                </div>
              </div>

              {/* 하단 3가지 비밀 설명서 */}
              <div className="bg-[#121316] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
                  <Award className="w-5 h-5 text-[#C9A84C]" />
                  이 무료 특강에서 공개되는 3가지 마케팅 비밀
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">1. 문자/알림톡 3단계 신뢰 예열법</strong>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">이메일 오픈율 20%의 한계를 넘어, 90% 열람 문자 수집 후 영상으로 고객을 끌어당기는 심리 배관</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">2. 카메라 노출 없이 10분 만에 런치 동영상 제작하기</strong>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">얼굴 공개 부담 없이 한국 소상공인과 수강생들이 열광하는 타격형 스토리 비유 공식</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">3. 내 서비스명만 입력하면 완성되는 마스터 골조 프롬프트</strong>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">프롬프트 공부 없이 내 상품 설명 1줄만 넣으면 3초 만에 세일즈 스크립트가 자동 완출되는 원리</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            {/* 👉 우측 (lg:col-span-5) */}
            <div className="lg:col-span-5">
              {!showOffer ? (
                <div className="p-8 rounded-3xl bg-[#121316] border border-dashed border-[#C9A84C]/40 text-center shadow-lg">
                  <p className="text-xs sm:text-sm text-white/70 mb-4 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9A84C] animate-spin" />
                    VOD 마스터클래스 & 프롬프트 오퍼 신청 버튼이 <span className="text-[#C9A84C] font-bold">{timerSeconds}초</span> 후 활성화됩니다.
                  </p>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div 
                      className="bg-[#C9A84C] h-full transition-all duration-1000 ease-linear"
                      style={{ width: `${((8 - timerSeconds) / 8) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#121316] border-2 border-[#C9A84C] text-center shadow-2xl relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-extrabold text-[10px] px-3.5 py-1.5 rounded-bl-xl uppercase tracking-wider">
                    특별 오퍼 공개
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    실전 VOD 강좌 & 마스터 골조 프롬프트를 확인해 보세요
                  </h3>
                  <p className="text-xs text-white/60 mb-6 leading-relaxed">
                    이론 + 동영상 제작법 + 실습 숙제 템플릿 + 내 서비스 이름만 넣으면 3초 만에 완성되는 마스터 골조 프롬프트 패키지를 지금 평생 소장할 수 있습니다.
                  </p>

                  <button
                    onClick={() => navigate('/experimental/product/plf-masterclass')}
                    className="w-full py-4 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-xs sm:text-sm transition duration-200 shadow-xl shadow-[#C9A84C]/25 flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    <BookOpen size={16} />
                    <span>마스터클래스 VOD & 프롬프트 오퍼 확인</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="mt-5 flex items-center justify-center gap-2.5 text-[10px] text-white/50">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-[#C9A84C]" /> 30일 조건부 실행 보증
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-[#C9A84C]" /> 선착순 가입 진행
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

          </div>

        </main>

        <Footer lang="ko" />
      </div>
    </>
  );
}
