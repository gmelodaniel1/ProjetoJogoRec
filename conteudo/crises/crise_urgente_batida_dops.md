---
id: "crise_urgente_batida_dops"
titulo: "A Batida Policial na Madrugada"
fase: 1
ano: 1963
tipo: "crise_urgente"
custo_acoes: 0

requisitos_acesso: {}

opcoes:
  - id: "subornar_inspetor"
    rotulo: "Entregar todas as tuas economias ao chefe da ronda"
    descricao: "O inspetor aceita empurrar o teu dossiê para o fundo da gaveta, mas o preço limpa os teus bolsos."
    carimbo: "SUBORNO"
    requisitos:
      capital: 25
    efeitos:
      capital: -25
      suspeita_dops: -5

  - id: "sacrificar_lealdade_familiar"
    rotulo: "Permitir que teu pai assuma os panfletos e seja levado"
    descricao: "O velho dá um passo à frente antes que os policiais alcancem o teu quarto. O olhar dele nunca mais te perdoará."
    carimbo: "INFÂMIA"
    requisitos:
      relacao_pai: 1
    efeitos:
      relacao_pai: -3
      honra_familiar: -2
      suspeita_dops: -6
      sangue_frio: 1

  - id: "resistir_ao_interrogatorio"
    rotulo: "Enfrentar os porões da Rua do Hospício sem delatar ninguém"
    descricao: "Quarenta e oito horas de pauladas e isolamento na cela úmida. Teu corpo carrega cicatrizes, mas a tua boca não abre."
    carimbo: "RESISTÊNCIA"
    requisitos:
      sangue_frio: 2
    efeitos:
      sangue_frio: -1
      moral_popular: 4
      suspeita_dops: -4
---

As coronhadas de revólver contra a porta de madeira acordam o sobrado às três da manhã. O som de passos pesados no corredor não deixa dúvidas: o DOPS cercou a saída pelo quintal.

"Abram em nome da Lei de Segurança!", grita a voz rouca do sargento lá fora. O teu prontuário acumulou denúncias demais e a tua suspeita atingiu o limite máximo de tolerância do regime. Não há para onde fugir pelos telhados. Precisas pagar o preço imediatamente para não desaparecer nos porões.

