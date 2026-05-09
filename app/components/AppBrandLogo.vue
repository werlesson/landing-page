<template>
  <span class="inline-flex items-center" :class="gapClass">
    <span
      class="relative shrink-0 overflow-hidden rounded-xl bg-[#0c0c12] ring-1 ring-inset ring-accent/25"
      :class="frameClass"
    >
      <svg
        class="block h-full w-full"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- W + pixel “.” — leitura de monograma + marca W. sem ruído visual -->
        <path
          fill="#39ff14"
          d="M14 13.75h3.85l2.55 12.8L24 18.35l3.6 8.2 2.55-12.8h3.85L29.4 31.25h-3.15l-2.4-8.35-2.4 8.35h-3.15L14 13.75Z"
        />
        <rect
          x="30.7"
          y="27.55"
          width="3.4"
          height="3.4"
          rx="0.9"
          fill="#39ff14"
        />
      </svg>
    </span>
    <span
      v-if="variant === 'lockup'"
      class="font-display font-bold tracking-tight text-foreground"
      :class="suffixClass"
    >
      {{ $t('brand.logoSuffix') }}
    </span>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'icon' | 'lockup'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    variant: 'icon',
    size: 'sm',
  },
)

const gapClass = computed(() =>
  props.variant === 'lockup' ? 'gap-2.5 sm:gap-3' : '',
)

const frameClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'h-12 w-12 sm:h-14 sm:w-14'
    case 'md':
      return 'h-10 w-10'
    default:
      return 'h-9 w-9'
  }
})

const suffixClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'text-2xl sm:text-3xl'
    case 'md':
      return 'text-xl sm:text-2xl'
    default:
      return 'text-lg'
  }
})
</script>
