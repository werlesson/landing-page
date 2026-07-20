<script setup>
defineProps({
  colorMode: { type: String, required: false, default: 'dark' },
  title: { type: String, required: false, default: 'Senior Software Engineer' },
  description: { type: String, required: false, default: '' },
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between relative"
    style="background-color: #0a0a0f; color: #f5f5f7; padding: 72px"
  >
    <!-- Accent glow (brand green) -->
    <div
      class="absolute"
      style="
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(
          ellipse 85% 75% at 100% 0%,
          rgba(57, 255, 20, 0.14) 0%,
          transparent 55%
        );
      "
    />

    <!-- Brand lockup: W. monogram + wordmark -->
    <div class="flex items-center relative" style="gap: 20px">
      <div
        class="flex items-center justify-center"
        style="
          width: 74px;
          height: 74px;
          border-radius: 18px;
          background-color: #0c0c12;
          border: 1px solid rgba(57, 255, 20, 0.28);
        "
      >
        <svg viewBox="0 0 48 48" style="width: 50px; height: 50px">
          <path
            fill="#39ff14"
            d="M14 13.75h3.85l2.55 12.8L24 18.35l3.6 8.2 2.55-12.8h3.85L29.4 31.25h-3.15l-2.4-8.35-2.4 8.35h-3.15L14 13.75Z"
          />
          <rect x="30.7" y="27.55" width="3.4" height="3.4" rx="0.9" fill="#39ff14" />
        </svg>
      </div>
      <span style="font-size: 42px; font-weight: 700; letter-spacing: -0.02em">Werlesson</span>
    </div>

    <!-- Headline + tagline -->
    <div class="flex flex-col relative" style="gap: 22px">
      <h1
        class="m-0"
        style="
          font-size: 78px;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          max-width: 1000px;
        "
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="m-0"
        style="
          font-size: 33px;
          line-height: 1.4;
          color: #a1a1aa;
          max-width: 960px;
          display: block;
          line-clamp: 2;
          text-overflow: ellipsis;
        "
      >
        {{ description }}
      </p>
    </div>

    <!-- Footer: accent bar + canonical origin -->
    <div class="flex items-center relative" style="gap: 16px">
      <div style="width: 48px; height: 6px; border-radius: 3px; background-color: #39ff14" />
      <span style="font-size: 27px; color: #71717a">werlesson.dev</span>
    </div>
  </div>
</template>
