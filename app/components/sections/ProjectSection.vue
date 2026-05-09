<template>
  <section
    id="project"
    ref="sectionRef"
    class="relative flex w-full items-center justify-center overflow-hidden border-t border-b border-white/[0.07] bg-background px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-32"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
      aria-hidden="true"
    />
    <div
      class="w-full max-w-6xl transition-all duration-1000 ease-out"
      :class="
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      "
    >
      <div
        class="relative overflow-hidden rounded-2xl border border-[#2a2a3a] bg-[#12121a]"
      >
        <div class="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div class="absolute inset-0" :style="cardGridStyle" />
        </div>

        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-accent/[0.04]"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
          aria-hidden="true"
        />

        <div
          class="relative grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
        >
          <div
            class="order-2 flex flex-col justify-center space-y-6 lg:order-1"
          >
            <div
              class="transition-all duration-700 ease-out"
              :class="
                isVisible
                  ? 'translate-x-0 opacity-100 delay-100'
                  : '-translate-x-4 opacity-0'
              "
            >
              <div
                class="inline-flex w-fit items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
              >
                <span class="relative mr-2 flex h-2 w-2 shrink-0">
                  <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"
                  />
                  <span
                    class="relative inline-flex h-2 w-2 rounded-full bg-accent"
                  />
                </span>
                {{ $t('project.euNoPlay.badge') }}
              </div>
            </div>

            <h2
              class="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl transition-all duration-700 ease-out"
              :class="
                isVisible
                  ? 'translate-x-0 opacity-100 delay-200'
                  : '-translate-x-4 opacity-0'
              "
            >
              {{ $t('project.euNoPlay.titlePrefix') }}
              <span class="relative inline-block">
                <span class="text-accent">{{ $t('project.euNoPlay.titleAccent') }}</span>
                <span
                  class="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-accent to-transparent"
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p
              class="max-w-xl text-base leading-relaxed text-[#8a8a9a] sm:text-lg transition-all duration-700 ease-out"
              :class="
                isVisible
                  ? 'translate-x-0 opacity-100 delay-300'
                  : '-translate-x-4 opacity-0'
              "
            >
              {{ $t('project.euNoPlay.descriptionBeforeRaspberry') }}
              <span class="font-medium text-foreground">{{
                $t('project.euNoPlay.highlightRaspberry')
              }}</span>
              {{ $t('project.euNoPlay.descriptionMid') }}
              <span class="font-medium text-foreground">{{
                $t('project.euNoPlay.highlightHikvision')
              }}</span>
              {{ $t('project.euNoPlay.descriptionBeforeSeconds') }}
              <span class="font-mono font-bold text-accent">{{
                $t('project.euNoPlay.highlightSeconds')
              }}</span>
              {{ $t('project.euNoPlay.descriptionAfter') }}
            </p>

            <div
              class="flex flex-col gap-4 text-sm transition-all duration-700 ease-out sm:flex-row"
              :class="
                isVisible
                  ? 'translate-x-0 opacity-100 delay-[400ms]'
                  : '-translate-x-4 opacity-0'
              "
            >
              <div class="flex items-center gap-2 text-[#8a8a9a]">
                <svg
                  class="h-4 w-4 shrink-0 text-accent"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13a10 10 0 0 1 14 0" />
                  <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                  <path d="M2 8.82a15 15 0 0 1 20 0" />
                  <line x1="12" x2="12.01" y1="20" y2="20" />
                </svg>
                <span>{{ $t('project.euNoPlay.highlightWireless') }}</span>
              </div>
              <div class="flex items-center gap-2 text-[#8a8a9a]">
                <svg
                  class="h-4 w-4 shrink-0 text-accent"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.9 4.9c2.8-2.8 6.5-4.1 10.1-3.9" />
                  <path d="M7.5 7.5a10.2 10.2 0 0 1 9 9" />
                  <path d="M10.3 10.3a5 5 0 0 1 3.6 3.6" />
                  <path d="M12 12h.01" />
                </svg>
                <span>{{ $t('project.euNoPlay.highlightArena') }}</span>
              </div>
            </div>

            <div
              class="flex flex-wrap gap-2 pt-2 transition-all duration-700 ease-out"
              :class="
                isVisible
                  ? 'translate-x-0 opacity-100 delay-500'
                  : '-translate-x-4 opacity-0'
              "
            >
              <span
                v-for="(tag, index) in techTags"
                :key="`${tag}-${index}`"
                class="cursor-default rounded-full border border-[#2a2a3a] bg-[#1a1a24]/80 px-3 py-1.5 text-xs font-medium text-[#8a8a9a] transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:text-accent sm:text-sm"
                :style="{ transitionDelay: `${index * 50}ms` }"
              >
                {{ tag }}
              </span>
            </div>

            <div
              class="pt-4 transition-all duration-700 ease-out"
              :class="
                isVisible
                  ? 'translate-x-0 opacity-100 delay-[600ms]'
                  : '-translate-x-4 opacity-0'
              "
            >
              <a
                href="https://www.eunoplay.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-accent px-8 text-base font-semibold text-background transition-all duration-300 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#12121a]"
                :aria-label="$t('project.euNoPlay.ctaAria')"
              >
                <span class="relative z-10 flex items-center">
                  {{ $t('project.euNoPlay.cta') }}
                  <svg
                    class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                <span
                  class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div
            class="order-1 flex items-center justify-center lg:order-2 lg:justify-end transition-all delay-300 duration-1000 ease-out"
            :class="isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
          >
            <div class="relative w-full max-w-md">
              <div
                class="pointer-events-none absolute inset-0 scale-150 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-3xl"
                aria-hidden="true"
              />

              <div
                class="relative rounded-3xl border border-[#2a2a3a] bg-gradient-to-br from-[#1a1a24] via-[#12121a] to-[#1a1a24] p-6 sm:p-8"
              >
                <div class="mb-6 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    <span
                      class="text-xs font-mono uppercase tracking-wider text-accent/80"
                    >
                      {{ $t('project.euNoPlay.mockCameraModel') }}
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5" aria-hidden="true">
                    <div class="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    <div class="h-1.5 w-1.5 rounded-full bg-accent/40" />
                    <div class="h-1.5 w-1.5 rounded-full bg-accent/20" />
                  </div>
                </div>

                <div
                  class="relative mb-6 aspect-video overflow-hidden rounded-xl border border-[#2a2a3a] bg-background/50"
                >
                  <div
                    class="pointer-events-none absolute inset-0 opacity-10"
                    :style="scanlineStyle"
                  />

                  <div
                    class="absolute inset-4 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div
                      class="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-accent/20"
                    >
                      <div class="h-1/2 w-1/3 rounded border border-accent/30" />
                    </div>
                  </div>

                  <div class="absolute top-3 left-3 flex items-center gap-2">
                    <div
                      class="flex items-center gap-1.5 rounded border bg-background/80 px-2 py-1"
                      :class="
                        isRecording ? 'border-red-500' : 'border-[#2a2a3a]'
                      "
                    >
                      <div
                        class="h-2 w-2 rounded-full"
                        :class="
                          isRecording
                            ? 'animate-pulse bg-red-500'
                            : 'bg-accent'
                        "
                      />
                      <span
                        class="text-xs font-mono"
                        :class="
                          isRecording ? 'text-red-500' : 'text-accent'
                        "
                      >
                        {{
                          isRecording
                            ? $t('project.euNoPlay.recCapturing')
                            : $t('project.euNoPlay.recIdle')
                        }}
                      </span>
                    </div>
                  </div>

                  <div
                    class="absolute top-3 right-3 rounded border border-[#2a2a3a] bg-background/80 px-2 py-1"
                  >
                    <span class="text-xs font-mono text-[#8a8a9a]">{{
                      clock
                    }}</span>
                  </div>

                  <Transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <div
                      v-if="showReplay"
                      class="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
                    >
                      <div class="flex flex-col items-center gap-2">
                        <div
                          class="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20"
                        >
                          <svg
                            class="h-6 w-6 text-accent"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-accent">{{
                          $t('project.euNoPlay.replaySaved')
                        }}</span>
                      </div>
                    </div>
                  </Transition>
                </div>

                <div class="flex items-center justify-between">
                  <div class="min-w-0 flex-1">
                    <div class="mb-2 flex items-center justify-between gap-2">
                      <span class="text-xs text-[#8a8a9a]">{{
                        $t('project.euNoPlay.bufferLabel')
                      }}</span>
                      <span class="shrink-0 font-mono text-xs text-accent">{{
                        t('project.euNoPlay.bufferTick', { n: countdown })
                      }}</span>
                    </div>
                    <div
                      class="h-1.5 overflow-hidden rounded-full bg-background"
                    >
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent transition-all duration-1000 ease-linear"
                        :style="{ width: `${bufferPercent}%` }"
                      />
                    </div>
                  </div>

                  <div class="ml-6 flex flex-col items-center">
                    <button
                      type="button"
                      class="relative h-14 w-14 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#12121a]"
                      :class="
                        isRecording
                          ? 'scale-95 bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                          : 'bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:from-zinc-600 hover:to-zinc-800 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] active:scale-95'
                      "
                      :aria-label="$t('project.euNoPlay.captureAria')"
                      @click="onCaptureClick"
                    >
                      <span
                        class="absolute inset-2 rounded-full border-2 transition-colors duration-300"
                        :class="
                          isRecording ? 'border-red-300' : 'border-accent/50'
                        "
                      />
                    </button>
                    <span
                      class="mt-2 text-[10px] uppercase tracking-wider text-[#8a8a9a]"
                    >
                      {{ $t('project.euNoPlay.captureLabel') }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full border border-accent/20"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full border border-accent/10"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute top-1/2 -left-8 h-px w-8 bg-gradient-to-r from-transparent to-accent/30"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute top-1/3 -right-8 h-px w-8 bg-gradient-to-l from-transparent to-accent/30"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div
        class="mt-8 flex items-center justify-center gap-3 text-sm text-[#8a8a9a]"
      >
        <span
          class="h-px w-12 bg-gradient-to-r from-transparent to-[#2a2a3a]"
          aria-hidden="true"
        />
        <span class="text-xs font-medium uppercase tracking-[0.2em]">{{
          $t('project.sectionTitle')
        }}</span>
        <span
          class="h-px w-12 bg-gradient-to-l from-transparent to-[#2a2a3a]"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale, getLocaleMessage, t } = useI18n()

const cardGridStyle = {
  backgroundImage: `
    linear-gradient(to right, #39ff14 1px, transparent 1px),
    linear-gradient(to bottom, #39ff14 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
}

const scanlineStyle = {
  backgroundImage:
    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)',
}

function euNoPlayTags(): string[] {
  const root = getLocaleMessage(locale.value)
  if (!root || typeof root !== 'object') return []
  const project = (root as Record<string, unknown>).project
  if (!project || typeof project !== 'object') return []
  const euNoPlay = (project as Record<string, unknown>).euNoPlay
  if (!euNoPlay || typeof euNoPlay !== 'object') return []
  const list = (euNoPlay as Record<string, unknown>).tags
  if (!Array.isArray(list)) return []
  return list.filter((item): item is string => typeof item === 'string')
}

const techTags = computed(() => euNoPlayTags())

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.1 },
)

const countdown = ref(25)
const isRecording = ref(false)
const showReplay = ref(false)
const clock = ref('')

const bufferPercent = computed(
  () => ((25 - countdown.value) / 25) * 100,
)

let tickInterval: ReturnType<typeof setInterval> | null = null
let captureTimeout: ReturnType<typeof setTimeout> | undefined
let replayTimeout: ReturnType<typeof setTimeout> | undefined

function updateClock() {
  if (!import.meta.client) return
  clock.value = new Date().toLocaleTimeString(
    locale.value === 'pt' ? 'pt-BR' : 'en-US',
    { hour: '2-digit', minute: '2-digit', second: '2-digit' },
  )
}

function runCaptureSequence() {
  if (captureTimeout !== undefined) clearTimeout(captureTimeout)
  if (replayTimeout !== undefined) clearTimeout(replayTimeout)
  isRecording.value = true
  showReplay.value = true
  captureTimeout = setTimeout(() => {
    isRecording.value = false
    replayTimeout = setTimeout(() => {
      showReplay.value = false
    }, 2000)
  }, 1500)
}

function onCaptureClick() {
  runCaptureSequence()
}

watch(isVisible, (visible) => {
  if (!visible || !import.meta.client) return
  updateClock()
  if (tickInterval != null) return
  tickInterval = setInterval(() => {
    updateClock()
    if (countdown.value <= 1) {
      runCaptureSequence()
      countdown.value = 25
    } else {
      countdown.value -= 1
    }
  }, 1000)
})

watch(locale, () => updateClock())

onUnmounted(() => {
  if (tickInterval != null) {
    clearInterval(tickInterval)
    tickInterval = null
  }
  if (captureTimeout !== undefined) clearTimeout(captureTimeout)
  if (replayTimeout !== undefined) clearTimeout(replayTimeout)
})
</script>
