export const PROJECT_CATEGORIES = [
  'Branding',
  'Posters',
  'Photo Editing',
  'Social Media',
  'Print Design',
  'Photo Collage',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type FilterValue = 'All' | ProjectCategory;
export const FILTERS: FilterValue[] = ['All', ...PROJECT_CATEGORIES];

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  kind: 'concept' | 'commissioned';
  year?: string;
  summary: string;
  objective: string;
  approach: string;
  tools: string[];
  thumbnail: ProjectImage;
  gallery: ProjectImage[];
  isPlaceholder: boolean;
}

const cover = (id: string, title: string): ProjectImage => ({
  src: `/assets/projects/${id}-cover.jpg`,
  alt: `${title} — cover image`,
  width: 800,
  height: 1000,
});

const detail = (id: string, n: number, title: string): ProjectImage => ({
  src: `/assets/projects/${id}-${n}.jpg`,
  alt: `${title} — detail ${n}`,
  width: 1200,
  height: 900,
});

type ProjectInput = Omit<Project, 'thumbnail' | 'gallery' | 'kind' | 'isPlaceholder'> &
  Partial<Pick<Project, 'kind' | 'isPlaceholder'>>;

const make = (p: ProjectInput): Project => ({
  kind: 'concept',
  isPlaceholder: false, // අපි දැන් ඇත්ත පින්තූර දාන නිසා මේක false
  ...p,
  thumbnail: cover(p.id, p.title),
  // ඔයාට ඕන නම් Detail පින්තූර 2ක් විතරක් තියන්න මෙතන [1, 2] විතරක් තියන්න
  gallery: [
    detail(p.id, 1, p.title), 
    detail(p.id, 2, p.title)
  ],
});

export const projects: Project[] = [
  make({
    id: "aurum-identity",
    title: "Aurum Café Identity",
    category: "Branding",
    summary: "Logo mark, colour palette and type pairing for a fictional café.",
    objective: "Create a warm, premium identity that works on signage, menus and packaging.",
    approach: "Explored monogram and wordmark routes, settled on a minimal mark paired with a serif wordmark and a gold-and-charcoal palette.",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
  }),
  make({
    id: "lumen-brand-kit",
    title: "Lumen Studio Brand Kit",
    category: "Branding",
    summary: "A concept brand kit with logo variations and usage rules.",
    objective: "Show how a single mark flexes across light, dark and small-size uses.",
    approach: "Built a simple grid, defined clear-space rules and tested the mark at favicon and billboard sizes.",
    tools: ["Adobe Illustrator", "Figma"],
  }),
  make({
    id: "neon-nights-poster",
    title: "Neon Nights Event Poster",
    category: "Posters",
    summary: "Bold typographic poster for a fictional music night.",
    objective: "Make a poster that reads in two seconds from across a street.",
    approach: "Large type hierarchy, high-contrast purple and gold, and a single focal illustration.",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
  }),
  make({
    id: "heritage-festival-poster",
    title: "Heritage Festival Poster",
    category: "Posters",
    summary: "Cultural festival poster concept with layered patterns.",
    objective: "Balance rich decoration with a clean information hierarchy.",
    approach: "Layered pattern work behind a restrained type system so dates and venue stay legible.",
    tools: ["Adobe Illustrator"],
  }),
  make({
    id: "portrait-retouch",
    title: "Natural Portrait Retouch",
    category: "Photo Editing",
    summary: "Before/after style retouching concept.",
    objective: "Improve skin, light and colour without losing natural character.",
    approach: "Frequency-based cleanup, dodge and burn, and gentle colour grading.",
    tools: ["Adobe Photoshop"],
  }),
  make({
    id: "sky-composite",
    title: "Sky Composite",
    category: "Photo Editing",
    summary: "Creative compositing study with matched lighting.",
    objective: "Blend multiple sources into one believable scene.",
    approach: "Matched perspective, light direction and grain before final colour grading.",
    tools: ["Adobe Photoshop"],
  }),
  make({
    id: "launch-day-social",
    title: "Launch Day Social Set",
    category: "Social Media",
    summary: "Cohesive post and story set for a fictional product launch.",
    objective: "Keep a campaign recognisable across feed, story and cover formats.",
    approach: "Modular templates with a fixed grid, shared colour accents and flexible headline areas.",
    tools: ["Figma", "Adobe Photoshop"],
  }),
  make({
    id: "quote-series",
    title: "Quote Series Templates",
    category: "Social Media",
    summary: "Reusable quote-card templates.",
    objective: "Make fast, consistent posts that stay on brand.",
    approach: "Three layout variants sharing one type scale and colour logic.",
    tools: ["Figma", "Adobe Illustrator"],
  }),
  make({
    id: "folder-and-card",
    title: "Folder & Business Card Set",
    category: "Print Design",
    summary: "Print-ready folder and business card concept.",
    objective: "Deliver files that print correctly the first time.",
    approach: "Set up bleed, safe margins and CMYK colour with a clear dieline layout.",
    tools: ["Adobe Illustrator", "Microsoft Office"],
  }),
  make({
    id: "banner-flyer",
    title: "Banner & Flyer Layouts",
    category: "Print Design",
    summary: "Large-format banner and A5 flyer concepts.",
    objective: "Keep the message readable at distance and up close.",
    approach: "Scaled type hierarchy with a single call-to-action per format.",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
  }),
  make({
    id: "memory-collage",
    title: "Memory Collage Frame",
    category: "Photo Collage",
    summary: "Personalised photo collage layout for framing.",
    objective: "Arrange many photos into one balanced keepsake.",
    approach: "Grid-based layout with consistent spacing and a unifying colour tone.",
    tools: ["Adobe Photoshop"],
  }),
  make({
    id: "gift-mug-design",
    title: "Personalised Mug Design",
    category: "Photo Collage",
    summary: "Wrap-around mug artwork concept.",
    objective: "Make a gift design that reads well on a curved surface.",
    approach: "Designed to the template's safe area and checked wrap alignment.",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
  }),
];