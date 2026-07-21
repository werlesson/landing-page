<template>
  <section
    id="contact"
    class="relative w-full overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-24"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      aria-hidden="true"
      :style="gridBackgroundStyle"
    />

    <div
      class="pointer-events-none absolute -top-48 -right-48 h-96 w-96 rounded-full opacity-20 blur-3xl animate-pulse [animation-duration:2s] [animation-timing-function:cubic-bezier(0.4,0,0.6,1)]"
      style="background: radial-gradient(circle, #39ff14 0%, transparent 70%)"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-0 -left-32 h-72 w-72 rounded-full opacity-20 blur-3xl animate-pulse [animation-delay:1000ms] [animation-duration:2s] [animation-timing-function:cubic-bezier(0.4,0,0.6,1)]"
      style="background: radial-gradient(circle, #39ff14 0%, transparent 70%)"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl">
      <div ref="revealRef">
        <div
          class="mb-14 text-center transition-all duration-1000 ease-out md:mb-20"
          :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
        >
          <p class="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent/80">
            {{ $t('contact.cta') }}
          </p>
          <h2
            class="relative inline-block font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            <span class="relative z-10">{{ $t('contact.title') }}</span>
            <span
              class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-accent blur-2xl opacity-30"
              aria-hidden="true"
            >
              {{ $t('contact.title') }}
            </span>
          </h2>
          <div
            class="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            aria-hidden="true"
          />
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-textMuted md:text-xl">
            {{ $t('contact.subtitle') }}
          </p>
          <p
            class="mx-auto mt-5 inline-flex max-w-2xl items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-4 py-1.5 text-sm font-medium text-accent"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {{ $t('contact.lookingFor') }}
          </p>
          <p class="mx-auto mt-4 max-w-2xl text-sm text-textMuted/80">
            {{ $t('contact.englishLevel') }}
          </p>
          <p class="mx-auto mt-2 max-w-2xl text-sm text-textMuted/80">
            {{ $t('contact.location') }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-12 transition-all delay-200 duration-1000 ease-out lg:grid-cols-2 lg:gap-16 xl:gap-20"
          :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
        >
          <div class="order-1">
            <form class="space-y-6" @submit.prevent="onSubmit">
              <div>
                <label for="contact-name" class="mb-2 block text-sm font-medium text-foreground">
                  {{ $t('contact.fields.name') }}
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition duration-300 ease-out focus:border-accent"
                />
              </div>
              <div>
                <label for="contact-email" class="mb-2 block text-sm font-medium text-foreground">
                  {{ $t('contact.fields.email') }}
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition duration-300 ease-out focus:border-accent"
                />
              </div>
              <div>
                <label for="contact-message" class="mb-2 block text-sm font-medium text-foreground">
                  {{ $t('contact.fields.message') }}
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  class="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition duration-300 ease-out focus:border-accent"
                />
              </div>

              <button
                type="submit"
                class="relative w-full overflow-hidden rounded-lg bg-accent py-4 text-base font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {{ $t('contact.submit') }}
              </button>

              <Transition name="contact-success">
                <p
                  v-if="submitted"
                  class="text-center text-base font-medium leading-relaxed text-accent"
                  role="status"
                >
                  {{ $t('contact.success') }}
                </p>
              </Transition>
            </form>
          </div>

          <div class="order-2">
            <h3 class="mb-8 font-display text-xl font-bold text-foreground md:text-2xl">
              {{ $t('contact.directTitle') }}
            </h3>
            <ul class="flex flex-col gap-4" role="list">
              <li v-for="item in socialLinks" :key="item.id">
                <a
                  :href="item.href"
                  class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 ease-out hover:translate-x-[4px] hover:border-accent hover:text-accent"
                  :aria-label="$t(item.ariaKey)"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  :download="item.download ? '' : undefined"
                >
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-all duration-300 group-hover:border-accent group-hover:text-accent"
                  >
                    <svg
                      v-if="item.id === 'github'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.481 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else-if="item.id === 'linkedin'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                    <svg
                      v-else-if="item.id === 'email'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
                      />
                      <path
                        d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M12 15V3" />
                      <path d="m17 10-5 5-5-5" />
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    </svg>
                  </span>
                  <span class="min-w-0 flex-1 text-left">
                    <span
                      class="block text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-accent"
                    >
                      {{ $t(item.labelKey) }}
                    </span>
                    <span
                      v-if="item.handleKey"
                      class="mt-0.5 block truncate font-mono text-sm text-textMuted transition-colors duration-300 group-hover:text-accent"
                    >
                      {{ $t(item.handleKey) }}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}

type SocialLink = {
  id: 'github' | 'linkedin' | 'email' | 'resume'
  href: string
  external: boolean
  download?: boolean
  labelKey: string
  handleKey?: string
  ariaKey: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/werlesson',
    external: true,
    labelKey: 'contact.social.linkedin.label',
    handleKey: 'contact.social.linkedin.handle',
    ariaKey: 'contact.social.linkedin.aria',
  },
  {
    id: 'github',
    href: 'https://github.com/werlesson',
    external: true,
    labelKey: 'contact.social.github.label',
    handleKey: 'contact.social.github.handle',
    ariaKey: 'contact.social.github.aria',
  },
  {
    id: 'email',
    href: 'mailto:werlessono@gmail.com',
    external: false,
    labelKey: 'contact.social.email.label',
    handleKey: 'contact.social.email.handle',
    ariaKey: 'contact.social.email.aria',
  },
  {
    id: 'resume',
    href: '/CV_Werlesson_Vieira.pdf',
    external: false,
    download: true,
    labelKey: 'contact.resume.label',
    ariaKey: 'contact.resume.aria',
  },
]

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)

function onSubmit() {
  submitted.value = false
  requestAnimationFrame(() => {
    submitted.value = true
  })
}

const revealRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)

const { stop } = useIntersectionObserver(
  revealRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting
    if (isIntersecting) {
      sectionVisible.value = true
      stop()
    }
  },
  { threshold: 0.08 },
)
</script>

<style scoped>
.contact-success-enter-active,
.contact-success-leave-active {
  transition: opacity 0.5s ease;
}
.contact-success-enter-from,
.contact-success-leave-to {
  opacity: 0;
}
</style>
