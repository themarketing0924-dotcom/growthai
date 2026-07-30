import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, Award, BookOpen, Quote } from 'lucide-react';
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
        title="GrowthAI — 2026 대한민국 1위 AI 세일즈 퍼널 마스터"
        description="변호사, 의사, 트레이너, 인테리어 등 노하우를 가진 누구나 {00} 입력으로 24시간 자동 판매 시스템 구축"
        canonical="/"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* 1. HERO SECTION (max-w-6xl, 1:1 대칭 2컬럼 레이아웃) */}
        <section ref={heroRef} className="relative pt-40 pb-28 px-6 sm:px-10 md:px-12 lg:px-16 overflow-hidden border-b border-white/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C9A84C]/10 rounded-full blur-[170px] pointer-events-none" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* 좌측 컬럼 (lg:col-span-7): 카피 및 CTA */}
              <div className="lg:col-span-7 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-6"
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
                  상세페이지 글귀 100번 고치는 것은 매출에 도움이 되지 않습니다.<br />
                  <strong className="text-white font-bold">{`"{내 업종/서비스명}"`} 1개만 괄호에 넣으면 3초 만에 스크립트가 완출되는 마스터 골조 프롬프트</strong>로 내 사업에 24시간 판매 자동화 배관을 장착하세요.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {PROFESSIONS.map((p) => (
                    <span key={p} className="px-3.5 py-1.5 rounded-full bg-[#161617] border border-white/10 text-xs font-medium text-white/80">
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
                    <span>3분 무료 진단 & 특강 받기</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => navigate('/book')}
                    className="w-full sm:w-auto px-6 py-4.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition cursor-pointer border border-white/15"
                  >
                    <span>📘 무료 마케팅 소책자 신청</span>
                  </button>
                </motion.div>

                <p className="text-xs text-white/40 mt-4 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                  신청 즉시 문자로 10분 VSL 무료 특강과 PDF 바이블이 자동 발송됩니다.
                </p>
              </div>

              {/* 우측 컬럼 (lg:col-span-5): 럭셔리 퍼널 컨트롤 패널 카드 */}
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
                      <span className="text-[11px] font-bold text-green-400">24H 감지 중</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#C9A84C]/20 text-[#C9A84C] font-bold text-xs flex items-center justify-center">02</div>
                        <div>
                          <h4 className="text-xs font-bold text-white">10분 VSL 신뢰 예열</h4>
                          <p className="text-[10px] text-white/50">제프 워커 PLF 3단계</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#C9A84C]">자동 해금</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#C9A84C]/20 to-black border border-[#C9A84C]/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#C9A84C] text-black font-extrabold text-xs flex items-center justify-center">03</div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{`"{내 업종}"`} 프롬프트</h4>
                          <p className="text-[10px] text-white/70">3초 골조 스크립트 완출</p>
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

        {/* 2. THE PROBLEM SECTION (max-w-6xl, 일관성 있는 50:50 대칭 카드) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">혹시 지금, 이런 상황 아니신가요?</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                왜 홈페이지를 만들고 마케팅을 해도<br />
                <span className="text-[#C9A84C]">매출은 그대로일까요?</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed break-keep">
                답은 대표님의 게으름이 아닙니다. 고객이 들어와 결제할 때까지 자연스럽게 설득해 내는 [구매전환 퍼널 시스템]이 없었기 때문입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">01</div>
                  <h3 className="text-xl font-bold text-white mb-3">연락처를 수집하지 못하는 페이지</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    방문자는 많은데, 이들의 연락처(DB)를 수집하는 이탈 차단 장치(Lead Magnet)가 없어 방문 고객을 그냥 놓쳐버립니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">02</div>
                  <h3 className="text-xl font-bold text-white mb-3">설득과 신뢰 예열의 부재</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    고객이 들어오자마자 무작정 구매만을 유도하여 거부감을 유발합니다. 제프 워커의 3단계 가치 입증 공식으로 신뢰를 먼저 구축해야 합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">03</div>
                  <h3 className="text-xl font-bold text-white mb-3">명확하지 않은 제안과 저항</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    단순히 가격을 나열할 뿐, 고객이 거절하기 힘든 매력적인 가치 오퍼(Value Offer) 및 100% 무위험 환불 역보증 장치가 부족합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm flex items-center justify-center mb-6">04</div>
                  <h3 className="text-xl font-bold text-white mb-3">자동화되지 않은 노동 집약적 상담</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal break-keep">
                    매번 수동으로 상담하고 가치를 설명하느라 정작 비즈니스 크기를 키우고 본업에 집중할 시간과 에너지가 부족해집니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. THE SOLUTION SECTION (max-w-6xl, 3열 럭셔리 모듈 패널) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">THE GROWTHAI SOLUTION</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                대표님의 지식과 노하우를<br />
                <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                  자동으로 세일즈하는 3단계 퍼널을 세팅합니다.
                </span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed break-keep">
                100개의 AI 도구를 배우느라 밤새지 마세요. 매출을 올리는 단 1개의 구매전환 도구가 낫습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-extrabold text-sm flex items-center justify-center mb-6">01</div>
                  <h3 className="text-lg font-bold text-white mb-3">1단계: 무료 마케팅 바이블 소책자</h3>
                  <p className="text-xs text-white/60 leading-relaxed break-keep font-normal">
                    해외 유료 수준의 핵심 지식을 가공하여 리드 수집용 소책자로 탑재 ➔ 성함, 이메일, 전화번호 DB를 자동으로 확보합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#C9A84C]/20 via-[#121316] to-[#121316] border-2 border-[#C9A84C] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C] text-black font-extrabold text-sm flex items-center justify-center mb-6">02</div>
                  <h3 className="text-lg font-bold text-white mb-3">2단계: 10분 VSL 무료 특강</h3>
                  <p className="text-xs text-white/80 leading-relaxed break-keep font-normal">
                    성격 급한 한국인을 위해 핵심만 타격하는 10분 예열 영상을 통해 대표님 서비스의 전문성을 증명하고 구매 장벽을 허뭅니다.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-extrabold text-sm flex items-center justify-center mb-6">03</div>
                  <h3 className="text-lg font-bold text-white mb-3">3단계: 마스터 골조 프롬프트</h3>
                  <p className="text-xs text-white/60 leading-relaxed break-keep font-normal">
                    {`"{내 업종}"`} 입력 시 3초 만에 런치 스크립트, 문자 문구, 세일즈 카피를 완출하여 24시간 판매 시스템을 완성합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. THE LEADER SECTION (대표 소개 - 회색 플레이스홀더를 없애고 럭셔리 프로필 사진 탑재) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#121316]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* 좌측: 고화질 대표님 럭셔리 프로필 이미지 */}
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
                      <span className="text-[10px] font-extrabold tracking-widest text-[#C9A84C] uppercase block mb-1">GrowthAI 대표</span>
                      <h4 className="text-lg font-extrabold text-white">이형민 (KOI LEE)</h4>
                      <p className="text-xs text-white/50 font-medium">마케팅 퍼널 구축 및 1인 기업 전문 컨설턴트</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 럭셔리 매거진 스타일 텍스트 소개 */}
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-2">ABOUT THE FOUNDER</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight break-keep leading-tight">
                  "대표님, 100개의 도구보다<br />
                  <span className="text-[#C9A84C]">단 1개의 구매전환 도구가 중요합니다.</span>"
                </h3>
                
                <div className="relative pl-6 border-l-2 border-[#C9A84C] py-2">
                  <Quote className="absolute top-0 left-1 w-4 h-4 text-[#C9A84C]/40" />
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-semibold italic break-keep">
                    "매일 쏟아지는 새로운 AI 도구들의 기능을 배우느라 시간을 쏟지 마세요. 마케팅의 본질은 고객의 구매 심리를 예열하고 구매 장벽을 허무는 '구조와 배관'입니다. 저는 이 퍼널을 책에 담아 누구나 하나씩 구축할 수 있게 만듭니다."
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed break-keep font-normal">
                  <p>
                    수많은 1인 창업가와 전문직 대표님들이 유튜브로 AI 홈페이지 만들기는 배우셨지만, **"그 뒤에 트래픽은? 구매전환은? 퍼널 구조는?"** 전혀 모른 채 방치하고 있습니다.
                  </p>
                  <p>
                    GrowthAI는 제프 워커의 PLF 공식과 러셀 브런슨의 가치 사다리를 결합하고, 한국인 특유의 빨리빨리 성향(두괄식 카피)과 문자 중심 마케팅에 맞춰 재창조한 최상위 구매전환 엔진을 제공합니다.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#C9A84C]" />
                    <span className="text-xs font-bold text-white">마케팅 바이블 저자</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#C9A84C]" />
                    <span className="text-xs font-bold text-white">1:1 퍼널 세팅 전문가</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. K-SUCCESS PROOF SECTION (한국형 성공사례, max-w-6xl) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest block mb-3">SUCCESS STORIES</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                이미 구조를 바꾼 분들은<br />
                <span className="text-[#C9A84C]">통장 숫자가 달라지고 있습니다.</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed break-keep">
                대한민국 1% 전문직 및 소상공인 대표님들이 경험한 퍼널의 실제 성과입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider block mb-3">변호사 · 전문직</span>
                  <h4 className="text-base font-bold text-white mb-2">"월 법률 상담 건수 3.5배 급증"</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-normal mb-4 break-keep">
                    블로그 법률 칼럼만 올릴 땐 문의가 거의 없었는데, 3분 진단 폼과 상담 전 예열 영상을 도입한 뒤 24시간 자동으로 수임 계약 상담이 예약됩니다.
                  </p>
                </div>
                <div className="text-[10px] text-white/40 font-bold border-t border-white/5 pt-4">L 법무법인 대표변호사</div>
              </div>

              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider block mb-3">인테리어 · 설비</span>
                  <h4 className="text-base font-bold text-white mb-2">"단순 가격비교 고객 100% 차단"</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-normal mb-4 break-keep">
                    무작정 전화해서 단가만 묻는 체리피커 때문에 스트레스였으나, 인테리어 사기 방지 무료 VSL 특강을 거쳐 온 진성 고객들 덕분에 계약률이 400% 늘었습니다.
                  </p>
                </div>
                <div className="text-[10px] text-white/40 font-bold border-t border-white/5 pt-4">K 디자인 스튜디오 대표</div>
              </div>

              <div className="p-8 rounded-3xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider block mb-3">지식창업 · 강사</span>
                  <h4 className="text-base font-bold text-white mb-2">"자는 동안에도 19만원 패키지 결제"</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-normal mb-4 break-keep">
                    1:1 오프라인 레슨으로 몸이 지치던 한계를 극복했습니다. VOD 강좌와 마스터 프롬프트를 결합한 뒤, 자면서도 통장으로 자동 판매 수익이 들어옵니다.
                  </p>
                </div>
                <div className="text-[10px] text-white/40 font-bold border-t border-white/5 pt-4">M 비즈니스 아카데미 대표</div>
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

        {/* 7. FINAL CTA SECTION (럭셔리 다크 캡슐 카드형태) */}
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
