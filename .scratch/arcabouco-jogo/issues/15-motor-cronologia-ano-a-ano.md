# 15: Motor de Avanço Cronológico Ano a Ano & Transição Temporal Visível

**What to build:** O motor de estado e a interface passam a suportar uma progressão temporal nítida e visível ano a ano. Quando o jogador toma uma decisão formativa que conclui o período de um ano, o motor avança o calendário e a interface exibe uma vinheta editorial de passagem do tempo ("O TEMPO PASSA // RECIFE, 1948 ➔ 1949"), calculando a idade do protagonista e atualizando os marcadores da barra de sistema e da cronologia.

**Blocked by:** 14: Fluxo Narrativo em Dois Tempos (Exposição ➔ Continuar ➔ Escolha)

**Status:** done

- [x] `CharacterStateStore` suporta rastreamento de `anoNascimento` (default: 1948) e cálculo reativo de idade do protagonista
- [x] `DeterministicEngine` processa avanço de ano via metadados do evento (`avanco_ano`, `ano_alvo`) ou efeitos de decisões
- [x] Interface exibe um banner/overlay de transição editorial de virada de ano ("O Tempo Passa: 1948 ➔ 1949")
- [x] A barra de sistema superior e o cabeçalho editorial exibem o ano e a idade de forma clara e visível
- [x] Devtools (F1) sincroniza e permite editar o ano atual e o ano de nascimento
- [x] Testes automatizados cobrem o avanço de ano a ano e o cálculo de idade sem regressões
