# CONTEXT — werlesson.dev

## Sobre o projeto
Site de portfólio/CV pessoal. SSR com Nuxt 4.
Bilíngue: pt-BR (padrão) e en-US via @nuxtjs/i18n.
Otimizado para SEO e Google.

## Sobre o profissional
- Nome: Werlesson
- Cargo: Fullstack Developer (Vue 3 + Laravel)
- Localização: Brasil — remoto internacional
- Inglês: B1 (em evolução)
- Diferencial: solo founder mindset, produto + técnica + hardware (IoT)

## Stack do profissional
Frontend: Vue 3, Nuxt 3, TypeScript, TailwindCSS, Vite, PWA,
          PrimeVue, shadcn-vue, Pinia, Zod, Vee-Validate, VueUse
Backend:  Laravel PHP 8.3, DDD, State Machines, Redis, Horizon
Database: PostgreSQL (Supabase), MySQL
Infra:    Docker, Coolify, VPS self-hosted
Outros:   Raspberry Pi, Hikvision, LGPD

## Projeto em destaque
Eu no Play — grava jogadas esportivas com Raspberry Pi + câmera
Hikvision. Botão físico wireless captura os últimos 25s de gameplay.
Em testes em arena real. Visão: brand completo, pricing, contratos.

## Stack do SITE
- Nuxt 4 (ssr: true)
- Vue 3 + <script setup> + TypeScript
- TailwindCSS v3
- @nuxtjs/i18n
- @nuxtjs/sitemap
- @vueuse/nuxt
- nuxt-schema-org

## Estrutura de pastas
- App Nuxt em `app/`: páginas (`app/pages/`), layout global (`app/layouts/default.vue`), componentes (`app/components/…`).
- Seções da home: `app/components/sections/` (Hero, About, Stack, Project, Contact e subcomponentes como timeline e stack cards).
- Traduções na raiz do repositório: `locales/pt.json`, `locales/en.json` (configurados em `nuxt.config.ts` com `langDir: '../locales'`).

## Internacionalização (i18n)
- Arquivos completos por idioma; **nenhum texto de UI** nas seções ou no layout sem `$t()` / `t()` / `tm()` conforme o caso.
- Chaves de primeiro nível: `brand`, `lang`, `nav`, `hero`, `about`, `stack`, `project`, `contact`, `footer`.
- **Nav / layout:** `nav.primaryAria`, `nav.mobileAria`, `nav.skipToContent`; idioma: `lang.langPtAria`, `lang.langEnAria` (além de `switchAria` e rótulos PT/EN).
- **Hero:** o typewriter usa `hero.role1`, `hero.role2`, `hero.role3` (três chaves separadas, não um array `roles`). Os alvos dos contadores animados vêm de `hero.statTargets` (`years`, `projects`, `commits`), lidos com `tm('hero.statTargets')`.
- **About:** `about.stats` e `about.timeline` são **arrays JSON**; cada entrada da timeline inclui `tech` como array. O código deriva chaves do tipo `about.timeline.{i}.year`, `about.timeline.{i}.tech.{j}`, etc.
- **Stack:** títulos das colunas vêm de `stack.groups.frontend`, `backend`, `database`, `infra` (passados como `titleKey` para o grupo).
- **Project:** tags do card vêm de `project.euNoPlay.tags` (array de strings). O contador do buffer usa `project.euNoPlay.bufferTick` com interpolação nomeada `{n}` (ex.: `"-{n}s"`).
- **Escape na sintaxe Intlify (unplugin-vue-i18n):** o caractere `@` inicia *linked message*. Para exibir arroba literal (e-mails, handles), no JSON use **barra invertida dupla** antes do `@`: por exemplo `"werlesson\\@email.com"` — o compilador gera `werlesson@email.com` na UI. Sem esse escape, o build falha com *Invalid linked format*.

## Design tokens
Referência alinhada ao código: `tailwind.config.ts` (cores, fontes, keyframes globais), `app/assets/css/main.css` (hero, timeline, texturas nomeadas) e classes nas secções Vue (valores `#…` locais). **Não** existe token `primary` no Tailwind — usar `accent` (`text-accent`, `border-accent/30`, etc.). Focus ring: `focus-visible:ring-accent`.

### Cores — tema Tailwind (`theme.extend.colors`)
- **background** `#0a0a0f` — fundo global; também usado como `text-background` nos CTAs verdes.
- **accent** `#39ff14` — verde neon (marca, CTAs, anéis, ênfase).
- **foreground** `#f5f5f7` — títulos / texto de alto contraste.
- **textPrimary** `#f0f0f0` — cor base do `html` (body).
- **textMuted** `#6b7280` — secundário (ex.: subtítulo sob disponibilidade no hero).
- **card** `#121218` — superfície tipo card (tags flutuantes, alinhado à timeline).
- **border** `#1f1f28` — borda padrão (`border-border`).
- **surface** `#1a1a22` — token de superfície no tema (no Project aparece também `#1a1a24` em chips).

### Cores — só em componentes (fora do tema)
- **Project:** card `bg-[#12121a]`, bordas `#2a2a3a`, texto secundário `#8a8a9a`, tags `bg-[#1a1a24]/80`.
- **About:** parágrafos e labels de stats `#8a8a8a` (timeline / bio).
- **Shimmer do CTA hero:** meio do gradiente `via-[#50ff30]` entre `from-accent` e `to-accent`.
- **Glitch do nome (`.hero-glitch`):** canais `#ff00ff` / `#00ffff` nos pseudo-elementos durante o glitch.
- **REC ativo (mock):** estado de gravação com `red-500` (Tailwind) e sombra vermelha.

Opacidades úteis do accent (Tailwind): `/5`, `/10`, `/20`, `/30`, `/40`, `/50`, `/80`; em CSS puro manter `rgba(57, 255, 20, …)` quando combinar com sombras ou grids.

### Fontes
- **Display:** `font-display` → Syne (700 nos títulos principais).
- **Corpo:** `font-body` → DM Sans (400 no `html`, via `main.css`).
- **Carregamento:** apenas Syne + DM Sans em `nuxt.config.ts` (Google Fonts).
- **Mono:** `font-mono` do sistema nas tags flutuantes e na mock UI; realces arbitrários estilo editor no hero: `#ce9178` (TS), `#6a9955` (comentário). **Geist não está carregado** — não usar como família global na Project.

### Tamanhos tipográficos
- Hero (nome): `text-5xl sm:text-6xl lg:text-7xl xl:text-8xl`.
- Stack / Contact (título de secção): `text-5xl md:text-6xl lg:text-7xl`.
- About (título do bloco): `text-4xl md:text-5xl lg:text-6xl`.
- Project (título): `text-4xl sm:text-5xl lg:text-6xl`.
- Parágrafos: `text-base sm:text-lg` ou `text-lg md:text-xl` + `leading-relaxed`.
- Badge disponibilidade (hero): `text-sm` / `text-xs` conforme linha.
- Typewriter (roles): `font-mono text-xl sm:text-2xl lg:text-3xl`.
- Supertítulo stack: `text-xs` + `tracking-[0.3em]`.
- Label de categoria (stack): `text-xs font-semibold uppercase tracking-[0.2em]`.
- Tags mono flutuantes: `text-sm font-mono`.
- CAPTURAR: `text-[10px] uppercase tracking-wider`.

### Efeito neon no nome
Letra central com **`text-accent`** + classe **`.neon-glow`** em `main.css`:
`text-shadow: 0 0 5px rgba(57,255,20,0.5), 0 0 20px rgba(57,255,20,0.3), 0 0 40px rgba(57,255,20,0.1)`.  
Glitch no `h1`: classe **`.hero-glitch-title`** em `main.css`; burst com **`.hero-glitch-title.is-glitching`** (pseudo-elementos e keyframes `hero-glitch-1` / `hero-glitch-2`; cores `#ff00ff` / `#00ffff`).

### Marca no layout (`AppBrandLogo.vue`)
- **Ícone:** SVG 48×48 — monograma **W** sólido (`#39ff14`) + **quadrado** (ponto / “W.”), fundo **`#0c0c12`**, moldura `rounded-xl`, `ring-1 ring-inset ring-accent/25` (sem gradientes nem filtros no SVG).
- **Lockup:** sufixo tipográfico `brand.logoSuffix` com `font-display` (`variant="lockup"`, `size` `sm` | `md` | `lg`).
- Uso: header (`icon` `sm`), footer (`lockup` `lg`).

### Botões CTA
- **Primário:** `bg-accent`, `text-background`, `font-semibold`, `rounded-lg`; hero `px-8 py-4` + hover `scale-[1.02]`; project `h-12 px-8` + `hover:bg-accent/90`. Faixa **shimmer** animada (`animate-shimmer`) com gradiente accent / `#50ff30`.
- **Secundário (hero):** `border-accent/30`, `text-foreground`, hover `border-accent`, `bg-accent/5`, `rounded-lg`, `px-8 py-4`.

### Border radius
`rounded-lg` (CTAs, inputs), `rounded-xl` (área de vídeo mock, bordas internas), `rounded-2xl` (cards grandes, núcleo dos anéis), `rounded-3xl` (shell da câmera mock), `rounded-full` (badges, CAPTURAR, orbs).

### Cards gerais
`rounded-2xl`, fundo `#121218` ou `#12121a`, borda `1px` `#1f1f28` ou `#2a2a3a` conforme secção; overlay de project com `from-accent/[0.08]` etc.

### Cards de stack (`StackTechCard`)
`rounded-xl`, **`border border-white/10`** (1px), `bg-white/[0.03]`, `backdrop-blur-md`, `px-4 py-3.5`, transição 500ms; hover: `-translate-y-2`, `border-accent/40`, `bg-white/[0.08]`, sombra `0 20px 50px rgba(57,255,20,0.2)` + `inset_0_1px_0_rgba(255,255,255,0.1)`.

### Badges de tecnologia (timeline About)
`rounded-full`, `border-accent/30`, `bg-accent/5`, `text-accent`, `text-xs font-medium`.

### Linha decorativa sob títulos
`h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#39ff14] to-transparent`, centrada sob o título.

### Divisores de categoria (stack)
`h-px bg-gradient-to-r from-accent/50 to-transparent` (e espelho à direita do label).

### Texturas de grid (por secção — valores reais no código)
- **Hero** (classe `.hero-grid-texture` em `main.css`): linhas `rgba(57,255,20,0.02)`, **grade 80×80px**, wrapper com `opacity-50`.
- **About:** linhas `#39ff14` 1px, **60×60px**, camada extra com `opacity-[0.02]`.
- **Stack / Contact:** linhas `rgba(57,255,20,0.5)` 1px, **60×60px**, wrapper da textura com `opacity-[0.03]`.
- **Project (card):** linhas `#39ff14` 1px, **40×40px**, `opacity-[0.03]` no overlay.

### Blobs de luz (decorativos — About e Stack)
Estilo **sutil**, sem `animate-pulse` nem `radial-gradient` inline forte:
- **About:** até **três** círculos `rounded-full` com `bg-accent/5`, `bg-accent/[0.04]` e `blur-3xl`, posicionados por **`top-[%]`** / **`left`** (ex.: canto superior direito `-right-40 -top-40`; meio-esquerda `top-[34–38%]`). **Evitar** ancorar blobs no fundo da secção (continuidade com a Stack). No topo há ainda uma faixa **`bg-gradient-to-b`** de `from-background` → transparente para suavizar o handoff vindo do Hero.
- **Stack:** três blobs semelhantes (`bg-accent/5`–`/6`, `blur-3xl`) em **~12–18%**, **~40–42%** e lado direito — **não** no canto inferior (transição com About/Project).

### Hero — layout e transição
- **Container:** `min-h-dvh`, padding horizontal **`px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24`**, **`pt-14 sm:pt-16`**, **`pb-1`** (respiro mínimo inferior).
- **Grelha:** `gap-8 py-6 sm:gap-10 sm:py-8`; em `lg`: `grid-cols-12`, `gap-x-12`, `gap-y-5`, `py-4`. Coluna texto: `space-y-5 lg:space-y-6`; indicador de scroll numa **terceira linha** full width (`lg:col-span-12`) com margem negativa moderada (`-mt-6` … `lg:-mt-10`), não fixo ao `bottom` do viewport.
- **Degradê inferior:** camada absoluta baixa (`z-[16]`), altura responsiva ~`h-10`–`lg:h-16`, `from-background/50` → transparente (handoff para About). Partículas SVG em **`z-[14]`** para ficarem sob esse degradê na faixa inferior.

### Hero — elemento decorativo (lado direito)
- Três anéis: `border-accent/20` … `/40`, `animate-spin-slow` (30s), `animate-spin-reverse` (25s), `animate-pulse` no anel interno.
- Núcleo: `rounded-2xl`, `border-accent/30`, `bg-accent/10`, classe **`.neon-border`** (`main.css`).
- **Hex grid:** **`.hero-hex-grid`** — pattern SVG inline, preenchimento `#39ff14` com opacidade baixa no path.
- **Spotlight do rato:** gradiente radial `rgba(57,255,20,0.06)` seguindo o cursor (`HeroSection`).
- Tags flutuantes: **`animate-hero-float`** (5s), **`animate-hero-float-reverse`** (6s), **`animate-hero-float-slow`** (8s) — definidos em `tailwind.config.ts`. Textos via i18n (`hero.floatTags.*`).
- **Bloco visual (mobile):** altura ~`h-80` com `max-w-[18rem]`; `lg`: ~`h-[440px]`, `w-96`.

### Mock UI câmera (Project)
- Área do “player”: borda `border-dashed border-accent/20`.
- Badge REC: ponto `animate-pulse`; texto `text-accent` ou `text-red-500` em captura.
- Timecode: `font-mono`, `text-[#8a8a9a]`.
- Scanlines: `repeating-linear-gradient` com `rgba(57,255,20,0.1)` a cada **4px**.
- Barra de buffer: `h-1.5`, `from-accent/50 to-accent`.
- Contagem do buffer: `text-xs font-mono text-accent` (tick via locale `bufferTick` + `{n}`).

### Botão CAPTURAR (mock)
`rounded-full w-14 h-14`, anel interno `border-2 border-accent/50` (ou vermelho em gravação); gradiente zinc no corpo; sombras e hover com glow accent **ou** glow vermelho quando `isRecording`; `active:scale-95`.

### Timeline (About)
Trilho: `bg-border/50`; preenchimento animado `bg-gradient-to-b from-accent via-accent to-accent/30` + `shadow-[0_0_10px_rgba(57,255,20,0.5)]`. Ping único no dot: **`.about-timeline-ping-once`** (`main.css`, ~1s). Hover nos anos: `drop-shadow` neon.

### Animações — resumo
- **Entrada hero:** `hero-fade-up` / `hero-fade-right` em `main.css` (0.8s ease-out); classes `hero-fade-in-up` / `hero-fade-in-right` + **stagger** `hero-stagger-2` … `hero-stagger-6` (o primeiro bloco com stagger era o badge de disponibilidade, hoje comentado no template). **Stagger-6** cobre os contadores e o **indicador de scroll** (linha da grelha).
- **Scroll reveal:** `opacity-0 translate-y-8` ou `translate-y-12` → `opacity-100 translate-y-0`, **duration-1000** `ease-out` (Stack, About intro, Contact, etc.).
- **Project:** stagger horizontal **700ms**, delays **100–600ms** por camada.
- **Timeline steps:** delays por índice (~200ms) + transições 500–700ms.
- **Outras (Tailwind):** `animate-shimmer` (2s), `animate-dash` (1s, SVG), `animate-scroll-indicator` (2s), `animate-blink` (cursor typewriter, 1s step-end).

### Espaçamento das secções
- **Hero:** ver bullets em **Hero — layout e transição** (padding x/y e grelha atuais).
- **About:** `py-16 md:py-24`, `px-6 md:px-12 lg:px-24`.
- **Stack:** `py-24`, `px-6 md:px-12 lg:px-24`.
- **Project:** `py-24 md:py-32 lg:py-32`, `px-4 sm:px-6 lg:px-8`; **`border-t border-b border-white/[0.07]`** + faixas **`h-px`** com `via-accent/25` no topo e na base da secção (ritmo parecido com o footer).
- **Contact:** `py-24 md:py-32`.

### Layout global (`default.vue`)
- **Skip link:** primeiro elemento focável; leva a `#main` com scroll suave e foco no `<main>`.
- **Header:** `fixed`, `h-16`, `max-w-6xl`; padding horizontal alinhado ao hero (`px-6` … `xl:px-20`); logo + nav (com item ativo por scroll) + grupo PT/EN (`aria-current`) + menu móvil; hairline `via-accent/25` quando `scrolled`; `ring-offset-black/60` nos focos quando o fundo do header está escurecido.
- **`html`:** `scroll-padding-top: 5rem` para âncoras com header fixo.
- **Menu móvil:** `aria-controls` + `id` estável (`useId`); **Escape** fecha; ao abrir, foco no primeiro link; ao fechar, foco volta ao botão hambúrguer.
- **Footer:** `border-t border-white/[0.07]`, fundo `bg-gradient-to-b from-background to-[#06060a]`, hairline superior `via-accent/25`; conteúdo em `max-w-6xl`; nav de secções foi removida — marca lockup, tagline, links sociais (`footer.socialNavAria` no `<nav>`), copyright + colophon.

## Regras de código
- Sempre <script setup lang="ts">
- Sempre Composition API
- Textos NUNCA hardcoded — sempre via $t()
- Em `locales/*.json`, respeitar escapes do compilador de mensagens (em especial `\\@` para `@` literal); ver secção **Internacionalização**.
- Responsivo mobile-first: sm / md / lg / xl
- Sem bibliotecas de UI externas — só Tailwind puro
- Datas no formato dd/mm/yyyy