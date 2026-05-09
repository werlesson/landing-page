<template>
  <div
    ref="groupRef"
    class="space-y-5 transition-all duration-700 ease-out"
    :class="
      isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'
    "
  >
    <div class="flex items-center gap-3">
      <div
        class="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"
        aria-hidden="true"
      />
      <h3
        class="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
      >
        {{ $t(titleKey) }}
      </h3>
      <div
        class="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent"
        aria-hidden="true"
      />
    </div>
    <div class="space-y-3">
      <SectionsStackTechCard
        v-for="(item, itemIndex) in items"
        :key="`${titleKey}-${item.name}`"
        :name="item.name"
        :icon="item.icon"
        :group-index="groupIndex"
        :item-index="itemIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  titleKey: string
  items: { name: string; icon: string }[]
  groupIndex: number
}>()

const groupRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  groupRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      setTimeout(() => {
        isVisible.value = true
      }, props.groupIndex * 150)
      stop()
    }
  },
  { threshold: 0.1 },
)
</script>
