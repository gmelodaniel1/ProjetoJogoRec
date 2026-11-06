# Especificação Técnica e Direção de Arte: Contexto & Codebase de 'Águas de Ferro'

**Autor:** Specification Miner (Context & Codebase Survey)  
**Data:** 2026-11-04  
**Ambiente:** Electron Desktop (Node.js + Chromium) / Windows  
**Repositório Base:** `C:\Users\AdminUser\Desktop\Jogo Recife`  
**Fontes Canônicas Provedoras:**
- `ORIGINAL_REQUEST.md`
- `CONTEXT.md`
- `index.html` e `style.css`
- `renderer.js`, `main.js`, `preload.js`, `engine.js`, `state-store.js`
- `artes/RecifeVibe.JPG`
- `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`
- `conteudo/` (eventos e crises em Markdown)

---

## 1. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Palco Visual | Moldura de Evidência Central (`#slot-moldura-evidencia`) | Container visual primário na coluna esquerda (~54% da tela) onde fotos de época ou cenas procedurais são exibidas. | Objeto de evento (`evento.metadata.imagem`, `titulo`, `ano`, `id`) ou `null` | Renderização de `.foto-jornal-wrapper` contendo `<img>` estilizada ou `<svg>` procedural | Fallback automático para SVG procedural `gerarSvgCenario()` se `imagem` não for especificada ou arquivo faltar | `index.html:70`, `renderer.js:765-805` |
| 2 | Tratamento de Imagem | Filtro "Jornal de 75" (`.filtro-jornal-75`) | Tratamento CSS unificador de imagens para emular papel jornal/rotogravura de época. | Arquivo rasterizado (`.jpg`, `.png`, `.svg`) em `artes/` | Aplicação de `filter: sepia(55%) contrast(112%) brightness(93%) grayscale(20%)` com `object-fit: cover` | Se imagem quebrada, exibe texto alternativo com tipografia do sistema | `style.css:309-315`, `CONTEXT.md:56-60` |
| 3 | Tratamento de Imagem | Reticulado & Vinheta Halftone (`.foto-jornal-wrapper::after`) | Sobreposição pseudo-elemento com gradiente radial e reticulado pontilhado (*halftone*) em `mix-blend-mode: multiply`. | N/A (CSS puro) | Camada táctil de pontos de impressão (3px) e bordas escurecidas em vinheta | Não intercepta cliques (`pointer-events: none`) | `style.css:317-330`, `CONTEXT.md:59` |
| 4 | Palco Visual | Selo Burocrático de Acervo (`.selo-sobreposto-cenario`) | Carimbo textual angulado (-3deg) sobreposto no canto superior direito do visor fotográfico. | Estado da fase (`faseAtual`) e tipo de evento (`crise_urgente`) | Selos: `DEFESA CIVIL / PE`, `REGISTRO DE ACERVO`, `CALAMIDADE — CHEIA DE 75`, `MANDADO DE CAPTURA` | Valores padrão determinados deterministicamente pelo estado | `renderer.js:788, 795-802`, `style.css:338-353` |
| 5 | Palco Visual | Barra de Legenda do Cenário (`.cenario-legenda-barra`) | Rodapé documental da foto com identificação de local, ano e número de registro de tombo gerado por hash. | `evento.metadata.titulo`, `evento.metadata.ano`, `evento.metadata.id` | Strings: `#cenario-local` (`[TÍTULO] (RECIFE, [ANO])`) e `#cenario-registro` (`REGISTRO N.º [NUM]/[AA]`) | Fallback para `ARQUIVO CENTRAL — FASE X` e ano corrente | `renderer.js:769-782`, `index.html:74-77`, `style.css:274-294` |
| 6 | Palco Visual | Fitas Adesivas de Fixação (`.fita-adesiva`) | Detalhes táteis simulando fita crepe envelhecida nos cantos superiores do cartão fotográfico. | N/A (CSS puro) | Faixas retangulares translúcidas (`#cor-fita-adesiva`) com borda tracejada e rotações opostas (-4deg / +3.5deg) | Estático; não interfere na interação do visor | `index.html:67-68`, `style.css:240-260` |
| 7 | Palco Visual | Cenas Procedurais SVG (`gerarSvgCenario`) | Motor procedural de paisagens vetoriais de época quando a imagem estática não está disponível. | `evento.metadata.id`, `estado.faseAtual` | SVG `viewBox="0 0 800 380"` com temas: Cais 1958, Subúrbio Várzea, Golpe 1964/Crise Policial, Cheia de 75 | Fallback padrão para vista portuária do Cais de Santa Rita / Capibaribe | `renderer.js:643-763` |
| 8 | Palco Visual | Navegação por Pastas do Palco (`.barra-atalhos-dossie`) | Quatro pastas táteis na base esquerda: Cenário, Atributos, Relações e Cronologia. | Clique do usuário (`data-aba-alvo`) | Alternância entre visualização fotográfica e fichas detalhadas de prontuário com borda superior vermelha | Clique repetido na aba ativa retorna ao Cenário padrão | `index.html:274-306`, `renderer.js:148-158`, `style.css:976-1042` |
| 9 | Painel Hidrológico | Medidor da Cheia de 75 (`#painel-cheia-75`) | Painel de monitoramento emergencial visível exclusivamente na Fase 3 abaixo do visor fotográfico. | Recursos do estado: `nivelRio`, `horasRestantesCheia`, `panicoTapacura` | Régua gráfica vertical com animação de nível de água, indicador numérico de cota e alerta de pânico | Oculto em Fases 1 e 2 (`display: none`) | `index.html:81-105`, `style.css:1640-1724` |
| 10 | Página Narrativa | Folha Editorial de Crônica (`.folha-narrativa`) | Coluna direita (~46%, `max-width: 720px`) com cabeçalho de jornal, corpo narrativo com capitular e decisões. | Conteúdo Markdown dos eventos | Página em papel envelhecido (`#cor-papel-principal`) com textura de fibras e capitular de 72px | Rolagem suave individual caso exceda a altura da viewport | `index.html:311-360`, `style.css:1088-1229` |
| 11 | Narrativa | Fluxo em Dois Tempos (`#bloco-continuar-decisao`) | Mecânica de leitura limpa antes da deliberação. Oculta opções até o clique em "Pesar as Escolhas". | Interação de clique em `#btn-continuar-para-decisao` | Revelação suave com animação descendente da divisória e dos cartões de escolha | N/A | `index.html:339-357`, `style.css:1368-1430` |
| 12 | Decisão | Cartões de Escolha Táteis (`.cartao-decisao`) | Opções de deliberação com numeração vermelha, custo, descrição, pré-requisitos e prévia de impacto. | `evento.metadata.opcoes[]` e estado do jogador | Cartões com hover táctil, indicadores de espectro e classes `opcao-disponivel` ou `opcao-bloqueada` | Opções bloqueadas exibem tarja de censura vermelha e texto riscado | `index.html:354`, `style.css:1459-1625` |
| 13 | Game Feel | Carimbo Tátil de Impacto (`.carimbo-slam`) | Carimbo sonoro e visual (`[DEFERIDO]`, `[REGISTRADO]`, `[SUBVERSIVO]`) que bate sobre a opção escolhida com screen shake de 100ms. | Execução de decisão válida | Animação CSS `carimboImpacto 130ms` e tremor do viewport `.mesa-viewport.screen-shake` | Apenas disparado para opções válidas | `style.css:57-68, 1491-1523`, `renderer.js:520-560` |
| 14 | Cronologia | Vinheta de Virada de Ano (`#overlay-virada-ano`) | Modal editorial de passagem do tempo exibindo ano anterior ➔ novo ano, idade do protagonista e crônica de época. | Metadados do evento (`avanco_ano: 1` ou `ano_alvo`) | Overlay com backdrop blur, cartão com moldura dupla e animação `viradaAnoSlam 0.35s` | Deve ser confirmado pelo jogador no botão continuar | `index.html:19-36`, `style.css:1888-2035` |
| 15 | Progressão | Régua da Vida Formativa (`.regua-vida-container`) | Trilho horizontal dividindo as 4 etapas da vida do protagonista (Infância, Juventude, Vida Adulta, Ruptura). | Ano corrente e ano de nascimento | 4 cartões com anos, títulos e badges de status: `etapa-passada`, `etapa-ativa`, `etapa-futura` | Calculado dinamicamente via `anoAtual - anoNascimento` | `style.css:2051-2175`, `engine.js` |
| 16 | DevTools | Console de Depuração Retrátil (`#console-depuracao`) | Gaveta lateral retrátil ativada por F1 com seletores de eventos, simulação de crises e ajuste de variáveis. | Atalho `F1`, botão `#btn-devtools` ou clique em fechar | Slide-in horizontal de 400px com inputs em tempo real para todos os atributos e recursos | Totalmente isolado do fluxo de produção | `index.html:366-480`, `style.css:1745-1884` |
| 17 | Sistema | Hot-Reload de Markdown (`fs.watch`) | Atualização em tempo real da narrativa sem recarregar o executável Electron ao salvar `.md`. | Eventos de modificação de arquivo em `conteudo/` | Emissão IPC `narrative:events-updated` e atualização cirúrgica do DOM com notificação visual temporária | Debounce de 150ms para evitar colisões de gravação no disco | `main.js:10-29`, `renderer.js:73` |

---

## 2. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Moldura de Evidência | `evento.metadata.imagem` ausente ou string vazia | O renderer detecta ausência da chave e despacha imediatamente para `gerarSvgCenario(evento, estado)`, desenhando a silhueta vetorial temática com selo adequado. |
| 2 | Moldura de Evidência | Imagem com proporção vertical (ex: 3:4 ou retrato 9:16) inserida em container panorâmico | `.filtro-jornal-75` tem `object-fit: cover; width: 100%; height: 100%`. Se não houver recorte prévio, a imagem sofre corte vertical agressivo no topo e rodapé, podendo decepar rostos e textos catalográficos. |
| 3 | Moldura de Evidência | Imagem histórica de tombo com margens brancas e linhas de caderno manuscritas (como as fichas do MCR) | O filtro `sepia + multiply` sobrepõe textura sobre as bordas do papel da ficha original, gerando "papel sobre papel" duplo se a foto não tiver sido recortada de sua ficha catalográfica. |
| 4 | Moldura de Evidência | Resolução excessivamente alta (ex: scans de 2489x3508px direto do PDF) inserida no DOM | O Chromium no Electron redimensiona via GPU sem travar, mas eleva o consumo de memória de vídeo e retarda animações de screen-shake ou transições de aba. |
| 5 | Filtro "Jornal de 75" | Foto colorida rica em tons neon (estilo `RecifeVibe.JPG`) submetida ao filtro CSS atual | `grayscale(20%) sepia(55%)` esmaece e achata as cores vibrantes do neon vermelho (`Óleo Bem-Te-Vi`) e azul (`Cinema`), convertendo o contraste cromático em tons pastéis ocre-amarronzados. |
| 6 | Transição de Fase | Mudança dinâmica de `body.fase-1` para `body.fase-3` | O container da mesa muda para `--cor-fundo-mesa: #4A493B`, o papel narrativa adquire degradê úmido `#DFD8C8` a `#D2C9B6`, e o painel hidrológico `#painel-cheia-75` torna-se visível automaticamente via seletor CSS composto. |
| 7 | Tela Cheia & Redimensionamento | Alternância de resolução via F11 em monitores ultrawide (21:9) ou telas 4:3 | O layout é estruturado em flexbox percentual (`.palco-central flex: 1.18` e `.coluna-narrativa flex: 1; max-width: 720px`). Em resoluções muito amplas, a coluna de texto se estabiliza em 720px enquanto o palco central expande horizontalmente, alterando a proporção aparente do visor de 16:9 para quase 2.4:1. |
| 8 | Navegação no Palco | Usuário clica no atalho da aba de Atributos ou Cronologia durante um evento | A aba selecionada substitui o visor fotográfico. Para voltar à foto, o jogador pode clicar no botão textual `← VOLTAR AO CENÁRIO` no topo da pasta ou clicar novamente no atalho `CENÁRIO` na barra inferior. |

---

## 3. Síntese do Contexto Narrativo e Histórico ("Águas de Ferro")

### 3.1. Premissa Narrativa e Arco Temporal (1948–1975)
O jogo retrata 27 anos de história pessoal e política no Recife através de 4 etapas formativas:
1. **Etapa 1 — Infância (1948–1953 • 0 aos 5 Anos):** O protagonista nasce em uma palafita/mocambo no manguezal do Capibaribe. Vivencia os primeiros passos no Cais de Santa Rita, a Feira de São José, o Mercado das Cinco Pontas e a solidariedade dos estivadores portuários.
2. **Etapa 2 — Juventude & Formação Política (1954–1964 • 6 aos 16 Anos):** O pós-Vargas, o suicídio presidencial, a efervescência popular em comícios diante do Palácio do Campo das Princesas, a atuação das Ligas Camponesas, greves portuárias e ferroviárias, culminando no Golpe Militar de 31 de Março de 1964.
3. **Etapa 3 — Vida Adulta / Anos de Chumbo (1968–1974 • 20 aos 26 Anos):** Sob o AI-5 e o terror institucional da Delegacia de Ordem Política e Social (DOPS - Rua da União). O protagonista define seu caminho de classe (`Militar`, `Burguês`, `Líder Trabalhador`), gerenciando recursos voláteis em equilíbrio tênue contra prisões e batidas policiais.
4. **Etapa 4 — O Ponto de Ruptura (Julho de 1975 • 27 Anos):** A Grande Cheia de 75. Enquanto a água do Capibaribe sobe impiedosamente após 72 horas de temporal, explode o boato de rompimento da barragem de Tapacurá, mergulhando a cidade em pânico generalizado e modo de sobrevivência contra o relógio.

### 3.2. Clivagens Sociais e Factions do Recife
- **Mocambos & Cais Operário:** Estivadores, marítimos, feirantes de São José e operários ferroviários de Santa Rita e Santo Amaro. Representam a base popular, o apego comunitário e a luta por moradia.
- **Elite Tradicional & Usineira:** Aristocracia açucareira dos casarões de Casa Forte, Derby e Boa Viagem, com trânsito livre nos salões do Teatro Santa Isabel e no Palácio do Governo.
- **Aparelho Repressor (DOPS / Exército):** Investigadores da Rua da União, viaturas do Exército na Avenida Guararapes, prontuários de vigilância política e censura prévia à imprensa.
- **Igreja Progressista & Intelectuais:** Setores ligados a Dom Hélder Câmara, movimento de alfabetização popular de Paulo Freire e estudantes do Diretório Acadêmico da Várzea.

---

## 4. Arquitetura Visual e Diretrizes "Anti-Generic Design"

O projeto possui diretrizes estritas que repelem o visual genérico de dashboards modernos:

### 4.1. Blacklist Visual Obrigatória
- **Proibição de Bordas Arredondadas:** Aplicação de `border-radius: 0 !important` em todo o CSS. O aspecto deve ser de papel cortado à guilhotina e lâminas retilíneas de arquivo.
- **Proibição de Fontes Sans-Serif Modernas:** Vetadas `Inter`, `Roboto`, `Arial`, `Helvetica`, `Open Sans` ou `system-ui`.
- **Proibição de Gradientes e Cores Neon Modernas:** Vetados roxos saturados, azuis elétricos e cartões flutuantes estilo Material Design.
- **Proibição de Preto Puro (`#000000`) e Branco Puro (`#FFFFFF`):** A leitura visual opera exclusivamente em variações de tintas orgânicas, papel celulose envelhecido e madeira ocre acolhedora.

### 4.2. Paleta Canônica de Cores
- **Madeira da Mesa (Fundo):** `#5C4938` (fundo principal), `#786049` (iluminada central), `#3A2D21` (borda externa).
- **Papel Documental:** `#EFE8DC` (papel principal/crônica), `#E2D8C5` (papel secundário/pastas).
- **Tintas Gráficas:** `#1E1D1B` (tinta preta principal), `#524C42` (tinta desbotada), `#736B5E` (tinta suave).
- **Acentos Simbólicos:**
  - Vermelho Carimbo / Censura: `#8A2522`
  - Azul Caneta Tinteiro: `#24384D`
  - Verde Militar / Institucional: `#3D4337`
  - Lodo do Rio Capibaribe: `#3C3B30`
  - Fita Adesiva / Crepe: `rgba(226, 210, 155, 0.72)`

### 4.3. Tipografia Canônica
- **Corpo Narrativo e Crônica:** Serifadas editoriais clássicas (`EB Garamond`, `Lora`, `Merriweather`). Escala ampliada: `font-size: 22px; line-height: 1.75; max-width: 62ch`. Letra capitular no primeiro parágrafo com `72px` (3 linhas de altura).
- **Fichas, Metadados e Burocracia:** Fontes monoespaçadas datilográficas (`Courier Prime`, `Special Elite`).

---

## 5. Mapeamento do Layout e Pontos de Integração DOM / CSS

### 5.1. Estrutura de Contêineres no Palco Esquerdo
O palco visual é configurado da seguinte forma em `index.html` e `style.css`:
```
.mesa-investigacao (display: flex; gap: 24px)
├── .palco-central (flex: 1.18; ~54% largura)
│   ├── .palco-visor (flex: 1; display: flex; flex-direction: column)
│   │   └── #aba-cenario (.aba-palco.ativa)
│   │       ├── .cenario-container (min-height: 260px; papel secundário; fitas nos cantos)
│   │       │   ├── .fita-canto-esq / .fita-canto-dir (fitas adesivas -4deg / +3.5deg)
│   │       │   ├── #slot-moldura-evidencia (.moldura-evidencia; min-height: 220px; overflow: hidden)
│   │       │   │   └── .foto-jornal-wrapper (width: 100%; height: 100%; ::after reticulado halftone)
│   │       │   │       ├── img.filtro-jornal-75 (object-fit: cover)
│   │       │   │       └── .selo-sobreposto-cenario (carimbo rotacionado -3deg)
│   │       │   └── .cenario-legenda-barra (#cenario-local + #cenario-registro)
│   │       └── #painel-cheia-75 (visível apenas com body.fase-3)
│   └── .barra-atalhos-dossie (grid com 4 botões de pasta rápida: Cenário, Atributos, Relações, Cronologia)
└── .coluna-narrativa (flex: 1; ~46% largura; max-width: 720px)
    └── .folha-narrativa
```

### 5.2. Dimensões e Proporções Efetivas do Visor
- **Resolução de Janela Desktop Padrão:** 1280x720 (mínima) até 1920x1080 (Full HD tela cheia).
- **Largura do Palco:** Em tela 1920x1080, o palco central ocupa aproximadamente 980px a 1050px.
- **Altura Disponível do `#slot-moldura-evidencia`:** Entre 380px e 520px (dependendo da presença ou ausência do `#painel-cheia-75`).
- **Proporção Nativa Recomendada:** 
  - O fallback vetorial SVG nativo foi desenhado em **800x380 px** (proporção **2.1:1** / widescreen cinematográfico de ~21:10).
  - Em telas 16:9 convencionais, a área visível do `#slot-moldura-evidencia` oscila entre **16:9 (1.77:1)** e **2:1 (2.0:1)**.
  - Imagens 4:3 ou verticais sofrerão recorte lateral ou vertical via `object-fit: cover`. Portanto, fotografias destinadas ao cenário principal devem ter enquadramento concebido para a faixa horizontal de **16:9 a 2.1:1**, mantendo o ponto focal na metade superior ou central do quadro.

---

## 6. Análise das Referências Visuais Autoritárias

### 6.1. A Referência Noir `artes/RecifeVibe.JPG`
- **Composição & Atmosfera:** Vista noturna panorâmica a partir do Rio Capibaribe, emoldurada pela silhueta escura de uma das pontes históricas (Ponte Duarte Coelho / Boa Vista).
- **Iluminação & Contraste:** 
  - Céu nocturno denso, tingido pela névoa luminosa alaranjada da cidade.
  - Água escura do rio agindo como um espelho líquido imperfeito, com longos rastros verticais de reflexos cromáticos distorcidos pelo movimento das marés.
  - Neons de época com forte identidade local: o vermelho-rubi de *"ÓLEO BEM-TE-VI"*, o ciano-elétrico de *"CINEMA"*, o âmbar dourado de *"LOTERIA"* e a coroa luminosa de *"PHOENIX PERNAMBUCANA SEGUROS"*.
  - Candeeiros públicos espalhando cones de luz amarela quente sobre o parapeito da ponte e os cais.
  - Sombras densas ("tintas pretas profundas mas não puras") que recortam a arquitetura déco e moderna contra o céu.

### 6.2. O Acervo Histórico `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`
- **Natureza do Material:** O Volume 99 do Museu da Cidade do Recife reúne tombos fotográficos históricos (125.938 a 126.070) das décadas de 1940 e 1950.
- **Temáticas Diretamente Conectadas ao Roteiro:**
  1. *Comícios e Manifestações de Massa:* Multidão compacta diante do Palácio do Campo das Princesas (Tombo 125.940) — ideal para os clímax de 1964 e greves populares.
  2. *Getúlio Vargas e Comitivas Oficiais:* Desfiles em carro aberto escoltados por batedores e visitas institucionais à Escola Superior de Agricultura em Dois Irmãos (Tombos 125.951, 125.964, 125.968).
  3. *Infraestrutura e Modernização:* Obras de terraplenagem e arquitetura moderna do Aeroporto dos Guararapes (Tombo 125.996).
  4. *Aparelho Político e Elites:* Agamenon Magalhães, generais e recepcionistas em trajes formais no Teatro Santa Isabel e Palácio do Governo (Tombos 126.013, 126.014, 126.032, 126.033).
  5. *A Classe Trabalhadora Portuária:* "Natal dos Portuários no SAPS (1951)" (Tombos 126.056, 126.057), revelando os rostos, vestimentas simples e famílias de estivadores e operários do porto.
- **Características Físicas Originais:** Fotografias em preto e branco com iluminação diurna natural, revelação em brometo de prata com suave tonalidade sépia natural ou prateada, coladas em fichas de papel pautado com anotações datilografadas ou manuscritas a tinta azul.

---

## 7. Avaliação Técnica do Pipeline de Reestilização (R2)

Para transpor as fotografias documentais diurnas em P&B do MCR para a atmosfera noturna/noir com reflexos e neons de `RecifeVibe.JPG`, avaliam-se três arquiteturas:

| Critério | Abordagem A: Filtros Dinâmicos em Tempo de Execução (CSS / Canvas) | Abordagem B: Pré-processamento Estático de Assets (Scripts / ImageMagick / Photoshop) | Abordagem C: Arquitetura Híbrida Recomendada |
|---|---|---|---|
| **Funcionamento** | Imagens originais brutas são servidas ao Electron; CSS (`filter`, `mix-blend-mode`, `backdrop-filter`) ou `<canvas>` aplicam transformações dinamicamente. | Scripts em lote (Python/Pillow/OpenCV ou ImageMagick) tratam cada foto no disco, salvando arquivos prontos em `.webp` ou `.jpg`. | **Pré-processamento estático tonal/composição** para gerar a fotografia tratada + **Camada CSS dinâmica leve** para halftone, vinheta, carimbos e reatividade de fase. |
| **Fidelidade Estética Noir** | **Baixa a Média.** Filtros CSS operam uniformemente em toda a imagem (não conseguem converter um meio-dia solar em noite com neon pontual ou criar reflexos aquáticos complexos). | **Alta.** Permite curvas de tom individuais, realce de máscaras de luz, inserção controlada de granulação cinematográfica e fusão de neons históricos. | **Muito Alta.** A imagem base ganha a atmosfera noturna/contrastada no asset, enquanto a interface mantém a tactilidade viva de selos e vinhetas reativas à fase do jogo. |
| **Performance no Electron** | **Moderada a Baixa.** Múltiplas camadas de `mix-blend-mode` e filtros encadeados sobre imagens de alta resolução sobrecarregam o compositor do Chromium, especialmente durante animações de screen-shake. | **Excelente.** Imagens já exportadas na resolução exata do palco (ex: 1200x570px em WebP/JPEG leve) carregam instantaneamente com consumo mínimo de memória. | **Excelente.** Combina carregamento veloz de assets otimizados com um único pseudo-elemento CSS de textura de baixo custo. |
| **Fluxo de Trabalho da Equipe** | Roteiristas apenas copiam fotos para `artes/`, mas o resultado visual é genérico e sem atmosfera noir real. | Exige etapa prévia de processamento gráfico para cada nova imagem inserida. | Um script automatizado de build de assets (ex: `npm run process:artes`) processa a pasta de entrada para a pasta final de jogo sem esforço manual repetitivo. |

---

## 8. Especificações Técnicas Objetivas de Integração (R3)

### 8.1. Parâmetros de Resolução e Enquadramento
- **Resolução Nativa Recomendada para Assets de Cenário:** `1200 x 570 px` (aspect ratio ~ **2.1:1** / widescreen).
- **Zona Segura de Atenção (Safe Zone):** Manter o sujeito principal ou horizonte dentro dos **60% centrais** verticais e horizontais, garantindo que o `object-fit: cover` não corte elementos vitais em diferentes janelas.
- **Formato de Exportação:** `WebP` (qualidade 85%) ou `JPEG` progressivo (qualidade 88%), mantendo o peso de cada imagem abaixo de **180 KB**.

### 8.2. Parâmetros do Tratamento Estético Noir
1. **Curva Tonal e Densidade de Sombras:**
   - Esmagamento seletivo de sombras (níveis de preto elevados para conferir densidade noir sem atingir `#000000`).
   - Ponto de preto fixado em `#1A1815` e ponto de branco rebaixado para `#EAE2D2`.
2. **Temperatura e Cromatismo Inspirado em `RecifeVibe.JPG`:**
   - Destaque para matrizes de reflexo aquático: Ciano-escuro (`#122B2E`), Âmbar de poste (`#D49B42`) e Vermelho-rubi de neon (`#942A24`).
   - Matiz sépia aquecida nas áreas médias para harmonizar com a paleta de madeira acolhedora da mesa (`#5C4938`).
3. **Parâmetros CSS Dinâmicos Unificados:**
   - `.filtro-jornal-75`: `filter: sepia(45%) contrast(118%) brightness(92%) grayscale(15%);`
   - `.foto-jornal-wrapper::after`: reticulado halftone 3px com `mix-blend-mode: multiply` e vinheta radial escura nas bordas (`rgba(38, 30, 22, 0.65)`).
   - `.selo-sobreposto-cenario`: rotação de `-3deg`, borda dupla de `2px solid var(--cor-carimbo-vermelho)`.

---

## 9. Mapeamento dos Critérios de Aceitação (ORIGINAL_REQUEST.md)

| Item | Critério de Aceitação | Status na Análise / Codebase |
|---|---|---|
| **Doc 1** | Documento detalhado de diretrizes de direção de arte e pipeline criado em `docs/` | Especificação técnica e visual formalizada neste relatório (`analysis.md`) e no `handoff.md`, pronta para redação das diretrizes consolidadas em `docs/DIRETRIZES_ESTETICAS_NOIR.md`. |
| **Doc 2** | Análise comparativa detalhada dos elementos de `RecifeVibe.JPG` vs `ACERVO DIGITAL MCR VOL 99.pdf` | Totalmente mapeada (§6.1 vs §6.2): iluminação noturna, reflexos fluviais e neons da ponte vs fotos de arquivo diurnas com comícios, elites, portuários e aeroporto. |
| **Doc 3** | Referências visuais históricas complementares para o Recife de 1958–1975 | Identificados locais e momentos-chave: Palácio do Campo das Princesas (comícios), Teatro Santa Isabel (elites), Cais de Santa Rita/SAPS (estivadores), Rua da União (DOPS) e Madalena/Ponte Duarte Coelho (Cheia de 75). |
| **Tec 1** | Recomendação técnica comparando filtros dinâmicos vs pré-processamento | Mapeada detalhadamente no quadro comparativo (§7), justificando a recomendação inequívoca da **Abordagem Híbrida**. |
| **Tec 2** | Parâmetros técnicos objetivos (filtros CSS, etapas tonais, granulação, resolução) | Valores exatos documentados em §8.1 e §8.2. |
| **Tec 3** | Especificações de integração direta com `index.html` e `style.css` | Mapeados seletores, containers, classes CSS e fallbacks em §5.1, §5.2 e Tabela de Features. |
