# Phases: projects-showcase-redesign

Gerado por /plan a partir de PLAN.md — view executável para `./ralph.sh .spec/features/projects-showcase-redesign/PHASES.md`.

## Phase 1: Foundations — deps, collection schema, pure helpers, i18n keys

Antes de implementar, leia:
1. `.spec/features/projects-showcase-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/projects-showcase-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T01 — Add `motion` dependency
      Arquivos: `package.json` (+ `yarn.lock` via `yarn install`)
      Mudança: adicionar `motion` (motion.dev, Vue 3) em `dependencies` e rodar `yarn install`; sem alteração em `nuxt.config.ts`. Confirmar que `nuxt prepare`/typecheck seguem passando.
      Cobre: RF-09
      Acceptance criteria: `motion` está declarado em `package.json` `dependencies` e resolve no lockfile; `nuxt typecheck` continua exit 0.
      Testes: verificado indiretamente via RF-09 AC (presença em `package.json`)
- [ ] T02 — Declare the `projects` content collection
      Arquivos: `content.config.ts`
      Mudança: adicionar collection `projects` (`type: 'page'`, `source: 'projects/*.md'`) com schema Zod: `slug`+`locale` obrigatórios; `description/problem/solution/architecture/challenges/results` `z.string().optional()`; `gallery: z.array(z.object({ src, alt, caption: optional })).default([])`. NENHUM campo de card na collection.
      Cobre: RF-06, CT-02
      Acceptance criteria: `content.config.ts` declara a collection `projects` com os campos exatos acima; `slug`/`locale` obrigatórios, narrativa opcional, `gallery` default `[]`; a collection `blog` permanece intacta.
      Testes: `tests/unit/projectDetail.test.ts` (T11) valida o contrato via validator espelhado em T03
- [ ] T03 — Pure detail helpers (`useProjectDetail.ts`)
      Arquivos: `app/composables/useProjectDetail.ts` (novo)
      Mudança: exportar helpers puros node-testáveis: `NARRATIVE_BLOCK_KEYS` (ordem RF-03), `selectNarrativeBlocks(doc)` (empty-safe por bloco), `normalizeGallery(raw)` (`alt` obrigatório, inválidos descartados, vazio→`[]`), `findCaseStudyBySlug(catalog, slug)`, `validateProjectFrontmatter(data)` (espelha schema T02). NÃO alterar `usePortfolioCatalog()`.
      Cobre: RF-03, RF-04, RF-05, RF-10
      Acceptance criteria: cada helper é uma função pura sem runtime Nuxt; `selectNarrativeBlocks` inclui só blocos não-vazios em ordem; `normalizeGallery` exige `alt` e retorna `[]` em vazio; `findCaseStudyBySlug` retorna `undefined` para slug desconhecido; `validateProjectFrontmatter` exige `slug`+`locale`.
      Testes: `tests/unit/projectDetail.test.ts` (T11)
- [ ] T04 — Add i18n keys for card grid + detail page
      Arquivos: `locales/pt.json`, `locales/en.json`
      Mudança: adicionar namespace `projectDetail` (idêntico nos dois locales) com labels dos seis blocos de narrativa, heading da galeria, label de voltar, e labels/aria novos do card. Reusar `featuredProjects.*` quando couber. Zero copy hardcoded.
      Cobre: UI-01, RNF-04
      Acceptance criteria: `tests/unit/i18nKeys.test.ts` passa (paridade estrutural mantida); toda copy dos novos componentes resolve via `$t(...)`; nenhuma string literal de UI nos componentes.
      Testes: `tests/unit/i18nKeys.test.ts` (existente) permanece verde

## Phase 2: Presentational components — card + gallery

Antes de implementar, leia:
1. `.spec/features/projects-showcase-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/projects-showcase-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T05 — `ProjectCard.vue` (animated grid card)
      Arquivos: `app/components/sections/ProjectCard.vue` (novo)
      Mudança: card apresentacional (prop `CaseStudy`) com título, thumbnail (`v-if study.image`), um badge por `techStack`; `NuxtLink` para `useLocalePath()('/projects/' + study.id)` com foco visível padrão blog (`focus-visible:ring-2 ring-accent`); animação `motion` de entrada em viewport + hover, degradada sob `prefers-reduced-motion` (estado final visível, 0 motion). Copy via `$t(...)`. Componente só apresentação.
      Cobre: RF-01, RF-02, RF-05, RF-09, UI-01, UI-02, UI-03, RNF-01
      Acceptance criteria: para N shipped, N cards com título não-vazio, thumbnail quando há `image`, e 1 badge por entrada de `techStack`; o `NuxtLink` resolve para `useLocalePath()('/projects/<slug>')` e é focável por teclado com anel de foco; sob reduced-motion não há transform/opacity de entrada/hover.
      Testes: RF-01/RF-05 AC de render; alvo localePath e contagem de badges via revisão + paridade i18n
- [ ] T06 — `ProjectGallery.vue` (empty-safe gallery)
      Arquivos: `app/components/sections/ProjectGallery.vue` (novo)
      Mudança: galeria apresentacional (prop `{ src, alt, caption? }[]`); um elemento por imagem com `alt` não-vazio; NENHUM container/heading quando o array é vazio. Heading via `$t('projectDetail.galleryHeading')`. Loading lazy/async consistente com o padrão existente.
      Cobre: RF-04, UI-04
      Acceptance criteria: projeto com ≥1 imagem renderiza um elemento por imagem, cada `alt` não-vazio; projeto com zero imagens não produz nenhum nó DOM de galeria (sem heading nem grid).
      Testes: normalização de galeria em `tests/unit/projectDetail.test.ts` (T11)

## Phase 3: Integration — card grid + SSR detail route

Antes de implementar, leia:
1. `.spec/features/projects-showcase-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/projects-showcase-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T07 — Rework `FeaturedProjectsSection.vue` into the card grid
      Arquivos: `app/components/sections/FeaturedProjectsSection.vue`; remover `app/components/sections/ProjectCaseStudy.vue`
      Mudança: trocar o render empilhado `SectionsProjectCaseStudy` pelo grid animado de `ProjectCard` sobre `shipped` de `usePortfolioCatalog()` (consumo inalterado). Manter `id="projects"` no `<section>`. Ordem do grid segue a ordem do array i18n. Remover o import e o arquivo `ProjectCaseStudy.vue` (único importador — verificado).
      Cobre: RF-01, RF-09
      Acceptance criteria: `tests/unit/sectionComposition.test.ts` permanece verde (seção presente em `id="projects"`); o grid renderiza um `ProjectCard` por projeto `shipped`; `ProjectCaseStudy.vue` não é mais importado.
      Testes: `tests/unit/sectionComposition.test.ts` (existente) permanece verde
- [ ] T08 — `projects/[...slug].vue` SSR detail route
      Arquivos: `app/pages/projects/[...slug].vue` (novo)
      Mudança: página catch-all espelhando `app/pages/blog/[...slug].vue` (`useAsyncData` + `queryCollection` + `createError` 404 + `useSeoMeta`/`useSchemaOrg`), resolvendo com `queryCollection('projects').where('slug','=',slug).where('locale','=',locale).first()`. JOIN de card meta via `findCaseStudyBySlug` (título/status/badges techStack/liveUrl/repoUrl). Seis blocos de narrativa com `v-if` por bloco + labels i18n; `ProjectGallery` empty-safe. `createError({ statusCode: 404, fatal: true })` quando o doc falta no locale ativo. Sem OG image de projeto.
      Cobre: RF-02, RF-03, RF-06, RF-10, RF-11, RNF-02, RNF-05, CT-01
      Acceptance criteria: `/projects/<slug>` renderiza no servidor o JOIN (título + 1º bloco presentes no HTML inicial); slug inexistente → HTTP 404 + página de erro; `/projects/<slug>` serve PT e `/en/projects/<slug>` serve EN; nenhuma narrativa lida de `featuredProjects.projects[]`.
      Testes: lógica 404/slug/locale via `findCaseStudyBySlug`/validator em T11; presença SSR é AC manual

## Phase 4: Content migration — author the `projects` collection

Antes de implementar, leia:
1. `.spec/features/projects-showcase-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/projects-showcase-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T09 — Author the `projects` collection content (migration)
      Arquivos: `content/projects/{eu-no-play,bolao-copa,csv-view}.{pt,en}.md` (6 novos)
      Mudança: um arquivo por projeto por locale; frontmatter com `slug` (=== `id`) + `locale`, os blocos de narrativa não-vazios copiados 1:1 de `featuredProjects.projects[]` daquele locale, e `gallery` autorada de `{ src, alt, caption? }` (paths reais em `public/projects/...`, `alt` obrigatório; galeria vazia é aceitável). Body opcional. Sem novos projetos.
      Cobre: RF-07
      Acceptance criteria: para cada id shipped existe `<id>.pt.md` e `<id>.en.md` com `slug === id`, `locale` correto e os blocos de narrativa não-vazios daquele locale em frontmatter; card meta continua em ambos os locale files.
      Testes: `tests/unit/projectDetail.test.ts` (T11) assegura existência dos arquivos por locale

## Phase 5: De-i18n narrative + test coverage

Antes de implementar, leia:
1. `.spec/features/projects-showcase-redesign/SPEC.md` — requisitos RIGID que esta fase cobre
2. `.spec/features/projects-showcase-redesign/PLAN.md` — decomposição completa, dependências e riscos

- [ ] T10 — Remove migrated narrative from the i18n catalog
      Arquivos: `locales/pt.json`, `locales/en.json`, `tests/unit/projectCatalog.test.ts`
      Mudança: remover os seis campos de narrativa (`description/problem/solution/architecture/challenges/results`) de cada entrada `featuredProjects.projects[]` nos DOIS locale files (identicamente, preservando paridade). MANTER `id/status/title/image/tags/techStack/liveUrl/repoUrl`. Atualizar `projectCatalog.test.ts`: as assertivas de prose (csv-view `problem`/`solution`/`results` truthy) não valem mais na fonte i18n — remover/redirecionar, mantendo partição/dedup/paridade. NÃO alterar `usePortfolioCatalog()`.
      Cobre: RF-07, CT-03
      Acceptance criteria: nenhum dos seis campos de narrativa permanece em `featuredProjects.projects[]` (ambos locales); card meta preservada; `tests/unit/projectCatalog.test.ts` e `tests/unit/i18nKeys.test.ts` exit 0.
      Testes: `tests/unit/projectCatalog.test.ts` (atualizado) + `tests/unit/i18nKeys.test.ts`
- [ ] T11 — Vitest coverage for detail helpers + migration
      Arquivos: `tests/unit/projectDetail.test.ts` (novo)
      Mudança: cobrir (env node): `selectNarrativeBlocks` presente→incluído/ausente→excluído e ordem; `normalizeGallery` `alt` obrigatório, descarta inválidos, vazio→`[]`; `findCaseStudyBySlug` meta para slug conhecido e `undefined` para desconhecido; `validateProjectFrontmatter` exige `slug`+`locale` e rejeita locale não suportado; assertiva fs de que cada id shipped tem `.pt.md` e `.en.md` com `slug === id`.
      Cobre: RNF-03 (verifica RF-03, RF-04, RF-06, RF-07, RF-10)
      Acceptance criteria: `eslint .`, `prettier --check .`, `nuxt typecheck` e `vitest run` saem com status 0; existem novos testes para join/narrativa/gallery/validação e presença dos arquivos de conteúdo.
      Testes: este item É a suíte de testes
