import { queryCollection } from '@nuxt/content/server'

// Dynamic sitemap source: every published blog article (RF-43). Consumed by
// @nuxtjs/sitemap via `sitemap.sources` in nuxt.config.ts. Articles are
// single-locale-per-article (RF-35), so we emit only the URL for each article's
// own locale — pt (default) has no prefix, en is served under `/en`. The site
// host (https://werlesson.dev) is prepended by the sitemap module from
// `site.url`; `_i18nTransform: false` stops i18n from expanding these into every
// locale variant.
export default defineSitemapEventHandler(async (event) => {
  const articles = await queryCollection(event, 'blog').where('draft', '=', false).all()

  return articles.map((article) =>
    asSitemapUrl({
      loc: article.locale === 'en' ? `/en${article.path}` : article.path,
      lastmod: article.date,
      _i18nTransform: false,
    }),
  )
})
