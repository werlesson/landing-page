---
slug: csv-view
locale: en
description: 'A 100% client-side CSV explorer: open, filter, analyze and edit huge files right in the browser — no upload, no server, nothing to install. Your data never leaves your machine.'
problem: 'Exploring and manipulating large CSVs usually means installing software or uploading sensitive data to a third-party server — a privacy risk — and even then the UI freezes while processing millions of rows.'
solution: 'A fully in-browser architecture: streaming parsing via a Web Worker in 1 MB chunks, virtualized table rendering to scroll millions of rows without jank, and session persistence in IndexedDB to reopen a file exactly where you left off.'
architecture: 'The domain logic (parsing, statistics, filters, diff and export) lives isolated in app/services, with no Vue dependency and 100% testable in isolation. Layers are split into pages (routes), components (UI), composables (reactive state) and services (pure functions). IndexedDB stores the file content and session state — search, filters, sorting and column layout.'
challenges: 'Keeping the UI fluid with million-row files: the streaming parser avoids blocking the main thread, virtualized scrolling keeps the table responsive, and a single chronological undo/redo stack unifies cell edits and column reordering.'
results: 'Handles 2M+ rows with 0 KB sent over the network — zero-backend, privacy by default. Ships automatic delimiter and BOM detection, per-column statistics, type-aware combinable filters, inline editing with undo/redo, file comparison (diff) and export to CSV, JSON, Markdown, SQL and XLSX.'
gallery:
  - src: /projects/csv-view.png
    alt: CSV View interface showing a virtualized table with filters and per-column statistics
    caption: Client-side exploration of million-row CSV files
---
