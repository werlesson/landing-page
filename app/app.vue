<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Apply the active locale to <html lang/dir> on every route (WCAG — html-has-lang,
// UI-05). i18n maps pt→pt-BR / en→en-US via nuxt.config `language`. `seo: false`
// keeps this to the html attributes only, leaving the SEO meta below authoritative.
useHead(useLocaleHead({ lang: true, dir: true, seo: false }))

// Sitewide SEO defaults (RF-40, RF-42, UI-07). The "Senior Software Engineer"
// positioning applies to every route — including /blog and article pages that
// do not go through the locale-aware overrides in app/pages/index.vue. No copy
// may read "Fullstack / Full Stack / Frontend Developer".
useSeoMeta({
  title: 'Werlesson Vieira — Senior Software Engineer (Vue 3 · Nuxt · Laravel)',
  description:
    'Portfolio and CV of Werlesson Vieira — Senior Software Engineer building scalable SaaS products with Vue, Nuxt and Laravel. Available for international remote roles.',
  ogTitle: 'Werlesson Vieira — Senior Software Engineer',
  ogDescription:
    'Senior Software Engineer building scalable SaaS products with Vue, Nuxt and Laravel — from architecture to production.',
  ogImage: 'https://werlesson.dev/og-image.png',
  ogUrl: 'https://werlesson.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Werlesson Vieira — Senior Software Engineer',
  twitterDescription:
    'Vue, Nuxt & Laravel · Senior Software Engineer · open to international remote.',
  twitterImage: 'https://werlesson.dev/og-image.png',
})

useSchemaOrg([
  definePerson({
    name: 'Werlesson Vieira',
    url: 'https://werlesson.dev',
    jobTitle: 'Senior Software Engineer',
    description:
      'Senior Software Engineer building scalable SaaS products with Vue, Nuxt and Laravel — from architecture to production. Available for international remote roles.',
    sameAs: ['https://github.com/werlesson', 'https://www.linkedin.com/in/werlesson'],
    knowsAbout: [
      'Software Architecture',
      'SaaS Development',
      'Vue',
      'Nuxt',
      'Laravel',
      'TypeScript',
      'System Design',
      'Frontend Architecture',
      'Performance & SEO',
    ],
  }),
  defineWebSite({
    name: 'Werlesson Vieira — Portfolio & CV',
    url: 'https://werlesson.dev',
    description: 'Portfolio and CV of Werlesson Vieira, Senior Software Engineer',
    inLanguage: ['pt-BR', 'en-US'],
  }),
])
</script>
