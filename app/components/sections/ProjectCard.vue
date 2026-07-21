<template>
  <article
    ref="cardRef"
    class="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/[0.02] transition-colors duration-300 hover:border-accent/50"
  >
    <!-- Thumbnail — empty-safe, omitted when no image path (RF-01) -->
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

    <div class="flex flex-1 flex-col p-6 md:p-7">
      <div class="flex flex-wrap items-center gap-3">
        <h3 class="font-display text-xl font-bold text-foreground md:text-2xl">
          {{ study.title }}
        </h3>
        <span
          class="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent"
        >
          {{ $t('featuredProjects.statusLabels.shipped') }}
        </span>
      </div>

      <!-- Tech-stack badges — one per entry (RF-05); no container when empty -->
      <div v-if="study.techStack && study.techStack.length" class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="(tech, i) in study.techStack"
          :key="`${study.id}-tech-${i}`"
          class="rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-textMuted"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Full-card deep-link (RF-02); focus-visible ring matches the blog pattern (UI-02) -->
      <NuxtLink
        :to="detailPath"
        :aria-label="$t('projectDetail.viewDetailsAria', { title: study.title })"
        class="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent transition-opacity duration-300 after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {{ $t('projectDetail.viewDetails') }}
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { animate, hover, inView } from 'motion'
import type { CaseStudy } from '~/types/portfolio'

const props = defineProps<{
  study: CaseStudy
}>()

// Locale-aware deep-link to the SSR detail route (RF-02, CT-01). slug === id.
const localePath = useLocalePath()
const detailPath = computed(() => localePath(`/projects/${props.study.id}`))

const cardRef = ref<HTMLElement | null>(null)

// motion-based entrance + hover animation (RF-09), degraded under
// prefers-reduced-motion to a final visible state with 0 motion (UI-03, RNF-01).
// The card renders fully visible in SSR/base state; the hidden start state is
// only applied on the client when motion is allowed, so there is no reduced-
// motion transform/opacity leak.
onMounted(() => {
  const el = cardRef.value
  if (!el) {
    return
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return
  }

  el.style.opacity = '0'

  const stopInView = inView(
    el,
    (element) => {
      animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
    },
    { amount: 0.2 },
  )

  const stopHover = hover(el, (element) => {
    animate(element, { y: -8 }, { duration: 0.3, ease: 'easeOut' })
    return () => animate(element, { y: 0 }, { duration: 0.3, ease: 'easeOut' })
  })

  onUnmounted(() => {
    stopInView()
    stopHover()
  })
})
</script>
