# 17: Régua de Idade e Atualização da Tela de Cronologia

**What to build:** Redesenho e ampliação da Tela de Cronologia (Aba 4) com uma Régua da Vida visual dividida nos 4 recortes de idade (Infância 0–5 anos, Juventude 6–16 anos, Vida Adulta 20–26 anos, O Ponto de Ruptura 27 anos), marcadores de etapa ativa, registro de idade em cada decisão do diário histórico e indicação da etapa na barra superior do jogo.

**Blocked by:** 16: Estrutura de Progressão da Infância (1948–1953)

**Status:** done

- [x] Método `store.getEtapaVida()` mapeando idade e ano para os 4 recortes históricos
- [x] Régua visual da vida renderizada na aba de cronologia com badges de anos e progresso
- [x] Atualização dos blocos de períodos históricos para contemplar a Infância (1948–1953)
- [x] Diário de decisões salvando e exibindo a idade em que cada escolha foi carimbada
- [x] Suporte a reset para o nascimento em 1948 no devtools e no estado padrão
- [x] Testes automatizados cobrindo a régua e etapas de vida
