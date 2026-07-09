import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const posts = [
  { id: 1, category: '성과공유', title: '드디어 쇼츠 1만뷰 달성했습니다! 🎉', author: '김○○', time: '2시간 전', likes: 42, comments: 18, isPinned: true },
  { id: 2, category: '질문', title: 'N8N 카카오 연동할 때 Webhook 설정 어떻게 하나요?', author: '이○○', time: '4시간 전', likes: 7, comments: 12, isPinned: false },
  { id: 3, category: '정보공유', title: 'ChatGPT 4o 새로운 기능 정리해봤어요 (요약본 첨부)', author: '박○○', time: '어제', likes: 31, comments: 9, isPinned: false },
  { id: 4, category: '성과공유', title: '구독자 1,000명 달성! Step 1 수강 후 28일만에', author: '최○○', time: '어제', likes: 58, comments: 24, isPinned: false },
  { id: 5, category: '자유', title: '다음 라이브 세션 주제 추천 받습니다', author: '정○○', time: '2일 전', likes: 15, comments: 31, isPinned: false },
  { id: 6, category: '질문', title: 'ElevenLabs 한국어 음성 품질 개선 방법 알려주세요', author: '한○○', time: '3일 전', likes: 11, comments: 8, isPinned: false },
];

const categories = ['전체', '성과공유', '질문', '정보공유', '자유'];

const categoryColor: Record<string, string> = {
  '성과공유': 'text-green-400 bg-green-400/10 border-green-400/20',
  '질문': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  '정보공유': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  '자유': 'text-white/50 bg-white/5 border-white/10',
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('전체');
  const { user } = useAuth();

  const filtered = activeTab === '전체' ? posts : posts.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <Seo
        title="수강생 커뮤니티 | GrowthAI"
        description="수강생이 질문하고 성과를 공유하는 커뮤니티 페이지입니다."
        canonical="/community"
        image={DEFAULT_OG_IMAGE}
        keywords={['커뮤니티', '수강생 후기', '성장', 'GrowthAI']}
        noindex
      />
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">COMMUNITY</p>
          <h1 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            수강생 커뮤니티
          </h1>
          <p className="text-white/50 text-[16px] mt-3">함께 배우고, 성장하고, 수익을 만들어요</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { label: '누적 회원', value: '15,000+' },
            { label: '오늘 게시글', value: '47' },
            { label: '이번 주 활동', value: '1,234' },
          ].map(s => (
            <div key={s.label} className="border border-white/10 rounded-xl p-4 text-center bg-white/[0.02]">
              <div className="text-white font-extrabold text-[22px]">{s.value}</div>
              <div className="text-white/40 text-[12px] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters + Write button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all border cursor-pointer ${
                  activeTab === cat ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/15 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {user && (
            <button className="px-5 py-2.5 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-white/90 transition-all border-none cursor-pointer">
              ✏️ 글쓰기
            </button>
          )}
        </div>

        {/* Post list */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              className={`border rounded-2xl p-5 cursor-pointer hover:border-white/20 transition-all ${
                post.isPinned ? 'border-white/20 bg-white/[0.04]' : 'border-white/8 bg-white/[0.02]'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.isPinned && (
                      <span className="text-[10px] font-bold text-yellow-400/80 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full">📌 공지</span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColor[post.category] || 'text-white/40 bg-white/5 border-white/10'}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-[15px] mb-2 leading-snug">{post.title}</h3>
                  <div className="flex items-center gap-3 text-white/30 text-[12px]">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 text-white/30 text-[12px]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Login CTA */}
        {!user && (
          <motion.div
            className="mt-10 border border-white/10 rounded-2xl p-8 text-center bg-white/[0.02]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-white font-bold text-[18px] mb-2">커뮤니티에 참여하려면 로그인이 필요합니다</p>
            <p className="text-white/40 text-[14px] mb-5">수강생 전용 비공개 커뮤니티에 합류하세요</p>
            <button
              onClick={() => window.scrollTo({ top: 0 })}
              className="px-6 py-3 bg-white text-black text-[14px] font-bold rounded-xl hover:bg-white/90 transition-all border-none cursor-pointer"
            >
              🔐 로그인 / 회원가입
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
