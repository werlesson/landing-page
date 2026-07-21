# Clarifier answers (v2 — SUPERSEDES v1) — projects-showcase-redesign

This CORRECTS the M-02 and M-03 resolutions applied in SPEC v1.1. Re-resolve to
v1.2. The developer refined two decisions after a deeper code analysis surfaced
hidden costs. Apply all points below; where they conflict with v1.1, v2 wins.

## M-03 — Data model = HYBRID (CORRECTS v1.1 "all to collection")
Do NOT move card metadata to the collection. Card-facing metadata — `id`/`slug`,
`status` (shipped|building), `title`, `image` (thumbnail), `tags` (badges),
`techStack`, `liveUrl`, `repoUrl` — STAYS in the i18n `featuredProjects.projects[]`
catalog. `usePortfolioCatalog()` REMAINS a synchronous, reactive `computed` over
i18n messages; its public shape `{ catalog, shipped, building }` (CT-03), its
de-dup-by-`id`, and the mutual-exclusion guarantee (RF-08) are UNCHANGED and stay
enforced in the composable exactly as today. ONLY the long-form narrative (the 6
blocks below) and the photo `gallery` move to the new `@nuxt/content` `projects`
collection. The detail page joins the two by slug: card meta from
`usePortfolioCatalog` (title/badges/techStack/links) + narrative/gallery from the
collection. RF-07 "migration" therefore moves only narrative+gallery into the
collection — card metadata is NOT migrated. There are currently 0 `building`
projects, so RF-08 is presently vacuous but the guarantee still holds structurally.

## M-02 — Narrative = FRONTMATTER FIELDS (CORRECTS v1.1 "prose in body")
The six narrative blocks — `description`, `problem`, `solution`, `architecture`,
`challenges`, `results` — are authored as OPTIONAL frontmatter string fields
(`z.string().optional()`) on the `projects` collection. The detail page renders each
as a labeled section guarded by `v-if` so an absent block is individually omitted
(preserves RF-03 per-block empty-safety and its per-block test). Migration from the
existing discrete i18n string fields is a mechanical 1:1 field copy. The markdown
body is optional/free-form (unused, or a short overview) — narrative is NOT in the body.

## M-01 — Gallery shape (unchanged from v1)
`gallery: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).default([])`.
`alt` REQUIRED (UI-04). Empty/absent → no gallery block (empty-safe).

## M-04 — Per-locale authoring + query (clarify the deviation)
One markdown file per project per locale: `content/projects/<slug>.pt.md` and
`<slug>.en.md`, each with a required `locale: 'pt' | 'en'` and a shared `slug`
frontmatter field. IMPORTANT: this DEVIATES from the literal blog query — the detail
page resolves by `queryCollection('projects').where('slug','=',slug).where('locale','=',locale).first()`
(slug + active-locale filter), NOT blog's path-only resolution. State this deviation
explicitly in CT-01/CT-02 (the Context's "mirror blog exactly" claim is corrected:
blog gives each locale a distinct slug and never filters by locale; projects share a
slug across locales and DO filter by locale). 404 on miss.

## M-05 — Route literal (unchanged)
`app/pages/projects/[...slug].vue` (catch-all), literal segment `projects`, route
`/projects/<slug>` (EN under `/en/projects/<slug>`), locale-aware via `useLocalePath`.

## Additional resolutions from the analysis
- SLUG = ID: reuse each project's existing `id` value verbatim as its `slug` (already
  URL-safe, e.g. `eu-no-play`). `id` remains the dedup/partition key in the composable;
  `slug === id`. No data transform.
- ORDERING: the card grid preserves the i18n `featuredProjects.projects[]` array order
  (card meta stays in i18n per M-03). No new `order` field is introduced.
- GALLERY AUTHORING IN-SCOPE: adding gallery images/frontmatter to the migrated
  projects IS in scope (it is the feature); adding NEW project entries remains OUT.
  Adjust the Scope "Out" bullet so it excludes only new projects, not gallery content.
- `projects` collection frontmatter (CT-02) final field list: `slug` (req),
  `locale` (req, enum pt|en), plus optional `description`, `problem`, `solution`,
  `architecture`, `challenges`, `results`, and `gallery` (per M-01). Card-facing fields
  (status/title/image/tags/techStack/liveUrl/repoUrl) are NOT in the collection — they
  stay in i18n. Detail page may read title/badges from i18n by slug.
- OG image for /projects/[slug]: OUT of scope for this feature (blog uses
  `defineOgImageComponent`; project OG parity is deferred, not required here).
