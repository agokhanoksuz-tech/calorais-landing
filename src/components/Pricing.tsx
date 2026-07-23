import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import ChapterHeading from './ChapterHeading';
import { Magnetic } from './Animated';
import { api } from '../lib/api';
import type { Plan } from '../lib/types';

function formatPrice(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString('en-US')
    : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function PlanCardInner({ p }: { p: Plan }) {
  return (
    <div
      className={`h-full rounded-3xl p-8 flex flex-col ${
        p.highlighted
          ? 'bg-gradient-to-b from-volt/[0.09] to-carbon'
          : 'border border-line bg-carbon hover:border-mist/40'
      } transition-all duration-300`}
    >
      {p.highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-volt text-ink font-mono text-[10px] tracking-[0.25em] font-semibold rounded-full px-4 py-1.5 whitespace-nowrap shadow-[0_0_18px_rgba(200,255,61,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
          MOST CHOSEN
        </span>
      )}

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] ${p.highlighted ? 'text-volt' : 'text-mist'}`}>
          {p.highlighted && <span className="w-2 h-2 bg-volt" />}
          {p.name}
        </span>
        {p.price === 0 && (
          <span className="font-mono text-[10px] text-mist border border-line rounded-full px-3 py-1">
            FOREVER
          </span>
        )}
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className={`font-display font-bold text-5xl md:text-6xl tracking-[-0.03em] leading-none ${p.highlighted ? 'text-volt' : 'text-white'}`}>
          ${formatPrice(p.price)}
        </span>
        <span className="text-mist text-sm mb-1.5">/ {p.period}</span>
      </div>
      <p className="mt-3 text-sm text-mist">{p.description}</p>

      <div className="mt-7 space-y-3 flex-1">
        {p.features.map((f) => (
          <div key={f} className="flex gap-2.5 text-sm text-white/85">
            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlighted ? 'text-volt' : 'text-mist'}`} />
            {f}
          </div>
        ))}
      </div>

      <Magnetic strength={0.12}>
        <a
          href="#get-started"
          className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all duration-300 active:scale-95 ${
            p.highlighted
              ? 'bg-volt text-ink hover:shadow-[0_0_30px_rgba(200,255,61,0.35)]'
              : 'border border-line text-white hover:border-volt/60 hover:text-volt'
          }`}
        >
          {p.button_text}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </Magnetic>
    </div>
  );
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .plans()
      .then(setPlans)
      .catch(() => setError('Pricing could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="relative py-20 md:py-28 border-b border-line overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-volt/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <ChapterHeading
          num="05"
          eyebrow="Pricing"
          title="Pick the depth you need."
          description="Start free, go deeper when you're ready. No hidden fees, no fine print — cancel anytime with one click."
        />

        {error && (
          <div className="max-w-3xl rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm px-5 py-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 lg:gap-5 max-w-6xl items-stretch">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-3xl border border-line bg-carbon p-8 animate-pulse">
                  <div className="h-4 w-24 rounded bg-steel" />
                  <div className="mt-6 h-12 w-32 rounded bg-steel" />
                  <div className="mt-6 space-y-3">
                    {[0, 1, 2, 3].map((j) => (
                      <div key={j} className="h-3 w-full rounded bg-steel" />
                    ))}
                  </div>
                </div>
              ))
            : plans.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative ${
                    p.highlighted
                      ? 'rounded-3xl border-2 border-volt/70 lg:-translate-y-4 shadow-[0_36px_90px_-45px_rgba(200,255,61,0.35)]'
                      : ''
                  }`}
                >
                  {p.highlighted ? (
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-full"
                    >
                      <PlanCardInner p={p} />
                    </motion.div>
                  ) : (
                    <PlanCardInner p={p} />
                  )}
                </motion.div>
              ))}
        </div>

        <p className="mt-12 font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-mist">
          {'// '}14-DAY TRIAL · NO CARD REQUIRED · CANCEL ANYTIME · USD
        </p>
      </div>
    </section>
  );
}
