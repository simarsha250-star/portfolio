import React from 'react';
import { motion, type Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Single fade-up reveal, triggered once when scrolled into view. */
export const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-80px' }}
    variants={{
      hidden: fadeUp.hidden,
      show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut', delay } },
    }}
  >
    {children}
  </motion.div>
);

interface GroupProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

/** Parent that staggers its <StaggerItem> children. One observer for the whole group. */
export const StaggerGroup = ({ children, className, gap = 0.08 }: GroupProps) => (
  <motion.div
    className={className}
    variants={stagger(gap)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-80px' }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);
