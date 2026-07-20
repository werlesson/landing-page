---
title: Client-Side CSV — Privacy Without a Backend
description: Why CSV View keeps million-row files in the browser — Web Workers, virtualization and IndexedDB.
summary: How a zero-backend CSV explorer turns privacy into an architecture choice, not a policy PDF.
date: 2026-07-01
slug: client-side-csv-privacy
tags:
  - Privacy
  - Web Workers
  - Nuxt
locale: en
draft: false
---

# Client-Side CSV — Privacy Without a Backend

Most “CSV tools in the browser” still upload your file to someone else’s
server. That is convenient for the vendor. It is a privacy risk for anyone
working with payroll, healthcare exports or customer data.

**CSV View** takes the opposite bet: the file never leaves the machine. No
upload, no account, no backend for the core workflow — and still open,
filter, edit and export multi-million-row sheets without freezing the UI.

## Privacy is an architecture decision

If the product promise is “your data stays local”, you cannot bolt that on
later. The architecture has to refuse the easy path:

- Parse on the client
- Persist session state locally (IndexedDB)
- Export from the client
- Keep domain logic free of server round-trips

Zero KB on the network is not a marketing line — it is the acceptance test.

## Keep the main thread free

Million-row CSVs will punish a naive main-thread parse. The approach that
worked:

1. **Streaming parse in a Web Worker** — chunks around 1 MB so the UI stays
   interactive while rows accumulate.
2. **Virtualized table rendering** — only mount what is visible; scrolling
   must not allocate the whole grid.
3. **Pure services** — parsing, stats, filters, diff and export live outside
   Vue so they are unit-testable and movable.

## Session without a server

IndexedDB stores file content and UI session (search, filters, sort, column
layout). Closing the tab should not mean losing an hour of exploration.

That same local-first model makes undo/redo coherent: one chronological stack
for cell edits and column moves, without syncing a remote document model.

## What you gain — and what you trade

You gain privacy by default, offline-friendly workflows and a deploy surface
that is essentially static hosting. You trade away multi-device sync and
collaborative editing — features that need a backend on purpose.

For a tool whose primary job is “open a sensitive file and understand it”,
that trade is the product.
