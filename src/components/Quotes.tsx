import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Quote } from '../lib/types';

const INTERVAL_MS = 6500;

export default function Quotes({ quotes }: { quotes: Quote[] | null }) {
  const count = quotes?.length ?? 0;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const next = useCallback(() => {
    if (count > 0) setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    if (count > 0) setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const t = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused, reduced, count, next]);

  useEffect(() => {
    // Keep the active quote valid if the asynchronously loaded collection changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (index >= count && count > 0) setIndex(0);
  }, [count, index]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const q = quotes && quotes.length > 0 ? quotes[Math.min(index, quotes.length - 1)] : null;

  return (
    <section aria-label="Athlete voices" className="relative py-20 md:py-28 border-b border-line">
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-mist uppercase">
            {'// '}Voices
          </p>
          <h2 className="mt-6 font-display font-bold text-3xl md:text-4xl tracking-[-0.03em] text-white">
            The standard, in their words.
          </h2>
        </motion.div>

        {quotes === null ? (
          <div className="mt-16 flex flex-col items-center gap-4 animate-pulse">
            <div className="h-7 w-3/4 rounded bg-steel" />
            <div className="h-7 w-1/2 rounded bg-steel" />
            <div className="mt-4 h-3.5 w-40 rounded bg-steel" />
            <div className="h-3 w-28 rounded bg-steel" />
          </div>
        ) : q ? (
          <div
            tabIndex={0}
            role="group"
            aria-label="Athlete quotes. Use left and right arrow keys to browse."
            aria-live="polite"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={onKeyDown}
            className="mt-14 md:mt-16 outline-none focus-visible:ring-1 focus-visible:ring-volt/40 rounded-3xl"
          >
            <div className="relative min-h-[250px] md:min-h-[240px] flex items-center justify-center px-2">
              <span
                aria-hidden
                className="absolute -top-4 left-1/2 -translate-x-1/2 font-display text-[6.5rem] leading-none text-volt/10 select-none"
              >
                “
              </span>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={q.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  transition={{ duration: reduced ? 0.25 : 0.55, ease: 'easeOut' }}
                  className="relative max-w-3xl"
                >
                  <p className="font-display font-medium text-2xl md:text-[2rem] leading-snug tracking-[-0.015em] text-white">
                    “{q.quote}”
                  </p>
                  <footer className="mt-8 flex flex-col items-center gap-2.5">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-line" />
                      <span className="font-semibold text-white text-[15px]">{q.athlete}</span>
                      <span className="h-px w-8 bg-line" />
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.25em] text-mist uppercase">
                      {q.sport}
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.25em] text-volt border border-volt/30 rounded-full px-3.5 py-1.5 mt-1.5 uppercase">
                      {q.theme}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={prev}
                aria-label="Previous quote"
                className="w-10 h-10 rounded-full border border-line text-mist hover:text-volt hover:border-volt/50 flex items-center justify-center transition-colors active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col items-center gap-2.5">
                <span className="font-mono text-[11px] tracking-[0.25em] text-mist">
                  {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <div className="w-36 h-px bg-steel overflow-hidden rounded-full">
                  {count > 1 && !reduced && (
                    <div
                      key={q.id + '-' + String(paused)}
                      className={`h-full bg-volt/70 quote-progress ${paused ? 'paused' : ''}`}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={next}
                aria-label="Next quote"
                className="w-10 h-10 rounded-full border border-line text-mist hover:text-volt hover:border-volt/50 flex items-center justify-center transition-colors active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 font-mono text-[9px] md:text-[10px] tracking-[0.18em] text-mist/60 leading-relaxed max-w-xl mx-auto uppercase"
        >
          Quotes are included for editorial inspiration and do not imply endorsement of Calorais.
        </motion.p>
      </div>
    </section>
  );
}
