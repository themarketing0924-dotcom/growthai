import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Sparkles, Lock, ArrowRight, BookOpen, User, Mail, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function ToolSalesPageExp() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro'>('pro');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-28 pb-24 px-4 sm:px-6 font-sans">
      <Seo title="AI PLF 동영상 마스터클래스 | GrowthAI" description="변호사, 의사, 트레이너, 인테리어 등 내 노하우만 파는 3시간 퍼널 구축" />
      <div className="max-w-4xl mx-auto">
        
        {/* 헤더 오퍼 타이틀 - 애플 스타일 중앙축 대칭 */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-[#C9A84C] border border-white/15 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            2026 대한민국 12인 거장 프레임워크 × AI 세일즈 시스템
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight break-keep text-white tracking-tight">
            내 서비스/제품명만 입력하면 3시간 만에 완성!<br />
            <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
              AI PLF 동영상 런치 마스터클래스 (VOD + 골조 프롬프트)
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            변호사, 의사, 트레이너, 골퍼, 인테리어, 설비, 마사지, 네트워크 마케터 등 내 노하우를 24시간 파는 <strong className="text-white font-bold">온라인 자동 세일즈 퍼널 구축</strong>
          </p>
        </div>

        {/* 4모듈 VOD 커리큘럼 세션 */}
        <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            <span>📚 실전 VOD 4단계 커리큘럼 & 패키지 포함 내역</span>
          </h2>

          <div className="space-y-4 mb-8">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#C9A84C] text-black font-bold text-xs px-2.5 py-0.5 rounded-full">Module 1</span>
                <h3 className="font-bold text-white text-base">한국형 PLF 런치 이론 & 12인 거장 성공 사례</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed ml-1">
                제프 워커의 런치 구조를 대한민국 <strong className="text-white font-semibold">문자/카카오톡 90% 열람 실정</strong>에 맞춰 재해석. 잠재고객의 심리를 예열하는 3단계 질문 공식.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#C9A84C] text-black font-bold text-xs px-2.5 py-0.5 rounded-full">Module 2</span>
                <h3 className="font-bold text-white text-base">카메라 노출 없이 10분 만에 만드는 VSL 구현법</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed ml-1">
                얼굴 노출 부담 없이 타격형 런치 동영상을 제작하는 비유 화법과, <strong className="text-white font-semibold">물고기 잡는 법(퍼널 스스로 만들기 및 다듬기)</strong> 전수.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#C9A84C] text-black font-bold text-xs px-2.5 py-0.5 rounded-full">Module 3</span>
                <h3 className="font-bold text-white text-base">실습 숙제 템플릿 (Workbook) 워크시트</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed ml-1">
                강의만 듣고 끝나지 않도록 제공되는 단계별 실습 과제 sheet. 내 서비스의 타겟, 셀링 포인트, 런치 일정을 빈칸만 채우며 정리.
              </p>
            </div>

            {/* 골조 프롬프트 강조 카드 */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#C9A84C]/20 via-black to-black border-2 border-[#C9A84C] shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-black font-extrabold text-xs px-2.5 py-0.5 rounded-full">핵심 보너스</span>
                  <h3 className="font-bold text-white text-base">초스피드 제작 마스터 골조 프롬프트 (Skeleton Prompts)</h3>
                </div>
                <span className="text-xs text-[#C9A84C] font-bold">정가 450,000원 ➔ 무료 증정</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                🚀 <strong>{`"{대표님의 서비스/상품명}"`} 1개만 괄호 안에 입력하면 끝!</strong> AI가 제프 워커 1-2-3 동영상 스크립트, 문자 문구, 세일즈 카피를 <strong className="text-white font-bold">3초 만에 초스피드로 완출</strong>해 냅니다. 초보자/연로자도 100% 실행 가능!
              </p>
            </div>
          </div>

          {/* 댄 케네디식 역보증 환불 안내 */}
          <div className="p-6 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/40 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[#C9A84C] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white text-base mb-1">
                댄 케네디식 100% 무위험 강력 역보증 (Better-Than-Risk-Free Guarantee)
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                강의를 수강하시고 30일 동안 실행해보세요. 만약 제공된 골조 프롬프트와 템플릿으로 본인 서비스의 런치 스크립트와 퍼널을 구축하지 못하시거나 만족스럽지 않다면 100% 조건 없이 환불해 드립니다. 환불하시더라도 보너스로 제공된 모든 템플릿과 프롬프트는 소장하셔도 좋습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 애플 2열 대칭 수강 플랜 카드 선택 */}
        <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-8 text-center">수강 플랜 선택 및 즉시 수강 신청</h3>

          {!orderComplete ? (
            <form onSubmit={handleOrder} className="space-y-6">
              
              {/* 애플 2열 대칭 플랜 선택 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setSelectedPlan('standard')}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPlan === 'standard'
                      ? 'border-[#C9A84C] bg-[#C9A84C]/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]'
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">VOD 단독 수강권</h4>
                    <p className="text-xs text-white/50 mb-6">VOD 4모듈 + 실습 숙제 템플릿 열람권</p>
                  </div>
                  <div className="text-3xl font-extrabold text-[#C9A84C]">99,000원</div>
                </div>

                <div 
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-6 rounded-3xl border cursor-pointer relative transition-all flex flex-col justify-between ${
                    selectedPlan === 'pro'
                      ? 'border-[#C9A84C] bg-[#C9A84C]/15 shadow-[0_0_25px_rgba(201,168,76,0.25)]'
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-bold text-[10px] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                    추천 95% 선택
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">풀 패키지 마스터 패스</h4>
                    <p className="text-xs text-white/50 mb-6">VOD 4모듈 + 숙제 템플릿 + <strong className="text-[#C9A84C]">마스터 골조 프롬프트</strong></p>
                  </div>
                  <div className="text-3xl font-extrabold text-[#C9A84C]">199,000원</div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 max-w-xl mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">수강생 성함 *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                      <User size={16} />
                    </div>
                    <input 
                      type="text" 
                      required 
                      placeholder="홍길동" 
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/50 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">이메일 주소 (VOD 강의실 계정 발송용) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                      <Mail size={16} />
                    </div>
                    <input 
                      type="email" 
                      required 
                      placeholder="name@company.com" 
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/50 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">휴대폰 번호 (수강 접속 문자 알림용) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                      <Phone size={16} />
                    </div>
                    <input 
                      type="tel" 
                      required 
                      placeholder="010-1234-5678" 
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/50 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 애플 캡슐형 결제 버튼 */}
              <button
                type="submit"
                disabled={isOrdering}
                className="w-full max-w-xl mx-auto py-4.5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition-all duration-200 shadow-2xl shadow-[#C9A84C]/25 flex items-center justify-center gap-2 cursor-pointer border-none block"
              >
                {isOrdering ? (
                  <span>수강 신청 수속 중...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>30일 100% 무위험 즉시 수강 신청하기</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">수강 신청이 완료되었습니다!</h4>
              <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
                입력하신 휴대폰 번호와 이메일로 3분 이내에 VOD 강의실 접속 링크 및 마스터 골조 프롬프트 다운로드 안내가 전송됩니다.
              </p>
              <button
                onClick={() => navigate('/experimental')}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition cursor-pointer border-none"
              >
                실험실 메인으로 이동
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
