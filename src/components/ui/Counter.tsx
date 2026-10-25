import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Props {
  value: number;
  suffix?: string;
}

/** Animated counter. Only used for verified numbers (see data/profile.ts). */
const Counter = ({ value, suffix = '' }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

export default Counter;
