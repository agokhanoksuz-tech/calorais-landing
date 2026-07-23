import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'System', href: '#problem' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'A Day', href: '#day' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-ink/85 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-[4.5rem] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Calorais logo"
            className="w-8 h-8 rounded-lg group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-display font-bold text-xl tracking-[-0.02em] text-white">Calorais</span>
          <span className="font-mono text-[10px] text-mist border border-line rounded px-1.5 py-0.5 mt-0.5">
            OS
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-mist hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="hidden md:inline-flex items-center gap-2 bg-volt text-ink font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-[0_0_24px_rgba(200,255,61,0.35)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            Get started
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-line text-white"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-ink/95 backdrop-blur-xl border-b border-line"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-3 rounded-lg text-sm font-medium text-mist hover:text-white hover:bg-steel/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#get-started"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-volt text-ink font-semibold text-sm px-5 py-3 rounded-full"
              >
                Get started
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
