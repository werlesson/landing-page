<template>
  <!-- Perspective lives on the wrapper so card tilt reads in 3D space. -->
  <div class="h-full [perspective:1100px]">
    <article
      ref="cardRef"
      class="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/[0.02] transition-[border-color,box-shadow] duration-300 will-change-transform"
      :class="
        isLead
          ? 'border-accent/45 shadow-[0_0_0_1px_rgba(57,255,20,0.08)] hover:border-accent/70'
          : 'border-border/60 hover:border-accent/50'
      "
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <!-- Thumbnail — empty-safe, omitted when no image path (RF-01) -->
      <div
        v-if="study.image"
        class="relative aspect-video w-full overflow-hidden border-b border-border/60 bg-background"
      >
        <img
          ref="imageRef"
          :src="study.image"
          :alt="study.title"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover will-change-transform"
        />
      </div>

      <div class="flex flex-1 flex-col p-6 md:p-7">
        <div class="flex flex-wrap items-center gap-3">
          <h3
            class="font-display font-bold text-foreground"
            :class="isLead ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'"
          >
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
  </div>
</template>

<script setup lang="ts">
import { animate, inView } from 'motion'
import type { CaseStudy } from '~/types/portfolio'

const props = withDefaults(
  defineProps<{
    study: CaseStudy
    /** Position in the shipped grid — drives entrance stagger and lead emphasis. */
    index?: number
  }>(),
  { index: 0 },
)

const isLead = computed(() => props.index === 0)

// Locale-aware deep-link to the SSR detail route (RF-02, CT-01). slug === id.
const localePath = useLocalePath()
const detailPath = computed(() => localePath(`/projects/${props.study.id}`))

const cardRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)

const MAX_TILT_DEG = 7
const IMAGE_HOVER_SCALE = 1.06

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Desktop fine-pointer only — skip tilt on touch / coarse pointers. */
function canTilt(): boolean {
  return !prefersReducedMotion() && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function onPointerMove(event: PointerEvent) {
  const el = cardRef.value
  if (!el || !canTilt()) {
    return
  }

  const rect = el.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) {
    return
  }

  const px = (event.clientX - rect.left) / rect.width
  const py = (event.clientY - rect.top) / rect.height
  const rotateY = (px - 0.5) * MAX_TILT_DEG * 2
  const rotateX = (0.5 - py) * MAX_TILT_DEG * 2

  animate(el, { rotateX, rotateY }, { duration: 0.18, ease: 'easeOut' })

  const img = imageRef.value
  if (img) {
    animate(img, { scale: IMAGE_HOVER_SCALE }, { duration: 0.35, ease: 'easeOut' })
  }
}

function onPointerLeave() {
  const el = cardRef.value
  if (!el || prefersReducedMotion()) {
    return
  }

  animate(el, { rotateX: 0, rotateY: 0 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] })

  const img = imageRef.value
  if (img) {
    animate(img, { scale: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] })
  }
}

// Staggered entrance (RF-09). SSR/base state is fully visible; the hidden start
// is applied client-side only when motion is allowed (UI-03 / RNF-01).
onMounted(() => {
  const el = cardRef.value
  if (!el || prefersReducedMotion()) {
    return
  }

  el.style.opacity = '0'

  const stopInView = inView(
    el,
    (element) => {
      animate(
        element,
        { opacity: [0, 1], y: [36, 0] },
        {
          duration: 0.65,
          delay: props.index * 0.09,
          ease: [0.16, 1, 0.3, 1],
        },
      )
    },
    { amount: 0.2 },
  )

  onUnmounted(() => {
    stopInView()
  })
})
</script>
