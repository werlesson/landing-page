<template>
  <div class="flex min-h-dvh flex-col bg-background font-body text-textPrimary">
    <a
      href="#main"
      class="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-background shadow-lg transition-transform duration-200 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      @click="skipToMain"
    >
      {{ $t('nav.skipToContent') }}
    </a>

    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
      :class="
        scrolled
          ? 'border-b border-white/10 backdrop-blur-md bg-black/60'
          : 'border-b border-transparent bg-transparent'
      "
    >
      <div
        v-if="scrolled"
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        :class="
          scrolled
            ? '[&_a]:focus-visible:ring-offset-black/60 [&_button]:focus-visible:ring-offset-black/60'
            : ''
        "
      >
        <NuxtLink
          :to="localePath({ path: '/' })"
          class="rounded-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :class="scrolled ? 'focus-visible:ring-offset-black/60' : ''"
          :aria-label="$t('brand.logoAria')"
        >
          <AppBrandLogo variant="icon" size="sm" />
        </NuxtLink>

        <nav
          class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7"
          :aria-label="$t('nav.primaryAria')"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.hash"
            :to="{ path: homePath, hash: `#${item.hash}` }"
            class="rounded text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :class="[
              scrolled ? 'focus-visible:ring-offset-black/60' : '',
              activeHash === item.hash
                ? 'font-semibold text-accent'
                : 'text-textPrimary/90 hover:text-accent',
            ]"
          >
            {{ $t(item.labelKey) }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <div
            class="flex rounded-lg border border-white/10 p-0.5"
            role="group"
            :aria-label="$t('lang.switchAria')"
          >
            <button
              type="button"
              class="rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              :class="[
                locale === 'pt'
                  ? 'bg-accent/15 text-accent'
                  : 'text-textPrimary/75 hover:text-textPrimary',
                scrolled
                  ? 'focus-visible:ring-offset-black/60'
                  : 'focus-visible:ring-offset-background',
              ]"
              :aria-current="locale === 'pt' ? 'true' : undefined"
              @click="setLocale('pt')"
            >
              {{ $t('lang.switchToPt') }}
            </button>
            <button
              type="button"
              class="rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              :class="[
                locale === 'en'
                  ? 'bg-accent/15 text-accent'
                  : 'text-textPrimary/75 hover:text-textPrimary',
                scrolled
                  ? 'focus-visible:ring-offset-black/60'
                  : 'focus-visible:ring-offset-background',
              ]"
              :aria-current="locale === 'en' ? 'true' : undefined"
              @click="setLocale('en')"
            >
              {{ $t('lang.switchToEn') }}
            </button>
          </div>

          <button
            ref="menuToggleRef"
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-textPrimary transition-colors hover:bg-white/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden"
            :class="
              scrolled
                ? 'focus-visible:ring-offset-black/60'
                : 'focus-visible:ring-offset-background'
            "
            :aria-expanded="mobileOpen"
            :aria-controls="mobileNavId"
            :aria-label="mobileOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
            @click="mobileOpen = !mobileOpen"
          >
            <span class="sr-only">
              {{ mobileOpen ? $t('nav.closeMenu') : $t('nav.openMenu') }}
            </span>
            <svg
              v-if="!mobileOpen"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-show="mobileOpen"
          :id="mobileNavId"
          ref="mobileNavPanelRef"
          class="border-t border-white/10 bg-black/80 backdrop-blur-md lg:hidden"
          :aria-hidden="!mobileOpen"
        >
          <nav
            class="flex flex-col gap-1 px-6 py-4 sm:px-8 md:px-12"
            :aria-label="$t('nav.mobileAria')"
          >
            <NuxtLink
              v-for="item in navItems"
              :key="item.hash"
              :to="{ path: homePath, hash: `#${item.hash}` }"
              class="rounded-lg px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
              :class="
                activeHash === item.hash
                  ? 'bg-white/10 text-accent'
                  : 'text-textPrimary hover:bg-white/5 hover:text-accent'
              "
              @click="mobileOpen = false"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </header>

    <main id="main" tabindex="-1" class="flex flex-1 flex-col outline-none">
      <slot />
    </main>

    <footer
      class="relative mt-auto border-t border-white/[0.07] bg-gradient-to-b from-background to-[#06060a]"
    >
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div
          class="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
        >
          <div class="max-w-md text-center sm:max-w-lg sm:text-left">
            <NuxtLink
              :to="localePath({ path: '/' })"
              class="group inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              :aria-label="$t('brand.logoAria')"
            >
              <AppBrandLogo
                variant="lockup"
                size="lg"
                class="opacity-95 transition-opacity duration-200 group-hover:opacity-100"
              />
            </NuxtLink>
            <p class="mt-4 text-[15px] leading-relaxed text-textMuted sm:text-sm">
              {{ $t('footer.tagline') }}
            </p>
          </div>

          <nav
            class="flex shrink-0 items-center gap-1 sm:pt-1"
            :aria-label="$t('footer.socialNavAria')"
          >
            <a
              :href="social.github"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg p-2.5 text-foreground/45 transition-colors duration-200 hover:bg-white/[0.04] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              :aria-label="$t('footer.githubAria')"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>
            <a
              :href="social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg p-2.5 text-foreground/45 transition-colors duration-200 hover:bg-white/[0.04] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              :aria-label="$t('footer.linkedinAria')"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </nav>
        </div>

        <div
          class="mt-10 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p class="text-xs text-textMuted/80">{{ $t('footer.copyright') }}</p>
          <p class="font-mono text-[11px] text-textMuted/50">
            {{ $t('footer.colophon') }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileNavId = useId()

const { y } = useScroll(() => (import.meta.client ? window : undefined))
const scrolled = computed(() => y.value > 12)

const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const homePath = computed(() => localePath({ path: '/' }))

const navItems = [
  { hash: 'about', labelKey: 'nav.about' },
  { hash: 'projects', labelKey: 'nav.projects' },
  { hash: 'career', labelKey: 'nav.career' },
  { hash: 'blog', labelKey: 'nav.blog' },
  { hash: 'contact', labelKey: 'nav.contact' },
] as const

const mobileOpen = ref(false)
const menuToggleRef = ref<HTMLButtonElement | null>(null)
const mobileNavPanelRef = ref<HTMLElement | null>(null)
const activeHash = ref('')

function updateActiveHash() {
  if (!import.meta.client) return
  const headerOffset = 80
  let best = ''
  let bestDist = Number.POSITIVE_INFINITY
  for (const { hash } of navItems) {
    const el = document.getElementById(hash)
    if (!el) continue
    const { top, bottom } = el.getBoundingClientRect()
    if (bottom < headerOffset || top > window.innerHeight * 0.65) continue
    const dist = Math.abs(top - headerOffset)
    if (dist < bestDist) {
      bestDist = dist
      best = hash
    }
  }
  activeHash.value = best
}

function skipToMain(e: Event) {
  e.preventDefault()
  const el = document.getElementById('main')
  if (!el) return
  el.focus({ preventScroll: true })
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

watch(y, () => {
  updateActiveHash()
})

watch(
  () => route.hash,
  () => {
    nextTick(() => updateActiveHash())
  },
)

watch(mobileOpen, async (open, wasOpen) => {
  await nextTick()
  if (!import.meta.client) return
  if (open) {
    mobileNavPanelRef.value?.querySelector('a')?.focus()
  } else if (wasOpen === true) {
    menuToggleRef.value?.focus()
  }
})

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key !== 'Escape' || !mobileOpen.value) return
  e.preventDefault()
  mobileOpen.value = false
})

onMounted(() => {
  updateActiveHash()
})

const social = {
  github: 'https://github.com/werlesson',
  linkedin: 'https://www.linkedin.com/in/werlesson',
} as const
</script>
