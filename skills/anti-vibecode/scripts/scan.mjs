#!/usr/bin/env node
// anti-vibecode scanner: finds the tells of references/signs.md that a regex can see.
// Usage: node scan.mjs [project root] [--json]
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, basename } from 'node:path';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const json = args.includes('--json');
const root = args.find((a) => !a.startsWith('--')) || process.cwd();

const SKIP = new Set(['node_modules', '.git', '.next', '.nuxt', '.svelte-kit', '.turbo', '.vercel', '.output', 'dist', 'build', 'out', 'coverage', '.cache', 'vendor']);
const EXT = new Set(['.tsx', '.jsx', '.ts', '.js', '.mjs', '.html', '.css', '.scss', '.mdx', '.md', '.vue', '.svelte', '.astro']);
const MAX_HITS = 3;

const NAMES = {
  1: 'Purple gradient on a black background', 3: 'Neon colors on dark', 4: 'Glowing borders',
  5: 'Tailwind indigo buttons', 6: 'Grain over a gradient', 7: 'Colored borders on every card',
  10: 'Bento grid', 11: 'Rounded corners on everything', 12: 'A shadow under every card',
  13: 'Liquid glass / glassmorphism', 14: 'Dot grid in the background', 15: 'Blurred blobs behind the hero',
  17: 'Sparkles icon for « AI »', 18: 'Default Lucide icons everywhere', 19: 'Emojis in titles',
  20: 'Green checks before every line', 21: 'Inter, Geist or Space Grotesk', 22: 'Instrument Serif italic in the title',
  23: 'Gradient on the hero title', 24: 'Scrolling counters « 10,000+ »', 25: 'Hover animation on everything',
  26: 'Fade-in on every scroll', 27: 'Animations way too slow', 28: '« It\'s not X, it\'s Y »',
  29: 'AI words (boost, revolutionize, seamless...)', 30: 'Em dashes everywhere', 31: '« New » badge above the title',
  32: 'Fake testimonials, generic avatars', 33: '« Most popular » pricing tier', 35: 'Unstyled shadcn charts',
  36: 'Sun / moon toggle', 37: 'No legal notice page', 38: 'No privacy policy', 39: 'Tab says « Create Next App »',
  40: 'Default favicon', 41: 'No Open Graph image', 42: 'Links that lead nowhere',
};
const EYE = { 2: 'Flat white background everywhere', 8: 'Centered title + two buttons', 9: 'Three feature cards side by side', 16: 'Different spacing between sections', 34: 'Zero real demo of the product', 43: 'Pages that take forever to load' };

// [sign, regex, minimum hits in the whole project before it counts]
const RULES = [
  [1, /\b(from|via|to)-(purple|violet|fuchsia)-\d{3}\b|linear-gradient\([^)]*#(7c3aed|8b5cf6|a855f7|9333ea|6d28d9)/i, 1],
  [3, /\b(text|bg|border|shadow)-(cyan|lime|fuchsia)-(300|400)\b|#(00ffff|0ff|39ff14|ff00ff)\b/i, 1],
  [4, /shadow-\[0_0_\d+px|box-shadow:\s*0\s+0\s+\d{2,}px\s+(rgba?\(|#)|\bring-\w+-\d{3}\/\d{2}\b/i, 1],
  [5, /\bbg-indigo-(500|600)\b|#(6366f1|4f46e5)\b/i, 1],
  [6, /\b(noise|grain)(-overlay|-bg|\.png|\.svg)?\b.*(absolute|opacity|mix-blend)|feTurbulence/i, 1],
  [7, /\bborder-(purple|violet|indigo|blue|cyan|emerald|pink)-500(\/\d+)?\b/, 3],
  [10, /\b(col|row)-span-2\b|\bbento\b/i, 2],
  [11, /\brounded-(2xl|3xl)\b|border-radius:\s*(2[4-9]|[3-9]\d)px/, 6],
  [12, /\bshadow-(lg|xl|2xl)\b/, 6],
  [13, /\bbackdrop-blur(-\w+)?\b|backdrop-filter:\s*blur|\bbg-white\/(5|10|15)\b/, 1],
  [14, /radial-gradient\([^)]*1px|\b(bg-dot|dot-pattern|grid-pattern|bg-grid)\b/i, 1],
  [15, /\bblur-(3xl|\[\d{2,}px\])\b|filter:\s*blur\((6\d|[7-9]\d|\d{3})px\)/, 1],
  [17, /\bSparkles?\b|✨/, 1],
  [18, /from\s+['"]lucide-react['"]/, 5],
  [19, /<h[1-3][^>]*>[^<]*\p{Extended_Pictographic}/u, 1],
  [20, /\b(Check|CheckCircle2?|CircleCheck)\b[^>\n]*text-(green|emerald)-\d{3}/, 1],
  [21, /\b(Inter|Geist(_Sans)?|Space_Grotesk|Space Grotesk)\b\s*\(|font-family:[^;]*\b(Inter|Geist|Space Grotesk)\b|fonts\.googleapis\.com\/css2?\?family=(Inter|Space\+Grotesk)|['"]geist\/font/, 1],
  [22, /Instrument[_ ]Serif|\bfont-serif\s+italic\b|\bitalic\s+font-serif\b/, 1],
  [23, /\bbg-clip-text\b[^"'`]*\btext-transparent\b|\btext-transparent\b[^"'`]*\bbg-clip-text\b|-webkit-background-clip:\s*text/, 1],
  [24, /react-countup|\bCountUp\b|\bNumberTicker\b|\b\d{1,3}[,.\s ]?000\+|\b\d+k\+\s/i, 1],
  [25, /\bhover:(scale-\d+|-?translate-y-\S+)/, 4],
  [26, /\bwhileInView\b|\bdata-aos\b|from\s+['"]aos['"]|\bfade-?in-?up\b/i, 1],
  [27, /\bduration-(700|1000)\b|transition[^;\n]*\b([1-9]\d{3}ms|[1-9](\.\d)?s)\b|duration:\s*(1(\.\d+)?|[2-9](\.\d+)?)\s*[,}]/, 1],
  [28, /\b(it'?s|this is) not (just )?(a |an )?\w+[,.]\s*(it'?s|this is)\b|\bnot just (a |an )?\w+,? (but|it'?s)\b|\bce n'?est pas (qu'?)?\S+[,.]\s*c'?est\b|\bc'?est pas (qu'?)?\S+[,.]\s*c'?est\b/i, 1],
  [29, /\b(supercharge|revolutioni[sz]e|unleash|seamless(ly)?|effortless(ly)?|game[- ]changer|elevate your|boost your|révolutionn\w*|propuls\w*|sans effort|booste[rz]?)\b/i, 1],
  [30, /—/, 3],
  [31, /(>|['"`])\s*(New|Nouveau|NEW)\s*(<|['"`]).{0,200}<h1|\bbadge\b[^\n]*\b(New|Nouveau)\b/is, 1],
  [32, /pravatar\.cc|randomuser\.me|i\.pravatar|ui-avatars\.com|\bJohn Doe\b|\bJane Doe\b|images\.unsplash\.com\/photo-[^"']*(face|portrait)/i, 1],
  [33, /\b(most popular|le plus populaire|plus populaire|best value|recommended)\b/i, 1],
  [35, /\bChartContainer\b|from\s+['"]recharts['"]/, 1],
  [36, /\b(ThemeToggle|ModeToggle|ThemeSwitcher|DarkModeToggle)\b|\b(Sun|Moon)Icon\b|<(Sun|Moon)\b/, 1],
  [39, /Create Next App|Vite \+ (React|Vue|TS)|<title>React App<\/title>|Generated by create next app/i, 1],
  [40, /['"]\/(vite|next|vercel)\.svg['"]/, 1],
  [42, /href=(["'])#?\1|href=\{?["']#["']\}?/, 2],
];

// Favicon shipped by create-next-app (md5)
const DEFAULT_FAVICONS = new Set(['c30c7d42707a47a3f4591831641e50dc']);

const files = [];
const routes = [];
function walk(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.isDirectory()) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name)) { routes.push(relative(root, p)); walk(p); } continue; }
    routes.push(relative(root, p));
    if (EXT.has(extname(e.name)) && statSync(p).size < 1_500_000) files.push(p);
  }
}
if (!existsSync(root)) { console.error(`No such folder: ${root}`); process.exit(1); }
walk(root);

const hits = {};
let corpus = '';
for (const f of files) {
  const rel = relative(root, f);
  if (/(^|\/)(README|CHANGELOG|LICENSE)/i.test(rel) || /\.(test|spec|stories)\./.test(rel)) continue;
  const text = readFileSync(f, 'utf8');
  corpus += `\n${text}`;
  const lines = text.split('\n');
  for (const [sign, re] of RULES) {
    if (sign === 31) { if (re.test(text)) (hits[sign] ||= []).push(`${rel}`); continue; }
    lines.forEach((line, i) => { if (re.test(line)) (hits[sign] ||= []).push(`${rel}:${i + 1}`); });
  }
}

const found = {};
for (const [sign, , min] of RULES) if ((hits[sign]?.length || 0) >= min) found[sign] = hits[sign];

// What is missing: checks on the whole project
const all = routes.join('\n').toLowerCase() + corpus.toLowerCase();
if (!/mentions[-_ ]?l[ée]gales|\/legal\b|legal[-_]notice|imprint|impressum/.test(all)) found[37] = ['no route or link to a legal notice page'];
if (!/privacy|confidentialit[ée]|datenschutz/.test(all)) found[38] = ['no route or link to a privacy policy'];
if (!/og:image|opengraph-image|twitter-image|openGraph\s*:\s*\{[^}]*images/i.test(routes.join('\n') + corpus)) found[41] = ['no og:image and no opengraph-image file'];
for (const r of routes) {
  if (basename(r) === 'favicon.ico') {
    try {
      const md5 = createHash('md5').update(readFileSync(join(root, r))).digest('hex');
      if (DEFAULT_FAVICONS.has(md5)) (found[40] ||= []).push(`${r} (default create-next-app favicon)`);
    } catch {}
  }
}

const numbers = Object.keys(found).map(Number).sort((a, b) => a - b);
if (json) {
  console.log(JSON.stringify({ root, files: files.length, found: Object.fromEntries(numbers.map((n) => [n, { sign: NAMES[n], where: found[n] }])), eye: EYE }, null, 2));
  process.exit(0);
}

const pad = (n) => String(n).padStart(2, '0');
console.log(`anti-vibecode scan: ${root} (${files.length} files)\n`);
for (const n of numbers) {
  const where = found[n];
  console.log(`✗ ${pad(n)}  ${NAMES[n]}`);
  for (const w of where.slice(0, MAX_HITS)) console.log(`       ${w}`);
  if (where.length > MAX_HITS) console.log(`       ... ${where.length - MAX_HITS} more`);
}
const clean = Object.keys(NAMES).map(Number).filter((n) => !found[n]);
console.log(`\n✓ clean by scan: ${clean.map(pad).join(' ')}`);
console.log(`\nCheck by eye (a regex cannot see them):`);
for (const [n, name] of Object.entries(EYE)) console.log(`  ${pad(n)}  ${name}`);
console.log(`\n${numbers.length}/43 signes trouvés par le scan (+ ${Object.keys(EYE).length} à vérifier à l'œil)`);
