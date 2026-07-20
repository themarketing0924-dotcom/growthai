import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import ToolDetailPage from './pages/ToolDetailPage';
import PromptsPage from './pages/PromptsPage';
import CourseLandingPage from './pages/CourseLandingPage';
import CourseAIPage from './pages/CourseAIPage';
import ToolSalesPage from './pages/ToolSalesPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import LessonPage from './pages/LessonPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { Seo, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './components/Seo';

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
      <Route path="/prompts"    element={wrap(<PromptsPage />)} />
      <Route path="/course/ai"     element={wrap(<CourseAIPage />)} />
      <Route path="/product/:toolId" element={wrap(<ToolSalesPage />)} />
      <Route path="/lesson" element={wrap(<LessonPage />)} />
      <Route path="/portfolio/:workId" element={wrap(<PortfolioDetailPage />)} />
      <Route path="/course/:slug" element={wrap(<CourseLandingPage />)} />
      <Route path="/tools/:slug" element={<ToolDetailPage lang={lang} />} />
      <Route path="/" element={wrap(<MainLandingPage />)} />
      <Route path="*" element={wrap(<NotFoundPage />)} />
    </Routes>
    </AnimatePresence>
  );
}
