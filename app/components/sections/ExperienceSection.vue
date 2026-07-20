<template>
  <section
    id="experience"
    ref="rootRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-28 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[20%] -left-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-4xl">
      <div
        class="mb-16 text-center transition-all duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
          {{ $t('experience.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('experience.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('experience.subtitle') }}
        </p>
      </div>

      <div
        v-if="entries.length"
        class="relative transition-all delay-200 duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <div
          class="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-0.5 rounded-full bg-gradient-to-b from-accent via-accent/50 to-transparent"
          aria-hidden="true"
        />
        <ul class="flex flex-col gap-8" role="list">
          <SectionsExperienceEntry
            v-for="(entry, index) in entries"
            :key="`experience-${index}`"
            :entry="entry"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ExperienceEntry } from '~/types/portfolio'

const { locale, getLocaleMessage } = useI18n()

const entries = computed<ExperienceEntry[]>(() => {
  const tree = getLocaleMessage(locale.value) as {
    experience?: { entries?: ExperienceEntry[] }
  }
  const list = tree.experience?.entries
  if (!Array.isArray(list)) {
    return []
  }
  return list
    .map((entry) => ({
      company: entry.company ?? '',
      role: entry.role ?? '',
      period: entry.period ?? '',
      responsibilities: Array.isArray(entry.responsibilities) ? entry.responsibilities : [],
      technologies: Array.isArray(entry.technologies) ? entry.technologies : [],
      businessImpact: entry.businessImpact ?? '',
    }))
    .filter(
      (entry) =>
        entry.company ||
        entry.role ||
        entry.period ||
        entry.businessImpact ||
        entry.responsibilities.length > 0 ||
        entry.technologies.length > 0,
    )
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
