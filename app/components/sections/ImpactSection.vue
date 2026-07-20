<template>
  <section
    id="impact"
    ref="rootRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-28 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[20%] -left-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 text-center transition-all duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
          {{ $t('impact.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('impact.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('impact.subtitle') }}
        </p>
      </div>

      <div
        class="grid grid-cols-2 gap-6 transition-all delay-200 duration-1000 ease-out md:gap-8 lg:grid-cols-4"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <div
          v-for="(metric, index) in metrics"
          :key="`${metric.label}-${index}`"
          class="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center transition-all duration-300 hover:border-accent/50 hover:bg-accent/[0.04]"
        >
          <div
            class="font-display text-3xl font-bold tracking-tight text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.4)] sm:text-4xl"
          >
            {{ metric.value }}
          </div>
          <div class="mt-3 text-sm leading-relaxed text-textMuted">
            {{ metric.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImpactMetric } from '~/types/portfolio'

const { locale, getLocaleMessage } = useI18n()

const metrics = computed<ImpactMetric[]>(() => {
  const tree = getLocaleMessage(locale.value) as {
    impact?: { metrics?: ImpactMetric[] }
  }
  const list = tree.impact?.metrics
  return Array.isArray(list) ? list : []
})

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
