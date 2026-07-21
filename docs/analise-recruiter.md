# Análise do site como recruiter técnico

> Avaliação do site pessoal (werlesson-cv) na perspectiva de um tech recruiter,
> com veredito, impressão do candidato e plano de melhorias priorizado.
> Objetivo do dono: transmitir tom profissional, "me apresentando" — disponível,
> mas não desesperado por trabalho.

---

## Veredito rápido

**Sim, eu chamaria para entrevista** — para uma vaga de **fullstack/senior com foco
em produto**, em startup ou scaleup, remoto. O site passa pela primeira triagem com
folga, o que já coloca acima de ~80% dos portfólios.

**Mas eu ainda não "contrataria" só com o site.** O motivo é específico: o site é forte
em *como você pensa* e fraco em *o que você conseguiu*. Para a barra de "senior", falta
prova dura de resultado. É totalmente corrigível e é o coração do plano abaixo.

---

## Impressão do candidato (o que o site comunica)

- **Systems-thinker e product-minded.** Não se descreve como "faço telas". Fala em
  arquitetura de ponta a ponta, domínio, filas, deploy. O framing
  Problema→Solução→Arquitetura→Desafios→Resultado nos cases é como um senior raciocina.
- **Self-directed / builder.** Tirou um SaaS do zero (Eu no Play), misturou hardware com
  software (Raspberry Pi, câmera IP, botão wireless), tem projetos próprios no ar. Raro e
  vale mais que qualquer bullet de responsabilidade.
- **Craftsman.** O site *é* a prova: Nuxt 4, TS, SSR, i18n PT/EN, OG image, schema.org,
  RSS, testes com Vitest. Anda o que fala — um tech lead percebe em segundos.
- **Tom calibrado.** "Open to remote roles", "reach out when it makes sense" transmite
  disponível-mas-tranquilo. **Não** soa desesperado.

**Ponto cego:** sub-vende o concreto e sobre-vende o abstrato. Três seções (What I Do,
Principles, Impact) dizendo o quão bem você pensa, e pouca evidência numérica de impacto.
Excesso de "filosofia" acaba soando mais tentando-provar-algo do que confiança.
Confiança sênior se mostra com prova e contenção, não com mais adjetivos.

**Resumo em uma linha:** senior sólido, generalista-fullstack com instinto de produto,
que está se apresentando bem — mas deixando dinheiro na mesa por não quantificar o
próprio impacto.

---

## O que já está forte (não estrague)

1. **Posicionamento consistente** — "Senior Software Engineer · Vue/Nuxt/Laravel · SaaS"
   igual em toda parte.
2. **Produtos no ar com URL clicável.** A maioria não tem. Isso é ouro.
3. **Estrutura dos cases** (Problema/Solução/Arquitetura/Desafios/Resultado). Mantenha
   religiosamente.
4. **Bilíngue + fluência declarada.** Sinaliza pronto-para-remoto-internacional.
5. **Tom do contato.** "Escreva quando fizer sentido" está perfeito para o objetivo.

---

## Onde um recruiter trava (os gaps que custam entrevistas)

1. **"Impacto" sem número de impacto.** O bloco `6+ anos · 20+ projetos · 1 SaaS · Ponta a
   ponta` é biografia, não impacto. E "20+ projetos" é **vanity metric que joga contra**:
   quantidade sugere rotatividade, não senioridade. Senior é medido por profundidade e
   resultado, não por contagem.
2. **"Results" dos cases são qualitativos.** O CSV View tem bons números ("2M+ linhas,
   0 KB à rede") — esse está certo. Mas o Eu no Play, o carro-chefe, entrega resultado
   macio ("em produção com clientes reais", "apoia retenção"). Faltam: quantas arenas?
   clipes/mês? receita de patrocínio? latência real?
3. **Blog vazio.** "Novos artigos estão a caminho" é pior que não ter blog — sinaliza coisa
   inacabada num site cuja mensagem é "eu entrego".
4. **Sem nome completo, sem rosto.** Só "Werlesson". Para tom profissional de apresentação,
   foto + nome completo constroem confiança e são padrão.
5. **Zero prova social de terceiros.** Tudo que o site diz sobre você foi você que escreveu.
   Uma citação de recomendação do LinkedIn ou logo de cliente multiplicaria a credibilidade.
6. **Curadoria dos projetos.** "Bolão na Copa" com peso visual igual a um SaaS B2B com
   hardware dilui a narrativa sênior. Não apagar — hierarquizar.
7. **Repositórios ausentes sem explicação.** Só o CSV View tem código. Nos comerciais o repo
   vazio é normal (NDA), mas sem nota "privado — produto comercial" parece que não há o que
   mostrar.
8. **Redundância que alonga sem agregar.** Hero e Impacto repetem os mesmos números.
   What I Do + Principles + Stack são muito "telling". A razão *afirmação : prova* está
   errada para nível sênior.

---

## Plano de melhorias — priorizado

Ordenado por retorno sobre esforço. **P0 = faça antes de mandar o link para qualquer recruiter.**

> **Status (aplicado em 2026-07-21):** os itens abaixo foram implementados no código, com
> exceção da prova social (depende de um depoimento que ainda não existe). Nota importante:
> as seções Impact/WhatIDo/Principles/Experience **não estão na página** hoje (o redesign as
> cortou), então os números vivos foram atualizados onde de fato aparecem: os contadores do
> **Hero** e a seção **Career** (experience.entries) + o estudo de caso **Eu no Play**.

- [x] **Métricas reais no lugar da vaidade.** `20+ projetos` (contador do Hero) → **987+
  usuários no SaaS em produção**; `1 SaaS` → **17 marcas anunciando na plataforma**. Mantido
  `6+ anos`. (`locales/pt.json` + `en.json`, teste atualizado.)
- [x] **"Results" do Eu no Play reescrito com números duros:** 3 arenas / 5 quadras · 987
  usuários · 50+ vídeos/dia · ~1.700 clipes salvos · 17 marcas · entrega <1 min.
  (`content/projects/eu-no-play.{pt,en}.md`.)
- [x] **Impacto na DNR concretizado:** adicionado o app de vistoria offline-first
  (React Native/Expo, SQLite, design system próprio) às responsabilidades e ao
  `businessImpact` do Grupo DNR — visível na seção Career.
- [ ] **Prova social — PENDENTE (precisa de você).** Uma recomendação do LinkedIn em citação.
  Não há depoimento disponível; pedir hoje ao lead na DNR e me enviar o texto + autor.
- [x] ~~Blog vazio~~ — **não se aplica.** O blog tem posts publicados (`draft: false`);
  o "Novos artigos a caminho" era só fallback. EN: 2 posts · PT: 1 post.

### P1 — Estrutura e curadoria

> **Status (aplicado em 2026-07-21):** todos os itens fechados. Foto: decisão consciente de
> **não** ter (mantido faceless). Nome completo: **"Werlesson Vieira"** adotado.

- [x] ~~Reduzir de 3 seções de "como penso" para 1.~~ **Não se aplica** — o redesign já
  removeu Impact/WhatIDo/Principles/Experience da página; não há o que fundir.
- [x] **Projetos hierarquizados:** Eu no Play (herói, card lead) → **CSV View** (2ª prova de
  engenharia) → Bolão na Copa. Reordenado em `featuredProjects.projects` (pt/en).
- [x] **Repositório privado marcado:** nota "Código privado — produto comercial" no detalhe
  do Eu no Play, no lugar do botão de código-fonte (`privateRepoNote` plumbado por
  type + composable + página de detalhe).
- [x] **Linha "O que estou buscando":** badge no topo do Contato — *"Aberto a posições
  remotas de engenharia sênior/fullstack, com foco em produtos SaaS."* (`contact.lookingFor`).
- [x] **Nome completo:** "Werlesson Vieira" no Hero + `definePerson` (schema.org) para
  buscabilidade. **Foto:** decisão de manter sem.

### P2 — Copy e tom (ajustes finos)

- [ ] **Cortar redundância Hero ↔ Impacto.** Escolher um lugar para os números.
- [ ] **"Disponível para remoto" (PT) → "Aberto a" / algo alinhado à versão EN "Open to
  remote roles".** "Disponível" soa levemente mais ansioso que "Aberto a".
- [ ] **Menos adjetivo, mais verbo+resultado.** Trocar afirmações genéricas ("arquiteturas
  que permanecem rápidas e sustentáveis ao crescer") por frases que apontem para um case.

---

## Reescritas concretas (copiáveis)

**Bloco de métricas — de biografia para impacto.** Em vez de:

> 6+ anos · 20+ projetos · 1 SaaS · Ponta a ponta

Algo como:

> **SaaS B2B no ar** com clientes pagantes · **Clipe entregue em <1 min** da jogada ao app ·
> **2M+ linhas** processadas 100% no browser (CSV View) · **6 anos** ponta a ponta

Cada número aponta para um projeto real — é o que um recruiter recorta e leva ao hiring manager.

**Results do Eu no Play** — adicionar frase dura ao final do atual:

> Em produção em [N] arenas, entregando [N] clipes com marca por mês. Latência da jogada ao
> replay pronto: menos de 1 minuto, sem operador de câmera dedicado.

(Preencher com números reais — mesmo aproximados.)

---

## Onde você fica, honestamente

- **Startup/scaleup, senior fullstack com foco em produto, remoto:** entrevista quase
  garantida. Perfil "resolve de ponta a ponta sozinho".
- **Big tech, barra de senior:** o gap de métricas duras + senioridade concentrada em uma
  empresa (DNR, 2022→hoje) + passagens curtas de 2019–2022 (4 papéis em 3 anos) gerariam
  perguntas. Nada eliminatório, mas precisa de framing na narrativa.

Aplicando o **P0**, você sobe de "portfólio bonito de dev competente" para "candidato sênior
que comprova entrega" — a diferença entre *ser chamado* e *ser priorizado*.
