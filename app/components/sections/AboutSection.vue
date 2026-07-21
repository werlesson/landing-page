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

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        ref="introRef"
        class="transition-all duration-1000"
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
      </div>

      <div
        ref="detailsRef"
        class="mt-12 border-t border-white/[0.06] pt-10 transition-all delay-200 duration-1000"
        :class="detailsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <p class="text-sm font-medium uppercase tracking-widest text-accent/80">
          {{ $t('about.capabilitiesLabel') }}
        </p>
        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
          <div
            v-for="(card, index) in capabilities"
            :key="`${card.title}-${index}`"
            role="listitem"
            class="rounded-lg border border-border/60 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.02]"
            :style="{ transitionDelay: `${index * 60}ms` }"
          >
            <h3 class="font-display text-base font-semibold text-foreground">
              {{ card.title }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-textMuted">
              {{ card.description }}
            </p>
          </div>
        </div>

        <p class="mt-10 text-sm font-medium uppercase tracking-widest text-accent/80">
          {{ $t('about.principlesLabel') }}
        </p>
        <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
          <li
            v-for="(item, index) in principles"
            :key="`${item.title}-${index}`"
            role="listitem"
            class="rounded-lg border border-border/40 bg-white/[0.01] px-4 py-3 text-sm leading-relaxed text-textMuted"
          >
            <span class="font-medium text-foreground">{{ item.title }}</span>
            <span class="text-textMuted/50" aria-hidden="true"> · </span>
            {{ item.description }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Capability, Principle } from '~/types/portfolio'

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(#39ff14 1px, transparent 1px),
    linear-gradient(90deg, #39ff14 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}

// Curated subset of whatIDo.cards — avoids repeating Hero typewriter / Stack coverage.
const CAPABILITY_INDICES = [0, 1, 2, 4] as const
const ABOUT_PRINCIPLE_COUNT = 6

const { locale, getLocaleMessage, t } = useI18n()

const capabilities = computed((): Capability[] =>
  CAPABILITY_INDICES.map((i) => ({
    title: t(`whatIDo.cards.${i}.title`),
    description: t(`whatIDo.cards.${i}.description`),
  })),
)

const principles = computed((): Principle[] => {
  const tree = getLocaleMessage(locale.value) as {
    principles?: { items?: unknown[] }
  }
  const list = tree.principles?.items
  const len = Array.isArray(list) ? Math.min(list.length, ABOUT_PRINCIPLE_COUNT) : 0
  return Array.from({ length: len }, (_, i) => ({
    title: t(`principles.items.${i}.title`),
    description: t(`principles.items.${i}.description`),
  }))
})

const introRef = ref<HTMLElement | null>(null)
const detailsRef = ref<HTMLElement | null>(null)
const introVisible = ref(false)
const detailsVisible = ref(false)

const { stop: stopIntroObserver } = useIntersectionObserver(
  introRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      introVisible.value = true
      stopIntroObserver()
    }
  },
  { threshold: 0.1 },
)

const { stop: stopDetailsObserver } = useIntersectionObserver(
  detailsRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      detailsVisible.value = true
      stopDetailsObserver()
    }
  },
  { threshold: 0.1 },
)
</script>
