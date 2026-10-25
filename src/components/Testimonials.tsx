import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { approachPrinciples, testimonials } from '../data/testimonials';
import SectionHeading from './ui/SectionHeading';
import { StaggerGroup, StaggerItem } from './ui/Reveal';

const Approach = () => (
  <section id="approach" className="section-pad relative" aria-labelledby="approach-title">
    <div className="container-x">
      <SectionHeading
        id="approach-title"
        eyebrow="PROCESS"
        title={
          <>
            My Creative <span className="gold-text italic">Approach</span>
          </>
        }
        description="How an idea becomes a finished piece of design."
      />
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {approachPrinciples.map((p, i) => (
          <StaggerItem key={p.title} className="card card-hover h-full p-6">
            <span className="font-serif text-3xl text-gold" aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm text-ink2">{p.text}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const Slider = () => {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const n = testimonials.length;
  const go = useCallback((d: number) => setState(([i]) => [(i + d + n) % n, d]), [n]);
  const jump = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1]);
  const t = testimonials[index];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section id="testimonials" className="section-pad relative" aria-labelledby="testi-title">
      <div className="container-x max-w-4xl">
        <SectionHeading id="testi-title" eyebrow="KIND WORDS" title={<>What clients <span className="gold-text italic">say</span></>} />
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
          }}
          className="glass p-6 md:p-10"
        >
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink2 hover:border-gold hover:text-gold">
              <FaChevronLeft />
            </button>
            <div className="min-h-[220px] flex-1 overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={t.id}
                  custom={dir}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
                  initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.3 }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${n}`}
                >
                  <FaQuoteLeft className="text-2xl text-gold" aria-hidden="true" />
                  <blockquote className="mt-4 font-serif text-xl leading-relaxed text-ink md:text-2xl">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.portrait && <img src={t.portrait} alt={t.name} width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full border border-gold object-cover" />}
                    <span>
                      <span className="block font-display text-sm font-semibold text-gold">{t.name}</span>
                      <span className="block text-xs text-ink2">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink2 hover:border-gold hover:text-gold">
              <FaChevronRight />
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-1" role="group" aria-label="Choose testimonial">
            {testimonials.map((x, i) => (
              <button key={x.id} type="button" onClick={() => jump(i)} aria-label={`Go to testimonial ${i + 1}`} aria-current={i === index ? 'true' : undefined} className="flex h-8 w-8 items-center justify-center">
                <span className={`block h-2 rounded-full transition-all ${i === index ? 'w-6 bg-gold' : 'w-2 bg-white/25'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Shows real testimonials when provided; otherwise the honest "Creative Approach" section. */
const Testimonials = () => (testimonials.length > 0 ? <Slider /> : <Approach />);

export default Testimonials;
