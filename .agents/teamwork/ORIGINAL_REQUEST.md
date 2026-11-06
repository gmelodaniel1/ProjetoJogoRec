# Original User Request

## Initial Request — 2026-11-04T22:39:17Z

Elaborar um estudo e documento de diretrizes de direção de arte para o jogo 'Águas de Ferro', definindo a identidade estética e o pipeline para reestilizar e utilizar fotos históricas do Recife com ambientação noir e documental baseada em RecifeVibe.JPG.

Working directory: C:\Users\AdminUser\Desktop\Jogo Recife
Integrity mode: development

## Reference Material
- `artes/RecifeVibe.JPG`: Referência de iluminação noturna, reflexos nas águas do Capibaribe e atmosfera noir no Recife.
- `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`: Acervo fotográfico histórico do Museu da Cidade do Recife.
- `CONTEXT.md`: Documento de contexto com as diretrizes narrativas e visuais do jogo.

## Requirements

### R1. Estudo de Direção de Arte e Identidade Noir Documental
Analisar o acervo de fotos do Recife (`artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`) em conjunto com a foto de referência noir (`artes/RecifeVibe.JPG`) e o documento `CONTEXT.md`, definindo os pilares estéticos para o jogo (iluminação, contraste, paleta de cores, granulação e textura de época) para retratar a cidade entre 1958 e 1975. A equipe tem liberdade para pesquisar referências visuais históricas complementares para enriquecer a proposta.

### R2. Arquitetura e Pipeline Técnico de Reestilização
Avaliar e propor a melhor estratégia técnica para reestilizar as fotos históricas, comparando estilização dinâmica em tempo de execução (via filtros CSS/Canvas sobre as fotos) com pipeline de pré-processamento de imagens (scripts ou ferramentas de tratamento que gerem os assets prontos), recomendando a melhor abordagem ou modelo híbrido para o jogo.

### R3. Especificação de Integração Visual com o Jogo
Documentar as diretrizes de proporção, enquadramento, resolução e compatibilidade com o layout do jogo existente (`#stage-photo-display` e estilos definidos em `style.css`), estabelecendo regras práticas para transformar fotografias do acervo em elementos visuais integrados à atmosfera de arquivo morto/mesa de redação de 1975.

## Acceptance Criteria

### Documentação e Análise
- [ ] Um documento detalhado de diretrizes de direção de arte e pipeline de estilização está criado no projeto (em `docs/DIRETRIZES_ESTETICAS_NOIR.md` ou diretório equivalente).
- [ ] O documento inclui análise comparativa detalhada dos elementos estéticos de `artes/RecifeVibe.JPG` (reflexos aquáticos, neons noturnos, contraste de sombras) em relação ao acervo histórico `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`.
- [ ] O documento apresenta referências visuais históricas complementares pesquisadas para o Recife do período histórico do jogo (1958–1975).

### Pipeline Técnico e Integração
- [ ] A recomendação técnica compara claramente vantagens e desvantagens de filtros dinâmicos em tempo de execução versus pré-processamento de arquivos, recomendando a abordagem ideal com justificativa técnica.
- [ ] O pipeline especifica parâmetros técnicos objetivos (como valores e combinações de filtros CSS, etapas de ajuste tonal, contraste ou granulação) para alcançar a estética pretendida.
- [ ] O guia inclui especificações de integração direta com os componentes visuais existentes no projeto (`index.html` e `style.css`).
