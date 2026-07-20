<template>
  <section
    id="whatIDo"
    ref="sectionRef"
    class="relative w-full overflow-hidden border-t border-white/[0.06] bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[15%] left-[10%] h-64 w-64 rounded-full bg-accent/[0.04] blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-[12%] -right-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl md:-right-40"
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
            {{ $t('whatIDo.supertitle') }}
          </span>
        </div>
        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('whatIDo.title') }}
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('whatIDo.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(card, index) in cards"
          :key="`${card.title}-${index}`"
          class="group rounded-xl border border-border/60 bg-white/[0.02] p-7 transition-all duration-700 ease-out hover:border-accent/40 hover:bg-accent/[0.03]"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div
            class="mb-4 h-8 w-8 rounded-md border border-accent/40 bg-accent/10 font-display text-sm font-bold leading-8 text-center text-accent"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </div>
          <h3 class="font-display text-xl font-semibold text-foreground">
            {{ card.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-textMuted">
            {{ card.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Capability } from '~/types/portfolio'

const { locale, getLocaleMessage, t } = useI18n()

const cards = computed((): Capability[] => {
  const tree = getLocaleMessage(locale.value) as {
    whatIDo?: { cards?: unknown[] }
  }
  const list = tree.whatIDo?.cards
  const len = Array.isArray(list) ? list.length : 0
  return Array.from({ length: len }, (_, i) => ({
    title: t(`whatIDo.cards.${i}.title`),
    description: t(`whatIDo.cards.${i}.description`),
  }))
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
