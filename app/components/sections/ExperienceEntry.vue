<template>
  <div
    ref="entryRef"
    class="relative pl-10 transition-all duration-700 ease-out"
    :class="[
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      isLast ? '' : 'pb-12',
    ]"
  >
    <span
      class="absolute left-[7px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-background"
      aria-hidden="true"
    />
    <span
      v-if="!isLast"
      class="absolute left-[12px] top-5 h-[calc(100%-1rem)] w-px bg-border/60"
      aria-hidden="true"
    />

    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 v-if="entry.role" class="font-display text-xl font-semibold text-foreground">
        {{ entry.role }}
      </h3>
      <span v-if="entry.company" class="text-lg text-accent">
        {{ entry.company }}
      </span>
    </div>
    <p v-if="entry.period" class="mt-1 font-mono text-xs uppercase tracking-wider text-textMuted">
      {{ entry.period }}
    </p>

    <div v-if="entry.responsibilities.length" class="mt-5">
      <div class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {{ $t('experience.labels.responsibilities') }}
      </div>
      <ul class="mt-2 space-y-1.5">
        <li
          v-for="(item, i) in entry.responsibilities"
          :key="`resp-${i}`"
          class="flex gap-2 text-sm leading-relaxed text-textMuted"
        >
          <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <div v-if="entry.businessImpact" class="mt-5">
      <div class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {{ $t('experience.labels.impact') }}
      </div>
      <p class="mt-2 text-sm leading-relaxed text-foreground">
        {{ entry.businessImpact }}
      </p>
    </div>

    <div v-if="entry.technologies.length" class="mt-5">
      <div class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {{ $t('experience.labels.technologies') }}
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="(tech, i) in entry.technologies"
          :key="`tech-${i}`"
          class="rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-textMuted"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExperienceEntry } from '~/types/portfolio'

defineProps<{
  entry: ExperienceEntry
  isLast: boolean
}>()

const entryRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  entryRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
