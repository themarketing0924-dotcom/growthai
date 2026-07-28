import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Gift, Mail, User, Phone, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { Seo, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    text: "대표님의 현재 전문 분야/업종은 무엇인가요?",
    options: [
      "전문직 / 서비스업 (변호사, 의사, 약사, 인테리어, 설비, 마사지, 헬스트레이너, 프로골퍼 등)",
      "지식 창업 / 교육업 (강사, 코치, 전자책 저자, 컨설턴트 등)",
      "네트워크 마케팅 / 유통 / 커머스 / 기타 1인 기업"
    ]
  },
  {
    id: 2,
    text: "현재 대표님의 온라인 세일즈 배관(리드 수집 ➔ 결제) 상태는 어떠한가요?",
    options: [
      "자산 제로: 내 노하우는 있으나, 고객 DB 수집 및 자동 판매 배관이 전혀 없다.",
      "트래픽 보유: 블로그/유튜브/SNS/기존 고객 등 트래픽은 있으나 결제 전환율이 미비하다."
    ]
  },
  {
    id: 3,
    text: "기존의 AI 도구(ChatGPT, 클로드 등)를 마케팅에 주로 어떻게 사용하고 계신가요?",
    options: [
      "유튜브 보고 따라 하는 짜깁기용 단순 콘텐츠 생성 수준",
      "구체적인 구매 전환 퍼널과 자동화 배관이 연결된 상태",
      "아직 실무 마케팅에 제대로 활용하지 못하고 있음"
    ]
  }
];

export default function DiagnosePageExp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    const updated = [...answers, optionIdx];
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(3);
      setTimeout(() => {
        setStep(4);
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !agree) return;
    
    setSubmitted(true);
    const isNoAsset = answers[1] === 0;
    setTimeout(() => {
      navigate('/experimental/guide/day1', { 
        state: { 
          name, 
          email, 
          phone, 
          profession: QUESTIONS[0].options[answers[0]],
          segment: isNoAsset ? 'no-asset' : 'has-traffic' 
        } 
      });
    }, 1500);
  };

  const isNoAsset = answers[1] === 0;

  return (
    <>
      <Seo
        title="2026 업종별 AI PLF 3분 무료 진단 | GrowthAI"
        description="노하우를 가진 누구나 {00} 입력으로 자동 판매 퍼널 진단"
        canonical="/experimental/diagnose"
        siteName={SITE_NAME}
      />
      <div className="bg-[#050505] text-[#f7f7f5] min-h-screen font-sans flex flex-col">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6">
          <div className="max-w-2xl w-full">
            
            <AnimatePresence mode="wait">
              {step < QUESTIONS.length && (
                <motion.div 
                  key={`question-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-8">
                    {QUESTIONS.map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-[#C9A84C]' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  
                  <span className="text-[#C9A84C] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">
                    업종별 퍼널 진단 질문 {step + 1} / {QUESTIONS.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 leading-relaxed">
                    {QUESTIONS[step].text}
                  </h2>
                  
                  <div className="space-y-3.5">
                    {QUESTIONS[step].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A84C]/50 transition-all text-sm sm:text-base font-medium group flex justify-between items-center"
                      >
                        <span className="pr-4">{opt}</span>
                        <ArrowRight size={18} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <Loader2 size={56} className="animate-spin text-[#C9A84C] mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-3">대표님의 업종별 세그먼트를 분석 중입니다...</h2>
                  <p className="text-white/60 text-sm">마케팅 거장 12인 뼈대 & {`{내 업종}`} 마스터 골조 프롬프트 매핑 중</p>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="bg-red-500/10 border-b border-red-500/20 p-6 sm:p-8 text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">🚨 진단 결과: 
                      {isNoAsset ? (
                        <span className="text-red-400"> [초기 잠재고객 DB 수집 및 세일즈 배관 누수] 단계</span>
                      ) : (
                        <span className="text-red-400"> [전환 배관 부재 및 오퍼 저항] 단계</span>
                      )}
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                      {isNoAsset 
                        ? "대표님의 독보적인 노하우가 있으나, 24시간 자동으로 고객 DB를 모으고 결제시키는 퍼널 시스템이 부재합니다. 3초 만에 완출되는 마스터 골조 프롬프트로 배관을 잡아야 합니다."
                        : "방문자나 트래픽은 있으나 가격 저항을 없애는 하모지식 가치 오퍼 배관이 막혔습니다. AI PLF 동영상 퍼널을 이식해야 합니다."
                      }
                    </p>
                  </div>

                  {!submitted ? (
                    <div className="p-6 sm:p-10">
                      <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
                        <div className="w-full sm:w-1/3 aspect-[3/4] bg-gradient-to-br from-[#C9A84C] to-yellow-700 rounded-xl flex items-center justify-center p-5 text-center shadow-lg transform -rotate-1 border border-white/20">
                          <div className="bg-black/60 p-3 rounded-lg backdrop-blur-sm w-full h-full flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-[#C9A84C] mb-1 uppercase">2026 VOD + Prompt Package</span>
                            <h3 className="font-bold text-xs sm:text-sm mb-1">업종별 {`{00}`} 마스터 골조 프롬프트 & VOD</h3>
                            <p className="text-[10px] text-white/50 line-through mt-auto">정가 99,000원</p>
                          </div>
                        </div>
                        <div className="w-full sm:w-2/3 space-y-3">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30">
                            <Gift size={14} /> 맞춤 진단 솔루션 즉시 발송
                          </div>
                          <h3 className="text-lg font-bold">대표님의 노하우를 24시간 파는 VOD 특강과 골조 템플릿을 드립니다.</h3>
                          <p className="text-white/70 text-xs leading-relaxed">
                            아래에 **성함, 이메일, 휴대폰 번호**를 입력하시면 10분 마스터클래스 영상 링크와 PDF 가이드북이 문자와 이메일로 3초 만에 발송됩니다.
                          </p>
                        </div>
                      </div>

                      {/* 성함 + 이메일 + 휴대폰 번호 3종 리드 수집 폼 */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/70 mb-1.5">대표님 성함 *</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                              <User size={16} />
                            </div>
                            <input 
                              type="text" 
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-black/60 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                              placeholder="홍길동"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-white/70 mb-1.5">이메일 주소 (PDF 리포트 발송용) *</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                              <Mail size={16} />
                            </div>
                            <input 
                              type="email" 
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-black/60 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                              placeholder="name@company.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-white/70 mb-1.5">휴대폰 번호 (무료 특강 & 템플릿 문자 발송용) *</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                              <Phone size={16} />
                            </div>
                            <input 
                              type="tel" 
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-black/60 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                              placeholder="010-1234-5678"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input 
                            type="checkbox" 
                            id="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="rounded accent-[#C9A84C]"
                          />
                          <label htmlFor="agree" className="text-xs text-white/60 cursor-pointer">
                            [필수] 개인정보 수집 및 혜택·특강 안내 문자/이메일 수신 동의
                          </label>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-4 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition-all duration-200 shadow-xl shadow-[#C9A84C]/20 flex items-center justify-center gap-2 mt-2"
                        >
                          <Lock size={16} />
                          <span>🎁 99,000원 템플릿 문자로 받고 특강 보기</span>
                          <ArrowRight size={18} />
                        </button>
                      </form>

                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                        <ShieldCheck size={14} className="text-[#C9A84C]" />
                        <span>수집된 정보는 특강 안내 외에 제3자에게 제공되지 않습니다.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 sm:p-12 text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/40">
                        <CheckCircle2 size={36} className="text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">진단 및 문자 발송이 완료되었습니다!</h3>
                      <p className="text-white/70 text-sm mb-4 leading-relaxed">
                        입력하신 휴대폰 번호({phone})로 특강 링크와 전자책이 즉시 발송되었습니다.<br/>
                        잠시 후 <strong>{name}님 전용 10분 무료 마스터클래스 VOD 페이지</strong>로 이동합니다...
                      </p>
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
