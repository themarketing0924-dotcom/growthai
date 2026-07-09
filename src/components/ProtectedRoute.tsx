// ============================================================
// ProtectedRoute — 로그인 보호 라우트
// ============================================================
// 사용법: <ProtectedRoute><DashboardPage /></ProtectedRoute>
//
// 동작:
//   - loading 중 → 스피너
//   - 비로그인 → AuthModal 표시 (현재 경로 유지)
//   - 로그인 완료 → children 렌더
// ============================================================

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(true);

  // 1. 인증 상태 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* 골드 스피너 */}
          <div
            className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#C9A84C]"
            style={{ animation: 'spin 0.8s linear infinite' }}
          />
          <p className="text-white/30 text-[13px]">잠시만요...</p>
        </motion.div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // 2. 비로그인 → AuthModal 표시
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[60px] mb-4">🔐</div>
          <h1 className="text-white text-[26px] font-bold mb-3 tracking-tight">
            로그인이 필요합니다
          </h1>
          <p className="text-white/40 text-[15px] mb-8 leading-relaxed">
            수강생 전용 페이지입니다.<br />로그인 후 이용해주세요.
          </p>
        </motion.div>

        {/* AuthModal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />

        {/* 모달 닫은 경우 다시 열기 버튼 */}
        {!authModalOpen && (
          <motion.button
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-black font-bold text-[14px] cursor-pointer border-none"
            style={{ backgroundColor: '#C9A84C' }}
            onClick={() => setAuthModalOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            로그인하기
          </motion.button>
        )}
      </div>
    );
  }

  // 3. 로그인 완료 → 정상 렌더
  return <>{children}</>;
}
