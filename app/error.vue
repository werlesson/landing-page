<template>
  <div
    class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center"
  >
    <div class="hero-grid-texture pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
    <div
      class="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative z-10 flex flex-col items-center gap-8">
      <div
        class="font-display select-none text-[7rem] font-bold leading-none tracking-tight sm:text-[10rem]"
      >
        <span class="text-accent">4</span>
        <span class="text-foreground">0</span>
        <span class="text-accent">4</span>
      </div>

      <div class="space-y-3">
        <h1 class="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {{
            error?.statusCode === 404
              ? 'Página não encontrada'
              : 'Algo deu errado'
          }}
        </h1>
        <p class="max-w-sm text-base leading-relaxed text-textMuted">
          {{
            error?.statusCode === 404
              ? 'A rota que você procura não existe — mas o código está aqui.'
              : error?.message || 'Um erro inesperado aconteceu.'
          }}
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row">
        <button
          class="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-background transition-all duration-300 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          @click="handleGoHome"
        >
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Voltar ao início
        </button>

        <button
          class="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-6 py-3 font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          @click="handleGoBack"
        >
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 8L2 12l4 4" />
            <path d="M2 12h20" />
          </svg>
          Voltar
        </button>
      </div>

      <p class="font-mono text-xs text-textMuted/50">
        {{ error?.statusCode ?? '???' }} ·
        {{ error?.statusMessage || 'Unknown Error' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NuxtError {
  statusCode: number
  statusMessage: string
  message: string
}

defineProps<{ error: NuxtError | null }>()

async function handleGoHome() {
  await clearError({ redirect: '/' })
}

function handleGoBack() {
  if (import.meta.client) {
    window.history.back()
  }
}
</script>
