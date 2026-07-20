---
name: seo-dual-source
description: SEO title/description and definePerson jobTitle are emitted from TWO places — keep them in sync
metadata:
  type: project
---

SEO meta and Schema.org `definePerson` are emitted from **two** places, not one:

- `app/app.vue` — sitewide defaults (`useSeoMeta` + `definePerson` + `defineWebSite`) that apply to EVERY route, including `/blog` and `/blog/[slug]`.
- `app/pages/index.vue` — locale-aware overrides for the landing page only.

**Why:** During the brand-repositioning-redesign (Fullstack → Senior Software Engineer), only `index.vue` was updated in phases 1–6; `app.vue` was missed, so blog/article routes still emitted "Fullstack Developer" title and `jobTitle`, plus a conflicting Person JSON-LD node. Caught and fixed in Phase 7 (T28 validation gate).

**How to apply:** Any change to positioning copy, `jobTitle`, `knowsAbout`, or OG/Twitter wording must be applied in BOTH files. Non-landing routes inherit only `app.vue`. Canonical positioning string is "Senior Software Engineer" (RF-40/RF-42/UI-07); never "Frontend/Full Stack/Fullstack Developer".
