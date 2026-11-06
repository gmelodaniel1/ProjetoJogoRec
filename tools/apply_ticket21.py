# -*- coding: utf-8 -*-
"""
Script de aplicação do Ticket 21:
Régua Limnimétrica Esmaltada da Cheia de 75 & Overlay de Virada de Ano em Edição Extraordinária de Jornal
"""
import os

CAMINHO_HTML = 'index.html'
CAMINHO_CSS = 'style.css'

# -----------------------------------------------------------------------------
# 1. ATUALIZAÇÃO DO INDEX.HTML
# -----------------------------------------------------------------------------
with open(CAMINHO_HTML, 'r', encoding='utf-8') as f:
    html = f.read()

html_norm = html.replace('\r\n', '\n')

# 1.1 Atualizar Overlay de Virada de Ano
antigo_virada_html = """    <!-- BANNER DE TRANSIÇÃO CRONOLÓGICA / VIRADA DE ANO (TICKET 15) -->
    <div id="overlay-virada-ano" class="overlay-virada-ano" style="display: none;">
      <div class="cartao-virada-ano">
        <span class="virada-selo-topo">CRÔNICA DE PERNAMBUCO // O TEMPO PASSA</span>
        <div class="virada-titulo">UMA NOVA FOLHA NO CALENDÁRIO</div>
        <div class="virada-anos-linha">
          <span class="ano-origem" id="virada-ano-de">1948</span>
          <span class="virada-seta">➔</span>
          <span class="ano-destino" id="virada-ano-para">1949</span>
        </div>
        <div class="virada-idade-linha" id="virada-idade-info">O protagonista completa 1 ano de idade</div>
        <div class="virada-subtitulo">O curso da vida e da cidade segue inexorável</div>
        <div class="virada-rodape-acao">
          <button id="btn-continuar-virada-ano" class="btn-continuar-virada">
            ASSIMILAR & SEGUIR O CURSO DO TEMPO ➔
          </button>
        </div>
      </div>
    </div>"""

novo_virada_html = """    <!-- BANNER DE TRANSIÇÃO CRONOLÓGICA / VIRADA DE ANO — EDIÇÃO EXTRAORDINÁRIA (TICKET 21) -->
    <div id="overlay-virada-ano" class="overlay-virada-ano" style="display: none;">
      <div class="cartao-virada-ano">
        <div class="virada-jornal-cabecalho">
          <span class="virada-selo-topo">EDIÇÃO EXTRAORDINÁRIA // CRÔNICA DO RECIFE</span>
          <span class="virada-carimbo-ano">REGISTRO HISTÓRICO</span>
        </div>
        <div class="virada-filete-duplo"></div>
        <div class="virada-titulo">UMA NOVA FOLHA NO CALENDÁRIO</div>
        <div class="virada-manchete-sub">O curso da vida e da cidade segue inexorável pelas pontes do Capibaribe</div>
        <div class="virada-anos-linha">
          <span class="ano-origem" id="virada-ano-de">1948</span>
          <span class="virada-seta">➔</span>
          <span class="ano-destino" id="virada-ano-para">1949</span>
        </div>
        <div class="virada-idade-linha" id="virada-idade-info">O protagonista completa 1 ano de idade</div>
        <div class="virada-rodape-acao">
          <button id="btn-continuar-virada-ano" class="btn-continuar-virada">
            <span>ASSIMILAR OS FATOS & SEGUIR O TEMPO</span>
            <span class="seta-acao">➔</span>
          </button>
        </div>
      </div>
    </div>"""

if antigo_virada_html in html_norm:
    html_norm = html_norm.replace(antigo_virada_html, novo_virada_html, 1)
    print('index.html: Overlay de virada de ano substituído!')
else:
    print('AVISO: antigo_virada_html nao encontrado em index.html')

# 1.2 Atualizar Painel da Cheia de 75
antigo_cheia_html = """            <!-- PAINEL HIDROLÓGICO DA CHEIA DE 75 (Visível na Fase 3 abaixo do Cenário) -->
            <div class="painel-cheia-75" id="painel-cheia-75">
              <div class="cheia-cabecalho">
                <span class="cheia-alerta-luz">▲ ALERTA HIDROLÓGICO — DEFESA CIVIL DO RECIFE</span>
                <span class="cheia-titulo">RÉGUA DO RIO CAPIBARIBE</span>
              </div>
              <div class="cheia-medidor-conteudo">
                <div class="cheia-regua-grafica">
                  <div class="regua-nivel-agua" id="regua-barra-nivel" style="height: 33%;"></div>
                </div>
                <div class="cheia-dados-numericos">
                  <div class="dado-cheia-linha">
                    <span class="rotulo">NÍVEL DO RIO:</span>
                    <span class="valor" id="val-nivel-rio">+1,50 m</span>
                  </div>
                  <div class="dado-cheia-linha">
                    <span class="rotulo">HORAS ATÉ PICO:</span>
                    <span class="valor" id="val-horas-cheia">18 h</span>
                  </div>
                  <div class="dado-cheia-linha status-panico">
                    <span class="rotulo">ESTADO:</span>
                    <span class="valor" id="val-status-tapacura">EM RISCO</span>
                  </div>
                </div>
              </div>
            </div>"""

novo_cheia_html = """            <!-- PAINEL HIDROLÓGICO DA CHEIA DE 75 (RÉGUA LIMNIMÉTRICA DA CHESF / DEFESA CIVIL - TICKET 21) -->
            <div class="painel-cheia-75" id="painel-cheia-75">
              <div class="cheia-cabecalho">
                <div class="cheia-alerta-bloco">
                  <span class="luz-piloto-alerta" aria-hidden="true"></span>
                  <span class="cheia-alerta-luz">ALERTA HIDROLÓGICO — DEFESA CIVIL / CHESF</span>
                </div>
                <span class="cheia-titulo">RÉGUA LIMNIMÉTRICA • RIO CAPIBARIBE</span>
              </div>
              <div class="cheia-medidor-conteudo">
                <!-- Coluna da Régua Limnimétrica Esmaltada com Marcas de Cota -->
                <div class="cheia-regua-wrapper">
                  <div class="regua-marcas-escala">
                    <span class="marca-cota cota-critica">+4,50m</span>
                    <span class="marca-cota cota-alerta">+3,50m</span>
                    <span class="marca-cota">+2,00m</span>
                    <span class="marca-cota">+1,00m</span>
                    <span class="marca-cota cota-base">0,00m</span>
                  </div>
                  <div class="cheia-regua-grafica">
                    <!-- Linhas graduadas esmaltadas em preto e branco -->
                    <div class="regua-marcas-visuais" aria-hidden="true"></div>
                    <!-- Nível da água barrenta com lodo e espuma -->
                    <div class="regua-nivel-agua" id="regua-barra-nivel" style="height: 33%;">
                      <div class="linha-espuma-rio"></div>
                    </div>
                  </div>
                </div>
                <div class="cheia-dados-numericos">
                  <div class="dado-cheia-linha">
                    <span class="rotulo">COTA MEDIDA:</span>
                    <span class="valor" id="val-nivel-rio">+1,50 m</span>
                  </div>
                  <div class="dado-cheia-linha">
                    <span class="rotulo">TEMPO ATÉ PICO:</span>
                    <span class="valor" id="val-horas-cheia">18 h</span>
                  </div>
                  <div class="dado-cheia-linha status-panico">
                    <span class="rotulo">SITUAÇÃO DE TAPACURÁ:</span>
                    <span class="valor" id="val-status-tapacura">EM RISCO</span>
                  </div>
                </div>
              </div>
            </div>"""

if antigo_cheia_html in html_norm:
    html_norm = html_norm.replace(antigo_cheia_html, novo_cheia_html, 1)
    print('index.html: Painel da cheia de 75 substituído!')
else:
    print('AVISO: antigo_cheia_html nao encontrado em index.html')

if '\r\n' in html:
    html_final = html_norm.replace('\n', '\r\n')
else:
    html_final = html_norm

with open(CAMINHO_HTML, 'w', encoding='utf-8') as f:
    f.write(html_final)
print('index.html gravado com sucesso!')


# -----------------------------------------------------------------------------
# 2. ATUALIZAÇÃO DO STYLE.CSS
# -----------------------------------------------------------------------------
with open(CAMINHO_CSS, 'r', encoding='utf-8') as f:
    css = f.read()

css_norm = css.replace('\r\n', '\n')

# 2.1 Bloco do Painel da Cheia de 75
antigo_cheia_css = """.painel-cheia-75 {
  display: none;
  background-color: #2E3025;
  border: 1px solid #6E7058;
  color: #E2DCCB;
  padding: 12px 16px;
  box-shadow: 0 6px 16px rgba(28, 20, 12, 0.45);
  font-family: var(--fonte-datilografada);
  flex-shrink: 0;
}

body.fase-3 .painel-cheia-75 {
  display: block;
}

.cheia-cabecalho {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #6E7058;
  padding-bottom: 6px;
  margin-bottom: 8px;
  font-size: 12px;
  letter-spacing: 1.5px;
}

.cheia-alerta-luz {
  color: #E06C68;
  font-weight: bold;
}

.cheia-medidor-conteudo {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cheia-regua-grafica {
  width: 44px;
  height: 70px;
  background-color: #1E2018;
  border: 1px solid #75735E;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.regua-nivel-agua {
  width: 100%;
  background: linear-gradient(to top, #3D4230 0%, #63694C 100%);
  border-top: 2px solid #B5B084;
  transition: height 0.6s ease-out;
}

.cheia-dados-numericos {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  font-size: 13px;
}

.dado-cheia-linha {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dado-cheia-linha .rotulo {
  color: #B0AA96;
  font-size: 11px;
}

.dado-cheia-linha .valor {
  color: #F0EAE1;
  font-weight: bold;
  font-size: 15px;
}

.status-panico .valor {
  color: #E2726E;
}"""

novo_cheia_css = """/* ==========================================================================
   PAINEL DA CHEIA DE 75 — RÉGUA LIMNIMÉTRICA DA CHESF / DEFESA CIVIL (TICKET 21)
   ========================================================================== */
.painel-cheia-75 {
  display: none;
  background: 
    linear-gradient(180deg, #242920 0%, #1A1F17 100%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 2px, transparent 2px, transparent 16px);
  border: 2px solid #524A3A;
  border-bottom: 2px solid #141812;
  color: #E2DCCB;
  padding: 10px 14px;
  box-shadow: 
    0 8px 24px rgba(16, 12, 8, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  font-family: var(--fonte-datilografada);
  flex-shrink: 0;
  position: relative;
}

body.fase-3 .painel-cheia-75 {
  display: block;
}

.cheia-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #4D4536;
  padding-bottom: 6px;
  margin-bottom: 8px;
  font-size: 11px;
  letter-spacing: 1px;
}

.cheia-alerta-bloco {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Luz piloto analógica de aviso da Defesa Civil com filamento pulsante */
.luz-piloto-alerta {
  width: 8px;
  height: 8px;
  background-color: #E0564C;
  border: 1px solid #380E0B;
  box-shadow: 0 0 6px #E0564C, inset 0 1px 0 rgba(255, 255, 255, 0.5);
  display: inline-block;
  animation: pulsarAlertaChesf 2.2s infinite ease-in-out;
}

@keyframes pulsarAlertaChesf {
  0%, 100% { opacity: 1; filter: brightness(1.2); }
  50% { opacity: 0.45; filter: brightness(0.8); }
}

.cheia-alerta-luz {
  color: #E66860;
  font-weight: 900;
  letter-spacing: 0.8px;
}

.cheia-titulo {
  color: #B5A894;
  font-size: 10px;
  font-weight: bold;
}

.cheia-medidor-conteudo {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* Wrapper da Régua Limnimétrica Esmaltada */
.cheia-regua-wrapper {
  display: flex;
  align-items: stretch;
  gap: 6px;
  background-color: rgba(16, 18, 14, 0.6);
  border: 1px solid #484032;
  padding: 4px 6px;
}

.regua-marcas-escala {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 8.5px;
  font-family: var(--fonte-datilografada);
  font-weight: bold;
  color: #8C806E;
  text-align: right;
  line-height: 1;
}

.regua-marcas-escala .cota-critica {
  color: #D94840;
}

.regua-marcas-escala .cota-alerta {
  color: #E6A045;
}

/* Régua com esmalte branco/preto e marcas industriais de medição */
.cheia-regua-grafica {
  width: 32px;
  height: 80px;
  background-color: #E5DFC9;
  background-image: 
    repeating-linear-gradient(180deg, #1C1914 0px, #1C1914 2px, transparent 2px, transparent 8px);
  border: 2px solid #2B251D;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.6);
}

/* Nível da água barrenta com lodo e espuma na crista */
.regua-nivel-agua {
  width: 100%;
  background: linear-gradient(to top, rgba(32, 40, 24, 0.96) 0%, rgba(68, 76, 44, 0.92) 80%, rgba(120, 116, 68, 0.95) 100%);
  border-top: 2px solid #D6CEA0;
  box-shadow: 0 0 6px rgba(190, 180, 110, 0.5);
  position: relative;
  transition: height 0.6s ease-out;
}

.linha-espuma-rio {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #EAE3BA;
  opacity: 0.8;
}

.cheia-dados-numericos {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  font-size: 12px;
}

.dado-cheia-linha {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: rgba(20, 22, 17, 0.45);
  border: 1px solid #443C2E;
  padding: 4px 8px;
}

.dado-cheia-linha .rotulo {
  color: #9C907C;
  font-size: 9.5px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.dado-cheia-linha .valor {
  color: #F4EFE6;
  font-weight: bold;
  font-size: 14px;
}

.status-panico .valor {
  color: #E25852;
}"""

if antigo_cheia_css in css_norm:
    css_norm = css_norm.replace(antigo_cheia_css, novo_cheia_css, 1)
    print('style.css: Bloco da cheia de 75 substituído!')
else:
    print('AVISO: antigo_cheia_css nao encontrado em style.css')

# 2.2 Bloco do Overlay de Virada de Ano (Eliminação do blur digital e estilo de Edição Extraordinária)
antigo_virada_css = """.overlay-virada-ano {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(22, 17, 12, 0.78);
  backdrop-filter: blur(3px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeInVirada 0.25s ease-out forwards;
}

@keyframes fadeInVirada {
  from { opacity: 0; }
  to { opacity: 1; }
}

.cartao-virada-ano {
  background-color: var(--cor-papel-secundario);
  border: 3px double var(--cor-tinta-principal);
  padding: 34px 48px;
  max-width: 540px;
  width: 100%;
  text-align: center;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.5);
  position: relative;
  animation: viradaAnoSlam 0.35s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
}

@keyframes viradaAnoSlam {
  0% {
    transform: scale(0.92) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.virada-selo-topo {
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
  color: var(--cor-carimbo-vermelho);
  display: block;
  margin-bottom: 8px;
}

.virada-titulo {
  font-family: var(--fonte-editorial);
  font-size: 26px;
  font-weight: 700;
  color: var(--cor-tinta-principal);
  margin-bottom: 12px;
}

.virada-anos-linha {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: var(--fonte-editorial);
  font-size: 46px;
  font-weight: bold;
  margin: 14px 0;
  border-top: 1px dashed #9E917B;
  border-bottom: 1px dashed #9E917B;
  padding: 12px 0;
}

.ano-origem {
  color: var(--cor-tinta-desbotada);
}

.virada-seta {
  color: var(--cor-carimbo-vermelho);
  font-size: 32px;
}

.ano-destino {
  color: var(--cor-carimbo-vermelho);
}

.virada-idade-linha {
  font-family: var(--fonte-datilografada);
  font-size: 14px;
  font-weight: bold;
  color: var(--cor-azul-caneta);
  margin-bottom: 6px;
}

.virada-subtitulo {
  font-family: var(--fonte-editorial);
  font-size: 17px;
  font-style: italic;
  color: var(--cor-tinta-desbotada);
}

.virada-rodape-acao {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.btn-continuar-virada {
  font-family: var(--fonte-datilografada);
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #F8F2E4;
  background-color: var(--cor-tinta-principal);
  border: 2px solid var(--cor-carimbo-vermelho);
  padding: 12px 26px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-continuar-virada:hover {
  background-color: var(--cor-carimbo-vermelho);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}

.btn-continuar-virada:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}"""

novo_virada_css = """/* ==========================================================================
   TRANSIÇÃO HISTÓRICA & VIRADA DE ANO — EDIÇÃO EXTRAORDINÁRIA (TICKET 21)
   ========================================================================== */
.overlay-virada-ano {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* Vinheta escura analógica motivada de redação noturna (SEM blur digital de iOS) */
  background: radial-gradient(ellipse 95% 85% at 50% 50%, rgba(22, 16, 11, 0.90) 0%, rgba(10, 7, 5, 0.97) 100%);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeInVirada 0.25s ease-out forwards;
}

@keyframes fadeInVirada {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Folha de Jornal Extraordinário / Calendário de Parede com Textura Rústica */
.cartao-virada-ano {
  background-color: #EFE8DC;
  background-image: 
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(110, 90, 65, 0.08) 100%),
    var(--textura-papel-grao);
  background-repeat: no-repeat, repeat;
  background-size: 100% 100%, 256px 256px;
  border: 2px solid #5A4E3E;
  outline: 1px dashed rgba(90, 78, 62, 0.45);
  outline-offset: -5px;
  padding: 32px 44px;
  max-width: 580px;
  width: 100%;
  text-align: center;
  box-shadow: 
    0 22px 64px rgba(6, 4, 2, 0.88), 
    0 2px 4px rgba(6, 4, 2, 0.5),
    inset 0 0 35px rgba(120, 95, 65, 0.12);
  position: relative;
  transform: rotate(-0.35deg);
  animation: viradaAnoSlam 0.35s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
}

@keyframes viradaAnoSlam {
  0% {
    transform: scale(0.92) translateY(24px) rotate(-1.5deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0) rotate(-0.35deg);
    opacity: 1;
  }
}

.virada-jornal-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.virada-selo-topo {
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: var(--cor-carimbo-vermelho);
  text-transform: uppercase;
}

.virada-carimbo-ano {
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #7A6C58;
  border: 1px solid #9E8E76;
  padding: 1px 6px;
  transform: rotate(2deg);
}

.virada-filete-duplo {
  border-top: 3px double #3D3528;
  margin: 8px 0 14px 0;
}

.virada-titulo {
  font-family: var(--fonte-editorial);
  font-size: 28px;
  font-weight: 700;
  color: var(--cor-tinta-principal);
  line-height: 1.15;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.virada-manchete-sub {
  font-family: var(--fonte-editorial);
  font-size: 16px;
  font-style: italic;
  color: var(--cor-tinta-desbotada);
  margin-bottom: 14px;
}

.virada-anos-linha {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  font-family: var(--fonte-editorial);
  font-size: 48px;
  font-weight: bold;
  margin: 12px 0;
  border-top: 1px dashed #A89B84;
  border-bottom: 1px dashed #A89B84;
  padding: 10px 0;
  background-color: rgba(220, 210, 190, 0.25);
}

.ano-origem {
  color: var(--cor-tinta-desbotada);
}

.virada-seta {
  color: var(--cor-carimbo-vermelho);
  font-size: 32px;
}

.ano-destino {
  color: var(--cor-carimbo-vermelho);
}

.virada-idade-linha {
  font-family: var(--fonte-datilografada);
  font-size: 13px;
  font-weight: bold;
  color: var(--cor-azul-caneta);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.virada-rodape-acao {
  margin-top: 22px;
  display: flex;
  justify-content: center;
}

.btn-continuar-virada {
  font-family: var(--fonte-datilografada);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.2px;
  color: #F8F2E4;
  background-color: var(--cor-tinta-principal);
  border: 2px solid var(--cor-carimbo-vermelho);
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-continuar-virada:hover {
  background-color: var(--cor-carimbo-vermelho);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55);
}

.btn-continuar-virada:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}"""

if antigo_virada_css in css_norm:
    css_norm = css_norm.replace(antigo_virada_css, novo_virada_css, 1)
    print('style.css: Bloco do overlay de virada de ano substituído!')
else:
    print('AVISO: antigo_virada_css nao encontrado em style.css')

if '\r\n' in css:
    css_final = css_norm.replace('\n', '\r\n')
else:
    css_final = css_norm

with open(CAMINHO_CSS, 'w', encoding='utf-8') as f:
    f.write(css_final)
print('style.css gravado com sucesso!')

