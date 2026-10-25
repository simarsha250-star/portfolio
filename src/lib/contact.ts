import { profile } from '../data/profile';

export type ContactKind = 'email' | 'whatsapp' | 'instagram' | 'behance';

export interface ContactMethod {
  kind: ContactKind;
  label: string;
  display: string;
  href: string;
  external: boolean;
}

function handleFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const part = u.pathname.replace(/\/+$/, '').split('/').filter(Boolean).pop();
    return part ? `@${part.replace(/^@/, '')}` : u.hostname;
  } catch {
    return url;
  }
}

function formatPhone(d: string): string {
  // Sri Lankan numbers: +94 76 048 8991
  if (d.startsWith('94') && d.length === 11) return `+94 ${d.slice(2, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `+${d}`;
}

function isHttpUrl(v: string): boolean {
  try {
    const u = new URL(v);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Only methods that are actually configured are returned — no invented details. */
export function getContactMethods(): ContactMethod[] {
  const c = profile.contact;
  const out: ContactMethod[] = [];
  if (c.email) out.push({ kind: 'email', label: 'Email', display: c.email, href: `mailto:${c.email}`, external: false });
  if (c.whatsapp.length >= 8)
    out.push({ kind: 'whatsapp', label: 'WhatsApp', display: formatPhone(c.whatsapp), href: `https://wa.me/${c.whatsapp}`, external: true });
  if (c.instagram && isHttpUrl(c.instagram))
    out.push({ kind: 'instagram', label: 'Instagram', display: handleFromUrl(c.instagram), href: c.instagram, external: true });
  if (c.behance && isHttpUrl(c.behance))
    out.push({ kind: 'behance', label: 'Behance', display: handleFromUrl(c.behance), href: c.behance, external: true });
  return out;
}
