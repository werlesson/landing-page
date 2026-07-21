// Pure article frontmatter validation (RF-35).
// Mirrors the required-field contract of the `blog` collection schema in
// content.config.ts, kept free of @nuxt/content / Nitro imports so it is
// unit-testable in the `node` Vitest environment (tests/unit/blogFeed.test.ts).

/** Locales an article may be authored in (single-locale-per-article, RF-35). */
export const SUPPORTED_LOCALES = ['pt', 'en'] as const

/** Frontmatter fields an article MUST declare to be publishable (RF-35). */
export const REQUIRED_ARTICLE_FIELDS = ['title', 'description', 'date', 'slug', 'locale'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export interface ArticleValidation {
  valid: boolean
  /** Names of the required fields that are missing or malformed. */
  errors: string[]
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isValidDate(value: unknown): boolean {
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return !Number.isNaN(new Date(value).getTime())
  }
  return false
}

function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/**
 * Validate an article's frontmatter against the required-field contract.
 * An article missing any required field — including `locale` — or carrying an
 * unsupported `locale` / unparseable `date` is invalid and MUST be excluded
 * from the index, sitemap and feed (RF-35). Never throws on malformed input.
 */
export function validateArticleFrontmatter(data: unknown): ArticleValidation {
  const o = data && typeof data === 'object' ? (data as Record<string, unknown>) : {}
  const errors: string[] = []

  if (!isString(o.title)) errors.push('title')
  if (!isString(o.description)) errors.push('description')
  if (!isValidDate(o.date)) errors.push('date')
  if (!isString(o.slug)) errors.push('slug')
  if (!isSupportedLocale(o.locale)) errors.push('locale')

  return { valid: errors.length === 0, errors }
}

/** Convenience predicate: true when the frontmatter passes validation (RF-35). */
export function isValidArticle(data: unknown): boolean {
  return validateArticleFrontmatter(data).valid
}
