<template>
  <main class="relative w-full overflow-hidden bg-background px-6 py-32 md:px-12 lg:px-24">
    <!-- Ambient accent glows for depth -->
    <div
      class="pointer-events-none absolute top-[6%] -right-40 h-96 w-96 rounded-full bg-accent/[0.05] blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-[10%] -left-40 h-80 w-80 rounded-full bg-accent/[0.03] blur-3xl"
      aria-hidden="true"
    />

    <article class="relative z-10 mx-auto max-w-6xl">
      <NuxtLink
        :to="projectsIndexPath"
        class="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span aria-hidden="true">←</span>
        {{ $t('projectDetail.back') }}
      </NuxtLink>

      <header class="mt-10 mb-10">
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
          <span
            v-else-if="study.privateRepoNote"
            class="inline-flex h-11 items-center gap-2 rounded-lg border border-border/60 bg-transparent px-4 text-sm text-textMuted"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {{ study.privateRepoNote }}
          </span>
        </div>
      </header>

      <!-- Intro — image in one column, description + overview in the other.
           Collapses to a single stacked column below lg (empty-safe). -->
      <div
        class="mb-12 grid gap-8 lg:gap-12"
        :class="study && study.image ? 'lg:grid-cols-2 lg:items-center' : ''"
      >
        <div
          v-if="study && study.image"
          class="overflow-hidden rounded-2xl border border-border/60 bg-white/[0.02]"
        >
          <img
            :src="study.image"
            :alt="study.title"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div v-if="study && (study.summary || overviewBlock)">
          <p v-if="study.summary" class="text-lg leading-relaxed text-textMuted">
            {{ study.summary }}
          </p>
          <template v-if="overviewBlock">
            <h2
              class="font-display text-xl font-semibold text-foreground md:text-2xl"
              :class="study.summary ? 'mt-6' : ''"
            >
              {{ $t('projectDetail.blocks.description') }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-textMuted md:text-lg">
              {{ overviewBlock.value }}
            </p>
          </template>
        </div>
      </div>

      <!-- Headline metrics — the numbers behind the project (empty-safe) -->
      <dl
        v-if="study && study.metrics && study.metrics.length"
        class="mb-12 grid grid-cols-2 gap-6 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:grid-cols-4 md:p-8"
      >
        <div v-for="(metric, i) in study.metrics" :key="`detail-metric-${i}`">
          <dt class="font-display text-3xl font-bold tabular-nums text-accent md:text-4xl">
            {{ metric.value }}
          </dt>
          <dd class="mt-1 text-xs uppercase tracking-wider text-textMuted">
            {{ metric.label }}
          </dd>
        </div>
      </dl>

      <!-- Narrative blocks, numbered + carded, each guarded by v-if (RF-03) -->
      <div class="space-y-6">
        <section
          v-for="(block, i) in restBlocks"
          :key="block.key"
          class="rounded-2xl border border-border/50 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-accent/30 md:p-8"
        >
          <div class="mb-4 flex items-center gap-3">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-sm font-bold text-accent"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <h2 class="font-display text-xl font-semibold text-foreground md:text-2xl">
              {{ $t(`projectDetail.blocks.${block.key}`) }}
            </h2>
          </div>
          <p class="text-lg leading-relaxed text-textMuted">
            {{ block.value }}
          </p>
        </section>
      </div>

      <!-- Empty-safe photo gallery (RF-04, UI-04) — extra shots beyond the banner -->
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

// JOIN card metadata (title/status/techStack/links/metrics) from the i18n
// catalog by slug; narrative + gallery come from the collection document.
const { catalog } = usePortfolioCatalog()
const study = computed(() => findCaseStudyBySlug(catalog.value, slug.value))

const narrativeBlocks = computed(() => selectNarrativeBlocks(doc))

// The Overview (description) block moves into the two-column intro beside the
// image; the remaining blocks render in the numbered list below.
const overviewBlock = computed(() => narrativeBlocks.value.find((block) => block.key === 'description'))
const restBlocks = computed(() => narrativeBlocks.value.filter((block) => block.key !== 'description'))

// Gallery shows only shots beyond the banner image, so the flagship photo is not
// repeated at the top and bottom of the page.
const galleryImages = computed(() => {
  const all = normalizeGallery(doc.gallery)
  const banner = study.value?.image
  return banner ? all.filter((image) => image.src !== banner) : all
})

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
