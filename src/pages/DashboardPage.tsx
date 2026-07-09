import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const enrolledCourses = [
  { id: 1, title: '유튜브 숏폼 실전반', step: 'Step 1', progress: 68, totalLessons: 24, completedLessons: 16, nextLesson: '쇼츠 알고리즘 최적화 전략' },
  { id: 2, title: 'N8N 자동화 특강', step: 'Step 2', progress: 25, totalLessons: 12, completedLessons: 3, nextLesson: 'N8N 카카오 알림톡 연동' },
];

const recentActivity = [
  { emoji: '✅', text: '과제 1 제출 완료 — 채널 콘셉트 기획서', time: '2일 전' },
  { emoji: '🎬', text: '강의 시청 — ChatGPT 대본 작성 실전', time: '3일 전' },
  { emoji: '💬', text: '커뮤니티 댓글 — 쇼츠 1만뷰 달성 공유', time: '4일 전' },
  { emoji: '📅', text: '라이브 세션 예약 — 7월 5일 AI 채널 셋업', time: '1주 전' },
];

const badges = [
  { emoji: '🎯', name: '첫 강의 수강', earned: true },
  { emoji: '📝', name: '과제 제출왕', earned: true },
  { emoji: '🎬', name: '첫 영상 업로드', earned: false },
  { emoji: '🏆', name: '1,000 구독자', earned: false },
  { emoji: '💰', name: '수익화 달성', earned: false },
  { emoji: '⭐', name: 'VVIP 멤버', earned: false },
];

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const seo = (
    <Seo
      title="내 강의 대시보드 | GrowthAI"
      description="수강 현황과 최근 활동을 보여주는 수강생 전용 대시보드입니다."
      canonical="/dashboard"
      image={DEFAULT_OG_IMAGE}
      keywords={['대시보드', '수강생 전용', 'GrowthAI']}
      noindex
    />
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        {seo}
        <div className="text-center max-w-md">
          <div className="text-[60px] mb-4">🔐</div>
          <h1 className="text-white text-[28px] font-bold mb-3">로그인이 필요합니다</h1>
          <p className="text-white/50 text-[15px] mb-8 leading-relaxed">
            내 강의 대시보드는 수강생 전용 페이지입니다.<br />로그인 후 이용해주세요.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-white text-black font-bold text-[15px] rounded-full hover:bg-white/90 transition-all border-none cursor-pointer"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      {seo}
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12 flex items-start justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-2">MY DASHBOARD</p>
            <h1 className="text-white font-extrabold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              안녕하세요, {displayName}님 👋
            </h1>
            <p className="text-white/40 text-[14px] mt-2">{user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 border border-white/15 rounded-xl text-white/50 text-[13px] hover:text-white hover:border-white/30 transition-all cursor-pointer bg-transparent shrink-0"
          >
            로그아웃
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { label: '수강 중인 강의', value: '2', icon: '📚' },
            { label: '완료한 강의', value: '0', icon: '✅' },
            { label: '제출한 과제', value: '1', icon: '📝' },
            { label: '획득 배지', value: '2', icon: '🏅' },
          ].map(s => (
            <div key={s.label} className="border border-white/10 rounded-xl p-5 bg-white/[0.02] text-center">
              <div className="text-[28px] mb-2">{s.icon}</div>
              <div className="text-white text-[26px] font-extrabold">{s.value}</div>
              <div className="text-white/40 text-[12px] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Enrolled courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-white text-[18px] font-bold mb-4 border-b border-white/10 pb-4">📚 수강 중인 강의</h2>
              <div className="flex flex-col gap-4">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="border border-white/10 rounded-2xl p-5 bg-white/[0.02] hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{course.step}</span>
                        <h3 className="text-white font-bold text-[16px] mt-0.5">{course.title}</h3>
                      </div>
                      <span className="text-white text-[16px] font-extrabold">{course.progress}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
                      <div
                        className="bg-white rounded-full h-1.5 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-white/40 text-[12px]">
                      <span>{course.completedLessons}/{course.totalLessons} 강의 완료</span>
                      <span>다음: {course.nextLesson}</span>
                    </div>
                    <button className="mt-4 w-full py-2.5 bg-white/10 hover:bg-white/15 text-white text-[13px] font-medium rounded-xl transition-all border-none cursor-pointer">
                      이어서 수강하기 →
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-white text-[18px] font-bold mb-4 border-b border-white/10 pb-4">🏅 획득 배지</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.name}
                    className={`border rounded-xl p-3 text-center transition-all ${
                      badge.earned ? 'border-white/20 bg-white/5' : 'border-white/5 bg-white/[0.01] opacity-30'
                    }`}
                  >
                    <div className="text-[28px]">{badge.emoji}</div>
                    <p className="text-white/60 text-[10px] mt-1.5 leading-tight">{badge.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            {/* Recent activity */}
            <div>
              <h2 className="text-white text-[18px] font-bold mb-4 border-b border-white/10 pb-4">📋 최근 활동</h2>
              <div className="flex flex-col gap-3">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 border border-white/8 rounded-xl p-4 bg-white/[0.02]">
                    <span className="text-[18px] shrink-0">{act.emoji}</span>
                    <div>
                      <p className="text-white/75 text-[13px] leading-snug">{act.text}</p>
                      <p className="text-white/30 text-[11px] mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h2 className="text-white text-[18px] font-bold mb-4 border-b border-white/10 pb-4">⚡ 빠른 이동</h2>
              <div className="flex flex-col gap-2">
                {[
                  { icon: '📅', label: '라이브 일정 보기', href: '/live' },
                  { icon: '📝', label: '과제 제출하기', href: '/homework' },
                  { icon: '💬', label: '커뮤니티 바로가기', href: '/community' },
                  { icon: '🎓', label: '추가 강의 신청', href: '/' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-3.5 text-white/70 text-[14px] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all no-underline"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                    <span className="ml-auto text-white/25">›</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
