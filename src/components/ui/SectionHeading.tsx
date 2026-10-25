import React from 'react';
import { Reveal } from './Reveal';

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
}

const SectionHeading = ({ eyebrow, title, description, align = 'left', id }: Props) => (
  <Reveal className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <p className="eyebrow mb-3">{eyebrow}</p>
    <h2 id={id} className="font-serif text-4xl font-semibold leading-[1.1] text-ink md:text-5xl">
      {title}
    </h2>
    {description && <p className="mt-4 text-ink2">{description}</p>}
  </Reveal>
);

export default SectionHeading;
