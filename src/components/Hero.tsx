import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Magnetic } from './Animated';
import type { ProtocolItem } from '../lib/types';

function MaskLine({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

const CHAPTERS = [
  { num: '01', label: 'Fragmentation', href: '#problem' },
  { num: '02', label: 'Pillars', href: '#pillars' },
  { num: '03', label: 'A Day in the System', href: '#day' },
  { num: '04', label: 'Intelligence', href: '#intelligence' },
  { num: '05', label: 'Get Started', href: '#get-started' },
];

export default function Hero({ protocol }: { protocol: ProtocolItem[] | null }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-volt/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-32 md:pt-44 pb-16 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-mist"
          >
            <span className="w-2 h-2 bg-volt" />
            Calorais — Performance Operating System
          </motion.div>

          <h1 className="mt-8 font-display font-bold tracking-[-0.035em] leading-[0.98] text-white text-[clamp(3.4rem,7.6vw,6.6rem)]">
            <MaskLine text="Every day," delay={0.25} />
            <MaskLine text="prepared." delay={0.38} className="text-volt" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 max-w-lg text-base md:text-lg text-mist leading-relaxed"
          >
            Calorais builds each day around you — training, nutrition, recovery and progress, run by
            one quiet system. Not hype. Not motivation.{' '}
            <span className="text-white font-medium">Preparation.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#get-started"
                className="group inline-flex items-center gap-2.5 bg-volt text-ink font-bold text-sm md:text-base px-7 py-4 rounded-full hover:shadow-[0_0_36px_rgba(200,255,61,0.4)] transition-all duration-300 active:scale-95"
              >
                Get started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <a
              href="#day"
              className="group inline-flex items-center gap-2.5 text-sm md:text-base font-semibold text-white/90 hover:text-volt transition-colors px-2 py-4"
            >
              Watch a day unfold
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 font-mono text-[10px] md:text-[11px] tracking-[0.35em] text-mist/70 uppercase"
          >
            One system · Four pillars · Zero guesswork
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl border border-line bg-coal shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-line">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase">
                  Today's protocol
                </div>
                <div className="font-display font-bold text-white text-lg mt-0.5 tracking-tight">
                  Tue · Week 07
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-volt">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-volt" />
                </span>
                CLEAR TO TRAIN
              </span>
            </div>

            <div>
              {protocol === null
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 md:px-6 py-4 border-b border-line/50 last:border-0 animate-pulse">
                      <div className="w-12 h-3.5 rounded bg-steel" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3.5 w-2/5 rounded bg-steel" />
                        <div className="h-2.5 w-4/5 rounded bg-steel" />
                      </div>
                    </div>
                  ))
                : protocol.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.7 + i * 0.09 }}
                      className="flex items-start gap-4 px-5 md:px-6 py-4 border-b border-line/50 last:border-0 hover:bg-steel/20 transition-colors"
                    >
                      <span className="font-mono text-xs text-volt pt-0.5 w-11 shrink-0">{p.time}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">{p.title}</div>
                        <div className="text-xs text-mist mt-0.5 leading-relaxed">{p.detail}</div>
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-mist border border-line rounded px-2 py-1 shrink-0">
                        {p.state}
                      </span>
                    </motion.div>
                  ))}
            </div>

            <div className="px-5 md:px-6 py-3.5 flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-mist/70">
                ISSUED 06:15 · UPDATES AS YOU LIVE IT
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-volt animate-pulseline whitespace-nowrap shrink-0">
                SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative border-y border-line"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {CHAPTERS.map((c, i) => (
            <a
              key={c.num}
              href={c.href}
              className={`group flex items-center gap-2.5 py-5 md:py-6 border-l border-line first:border-l-0 pl-4 md:pl-5 hover:bg-steel/20 transition-colors ${
                i === CHAPTERS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <span className="font-mono text-[11px] text-volt">{c.num}</span>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-mist uppercase group-hover:text-white transition-colors">
                {c.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
