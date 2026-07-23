import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Dumbbell,
  Activity,
  Sparkles,
  Check,
  RefreshCcw,
  MessageSquareText,
  AlertTriangle,
} from 'lucide-react';
import { api } from '../lib/api';
import type { GeneratedPlan } from '../lib/types';

const GOALS = [
  { id: 'fat', label: 'Fat Loss', icon: Flame },
  { id: 'muscle', label: 'Muscle Gain', icon: Dumbbell },
  { id: 'conditioning', label: 'Conditioning', icon: Activity },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

interface Props {
  onAskCoach: (q: string) => void;
}

export default function PlanBuilder({ onAskCoach }: Props) {
  const [goal, setGoal] = useState('fat');
  const [level, setLevel] = useState('intermediate');
  const [days, setDays] = useState(4);
  const [weightInput, setWeightInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: number; plan: GeneratedPlan } | null>(null);

  const generate = async () => {
    setError(null);
    let weight: number | null = null;
    if (weightInput.trim()) {
      const w = Number(weightInput);
      if (!Number.isFinite(w) || w < 66 || w > 550) {
        setError('Please enter a weight between 66–550 lb.');
        return;
      }
      weight = Math.round(w / 2.20462);
    }
    setLoading(true);
    try {
      const res = await api.generatePlan({ goal, level, days, weight });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Plan could not be generated. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-carbon shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] overflow-hidden min-h-[620px]">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="p-6 md:p-8"
          >
            <p className="font-mono text-[11px] tracking-[0.25em] text-mist uppercase">
              {'// '}Your program in 3 steps
            </p>
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white mt-3">
              Build Your Plan
            </h3>

            <div className="mt-8">
              <p className="text-xs font-mono tracking-[0.2em] text-mist uppercase mb-3">01 — Your goal</p>
              <div className="grid grid-cols-3 gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      goal === g.id
                        ? 'border-volt/70 bg-volt/10 text-volt shadow-[0_0_20px_rgba(200,255,61,0.15)]'
                        : 'border-line bg-ink text-white/80 hover:border-mist/50'
                    }`}
                  >
                    <g.icon className="w-5 h-5 mb-2" />
                    <div className="text-sm font-semibold leading-tight">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-mono tracking-[0.2em] text-mist uppercase mb-3">02 — Your level</p>
              <div className="grid grid-cols-3 gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      level === l.id
                        ? 'border-volt/70 bg-volt/10 text-volt'
                        : 'border-line bg-ink text-white/80 hover:border-mist/50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono tracking-[0.2em] text-mist uppercase mb-3">
                  03 — Days per week
                </p>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`flex-1 rounded-xl border py-3 font-display text-lg transition-all duration-200 ${
                        days === d
                          ? 'border-volt/70 bg-volt text-ink shadow-[0_0_18px_rgba(200,255,61,0.3)]'
                          : 'border-line bg-ink text-white/80 hover:border-mist/50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono tracking-[0.2em] text-mist uppercase mb-3">
                  Body weight (lb)
                </p>
                <input
                  type="number"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="e.g. 170 — sizes your macros"
                  min={66}
                  max={550}
                  className="w-full bg-ink border border-line rounded-xl px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-volt/60 focus:shadow-[0_0_0_3px_rgba(200,255,61,0.12)] transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm px-4 py-3">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={() => void generate()}
              disabled={loading}
              className="mt-8 w-full inline-flex items-center justify-center gap-2.5 bg-volt text-ink font-bold text-base px-7 py-4 rounded-full hover:shadow-[0_0_36px_rgba(200,255,61,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:translate-y-0"
            >
              <Sparkles className="w-5 h-5" />
              {loading ? 'Calorais is crafting your plan...' : 'Build My Plan'}
            </button>
            <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-mist">
              NO ACCOUNT NEEDED • INSTANT RESULT • SAVED TO CALORAIS
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.2em] text-volt">
                PLAN #{result.id} • SAVED TO CALORAIS
              </p>
              <div className="flex gap-2">
                <span className="font-mono text-[10px] border border-line rounded-full px-3 py-1 text-mist">
                  {result.plan.goal_label.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] border border-line rounded-full px-3 py-1 text-mist">
                  {result.plan.level_label.toUpperCase()}
                </span>
              </div>
            </div>
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white mt-3">
              Your Weekly Program
            </h3>
            <p className="text-sm text-mist mt-2">{result.plan.summary}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
              {[
                { label: 'CALORIES / DAY', value: result.plan.calories.toLocaleString('en-US'), unit: 'kcal' },
                { label: 'PROTEIN', value: String(result.plan.macros.protein), unit: 'g' },
                { label: 'CARBS', value: String(result.plan.macros.carbs), unit: 'g' },
                { label: 'FAT', value: String(result.plan.macros.fat), unit: 'g' },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-line bg-ink p-4">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-mist">{m.label}</div>
                  <div className="mt-2 font-display text-3xl text-white">
                    {m.value}
                    <span className="text-sm text-volt ml-1">{m.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-volt/25 bg-volt/5 px-5 py-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-volt mb-1.5">COACH NOTE</p>
              <p className="text-sm text-white/85 leading-relaxed">{result.plan.coach_note}</p>
            </div>

            <div className="mt-7 space-y-3">
              {result.plan.split.map((day, i) => (
                <motion.div
                  key={day.name + i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-xl border border-line bg-ink overflow-hidden"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-3.5 border-b border-line/60 bg-steel/30">
                    <span className="font-mono text-xs text-volt">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-bold text-white text-sm">{day.name}</span>
                    <span className="text-xs text-mist">• {day.focus}</span>
                    <span className="ml-auto font-mono text-[10px] text-mist">{day.note}</span>
                  </div>
                  <div className="px-5 py-2">
                    {day.exercises.map((ex) => (
                      <div
                        key={ex.name}
                        className="flex items-center justify-between py-2 border-b border-line/40 last:border-0"
                      >
                        <span className="text-sm text-white/85">{ex.name}</span>
                        <span className="font-mono text-xs text-mist">
                          {ex.sets} x <span className="text-volt">{ex.reps}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-line bg-ink p-5">
              <p className="font-mono text-[10px] tracking-[0.2em] text-mist mb-3">COACH RECOMMENDATIONS</p>
              <div className="space-y-2.5">
                {result.plan.tips.map((tip) => (
                  <div key={tip} className="flex gap-2.5 text-sm text-white/85">
                    <Check className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-line rounded-full px-6 py-3.5 text-sm font-semibold text-white hover:border-volt/60 hover:text-volt transition-all"
              >
                <RefreshCcw className="w-4 h-4" />
                Build a New Plan
              </button>
              <button
                onClick={() => onAskCoach('What should I pay attention to while following this plan?')}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-volt text-ink rounded-full px-6 py-3.5 text-sm font-bold hover:shadow-[0_0_30px_rgba(200,255,61,0.4)] transition-all"
              >
                <MessageSquareText className="w-4 h-4" />
                Ask the Coach
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
