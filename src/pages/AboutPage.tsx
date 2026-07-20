import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, BarChart3, Star } from 'lucide-react';
import { Seo, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="운영자 스토리 | GrowthAI"
        description="저 역시 수많은 밤을 새우며 '이게 왜 안 될까' 절망했던 1인 창업가였습니다."
        canonical="/about"
        siteName={SITE_NAME}
      />
      <div className="bg-[#050505] text-[#f7f7f5] min-h-screen font-sans">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            {/* 왼쪽: 프로필 이미지 영역 */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-[4/5] rounded-3xl bg-white/10 border border-white/10 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-medium">
                  프로필 이미지<br/>(추후 교체 예정)
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">제임스 (James)</h1>
                  <p className="text-[#C9A84C] font-medium text-sm">GrowthAI 대표 · 마케팅 구조 설계자</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-3 text-[#C9A84C] mb-2">
                    <BarChart3 size={20} />
                    <span className="font-bold">주요 성과</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-2">
                    <li>• 단 4주 만에 트래픽 0에서 수익 창출 자동화</li>
                    <li>• 1인 기업 맞춤형 KSP 구조 설계 완료</li>
                    <li>• 누적 100명 이상의 소상공인 문제 진단</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 오른쪽: 스토리텔링 영역 */}
            <div className="w-full md:w-2/3 space-y-12">
              
              {/* 섹션 1: 공감 스토리 */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold leading-tight">
                  "남들처럼 자고 싶을 때 자고, 일하고 싶을 때 일하는 줄 알았습니다."
                </h2>
                <div className="text-lg text-white/70 leading-relaxed space-y-4">
                  <p>
                    처음 1인 창업을 시작했을 때, 저 역시 가장 트렌디한 AI 툴을 배우고 웹사이트를 번듯하게 만들면 돈이 저절로 들어올 줄 알았습니다. 매일 밤낮으로 새로운 기능을 익히고, 유튜브 영상 편집에 매달렸습니다.
                  </p>
                  <p>
                    하지만 결과는 처참했습니다. 한 달 내내 고생해서 번 돈은 5만 원 남짓. <strong className="text-white">제가 가진 기술의 문제가 아니라, 제 비즈니스에 '돈이 도는 파이프라인' 자체가 없다는 것</strong>을 그때는 몰랐습니다.
                  </p>
                </div>
              </section>

              {/* 섹션 2: 깨달음과 멘토 */}
              <section className="space-y-6 bg-white/[0.02] p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-[#C9A84C] flex items-center gap-2">
                  <Star size={20} /> 터닝 포인트: 멘토 Jay와의 만남
                </h3>
                <div className="text-lg text-white/70 leading-relaxed space-y-4">
                  <p>
                    절망의 늪에서 허우적대던 중, 글로벌 탑티어 마케팅 거장들의 프레임워크와 스승이신 <strong>Jay 멘토님</strong>의 가르침을 만났습니다. 
                  </p>
                  <p>
                    Jay 멘토님은 저에게 <span className="italic">"AI 도구를 몇 개 아느냐가 중요한 게 아니다. 고객이 어떻게 설득되고 지갑을 여는지 '구조(Structure)'를 아는 자만이 살아남는다"</span>고 가르쳐 주셨습니다. 
                  </p>
                  <p>
                    그날 이후 모든 툴 공부를 멈추고 인간의 심리와 비즈니스 퍼널(Funnel)을 미친 듯이 파고들었습니다. 러셀 브론슨, 알렉스 호르모지 등 12명의 거장들이 공통으로 말하는 '수익의 바이블'을 한국 시장의 1인 기업가 수준에 맞게 완벽히 해부했습니다.
                  </p>
                </div>
              </section>

              {/* 섹션 3: 비전과 CTA */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold">이제, 제가 만든 '바이블(설명서)'을 나누려 합니다.</h2>
                <div className="text-lg text-white/70 leading-relaxed space-y-4">
                  <p>
                    GrowthAI는 단순한 코딩 교육이나 단편적인 마케팅 꼼수를 파는 곳이 아닙니다. 철저한 심리학과 행동경제학에 기반하여, 고객 스스로 <strong>'나 이거 사고 싶어 미치겠어'</strong>라고 느끼게 만드는 구조의 바이블(설명서)을 제공합니다.
                  </p>
                  <p>
                    과거의 저처럼 이유도 모른 채 피를 흘리고 있는 대표님들을 위해, 가장 시급한 문제를 먼저 진단해 드립니다. 지금 바로 확인해 보세요.
                  </p>
                </div>
                
                <div className="pt-6">
                  <Link to="/diagnose" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-[#C9A84C] text-white font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                    지금 무료 진단 받기 <ArrowRight size={20} />
                  </Link>
                </div>
              </section>

            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
