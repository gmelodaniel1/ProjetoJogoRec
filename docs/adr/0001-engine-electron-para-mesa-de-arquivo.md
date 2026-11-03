# 1. Arquitetura Desktop via Electron para o Protótipo "Águas de Ferro"

Data: 2026-11-03

## Contexto
O projeto "Águas de Ferro" é um RPG narrativo determinístico de escolhas e consequências inspirado em *The Life and Suffering of Sir Brante*, ambientado no Recife (1958–1975). A direção de arte estipula o conceito de "Mesa de Arquivo Morto / Redação Clandestina", exigindo tipografia editorial pesada (capitulares, entrelinhas de jornal antigo, carimbos animados, filtros de reticulado de impressão e layout em documentos físicos). 

Havia três opções para a execução do software em tela cheia e com liberdade artística:
1. Engine tradicional de jogos (Godot 4).
2. Framework web desktop (Electron com Node.js + Chromium).
3. Framework web leve (Tauri).

## Decisão
Adotar **Electron** como runtime desktop em tela cheia nativa.

## Motivos e Trade-offs
* **Fidelidade Tipográfica e Editorial:** O layout mimetiza documentos em papel, fichas datilografadas e diagramação de jornais antigos. O motor de renderização do Chromium combinado com CSS3 moderno oferece suporte nativo e maduro para `::first-letter`, fontes web serifadas de alta legibilidade, colunas flexíveis e filtros de composição visual (`mix-blend-mode`, `sepia`, vinhetas). No Godot, construir essa fidelidade exigiria recriar sistemas de diagramação de texto e estilos proprietários.
* **Autoria Direta em Markdown:** O Node.js integrado ao Electron possui acesso irrestrito ao sistema de arquivos local (`fs`), permitindo que roteiristas criem e editem arquivos `.md` na pasta `/conteudo/` com recarregamento a quente (hot reload) sem compilação.
* **Trade-off de Recursos:** O Electron possui um consumo de memória e tamanho de executável maior do que Godot ou Tauri. Para um jogo focado em narrativa, texto e documentos estáticos em 2D, esse custo é irrelevante frente ao ganho em velocidade de iteração e fidelidade visual.

