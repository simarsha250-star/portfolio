import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import HeroDesignFx from './HeroDesignFx';

/**
 * Borderless hero artwork. On desktop it fills the right side of the hero edge-to-edge and
 * fades out toward the left (under the headline); on mobile it sits below the text and fades top/bottom.
 */
const HeroVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20 });
  const sy = useSpring(my, { stiffness: 70, damping: 20 });
  const x = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const y = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="relative z-0 mx-auto mt-10 w-full max-w-[640px] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:max-w-none lg:w-[64%]"
    >
      <motion.div style={{ x, y }} className="relative h-full w-full">
        <img
          src="/assets/brand/hero-neon-lux.webp"
          srcSet="/assets/brand/hero-neon-lux-760.webp 760w, /assets/brand/hero-neon-lux.webp 1338w"
          sizes="(max-width: 1024px) 92vw, 64vw"
          width={1338}
          height={1175}
          alt="Graphic designer workspace: a widescreen monitor showing a brand design layout, lit with purple and gold neon ribbons"
          fetchPriority="high"
          decoding="async"
          className="hero-fade-img h-auto w-full select-none lg:h-full lg:object-cover lg:object-right"
        />
        <HeroDesignFx />
      </motion.div>
    </motion.div>
  );
};

export default HeroVisual;
