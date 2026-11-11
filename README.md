# Anesa Fazliu — Portfolio

Single-page personal portfolio. React 19 + TypeScript + Vite, styled with
styled-components. No UI framework, no CSS framework.

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
npm run lint
```

## Editing the content

All copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) — personal
details, social links, profile text, capabilities, the stack (layers, languages
and tools) and working principles. Nothing is hard-coded inside the components,
so updating the site means editing that one file.

`sections` in the same file drives the section numbering, the rail titles and
the navigation links, so adding or renaming a section happens there too.

## Structure

```
src/
  data/portfolio.ts   all site content
  styles/             design tokens in use (primitives, CTA styles)
  hooks/              scroll, intersection and overlay behaviour
  components/         Header, MobileMenu, Section, Reveal, GridRules, Footer, Icons
  sections/           Hero, About, Capabilities, Stack, Approach, Contact
  index.css           design tokens, reset, global type and focus styles
```

## Design notes

The layout is built on a fixed column grid — the hairline rules behind the page
are the same measure every section aligns to. Each section carries a numeral in
the left rail, and a single crimson accent appears only as a solid block: in
the wordmark, the navigation indicator, section numerals and hover states.

Type is Instrument Serif for display, Inter for text and JetBrains Mono for
labels and numerals.

All motion is decorative: scroll reveals, the hero entrance and hover
transitions all collapse under `prefers-reduced-motion: reduce`, and every
element renders in its final state without JavaScript animation.
