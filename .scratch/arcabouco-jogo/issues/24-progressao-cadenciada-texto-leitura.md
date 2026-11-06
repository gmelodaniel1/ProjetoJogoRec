# 24: Progressão Cadenciada de Texto com Ritmo de Leitura (Estilo Disco Elysium)

**What to build:**
Transformar o visor de leitura dos eventos (`#pagina-editorial`) para apresentar os textos narrativos de forma cadenciada, parágrafo por parágrafo (em beats narrativos), em vez de despejar todo o texto de uma só vez. O jogador absorve a ambientação no seu próprio ritmo, avançando com clique, tecla `Espaço`, `Enter` ou botão diegético `[ CONTINUAR LEITURA ▾ ]`, com animação tátil de tinta assentando e rolagem suave. A seção de deliberação (`#secao-deliberacao-decisoes`) só é revelada após a conclusão da leitura de todos os parágrafos da cena, com atalho discreto `[ Ler Tudo ]` para quem desejar avanço rápido.

**Blocked by:** None (can start immediately).

**Status:** closed

## Acceptance Criteria
- [x] Parágrafos narrativos em `#corpo-narrativa` revelados passo a passo (estilo Disco Elysium / beats de leitura).
- [x] Botão e indicador diegético de avanço (`.btn-progredir-leitura`) com indicação de tecla `[Espaço ▾]`.
- [x] Suporte a navegação por teclado (`Espaço` / `Enter`) e clique em qualquer parte da folha para avançar o parágrafo.
- [x] Botão ou pílula discreta `[ Ler Tudo ]` para revelar instantaneamente todo o texto da cena.
- [x] Seção de decisões (`#secao-deliberacao-decisoes`) permanece oculta até o término da leitura de todos os parágrafos do evento.
- [x] Transição fluida com animação suave de tinta assentando no papel (`@keyframes surgimentoParagrafo`) e auto-scroll confortável.
- [x] Suíte de testes automatizada `test/test_progressao_texto_ticket24.js` aprovada com 100% de sucesso.
