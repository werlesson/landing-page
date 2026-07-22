# Relatório de Contribuição Profissional — Werlesson Vieira

> Gerado em **2026-07-21** a partir de análise de Git (histórico real) + análise estática de código e estrutura de diretórios.
> **Identidades Git consideradas** (todas confirmadas como a mesma pessoa, "Werlesson Vieira"):
> `werlessono@gmail.com` · `werlesson.vieira@cars2you.com.br` · `werlesson.vieira@grupodnr.com.br`
>
> **Método:** `git log` filtrado pelo autor (regex `werlesson`, case-insensitive) somando as três identidades. Métricas de linhas/arquivos via `--numstat`. Categorias de commit e IDs de tarefa extraídos por heurística de texto das mensagens (marcado como *inferência* onde aplicável). Nenhuma informação foi inventada.

---

## Estatísticas Gerais

| Métrica | Valor |
|---|---:|
| Repositórios Git analisados | 6 |
| Repositórios com contribuição minha | **5** |
| Total de commits (todas as identidades) | **3.018** |
| Dias únicos de contribuição | **916** |
| Período de atuação | **abr/2022 → jul/2026** (~4 anos) |
| Tarefas únicas entregues (IDs `DES-`, `BC-`, `SV-`) | **372** |
| Linhas adicionadas | **166.556** |
| Linhas removidas | **86.534** |
| Linhas modificadas (churn) | **253.090** |
| Arquivos únicos modificados | **1.043** |

### Distribuição de commits por ano

| Ano | Commits |
|---|---:|
| 2022 | 695 |
| 2023 | 549 |
| 2024 | 621 |
| 2025 | 798 |
| 2026 (parcial, até jul) | 355 |

### Natureza dos commits *(heurística sobre a mensagem — um commit pode contar em +de uma categoria)*

| Categoria | Ocorrências |
|---|---:|
| Features / novas funcionalidades | 2.200 |
| Correções de bug | 465 |
| Hotfixes (urgentes/críticos) | 89 |
| Refatorações | 65 |
| Docs | 37 |
| Chore / config / build | 24 |
| Estilo / UI | 12 |
| Performance | 9 |
| Testes | 3 |
| Segurança | 1 |

> ⚠️ *As categorias são inferidas por palavras-chave na mensagem de commit (pt/en). Servem como ordem de grandeza, não como contagem exata. Ex.: um commit "fix + refactor" conta nas duas.*

---

## Stack e tecnologias (consolidado)

**Linguagens:** TypeScript, JavaScript, PHP 8.2, Vue SFC, SCSS, Blade.

**Frameworks / principais:**
- **Frontend:** Nuxt 2 + Vue 2 (produto principal), Nuxt 3 + Vue 3 (app moderno), Vuex, Pinia, TailwindCSS, Bootstrap-Vue, PrimeVue.
- **Backend:** Laravel 10 (PHP 8.2), padrão Repository.

**Bancos / persistência:** MySQL/relacional (469 migrations no `veic-api`), Redis (cache + filas).

**Serviços externos e integrações identificados no código:**
- **Bradesco Seguros** (integração de seguros — jobs e serviços dedicados)
- **SAP** (integração ERP)
- **Microsoft Graph / Azure AD** (SSO corporativo via Socialite)
- **OpenAI** (recursos de IA no backend)
- **AWS S3** (armazenamento de arquivos/documentos)
- **SendGrid** (e-mail transacional)
- **Sentry + Laravel Nightwatch** (observabilidade/monitoramento)
- **Pusher / Laravel Echo + Laravel Reverb** (tempo real / websockets)
- **Google Maps & Leaflet** (geolocalização)
- **OCR** de documentos veiculares (ATPV, recibos de débito)

**Infra / DevOps:** Docker em todos os projetos (imagem própria `cars2you/php` no backend, `node:20-alpine` no front), CI/CD via GitHub Actions no `veic-front`, filas gerenciadas com Laravel Horizon.

---

## Domínio de negócio (inferido do código)

Ecossistema **automotivo / remarketing de veículos e seguros** (Cars2You / DealersClub / Grupo DNR). Módulos de negócio identificados: remarketing e leilões, seguros (Bradesco), laudos e inspeção veicular (condition report), logística e pátio (courtyard/dispatcher/mounting), advisory, precificação de veículos, financeiro/pagamentos, OCR de documentos, integração SAP, sucateamento (scrap) e pós-venda.

---

## Arquivos gerados

| Arquivo | Conteúdo |
|---|---|
| `overview.md` | Este resumo executivo consolidado |
| `projects.md` | Ficha detalhada de cada projeto |
| `timeline.md` | Linha do tempo da carreira |
| `resume-bullets.md` | Bullets de currículo (padrão Google) + impactos |
| `metrics.json` | Todas as métricas em JSON |
| `metrics.csv` | Métricas por projeto em CSV |
| `summary.html` | Versão visual navegável |
