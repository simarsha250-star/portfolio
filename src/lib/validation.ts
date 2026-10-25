export const PROJECT_TYPES = [
  'Brand identity / logo',
  'Poster / promotional design',
  'Photo editing / retouching',
  'Social media graphics',
  'Print design',
  'Photo collage / personalized gift',
  'Something else',
] as const;

export const BUDGET_RANGES = [
  'Not sure yet',
  'Under LKR 10,000',
  'LKR 10,000 – 25,000',
  'LKR 25,000 – 50,000',
  'LKR 50,000+',
] as const;

export interface ContactValues {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  if (!name) e.name = 'Please enter your name.';
  else if (name.length < 2) e.name = 'Name must be at least 2 characters.';
  else if (name.length > 100) e.name = 'Name is too long.';

  const email = v.email.trim();
  if (!email) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email) || email.length > 254) e.email = 'Enter a valid email address, like name@example.com.';

  if (!v.projectType) e.projectType = 'Please choose a project type.';

  const msg = v.message.trim();
  if (!msg) e.message = 'Please tell me a little about your project.';
  else if (msg.length < 10) e.message = 'Message should be at least 10 characters.';
  else if (msg.length > 4000) e.message = 'Message is too long (max 4000 characters).';

  return e;
}
