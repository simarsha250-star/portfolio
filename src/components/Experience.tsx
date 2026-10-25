import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { timeline, type TimelineItem } from '../data/experience';
import SectionHeading from './ui/SectionHeading';

const Item = ({ item }: { item: TimelineItem }) => {
  const isExp = item.kind === 'experience';
  const color = isExp ? '#D4AF7C' : '#9B7BFF';
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative pb-10 pl-16 last:pb-0 md:pl-20"
    >
      <span
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border bg-bg text-lg md:h-14 md:w-14"
        style={{ color, borderColor: `${color}99`, boxShadow: `0 0 24px ${color}33` }}
        aria-hidden="true"
      >
        {isExp ? <FaBriefcase /> : <FaGraduationCap />}
      </span>
      <div className="card p-5 md:p-6">
        <p className="font-display text-xs font-semibold tracking-[0.18em]" style={{ color }}>
          {item.period.toUpperCase()}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">{item.title}</h3>
        <p className="text-sm text-ink2">{item.organization}</p>
        <p className="mt-3 text-sm text-ink2">{item.description}</p>
        {item.points.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.points.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-ink2">
                <span aria-hidden="true" style={{ color }}>
                  •
                </span>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
};

const Experience = () => (
  <section id="experience" className="section-pad relative" aria-labelledby="exp-title">
    <div className="container-x max-w-4xl">
      <SectionHeading
        id="exp-title"
        eyebrow="JOURNEY"
        title={
          <>
            Experience &amp; <span className="gold-text italic">Education</span>
          </>
        }
      />
      <div className="relative">
        <div
          className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-gold via-purple to-transparent md:left-7"
          aria-hidden="true"
        />
        <ol className="relative">
          {timeline.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Experience;
