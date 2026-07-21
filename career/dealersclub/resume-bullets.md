# Resume bullets & impact statements — Werlesson Vieira

Format: **Action + Context + Result**, backed by real git metrics. Numbers in the "provable" section are measured directly from history; the "estimated" section is clearly labeled.

---

## Google-style resume bullets

- **Built and maintained** the primary dealer-operations ERP (Nuxt 2 / Vue 2 / TypeScript) as its **top contributor**, authoring **710 commits across 294 active days** over ~4 years and delivering ~15 business-domain modules (logistics, finance, commercial, courtyard, inspection, dispatch).
- **Delivered ~696 feature commits and ~172 fixes** across 4 production applications, touching **540 unique files** and modifying **~171,000 lines** of production code with sustained activity from 2022 to 2026.
- **Led the front-end** for two customer- and partner-facing applications, engineering a reusable component library (search, data tables, multi-step form wizards, digital-signature capture) reused across dozens of screens.
- **Expanded from front-end to full-stack**, shipping backend features in a Laravel 10 / PHP 8.2 API — invoicing, PDF/QR document generation, Excel import/export, and integrations with AWS S3, OpenAI and Sentry.
- **Executed a platform-wide middleware/routing refactor** (single change reworking ~25,000 lines) to modernize the ERP's request and authorization flow.
- **Built the public vehicle showroom** (Nuxt SSR + Tailwind, SEO + PWA), from initial scaffold through feature growth, to power the company's public catalog.
- **Implemented authentication and security flows** — JWT auth, OTP/2FA, route guards and input validation — across the front-end apps and the API (~47 security/auth-related commits).
- **Shipped analytics dashboards** using ApexCharts/ECharts/Chart.js for advisory and operational reporting, including a 2026 advisory-dashboard refactor.

---

## "Impactos que posso comprovar" (Provable — measured from git)

- Contributed to **4 production applications** over **4.1 years** (2022–2026).
- Authored **891 non-merge commits** across **406 unique contribution days**.
- **Top author** of the two main front-end repositories (`front`, `thirdparty`).
- Added **108,876 lines** and removed **62,808 lines** (**171,684 total** modified).
- Touched **540 unique files**.
- ~**696 feature** commits and ~**172 fix/hotfix** commits (keyword-based).
- Worked across **~15 business modules** and **4 application types** (ERP SPA, partner PWA, public SSR site, Laravel API).
- Hands-on with **Nuxt 2, Vue 2, TypeScript, Laravel 10, PHP 8.2** plus AWS S3, OpenAI, Sentry, Redis, Docker/CI.

## "Impactos estimados" (Estimated — clearly labeled)

> These are **estimates/inferences**, not directly measured. Use with judgment.

- **~100–200 discrete production features delivered** *(estimate — inferred from ~696 feature-tagged commits, deduplicated for iterative commits on the same feature).*
- **~20–40 reusable UI components built** *(estimate — inferred from `components/` structure across front + thirdparty).*
- **~15 business domains supported end-to-end** *(estimate — inferred from page-module folders; some modules were shared with teammates).*
- **Reduced maintenance effort / improved reliability** via refactors and ~172 fixes *(estimate — no defect-rate or performance telemetry available in git to quantify).*
- **Improved performance / load times** *(NOT claimed — no performance metrics exist in the repositories to support this; do not include without data).*

---

### Honesty notes for the reader
- Commit-type counts are **keyword heuristics** and overlap; treat them as emphasis, not exact tallies.
- **"Unique tasks delivered" is not measurable** here — the team did not use ticket IDs in commits (only one `DES-1583` appears). Feature-commit count is the substitute proxy.
- "Top contributor" is verified via `git shortlog` (you are #1 by commit count in `front`, `thirdparty`, `showroom`).
- Database engine (MySQL) and some integrations are **inferred** from dependencies, not confirmed from runtime config.
