# Confirmed planning input — brand-repositioning-redesign

## Summary

Iterative redesign of the existing live personal site (werlesson.vercel.app) to
reposition Werlesson as a **Senior Software Engineer** for international recruiters.
Evolution, not reconstruction: preserve the current visual identity, component
structure, and i18n copy pipeline; add/rewrite sections only where they fail to
communicate seniority. Think Staff Product Designer reviewing an existing product.

## Tier

`complete` (11+ RFs: 11 sections + Nuxt Content blog + full SEO surface).
Single-repo, no formal API/gRPC/AsyncAPI contracts → contract emission skipped.
Clarifier is mandatory at this tier.

## Confirmed decisions

- **Scope:** ONE complete feature — all 11 sections + blog engine + SEO as one SPEC/PLAN.
- **Content:** Structure now, copy as TBD. Define components, data shape, and
  locale/content schema; mark real per-project case-study prose and article bodies
  as `[NEEDS CLARIFICATION]` / TBD to fill during/after implementation. Do NOT block
  planning on missing copy.
- **Audit:** Capture the current-site audit (strengths, weaknesses, per-section
  recommendations) INSIDE SPEC.md as the AS-IS analysis + per-section
  Keep / Improve / Replace / Remove decisions. No separate audit document.

## Confirmed acceptance criteria (source of truth — no issue tracker)

1. Hero communicates the "Senior Software Engineer" positioning with the specified
   title ("Senior Software Engineer"), subtitle ("Building scalable SaaS products
   with Vue, Nuxt and Laravel."), description, primary "View Projects" + secondary
   "Download Resume" CTAs, and LinkedIn / GitHub / Email links.
2. All 11 target sections render in order — Hero, About, Impact, What I Do,
   Engineering Principles, Featured Projects (case studies), Experience, Tech Stack,
   Currently Building, Blog, Contact — REUSING existing components where they still
   communicate seniority; every section carries a justified Keep/Improve/Replace/Remove.
3. Featured Projects renders each initial project (Camaris, Match Zone, ShapeLog,
   CSV View, Chalet SaaS) as a full product case study (Image, Description, Problem,
   Solution, Architecture, Tech Stack, Challenges, Results) with View Project /
   Source Code (when available) buttons.
4. Blog powered by Nuxt Content with technical articles + RSS feed; Impact metrics
   and section copy are content/locale-driven so they are easy to update later.
5. Existing visual identity, component structure, and i18n copy pipeline
   (locales/\*.json, zero hardcoded text) preserved; only sections that fail to
   communicate seniority are replaced.
6. Complete SEO — meta tags, Open Graph, Schema.org structured data, sitemap,
   robots.txt, RSS — fully responsive, dark-mode-by-default, accessible, with
   subtle micro-interactions and smooth scrolling.
7. Lighthouse score > 95 via lazy loading, image optimization, and code splitting.

## Design constraints (from PROMPT.md)

- Premium/minimal aesthetic inspired by Vercel, Linear, Stripe, Supabase, Raycast:
  whitespace, minimal text per section, strong hierarchy, extremely subtle animations.
- Avoid: progress bars, skill percentages, meaningless charts, oversized icons,
  overdesigned cards, too many colors, excessive text, large hero photos.
- Preferred tech: Nuxt 4, Vue 3, TypeScript, Tailwind, Nuxt Content, Motion,
  Iconify, shadcn-vue.
- Positioning must NOT be "Frontend Developer" or "Full Stack Developer".

## Reference paths (agents read these directly)

- Description: `.spec/base/PROMPT.md`
- Architecture: `AGENTS.md`, `docs/agents/architecture.md`, `docs/agents/domain_rules.md`
- Init chain: none present.
