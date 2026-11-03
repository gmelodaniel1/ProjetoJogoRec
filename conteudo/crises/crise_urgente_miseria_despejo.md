---
id: "crise_urgente_miseria_despejo"
titulo: "A Ordem de Despejo e Penhora"
fase: 1
ano: 1962
tipo: "crise_urgente"
custo_acoes: 0

requisitos_acesso: {}

opcoes:
  - id: "vender_favores"
    rotulo: "Trocar tua influência política por um empréstimo urgente"
    descricao: "Vender votos sindicais ou favores burocráticos para um agiota do cais em troca de dinheiro vivo."
    carimbo: "COMPROMETIDO"
    requisitos:
      influencia: 1
    efeitos:
      influencia: -1
      capital: 30
      moral_popular: -2

  - id: "humilhacao_publica"
    rotulo: "Implorar ajuda aos patrões de Casa Forte"
    descricao: "Engolir o orgulho e beijar a mão da elite usineira para evitar que tua família vá para a sarjeta."
    carimbo: "HUMILHAÇÃO"
    requisitos: {}
    efeitos:
      honra_familiar: -2
      capital: 20
      moral_popular: -1
---

Os oficiais de justiça chegam acompanhados por dois praças da Polícia Militar. Teu Capital zerou por completo e as dívidas acumuladas bateram à porta. Móveis velhos, colchões de palha e as ferramentas de ofício são jogados na calçada sob o olhar curioso dos vizinhos.

Se não conseguires recursos neste instante, a tua família será lançada na miséria absoluta dos alagadiços do Rio Capibaribe.

