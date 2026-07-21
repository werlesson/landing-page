# Projects — individual summaries

---

## 1. `front` — Dealersclub ERP / dealer-operations SPA

**Description.** The primary internal web application for dealer operations: the day-to-day control surface for logistics, commercial, financial, courtyard, inspection and documentation workflows of a vehicle-dealer network. A large Nuxt 2 / Vue 2 single-page application with a modular page-per-domain structure.

**My participation.** Principal front-end contributor — the top author of the repository by a wide margin. I built and maintained feature modules across nearly the entire domain surface over ~4 years, from initial buildout (2022, peak activity) through long-tail maintenance and modernization (2023–2026).

**Principal technologies.** Nuxt 2, Vue 2, TypeScript (`vue-property-decorator`), Vuex, Bootstrap-Vue, PrimeVue, ApexCharts/ECharts (dashboards), Leaflet & Google Maps (geolocation), CKEditor/Quill, FullCalendar, vue-formulate, sweetalert2.

**Principal deliverables (inferred from module ownership).**
- Logistics, commercial, financial ("financeiro" + read-only variant) and courtyard/yard modules.
- Document/dispatch ("despacho") workflows — the single most-edited feature (`pages/docs/dispatch`).
- Reusable search components and data tables shared across screens.
- Settings & user administration (roles/permissions screens).
- Middleware/routing overhaul (a single 2024 refactor touched ~25k lines).

**Metrics.** 710 commits · 294 unique days · +81,084 / −50,797 lines · 409 unique files · 2022-04-18 → 2026-03-30.

---

## 2. `thirdparty` — Partner / third-party operations app

**Description.** A separate Nuxt 2 + Vuetify PWA used by external partners and field roles — advisory (assessoria), vehicle conditional reports (laudos), inspection, gatehouse (portaria/doorman) and dispatch flows. Built for on-site/mobile use (PWA, digital signature capture, photo input).

**My participation.** Lead/primary front-end contributor (top author). Delivered the partner-facing forms and reporting flows and maintained them across 2022–2026.

**Principal technologies.** Nuxt 2, Vue 2 + `@vue/composition-api`, Vuetify, ApexCharts, `v-perfect-signature`/`vue-signature` (digital signatures), `vue-picture-input` (photo capture), PWA.

**Principal deliverables (inferred).**
- Conditional-report ("laudo") multi-step wizard — the most-edited area (`pages/conditional-report`).
- Advisory dashboard and vehicle-advisory screens (dashboard stats cards refactor, 2026).
- Reusable `Forms/` component set (e.g. `FormRegisterRemoval`).
- Authentication/session services (`LoginService`) and route guards (`middleware/authenticated`).

**Metrics.** 139 commits · 84 unique days · +13,703 / −10,200 lines · 77 unique files · 2022-04-19 → 2026-03-26.

---

## 3. `api` — Backend REST API (Laravel 10)

**Description.** The PHP/Laravel backend serving the platform: invoicing, document generation (PDF/QR), client communications, and data import/export. Uses a Repository pattern, JWT auth, and multiple third-party integrations.

**My participation.** Contributing backend developer (2025–2026), focused on invoices, document/email flows and integrations. This is where my full-stack range shows: I moved from front-end into Laravel feature work.

**Principal technologies.** Laravel 10, PHP 8.2, `tymon/jwt-auth`, `maatwebsite/excel`, `barryvdh/laravel-dompdf` + `laravel-pdfmerger`, `endroid/qr-code`, `intervention/image`, `guzzle`, `league/flysystem-aws-s3`, `openai-php/laravel`, Sentry, doctrine/dbal + migrations.

**Principal deliverables (inferred).**
- Invoices repository/feature (`InvoicesRepository` — most-edited file) including contact-info and value-formatting fixes.
- Advisory vehicle-removal repository, client email flows (`SendEmailsClients`), PDF merge service.
- Database migrations (invoice detail requirements, etc.).

**Metrics.** 31 commits · 21 unique days · +3,021 / −1,123 lines · 43 unique files · 2025-04-30 → 2026-05-05.

---

## 4. `showroom` — Public vehicle showroom (SSR/SEO)

**Description.** The public-facing vehicle catalog — a Nuxt 2 + Tailwind CSS site built for server-side rendering / static generation with SEO and PWA support (carousels, lightbox, PDF export of listings).

**My participation.** Contributor during initial build (2022) with a follow-up feature in 2024 ("electric" vehicles on showroom). Lower volume but includes a large initial scaffold (+11k lines).

**Principal technologies.** Nuxt 2, Tailwind CSS, Splide/Swiper (carousels), `vue-cool-lightbox`, `html2pdf.js`, PWA.

**Principal deliverables (inferred).** Showroom index/listing pages, attribute display components, carousel, and the electric-vehicle listing feature.

**Metrics.** 11 commits · 7 unique days · +11,068 / −688 lines · 11 unique files · 2022-06-07 → 2024-02-01.

---

### Not counted
- `start-docker-dc` — infrastructure/docker-compose repo; **0 commits** authored by you.
