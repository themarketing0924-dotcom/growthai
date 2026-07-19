import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { PageTransition } from './components/PageTransition';
import { Navbar } from './components/Navbar';

import CeoPage from './pages/CeoPage';
import BasicsPage from './pages/BasicsPage';
import GalleryPage from './pages/GalleryPage';
import LivePage from './pages/LivePage';
import CommunityPage from './pages/CommunityPage';
import HomeworkPage from './pages/HomeworkPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import EnrollPage from './pages/EnrollPage';
import BlogPage from './pages/BlogPage';
import ToolDetailPage from './pages/ToolDetailPage';
import PromptsPage from './pages/PromptsPage';
import CourseLandingPage from './pages/CourseLandingPage';
import CourseAIPage from './pages/CourseAIPage';
import ToolSalesPage from './pages/ToolSalesPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import AgentsPage from './pages/AgentsPage';
import GuideLandingPage from './pages/GuideLandingPage';
import GuideDay1Page from './pages/GuideDay1Page';
import GuideDay2Page from './pages/GuideDay2Page';
import GuideDay3Page from './pages/GuideDay3Page';
import GuideOfferPage from './pages/GuideOfferPage';
import AgentFreeTrialPage from './pages/AgentFreeTrialPage';
import LessonPage from './pages/LessonPage';
import MarketingGlossaryPage from './pages/MarketingGlossaryPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const routeLocation = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);

    return () => clearTimeout(timer);
  }, []);

  const subNavbar = (
    <Navbar
      entranceComplete={entranceComplete}
      lang={lang}
      setLang={setLang}
    />
  );

  const wrap = (page: React.ReactNode) => (
    <>
      {subNavbar}
      <PageTransition>{page}</PageTransition>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={routeLocation} key={routeLocation.pathname}>
        <Route path="/" element={wrap(<GuideLandingPage />)} />

        <Route path="/ceo" element={wrap(<CeoPage />)} />
        <Route path="/basics" element={wrap(<BasicsPage />)} />
        <Route path="/gallery" element={wrap(<GalleryPage />)} />
        <Route path="/live" element={wrap(<LivePage />)} />
        <Route path="/community" element={wrap(<CommunityPage />)} />
        <Route path="/homework" element={wrap(<HomeworkPage />)} />
        <Route path="/partner" element={wrap(<PartnerPage />)} />
        <Route path="/contact" element={wrap(<ContactPage />)} />

        <Route path="/terms" element={wrap(<TermsPage />)} />
        <Route path="/privacy" element={wrap(<PrivacyPage />)} />

        <Route
          path="/enroll"
          element={wrap(<EnrollPage lang={lang} />)}
        />

        <Route path="/dashboard" element={wrap(<DashboardPage />)} />
        <Route path="/blog" element={wrap(<BlogPage />)} />
        <Route path="/prompts" element={wrap(<PromptsPage />)} />

        <Route
          path="/marketing/glossary"
          element={wrap(<MarketingGlossaryPage />)}
        />

        <Route path="/course/ai" element={wrap(<CourseAIPage />)} />

        <Route path="/guide" element={wrap(<GuideLandingPage />)} />
        <Route path="/guide/day1" element={wrap(<GuideDay1Page />)} />
        <Route path="/guide/day2" element={wrap(<GuideDay2Page />)} />
        <Route path="/guide/day3" element={wrap(<GuideDay3Page />)} />
        <Route path="/guide/offer" element={wrap(<GuideOfferPage />)} />

        <Route
          path="/agents"
          element={wrap(<AgentsPage lang={lang} />)}
        />

        <Route
          path="/agents/free-trial"
          element={wrap(<AgentFreeTrialPage />)}
        />

        <Route
          path="/product/:toolId"
          element={wrap(<ToolSalesPage />)}
        />

        <Route path="/lesson" element={wrap(<LessonPage />)} />

        <Route
          path="/portfolio/:workId"
          element={wrap(<PortfolioDetailPage />)}
        />

        <Route
          path="/course/:slug"
          element={wrap(<CourseLandingPage />)}
        />

        <Route
          path="/tools/:slug"
          element={<ToolDetailPage lang={lang} />}
        />

        <Route path="*" element={wrap(<NotFoundPage />)} />
      </Routes>
    </AnimatePresence>
  );
}