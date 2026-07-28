import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Lock, User, Mail, Phone, HelpCircle, BookOpen, ShieldCheck } from 'lucide-react';
import { Seo, SITE_NAME } from '../components/Seo';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { submitLeadToN8n } from '../services/n8nService';

const TEN_SOLUTIONS = [
  "상세페이지 글귀 100번 고쳐도 매출 0원인 진짜 이유와 퍼널 해결책",
  "100개의 AI 도구 공부보다 낫다! 3초 완출 골조 프롬프트 사용법",
  "블로그 방문자는 있는데 DB 수집을 못 해 고객을 놓치는 배관 수리법",
  "카메라 노출 없이 10분 만에 런치 동영상(VSL) 제작하는 비유 공식",
  "글 1개로 유튜브·인스타·스레드 5개 채널에 배포하는 옴니채널 비밀",
  "수강생의 구매 저항과 가격 부담을 100% 허무는 가치 오퍼 구성",
  "체리피커와 악의적 환불 요구를 막는 공정 미션 수행 조건부 보증",
  "단순 가격 비교 고객을 차단하고 24시간 나를 선택하게 하는 예열법",
  "구글/네이버 상위 노출을 위한 E-E-A-T 기반 AI 콘텐츠 집필 시크릿",
  "자가 진단부터 릴리즈, 결제창까지 24시간 입금시키는 자동화 배관"
];

export default function LeadBookPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('전문직 / 1인 기업 / 소상공인');
  const [agree, setAgree] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !agree) return;

    setIsSubmitting(true);

    await submitLeadToN8n({
      name,
      email,
      phone,
      profession,
      agreed: agree,
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/guide/day1', { state: { name, email, phone, profession } });
    }, 2000);
  };

  return (
    <>
      <Seo
        title="2026 AI 퍼널 마케팅 바이블 소책자 무료 신청 | GrowthAI"
        description="100개의 AI 도구 공부보다 24시간 파는 1개의 구매전환 퍼널이 낫다"
        canonical="/book"
        siteName={SITE_NAME}
      />

      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans flex flex-col selection:bg-[#C9A84C] selection:text-black">
        
        {/* 상단 100% 단일 스퀴즈 헤더 (이탈 방지) */}
        <header className="py-5 px-6 border-b border-white/10 text-center bg-[#000000]/90 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="text-xl font-extrabold text-[#C9A84C] tracking-tight">GrowthAI</span>
            <span className="text-xs text-white/60 bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
              🔒 100% 비매품 소책자 즉시 다운로드
            </span>
          </div>
        </header>

        <main className="flex-1 pt-12 pb-24 px-6 sm:px-10 md:px-12 lg:px-16 max-w-5xl mx-auto w-full">
          
          {/* 상단 헤드카피 (5xl 그리드 규격과 완벽 대칭 동기화) */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 mb-5 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              2026 대한민국 1인 창업가·소상공인 한정 비매품 소책자
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 break-keep tracking-tight">
              100개의 AI 도구 공부보다,<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                24시간 파는 1개의 구매전환 퍼널이 낫다!
              </span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed break-keep font-normal">
              ChatGPT, 클로드 기능 익히다 지쳐버린 대표님을 위한 단 한 권의 해답.<br />
              자면서도 고객 DB를 모으고 결제시키는 <strong className="text-white font-bold">[2026 AI 퍼널 마케팅 바이블 소책자]</strong>를 문자로 3초 만에 발송해 드립니다.
            </p>
          </div>

          {/* 좌우 높이 및 시각적 1:1 대칭 밸런스 2컬럼 카격 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* 👈 좌측 (Left Column, md:col-span-6): 소책자 커버 & 10가지 핵심 해결 목차 완벽 통합 카드 */}
            <div className="md:col-span-6 bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                {/* 소책자 시각 헤더 */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="w-24 shrink-0 aspect-[3/4] bg-gradient-to-br from-[#C9A84C] via-amber-600 to-yellow-800 rounded-xl p-3 text-black shadow-xl flex flex-col justify-between border border-white/30">
                    <span className="text-[7px] font-extrabold uppercase bg-black text-[#C9A84C] px-1.5 py-0.5 rounded w-max">BIBLE</span>
                    <h3 className="text-xs font-extrabold text-black leading-tight">2026 AI 퍼널<br />마케팅 바이블</h3>
                    <span className="text-[8px] text-black/80 font-bold">KOI LEE 저</span>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-[11px] font-bold border border-[#C9A84C]/30 mb-1.5">
                      <BookOpen size={12} /> 비매품 한정 소책자
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">소책자에 수록된 핵심 가치</h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      도구 공부 제로! 24시간 파는 1개의 구매전환 퍼널 구축 노하우 100% 수록.
                    </p>
                  </div>
                </div>

                {/* 10가지 핵심 해결 체크리스트 */}
                <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-[#C9A84C]" />
                  <span>이 책으로 즉시 해결되는 10가지 고통:</span>
                </h4>

                <div className="space-y-2.5">
                  {TEN_SOLUTIONS.map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <div className="w-4 h-4 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-white/80 leading-snug">
                        {sol}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#C9A84C] font-semibold">
                <ShieldCheck size={14} /> <span>100% 무료 PDF 및 10분 VSL 특강 포함</span>
              </div>
            </div>

            {/* 👉 우측 (Right Column, md:col-span-6): 3필드 신청서 폼 카드 (1:1 세로 대칭 밸런스) */}
            <div className="md:col-span-6 bg-[#161617] border-2 border-[#C9A84C] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C9A84C] text-black font-extrabold text-[10px] px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                선착순 무료 배포 중
              </div>

              <div>
                <div className="mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white mb-1">🎁 소책자 즉시 무료 신청</h3>
                  <p className="text-xs text-white/60">성함, 이메일, 휴대폰 번호를 입력하시면 3초 만에 문자로 PDF가 발송됩니다.</p>
                </div>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">대표님 성함 *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                          <User size={16} />
                        </div>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                          placeholder="홍길동"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">이메일 주소 (소책자 PDF 발송용) *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                          <Mail size={16} />
                        </div>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">휴대폰 번호 (소책자문자 & 10분 특강 발송용) *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                          <Phone size={16} />
                        </div>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                          placeholder="010-1234-5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">전문 분야 / 업종 선택 *</label>
                      <select 
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                      >
                        <option>전문직 / 서비스업 (변호사, 의사, 약사, 인테리어, 설비, 마사지, 헬스트레이너 등)</option>
                        <option>지식 창업 / 교육업 (강사, 코치, 전자책 저자, 컨설턴트 등)</option>
                        <option>네트워크 마케팅 / 유통 / 커머스 / 기타 1인 기업</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input 
                        type="checkbox" 
                        id="book-agree-single"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="rounded accent-[#C9A84C]"
                      />
                      <label htmlFor="book-agree-single" className="text-xs text-white/60 cursor-pointer">
                        [필수] 개인정보 수집 및 혜택·특강 안내 문자/이메일 수신 동의
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 sm:py-5.5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-base sm:text-lg transition duration-200 shadow-[0_0_30px_rgba(201,168,76,0.35)] flex items-center justify-center gap-2 cursor-pointer border-none mt-4"
                    >
                      {isSubmitting ? (
                        <span>소책자 발송 수속 중...</span>
                      ) : (
                        <>
                          <Lock size={18} />
                          <span>🎁 마케팅 바이블 소책자 문자로 받기</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-2">소책자 발송 신청이 완료되었습니다!</h3>
                    <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                      입력하신 휴대폰 번호({phone})로 [2026 AI 퍼널 마케팅 바이블 소책자] 다운로드 링크가 즉시 발송되었습니다.<br />
                      잠시 후 <strong>10분 무료 마스터클래스 VOD 특강 페이지</strong>로 이동합니다...
                    </p>
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
