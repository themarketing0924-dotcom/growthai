import { motion } from 'framer-motion';
import { useState } from 'react';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const inquiryTypes = ['강의 문의', '기업 교육 제안', '미디어·인터뷰', '제휴 제안', '기타'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <Seo
        title="비즈니스 문의 | GrowthAI"
        description="기업 교육, 강연, 제휴, 미디어 문의를 위한 연락 페이지입니다."
        canonical="/contact"
        image={DEFAULT_OG_IMAGE}
        keywords={['비즈니스 문의', '기업 교육', '제휴', 'GrowthAI']}
      />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">CONTACT</p>
          <h1 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            비즈니스 문의
          </h1>
          <p className="text-white/50 text-[16px] mt-3">기업 교육, 강연, 미디어, 제휴 등 모든 협업 문의를 환영합니다</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: Contact info */}
          <motion.div
            className="md:col-span-4 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h2 className="apple-white-gradient text-[18px] font-bold mb-5 border-b border-white/10 pb-4">연락처</h2>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '✉️', label: '이메일', value: 'contact@growthai.kr' },
                  { icon: '📱', label: '카카오채널', value: '@growthai' },
                  { icon: '📺', label: '유튜브', value: '@AIFlowe' },
                  { icon: '📍', label: '위치', value: '서울특별시 강남구' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-[18px] w-8">{c.icon}</span>
                    <div>
                      <p className="text-white/30 text-[11px] uppercase tracking-widest font-semibold">{c.label}</p>
                      <p className="text-white/80 text-[14px]">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
              <h3 className="text-white font-semibold text-[15px] mb-2">⏱ 응답 시간</h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                영업일 기준 24시간 이내 답변드립니다. 급한 문의는 카카오채널을 이용해주세요.
              </p>
            </div>

            <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
              <h3 className="text-white font-semibold text-[15px] mb-3">📋 문의 유형별 안내</h3>
              <ul className="flex flex-col gap-2">
                {[
                  '기업 AI 교육 · 특강 요청',
                  '유튜브·방송·팟캐스트 출연',
                  '서적 추천사·협업',
                  '플랫폼·서비스 제휴',
                ].map(item => (
                  <li key={item} className="text-white/50 text-[13px] flex items-center gap-2">
                    <span className="text-white/25">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[60px] mb-4">✅</div>
                  <h2 className="apple-white-gradient text-[24px] font-bold mb-3">문의가 접수되었습니다!</h2>
                  <p className="text-white/50 text-[15px] leading-relaxed">
                    영업일 기준 24시간 이내에 답변 드리겠습니다.<br/>감사합니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-3 border border-white/20 text-white rounded-xl text-[14px] font-medium hover:bg-white/5 transition-all cursor-pointer bg-transparent"
                  >
                    다시 문의하기
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/40 text-[12px] uppercase tracking-widest font-semibold block mb-2">이름 *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[12px] uppercase tracking-widest font-semibold block mb-2">회사/소속</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      placeholder="GrowthAI (선택)"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[12px] uppercase tracking-widest font-semibold block mb-2">이메일 *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@company.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/40 text-[12px] uppercase tracking-widest font-semibold block mb-2">문의 유형</label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all border cursor-pointer ${
                          form.type === type ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/15 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[12px] uppercase tracking-widest font-semibold block mb-2">문의 내용 *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="문의 내용을 자세히 작성해 주세요."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-bold text-[15px] rounded-xl hover:bg-white/90 transition-all cursor-pointer border-none"
                >
                  문의 보내기 →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
