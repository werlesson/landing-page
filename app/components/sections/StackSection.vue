<template>
  <section
    id="stack"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      aria-hidden="true"
      :style="gridBackgroundStyle"
    />

    <div
      class="pointer-events-none absolute top-[18%] -right-28 h-72 w-72 rounded-full bg-accent/6 blur-3xl md:-right-36 md:top-[15%]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-[42%] -left-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl sm:top-[40%] sm:-left-40"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-[12%] left-[18%] h-56 w-56 rounded-full bg-accent/[0.04] blur-3xl md:left-[22%]"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div
        ref="titleRef"
        class="mb-20 text-center transition-all duration-1000 ease-out"
        :class="titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
      >
        <div class="flex w-full flex-col items-center">
          <p class="mb-4 w-full text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
            {{ $t('stack.supertitle') }}
          </p>
          <h2
            class="relative inline-block font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            <span class="relative z-10">{{ $t('stack.title') }}</span>
            <span
              class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-accent blur-2xl opacity-30"
              aria-hidden="true"
            >
              {{ $t('stack.title') }}
            </span>
          </h2>
        </div>
        <div
          class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
          {{ $t('stack.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap-10">
        <SectionsStackTechGroup
          v-for="(group, index) in stackGroups"
          :key="group.titleKey"
          :title-key="group.titleKey"
          :items="group.items"
          :group-index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stackGroups: { titleKey: string; items: { name: string; icon: string }[] }[] = [
  {
    titleKey: 'stack.groups.frontend',
    items: [
      { name: 'Vue 3', icon: 'vuedotjs' },
      { name: 'Nuxt 3', icon: 'nuxt' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'TailwindCSS', icon: 'tailwindcss' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Pinia', icon: 'pinia' },
      { name: 'VueUse', icon: 'vueuse' },
    ],
  },
  {
    titleKey: 'stack.groups.backend',
    items: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'PHP 8.3', icon: 'php' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Docker', icon: 'docker' },
    ],
  },
  {
    titleKey: 'stack.groups.database',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Supabase', icon: 'supabase' },
    ],
  },
  {
    titleKey: 'stack.groups.infra',
    items: [
      { name: 'Coolify', icon: 'coolify' },
      { name: 'VPS', icon: 'linux' },
      { name: 'Raspberry Pi', icon: 'raspberrypi' },
    ],
  },
  {
    titleKey: 'stack.groups.tools',
    items: [
      { name: 'ESLint', icon: 'eslint' },
      { name: 'Prettier', icon: 'prettier' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Git', icon: 'git' },
    ],
  },
]

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}

const titleRef = ref<HTMLElement | null>(null)
const titleVisible = ref(false)

const { stop } = useIntersectionObserver(
  titleRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting
    if (isIntersecting) {
      titleVisible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
