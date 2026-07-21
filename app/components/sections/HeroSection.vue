<template>
  <section ref="heroRef" class="relative min-h-dvh overflow-hidden bg-background">
    <div class="hero-grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-0" aria-hidden="true" :style="spotlightStyle" />

    <div
      class="absolute top-20 left-[15%] h-2 w-2 rounded-full bg-accent opacity-60 animate-hero-float-slow"
      aria-hidden="true"
    />
    <div
      class="absolute top-40 right-[20%] h-1 w-1 rounded-full bg-accent opacity-40 animate-hero-float"
      aria-hidden="true"
    />
    <div
      class="absolute bottom-32 left-[25%] h-1.5 w-1.5 rounded-full bg-accent opacity-50 animate-hero-float-reverse"
      aria-hidden="true"
    />

    <div
      class="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] opacity-20"
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 600" class="h-full w-full">
        <line x1="600" y1="0" x2="0" y2="600" stroke="#39ff14" stroke-width="1" opacity="0.3" />
        <line x1="600" y1="100" x2="100" y2="600" stroke="#39ff14" stroke-width="1" opacity="0.2" />
        <line x1="600" y1="200" x2="200" y2="600" stroke="#39ff14" stroke-width="1" opacity="0.1" />
      </svg>
    </div>

    <svg class="pointer-events-none absolute inset-0 z-[14]" aria-hidden="true">
      <circle
        v-for="p in particles"
        :key="p.id"
        :cx="p.x"
        :cy="p.y"
        :r="3 * p.life"
        fill="#39ff14"
        :opacity="p.life * 0.8"
      />
    </svg>

    <div
      class="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl items-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 pt-14 pb-1 sm:pt-16"
    >
      <div
        class="grid w-full grid-cols-1 items-center gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5 lg:py-4"
      >
        <div class="space-y-5 lg:col-span-7 lg:space-y-6">
          <div ref="nameBlockRef">
            <h1
              class="hero-glitch-title font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              :class="{ 'is-glitching': glitchActive }"
              :data-text="fullName"
            >
              <span class="relative z-[1] inline-flex flex-wrap text-foreground">
                <span>{{ $t('hero.namePrefix') }}</span>
                <span class="neon-glow text-accent">{{ $t('hero.nameGlow') }}</span>
                <span>{{ $t('hero.nameSuffix') }}</span>
              </span>
            </h1>
            <p class="mt-3 font-display text-xl font-semibold text-accent sm:text-2xl lg:text-3xl">
              {{ $t('hero.title') }}
            </p>
          </div>

          <div ref="typewriterBlockRef" class="flex items-center gap-3">
            <svg
              class="h-5 w-5 shrink-0 text-accent/60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" x2="20" y1="19" y2="19" />
            </svg>
            <div class="flex min-h-[1.2em] items-center">
              <span class="mr-2 font-mono text-sm text-accent/60">$</span>
              <h2 class="font-mono text-xl font-semibold text-foreground sm:text-2xl lg:text-3xl">
                {{ typewriterDisplay
                }}<span
                  class="ml-0.5 inline-block h-[1.1em] w-0.5 animate-blink bg-accent [vertical-align:-0.125em]"
                />
              </h2>
            </div>
          </div>

          <p
            ref="subtitleBlockRef"
            class="max-w-lg text-base font-medium leading-relaxed text-foreground sm:text-lg"
          >
            {{ $t('hero.subtitle') }}
          </p>

          <div ref="ctaBlockRef" class="flex flex-col gap-3 pt-3 sm:flex-row sm:items-stretch">
            <div
              ref="ctaMagnetRef"
              class="will-change-transform sm:inline-flex"
              @pointermove="onCtaMove"
              @pointerleave="onCtaLeave"
            >
              <NuxtLink
                :to="{ path: localePath({ path: '/' }), hash: '#projects' }"
                class="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-accent px-8 py-4 font-semibold text-background transition-shadow duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                @mouseenter="isHoveringCta = true"
                @mouseleave="isHoveringCta = false"
              >
                <span
                  class="absolute inset-0 bg-gradient-to-r from-accent via-[#50ff30] to-accent bg-[length:200%_100%] animate-shimmer opacity-90"
                />
                <span class="relative flex items-center gap-3">
                  {{ $t('hero.ctaProjects') }}
                  <svg
                    class="h-5 w-5 transition-transform group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </NuxtLink>
            </div>
            <a
              href="/CV_Werlesson_Vieira.pdf"
              download
              class="group inline-flex items-center justify-center gap-3 rounded-lg border border-accent/30 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 15V3" />
                <path d="m17 10-5 5-5-5" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              </svg>
              {{ $t('hero.ctaCv') }}
            </a>
            <a
              href="https://www.linkedin.com/in/werlesson"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('hero.ctaLinkedInAria')"
              class="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/10 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              {{ $t('hero.ctaLinkedIn') }}
            </a>
          </div>

          <div ref="statsBlockRef" class="flex flex-wrap gap-6 pt-5 sm:gap-8 sm:pt-6 lg:gap-10">
            <div class="group relative">
              <div class="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
                {{ counters.years }}<span class="text-accent">{{ statSuffixPlus }}</span>
              </div>
              <div class="mt-1 text-xs uppercase tracking-wider text-textMuted">
                {{ $t('hero.stats.years') }}
              </div>
              <div
                class="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
              />
            </div>
            <div class="group relative">
              <div class="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
                {{ counters.projects }}<span class="text-accent">{{ statSuffixPlus }}</span>
              </div>
              <div class="mt-1 text-xs uppercase tracking-wider text-textMuted">
                {{ $t('hero.stats.projects') }}
              </div>
              <div
                class="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
              />
            </div>
            <div class="group relative">
              <div class="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
                {{ counters.saas }}<span class="text-accent">{{ statSuffixEmpty }}</span>
              </div>
              <div class="mt-1 text-xs uppercase tracking-wider text-textMuted">
                {{ $t('hero.stats.saas') }}
              </div>
              <div
                class="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
              />
            </div>
          </div>
        </div>

        <div ref="visualBlockRef" class="flex justify-center lg:col-span-5 lg:justify-end">
          <SectionsHeroSignalHub />
        </div>

        <div
          ref="scrollBlockRef"
          class="relative z-[17] col-span-1 -mt-6 flex flex-col items-center gap-1.5 pt-0 sm:-mt-8 lg:col-span-12 lg:-mt-10 lg:pt-0"
          aria-hidden="true"
        >
          <div class="flex h-8 w-5 justify-center rounded-full border border-accent/30 pt-2">
            <div class="h-2 w-1 animate-scroll-indicator rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[16] h-10 bg-gradient-to-t from-background/50 from-0% via-background/15 via-28% to-transparent to-80% sm:h-11 md:h-14 lg:h-16"
      aria-hidden="true"
    />
  </section>
</template>

<script setup lang="ts">
import { animate } from 'motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

const { tm, locale, t } = useI18n()
const localePath = useLocalePath()

// Honor prefers-reduced-motion (UI-03) for the JS-driven hero animations that a
// CSS media query cannot reach (counters, typewriter, glitch, particles, motion).
const reducedMotion = usePreferredReducedMotion()

const heroRef = ref<HTMLElement | null>(null)
const nameBlockRef = ref<HTMLElement | null>(null)
const typewriterBlockRef = ref<HTMLElement | null>(null)
const subtitleBlockRef = ref<HTMLElement | null>(null)
const ctaBlockRef = ref<HTMLElement | null>(null)
const statsBlockRef = ref<HTMLElement | null>(null)
const visualBlockRef = ref<HTMLElement | null>(null)
const scrollBlockRef = ref<HTMLElement | null>(null)
const ctaMagnetRef = ref<HTMLElement | null>(null)

const isHoveringCta = ref(false)
const glitchActive = ref(false)
const particles = ref<Particle[]>([])
const particleId = ref(0)
const mousePosition = reactive({ x: 0, y: 0 })

const counters = reactive({
  years: 0,
  projects: 0,
  saas: 0,
})

const spotlightStyle = computed(() => ({
  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(57, 255, 20, 0.06), transparent 40%)`,
}))

const fullName = computed(
  () => `${t('hero.namePrefix')}${t('hero.nameGlow')}${t('hero.nameSuffix')}`,
)

const statSuffixPlus = '+'
const statSuffixEmpty = ''

const MAGNET_PX = 8

const statTargets = computed(() => {
  const raw = tm('hero.statTargets') as unknown
  if (!raw || typeof raw !== 'object') {
    return { years: 6, projects: 20, saas: 1 }
  }
  const o = raw as Record<string, number>
  return {
    years: Math.max(0, Number(o.years) || 6),
    projects: Math.max(0, Number(o.projects) || 20),
    saas: Math.max(0, Number(o.saas) || 1),
  }
})

function canFinePointer(): boolean {
  if (!import.meta.client) return false
  if (reducedMotion.value === 'reduce') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function onMouseMove(e: MouseEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mousePosition.x = e.clientX - rect.left
  mousePosition.y = e.clientY - rect.top
}

function onCtaMove(e: PointerEvent) {
  const el = ctaMagnetRef.value
  if (!el || !canFinePointer()) return
  const rect = el.getBoundingClientRect()
  if (!rect.width || !rect.height) return
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * MAGNET_PX * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * MAGNET_PX * 2
  animate(el, { x, y }, { duration: 0.18, ease: 'easeOut' })
}

function onCtaLeave() {
  const el = ctaMagnetRef.value
  if (!el || reducedMotion.value === 'reduce') return
  animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 320, damping: 22 })
}

function runEntranceChoreography() {
  if (reducedMotion.value === 'reduce') return

  const sequence: { el: HTMLElement | null; delay: number; x?: number }[] = [
    { el: nameBlockRef.value, delay: 0.05 },
    { el: typewriterBlockRef.value, delay: 0.14 },
    { el: subtitleBlockRef.value, delay: 0.22 },
    { el: ctaBlockRef.value, delay: 0.3 },
    { el: statsBlockRef.value, delay: 0.38 },
    { el: visualBlockRef.value, delay: 0.18, x: 36 },
    { el: scrollBlockRef.value, delay: 0.46 },
  ]

  for (const step of sequence) {
    if (!step.el) continue
    step.el.style.opacity = '0'
    animate(
      step.el,
      {
        opacity: [0, 1],
        y: [28, 0],
        ...(step.x != null ? { x: [step.x, 0] } : {}),
      },
      { duration: 0.7, delay: step.delay, ease: [0.16, 1, 0.3, 1] },
    )
  }
}

function createParticle(x: number, y: number): Particle {
  const id = particleId.value++
  const angle = Math.random() * Math.PI * 2
  const speed = Math.random() * 2 + 1
  return {
    id,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
  }
}

let rafId: number | null = null

function advanceParticles() {
  particles.value = particles.value
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      life: p.life - 0.02,
    }))
    .filter((p) => p.life > 0)
  if (!particles.value.length) {
    rafId = null
    return
  }
  rafId = requestAnimationFrame(advanceParticles)
}

function kickParticleLoop() {
  if (rafId == null && particles.value.length > 0) {
    rafId = requestAnimationFrame(advanceParticles)
  }
}

let spawnInterval: ReturnType<typeof setInterval> | undefined

watch(isHoveringCta, (hover) => {
  if (spawnInterval !== undefined) {
    clearInterval(spawnInterval)
    spawnInterval = undefined
  }
  if (!hover || reducedMotion.value === 'reduce') return
  spawnInterval = setInterval(() => {
    const next = [...particles.value]
    for (let i = 0; i < 3; i++) {
      next.push(createParticle(mousePosition.x, mousePosition.y))
    }
    particles.value = next.slice(-50)
    kickParticleLoop()
  }, 50)
})

const typewriterDisplay = ref('')

type Phase = 'typing' | 'pause' | 'deleting'
let phase: Phase = 'typing'
let charIndex = 0
let typeTimeoutId: ReturnType<typeof setTimeout> | undefined

const roleIdx = ref(0)
const activeFull = ref('')

const roles = computed(() => {
  const raw = tm('hero.capabilities') as unknown
  const len = Array.isArray(raw) ? raw.length : 0
  return Array.from({ length: len }, (_, i) => t(`hero.capabilities.${i}`)).filter(
    (s) => typeof s === 'string' && s.length > 0,
  )
})

function syncActiveFull() {
  const list = roles.value
  if (!list.length) {
    activeFull.value = ''
    return
  }
  activeFull.value = list[roleIdx.value % list.length] ?? ''
}

function clearTypeTimer() {
  if (typeTimeoutId !== undefined) clearTimeout(typeTimeoutId)
}

function scheduleType(ms: number, fn: () => void) {
  clearTypeTimer()
  typeTimeoutId = setTimeout(fn, ms)
}

function runTypewriterTick() {
  const full = activeFull.value
  if (!full) {
    syncActiveFull()
    if (!activeFull.value) return
  }

  const line = activeFull.value

  if (phase === 'typing') {
    if (charIndex < line.length) {
      charIndex += 1
      typewriterDisplay.value = line.slice(0, charIndex)
      scheduleType(80, runTypewriterTick)
    } else {
      phase = 'pause'
      scheduleType(2500, runTypewriterTick)
    }
    return
  }

  if (phase === 'pause') {
    phase = 'deleting'
    scheduleType(40, runTypewriterTick)
    return
  }

  if (charIndex > 0) {
    charIndex -= 1
    typewriterDisplay.value = line.slice(0, charIndex)
    scheduleType(40, runTypewriterTick)
  } else {
    const n = roles.value.length
    if (!n) return
    roleIdx.value = (roleIdx.value + 1) % n
    phase = 'typing'
    charIndex = 0
    syncActiveFull()
    if (!activeFull.value) return
    scheduleType(400, runTypewriterTick)
  }
}

function startTypewriter() {
  clearTypeTimer()
  typewriterDisplay.value = ''
  roleIdx.value = 0
  charIndex = 0
  phase = 'typing'
  syncActiveFull()
  if (!activeFull.value) return
  if (reducedMotion.value === 'reduce') {
    typewriterDisplay.value = activeFull.value
    return
  }
  scheduleType(320, runTypewriterTick)
}

let counterInterval: ReturnType<typeof setInterval> | undefined
let glitchInterval: ReturnType<typeof setInterval> | undefined
let glitchOffTimeout: ReturnType<typeof setTimeout> | undefined

function startCounters() {
  if (counterInterval !== undefined) clearInterval(counterInterval)
  if (reducedMotion.value === 'reduce') {
    const target = statTargets.value
    counters.years = target.years
    counters.projects = target.projects
    counters.saas = target.saas
    return
  }
  counters.years = 0
  counters.projects = 0
  counters.saas = 0
  const duration = 2000
  const steps = 60
  const interval = duration / steps
  let step = 0
  counterInterval = setInterval(() => {
    step += 1
    const progress = step / steps
    const easeOut = 1 - (1 - progress) ** 3
    const targets = statTargets.value
    counters.years = Math.round(targets.years * easeOut)
    counters.projects = Math.round(targets.projects * easeOut)
    counters.saas = Math.round(targets.saas * easeOut)
    if (step >= steps && counterInterval !== undefined) {
      clearInterval(counterInterval)
      counterInterval = undefined
    }
  }, interval)
}

function startGlitchLoop() {
  if (glitchInterval !== undefined) clearInterval(glitchInterval)
  if (reducedMotion.value === 'reduce') return
  glitchInterval = setInterval(() => {
    glitchActive.value = true
    if (glitchOffTimeout !== undefined) clearTimeout(glitchOffTimeout)
    glitchOffTimeout = setTimeout(() => {
      glitchActive.value = false
    }, 200)
  }, 4000)
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('mousemove', onMouseMove)
  }
  runEntranceChoreography()
  startCounters()
  startTypewriter()
  startGlitchLoop()
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('mousemove', onMouseMove)
  }
  if (counterInterval !== undefined) clearInterval(counterInterval)
  if (spawnInterval !== undefined) clearInterval(spawnInterval)
  if (glitchInterval !== undefined) clearInterval(glitchInterval)
  if (glitchOffTimeout !== undefined) clearTimeout(glitchOffTimeout)
  clearTypeTimer()
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})

watch(locale, () => {
  startTypewriter()
  startCounters()
})
</script>
