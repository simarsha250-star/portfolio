import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ project, onClose }: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  const images = [project.thumbnail, ...project.gallery];
  const current = images[index];

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative grid max-h-[100svh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/10 bg-bg2 shadow-[0_40px_120px_rgba(0,0,0,0.7)] sm:max-h-[90vh] sm:rounded-3xl lg:grid-cols-[1.15fr_1fr]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-bg/80 text-xl text-ink backdrop-blur hover:border-gold hover:text-gold"
        >
          <HiX />
        </button>

        <div className="bg-bg p-4 sm:p-6">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              className="h-auto max-h-[60vh] w-full object-contain lg:max-h-[72vh]"
            />
          </div>
          {images.length > 1 && (
            <ul className="mt-4 flex gap-3" aria-label="Project images">
              {images.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1} of ${images.length}`}
                    aria-current={i === index ? 'true' : undefined}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${i === index ? 'border-gold' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h3 id="project-title" className="mt-2 font-serif text-3xl font-semibold text-ink">
              {project.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip">{project.kind === 'commissioned' ? 'Commissioned work' : 'Concept project'}</span>
              {project.year && <span className="chip">{project.year}</span>}
            </div>
          </div>

          {project.isPlaceholder && (
            <p className="rounded-xl border border-gold/30 bg-gold/5 p-3 text-xs text-ink2">
              Placeholder content: this image and description are samples to be replaced with real work in{' '}
              <code className="text-gold">src/data/projects.ts</code>. They do not represent client work.
            </p>
          )}

          <p className="text-ink2">{project.summary}</p>

          <div>
            <h4 className="font-display text-sm font-semibold tracking-[0.15em] text-gold">OBJECTIVE</h4>
            <p className="mt-2 text-sm text-ink2">{project.objective}</p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-[0.15em] text-gold">DESIGN APPROACH</h4>
            <p className="mt-2 text-sm text-ink2">{project.approach}</p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-[0.15em] text-gold">TOOLS USED</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
