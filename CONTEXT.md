# CONTEXTO DO PROJETO: "ÁGUAS DE FERRO" (Recife, 1958–1975)

## 1. Identidade e Mecânica Central
* **Gênero:** RPG narrativo determinístico de escolhas e consequências (inspirado em *The Life and Suffering of Sir Brante*).
* **Cenário:** Recife, Pernambuco. Acompanha a trajetória do protagonista desde o nascimento em 1948 até o estopim da Grande Cheia de Julho de 1975 sob a Ditadura Militar (AI-5 / DOPS).
* **Estrutura de Jogo (4 Etapas Formativas):**
  * **Etapa 1 — Infância (1948 a 1953 • 0 aos 5 Anos):** Eventos de formação ano a ano (nascimento no mocambo, primeiros passos nas palafitas, convivência no mangue, feira de São José, primeiras letras e travessia para o cais), construindo a base moral e os laços familiares sem consumir cotas de ação política.
  * **Etapa 2 — Juventude & Formação Política (1954 a 1964 • 6 aos 16 Anos):** Efervescência social, oficinas ferroviárias, greves dos estivadores, alfabetização popular e o clímax inevitável do Golpe Militar de 1964.
  * **Etapa 3 — Vida Adulta / Anos de Chumbo (1968 a 1974 • 20 aos 26 Anos):** Escolha de um dos 3 Caminhos (`Militar`, `Burguês`, `Líder Trabalhador`). Gestão de **Recursos Voláteis** (`Capital`, `Influência`, `Suspeita do DOPS`, `Moral Popular`) sob o AI-5.
  * **Etapa 4 — O Ponto de Ruptura (Julho de 1975 • 27 Anos):** A Cheia de 75 e o pânico de Tapacurá. Modo sobrevivência onde os recursos acumulados são consumidos contra o relógio e a subida do rio.
* **Determinismo Estrito & Espectro Qualitativo (Estilo *Sir Brante*):** Sem rolagens de dados aleatórias. Todos os atributos, recursos e vínculos possuem uma **escala de patamares nomeados em 5 faixas** (ex: `Cru` ▸ `Vacilante` ▸ `Firme` ▸ `Calejado` ▸ `Inabalável` para habilidades; `Miséria` ▸ `Cambaleante` ▸ `Modesto` ▸ `Firme` ▸ `Abastado` para Capital; `Rompido` ▸ `Cambaleante` ▸ `Distante` ▸ `Firme` ▸ `Leal` para vínculos). Cada decisão exibe antes do clique a transição exata (`2 [Firme] ➔ 3 [Calejado]`) e, após o clique, um **Quadro de Impacto da Decisão** detalha todas as alterações e mudanças de patamar com barras de espectro visuais.
* **Condição Social:** Estrato socioeconômico da família do protagonista (ex: *Mocambo/Operário*, *Pequena Burguesia*, *Elite Tradicional*), definindo facilidades de acesso e preconceitos institucionais.
* **Parentesco (Vínculos Familiares):** Estado relacional com figuras do círculo íntimo (ex: `relacao_pai`, `relacao_irmao`, `honra_familiar`), que cobram lealdade ou oferecem refúgio.
* **Dossiê da Fase:** Conjunto de eventos/investigações disponíveis no período. O jogador possui uma cota limitada de ações por fase antes do disparo do evento histórico de clímax.
* **Evento de Crise Forçado:** Evento emergencial que sequestra a agenda quando um recurso atinge um extremo crítico (ex: `Suspeita do DOPS == 10`), permitindo ao jogador queimar atributos ou sofrer sequelas para evitar a eliminação.
* **Modo Sobrevivência (Julho de 1975):** Fase 3 operando com relógio regressivo de horas e elevação da régua do Rio Capibaribe, onde os recursos acumulados são consumidos para salvar pessoas e documentos.
* **Console de Depuração:** Ferramenta retrátil integrada ao protótipo para inspeção de variáveis, salto de cenas e alteração instantânea de estado em tempo de desenvolvimento.

---

## 2. DIRETRIZES VISUAIS E DIREÇÃO DE ARTE (ANTI-GENERIC DESIGN)

A interface NUNCA deve parecer um aplicativo web moderno, dashboard SaaS ou template genérico de IA. O conceito visual é uma **"Mesa de Arquivo Morto / Redação Clandestina em 1975"** (tactilidade, papel envelhecido, tinta de carimbo e recortes de jornal).

### 2.1. Proibições Absolutas (Blacklist Visual)
* **PROIBIDO** usar fontes sans-serif modernas (`Inter`, `Roboto`, `Arial`, `Helvetica`, `Open Sans`, `system-ui`).
* **PROIBIDO** usar cantos arredondados modernos (`border-radius > 2px`, cards estilo mobile, pílulas/badges redondas).
* **PROIBIDO** usar gradientes neon/modernos (roxo, azul-elétrico, sombras difusas `box-shadow` estilo Material Design).
* **PROIBIDO** usar fundo branco puro (`#FFFFFF`) ou preto puro (`#000000`).

### 2.2. Layout Espacial: "Palco Documental, Pastas de Inspeção & Página Lateral"
O fundo geral da tela (`body`) representa uma superfície de madeira/cartolina ocre envelhecida e acolhedora (`#5C4938` a `#786049`, evitando fundos pretos ou escuros demais), sobre a qual repousam:
* **Esquerda / Centro (~54% da largura — Palco Principal & Barra de Atalhos):**
  * **Visor Principal do Palco:** Exibe por padrão o **Quadro Fotográfico do Cenário** em tamanho amplo e desobstruído. Ao acionar os atalhos inferiores, alterna para as fichas completas de **Atributos & Recursos**, **Relações & Família** (com retratos 3x4 e descrições de facções) ou **Cronologia (1958–1975)** (com o diário de decisões carimbadas).
  * **Barra Inferior de Atalhos (Pastas de Arquivo):** Quatro botões táteis na base esquerda (`CENÁRIO`, `ATRIBUTOS`, `RELAÇÕES`, `CRONOLOGIA`) com resumo ao vivo e animação de impacto (`+1`/`-1`) quando atributos ou vínculos mudam.
* **Coluna da Direita (~46% da largura — Página Única de Texto e Decisão):**
  * Uma única página bem proporcionada (`max-width: 720px`) imitando folha de livro/crônica antiga, com cabeçalho editorial, texto narrativo e decisões na parte inferior.

### 2.3. Tipografia e Conforto de Leitura (Fontes Ampliadas)
* **Corpo da Narrativa:** Fontes serifadas editoriais clássicas (`EB Garamond`, `Lora`, `Merriweather` ou `Crimson Text`). Tamanho ampliado (`22px`), entrelinha confortável (`line-height: 1.75`) e largura máxima de linha de `62ch` para leitura fluida.
* **Capitulares (Drop Caps):** O primeiro parágrafo de cada evento deve iniciar com uma letra capitular (`::first-letter`) de `72px` ocupando 3 linhas de altura, em estilo editorial do *Diario de Pernambuco* antigo.
* **Dados Técnicos, Fichas e Requisitos:** Fontes monoespaçadas de máquina de escrever (`Courier Prime`, `Special Elite` ou `Cutive Mono`).
* **Destaque Semântico:** Nomes de bairros do Recife (**Boa Vista**, **Várzea**, **Santo Antônio**), figuras ou facções (**DOPS**, **Sindicato**) devem receber grifo sutil tipo marca-texto desbotado ou sublinhado pontilhado em cor de tinta azul-caneta (`#2B3A4A`) ou vermelho-ferrugem (`#8A2522`).

### 2.4. Paleta de Cores e Evolução Atmosférica por Fase
As cores devem responder à fase atual do jogo (via classe CSS no `body`: `.fase-1`, `.fase-2`, `.fase-3`):
* **Cores Base:**
  * Papel Principal: `#E6DFD3` | Papel Secundário/Ficha: `#D8CFBC`
  * Tinta Principal: `#1E1D1B` | Tinta Desbotada: `#5A554C`
  * Vermelho Carimbo/Censura: `#8A2522` | Verde Militar: `#3D4337` | Lodo Capibaribe: `#3C3B30`
* **Transição de Clima:**
  * **Fase 1 (Anos 50/60):** Papel claro e limpo, iluminação quente nos cantos da tela.
  * **Fase 2 (Anos de Chumbo):** Iluminação mais fria e opressiva, contraste mais duro nas bordas, aspecto de documento burocrático pesado.
  * **Fase 3 (A Cheia de 75):** Papel com bordas manchadas de umidade/lodo, tons esverdeados e acinzentados predominantes, atmosfera escura de queda de energia.

### 2.5. Tratamento de Imagens (Filtro CSS "Jornal de 75")
Toda imagem renderizada no jogo deve passar obrigatoriamente por uma classe CSS unificadora que aplique:
* Filtro `sepia(60%) contrast(115%) brightness(90%) grayscale(30%)`.
* Sobreposição (`::after`) de textura pontilhada (*halftone*/reticulado de impressão) ou granulação fina, mais vinheta escura nas bordas para que qualquer imagem pareça impressa em jornal de 1975.

### 2.6. Microinterações e "Game Feel" Tátil
* **Fluxo Narrativo em Dois Tempos:** Ao abrir qualquer ocorrência, o texto narrativo é apresentado de forma isolada e limpa. O jogador processa o contexto sem atolamento de informação antes de clicar no botão táctil (`PESAR AS ESCOLHAS & DELIBERAR ➔`) para revelar suavemente a divisória e as opções de decisão com previsão de espectros.
* **Efeito de Carimbo no Clique:** Ao selecionar uma decisão válida, exibir um carimbo visual (`[DEFERIDO]`, `[REGISTRADO]`, `[SUBVERSIVO]`) batendo sobre a opção com uma leve animação de impacto (`screen shake` de `100ms`) antes da transição de texto.
* **Censura Interativa (Opções Bloqueadas):** Opções cujos requisitos o jogador não atende NÃO devem ficar apenas cinzas. Devem exibir uma tarja preta de censura riscando parte do texto ou um carimbo diagonal em vermelho-ferrugem: `[BLOQUEADO — REQUER SANGUE-FRIO 3]`.
* **Bordas Tipográficas:** Uso de filetes duplos (`border-top: 3px double #1E1D1B`) e divisórias de jornal antigo entre o texto narrativo e a área de escolhas.

### 2.7. Motor de Avanço Cronológico e Virada de Calendário (Ano a Ano)
* **Calendário & Idade Determinística:** O protagonista nasce em 1948 nas margens do Capibaribe. A idade é calculada dinamicamente (`anoAtual - anoNascimento`).
* **Vinheta Editorial de Virada de Ano:** Decisões ou metadados de eventos que concluem um ano (`avanco_ano: 1` ou `ano_alvo`) disparam uma vinheta com moldura de jornal de época (*"CRÔNICA DE PERNAMBUCO // O TEMPO PASSA"*, destacando a transição de anos, a nova idade do protagonista e a atualização visual na barra superior).
* **Depuração Dinâmica:** Console F1 permite inspecionar e alterar ano atual e ano de nascimento, com sincronização imediata no prontuário e nos cálculos.

---

## 3. ARQUITETURA TÉCNICA E MODULARIDADE

Para evitar código monolítico e erros de contexto, o projeto é construído em um arcabouço desacoplado em Electron:

1. **Separação Total (Conteúdo vs. Apresentação vs. Motor):**
   * `main.js`: Processo principal do Electron (janela em tela cheia, leitor de arquivos locais e observador de arquivos para hot-reload).
   * `index.html`: Estrutura semântica da Mesa de Investigação (Coluna de Prontuário + Coluna de Folha Narrativa + Console de Depuração retrátil).
   * `style.css`: Variáveis CSS (`:root`), tipografia, filtros de imagem de jornal, temas visuais das 3 fases e animações táteis de carimbo/censura.
   * `engine.js`: Máquina de estados determinística, validador de requisitos, gerenciador de dossiê/ações e gatilho de eventos de crise.
   * `conteudo/`: Pasta desacoplada com arquivos `.md` individuais organizados por fase (`fase_1/`, `fase_2/`, `fase_3/`). Cada arquivo possui Frontmatter YAML para metadados/opções e texto narrativo livre.
   * `artes/`: Pasta para retratos, recortes e evidências visuais. Na ausência de arquivo, o motor gera estampas procedurais em SVG/CSS.
2. **Ciclo de Desenvolvimento:**
   * Arcabouço testável imediatamente via Console de Depuração (atalho `F1` ou botão na borda da mesa).
   * Roteiristas e artistas adicionam conteúdo diretamente nas pastas `conteudo/` e `artes/` sem tocar no código-fonte.