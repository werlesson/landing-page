<template>
  <section
    id="career"
    ref="sectionRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[20%] -right-32 h-72 w-72 rounded-full bg-accent/[0.04] blur-3xl md:-right-40"
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
            {{ $t('career.supertitle') }}
          </span>
        </div>
        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('career.title') }}
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('career.subtitle') }}
        </p>
      </div>

      <div class="relative">
        <SectionsExperienceEntry
          v-for="(entry, index) in entries"
          :key="`career-${index}`"
          :entry="entry"
          :is-last="index === entries.length - 1"
        />
      </div>

      <div
        class="mt-20 border-t border-white/[0.06] pt-16 transition-all delay-200 duration-1000 ease-out"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="mb-10 max-w-2xl">
          <h3 class="font-display text-2xl font-bold text-foreground md:text-3xl">
            {{ $t('career.techEvolutionTitle') }}
          </h3>
          <p class="mt-3 text-base leading-relaxed text-textMuted md:text-lg">
            {{ $t('career.techEvolutionSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          <SectionsCareerTechStep
            v-for="(item, index) in timeline"
            :key="`${item.year}-${index}`"
            role="listitem"
            :item="item"
            :index="index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TimelineEntry = {
  year: string
  title: string
  tech: string[]
}

const { entries } = useExperience()
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
      tech,
    }
  })
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
