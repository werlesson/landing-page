<template>
  <section
    id="principles"
    ref="sectionRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[25%] -left-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl sm:-left-40"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-5xl">
      <div
        class="mb-16 max-w-2xl transition-all duration-1000 ease-out"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="mb-6 flex items-center gap-3">
          <div class="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
          <span class="text-sm font-medium uppercase tracking-widest text-accent">
            {{ $t('principles.supertitle') }}
          </span>
        </div>
        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('principles.title') }}
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('principles.subtitle') }}
        </p>
      </div>

      <ul class="divide-y divide-border/50 border-y border-border/50">
        <li
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          class="flex flex-col gap-2 py-6 transition-all duration-700 ease-out sm:flex-row sm:items-baseline sm:gap-8"
          :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'"
          :style="{ transitionDelay: `${index * 70}ms` }"
        >
          <div class="flex shrink-0 items-baseline gap-3 sm:w-64">
            <span class="font-mono text-xs text-accent/70" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="font-display text-lg font-semibold text-foreground">
              {{ item.title }}
            </h3>
          </div>
          <p class="text-base leading-relaxed text-textMuted">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Principle } from '~/types/portfolio'

const { locale, getLocaleMessage, t } = useI18n()

const items = computed((): Principle[] => {
  const tree = getLocaleMessage(locale.value) as {
    principles?: { items?: unknown[] }
  }
  const list = tree.principles?.items
  const len = Array.isArray(list) ? list.length : 0
  return Array.from({ length: len }, (_, i) => ({
    title: t(`principles.items.${i}.title`),
    description: t(`principles.items.${i}.description`),
  }))
})

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
