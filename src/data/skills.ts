export interface Tool {
  id: string;
  name: string;
  /** Short monogram used as a custom icon (no third-party logos are bundled). */
  mark: string;
  color: string;
  use: string;
}

export const tools: Tool[] = [
  { id: 'ps', name: 'Adobe Photoshop', mark: 'Ps', color: '#31A8FF', use: 'Photo editing, retouching & compositing' },
  { id: 'ai', name: 'Adobe Illustrator', mark: 'Ai', color: '#FF9A00', use: 'Logos, vector artwork & layouts' },
  { id: 'xd', name: 'Adobe XD', mark: 'Xd', color: '#FF61F6', use: 'Interface & layout concepts' },
  { id: 'fig', name: 'Figma', mark: 'Fg', color: '#A259FF', use: 'Collaborative design & prototypes' },
  { id: 'office', name: 'Microsoft Office', mark: 'Of', color: '#F25022', use: 'Documents, presentations & print prep' },
];

export type CategoryIcon = 'brand' | 'photo' | 'poster' | 'print' | 'social' | 'gift';

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: CategoryIcon;
}

export const skillCategories: SkillCategory[] = [
  { id: 'brand', title: 'Brand Identity & Logo Design', description: 'Marks, colour and type systems that make a brand recognisable.', icon: 'brand' },
  { id: 'photo', title: 'Photo Editing & Retouching', description: 'Clean, natural retouching and colour correction.', icon: 'photo' },
  { id: 'poster', title: 'Poster & Promotional Design', description: 'Eye-catching layouts for events, offers and campaigns.', icon: 'poster' },
  { id: 'print', title: 'Print Design', description: 'Print-ready files for folders, banners, cards and more.', icon: 'print' },
  { id: 'social', title: 'Social Media Graphics', description: 'Consistent post and story designs for digital channels.', icon: 'social' },
  { id: 'gift', title: 'Photo Collage & Personalized Gifts', description: 'Custom collages and keepsake designs for mugs, frames and cards.', icon: 'gift' },
];
