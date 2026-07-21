---
slug: eu-no-play
locale: pt
description: 'Plataforma SaaS B2B para arenas esportivas: captura automática de lances, entrega white-label ao jogador e inventário de patrocínio em cada vídeo — construída do zero e em produção com clientes reais.'
problem: 'Donos de arena querem experiência memorável para o jogador e nova receita com patrocínio, mas gravar lances ainda depende de operador dedicado, edição manual e entrega lenta — por isso a maioria das quadras nunca productiza vídeo.'
solution: 'Kit com botão físico e câmera dedicada grava os últimos 25 segundos sob demanda, processa o clipe com a marca da arena e parceiros, e entrega no app white-label do jogador em menos de um minuto — sem mudar a operação do dia a dia da quadra.'
architecture: 'Captura na borda (Raspberry Pi + câmeras IP) dispara um pipeline de processamento que aplica branding da arena/patrocinadores e entrega os clipes via app white-label multi-tenant. APIs backend orquestram tenants, mídia e entrega; o site comercial e o produto rodam em stack moderna baseada em Vue.'
challenges: 'Unir confiabilidade de hardware com SLAs de software: latência baixa na quadra, branding consistente entre tenants e instalação sem reforma — mantendo o produto operável por equipes não técnicas da arena.'
results: 'Em produção com clientes reais. Jogadores recebem clipes com marca em menos de um minuto; arenas ganham superfície de patrocínio em cada vídeo e uma experiência que apoia retenção sem operador de câmera em tempo integral.'
gallery:
  - src: /projects/eu-no-play.png
    alt: Painel da plataforma Eu no Play mostrando a captura de lances em arena esportiva
    caption: Entrega white-label de lances com marca da arena
---
