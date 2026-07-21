<template>
  <main class="relative w-full overflow-hidden bg-background px-6 py-32 md:px-12 lg:px-24">
    <article class="relative z-10 mx-auto max-w-3xl">
      <NuxtLink
        :to="projectsIndexPath"
        class="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span aria-hidden="true">←</span>
        {{ $t('projectDetail.back') }}
      </NuxtLink>

      <header class="mt-10 mb-12">
        <div class="flex flex-wrap items-center gap-3">
          <h1
            v-if="study"
            class="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl"
          >
            {{ study.title }}
          </h1>
          <span
            v-if="study"
            class="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent"
          >
            {{ $t(`featuredProjects.statusLabels.${study.status}`) }}
          </span>
        </div>

        <!-- Tech-stack badges — one per entry (RF-05); no container when empty -->
        <div
          v-if="study && study.techStack && study.techStack.length"
          class="mt-6 flex flex-wrap gap-2"
        >
          <span
            v-for="(tech, i) in study.techStack"
            :key="`tech-${i}`"
            class="rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-textMuted"
          >
            {{ tech }}
          </span>
        </div>

        <div v-if="study" class="mt-8 flex flex-wrap gap-4">
          <a
            :href="study.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-background transition-all duration-300 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :aria-label="$t('featuredProjects.viewProjectAria')"
          >
            {{ $t('featuredProjects.viewProject') }}
          </a>
          <a
            v-if="study.repoUrl"
            :href="study.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :aria-label="$t('featuredProjects.sourceCodeAria')"
          >
            {{ $t('featuredProjects.sourceCode') }}
          </a>
        </div>
      </header>

      <!-- Six narrative blocks, each guarded by its own v-if (RF-03, empty-safe) -->
      <div class="space-y-12">
        <section v-for="block in narrativeBlocks" :key="block.key">
          <h2 class="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {{ $t(`projectDetail.blocks.${block.key}`) }}
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-textMuted">
            {{ block.value }}
          </p>
        </section>
      </div>

      <!-- Empty-safe photo gallery (RF-04, UI-04) -->
      <SectionsProjectGallery :images="galleryImages" />
    </article>
  </main>
</template>

<script setup lang="ts">
import {
  findCaseStudyBySlug,
  normalizeGallery,
  selectNarrativeBlocks,
} from '~/composables/useProjectDetail'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const projectsIndexPath = computed(() => localePath('/#projects'))

// The locale prefix is stripped from route params by @nuxtjs/i18n, so the slug
// maps directly onto the project's shared `slug` (slug === id) across locales.
const slug = computed(() => {
  const raw = route.params.slug
  const parts = Array.isArray(raw) ? raw : [raw]
  return parts.filter(Boolean).join('/')
})

// DEVIATION from blog (CT-01): the projects collection SHARES one slug across
// locales, so resolution filters by `slug` + the active `locale` rather than by
// path. One document per project per locale.
const { data: project } = await useAsyncData(`project-${slug.value}-${locale.value}`, () =>
  queryCollection('projects')
    .where('slug', '=', slug.value)
    .where('locale', '=', locale.value)
    .first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

// Resolved at SSR setup time — the 404 guard above guarantees it is present.
const doc = project.value

// JOIN card metadata (title/status/techStack/links) from the i18n catalog by
// slug; narrative + gallery come from the collection document (HYBRID model).
const { catalog } = usePortfolioCatalog()
const study = computed(() => findCaseStudyBySlug(catalog.value, slug.value))

const narrativeBlocks = computed(() => selectNarrativeBlocks(doc))
const galleryImages = computed(() => normalizeGallery(doc.gallery))

const canonicalUrl = `https://werlesson.dev${route.path}`
const pageTitle = computed(() => study.value?.title ?? doc.slug)
const pageDescription = computed(() => doc.description ?? '')

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogType: 'article',
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
})

// Structured data for the project detail page, analogous to the blog
// BlogPosting node. No project OG image (out of scope).
useSchemaOrg([
  defineWebPage({
    name: pageTitle.value,
    description: pageDescription.value,
    inLanguage: doc.locale === 'pt' ? 'pt-BR' : 'en-US',
  }),
])
</script>
