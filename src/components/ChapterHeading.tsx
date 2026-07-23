import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  num?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

export default function ChapterHeading({ num, eyebrow, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="max-w-3xl mb-10 md:mb-14"
    >
      <div className="flex items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase">
        {num && <span className="text-volt">{num}</span>}
        {num && <span className="text-mist/60">/</span>}
        <span className="text-mist">{eyebrow}</span>
        <span className="hidden md:block h-px flex-1 bg-line" />
      </div>
      <h2 className="mt-7 font-display font-bold text-4xl md:text-5xl lg:text-[3.8rem] leading-[1.02] tracking-[-0.03em] text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-mist text-base md:text-lg leading-relaxed max-w-xl">{description}</p>
      )}
    </motion.div>
  );
}
