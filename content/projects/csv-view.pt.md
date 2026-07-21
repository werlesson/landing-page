---
slug: csv-view
locale: pt
description: 'Explorador de CSV 100% client-side: abre, filtra, analisa e edita arquivos enormes direto no navegador — sem upload, sem servidor e sem instalar nada. Seus dados nunca saem da máquina.'
problem: 'Explorar e manipular CSVs grandes costuma exigir instalar software ou subir dados sigilosos para um servidor de terceiros — um risco de privacidade — e mesmo assim a interface trava ao processar milhões de linhas.'
solution: 'Uma arquitetura inteiramente no navegador: parsing em streaming via Web Worker em chunks de 1 MB, renderização virtualizada da tabela para rolar milhões de linhas sem travar, e persistência de sessão em IndexedDB para reabrir o arquivo exatamente de onde parou.'
architecture: 'A lógica de domínio (parsing, estatísticas, filtros, diff e export) vive isolada em app/services, sem dependência do Vue e 100% testável em isolamento. As camadas se separam em pages (rotas), components (UI), composables (estado reativo) e services (funções puras). O IndexedDB guarda o conteúdo do arquivo e o estado da sessão — busca, filtros, ordenação e layout das colunas.'
challenges: 'Manter a UI fluida com arquivos de milhões de linhas: o parser em streaming evita bloquear a thread principal, o scroll virtualizado mantém a tabela responsiva e um único stack cronológico de undo/redo unifica edição de células e reordenação de colunas.'
results: 'Suporta 2M+ de linhas com 0 KB enviados à rede — zero-backend, privacidade por padrão. Entrega detecção automática de delimitador e BOM, estatísticas por coluna, filtros combináveis por tipo, edição inline com undo/redo, comparação (diff) entre arquivos e export para CSV, JSON, Markdown, SQL e XLSX.'
gallery:
  - src: /projects/csv-view.png
    alt: Interface do CSV View exibindo uma tabela virtualizada com filtros e estatísticas por coluna
    caption: Exploração client-side de arquivos CSV com milhões de linhas
---
