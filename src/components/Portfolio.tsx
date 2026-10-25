import React, { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FILTERS, projects, type FilterValue, type Project } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import SectionHeading from './ui/SectionHeading';

const Portfolio = () => {
  const [filter, setFilter] = useState<FilterValue>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const close = useCallback(() => setSelected(null), []);
  const open = useCallback((p: Project) => setSelected(p), []);

  return (
    <section id="works" className="section-pad relative bg-bg2/60" aria-labelledby="works-title">
      <div className="container-x">
        <SectionHeading
          id="works-title"
          eyebrow="PORTFOLIO"
          title={
            <>
              Selected <span className="gold-text italic">Works</span>
            </>
          }
          description="Browse by category. Projects marked placeholder are sample layouts until real artwork is added."
        />

        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-[44px] rounded-full border px-5 font-display text-sm transition-all ${
                filter === f
                  ? 'border-gold bg-gold text-bg shadow-[0_6px_24px_rgba(212,175,124,0.3)]'
                  : 'border-white/15 text-ink2 hover:border-gold/60 hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'} in {filter}
        </p>

        <motion.ul layout className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={open} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && <p className="py-16 text-center text-ink2">No projects in this category yet.</p>}
      </div>

      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
};

export default Portfolio;
