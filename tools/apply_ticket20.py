# -*- coding: utf-8 -*-
import os

CAMINHO_HTML = 'index.html'
CAMINHO_CSS = 'style.css'

# 1. ATUALIZAR INDEX.HTML
with open(CAMINHO_HTML, 'r', encoding='utf-8') as f:
    html = f.read()

html_norm = html.replace('\r\n', '\n')

antigo_header = """    <!-- BARRA DE SISTEMA SUPERIOR -->
    <header class="barra-sistema">
      <div class="status-sistema">
        <span class="ponto-status">●</span>
        <span id="etiqueta-fase" class="etiqueta-fase">FASE 1: A FORMAÇÃO (1958–1964)</span>
        <span class="separador-barra">|</span>
        <span id="ano-atual" class="ano-atual">RECIFE, 1958</span>
        <span class="separador-barra">|</span>
        <span id="indicador-acoes" class="indicador-acoes">AÇÕES: ● ● ● ● (4/4)</span>
      </div>
      <div class="comandos-sistema">
        <span class="atalho-guia">[F11] Tela Cheia</span>
        <button id="btn-devtools" class="btn-controle btn-devtools" title="Console de Depuração [F1]">[F1] DEVTOOLS</button>
        <button id="btn-fullscreen" class="btn-controle" title="Alternar Tela Cheia">TELA CHEIA</button>
      </div>
    </header>"""

novo_header = """    <!-- BARRA DE SISTEMA SUPERIOR — LOMBADA DE ARQUIVO & GAVETEIRO (TICKET 20) -->
    <header class="barra-sistema" aria-label="Lombada de Arquivo e Barra de Sistema">
      <!-- Rebite metálico mecânico chanfrado esquerdo -->
      <div class="rebite-parafuso rebite-esq" aria-hidden="true" title="Fixador de arquivo metálico"></div>

      <div class="status-sistema">
        <span class="plaqueta-arquivo-id">DOPS-PE // GAVETEIRO 04</span>
        <div class="bloco-plaqueta-fase">
          <span class="ponto-status-led" aria-hidden="true"></span>
          <span id="etiqueta-fase" class="etiqueta-fase">FASE 1: A FORMAÇÃO (1958–1964)</span>
        </div>
        <span class="separador-barra" aria-hidden="true">|</span>
        <div class="bloco-carimbo-datador">
          <span class="datador-rotulo">REGISTRO:</span>
          <span id="ano-atual" class="ano-atual">RECIFE, 1958</span>
        </div>
        <span class="separador-barra" aria-hidden="true">|</span>
        <div class="bloco-perfurador-acoes">
          <span id="indicador-acoes" class="indicador-acoes">AÇÕES: ● ● ● ● (4/4)</span>
        </div>
      </div>

      <div class="comandos-sistema">
        <span class="atalho-guia">[F11] TELA CHEIA</span>
        <button id="btn-devtools" class="btn-dymo btn-dymo-vermelho" title="Console de Depuração [F1]">[F1] DEVTOOLS</button>
        <button id="btn-fullscreen" class="btn-dymo btn-dymo-preto" title="Alternar Tela Cheia">TELA CHEIA</button>
      </div>

      <!-- Rebite metálico mecânico chanfrado direito -->
      <div class="rebite-parafuso rebite-dir" aria-hidden="true" title="Fixador de arquivo metálico"></div>
    </header>"""

if antigo_header in html_norm:
    html_norm = html_norm.replace(antigo_header, novo_header, 1)
    if '\r\n' in html:
        html_final = html_norm.replace('\n', '\r\n')
    else:
        html_final = html_norm
    with open(CAMINHO_HTML, 'w', encoding='utf-8') as f:
        f.write(html_final)
    print('index.html atualizado com sucesso!')
else:
    print('ERRO: antigo_header nao encontrado em index.html')


# 2. ATUALIZAR STYLE.CSS
with open(CAMINHO_CSS, 'r', encoding='utf-8') as f:
    css = f.read()

css_norm = css.replace('\r\n', '\n')

antigo_bloco_css = """/* ==========================================================================
   BARRA DE SISTEMA SUPERIOR
   ========================================================================== */
.barra-sistema {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #2E241B;
  border: 1px solid #6E5844;
  box-shadow: 0 3px 10px rgba(28, 20, 12, 0.35);
  color: #DFD5C4;
  font-family: var(--fonte-datilografada);
  font-size: 13px;
  letter-spacing: 1px;
  margin-bottom: 14px;
  flex-shrink: 0;
}

.status-sistema {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ponto-status {
  color: #6DB37B;
  font-size: 14px;
}

.etiqueta-fase {
  font-weight: bold;
  color: #F0EAE1;
}

.ano-atual {
  color: #E2CFA9;
  font-weight: bold;
}

.separador-barra {
  color: #7A6550;
}

.indicador-acoes {
  color: #E6DDD0;
  font-family: var(--fonte-datilografada);
  font-size: 13px;
  letter-spacing: 1px;
}

.indicador-acoes .ponto-ativo {
  color: #79C488;
  margin-right: 3px;
}

.indicador-acoes .ponto-gasto {
  color: #877665;
  margin-right: 3px;
}

.comandos-sistema {
  display: flex;
  align-items: center;
  gap: 14px;
}

.atalho-guia {
  color: #B8A894;
  font-size: 12px;
}

.btn-controle {
  background: #423427;
  color: #EFE8DC;
  border: 1px solid #826A52;
  padding: 5px 12px;
  font-family: var(--fonte-datilografada);
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-controle:hover {
  background: #594635;
  color: #F4EFE6;
  border-color: #B09476;
}"""

novo_bloco_css = """/* ==========================================================================
   BARRA DE SISTEMA SUPERIOR — LOMBADA DE ARQUIVO DE AÇO & GAVETEIRO (TICKET 20)
   ========================================================================== */
.barra-sistema {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 18px 7px 18px;
  position: relative;
  background: 
    linear-gradient(180deg, #384032 0%, #2A3026 50%, #1F241C 100%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 2px, transparent 2px, transparent 16px);
  border: 1px solid #5C523E;
  border-bottom: 2px solid #1A1E17;
  box-shadow: 
    0 4px 12px rgba(18, 14, 10, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.4);
  color: #DFD5C4;
  font-family: var(--fonte-datilografada);
  font-size: 12px;
  letter-spacing: 0.8px;
  margin-bottom: 14px;
  flex-shrink: 0;
  user-select: none;
}

/* Rebites metálicos com fenda mecânica nas extremidades */
.rebite-parafuso {
  width: 11px;
  height: 11px;
  background: radial-gradient(circle at 35% 35%, #8C7F6A 0%, #4D4335 70%, #241F18 100%);
  border: 1px solid #16130F;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.7);
  position: relative;
  flex-shrink: 0;
}

.rebite-parafuso::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 2px;
  width: 6px;
  height: 1.5px;
  background-color: #120F0B;
  transform: rotate(38deg);
}

.status-sistema {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* Plaqueta gravada do Arquivo DOPS */
.plaqueta-arquivo-id {
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.2px;
  color: #A39682;
  background-color: rgba(16, 18, 14, 0.55);
  padding: 3px 7px;
  border: 1px solid #484032;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
}

/* Plaqueta de Fase com LED indicador analógico */
.bloco-plaqueta-fase {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ponto-status-led {
  width: 7px;
  height: 7px;
  background-color: #6BB577;
  border: 1px solid #1A2E1D;
  box-shadow: 0 0 5px rgba(107, 181, 119, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  display: inline-block;
  flex-shrink: 0;
}

.etiqueta-fase {
  font-weight: bold;
  font-size: 12px;
  color: #F4EFE6;
  letter-spacing: 0.8px;
}

/* Bloco do Carimbo Datador Mecânico */
.bloco-carimbo-datador {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: rgba(22, 19, 15, 0.6);
  border: 1px solid #4E4232;
  padding: 2px 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
}

.datador-rotulo {
  font-size: 9px;
  font-weight: 900;
  color: #8C7E6A;
  letter-spacing: 0.6px;
}

.ano-atual {
  color: #E8D8B6;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.6px;
}

.separador-barra {
  color: #5C5242;
  opacity: 0.7;
}

/* Bloco do Indicador de Ações com Orifícios Perfurados */
.bloco-perfurador-acoes {
  display: flex;
  align-items: center;
}

.indicador-acoes {
  color: #DFD5C4;
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  letter-spacing: 0.8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.acoes-texto {
  font-size: 10px;
  font-weight: bold;
  color: #A89B87;
  margin-right: 2px;
}

.acoes-furos-trilha {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Orifício com cartão/disco de ação intacto (Disponível) */
.indicador-acoes .ponto-ativo {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle at 35% 35%, #7DC98B 0%, #4D965E 70%, #2A5A35 100%);
  border: 1px solid #18331E;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.7);
  font-size: 0;
  vertical-align: middle;
}

/* Orifício perfurado mecânico vazado (Gasto) */
.indicador-acoes .ponto-gasto {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #141612;
  border: 1px solid #2F352A;
  box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.95), 0 1px 0 rgba(140, 120, 95, 0.2);
  font-size: 0;
  vertical-align: middle;
}

.acoes-contagem {
  font-size: 10px;
  color: #9E907B;
  margin-left: 3px;
}

.comandos-sistema {
  display: flex;
  align-items: center;
  gap: 12px;
}

.atalho-guia {
  color: #8C806E;
  font-size: 10px;
  letter-spacing: 0.8px;
}

/* Botões estilizados como fitas rotuladoras plásticas Dymo (Anos 60/70) */
.btn-dymo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  cursor: pointer;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.9), 0 -1px 0 rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 2px 5px rgba(12, 9, 6, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: filter 0.15s ease, transform 0.1s ease;
}

.btn-dymo:hover {
  filter: brightness(1.15);
}

.btn-dymo:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(12, 9, 6, 0.7);
}

/* Fita Dymo Vermelha (DevTools / Urgência) */
.btn-dymo-vermelho {
  background: linear-gradient(180deg, #962824 0%, #6E1A17 55%, #521412 100%);
  border: 1px solid #3A0D0B;
  color: #F8F5EE;
}

/* Fita Dymo Preta / Grafite (Controle de Janela) */
.btn-dymo-preto {
  background: linear-gradient(180deg, #3C3630 0%, #28241F 55%, #1C1916 100%);
  border: 1px solid #141210;
  color: #EFE8DA;
}

/* Compatibilidade com classes anteriores */
.btn-controle {
  background: #423527;
  color: #E2D7C8;
  border: 1px solid #6E5B45;
  padding: 4px 10px;
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  cursor: pointer;
  letter-spacing: 1px;
}"""

if antigo_bloco_css in css_norm:
    css_norm = css_norm.replace(antigo_bloco_css, novo_bloco_css, 1)
    if '\r\n' in css:
        css_final = css_norm.replace('\n', '\r\n')
    else:
        css_final = css_norm
    with open(CAMINHO_CSS, 'w', encoding='utf-8') as f:
        f.write(css_final)
    print('style.css atualizado com sucesso!')
else:
    print('ERRO: antigo_bloco_css nao encontrado em style.css')
