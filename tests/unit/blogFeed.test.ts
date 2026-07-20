import { describe, it, expect } from 'vitest'
import { buildRssFeed, escapeXml } from '../../server/utils/rss'

/**
 * RSS feed serialization gate (RF-34). Covers the pure XML builder behind the
 * /rss.xml Nitro route: valid channel/item shape, absolute links on the
 * canonical origin, pubDate emission and XML escaping.
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
