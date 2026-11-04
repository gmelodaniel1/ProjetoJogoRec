# 16: Estrutura de Progressão da Infância (1948–1953)

**What to build:** Estrutura e scaffolding de arquivos de eventos formativos ano a ano para a infância do protagonista (1948 a 1953), cobrindo do nascimento nas palafitas do Capibaribe até a transição para as pontes e cais do Recife, com esquema estrito de metadados (`avanco_ano: 1`), opções com impactos de espectro e placeholders para redação do roteirista.

**Blocked by:** 15: Motor de Avanço Cronológico Ano a Ano & Transição Temporal Visível

**Status:** done

- [x] Definição do estágio de Infância (0 aos 5 anos / 1948–1953) no motor de estado
- [x] Criação dos 6 arquivos de eventos formativos ano a ano com contratos YAML válidos
- [x] Suporte a eventos formativos de ano a ano sem consumo indevido de cotas políticas da juventude (`custo_acoes: 0`)
- [x] Transição automática do fim da infância (1953) para o dossiê da juventude (1958)
- [x] Filtragem cronológica no `DeterministicEngine`: eventos futuros nunca vazam antes do ano vigente
