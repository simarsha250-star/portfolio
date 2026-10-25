import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

const ProjectCard = ({ project, onOpen }: Props) => {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 20 });
  const sy = useSpring(py, { stiffness: 220, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  const t = project.thumbnail;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ perspective: 900 }}
    >
      <motion.button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-card text-left shadow-[0_18px_40px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-300 hover:border-gold/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(212,175,124,0.18)]"
        aria-label={`View project: ${project.title} (${project.category})`}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={t.src}
            width={t.width}
            height={t.height}
            alt={t.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-5">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-gold">{project.category.toUpperCase()}</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-ink">{project.title}</h3>
          <span className="mt-3 inline-flex w-fit translate-y-2 items-center gap-2 rounded-full border border-gold/60 bg-bg/70 px-4 py-1.5 text-xs font-semibold text-gold opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            View Project <span aria-hidden="true">↗</span>
          </span>
        </div>
        {project.kind === 'concept' && (
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-bg/80 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-ink2 backdrop-blur">
            {project.isPlaceholder ? 'PLACEHOLDER' : 'CONCEPT'}
          </span>
        )}
      </motion.button>
    </motion.li>
  );
};

export default ProjectCard;
