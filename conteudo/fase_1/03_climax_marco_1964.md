---
id: "ev_f1_03_climax_marco_1964"
titulo: "A Noite dos Tanques no Derby"
fase: 1
ano: 1964
tipo: "climax_obrigatorio"
custo_acoes: 0
imagem: "cenarios/fase1_praca_republica_126023.webp"
tombo_mcr: "126.023"
imagens:
  - imagem: "cenarios/fase1_praca_republica_126023.webp"
    tombo_mcr: "126.023"
  - imagem: "cenarios/fase2_ponte_duarte_coelho_noturno.webp"
    tombo_mcr: "126.023"

requisitos_acesso: {}

opcoes:
  - id: "queimar_arquivos"
    rotulo: "Invadir a sede e queimar os fichários sindicais"
    descricao: "As sirenes do Exército ecoam pela Avenida Caxangá. Tuas mãos destroem provas antes que os soldados do IV Exército arrombem as portas."
    carimbo: "CLANDESTINO"
    desfecho: "Enquanto as coronhadas dos fuzis esmurravam os portões do sindicato, jogaste querosene nos armários de aço e ateaste fogo nas fichas de centenas de operários. A fumaça preta sufocou a sala, mas quando as tropas do IV Exército invadiram o recinto com baionetas em riste, encontraram apenas cinzas fumegantes. Centenas de famílias foram poupadas da prisão imediata graças ao teu sangue-frio na hora do terror."
    requisitos:
      sangue_frio: 1
    efeitos:
      suspeita_dops: -3
      honra_familiar: 1
      sangue_frio: 1

  - id: "resistir_ao_lado_do_pai"
    rotulo: "Formar cordão de resistência no Palácio do Governo"
    descricao: "Junto aos ferroviários e estudantes da Boa Vista, enfrentar os blindados que sobem a Ponte Duarte Coelho."
    carimbo: "RESISTÊNCIA"
    desfecho: "De braços dados com teu pai e dezenas de ferroviários no meio da Ponte Duarte Coelho, entoaste o hino sob a mira dos canhões dos blindados. O choque foi brutal: bombas de gás lacrimogêneo e cassetetes romperam o cordão humano. Teu pai foi derrubado na lama e preso, mas o teu grito de protesto ecoou em toda a cidade. Teu nome entrou com destaque vermelho nos arquivos de subversão do DOPS."
    requisitos:
      moral_popular: 2
    efeitos:
      moral_popular: 4
      suspeita_dops: 4
      relacao_pai: 2

  - id: "aproveitar_o_caos"
    rotulo: "Negociar salvo-conduto com os novos oficiais"
    descricao: "Entregar as chaves dos armazéns aos militares em troca de imunidade para tua família e teus negócios."
    carimbo: "ADESÃO"
    desfecho: "No gabinete improvisado do quartel do Derby, entregaste as chaves e as listas de abastecimento dos depósitos do porto ao coronel interventor. Em troca, recebeste um crachá de livre trânsito e o salvo-conduto comercial que garantiu os teus lucros durante a ocupação. Teu pai nunca mais te olhou nos olhos e os velhos amigos viraram o rosto na rua, mas a tua sobrevivência material fora cravada na nova ordem."
    requisitos:
      astucia: 2
    efeitos:
      capital: 30
      influencia: 2
      relacao_pai: -2
      suspeita_dops: -4
---

A madrugada de 1.º de abril de 1964 sepultou a juventude do Recife sob o ranger de lagartas de ferro. No Derby, a sede do IV Exército mobilizava contingentes em direção ao Palácio do Campo das Princesas. O governador foi deposto e as rádios transmitiam marchas marciais ininterruptas.

Nas pontes do Rio Capibaribe, soldados com baionetas caladas revistavam cada trabalhador que tentava atravessar de São José para Santo Antônio. A infância e as disputas de rua haviam terminado: a partir daquela noite, cada decisão passaria a carregar o peso do Decreto e a sombra do DOPS.

