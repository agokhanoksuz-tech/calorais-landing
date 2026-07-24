import { motion } from 'framer-motion';
import ChapterHeading from './ChapterHeading';

const AUDIENCES = [
  {
    tag: 'WEEK ONE',
    title: 'Beginning.',
    body: 'You get structure on day one: prepared sessions sized to your level, simple fuel targets, zero ego. Consistency starts before willpower has a chance to run out.',
    image: '/images/audience-beginner.jpg',
    alt: 'Person jogging in a park at sunrise',
    mono: true,
  },
  {
    tag: 'YEAR TEN',
    title: 'Competing.',
    body: 'You get nuance: periodized blocks, readiness-gated intensity and fatigue budgets that protect the edge you spent years building — season after season.',
    image: '/images/audience-elite.svg',
    alt: 'Original Calorais artwork — starting blocks under a stadium light',
    mono: false,
  },
];

export default function Audience() {
  return (
    <section className="relative py-20 md:py-28 border-b border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ChapterHeading
          eyebrow="Who it is for"
          title="Serious looks different on everyone."
          description="Calorais does not ask how experienced you are. It asks what today requires — and prepares accordingly."
        />

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-6xl">
          {AUDIENCES.map((a, i) => (
            <motion.article
              key={a.tag}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative rounded-3xl overflow-hidden border border-line h-[420px] md:h-[460px] bg-coal"
            >
              <img
                src={a.image}
                alt={a.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover contrast-110 transition-all duration-700 group-hover:scale-105 ${
                  a.mono ? 'grayscale group-hover:grayscale-0' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <span className="inline-block font-mono text-[10px] tracking-[0.3em] text-volt border border-volt/40 bg-ink/60 backdrop-blur-sm rounded-full px-4 py-1.5">
                  {a.tag}
                </span>
                <h3 className="mt-5 font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] text-white">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] text-white/80 leading-relaxed max-w-md">
                  {a.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
