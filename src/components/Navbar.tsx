import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { profile } from '../data/profile';

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

const Navbar = () => {
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1200px] items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 md:px-6 ${
          scrolled ? 'border-purple/30 bg-bg/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'border-white/10 bg-white/[0.03]'
        }`}
        style={{ boxShadow: scrolled ? undefined : '0 0 40px rgba(155,123,255,0.08)' }}
      >
        <a href="#home" className="flex items-center gap-3" aria-label={`${profile.name} — home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 font-serif text-base font-semibold text-ink">
            {profile.monogram}
          </span>
          <span className="hidden font-display text-xs font-medium tracking-[0.25em] text-ink sm:block">
            {profile.name.toUpperCase()}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 font-display text-sm transition-colors ${
                  active === l.id ? 'text-gold' : 'text-ink2 hover:text-ink'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-0 rounded-full border border-gold/30 bg-gold/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full border border-gold/70 px-5 py-2 font-display text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-bg md:inline-block"
          >
            Let's Talk
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-2xl text-gold md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-w-[1200px] rounded-3xl border border-white/10 bg-bg/95 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? 'true' : undefined}
                    className={`block rounded-2xl px-5 py-3.5 font-display text-base ${
                      active === l.id ? 'bg-gold/10 text-gold' : 'text-ink2'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="p-2">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
