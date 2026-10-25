import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg'; // පින්තූරය කෙලින්ම import කරනවා

const About = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
        
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-[400px]"
        >
          {/* පින්තූරය පිටුපසින් එන Glow එක */}
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[var(--gold)]/20 via-transparent to-[var(--purple)]/25 blur-2xl" />
          
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--gold)]/30 bg-[#13111C] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
            <img
              src={profileImage} // මෙතන අලුත් ඉමේජ් එක දාන්න
              alt="Sasith Imarsha"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[22px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Location Badge */}
          <div className="absolute -bottom-4 -right-3 rounded-full border border-[var(--gold)]/50 bg-[#0B0B10] px-4 py-2 font-heading text-xs tracking-[0.2em] text-[var(--gold)]">
            SRI LANKA
          </div>
        </motion.div>

        {/* Right Content Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[var(--gold)] text-xs font-bold tracking-widest uppercase mb-3">WHO AM I</p>
            <h2 className="font-serif text-4xl font-semibold text-white md:text-5xl mb-6">
              About Me
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-[var(--text-muted)]"
          >
            <p>
              I'm Sasith Imarsha, a passionate Graphic Designer from Sri Lanka. I love turning ideas into powerful visuals, creating designs that not only look good but also tell a story.
            </p>
            <p>
              With a strong eye for detail and a focus on brand identity, I help businesses and individuals bring their vision to life through creative design.
            </p>
            <p className="border-l-2 border-[var(--gold)]/60 pl-4 font-serif text-lg italic text-white mt-6">
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <div className="glass-card p-5">
              <p className="font-heading text-xl font-semibold text-white md:text-2xl">3 year +</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Months Experience</p>
            </div>
            <div className="glass-card p-5">
              <p className="font-heading text-xl font-semibold text-white md:text-2xl">50+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Projects Completed</p>
            </div>
            <div className="glass-card p-5">
              <p className="font-heading text-xl font-semibold text-white md:text-2xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Creative Mindset</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;