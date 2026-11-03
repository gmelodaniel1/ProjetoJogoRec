# 13: Suíte de Testes Automatizados da Engine (Determinismo e Integridade)

**What to build:**
Bateria de testes unitários automatizados cobrindo a lógica determinística da engine: verificação de pré-requisitos de escolhas, integridade dos cálculos de recursos, regras de bloqueio, ativação correta do sequestro de crise e transição de dossiês.

**Blocked by:** 06: Motor Determinístico de Decisão & Verificador de Requisitos, 09: Sistema de Sequestro de Agenda por Eventos de Crise Forçados

**Status:** done

- [x] Runner de testes configurado e executável via script npm.
- [x] Testes cobrindo a validação de requisitos de escolhas (atributos, recursos, parentesco e condição social).
- [x] Testes cobrindo o bloqueio e a aplicação de efeitos numéricos.
- [x] Testes cobrindo a detecção de limiares críticos e o disparo forçado de crise.
- [x] Todos os testes passando com relatório limpo.

