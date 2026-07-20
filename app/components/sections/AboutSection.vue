<template>
  <section
    id="about"
    class="relative min-h-0 w-full overflow-hidden bg-background px-6 py-16 md:px-12 md:py-24 lg:px-24"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-background from-[8%] via-background/45 via-50% to-transparent to-100% sm:h-28 md:h-32"
      aria-hidden="true"
    />
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div
        class="absolute top-[20%] left-[4%] h-64 w-64 rounded-full bg-accent/[0.04] blur-3xl md:left-[10%] md:h-72 md:w-72"
      />
      <div
        class="absolute top-[38%] -left-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl sm:-left-40 sm:top-[34%]"
      />
      <div class="absolute inset-0 opacity-[0.02]" :style="gridBackgroundStyle" />
    </div>

    <div class="relative z-10 mx-auto max-w-4xl">
      <div
        ref="introRef"
        class="mb-20 transition-all duration-1000 md:mb-28"
        :class="introVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="mb-6 flex items-center gap-3">
          <div class="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
          <span class="text-sm font-medium uppercase tracking-widest text-accent">
            {{ $t('about.badge') }}
          </span>
        </div>

        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('about.headlineBefore') }}
          <span class="relative inline-block">
            <span class="relative z-10 text-accent">{{ $t('about.headlineAccent') }}</span>
            <span class="absolute -inset-1 -z-0 block rounded bg-accent/10" aria-hidden="true" />
          </span>
        </h2>

        <p
          class="mt-8 max-w-2xl text-lg leading-relaxed text-[#8a8a8a] transition-all delay-300 duration-1000 md:text-xl"
          :class="introVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          {{ $t('about.bio') }}
        </p>

        <div
          class="mt-10 flex flex-wrap gap-8 transition-all delay-500 duration-1000"
          :class="introVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <div v-for="(stat, si) in stats" :key="`${stat.label}-${si}`" class="group">
            <div
              class="font-display text-3xl font-bold text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]"
            >
              {{ stat.value }}
            </div>
            <div class="text-sm text-[#8a8a8a]">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="mb-14 flex items-center gap-4 transition-all delay-700 duration-1000"
          :class="introVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <h3 class="font-display text-2xl font-bold md:text-3xl">
            <span class="text-foreground">{{ $t('about.timelineTitleBefore') }}</span>
            {{ ' ' }}
            <span class="text-accent">{{ $t('about.timelineTitleAccent') }}</span>
          </h3>
          <div
            class="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div ref="lineTrackRef" class="relative">
          <div
            class="absolute left-[9px] top-2 h-[calc(100%-4rem)] w-0.5 overflow-hidden rounded-full bg-border/50 md:left-[9px]"
            aria-hidden="true"
          >
            <div
              class="w-full rounded-full bg-gradient-to-b from-accent via-accent to-accent/30 shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-[height] duration-100 ease-out"
              :style="{ height: `${lineFillPct}%` }"
            />
          </div>

          <div class="relative" role="list">
            <SectionsAboutTimelineStep
              v-for="(item, index) in timeline"
              :key="`${item.year}-${index}`"
              role="listitem"
              :item="item"
              :index="index"
              :is-last="index === timeline.length - 1"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TimelineEntry = {
  year: string
  title: string
  description: string
  tech: string[]
}

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(#39ff14 1px, transparent 1px),
    linear-gradient(90deg, #39ff14 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}

const { locale, getLocaleMessage, t } = useI18n()

const timeline = computed((): TimelineEntry[] => {
  const tree = getLocaleMessage(locale.value) as {
    about?: { timeline?: { tech?: unknown[] }[] }
  }
  const list = tree.about?.timeline
  const len = Array.isArray(list) ? list.length : 0
  if (len === 0) {
    return []
  }
  return Array.from({ length: len }, (_, i) => {
    const techArr = list?.[i]?.tech
    const techLen = Array.isArray(techArr) ? techArr.length : 0
    const tech = Array.from({ length: techLen }, (_, j) => t(`about.timeline.${i}.tech.${j}`))
    return {
      year: t(`about.timeline.${i}.year`),
      title: t(`about.timeline.${i}.title`),
      description: t(`about.timeline.${i}.description`),
      tech,
    }
  })
})

const stats = computed(() => {
  const tree = getLocaleMessage(locale.value) as {
    about?: { stats?: unknown[] }
  }
  const list = tree.about?.stats
  const len = Array.isArray(list) ? list.length : 0
  return Array.from({ length: len }, (_, i) => ({
    value: t(`about.stats.${i}.value`),
    label: t(`about.stats.${i}.label`),
  }))
})

const introRef = ref<HTMLElement | null>(null)
const introVisible = ref(false)

const { stop: stopIntroObserver } = useIntersectionObserver(
  introRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting
    if (isIntersecting) {
      introVisible.value = true
      stopIntroObserver()
    }
  },
  { threshold: 0.1 },
)

const lineTrackRef = ref<HTMLElement | null>(null)
const lineFillPct = ref(0)
let lineIntervalId: ReturnType<typeof setInterval> | null = null
let lineAnimStarted = false

// Honor prefers-reduced-motion (UI-03): resolve the line fill instantly.
const reducedMotion = usePreferredReducedMotion()

const { stop: stopLineObserver } = useIntersectionObserver(
  lineTrackRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting
    if (!isIntersecting || lineAnimStarted) {
      return
    }
    lineAnimStarted = true
    if (reducedMotion.value === 'reduce') {
      lineFillPct.value = 100
      stopLineObserver()
      return
    }
    lineIntervalId = setInterval(() => {
      lineFillPct.value = Math.min(100, lineFillPct.value + 2)
      if (lineFillPct.value >= 100 && lineIntervalId) {
        clearInterval(lineIntervalId)
        lineIntervalId = null
      }
    }, 20)
    setTimeout(() => {
      if (lineIntervalId) {
        clearInterval(lineIntervalId)
        lineIntervalId = null
      }
      lineFillPct.value = 100
    }, 2000)
    stopLineObserver()
  },
  { threshold: 0.1 },
)

onBeforeUnmount(() => {
  if (lineIntervalId) {
    clearInterval(lineIntervalId)
  }
})
</script>
