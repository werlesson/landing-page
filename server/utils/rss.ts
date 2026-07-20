// Pure RSS 2.0 serialization helpers (RF-34).
// Kept free of Nitro/@nuxt/content imports so the XML shape is unit-testable in
// the `node` Vitest environment (tests/unit/blogFeed.test.ts).

export interface RssItem {
  title: string
  link: string
  description?: string
  pubDate?: string | Date
  guid?: string
}

export interface RssChannel {
  title: string
  link: string
  description: string
  language?: string
  items: RssItem[]
}

/** Escape the five XML predefined entities so values are safe inside markup. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toPubDate(value: string | Date): string | null {
  const d = value instanceof Date ? value : new Date(value)
  return Number.isNaN(d.getTime()) ? null : d.toUTCString()
}

function serializeItem(item: RssItem): string {
  const guid = item.guid ?? item.link
  const parts = [
    `<title>${escapeXml(item.title)}</title>`,
    `<link>${escapeXml(item.link)}</link>`,
    `<guid isPermaLink="true">${escapeXml(guid)}</guid>`,
  ]
  if (item.description) {
    parts.push(`<description>${escapeXml(item.description)}</description>`)
  }
  if (item.pubDate !== undefined) {
    const pubDate = toPubDate(item.pubDate)
    if (pubDate) {
      parts.push(`<pubDate>${pubDate}</pubDate>`)
    }
  }
  return `    <item>\n      ${parts.join('\n      ')}\n    </item>`
}

/** Build a valid RSS 2.0 document from a channel definition. */
export function buildRssFeed(channel: RssChannel): string {
  const head = [
    `<title>${escapeXml(channel.title)}</title>`,
    `<link>${escapeXml(channel.link)}</link>`,
    `<description>${escapeXml(channel.description)}</description>`,
  ]
  if (channel.language) {
    head.push(`<language>${escapeXml(channel.language)}</language>`)
  }
  const items = channel.items.map(serializeItem).join('\n')
  const body = items ? `\n${items}` : ''
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0">\n' +
    '  <channel>\n' +
    `    ${head.join('\n    ')}${body}\n` +
    '  </channel>\n' +
    '</rss>\n'
  )
}
