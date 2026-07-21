# Career Overview — Condition Report App

**Scope:** single repository (`condition-report-app`)  
**Author filter:** `werlessono@gmail.com`  
**Generated:** 2026-07-21  
**Remote:** `bitbucket.org:cars2you/app-vistoria.git`

---

## Project identity

| Field | Value |
|--------|--------|
| Name | condition-report-app (App Vistoria) |
| Organization | Cars2You / Dealers Club |
| Primary language | TypeScript |
| Frameworks | Expo SDK 54, Expo Router 6, React Native 0.81, React 19, NativeWind 4 |
| First commit (you) | 2025-12-30 — `Initial commit` |
| Last commit (you) | 2026-07-02 — `feat: update app version to 1.2.0...` |

You are effectively the **primary author** of this codebase: **57 / 61** commits (**93.4%**). The other 4 commits are Bitbucket PR merges under `werlesson.vieira@cars2you.com.br`.

---

## Estatísticas Gerais

| Metric | Value |
|--------|------:|
| Total de repositórios analisados | **1** |
| Total de commits (seu e-mail) | **57** |
| Total de tarefas rastreadas (`fase-*` + `ui-*`) | **27** |
| Tickets estilo Jira (`QR-123` / `TASK-44`) | **0** (padrão não encontrado) |
| Features (commits classificados) | **40** |
| Hotfixes | **0** |
| Bugs corrigidos | **4** |
| Refactors | **2** |
| Docs | **2** |
| Testes (commits) | **2** |
| Arquivos únicos modificados (código) | **225** |
| Arquivos únicos modificados (raw) | **398** |
| Linhas adicionadas (código) | **32.531** |
| Linhas removidas (código) | **8.540** |
| Linhas modificadas (código) | **41.071** |
| Linhas adicionadas (raw*) | **73.458** |
| Linhas removidas (raw*) | **8.778** |
| Dias únicos de contribuição | **12** |
| PRs merged | **4** |

\*Raw inclui `package-lock.json`, `coverage/` e assets de imagem.

### Commits por ano

- 2025: **1**
- 2026: **56**

### Commits por mês

- 2025-12: **1**
- 2026-01: **2**
- 2026-06: **52** (concentração principal de entrega)
- 2026-07: **2**

---

## Tecnologias mais utilizadas

**Linguagens:** TypeScript (`.ts` / `.tsx` dominam o histórico)

**Frameworks / libs (evidência em `package.json` + estrutura):**

- Expo / Expo Router / React Native / React
- NativeWind + Tailwind
- expo-sqlite, expo-secure-store, axios
- Jest + TypeScript strict
- GitHub Actions CI

**Bancos:** SQLite (expo-sqlite), schema v4

**Serviços externos (inferidos do código):** API Cloudflare, upload Elastic Beanstalk, CDN/S3 de mídia, ML Kit OCR, biometria do device

---

## Responsabilidades identificadas

Com base em commits, pastas mais tocadas e estrutura do código:

| Responsabilidade | Evidência |
|------------------|-----------|
| Arquitetura offline-first | `services/queue/*`, `database/schema.ts`, sync worker |
| Design system / componentização | 31 componentes em `components/ui`, commits `ui-1`…`ui-18` |
| Fluxo de vistoria (domínio) | `components/vistoria`, `stores/vistoria.store.tsx` |
| Integrações API / upload | `services/api*.ts`, `vistoria.service.ts`, adapters de submit |
| Autenticação + modo offline + 401 | `auth.store`, `auth.service`, fase-4 |
| Mídia (captura, compressão, CDN remota) | `media*.service.ts`, fase-5/6 |
| Modernização / substituição de app legado | CLAUDE.md + fases 0–8 (Realm → Expo/SQLite) |
| CI / qualidade | `.github/workflows/ci.yml`, Jest, husky |
| Correções críticas | 4 `fix:` (biometria Expo Go, babel worklets, Animated, submit CR) |
| Migrações de schema | SQLite migrations v1→v4 |
| UX / acessibilidade | `ui-16`/`ui-18` a11y + permissions rationale |

---

## Módulos com maior participação

Ordenados por toques no histórico Git (código, excluindo assets/coverage):

1. **`app/(tabs)`** — 79 — Home, Pendentes, fluxo de vistoria nas tabs
2. **`components/ui`** — 54 — design system
3. **`components/vistoria`** — 52 — steps e orquestração do fluxo
4. **`services/queue`** — 29 — fila offline, sync, adapters
5. **`app/(auth)`** — 11 — login / biometria
6. **`components/tire-diagram`** — 10 — diagrama interativo de pneus
7. **`database` / stores / services de domínio** — auth, media, validation

---

## Classificação de commits

| Tipo | Qtd | Método |
|------|----:|--------|
| Features | 40 | prefixo `feat` / Initial commit |
| Bugfixes | 4 | prefixo `fix` |
| Hotfixes | 0 | — |
| Refactors | 2 | prefixo `refactor` |
| Chores | 3 | prefixo `chore` |
| Docs | 2 | README / docs |
| Tests | 2 | Jest / test cases |
| WIP | 1 | `wip:` |
| Merge / stash index | 3 | Merge / On main / index on |

**Tarefas únicas rastreadas:** 9 fases (`fase-0`…`fase-8`) + 18 UI (`ui-1`…`ui-18`) = **27**.  
Não há padrão `QR-123` / `TASK-44` neste repositório.

---

## Impactos que posso comprovar

Métricas obtidas automaticamente deste repositório:

- **57** commits como `werlessono@gmail.com`
- **93.4%** do histórico de commits do repositório
- **40** commits de feature
- **4** bugfixes
- **27** work items tagueados (`fase-*` / `ui-*`)
- **4** pull requests merged (Bitbucket #1–#4)
- **225** arquivos de código únicos tocados
- **+32.531 / −8.540** linhas de código (métrica limpa)
- **12** dias únicos de contribuição
- **31** componentes no design system (`components/ui`)
- **7** arquivos de teste automatizado presentes no tree
- Schema SQLite evoluído até **v4**
- CI presente (`.github/workflows/ci.yml`)

---

## Impactos estimados

> Claramente marcados como **estimativas / inferências** — não são contagens Git puras.

- **[Estimativa]** Liderança técnica / ownership quase total do app mobile de vistoria na empresa, dado o share de autoria (~93%) e ausência de outros autores de feature.
- **[Estimativa]** Substituição completa do app legado React Native bare + Realm por stack Expo + SQLite offline-first (documentado em CLAUDE.md; commits das fases 0–8 suportam a narrativa).
- **[Estimativa]** Dezenas de features de produto em produção (40 commits `feat` ≠ 40 features de produto; vários commits podem ser fatias da mesma feature). Faixa razoável: **~15–25 entregas de produto** distintas (fases + UI pack + OCR/default type/VehicleInfo).
- **[Estimativa]** Redução de falhas de upload em vistoria pesada via cliente axios dedicado (fora do limite ~100MB do Cloudflare) — impacto operacional inferido da arquitetura, sem métrica de incidente.
- **[Estimativa]** Melhoria de produtividade de campo via modo offline + sync com backoff — inferido do código; sem telemetria de uso neste relatório.
- **[Estimativa]** Contribuição concentrada em **jun/2026** sugere sprint/projeto intensivo de modernização + redesign, não contribuição uniforme ao longo do ano.

---

## Possíveis impactos para currículo (baseados em dados)

- Delivered **40** feature commits and **27** tracked work items (`fase`/`ui`) on a production vehicle-inspection mobile app.
- Authored **~93%** of the repository history (**57/61** commits).
- Modified **225+** production source files; added **~32.5k** lines of application code (excluding assets/lock/coverage).
- Built a **31-component** mobile design system and redesigned core screens (login, home, steps 1–7, pendentes, profile).
- Implemented offline-first inspection queue with SQLite, sync worker, exponential backoff, and session-expiry handling.
- Shipped dual inspection flows (`condition_report` + `default`) with adapter-based upload.
- Established CI (`lint` / `typecheck` / tire geometry validation) and automated tests for core services.
- Merged **4** production PRs on Bitbucket (`app-vistoria`).

---

## Arquivos deste relatório

| File | Content |
|------|---------|
| `overview.md` | Este resumo consolidado |
| `projects.md` | Ficha detalhada do projeto |
| `timeline.md` | Linha do tempo |
| `resume-bullets.md` | Bullets no padrão Action + Context + Result |
| `metrics.json` | Métricas estruturadas |
| `metrics.csv` | Métricas tabulares |
| `summary.html` | Versão visual para leitura/export |
