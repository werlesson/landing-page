<template>
  <section
    id="projects"
    ref="rootRef"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-28 lg:px-24"
  >
    <div
      class="pointer-events-none absolute top-[10%] -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        class="mb-16 text-center transition-all duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
          {{ $t('featuredProjects.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('featuredProjects.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('featuredProjects.subtitle') }}
        </p>
      </div>

      <div
        class="flex flex-col gap-8 transition-all delay-200 duration-1000 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <SectionsProjectCaseStudy
          v-for="project in shippedProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CaseStudy } from '~/types/portfolio'

const { locale, getLocaleMessage } = useI18n()

const shippedProjects = computed<CaseStudy[]>(() => {
  const tree = getLocaleMessage(locale.value) as {
    featuredProjects?: { projects?: CaseStudy[] }
  }
  const list = tree.featuredProjects?.projects
  if (!Array.isArray(list)) {
    return []
  }
  return list.filter((project) => project.status === 'shipped')
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
