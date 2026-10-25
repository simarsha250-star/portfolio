import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Sparkle = ({ className, delay, color }: { className: string; delay: number; color: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={`absolute h-5 w-5 ${className}`}
    style={{ color, filter: `drop-shadow(0 0 6px ${color})` }}
    initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3], rotate: [0, 90, 180] }}
    transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeInOut' }}
    aria-hidden="true"
  >
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
  </motion.svg>
);

/**
 * Decorative graphic-design motion layered over the hero image:
 * a pen-tool bezier curve that draws itself, twinkling sparkles, a breathing screen glow
 * and drifting colour-swatch chips. Purely visual (pointer-events: none), off for reduced motion.
 */
const HeroDesignFx = () => {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const loop = { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, times: [0, 0.55, 0.85, 1] };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* breathing screen glow */}
      <motion.div
        className="absolute right-[12%] top-[26%] h-[34%] w-[46%] rounded-full mix-blend-screen blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(155,123,255,0.55), rgba(212,175,124,0.18) 60%, transparent 75%)' }}
        animate={{ opacity: [0.25, 0.65, 0.25], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* pen-tool bezier that draws itself */}
      <svg viewBox="0 0 300 200" className="absolute left-[24%] top-[6%] w-[34%] overflow-visible">
        <motion.path
          d="M10 150 C 70 10, 170 10, 200 100 S 270 170, 290 60"
          fill="none"
          stroke="#D4AF7C"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,124,0.8))' }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 0.9, 0] }}
          transition={loop}
        />
        {/* handles + anchors appear once the curve is drawn */}
        <motion.g animate={{ opacity: [0, 0, 1, 0] }} transition={loop}>
          <line x1="10" y1="150" x2="70" y2="10" stroke="#9B7BFF" strokeWidth="1" />
          <line x1="200" y1="100" x2="170" y2="10" stroke="#9B7BFF" strokeWidth="1" />
          <circle cx="70" cy="10" r="4" fill="#0B0B10" stroke="#9B7BFF" strokeWidth="1.5" />
          <circle cx="170" cy="10" r="4" fill="#0B0B10" stroke="#9B7BFF" strokeWidth="1.5" />
          <rect x="5" y="145" width="10" height="10" fill="#F5F2FA" stroke="#D4AF7C" />
          <rect x="195" y="95" width="10" height="10" fill="#F5F2FA" stroke="#D4AF7C" />
          <rect x="285" y="55" width="10" height="10" fill="#F5F2FA" stroke="#D4AF7C" />
        </motion.g>
      </svg>

      <Sparkle className="left-[30%] top-[22%]" delay={0} color="#D4AF7C" />
      <Sparkle className="right-[10%] top-[12%]" delay={1.1} color="#9B7BFF" />
      <Sparkle className="right-[30%] top-[48%]" delay={2.1} color="#F5F2FA" />
      <Sparkle className="left-[38%] bottom-[22%]" delay={0.7} color="#9B7BFF" />
      <Sparkle className="right-[6%] bottom-[30%]" delay={1.6} color="#D4AF7C" />

      {/* drifting design chips */}
      <motion.div
        className="absolute bottom-[14%] right-[30%] hidden gap-1.5 rounded-2xl border border-white/10 bg-bg/60 p-2.5 backdrop-blur-md sm:flex"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {['#D4AF7C', '#9B7BFF', '#F5F2FA'].map((c) => (
          <span key={c} className="h-5 w-5 rounded-full border border-white/20" style={{ background: c }} />
        ))}
      </motion.div>
      <motion.div
        className="absolute right-[5%] top-[40%] hidden rounded-2xl border border-white/10 bg-bg/60 px-3.5 py-2 backdrop-blur-md sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span className="font-serif text-2xl leading-none text-ink">Aa</span>
      </motion.div>
    </div>
  );
};

export default HeroDesignFx;
