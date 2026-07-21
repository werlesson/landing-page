<template>
  <section
    id="building"
    ref="sectionRef"
    class="relative w-full overflow-hidden border-t border-white/[0.06] bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[15%] left-[8%] h-64 w-64 rounded-full bg-accent/5 blur-3xl"
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
            {{ $t('currentlyBuilding.supertitle') }}
          </span>
        </div>
        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('currentlyBuilding.title') }}
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('currentlyBuilding.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article
          v-for="(item, index) in building"
          :key="item.id"
          class="relative rounded-xl border border-border/60 bg-white/[0.02] p-7 transition-all duration-700 ease-out"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div
            class="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent"
          >
            <span class="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"
              />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {{ $t('currentlyBuilding.statusNote') }}
          </div>

          <h3 class="font-display text-xl font-semibold text-foreground">
            {{ item.title }}
          </h3>

          <p v-if="item.description" class="mt-3 text-sm leading-relaxed text-textMuted">
            {{ item.description }}
          </p>

          <div v-if="item.tags.length" class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="(tag, i) in item.tags"
              :key="`${item.id}-tag-${i}`"
              class="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-textMuted"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { building } = usePortfolioCatalog()

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
