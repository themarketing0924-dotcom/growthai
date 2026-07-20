import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, AlertTriangle, ChevronRight, BarChart3, Users, Zap, ShieldCheck } from 'lucide-react';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function MainLandingPage() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(5).fill(false));

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const checkCount = checkedItems.filter(Boolean).length;

  return (
    <>
      <Seo
        title="GrowthAI — 돈이 도는 구조를 짓다"
        description="상위 1%만 아는 수익의 비밀, 내 사이트의 치명적 문제 무료 진단받기"
        canonical="/"
        image={DEFAULT_OG_IMAGE}
        siteName={SITE_NAME}
      />
      
      {/* Apple-style pure black background with SF Pro / Pretendard font */}
      <div className="bg-black text-[#f5f5f7] selection:bg-[#C9A84C] selection:text-black min-h-screen font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Pretendard", sans-serif', letterSpacing: '-0.015em' }}>
        
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {/* [S1] 헤드라인 (Hero Section) */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-40 pb-32 px-6 text-center overflow-hidden">
          
          <motion.div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            
            <div className="mb-6 flex items-center justify-center gap-2">
              <span className="text-sm font-semibold tracking-widest text-[#ff3b30] uppercase">GrowthAI 진단 리포트</span>
            </div>
            
            {/* Apple-style massive, tight header */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.1] mb-8 break-keep">
              남들 다 한다는 AI.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#ff9f0a] to-[#ffd60a]">
                왜 내 통장엔 0원일까요?
              </span>
            </h1>
            
            {/* Apple-style grey subtext with bold white highlights */}
            <p className="text-xl md:text-2xl text-[#86868b] mb-12 max-w-3xl font-medium leading-relaxed break-keep">
              실행력이 부족해서가 아닙니다. 돈이 벌리는 <strong className="text-white">숨겨진 5가지 구조</strong>를 놓치고 있을 뿐입니다. 
              상위 1%만 아는 수익의 비밀, 내 사이트는 어디서 피를 흘리고 있는지 <strong className="text-white">단 3분 만에 무료로 진단</strong>해 드립니다.
            </p>
            
            <div className="flex flex-col items-center gap-6 w-full justify-center">
              <Link to="/diagnose" className="px-10 py-5 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                내 사이트 무료 진단받기
              </Link>
              <span className="text-sm text-[#86868b] font-medium">오늘만 127명이 진단을 완료했습니다.</span>
            </div>
          </motion.div>
        </section>

        {/* [S2] 공감 체크리스트 */}
        <section className="py-32 px-6 bg-black relative border-t border-[#333336]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">혹시 지금, 이런 상황 아니신가요?</h2>
              <p className="text-xl text-[#86868b] font-medium">해당되는 항목을 체크해보세요.</p>
            </div>

            <div className="space-y-4">
              {[
                "홈페이지/상세페이지를 만들었는데, 한 달 방문자가 100명도 안 된다.",
                "밤새워 유튜브 영상을 올려도, 이번 달 수익이 5만 원도 안 된다.",
                "인스타에 매일 피드를 올리지만, '좋아요'만 달리고 결제는 0건이다.",
                "새 AI 툴이 나올 때마다 배우지만, 작심삼일로 끝나는 게 벌써 수십 번이다.",
                "대행사에 월 100만 원 주자니 피 같고, 혼자 하자니 뭘 해야 할지 막막하다."
              ].map((text, idx) => (
                <div 
                  key={idx} 
                  onClick={() => toggleCheck(idx)}
                  className={`p-6 md:p-8 rounded-3xl border cursor-pointer transition-all duration-300 flex items-center gap-6
                    ${checkedItems[idx] ? 'bg-[#1c1c1e] border-[#ff3b30] text-white' : 'bg-transparent border-[#333336] text-[#86868b] hover:bg-[#1c1c1e]'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors
                    ${checkedItems[idx] ? 'bg-[#ff3b30] border-[#ff3b30]' : 'border-[#86868b]'}`}>
                    {checkedItems[idx] && <CheckCircle2 size={20} className="text-white" />}
                  </div>
                  <span className={`text-xl md:text-2xl font-medium tracking-tight ${checkedItems[idx] ? 'text-white' : ''}`}>{text}</span>
                </div>
              ))}
            </div>

            {checkCount >= 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 p-10 bg-[#1c1c1e] rounded-3xl text-center"
              >
                <h3 className="text-3xl font-bold text-[#ff3b30] tracking-tighter mb-4">경고: 3개 이상 해당됩니다.</h3>
                <p className="text-xl text-[#86868b] font-medium">지금 당장 무의미한 툴(Tool) 공부를 멈추고 구조를 점검해야 할 때입니다.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* [S3] 문제 원인 진단 */}
        <section className="py-32 px-6 relative border-t border-[#333336]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                당신이 게을러서 실패한 게 아닙니다.<br/>
                <span className="text-[#C9A84C]">결제가 일어나는 구조</span>가 끊겨 있기 때문입니다.
              </h2>
              <p className="text-xl md:text-2xl text-[#86868b] font-medium max-w-3xl mx-auto">이 5가지 중 단 하나만 막혀 있어도, 당신의 수익은 0으로 수렴합니다.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { title: "유입 막힘", desc: "길도 없는데 무작정 가게 문만 열어둔 상태", icon: <Users size={32} strokeWidth={1.5}/> },
                { title: "전환 막힘", desc: "들어와도 '왜 사야 하는지' 설득하지 못함", icon: <BarChart3 size={32} strokeWidth={1.5}/> },
                { title: "결제 막힘", desc: "충동이 일었을 때 바로 돈을 낼 버튼 부재", icon: <CheckCircle2 size={32} strokeWidth={1.5}/> },
                { title: "재구매 막힘", desc: "단골로 묶는 이메일/CRM 시스템 부재", icon: <ShieldCheck size={32} strokeWidth={1.5}/> },
                { title: "도구 늪", desc: "수익과 무관하게 '예쁜 그림'만 뽑는 낭비", icon: <Zap size={32} strokeWidth={1.5}/> }
              ].map((step, idx) => (
                <div key={idx} className="bg-[#1c1c1e] rounded-3xl p-8 relative overflow-hidden group hover:bg-[#2c2c2e] transition-colors duration-300 text-center flex flex-col items-center">
                  <div className="text-[#f5f5f7] mb-6">{step.icon}</div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">Step {idx+1}.<br/>{step.title}</h3>
                  <p className="text-[15px] text-[#86868b] font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [S4] 운영자 권위 요약 */}
        <section className="py-32 px-6 bg-[#000000] border-t border-[#333336]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-3xl bg-[#1c1c1e] shrink-0 overflow-hidden flex items-center justify-center text-[#86868b]">
              {/* Profile Image Placeholder */}
              Photo
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
                "저 역시 '이게 왜 안 될까' 절망했던 평범한 창업가였습니다."
              </h2>
              <div className="space-y-6 text-xl text-[#86868b] font-medium leading-relaxed">
                <p>
                  처음엔 저도 AI 툴 사용법만 익히면 돈이 복사되는 줄 알았습니다. 수백 시간을 날린 후에야 깨달았습니다. 기술보다 <strong className="text-white">'설득의 구조'</strong>가 먼저라는 것을요.
                </p>
                <p>
                  글로벌 마케팅 거장들의 프레임워크와 멘토님의 실전 노하우를 철저히 뜯어고쳤습니다. 그 결과 <strong>단 4주 만에 트래픽 0에서 수익이 폭발하는 시스템</strong>을 만들었습니다.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/about" className="inline-flex items-center gap-2 text-[#2997ff] text-xl font-medium hover:underline">
                  제 진짜 이야기와 전체 실적 보기 <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* [S5] KSP 프레임워크 */}
        <section className="py-32 px-6 border-t border-[#333336] bg-[#000000]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-tight">그래서 어떻게 해야 하냐고요?<br/>단 3단계만 기억하세요.</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mt-20 text-left">
              <div className="bg-[#1c1c1e] p-12 rounded-3xl">
                <div className="text-5xl font-bold text-[#333336] mb-6 tracking-tighter">01</div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight"><span className="text-[#C9A84C]">K</span>now.<br/>내 문제 알기</h3>
                <p className="text-lg text-[#86868b] font-medium leading-relaxed">무료 진단을 통해 내 비즈니스가 5단계 파이프라인 중 어디서 피를 흘리고 있는지 정확히 파악합니다.</p>
              </div>
              <div className="bg-[#1c1c1e] p-12 rounded-3xl">
                <div className="text-5xl font-bold text-[#333336] mb-6 tracking-tighter">02</div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight"><span className="text-[#C9A84C]">S</span>tructure.<br/>구조 세우기</h3>
                <p className="text-lg text-[#86868b] font-medium leading-relaxed">파편화된 AI 도구들을 버리고, 고객이 결제할 수밖에 없는 완벽한 심리적 동선을 조립합니다.</p>
              </div>
              <div className="bg-[#1c1c1e] p-12 rounded-3xl">
                <div className="text-5xl font-bold text-[#333336] mb-6 tracking-tighter">03</div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight"><span className="text-[#C9A84C]">P</span>rofit.<br/>수익 자동화</h3>
                <p className="text-lg text-[#86868b] font-medium leading-relaxed">완성된 파이프라인에 무료 트래픽을 쏟아붓고, 성과를 데이터로 확인하며 스케일업합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* [S6] 사회적 증거 */}
        <section className="py-32 px-6 border-t border-[#333336]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-20 leading-tight">의심하지 마세요.<br/>이미 구조를 바꾼 분들은<br/>통장 숫자가 달라지고 있습니다.</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { author: "O카페 사장님", text: "AI로 홈페이지만 만들고 6개월째 매출 0원이었습니다. 진단받고 '결제 유도' 구조 하나 바꿨더니 3주 만에 첫 결제가 들어왔습니다. 소름 돋네요." },
                { author: "1인 에이전시 대표", text: "맨날 유튜브 보면서 잡다한 툴 배우기 바빴는데, 여기서 뼈대를 잡고 나니 제가 진짜 필요한 툴 딱 2개만 쓰게 되었습니다. 시간이 엄청 남아요." },
                { author: "프리랜서 강사", text: "블로그, 인스타 다 해봐도 연락 한 통 없었는데... 고객 심리를 건드리는 '카피 구조'를 적용한 날, 문의가 3건이나 들어왔습니다." }
              ].map((review, idx) => (
                <div key={idx} className="bg-[#1c1c1e] p-10 rounded-3xl flex flex-col h-full">
                  <p className="text-xl font-medium text-[#f5f5f7] leading-relaxed mb-10 flex-grow">"{review.text}"</p>
                  <p className="text-lg font-semibold text-[#86868b]">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [S7] 하단 CTA */}
        <section className="py-40 px-6 border-t border-[#333336]">
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight">계속 모르는 척 하시겠습니까,<br/>지금 원인을 찾으시겠습니까?</h2>
            <p className="text-2xl text-[#86868b] font-medium mb-16 leading-relaxed max-w-3xl mx-auto">
              이 구조를 모른 채 내일도 새로운 AI 툴을 배운다면...<br/>
              6개월 뒤에도 당신의 수익은 오늘과 똑같을 것입니다.
            </p>
            <div className="flex flex-col items-center justify-center gap-6">
              <Link to="/diagnose" className="px-12 py-6 rounded-full bg-[#f5f5f7] text-black font-semibold text-2xl hover:scale-105 transition-transform duration-300">
                무료 진단 시작하기
              </Link>
              <p className="text-[15px] text-[#86868b] font-medium mt-4 max-w-lg">
                * 1:1 맞춤형 진단 리포트 및 [거장 12인 시크릿 전자책(99,000원 상당)]은 시스템 부하로 언제 유료로 전환될지 모릅니다.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
