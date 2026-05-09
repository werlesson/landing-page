<template>
  <div>
    <HeroSection />
    <AboutSection />
    <StackSection />
    <ProjectSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectSection from '~/components/sections/ProjectSection.vue'
import StackSection from '~/components/sections/StackSection.vue'

const { locale } = useI18n()
const siteConfig = useSiteConfig()

const seoTitle = computed(() =>
  locale.value === 'en'
    ? 'Werlesson — Fullstack Developer (Vue 3 & Laravel)'
    : 'Werlesson — Fullstack Developer Vue 3 & Laravel',
)

const seoDescription = computed(() =>
  locale.value === 'en'
    ? 'Fullstack developer focused on Vue 3 and Laravel, building SaaS and digital products from scratch. Open to remote opportunities.'
    : 'Fullstack developer especializado em Vue 3 e Laravel, construindo SaaS e produtos digitais do zero. Aberto a oportunidades remotas.',
)

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const personSiteUrl = computed(() => {
  const raw = String(toValue(siteConfig.url) ?? '').replace(/\/$/, '')
  return raw || 'https://werlesson.dev'
})

useSchemaOrg([
  definePerson({
    name: 'Werlesson',
    jobTitle: 'Fullstack Developer',
    url: () => toValue(personSiteUrl),
    knowsAbout: ['Vue 3', 'Laravel', 'Nuxt 3', 'TypeScript', 'PHP'],
    nationality: 'Brazilian',
    sameAs: [
      'https://github.com/werlesson',
      'https://www.linkedin.com/in/werlesson',
    ],
  }),
])
</script>
