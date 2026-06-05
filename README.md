# ESTATE — Real Estate Landing Page

An editorial, award-caliber single-page real estate site built with Next.js (App
Router), TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — palette and Poppins configured in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, staggered children, counters, slider
- **next/font/google** — Poppins (400 / 500 / 600 / 700)
- **next/image** — optimized Unsplash imagery (AVIF/WebP)
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the build
```

## Brand tokens

| Token            | Hex       | Role                                  |
| ---------------- | --------- | ------------------------------------- |
| `blue` (DEFAULT) | `#14365C` | Primary — headings, nav, primary CTAs |
| `blue.accent`    | `#2A5A8C` | Links, hover states                   |
| `brown`          | `#8B5E3C` | Secondary CTAs, accents               |
| `brown.taupe`    | `#C9A98B` | Muted accents, dividers               |
| `cream`          | `#FAF7F2` | Off-white background                  |
| `ink`            | `#1A1A1A` | Body text                             |

## Structure

```
app/        layout (Poppins + metadata), page (section composition), globals.css
components/ Navbar, Hero, SearchBar, FeaturedProperties, PropertyCard,
            StatsStrip, Counter, About, Services, Agents, AgentCard,
            Testimonials, CTABanner, Footer
components/ui/  Button (primary/secondary/outline/ghost), Reveal (motion wrapper)
lib/        data.ts (typed properties/agents/testimonials/services), motion.ts
```

All cards map over typed arrays in `lib/data.ts` — no per-card markup is
hardcoded.

## Notes

- Fully responsive, mobile-first.
- Accessible: semantic landmarks, skip link, alt text, visible focus rings,
  `aria-label`s on icon controls, AA-contrast text.
- Motion respects `prefers-reduced-motion` throughout.
- Placeholder imagery is served from Unsplash; swap the URLs in `lib/data.ts`
  and the hero/about/CTA components for production assets.
