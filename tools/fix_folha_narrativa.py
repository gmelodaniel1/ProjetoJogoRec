# -*- coding: utf-8 -*-
import os

CAMINHO_CSS = 'style.css'

with open(CAMINHO_CSS, 'r', encoding='utf-8') as f:
    css = f.read()

css_norm = css.replace('\r\n', '\n')

antigo_bloco = """.folha-narrativa {
  width: 100%;
  background-color: var(--cor-papel-principal);
  background-image: 
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(125, 100, 68, 0.08) 100%),
    var(--textura-papel-grao);
  background-repeat: no-repeat, repeat;
  background-size: 100% 100%, 256px 256px;
  border: 1px solid #C9BDA8;
  outline: 1px solid rgba(170, 150, 120, 0.22);
  outline-offset: -3px;
  box-shadow: 
    0 12px 32px rgba(28, 20, 12, 0.5), 
    0 0 2px rgba(28, 20, 12, 0.35),
    inset 0 0 40px rgba(130, 105, 70, 0.12),
    inset 0 0 3px rgba(90, 70, 45, 0.2);
  padding: 38px 46px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: fit-content;
  min-height: 100%;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.folha-narrativa.folha-transicao {
  opacity: 0.25;
  transform: translateY(4px);
}"""

novo_bloco = """.folha-narrativa {
  width: 100%;
  background-color: var(--cor-papel-principal);
  background-image: 
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(125, 100, 68, 0.08) 100%),
    var(--textura-papel-grao);
  background-repeat: no-repeat, repeat;
  background-size: 100% 100%, 256px 256px;
  border: 1px solid #C9BDA8;
  outline: 1px solid rgba(170, 150, 120, 0.22);
  outline-offset: -3px;
  box-shadow: 
    3px 14px 34px rgba(22, 14, 8, 0.52), 
    0 1px 3px rgba(22, 14, 8, 0.38),
    inset 0 0 40px rgba(130, 105, 70, 0.12),
    inset 0 0 3px rgba(90, 70, 45, 0.2);
  padding: 38px 46px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: fit-content;
  min-height: 100%;
  transform: rotate(0.35deg);
  transform-origin: 50% 120px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.folha-narrativa.folha-transicao {
  opacity: 0.25;
  transform: rotate(0.35deg) translateY(4px);
}

/* Grampo metálico oxidado com migração de ferrugem na celulose (Ticket 19) */
.grampo-papel-oxidado {
  position: absolute;
  top: 12px;
  left: 16px;
  width: 28px;
  height: 14px;
  z-index: 18;
  pointer-events: none;
  transform: rotate(-3deg);
}

.halo-ferrugem-papel {
  position: absolute;
  top: -6px;
  left: -8px;
  width: 44px;
  height: 26px;
  background: radial-gradient(ellipse at center, rgba(165, 84, 38, 0.42) 0%, rgba(165, 84, 38, 0.16) 55%, transparent 75%);
  mix-blend-mode: multiply;
  filter: blur(1.5px);
}

.arame-grampo-metal {
  position: absolute;
  top: 4px;
  left: 3px;
  width: 22px;
  height: 5px;
  background: linear-gradient(180deg, #6B5B4E 0%, #3D332A 60%, #524338 100%);
  border: 1px solid #29221C;
  box-shadow: 1px 2px 3px rgba(18, 12, 6, 0.45);
}

.arame-grampo-metal::before,
.arame-grampo-metal::after {
  content: "";
  position: absolute;
  top: -1px;
  width: 2px;
  height: 7px;
  background-color: #1A140E;
}

.arame-grampo-metal::before {
  left: -2px;
}

.arame-grampo-metal::after {
  right: -2px;
}"""

if antigo_bloco in css_norm:
    css_norm = css_norm.replace(antigo_bloco, novo_bloco, 1)
    if '\r\n' in css:
        css_final = css_norm.replace('\n', '\r\n')
    else:
        css_final = css_norm
    with open(CAMINHO_CSS, 'w', encoding='utf-8') as f:
        f.write(css_final)
    print('style.css atualizado com sucesso no bloco da folha-narrativa!')
else:
    print('ERRO: antigo_bloco nao encontrado em style.css')

