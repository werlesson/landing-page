<template>
  <div
    ref="rootRef"
    class="relative mx-auto h-80 w-full max-w-[18rem] select-none sm:h-96 sm:max-w-[20rem] lg:mx-0 lg:h-[440px] lg:max-w-none lg:w-96"
    aria-hidden="true"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- Frame -->
    <div
      class="pointer-events-none absolute inset-0 rounded-[1.85rem] border border-white/[0.09] bg-gradient-to-b from-card/50 via-card/[0.08] to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]"
    />
    <div
      class="pointer-events-none absolute left-3 top-3 h-7 w-7 rounded-tl-xl border-l border-t border-accent/30 sm:left-4 sm:top-4"
    />
    <div
      class="pointer-events-none absolute bottom-3 right-3 h-7 w-7 rounded-br-xl border-b border-r border-accent/30 sm:bottom-4 sm:right-4"
    />

    <div
      class="hero-hex-grid absolute inset-3 opacity-[0.16] [mask-image:radial-gradient(ellipse_74%_70%_at_50%_47%,#000_24%,transparent_76%)] sm:inset-4 sm:opacity-[0.2] lg:inset-5"
    />

    <!-- Signal field -->
    <div class="absolute inset-0 z-[2] flex items-center justify-center">
      <div
        ref="fieldRef"
        class="relative h-[15rem] w-[15rem] sm:h-[17rem] sm:w-[17rem] lg:h-[19.5rem] lg:w-[19.5rem]"
      >
        <!-- Orbit rings + spoke paths -->
        <svg
          class="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="78"
            stroke="rgba(57,255,20,0.14)"
            stroke-width="1"
            stroke-dasharray="3 7"
          />
          <circle cx="100" cy="100" r="54" stroke="rgba(57,255,20,0.22)" stroke-width="1" />
          <path
            v-for="(spoke, i) in spokePaths"
            :key="`spoke-${i}`"
            :ref="(el) => setSpokeRef(el, i)"
            :d="spoke"
            stroke="rgba(57,255,20,0.35)"
            stroke-width="1.2"
            stroke-linecap="round"
            pathLength="1"
            stroke-dasharray="1"
            stroke-dashoffset="1"
          />
        </svg>

        <!-- Orbiting nodes (spin container + counter-rotated labels) -->
        <div ref="orbitRef" class="absolute inset-0 will-change-transform">
          <div
            v-for="(node, i) in nodes"
            :key="node.id"
            class="absolute left-1/2 top-1/2"
            :style="nodeSlotStyle(i)"
          >
            <div
              class="will-change-transform [animation:spin_32s_linear_infinite_reverse] motion-reduce:animate-none"
            >
              <div
                :ref="(el) => setNodeInnerRef(el, i)"
                class="pointer-events-auto rounded-lg border border-white/12 bg-card/90 px-2.5 py-1.5 font-mono text-xs text-foreground shadow-lg shadow-black/40 backdrop-blur-md will-change-transform hover:border-accent/60 hover:text-accent sm:px-3 sm:py-2 sm:text-sm"
                @pointerenter="onNodeEnter(i)"
                @pointerleave="onNodeLeave(i)"
              >
                <span v-if="node.prefix" class="text-accent">{{ node.prefix }} </span
                >{{ node.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Core hub -->
        <div class="absolute inset-0 z-[3] flex items-center justify-center">
          <div
            ref="hubRef"
            class="relative flex h-[4.9rem] w-[4.9rem] items-center justify-center overflow-hidden rounded-2xl border border-accent/45 bg-[#0a0a0f]/92 neon-border shadow-[0_0_36px_rgba(57,255,20,0.14)] backdrop-blur-md will-change-transform lg:h-[5.9rem] lg:w-[5.9rem]"
          >
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.12] via-transparent to-accent/[0.06]"
            />
            <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div
                class="absolute -inset-y-6 left-0 w-[55%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80 blur-sm animate-hero-hub-shine"
              />
            </div>
            <svg
              class="relative z-[1] h-9 w-9 text-accent drop-shadow-[0_0_14px_rgba(57,255,20,0.4)] lg:h-11 lg:w-11"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.15"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="8 6 3 12 8 18" />
              <polyline points="16 6 21 12 16 18" />
              <line x1="14.5" y1="5" x2="9.5" y2="19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate, type AnimationPlaybackControls } from 'motion'

const { t } = useI18n()
const reducedMotion = usePreferredReducedMotion()

const rootRef = ref<HTMLElement | null>(null)
const fieldRef = ref<HTMLElement | null>(null)
const orbitRef = ref<HTMLElement | null>(null)
const hubRef = ref<HTMLElement | null>(null)

const spokeEls = ref<(SVGPathElement | null)[]>([null, null, null, null])
const nodeInners = ref<(HTMLElement | null)[]>([null, null, null, null])

const ORBIT_DURATION = 32
const HUB_PARALLAX = 10
const NODE_RADIUS_REM = 7.25

type HubNode = {
  id: string
  prefix: string
  label: string
}

const nodes = computed<HubNode[]>(() => [
  { id: 'vue', prefix: '', label: t('hero.floatTags.vue').trim() },
  { id: 'ts', prefix: '', label: t('hero.floatTags.tsMiddle').trim() },
  {
    id: 'laravel',
    prefix: '',
    label: t('hero.floatTags.stackHint')
      .replace(/^\/\/\s*/, '')
      .trim(),
  },
  {
    id: 'npm',
    prefix: '$',
    label: t('hero.floatTags.npmRest').trim(),
  },
])

/** Spokes from hub center to each cardinal node (viewBox 200²). */
const spokePaths = [
  'M 100 100 L 100 22',
  'M 100 100 L 178 100',
  'M 100 100 L 100 178',
  'M 100 100 L 22 100',
]

function setSpokeRef(el: unknown, i: number) {
  spokeEls.value[i] = (el as SVGPathElement | null) ?? null
}

function setNodeInnerRef(el: unknown, i: number) {
  nodeInners.value[i] = (el as HTMLElement | null) ?? null
}

function nodeSlotStyle(i: number) {
  // Classic orbit placement: rotate → translate → counter-rotate so labels start upright;
  // CSS reverse spin on the inner cancels the motion orbit rotation.
  const deg = i * 90
  return {
    transform: `rotate(${deg}deg) translateY(-${NODE_RADIUS_REM}rem) rotate(-${deg}deg)`,
  }
}

function canPointerFx(): boolean {
  if (!import.meta.client) return false
  if (reducedMotion.value === 'reduce') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

let orbitControls: AnimationPlaybackControls | null = null

function onPointerMove(event: PointerEvent) {
  const hub = hubRef.value
  const field = fieldRef.value
  if (!hub || !field || !canPointerFx()) return

  const rect = field.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const nx = (event.clientX - rect.left) / rect.width - 0.5
  const ny = (event.clientY - rect.top) / rect.height - 0.5

  animate(
    hub,
    { x: nx * HUB_PARALLAX * 2, y: ny * HUB_PARALLAX * 2 },
    { type: 'spring', stiffness: 220, damping: 22 },
  )
}

function onPointerLeave() {
  const hub = hubRef.value
  if (!hub || reducedMotion.value === 'reduce') return
  animate(hub, { x: 0, y: 0 }, { type: 'spring', stiffness: 180, damping: 20 })
}

function onNodeEnter(i: number) {
  const el = nodeInners.value[i]
  if (!el || !canPointerFx()) return
  animate(el, { scale: 1.08 }, { type: 'spring', stiffness: 320, damping: 18 })
}

function onNodeLeave(i: number) {
  const el = nodeInners.value[i]
  if (!el || reducedMotion.value === 'reduce') return
  animate(el, { scale: 1 }, { type: 'spring', stiffness: 280, damping: 20 })
}

function drawSpokes() {
  for (const path of spokeEls.value) {
    if (!path) continue
    path.style.strokeDasharray = '1'
    path.style.strokeDashoffset = '1'
    animate(
      path,
      { strokeDashoffset: 0 },
      {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.35,
      },
    )
  }
}

function startOrbit() {
  const orbit = orbitRef.value
  if (!orbit) return

  orbitControls?.stop()
  orbitControls = animate(
    orbit,
    { rotate: 360 },
    { duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' },
  )
}

function onScrollLeave() {
  const root = rootRef.value
  if (!root || reducedMotion.value === 'reduce' || !canPointerFx()) return

  const rect = root.getBoundingClientRect()
  const vh = window.innerHeight || 1
  // As the hub scrolls up out of view, ease opacity + slight y.
  const progress = Math.min(1, Math.max(0, -rect.top / (vh * 0.55)))
  const opacity = 1 - progress * 0.55
  const y = progress * 28
  root.style.opacity = String(opacity)
  root.style.transform = `translateY(${y}px)`
}

onMounted(() => {
  if (reducedMotion.value === 'reduce') {
    // Final state: spokes fully drawn, no orbit.
    for (const path of spokeEls.value) {
      if (path) path.style.strokeDashoffset = '0'
    }
    return
  }

  // Entrance: field fades/scales in, then spokes draw, then orbit runs.
  const field = fieldRef.value
  if (field) {
    field.style.opacity = '0'
    animate(
      field,
      { opacity: [0, 1], scale: [0.92, 1] },
      { duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
    ).finished.then(() => {
      drawSpokes()
      startOrbit()
    })
  } else {
    drawSpokes()
    startOrbit()
  }

  if (import.meta.client && canPointerFx()) {
    window.addEventListener('scroll', onScrollLeave, { passive: true })
  }
})

onUnmounted(() => {
  orbitControls?.stop()
  if (import.meta.client) {
    window.removeEventListener('scroll', onScrollLeave)
  }
})
</script>
