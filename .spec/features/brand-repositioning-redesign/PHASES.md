# Phases: brand-repositioning-redesign

Gerado por /plan a partir de PLAN.md — view executável para `./ralph.sh .spec/features/brand-repositioning-redesign/PHASES.md`.

## Phase 1: Foundation — deps, content schema, types

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T01 — Add `@nuxt/content` + `nuxt-og-image` deps and wire modules
      Arquivos: `package.json`, `nuxt.config.ts`
      Mudança: Add both deps and register them in `modules` alongside existing ones; add minimal `content` + `ogImage` config; keep `ssr: true`, `site.url`, fonts and i18n untouched; run `yarn install`.
      Cobre: RF-31, RF-41
      Acceptance criteria: `nuxt prepare` and `nuxt typecheck` succeed with both modules registered; `package.json` lists `@nuxt/content` and `nuxt-og-image`.
      Testes: `nuxt typecheck` passes; no new unit test.
- [ ] T02 — Define the blog content collection schema
      Arquivos: `content.config.ts`
      Mudança: `defineCollection` `blog` with typed frontmatter — title, description/summary, date, slug, tags[], required single-valued `locale`, `draft`; missing required field (incl. `locale`) invalidates/excludes the article.
      Cobre: RF-35, RF-31
      Acceptance criteria: the collection schema exists and requires `locale`; an article missing a required field fails validation or is excluded.
      Testes: validated in T27.
- [ ] T03 — Portfolio TypeScript data shapes
      Arquivos: `app/types/portfolio.ts`
      Mudança: Export `CaseStudy` (`status: 'shipped' | 'building'`, eight narrative blocks, optional `repoUrl`), `ExperienceEntry` (six fields incl. distinct `businessImpact`), `ImpactMetric`, `Capability`, `Principle`.
      Cobre: RF-23, RF-25
      Acceptance criteria: a typed schema for a case study incl. `status` and for experience entries exists; `nuxt typecheck` passes.
      Testes: consumed by T26.

## Phase 2: Locale catalog & parity

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T04 — Extend locale catalogs with all new namespaces + repositioning copy
      Arquivos: `locales/pt.json`, `locales/en.json`
      Mudança: Add with strict pt/en parity — new nav labels; replace `hero.role1/2/3` with `hero.capabilities` array; add static `hero.title`="Senior Software Engineer", `hero.subtitle`, `hero.description`, project CTA + LinkedIn/GitHub/Email labels+aria; set `hero.statTargets` years:6/projects:20; reframe `about.bio`/`about.badge` (no clichés) and `about.stats` to 6+/20+; add `impact`, `whatIDo` (6 cards), `principles`, `featuredProjects` (+ status catalog), `experience`, `currentlyBuilding`, `blog` namespaces; add `stack.groups.tools` + Database/Infrastructure labels; set `contact.cta` and email to `werlessono@gmail.com`. No "Frontend/Full Stack Developer" wording.
      Cobre: RF-03, RF-04, RF-05, RF-06, RF-07, RF-08, RF-11, RF-12, RF-13, RF-14, RF-15, RF-16, RF-17, RF-18, RF-19, RF-23, RF-25, RF-26, RF-27, RF-29, RF-37, RF-38, RF-46, RF-47, UI-07
      Acceptance criteria: both files carry the new namespaces with identical structure and equal-length arrays; no `hero.role1/2/3` keys remain; `vitest run` passes `i18nKeys.test.ts` after T05.
      Testes: `tests/unit/i18nKeys.test.ts` (updated in T05).
- [ ] T05 — Update locale-parity test for the new key set
      Arquivos: `tests/unit/i18nKeys.test.ts`
      Mudança: Remove `hero.role1/2/3` assertions; add assertions for `hero.capabilities` (equal-length pt/en), `hero.statTargets` positive, all new namespaces present and equal-length, and `stack.groups.tools`; assert nothing about `content/` bodies.
      Cobre: RF-04, RF-46, RNF-05
      Acceptance criteria: `vitest run` passes and fails if pt/en diverge structurally on any new key; no reference to removed `role1/2/3` keys.
      Testes: this IS the test.

## Phase 3: Reposition existing sections + nav

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T06 — Reposition HeroSection
      Arquivos: `app/components/sections/HeroSection.vue`
      Mudança: Render static `hero.title` "Senior Software Engineer"; repoint the typewriter `roles` computed to `tm('hero.capabilities')` keeping the tick state machine intact; add static `hero.subtitle`; swap CTAs — primary "View Projects" → smooth-scroll `#projects`, secondary "Download Resume" → `/CV_Werlesson_Vieira.pdf`; add LinkedIn/GitHub/Email links (email `mailto:werlessono@gmail.com`) with localized aria; counters read the 6/20 targets. No new colors/fonts.
      Cobre: RF-06, RF-07, RF-08, RF-09, RF-10, RF-11, RF-14, RF-47, UI-05, UI-07
      Acceptance criteria: rendered hero title equals "Senior Software Engineer" (EN) and is static; typewriter cycles the capability set with no `role1/2/3` reads; three social links have valid `href` (email `mailto:werlessono@gmail.com`); primary CTA anchors `#projects`; `typewriter.test.ts` still passes.
      Testes: `tests/unit/typewriter.test.ts` passes; hero title asserted in T25.
- [ ] T07 — Reframe AboutSection (reuse, no replace)
      Arquivos: `app/components/sections/AboutSection.vue`
      Mudança: Keep `AboutSection.vue` + `AboutTimelineStep.vue` and the timeline; ensure stats render the updated `about.stats` (6+/20+) and reframed bio from locale; preserve `id="about"`.
      Cobre: RF-12, RF-13
      Acceptance criteria: `about.stats` reads 6+ years / 20+ projects; the timeline component is reused (not replaced); About copy comes from locale keys with no cliché phrasing.
      Testes: parity via T05; cliché review in T28.
- [ ] T08 — Extend StackSection to five categories (additive)
      Arquivos: `app/components/sections/StackSection.vue`
      Mudança: Add a fifth `stack.groups.tools` group to `stackGroups` (ESLint/Prettier/Vitest/Git as brand proper-nouns), relabel database→"Database" and infra→"Infrastructure" via locale keys, adjust the responsive grid; reuse `StackTechGroup.vue`/`StackTechCard.vue` unchanged.
      Cobre: RF-27, RF-28, RF-02, UI-01
      Acceptance criteria: five category groups render from the group config; the additive Tools group and relabels are present; the three existing stack components remain the rendering primitives.
      Testes: `stack.groups.tools` parity in T05.
- [ ] T09 — Enhance ContactSection actions
      Arquivos: `app/components/sections/ContactSection.vue`
      Mudança: Add `contact.cta` "Interested in working together?" heading; add "Download Resume" action → `/CV_Werlesson_Vieira.pdf`; change email `href` to `mailto:werlessono@gmail.com`; preserve the client-only form exactly.
      Cobre: RF-37, RF-38, RF-39, RF-47
      Acceptance criteria: the CTA renders from `$t`; four actions render (LinkedIn/GitHub/Email/Resume); email targets `werlessono@gmail.com`; submitting the form performs no network request.
      Testes: verified in T28 review.
- [ ] T10 — Extend header/footer navigation
      Arquivos: `app/layouts/default.vue`
      Mudança: Replace `navItems` with the new section set (about, impact, whatIDo, principles, projects, experience, stack, building, blog, contact), hashes matching each section `id`, labels from `$t`; Blog item anchors the on-page teaser `id`, not `/blog`; keep skip link, focus rings, mobile menu, `updateActiveHash`; footer unchanged.
      Cobre: RF-05, UI-04, UI-05
      Acceptance criteria: every nav anchor resolves to an existing section `id`; the Blog nav item scrolls to the on-page teaser; labels come from `$t`.
      Testes: anchor resolution asserted in T25.

## Phase 4: New static sections

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T11 — ImpactSection (new)
      Arquivos: `app/components/sections/ImpactSection.vue`
      Mudança: Render one item per `impact` metric entry (locale/`tm`-driven) — 6+ years / 20+ projects and capability statements as a minimal block; reuse the `useIntersectionObserver` (threshold 0.1) reveal; `id="impact"`; no progress bars/percentages/charts.
      Cobre: RF-14, RF-15, UI-03, UI-06
      Acceptance criteria: Impact renders one item per configured metric showing 6+/20+; no UI-06 anti-patterns; values change from locale with no component edit.
      Testes: metric render checked in T25.
- [ ] T12 — WhatIDoSection (new)
      Arquivos: `app/components/sections/WhatIDoSection.vue`
      Mudança: Render six capability cards (SaaS Development, Frontend Architecture, Laravel APIs, Performance & SEO, System Design, Technical Leadership), title + short description from the `whatIDo` locale array; scroll-reveal; `id="whatIDo"`.
      Cobre: RF-16, RF-17, UI-03, UI-06
      Acceptance criteria: six cards render, one per configured capability, each with a non-empty localized title and description; pt/en parity holds.
      Testes: parity via T05.
- [ ] T13 — PrinciplesSection (new)
      Arquivos: `app/components/sections/PrinciplesSection.vue`
      Mudança: Render a minimal list from the `principles` locale array (Architecture First, Performance Matters, Developer Experience, SEO by Default, Scalable Systems, Clean Code, Business-Driven Decisions); `id="principles"`; no oversized icons.
      Cobre: RF-18, UI-03, UI-06
      Acceptance criteria: principle items render from a locale array; count and labels match the config; no UI-06 anti-patterns.
      Testes: parity via T05.
- [ ] T14 — FeaturedProjectsSection + ProjectCaseStudy (new)
      Arquivos: `app/components/sections/FeaturedProjectsSection.vue`, `app/components/sections/ProjectCaseStudy.vue`
      Mudança: Read the single project catalog (locale array, typed via `app/types/portfolio.ts`), filter to `status: 'shipped'`, render each as a full case study with the eight blocks omitting empty ones; "View Project" always, "Source Code" only when `repoUrl` exists; below-the-fold images `loading="lazy"`; `id="projects"`.
      Cobre: RF-19, RF-20, RF-21, RF-22, RF-23, RF-24, RNF-02, RNF-04, UI-06
      Acceptance criteria: case studies render from the catalog filtered to `status: shipped`; eight blocks defined and empty-safe with placeholder prose; Source Code button appears only with a repo URL; no id also appears under Currently Building.
      Testes: partition + empty-safe asserted in T26.
- [ ] T15 — ExperienceSection + ExperienceEntry (new)
      Arquivos: `app/components/sections/ExperienceSection.vue`, `app/components/sections/ExperienceEntry.vue`
      Mudança: Render a professional timeline; each entry shows Company, Role, Period, responsibilities, Technologies and a distinct Business impact field from the `experience` locale array (typed); empty-safe with placeholder/partial entries; `id="experience"`.
      Cobre: RF-25, RF-26, UI-03
      Acceptance criteria: each entry renders all six fields incl. a distinct business-impact field; pt/en parity holds; placeholder/partial entries render without throwing.
      Testes: empty-safe asserted in T26.
- [ ] T16 — CurrentlyBuildingSection (new)
      Arquivos: `app/components/sections/CurrentlyBuildingSection.vue`
      Mudança: Read the same catalog, filter to `status: 'building'` (Shrimp Farm Management SaaS, Future Products), present as active/in-progress distinct from shipped case studies; `id="building"`.
      Cobre: RF-29, RF-30
      Acceptance criteria: one item per `status: building` entry renders; no id here also appears under Featured Projects; title and labels from `$t`.
      Testes: mutual exclusion asserted in T26.
- [ ] T17 — BlogSection teaser + BlogArticleCard (new)
      Arquivos: `app/components/sections/BlogSection.vue`, `app/components/sections/BlogArticleCard.vue`
      Mudança: On-page teaser querying `@nuxt/content` for the latest 3–4 published articles in the active locale (descending date), rendering summaries only (title/date/summary) with a link to `/blog`; `id="blog"`; empty-safe.
      Cobre: RF-01, RF-32, RNF-03
      Acceptance criteria: the Blog section renders at most 4 latest-article teasers with a link to `/blog`; no full article bodies ship in the teaser.
      Testes: teaser cap + `/blog` link asserted in T25.

## Phase 5: Blog engine & RSS

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos
3. `.spec/features/brand-repositioning-redesign/PLAN.md` §"Data & content decisions" e `content.config.ts` (schema T02) — coleção `blog`, frontmatter `locale`

- [ ] T18 — Placeholder blog articles
      Arquivos: `content/blog/*.md`
      Mudança: Author ≥1 placeholder article with complete frontmatter (title, summary, date, slug, tags, `locale`, `draft: false`) and TBD body so the engine renders without real content.
      Cobre: RF-36
      Acceptance criteria: the blog renders with one placeholder article; every article carries a valid `locale` frontmatter value.
      Testes: rendered by T19/T20; frontmatter validated in T27.
- [ ] T19 — Blog index route `/blog`
      Arquivos: `app/pages/blog/index.vue`
      Mudança: Query the `blog` collection filtered to active locale + `draft: false`, ordered by descending date; list title/date/summary; code-split from the landing bundle; localized via `prefix_except_default`; reuse `BlogArticleCard.vue`.
      Cobre: RF-32, RNF-03, RNF-07
      Acceptance criteria: `/blog` lists every published article for the active locale in reverse-chronological order; the route is server-rendered and not shipped in the landing bundle.
      Testes: manual render + T27 where feasible.
- [ ] T20 — Blog article route `/blog/[...slug]`
      Arquivos: `app/pages/blog/[...slug].vue`
      Mudança: Resolve each published article to `/blog/[slug]`, render its Markdown body (SSR); emit per-article BlogPosting JSON-LD and a `nuxt-og-image` OG image; canonical/OG absolute URLs on `https://werlesson.dev`; code-split; below-the-fold media lazy.
      Cobre: RF-33, RF-42, RF-41, RNF-02, RNF-03, RNF-07
      Acceptance criteria: each published article resolves to a unique `/blog/[slug]` route rendering its body; the page emits BlogPosting JSON-LD and a per-article `og:image` absolute URL.
      Testes: manual render + T27.
- [ ] T21 — RSS Nitro route handler `/rss.xml`
      Arquivos: `server/routes/rss.xml.ts`
      Mudança: Nitro route handler querying `@nuxt/content` for published articles, returning valid RSS XML (channel + items with title, absolute link on `https://werlesson.dev`, pubDate) at `/rss.xml`; set `content-type: application/rss+xml`.
      Cobre: RF-34
      Acceptance criteria: `GET /rss.xml` returns valid RSS XML listing published articles with title, absolute link and pubDate.
      Testes: XML shape unit-tested in T27.

## Phase 6: Composition & SEO surface

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T22 — Compose 11 sections + repositioned SEO in index.vue
      Arquivos: `app/pages/index.vue`
      Mudança: Import/render the eleven sections in confirmed order (Hero, About, Impact, What I Do, Engineering Principles, Featured Projects, Experience, Tech Stack, Currently Building, Blog, Contact); update `useSeoMeta` title/description to the "Senior Software Engineer" positioning (locale-aware, replacing lines 24-32); add OG tags + `twitter:card=summary_large_image` with a `nuxt-og-image` landing `og:image` (absolute origin); set `definePerson.jobTitle` to "Senior Software Engineer" and refresh `knowsAbout`; add an RSS `<link rel="alternate" type="application/rss+xml" href="/rss.xml">` in the head; keep `personSiteUrl` normalization.
      Cobre: RF-01, RF-40, RF-41, RF-42, RF-45, RNF-07, UI-07
      Acceptance criteria: `index.vue` renders the eleven section components in the specified order; `<title>`/meta description and `definePerson.jobTitle` say "Senior Software Engineer" (PT equivalent), not "Fullstack Developer"; OG + Twitter + RSS alternate link present in the SSR head.
      Testes: section-order + head-link assertions in T25.
- [ ] T23 — Sitemap + OG-image config
      Arquivos: `nuxt.config.ts`
      Mudança: Configure `@nuxtjs/sitemap` to include home, `/blog` and every published article route as absolute `https://werlesson.dev` URLs, emitting only the existing locale URL per single-locale article; configure `nuxt-og-image` defaults (landing + BlogPosting templates); no change to `ssr`/i18n/fonts.
      Cobre: RF-41, RF-43
      Acceptance criteria: the generated sitemap lists home, `/blog` and one absolute `https://werlesson.dev/...` URL per published article (active locale only).
      Testes: manual sitemap inspection.
- [ ] T24 — robots.txt sitemap directive
      Arquivos: `public/robots.txt`
      Mudança: Add `Sitemap: https://werlesson.dev/sitemap.xml` keeping crawl allowed (`User-Agent: * / Disallow:`).
      Cobre: RF-44
      Acceptance criteria: `robots.txt` contains a `Sitemap: https://werlesson.dev/sitemap.xml` directive and still allows crawling.
      Testes: string presence checked in T28.

## Phase 7: Tests & validation

Antes de implementar, leia:

1. `.spec/features/brand-repositioning-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/brand-repositioning-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T25 — Section-order, anchor and hero assertions test
      Arquivos: `tests/unit/sectionComposition.test.ts`
      Mudança: Assert the eleven-section order (RF-01), every `navItems` hash resolves to a rendered section `id` (RF-05), the Blog teaser caps ≤4 with a `/blog` link, and hero title equals "Senior Software Engineer" (EN) with PT parity; prefer testing exported order/config data over DOM to stay in `environment: node`.
      Cobre: RF-01, RF-05, RF-06
      Acceptance criteria: `vitest run` passes and fails on a wrong section order, an unresolved nav hash, a >4 teaser, or a hero title regression.
      Testes: this IS the test.
- [ ] T26 — Catalog partition & empty-safe tests
      Arquivos: `tests/unit/projectCatalog.test.ts`
      Mudança: Assert the shipped/building `status` partition is mutually exclusive by id, the case-study renderer logic is empty-safe with placeholder prose, and Experience entries carry six fields incl. distinct `businessImpact` and are empty-safe; test the pure filter/getter logic over the locale catalog.
      Cobre: RF-19, RF-24, RF-25, RF-26, RF-29, RF-30
      Acceptance criteria: `vitest run` passes; a duplicated id across shipped/building or a missing `businessImpact` field fails the test; placeholder/partial data does not throw.
      Testes: this IS the test.
- [ ] T27 — Blog schema + RSS handler tests
      Arquivos: `tests/unit/blogFeed.test.ts`
      Mudança: Assert RSS serialization produces valid channel/item XML with absolute `https://werlesson.dev` links + pubDate, and that an article missing a required frontmatter field (incl. `locale`) is excluded/invalid; extract pure serialization/validation helpers from T21/T02 for testability.
      Cobre: RF-34, RF-35
      Acceptance criteria: `vitest run` passes; malformed frontmatter is rejected and the serialized feed contains absolute links and pubDate.
      Testes: this IS the test.
- [ ] T28 — Full validation gate
      Arquivos: (validação apenas — nenhum arquivo de app editado)
      Mudança: Run `eslint .`, `prettier --check .`, `nuxt typecheck`, `vitest run`; manually verify no cliché About copy, no UI-06 anti-patterns, no "Frontend/Full Stack Developer" wording, dark-mode-by-default with no flash, responsive at 360/768/1280, reduced-motion honored, WCAG AA contrast, and Lighthouse > 95 on Performance/Accessibility/Best-Practices/SEO for the landing page; confirm robots.txt/sitemap/RSS discovery resolve.
      Cobre: RF-03, RF-13, RF-44, UI-01, UI-02, UI-03, UI-06, UI-07, RNF-01, RNF-06
      Acceptance criteria: all four command suites pass clean; the manual checklist and a Lighthouse run report each category > 95 with no UI-06/UI-07/cliché violations in new sections.
      Testes: `eslint .` + `prettier --check .` + `nuxt typecheck` + `vitest run` + Lighthouse.
