<template>
  <div
    ref="rootRef"
    class="relative pl-12 md:pl-16"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="absolute left-0 top-2 transition-all duration-700"
      :class="visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
      :style="{ transitionDelay: `${index * 200}ms` }"
      aria-hidden="true"
    >
      <div
        class="absolute -inset-2 rounded-full bg-accent/30 blur-md transition-all duration-500"
        :class="
          isHovered || isLast ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
        "
      />
      <div
        class="absolute -inset-1 rounded-full border border-accent/50"
        :class="visible ? 'about-timeline-ping-once' : 'opacity-0'"
        :style="pingStyle"
      />
      <div
        class="relative h-5 w-5 rounded-full border-2 border-accent bg-background"
      >
        <div
          class="absolute inset-1 rounded-full bg-accent transition-all duration-500"
          :class="visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
          :style="{ transitionDelay: `${index * 200 + 300}ms` }"
        />
      </div>
    </div>

    <div
      class="absolute left-5 top-[18px] h-0.5 bg-gradient-to-r from-accent to-transparent transition-all duration-500"
      :class="visible ? 'w-6 opacity-100' : 'w-0 opacity-0'"
      :style="{ transitionDelay: `${index * 200 + 200}ms` }"
      aria-hidden="true"
    />

    <div
      class="group relative pb-16 transition-all duration-700"
      :class="visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'"
      :style="{ transitionDelay: `${index * 200 + 150}ms` }"
    >
      <div
        class="absolute -inset-4 rounded-2xl bg-gradient-to-r from-accent/5 to-transparent transition-all duration-300"
        :class="isHovered ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
      />

      <div class="relative">
        <div class="flex items-center gap-3">
          <span
            class="font-display text-4xl font-bold text-accent transition-all duration-500 md:text-5xl"
            :class="
              isHovered
                ? 'drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]'
                : ''
            "
          >
            {{ item.year }}
          </span>
          <div
            class="h-px flex-1 max-w-16 bg-gradient-to-r from-accent/50 to-transparent transition-all duration-500"
            :class="isHovered ? 'max-w-24' : 'max-w-16'"
            aria-hidden="true"
          />
        </div>

        <h3
          class="mt-3 font-display text-xl font-bold transition-all duration-300 md:text-2xl"
          :class="
            isHovered
              ? 'translate-x-1 text-foreground'
              : 'text-foreground/90'
          "
        >
          {{ item.title }}
        </h3>

        <p
          class="mt-3 max-w-lg text-base leading-relaxed text-[#8a8a8a] md:text-lg"
        >
          {{ item.description }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="(tech, techIndex) in item.tech"
            :key="`${item.year}-${tech}-${techIndex}`"
            class="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent transition-all duration-300"
            :class="[
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              isHovered ? 'border-accent/50 bg-accent/10' : '',
            ]"
            :style="{
              transitionDelay: visible
                ? `${index * 200 + 400 + techIndex * 100}ms`
                : '0ms',
            }"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: {
    year: string
    title: string
    description: string
    tech: string[]
  }
  index: number
  isLast: boolean
}>()

const isHovered = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const pingStyle = computed(() => ({
  animationDelay: `${props.index * 200 + 500}ms`,
}))

const { stop } = useIntersectionObserver(
  rootRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting
    if (isIntersecting) {
      visible.value = true
      stop()
    }
  },
  {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
  },
)
</script>
