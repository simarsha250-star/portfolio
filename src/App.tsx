import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';

const INTRO_KEY = 'si-intro-seen';
const MIN_MS = 1400;
const MAX_MS = 2200;

function shouldShowIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return true;
  }
}

const App = () => {
  const [intro, setIntro] = useState<boolean>(shouldShowIntro);

  useEffect(() => {
    if (!intro) return;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(INTRO_KEY, '1');
      } catch {
        /* storage unavailable — intro may replay, which is harmless */
      }
      setIntro(false);
    };
    const minWait = new Promise<void>((r) => window.setTimeout(r, MIN_MS));
    const fonts: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    // Wait for fonts but never longer than MAX_MS: the loader can never block the site.
    const hardStop = window.setTimeout(finish, MAX_MS);
    Promise.all([minWait, fonts]).then(finish, finish);
    return () => window.clearTimeout(hardStop);
  }, [intro]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{intro && <Loader key="loader" />}</AnimatePresence>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
};

export default App;
