import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, Award, BookOpen, Quote, CheckCircle2 } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  {
    q: "컴퓨터나 AI를 잘 모르는 초보자도 구축할 수 있나요?",
    a: "네, 100% 가능합니다. 복잡한 코딩이나 프롬프트 엔지니어링 없이, 대표님의 '{내 업종/서비스명}' 1개만 입력하면 3초 만에 런치 스크립트와 문자 문구가 완출되는 마스터 골조 프롬프트를 드립니다."
  },
  {
    q: "제 업종(변호사, 의사, 트레이너, 인테리어 등)에도 적용이 되나요?",
    a: "제프 워커의 PLF 퍼널과 12인 마케팅 거장의 본질은 '고객의 심리를 예열하고 구매 저항을 없애는 온라인 세일즈 배관'입니다. 자신만의 노하우나 서비스를 가진 모든 전문직 및 소상공인에게 100% 적용됩니다."
  },
  {
    q: "유료 광고나 SNS 홍보도 대신 해주나요?",
    a: "아닙니다. 외부 유료 광고 집행은 대표님의 영역이며, GrowthAI는 고객이 유입되었을 때 24시간 자동으로 수집·예열·결제시키는 최상위 세일즈 퍼널 파이프라인 구축을 완전 보장합니다."
  },
  {
    q: "수강 후 환불이 가능한가요?",
    a: "네, 공정 미션 수행 조건부 보증을 적용합니다. VOD 수강 후 제공된 템플릿과 과제를 수행했음에도 세일즈 퍼널 스크립트가 완성되지 않으셨다면 법적 기준에 따라 100% 환불해 드립니다."
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
        title="GrowthAI — 100개의 AI 도구보다 1개의 구매전환 퍼널이 낫다"
        description="홈페이지는 만들었지만 매출이 없는 1인 창업가·소상공인을 위한 12인 거장 융합 세일즈 퍼널 구축 가이드"
        canonical="/"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* 1. HERO SECTION (12인 거장 테마 및 3D 퍼널 대시보드 카드) */}
        <section ref={heroRef} className="relative pt-40 pb-28 px-6 sm:px-10 md:px-12 lg:px-16 overflow-hidden border-b border-white/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C9A84C]/10 rounded-full blur-[170px] pointer-events-none" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* 좌측 (lg:col-span-7) */}
              <div className="lg:col-span-7 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/35 text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-6"
                >
                  <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                  <span>12인 마케팅 거장 융합 구매전환 퍼널</span>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 break-keep tracking-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1 }}
                >
                  남들 다 한다는 AI 홈페이지,<br />
                  <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                    왜 내 통장엔 아직도 0원일까요?
                  </span>
                </motion.h1>

                <motion.p
                  className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed break-keep font-normal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  상세페이지 글귀 100번 고치는 것은 매출에 도움이 되지 않습니다. <strong className="text-[#C9A84C] font-bold">100개의 AI 도구 공부보다, 자는 동안 자동으로 파는 1개의 구매전환 퍼널이 100배 낫습니다.</strong> 홈페이지만 덩그러니 있는 상태에서 24시간 작동하는 진짜 세일즈 배관을 장착하세요.
                </motion.p>

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
                    <span>3분 무료 진단 & 특강 받기</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => navigate('/book')}
                    className="w-full sm:w-auto px-6 py-4.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition cursor-pointer border border-white/15"
                  >
                    <span>📘 무료 소책자 신청하기</span>
                  </button>
                </motion.div>

                <p className="text-xs text-white/40 mt-4 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                  신청 즉시 문자로 10분 VSL 특강과 10가지 해결법이 담긴 PDF 바이블이 발송됩니다.
                </p>
              </div>

              {/* 우측 (lg:col-span-5) */}
              <div className="lg:col-span-5">
                <div className="bg-[#121316] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-full border border-[#C9A84C]/30">
                      SYS PIPELINE ACTIVE
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">01</div>
                        <div>
                          <h4 className="text-xs font-bold text-white">리드 DB 수집 배관</h4>
                          <p className="text-[10px] text-white/50">성함 · 이메일 · 휴대폰 번호</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-green-400">24H 작동</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#C9A84C]/20 text-[#C9A84C] font-bold text-xs flex items-center justify-center">02</div>
                        <div>
                          <h4 className="text-xs font-bold text-white">10분 VSL 신뢰 예열</h4>
                          <p className="text-[10px] text-white/50">제프 워커 3단계 공식</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#C9A84C]">자동 해금</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#C9A84C]/20 to-black border border-[#C9A84C]/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#C9A84C] text-black font-extrabold text-xs flex items-center justify-center">03</div>
                        <div>
                          <h4 className="text-xs font-bold text-white">3초 골조 프롬프트</h4>
                          <p className="text-[10px] text-white/70">내 서비스 입력 시 자동 완출</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-white bg-[#C9A84C] text-black px-2.5 py-0.5 rounded-full">즉시 입금</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <span className="text-[10px] text-white/40 block mb-1">구축 시간</span>
                      <span className="text-sm font-extrabold text-white">단 3분 완출</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <span className="text-[10px] text-white/40 block mb-1">매출 연결성</span>
                      <span className="text-sm font-extrabold text-[#C9A84C]">24시간 자동화</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* 2. THE PROBLEM SECTION (소상공인이 겪는 4대 핵심 문제 타격) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">혹시 지금, 이런 상황 아니신가요?</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                왜 홈페이지를 만들고 글을 써도<br />
                <span className="text-[#C9A84C]">결제는 이루어지지 않을까요?</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed break-keep font-normal">
                대한민국 1인 창업가·소상공인들의 공통된 아픔입니다. 문제는 대표님의 노하우가 부족해서가 아니라, **[유입 ➔ 예열 ➔ 결제]의 전환 흐름**을 잡아주는 시스템이 없기 때문입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">01</div>
                  <h3 className="text-xl font-bold text-white mb-3">트래픽을 얻는 방법의 공백</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    열심히 홈페이지는 구축했지만 정작 유기적으로 방문자를 끌어모으는 SEO/AEO 옴니채널 블로그 작성 배관이 없습니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">02</div>
                  <h3 className="text-xl font-bold text-white mb-3">리드 DB 수집 장치 부재</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    블로그나 홈페이지에 들어온 고객들이 아무런 흔적(성함, 연락처)도 남기지 않고 그냥 이탈해 버려 마케팅 비용이 누수됩니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">03</div>
                  <h3 className="text-xl font-bold text-white mb-3">구매 전 신뢰 예열 단계 부재</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    고객이 들어오자마자 무작정 구매만 유도하여 신뢰 형성이 되지 않은 상태에서 거부감과 가격 저항이 발생합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">04</div>
                  <h3 className="text-xl font-bold text-white mb-3">설득 시나리오 및 카피라이팅 미흡</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    가치 제안(Value Offer) 및 100% 무위험 환불 역보증 장치가 미비하여, 단순 가격 비교 고객들에게 선택받지 못합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. THE SOLUTION SECTION (12인 거장 3대 솔루션) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">12 GIANTS FRAMEWORK</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                12인 거장의 검증된 마케팅 기법으로<br />
                <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                  구매전환율을 높이는 진짜 퍼널을 구축합니다.
                </span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed break-keep font-normal">
                AI 도구 기능만 공부하다 소중한 비즈니스 시간을 낭비하지 마세요. 100개의 기능보다 1개의 구매전환 장치가 무조건 이깁니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-extrabold text-sm flex items-center justify-center mb-6">01</div>
                  <h3 className="text-lg font-bold text-white mb-3">닐 파텔식 트래픽 최적화</h3>
                  <p className="text-xs text-white/60 leading-relaxed break-keep font-normal">
                    글 1개로 유튜브 숏폼, 인스타 카드뉴스, 스레드 5개 채널에 n8n 자동화로 트래픽을 유기적으로 교차 유입시켜 잠재고객을 끌어모읍니다.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#C9A84C]/20 via-[#121316] to-[#121316] border-2 border-[#C9A84C] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C] text-black font-extrabold text-sm flex items-center justify-center mb-6">02</div>
                  <h3 className="text-lg font-bold text-white mb-3">제프 워커식 3단계 VSL 특강</h3>
                  <p className="text-xs text-white/80 leading-relaxed break-keep font-normal">
                    10분 분량의 타격형 결론 및 스토리라인을 시연하는 예열 영상을 탑재 ➔ 가치 소책자와 함께 구매 저항을 사전에 100% 잠식시킵니다.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-extrabold text-sm flex items-center justify-center mb-6">03</div>
                  <h3 className="text-lg font-bold text-white mb-3">러셀 브런슨식 마스터 프롬프트</h3>
                  <p className="text-xs text-white/60 leading-relaxed break-keep font-normal">
                    복잡한 세일즈 카피 작성 고민 없이 `{`"{내 업종}"`}`만 넣으면 3초 만에 런치 스크립트가 완출되어 24시간 작동하는 결제 배관이 완성됩니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. THE LEADER SECTION (대표님 프로필 및 철학) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#121316]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group max-w-xs sm:max-w-sm w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A84C] to-amber-200 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                  <div className="relative bg-black rounded-3xl overflow-hidden border border-white/15">
                    <img 
                      src="/profile_placeholder.png" 
                      alt="이형민 대표" 
                      className="w-full h-auto object-cover aspect-square sm:aspect-[4/5] filter grayscale hover:grayscale-0 transition duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-16">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#C9A84C] uppercase block mb-1">GrowthAI Founder</span>
                      <h4 className="text-lg font-extrabold text-white">이형민 (KOI LEE)</h4>
                      <p className="text-xs text-white/50 font-medium">마케팅 퍼널 구축 및 비즈니스 모델 설계 전문가</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-6 text-left">
                <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">FOUNDER'S PHILOSOPHY</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight break-keep leading-tight">
                  "100개의 AI 도구 공부보다,<br />
                  <span className="text-[#C9A84C]">1개의 구매전환 도구가 중요합니다.</span>"
                </h3>
                
                <div className="relative pl-6 border-l-2 border-[#C9A84C] py-2">
                  <Quote className="absolute top-0 left-1 w-4 h-4 text-[#C9A84C]/40" />
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-semibold italic break-keep">
                    "소상공인들이 유튜브 등을 보고 홈페이지는 만들었지만 그 뒤가 없습니다. 트래픽은? 구매전환은? 퍼널 구조는? 전혀 모른 채 방치되어 있죠. 저는 12인 마케팅 거장의 최고 구조를 직접 책에 담고 구축 프로세스를 실행하게 만들 것입니다. 비즈니스의 본질은 도구의 개수가 아닌 매출 전환입니다."
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed break-keep font-normal">
                  <p>
                    하루가 다르게 업그레이드되는 제미나이, 클로드, 지피티 등의 사용법을 배우느라 에너지를 낭비하지 마세요. 소책자를 통한 DB 획득, VSL 예열, 결제로 이어지는 정교한 배관 구조가 갖춰져야 비로소 AI 도구가 돈을 벌어다 줍니다.
                  </p>
                  <p>
                    GrowthAI는 소상공인과 1인 창업가들이 복잡함에 갇히지 않고, 실전에 즉시 작동하는 온라인 세일즈 자동화 시스템을 완성할 수 있도록 모든 뼈대와 실습 환경을 전격 지원합니다.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#C9A84C]" />
                    <span className="text-xs font-bold text-white">마케팅 바이블 저자</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#C9A84C]" />
                    <span className="text-xs font-bold text-white">1:1 퍼널 설계 전문가</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. PRODUCT & OFFER SECTION (강의 구매 & 오퍼 결제 카드) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">OFFER PACKAGE</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                지금 가입하고<br />
                <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                  구매전환 퍼널 시스템을 마스터하세요.
                </span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed break-keep font-normal">
                12인 거장의 세일즈 비결이 고스란히 담긴 VOD 강좌와 3초 마스터 프롬프트 패키지를 100% 무위험 보증 조건으로 확보할 수 있습니다.
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-[#121316] border-2 border-[#C9A84C] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-extrabold text-[10px] px-5 py-2 rounded-bl-2xl uppercase tracking-wider">
                BEST OFFER VALUE
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/10 pb-8 mb-8">
                <div className="md:col-span-8">
                  <span className="text-xs font-bold text-[#C9A84C] block mb-2">VOD 패키지 + 마스터 프롬프트</span>
                  <h3 className="text-2xl font-extrabold text-white mb-3">2026 AI 퍼널 마케팅 마스터클래스</h3>
                  <p className="text-xs text-white/60 leading-relaxed break-keep">
                    VOD 4모듈 커리큘럼 + `{`"{내 업종}"`}` 3초 완출 골조 프롬프트 + 1소스 5채널 n8n 자동화 시나리오 + 실습 숙제 워크시트 전체 패키지 포함.
                  </p>
                </div>
                <div className="md:col-span-4 text-center md:text-right">
                  <div className="text-xs text-white/40 line-through mb-1">정가 450,000원</div>
                  <div className="text-3xl font-black text-[#C9A84C] mb-2">199,000원</div>
                  <span className="text-[10px] text-white/60 bg-white/10 px-2.5 py-1 rounded-full">30일 미션 환불 보증</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest">수강 패키지 핵심 혜택:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C9A84C]" />
                    <span>VOD 4개 핵심 모듈 소장 수강권</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C9A84C]" />
                    <span>3초 완출 마스터 골조 프롬프트</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C9A84C]" />
                    <span>n8n 옴니채널 자동 배포 템플릿</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C9A84C]" />
                    <span>10분 VSL 시나리오 기획서</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => navigate('/product/plf-masterclass')}
                  className="w-full py-4.5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-base transition duration-200 shadow-xl shadow-[#C9A84C]/20 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <span>🚀 199,000원에 평생 수강 신청하기</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* 어뷰징 방지 공정 미션 보증 고지 */}
              <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 text-[11px] text-white/50 leading-relaxed">
                <ShieldCheck size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <p>
                  <strong>🛡️ 미션 수행 조건부 실행 보증:</strong> 본 강의는 디지털 콘텐츠 특성상 무분별한 불법 다운로드 및 녹화를 방지하고자 공정 미션 환불제를 채택합니다. VOD 수강 후 실습 숙제 과제를 모두 수행했음에도 세일즈 퍼널 스크립트가 완성되지 않을 시 100% 전액 환불을 보장합니다.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">FAQ</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
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

        {/* 7. FINAL CTA SECTION (럭셔리 다크 캡슐 카드) */}
        <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-12 lg:px-16 bg-[#000000]">
          <div className="max-w-5xl mx-auto text-center bg-gradient-to-b from-[#121316] to-[#0A0B0D] border border-white/15 rounded-3xl p-10 sm:p-16 shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#C9A84C]" />

            <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-4">GET STARTED TODAY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6 break-keep">
              지금 바로 당신의 노하우를<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                24시간 자동 세일즈 시스템으로
              </span> 전환해보세요.
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed break-keep">
              계속 모르는 척 마케팅 비용을 낭비하시겠습니까, 지금 3분 투자로 매출 상승 원인을 찾으시겠습니까?
            </p>

            <button
              onClick={() => navigate('/diagnose')}
              className="px-10 py-5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-lg transition-all duration-200 shadow-[0_0_30px_rgba(201,168,76,0.3)] inline-flex items-center justify-center gap-2.5 cursor-pointer border-none"
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
