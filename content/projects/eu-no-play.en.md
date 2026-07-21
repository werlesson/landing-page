---
slug: eu-no-play
locale: en
description: 'A B2B SaaS platform for sports arenas: automatic highlight capture, white-label player delivery, and sponsorship inventory baked into every clip — built from scratch and live with real customers.'
problem: 'Arena owners want sticky player experiences and new sponsorship revenue, but highlight capture usually depends on a dedicated operator, manual editing, and slow delivery — so most venues never productize video at all.'
solution: "A physical button plus dedicated camera kit records the last 25 seconds on demand, processes the clip with the arena's brand and partners, and pushes it to a white-label app on the player's phone in under a minute — without changing day-to-day court operations."
architecture: 'Edge capture (Raspberry Pi + IP cameras) triggers a processing pipeline that applies arena/sponsor branding, then delivers clips through a multi-tenant white-label app. Backend APIs orchestrate tenants, media processing and delivery; the commercial site and product UX sit on a modern Vue-based stack.'
challenges: 'Coupling hardware reliability with software SLAs: low-latency capture on the court, consistent branding across tenants, and an install path that works without renovating the venue — while keeping the product operable by non-technical arena staff.'
results: 'Live across 3 partner venues (5 courts), with 987 registered users and 50+ videos generated per day — around 1,700 clips already saved by players to their accounts. 17 brands advertise inside the videos, turning every replay into sponsorship inventory. From play to downloadable replay in under a minute, with no dedicated camera operator.'
gallery:
  - src: /projects/eu-no-play.png
    alt: Eu no Play platform dashboard showing sports arena highlight capture
    caption: White-label delivery of branded arena highlights
---
