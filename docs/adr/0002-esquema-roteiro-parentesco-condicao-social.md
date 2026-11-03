# 2. Esquema de Roteiro em Markdown, Vínculos Familiares e Condição Social

Data: 2026-11-03

## Contexto
O protótipo precisa de um formato de autoria que permita roteiristas escreverem histórias, diálogos e ramificações sem manipular arquivos de código (JavaScript). Em *The Life and Suffering of Sir Brante*, o núcleo dramático reside na tensão entre a lealdade à família, as exigências da condição social e as escolhas morais individuais do protagonista.

No cenário do Recife (1958–1975), as clivagens sociais (mocambos e bairros operários versus sobrados de Casa Forte e funcionários públicos) e as relações familiares são determinantes para a ascensão ou sobrevivência do personagem.

## Decisão
1. **Roteiro em Markdown com Frontmatter (YAML):**
   Cada evento é um arquivo `.md` autônomo dentro de `conteudo/fase_X/`. Os metadados contêm os requisitos de acesso, custos de ação do dossiê, opções de escolha e consequências numéricas.
2. **Inclusão de Condição Social e Parentesco:**
   * **Condição Social:** Estado estratificado do núcleo familiar (ex: *Mocambo/Operário*, *Pequena Burguesia*, *Elite Usineira/Militar*).
   * **Parentesco (Vínculos Familiares):** Medidores numéricos ou estados relacionais com figuras da família (ex: `relacao_pai`, `relacao_irmao`, `honra_familiar`).
3. **Hot-Reloading Nativo:**
   O processo Electron monitora alterações nos arquivos `.md` e atualiza a interface instantaneamente sem reiniciar a aplicação.
4. **Placeholders Procedurais de Arte:**
   Ausência de arquivos de imagem ativa um gerador dinâmico de selos burocráticos e recortes de imprensa de 1975 (SVG/CSS).

## Consequências e Benefícios
* Escritores e pesquisadores históricos podem redigir novos eventos usando qualquer editor de texto sem medo de quebrar sintaxe de código.
* As mecânicas de parentesco e condição social reproduzem a profundidade psicológica e de classe de *Sir Brante*.

