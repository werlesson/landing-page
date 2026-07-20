// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400;1,9..40,500&family=Syne:wght@700&display=swap',
        },
      ],
    },
  },

  site: {
    url: 'https://werlesson.dev',
  },

  // Pre-compress client bundles (gzip + brotli) so a self-hosted Node server
  // serves them compressed; a CDN/edge host (Vercel) compresses regardless.
  // Directly addresses the largest landing-page transfer cost (RNF-01/RNF-04).
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  content: {
    // Use Node's built-in SQLite (node:sqlite, available on Node 22.5+) so the
    // content database needs no native `better-sqlite3` build step.
    experimental: {
      sqliteConnector: 'native',
    },
    build: {
      markdown: {
        toc: { depth: 3 },
      },
    },
  },

  // Absolute URLs (https://werlesson.dev) come from `site.url`. The home and
  // `/blog` routes are auto-discovered; published article routes are supplied by
  // the dynamic source below, which emits one URL per article's own locale
  // (RF-43).
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  // nuxt-og-image: the landing page uses the `NuxtSeo` community template (see
  // app/pages/index.vue) and blog articles use `BlogPost` (see
  // app/pages/blog/[...slug].vue), all rendered as PNG on the canonical origin
  // (RF-41).
  ogImage: {
    defaults: {
      extension: 'png',
    },
  },

  i18n: {
    locales: [
      { code: 'pt', language: 'pt-BR', file: 'pt.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'pt',
    langDir: '../locales',
    strategy: 'prefix_except_default',
  },
})
