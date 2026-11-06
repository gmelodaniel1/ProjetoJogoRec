# -*- coding: utf-8 -*-
"""
Script de aplicação do Ticket 22:
Abas Kardex de Fichário Suspenso & Despachos de Decisão com Tarja de Censura AI-5
"""
import os

CAMINHO_HTML = 'index.html'
CAMINHO_CSS = 'style.css'
CAMINHO_JS = 'renderer.js'

# -----------------------------------------------------------------------------
# 1. ATUALIZAÇÃO DO INDEX.HTML
# -----------------------------------------------------------------------------
with open(CAMINHO_HTML, 'r', encoding='utf-8') as f:
    html = f.read()

html_norm = html.replace('\r\n', '\n')

# 1.1 Atualizar Barra de Atalhos (Guias Kardex com Visor de Celuloide)
antigo_atalhos_html = """        <!-- BARRA INFERIOR DE ATALHOS DO PALCO (PASTAS DE ACESSO RÁPIDO) -->
        <nav class="barra-atalhos-dossie" aria-label="Atalhos do Prontuário">
          <button class="btn-atalho-pasta ativo" id="btn-aba-cenario" data-aba-alvo="aba-cenario">
            <span class="atalho-icone">▣</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">CENÁRIO</span>
              <span class="atalho-subtitulo" id="resumo-atalho-cenario">Fotografia da Cena</span>
            </div>
          </button>

          <button class="btn-atalho-pasta" id="btn-aba-atributos" data-aba-alvo="aba-atributos">
            <span class="atalho-icone">▤</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">ATRIBUTOS</span>
              <span class="atalho-subtitulo" id="resumo-atalho-atributos">Cr$ 40 • Susp. 2/10</span>
            </div>
          </button>

          <button class="btn-atalho-pasta" id="btn-aba-relacoes" data-aba-alvo="aba-relacoes">
            <span class="atalho-icone">▥</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">RELAÇÕES</span>
              <span class="atalho-subtitulo" id="resumo-atalho-relacoes">Pai: Leal • Honra: 1</span>
            </div>
          </button>

          <button class="btn-atalho-pasta" id="btn-aba-cronologia" data-aba-alvo="aba-cronologia">
            <span class="atalho-icone">◷</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">CRONOLOGIA</span>
              <span class="atalho-subtitulo" id="resumo-atalho-cronologia">Fase 1 • 1958</span>
            </div>
          </button>
        </nav>"""

novo_atalhos_html = """        <!-- BARRA INFERIOR DE ATALHOS DO PALCO (GUIAS DE FICHÁRIO KARDEX - TICKET 22) -->
        <nav class="barra-atalhos-dossie" aria-label="Guias Kardex do Prontuário">
          <button class="btn-atalho-pasta ativo" id="btn-aba-cenario" data-aba-alvo="aba-cenario">
            <div class="visor-celuloide-aba" aria-hidden="true"></div>
            <span class="atalho-icone">▣</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">CENÁRIO</span>
              <span class="atalho-subtitulo" id="resumo-atalho-cenario">Fotografia da Cena</span>
            </div>
          </button>

          <button class="btn-atalho-pasta" id="btn-aba-atributos" data-aba-alvo="aba-atributos">
            <div class="visor-celuloide-aba" aria-hidden="true"></div>
            <span class="atalho-icone">▤</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">ATRIBUTOS</span>
              <span class="atalho-subtitulo" id="resumo-atalho-atributos">Cr$ 40 • Susp. 2/10</span>
            </div>
          </button>

          <button class="btn-atalho-pasta" id="btn-aba-relacoes" data-aba-alvo="aba-relacoes">
            <div class="visor-celuloide-aba" aria-hidden="true"></div>
            <span class="atalho-icone">▥</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">RELAÇÕES</span>
              <span class="atalho-subtitulo" id="resumo-atalho-relacoes">Pai: Leal • Honra: 1</span>
            </div>
          </button>

          <button class="btn-atalho-pasta" id="btn-aba-cronologia" data-aba-alvo="aba-cronologia">
            <div class="visor-celuloide-aba" aria-hidden="true"></div>
            <span class="atalho-icone">◷</span>
            <div class="atalho-textos">
              <span class="atalho-titulo">CRONOLOGIA</span>
              <span class="atalho-subtitulo" id="resumo-atalho-cronologia">Fase 1 • 1958</span>
            </div>
          </button>
        </nav>"""

if antigo_atalhos_html in html_norm:
    html_norm = html_norm.replace(antigo_atalhos_html, novo_atalhos_html, 1)
    print('index.html: Abas Kardex substituídas!')
else:
    print('AVISO: antigo_atalhos_html nao encontrado em index.html')

# 1.2 Atualizar Botão de Despacho
antigo_despacho_html = """          <!-- BLOCO DE TRANSIÇÃO: CONTINUAR PARA A DECISÃO (FLUXO EM DOIS TEMPOS) -->
          <div id="bloco-continuar-decisao" class="bloco-continuar-decisao" style="display: none;">
            <button id="btn-continuar-para-decisao" class="btn-continuar-decisao">
              <span>PESAR AS ESCOLHAS & DELIBERAR</span>
              <span class="seta-continuar">➔</span>
            </button>
          </div>"""

novo_despacho_html = """          <!-- BLOCO DE TRANSIÇÃO: ORDEM DE DESPACHO ANEXA (TICKET 22) -->
          <div id="bloco-continuar-decisao" class="bloco-continuar-decisao" style="display: none;">
            <button id="btn-continuar-para-decisao" class="btn-continuar-decisao">
              <div class="fita-despacho-adesiva" aria-hidden="true"></div>
              <div class="despacho-textos">
                <span class="despacho-carimbo-titulo">ORDEM DE DESPACHO // INQUÉRITO FORMAL</span>
                <span class="despacho-chamada">PESAR AS ESCOLHAS & DELIBERAR SOBRE OS FATOS</span>
              </div>
              <span class="seta-continuar">➔</span>
            </button>
          </div>"""

if antigo_despacho_html in html_norm:
    html_norm = html_norm.replace(antigo_despacho_html, novo_despacho_html, 1)
    print('index.html: Botão de despacho substituído!')
else:
    print('AVISO: antigo_despacho_html nao encontrado em index.html')

if '\r\n' in html:
    html_final = html_norm.replace('\n', '\r\n')
else:
    html_final = html_norm

with open(CAMINHO_HTML, 'w', encoding='utf-8') as f:
    f.write(html_final)
print('index.html salvo com sucesso!')


# -----------------------------------------------------------------------------
# 2. ATUALIZAÇÃO DO RENDERER.JS (Tarja de Censura AI-5)
# -----------------------------------------------------------------------------
with open(CAMINHO_JS, 'r', encoding='utf-8') as f:
    js = f.read()

js_norm = js.replace('\r\n', '\n')

antigo_bloqueado_js = """        const itemBloqueado = document.createElement('div');
        itemBloqueado.className = 'cartao-decisao opcao-bloqueada';
        itemBloqueado.dataset.opcaoId = opcao.id;

        itemBloqueado.innerHTML = `
          <div class="tarja-censura-faixa">BLOQUEADO</div>
          <div class="decisao-topo">
            <span class="decisao-numero">${numRomano}</span>
            <span class="decisao-rotulo">${opcao.rotulo}</span>
            <span class="etiqueta-custo">[BLOQUEADO]</span>
          </div>
          ${opcao.descricao ? `<div class="decisao-descricao">${opcao.descricao}</div>` : ''}
          <div class="decisao-requisitos">
            ${requisitosHtml}
          </div>
          ${efeitosHtml ? `<div class="decisao-efeitos">${efeitosHtml}</div>` : ''}
        `;"""

novo_bloqueado_js = """        const itemBloqueado = document.createElement('div');
        itemBloqueado.className = 'cartao-decisao opcao-bloqueada';
        itemBloqueado.dataset.opcaoId = opcao.id;

        itemBloqueado.innerHTML = `
          <div class="tarja-censura-ai5">
            <span class="carimbo-censura-dcdp">[ CENSURADO // LEI DE IMPRENSA • AI-5 ]</span>
          </div>
          <div class="decisao-topo">
            <span class="decisao-numero">${numRomano}</span>
            <span class="decisao-rotulo">${opcao.rotulo}</span>
            <span class="etiqueta-custo">[VETADO PELA CENSURA]</span>
          </div>
          ${opcao.descricao ? `<div class="decisao-descricao rasurada-nanquim">${opcao.descricao}</div>` : ''}
          <div class="decisao-requisitos">
            ${requisitosHtml}
          </div>
          ${efeitosHtml ? `<div class="decisao-efeitos">${efeitosHtml}</div>` : ''}
        `;"""

if antigo_bloqueado_js in js_norm:
    js_norm = js_norm.replace(antigo_bloqueado_js, novo_bloqueado_js, 1)
    if '\r\n' in js:
        js_final = js_norm.replace('\n', '\r\n')
    else:
        js_final = js_norm
    with open(CAMINHO_JS, 'w', encoding='utf-8') as f:
        f.write(js_final)
    print('renderer.js atualizado com tarja de censura AI-5!')
else:
    print('AVISO: antigo_bloqueado_js nao encontrado em renderer.js')


# -----------------------------------------------------------------------------
# 3. ATUALIZAÇÃO DO STYLE.CSS (Estilos Kardex, Despacho e Tarja de Censura)
# -----------------------------------------------------------------------------
with open(CAMINHO_CSS, 'r', encoding='utf-8') as f:
    css = f.read()

css_norm = css.replace('\r\n', '\n')

# 3.1 Substituição das Abas de Atalho Kardex
antigo_atalhos_css = """.barra-atalhos-dossie {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex-shrink: 0;
}

.btn-atalho-pasta {
  background-color: #D8CEB8;
  border: 2px solid #A69880;
  border-bottom: 4px solid #7A6D58;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: all 0.12s ease;
  box-shadow: 0 4px 10px rgba(28, 20, 12, 0.3);
}

.btn-atalho-pasta:hover {
  background-color: #E6DDD0;
  border-color: #7D705B;
  transform: translateY(-2px);
}

.btn-atalho-pasta.ativo {
  background-color: var(--cor-papel-principal);
  border-color: var(--cor-tinta-principal);
  border-top: 4px solid var(--cor-carimbo-vermelho);
  border-bottom: 2px solid var(--cor-tinta-principal);
  box-shadow: 0 6px 14px rgba(28, 20, 12, 0.45);
}

.atalho-icone {
  font-size: 22px;
  color: var(--cor-carimbo-vermelho);
  line-height: 1;
  flex-shrink: 0;
}

.atalho-textos {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
}"""

novo_atalhos_css = """/* ==========================================================================
   GUIAS DE FICHÁRIO KARDEX SUSPENSAS (TICKET 22)
   ========================================================================== */
.barra-atalhos-dossie {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  flex-shrink: 0;
  position: relative;
  padding-top: 4px;
}

.btn-atalho-pasta {
  background-color: #D4C9B2;
  background-image: 
    linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(110, 95, 70, 0.08) 100%),
    var(--textura-papel-grao);
  background-size: 100% 100%, 256px 256px;
  border: 1px solid #9C8E78;
  border-bottom: 3px solid #6B5E4A;
  padding: 8px 12px 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: all 0.15s ease;
  box-shadow: 0 3px 8px rgba(20, 15, 10, 0.35);
  overflow: visible;
}

/* Visor saliente de celuloide amarelado da guia Kardex */
.visor-celuloide-aba {
  position: absolute;
  top: -4px;
  left: 10px;
  right: 10px;
  height: 5px;
  background: linear-gradient(180deg, rgba(240, 230, 200, 0.6) 0%, rgba(190, 170, 130, 0.3) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(110, 90, 60, 0.3);
  pointer-events: none;
}

.btn-atalho-pasta:hover {
  background-color: #E2D7C0;
  border-color: #7D6E58;
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(20, 15, 10, 0.45);
}

/* Aba Kardex Ativa (Conexão direta ao visor de inspeção) */
.btn-atalho-pasta.ativo {
  background-color: var(--cor-papel-principal);
  border-color: var(--cor-tinta-principal);
  border-top: 4px solid var(--cor-carimbo-vermelho);
  border-bottom: 1px solid transparent;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(18, 12, 6, 0.5);
  z-index: 5;
}

.atalho-icone {
  font-size: 20px;
  color: var(--cor-carimbo-vermelho);
  line-height: 1;
  flex-shrink: 0;
}

.atalho-textos {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
}"""

if antigo_atalhos_css in css_norm:
    css_norm = css_norm.replace(antigo_atalhos_css, novo_atalhos_css, 1)
    print('style.css: Abas Kardex substituídas!')
else:
    print('AVISO: antigo_atalhos_css nao encontrado em style.css')

# 3.2 Substituição da Ordem de Despacho
antigo_despacho_css = """.btn-continuar-decisao {
  width: 100%;
  background-color: #2E2720;
  color: #F0EAE1;
  border: 2px solid #5A4C3C;
  border-bottom: 4px solid var(--cor-carimbo-vermelho);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--fonte-datilografada);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(28, 20, 12, 0.35);
  transition: all 0.15s ease-in-out;
}

.btn-continuar-decisao:hover {
  background-color: #3F352B;
  border-color: #8C7760;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(28, 20, 12, 0.45);
}

.btn-continuar-decisao:active {
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(28, 20, 12, 0.25);
}

.btn-continuar-decisao .seta-continuar {
  font-size: 18px;
  color: #E2CFA9;
  transition: transform 0.15s ease;
}

.btn-continuar-decisao:hover .seta-continuar {
  transform: translateX(4px);
  color: #F0EAE1;
}"""

novo_despacho_css = """/* ==========================================================================
   ORDEM DE DESPACHO ANEXA AO TEXTO (TICKET 22)
   ========================================================================== */
.btn-continuar-decisao {
  width: 100%;
  background: 
    linear-gradient(180deg, #2A241E 0%, #1D1814 100%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 2px, transparent 2px, transparent 12px);
  color: #F4EFE6;
  border: 2px solid #5A4C3C;
  border-left: 6px solid var(--cor-carimbo-vermelho);
  padding: 14px 22px 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(18, 12, 6, 0.45);
  transition: all 0.15s ease-in-out;
}

/* Fita adesiva gomada ressecada fixando o despacho ao rodapé */
.fita-despacho-adesiva {
  position: absolute;
  top: -8px;
  left: 36px;
  width: 58px;
  height: 16px;
  background-color: var(--cor-fita-adesiva);
  border-left: 1px dashed rgba(160, 140, 90, 0.4);
  border-right: 1px dashed rgba(160, 140, 90, 0.4);
  box-shadow: 0 1px 3px rgba(20, 15, 10, 0.3);
  transform: rotate(-1.5deg);
  pointer-events: none;
}

.despacho-textos {
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
}

.despacho-carimbo-titulo {
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #E26860;
  text-transform: uppercase;
}

.despacho-chamada {
  font-family: var(--fonte-editorial);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #F8F5EE;
}

.btn-continuar-decisao:hover {
  background: linear-gradient(180deg, #383028 0%, #25201A 100%);
  border-color: #8C7760;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(18, 12, 6, 0.55);
}

.btn-continuar-decisao:active {
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(18, 12, 6, 0.35);
}

.btn-continuar-decisao .seta-continuar {
  font-size: 20px;
  color: #E8D5B0;
  transition: transform 0.15s ease;
}

.btn-continuar-decisao:hover .seta-continuar {
  transform: translateX(4px);
  color: #FFFFFF;
}"""

if antigo_despacho_css in css_norm:
    css_norm = css_norm.replace(antigo_despacho_css, novo_despacho_css, 1)
    print('style.css: Ordem de despacho substituída!')
else:
    print('AVISO: antigo_despacho_css nao encontrado em style.css')

# 3.3 Substituição dos Cartões de Decisão e Tarja de Censura AI-5
antigo_decisao_css = """.cartao-decisao {
  display: block;
  width: 100%;
  text-align: left;
  background-color: #E2D9C8;
  background-image: var(--textura-papel-grao);
  background-size: 256px 256px;
  box-shadow: 0 2px 6px rgba(28, 20, 12, 0.12), inset 0 0 15px rgba(130, 105, 70, 0.08);
  border: 1px solid #BFB29B;
  padding: 18px 22px;
  position: relative;
  font-family: var(--fonte-editorial);
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
}

.cartao-decisao.opcao-disponivel:hover {
  background-color: #D8CEB8;
  border-color: #82765F;
  box-shadow: 3px 4px 0px rgba(30, 25, 20, 0.16);
  transform: translateY(-1px);
}

.cartao-decisao.opcao-disponivel:active {
  transform: translateY(1px);
  box-shadow: none;
}"""

novo_decisao_css = """.cartao-decisao {
  display: block;
  width: 100%;
  text-align: left;
  background-color: #E2D9C8;
  background-image: var(--textura-papel-grao);
  background-size: 256px 256px;
  box-shadow: 0 3px 8px rgba(24, 18, 12, 0.18), inset 0 0 20px rgba(120, 95, 60, 0.08);
  border: 1px solid #B5A790;
  /* Borda de micro-perfurador telex/despacho */
  border-left: 5px solid #827258;
  padding: 18px 24px;
  position: relative;
  font-family: var(--fonte-editorial);
  cursor: pointer;
  transition: all 0.12s ease-in-out;
  overflow: hidden;
}

.cartao-decisao.opcao-disponivel:hover {
  background-color: #D6CBB4;
  border-color: #6E614A;
  border-left-color: var(--cor-carimbo-vermelho);
  box-shadow: 0 5px 14px rgba(24, 18, 12, 0.28);
  transform: translateY(-1px);
}

.cartao-decisao.opcao-disponivel:active {
  transform: translateY(1px);
  box-shadow: 0 1px 4px rgba(24, 18, 12, 0.2);
}"""

if antigo_decisao_css in css_norm:
    css_norm = css_norm.replace(antigo_decisao_css, novo_decisao_css, 1)
    print('style.css: Cartão de decisão substituído!')
else:
    print('AVISO: antigo_decisao_css nao encontrado em style.css')

# 3.4 Substituição da Tarja de Censura
antigo_censura_css = """.cartao-decisao.opcao-bloqueada {
  background-color: #D5CBB8;
  border: 1px solid #A89C83;
  opacity: 0.78;
  cursor: not-allowed;
  position: relative;
  overflow: hidden;
}

.tarja-censura-faixa {
  position: absolute;
  top: 14px;
  right: -25px;
  background-color: var(--cor-carimbo-vermelho);
  color: #F0EAE1;
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1.5px;
  padding: 4px 35px;
  transform: rotate(14deg);
  box-shadow: 0 2px 4px rgba(25, 20, 15, 0.35);
  z-index: 5;
}

.cartao-decisao.opcao-bloqueada .decisao-rotulo {
  color: #635C50;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: #1E1D1B;
}"""

novo_censura_css = """/* ==========================================================================
   TARJA DE CENSURA DA POLÍCIA FEDERAL / AI-5 (TICKET 22)
   ========================================================================== */
.cartao-decisao.opcao-bloqueada {
  background-color: #CEBFAB;
  border: 1px solid #948772;
  border-left: 5px solid #1C1916;
  opacity: 0.88;
  cursor: not-allowed;
  position: relative;
  overflow: hidden;
}

/* Tarja densa de tinta nanquim/alcatrão preto passada à trincha */
.tarja-censura-ai5 {
  position: absolute;
  top: 12px;
  right: -10px;
  background-color: #161412;
  border-left: 3px solid var(--cor-carimbo-vermelho);
  border-right: 3px solid var(--cor-carimbo-vermelho);
  padding: 4px 24px;
  transform: rotate(3deg);
  box-shadow: 0 3px 8px rgba(10, 8, 6, 0.75);
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carimbo-censura-dcdp {
  color: #E24840;
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.cartao-decisao.opcao-bloqueada .decisao-rotulo {
  color: #574F44;
  text-decoration: line-through;
  text-decoration-thickness: 2.5px;
  text-decoration-color: #1A1816;
}

.decisao-descricao.rasurada-nanquim {
  color: #635A4E;
  opacity: 0.82;
}"""

if antigo_censura_css in css_norm:
    css_norm = css_norm.replace(antigo_censura_css, novo_censura_css, 1)
    print('style.css: Tarja de censura AI-5 substituída!')
else:
    print('AVISO: antigo_censura_css nao encontrado em style.css')

if '\r\n' in css:
    css_final = css_norm.replace('\n', '\r\n')
else:
    css_final = css_norm

with open(CAMINHO_CSS, 'w', encoding='utf-8') as f:
    f.write(css_final)
print('style.css salvo com sucesso!')

