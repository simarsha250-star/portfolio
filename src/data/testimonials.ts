export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Optional portrait path under /public. */
  portrait?: string;
}

/**
 * Add ONLY real, permission-granted testimonials here. While this array is
 * empty the site shows the "My Creative Approach" section instead.
 */
export const testimonials: Testimonial[] = [];

export const approachPrinciples = [
  { title: 'Understand', text: 'Every project starts with listening — who it is for, what it must say and where it will live.' },
  { title: 'Explore', text: 'Sketching and testing several directions before committing to one.' },
  { title: 'Refine', text: 'Spacing, colour and type adjusted until nothing is accidental.' },
  { title: 'Deliver', text: 'Clean, print-ready and web-ready files, organised so they are easy to use.' },
];
