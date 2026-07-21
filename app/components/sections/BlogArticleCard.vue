<template>
  <NuxtLink
    :to="to"
    class="group flex h-full flex-col rounded-xl border border-border/60 bg-white/[0.02] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <time
      v-if="formattedDate"
      :datetime="isoDate"
      class="font-mono text-xs uppercase tracking-wider text-textMuted"
    >
      {{ formattedDate }}
    </time>
    <h3
      class="mt-3 font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-accent"
    >
      {{ article.title }}
    </h3>
    <p v-if="summary" class="mt-3 flex-1 text-sm leading-relaxed text-textMuted">
      {{ summary }}
    </p>
    <span class="mt-5 text-sm font-medium text-accent">
      {{ $t('blog.readMore') }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface ArticleTeaser {
  title?: string
  description?: string
  summary?: string
  date?: string | Date
  path?: string
}

const props = defineProps<{
  article: ArticleTeaser
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

const to = computed(() => localePath(props.article.path || '/blog'))

const summary = computed(() => props.article.summary || props.article.description || '')

const dateObj = computed(() => {
  const raw = props.article.date
  if (!raw) {
    return null
  }
  const d = raw instanceof Date ? raw : new Date(raw)
  return Number.isNaN(d.getTime()) ? null : d
})

const isoDate = computed(() => dateObj.value?.toISOString().slice(0, 10) ?? '')

const formattedDate = computed(() => {
  if (!dateObj.value) {
    return ''
  }
  return dateObj.value.toLocaleDateString(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>
