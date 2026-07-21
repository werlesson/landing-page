<template>
  <div
    ref="cardRef"
    class="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(57,255,20,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
    :class="isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500"
      :class="isHovered ? 'opacity-100' : 'opacity-0'"
      style="
        background: radial-gradient(circle at center, rgba(57, 255, 20, 0.1) 0%, transparent 70%);
      "
      aria-hidden="true"
    />

    <div class="relative shrink-0">
      <img
        class="size-5 object-contain transition-all duration-500 ease-out"
        :class="isHovered ? 'scale-110 rotate-12 brightness-110' : 'opacity-70 brightness-90'"
        :src="iconUrl"
        :alt="name"
        width="20"
        height="20"
        loading="lazy"
        decoding="async"
      />
      <img
        class="pointer-events-none absolute inset-0 size-5 object-contain opacity-0 blur-md transition-opacity duration-500"
        :class="isHovered ? 'opacity-60' : 'opacity-0'"
        :src="iconUrl"
        alt=""
        width="20"
        height="20"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
    </div>

    <span
      class="relative text-sm font-medium transition-all duration-300"
      :class="isHovered ? 'translate-x-0.5 text-foreground' : 'text-foreground/80'"
    >
      {{ name }}
    </span>

    <div
      class="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
      :class="isHovered ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 translate-x-[-100%] transition-transform duration-1000 ease-out group-hover:translate-x-[100%]"
        style="
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  icon: string
  groupIndex: number
  itemIndex: number
}>()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHovered = ref(false)

const delay = computed(() => props.groupIndex * 150 + props.itemIndex * 100)

const iconUrl = computed(() => `https://cdn.simpleicons.org/${props.icon}/39ff14`)

const { stop } = useIntersectionObserver(
  cardRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting
    if (isIntersecting) {
      setTimeout(() => {
        isVisible.value = true
      }, delay.value)
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
