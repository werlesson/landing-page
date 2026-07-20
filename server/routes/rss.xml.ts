import { queryCollection } from '@nuxt/content/server'
import { buildRssFeed } from '../utils/rss'

// Canonical origin for every absolute link in the feed (M-01).
const SITE_URL = 'https://werlesson.dev'

// Site-level RSS feed of published articles (RF-34). Nitro route handler
// querying @nuxt/content; returns valid RSS 2.0 XML at the stable /rss.xml route.
export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()

  const xml = buildRssFeed({
    title: 'Werlesson — Blog',
    link: `${SITE_URL}/blog`,
    description: 'Notes on engineering, architecture and building products.',
    items: articles.map((article) => ({
      title: article.title,
      link: `${SITE_URL}${article.path}`,
      description: article.summary || article.description,
      pubDate: article.date,
    })),
  })

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return xml
})
