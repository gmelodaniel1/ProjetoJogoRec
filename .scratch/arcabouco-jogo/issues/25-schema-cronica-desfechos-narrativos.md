# 25: Schema & Redação das Crônicas de Desfecho nos Eventos Históricos

**What to build:**
Adicionar o campo `desfecho` nas opções dos eventos de roteiro Markdown (com textos literários detalhando o desenrolar imediato da escolha na cidade, na família e nas forças de segurança). Atualizar o parser (`src/narrative-parser.js`) e o gerador de web bundle (`scripts/build-web.js`) para validar, grifar entidades históricas e empacotar os desfechos nos arquivos estáticos web, com fallback diegético automático para eventos sem desfecho explícito.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

## Acceptance Criteria
- [ ] Schema dos eventos suporta `desfecho` em cada item de `opcoes`.
- [ ] Eventos da Fase 1 (Infância e Juventude) enriquecidos com crônicas literárias de desfecho.
- [ ] Parser aplica grifos históricos no campo `desfecho` e o compila para HTML seguro.
- [ ] Gerador `scripts/build-web.js` inclui os desfechos em `conteudo/eventos-bundle.js` e `conteudo/eventos.json`.
- [ ] Fallback diegético elegante quando uma opção não possui `desfecho` explícito (combinação da descrição e do carimbo).
- [ ] Suíte de testes automatizada `test/test_desfechos_ticket25.js` aprovada com 100% de sucesso.
