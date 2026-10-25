// Generates clearly-labelled placeholder artwork. Replace these with real work.
// Usage: npm run placeholders
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rows = JSON.parse(readFileSync(join(root, 'scripts/projects.json'), 'utf8'));
const out = join(root, 'public/assets');
mkdirSync(join(out, 'projects'), { recursive: true });
mkdirSync(join(out, 'portrait'), { recursive: true });
mkdirSync(join(out, 'brand'), { recursive: true });

const GOLD = '#D4AF7C', PURPLE = '#9B7BFF', BG = '#14131D';
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function motif(category, w, h, v) {
  const s = [];
  const cx = w / 2, cy = h * 0.46;
  switch (category) {
    case 'Branding':
      for (let i = 0; i < 5; i++) s.push(`<circle cx="${cx}" cy="${cy}" r="${60 + i * 42 + v * 12}" fill="none" stroke="${i % 2 ? PURPLE : GOLD}" stroke-opacity="${0.75 - i * 0.12}" stroke-width="2"/>`);
      s.push(`<text x="${cx}" y="${cy + 28}" text-anchor="middle" font-family="Georgia,serif" font-size="96" fill="#F5F2FA">${'AB'[v % 2]}</text>`);
      break;
    case 'Posters':
      for (let i = 0; i < 7; i++) s.push(`<rect x="${w * 0.12 + i * 6}" y="${h * 0.14 + i * 54 + v * 8}" width="${w * 0.76 - i * 12}" height="34" rx="6" fill="${i % 2 ? PURPLE : GOLD}" fill-opacity="${0.8 - i * 0.08}"/>`);
      break;
    case 'Photo Editing':
      s.push(`<defs><radialGradient id="g${v}"><stop offset="0" stop-color="${GOLD}" stop-opacity=".9"/><stop offset="1" stop-color="${PURPLE}" stop-opacity="0"/></radialGradient></defs>`);
      s.push(`<circle cx="${cx + v * 40}" cy="${cy}" r="${Math.min(w, h) * 0.34}" fill="url(#g${v})"/>`);
      s.push(`<rect x="${w * 0.16}" y="${h * 0.2}" width="${w * 0.68}" height="${h * 0.5}" rx="18" fill="none" stroke="#F5F2FA" stroke-opacity=".35"/>`);
      break;
    case 'Social Media':
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) s.push(`<rect x="${w * 0.14 + c * (w * 0.25)}" y="${h * 0.16 + r * (h * 0.2)}" width="${w * 0.22}" height="${h * 0.17}" rx="14" fill="${(r + c + v) % 2 ? PURPLE : GOLD}" fill-opacity="${0.35 + ((r * 3 + c) % 4) * 0.15}"/>`);
      break;
    case 'Print Design':
      s.push(`<rect x="${w * 0.2}" y="${h * 0.16}" width="${w * 0.6}" height="${h * 0.5}" fill="none" stroke="${GOLD}" stroke-dasharray="10 8"/>`);
      s.push(`<rect x="${w * 0.25}" y="${h * 0.21}" width="${w * 0.5}" height="${h * 0.4}" fill="${PURPLE}" fill-opacity=".35"/>`);
      for (let i = 0; i < 4; i++) s.push(`<line x1="${w * 0.1}" y1="${h * (0.2 + i * 0.14)}" x2="${w * 0.14}" y2="${h * (0.2 + i * 0.14)}" stroke="${GOLD}"/>`);
      break;
    default: // Photo Collage
      for (let i = 0; i < 6; i++) { const rw = 90 + rnd() * 120, rh = 90 + rnd() * 140; s.push(`<rect x="${w * 0.1 + rnd() * w * 0.6}" y="${h * 0.12 + rnd() * h * 0.5}" width="${rw}" height="${rh}" rx="10" fill="${i % 2 ? GOLD : PURPLE}" fill-opacity="${0.35 + rnd() * 0.4}" transform="rotate(${(rnd() - 0.5) * 24} ${w / 2} ${h / 2})"/>`); }
  }
  return s.join('');
}

function art(id, title, category, w, h, v, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)} placeholder">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1a2a"/><stop offset="1" stop-color="${BG}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<circle cx="${w * 0.85}" cy="${h * 0.1}" r="${w * 0.35}" fill="${PURPLE}" fill-opacity=".12"/>
<circle cx="${w * 0.1}" cy="${h * 0.95}" r="${w * 0.3}" fill="${GOLD}" fill-opacity=".1"/>
${motif(category, w, h, v)}
<text x="${w * 0.08}" y="${h * 0.84}" font-family="Arial,Helvetica,sans-serif" font-size="${Math.round(w * 0.045)}" letter-spacing="3" fill="${GOLD}">${esc(category.toUpperCase())}</text>
<text x="${w * 0.08}" y="${h * 0.9}" font-family="Georgia,serif" font-size="${Math.round(w * 0.06)}" fill="#F5F2FA">${esc(title)}</text>
<text x="${w * 0.08}" y="${h * 0.955}" font-family="Arial,Helvetica,sans-serif" font-size="${Math.round(w * 0.03)}" letter-spacing="2" fill="#A6A2AF">${esc(label)}</text>
</svg>`;
}

const projects = rows;
for (const [id, title, category] of projects) {
  writeFileSync(join(out, 'projects', `${id}-cover.svg`), art(id, title, category, 800, 1000, 0, 'PLACEHOLDER · REPLACE WITH REAL ARTWORK'));
  writeFileSync(join(out, 'projects', `${id}-1.svg`), art(id, title, category, 1200, 900, 1, 'PLACEHOLDER · DETAIL 1'));
  writeFileSync(join(out, 'projects', `${id}-2.svg`), art(id, title, category, 1200, 900, 2, 'PLACEHOLDER · DETAIL 2'));
}

writeFileSync(join(out, 'portrait/portrait-placeholder.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" role="img" aria-label="Portrait placeholder">
<defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#201d33"/><stop offset="1" stop-color="#0f0e17"/></linearGradient></defs>
<rect width="800" height="1000" fill="url(#p)"/>
<circle cx="640" cy="160" r="260" fill="${PURPLE}" fill-opacity=".16"/><circle cx="120" cy="880" r="240" fill="${GOLD}" fill-opacity=".12"/>
<circle cx="400" cy="400" r="150" fill="none" stroke="${GOLD}" stroke-opacity=".7" stroke-width="2"/>
<text x="400" y="440" text-anchor="middle" font-family="Georgia,serif" font-size="120" fill="#F5F2FA">SI</text>
<text x="400" y="800" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" letter-spacing="6" fill="${GOLD}">PORTRAIT PLACEHOLDER</text>
<text x="400" y="845" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#A6A2AF">Replace with your own photo</text>
</svg>`);

const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<rect width="1200" height="630" fill="#0B0B10"/>
<circle cx="1000" cy="120" r="360" fill="${PURPLE}" fill-opacity=".2"/><circle cx="120" cy="560" r="300" fill="${GOLD}" fill-opacity=".14"/>
<circle cx="150" cy="150" r="56" fill="none" stroke="${GOLD}" stroke-width="2"/>
<text x="150" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="48" fill="#F5F2FA">SI</text>
<text x="80" y="340" font-family="Georgia,serif" font-size="84" fill="#F5F2FA">Designing Ideas</text>
<text x="80" y="440" font-family="Georgia,serif" font-size="84" fill="#F5F2FA">Into <tspan fill="${GOLD}">Impact.</tspan></text>
<text x="80" y="540" font-family="Arial,sans-serif" font-size="26" letter-spacing="6" fill="#A6A2AF">SASITH IMARSHA — GRAPHIC DESIGNER</text>
</svg>`;
writeFileSync(join(out, 'brand/og.svg'), og);
try {
  const { default: sharp } = await import('sharp');
  await sharp(Buffer.from(og)).png().toFile(join(out, 'brand/og.png'));
  console.log('og.png written');
} catch {
  console.log('sharp not installed — og.png skipped (og.svg written). Export og.svg to PNG manually for social cards.');
}
console.log(`Generated ${projects.length * 3 + 3} placeholder files.`);
