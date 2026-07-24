import { motion } from 'framer-motion';
import ChapterHeading from './ChapterHeading';
import type { PillarData } from '../lib/types';

export default function Pillars({ pillars }: { pillars: PillarData[] | null }) {
  return (
    <section id="pillars" className="relative py-20 md:py-28 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ChapterHeading
          num="02"
          eyebrow="The Pillars"
          title="Built on four pillars."
          description="Not features — foundations. Every decision the system makes belongs to one of these four."
        />

        <div className="border-b border-line">
          {pillars === null
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border-t border-line py-10 md:py-12 grid lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-4 animate-pulse">
                    <div className="h-10 w-52 rounded bg-steel" />
                    <div className="h-5 w-3/4 rounded bg-steel" />
                    <div className="h-3 w-full rounded bg-steel" />
                    <div className="h-3 w-5/6 rounded bg-steel" />
                  </div>
                  <div className="aspect-[16/11] rounded-2xl bg-steel/50 animate-pulse" />
                </div>
              ))
            : pillars.map((p, i) => {
                const flip = i % 2 === 1;
                return (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                    className="border-t border-line py-10 md:py-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                  >
                    <div className={flip ? 'lg:order-2' : ''}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-sm text-volt">{p.num}</span>
                        <h3 className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] text-white">
                          {p.name}.
                        </h3>
                      </div>
                      <p className="mt-6 text-lg md:text-xl text-white font-medium leading-snug">
                        {p.line}
                      </p>
                      <p className="mt-4 text-mist leading-relaxed max-w-lg">{p.description}</p>
                      <div className="mt-7 inline-flex items-center gap-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-mist border border-line rounded-full px-4 py-2">
                        <span className="w-1.5 h-1.5 bg-volt" />
                        {p.detail}
                      </div>
                    </div>
                    <div className={flip ? 'lg:order-1' : ''}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.75, delay: 0.1 }}
                        className="rounded-2xl overflow-hidden border border-line group lg:max-w-xl"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full aspect-[16/9] object-cover grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                        />
                      </motion.div>
                    </div>
                  </motion.article>
                );
              })}
        </div>
      </div>
    </section>
  );
}
