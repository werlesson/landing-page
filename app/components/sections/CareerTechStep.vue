<template>
  <div
    ref="rootRef"
    class="rounded-xl border border-border/60 bg-white/[0.02] p-5 transition-all duration-500"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
    :style="{ transitionDelay: `${index * 100}ms` }"
  >
    <span class="font-display text-2xl font-bold text-accent">{{ item.year }}</span>
    <h4 class="mt-2 font-display text-base font-semibold text-foreground">{{ item.title }}</h4>
    <div class="mt-3 flex flex-wrap gap-1.5">
      <span
        v-for="(tech, techIndex) in item.tech"
        :key="`${item.year}-${tech}-${techIndex}`"
        class="rounded-full border border-accent/25 bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent"
      >
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    year: string
    title: string
    tech: string[]
  }
  index: number
}>()

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
  { threshold: 0.2 },
)
</script>
