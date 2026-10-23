# The 43 signs of a vibecoded site

Each sign is a default an AI agent reaches for when nobody gives it direction. `scan` = the scanner
detects it, `eye` = check it on the rendered page.

## Colors and surfaces

| # | sign | spot | instead |
|---|---|---|---|
| 01 | Purple gradient on a black background | scan: `from-purple`, `via-violet`, `#7c3aed`/`#8b5cf6` in a gradient on a dark bg | One brand color, flat or a gradient of 2 close tones of it. Not purple unless the brand is purple. |
| 02 | Flat white background everywhere, nothing else | eye | A tinted off-white or a real surface color, and at least one section that breaks the rhythm. |
| 03 | Neon colors (cyan, lime, magenta) on dark | scan: `cyan-400`, `lime-400`, `fuchsia-500`, `#00ffff` | Saturation from the brand palette, contrast from value, not from glow. |
| 04 | Glowing borders in dark mode | scan: `shadow-[0_0_`, `box-shadow: 0 0 20px` with a color, `ring-*/50` glows | A 1 px border in a neutral 10-15 % lighter than the surface. |
| 05 | Tailwind indigo buttons | scan: `bg-indigo-500`, `bg-indigo-600`, `#6366f1`, `#4f46e5` | The brand color, tested for contrast on its background. |
| 06 | Grain over a gradient | scan: `noise`, `grain` overlays, `feTurbulence` | Drop the gradient, or use a real photo or illustration. |
| 07 | Colored borders on every card | scan: `border-*-500` on cards | Neutral borders; color only on the one card that matters. |

## Layout

| # | sign | spot | instead |
|---|---|---|---|
| 08 | Big centered title with two buttons under it | eye: hero `text-center` + 2 CTAs | Left-aligned hero with the product visible, one primary action. |
| 09 | Three feature cards side by side | eye: `grid-cols-3` of icon + title + 2 lines | Show the features working: screenshots, a demo, one feature per section. |
| 10 | Bento grid | scan: `grid-rows-*` + `col-span-2`/`row-span-2` tiles | Only if the content is really of different sizes; otherwise a plain list or a demo. |
| 11 | Rounded corners on everything | scan: `rounded-2xl`/`rounded-3xl` repeated | One radius scale (e.g. 6 px controls, 12 px cards), not the max everywhere. |
| 12 | A shadow under every card | scan: `shadow-lg`/`shadow-xl` repeated | Elevation only for what floats (menus, dialogs). Cards sit flat. |
| 13 | Liquid glass / glassmorphism | scan: `backdrop-blur`, `bg-white/10`, `backdrop-filter` | Solid surfaces. Blur only for a sticky header over content, if at all. |
| 14 | Dot grid in the background | scan: `radial-gradient(` dot patterns, `bg-dot`, `grid-pattern` | Nothing, or a texture that belongs to the brand. |
| 15 | Big blurred blobs behind the hero | scan: `blur-3xl`, `blur-[100px]` on absolute colored divs | Nothing. Let the product image carry the hero. |
| 16 | Different spacing between every section | eye: `py-16`, `py-24`, `py-20`, `py-32` mixed | One vertical rhythm (a spacing scale) used everywhere. |

## Icons and symbols

| # | sign | spot | instead |
|---|---|---|---|
| 17 | Sparkles icon to say « AI » | scan: `Sparkles`, `✨` | Say what the AI does in words, or show it doing it. |
| 18 | Default Lucide icons on every feature | scan: `lucide-react` icon per card | Fewer icons. Real product visuals, or a custom icon set with a point of view. |
| 19 | Emojis in titles | scan: emoji in `h1`-`h3` | No emoji in headings. |
| 20 | Little green checks before every line | scan: `Check`/`CheckCircle` + `text-green-*` in lists | A plain list, or checks only in a comparison table. |

## Typography

| # | sign | spot | instead |
|---|---|---|---|
| 21 | Inter, Geist or Space Grotesk | scan: font imports and `font-family` | A typeface chosen for the brand (and a second one for contrast if needed). |
| 22 | Instrument Serif in italics in the middle of the title | scan: `Instrument Serif`, `font-serif italic` inside a heading | One heading style. Emphasis through weight or color, not a font switch. |
| 23 | Gradient on the hero title | scan: `bg-clip-text text-transparent bg-gradient` | Solid text color. |

## Motion

| # | sign | spot | instead |
|---|---|---|---|
| 24 | Counters scrolling to « 10,000+ users » | scan: count-up libraries, `10,000+`, `10k+` | The real number, static, with its source. No number if there is none. |
| 25 | Hover animation on everything | scan: `hover:scale`, `hover:-translate-y`, `transition-all` everywhere | Hover feedback on interactive elements only, subtle (color, not size). |
| 26 | Fade-in on every scroll | scan: `framer-motion` `whileInView`, `aos`, `data-aos` | Content visible on load. Motion only where it explains something. |
| 27 | Animations that are way too slow | scan: `duration-700`+, `duration: 1`+ on UI | 150-250 ms for UI, never blocking reading. |

## Copy and content

| # | sign | spot | instead |
|---|---|---|---|
| 28 | « It's not X, it's Y » | scan: `not just`, `ce n'est pas`, `c'est pas` ... `c'est` | Say what it is, directly. |
| 29 | AI words: boost, revolutionize, unleash, seamless, effortless | scan: word list (EN + FR: booster, révolutionner, propulser, sans effort) | Concrete verbs and the real result. |
| 30 | Em dashes everywhere | scan: `—` in copy | Commas, colons, two sentences. |
| 31 | « New » badge above the title | scan: `New`/`Nouveau` pill above `h1` | Only for a real launch, with what is new and its date. |
| 32 | Fake testimonials with a generic avatar | scan: `pravatar`, `randomuser`, `unsplash` faces, `John Doe`, `Sarah` | Real quotes with name, role and link, or no testimonial section. |
| 33 | Three pricing tiers with « Most popular » in the middle | scan: `Most popular`, `Le plus populaire`, `Popular` | The real offer. One plan is fine. |
| 34 | Zero real demo of the product | eye: no screenshot, video or live demo above the fold | Show the product working, first screen. |
| 35 | shadcn charts with no styling | scan: `recharts` / `ChartContainer` with default config | Brand colors, real data, labeled axes. |
| 36 | The sun / moon toggle nobody asked for | scan: `ThemeToggle`, `Sun`/`Moon` icons in the header | Follow the system theme, or ship one theme done well. |

## What is missing (the strongest tells)

| # | sign | spot | instead |
|---|---|---|---|
| 37 | No legal notice page (mentions légales / imprint) | scan: no route or link matching `mentions`, `legal`, `imprint` | A real page with the company details (TODO fields for the user). |
| 38 | No privacy policy | scan: no route or link matching `privacy`, `confidentialite` | A real page, linked in the footer and the signup form. |
| 39 | The tab still says « Create Next App » | scan: `Create Next App`, `Vite + React`, `React App` in titles | A real `<title>` per page: product name + what the page is. |
| 40 | The default Next / Vercel / Vite favicon | scan: default `favicon.ico` hash, `vite.svg`, `next.svg`, `vercel.svg` | The product's own favicon (and apple-touch-icon). |
| 41 | No Open Graph image (a shared link shows an empty card) | scan: no `og:image` / `opengraph-image` | One og image per page, 1200x630, with the page title. |
| 42 | A footer full of links that lead nowhere | scan: `href="#"`, `href=""` | Only links that exist. |
| 43 | Pages that take forever to load | eye: Lighthouse / Network tab, huge images, client-only rendering | Optimized images, server rendering, no 3 MB hero video. |
