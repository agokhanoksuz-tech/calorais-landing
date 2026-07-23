import { motion } from 'framer-motion';
import ChapterHeading from './ChapterHeading';
import type { DayEvent } from '../lib/types';

export default function DayTimeline({ events }: { events: DayEvent[] | null }) {
  return (
    <section id="day" className="relative py-20 md:py-28 bg-coal/50 border-y border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ChapterHeading
                num="03"
                eyebrow="A Day in the System"
                title="Tomorrow is already drafted."
                description="This is what a prepared day actually looks like. Notice what's missing from it: decisions. The system removes them before they cost you energy — and quietly reshapes the plan when life intervenes."
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="-mt-2 md:-mt-6 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-mist/70 uppercase"
              >
                {'// '}Read it like a schedule. It is one.
              </motion.p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-[5px] md:left-[7px] top-2 bottom-6 w-px bg-line" />
              {events === null
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="py-8 border-b border-line last:border-0 space-y-3 animate-pulse">
                      <div className="h-3.5 w-24 rounded bg-steel" />
                      <div className="h-7 w-2/3 rounded bg-steel" />
                      <div className="h-3 w-full rounded bg-steel" />
                    </div>
                  ))
                : events.map((e, i) => (
                    <motion.div
                      key={e.id}
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.55, delay: i * 0.05 }}
                      className="relative py-8 first:pt-2 border-b border-line last:border-0"
                    >
                      <span className="absolute -left-8 md:-left-12 top-3.5 md:top-4 ml-[2px] w-2.5 h-2.5 bg-volt rotate-45 rounded-[2px] shadow-[0_0_12px_rgba(200,255,61,0.5)]" />
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="font-mono text-sm text-volt">{e.time}</span>
                        <span className="font-mono text-[9px] tracking-[0.25em] text-mist border border-line rounded-full px-3 py-1">
                          {e.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] text-white">
                        {e.title}
                      </h3>
                      <p className="mt-2.5 text-mist leading-relaxed max-w-2xl">{e.description}</p>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
