/**
 * Central, editable profile. Everything shown about the owner comes from here
 * or from the other files in /src/data. Contact details are read from
 * environment variables (see .env.example) so nothing is invented: any method
 * left empty is simply hidden from the site.
 */
const env = import.meta.env;

export interface Stat {
  label: string;
  /** Set a number ONLY when it is verified. Leave undefined to show `highlight` instead. */
  value?: number;
  suffix?: string;
  /** Non-numeric highlight shown when `value` is not provided. */
  highlight: string;
}

export const profile = {
  name: 'Sasith Imarsha',
  monogram: 'SI',
  role: 'Graphic Designer & Brand Identity Specialist',
  tagline: 'Designing Ideas Into Impact.',
  location: 'Sri Lanka',
  siteUrl: (env.VITE_SITE_URL as string | undefined) ?? '',

  heroCopy:
    'I craft visual stories that build brands, connect people and leave a lasting impression.',

  bio: [
    "I'm Sasith Imarsha, a graphic designer from Sri Lanka passionate about transforming ideas into meaningful visual experiences. My interests include brand identity, photo editing, promotional design, print design and digital content. I focus on combining creativity, clarity and attention to detail to produce purposeful visual communication.",
  ],
  philosophy:
    'Good design is clear before it is clever. I start with the idea, shape it with intent, and refine the details until the message lands.',

       portrait: {
    src: 'profile.jpg', // මෙතන /assets/ අයින් කරලා නම විතරක් දාන්න
    width: 800,
    height: 1000,
    alt: 'Sasith Imarsha',
    isPlaceholder: false,
  },

  /**
   * Only verified figures may carry a `value`. All three are intentionally
   * non-numeric until the owner supplies real numbers.
   */
  stats: ([
    { label: 'Studio experience' },
    { label: 'Work types', highlight: 'Brand · Print · Photo' },
    { label: 'Creative approach', highlight: 'Detail-first' },
  ] as Stat[]),

  contact: {
    email: ((env.VITE_CONTACT_EMAIL as string | undefined) ?? 'sasithimarsha776@gmail.com').trim(),
    whatsapp: ((env.VITE_WHATSAPP_NUMBER as string | undefined) ?? '94760488991').replace(/\D/g, ''),
    instagram: ((env.VITE_INSTAGRAM_URL as string | undefined) ?? '').trim(),
    behance: ((env.VITE_BEHANCE_URL as string | undefined) ?? '').trim(),
  },
  /** EmailJS (https://www.emailjs.com). Public key is designed to be used in the browser. */
  emailjs: {
    serviceId: ((env.VITE_EMAILJS_SERVICE_ID as string | undefined) ?? '').trim(),
    templateId: ((env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ?? '').trim(),
    publicKey: ((env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ?? '').trim(),
  },
  contactEndpoint: ((env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '/api/contact').trim(),
};
