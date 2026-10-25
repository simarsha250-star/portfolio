import { profile } from '../data/profile';
import type { ContactValues } from './validation';

export type SendResult = { ok: true } | { ok: false; reason: 'not_configured' | 'rejected' | 'failed' | 'network'; detail?: string };

/** True when EmailJS keys are present (works straight from the browser, no server needed). */
export const emailJsConfigured = (): boolean => {
  const e = profile.emailjs;
  return Boolean(e.serviceId && e.templateId && e.publicKey);
};

async function sendViaEmailJs(v: ContactValues): Promise<SendResult> {
  const e = profile.emailjs;
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: e.serviceId,
        template_id: e.templateId,
        user_id: e.publicKey,
        template_params: {
          from_name: v.name,
          from_email: v.email,
          reply_to: v.email,
          project_type: v.projectType,
          budget: v.budget || 'Not specified',
          message: v.message,
          to_name: profile.name,
        },
      }),
    });
    const text = await res.text();
    if (res.ok) return { ok: true };
    return { ok: false, reason: 'rejected', detail: text.slice(0, 200) };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

async function sendViaApi(v: ContactValues, honeypot: string, elapsedMs: number): Promise<SendResult> {
  try {
    const res = await fetch(profile.contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...v, website: honeypot, elapsedMs }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && data?.ok === true) return { ok: true };
    if (data?.error === 'not_configured' || res.status === 404) return { ok: false, reason: 'not_configured' };
    return { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

export async function sendMessage(v: ContactValues, honeypot: string, elapsedMs: number): Promise<SendResult> {
  if (honeypot) return { ok: true }; // bot: drop silently
  return emailJsConfigured() ? sendViaEmailJs(v) : sendViaApi(v, honeypot, elapsedMs);
}
