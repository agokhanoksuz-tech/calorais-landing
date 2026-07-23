import { motion } from 'framer-motion';
import { Watch, UtensilsCrossed, Moon, NotebookPen, Zap, ArrowDown } from 'lucide-react';
import ChapterHeading from './ChapterHeading';

const LEGACY_APPS = [
  { icon: Watch, label: 'tracker.' },
  { icon: UtensilsCrossed, label: 'counter.' },
  { icon: Moon, label: 'sleep.' },
  { icon: NotebookPen, label: 'notes.' },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <ChapterHeading
              num="01"
              eyebrow="The Problem"
              title="You don’t have a motivation problem."
            />
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="-mt-4 md:-mt-8"
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl text-volt tracking-[-0.02em]">
                You have a fragmentation problem.
              </h3>
              <p className="mt-6 text-mist leading-relaxed max-w-lg">
                Training, food, sleep and notes live in six different apps — and you’re the
                translator between them.
              </p>
              <p className="mt-5 text-white/90 leading-relaxed max-w-lg">
                Calorais replaces the pile with one operating layer that decides once, so the whole
                day points the same way.
              </p>
              <p className="mt-8 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-mist/70 uppercase">
                {'// '}Fewer apps. Fewer decisions. More output.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {LEGACY_APPS.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                  className="rounded-2xl border border-line bg-carbon p-6 opacity-45 saturate-0"
                >
                  <a.icon className="w-6 h-6 text-mist" />
                  <div className="mt-4 font-display font-bold text-lg text-white/70">{a.label}</div>
                  <div className="mt-1 font-mono text-[9px] tracking-[0.25em] text-mist">UNLINKED</div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center py-3">
              <ArrowDown className="w-4 h-4 text-mist" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="rounded-2xl border border-volt/50 bg-volt/[0.06] p-6 flex items-center gap-5"
            >
              <span className="w-12 h-12 rounded-xl bg-volt flex items-center justify-center shadow-[0_0_26px_rgba(200,255,61,0.3)]">
                <Zap className="w-6 h-6 text-ink" strokeWidth={2.5} />
              </span>
              <div>
                <div className="font-display font-bold text-2xl text-white tracking-tight">calorais.</div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-volt mt-0.5">
                  ONE OPERATING LAYER
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
