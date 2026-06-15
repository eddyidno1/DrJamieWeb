# Dr Jamie Lam — SO Dental

A premium, animation-led marketing website for **Dr Jamie Lam** at **SO Dental**, Chatswood (Sydney, Australia). Built as a single-page landing experience plus supporting pages, with motion as a first-class design element: a custom cursor, masked text reveals, parallax, a velocity-responsive marquee, a travelling scroll-driven video, a testimonials carousel, kinetic typography, and an interactive WebGL 3D tooth.

## Tech stack

- **[Next.js](https://nextjs.org/)** (App Router, TypeScript, Turbopack)
- **[React](https://react.dev/)**
- **[GSAP](https://gsap.com/)** + `@gsap/react` (`useGSAP`) + ScrollTrigger — scroll & reveal animation
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scrolling, synced to ScrollTrigger
- **[React Three Fiber](https://r3f.docs.pmnd.rs/)** + **[drei](https://github.com/pmndrs/drei)** + **[three.js](https://threejs.org/)** — the interactive 3D tooth on the Services page

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

> **Note:** this project was developed on Node 19, which predates a couple of APIs Next expects, so [`next.config.ts`](next.config.ts) and [`instrumentation.ts`](instrumentation.ts) include a small `URL.canParse` polyfill. On Node 20.9+ these are harmless. Avoid running `npm run build` while the dev server is running — it can corrupt the `.next` cache.

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page — hero, travelling scroll video, services, technology, testimonials, kinetic outro |
| `/new-patients` | First-visit guide: comprehensive exam, pain relief, consultation |
| `/services` | Interactive WebGL 3D tooth with clickable service nodes |
| `/reviews` | Patient reviews |
| `/about-us` | About SO Dental and Dr Jamie Lam |
| `/contact-us` | Practice locations, phone & email |

All **"Book / Schedule an appointment"** CTAs link to the practice's online booking portal (centralised in [`lib/booking.ts`](lib/booking.ts)).

## Project structure

```
app/                  # App Router pages, global styles, layout
  page.tsx            # landing page (composes the sections)
  globals.css         # single global stylesheet (design tokens + all components)
  about-us/ contact-us/ new-patients/ reviews/ services/
components/           # Header (with mobile menu), CustomCursor, SmoothScroll, MaskedText, ScrollVideo
sections/             # landing-page sections (Hero, Philosophy, marquee, testimonials, …)
lib/                  # gsap registration, booking URL, shared helpers
public/               # images, dental.mp4, tooth.glb (meshopt-compressed)
```

### Conventions

- GSAP plugins are registered once in [`lib/gsap.ts`](lib/gsap.ts); import `gsap`/`useGSAP` from there.
- Styling is one global stylesheet driven by CSS custom properties and `clamp()` fluid type — no CSS Modules or utility framework.
- Animations respect `prefers-reduced-motion`.

---

Built with [Claude Code](https://claude.com/claude-code).
