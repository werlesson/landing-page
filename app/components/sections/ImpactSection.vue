<template>
  <section
    id="impact"
    ref="sectionRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[20%] -right-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl md:-right-40"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-[10%] -left-32 h-80 w-80 rounded-full bg-accent/[0.04] blur-3xl sm:-left-40"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 max-w-2xl transition-all duration-1000 ease-out"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="mb-6 flex items-center gap-3">
          <div class="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
          <span class="text-sm font-medium uppercase tracking-widest text-accent">
            {{ $t('impact.supertitle') }}
          </span>
        </div>
        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('impact.title') }}
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('impact.subtitle') }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/30 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="(metric, index) in metrics"
          :key="`${metric.label}-${index}`"
          class="flex flex-col justify-center bg-background p-8 transition-all duration-700 ease-out"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="font-display text-4xl font-bold text-accent md:text-5xl">
            {{ metric.value }}
          </div>
          <div class="mt-3 text-sm leading-snug text-textMuted">
            {{ metric.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImpactMetric } from '~/types/portfolio'

const { locale, getLocaleMessage, t } = useI18n()

const metrics = computed((): ImpactMetric[] => {
  const tree = getLocaleMessage(locale.value) as {
    impact?: { metrics?: unknown[] }
  }
  const list = tree.impact?.metrics
  const len = Array.isArray(list) ? list.length : 0
  return Array.from({ length: len }, (_, i) => ({
    value: t(`impact.metrics.${i}.value`),
    label: t(`impact.metrics.${i}.label`),
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
