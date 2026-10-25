import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { stagger, fadeUp } from './ui/Reveal';
import HeroVisual from './HeroVisual';

const Hero = () => (
  <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-32 lg:pb-16" aria-labelledby="hero-title">
    <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-purple/15 blur-[160px]" />
    <div className="container-x relative z-10">
      <motion.div variants={stagger(0.12, 0.1)} initial="hidden" animate="show" className="lg:max-w-[600px]">
        <motion.p variants={fadeUp} className="eyebrow mb-6">
          {profile.name.toUpperCase()} — GRAPHIC DESIGNER
        </motion.p>
        <motion.h1
          id="hero-title"
          variants={fadeUp}
          className="font-serif text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
        >
          Designing Ideas
          <br />
          Into <span className="gold-text italic">Impact.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-md text-lg text-ink2">
          {profile.heroCopy}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <a href="#works" className="btn btn-gold">
            View My Work <span aria-hidden="true">↗</span>
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact Me
          </a>
        </motion.div>
      </motion.div>

    </div>

    <HeroVisual />

    <a
      href="#about"
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-display text-[11px] tracking-[0.3em] text-ink2 md:flex"
      aria-label="Scroll down to About"
    >
      SCROLL DOWN
      <span className="flex h-9 w-5 justify-center rounded-full border border-gold/60 pt-1.5" aria-hidden="true">
        <span className="scroll-dot h-1.5 w-1 rounded-full bg-gold" />
      </span>
    </a>
  </section>
);

export default Hero;
