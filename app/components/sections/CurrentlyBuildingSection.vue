<template>
  <section
    id="building"
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
          {{ $t('currentlyBuilding.supertitle') }}
        </p>
        <h2
          class="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {{ $t('currentlyBuilding.title') }}
        </h2>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('currentlyBuilding.subtitle') }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-6 transition-all delay-200 duration-1000 ease-out md:grid-cols-2"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <article
          v-for="project in buildingProjects"
          :key="project.id"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-accent/40 md:p-8"
        >
          <div class="flex items-center justify-between gap-3">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent"
            >
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
              {{ $t('currentlyBuilding.statusNote') }}
            </span>
          </div>

          <h3
            class="mt-4 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl"
          >
            {{ project.title }}
          </h3>

          <p v-if="project.description" class="mt-2 text-sm leading-relaxed text-textMuted">
            {{ project.description }}
          </p>

          <div v-if="project.tags.length" class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="(tag, tagIndex) in project.tags"
              :key="`${project.id}-tag-${tagIndex}`"
              class="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
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
import type { CaseStudy } from '~/types/portfolio'

const { locale, getLocaleMessage } = useI18n()

const buildingProjects = computed<CaseStudy[]>(() => {
  const tree = getLocaleMessage(locale.value) as {
    featuredProjects?: { projects?: CaseStudy[] }
  }
  const list = tree.featuredProjects?.projects
  if (!Array.isArray(list)) {
    return []
  }
  return list.filter((project) => project.status === 'building')
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
