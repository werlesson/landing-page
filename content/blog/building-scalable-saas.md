---
title: Building Scalable SaaS Products
description: How I approach architecture, delivery and iteration when shipping SaaS products from scratch.
summary: A short look at the engineering decisions behind scalable SaaS — from the first commit to production.
date: 2026-06-15
slug: building-scalable-saas
tags:
  - SaaS
  - Architecture
  - Nuxt
locale: en
draft: false
---

# Building Scalable SaaS Products

Scaling a SaaS product is less about a single silver bullet and more about a
series of deliberate, boring decisions made early — and revisited every time
the product earns new customers.

Shipping something like **Eu no Play** taught me the same lesson in a sharper
form: when hardware, media pipelines and multi-tenant branding share one
product surface, architecture is not a document — it is how you stay online
when a court is full on Saturday.

## Start with the business boundary

Before choosing a framework, define what a tenant owns. In arena SaaS that
means branding, partners, courts and media delivery rules. In a simpler B2B
tool it might mean billing account, roles and data isolation.

If the tenant boundary is fuzzy, every later feature becomes a special case.
If it is crisp, you can grow features without rewriting access control every
sprint.

## Prefer boring seams over clever monoliths

I like a stack that stays boring on purpose:

- Vue / Nuxt (or Inertia) for the product UI
- Laravel (or a similarly explicit backend) for auth, policies and APIs
- Queues for anything that should not block a request — video processing,
  emails, heavy imports
- Postgres/MySQL with queries you can explain

The goal is not microservices on day one. The goal is seams you can extract
later without stopping the business.

## Ship the path that creates value first

For Eu no Play the value path is short and brutal: capture → brand → deliver.
Everything else (live streaming, richer admin, more sports formats) sits
behind that loop working reliably in production.

For other SaaS products the equivalent is usually: sign up → core workflow →
paid outcome. If that path is slow or fragile, polish elsewhere is theatre.

## Iterate with production feedback

Scalability is not only traffic. It is also operational scale: installs,
support, and non-technical staff using the product every day. Designing for
that early — clear defaults, white-label constraints, safe failure modes —
beats premature sharding every time.

Build for the load you will have, then measure. Architecture that serves a
business outcome compounds; architecture that serves a diagram does not.
