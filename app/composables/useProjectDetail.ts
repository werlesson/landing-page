import type { CaseStudy } from '~/types/portfolio'

// Pure detail-page helpers (RF-03, RF-04, RF-05, RF-10).
// These functions carry the JOIN + empty-safe rendering logic for the
// `/projects/[slug]` detail route and are deliberately kept free of any Nuxt
// runtime so they unit-test in the `node` Vitest environment — the same pattern
// as `usePortfolioCatalog`'s exported normalizers and `server/utils/blog.ts`.
// This module does NOT touch `usePortfolioCatalog()` (CT-03 preserved).

/** Locales a project document may be authored in (mirrors the T02 schema). */
export const SUPPORTED_LOCALES = ['pt', 'en'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

/**
 * The six narrative blocks, in the RF-03 render order. Each is an OPTIONAL
 * frontmatter string field on the `projects` collection document.
 */
export const NARRATIVE_BLOCK_KEYS = [
  'description',
  'problem',
  'solution',
  'architecture',
  'challenges',
  'results',
] as const

export type NarrativeBlockKey = (typeof NARRATIVE_BLOCK_KEYS)[number]

/** A single resolved narrative block, ready to render as a labeled section. */
export interface NarrativeBlock {
  key: NarrativeBlockKey
  value: string
}

/** A normalized gallery image (M-01). `alt` is required to satisfy UI-04. */
export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

/** Frontmatter validation result, mirroring `server/utils/blog.ts`. */
export interface ProjectValidation {
  valid: boolean
  /** Names of the required fields that are missing or malformed. */
  errors: string[]
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/**
 * Select only the present/non-empty narrative blocks from a project document,
 * in the canonical RF-03 order. Empty-safe per-block: a block whose frontmatter
 * value is absent or blank is omitted so the renderer emits no empty section.
 */
export function selectNarrativeBlocks(doc: unknown): NarrativeBlock[] {
  const o = doc && typeof doc === 'object' ? (doc as Record<string, unknown>) : {}
  const blocks: NarrativeBlock[] = []
  for (const key of NARRATIVE_BLOCK_KEYS) {
    const value = o[key]
    if (isNonEmptyString(value)) {
      blocks.push({ key, value })
    }
  }
  return blocks
}

/**
 * Coerce a raw gallery frontmatter value into typed `GalleryImage[]`. Entries
 * missing a non-empty `src` or `alt` are dropped (UI-04 requires `alt`); a
 * missing/empty array yields `[]` so the detail page renders no gallery DOM
 * node (RF-04).
 */
export function normalizeGallery(raw: unknown): GalleryImage[] {
  if (!Array.isArray(raw)) {
    return []
  }
  const out: GalleryImage[] = []
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') {
      continue
    }
    const o = entry as Record<string, unknown>
    if (!isNonEmptyString(o.src) || !isNonEmptyString(o.alt)) {
      continue
    }
    const image: GalleryImage = { src: o.src, alt: o.alt }
    if (isNonEmptyString(o.caption)) {
      image.caption = o.caption
    }
    out.push(image)
  }
  return out
}

/**
 * Find the card metadata for a project by its slug (the JOIN key: slug === id).
 * Returns `undefined` for an unknown slug, which the detail page uses to drive
 * the 404 path when no card meta backs the requested slug (RF-10).
 */
export function findCaseStudyBySlug(
  catalog: readonly CaseStudy[] | undefined | null,
  slug: unknown,
): CaseStudy | undefined {
  if (!Array.isArray(catalog) || !isNonEmptyString(slug)) {
    return undefined
  }
  return catalog.find((study) => study.id === slug)
}

/**
 * Validate a project document's frontmatter against the required-field contract
 * of the `projects` collection schema (T02): `slug` and `locale` are required,
 * and `locale` must be a supported locale. Never throws on malformed input.
 */
export function validateProjectFrontmatter(data: unknown): ProjectValidation {
  const o = data && typeof data === 'object' ? (data as Record<string, unknown>) : {}
  const errors: string[] = []

  if (!isNonEmptyString(o.slug)) errors.push('slug')
  if (!isSupportedLocale(o.locale)) errors.push('locale')

  return { valid: errors.length === 0, errors }
}
