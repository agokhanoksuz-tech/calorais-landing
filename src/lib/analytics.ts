const MEASUREMENT_ID = 'G-NSMPSNPL3K';
const CONSENT_KEY = 'calorais_analytics_consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsConsent = 'granted' | 'denied';

export function getAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function loadGoogleAnalytics() {
  if (getAnalyticsConsent() !== 'granted' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.caloraisAnalytics = 'true';
  document.head.appendChild(script);
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
  if (consent === 'granted') loadGoogleAnalytics();
}

export function trackWaitlistSignup() {
  if (getAnalyticsConsent() !== 'granted') return;
  window.gtag?.('event', 'generate_lead', {
    method: 'waitlist_form',
  });
}
