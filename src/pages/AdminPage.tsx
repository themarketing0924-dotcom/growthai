import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Key, Users, BookOpen, FileText, Send, Download, 
  CheckCircle2, XCircle, Calendar, Sparkles, RefreshCw, Plus, Edit3, Trash2, Eye, ShieldCheck 
} from 'lucide-react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// 샘플 수집된 리드 데이터
const INITIAL_LEADS = [
  { id: 1, name: '김철수', email: 'chulsoo@lawfirm.com', phone: '010-9876-5432', profession: '변호사', date: '2026-07-28 14:20' },
  { id: 2, name: '이영희', email: 'younghee@clinic.kr', phone: '010-8765-4321', profession: '의사/약사', date: '2026-07-28 15:10' },
  { id: 3, name: '박민수', email: 'minsu@fitstudio.com', phone: '010-7654-3210', profession: '헬스트레이너', date: '2026-07-28 16:45' },
  { id: 4, name: '최동욱', email: 'dongwook@interior.co.kr', phone: '010-6543-2109', profession: '인테리어/설비', date: '2026-07-28 17:30' },
];

// 샘플 회원 및 수강 권한 데이터
const INITIAL_MEMBERS = [
  { id: 101, name: '김철수', email: 'chulsoo@lawfirm.com', courseUnlocked: true, expiryDate: '2026-10-28', plan: '풀 패키지 마스터 패스' },
  { id: 102, name: '이영희', email: 'younghee@clinic.kr', courseUnlocked: false, expiryDate: '2026-08-28', plan: 'VOD 단독 수강권' },
  { id: 103, name: '박민수', email: 'minsu@fitstudio.com', courseUnlocked: true, expiryDate: '2026-12-31', plan: '풀 패키지 마스터 패스' },
];

// 샘플 블로그 포스트 데이터 (SEO/AEO/GEO 에이전트 생성 초안)
const INITIAL_POSTS = [
  { 
    id: 1, 
    title: "2026 변호사·전문직을 위한 AI 세일즈 퍼널 구축 가이드", 
    category: "마케팅 퍼널", 
    status: "텔레그램 전송완료 (초안)", 
    seoScore: 98, 
    aeoScore: 95, 
    geoScore: 96,
    content: "ChatGPT로 블로그 글만 올린다고 고객이 법률 상담을 신청하지 않습니다. 24시간 자동으로 잠재고객 DB를 수집하는 퍼널이 핵심입니다.",
    myOpinion: "실제 현장에서 변호사 상담 건수가 3배 이상 증가했던 진짜 비결은 기술이 아니라 '상담 전 신뢰 예열 동영상'이었습니다."
  },
  { 
    id: 2, 
    title: "카메라 노출 없이 10분 만에 타격형 VSL 영상 만드는 법", 
    category: "VOD 제작", 
    status: "발행 완료", 
    seoScore: 94, 
    aeoScore: 92, 
    geoScore: 95,
    content: "얼굴을 공개하지 않고도 수강생의 구매 의욕을 자극하는 비유 화법과 3단계 스토리라인 스크립트 작성법.",
    myOpinion: "얼굴보다 중요한 건 고객의 고통을 정확히 건드리는 첫 15초 결론 타격 문구입니다."
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'members' | 'blog' | 'settings'>('leads');

  // 리드 및 회원 상태
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // 블로그 에이전트 생성 상태
  const [newTopic, setNewTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [telegramNotice, setTelegramNotice] = useState(false);

  // 로그인 처리
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'growthai2026' || password === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 엑셀/CSV 다운로드
  const handleExportCSV = () => {
    const headers = "성함,이메일,휴대폰번호,신청업종,신청일시\n";
    const rows = leads.map(l => `${l.name},${l.email},${l.phone},${l.profession},${l.date}`).join("\n");
    const blob = new Blob(["\uFEFF" + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GrowthAI_Leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  // 회원 강의 열어주기/잠그기 토글
  const toggleCourseAccess = (id: number) => {
    setMembers(members.map(m => m.id === id ? { ...m, courseUnlocked: !m.courseUnlocked } : m));
  };

  // 수강 날짜 변경
  const updateExpiryDate = (id: number, date: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, expiryDate: date } : m));
  };

  // SEO/AEO/GEO 블로그 에이전트 글 생성 시뮬레이션
  const handleGenerateBlogArticle = () => {
    if (!newTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        title: `[AI 에이전트 생성] ${newTopic}`,
        category: "AI 퍼널 마케팅",
        status: "텔레그램 전송완료 (초안)",
        seoScore: 99,
        aeoScore: 97,
        geoScore: 98,
        content: `'${newTopic}'에 대한 SEO, Perplexity(AEO), Gemini/ChatGPT(GEO) 검색 최적화 본문 초안이 자동 작성되었습니다.`,
        myOpinion: ""
      };
      setPosts([newPost, ...posts]);
      setIsGenerating(false);
      setTelegramNotice(true);
      setNewTopic('');
      setTimeout(() => setTelegramNotice(false), 5000);
    }, 2000);
  };

  // 대표님 노하우 덧붙이고 최종 발행
  const handlePublishPost = (id: number, opinionText: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: '발행 완료', myOpinion: opinionText } : p));
    alert('대표님의 노하우와 함께 블로그 글이 즉시 수동 발행되었습니다!');
  };

  return (
    <>
      <Seo title="GrowthAI 관리자 대시보드 | 어드민 모드" description="수집된 리드, 회원 수강 권한 및 SEO/AEO/GEO 에이전트 관리" />
      <div className="min-h-screen bg-[#000000] text-white font-sans flex flex-col">
        <Navbar entranceComplete={true} lang="ko" setLang={() => {}} />

        {!isAuthenticated ? (
          /* 로그인 팝업 */
          <div className="flex-1 flex items-center justify-center pt-28 pb-16 px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full bg-[#161617] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2">GrowthAI 어드민 보안 인증</h1>
              <p className="text-xs text-white/50 mb-8">관리자 전용 대시보드 접근을 위해 비밀번호를 입력하세요.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Key size={18} />
                  </div>
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 (초기: 1234 또는 growthai2026)" 
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-base transition shadow-xl shadow-[#C9A84C]/20 border-none cursor-pointer"
                >
                  어드민 접속하기
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* 어드민 대시보드 메인 */
          <div className="flex-1 pt-28 pb-20 px-6 sm:px-10 md:px-12 lg:px-16 max-w-6xl mx-auto w-full">
            
            {/* 상단 통합 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest block mb-1">GrowthAI Admin Panel</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">마케터 & 대표 통합 관리자 대시보드</h1>
              </div>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/70 transition cursor-pointer border-none self-start sm:self-auto"
              >
                로그아웃
              </button>
            </div>

            {/* 어드민 탭 네비게이션 */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
              <button 
                onClick={() => setActiveTab('leads')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer border-none flex items-center gap-2 ${
                  activeTab === 'leads' ? 'bg-[#C9A84C] text-black' : 'bg-[#161617] text-white/70 hover:text-white'
                }`}
              >
                <Users size={14} /> 수집된 리드 DB ({leads.length}명)
              </button>
              <button 
                onClick={() => setActiveTab('members')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer border-none flex items-center gap-2 ${
                  activeTab === 'members' ? 'bg-[#C9A84C] text-black' : 'bg-[#161617] text-white/70 hover:text-white'
                }`}
              >
                <ShieldCheck size={14} /> 회원 수강 권한 & 만료일 관리
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer border-none flex items-center gap-2 ${
                  activeTab === 'blog' ? 'bg-[#C9A84C] text-black' : 'bg-[#161617] text-white/70 hover:text-white'
                }`}
              >
                <Sparkles size={14} /> SEO/AEO/GEO 에이전트 & 텔레그램 보고
              </button>
            </div>

            {/* TAB 1: 수집된 리드 DB 뷰 */}
            {activeTab === 'leads' && (
              <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">📥 3분 진단 잠재고객 수집 데이터</h2>
                    <p className="text-xs text-white/50">성함, 이메일, 휴대폰 번호(문자용), 신청 업종 리스트</p>
                  </div>
                  <button 
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer border-none"
                  >
                    <Download size={14} /> 엑셀 (CSV) 다운로드
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-black/50 text-white/40 uppercase tracking-wider text-[10px] border-b border-white/10">
                      <tr>
                        <th className="p-3">성함</th>
                        <th className="p-3">이메일</th>
                        <th className="p-3">휴대폰 번호</th>
                        <th className="p-3">전문 업종</th>
                        <th className="p-3">수집 일시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-bold text-white">{l.name}</td>
                          <td className="p-3 text-white/70">{l.email}</td>
                          <td className="p-3 text-[#C9A84C] font-mono">{l.phone}</td>
                          <td className="p-3"><span className="px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-[10px]">{l.profession}</span></td>
                          <td className="p-3 text-white/40">{l.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: 회원 강의 열어주기/잠그기 & 날짜 지정 */}
            {activeTab === 'members' && (
              <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white mb-1">🔐 회원 수강 권한 & 수강 만료 날짜 설정</h2>
                  <p className="text-xs text-white/50">결제 회원별로 VOD 강의실을 열어주거나 잠그고, 수강 유효 만료일을 직접 지정합니다.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-black/50 text-white/40 uppercase tracking-wider text-[10px] border-b border-white/10">
                      <tr>
                        <th className="p-3">회원명</th>
                        <th className="p-3">이메일</th>
                        <th className="p-3">구매 플랜</th>
                        <th className="p-3">강의실 열기/잠그기</th>
                        <th className="p-3">수강 만료일 (날짜 지정)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-bold text-white">{m.name}</td>
                          <td className="p-3 text-white/70">{m.email}</td>
                          <td className="p-3 text-[#C9A84C]">{m.plan}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleCourseAccess(m.id)}
                              className={`px-3 py-1.5 rounded-full font-bold text-[11px] flex items-center gap-1.5 cursor-pointer border-none ${
                                m.courseUnlocked 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
                              }`}
                            >
                              {m.courseUnlocked ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                              {m.courseUnlocked ? '강의 열림 (Access Granted)' : '강의 잠김 (Locked)'}
                            </button>
                          </td>
                          <td className="p-3">
                            <input 
                              type="date"
                              value={m.expiryDate}
                              onChange={(e) => updateExpiryDate(m.id, e.target.value)}
                              className="bg-black/60 border border-white/20 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: SEO/AEO/GEO 에이전트 & 텔레그램 보고 */}
            {activeTab === 'blog' && (
              <div className="space-y-8">
                
                {/* 텔레그램 연동 안내 뱃지 */}
                {telegramNotice && (
                  <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Send size={16} /> ✈️ 텔레그램으로 대표님께 초안 보고 알림이 전송되었습니다!
                    </span>
                    <span className="font-bold">전송 성공</span>
                  </div>
                )}

                {/* 에이전트 생성 폼 */}
                <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C9A84C]" />
                    <span>SEO · AEO · GEO 최적화 AI 블로그 작성 에이전트</span>
                  </h2>
                  <p className="text-xs text-white/60 mb-6">
                    주제를 입력하면 SEO(구글), AEO(Perplexity/ChatGPT), GEO(생성형 AI) 최적화 블로그 초안이 완성된 후 **대표님 텔레그램으로 즉시 보고**됩니다.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="예: 2026 인테리어 사장님을 위한 3분 동영상 런치 퍼널"
                      className="flex-1 bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                    />
                    <button
                      onClick={handleGenerateBlogArticle}
                      disabled={isGenerating}
                      className="px-6 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border-none shrink-0"
                    >
                      {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                      <span>{isGenerating ? 'AI 팀 작성 및 텔레그램 보고 중...' : 'AI 포스트 생성 & 텔레그램 보고'}</span>
                    </button>
                  </div>
                </div>

                {/* 포스트 검수 & 대표 노하우 덧붙이기 목록 */}
                <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-base font-bold text-white mb-6">📝 생성된 포스트 초안 & 대표님 수동 발행 검수함</h3>

                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div key={post.id} className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-3">
                          <div>
                            <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider">{post.category}</span>
                            <h4 className="text-base font-bold text-white">{post.title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              SEO {post.seoScore}점 | AEO {post.aeoScore}점 | GEO {post.geoScore}점
                            </span>
                            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                              post.status === '발행 완료' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {post.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-white/70 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                          {post.content}
                        </p>

                        {/* 대표님 마지막 1-2줄 노하우 입력창 */}
                        <div className="space-y-2 pt-2">
                          <label className="block text-xs font-bold text-[#C9A84C]">
                            ✍️ 대표님 전용 마지막 1~2줄 생각/관점/노하우 덧붙이기:
                          </label>
                          <textarea 
                            rows={2}
                            defaultValue={post.myOpinion}
                            id={`opinion-${post.id}`}
                            placeholder="예: '실제 현장에서 변호사 상담 건수가 3배 이상 증가했던 진짜 비결은 기술이 아니라 신뢰 예열 동영상이었습니다.'"
                            className="w-full bg-black/70 border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                          />
                          {post.status !== '발행 완료' && (
                            <button
                              onClick={() => {
                                const inputEl = document.getElementById(`opinion-${post.id}`) as HTMLTextAreaElement;
                                handlePublishPost(post.id, inputEl.value);
                              }}
                              className="px-5 py-2.5 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-bold text-xs flex items-center gap-2 cursor-pointer border-none"
                            >
                              <CheckCircle2 size={14} />
                              <span>대표님 노하우 덧붙여 블로그 최종 발행하기</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        <Footer lang="ko" />
      </div>
    </>
  );
}
