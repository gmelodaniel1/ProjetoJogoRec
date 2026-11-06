# 25: Schema & Redação das Crônicas de Desfecho nos Eventos Históricos

**What to build:**
Adicionar o campo `desfecho` nas opções dos eventos de roteiro Markdown (com textos literários detalhando o desenrolar imediato da escolha na cidade, na família e nas forças de segurança). Atualizar o parser (`src/narrative-parser.js`) e o gerador de web bundle (`scripts/build-web.js`) para validar, grifar entidades históricas e empacotar os desfechos nos arquivos estáticos web, com fallback diegético automático para eventos sem desfecho explícito.

**Blocked by:** None (can start immediately).

**Status:** closed

## Acceptance Criteria
- [x] Schema dos eventos suporta `desfecho` em cada item de `opcoes`.
- [x] Eventos da Fase 1 (Infância e Juventude) enriquecidos com crônicas literárias de desfecho.
- [x] Parser aplica grifos históricos no campo `desfecho` e o compila para HTML seguro.
- [x] Gerador `scripts/build-web.js` inclui os desfechos em `conteudo/eventos-bundle.js` e `conteudo/eventos.json`.
- [x] Fallback diegético elegante quando uma opção não possui `desfecho` explícito (combinação da descrição e do carimbo).
- [x] Suíte de testes automatizada `test/test_desfechos_ticket25.js` aprovada com 100% de sucesso.

