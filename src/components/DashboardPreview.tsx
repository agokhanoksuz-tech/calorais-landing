import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Dumbbell, Footprints, Waves } from 'lucide-react';
import ChapterHeading from './ChapterHeading';
import { api } from '../lib/api';
import { getIcon } from '../lib/icons';
import type { DashboardData } from '../lib/types';

function sessionIcon(title: string) {
  const t = title.toLowerCase();
  if (/\b(bike|cycle|cycling|spin)\b/.test(t)) return Bike;
  if (/\b(run|jog|sprint|walk|hike)\b/.test(t)) return Footprints;
  if (/\b(swim|row|rowing)\b/.test(t)) return Waves;
  return Dumbbell;
}

export default function DashboardPreview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .dashboard()
      .then(setData)
      .catch(() => setError('System view could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  const activity = data?.activity ?? [];
  const maxValue = activity.length ? Math.max(...activity.map((a) => a.value)) : 100;

  let ringPercent = 83;
  const targetMetric = data?.metrics.find((m) => m.value.includes('/'));
  if (targetMetric) {
    const [a, b] = targetMetric.value.split('/').map((v) => parseFloat(v));
    if (b > 0) ringPercent = Math.round((a / b) * 100);
  }

  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <section id="intelligence" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute -top-32 right-0 w-[560px] h-[560px] bg-volt/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <ChapterHeading
          num="04"
          eyebrow="Intelligence"
          title="It adapts quietly."
          description="Training, sleep and fuel become one signal; tomorrow’s plan redrafts itself overnight. The AI stays backstage."
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto rounded-2xl border border-line bg-coal p-2 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-center justify-between px-5 py-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-mist uppercase">
              System view — live read
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-volt">
              <span className="w-1.5 h-1.5 rounded-full bg-volt animate-pulseline" />
              SYNC ONLINE
            </span>
          </div>

          <div className="rounded-xl border border-line bg-ink p-4 md:p-6">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm px-5 py-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-line bg-carbon p-5 animate-pulse">
                      <div className="w-8 h-8 rounded-lg bg-steel" />
                      <div className="mt-4 h-3 w-1/2 rounded bg-steel" />
                      <div className="mt-3 h-7 w-2/3 rounded bg-steel" />
                    </div>
                  ))
                : data?.metrics.map((m) => {
                    const Icon = getIcon(m.icon);
                    return (
                      <div
                        key={m.id}
                        className={`rounded-xl border p-5 transition-colors ${
                          m.accent
                            ? 'border-volt/30 bg-volt/[0.05]'
                            : 'border-line bg-carbon hover:border-mist/30'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                            m.accent ? 'bg-volt/15 border-volt/30 text-volt' : 'bg-steel/60 border-line text-mist'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="mt-4 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                          {m.label}
                        </div>
                        <div className={`mt-1 font-display font-bold text-2xl md:text-3xl tracking-tight ${m.accent ? 'text-volt' : 'text-white'}`}>
                          {m.value}
                        </div>
                        <div className="mt-1 text-[11px] text-mist">{m.sub}</div>
                      </div>
                    );
                  })}
            </div>

            <div className="grid lg:grid-cols-3 gap-3 mt-3">
              <div className="lg:col-span-2 rounded-xl border border-line bg-carbon p-5 md:p-6">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <div className="font-display font-bold text-white">Training load</div>
                    <div className="font-mono text-[10px] text-mist tracking-widest mt-1">
                      DAILY GOAL COMPLETION, THIS WEEK
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-volt border border-volt/30 rounded-full px-3 py-1">
                    5/7 DAYS
                  </span>
                </div>
                {loading ? (
                  <div className="h-44 md:h-52 rounded-lg bg-steel/40 animate-pulse" />
                ) : (
                  <div className="flex items-end gap-3 md:gap-4 h-44 md:h-52">
                    {activity.map((a, i) => {
                      const isMax = a.value === maxValue;
                      return (
                        <div key={a.id} className="flex-1 h-full flex flex-col items-center justify-end gap-2">
                          <span className="font-mono text-[10px] text-mist">{a.value}%</span>
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${Math.max((a.value / maxValue) * 100, 4)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.06, ease: 'easeOut' }}
                            className={`w-full rounded-t-md ${
                              isMax ? 'bg-volt' : a.workouts === 0 ? 'bg-steel/50' : 'bg-steel'
                            }`}
                          />
                          <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-mist">
                            {a.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-line bg-carbon p-5 md:p-6 flex flex-col items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 140 140" className="w-36 h-36">
                    <circle cx="70" cy="70" r={R} stroke="#1b2023" strokeWidth="10" fill="none" />
                    <motion.circle
                      cx="70"
                      cy="70"
                      r={R}
                      stroke="#c8ff3d"
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      initial={{ strokeDashoffset: C }}
                      whileInView={{ strokeDashoffset: C * (1 - ringPercent / 100) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                      transform="rotate(-90 70 70)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-4xl text-white tracking-tight">{ringPercent}%</span>
                    <span className="font-mono text-[9px] tracking-[0.25em] text-mist mt-1">WEEK GOAL</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-mist leading-relaxed">
                  One session left to close the week.
                  <br />
                  <span className="text-volt">Tomorrow is already drafted.</span>
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-carbon mt-3">
              <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-2">
                <div className="font-display font-bold text-white text-sm">Latest sessions</div>
                <span className="font-mono text-[10px] text-mist tracking-widest">LAST 72 H</span>
              </div>
              {loading ? (
                <div className="px-6 pb-6 space-y-3 pt-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-12 rounded-lg bg-steel/40 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div>
                  {data?.workouts.map((w) => {
                    const SessionIcon = sessionIcon(w.title);
                    return (
                    <div
                      key={w.id}
                      className="flex items-center gap-4 px-5 md:px-6 py-3.5 border-t border-line/60 hover:bg-steel/20 transition-colors"
                    >
                      <span className="w-9 h-9 shrink-0 rounded-lg bg-steel/60 border border-line flex items-center justify-center">
                        <SessionIcon className="w-4 h-4 text-volt" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{w.title}</div>
                        <div className="font-mono text-[10px] md:text-[11px] text-mist mt-0.5 truncate">
                          {w.detail}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono text-xs text-white">{w.duration}</div>
                        <div className="font-mono text-[10px] text-volt mt-0.5">{w.kcal} kcal</div>
                      </div>
                      <span
                        className={`hidden sm:inline-block font-mono text-[9px] tracking-widest rounded-full px-2.5 py-1 border ${
                          w.intensity === 'High' ? 'border-volt/40 text-volt' : 'border-line text-mist'
                        }`}
                      >
                        {w.intensity.toUpperCase()}
                      </span>
                    </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center">
              <span className="font-mono text-[9px] tracking-[0.25em] text-mist/70">
                PATTERNS, NOT NUMBERS · TRENDS ACROSS 12 WEEKS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
