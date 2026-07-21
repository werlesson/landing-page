<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative w-full overflow-hidden border-t border-white/[0.06] bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[10%] -right-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl md:-right-40"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-[8%] -left-32 h-72 w-72 rounded-full bg-accent/[0.04] blur-3xl sm:-left-40"
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
            {{ $t('featuredProjects.supertitle') }}
          </span>
        </div>
        <h2 class="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {{ $t('featuredProjects.title') }}
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('featuredProjects.subtitle') }}
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SectionsProjectCard v-for="study in shipped" :key="study.id" :study="study" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { shipped } = usePortfolioCatalog()

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
