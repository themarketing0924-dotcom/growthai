import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, ArrowRight, Clock, ShieldCheck, Sparkles, Star, Award, BookOpen } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function GuideDay1PageExp() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state as { name?: string; email?: string; phone?: string; segment?: string } | null;
  const userName = stateData?.name || '대표';

  const [isPlaying, setIsPlaying] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(8);

  useEffect(() => {
    // 8초 후 오퍼 버튼 릴리즈
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
    <div className="min-h-screen bg-[#07090E] text-white pt-28 pb-24 px-4 sm:px-6 font-sans">
      <Seo title="2026 AI PLF 10분 무료 특강 | GrowthAI" description="내 서비스를 빠르게 파는 동영상 런치 공식 특강" />
      <div className="max-w-4xl mx-auto">
        
        {/* 상단 뱃지 */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            2026 대한민국 맞춤형 AI PLF 무료 특강 : PLC 1 [기회와 서사]
          </span>
        </div>

        {/* 메인 비디오 타이틀 */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-4 leading-snug break-keep text-white">
          {userName}님을 위한 10분 특강:<br />
          <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
            "왜 99%의 AI 카피라이팅은 내 서비스를 팔지 못하는가?"
          </span>
        </h1>
        <p className="text-center text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed break-keep">
          단순히 글귀만 고치는 것은 아무 소용이 없습니다. 내 서비스명만 입력하면 3시간 만에 완성되는 한국형 3단계 동영상 런치 퍼널의 비밀.
        </p>

        {/* 시네마틱 비디오 프레임 */}
        <div 
          className="relative rounded-3xl overflow-hidden border border-[#C9A84C]/30 bg-black/80 shadow-[0_0_50px_rgba(201,168,76,0.1)] mb-12 aspect-video flex flex-col items-center justify-center group cursor-pointer"
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
              <p className="text-lg font-bold text-white mb-1">10분 무료 마스터클래스 영상 시청하기</p>
              <p className="text-xs text-white/50">화면을 클릭하여 재생하세요 (문자로도 링크가 발송되었습니다)</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#141923] to-[#07090E] p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center mb-4 animate-pulse">
                <Play className="w-8 h-8 text-[#C9A84C] fill-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2026 한국형 PLF 10분 특강 시청 중...</h3>
              <p className="text-sm text-white/60 max-w-md">
                영상을 시청하시는 동안 하단에 실전 VOD 마스터클래스 & 마스터 골조 프롬프트 오퍼가 공개됩니다.
              </p>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/60 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A84C]" /> 시청 시간: 10분 15초
            </span>
            <span className="text-[#C9A84C] font-semibold">GrowthAI x 2026 Korean PLF</span>
          </div>
        </div>

        {/* 강의 요약 리포트 노트 */}
        <div className="bg-black/50 border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <Award className="w-5 h-5 text-[#C9A84C]" />
            이 무료 특강에서 밝혀지는 3가지 한국형 마케팅 비밀
          </h2>
          <ul className="space-y-5 text-sm text-white/80">
            <li className="flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-base">1. 오픈 전 고객의 마음을 여는 문자/알림톡 3단계 예열법</strong>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">이메일 오픈율 20%의 한계를 깨고, 90% 열람 문자 수집 후 영상으로 끌어당기는 심리 배관</p>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-base">2. 카메라 노출 없이 10분 만에 런치 동영상 제작하기</strong>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">얼굴 노출 부담 없이 한국 수강생들이 열광하는 타격형 스토리 비유 공식</p>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-base">3. 내 서비스명만 입력하면 완성되는 마스터 골조 프롬프트</strong>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">프롬프트 공부 없이 내 상품 설명 1줄만 넣으면 3분 만에 세일즈 스크립트 자동 완출</p>
              </div>
            </li>
          </ul>
        </div>

        {/* 오퍼 해금 영역 */}
        <div className="text-center">
          {!showOffer ? (
            <div className="p-8 rounded-3xl bg-black/40 border border-dashed border-[#C9A84C]/40 text-center">
              <p className="text-sm text-white/70 mb-3 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A84C] animate-spin" />
                VOD 마스터클래스 & 골조 프롬프트 오퍼 신청 버튼이 <span className="text-[#C9A84C] font-bold">{timerSeconds}초</span> 후 활성화됩니다.
              </p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden max-w-md mx-auto">
                <div 
                  className="bg-[#C9A84C] h-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                  style={{ width: `${((8 - timerSeconds) / 8) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#C9A84C]/15 via-black/80 to-black border-2 border-[#C9A84C] text-center shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-bold text-xs px-4 py-1.5 rounded-bl-xl">
                한정 오퍼 오픈
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                내 서비스를 파는 실전 VOD 강좌 & 골조 프롬프트를 확인해보세요
              </h3>
              <p className="text-sm text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                이론 + 동영상 구현법 + 실습 숙제 템플릿 + 내 서비스 이름만 넣으면 3분 만에 완성되는 마스터 골조 프롬프트를 지금 확인하실 수 있습니다.
              </p>

              <button
                onClick={() => navigate('/experimental/product/plf-masterclass')}
                className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition-all duration-200 shadow-xl shadow-[#C9A84C]/25 flex items-center justify-center gap-2 mx-auto cursor-pointer border-none"
              >
                <BookOpen className="w-5 h-5" />
                <span>AI PLF VOD 마스터클래스 & 골조 프롬프트 오퍼 보기</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" /> 댄 케네디식 100% 무조건 환불 보증
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#C9A84C]" /> 선착순 마감 진행 중
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
