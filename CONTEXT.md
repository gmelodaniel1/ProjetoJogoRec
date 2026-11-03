# CONTEXTO DO PROJETO: "ÁGUAS DE FERRO" (Recife, 1958–1975)

## 1. Identidade e Mecânica Central
* **Gênero:** RPG narrativo determinístico de escolhas e consequências (inspirado em *The Life and Suffering of Sir Brante*).
* **Cenário:** Recife, Pernambuco. Acompanha a trajetória do protagonista até o estopim da Grande Cheia de Julho de 1975 sob a Ditadura Militar (AI-5 / DOPS).
* **Estrutura de Jogo (3 Fases):**
  * **Fase 1 (Infância/Adolescência - Fim dos anos 50 a 1964):** Eventos de formação que definem e travam os **Atributos Fixos** (`Astúcia`, `Sangue-Frio`, `Ofício`, `Presença`).
  * **Fase 2 (Vida Adulta / Anos de Chumbo - 1968 a 1974):** Escolha de um dos 3 Caminhos (`Militar`, `Burguês`, `Líder Trabalhador`). Gestão de **Recursos Voláteis** (`Capital`, `Influência`, `Suspeita do DOPS`, `Moral Popular`).
  * **Fase 3 (O Ponto de Ruptura - Julho de 1975):** A Cheia de 75 e o pânico de Tapacurá. Queima de recursos acumulados para sobreviver ao caos político e climático.
* **Determinismo Estrito:** Sem rolagens de dados aleatórias. Escolhas dependem de checagem direta de atributos e recursos, sempre transparentes ao jogador.
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
* **Efeito de Carimbo no Clique:** Ao selecionar uma decisão válida, exibir um carimbo visual (`[DEFERIDO]`, `[REGISTRADO]`, `[SUBVERSIVO]`) batendo sobre a opção com uma leve animação de impacto (`screen shake` de `100ms`) antes da transição de texto.
* **Censura Interativa (Opções Bloqueadas):** Opções cujos requisitos o jogador não atende NÃO devem ficar apenas cinzas. Devem exibir uma tarja preta de censura riscando parte do texto ou um carimbo diagonal em vermelho-ferrugem: `[BLOQUEADO — REQUER SANGUE-FRIO 3]`.
* **Bordas Tipográficas:** Uso de filetes duplos (`border-top: 3px double #1E1D1B`) e divisórias de jornal antigo entre o texto narrativo e a área de escolhas.

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