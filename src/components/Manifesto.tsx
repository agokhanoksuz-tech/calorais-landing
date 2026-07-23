import { motion } from 'framer-motion';
import type { Principle } from '../lib/types';

function BigLine({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Manifesto({ principles }: { principles: Principle[] | null }) {
  return (
    <section className="relative py-24 md:py-32 border-b border-line overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-volt/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-mist uppercase"
        >
          {'// '}What we believe
        </motion.p>
        <h2 className="mt-8 font-display font-bold tracking-[-0.035em] leading-[1.08] text-[clamp(2.4rem,6vw,4.8rem)]">
          <BigLine text="Motivation is weather." delay={0.1} className="text-mist" />
          <span className="block overflow-hidden">
            <motion.span
              className="block text-white"
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              Discipline is <span className="text-volt">climate.</span>
            </motion.span>
          </span>
        </h2>

        <div className="mt-14 md:mt-16 grid md:grid-cols-3 gap-5 text-left">
          {principles === null
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-line bg-carbon p-8 space-y-4 animate-pulse">
                  <div className="h-3.5 w-10 rounded bg-steel" />
                  <div className="h-6 w-4/5 rounded bg-steel" />
                  <div className="h-3 w-full rounded bg-steel" />
                </div>
              ))
            : principles.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="rounded-2xl border border-line bg-carbon p-8 hover:border-volt/40 transition-colors duration-300"
                >
                  <span className="font-mono text-sm text-volt">{p.num}</span>
                  <h3 className="mt-4 font-display font-bold text-2xl tracking-[-0.02em] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-mist leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
