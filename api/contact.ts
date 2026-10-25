/**
 * Vercel serverless function: POST /api/contact
 * Delivers the contact form through Resend (https://resend.com).
 * Secrets live ONLY in server environment variables:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * If they are missing the function answers 503 "not_configured" — the
 * front end then shows an honest error instead of a fake success.
 */
interface Req {
  method?: string;
  body?: unknown;
}
interface Res {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req: Req, res: Res): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') {
    res.status(400).json({ ok: false, error: 'invalid_body' });
    return;
  }

  // Spam protection: honeypot filled, or form submitted implausibly fast.
  const elapsed = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0;
  if (str(body.website, 200) !== '' || elapsed < 1500) {
    res.status(200).json({ ok: true }); // silently drop bots
    return;
  }

  const name = str(body.name, 100);
  const email = str(body.email, 254);
  const projectType = str(body.projectType, 100);
  const budget = str(body.budget, 100);
  const message = str(body.message, 4000);

  if (name.length < 2 || !EMAIL_RE.test(email) || !projectType || message.length < 10) {
    res.status(400).json({ ok: false, error: 'validation_failed' });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    res.status(503).json({ ok: false, error: 'not_configured' });
    return;
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry: ${projectType} — ${name}`.slice(0, 200),
        text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\nBudget: ${budget || 'Not specified'}\n\n${message}`,
      }),
    });
    if (!r.ok) {
      res.status(502).json({ ok: false, error: 'delivery_failed' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ ok: false, error: 'delivery_failed' });
  }
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
