<template>
  <section
    id="whatIDo"
    ref="rootRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-28 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[15%] -right-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 text-center transition-all duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
          {{ $t('whatIDo.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('whatIDo.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('whatIDo.subtitle') }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-6 transition-all delay-200 duration-1000 ease-out sm:grid-cols-2 lg:grid-cols-3"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <article
          v-for="(card, index) in cards"
          :key="`${card.title}-${index}`"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/[0.04]"
        >
          <div
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/5 font-display text-base font-bold text-accent"
            aria-hidden="true"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </div>
          <h3 class="font-display text-lg font-bold text-foreground">
            {{ card.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-textMuted">
            {{ card.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Capability } from '~/types/portfolio'

const { locale, getLocaleMessage } = useI18n()

const cards = computed<Capability[]>(() => {
  const tree = getLocaleMessage(locale.value) as {
    whatIDo?: { cards?: Capability[] }
  }
  const list = tree.whatIDo?.cards
  return Array.isArray(list) ? list : []
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
