import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Pillars from './components/Pillars';
import DayTimeline from './components/DayTimeline';
import Audience from './components/Audience';
import Manifesto from './components/Manifesto';
import Quotes from './components/Quotes';
import DashboardPreview from './components/DashboardPreview';
import CoachSection from './components/CoachSection';
import Pricing from './components/Pricing';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AnalyticsConsent from './components/AnalyticsConsent';
import { ScrollProgress } from './components/Animated';
import { api } from './lib/api';
import type { Narrative } from './lib/types';

export default function App() {
  const [narrative, setNarrative] = useState<Narrative | null>(null);

  useEffect(() => {
    api
      .narrative()
      .then(setNarrative)
      .catch(() => {});
  }, []);

  return (
    <div className="relative bg-ink text-white font-sans overflow-x-clip antialiased">
      <ScrollProgress />
      <div className="noise" />
      <Navbar />
      <main className="relative">
        <Hero protocol={narrative?.protocol ?? null} />
        <Problem />
        <Pillars pillars={narrative?.pillars ?? null} />
        <DayTimeline events={narrative?.timeline ?? null} />
        <Audience />
        <Manifesto principles={narrative?.principles ?? null} />
        <Quotes quotes={narrative?.quotes ?? null} />
        <DashboardPreview />
        <CoachSection />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
      <AnalyticsConsent />
    </div>
  );
}
