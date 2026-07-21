# Resume Bullets — Google-style (Action + Context + Result)

Author filter: `werlessono@gmail.com`  
Project: Cars2You Condition Report / App Vistoria (Expo React Native)  
Rule followed: bullets use **real metrics**; estimates are labeled.

---

## Primary bullets (comprováveis)

- **Owned** end-to-end development of the Cars2You vehicle inspection mobile app, authoring **57 of 61** repository commits (**93.4%** of project history) from Dec 2025 to Jul 2026.

- **Delivered** **40** feature commits across **27** tracked work items (`fase-0…8`, `ui-1…18`), modernizing field inspection workflows for light, motorcycle, and heavy vehicles.

- **Migrated** the offline inspection pipeline from a legacy queue model to **SQLite** with a network-aware sync worker, exponential backoff, draft autosave, and **401 session-expiry** recovery.

- **Built** a **31-component** mobile design system and redesigned core operator surfaces (login, home, 7-step inspection flow, pending queue, profile), including dark/light theming and accessibility/permission rationales.

- **Implemented** dual production inspection flows (`condition_report` and `default`) with adapter-based multipart upload, remote CDN media reuse, and idempotent retry-safe submission.

- **Hardened** media capture for field use—resize/compression, signature pad, optional biometric login, and Android pending-camera recovery—aligned to product spec across dedicated media services.

- **Established** engineering quality gates with GitHub Actions CI (`lint`, `typecheck`, tire-geometry validation), Husky hooks, and **7** automated Jest test files covering core services/utils.

- **Shipped** **4** merged Bitbucket pull requests enabling default inspection type, photo-string fixes, and license-plate OCR in production (`app-vistoria`).

- **Contributed** **+32.5k / −8.5k** lines of application code across **225** unique source files (excluding assets, coverage, and lockfile noise).

- **Concentrated** delivery into **12** unique contribution days, with the majority of production capability landed in a focused June 2026 modernization/redesign sprint (**52** commits that month).

---

## Supporting bullets (ainda comprováveis, mais específicos)

- **Designed** an interactive SVG tire diagram and vehicle-type-aware media slot configuration to encode inspection business rules in reusable config modules.

- **Integrated** Cloudflare API access with a dedicated Elastic Beanstalk upload client to bypass ~100MB proxy limits for heavy inspection payloads.

- **Added** VehicleInfoCard with clipboard copy for chassis/RENAVAM and plate OCR via ML Kit, reducing manual entry friction at inspection start.

- **Documented** architecture decisions and a release smoke-test checklist to make offline-first behavior and operational verification repeatable.

---

## Optional bullets marked as estimates

- **[Estimate]** Replaced a legacy React Native bare + Realm inspection app with an Expo SDK 54 offline-first architecture, reducing platform friction for Expo Go/dev builds and simplifying schema evolution via SQLite migrations (v1→v4).

- **[Estimate]** Delivered approximately **15–25** distinct product capabilities (not 40)—mapping feature commits and `fase`/`ui` tags into shippable user-facing outcomes.

- **[Estimate]** Improved field reliability for offline inspectors through local-first save + automatic sync; quantitative incident/uptime impact not measurable from Git alone.

---

## One-line positioning (LinkedIn / summary)

> Mobile engineer who rebuilt Cars2You’s vehicle inspection app in Expo/React Native—offline-first SQLite sync, dual inspection flows, and a 31-component design system—authoring 93% of the codebase across 225+ source files.

---

## What NOT to claim

- Do not claim “XXX Jira tickets” — **0** `QR-/TASK-` keys found.  
- Do not equate **40 feat commits** with **40 product features**.  
- Do not use raw **+73k lines** without noting assets/coverage inflation; prefer **+32.5k code**.  
- Do not claim multi-repo career breadth from this folder — report scope is **this repository only**.
