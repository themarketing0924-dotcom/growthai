import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckSquare, Square, Quote, AlertTriangle, BookOpen, Star, ShieldCheck } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const CHECKLIST_ITEMS = [
  { id: 1, text: "홈페이지를 만들었는데, 한 달 방문자가 100명도 안 된다." },
  { id: 2, text: "유튜브 영상을 올려도, 이번 달 수익이 5만 원도 안 된다." },
  { id: 3, text: "인스타 피드를 매일 올리지만, '좋아요'만 달리고 결제는 0건이다." },
  { id: 4, text: "새 AI 툴이 나올 때마다 배우지만, 작심삼일로 끝난다." },
  { id: 5, text: "대행사 비용은 아깝고, 혼자 하자니 뭘 해야 할지 막막하다." }
];

const FIVE_STEPS = [
  { step: "STEP 01", title: "유입 막힘", desc: "길도 없는데 가게 문만 열어둔 상태" },
  { step: "STEP 02", title: "전환 막힘", desc: "'왜 사야 하는지' 설득하지 못함" },
  { step: "STEP 03", title: "결제 막힘", desc: "충동이 일었을 때 바로 낼 버튼 부재" },
  { step: "STEP 04", title: "재구매 막힘", desc: "단골로 묶는 CRM 시스템 부재" },
  { step: "STEP 05", title: "도구 늪", desc: "수익과 무관하게 도구만 배우는 낭비" }
];

export default function MainLandingPage() {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showStory, setShowStory] = useState(false);

  const toggleCheck = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const getDiagnosisMessage = () => {
    const count = checkedItems.length;
    if (count === 0) return "해당 항목을 체크하여 비즈니스 세일즈 배관을 진단해 보세요.";
    if (count <= 2) return `⚠️ 주의: 일부 세일즈 배관 누수 조짐 감지 (${count}개 해당)`;
    return `🚨 경고: 세일즈 배관 누수 심각 단계 (${count}개 해당) - 즉시 조치 필요`;
  };

  return (
    <>
      <Seo
        title="GrowthAI — 100개의 AI 도구보다 1개의 구매전환 퍼널이 낫다"
        description="홈페이지는 만들었지만 매출이 없는 1인 창업가·소상공인을 위한 12인 거장 융합 세일즈 퍼널"
        canonical="/"
        siteName={SITE_NAME}
        image={DEFAULT_OG_IMAGE}
      />
      
      {/* 백그라운드 색상: 제이 에이브러햄 옥스포드 네이비 블루 (#060B16) */}
      <div className="bg-[#060B16] text-[#F5F5F7] min-h-screen font-sans selection:bg-[#C5A880] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* 1. HERO SECTION (제이 에이브러햄 옥스포드 네이비 + 브론즈 골드 #C5A880) */}
        <section className="relative pt-44 pb-28 px-6 sm:px-10 md:px-12 lg:px-16 overflow-hidden border-b border-white/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-br from-[#C5A880]/15 to-transparent rounded-full blur-[180px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* 좌측: 두괄식 카피 */}
              <div className="lg:col-span-7 text-left space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/30 shadow-[0_0_15px_rgba(197,168,128,0.15)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  무료 진단 · 99,000원 상당 마케팅 시크릿 전자책 증정
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] break-keep tracking-tight">
                  남들 다 한다는 AI, 홈페이지까지 만들었는데<br />
                  <span className="bg-gradient-to-r from-[#C5A880] via-[#DBC5A8] to-amber-200 bg-clip-text text-transparent">
                    왜 내 통장엔 아직도 0원일까요?
                  </span>
                </h1>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed break-keep font-normal">
                  실행력이 부족해서가 아닙니다. 돈이 벌리는 '숨겨진 5가지 구조'를 놓치고 있을 뿐입니다. 단 3분 만에 무료로 진단해 드립니다.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    onClick={() => navigate('/diagnose')}
                    className="w-full sm:w-auto px-8 py-5 rounded-full bg-[#C5A880] hover:bg-[#d9b85c] text-black font-extrabold text-base transition-all duration-200 shadow-[0_0_35px_rgba(197,168,128,0.35)] flex items-center justify-center gap-2.5 cursor-pointer border-none"
                  >
                    <span>🔥 내 사이트 무료 진단받기</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => navigate('/book')}
                    className="w-full sm:w-auto px-6 py-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition cursor-pointer border border-white/15"
                  >
                    <span>📘 무료 소책자 받기</span>
                  </button>
                </div>

                <p className="text-xs text-white/40 flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  오늘 127명의 대표님이 세일즈 배관 정밀 진단을 완료했습니다.
                </p>
              </div>

              {/* 우측: 3D 입체감 오버레이 카드 */}
              <div className="lg:col-span-5">
                <div className="bg-[#101726] border border-white/15 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(197,168,128,0.08)] relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute top-0 right-0 bg-[#C5A880] text-black font-extrabold text-[9px] px-3.5 py-1.5 rounded-bl-xl tracking-wider uppercase">
                    12 GIANTS FRAMEWORK
                  </div>

                  <div className="w-20 h-20 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-2xl flex items-center justify-center text-[#C5A880] mb-6">
                    <BookOpen size={36} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">100개의 AI 도구 vs 1개의 구매전환 도구</h3>
                  <p className="text-xs text-white/60 leading-relaxed mb-6">
                    도구 사용법만 외우다 수백 시간을 날리고 계신가요? 12인 마케팅 거장의 원리가 이식된 단 하나의 세일즈 퍼널 구축이 돈을 벌어다 줍니다.
                  </p>

                  <div className="border-t border-white/10 pt-5 grid grid-cols-2 gap-4 text-center">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02]">
                      <span className="text-[10px] text-white/40 block mb-1">진단 소요시간</span>
                      <span className="text-sm font-extrabold text-white">단 3분 완료</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.02]">
                      <span className="text-[10px] text-white/40 block mb-1">전자책 가치</span>
                      <span className="text-sm font-extrabold text-[#C5A880]">99,000원 무료</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. 공감 체크 (인터랙티브 자가 진단 컴포넌트) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#060B16]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#C5A880] font-bold text-xs uppercase tracking-widest block mb-3">공감 체크</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                혹시 지금, 이런 상황 아니신가요?<br />
                <span className="text-[#C5A880]">해당되는 항목을 체크해보세요.</span>
              </h2>
            </div>

            {/* 자가 진단 카드 */}
            <div className="bg-[#101726] border border-white/15 rounded-[32px] p-6 sm:p-10 shadow-2xl space-y-4">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = checkedItems.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-5 rounded-2xl border transition-all duration-200 flex items-center gap-4 cursor-pointer select-none ${
                      isChecked 
                        ? 'border-[#C5A880] bg-[#C5A880]/5' 
                        : 'border-white/10 bg-[#060B16]/50 hover:border-white/15'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-[#C5A880] shrink-0" />
                    ) : (
                      <Square className="w-6 h-6 text-white/20 shrink-0" />
                    )}
                    <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'text-white' : 'text-white/70'}`}>
                      {item.text}
                    </span>
                  </div>
                );
              })}

              {/* 실시간 피드백 창 */}
              <div className="mt-8 p-5 rounded-2xl bg-[#060B16]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-6 h-6 shrink-0 ${checkedItems.length > 2 ? 'text-red-500' : 'text-[#C5A880]'}`} />
                  <span className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    {getDiagnosisMessage()}
                  </span>
                </div>
                {checkedItems.length > 0 && (
                  <button
                    onClick={() => navigate('/diagnose', { state: { score: checkedItems.length } })}
                    className="px-5 py-3 rounded-xl bg-[#C5A880] hover:bg-[#d9b85c] text-black font-extrabold text-xs transition cursor-pointer border-none shrink-0"
                  >
                    정밀 진단서 보기
                  </button>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* 3. 문제 진단 (5대 막힘 STEP - 5열 카드) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#060B16]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C5A880] font-bold text-xs uppercase tracking-widest block mb-3">문제 진단</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                당신이 게을러서 실패한 게 아닙니다.<br />
                <span className="text-[#C5A880]">결제가 일어나는 구조가 끊겨 있기 때문입니다.</span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                이 5가지 중 단 하나만 막혀도, 대표님의 비즈니스 수익은 0으로 수렴합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {FIVE_STEPS.map((step, idx) => (
                <div key={idx} className="p-6 rounded-[24px] bg-[#101726] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#C5A880] tracking-widest uppercase block mb-3">
                      {step.step}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. 운영자 스토리 (프로필 카드 V2 탑재 및 럭셔리 매거진 뷰) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#101726]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* 좌측: 고화질 대표님 3D 아우라 프로필 */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group max-w-xs sm:max-w-sm w-full">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C5A880] to-amber-300 rounded-[32px] blur opacity-25" />
                  <div className="relative bg-[#060B16] rounded-[32px] overflow-hidden border border-white/15">
                    <img 
                      src="/profile_placeholder.png" 
                      alt="이형민 대표" 
                      className="w-full h-auto object-cover aspect-square sm:aspect-[4/5] filter grayscale hover:grayscale-0 transition duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060B16] via-[#060B16]/85 to-transparent p-6 pt-16">
                      <span className="text-[9px] font-extrabold tracking-widest text-[#C5A880] uppercase block mb-1">GrowthAI 대표</span>
                      <h4 className="text-base font-bold text-white">이형민 (KOI LEE)</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 럭셔리 인터뷰 뷰 */}
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="text-[#C5A880] font-bold text-xs uppercase tracking-widest block">운영자 스토리</span>
                
                <h3 className="text-3xl font-extrabold text-white leading-tight break-keep">
                  "저 역시 '이게 왜 안 될까' 절망했던<br />
                  <span className="text-[#C5A880]">평범한 1인 창업가였습니다.</span>"
                </h3>
                
                <div className="relative pl-6 border-l-2 border-[#C5A880] py-1.5">
                  <Quote className="absolute top-0 left-1 w-4 h-4 text-[#C5A880]/35" />
                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-semibold italic break-keep">
                    "처음엔 새로운 AI 툴의 사용법만 익히면 돈이 복사되는 줄 알았습니다. 수백 시간을 날린 후에야 깨달았습니다. 기술보다 '설득과 결제의 구조'가 먼저라는 것을요."
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  <p>
                    대부분의 소상공인은 홈페이지를 만든 뒤 어떻게 트래픽을 모으고 전환을 일으킬지 모릅니다. 100개의 유료 기능보다 고객의 연락처를 획득하고, VSL 영상으로 가치를 입증한 뒤 즉각 결제하게 만드는 '단 1개의 정교한 퍼널'이 강합니다.
                  </p>
                </div>

                {!showStory ? (
                  <button
                    onClick={() => setShowStory(true)}
                    className="text-xs font-bold text-[#C5A880] flex items-center gap-1 cursor-pointer bg-transparent border-none"
                  >
                    진짜 이야기 전체 보기 <ArrowRight size={14} />
                  </button>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-white/50 leading-relaxed bg-[#060B16]/60 p-4 rounded-xl border border-white/5 font-normal"
                  >
                    많은 이들이 새로운 툴을 배우기 위해 소중한 시간과 수십만 원의 강의료를 지불합니다. 하지만 뼈대가 어긋난 시스템은 유입된 고객마저 전부 밖으로 흘려보냅니다. 저는 12인 마케팅 거장들의 프레임워크를 융합하여 1인 기업가도 3분 만에 실전 판매 배관을 완출하는 방식을 완성했고, 이 바이블을 한국 시장에 전수하고자 합니다.
                  </motion.p>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 5. K.S.P. 프레임워크 (3단계 가로 카드) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#060B16]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C5A880] font-bold text-xs uppercase tracking-widest block mb-3">K.S.P. 프레임워크</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                단 3단계만 기억하세요.<br />
                <span className="bg-gradient-to-r from-[#C5A880] via-[#DBC5A8] to-amber-200 bg-clip-text text-transparent">
                  Know → Structure → Profit
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-[28px] bg-[#101726] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] font-extrabold text-sm flex items-center justify-center mb-6">01</div>
                  <h3 className="text-lg font-bold text-white mb-3">01. Know. 내 문제 알기</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-normal">
                    무료 자가 진단을 통해 5단계 세일즈 파이프라인 중 어디에서 잠재고객과 매출이 새고 있는지 정확히 파악합니다.
                  </p>
                </div>
              </div>

              {/* 핵심 전환 단계: 옥스포드 골드 테두리로 시선 하이라이트 강제 수렴 */}
              <div className="p-8 rounded-[28px] bg-[#101726] border border-[#C5A880] flex flex-col justify-between shadow-[0_0_20px_rgba(197,168,128,0.15)]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C5A880] text-black font-extrabold text-sm flex items-center justify-center mb-6">02</div>
                  <h3 className="text-lg font-bold text-white mb-3 font-extrabold">02. Structure. 구조 세우기</h3>
                  <p className="text-xs text-white/80 leading-relaxed font-normal">
                    파편화된 최신 AI 도구를 과감히 버리고, 고객이 페이지에 들어와 결제할 수밖에 없는 심리적 구매 동선을 정교하게 조립합니다.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[28px] bg-[#101726] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] font-extrabold text-sm flex items-center justify-center mb-6">03</div>
                  <h3 className="text-lg font-bold text-white mb-3 font-bold">03. Profit. 수익 자동화</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-normal">
                    완성된 파이프라인 배관에 무료 옴니채널 트래픽을 쏟아붓고, 데이터를 검증하며 비즈니스 수익을 스케일업합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. 성과 사례 (리얼 후기 3선) */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 md:px-12 lg:px-16 border-b border-white/10 bg-[#060B16]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-[#C5A880] font-bold text-xs uppercase tracking-widest block mb-3">성과 사례</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight break-keep leading-tight">
                이미 구조를 바꾼 분들은<br />
                <span className="text-[#C5A880]">통장 숫자가 달라지고 있습니다.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-[28px] bg-[#101726] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-xs text-yellow-400 mb-4">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal break-keep">
                    "AI로 홈페지만 만들고 6개월째 매출 0원이었습니다. 진단받고 구조 하나 바꿨더니 3주 만에 첫 수강생 결제가 들어왔습니다."
                  </p>
                </div>
                <div className="text-[10px] text-white/40 font-bold border-t border-white/5 pt-4 mt-6">— O카페 사장님</div>
              </div>

              <div className="p-8 rounded-[28px] bg-[#101726] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-xs text-yellow-400 mb-4">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal break-keep">
                    "여기서 뼈대를 잡고 나니 복잡하게 매달리던 여러 도구들을 버리고, 딱 필요한 툴 2개로 자동화시켰습니다. 시간이 엄청 남습니다."
                  </p>
                </div>
                <div className="text-[10px] text-white/40 font-bold border-t border-white/5 pt-4 mt-6">— 1인 에이전시 대표</div>
              </div>

              <div className="p-8 rounded-[28px] bg-[#101726] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-xs text-yellow-400 mb-4">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal break-keep">
                    "고객의 저항 심리를 허물고 10분 VSL 공식에 따른 카피라이팅 구조를 적용하자마자, 문의가 즉시 3건이나 입금으로 이어졌습니다."
                  </p>
                </div>
                <div className="text-[10px] text-white/40 font-bold border-t border-white/5 pt-4 mt-6">— 프리랜서 강사</div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. FINAL CTA (제이 에이브러햄 스타일의 옥스포드 네이비 & 골드 캡슐) */}
        <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-12 lg:px-16 bg-[#060B16]">
          <div className="max-w-5xl mx-auto text-center bg-gradient-to-b from-[#101726] to-[#0A0B0D] border border-white/15 rounded-3xl p-10 sm:p-16 shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#C5A880]" />

            <span className="text-[#C5A880] font-bold text-xs uppercase tracking-widest block mb-4">지금 바로</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6 break-keep">
              계속 모르는 척 하시겠습니까,<br />
              <span className="bg-gradient-to-r from-[#C5A880] via-[#DBC5A8] to-amber-200 bg-clip-text text-transparent">
                지금 3분 투자로 원인을 찾으시겠습니까?
              </span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed break-keep">
              이 구조를 모른 채 내일도 새로운 AI 툴을 배운다면, 6개월 뒤에도 수익은 오늘과 똑같을 것입니다.<br />
              * 맞춤형 진단 리포트 및 [거장 12인 시크릿 전자책(99,000원 상당)]은 한시적으로 무료 제공됩니다.
            </p>

            <button
              onClick={() => navigate('/diagnose')}
              className="px-10 py-5 rounded-full bg-[#C5A880] hover:bg-[#d9b85c] text-black font-extrabold text-base sm:text-lg transition-all duration-200 shadow-[0_0_30px_rgba(197,168,128,0.3)] inline-flex items-center justify-center gap-2.5 cursor-pointer border-none"
            >
              <span>🚀 지금 바로 무료 진단 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <Footer lang="ko" />
      </div>
    </>
  );
}
