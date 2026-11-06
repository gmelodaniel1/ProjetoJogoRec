# Ticket 30: Personagens em Recorte de Papel (Paper Mario) & Estética Xilogravura / Darkest Dungeon

**Status:** closed  
**Prioridade:** Alta  
**Componentes:** `src/narrative-parser.js`, `renderer.js`, `index.html`, `style.css`, `test/test_personagens_xilogravura_ticket30.js`

---

## 1. Contexto & Proposta Artística
Para evitar que a narrativa do jogo permaneça estática ou excessivamente documental, implementa-se a mecânica de presença física dos personagens através de:
1. **Recortes de Papel (Paper Mario)**: Os personagens são apresentados como peças de cartão ou xilogravura recortadas a tesoura/navalha, com margem em tom marfim cru (`#F8F5EE`), sobrepostos em primeiro plano à fotografia de época do cenário.
2. **Estética Xilogravura + Darkest Dungeon**: Traços rústicos de entalhe em madeira (goiva) combinados com o chiaroscuro gótico e nanquim maciço (olhos imersos em sombras pesadas sob o chapéu ou testa).
3. **Balão de Fala / Conector com a Folha de Diálogo**: Quando um personagem fala em um beat de texto, o recorte surge na mesma posição do palco esquerdo e um balão/fita conectora diegética aponta para a folha narrativa direita.
4. **Gerador Procedural em SVG**: Enquanto os desenhos finais do autor são preparados, um gerador procedural vetorial desenha as xilogravuras arquetípicas dos personagens da Fase 1 (Mestre Severino, Delegado DOPS, etc.) com hachuras e olhos na sombra.

---

## 2. Critérios de Aceitação
- [x] **1. Schema & Parser (`src/narrative-parser.js`)**:
  - Aceitar `personagens_cena` no frontmatter YAML dos eventos, definindo nome, papel/subtítulo, arquivo de arte e expressão.
  - Aceitar lista `beats_oradores` mapeando o orador de cada parágrafo de texto ou detectar falas diretas entre aspas `“...”`.
- [x] **2. Gerador Procedural de Xilogravura (`gerarSvgPersonagemXilogravura`)**:
  - Módulo procedural que gera silhuetas em SVG com textura de madeira entalhada, olhos em chiaroscuro (Darkest Dungeon) e borda de recorte de papel.
- [x] **3. Suporte Híbrido a Imagens Reais & Fallback**:
  - Tenta carregar imagem real em `artes/personagens/{id}.webp` ou `.png`. Caso não exista ou ocorra erro, aciona o SVG procedural automaticamente sem quebrar o layout.
- [x] **4. Camada de Palco no DOM (`index.html` & `style.css`)**:
  - Estrutura `.camada-personagem-recorte` sobreposta à foto de época do cenário.
  - Fotografia de fundo escurece levemente (25%) com vinheta sutil ao exibir o personagem.
  - O recorte possui margem marfim (`#F8F5EE`), sombra projetada (`drop-shadow`) e rotação tátil (`transform: rotate(-1.5deg)`).
- [x] **5. Balão Conector de Diálogo**:
  - Balão diegético de papel manila com bico/fita conectora apontando da figura no palco esquerdo para o texto correspondente na folha narrativa direita.
  - Exibe o nome do orador em caixa-alta datilografada (ex: `[MESTRE SEVERINO // PAI]`).
- [x] **6. Som Analógico & Transição Tátil**:
  - Disparo de `audioManager.somPapel()` ao introduzir o recorte do orador.
- [x] **7. Visual Blacklist**:
  - Zero `border-radius: [1-9]px`, zero `#FFFFFF` puro.
- [x] **8. Testes Automatizados**:
  - Suíte `test/test_personagens_xilogravura_ticket30.js` com 100% de aprovação e integração ao `test/runner.js`.
