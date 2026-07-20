<template>
  <section
    id="blog"
    ref="sectionRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[18%] -right-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl md:-right-40"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 flex flex-wrap items-end justify-between gap-6 transition-all duration-1000 ease-out"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="max-w-2xl">
          <div class="mb-6 flex items-center gap-3">
            <div class="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
            <span class="text-sm font-medium uppercase tracking-widest text-accent">
              {{ $t('blog.supertitle') }}
            </span>
          </div>
          <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {{ $t('blog.title') }}
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
            {{ $t('blog.subtitle') }}
          </p>
        </div>

        <NuxtLink
          :to="blogIndexPath"
          class="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {{ $t('blog.viewAll') }}
        </NuxtLink>
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
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const blogIndexPath = computed(() => localePath('/blog'))

// Teaser: latest published articles for the active locale, summaries only.
// A field projection keeps article bodies out of the landing bundle (RNF-03);
// empty-safe when the collection has no matching articles yet (RF-36).
const { data: teasers } = await useAsyncData(
  'blog-teaser',
  () =>
    queryCollection('blog')
      .where('locale', '=', locale.value)
      .where('draft', '=', false)
      .order('date', 'DESC')
      .limit(4)
      .select('title', 'description', 'summary', 'date', 'path')
      .all(),
  { watch: [locale], default: () => [] },
)

const articles = computed(() => teasers.value ?? [])

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
