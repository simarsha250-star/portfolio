/**
 * Timeline entries. These were carried over from the owner's original
 * project files. Please verify names, dates and details before publishing —
 * nothing here should be changed to something unverified.
 */
export interface TimelineItem {
  id: string;
  kind: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string;
  points: string[];
}

export const timeline: TimelineItem[] = [
  {
    id: 'venus-studio',
    kind: 'experience',
    title: 'Graphic Design / Photo Studio Work',
    organization: 'Venus Studio',
    period: '2024 – 2025',
    description: 'Hands-on design and photo studio work serving walk-in and repeat customers.',
    points: [
      'Designing folders, billing and passport photos',
      'Photo editing and studio workflow',
      'Handled multiple duties and client requests',
    ],
  },
  {
    id: 'nvq4',
    kind: 'education',
    title: 'NVQ Level 4 — Graphic Design',
    organization: 'Sri Lanka (TVEC)',
    period: '2023 – 2025',
    description: 'National Vocational Qualification in graphic design.',
    points: ['Advanced design techniques', 'Creative project development', 'Professional industry exposure'],
  },
  {
    id: 'hardware-software',
    kind: 'education',
    title: 'Computer Hardware & Software',
    organization: 'Technical course',
    period: '2022',
    description: 'Technical course covering computer systems.',
    points: ['System assembly and troubleshooting', 'Software installation and maintenance'],
  },
  {
    id: 'ms-office',
    kind: 'education',
    title: 'MS Office',
    organization: 'Course provider to be confirmed',
    period: 'Dates to be confirmed',
    description: 'Office productivity skills used for documents, presentations and print preparation.',
    points: [],
  },

];
