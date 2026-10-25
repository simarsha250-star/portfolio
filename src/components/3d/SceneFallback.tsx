import React from 'react';

interface Props {
  variant: 'ribbons' | 'globe';
  className?: string;
}

/** Lightweight SVG stand-ins shown while 3D loads, or whenever WebGL is unavailable/disabled. */
const SceneFallback = ({ variant, className = '' }: Props) => {
  if (variant === 'globe') {
    return (
      <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="fb-globe" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#2a2150" />
            <stop offset="1" stopColor="#0f0e17" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="62" fill="url(#fb-globe)" stroke="#9B7BFF" strokeOpacity=".5" />
        <ellipse cx="100" cy="100" rx="62" ry="24" fill="none" stroke="#9B7BFF" strokeOpacity=".35" />
        <ellipse cx="100" cy="100" rx="24" ry="62" fill="none" stroke="#9B7BFF" strokeOpacity=".35" />
        <ellipse cx="100" cy="100" rx="88" ry="22" fill="none" stroke="#D4AF7C" strokeWidth="1.2" transform="rotate(-24 100 100)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 600 480" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fb-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#D4AF7C" stopOpacity="0" />
          <stop offset=".5" stopColor="#D4AF7C" />
          <stop offset="1" stopColor="#D4AF7C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fb-purple" x1="0" x2="1">
          <stop offset="0" stopColor="#9B7BFF" stopOpacity="0" />
          <stop offset=".5" stopColor="#9B7BFF" />
          <stop offset="1" stopColor="#9B7BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M-20 360 C 120 120, 300 520, 620 120" fill="none" stroke="url(#fb-gold)" strokeWidth="10" strokeLinecap="round" opacity=".8" />
      <path d="M-20 420 C 160 220, 340 540, 620 220" fill="none" stroke="url(#fb-purple)" strokeWidth="14" strokeLinecap="round" opacity=".7" />
      <path d="M40 80 C 200 -20, 380 220, 600 60" fill="none" stroke="url(#fb-purple)" strokeWidth="5" strokeLinecap="round" opacity=".5" />
      {[...Array(18)].map((_, i) => (
        <circle key={i} cx={(i * 97) % 600} cy={(i * 53) % 480} r={i % 3 === 0 ? 2.2 : 1.4} fill={i % 2 ? '#D4AF7C' : '#9B7BFF'} opacity=".6" />
      ))}
    </svg>
  );
};

export default SceneFallback;
