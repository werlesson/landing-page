<template>
  <main class="relative w-full overflow-hidden bg-background px-6 py-32 md:px-12 lg:px-24">
    <div
      class="pointer-events-none absolute top-[12%] -right-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl md:-right-40"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div class="mb-16 max-w-2xl">
        <div class="mb-6 flex items-center gap-3">
          <div class="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
          <span class="text-sm font-medium uppercase tracking-widest text-accent">
            {{ $t('blog.supertitle') }}
          </span>
        </div>
        <h1 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('blog.title') }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('blog.subtitle') }}
        </p>
      </div>

      <div v-if="articles.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SectionsBlogArticleCard
          v-for="article in articles"
          :key="article.path || article.title"
          :article="article"
        />
      </div>
      <p v-else class="text-base text-textMuted">
        {{ $t('blog.empty') }}
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

// Full index: every published article for the active locale, newest first
// (RF-32). A field projection keeps article bodies out of this payload; the
// route is code-split from the landing bundle by Nuxt's per-page chunking
// (RNF-03).
const { data: posts } = await useAsyncData(
  'blog-index',
  () =>
    queryCollection('blog')
      .where('locale', '=', locale.value)
      .where('draft', '=', false)
      .order('date', 'DESC')
      .select('title', 'description', 'summary', 'date', 'path')
      .all(),
  { watch: [locale], default: () => [] },
)

const articles = computed(() => posts.value ?? [])

const seoTitle = computed(() => `${t('blog.title')} — Werlesson`)
const seoDescription = computed(() => t('blog.subtitle'))

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>
