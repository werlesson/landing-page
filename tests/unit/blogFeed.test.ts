import { describe, it, expect } from 'vitest'
import { buildRssFeed, escapeXml } from '../../server/utils/rss'
import {
  validateArticleFrontmatter,
  isValidArticle,
  REQUIRED_ARTICLE_FIELDS,
} from '../../server/utils/blog'

/**
 * Blog schema + RSS handler gate (RF-34, RF-35). Covers the pure serialization
 * builder behind the /rss.xml Nitro route (valid channel/item shape, absolute
 * links on the canonical origin, pubDate emission, XML escaping) and the pure
 * frontmatter validator that excludes malformed articles from the index,
 * sitemap and feed.
 */
const SITE_URL = 'https://werlesson.dev'

const sampleChannel = {
  title: 'Werlesson — Blog',
  link: `${SITE_URL}/blog`,
  description: 'Notes on engineering, architecture and building products.',
  items: [
    {
      title: 'Building Scalable SaaS Products',
      link: `${SITE_URL}/blog/building-scalable-saas`,
      description: 'A short look at the engineering decisions behind scalable SaaS.',
      pubDate: new Date('2026-06-15T00:00:00Z'),
    },
    {
      title: 'Arquitetura de Frontend em Escala',
      link: `${SITE_URL}/blog/arquitetura-frontend-em-escala`,
      description: 'Um panorama rápido das decisões de engenharia.',
      pubDate: '2026-05-02',
    },
  ],
}

describe('escapeXml', () => {
  it('escapes the five XML predefined entities', () => {
    expect(escapeXml(`<a href="x" & 'y'>`)).toBe('&lt;a href=&quot;x&quot; &amp; &apos;y&apos;&gt;')
  })
})

describe('buildRssFeed', () => {
  const xml = buildRssFeed(sampleChannel)

  it('emits a valid RSS 2.0 document with a channel', () => {
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<rss version="2.0">')
    expect(xml).toContain('<channel>')
    expect(xml).toContain('</channel>')
    expect(xml.trimEnd().endsWith('</rss>')).toBe(true)
  })

  it('renders channel metadata', () => {
    expect(xml).toContain('<title>Werlesson — Blog</title>')
    expect(xml).toContain(`<link>${SITE_URL}/blog</link>`)
    expect(xml).toContain(
      '<description>Notes on engineering, architecture and building products.</description>',
    )
  })

  it('lists one <item> per article', () => {
    const itemCount = (xml.match(/<item>/g) ?? []).length
    expect(itemCount).toBe(sampleChannel.items.length)
  })

  it('each item carries title, absolute link and pubDate', () => {
    expect(xml).toContain('<title>Building Scalable SaaS Products</title>')
    expect(xml).toContain(`<link>${SITE_URL}/blog/building-scalable-saas</link>`)
    expect(xml).toContain('<pubDate>Mon, 15 Jun 2026 00:00:00 GMT</pubDate>')
  })

  it('normalizes string dates into RFC-822 pubDate', () => {
    expect(xml).toContain('<pubDate>Sat, 02 May 2026 00:00:00 GMT</pubDate>')
  })

  it('every item link is absolute on the canonical origin', () => {
    const links = [...xml.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1])
    for (const link of links) {
      expect(link?.startsWith(SITE_URL)).toBe(true)
    }
  })

  it('escapes special characters in titles', () => {
    const feed = buildRssFeed({
      ...sampleChannel,
      items: [{ title: 'Vue & Nuxt <3', link: `${SITE_URL}/blog/x` }],
    })
    expect(feed).toContain('<title>Vue &amp; Nuxt &lt;3</title>')
  })

  it('omits pubDate for invalid dates without throwing', () => {
    const feed = buildRssFeed({
      ...sampleChannel,
      items: [{ title: 'No date', link: `${SITE_URL}/blog/y`, pubDate: 'not-a-date' }],
    })
    expect(feed).not.toContain('<pubDate>')
    expect(feed).toContain('<title>No date</title>')
  })

  it('renders an empty channel with no items', () => {
    const feed = buildRssFeed({ ...sampleChannel, items: [] })
    expect((feed.match(/<item>/g) ?? []).length).toBe(0)
    expect(feed).toContain('<channel>')
  })
})

/**
 * Article frontmatter validation (RF-35). Mirrors the required-field contract
 * of the `blog` collection schema (content.config.ts). An article missing any
 * required field — including `locale` — is invalid and excluded.
 */
const validFrontmatter = {
  title: 'Building Scalable SaaS Products',
  description: 'How I approach architecture, delivery and iteration.',
  summary: 'A short look at the engineering decisions behind scalable SaaS.',
  date: '2026-06-15',
  slug: 'building-scalable-saas',
  tags: ['SaaS', 'Architecture'],
  locale: 'en',
  draft: false,
}

describe('validateArticleFrontmatter', () => {
  it('accepts a complete, well-formed article', () => {
    const result = validateArticleFrontmatter(validFrontmatter)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('accepts a Date instance for the publication date', () => {
    expect(isValidArticle({ ...validFrontmatter, date: new Date('2026-06-15') })).toBe(true)
  })

  it('rejects an article missing the required locale field', () => {
    const { locale, ...withoutLocale } = validFrontmatter
    void locale
    const result = validateArticleFrontmatter(withoutLocale)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('locale')
  })

  it('rejects an unsupported locale value', () => {
    const result = validateArticleFrontmatter({ ...validFrontmatter, locale: 'es' })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('locale')
  })

  it('rejects each individually missing required field', () => {
    for (const field of REQUIRED_ARTICLE_FIELDS) {
      const partial = Object.fromEntries(
        Object.entries(validFrontmatter).filter(([key]) => key !== field),
      )
      const result = validateArticleFrontmatter(partial)
      expect(result.valid, `missing ${field} should be invalid`).toBe(false)
      expect(result.errors).toContain(field)
    }
  })

  it('rejects an unparseable publication date', () => {
    const result = validateArticleFrontmatter({ ...validFrontmatter, date: 'not-a-date' })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('date')
  })

  it('does not throw on null / non-object input', () => {
    expect(() => validateArticleFrontmatter(null)).not.toThrow()
    expect(validateArticleFrontmatter(null).valid).toBe(false)
    expect(isValidArticle(undefined)).toBe(false)
    expect(isValidArticle('nope')).toBe(false)
  })

  it('treats optional fields (summary, tags, draft) as non-required', () => {
    const minimal = {
      title: validFrontmatter.title,
      description: validFrontmatter.description,
      date: validFrontmatter.date,
      slug: validFrontmatter.slug,
      locale: validFrontmatter.locale,
    }
    expect(isValidArticle(minimal)).toBe(true)
  })
})
