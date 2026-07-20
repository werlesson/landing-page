<template>
  <article
    class="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-accent/40"
  >
    <div class="grid grid-cols-1 lg:grid-cols-5">
      <div v-if="project.image" class="relative overflow-hidden bg-black/40 lg:col-span-2">
        <img
          :src="project.image"
          :alt="project.title"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="p-6 md:p-8 lg:p-10" :class="project.image ? 'lg:col-span-3' : 'lg:col-span-5'">
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent"
          >
            {{ statusLabel }}
          </span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, tagIndex) in project.tags"
              :key="`${project.id}-tag-${tagIndex}`"
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-textMuted"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <h3 class="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {{ project.title }}
        </h3>

        <p
          v-if="project.description"
          class="mt-3 max-w-2xl text-base leading-relaxed text-textMuted"
        >
          {{ project.description }}
        </p>

        <dl class="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          <div v-for="block in textBlocks" :key="block.key">
            <dt class="text-xs font-semibold uppercase tracking-wider text-accent/80">
              {{ block.label }}
            </dt>
            <dd class="mt-1.5 text-sm leading-relaxed text-textMuted">
              {{ block.value }}
            </dd>
          </div>

          <div v-if="project.techStack && project.techStack.length" class="sm:col-span-2">
            <dt class="text-xs font-semibold uppercase tracking-wider text-accent/80">
              {{ $t('featuredProjects.blocks.techStack') }}
            </dt>
            <dd class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="(tech, techIndex) in project.techStack"
                :key="`${project.id}-tech-${techIndex}`"
                class="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
              >
                {{ tech }}
              </span>
            </dd>
          </div>
        </dl>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :aria-label="`${$t('featuredProjects.viewProjectAria')} — ${project.title}`"
          >
            {{ $t('featuredProjects.viewProject') }}
            <svg
              class="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :aria-label="`${$t('featuredProjects.sourceCodeAria')} — ${project.title}`"
          >
            {{ $t('featuredProjects.sourceCode') }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CaseStudy } from '~/types/portfolio'

const props = defineProps<{
  project: CaseStudy
}>()

const { t } = useI18n()

const statusLabel = computed(() => t(`featuredProjects.statusLabels.${props.project.status}`))

const textBlocks = computed(() => {
  const keys = ['problem', 'solution', 'architecture', 'challenges', 'results'] as const
  return keys
    .map((key) => ({
      key,
      label: t(`featuredProjects.blocks.${key}`),
      value: props.project[key] ?? '',
    }))
    .filter((block) => typeof block.value === 'string' && block.value.length > 0)
})
</script>
