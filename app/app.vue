<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Werlesson Vieira — Fullstack Developer (Vue 3 · Nuxt · Laravel)',
  description:
    'Portfólio e CV de Werlesson Vieira — desenvolvedor fullstack em Vue 3, Nuxt 4 e Laravel. Disponível para oportunidades remotas internacionais.',
  ogTitle: 'Werlesson Vieira — Fullstack Developer',
  ogDescription:
    'Fullstack developer (Vue 3 · Nuxt 4 · Laravel) — IoT, SaaS e produto. Disponível para remoto internacional.',
  ogImage: 'https://werlesson.dev/og-image.png',
  ogUrl: 'https://werlesson.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Werlesson Vieira — Fullstack Developer',
  twitterDescription: 'Vue 3, Nuxt 4, Laravel · Aberto a remoto internacional.',
  twitterImage: 'https://werlesson.dev/og-image.png',
})

useSchemaOrg([
  definePerson({
    name: 'Werlesson Vieira',
    url: 'https://werlesson.dev',
    jobTitle: 'Fullstack Developer',
    description:
      'Fullstack developer specializing in Vue 3, Nuxt 4, and Laravel. Available for international remote roles. Builder of IoT-integrated SaaS products.',
    sameAs: [
      'https://github.com/werlesson',
      'https://www.linkedin.com/in/werlesson',
    ],
    knowsAbout: [
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'Laravel',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Docker',
      'Tailwind CSS',
      'IoT',
      'Raspberry Pi',
      'Python',
    ],
  }),
  defineWebSite({
    name: 'Werlesson Vieira — Portfolio & CV',
    url: 'https://werlesson.dev',
    description: 'Portfolio and CV of Werlesson Vieira, fullstack developer',
    inLanguage: ['pt-BR', 'en-US'],
  }),
])
</script>
