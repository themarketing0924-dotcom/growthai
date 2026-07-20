import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Gift, Mail, Loader2 } from 'lucide-react';
import { Seo, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    text: "웹사이트나 SNS를 통해 유입되는 한 달 방문자 수가 얼마나 되나요?",
    options: ["100명 미만 (거의 없다)", "100명 ~ 1,000명 (가끔 온다)", "1,000명 이상 (꽤 온다)"]
  },
  {
    id: 2,
    text: "방문자가 사이트에 들어왔을 때, 결제나 문의로 이어지는 전환율은 어느 정도인가요?",
    options: ["1% 미만 (거의 없다)", "1% ~ 5% (가끔 결제한다)", "모르겠다 / 측정 안 함"]
  },
  {
    id: 3,
    text: "가장 최신 트렌드의 AI 도구(GPT, Midjourney 등)를 비즈니스에 얼마나 활용 중이신가요?",
    options: ["자주 배우지만 실전 적용은 못함", "콘텐츠 생산에 적극 활용 중", "전혀 사용하지 않음"]
  }
];

export default function DiagnosePage() {
  const [step, setStep] = useState(0); // 0~2: Questions, 3: Loading, 4: Result/Lead Form
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    setAnswers([...answers, optionIdx]);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(3); // Go to loading
      setTimeout(() => {
        setStep(4); // Go to result after 2.5s
      }, 2500);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // TODO: Connect to Stibee or Backend API
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title="5단계 무료 진단 | GrowthAI"
        description="내 사이트의 결제가 막힌 진짜 이유를 3분 안에 진단해 드립니다."
        canonical="/diagnose"
        siteName={SITE_NAME}
      />
      <div className="bg-[#050505] text-[#f7f7f5] min-h-screen font-sans flex flex-col">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-6">
          <div className="max-w-2xl w-full">
            
            <AnimatePresence mode="wait">
              {/* QUESTIONS STAGE */}
              {step < QUESTIONS.length && (
                <motion.div 
                  key={`question-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-8">
                    {QUESTIONS.map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-[#C9A84C]' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  
                  <span className="text-[#C9A84C] font-bold text-sm tracking-widest uppercase mb-4 block">
                    진단 질문 {step + 1} / {QUESTIONS.length}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
                    {QUESTIONS[step].text}
                  </h2>
                  
                  <div className="space-y-4">
                    {QUESTIONS[step].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A84C]/50 transition-all text-lg font-medium group flex justify-between items-center"
                      >
                        {opt}
                        <ArrowRight size={20} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* LOADING STAGE */}
              {step === 3 && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <Loader2 size={64} className="animate-spin text-[#C9A84C] mx-auto mb-8" />
                  <h2 className="text-2xl font-bold mb-4">대표님의 비즈니스 구조를 분석 중입니다...</h2>
                  <p className="text-white/60">트래픽, 전환율, 심리적 병목 지점 계산 중</p>
                </motion.div>
              )}

              {/* RESULT & LEAD FORM STAGE */}
              {step === 4 && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="bg-red-500/10 border-b border-red-500/20 p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">🚨 진단 결과: <span className="text-red-400">3단계(결제/전환) 누수 심각</span></h2>
                    <p className="text-white/80">
                      대표님의 사이트는 들어와도 '왜 사야 하는지' 심리를 건드리지 못하고 이탈하고 있습니다.
                    </p>
                  </div>

                  {!submitted ? (
                    <div className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                        <div className="w-full md:w-1/3 aspect-[3/4] bg-gradient-to-br from-[#C9A84C] to-yellow-700 rounded-xl flex items-center justify-center p-6 text-center shadow-lg transform -rotate-2 border-4 border-white/10">
                          <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm w-full h-full flex flex-col justify-center">
                            <span className="text-xs font-bold text-[#C9A84C] mb-2 uppercase">PDF E-Book</span>
                            <h3 className="font-bold text-lg mb-2">세계 마케팅 거장 12인의 구매 전환 시크릿</h3>
                            <p className="text-xs text-white/50 line-through mt-auto">정가 99,000원</p>
                          </div>
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold border border-green-500/30">
                            <Gift size={16} /> 특별 혜택
                          </div>
                          <h3 className="text-xl font-bold">이 누수를 지금 당장 막아야 합니다.</h3>
                          <p className="text-white/70 text-sm leading-relaxed">
                            이 문제를 당장 해결할 수 있도록, <strong>현재 크몽에서 99,000원에 실제 판매 중인 [세계 마케팅 거장 12인의 구매 전환 시크릿] 전자책(PDF)</strong>과 맞춤형 진단 리포트를 입력하시는 이메일로 즉시 무료 발송해 드립니다.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">이메일 주소</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail size={18} className="text-white/40" />
                            </div>
                            <input 
                              type="email" 
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-black/50 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                              placeholder="PDF 리포트를 받을 이메일을 입력하세요"
                            />
                          </div>
                        </div>
                        <button 
                          type="submit"
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-[#C9A84C] text-white font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                        >
                          🎁 99,000원 전자책 + 리포트 즉시 받기
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="p-8 md:p-16 text-center">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">성공적으로 발송되었습니다!</h3>
                      <p className="text-white/70 mb-8">
                        입력하신 이메일({email})로 전자책과 진단 리포트가 발송되었습니다.<br/>
                        메일함(또는 스팸함)을 확인해주세요.
                      </p>
                      <Link to="/" className="inline-flex items-center gap-2 text-[#C9A84C] font-bold hover:underline">
                        메인 화면으로 돌아가기 <ArrowRight size={18} />
                      </Link>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </main>
      </div>
    </>
  );
}
