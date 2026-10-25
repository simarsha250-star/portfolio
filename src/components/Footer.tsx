import React from 'react';
import { FaBehance, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { profile } from '../data/profile';
import { getContactMethods, type ContactKind } from '../lib/contact';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { NAV_LINKS } from './Navbar';

const icons: Record<ContactKind, React.ReactElement> = {
  email: <FaEnvelope />,
  whatsapp: <FaWhatsapp />,
  instagram: <FaInstagram />,
  behance: <FaBehance />,
};

const Footer = () => {
  const methods = getContactMethods();
  const reduced = useReducedMotion();
  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <footer className="relative border-t border-white/10 bg-bg py-14">
      <div className="container-x flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 font-serif text-xl font-semibold text-ink">{profile.monogram}</span>
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-ink">{profile.name.toUpperCase()}</p>
          <p className="text-sm text-ink2">{profile.role}</p>
        </div>

        <p className="font-serif text-2xl italic text-gold md:text-3xl">Let's Create Something Amazing.</p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-sm text-ink2 hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {methods.length > 0 && (
          <ul className="flex gap-3" aria-label="Social and contact links">
            {methods.map((m) => (
              <li key={m.kind}>
                <a
                  href={m.href}
                  {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={m.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink2 transition-colors hover:border-gold hover:text-gold"
                >
                  {icons[m.kind]}
                </a>
              </li>
            ))}
          </ul>
        )}

        <button type="button" onClick={toTop} className="btn btn-ghost min-h-[44px] px-5 text-sm" aria-label="Back to top">
          Back to top <span aria-hidden="true">↑</span>
        </button>

        <p className="text-xs text-muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
