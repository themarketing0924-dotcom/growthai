import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lock, User, Mail, Phone, Gift } from 'lucide-react';
import { Seo, SITE_NAME } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { submitLeadToN8n } from '../services/n8nService';

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

    // n8n 웹훅 트리거 전송
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
        title="2026 AI 퍼널 마케팅 바이블 소책자 무료 받기 | GrowthAI"
        description="100개의 AI 도구 공부보다 24시간 파는 1개의 구매전환 퍼널이 낫다"
        canonical="/book"
        siteName={SITE_NAME}
      />

      <div className="bg-[#000000] text-[#F5F5F7] min-h-screen font-sans flex flex-col selection:bg-[#C9A84C] selection:text-black">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        <main className="flex-1 pt-32 pb-24 px-6 sm:px-10 md:px-12 lg:px-16 max-w-4xl mx-auto w-full">
          
          {/* 상단 뱃지 & 헤드카피 */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-[#C9A84C] border border-white/15 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              2026 대한민국 1인 창업가·소상공인 필수 소책자
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 break-keep tracking-tight">
              100개의 AI 도구 공부보다,<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E5C365] to-amber-200 bg-clip-text text-transparent">
                24시간 파는 1개의 구매전환 퍼널이 낫다!
              </span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed break-keep">
              ChatGPT, 클로드 기능 배우느라 피곤하셨죠? 자는 동안에도 고객 DB를 모으고 결제시키는 <strong className="text-white font-bold">[2026 AI 퍼널 마케팅 바이블 소책자]</strong>를 문자로 즉시 발송해 드립니다.
            </p>
          </div>

          {/* 리드 수집 폼 & 소책자 프리뷰 카드 */}
          <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {!isSuccess ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* 좌측 소책자 입체 커버 */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#C9A84C] via-amber-600 to-yellow-800 rounded-2xl p-6 text-black shadow-2xl flex flex-col justify-between border border-white/20 transform hover:scale-105 transition-transform duration-300">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest bg-black text-[#C9A84C] px-2.5 py-1 rounded-md">GrowthAI Special Edition</span>
                      <h2 className="text-xl font-extrabold text-black mt-4 leading-tight">
                        2026 AI 퍼널<br />마케팅 바이블
                      </h2>
                      <p className="text-xs text-black/80 mt-2 font-medium">
                        글 1개로 5개 채널 파이프라인 자동화 & 구매전환 세일즈 배관 구축
                      </p>
                    </div>
                    <div className="pt-4 border-t border-black/20 flex justify-between items-center text-[11px] font-bold">
                      <span>KOI LEE 저</span>
                      <span>비매품 (무료 배포)</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 mt-4 flex items-center gap-1">
                    <Gift size={14} className="text-[#C9A84C]" /> 신청 즉시 n8n 자동 배관이 문자로 발송합니다.
                  </p>
                </div>

                {/* 우측 3필드 리드 수집 폼 */}
                <div className="md:col-span-7">
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
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">이메일 주소 (소책자 PDF 리포트 발송용) *</label>
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
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">휴대폰 번호 (소책자문자 & 10분 무료 특강 발송용) *</label>
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
                        id="book-agree"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="rounded accent-[#C9A84C]"
                      />
                      <label htmlFor="book-agree" className="text-xs text-white/60 cursor-pointer">
                        [필수] 개인정보 수집 및 혜택·특강 안내 문자/이메일 수신 동의
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-extrabold text-base transition duration-200 shadow-2xl shadow-[#C9A84C]/30 flex items-center justify-center gap-2 cursor-pointer border-none mt-2"
                    >
                      {isSubmitting ? (
                        <span>n8n 자동화 엔진으로 발송 수속 중...</span>
                      ) : (
                        <>
                          <Lock size={16} />
                          <span>🎁 마케팅 바이블 소책자 문자로 즉시 받기</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                    <ShieldCheck size={14} className="text-[#C9A84C]" />
                    <span>입력하신 정보는 보안 클라우드 안에서 소책자 발송 외에 3자에게 제공되지 않습니다.</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">n8n 자동화 배관 발송이 완료되었습니다!</h3>
                <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                  입력하신 휴대폰 번호({phone})로 [2026 AI 퍼널 마케팅 바이블 소책자] 다운로드 링크가 즉시 발송되었습니다.<br />
                  잠시 후 <strong>10분 무료 마스터클래스 VOD 특강 페이지</strong>로 이동합니다...
                </p>
              </div>
            )}
          </div>

        </main>

        <Footer lang="ko" />
      </div>
    </>
  );
}
