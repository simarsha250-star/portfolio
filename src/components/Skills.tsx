import React from 'react';
import { FaBullhorn, FaGift, FaImage, FaPalette, FaPrint, FaShareAlt } from 'react-icons/fa';
import { skillCategories, tools, type CategoryIcon, type Tool } from '../data/skills';
import { StaggerGroup, StaggerItem } from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const iconMap: Record<CategoryIcon, React.ReactElement> = {
  brand: <FaPalette />,
  photo: <FaImage />,
  poster: <FaBullhorn />,
  print: <FaPrint />,
  social: <FaShareAlt />,
  gift: <FaGift />,
};

const Mark = ({ tool }: { tool: Tool }) => (
  <span
    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-bg font-display text-lg font-bold"
    style={{ color: tool.color, borderColor: `${tool.color}88`, boxShadow: `0 0 22px ${tool.color}2e` }}
    aria-hidden="true"
  >
    {tool.mark}
  </span>
);

const MarqueeGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className={`marquee-group ${hidden ? 'marquee-dup' : ''}`} aria-hidden={hidden || undefined}>
    {tools.map((t) => (
      <li key={t.id} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-2 pr-6">
        <Mark tool={t} />
        <span className="whitespace-nowrap font-display text-sm text-ink">{t.name}</span>
      </li>
    ))}
  </ul>
);

const Skills = () => (
  <section id="skills" className="section-pad relative bg-bg2/60" aria-labelledby="skills-title">
    <div className="container-x">
      <SectionHeading
        id="skills-title"
        eyebrow="SKILLS & TOOLS"
        title={
          <>
            Creative tools &amp; <span className="gold-text italic">craft</span>
          </>
        }
        description="The software I use and the kinds of design work I do every day."
      />

      <div className="marquee mb-14" role="group" aria-label="Design software">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>

      <StaggerGroup className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tools.map((t) => (
          <StaggerItem key={t.id} className="card card-hover flex h-full flex-col items-start gap-4 p-5">
            <Mark tool={t} />
            <div>
              <h3 className="font-display text-base font-semibold text-ink">{t.name}</h3>
              <p className="mt-1 text-sm text-ink2">{t.use}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((c) => (
          <StaggerItem key={c.id} className="card card-hover flex h-full gap-4 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-purple/40 bg-purple/10 text-lg text-purple" aria-hidden="true">
              {iconMap[c.icon]}
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm text-ink2">{c.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default Skills;
