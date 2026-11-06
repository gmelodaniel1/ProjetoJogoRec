# -*- coding: utf-8 -*-
import os

CAMINHO_CSS = 'style.css'

with open(CAMINHO_CSS, 'r', encoding='utf-8') as f:
    css = f.read()

css_norm = css.replace('\r\n', '\n')

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

.dado-cheia-linha.status-panico .valor {
  color: #E06C68;
  font-weight: bold;
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

.dado-cheia-linha.status-panico .valor {
  color: #E25852;
}"""

if antigo_cheia_css in css_norm:
    css_norm = css_norm.replace(antigo_cheia_css, novo_cheia_css, 1)
    if '\r\n' in css:
        css_final = css_norm.replace('\n', '\r\n')
    else:
        css_final = css_norm
    with open(CAMINHO_CSS, 'w', encoding='utf-8') as f:
        f.write(css_final)
    print('style.css atualizado com nova régua da cheia!')
else:
    print('ERRO: antigo_cheia_css nao encontrado em style.css')

