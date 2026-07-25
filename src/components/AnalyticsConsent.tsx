import { useEffect, useState } from 'react';
import {
  getAnalyticsConsent,
  loadGoogleAnalytics,
  setAnalyticsConsent,
  type AnalyticsConsent as Consent,
} from '../lib/analytics';

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(() => getAnalyticsConsent() === null);

  useEffect(() => {
    if (getAnalyticsConsent() === 'granted') loadGoogleAnalytics();
  }, []);

  const choose = (consent: Consent) => {
    setAnalyticsConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border border-line bg-coal/95 p-4 shadow-2xl backdrop-blur-xl sm:flex sm:items-center sm:gap-5 sm:p-5"
    >
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold text-white">Private, optional analytics.</p>
        <p className="mt-1 text-xs leading-relaxed text-mist">
          Help us understand visits and waitlist conversions. We never send your email address to
          Analytics.
        </p>
      </div>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="rounded-full border border-line px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/40"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="rounded-full bg-volt px-4 py-2.5 text-xs font-bold text-ink transition-transform active:scale-95"
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
