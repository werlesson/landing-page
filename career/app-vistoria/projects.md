# Project Report — condition-report-app

## Descrição do projeto

App mobile de **vistoria veicular** (Cars2You / Dealers Club) para inspetores em campo. Substitui um app legado em React Native bare + Realm.

Permite autenticar (online/offline/biometria), buscar veículo por placa, preencher condition report ou vistoria `default`, capturar fotos/vídeos/assinatura, salvar offline em SQLite e sincronizar com o backend quando houver rede.

**Inferência de negócio:** produto B2B operacional crítico para o funil de avaliação/compra de veículos.

---

## Identificação

| Campo | Valor |
|-------|--------|
| Nome | `condition-report-app` (`app-vistoria`) |
| Linguagem principal | TypeScript |
| Framework | Expo SDK 54 + Expo Router + React Native + NativeWind |
| Remote | `git@bitbucket.org:cars2you/app-vistoria.git` |
| Primeiro commit seu | 2025-12-30 — Initial commit |
| Último commit seu | 2026-07-02 — feat: update app version to 1.2.0… |
| Versão atual (`package.json`) | 1.2.0 |

---

## Minha participação

- **Autor principal** do repositório (57 commits / 93.4% do histórico).
- Condução das **fases 0–8** de modernização (mensagens `fase-*`).
- Redesign completo de UI (**ui-1…ui-18**).
- Ownership de arquitetura offline-first, design system, fluxos de vistoria, sync e mídia.
- Merge de PRs #1–#4 no Bitbucket (e-mail corporativo).

**Nota:** commits de merge sob `werlesson.vieira@cars2you.com.br` foram identificados, mas as métricas primárias usam apenas `werlessono@gmail.com`, conforme solicitado.

---

## Principais tecnologias

- TypeScript (strict), React 19, React Native 0.81
- Expo 54, Expo Router 6, NativeWind 4 / Tailwind
- expo-sqlite (fila + drafts), expo-secure-store, expo-network
- axios (API Cloudflare + upload EB), CDN remota de mídia
- expo-image-picker / manipulator / video compressor
- react-native-signature-canvas, react-native-svg (pneus)
- expo-local-authentication, ML Kit text recognition (OCR de placa)
- Jest, ESLint, Husky, GitHub Actions

---

## Principais entregas (a partir de commits + código)

### Modernização (fase-0 … fase-8)

1. Limpeza / pre-flight  
2. Correção de submissão de Condition Report  
3. Regras de negócio por tipo de veículo (leve/moto/pesado)  
4. Migração da fila para SQLite + sync worker  
5. Autenticação com modo offline + tratamento de 401  
6. Pré-população de CR existente + validação de URIs  
7. Alinhamento de captura de mídia com a spec  
8. UX/mensagens + refinamentos  
9. Qualidade de código + smoke test docs  

### Design system & UX (ui-1 … ui-18)

- Tokens + ThemeProvider  
- Biblioteca base de componentes premium (**31** arquivos em `components/ui`)  
- Redesign: login, home, stepper, steps 1–7, pendentes, perfil, tabs, toasts, a11y  

### Features de produto posteriores

- Tipo de vistoria `default` (PR #1/#2)  
- Fix de strings de fotos salvas (PR #3)  
- OCR de placa (PR #4)  
- CDN base + mídia remota  
- VehicleInfoCard + clipboard (chassi/renavam)  
- Confirmações (`ConfirmDialog` / `useConfirm`)  
- Jest + casos de teste iniciais  
- App icons / versão 1.2.0  

---

## Análise automática de código / domínio

| Capacidade | Presente? | Evidência |
|------------|-----------|-----------|
| Módulos do sistema | Sim | `app/`, `components/`, `services/`, `stores/`, `database/`, `config/` |
| Domínios de negócio | Sim | vistoria, mídia, pneus, equipamentos, pendentes, auth |
| Integrações | Sim | API CF, upload EB, CDN, ML Kit, biometria |
| Autenticação | Sim | login, SecureStore, biometria, offline mode |
| Autorização | Parcial | token + 401 session expired *(inferido)* |
| Pagamentos | Não | — |
| Dashboards | Leve | home stats / pendentes *(inferido)* |
| Relatórios | Sim | condition report / default inspection payloads |
| APIs | Sim | `services/api*.ts`, `vistoria.service.ts` |
| Workers | Sim | `syncWorker.ts` |
| Filas | Sim | `vistoria.repository.ts` + backoff |
| Cache | Sim | `services/cache/*` |
| Docker | Não | — |
| CI/CD | Sim | `.github/workflows/ci.yml` |
| Testes | Sim | 7 arquivos `*.test.ts(x)` |
| SSR / SEO | Não | app mobile nativo |

---

## Métricas do projeto (seu e-mail)

| Métrica | Valor |
|---------|------:|
| Commits | 57 |
| Dias únicos | 12 |
| Features / fixes / refactors | 40 / 4 / 2 |
| Tarefas tagueadas | 27 |
| Arquivos código | 225 |
| +/− linhas código | +32.531 / −8.540 |
| Pastas mais tocadas | `app/(tabs)`, `components/ui`, `components/vistoria`, `services/queue` |
| Extensões mais tocadas | `.tsx`, `.ts`, `.png`, `.json` |

---

## Arquivos mais modificados (código)

1. `package.json` (17)  
2. `app.json` (12)  
3. `app/(auth)/login.tsx` (11)  
4. `stores/vistoria.store.tsx` (11)  
5. `app/(tabs)/pendentes.tsx` (11)  
6. `app/(tabs)/index.tsx` (11)  
7. `components/vistoria/steps/step-1-veiculo.tsx` (10)  
8. `services/vistoria.service.ts` (8)  
9. `services/queue/syncWorker.ts` (7)  
10. `database/schema.ts` (6)  
