<template>
  <li class="relative pl-12 md:pl-16">
    <span
      class="absolute left-[6px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background"
      aria-hidden="true"
    />

    <div
      class="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-accent/40 md:p-8"
    >
      <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 v-if="entry.role" class="font-display text-xl font-bold text-foreground">
          {{ entry.role }}
        </h3>
        <p v-if="entry.period" class="font-mono text-sm text-accent/80">
          {{ entry.period }}
        </p>
      </div>
      <p v-if="entry.company" class="mt-1 text-sm font-medium text-textMuted">
        {{ entry.company }}
      </p>

      <div v-if="entry.responsibilities.length" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent/80">
          {{ $t('experience.labels.responsibilities') }}
        </p>
        <ul class="mt-2 flex flex-col gap-1.5" role="list">
          <li
            v-for="(item, index) in entry.responsibilities"
            :key="`resp-${index}`"
            class="flex gap-2 text-sm leading-relaxed text-textMuted"
          >
            <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="entry.businessImpact" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent/80">
          {{ $t('experience.labels.impact') }}
        </p>
        <p class="mt-1.5 text-sm leading-relaxed text-foreground/90">
          {{ entry.businessImpact }}
        </p>
      </div>

      <div v-if="entry.technologies.length" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent/80">
          {{ $t('experience.labels.technologies') }}
        </p>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="(tech, index) in entry.technologies"
            :key="`tech-${index}`"
            class="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ExperienceEntry } from '~/types/portfolio'

defineProps<{
  entry: ExperienceEntry
}>()
</script>
