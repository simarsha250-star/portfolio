import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

/** Short branded intro. App decides when to show it (once per session, never with reduced motion). */
const Loader = () => (
  <motion.div
    role="status"
    aria-label="Loading portfolio"
    className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative flex h-40 w-40 items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(155,123,255,0.28), transparent 65%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(166,162,175,0.18)" strokeWidth="0.8" />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#D4AF7C"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
        />
      </svg>
      <span className="font-serif text-5xl font-semibold text-ink">{profile.monogram}</span>
    </div>
    <motion.p
      className="mt-8 font-display text-sm font-semibold tracking-[0.35em] text-gold"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {profile.name.toUpperCase()}
    </motion.p>
  </motion.div>
);

export default Loader;
