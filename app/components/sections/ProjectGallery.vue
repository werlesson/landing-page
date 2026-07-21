<template>
  <!-- Empty-safe: no heading, no grid, no DOM node when there are no images (RF-04, UI-04) -->
  <section v-if="images.length" class="mt-16">
    <h2 class="font-display text-2xl font-bold text-foreground md:text-3xl">
      {{ $t('projectDetail.galleryHeading') }}
    </h2>

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <figure
        v-for="(image, i) in images"
        :key="`gallery-${i}`"
        class="overflow-hidden rounded-2xl border border-border/60 bg-white/[0.02]"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover"
        />
        <figcaption v-if="image.caption" class="px-5 py-3 text-sm text-textMuted">
          {{ image.caption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/composables/useProjectDetail'

defineProps<{
  images: GalleryImage[]
}>()
</script>
