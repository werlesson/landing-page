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
