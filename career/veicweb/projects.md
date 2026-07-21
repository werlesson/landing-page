# Projetos — Ficha Detalhada

Ordenado por volume de contribuição. Todas as métricas somam as 3 identidades Git.

---

## 1. veic-front — Backoffice / ERP ("minible")  ⭐ projeto principal

| | |
|---|---|
| **Linguagem** | TypeScript / JavaScript |
| **Framework** | Nuxt 2 + Vue 2 (SPA, `target: static`) + Vuex |
| **Primeiro commit meu** | 2022-04-18 |
| **Último commit meu** | 2026-07-21 |
| **Commits** | **2.247** |
| **Dias únicos** | 590 |
| **Linhas** | +129.090 / −72.518 (churn 201.608) |
| **Arquivos únicos** | 753 |
| **Tarefas únicas** | 250 (prefixos: `DES` 292 refs, `BC` 43, `SV` 1) |
| **Commits por ano** | 2022: 584 · 2023: 447 · 2024: 574 · 2025: 506 · 2026: 136 |

**Descrição.** Painel administrativo/ERP central do ecossistema automotivo — remarketing de veículos, seguros, leilões, logística, laudos e inspeção. Construído sobre o template Minible, mas fortemente customizado: **32 módulos de negócio**, **579 componentes `.vue`** e **159 serviços de domínio/integração** em TypeScript.

**Minha participação.** Contribuidor de maior volume ao longo de 4+ anos. Áreas mais tocadas (por nº de arquivos alterados nos meus commits):
- `pages/settings` (526) — parametrização/administração do sistema
- `components` (475) — biblioteca de componentes reutilizáveis
- `services` (318) — camada de integração com a API e serviços externos
- `pages/logistics` (260), `pages/advisory` (236), `pages/docs` (213)

**Principais tecnologias.** Nuxt 2, Vue 2, TypeScript, Vuex, Bootstrap-Vue, ApexCharts/ECharts/Chart.js (dashboards e BI), Leaflet + Google Maps (geo), vue-i18n (internacionalização), Laravel Echo/Pusher (tempo real), Quill (editor rich-text), SheetJS/xlsx (exportação de relatórios), SweetAlert2. Docker (`node:20-alpine`) + CI/CD via GitHub Actions.

**Principais entregas (evidências no repo).** Dashboards e relatórios com múltiplas libs de gráfico; módulo de seguros Bradesco; laudos/condition report; logística de pátio; OCR (ATPV); integração SAP; precificação de veículos; sistema de parametrização (settings) extenso; biblioteca de 579 componentes.

---

## 2. veic-api — Backend / API

| | |
|---|---|
| **Linguagem** | PHP 8.2 |
| **Framework** | Laravel 10 (padrão Repository) |
| **Primeiro commit meu** | 2024-02-29 |
| **Último commit meu** | 2026-07-21 |
| **Commits** | **556** |
| **Dias únicos** | 218 |
| **Linhas** | +16.574 / −4.632 (churn 21.206) |
| **Arquivos únicos** | 218 |
| **Tarefas únicas** | 118 (prefixo `DES` 164 refs) |
| **Commits por ano** | 2024: 45 · 2025: 292 · 2026: 219 |

**Descrição.** API central do ecossistema. Escala relevante: **203 controllers, 204 repositories, 217 models, 469 migrations, 36 jobs**. A transição para este repo em 2024 marca minha evolução de frontend para **full-stack**.

**Minha participação.** Áreas mais tocadas: `app/Repositories` (202), `app/Http` (99), `routes/api` (65), `app/Jobs` (52 — processamento assíncrono), `app/Models` (51), `database/migrations` (30). Forte atuação em regras de negócio, integrações e workers.

**Principais tecnologias.** Laravel 10, PHP 8.2, autenticação JWT, SSO corporativo (Socialite + Microsoft Azure), **Laravel Horizon** (filas) + **Redis**, **Laravel Reverb** (websockets), AWS S3, SendGrid, Microsoft Graph, **OpenAI**, geração de PDF (DomPDF/mPDF/FPDI/pdfmerger), Maatwebsite Excel (import/export), QR Code, **Sentry + Nightwatch** (observabilidade). Docker (`cars2you/php:8.2-fpm-alpine`).

**Principais entregas (evidências no repo).** Jobs de integração com **Bradesco Seguros**, conciliação contábil, exportações em lote (DRC), OCR de ATPV; endpoints de negócio; camada de repositórios; pipeline assíncrono com Horizon.

---

## 3. veic-thirdparty — Portal de Parceiros

| | |
|---|---|
| **Linguagem** | TypeScript / JavaScript |
| **Framework** | Nuxt 2.15 + Vue 2 + Vuex |
| **Primeiro commit meu** | 2022-04-19 |
| **Último commit meu** | 2023-10-13 |
| **Commits** | **195** |
| **Dias únicos** | 95 |
| **Linhas** | +9.722 / −8.586 (churn 18.308) |
| **Arquivos únicos** | 59 |
| **Tarefas únicas** | 4 (prefixo `BC`) |
| **Commits por ano** | 2022: 96 · 2023: 99 |

**Descrição.** Portal separado para parceiros externos (terceiros), com acesso controlado a laudo/condition report, inspeção, despacho, portaria (doorman) e empresas de serviço.

**Minha participação.** Áreas mais tocadas: `pages/conditional-report` (64), `services` (42), `pages/principal` (20), `pages/inspection` (19). Desenvolvimento de features do portal de parceiros ao longo de 2022–2023.

**Principais tecnologias.** Nuxt 2, Vue 2, TypeScript, Vuex, Docker.

---

## 4. veic-showroom — Vitrine de Veículos

| | |
|---|---|
| **Linguagem** | JavaScript / Vue |
| **Framework** | Nuxt 2 + Vue 2 |
| **Primeiro commit meu** | 2022-06-07 |
| **Último commit meu** | 2023-01-16 |
| **Commits** | **18** |
| **Linhas** | +11.029 / −687 |
| **Arquivos únicos** | 10 |

**Descrição.** Vitrine/showroom público de veículos. Participação pontual de bootstrap do projeto e páginas iniciais (o alto volume de linhas com poucos commits indica *scaffolding* inicial — *inferência*).

---

## 5. veic-inspection — App de Inspeção (nova geração)

| | |
|---|---|
| **Linguagem** | TypeScript / Vue 3 |
| **Framework** | Nuxt 3 + Vue 3 + Pinia + TailwindCSS + PrimeVue (PWA) |
| **Primeiro/Último commit meu** | 2024-07-02 → 2024-07-05 |
| **Commits** | **2** |
| **Linhas** | +141 / −111 |

**Descrição.** App de inspeção moderno (stack Nuxt 3/Vue 3, PWA offline). Contribuição pontual (correções). Relevante por demonstrar contato com a stack **mais recente** do ecossistema.

---

## Observação sobre `veic-start-docker-dc`
Repositório Git presente no diretório, porém **sem commits meus** (0). Não entra nas métricas de contribuição.
