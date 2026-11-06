# DIRETRIZES DE DIREÇÃO DE ARTE E PIPELINE NOIR DOCUMENTAL
## Jogo 'Águas de Ferro' (Recife, 1948–1975)
**Documento Mestre Canônico — Versão 1.0**  
**Classificação:** Especificação Técnica de Arte e Arquitetura Visual  
**Data de Fixação:** 04 de Novembro de 2026  
**Repositório Base:** `C:\Users\AdminUser\Desktop\Jogo Recife`  
**Destino Oficial:** `docs/DIRETRIZES_ESTETICAS_NOIR.md`  

---

## 1. SUMÁRIO EXECUTIVO E METÁFORA CONCEITUAL

### 1.1. O Conceito Central: "Tropical Noir Documental"
A identidade estética e a direção de arte do jogo **'Águas de Ferro'** fundamentam-se no conceito de **Tropical Noir Documental**. Ao contrário do *film noir* anglo-saxão clássico — ambientado no asfalto seco de Los Angeles ou na névoa fabril de Chicago —, o noir recifense é **viscoso, equatorial, fluvial e corrosivo**. Ele nasce da fricção entre a umidade sufocante do manguezal, a maresia atlântica que ataca impiedosamente o ferro inglês das pontes, as águas lodosas do Rio Capibaribe e o terror burocrático dos Anos de Chumbo sob a Ditadura Militar (1964–1975).

O Recife de 1948 a 1975 não é uma metrópole de concreto asséptico, mas um arquipélago urbano de ilhas fluviais entrecortadas por marés diárias, onde palafitas de madeira convivem com edifícios modernistas e sobrados neoclássicos azulejados. A luz noir aqui não é apenas estética: é uma consequência física da escuridão dos rios à noite, rasgada pelos relâmpagos de néon comercial e pelos faróis cortantes do aparelho repressor.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TROPICAL NOIR DOCUMENTAL                              │
│                                                                             │
│   [ÁGUAS DO CAPIBARIBE]  ◀──────────────▶  [LUZES DE NÉON & SÓDIO]          │
│   Superfície líquida viscosa e preta        Reflexos verticais rasgados     │
│   Lodo, mangue e maré de enchente           Âmbar, ciano e vermelhão-brasa  │
│                 ▲                                         ▲                 │
│                 │                                         │                 │
│   [FERRO OXIDADO & PONTES] ◀────────────▶  [ARQUIVO MORTO & REPRESSÃO]      │
│   Maresia atlântica, grades e canais        Papel celulose, carimbos DOPS   │
│   Estruturas vitorianas e concreto 1943     Grão de prata, censura e linotipo│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2. A Metáfora de Interface: "Mesa de Redação Clandestina / Arquivo Morto (1975)"
A experiência do jogador em 'Águas de Ferro' não se apoia na contemplação de telas digitais assépticas, mas no **manuseio físico de documentos de arquivo**. Toda a interface gráfica é uma **"Mesa de Redação Clandestina / Arquivo Morto em 1975"**, às vésperas da Grande Cheia de Julho:
- O fundo geral (`body`) representa uma bancada de madeira de cedro ou peroba envelhecida e acolhedora (`#5C4938` a `#786049`).
- A coluna esquerda (~54% da tela) é o **Palco Documental de Inspeção**, onde o jogador examina fotografias ampliadas em papel baritado de gelatina e prata, fichários catalográficos do DOPS, mapas de bacias hidrográficas e prontuários presos por fitas adesivas ressequidas.
- A coluna direita (~46%, `max-width: 720px`) é a **Folha Editorial de Crônica**, diagramada em papel celulose jornalístico com tipografia serifada de chumbo fundido, capitulares de rotativa de jornal e decisões carimbadas com impacto sonoro e mecânico.

### 1.3. O Arco Histórico e as 4 Etapas Formativas (1948–1975)
O protagonista vivencia 27 anos de história pessoal indissoluvelmente atrelados às transformações urbanas e políticas do Recife:
1. **Etapa 1 — Infância (1948–1953 • 0 aos 5 Anos):** O nascimento no mocambo à beira da lama; primeiros passos sobre palafitas na Bacia do Pina; as barcaças de capim no Rio Capibaribe; a Feira de São José; a chegada dos navios ao Cais de Santa Rita e as famílias de estivadores no SAPS.
2. **Etapa 2 — Juventude & Formação Política (1954–1964 • 6 aos 16 Anos):** A efervescência social do pós-suicídio de Getúlio Vargas; o comício de massas no Palácio do Campo das Princesas; as oficinas mecânicas da Great Western; o Movimento de Cultura Popular de Paulo Freire; culminando na ruptura do Golpe Militar de 31 de Março de 1964.
3. **Etapa 3 — Vida Adulta / Anos de Chumbo (1968–1974 • 20 aos 26 Anos):** O endurecimento sob o AI-5; a perseguição policial da Delegacia de Ordem Política e Social (DOPS - Rua da União / Rua da Aurora); as escolhas de classe (`Militar`, `Burguês`, `Líder Trabalhador`); a tensão permanente de vigilância entre as sombras das pontes e a indiferença dos luminosos comerciais.
4. **Etapa 4 — O Ponto de Ruptura (Julho de 1975 • 27 Anos):** A Grande Cheia do Capibaribe; 72 horas de temporal ininterrupto; o colapso dos diques; o blecaute urbano geral; o pânico generalizado pelo boato de rompimento da Barragem de Tapacurá; e a luta final contra o relógio para salvar vidas, memórias e dossiês das águas barrentas.

---

## 2. ESTUDO DE DIREÇÃO DE ARTE E IDENTIDADE NOIR DOCUMENTAL (R1)

### 2.1. Desconstrução e Análise Estética da Matriz: `artes/RecifeVibe.JPG`
A fotografia de referência `artes/RecifeVibe.JPG` condensa os fundamentos cromáticos, espaciais e atmosféricos do projeto. Realizou-se uma dissecação forense e fotométrica integral de sua estrutura:

```
+-------------------------------------------------------------------------------+  Y: 0px
| BANDA 1: Céu Noturno e Silhuetas da Arquitetura                               |
| RGB médio: [79.7, 55.7, 49.6] | Luminância: 58.2                              |
| Escuridão tropical opressiva tingida pela poluição luminosa alaranjada.       |
+-------------------------------------------------------------------------------+  Y: 200px
| BANDA 2: Tabuleiro da Ponte Duarte Coelho, Faróis e Néons Comerciais         |
| RGB médio: [100.4, 70.5, 55.4] | Luminância: 72.8                             |
| Fita contínua de faróis automotivos, néons (Phoenix, Bem-Te-Vi, INPS, Cinema) |
+-------------------------------------------------------------------------------+  Y: 400px
| BANDA 3: Águas do Rio Capibaribe & Colunas de Reflexo Especular               |
| RGB médio: [83.9, 67.2, 56.0] | Luminância: 69.4                              |
| Espelho d'água líquido, escuro e viscoso com reflexos rasgados verticalmente. |
+-------------------------------------------------------------------------------+  Y: 609px
                                Largura: 884px
```

#### A. Propriedades Físicas e Colorimétricas Globais
- **Resolução:** 884 × 609 pixels (proporção 1,451:1, correspondente à proporção geométrica clássica 3:2 do filme fotográfico de 35mm).
- **Média Global RGB:** R = `88.0`, G = `64.5`, B = `53.6` (hex `#584036`). Trata-se de uma temperatura cromática acentuadamente quente, terrosa e âmbar-séptico, governada por vermelhos e ocres escuros.
- **Mediana Global RGB:** R = `76.0`, G = `52.0`, B = `46.0`.
- **Luminância Média Geral:** $Y = 70.3$ (em escala 0 a 255), com desvio-padrão de 37.8.
- **Distribuição Radical de Clave Baixa (*Low-Key*):**
  - *Sombras Profundas (< 40 RGB):* **10,7%** da área da imagem. Ponto de preto situado em `#262522` / `#181C1B`. Não existe preto puro digital (`#000000`).
  - *Meios-Tons Comprimidos (40 a 180 RGB):* **85,7%** dos pixels. Essa faixa concentra toda a matéria física dos edifícios, da ponte e da massa aquática.
  - *Altas Luzes Pontuais (> 180 RGB):* Apenas **3,6%** da imagem. São exclusivamente as fontes ativas de luz (filamentos, néons e o pico do arco luminoso da Phoenix).

#### B. Identificação Topográfica e Geográfica Irrefutável
A cena foi capturada a partir da amurada de pedra da **Rua da Aurora** (Boa Vista), na margem oriental do Rio Capibaribe, olhando na direção sul/sudoeste:
1. **Ponte Duarte Coelho (inaugurada em 1943):** Ocupa o terço médio à esquerda. Seus arcos rebaixados de concreto armado sustentam o tabuleiro de tráfego intenso que une a Avenida Conde da Boa Vista à Avenida Guararapes. Uma esteira brilhante ininterrupta revela a longa exposição fotográfica dos faróis dos automóveis.
2. **O Luminoso Monumental da "Phoenix Pernambucana Seguros":** Instalado no topo do edifício à esquerda, erguendo-se como uma coroa de luz branca/marfim sobre as águas (pico RGB `[240, 240, 238]`). Trata-se da histórica seguradora pernambucana fundada no século XIX, imortalizada nas crônicas de época e na memória visual do pintor João Câmara.
3. **Lâminas Verticais de Néon Comercial:**
   - Edifício à direita exibindo em letras garrafais vermelhas o luminoso **"ÓLEO BEM-TE-VI"** e, abaixo, **"MARGARINA"** (RGB `[178, 71, 35]` / `#B24723`). Marca fabril icônica do parque industrial de Afogados.
   - Letreiro luminoso em ciano e azul-cobalto de cinema/loteria (RGB `[108, 156, 192]` / `#6C9CC0`).
4. **O Letreiro "INPS" — A Âncora Cronológica Definitiva:** No topo do edifício ao fundo à esquerda, lê-se com nitidez o letreiro luminoso do **INPS** (Instituto Nacional de Previdência Social). Como o INPS foi instituído formalmente pelo Decreto-Lei nº 72 de **21 de novembro de 1966**, a imagem data inequivocamente do período entre **1967 e 1972**. Esta constatação forense ancora `RecifeVibe.JPG` exatamente no clímax da Fase 2 (Anos de Chumbo) e na transição para a Fase 3 (a iminência da Grande Cheia) do jogo.

#### C. O Rio Capibaribe como Espelho Líquido Noir
As águas ocupam 48% da área vertical da imagem. O rio não apresenta transparência, comportando-se como um fluido viscoso carregado de lodo e matéria orgânica:
- **Cor Base da Água:** Varia entre `#121817` (lodo das margens) e `#1D2522` (maré salobra de vazante).
- **Colunas Verticais de Reflexo Especular (*Vertical Streaks*):** Devido à ondulação lenta das marés do Capibaribe, as fontes de luz suspensas na ponte e nos edifícios não se espalham de forma circular, mas são esticadas em faixas verticais trêmulas que cortam a metade inferior do quadro. Formam-se rastros luminosos bem delineados:
  - *Trilha Vermelho-Brasa (Bem-Te-Vi):* `#B24723` escorrendo verticalmente na água.
  - *Trilha Dourada / Vapor de Sódio:* `#D9A84E` e `#C5BBA0` das luminárias públicas refratadas no espelho escuro.
  - *Trilha Ciano / Fria:* `#6C9CC0` do luminoso de cinema cortando a densidade do lodo.

---

### 2.2. Análise do Acervo Fotográfico Histórico MCR (Volume 99)
A análise direta da obra `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf` (106 páginas, 113.171.754 bytes), preservada no Museu da Cidade do Recife (Forte das Cinco Pontas), revelou a natureza material do material de arquivo que alimenta o projeto.

#### A. Estrutura Física do Documento
O PDF não é uma coleção avulsa de fotos digitais, mas o **fac-símile em alta resolução (300 DPI, matrizes de ~2480 × 3593 px)** dos livros de tombo catalográficos da antiga Diretoria de Documentação e Cultura (DDC) da Prefeitura do Recife, criada em 1943 pelo intelectual José Césio Regueira Costa:
- **Suporte das Fichas:** Cartolina de fichário de 28 × 41 cm, cor creme/marfim (RGB neutro de digitalização: `[228, 235, 245]`; visualmente creme-amarelado por envelhecimento natural), contendo pautas azuis horizontais para anotações manuscritas e o timbre clássico do MCR.
- **As Fotografias:** São **cópias fotográficas de laboratório em papel baritado de gelatina e prata** (*silver gelatin baryta prints*), ampliadas por contato direto dos negativos originais de 35mm e formato médio (120mm). Possuem bordas brancas perimétricas de laboratório (3 mm a 6 mm).
- **Metadados Manuscritos:** Cada ficha contém campos preenchidos à caneta tinteiro ou esferográfica azul: `TOMBO Nº`, `ASSUNTO`, `DATA`, `LOCAL` e `TAMANHO DA CÓPIA`.

#### B. Características Físico-Químicas das Imagens
1. **Curva Tonal Analógica:** Densidade óptica máxima ($D_{\max}$) entre 1.85 e 2.05 nas sombras profundas. Ao contrário do corte digital duro, os negros retêm granulação de haleto de prata. As altas luzes apresentam um declínio suave (*shoulder rolloff*), preservando as tramas de tecidos brancos sob luz solar intensa.
2. **Degradação e Envelhecimento:**
   - *Espelhamento de Prata (Silver Mirroring):* Fenômeno químico no qual íons de prata coloidal oxidam e migram para a superfície da gelatina, formando um halo metálico reflexivo nas bordas das sombras mais escuras.
   - *Sulfurização / Desbotamento Térmico:* Sob a umidade e o calor de 30°C do Recife, a gelatina oxidou em tom âmbar-escuro não-homogêneo (mais forte nas margens das fotos do que no centro).
   - *Patina de Arquivo:* Presença de manchas elípticas de ferrugem de grampos, marcas circulares secas de copos de café de redação, poeira de secagem em varal de laboratório e manchas de cola vegetal ressecada nos cantos.

#### C. Mapeamento Temático & Correspondência com o Jogo
O acervo do Volume 99 cobre registros fotográficos entre 1936 e 1951 (itens de tombo 125.938 a 126.070), fornecendo a matéria-prima documental autêntica para os arcos narrativos de *Águas de Ferro*:

| Tombo / Página | Assunto Documentado | Detalhes Visuais Chave | Correspondência em 'Águas de Ferro' |
|---|---|---|---|
| **Tombo 125.938** (Pág. 14) | *Desembarque de Getúlio Vargas* | Vargas descendo de avião bimotor ("D.A..."); oficiais de quepe militar engomado prestando continência; contraste solar duro. | **Fase 1 (Infância):** A presença do poder federal, a estética militar paternalista e o impacto dos aviões no jovem protagonista. |
| **Tombo 125.940** (Pág. 16) | *Comício no Palácio do Governo* | Multidão compacta de trabalhadores vestindo chapéus de palha e ternos de linho rústico diante das grades do Campo das Princesas. | **Fase 1 & 2:** Efervescência popular pré-64, mobilização de massas pelas reformas de base e comícios de Miguel Arraes. |
| **Tombo 125.951** (Pág. 26) | *Cortejo Oficial de Vargas* | Escolta de motociclistas da polícia com quepes brancos, multidão nas calçadas com coqueiros e postes telegráficos. | **Fase 1:** Cortejos oficiais pelo centro, aparato repressivo nascente e atmosfera urbana de época. |
| **Tombo 125.976** (Pág. 50) | *Vargas entre Escolares* | Sala de aula com crianças alinhadas em uniformes engomados sob iluminação violenta de flash magnesiano. | **Fase 1:** As primeiras letras do protagonista; disciplina escolar e imposição moral da ordem. |
| **Tombo 125.996** (Pág. 61) | *Obras do Aeroporto dos Guararapes* | Arquitetura moderna de concreto armado, terraplenagem manual por operários empunhando pás ao lado de caminhões basculantes dos anos 50. | **Fase 1 & 2:** A modernização do Recife; o choque brutal entre o concreto arrojado e a mão de obra braçal desprovida de direitos. |
| **Tombo 126.019** (Pág. 74) | *Construção do Reformatório de Menores* | Andaimes de madeira rústica, pilhas de tijolos maciços e meninos vigiados por inspetores estatais. | **Fase 1:** A vulnerabilidade das crianças da periferia e a ameaça de internamento disciplinar. |
| **Tombo 126.023** (Pág. 76) | *Manifestação na Praça da República* | **NOTURNO HISTÓRICO CANÔNICO.** Mar de operários erguendo faixas de *"O SINDICATO DOS OPERÁRIOS"* e *"SINDICATO DOS RÁDIO-TELEGRÁFICOS"*. Um poste de iluminação pública no canto superior esquerdo cria um contraluz violento, desenhando silhuetas nítidas e uma névoa luminosa volumétrica sobre a massa. | **Fase 2 (Greve Geral & Resistência Sindical):** O chiaroscuro noir perfeito. A confluência perfeita entre a iluminação de `RecifeVibe.JPG` e o conflito operário do enredo. |
| **Tombo 126.056** (Pág. 96) | *Natal dos Portuários no SAPS (1951)* | Refeitório do Serviço de Alimentação da Previdência Social. Estivadores e conferentes com suas famílias em mesas compridas, trajando ternos brancos de linho e sapatos de bico fino. Letreiro de parede *"SAÍDA DO RESTAURANTE"*. | **Fase 1 & 2 (Origens Sociais):** O universo familiar do cais; a dignidade operária dos estivadores do Porto do Recife e sua solidariedade de classe. |
| **Tombo 126.065** (Pág. 102) | *Ruínas de Antigo Engenho* | Paredões de tijolo colonial desmoronando sob lodo úmido e raízes de figueira brava. | **Fase 1 & 3:** A decadência da aristocracia açucareira da Zona da Mata e as marcas históricas da opressão canavieira. |

---

### 2.3. Cruzamento Iconográfico e Referências Históricas Complementares (1958–1975)
Para enriquecer a cenografia visual de 'Águas de Ferro', o estudo expandiu a investigação sobre o espaço urbano, o clima e a cultura material do Recife durante os anos do jogo:

#### A. A Trama das Pontes do Recife: A Espinha Dorsal do Cenário
O centro da cidade divide-se entre as ilhas de Santo Antônio, São José e Bairro do Recife, articuladas ao continente (Boa Vista) por pontes de engenharia e épocas contrastantes:
1. **Ponte Duarte Coelho (1943):**
   - *Arquitetura:* Concreto armado sóbrio, vigas retas, parapeitos baixos e maciços.
   - *Papel Cênico:* O grande corredor comercial e político da cidade. Une a modernidade da Avenida Conde da Boa Vista ao centro burocrático da Avenida Guararapes. É o palco de passeatas estudantis e a locação exata de `RecifeVibe.JPG`.
2. **Ponte Maurício de Nassau (reconstruída em 1917):**
   - *Arquitetura:* Pilares maciços sobre o estuário, guardando quatro esculturas neoclássicas em ferro fundido da célebre fundição francesa *Val d'Osne* (personificando a Sabedoria, a Justiça, a Agricultura e o Comércio).
   - *Papel Cênico:* A travessia monumental entre o Porto e a Rua Primeiro de Março. À noite, a maresia densa envolve as estátuas em silhuetas fantasmagóricas sob a luz amarela dos postes.
3. **Ponte de Santa Isabel (1863):**
   - *Arquitetura:* Engenharia vitoriana em ferro forjado inglês, filigranas vazadas e lampiões ornamentais sobre os pilares.
   - *Papel Cênico:* Une a Rua da Aurora à Praça da República, passando defronte ao Teatro de Santa Isabel e ao Palácio do Governo. Cenário de emboscadas noturnas, vigilância do DOPS e confrontos com a polícia montada.
4. **Ponte Buarque de Macedo (1890):**
   - *Arquitetura:* Estrutura longa e baixa com grades de ferro simples, unindo Santo Antônio ao Bairro do Recife sobre a Bacia do Pina.
   - *Papel Cênico:* Ponto aberto ao vento do mar; barcos de pesca ancorados na lama na maré baixa; isolamento desolado nas madrugadas chuvosas.
5. **Ponte 6 de Março / Ponte Velha (1921):**
   - *Arquitetura:* Treliças metálicas inglesas em formato de arcos entrecruzados ligando a Boa Vista ao bairro proletário de São José.
   - *Papel Cênico:* Rota de carroceiros, trabalhadores do Mercado de São José e moradores de palafitas.
6. **Ponte Giratória (metálica ferroviária):**
   - *Arquitetura:* Engrenagens de aço e ferro oxidado que giravam para a passagem de vapores açucareiros pelo cais.

```
       [BOA VISTA]                                [SANTO ANTÔNIO]
  Rua da Aurora / DOPS-PE                    Palácio das Princesas / Teatro
         │                                               │
         ├─── [Ponte de Santa Isabel (Ferro Inglês)] ────┤
         │                                               │
  Av. Conde Boa Vista                        Av. Guararapes / Diario de PE
         │                                               │
         ├─── [Ponte Duarte Coelho (Concreto 1943)] ─────┤
         │                                               │
         └─── [Ponte 6 de Março (Treliça Metálica)] ─────┴── [SÃO JOSÉ]
                        │                                  Mercado / Mocambos
                 RIO CAPIBARIBE
```

#### B. Cartografia Dramática dos Quatro Bairros Centrais
- **Rua da Aurora e Boa Vista (O Rio e o Aparato de Repressão):**
  - Casario colonial e eclético do século XIX com azulejos portugueses azuis e amarelos descascando pela maresia, intercalados por prédios modernistas de 10 andares dos anos 50/60.
  - **O Prédio do DOPS-PE (Rua da Aurora / Rua da União):** Edifício institucional com grades maciças de ferro nas janelas térreas, salas altas com ventiladores de teto ruidosos, arquivos de aço verde-oliva com fichas de militantes e porões úmidos voltados para o rio.
  - **O Cinema São Luiz (inaugurado em 1952):** Palácio cinematográfico art déco às margens do Capibaribe. Seus vitrais multicoloridos e o letreiro iluminado refletiam faixas de luz rubra e azul sobre as águas escuras da Aurora.
  - **O Ginásio Pernambucano:** Polo estudantil onde, em 1º de abril de 1964, o estudante Jonas Barros foi assassinado a tiros no estopim do Golpe Militar.
- **Bairro de Santo Antônio (O Poder, a Burocracia e a Imprensa):**
  - **Avenida Guararapes:** Cânion de concreto armado com amplas marquises contínuas sob as quais pedestres se abrigavam das enxurradas. No alto, a floresta de néons luminosos (Phoenix, Bem-Te-Vi, INPS, Cigarros Continental).
  - **Praça da Independência ("Quatro Cantos") & Sede do *Diario de Pernambuco*:** O jornal mais antigo da América Latina em circulação contínua. Ruído mecânico contínuo das máquinas linotipistas à noite, rolos de borracha entintando papel de baixa gramatura e cheiro penetrante de chumbo fundido invadindo as esquinas.
  - **Palácio do Campo das Princesas:** Sede governamental neoclássica. Em 1º de abril de 1964, tanques do IV Exército cercaram seus jardins desenhados por Burle Marx para depor o governador Miguel Arraes.
- **Bairro do Recife (O Porto e a Resistência Proletária):**
  - Armazéns de açúcar em alvenaria e telhas de zinco ondulado da Companhia Docas; guindastes elétricos ingleses (*Stothert & Pitt*) desenhando silhuetas pontiagudas contra o céu do Atlântico.
  - Beco dos marinheiros, cabarés de luz vermelha fraca, trilhos ferroviários embutidos nos paralelepípedos úmidos e sedes clandestinas de sindicatos de estivadores.
- **São José e Bacias de Maré (O Recife da Lama e dos Mocambos):**
  - **O Mercado de São José:** Obra de ferro pré-fabricada importada de Paris em 1875. Galpão monumental saturado pelo odor de peixe seco, caranguejos vivos, fumo de rolo de Arapiraca, farinha de mandioca e ervas medicinais.
  - **A Linha de Lama das Palafitas:** Na Bacia do Pina, Coque e Ilha de Joana Bezerra, milhares de famílias habitavam mocambos de palha, madeira de caixote e lata suspensos sobre o lodo do mangue. O universo documentado por Josué de Castro em *"Geografia da Fome"* e *"Homens e Caranguejos"*, onde a maré alta duas vezes ao dia invadia o assoalho das casas.

#### C. O Clima Equatorial, a Umidade Noturna e a Grande Cheia de 1975
- **As Chuvas Torrenciais de Inverno (Maio a Agosto):** Pancadas de chuva tropicais intensas que alagam o centro em minutos. O asfalto e as pedras portuguesas das calçadas transformam-se em espelhos d'água reflexivos imediatos.
- **A Corrosão e o Bolor da Maresia:** Papéis celulósicos amarelam e ganham manchas de fungo (*foxing*); grampos de ferro oxidam em semanas; fitas adesivas ressecam e soltam poeira escura.
- **A Grande Cheia de Julho de 1975 (O Clímax do Jogo):**
  - O Rio Capibaribe recebeu 72 horas de precipitação contínua em toda a sua bacia, atingindo a cota histórica de **+4,5 metros acima do nível normal**.
  - **80% do território urbano foi submerso.** Águas barrentas e velozes arrastaram móveis, pontes de madeira e toneladas de baronesas (aguapés).
  - Um blecaute elétrico geral mergulhou a cidade na escuridão absoluta.
  - O colapso das comunicações gerou o célebre **boato do estouro da Barragem de Tapacurá**, deflagrando fuga em massa, desespero coletivo, saques e intervenção armada militar.

#### D. Cultura Material de Época (1958–1975)
- **Frota Automotiva:**
  - *Aparato Militar e Policial:* A viatura **Chevrolet Veraneio** (o temido "camburão" do DOPS/DOI-CODI, em pintura bicolor preta e cinza/branca), picapes Chevrolet C-10 de caçamba aberta e jipes militares Willys CJ-5 camuflados em verde-oliva.
  - *Veículos Civis:* O onipresente Volkswagen Fusca ("besouro"), Kombi tipo "corujinha", Aero-Willys, Ford Galaxie 500 dos usineiros e Simca Chambord.
  - *Transporte Público:* Bondes elétricos abertos com bancos de ripa de madeira (que circularam até 1960); ônibus monobloco Mercedes-Benz O-321 com traseiras arredondadas e fumaça escura de diesel.
- **Sinalização e Tipografia:**
  - Luminosos em tubos de gás néon curvados artesanalmente em vidro transparente ou fosco.
  - Gigantescas empenas cegas de edifícios pintadas à trincha com anúncios de época (Cigarros Continental, Café Colombo, Sabão Pontual, Guaraná Antarctica, Melhoral).
  - Pichações políticas com esmalte sintético vermelho ou piche asfáltico: *"Abaixo a Ditadura"*, *"Arraes Voltará"*, *"Paz no Campo"*.

---

### 2.4. Os 4 Pilares da Identidade Tropical Noir Documental

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    OS 4 PILARES DA DIREÇÃO DE ARTE NOIR                    │
├────────────────────┬────────────────────┬──────────────────────────────────┤
│ 1. ILUMINAÇÃO &    │ 2. PALETA CROMÁTICA│ 3. MATERIALIDADE &               │
│    CHIAROSCURO     │    & TONALIDADE    │    TEXTURA                       │
│ • Baixa clave (70%)│ • Lodo Capibaribe  │ • Grão de prata (ISO 400)        │
│ • Rim lights       │ • Vapor de sódio   │ • Reticulado de linotipo         │
│ • Espelho d'água   │ • Néon tropical    │ • Patina de arquivo e enchentes  │
├────────────────────┴────────────────────┴──────────────────────────────────┤
│ 4. LINGUAGEM DE CÂMERA, ENQUADRAMENTO & COMPOSIÇÃO                         │
│ • Enquadramento em obstrução (grades, venezianas e voyeurismo do DOPS)     │
│ • Sutis ângulos holandeses (instabilidade dramática de 2° a 4°)            │
│ • Proporções de documento de arquivo (2.1:1 widescreen e 3:2 documental)   │
└────────────────────────────────────────────────────────────────────────────┘
```

#### PILAR 1: ILUMINAÇÃO & CHIAROSCURO TROPICAL
1. **Baixa Clave Dramática (*Low-Key Lighting*):**
   - As sombras não são meros vazios, mas **volumes densos de matéria escura** (`#181614` a `#22201D`).
   - A composição deve respeitar rigidamente a **regra 70/30**: 70% da área do quadro imersa em sombras profundas e meios-tons comprimidos; apenas 30% em áreas iluminadas ativas.
2. **Fontes de Luz Motivadas e Tangíveis:**
   - Vetada a iluminação plana ou global contemporânea. Cada raio luminoso deve emanar de um ponto cênico identificável:
     - Uma lâmpada incandescente nua de 60 watts pendurada por cabo torcido na sala de interrogatório do DOPS.
     - O facho cortante dos faróis de uma Veraneio rasgando a névoa do Cais de Santa Rita.
     - O halo avermelhado pulsante do néon da "Bem-Te-Vi" refletindo na fachada de azulejos da Rua da Aurora.
     - A luz âmbar da luminária de mesa articulada focada nas matrizes de chumbo do *Diario de Pernambuco*.
3. **Luz de Contorno (*Rim Light*) e Separação de Silhuetas:**
   - Para que figuras humanas e arquitetura não se percam na escuridão, utiliza-se luz rasante de contorno. A claridade refletida do rio ou de um poste ao fundo recorta os contornos dos ombros, do chapéu de palha ou do parapeito de ferro das pontes.
4. **O Fenômeno do Espelho d'Água do Capibaribe:**
   - Toda tomada noturna com água ou asfalto molhado deve exibir **reflexos verticais alongados com quebra senoidal suave**. Os reflexos duplicam as cores da cidade de cabeça para baixo, criando uma sensação premonitória de "cidade submersa" antes da Cheia de 75.

---

#### PILAR 2: PALETA DE CORES E MATRIZ TONAL
A identidade cromática rejeita tanto o cinza neutro asséptico quanto a supersaturação sintética. Trata-se de uma matriz **orgânica, mineral, oxidada e impregnada de umidade**:

```
[PALETA CANÔNICA DE CORES "ÁGUAS DE FERRO"]
---------------------------------------------------------------------------------
1. Águas & Manguezal:     #121817 | #1D2522 | #2C3530 | #3C3B30
2. Incandescência & Sódio:#C5BBA0 | #E6DBB3 | #D9A84E | #966C32
3. Néon Tropical Autêntico:#B24723 | #C93B2B | #4A7A8C | #6C9CC0
4. Papel & Linotipo:      #EFE8DC | #D6CBB6 | #B8AA93 | #524C42
5. Burocracia & Repressão:#1E1D1B | #8A2522 | #3D4337 | #5B2B2A
```

##### Tabela de Swatches Canônicos:
| Família | Hexadecimal | Nome Histórico | Aplicação Cenográfica e de Interface |
|---|---|---|---|
| **Profundezas Fluviais** | `#121817` | *Lodo da Bacia do Pina* | Sombras profundas em águas noturnas e céus densos. |
| **Águas do Capibaribe** | `#1D2522` | *Água de Maré Salobra* | Cor base das águas fluviais em repouso. |
| **Limo & Manguezal** | `#2C3530` | *Mangue-Negro Sob a Noite* | Vegetação marginal, baronesas e limo na base dos pilares. |
| **Lama de Enchente** | `#3C3B30` | *Lodo das Cheias de 75* | Bordas de cheia, lodo ressequido em paredes e papel manchado. |
| **Incandescência Nua** | `#E6DBB3` | *Filamento 60W de Redação* | Núcleos de lâmpadas incandescentes e pontos de alta luz de leitura. |
| **Vapor de Sódio Urbano** | `#D9A84E` | *Poste da Av. Guararapes* | Halos de postes públicos e claridade de janelas do centro. |
| **Néon Vermelho-Brasa** | `#B24723` | *Luminoso Óleo Bem-Te-Vi* | Letreiros de néon comerciais vermelhos e lanternas de Fusca. |
| **Néon Ciano-Noturno** | `#6C9CC0` | *Azul do Cinema São Luiz* | Letreiros frios e reflexos elétricos de cinema sobre a água. |
| **Papel de Linotipo** | `#EFE8DC` | *Diario de Pernambuco 1958* | Fundo das folhas de crônica narrativa e papel de arquivo limpo. |
| **Pasta Burocrática** | `#D6CBB6` | *Prontuário DOPS-PE* | Fichas de investigação, bordas de fotos e cartolinas de dossiê. |
| **Tinta de Máquina** | `#1E1D1B` | *Fita de Carbono Remington* | Tipografia de texto principal, silhuetas e sombras de ferro. |
| **Carimbo de Censura** | `#8A2522` | *Vermelho "SUBVERSIVO"* | Carimbos de censura prévia, tarjas de veto e selos urgentes. |
| **Verde Autoritário** | `#3D4337` | *Gabinete do IV Exército* | Fardas de oficiais, arquivos de aço e viaturas militares. |
| **Ferro Oxidado** | `#5B2B2A` | *Maresia das Pontes* | Ferrugem de parapeitos de pontes inglesas e grades do cais. |

##### A Progressão Cromática pelas Três Fases Narrativas:
O ambiente visual transiciona de forma reativa conforme a cronologia avança no motor do jogo:
- **Fase 1 (1948–1964 • Formação & Efervescência Popular):**
  - *Atmosfera:* Tonalidade mais luminosa, acolhedora e esperançosa. Predomínio de sépias suaves, papel claro (`#EFE8DC`), madeira dourada polida e sol incisivo cortando os comícios populares.
- **Fase 2 (1968–1974 • Os Anos de Chumbo & O Silêncio sob o AI-5):**
  - *Atmosfera:* Fria, claustrofóbica, burocrática e soturna. Dominada pelo verde autoritário (`#3D4337`), cinzas de cimento armado, aumento drástico do contraste claro-escuro e a solidão das ruas vigiadas pelo DOPS.
- **Fase 3 (Julho de 1975 • O Ponto de Ruptura & A Grande Cheia):**
  - *Atmosfera:* Aquática, pantanosa e lúgubre. Dessaturação em direção aos cinzas e verdes-lodo (`#3C3B30`). Manchas líquidas escorrendo pelas margens dos documentos. O blecaute mergulha a cidade na escuridão, quebrada apenas por lampiões a querosene e faróis de botes de salvamento.

---

#### PILAR 3: TEXTURA, MATERIALIDADE & DEGRADAÇÃO DE ÉPOCA
As representações visuais devem suscitar a sensação física e táctil do suporte material do século XX:
1. **Grão Fotográfico de Gelatina e Prata (*Silver Gelatin Grain*):**
   - Emulação da estrutura granular estocástica dos filmes clássicos de média e alta sensibilidade (*Kodak Tri-X 400* e *Ilford HP5*). O grão não é ruído gaussiano colorido digital, mas uma microtextura de haletos de prata monocromática concentrada preferencialmente nos meios-tons e nas sombras médias.
2. **Reticulado Mecânico de Rotativa (*Halftone Screen*):**
   - O padrão pontilhado circular característico da impressão gráfica mecânica sobre papel de baixa gramatura (*newsprint*). Os pontos de tinta expandem-se levemente pela absorção da fibra de celulose (*dot gain*), conferindo tactilidade de folha de jornal real.
3. **Marcas Físicas de Arquivo Burocrático:**
   - **Oxidação de Grampos:** Manchas ovais de ferrugem alaranjada nos cantos das folhas de ocorrência.
   - **Fitas Adesivas Envelhecidas:** Fitas gomadas amareladas (`rgba(226, 210, 155, 0.72)`) fixando fotos na cartolina do fichário, com bordas desgastadas e cantos dobrados.
   - **Marcas de Café e Gordura:** Marcas circulares deixadas por xícaras de café frio sobre a mesa de investigação.
   - **A Linha d'Água da Cheia de 75:** Na Fase 3, uma marca horizontal úmida e ondulada indicando a linha onde a enchente submergiu os arquivos de papel.

---

#### PILAR 4: LINGUAGEM DE CÂMERA, ENQUADRAMENTO & COMPOSIÇÃO
1. **Composição em Obstrução (Vigilância & Paranoia):**
   - Tomadas de rua e interiores devem utilizar elementos de primeiro plano desfocados ou em silhueta total, reforçando a sensação de espionagem do DOPS:
     - As barras verticais de ferro batido de um portão colonial.
     - As ripas de uma persiana de madeira entreaberta em uma sala de redação.
     - Os cabos aéreos emaranhados e postes de bonde cruzando o céu noturno.
2. **Ângulos Holandeses Sutis (*Dutch Angles*):**
   - Em eventos de crise forçada, prisões políticas ou no pânico de Tapacurá, a linha do horizonte deve apresentar uma inclinação intencional de 2° a 4°, comunicando colapso da ordem institucional.
3. **Proporções de Enquadramento Arquivístico:**
   - Os enquadramentos devem obedecer às razões canônicas de papel fotográfico analógico e dos visores do jogo: **2.1:1** (widescreen panorâmico do Capibaribe) e **3:2** (foto documental de 35mm).

---

## 3. ARQUITETURA E PIPELINE TÉCNICO DE REESTILIZAÇÃO (R2)

### 3.1. Comparativo Técnico Aprofundado entre Abordagens

Para transformar digitalizações brutas do acervo histórico em ativos perfeitamente afinados com a atmosfera noir noturna de `RecifeVibe.JPG`, avaliaram-se três estratégias arquiteturais:

| Dimensão de Avaliação | Abordagem A: Estilização Dinâmica em Tempo de Execução (CSS / Canvas Puro) | Abordagem B: Pré-processamento Puro Offline (Scripts Batch em Disco) | Abordagem C: Arquitetura Híbrida (RECOMENDAÇÃO TÉCNICA DEFINITIVA) |
|---|---|---|---|
| **Fidelidade à Estética Noir** | **Fraca a Inadequada.** Filtros CSS W3C são operadores lineares globais (`sepia`, `contrast`). Transformam fotos solares em massas ocres desbotadas (luminância média sobe de 70 para 132 RGB), destruindo os negros densos. Filtros SVG avançados (`feTurbulence`) causam aberrações de escala. | **Altíssima, mas Rígida.** Permite curvas S de 16-bit, injeção de grão gaussiano ponderado e máscaras zonais. Contudo, gera imagens com clima estático e congelado, incapazes de reagir às mudanças cronológicas do enredo. | **Máxima e Dinâmica.** O pré-processamento offline gera matrizes tonais calibradas em alta definição com grão de prata e pretos densos; a camada CSS em tempo de execução aplica modulações atmosféricas de fase, vinhetas e carimbos táteis. |
| **Carga de CPU e GPU no Electron** | **Crítica / Risco de Engasgo.** Aplicar `filter`, `mix-blend-mode: multiply` e SVG `feTurbulence` sobre scans em tempo real força rasterização contínua na CPU, derrubando os frames durante o `screenShake` dos carimbos táteis. | **Nula em Execução.** O Chromium carrega apenas imagens rasterizadas leves já preparadas, sem qualquer processamento adicional. | **Mínima (60 FPS Cravados).** A GPU opera com texturas estáticas pré-otimizadas; filtros CSS simples de transição tonal (`filter`) são processados inteiramente no compositor de vídeo acelerado por hardware. |
| **Consumo de Memória RAM / Heap V8** | **Extremamente Perigoso.** Injetar scans brutos de 2480 × 3590 px (~25 MB decodificados por imagem) no DOM satura o heap do processo Renderer do Chromium, podendo provocar travamento da engine. | **Mínimo Absoluto.** As imagens são salvas nas dimensões exatas de exibição (ex: 1200 × 570 px em WebP), consumindo menos de 180 KB por asset. | **Mínimo Absoluto.** Assets padronizados em 1200 × 570 px / 1200 × 800 px em formato WebP/JPEG leve, mantendo a pegada de memória do jogo abaixo de 90 MB no desktop. |
| **Reatividade à Narrativa (Fases 1, 2 e 3)** | **Alta.** Filtros CSS podem ser facilmente alterados mudando classes no elemento `body`. | **Nula.** Exigiria triplicar o número de arquivos em disco para cobrir cada fase do jogo (ex: `cena_fase1.jpg`, `cena_fase2.jpg`, `cena_fase3.jpg`). | **Perfeita e Elegante.** Um único asset pré-processado serve de base neutra de alta fidelidade; as classes de fase do `body` (`.fase-1`, `.fase-2`, `.fase-3`) modulam calor térmico, vinheta e lodo dinamicamente via variáveis CSS. |
| **Fluxo Operacional de Produção** | Roteiristas poderiam apenas soltar imagens brutas na pasta, mas a apresentação final seria visualmente pobre e anti-histórica. | Exige intervenção manual constante em softwares de edição a cada nova foto adicionada. | **Pipeline Automatizado por Script:** Um script executado na esteira de desenvolvimento prepara todos os arquivos brutos do acervo em segundos com controle rigoroso de qualidade. |

#### Demonstração Empírica da Falha do Runtime Puro
No experimento prático conduzido sobre a foto da manifestação (Tombo 126.023 do MCR), submeteu-se o scan bruto ao filtro CSS anterior de `style.css`:
```css
filter: sepia(55%) contrast(112%) brightness(93%) grayscale(20%);
```
- **Resultado Medido:** A média RGB saltou para `[132.8, 127.3, 110.5]`, elevando a luminância média para **126.4**.
- **Comparação Forense:** A referência `RecifeVibe.JPG` possui média RGB de `[88.0, 64.5, 53.6]` e luminância **70.3**. O filtro linear lavou as sombras dramáticas, converteu o preto do asfalto em um cinza-marrom fosco e não conseguiu recriar a atmosfera noturna nem a separação entre o céu escuro e o brilho dos letreiros.

---

### 3.2. A Recomendação Técnica Definitiva: Arquitetura Híbrida
A recomendação inequívoca para o projeto 'Águas de Ferro' é a **Arquitetura Híbrida**, estruturada em duas camadas complementares:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DO PIPELINE HÍBRIDO                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. CAMADA OFFLINE: ENGENHARIA DE ATIVOS (Python/Pillow ou Node/Sharp)       │
│    [Scan Bruto MCR] ──▶ [Recorte Cirúrgico da Foto (Sem Bordas Fichário)]   │
│                      ──▶ [Normalização & Curva S Não-Linear (Pretos #1A1815)]│
│                      ──▶ [Injeção de Grão Analógico Ponderado nos Meios-Tons]│
│                      ──▶ [Redimensionamento Proporcional (1200x570 / 800)]  │
│                      ──▶ [Exportação WebP Otimizado < 180 KB]               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. CAMADA RUNTIME: APRESENTAÇÃO DINÂMICA NO CHROMIUM (CSS & GPU)            │
│    [Asset Base WebP] ──▶ [.filtro-jornal-75 Reativo à Classe de Fase]       │
│                       ──▶ [.foto-jornal-wrapper::after (Halftone + Vinheta)]│
│                       ──▶ [.selo-sobreposto-cenario (Carimbo Burocrático)]  │
│                       ──▶ [Aceleração via GPU: transform: translateZ(0)]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.3. Parâmetros Técnicos Objetivos e Fórmulas Matemáticas

#### A. Função de Transferência Tonal (Curva S Não-Linear Cinematográfica)
Para esmagar sombras diurnas preservando as altas luzes motivadas, aplica-se uma curva sigmoidal assimétrica por partes sobre a luminância normalizada $x \in [0, 1]$:

$$
S(x) = \begin{cases} 
0.5 \times (2x)^{1.35} & \text{se } x < 0.5 \quad \text{(compressão agressiva de sombras)} \\
1.0 - 0.5 \times [2(1 - x)]^{1.25} & \text{se } x \ge 0.5 \quad \text{(preservação suave de altas luzes)}
\end{cases}
$$

Essa transformação aprofunda o preto histórico sem produzir *clipping* artificial, garantindo que o ponto de sombra atinja `#1A1815` e as altas luzes estabilizem em `#EAE2D2`.

#### B. Modelo Matemático de Injeção de Grão Analógico Ponderado
O ruído estocástico gaussiano de prata coloidal $\mathcal{N}(0, \sigma^2)$ não deve agir uniformemente. Sua amplitude máxima deve ocorrer nos meios-tons, amortecendo-se nas sombras profundas e nas altas luzes através de uma máscara parabólica:

$$
M_{\text{grain}}(x) = 4.0 \times S(x) \times [1.0 - S(x)]
$$

$$
I_{\text{final}}(x) = \text{clip}\left( I_{\text{base}} + \mathcal{N}(0, \sigma^2) \times M_{\text{grain}}(x),\; 0,\; 255 \right)
$$

Adota-se $\sigma = 6.0$ para simular a sensibilidade de filme ISO 400 (Kodak Tri-X / Ilford HP5).

---

### 3.4. Scripts Operacionais de Processamento de Ativos

#### Opção A: Script Canônico em Python (`tools/process_archive_photos.py`)
Script operacional completo pronto para execução na raiz do repositório:

```python
#!/usr/bin/env python3
"""
Pipeline de Processamento Iconográfico Noir para 'Águas de Ferro'
Converte matrizes escaneadas do Museu da Cidade do Recife em ativos de alta definição.
"""
import os
import sys
import numpy as np
from PIL import Image

def process_historical_photo(
    input_path: str,
    output_path: str,
    target_width: int = 1200,
    target_height: int = 570,  # Proporção 2.1:1 para paridade com cenários procedurais
    noise_sigma: float = 6.0
):
    """
    Processa um recorte de foto de tombo aplicando curva S,
    grão de prata baritada e redimensionamento de alta qualidade.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Arquivo de entrada não encontrado: {input_path}")
        
    out_dir = os.path.dirname(output_path)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    # 1. Carrega a imagem e converte para array de ponto flutuante
    img = Image.open(input_path).convert('RGB')
    arr = np.array(img).astype(np.float32)

    # 2. Converte para luminância monocromática de gelatina e prata
    # Coeficientes do padrão ITU-R BT.601
    gray = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    norm = gray / 255.0

    # 3. Aplica a Curva S Cinematográfica Assimétrica
    scurve = np.where(
        norm < 0.5,
        0.5 * np.power(2.0 * norm, 1.35),
        1.0 - 0.5 * np.power(2.0 * (1.0 - norm), 1.25)
    )

    # 4. Mapeamento Tonal Base (Gelatina e Prata Neutra com leve oxidação de arquivo)
    # Sombras profundas: #1A1815 (RGB [26, 24, 21]) | Meios-Tons: #807261 | Altas Luzes: #EAE2D2 (RGB [234, 226, 210])
    r_base = np.interp(scurve, [0.0, 0.5, 1.0], [26.0, 128.0, 234.0])
    g_base = np.interp(scurve, [0.0, 0.5, 1.0], [24.0, 114.0, 226.0])
    b_base = np.interp(scurve, [0.0, 0.5, 1.0], [21.0,  97.0, 210.0])

    # 5. Injeção de Grão Fotográfico Orgânico Ponderado
    np.random.seed(42)  # Determinismo de geração
    grain = np.random.normal(0.0, noise_sigma, gray.shape)
    grain_mask = 4.0 * scurve * (1.0 - scurve)  # Pico nos meios-tons

    # Clamping estrito para garantir conformidade com o Visual Blacklist (sem #000000 nem #FFFFFF puros)
    # Piso escuro limitado a #1A1815 ([26, 24, 21]) e teto claro limitado a #EAE2D2 ([234, 226, 210])
    r_final = np.clip(r_base + grain * grain_mask, 26.0, 234.0)
    g_final = np.clip(g_base + grain * grain_mask, 24.0, 226.0)
    b_final = np.clip(b_base + grain * grain_mask, 21.0, 210.0)

    processed_arr = np.stack([r_final, g_final, b_final], axis=-1).astype(np.uint8)
    processed_img = Image.fromarray(processed_arr)

    # 6. Recorte Inteligente Centralizado (Smart Center-Crop)
    orig_w, orig_h = processed_img.size
    aspect_target = target_width / target_height
    aspect_orig = orig_w / orig_h

    if aspect_orig > aspect_target:
        new_w = int(orig_h * aspect_target)
        left = (orig_w - new_w) // 2
        processed_img = processed_img.crop((left, 0, left + new_w, orig_h))
    else:
        new_h = int(orig_w / aspect_target)
        top = (orig_h - new_h) // 2
        processed_img = processed_img.crop((0, top, orig_w, top + new_h))

    # 7. Redimensionamento via Lanczos de Alta Fidelidade
    final_img = processed_img.resize((target_width, target_height), Image.Resampling.LANCZOS)

    # 8. Exportação Otimizada (WebP para menor overhead de memória no Electron)
    output_ext = os.path.splitext(output_path)[1].lower()
    if output_ext == '.webp':
        final_img.save(output_path, 'WEBP', quality=88, method=6)
    else:
        final_img.save(output_path, 'JPEG', quality=90, optimize=True, progressive=True)

    print(f"[OK] Ativo gerado com sucesso: {output_path} ({target_width}x{target_height})")

if __name__ == '__main__':
    # Exemplo de processamento em lote
    if len(sys.argv) > 2:
        process_historical_photo(sys.argv[1], sys.argv[2])
    else:
        print("Uso: python process_archive_photos.py <origem.jpg> <destino.webp>")
```

#### Opção B: Script Alternativo em Node.js (`tools/process-photos-sharp.js`)
Para equipes que operam integralmente no ecossistema JavaScript/Node.js com a biblioteca `sharp`:

```javascript
/**
 * Pipeline de Processamento Noir via Sharp para 'Águas de Ferro'
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processPhotoSharp(inputPath, outputPath, width = 1200, height = 570) {
  try {
    const dir = path.dirname(outputPath);
    if (dir && dir !== '.' && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Matriz de divisão tonal baritada (sombras carvão, meios âmbar)
    // Exige entrada de 3 bandas (sRGB) correspondente às 3 colunas da matriz
    const colorRecombMatrix = [
      [0.98, 0.05, 0.02],
      [0.08, 0.90, 0.02],
      [0.02, 0.06, 0.82]
    ];

    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: sharp.strategy.entropy // Foca no centro de maior interesse visual
      })
      .grayscale()
      .toColourspace('srgb') // Converte mono (1 canal) de volta a sRGB (3 canais idênticos), permitindo a operação da matriz 3x3
      .linear(1.32, -22) // Aprofunda as sombras e eleva o contraste
      .recomb(colorRecombMatrix)
      .webp({ quality: 86, effort: 6 })
      .toFile(outputPath);

    console.log(`[Sharp] Asset gerado: ${outputPath} (${width}x${height})`);
  } catch (err) {
    console.error(`Erro ao processar ${inputPath}:`, err);
  }
}

module.exports = { processPhotoSharp };
```

---

### 3.5. Especificação Canônica de Filtros CSS e Modulação Dinâmica
Para que o visual responda em tempo real à fase narrativa do jogo gerenciada em `state-store.js` e refletida nas classes do `body` (`body.fase-1`, `body.fase-2`, `body.fase-3`, `body.em-crise-urgente`), estabelece-se o seguinte conjunto de variáveis e regras para `style.css`:

```css
/* ==========================================================================
   VARIÁVEIS DE REESTILIZAÇÃO DE IMAGEM POR FASE (§2.4 CONTEXT.md)
   ========================================================================== */
:root {
  /* Padrão / Fase 1: Formação & Efervescência Popular (1948–1964)
     Tom sépia quente, papel limpo, luz solar suave e vinheta amena */
  --foto-filtro-base: sepia(35%) contrast(116%) brightness(94%) saturate(92%) hue-rotate(-5deg);
  --foto-vinheta-centro: transparent;
  --foto-vinheta-borda: rgba(36, 26, 18, 0.50);
  --foto-borda-suporte: #8C7F6A;
  --foto-fundo-cartolina: #C9BEA9;
}

/* Modulação Fase 2: Anos de Chumbo, AI-5 e Repressão do DOPS (1968–1974)
   Contraste duro, atmosfera fria, desolação de chumbo e vinheta escura */
body.fase-2 {
  --foto-filtro-base: grayscale(35%) sepia(20%) contrast(128%) brightness(85%) hue-rotate(170deg);
  --foto-vinheta-centro: transparent;
  --foto-vinheta-borda: rgba(14, 18, 22, 0.78);
  --foto-borda-suporte: #5C625E;
  --foto-fundo-cartolina: #B2AAA0;
}

/* Modulação Fase 3: A Grande Cheia do Capibaribe & Calamidade (Julho de 1975)
   Tons esverdeados de lodo, afogamento perimétrico e luz de blecaute */
body.fase-3 {
  --foto-filtro-base: sepia(48%) contrast(114%) brightness(78%) hue-rotate(45deg) saturate(108%);
  --foto-vinheta-centro: rgba(22, 30, 20, 0.18);
  --foto-vinheta-borda: rgba(16, 24, 15, 0.90);
  --foto-borda-suporte: #3C3B30;
  --foto-fundo-cartolina: #8F8C76;
}

/* Estado de Exceção: Evento de Crise Forçado / Batida Policial do DOPS */
body.em-crise-urgente {
  --foto-filtro-base: grayscale(10%) sepia(55%) contrast(138%) brightness(80%) hue-rotate(-15deg);
  --foto-vinheta-borda: rgba(90, 20, 16, 0.88); /* Vinheta vermelha de perigo iminente */
}
```

---

## 4. ESPECIFICAÇÃO DE INTEGRAÇÃO VISUAL COM O JOGO (R3)

### 4.1. Mapeamento Arquitetural com o Layout Existente
A integração visual opera diretamente sobre os componentes declarados em `index.html` e estilizados em `style.css`:

```
.mesa-investigacao
└── .palco-central (flex: 1.18; ~54% largura da tela)
    └── .palco-visor
        └── #aba-cenario (.aba-palco.ativa)
            ├── .cenario-container (borda de papel de arquivo; fitas nas extremidades)
            │   ├── .fita-canto-esq (fita adesiva rotacionada -4deg)
            │   ├── .fita-canto-dir (fita adesiva rotacionada +3.5deg)
            │   ├── #slot-moldura-evidencia (.moldura-evidencia; display flex; overflow hidden)
            │   │   └── .foto-jornal-wrapper (posicionamento relativo; 100% largura e altura)
            │   │       ├── img.filtro-jornal-75 (object-fit: cover; aceleração GPU)
            │   │       │   (ou fallback procedural SVG gerarSvgCenario())
            │   │       ├── .selo-sobreposto-cenario (carimbo rotacionado -3deg no canto sup. dir.)
            │   │       └── ::after (camada pseudoelemento: vinheta radial + reticulado halftone 3px)
            │   └── .cenario-legenda-barra
            │       ├── #cenario-local (Ex: "PRAÇA DA REPÚBLICA (RECIFE, 1968)")
            │       └── #cenario-registro (Ex: "REGISTRO N.º 126.023/MCR")
            └── #painel-cheia-75 (visível exclusivamente na Fase 3 sob a moldura fotográfica)
```

#### Regras de Implementação CSS das Classes do Palco:
```css
/* 1. MOLDURA DE EVIDÊNCIA DO CENÁRIO */
.moldura-evidencia {
  flex: 1;
  border: 1px solid var(--foto-borda-suporte);
  background-color: var(--foto-fundo-cartolina);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 260px;
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.40);
  transition: border-color 0.4s ease, background-color 0.4s ease;
}

/* 2. ENVOLTÓRIO DA FOTOGRAFIA COM TEXTURA DE IMPRESSÃO */
.foto-jornal-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 3. IMAGEM RASTERIZADA TRATADA */
.filtro-jornal-75 {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%; /* Privilegia os dois terços superiores da foto */
  filter: var(--foto-filtro-base);
  display: block;
  transform: translateZ(0); /* Aceleração por hardware no compositor da GPU */
  transition: filter 0.5s ease-out;
}

/* 4. VINHETA DINÂMICA E RETICULADO MECÂNICO DE ROTATIVA */
.foto-jornal-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: 
    radial-gradient(ellipse at 50% 50%, var(--foto-vinheta-centro) 35%, var(--foto-vinheta-borda) 100%),
    repeating-radial-gradient(circle at 1px 1px, rgba(30, 24, 18, 0.08) 0, rgba(30, 24, 18, 0.08) 1px, transparent 1px, transparent 3px);
  background-size: 100% 100%, 3px 3px;
  mix-blend-mode: multiply;
  transition: background 0.5s ease;
}

/* 5. SELO BUROCRÁTICO DE ACERVO / CENSURA */
.selo-sobreposto-cenario {
  position: absolute;
  top: 14px;
  right: 18px;
  font-family: var(--fonte-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--cor-carimbo-vermelho);
  border: 2px solid var(--cor-carimbo-vermelho);
  padding: 3px 8px;
  transform: rotate(-3deg);
  background-color: rgba(239, 232, 220, 0.88);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  z-index: 5;
}
```

---

### 4.2. Proporções, Resoluções e Enquadramentos Canônicos

Para assegurar total estabilidade geométrica da interface e evitar distorções ou pulos visuais (*layout shifts*), fixam-se quatro categorias padronizadas de ativos gráficos:

| Categoria do Ativo | Resolução Alvo | Aspect Ratio | Contêiner DOM Alvo | Aplicação Narrativa |
|---|---|---|---|---|
| **1. Cenário Panorâmico Widescreen** | **1200 × 570 px** | **2.1:1** (~21:10) | `#slot-moldura-evidencia` | Pontes, horizontes fluviais, passeatas de massa e paisagens do Capibaribe. Paridade geométrica exata com o SVG procedural (`viewBox="0 0 800 380"` = 2.105:1). |
| **2. Foto Documental de 35mm** | **1200 × 800 px** | **3:2** (1.5:1) | `#slot-moldura-evidencia` | Ocorrências específicas, flagrantes policiais, recepções oficiais e fotos do acervo do MCR. |
| **3. Retrato de Prontuário / Dossiê** | **450 × 600 px** | **3:4** (Retrato 3x4) | `.aba-palco` (Relações / Personagens) | Retratos oficiais do DOPS, carteiras sindicais e fichas familiares do círculo íntimo. |
| **4. Evidência Quadrada** | **600 × 600 px** | **1:1** (Quadrado) | Modais de Dossiê e Popups | Detalhes de armas, panfletos clandestinos recortados e bilhetes apreendidos. |

#### Regras Críticas de Zona Segura (*Safe-Zone*):
Ao recortar e enquadrar imagens históricas:
1. **Zona Central Protegida (80% Centrais):** Todos os rostos principais, letreiros vitais e detalhes documentais devem permanecer confinados dentro dos **80% centrais** do quadro. As margens periféricas de 10% nas quatro bordas poderão sofrer leve corte adaptativo dependendo do redimensionamento da janela do jogador.
2. **Desobstrução dos Cantos Superiores:** As fitas adesivas nos cantos superiores ocupam cerca de 25px diagonais. O vértice superior direito recebe adicionalmente o carimbo rotacionado `.selo-sobreposto-cenario` (-3deg). Nenhum elemento focal indispensável deve ser posicionado no quadrante superior direito da imagem.

---

### 4.3. Protocolo Prático de Curadoria: Do Tombo ao Jogo

O processo operacional para converter páginas do acervo histórico em ativos finais obedece ao seguinte rito de 6 etapas:

```
[Etapa 1: Identificação]
Localizar o tombo no PDF 'ACERVO DIGITAL MCR fotografia - VOL 99.pdf'
Anotar: Número de Tombo, Assunto, Data e Ano da Cena.
          │
          ▼
[Etapa 2: Extração em Alta Resolução]
Exportar a página do PDF a 300 DPI (PNG descompactado).
Recortar cirurgicamente a foto baritada, expurgando pautas azuis e margens brancas da ficha.
          │
          ▼
[Etapa 3: Execução do Script de Processamento]
Executar: python tools/process_archive_photos.py <recorte_raw.png> <saida.webp>
O script aplica curva S, grão ponderado, corte 2.1:1 e compressão WebP.
          │
          ▼
[Etapa 4: Catalogação e Nomenclatura Padronizada]
Salvar o asset em: artes/cenarios/
Padrão de nome: fase{N}_{toponimo}_{ano}.webp
Exemplo no disco: artes/cenarios/fase2_praca_republica_1968.webp
          │
          ▼
[Etapa 5: Vínculo no Frontmatter do Evento Markdown]
Abrir o arquivo de evento em conteudo/fase_{N}/[evento].md e preencher:
---
id: "manifestacao_operaria_68"
titulo: "O Grito dos Radiotelegrafistas"
ano: 1968
imagem: "cenarios/fase2_praca_republica_1968.webp"
tombo_mcr: "126.023"
---
(Nota: 'imagem' deve ser relativo a artes/, pois renderer.js:787 já interpola 'artes/${evento.metadata.imagem}')
          │
          ▼
[Etapa 6: Verificação em Tempo Real & Fallback]
Carregar o evento no jogo:
• metadata.imagem ausente: renderer.js executa automaticamente gerarSvgCenario().
• Tratamento defensivo: recomenda-se onerror="this.style.display='none'; ..." para links quebrados.
```

#### Detalhamento Técnico das Regras de Integração e Resiliência

1. **Especificação de Caminhos Relativos no Frontmatter (`renderer.js:787`):**
   - O campo `imagem` no frontmatter de cada evento Markdown deve ser preenchido relativamente à pasta `artes/` (por exemplo: `imagem: "cenarios/fase2_praca_republica_1968.webp"`).
   - **Justificativa da Engine:** No código de apresentação (`renderer.js:787`), a interpolação HTML já embute o diretório base:
     ```javascript
     <img src="artes/${evento.metadata.imagem}" class="filtro-jornal-75" alt="${evento.metadata.titulo || 'Cenário'}">
     ```
     Declarar `"artes/cenarios/..."` no frontmatter produziria uma URL corrompida duplicando o prefixo (`artes/artes/cenarios/...`).

2. **Tratamento de Ausência de Imagem e Defesa contra Links Quebrados:**
   - **Fallback Procedural Nativo:** Caso o arquivo Markdown não defina `metadata.imagem`, `renderer.js` aciona de forma transparente a função procedural `gerarSvgCenario(evento, estado)`, gerando a silhueta geométrica em SVG com a vinheta e o carimbo de época apropriados (`CALAMIDADE — CHEIA DE 75`, `MANDADO DE CAPTURA` ou `ARQUIVO ICONOGRÁFICO // PE`).
   - **Recomendação Defensiva para Falhas de Rede/Arquivo:** Se `metadata.imagem` estiver preenchido com um caminho cujo arquivo físico não exista no disco ou venha a falhar durante o carregamento no Chromium, a tag `<img>` padrão exibiria um ícone quebrado do navegador. Recomenda-se adicionar um tratador defensivo em `renderer.js`, como `onerror="this.style.display='none'; ..."` ou um callback que invoque `gerarSvgCenario` e substitua o contêiner, blindando a interface contra qualquer ruptura visual.

---

## 5. CONFORMIDADE COM O DESIGN SYSTEM E VISUAL BLACKLIST (`CONTEXT.md`)

Para resguardar a integridade artística e afastar qualquer aparência de aplicativo web moderno ou dashboard de inteligência artificial, o pipeline fotográfico e a interface subordinam-se estritamente à **Visual Blacklist de CONTEXT.md**:

| Regra do Design System | Diretriz Mandatória | Status no Pipeline Noir |
|---|---|---|
| **1. Proibição de Cantos Arredondados** | `border-radius: 0 !important;` em todo o CSS do projeto. As fotos, carimbos e molduras devem emular cartões cortados na guilhotina mecânica de papel. | **Conforme.** O `#slot-moldura-evidencia`, `.foto-jornal-wrapper` e `.selo-sobreposto-cenario` possuem cantos 100% retos e secos. |
| **2. Proibição de Fontes Sans-Serif Modernas** | Proibido o emprego de `Inter`, `Roboto`, `Arial`, `Helvetica` ou `system-ui`. | **Conforme.** A narrativa utiliza tipografia serifada de imprensa (`EB Garamond` / `Lora`), enquanto metadados e carimbos utilizam tipografia mecânica monoespaçada (`Courier Prime` / `Special Elite`). |
| **3. Proibição de Gradientes e Néon Modernos** | Proibidos gradientes purpúreos, azuis elétricos saturados, brilhos difusos e cartões flutuantes estilo Material Design. | **Conforme.** As cores de néon referenciadas (`#B24723`, `#6C9CC0`, `#D9A84E`) são historicamente motivadas pelas marcas recifenses dos anos 60/70 e atenuadas pelas águas escuras do Capibaribe. |
| **4. Proibição de Preto e Branco Puros** | Proibido `#000000` absoluto e `#FFFFFF` puro. A leitura visual reside em tintas celulósicas orgânicas e papel envelhecido. | **Conforme.** Ponto de preto da curva S fixado em `#1A1815` / `#1C1917`; ponto de alta luz em `#EAE2D2` / `#EFE8DC`. |
| **5. Fundo Geral Acolhedor** | O fundo geral (`body`) deve ser uma bancada de madeira ocre envelhecida (`#5C4938` a `#786049`), evitando pretos profundos de tela de monitor. | **Conforme.** A moldura fotográfica repousa sobre a madeira da mesa e papéis secundários em cartolina creme (`#D6CBB6`). |
| **6. Microinterações e Game Feel Tátil** | Carimbos de impacto visual (`[DEFERIDO]`, `[SUBVERSIVO]`), screen-shake mecânico de 100ms e fluxo narrativo em dois tempos. | **Conforme.** O pipeline preserva 60 FPS estáveis na GPU durante animações de carimbo e transições de tela. |

---

## 6. CONCLUSÃO E VALIDAÇÃO

Este documento mestre encerra as diretrizes canônicas para a direção de arte e a reestilização fotográfica de **'Águas de Ferro'**, unificando:
1. A atmosfera noturna de chiaroscuro, reflexos no Capibaribe e luminosos de `artes/RecifeVibe.JPG`.
2. A verdade material, humana e política do acervo documental do Museu da Cidade do Recife (`artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`).
3. O rigor técnico de um pipeline híbrido que protege o consumo de memória do Electron e entrega reatividade narrativa integral ao longo de 27 anos de história recifense.

---
*Fim do Documento Mestre — Águas de Ferro (1948–1975)*
