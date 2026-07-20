<template>
  <section
    id="principles"
    ref="rootRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-28 lg:px-24"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      aria-hidden="true"
      :style="gridBackgroundStyle"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 text-center transition-all duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
          {{ $t('principles.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('principles.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('principles.subtitle') }}
        </p>
      </div>

      <ul
        class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all delay-200 duration-1000 ease-out sm:grid-cols-2 lg:grid-cols-3"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <li
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          class="group bg-background p-6 transition-colors duration-300 hover:bg-accent/[0.04]"
        >
          <div class="flex items-start gap-3">
            <span
              class="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
              aria-hidden="true"
            />
            <div>
              <h3 class="font-display text-base font-bold text-foreground">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-textMuted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Principle } from '~/types/portfolio'

const { locale, getLocaleMessage } = useI18n()

const items = computed<Principle[]>(() => {
  const tree = getLocaleMessage(locale.value) as {
    principles?: { items?: Principle[] }
  }
  const list = tree.principles?.items
  return Array.isArray(list) ? list : []
})

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}

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
