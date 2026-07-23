import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertTriangle, Loader2, ShieldCheck, EyeOff, Cpu } from 'lucide-react';
import { Magnetic } from './Animated';
import { api } from '../lib/api';

const TRUST = [
  { icon: ShieldCheck, text: 'Protected by industry-standard encryption.' },
  { icon: EyeOff, text: 'Your data is never sold.' },
  { icon: Cpu, text: 'Never used to train public AI models.' },
];

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setStatus('loading');
    try {
      await api.joinWaitlist(clean);
      setStatus('success');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong — please try again.');
      setStatus('idle');
    }
  };

  return (
    <section id="get-started" className="relative py-24 md:py-32 overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(200,255,61,0.07)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative max-w-3xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-volt uppercase">
            {'// '}Get started
          </p>
          <h2 className="mt-6 font-display font-bold text-5xl md:text-7xl leading-[1.0] tracking-[-0.035em] text-white">
            Start operating.
            <br />
            <span className="text-volt">Days prepared, not improvised.</span>
          </h2>
          <p className="mt-7 text-mist text-base md:text-lg leading-relaxed max-w-xl">
            Enter your email and you’re in — your account, your first week, and a system that
            starts preparing tomorrow, tonight.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="max-w-md rounded-2xl border border-volt/40 bg-volt/[0.07] p-7"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }}
                >
                  <CheckCircle2 className="w-9 h-9 text-volt" />
                </motion.div>
                <div className="mt-4 font-display font-bold text-2xl text-white tracking-tight">
                  Welcome aboard.
                </div>
                <p className="mt-2 text-sm text-white/80">
                  Check your inbox — your account is ready, and a real person said hello.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0, y: -12 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submit();
                  }}
                  className="max-w-md flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Your email address"
                    className="flex-1 bg-white/5 border border-line rounded-full px-6 py-4 text-sm text-white placeholder:text-mist/70 focus:outline-none focus:border-volt/70 focus:shadow-[0_0_0_3px_rgba(200,255,61,0.15)] transition-all"
                  />
                  <Magnetic strength={0.12}>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center justify-center gap-2 bg-volt text-ink font-bold text-sm px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(200,255,61,0.35)] transition-all duration-300 active:scale-95 disabled:opacity-60 whitespace-nowrap"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          One moment...
                        </>
                      ) : (
                        <>
                          Get started
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </form>
                {error && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-xs px-4 py-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {error}
                  </div>
                )}
                <div className="mt-6 space-y-2.5">
                  {TRUST.map((t) => (
                    <div key={t.text} className="flex items-center gap-2.5">
                      <t.icon className="w-4 h-4 text-volt shrink-0" />
                      <span className="text-xs text-mist">{t.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-mono text-[9px] tracking-[0.25em] text-mist/60">
                  NO SPAM · YOUR DATA STAYS YOURS · CANCEL ANYTIME
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
