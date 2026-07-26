import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  X,
  Mail,
  HeartHandshake,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.85 4.85 0 0 0 2.83 1.44v3.1a7.93 7.93 0 0 1-2.83-.63v5.57a6.05 6.05 0 1 1-5.22-5.99v3.14a2.95 2.95 0 1 0 2.09 2.82V2h3.13v3.82Z" />
    </svg>
  );
}

type DocId = 'privacy' | 'terms' | 'support' | 'delete' | 'security' | 'status' | 'licenses';

interface DocSection {
  heading?: string;
  body?: string[];
  bullets?: string[];
}

interface Doc {
  title: string;
  updated?: string;
  intro?: string;
  sections: DocSection[];
}

const DOCS: Record<Exclude<DocId, 'status'>, Doc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated · July 2026',
    sections: [
      {
        heading: 'Who we are',
        body: [
          'Calorais, Inc. is the data controller for information processed through the Calorais platform and this website. You can reach us at any time: hello@calorais.com — a real person replies.',
        ],
      },
      {
        heading: 'What we collect',
        bullets: [
          'Account data — your email address and authentication identifiers',
          'Performance data — training, readiness, nutrition and recovery metrics you log',
          'Device & usage data — anonymized diagnostics that keep the system stable',
          'Optional website analytics — page views, device category and referral source, collected only after you allow analytics',
          'Early-access data — your email address, processed with your consent',
        ],
      },
      {
        heading: 'How we use it',
        bullets: [
          'Operate and personalize your daily protocol',
          'Improve system reliability, safety and support quality',
          'Send product and launch updates you can leave with one click',
          'Meet legal obligations such as billing records',
        ],
      },
      {
        heading: 'What we never do',
        bullets: [
          'Sell your personal data',
          'Use your health or performance data to train public AI models',
          'Share your data with third parties for their own marketing',
        ],
      },
      {
        heading: 'Processors & storage',
        body: [
          'Data is processed by tightly vetted sub-processors (cloud hosting, transactional email and, only with your permission, Google Analytics) under data-processing terms. Analytics never receives the email address submitted to our waitlist. Content is stored encrypted, with daily encrypted backups.',
        ],
      },
      {
        heading: 'Retention',
        body: [
          'Your data lives as long as your account does. After a verified deletion request, personal data is erased within 30 days; encrypted backups roll off within 60 days.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Access, correct, export, restrict or delete your data at any time — write to hello@calorais.com. EU/EEA users may also lodge a complaint with their supervisory authority.',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: [
          'Material changes are announced in-product and by email before they take effect. Nothing changes silently.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated · March 2026',
    sections: [
      {
        heading: 'The service',
        body: [
          'Calorais is a performance operating system that prepares training, nutrition and recovery guidance around your day. All content is informational — see the health notice below.',
        ],
      },
      {
        heading: 'Health notice',
        body: [
          'Calorais supports training, nutrition and recovery. It is not a medical device and does not provide medical advice, diagnosis or treatment. Always consult a qualified physician before changing your exercise or diet, especially with existing conditions.',
        ],
      },
      {
        heading: 'Eligibility & accounts',
        body: [
          'You must be at least 16 years old, provide accurate information and keep your credentials secure. You are responsible for activity under your account.',
        ],
      },
      {
        heading: 'Subscriptions & billing',
        bullets: [
          'Memberships renew monthly and can be cancelled anytime — effective at the end of the billing cycle',
          'The 7-day trial requires no card and no charge',
          'Prices are listed in USD; applicable taxes may apply',
        ],
      },
      {
        heading: 'Acceptable use',
        bullets: [
          'Do not attack, probe or disrupt the service',
          'Do not resell or share access outside your plan',
          'Follow coached loads appropriate to your level and your own limits',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The system, protocols, design and brand belong to Calorais, Inc. Your data belongs to you — export or delete it anytime.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the maximum extent permitted by law, Calorais’ aggregate liability is limited to the fees you paid in the twelve months preceding the claim. We are not liable for indirect or consequential damages.',
        ],
      },
      {
        heading: 'Termination, changes & contact',
        body: [
          'Cancel anytime; we may suspend abusive accounts. Material changes to these terms are announced before they take effect. Governing law: Delaware, USA. Contact: hello@calorais.com.',
        ],
      },
    ],
  },
  support: {
    title: 'Support',
    intro: 'Real people, fast answers.',
    sections: [
      {
        heading: 'Write to us',
        body: [
          'hello@calorais.com — we reply within 24 hours on weekdays (System members: 12 h · Apex members: 4 h), 08:00–20:00 GMT.',
        ],
      },
      {
        heading: 'Instant answers',
        body: [
          'Most training, nutrition and account questions are resolved immediately by the Console — it already knows the system.',
        ],
      },
      {
        heading: 'Common topics',
        bullets: [
          'Billing, trials and cancellations',
          'Data export and account deletion',
          'Wearable connections — Apple Watch, Garmin, WHOOP',
          'Protocol adjustments and product feedback',
        ],
      },
    ],
  },
  delete: {
    title: 'Delete Account',
    intro: 'Your account, your call — no retention games.',
    sections: [
      {
        heading: 'How to delete',
        body: [
          'Email hello@calorais.com from your account address with the subject “Delete my account”. A human confirms the request within 24 hours.',
        ],
      },
      {
        heading: 'What gets erased',
        bullets: [
          'Profile and identity data',
          'Training, nutrition and recovery history',
          'Console conversations',
          'Generated protocols and plans',
        ],
      },
      {
        heading: 'Timeline',
        body: [
          'Personal data is erased within 30 days of verification. Encrypted backups roll off within 60 days. Billing records are retained only as long as law requires.',
        ],
      },
      {
        heading: 'Before you go',
        body: [
          'Want a copy of your data first? Ask in the same email — we send a full export within 48 hours.',
        ],
      },
    ],
  },
  security: {
    title: 'Security',
    updated: 'Last reviewed · March 2026',
    sections: [
      {
        heading: 'Encryption everywhere',
        body: [
          'All traffic is protected with TLS 1.3+ in transit and AES-256 at rest. Keys are managed by our cloud providers under strict rotation policies.',
        ],
      },
      {
        heading: 'Your data is yours',
        bullets: [
          'Never sold — to anyone, for any reason',
          'Never used to train public AI models',
          'Access limited to need-to-know engineering, logged and reviewed',
        ],
      },
      {
        heading: 'Infrastructure',
        body: [
          'Calorais runs on SOC 2-aligned cloud infrastructure in an isolated production environment with daily encrypted backups and least-privilege access throughout.',
        ],
      },
      {
        heading: 'Responsible disclosure',
        body: [
          'Found something? Report it to hello@calorais.com — we acknowledge every report within 24 hours and credit researchers who ask for it.',
        ],
      },
    ],
  },
  licenses: {
    title: 'Licenses & Credits',
    sections: [
      {
        heading: 'Typefaces',
        body: [
          'Space Grotesk and Inter — SIL Open Font License, via Google Fonts. JetBrains Mono — SIL Open Font License, via Google Fonts.',
        ],
      },
      {
        heading: 'Open source',
        bullets: [
          'React — MIT License',
          'Vite — MIT License',
          'Tailwind CSS — MIT License',
          'Framer Motion — MIT License',
          'lucide-react — ISC License',
          'Supabase — Apache License 2.0',
        ],
      },
      {
        heading: 'Photography',
        body: [
          'Editorial photography via Pexels (free license): RDNE Stock project, Tetyana Kovyrina, Mikhail Nilov, VANNGO Ng, Michael Pointner, Gonzalo Álvarez Balcazar.',
        ],
      },
      {
        heading: 'Trademarks',
        body: [
          'Apple Watch, Garmin and WHOOP are trademarks of their respective owners. Mention does not imply endorsement.',
        ],
      },
    ],
  },
};

const STATUS_COMPONENTS = [
  { name: 'API', uptime: '99.99%' },
  { name: 'Console', uptime: '99.98%' },
  { name: 'Dashboard', uptime: '99.99%' },
  { name: 'Data sync', uptime: '99.97%' },
  { name: 'Database', uptime: '99.99%' },
];

const SYSTEM_LINKS = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Four Pillars', href: '#pillars' },
  { label: 'A Day in the System', href: '#day' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Console', href: '#console' },
];

const LEGAL_LINKS: Array<{ id: DocId; label: string }> = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'security', label: 'Security' },
  { id: 'status', label: 'System Status' },
  { id: 'delete', label: 'Delete Account' },
  { id: 'licenses', label: 'Licenses & Credits' },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pt-1">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm text-mist leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-volt/70 shrink-0 mt-[7px]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function StatusPanel() {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl border border-volt/30 bg-volt/[0.06] px-5 py-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-volt" />
        </span>
        <div>
          <div className="font-display font-bold text-white text-sm">All systems operational</div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-mist mt-0.5">
            UPDATED EVERY 60 SECONDS
          </div>
        </div>
        <ShieldCheck className="w-5 h-5 text-volt ml-auto" />
      </div>
      <div className="mt-5 space-y-0">
        {STATUS_COMPONENTS.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between py-3 border-t border-line/60"
          >
            <span className="flex items-center gap-2.5 text-sm text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-volt" />
              {c.name}
            </span>
            <span className="font-mono text-xs text-mist">{c.uptime} · 90d</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-mist leading-relaxed">
        Something looks off on your end? Tell us — hello@calorais.com.
      </p>
    </div>
  );
}

export default function Footer() {
  const [doc, setDoc] = useState<DocId | null>(null);

  const close = () => setDoc(null);
  const current = doc && doc !== 'status' ? DOCS[doc] : null;

  return (
    <footer className="relative bg-coal">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center">
                <img src="/logo.png" alt="Calorais logo" className="w-8 h-8 rounded-lg" />
              </span>
              <span className="font-display font-bold text-xl tracking-[-0.02em] text-white">Calorais</span>
              <span className="font-mono text-[10px] text-mist border border-line rounded px-1.5 py-0.5 mt-0.5">
                OS
              </span>
            </a>
            <p className="mt-5 text-sm text-mist leading-relaxed max-w-xs">
              A performance operating system — one quiet layer for training, nutrition, recovery and
              progress.
            </p>
            <div className="mt-5 flex items-center gap-2.5 text-sm">
              <HeartHandshake className="w-4 h-4 text-volt shrink-0" />
              <span className="text-mist">
                Prefer a human?{' '}
                <a href="mailto:hello@calorais.com" className="text-volt hover:underline">
                  hello@calorais.com
                </a>
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                {
                  icon: Instagram,
                  href: 'https://www.instagram.com/caloraisai/',
                  label: 'Calorais on Instagram',
                },
                {
                  icon: TikTokIcon,
                  href: 'https://www.tiktok.com/@calorais',
                  label: 'Calorais on TikTok',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-line text-mist flex items-center justify-center hover:border-volt/60 hover:text-volt hover:-translate-y-0.5 transition-all"
                >
                  <s.icon className="w-4.5 h-4.5" />
                </a>
              ))}
              <a
                href="mailto:hello@calorais.com"
                aria-label="Email"
                className="w-10 h-10 rounded-xl border border-line text-mist flex items-center justify-center hover:border-volt/60 hover:text-volt hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase mb-5">The System</p>
            <ul className="space-y-3">
              {SYSTEM_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/80 hover:text-volt transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase mb-5">Company</p>
            <ul className="space-y-3">
              <li>
                <a href="#get-started" className="text-sm text-white/80 hover:text-volt transition-colors">
                  Founding access
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-white/80 hover:text-volt transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <button
                  onClick={() => setDoc('support')}
                  className="text-sm text-white/80 hover:text-volt transition-colors"
                >
                  Support
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@calorais.com"
                  className="text-sm text-white/80 hover:text-volt transition-colors"
                >
                  Contact — hello@calorais.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase mb-5">Legal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setDoc(l.id)}
                    className="text-sm text-white/80 hover:text-volt transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line">
          <p className="text-xs text-mist/80 leading-relaxed max-w-3xl">
            Calorais supports training, nutrition and recovery. It is not a medical device and not a
            substitute for professional medical advice, diagnosis or treatment — always consult a
            qualified physician before changing your exercise or diet.
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-mist">© 2026 Calorais, Inc. All rights reserved.</p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-mist/70">
              PERFORMANCE OS · v3.2.4
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {doc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/85 backdrop-blur-md flex items-center justify-center p-4 md:p-5"
            onClick={close}
          >
            <motion.div
              key={doc}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-line bg-carbon p-7 md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] text-white">
                    {doc === 'status' ? 'System Status' : current?.title}
                  </h3>
                  {current?.updated && (
                    <p className="mt-1.5 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                      {current.updated}
                    </p>
                  )}
                </div>
                <button
                  onClick={close}
                  className="w-9 h-9 shrink-0 rounded-lg border border-line text-mist hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {doc === 'status' ? (
                <div className="mt-6">
                  <StatusPanel />
                </div>
              ) : (
                current && (
                  <div className="mt-6">
                    {current.intro && (
                      <p className="text-base text-white/90 font-medium">{current.intro}</p>
                    )}
                    <div className="mt-5 space-y-6">
                      {current.sections.map((s, i) => (
                        <div key={s.heading ?? i}>
                          {s.heading && (
                            <h4 className="font-display font-bold text-sm tracking-[0.02em] text-volt uppercase">
                              {s.heading}
                            </h4>
                          )}
                          {s.body?.map((p) => (
                            <p key={p.slice(0, 32)} className="mt-2 text-sm text-mist leading-relaxed">
                              {p}
                            </p>
                          ))}
                          {s.bullets && (
                            <div className="mt-2">
                              <BulletList items={s.bullets} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {doc === 'support' && (
                      <div className="mt-7 flex flex-col sm:flex-row gap-3">
                        <a
                          href="mailto:hello@calorais.com"
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-volt text-ink rounded-full px-6 py-3 text-sm font-bold hover:shadow-[0_0_24px_rgba(200,255,61,0.35)] transition-all"
                        >
                          Email support
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <a
                          href="#console"
                          onClick={close}
                          className="flex-1 inline-flex items-center justify-center gap-2 border border-line rounded-full px-6 py-3 text-sm font-semibold text-white hover:border-volt/60 hover:text-volt transition-all"
                        >
                          Open the Console
                        </a>
                      </div>
                    )}

                    {doc === 'delete' && (
                      <div className="mt-7">
                        <a
                          href="mailto:hello@calorais.com?subject=Delete%20my%20account"
                          className="w-full inline-flex items-center justify-center gap-2 bg-volt text-ink rounded-full px-6 py-3 text-sm font-bold hover:shadow-[0_0_24px_rgba(200,255,61,0.35)] transition-all"
                        >
                          Request deletion
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
