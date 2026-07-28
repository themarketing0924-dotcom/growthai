// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Shield } from 'lucide-react';
import { IconHourglass, IconChartDown, IconAiNetwork } from './components/icons/TossIcons';
import { PageTransition } from './components/PageTransition';
import { Navbar } from './components/Navbar';
import { ScrollReveal, StaggerReveal, StaggerItem, SectionTitle } from './components/ScrollReveal';
import MainLandingPage from './pages/MainLandingPage';
import AboutPage from './pages/AboutPage';
import DiagnosePage from './pages/DiagnosePage';
import BasicsPage from './pages/BasicsPage';
import GalleryPage from './pages/GalleryPage';
import LivePage from './pages/LivePage';
import CommunityPage from './pages/CommunityPage';
import HomeworkPage from './pages/HomeworkPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import EnrollPage from './pages/EnrollPage';
import { VIDEO_URLS } from './config/videos';
import { SITE_CONFIG } from './config/content';
import { Footer } from './components/Footer';
import BlogPage from './pages/BlogPage';
import MarketingGlossaryPage from './pages/MarketingGlossaryPage';
import ToolDetailPage from './pages/ToolDetailPage';
import PromptsPage from './pages/PromptsPage';
import CourseLandingPage from './pages/CourseLandingPage';
import CourseAIPage from './pages/CourseAIPage';
import ToolSalesPage from './pages/ToolSalesPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import LessonPage from './pages/LessonPage';
import AgentsPage from './pages/AgentsPage';
import AgentFreeTrialPage from './pages/AgentFreeTrialPage';
import GuideLandingPage from './pages/GuideLandingPage';
import GuideDay1Page from './pages/GuideDay1Page';
import GuideDay2Page from './pages/GuideDay2Page';
import GuideDay3Page from './pages/GuideDay3Page';
import GuideOfferPage from './pages/GuideOfferPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './components/Seo';

// Experimental Funnel Pages (기존 페이지 훼손 없이 검증하기 위한 별도 라우트 전용)
import MainLandingPageExp from './pages/MainLandingPageExp';
import DiagnosePageExp from './pages/DiagnosePageExp';
import GuideDay1PageExp from './pages/GuideDay1PageExp';
import ToolSalesPageExp from './pages/ToolSalesPageExp';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({ target: heroSectionRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScrollY, [0, 1], ['0%', '22%']);

  const content = SITE_CONFIG[lang];

  /* ── Entrance delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ── Hero 영상 슬로우모션 (0.1배속) ── */
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const setSlowSpeed = () => { video.playbackRate = 0.1; };
    video.addEventListener('loadeddata', setSlowSpeed);
    video.addEventListener('play', setSlowSpeed);
    setSlowSpeed();
    return () => {
      video.removeEventListener('loadeddata', setSlowSpeed);
      video.removeEventListener('play', setSlowSpeed);
    };
  }, []);

  const routeLocation = useLocation();

  const subNavbar = <Navbar entranceComplete lang={lang} setLang={setLang} />;
  const wrap = (Page: React.ReactNode) => (
    <>{subNavbar}<PageTransition>{Page}</PageTransition></>
  );

  return (
    <AnimatePresence mode="wait">
    <Routes location={routeLocation} key={routeLocation.pathname}>
      <Route path="/about"       element={wrap(<AboutPage />)} />
      <Route path="/ceo"         element={<Navigate to="/about" replace />} />
      <Route path="/diagnose"    element={wrap(<DiagnosePage />)} />
      <Route path="/basics"    element={wrap(<BasicsPage />)} />
      <Route path="/gallery"   element={wrap(<GalleryPage />)} />
      <Route path="/live"      element={wrap(<LivePage />)} />
      <Route path="/community" element={wrap(<CommunityPage />)} />
      <Route path="/homework"  element={wrap(<HomeworkPage />)} />
      <Route path="/partner"   element={wrap(<PartnerPage />)} />
      <Route path="/contact"   element={wrap(<ContactPage />)} />
      <Route path="/terms"     element={wrap(<TermsPage />)} />
      <Route path="/privacy"   element={wrap(<PrivacyPage />)} />
      <Route path="/enroll"    element={wrap(<EnrollPage lang={lang} />)} />
      <Route path="/dashboard" element={wrap(<DashboardPage />)} />
      <Route path="/blog"       element={wrap(<BlogPage />)} />
      <Route path="/marketing-glossary" element={wrap(<MarketingGlossaryPage />)} />
      <Route path="/prompts"    element={wrap(<PromptsPage />)} />
      <Route path="/guide"      element={wrap(<GuideLandingPage />)} />
      <Route path="/guide/day1" element={wrap(<GuideDay1Page />)} />
      <Route path="/guide/day2" element={wrap(<GuideDay2Page />)} />
      <Route path="/guide/day3" element={wrap(<GuideDay3Page />)} />
      <Route path="/guide/offer" element={wrap(<GuideOfferPage />)} />
      <Route path="/agents"     element={wrap(<AgentsPage lang={lang} />)} />
      <Route path="/agents/free-trial" element={wrap(<AgentFreeTrialPage />)} />
      <Route path="/course/ai"     element={wrap(<CourseAIPage />)} />
      <Route path="/product/:toolId" element={wrap(<ToolSalesPage />)} />
      <Route path="/lesson" element={wrap(<LessonPage />)} />
      <Route path="/portfolio/:workId" element={wrap(<PortfolioDetailPage />)} />
      <Route path="/course/:slug" element={wrap(<CourseLandingPage />)} />
      <Route path="/tools/:slug" element={<ToolDetailPage lang={lang} />} />
      {/* Experimental Funnel Routes (별도 검증용 라우트) */}
      <Route path="/experimental" element={wrap(<MainLandingPageExp />)} />
      <Route path="/experimental/diagnose" element={wrap(<DiagnosePageExp />)} />
      <Route path="/experimental/guide/day1" element={wrap(<GuideDay1PageExp />)} />
      <Route path="/experimental/product/:toolId" element={wrap(<ToolSalesPageExp />)} />

      <Route path="/" element={wrap(<MainLandingPage />)} />
      <Route path="*" element={wrap(<NotFoundPage />)} />
    </Routes>
    </AnimatePresence>
  );
}
