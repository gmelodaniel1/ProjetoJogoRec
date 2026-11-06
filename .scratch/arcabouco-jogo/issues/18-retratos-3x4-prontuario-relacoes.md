# 18: Retratos 3×4 de Prontuário Policial na Aba de Relações

**What to build:**
Substituir os avatares geométricos primitivos em SVG da aba de Relações por retratos fotográficos 3×4 de época em preto-e-branco (proporção 3:4, papel baritado de gelatina e prata), fixados às fichas de prontuário por clipes metálicos niquelados e carimbados com o selo circular oficial da Secretaria de Segurança Pública / DOPS-PE aplicado meio a meio na fotografia e no papel manila.

**Blocked by:** None (concluído)

**Status:** closed

- [x] Gerar os 4 ativos fotográficos autênticos em `artes/retratos/` no padrão 3:4 (450×600 px) via pipeline noir a partir do acervo MCR (Mestre Severino, Helena, Sindicato dos Operários e Delegacia do DOPS).
- [x] Implementar o componente `.prontuario-foto-coluna` com borda branca baritada de laboratório, proporção estrita 3:4 e clipe metálico niquelado com sombra projetada.
- [x] Implementar o carimbo circular oficial DOPS/SSP aplicado meio a meio (interceptando a foto e a ficha manila com rotação analógica e blend multiply).
- [x] Atualizar `renderizarTelaRelacoes()` em `renderer.js` com metadados de prontuário, numeração de processo, caminhos das fotos e fallback defensivo com linhas antropométricas de altura.
- [x] Atualizar `style.css` com estilos táteis do prontuário, eliminando os antigos estilos de avatares SVG planos.
- [x] Validar conformidade visual e ausência de regressões nos testes automatizados da engine e suíte E2E (16/16 asserções no novo teste dedicado e 48/48 no teste geral).
