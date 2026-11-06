# Módulos Gráficos Procedurais (src/graficos/)

Este diretório isola todos os geradores procedurais vetoriais (SVG) e tratamentos visuais do jogo:

- **`xilogravura-svg.js`**: Gerador de silhuetas em estilo xilogravura / cordel / Darkest Dungeon com contorno de papel cartão (*Paper Mario*).
- **`cenarios-svg.js`**: Geradores procedurais de cenários por fase (Recife 1958, Clímax Militar 1964, Várzea/Engenhos e Grande Cheia de 1975).
- **`retratos-svg.js`**: Geradores antropométricos e carimbos policiais de prontuário (DOPS) para a tela de relações.

Estes módulos funcionam de forma desacoplada da lógica de motor do jogo (`renderer.js`).

