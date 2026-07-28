import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const PROFESSIONS = [
  '변호사 · 법률', '의사 · 약사 · 의료', '헬스트레이너 · 피트니스', '프로골퍼 · 스포츠', 
  '인테리어 · 건축설비', '마사지 · 테라피스트', '지식 강사 · 컨설턴트', '1인 전문 서비스업'
];

const FAQS = [
  {
    q: "컴퓨터나 AI를 잘 모르는 초보자도 구축할 수 있나요?",
    a: "네, 100% 가능합니다. 강의나 복잡한 코딩 없이 대표님의 서비스명 1개만 입력하면 3초 만에 세일즈 스크립트와 문자 문구가 완출되는 {00} 마스터 골조 프롬프트를 드립니다."
  },
  {
    q: "제 업종(변호사, 의사, 트레이너, 인테리어, 약사 등)에도 적용이 되나요?",
    a: "제프 워커의 PLF 퍼널과 12인 마케팅 거장의 본질은 '고객의 심리를 예열하고 구매 저항을 없애는 온라인 세일즈 배관'입니다. 자신만의 노하우나 서비스를 가진 모든 업종에 100% 적용됩니다."
  },
  {
    q: "유료 광고나 SNS 홍보도 대신 해주나요?",
    a: "아닙니다. 외부 유료 광고 집행은 대표님의 영역이며, GrowthAI는 고객이 유입되었을 때 24시간 자동으로 수집·예열·결제시키는 최상위 세일즈 퍼널 파이프라인 구축을 완전 보장합니다."
  },
  {
    q: "수강 후 환불이 가능한가요?",
    a: "네, 공정 미션 수행 조건부 보증을 적용합니다. 30일 동안 수강 후 제공된 템플릿과 과제를 수행했음에도 세일즈 퍼널 스크립트가 완성되지 않으셨다면 법적 기준에 따라 환불해 드립니다."
  }
];

export default function MainLandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Seo
        title="GrowthAI — 2026 대한민국 1위 AI 세일즈 퍼널 마스터"
        description="변호사, 의사, 트레이너, 인테리어 등 노하우를 가진 누구나 {00} 입력으로 24시간 자동 판매 시스템 구축"
        canonical="/"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* 럭셔리 넓은 규격 HERO SECTION (max-w-6xl 2컬럼 레이아웃) */}
        <section ref={heroRef} className="relative pt-36 pb-28 px-6 sm:px-10 md:px-12 lg:px-16 overflow-hidden border-b border-white/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C9A84C]/10 rounded-full blur-[170px] pointer-events-none" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* 👈 좌측 (lg:col-span-7): 2026 두괄식 헤드카피 & CTA */}
              <div className="lg:col-span-7 text-left">
                
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
                >
                  <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                  <span>2026 KOREAN AI SALES FUNNEL ARCHITECTURE</span>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 break-keep tracking-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1 }}
                >
                  3분 만에 당신의 노하우가<br />
                  <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                    24시간 자동 판매되는 이유를
                  </span> 보여드립니다.
                </motion.h1>

                <motion.p
                  className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed break-keep font-normal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  상세페이지 글귀 100번 고치는 것은 매출에 아무 도움이 안 됩니다.<br />
                  <strong className="text-white font-bold">{`"{내 업종/서비스명}"`} 1개만 입력하면 3초 만에 스크립트가 완출되는 마스터 골조 프롬프트</strong>로 내 사업에 24시간 자동화 배관을 구축하세요.
                </motion.p>

                {/* 적용 업종 뱃지 */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {PROFESSIONS.map((p) => (
                    <span key={p} className="px-3 py-1 rounded-full bg-[#161617] border border-white/10 text-xs font-medium text-white/80">
                      ✓ {p}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <button
                    onClick={() => navigate('/diagnose')}
                    className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-base transition-all duration-200 shadow-2xl shadow-[#C9A84C]/30 flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    <span>3분 무료 진단 & 특강 문자로 받기</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => navigate('/book')}
                    className="w-full sm:w-auto px-6 py-4.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition cursor-pointer border border-white/15"
                  >
                    <span>📘 무료 소책자 받기</span>
                  </button>
                </motion.div>

                <p className="text-xs text-white/40 mt-4 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                  신청 즉시 문자로 10분 마스터클래스 특강과 PDF 가이드북이 발송됩니다.
                </p>

              </div>

              {/* 👉 우측 (lg:col-span-5): AI스럽지 않은 럭셔리 3D 퍼널 컨트롤 비주얼 대시보드 카드 */}
              <div className="lg:col-span-5">
                <div className="bg-[#121316] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
                  
                  {/* 카드 헤더 */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-full border border-[#C9A84C]/30">
                      LIVE FUNNEL STATUS
                    </span>
                  </div>

                  {/* 퍼널 파이프라인 시각 비주얼 */}
                  <div className="space-y-4">
                    
                    {/* Stage 1 */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                          01
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">3분 진단 DB 자동 수집</h4>
                          <p className="text-[10px] text-white/50">성함 · 이메일 · 휴대폰 번호</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-green-400 flex items-center gap-1">
                        <CheckCircle2 size={12} /> 24시간 감지
                      </span>
                    </div>

                    {/* Stage 2 */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#C9A84C]/20 text-[#C9A84C] font-bold text-xs flex items-center justify-center">
                          02
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">10분 VSL 예열 동영상</h4>
                          <p className="text-[10px] text-white/50">제프 워커 3단계 예열 공식</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#C9A84C] flex items-center gap-1">
                        <PlayCircle size={12} /> 8초 오퍼 해금
                      </span>
                    </div>

                    {/* Stage 3 */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#C9A84C]/20 to-black border border-[#C9A84C]/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#C9A84C] text-black font-extrabold text-xs flex items-center justify-center">
                          03
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{`"{내 업종}"`} 프롬프트 완출</h4>
                          <p className="text-[10px] text-white/70">3초 마스터 골조 스크립트</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-white bg-[#C9A84C] text-black px-2.5 py-0.5 rounded-full">
                        자동 입금 완료
                      </span>
                    </div>

                  </div>

                  {/* 하단 요약 메트릭 */}
                  <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <span className="text-[10px] text-white/40 block mb-1">구축 시간</span>
                      <span className="text-base font-extrabold text-white">단 3분 완출</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <span className="text-[10px] text-white/40 block mb-1">매출 연결성</span>
                      <span className="text-base font-extrabold text-[#C9A84C]">24시간 자동화</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* 럭셔리 넓은 규격 2x2 문제 분석 (max-w-6xl) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">CORE ARCHITECTURE</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep">
                왜 노하우가 있어도<br />
                <span className="text-[#C9A84C]">수입으로 연결되지 못했을까요?</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed break-keep">
                답은 콘텐츠 부족이 아니라, 24시간 모으고 예열하고 결제시키는 [온라인 세일즈 배관]이 부재했기 때문입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">유입 배관 누수</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal">
                    블로그나 유튜브에 노하우를 올려도 잠재고객의 연락처(DB)를 수집하는 이체 장치가 없어 고객이 전부 다른 곳으로 이탈합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">설득 스크립트 부재</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal">
                    고객이 들어와도 마음을 열지 않습니다. 제프 워커 3단계 예열 동영상 공식으로 구매 저항을 100% 허물어야 합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">가격 저항 발생</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal">
                    가치 오퍼(Value Offer) 구성이 부족해 수강생이 가격 부담을 느끼고 무위험 환불 보증이 없어 결제를 주저하게 됩니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">
                    04
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">자동화 구축의 한계</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal">
                    매번 일일이 상담하고 설명하느라 시간이 부족해 본업과 비즈니스 확장에 차질이 생기고 피로감이 누적됩니다.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 럭셔리 넓은 규격 3단계 솔루션 (max-w-6xl) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">SOLUTION</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep">
                어떤 전문 직종이든<br />
                <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                  실행 가능한 세일즈 배관을 구축합니다.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-extrabold text-sm flex items-center justify-center mb-6">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">VOD 마스터클래스 코스</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    제프 워커 PLF + 12인 거장의 세일즈 퍼널을 AI 에이전트로 직접 만들고 다듬는 방법 완전 전수.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#C9A84C]/20 via-[#121316] to-[#121316] border-2 border-[#C9A84C] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C] text-black font-extrabold text-sm flex items-center justify-center mb-6">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{`"{00}"`} 골조 프롬프트</h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    내 서비스명 1개만 입력하면 3초 만에 세일즈 스크립트와 문자 문구가 자동 완출되는 마스터 무기.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-extrabold text-sm flex items-center justify-center mb-6">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">24시간 자동화 배관</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    DB 수집 ➔ 문자/알림톡 숏링크 ➔ VOD 릴리즈 ➔ 카운트다운 결제창 연결 배관 전격 제공.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">FAQ</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep">
                궁금한 점을 미리 확인해보세요.
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#121316] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center text-white font-bold text-base sm:text-lg cursor-pointer border-none bg-transparent"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#C9A84C] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 최후 CTA (max-w-5xl 넓은 캡슐) */}
        <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-12 lg:px-16 bg-[#000000]">
          <div className="max-w-5xl mx-auto text-center bg-gradient-to-b from-[#121316] to-[#0A0B0D] border border-white/15 rounded-3xl p-10 sm:p-16 shadow-2xl">
            
            <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-4">GET STARTED TODAY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6 break-keep">
              지금 바로 당신의 노하우를<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                24시간 자동 세일즈 시스템으로
              </span> 전환해보세요.
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed">
              3분 무료 진단을 완료하시면 성함과 연락처로 10분 마스터클래스 특강과 골조 템플릿 안내문이 문자로 발송됩니다.
            </p>

            <button
              onClick={() => navigate('/diagnose')}
              className="px-10 py-5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-lg transition-all duration-200 shadow-2xl shadow-[#C9A84C]/30 inline-flex items-center justify-center gap-2.5 cursor-pointer border-none"
            >
              <span>3분 무료 진단받기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <Footer lang="ko" />
      </div>
    </>
  );
}
