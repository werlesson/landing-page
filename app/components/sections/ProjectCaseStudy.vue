<template>
  <article
    ref="cardRef"
    class="overflow-hidden rounded-2xl border border-border/60 bg-white/[0.02] transition-all duration-1000 ease-out"
    :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
  >
    <!-- Block 1: Image (empty-safe — omitted when no path) -->
    <div
      v-if="study.image"
      class="relative aspect-video w-full overflow-hidden border-b border-border/60 bg-background"
    >
      <img
        :src="study.image"
        :alt="study.title"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="p-7 md:p-10">
      <div class="flex flex-wrap items-center gap-3">
        <h3 class="font-display text-2xl font-bold text-foreground md:text-3xl">
          {{ study.title }}
        </h3>
        <span
          class="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent"
        >
          {{ $t('featuredProjects.statusLabels.shipped') }}
        </span>
      </div>

      <!-- Block 6: Tech Stack tags -->
      <div v-if="study.tags.length" class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="(tag, i) in study.tags"
          :key="`${study.id}-tag-${i}`"
          class="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-textMuted"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Block 2: Description (lead) -->
      <p v-if="study.description" class="mt-6 text-base leading-relaxed text-textMuted md:text-lg">
        {{ study.description }}
      </p>

      <!-- Blocks 3-5, 7-8: labeled prose blocks, empty ones omitted -->
      <dl v-if="proseBlocks.length" class="mt-8 grid gap-6 sm:grid-cols-2">
        <div v-for="block in proseBlocks" :key="`${study.id}-${block.key}`">
          <dt class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t(`featuredProjects.blocks.${block.key}`) }}
          </dt>
          <dd class="mt-2 text-sm leading-relaxed text-textMuted">
            {{ block.value }}
          </dd>
        </div>
      </dl>

      <!-- Tech Stack narrative block (distinct from tags) -->
      <div v-if="study.techStack && study.techStack.length" class="mt-8">
        <div class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ $t('featuredProjects.blocks.techStack') }}
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="(tech, i) in study.techStack"
            :key="`${study.id}-tech-${i}`"
            class="rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-textMuted"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-4">
        <a
          :href="study.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-background transition-all duration-300 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :aria-label="$t('featuredProjects.viewProjectAria')"
        >
          {{ $t('featuredProjects.viewProject') }}
        </a>
        <a
          v-if="study.repoUrl"
          :href="study.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :aria-label="$t('featuredProjects.sourceCodeAria')"
        >
          {{ $t('featuredProjects.sourceCode') }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CaseStudy } from '~/types/portfolio'

const props = defineProps<{
  study: CaseStudy
}>()

// Blocks 3, 4, 5, 7, 8 (Problem, Solution, Architecture, Challenges, Results).
// Only non-empty blocks render (RF-24 empty-safe); Image (1), Description (2)
// and Tech Stack (6) are handled separately in the template.
const proseBlocks = computed(() => {
  const s = props.study
  return (
    [
      { key: 'problem', value: s.problem },
      { key: 'solution', value: s.solution },
      { key: 'architecture', value: s.architecture },
      { key: 'challenges', value: s.challenges },
      { key: 'results', value: s.results },
    ] as const
  )
    .filter((b): b is { key: (typeof b)['key']; value: string } => Boolean(b.value))
    .map((b) => ({ key: b.key, value: b.value }))
})

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  cardRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
