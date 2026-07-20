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
      class="relative z-10 container mx-auto flex min-h-dvh items-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 pt-14 pb-1 sm:pt-16"
    >
      <div
        class="grid w-full grid-cols-1 items-center gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5 lg:py-4"
      >
        <div class="space-y-5 lg:col-span-7 lg:space-y-6">
          <div :class="isVisible ? 'hero-fade-in-up hero-stagger-2' : 'opacity-0'">
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

          <div
            :class="
              isVisible
                ? 'hero-fade-in-up hero-stagger-3 flex items-center gap-3'
                : 'flex opacity-0'
            "
          >
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
            :class="
              isVisible
                ? 'hero-fade-in-up hero-stagger-4 max-w-lg text-base font-medium leading-relaxed text-foreground sm:text-lg'
                : 'max-w-lg opacity-0'
            "
          >
            {{ $t('hero.subtitle') }}
          </p>

          <p
            :class="
              isVisible
                ? 'hero-fade-in-up hero-stagger-4 max-w-lg text-base leading-relaxed text-textMuted sm:text-lg'
                : 'max-w-lg opacity-0'
            "
          >
            {{ $t('hero.description') }}
          </p>

          <div
            :class="
              isVisible
                ? 'hero-fade-in-up hero-stagger-5 flex flex-col gap-3 pt-3 sm:flex-row sm:items-stretch'
                : 'flex flex-col gap-3 pt-3 opacity-0 sm:flex-row sm:items-stretch'
            "
          >
            <NuxtLink
              :to="{ path: localePath({ path: '/' }), hash: '#projects' }"
              class="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg bg-accent px-8 py-4 font-semibold text-background transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          </div>

          <div
            :class="
              isVisible
                ? 'hero-fade-in-up hero-stagger-5 flex flex-wrap items-center gap-3 pt-1'
                : 'flex flex-wrap items-center gap-3 pt-1 opacity-0'
            "
          >
            <a
              v-for="link in socialLinks"
              :key="link.id"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :aria-label="$t(link.ariaKey)"
              class="group inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground/70 transition-all duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                v-if="link.id === 'linkedin'"
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
              <svg
                v-else-if="link.id === 'github'"
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.481 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
                />
                <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
                />
              </svg>
            </a>
          </div>

          <div
            :class="
              isVisible
                ? 'hero-fade-in-up hero-stagger-6 flex flex-wrap gap-6 pt-5 sm:gap-8 sm:pt-6 lg:gap-10'
                : 'flex flex-wrap gap-6 pt-5 opacity-0 sm:gap-8 sm:pt-6 lg:gap-10'
            "
          >
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
                {{ commitsFormatted }}<span class="text-accent">{{ statSuffixEmpty }}</span>
              </div>
              <div class="mt-1 text-xs uppercase tracking-wider text-textMuted">
                {{ $t('hero.stats.commits') }}
              </div>
              <div
                class="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
              />
            </div>
          </div>
        </div>

        <div
          class="flex justify-center lg:col-span-5 lg:justify-end"
          :class="isVisible ? 'hero-fade-in-right hero-stagger-4' : 'opacity-0'"
        >
          <div
            class="relative mx-auto h-80 w-full max-w-[18rem] select-none sm:h-96 sm:max-w-[20rem] lg:mx-0 lg:h-[440px] lg:max-w-none lg:w-96"
            aria-hidden="true"
          >
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

            <div
              class="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
            >
              <div
                class="relative h-[13rem] w-[13rem] sm:h-[14.5rem] sm:w-[14.5rem] lg:h-[17rem] lg:w-[17rem]"
              >
                <div class="absolute inset-0 animate-[spin_28s_linear_infinite]">
                  <span
                    class="absolute left-1/2 top-0 block h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(57,255,20,0.85)]"
                  />
                </div>
                <div class="absolute inset-0 animate-[spin_16s_linear_infinite_reverse]">
                  <span
                    class="absolute bottom-[10%] right-0 block h-1.5 w-1.5 rounded-full bg-accent/60 shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                  />
                </div>
                <div
                  class="absolute inset-0 flex items-center justify-center animate-[spin_38s_linear_infinite]"
                >
                  <div class="h-[70%] w-[70%] rounded-full border border-dotted border-accent/18" />
                </div>
              </div>
            </div>

            <div class="absolute inset-0 z-[2] flex items-center justify-center">
              <div class="relative">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div
                    class="h-[11.5rem] w-[11.5rem] rounded-full border border-accent/14 shadow-[0_0_52px_rgba(57,255,20,0.08)] animate-spin-slow sm:h-48 sm:w-48 lg:h-64 lg:w-64"
                  />
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div
                    class="h-36 w-36 rounded-full border border-dashed border-accent/25 animate-spin-reverse sm:h-40 sm:w-40 lg:h-[13.5rem] lg:w-[13.5rem]"
                  />
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div
                    class="h-24 w-24 rounded-full border border-accent/32 bg-accent/[0.04] shadow-[inset_0_0_22px_rgba(57,255,20,0.08)] animate-pulse lg:h-32 lg:w-32"
                  />
                </div>

                <div
                  class="relative z-[3] flex h-[4.9rem] w-[4.9rem] items-center justify-center overflow-hidden rounded-2xl border border-accent/45 bg-[#0a0a0f]/92 neon-border shadow-[0_0_36px_rgba(57,255,20,0.14)] backdrop-blur-md lg:h-[5.9rem] lg:w-[5.9rem]"
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

            <div
              class="animate-hero-float absolute left-0 top-7 z-[4] -rotate-1 rounded-lg border border-white/12 bg-card/90 px-2.5 py-1.5 font-mono text-xs shadow-lg shadow-black/40 backdrop-blur-md sm:top-8 sm:px-3 sm:py-2 sm:text-sm"
            >
              <span class="text-accent">&lt;</span>
              <span class="text-foreground">{{ $t('hero.floatTags.vue') }}</span>
              <span class="text-accent"> /&gt;</span>
            </div>

            <div
              class="animate-hero-float-reverse absolute right-0 top-[4.25rem] z-[4] rotate-1 rounded-lg border border-white/12 bg-card/90 px-2.5 py-1.5 font-mono text-xs shadow-lg shadow-black/40 backdrop-blur-md sm:top-24 sm:px-3 sm:py-2 sm:text-sm"
            >
              <span class="text-textMuted">{</span>
              <span class="text-[#ce9178]">{{ $t('hero.floatTags.tsMiddle') }}</span>
              <span class="text-textMuted">}</span>
            </div>

            <div
              class="animate-hero-float absolute bottom-[5.25rem] left-2 z-[4] -rotate-[0.5deg] rounded-lg border border-white/12 bg-card/90 px-2.5 py-1.5 font-mono text-xs shadow-lg shadow-black/40 backdrop-blur-md [animation-delay:1s] sm:bottom-24 sm:left-4 sm:px-3 sm:py-2 sm:text-sm"
            >
              <span class="text-[#6a9955]">{{ $t('hero.floatTags.stackHint') }}</span>
            </div>

            <div
              class="animate-hero-float-reverse absolute bottom-6 right-4 z-[4] rotate-[0.5deg] rounded-lg border border-white/12 bg-card/90 px-2.5 py-1.5 font-mono text-xs shadow-lg shadow-black/40 backdrop-blur-md [animation-delay:0.5s] sm:bottom-8 sm:right-8 sm:px-3 sm:py-2 sm:text-sm"
            >
              <span class="text-accent">$</span>
              <span class="text-foreground">{{ $t('hero.floatTags.npmRest') }}</span>
            </div>

            <svg
              class="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient :id="heroLineGradId" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#39ff14" stop-opacity="0" />
                  <stop offset="50%" stop-color="#39ff14" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="#39ff14" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 18 22 Q 38 38 50 50"
                fill="none"
                :stroke="`url(#${heroLineGradId})`"
                stroke-width="1.2"
                stroke-dasharray="6 5"
                class="animate-dash"
              />
              <path
                d="M 82 78 Q 58 58 50 50"
                fill="none"
                :stroke="`url(#${heroLineGradId})`"
                stroke-width="1.2"
                stroke-dasharray="6 5"
                class="animate-dash"
              />
            </svg>
          </div>
        </div>

        <div
          class="relative z-[17] col-span-1 -mt-6 flex flex-col items-center gap-1.5 pt-0 sm:-mt-8 lg:col-span-12 lg:-mt-10 lg:pt-0"
          :class="isVisible ? 'hero-fade-in-up hero-stagger-6' : 'opacity-0'"
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
// CSS media query cannot reach (counters, typewriter, glitch, particles).
const reducedMotion = usePreferredReducedMotion()

const heroLineGradId = `hl-${useId().replace(/[^a-zA-Z0-9_-]/g, '') || 'grad'}`

const heroRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHoveringCta = ref(false)
const glitchActive = ref(false)
const particles = ref<Particle[]>([])
const particleId = ref(0)
const mousePosition = reactive({ x: 0, y: 0 })

const counters = reactive({
  years: 0,
  projects: 0,
  commits: 0,
})

const spotlightStyle = computed(() => ({
  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(57, 255, 20, 0.06), transparent 40%)`,
}))

const fullName = computed(
  () => `${t('hero.namePrefix')}${t('hero.nameGlow')}${t('hero.nameSuffix')}`,
)

const commitsFormatted = computed(() =>
  counters.commits.toLocaleString(locale.value === 'pt' ? 'pt-BR' : 'en-US'),
)

const statSuffixPlus = '+'
const statSuffixEmpty = ''

type HeroSocialLink = {
  id: 'linkedin' | 'github' | 'email'
  href: string
  external: boolean
  ariaKey: string
}

const socialLinks: HeroSocialLink[] = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/werlesson',
    external: true,
    ariaKey: 'hero.social.linkedin.aria',
  },
  {
    id: 'github',
    href: 'https://github.com/werlesson',
    external: true,
    ariaKey: 'hero.social.github.aria',
  },
  {
    id: 'email',
    href: 'mailto:werlessono@gmail.com',
    external: false,
    ariaKey: 'hero.social.email.aria',
  },
]

const statTargets = computed(() => {
  const raw = tm('hero.statTargets') as unknown
  if (!raw || typeof raw !== 'object') {
    return { years: 8, projects: 24, commits: 2100 }
  }
  const o = raw as Record<string, number>
  return {
    years: Math.max(0, Number(o.years) || 8),
    projects: Math.max(0, Number(o.projects) || 24),
    commits: Math.max(0, Number(o.commits) || 2100),
  }
})

function onMouseMove(e: MouseEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mousePosition.x = e.clientX - rect.left
  mousePosition.y = e.clientY - rect.top
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
    counters.commits = target.commits
    return
  }
  counters.years = 0
  counters.projects = 0
  counters.commits = 0
  const duration = 2000
  const steps = 60
  const interval = duration / steps
  let step = 0
  counterInterval = setInterval(() => {
    step += 1
    const progress = step / steps
    const easeOut = 1 - (1 - progress) ** 3
    const t = statTargets.value
    counters.years = Math.round(t.years * easeOut)
    counters.projects = Math.round(t.projects * easeOut)
    counters.commits = Math.round(t.commits * easeOut)
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
  isVisible.value = true
  if (import.meta.client) {
    window.addEventListener('mousemove', onMouseMove)
  }
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
