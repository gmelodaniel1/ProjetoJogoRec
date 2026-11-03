# 10: Moldura de Evidências com Estamparia Procedural em SVG/CSS

**What to build:**
Slot visual de evidência localizado no topo da coluna esquerda. Caso exista imagem (`.png`/`.jpg`) indicada no evento, aplica o filtro de jornal antigo de 75 (sépia, halftone pontilhado e vinheta). Caso o slot esteja vazio (arte ainda não produzida), renderiza dinamicamente um recorte procedural de jornal amarelado com carimbos do DOPS, ano e dados do inquérito.

**Blocked by:** 02: Design System da "Mesa de Arquivo Morto" & Tipografia Editorial

**Status:** done

- [x] Filtro CSS "Jornal de 75" aplicado em imagens reais carregadas pela pasta `artes/`.
- [x] Fallback automático para gerador procedural em SVG/CSS na ausência de imagem.
- [x] O componente procedural exibe metadados autênticos de arquivo (carimbo de "CONFIDENCIAL", ano da cena e número do inquérito).
- [x] Estilo estético perfeitamente integrado à paleta de cores e textura de papel do jogo.

