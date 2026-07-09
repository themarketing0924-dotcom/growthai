// ============================================================
// AuthModal — 로그인/회원가입 모달
// ============================================================
// 변경사항:
//   - 네이버/카카오 로그인 버튼 추가 (UI only, 준비 중 안내)
//   - Firebase 에러 메시지 한국어 변환
//   - 비밀번호 표시/숨기기 토글 버튼 추가
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Firebase 에러 한국어 변환 ──
function getKoreanError(errorCode: string): string {
  const map: Record<string, string> = {
    'auth/user-not-found':       '등록되지 않은 이메일입니다.',
    'auth/wrong-password':       '비밀번호가 올바르지 않습니다.',
    'auth/invalid-credential':   '이메일 또는 비밀번호가 올바르지 않습니다.',
    'auth/email-already-in-use': '이미 가입된 이메일 주소입니다.',
    'auth/weak-password':        '비밀번호는 6자 이상이어야 합니다.',
    'auth/invalid-email':        '이메일 형식이 올바르지 않습니다.',
    'auth/too-many-requests':    '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
    'auth/network-request-failed': '네트워크 연결을 확인해주세요.',
    'auth/popup-blocked':        '팝업이 차단되었습니다. 팝업 차단을 해제해주세요.',
    'auth/popup-closed-by-user': '', // 사용자가 직접 닫은 경우 에러 표시 안 함
    'auth/cancelled-popup-request': '',
  };
  // 에러 코드 추출 (Firebase 에러 메시지에서)
  for (const [code, msg] of Object.entries(map)) {
    if (errorCode.includes(code)) return msg;
  }
  return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithGoogle, signInWithApple, signInWithEmail, signUpWithEmail, error, clearError } =
    useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [comingSoonMsg, setComingSoonMsg] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      onClose();
      navigate('/dashboard');
    } catch {
      // error is set by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setSocialLoading('google');
    try { await signInWithGoogle(); onClose(); navigate('/dashboard'); } catch {}
    finally { setSocialLoading(null); }
  };

  const handleApple = async () => {
    setSocialLoading('apple');
    try { await signInWithApple(); onClose(); navigate('/dashboard'); } catch {}
    finally { setSocialLoading(null); }
  };

  const handleComingSoon = (provider: string) => {
    setComingSoonMsg(`${provider} 로그인은 준비 중입니다. 곧 서비스될 예정이에요!`);
    setTimeout(() => setComingSoonMsg(null), 3000);
  };

  // 한국어 에러 변환
  const displayError = error ? getKoreanError(error) : null;

  /* ── 테마별 토큰 ── */
  const tok = isDark ? {
    overlay:     'bg-black/80 backdrop-blur-md',
    card:        'bg-[#0a0a0a] border border-white/10',
    cardShadow:  {},
    title:       'text-white',
    subtitle:    'text-white/40',
    socialBg:    'bg-white/[0.07] border-white/10 text-white hover:bg-white/[0.12]',
    divider:     'bg-white/10',
    divText:     'text-white/30',
    label:       'text-white/40',
    inputCls:    'bg-white/[0.05] border-white/10 text-white placeholder:text-white/20 focus:border-white/30',
    submitCls:   'bg-white text-black hover:bg-white/90',
    subText:     'text-white/40',
    switchText:  'text-white/70 hover:text-white',
    closeText:   'text-white/40 hover:text-white/80',
    eyeBtn:      'text-white/30 hover:text-white/70',
  } : {
    overlay:     'bg-black/30 backdrop-blur-md',
    card:        'bg-white border border-[rgba(201,168,76,0.2)]',
    cardShadow:  { boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 20px rgba(0,0,0,0.08)' },
    title:       'text-[#1d1d1f]',
    subtitle:    'text-[#6e6e73]',
    socialBg:    'bg-[rgba(0,0,0,0.04)] border-[rgba(0,0,0,0.1)] text-[#1d1d1f] hover:bg-[rgba(201,168,76,0.08)]',
    divider:     'bg-[rgba(0,0,0,0.1)]',
    divText:     'text-[#6e6e73]',
    label:       'text-[#424245]',
    inputCls:    'bg-[#f5f5f7] border-[rgba(0,0,0,0.1)] text-[#1d1d1f] placeholder:text-[#6e6e73] focus:border-[rgba(201,168,76,0.5)]',
    submitCls:   'text-white',
    subText:     'text-[#6e6e73]',
    switchText:  'text-[#424245] hover:text-[#1d1d1f]',
    closeText:   'text-[#424245] hover:text-[#1d1d1f]',
    eyeBtn:      'text-[#6e6e73] hover:text-[#1d1d1f]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className={`absolute inset-0 ${tok.overlay}`}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            className={`relative w-[90%] max-w-[440px] ${tok.card} rounded-2xl p-8 sm:p-10 overflow-y-auto max-h-[90vh]`}
            style={tok.cardShadow}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 골드 상단 라인 (라이트 모드 전용) */}
            {!isDark && (
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
              />
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors cursor-pointer bg-transparent border-none text-[18px] ${tok.closeText}`}
            >
              ✕
            </button>

            {/* Header */}
            <h2 className={`${tok.title} text-[24px] font-light tracking-[-0.02em] mb-2`}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className={`${tok.subtitle} text-[14px] mb-8`}>
              {mode === 'login'
                ? 'AI 강의 대시보드에 접속합니다.'
                : 'AI 1인 기업 여정을 시작하세요.'}
            </p>

            {/* 준비 중 메시지 */}
            <AnimatePresence>
              {comingSoonMsg && (
                <motion.div
                  className="mb-4 px-4 py-3 rounded-lg text-[13px] text-center"
                  style={{ backgroundColor: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {comingSoonMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {displayError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6 text-red-500 text-[13px] flex items-center justify-between">
                <span>{displayError}</span>
                <button
                  onClick={clearError}
                  className="ml-2 text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none shrink-0"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Social buttons */}
            <div className="flex flex-col gap-3 mb-6">
              {/* Google */}
              <button
                onClick={handleGoogle}
                disabled={!!socialLoading}
                className={`w-full h-[48px] rounded-lg border text-[14px] font-medium flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 ${tok.socialBg}`}
              >
                {socialLoading === 'google' ? (
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </button>

              {/* Apple */}
              <button
                onClick={handleApple}
                disabled={!!socialLoading}
                className={`w-full h-[48px] rounded-lg border text-[14px] font-medium flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 ${tok.socialBg}`}
              >
                {socialLoading === 'apple' ? (
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 814 1000" fill={isDark ? '#fff' : '#1d1d1f'}>
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.9-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.5 46.4 175 46.4 42.7 0 108.6-49.8 191-49.8zM506.3 17.5C522.3-.7 552-13.6 580.4-13.6c4 0 8 .3 12 .9 1.3 28-9.4 56-25.3 78-14.8 20.8-45.2 37.1-74.2 37.1-4.5 0-9-.3-13.5-1-1.9-28.4 9.1-57.5 27-84.9z"/>
                  </svg>
                )}
                Continue with Apple
              </button>

              {/* 구분선 */}
              <div className={`h-px ${tok.divider} my-1`} />

              {/* 네이버 — 준비 중 */}
              <button
                onClick={() => handleComingSoon('네이버')}
                className="w-full h-[48px] rounded-lg border text-[14px] font-medium flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden"
                style={{
                  backgroundColor: '#03C75A',
                  borderColor: '#03C75A',
                  color: '#fff',
                  opacity: 0.85,
                }}
              >
                {/* 네이버 N 로고 */}
                <span className="font-extrabold text-[16px] tracking-tighter leading-none">N</span>
                네이버로 계속하기
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  준비 중
                </span>
              </button>

              {/* 카카오 — 준비 중 */}
              <button
                onClick={() => handleComingSoon('카카오')}
                className="w-full h-[48px] rounded-lg border text-[14px] font-medium flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer relative"
                style={{
                  backgroundColor: '#FEE500',
                  borderColor: '#FEE500',
                  color: '#3C1E1E',
                  opacity: 0.85,
                }}
              >
                {/* 카카오 로고 */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#3C1E1E">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.75 1.64 5.17 4.13 6.63L5.06 21l4.32-2.85c.85.15 1.73.23 2.62.23 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
                카카오로 계속하기
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  준비 중
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`flex-1 h-px ${tok.divider}`} />
              <span className={`${tok.divText} text-[12px] uppercase tracking-[0.1em]`}>or</span>
              <div className={`flex-1 h-px ${tok.divider}`} />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <div>
                <label className={`${tok.label} text-[12px] uppercase tracking-[0.1em] mb-2 block font-semibold`}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full h-[44px] border rounded-lg px-4 text-[14px] outline-none transition-colors ${tok.inputCls}`}
                  style={{ fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label className={`${tok.label} text-[12px] uppercase tracking-[0.1em] mb-2 block font-semibold`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className={`w-full h-[44px] border rounded-lg px-4 pr-11 text-[14px] outline-none transition-colors ${tok.inputCls}`}
                    style={{ fontFamily: 'inherit' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors cursor-pointer bg-transparent border-none ${tok.eyeBtn}`}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[48px] rounded-lg text-[14px] font-bold active:scale-[0.98] transition-all cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed mt-2 ${tok.submitCls}`}
                style={
                  isDark
                    ? { backgroundColor: '#ffffff', color: '#0a0a0a' }
                    : { background: 'linear-gradient(135deg, #C9A84C 0%, #EED98A 50%, #C9A84C 100%)', color: '#0a0a0a' }
                }
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    처리 중...
                  </span>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Switch mode */}
            <p className={`text-center ${tok.subText} text-[13px] mt-6`}>
              {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); clearError(); }}
                className={`${tok.switchText} underline cursor-pointer bg-transparent border-none text-[13px]`}
              >
                {mode === 'login' ? '회원가입' : '로그인'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
