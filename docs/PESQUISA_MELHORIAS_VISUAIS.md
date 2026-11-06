# PESQUISA E DIRETRIZES DE MELHORIA VISUAL E UI/UX DIEGÉTICA
## Jogo "Águas de Ferro" — Recife (1958–1975)
**Documento Canônico de Design de Interface & Direção de Arte**  
**Classificação:** Especificação Técnica de UI/UX Analógica & Arte Histórica  
**Data:** 05 de Novembro de 2026  
**Local de Fixação:** `docs/PESQUISA_MELHORIAS_VISUAIS.md`

---

## 1. INTRODUÇÃO & DIAGNÓSTICO DO ESTADO ATUAL

### 1.1. O que já funciona com excelência
1. **Tipografia de Época:** O casamento entre `EB Garamond` (corpo editorial e títulos) e `Courier Prime` / `Special Elite` (dados técnicos e prontuário) confere peso e sobriedade de documento do século XX.
2. **Capitular Clássica:** O primeiro parágrafo com letra capitular de 72px (`corpo-narrativa p:first-of-type::first-letter`) emula com perfeição as colunas antigas do *Diario de Pernambuco*.
3. **Paleta Mineral e Terrosa:** O banimento de preto puro (`#000000`) e branco puro (`#FFFFFF`) ancorou o projeto em ocres, papéis celulose (`#EFE8DC`), azul-caneta (`#24384D`) e carimbos vermelho-ferrugem (`#8A2522`).
4. **Mecânica Tátil Sir Brante:** As barras de espectro qualitativo em 5 patamares, os deltas visuais (`+1`/`-1`) e a animação de impacto do carimbo (`screen shake`) geram excelente sensação de consequência e causa.

### 1.2. Onde a interface ainda falha (Os Pontos Fracos e Artificiais)
* **Estrutura de "Container Web":** A divisão rígida 54% / 46% com linhas divisórias e sombras suaves de CSS (`box-shadow`) denuncia uma página de navegador (HTML/CSS padrão) em vez de papéis físicos pousados sobre uma bancada de cedro.
* **Barra de Sistema Superior:** A barra com atalhos de desenvolvedor e status lembra um painel de telemetria moderna.
* **Retratos em SVG Vetorial Básico:** Os personagens são representados por bonecos esquemáticos SVG (`circle`, `rect`, `polygon`), quebrando brutalmente a atmosfera noir documental.
* **Bordas Vetoriais 100% Retas:** Folhas de papel de jornal ou de arquivo têm textura de corte mecânico, micro-fibras esgarçadas, cantos gastos ou marcas de traça/umidade.
* **Falta de Adereços Periféricos Diegéticos:** Uma mesa de redação ou interrogatório em 1975 no Recife possuía cultura material tangível: cinzeiros de vidro com cigarros Continental, anéis circulares de xícaras de café frio, clipes de metal enferrujados, alfinetes de mesa, carimbos de madeira com almofadas de feltro entempestadas e réguas de ferro.

---

## 2. A "MESA VIVA" (DESK CLUTTER & OBJETOS DIEGÉTICOS)

Para transformar a interface em uma **verdadeira mesa de redação clandestina / arquivo morto em 1975**, a área de trabalho não pode ser um fundo estático. Ela deve conter elementos periféricos integrados ao CSS/DOM:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [LOMBADA DO GAVETEIRO / ARQUIVO MORTO - DOPS]                              │
│  [Placa em Latão Gravado: "DELEGACIA DE ORDEM POLÍTICA E SOCIAL - PE"]      │
├────────────────────────────────────────┬────────────────────────────────────┤
│ PALCO DOCUMENTAL (ESQUERDA)            │ FOLHA EDITORIAL (DIREITA)          │
│ • Prontuário em pasta manila parda     │ • Folha com leve rotação (0.4°)    │
│ • Grampo oxidado no canto sup. esquerdo│ • Borda irregular rasgada/guilhotina│
│ • Foto 3x4 do arquivo com carimbo meio │ • Mancha d'água seca na margem     │
│   a meio no papel                      │ • Carimbo [VETADO] texturizado     │
│ • Guia de pasta Kardex com aba saliente│ • Fio de linotipo duplo central    │
│                                        │                                    │
│ [Grampo metálico avulso caído na mesa] │ [Caneca de café com halo oxidado]  │
│ [Bituca de cigarro no canto inferior]  │ [Fita adesiva gomada ressecada]    │
└────────────────────────────────────────┴────────────────────────────────────┘
```

### 2.1. Elementos Diegéticos de Mesa Recomendados:
1. **Halos Circulares de Café (*Coffee Ring Stains*):**
   - Marcas translúcidas circulares de fundo de xícara de esmalte (`rgba(100, 70, 45, 0.18)` com borda escura oxidada de 1.5px) posicionadas sutilmente na bancada de madeira e interceptando um canto da folha de jornal.
2. **Grampos de Metal Oxidado & Halos de Ferrugem:**
   - Em vez de fitas adesivas CSS simplificadas, o prontuário e as evidências devem ostentar grampos de arame duplo de ferro oxidado com mancha elíptica alaranjada penetrando na celulose do papel.
3. **Clipes Metálicos Niquelados (*Gem Paperclips*):**
   - Utilizados para fixar notas adicionais, recortes de notícias e retratos 3x4 às fichas de investigação.
4. **Fita Adesiva Gomada Ressecada (Fita Crepe de 1970):**
   - Fita adesiva amarelada semi-translúcida com extremidades rasgadas à mão (borda denteada irregular), micro-bolhas de ar e poeira retida na cola.
5. **Marcas de Dobra e Cantos Batidos (*Dog-Ears*):**
   - Pequenas dobras nos cantos dos documentos mais antigos da Fase 1 e Fase 2, denotando manuseio repetido por investigadores do DOPS.

---

## 3. REDESIGN DA BARRA DE SISTEMA (DIEGESE ANALÓGICA)

A atual `.barra-sistema` deve ser reformulada para abandonar a linguagem de "software web":

### 3.1. Metáfora: "Lombada de Arquivo de Aço / Plaqueta de Gaveteiro"
* **Aparência:** Textura de metal verde-oliva militar fosco (`#3D4337`) ou latão escurecido com rebites parafusados nas extremidades.
* **Indicador de Ações:**
  - Em vez de bolinhas `● ● ● ●`, utilizar **furos de cartão perfurado IBM** ou **carimbos mecânicos de orifícios de perfurador de mesa**.
* **Data e Fase:**
  - Exibidos como um **numerador mecânico datador** de borracha (com ligeiro desalinhamento vertical dos dígitos do ano).
* **Botões de Ação do Sistema (DevTools / Tela Cheia):**
  - Estilizados como **etiquetas gravadas em fita rotuladora Dymo** (plástico rígido vermelho ou preto com relevo branco característico dos anos 60/70) ou parafusos de comando em baquelite.

---

## 4. O PALCO DE INSPEÇÃO & O FIM DOS AVATARES BÁSICOS

O ponto mais fraco da interface atual é a tela de **Relações**, cujos avatares são desenhos geométricos simplórios em SVG.

### 4.1. Substituição Obrigatória dos Avatares: Ficha 3x4 Policial de Prontuário
Cada personagem do jogo deve ser apresentado com o rigor de uma **fotografia 3x4 de identificação civil ou fichamento criminal do DOPS**:
* **Suporte:** Papel fotográfico baritado de emulsão fosca, proporção estrita 3:4 (largura 90px × altura 120px).
* **Borda da Fotografia:** Fina borda branca com picotado de guilhotina mecânica de época.
* **Fixação Física:** A foto não fica "solta no DOM": ela é presa à ficha do prontuário por um **clipe metálico prateado** ou por **dois grampos de ferro batido** na margem superior.
* **O Carimbo Circular Oficial Meio a Meio:**
  - Um carimbo circular de tinta azul ou púrpura da *"SECRETARIA DE SEGURANÇA PÚBLICA / PE — D.O.P.S."* aplicado sobre a foto, com o semicírculo superior batendo no papel da foto e o semicírculo inferior continuando no papel da pasta manila. Este detalhe visual ancora imediatamente a diegese de arquivo policial autêntico.
* **Linhas de Medição de Altura:** Fundo cinza com réguas horizontais de medição antropométrica típicas das celas do DOPS na Rua da União.

### 4.2. O Prontuário de Atributos & Condição Social
* A ficha de atributos deve evocar uma **Pasta Manila de Arquivo Suspenso**:
  - Tom bege-areia escuro (`#D6CBB6`), cartolina grossa com fibras aparentes.
  - Campos impressos por clichê tipográfico (linhas pontilhadas em tinta preta desbotada: `NOME DO INVESTIGADO: .......................................`).
  - Preenchimento com máquina de escrever manual (fonte `Courier Prime`), com pequenos defeitos de impacto de fita carbono (algumas letras ligeiramente mais escuras ou tortas).

### 4.3. As Pastas de Atalho Inferiores (Abas)
* Substituir os 4 botões quadrados por **guias de fichário suspensas escalonadas**:
  - As abas `[CENÁRIO]`, `[ATRIBUTOS]`, `[RELAÇÕES]`, `[CRONOLOGIA]` devem sobressair como cartões de índice de arquivo Kardex, com abas salientes recortadas e etiquetas protegidas por visor de celuloide amarelado.

---

## 5. A FOLHA EDITORIAL & TIPOGRAFIA DE LINOTIPO

### 5.1. Alinhamento e Hifenização Jornalística
* **Problema Atual:** O texto narrativo está alinhado à esquerda com quebras irregulares contemporâneas.
* **Solução Histórica:**
  - O texto das crônicas jornalísticas do Recife nos anos 50/60 utilizava **justificação clássica com hifenização automática**:
    ```css
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    -webkit-hyphens: auto;
    ```
  - Em parágrafos longos, utilizar **duas colunas editoriais com separador vertical fino de linotipo** (`column-count: 2; column-gap: 28px; column-rule: 1px solid #C4B8A2;`).
  - Recuo tradicional de primeira linha (`text-indent: 1.5em; margin-bottom: 0;`), abolindo o espaçamento excessivo entre parágrafos de páginas web modernas.

### 5.2. Micro-Defeitos de Impressão Tipográfica de Chumbo
* As rotativas do *Diario de Pernambuco* e do *Jornal do Commercio* operavam sobre papel de baixa gramatura com absorção imediata. Pequenos retoques aumentam a autenticidade:
  - Leve variação de pressão de tinta: manchetes com pequenos poros ou micro-falhas internas na tinta de chumbo fundido.
  - Linhas de filete duplo de jornal com extremidades ligeiramente gastas.

### 5.3. Botões de Decisão e Despacho
* **O Botão de Transição ("Pesar Escolhas & Deliberar"):**
  - Deixar de ser um card CSS padrão e assumir a forma de uma **Ordem de Despacho Oficial Anexa**, presa com fita adesiva ou clipe na base do texto:  
    `[ DESPACHO DO INQUÉRITO: DELIBERAR SOBRE OS FATOS ➔ ]`
* **Cartões de Decisão:**
  - Modelados como **tiras de papel picotado de telex** ou **fichas de despacho perfuradas**.
* **Tarja de Censura nas Opções Bloqueadas:**
  - Substituir o traço geométrico diagonal vermelho por uma **tarja de tinta nanquim/alcatrão preta passada à trincha** por censores da Polícia Federal, com bordas líquidas imperfeitas, sobre a qual repousa o carimbo: `[CENSURADO — LEI DE IMPRENSA / AI-5]`.

---

## 6. DINÂMICA DE ILUMINAÇÃO & ATMOSFERA CINEMATOGRÁFICA

### 6.1. O Cone de Luz da Luminária de Mesa (Luz Motivada)
Nenhuma redação noturna ou arquivo do DOPS possui iluminação ambiente uniforme. A interface deve ser iluminada por uma **luminária de mesa articulada de metal (abajur de banqueiro ou lâmpada de pescoço de ganso)**:
* **Foco Central de Leitura:** A luz incide com calor âmbar suave (`rgba(245, 235, 210, 0.15)`) sobre a Folha de Crônica e o Prontuário Central.
* **Penumbra Periférica:** As bordas extremas do monitor (topo, rodapé e cantos da mesa) mergulham em um vignette escuro e denso (`rgba(25, 18, 12, 0.75)`), isolando o jogador no universo documental.
* **Micro-Oscilação Analógica (Flicker de Voltagem):**
  - A rede elétrica do Recife nos anos 60 e 70 sofria quedas e flutuações constantes. Em momentos de crise urgente (`.em-crise-urgente`) ou na Fase 3 (o temporal da Cheia de 75), a iluminação da mesa deve apresentar uma **sutilíssima oscilação de voltagem no filamento incandescente** (variação de 2% a 4% no brilho via CSS animation aleatória a cada 8 a 15 segundos), comunicando instabilidade no mundo externo.

### 6.2. Micro-Partículas e Grão Atmosférico
* Sobreposição de uma camada translúcida leve de poeira suspensa ou grão de filme no cone de luz, criando a impressão de matéria física suspensa no ar úmido do Recife.

---

## 7. OS INSTRUMENTOS MECÂNICOS DA CHEIA DE 75

### 7.1. A Régua Limnimétrica da Chesf / Defesa Civil
O medidor atual da Cheia de 75 usa uma barra de progresso gráfica simples.
* **Reformulação Física:**
  - Transformar o painel em uma **régua limnimétrica de metal esmaltado branco e preto**, aparafusada sobre uma viga de concreto úmido.
  - Graduação em algarismos estêncil industriais com marcas de centímetros (`+1,00m`, `+2,00m`, `+3,50m`, `+4,50m`).
  - Linha da água viscosa e turva, com acúmulo de lodo barrento e ramos de aguapé (baronesas) na marca de nível do rio.
  - Uma luz-piloto analógica âmbar/vermelha de aviso da Defesa Civil com brilho difuso de filamento.

### 7.2. O Modal de Virada de Ano
* **Substituição do `backdrop-filter: blur(3px)`:**
  - O blur digital soa contemporâneo demais (iOS/macOS).
  - A virada de ano deve assumir a forma de uma **Edição Extraordinária de Jornal** que bate na mesa com rotação de manchete, ou o **rasgar de uma folha de calendário de parede de folhinha** com textura de papel grosso e tipografia garrafal de tipografia manual.

---

## 8. PLANO DE AÇÃO PRIORITÁRIO (ORDENADO POR IMPACTO VISUAL)

| Prioridade | Componente / Eixo | Ação de Melhoria | Ganho Estético Imediato |
|---|---|---|---|
| **P1 (Crítica)** | **Retratos da Aba de Relações** | Substituir os avatares geométricos em SVG por **retratos fotográficos 3x4 de época** em preto-e-branco, com bordas brancas serrilhadas, grampos metálicos e carimbo circular do DOPS cruzando foto e ficha. | Elimina o ponto mais artificial e infantilizado do jogo, conferindo gravidade documental imediata. |
| **P1 (Crítica)** | **Mesa de Trabalho & Bordas Orgânicas** | Introduzir quebra de alinhamento ortogonal (micro-rotação de 0,3° na folha de jornal), bordas levemente esgarçadas e inclusão de **adereços periféricos** (marcas de xícara de café, grampos oxidados, clipes). | Rompe a sensação de "site web/dashboard" e cria a sensação física de "mesa de redação real". |
| **P2 (Alta)** | **Cone de Luz & Iluminação de Mesa** | Implementar gradiente cênico de luminária de leitura focada nos documentos, com penumbra nas bordas periféricas da mesa e sutil oscilação analógica em momentos de crise. | Cria profundidade atmosférica, tensão dramática e ambientação noir cinematográfica. |
| **P2 (Alta)** | **Tipografia e Diagramação de Linotipo** | Aplicar texto justificado com hifenização automática, parágrafos com recuo tradicional e marcas de filetes de rotativa desgastados. | Confere legibilidade e ritmo editorial de jornal impresso dos anos 50/60. |
| **P3 (Média)** | **Barra Superior & Instrumentação** | Redesenhar a barra de sistema como lombada de fichário metálico de arquivo com plaqueta de latão, e medidores de ação como furos de perfurador. | Elimina a navbar moderna e unifica a diegese em 100% da viewport. |
| **P3 (Média)** | **Régua da Cheia de 75 & Virada de Ano** | Transformar a régua da cheia em medidor limnimétrico esmaltado de ferro e o overlay de virada de ano em edição extraordinária sem blur digital. | Maximiza a tensão climática da Grande Cheia de 1975 e o impacto da passagem do tempo. |

