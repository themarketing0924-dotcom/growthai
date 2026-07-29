import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Sparkles, Lock, ArrowRight, BookOpen, User, Mail, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function ToolSalesPageExp() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro'>('pro');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // 성함, 이메일, 휴대폰 번호 수집 상태
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone) return;

    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <>
      <Seo 
        title="VOD 마스터클래스 & 골조 프롬프트 오퍼 신청 | GrowthAI" 
        description="변호사, 의사, 트레이너, 인테리어 등 내 노하우만 파는 3시간 퍼널 구축" 
      />
      <div className="bg-[#060B16] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C5A880] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        <main className="pt-36 pb-24 px-6 sm:px-10 md:px-12 lg:px-16 max-w-6xl mx-auto w-full">
          
          {/* 상단 오퍼 헤더 */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/30 mb-4 shadow-[0_0_15px_rgba(197,168,128,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              2026 대한민국 12인 거장 프레임워크 × AI 세일즈 시스템
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight break-keep text-white tracking-tight">
              내 서비스명만 입력하면 3시간 만에 완출!<br />
              <span className="bg-gradient-to-r from-[#C5A880] via-[#DBC5A8] to-amber-200 bg-clip-text text-transparent">
                AI PLF 동영상 런치 마스터클래스 VOD 패키지
              </span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed break-keep font-normal">
              변호사, 의사, 트레이너, 인테리어, 설비, 마사지 등 내 노하우를 24시간 파는 온라인 자동 세일즈 퍼널과 마스터 골조 프롬프트를 전격 탑재해 드립니다.
            </p>
          </div>

          {/* 럭셔리 대칭 2컬럼 레이아웃: [좌: VOD 커리큘럼 & 보증] vs [우: Sticky 결제 신청 카드] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 👈 좌측 (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#101726] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                  <BookOpen className="w-5 h-5 text-[#C5A880]" />
                  <span>📚 실전 VOD 4단계 커리큘럼 & 구성 내역</span>
                </h2>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-[#C5A880] text-black font-bold text-xs px-2.5 py-0.5 rounded-full">Module 1</span>
                      <h3 className="font-bold text-white text-sm sm:text-base">한국형 PLF 런치 이론 & 12인 거장 성공 사례</h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      제프 워커의 런치 구조를 대한민국 문자/카카오톡 90% 열람 실정에 맞춰 재해석. 잠재고객의 심리를 예열하는 3단계 질문 공식.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-[#C5A880] text-black font-bold text-xs px-2.5 py-0.5 rounded-full">Module 2</span>
                      <h3 className="font-bold text-white text-sm sm:text-base">카메라 노출 없이 10분 만에 만드는 VSL 구현법</h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      얼굴 노출 부담 없이 한국 수강생들이 열광하는 타격형 스토리 비유 공식과 영상 플레이어 세팅법 전수.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-[#C5A880] text-black font-bold text-xs px-2.5 py-0.5 rounded-full">Module 3</span>
                      <h3 className="font-bold text-white text-sm sm:text-base">실습 숙제 템플릿 (Workbook) 워크시트</h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      강의만 듣고 끝나지 않도록 제공되는 단계별 실습 과제 sheet. 내 서비스의 타겟, 셀링 포인트, 런치 일정을 빈칸만 채우며 정리.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#C5A880]/20 via-black to-black border-2 border-[#C5A880] shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-400 text-black font-extrabold text-xs px-2.5 py-0.5 rounded-full">핵심 보너스</span>
                        <h3 className="font-bold text-white text-sm sm:text-base">초스피드 제작 마스터 골조 프롬프트 (Skeleton Prompts)</h3>
                      </div>
                      <span className="text-xs text-[#C5A880] font-bold">무료 증정</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      🚀 <strong>{`"{내 업종/서비스명}"`} 1개만 입력하면 끝!</strong> AI가 제프 워커 1-2-3 동영상 스크립트, 문자 문구, 세일즈 카피를 3초 만에 완출해 냅니다. 초보자/연로자도 100% 실행 가능!
                    </p>
                  </div>
                </div>
              </div>

              {/* 어뷰징 방지 공정 미션 수행 조건부 실행 보증 카드 */}
              <div className="p-6 rounded-3xl bg-[#101726] border border-white/10 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                    🛡️ 100% 미션 수행 조건부 실행 보증 (Action-Based Guarantee)
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    GrowthAI의 노하우는 단기간 악의적 녹화 후 맹목적 환불을 요구하는 체리피커를 방지하고 진정성 있는 대표님의 성장을 위해 **공정한 미션 환불제**를 채택합니다. VOD 수강 후 제공된 **실습 숙제 템플릿과 AI 골조 프롬프트 과제를 모두 실행했음에도** 본인의 세일즈 퍼널 스크립트가 완성되지 않는다면 100% 환불해 드립니다. (※ 전자상거래법 제17조 제2항에 따라 디지털 콘텐츠 제공 개시 시 진도율 차감 및 파일 다운로드 가액 정산 후 환불 기준 적용)
                  </p>
                </div>
              </div>
            </div>

            {/* 👉 우측 (lg:col-span-5 - Sticky Card) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-[#101726] border-2 border-[#C5A880] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C5A880] text-black font-extrabold text-[10px] px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                  추천 95% 선택
                </div>

                <div className="mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white mb-1">수강 플랜 선택 & 신청</h3>
                  <p className="text-xs text-white/50">원하시는 플랜을 선택하고 수강 신청을 진행하세요.</p>
                </div>

                {!orderComplete ? (
                  <form onSubmit={handleOrder} className="space-y-5">
                    
                    {/* 플랜 1 */}
                    <div 
                      onClick={() => setSelectedPlan('standard')}
                      className={`p-4.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedPlan === 'standard'
                          ? 'border-[#C5A880] bg-[#C5A880]/10 shadow-[0_0_15px_rgba(197,168,128,0.1)]'
                          : 'border-white/10 bg-black/40 hover:border-white/15'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-white text-sm mb-0.5">VOD 단독 수강권</h4>
                        <p className="text-[10px] text-white/50 mb-3">VOD 4모듈 + 실습 숙제 템플릿 열람권</p>
                      </div>
                      <div className="text-xl font-extrabold text-[#C5A880]">99,000원</div>
                    </div>

                    {/* 플랜 2 */}
                    <div 
                      onClick={() => setSelectedPlan('pro')}
                      className={`p-4.5 rounded-2xl border cursor-pointer relative transition-all flex flex-col justify-between ${
                        selectedPlan === 'pro'
                          ? 'border-[#C5A880] bg-[#C5A880]/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                          : 'border-white/10 bg-black/40 hover:border-white/15'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-white text-sm mb-0.5">풀 패키지 마스터 패스</h4>
                        <p className="text-[10px] text-white/50 mb-3">VOD 4모듈 + 숙제 템플릿 + 마스터 골조 프롬프트</p>
                      </div>
                      <div className="text-xl font-extrabold text-[#C5A880]">199,000원</div>
                    </div>

                    {/* 입력 3필드 */}
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div>
                        <label className="block text-[10px] font-semibold text-white/80 mb-1">수강생 성함 *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <User size={14} />
                          </div>
                          <input 
                            type="text" 
                            required 
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            placeholder="홍길동" 
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#060B16] border border-white/25 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-white/80 mb-1">이메일 주소 *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <Mail size={14} />
                          </div>
                          <input 
                            type="email" 
                            required 
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            placeholder="name@company.com" 
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#060B16] border border-white/25 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-white/80 mb-1">휴대폰 번호 *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <Phone size={14} />
                          </div>
                          <input 
                            type="tel" 
                            required 
                            value={buyerPhone}
                            onChange={(e) => setBuyerPhone(e.target.value)}
                            placeholder="010-1234-5678" 
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#060B16] border border-white/25 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isOrdering}
                      className="w-full py-4.5 rounded-full bg-[#C5A880] hover:bg-[#d9b85c] text-black font-extrabold text-sm transition duration-200 shadow-xl shadow-[#C5A880]/25 flex items-center justify-center gap-2 cursor-pointer border-none mt-2"
                    >
                      {isOrdering ? (
                        <span>신청 수속 중...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>30일 미션보증 수강 신청</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 text-green-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">신청이 완료되었습니다!</h4>
                    <p className="text-xs text-white/60 mb-5 leading-relaxed">
                      {buyerPhone} 번호로 VOD 강의실 계정 및 마스터 프롬프트 다운로드 안내 문자가 전송되었습니다.
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer border-none"
                    >
                      홈페이지로 이동
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </main>

        <Footer lang="ko" />
      </div>
    </>
  );
}
