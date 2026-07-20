# Clarifier answers — brand-repositioning-redesign

Developer decisions for the analyze-phase questions. Apply these in-place, resolve
the corresponding `[NEEDS CLARIFICATION]` markers, and increment the SPEC version.

## Q-01 (RF-19/RF-29/RF-30) — Featured vs Currently Building overlap

**Decision:** Single project catalog with a `status` enum (e.g. `shipped` | `building`).
A project renders in exactly one section based on status. Reassign the 3 overlaps
(Camaris, CSV View, Chalet SaaS) to one side so Currently Building stays distinct per
RF-30. De-dupe by project id. Case-study schema (RF-23) gains the `status` field.

## Q-02 (RF-06/RF-07) — Hero typewriter

**Decision:** KEEP the typewriter (preserve the praised asset). Static title
"Senior Software Engineer" (RF-06) + static subtitle (RF-07); repoint the typewriter
to cycle capability phrases beneath (e.g. SaaS, Product Engineering, Frontend
Architecture, Laravel, Performance, System Design). Replace locale keys role1/2/3
with the new capability set; keep the typewriter state machine + its unit test.

## Q-03 (RF-01/RF-32/RF-33/RF-05) — Blog shape

**Decision:** Both. On-page BlogSection = teaser of latest 3–4 articles (nav "Blog"
anchors to this on-page section id, satisfying RF-05). Full index at `/blog`; each
article at `/blog/[slug]`. Sitemap (RF-43) includes /blog + each article route;
code-splitting (RF-03) applies to the routed pages.

## Q-07 / M-05 (RF-14) — Metrics, all three surfaces

**Decision:** Canonicalize **6+ years / 20+ projects** across Hero counters
(`hero.statTargets`), About stats (`about.stats`), and the Impact section — in BOTH
locales. Resolve M-05.

## Q-09 / M-01 (RF-41/43/44/45) — Canonical origin

**Decision:** `https://werlesson.dev` is authoritative (keep `nuxt.config.ts` site.url
and definePerson fallback). All OG/canonical/sitemap/robots/RSS absolute URLs use this
origin. Confirmed input's werlesson.vercel.app is a deploy alias that redirects.
Resolve M-01.

## Q-05 (RF-41) — OG image mechanism

**Decision:** Use `nuxt-og-image` to generate the landing OG image + per-article
BlogPosting OG images from templates. Twitter summary-large-image card. (New dep.)

## Q-04 (RF-31/RF-35/RF-43) — Blog localization

**Decision:** Single-locale per article. Each article authored in one locale; the
index filters by active locale; the sitemap emits only the locale URL that exists.
Nuxt Content `locale` frontmatter drives this. Article bodies are NOT subject to the
`i18nKeys.test.ts` locale-parity gate (that gate stays scoped to `locales/*.json`).

## Q-06 (RF-27/RF-28/RF-03) — Tech Stack content-driven

**Decision:** Tech names stay hardcoded as brand proper-nouns (ESLint brand-name
exception). Additive change to StackSection only: add the 5th "Tools" group and
relabel `infra` → Infrastructure so the five categories are Frontend / Backend /
Infrastructure / Database / Tools. Treat RF-27 "content-driven" as satisfied by the
group config; document the proper-noun exception in the SPEC.

## Q-08 (RF-25) — Experience empty-safe

**Decision:** Add an AC to RF-25 mirroring RF-24: Experience renders safely with
placeholder entries; empty/partial entries do not throw; real entries remain tracked
under M-04 (deferred copy).

## Contact email

**Decision:** Correct recruiter-facing email is `werlessono@gmail.com`. Apply to the
Hero email link, Contact section, and all `mailto:` CTAs (RF-11/RF-38) in both locales.

## M-06 (RF-34/RF-45) — RSS

**Decision:** Site-level feed at `/rss.xml` via a Nitro route handler querying Nuxt
Content. Auto-discovery `<link rel="alternate" type="application/rss+xml">` points to
`/rss.xml`. Resolve M-06.

---

## Markers status after resolution

- Resolve: M-01, M-05, M-06 (decisions above).
- Keep as intentional copy-TBD (non-blocking): M-02 (case-study prose), M-03 (article
  bodies), M-04 (real Experience entries).
