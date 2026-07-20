<template>
  <section
    id="blog"
    ref="rootRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-28 lg:px-24"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      aria-hidden="true"
      :style="gridBackgroundStyle"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 text-center transition-all duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
          {{ $t('blog.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('blog.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('blog.subtitle') }}
        </p>
      </div>

      <div
        class="transition-all delay-200 duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <div v-if="teasers.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="article in teasers"
            :key="article.path"
            :to="article.path"
            class="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <p
              v-if="article.date"
              class="font-mono text-xs uppercase tracking-wider text-accent/80"
            >
              {{ formatDate(article.date) }}
            </p>
            <h3
              class="mt-3 font-display text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent"
            >
              {{ article.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-textMuted">
              {{ article.summary || article.description }}
            </p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              {{ $t('blog.readMore') }}
              <svg
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </NuxtLink>
        </div>

        <p v-else class="text-center text-base leading-relaxed text-textMuted">
          {{ $t('blog.empty') }}
        </p>

        <div class="mt-12 text-center">
          <NuxtLink
            :to="blogIndexPath"
            class="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {{ $t('blog.viewAll') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type BlogTeaser = {
  path: string
  title: string
  description: string
  summary?: string
  date?: string
}

const { locale } = useI18n()
const localePath = useLocalePath()

const blogIndexPath = computed(() => localePath('/blog'))

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}

// On-page teaser: latest published articles in the active locale (RF-01 / RF-32
// subset). Empty-safe — renders the localized empty state when no article is
// published yet (M-03 deferred bodies).
const { data: teasers } = await useAsyncData<BlogTeaser[]>(
  () => `blog-teaser-${locale.value}`,
  async () => {
    try {
      const results = await queryCollection('blog')
        .where('locale', '=', locale.value)
        .where('draft', '=', false)
        .order('date', 'DESC')
        .limit(4)
        .all()
      return (results ?? []).map((article) => ({
        path: article.path,
        title: article.title,
        description: article.description,
        summary: (article as { summary?: string }).summary,
        date: article.date ? String(article.date) : undefined,
      }))
    } catch {
      return []
    }
  },
  { default: () => [], watch: [locale] },
)

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleDateString(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const rootRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const { stop } = useIntersectionObserver(
  rootRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      visible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
