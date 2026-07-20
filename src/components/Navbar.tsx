import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronRight, ChevronDown, Globe } from 'lucide-react';
import { ConnectAILabLogo } from './ConnectAILabLogo';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { SITE_CONFIG } from '../config/content';
import { NAV_GROUPS } from '../config/navGroups';

interface NavbarProps {
  entranceComplete: boolean;
  lang: 'ko' | 'en';
  setLang: (lang: 'ko' | 'en') => void;
}

/* 언어 목록 — 글로벌 확장 시 여기에 추가 */
const LANGUAGES = [
  { code: 'ko' as const, label: '한국어', sub: 'Korean' },
  { code: 'en' as const, label: 'English', sub: '영어' },
];

export function Navbar({ entranceComplete, lang, setLang }: NavbarProps) {
  const [menuOpen, setMenuOpen]             = useState(false);
  const [authOpen, setAuthOpen]             = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [activeGroup, setActiveGroup]       = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen]             = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef                             = useRef<HTMLDivElement>(null);
  const mobileLangRef                       = useRef<HTMLDivElement>(null);
  const closeTimer                          = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate   = useNavigate();
  const location   = useLocation();
  const content    = SITE_CONFIG[lang];
  const isDark     = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setActiveGroup(null); setLangOpen(false); setMobileLangOpen(false); }, [location.pathname]);

  // 언어 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goTo = (path: string) => {
  setMenuOpen(false);
  setActiveGroup(null);

  if (path.endsWith('.html')) {
    window.location.href = path;
    return;
  }

  navigate(path);
};
  const goHome = () => {
    if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
    setMenuOpen(false);
  };

  const isActive      = (path: string) => location.pathname === path;
  const isGroupActive = (g: typeof NAV_GROUPS[0]) => g.items.some(i => isActive(i.path));

  const openGroup     = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveGroup(id);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveGroup(null), 120);
  };

  const navBg = scrolled
    ? isDark ? 'bg-black/92 border-white/8' : 'bg-white/95 border-black/8'
    : 'bg-transparent border-transparent';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-5 md:px-8 border-b backdrop-blur-xl transition-all duration-300 ${navBg}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : -8 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >

        {/* ─────────── DESKTOP (lg+) ─────────── */}
        <div className="hidden lg:flex items-center justify-between w-full">

          {/* 로고 */}
          <button onClick={goHome} className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 shrink-0">
            <ConnectAILabLogo size={20} className="text-white" />
            <span className="text-[17px] font-bold tracking-tight" style={{ color: '#C9A84C' }}>
              {content.brandName}
            </span>
          </button>

          {/* Nav Groups */}
          <nav className="flex items-center gap-0.5">
            {NAV_GROUPS.map(group => {
              const label   = lang === 'ko' ? group.labelKo : group.labelEn;
              const gActive = isGroupActive(group);
              const isOpen  = activeGroup === group.id;
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => openGroup(group.id)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`relative flex items-center gap-1 h-9 px-3.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 cursor-pointer border-none ${
                      gActive || isOpen
                        ? isDark
                          ? 'text-white bg-white/10'
                          : 'bg-[rgba(201,168,76,0.10)]'
                        : isDark
                          ? 'text-white/55 hover:text-white hover:bg-white/8'
                          : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-[rgba(201,168,76,0.08)]'
                    }`}
                    style={gActive ? { color: '#C9A84C' } : isDark ? {} : { color: '#1d1d1f' }}
                  >
                    {label}
                    <ChevronDown
                      size={11}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 opacity-50 ${isOpen ? 'rotate-180' : ''}`}
                    />
                    {/* 활성 닷 */}
                    {gActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ backgroundColor: '#C9A84C' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* ── 드롭다운 패널 ── */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className={`absolute top-[calc(100%+6px)] left-0 min-w-[210px] rounded-2xl border overflow-hidden shadow-2xl shadow-black/60 ${
                          isDark ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-black/8'
                        }`}
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.13 }}
                        onMouseEnter={() => openGroup(group.id)}
                        onMouseLeave={scheduleClose}
                      >
                        {/* 카테고리 헤더 */}
                        <div className="px-4 pt-3 pb-1.5">
                          <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: '#C9A84C', opacity: 0.8 }}>
                            {label}
                          </span>
                        </div>

                        <div className="px-1.5 pb-2">
                          {group.items.map(item => {
                            const active = isActive(item.path);
                            return (
                              <button
                                key={item.path}
                                onClick={() => goTo(item.path)}
                                className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border-none group ${
                                  active
                                    ? isDark ? 'bg-white/8' : 'bg-black/5'
                                    : isDark ? 'hover:bg-white/6 bg-transparent' : 'hover:bg-black/4 bg-transparent'
                                }`}
                              >
                                <div className="flex-1">
                                  <div
                                    className={`text-[13.5px] font-semibold leading-snug transition-colors ${
                                      isDark ? 'text-white/85 group-hover:text-white' : 'text-black/80 group-hover:text-black'
                                    }`}
                                    style={active ? { color: '#C9A84C' } : {}}
                                  >
                                    {lang === 'ko' ? item.labelKo : item.labelEn}
                                  </div>
                                  <div className={`text-[11.5px] mt-0.5 leading-relaxed ${isDark ? 'text-white/35' : 'text-black/35'}`}>
                                    {lang === 'ko' ? item.descKo : item.descEn}
                                  </div>
                                </div>
                                {active && (
                                  <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: '#C9A84C' }} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* 로그인 시 내 강의 */}
            {user && (
              <button
                onClick={() => goTo('/dashboard')}
                className={`relative h-9 px-3.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 cursor-pointer border-none ${
                  isActive('/dashboard')
                    ? 'text-white bg-white/10'
                    : 'text-white/55 hover:text-white hover:bg-white/8'
                }`}
              >
                {lang === 'ko' ? '내 강의' : 'My Courses'}
              </button>
            )}
          </nav>

          {/* 우측 컨트롤 */}
          <div className="flex items-center gap-2 shrink-0">
            {/* 테마 토글 */}
            <button
              onClick={toggleTheme}
              className={`h-9 w-9 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all ${
                isDark
                  ? 'bg-white/8 hover:bg-white/15 text-white/70 hover:text-white'
                  : 'bg-[rgba(0,0,0,0.06)] hover:bg-[rgba(201,168,76,0.12)] text-[#424245] hover:text-[#1d1d1f] border border-[rgba(0,0,0,0.08)]'
              }`}
              title={isDark ? '라이트 모드' : '다크 모드'}
            >
              {isDark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
            </button>

            {/* 언어 선택 — Globe 아이콘 드롭다운 */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`h-9 w-9 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all relative ${
                  isDark
                    ? 'bg-white/8 hover:bg-white/15 text-white/70 hover:text-white'
                    : 'bg-[rgba(0,0,0,0.06)] hover:bg-[rgba(201,168,76,0.12)] text-[#424245] hover:text-[#1d1d1f] border border-[rgba(0,0,0,0.08)]'
                }`}
                title={lang === 'ko' ? '언어 선택' : 'Language'}
              >
                <Globe size={15} strokeWidth={2} />
                {/* 현재 언어 인디케이터 닷 */}
                <span
                  className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#C9A84C' }}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className={`absolute top-[calc(100%+6px)] right-0 min-w-[140px] rounded-2xl border overflow-hidden shadow-2xl shadow-black/60 ${
                      isDark ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-black/8'
                    }`}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.13 }}
                  >
                    <div className="px-4 pt-3 pb-1.5">
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: '#C9A84C', opacity: 0.8 }}>
                        Language
                      </span>
                    </div>
                    <div className="px-1.5 pb-2">
                      {LANGUAGES.map(({ code, label, sub }) => (
                        <button
                          key={code}
                          onClick={() => { setLang(code); setLangOpen(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border-none group ${
                            lang === code
                              ? isDark ? 'bg-white/8' : 'bg-black/5'
                              : isDark ? 'hover:bg-white/6 bg-transparent' : 'hover:bg-black/4 bg-transparent'
                          }`}
                        >
                          <div>
                            <div
                              className={`text-[13.5px] font-semibold leading-snug ${isDark ? 'text-white/85' : 'text-black/80'}`}
                              style={lang === code ? { color: '#C9A84C' } : {}}
                            >
                              {label}
                            </div>
                            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-white/30' : 'text-black/30'}`}>{sub}</div>
                          </div>
                          {lang === code && (
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#C9A84C' }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 유저 / 로그인 */}
            {user ? (
              <div className={`flex items-center gap-2 h-9 px-3 rounded-xl ${isDark ? 'bg-white/8' : 'bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.08)]'}`}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-black text-[10px] font-bold" style={{ backgroundColor: '#C9A84C' }}>
                  {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
                <span className={`text-[12px] max-w-[60px] truncate ${isDark ? 'text-white/70' : 'text-[#424245]'}`}>
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button onClick={signOut} className={`text-[11px] transition-colors cursor-pointer bg-transparent border-none ${isDark ? 'text-white/30 hover:text-white/60' : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}>
                  {lang === 'ko' ? '아웃' : 'Out'}
                </button>
              </div>
            ) : (
              <button
                className={`h-9 px-3.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer border-none ${
                  isDark
                    ? 'text-white/65 hover:text-white bg-white/8 hover:bg-white/15'
                    : 'text-[#424245] hover:text-[#1d1d1f] bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(201,168,76,0.1)] border border-[rgba(0,0,0,0.08)]'
                }`}
                onClick={() => setAuthOpen(true)}
              >
                {lang === 'ko' ? '로그인' : 'Sign In'}
              </button>
            )}

            {/* CTA — 골드 */}
            <button
              className="h-9 px-5 rounded-xl text-[13px] font-bold active:scale-95 transition-all cursor-pointer border"
              style={{ backgroundColor: '#C9A84C', color: '#0a0a0a', borderColor: '#C9A84C' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4BA6A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C9A84C'; }}
              onClick={() => {
                if (location.pathname === '/') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                else navigate('/enroll');
              }}
            >
              {content.nav.downloadLabel}
            </button>
          </div>
        </div>

        {/* ─────────── MOBILE / TABLET ─────────── */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <button onClick={goHome} className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0">
            <ConnectAILabLogo size={16} className="text-white" />
            <span className="text-[15px] font-bold tracking-tight" style={{ color: '#C9A84C' }}>{content.brandName}</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`h-9 w-9 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all ${
              isDark
                ? 'bg-white/10 text-white hover:bg-white/18'
                : 'bg-[rgba(0,0,0,0.07)] text-[#1d1d1f] hover:bg-[rgba(201,168,76,0.12)] border border-[rgba(0,0,0,0.09)]'
            }`}
          >
            {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </motion.nav>

      {/* ─────────── MOBILE DRAWER (오른쪽 슬라이드 — 72vw) ─────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 백드롭 */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* 드로어 패널 */}
            <motion.div
              className={`fixed top-0 right-0 h-full z-50 flex flex-col lg:hidden border-l ${
                isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-black/8'
              }`}
              style={{ width: 'min(72vw, 360px)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            >
              {/* 헤더 */}
              <div className={`flex items-center justify-between px-5 h-16 shrink-0 border-b ${isDark ? 'border-white/8' : 'border-black/8'}`}>
                <span className="text-[14px] font-bold tracking-tight" style={{ color: '#C9A84C' }}>{content.brandName}</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all ${
                    isDark ? 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white' : 'bg-black/6 text-black/50 hover:bg-black/12 hover:text-black'
                  }`}
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* 스크롤 영역 */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-2 pt-3 pb-2">
                  <p className={`px-3 pb-2 text-[10.5px] font-bold uppercase tracking-widest ${isDark ? 'text-white/25' : 'text-black/25'}`}>
                    {lang === 'ko' ? '메뉴' : 'Menu'}
                  </p>

                  {NAV_GROUPS.map((group, gi) => {
                    const groupLabel = lang === 'ko' ? group.labelKo : group.labelEn;
                    const expanded   = mobileExpanded === group.id;
                    const gActive    = group.items.some(i => isActive(i.path));

                    return (
                      <motion.div
                        key={group.id}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.32, delay: gi * 0.055, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <button
                          onClick={() => setMobileExpanded(expanded ? null : group.id)}
                          className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold transition-all cursor-pointer border-none bg-transparent ${
                            isDark ? 'hover:bg-white/6' : 'hover:bg-black/4'
                          }`}
                          style={gActive ? { color: '#C9A84C' } : { color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)' }}
                        >
                          <span>{groupLabel}</span>
                          <ChevronDown
                            size={14}
                            strokeWidth={2}
                            className={`transition-transform duration-200 opacity-40 ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-2 pr-1 pb-1">
                                {group.items.map((item, ii) => {
                                  const active = isActive(item.path);
                                  return (
                                    <motion.button
                                      key={item.path}
                                      onClick={() => goTo(item.path)}
                                      initial={{ opacity: 0, x: 12 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.22, delay: ii * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border-none ${
                                        active
                                          ? isDark ? 'bg-white/8' : 'bg-black/5'
                                          : isDark ? 'bg-transparent hover:bg-white/5' : 'bg-transparent hover:bg-black/3'
                                      }`}
                                    >
                                      <div>
                                        <div
                                          className={`text-[14px] font-medium ${isDark ? 'text-white/80' : 'text-black/75'}`}
                                          style={active ? { color: '#C9A84C' } : {}}
                                        >
                                          {lang === 'ko' ? item.labelKo : item.labelEn}
                                        </div>
                                        <div className={`text-[11.5px] mt-0.5 ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                                          {lang === 'ko' ? item.descKo : item.descEn}
                                        </div>
                                      </div>
                                      <ChevronRight size={13} strokeWidth={2} className={`shrink-0 ${isDark ? 'text-white/20' : 'text-black/20'}`} />
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}

                  {user && (
                    <motion.button
                      onClick={() => goTo('/dashboard')}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32, delay: NAV_GROUPS.length * 0.055, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-medium transition-all cursor-pointer border-none bg-transparent ${
                        isActive('/dashboard')
                          ? isDark ? 'bg-white/10 text-white' : 'bg-black/6 text-black'
                          : isDark ? 'text-white/60 hover:text-white hover:bg-white/6' : 'text-black/50 hover:text-black hover:bg-black/4'
                      }`}
                    >
                      {lang === 'ko' ? '내 강의' : 'My Courses'}
                      <ChevronRight size={14} strokeWidth={2} className={isDark ? 'text-white/20' : 'text-black/20'} />
                    </motion.button>
                  )}
              </div>

              {/* 구분선 */}
              <div className={`h-px mx-3 ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />

              {/* 인증 + CTA — 언어 드롭다운이 가리지 않도록 위쪽 배치 */}
              <div className="px-3 py-3 flex flex-col gap-2">
                {user ? (
                  <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${isDark ? 'bg-white/6' : 'bg-black/4'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-black text-[12px] font-bold" style={{ backgroundColor: '#C9A84C' }}>
                        {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                      </div>
                      <span className={`text-[14px] font-medium truncate max-w-[140px] ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => { signOut(); setMenuOpen(false); }}
                      className={`text-[12px] font-medium cursor-pointer bg-transparent border-none ${isDark ? 'text-white/30 hover:text-white/60' : 'text-black/30 hover:text-black/60'}`}
                    >
                      {lang === 'ko' ? '로그아웃' : 'Sign out'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
                    className={`w-full py-3 rounded-xl text-[14px] font-semibold transition-all cursor-pointer border ${
                      isDark ? 'bg-transparent border-white/15 text-white/65 hover:bg-white/6' : 'bg-transparent border-black/12 text-black/60 hover:bg-black/4'
                    }`}
                  >
                    {lang === 'ko' ? '로그인 / 회원가입' : 'Sign In / Sign Up'}
                  </button>
                )}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/enroll');
                  }}
                  className="w-full py-3.5 text-[14px] font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer border-none"
                  style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
                >
                  🎓 {content.nav.downloadLabel}
                </button>
              </div>

              {/* 구분선 */}
              <div className={`h-px mx-3 ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />

              {/* 테마 + 언어 */}
              <div className="px-4 py-3 flex items-center gap-2.5">
                {/* 테마 토글 — 아이콘 전용 */}
                <button
                  onClick={toggleTheme}
                  className={`shrink-0 h-9 w-9 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all ${
                    isDark ? 'bg-white/8 text-white/70 hover:bg-white/14' : 'bg-black/6 text-black/60 hover:bg-black/10'
                  }`}
                  title={isDark ? (lang === 'ko' ? '라이트 모드' : 'Light mode') : (lang === 'ko' ? '다크 모드' : 'Dark mode')}
                >
                  {isDark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
                </button>

                {/* 언어 선택 — 드롭다운 (글로벌 확장 대비) */}
                <div className="relative flex-1" ref={mobileLangRef}>
                  <button
                    onClick={() => setMobileLangOpen(o => !o)}
                    className={`w-full flex items-center justify-between gap-2 h-9 px-3.5 rounded-xl text-[13px] font-semibold cursor-pointer border-none transition-all ${
                      isDark ? 'bg-white/8 text-white/70 hover:bg-white/14' : 'bg-black/6 text-black/60 hover:bg-black/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={14} strokeWidth={2} />
                      {LANGUAGES.find(l => l.code === lang)?.label}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={2.5}
                      className={`opacity-50 transition-transform duration-200 ${mobileLangOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileLangOpen && (
                      <motion.div
                        className={`absolute top-[calc(100%+6px)] left-0 right-0 z-10 rounded-2xl border overflow-hidden shadow-2xl shadow-black/60 ${
                          isDark ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-black/8'
                        }`}
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.13 }}
                      >
                        {LANGUAGES.map(({ code, label, sub }) => (
                          <button
                            key={code}
                            onClick={() => { setLang(code); setMobileLangOpen(false); }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-all cursor-pointer border-none ${
                              lang === code
                                ? isDark ? 'bg-white/8' : 'bg-black/5'
                                : isDark ? 'hover:bg-white/6 bg-transparent' : 'hover:bg-black/4 bg-transparent'
                            }`}
                          >
                            <div>
                              <div
                                className={`text-[13px] font-semibold leading-snug ${isDark ? 'text-white/85' : 'text-black/80'}`}
                                style={lang === code ? { color: '#C9A84C' } : {}}
                              >
                                {label}
                              </div>
                              <div className={`text-[11px] mt-0.5 ${isDark ? 'text-white/30' : 'text-black/30'}`}>{sub}</div>
                            </div>
                            {lang === code && (
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#C9A84C' }} />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
