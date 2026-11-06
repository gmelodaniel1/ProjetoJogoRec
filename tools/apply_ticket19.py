# -*- coding: utf-8 -*-
"""
Script de aplicação das melhorias do Ticket 19:
Mesa de Trabalho Viva e Texturas Orgânicas (Jogo Recife 1958-1975)
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

# Inserção dos adereços de mesa dentro de <main class="mesa-investigacao">
target_main = '<main class="mesa-investigacao">'
snippet_aderecos = """<main class="mesa-investigacao">
      <!-- ADEREÇOS DIEGÉTICOS DE MESA VIVA (TICKET 19) -->
      <!-- Halo de fundo de xícara de café frio interceptando a folha e a madeira -->
      <div class="adereco-mesa adereco-mancha-cafe" aria-hidden="true" title="Marca circular de café frio">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="75" cy="75" r="58" stroke="#3A1E0E" stroke-width="2.4" stroke-opacity="0.32" fill="none" stroke-dasharray="14 1 30 2 18 1"/>
          <circle cx="75" cy="75" r="56.5" stroke="#5C3218" stroke-width="4.2" stroke-opacity="0.18" fill="rgba(88, 48, 22, 0.05)"/>
          <circle cx="74" cy="76" r="53" stroke="#754322" stroke-width="1.2" stroke-opacity="0.12" fill="none"/>
          <ellipse cx="122" cy="56" rx="4" ry="2.2" fill="#5C3218" fill-opacity="0.22" transform="rotate(20 122 56)"/>
          <circle cx="32" cy="94" r="2" fill="#3A1E0E" fill-opacity="0.2"/>
          <circle cx="88" cy="132" r="2.4" fill="#5C3218" fill-opacity="0.22"/>
        </svg>
      </div>

      <!-- Clipe metálico avulso caído na madeira da mesa -->
      <div class="adereco-mesa adereco-clipe-solto" aria-hidden="true" title="Clipe metálico avulso na bancada">
        <svg width="26" height="50" viewBox="0 0 26 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 16 V40 C7 44 12 47 16 44 C20 41 20 36 20 31 V9 C20 3.5 12 3.5 12 9 V33 C12 36 15 37.5 17 36 C19 34.5 19 31.5 19 28 V16" stroke="#2B2825" stroke-width="2.8" stroke-linecap="round" fill="none" filter="drop-shadow(1px 2px 2px rgba(10,8,6,0.65))"/>
          <path d="M7 16 V40 C7 44 12 47 16 44 C20 41 20 36 20 31 V9 C20 3.5 12 3.5 12 9 V33" stroke="#9EAAAF" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        </svg>
      </div>"""

# Inserção do grampo oxidado dentro de <article class="folha-narrativa">
target_folha = '<article class="folha-narrativa">'
snippet_grampo = """<article class="folha-narrativa">
          <!-- GRAMPO METÁLICO OXIDADO COM MIGRAÇÃO DE FERRUGEM (TICKET 19) -->
          <div class="grampo-papel-oxidado" aria-hidden="true" title="Grampo de arquivo com halo de ferrugem">
            <div class="halo-ferrugem-papel"></div>
            <div class="arame-grampo-metal"></div>
          </div>"""

if target_main in html_norm and 'adereco-mancha-cafe' not in html_norm:
    html_norm = html_norm.replace(target_main, snippet_aderecos, 1)

if target_folha in html_norm and 'grampo-papel-oxidado' not in html_norm:
    html_norm = html_norm.replace(target_folha, snippet_grampo, 1)

if '\r\n' in html:
    html_final = html_norm.replace('\n', '\r\n')
else:
    html_final = html_norm

with open(CAMINHO_HTML, 'w', encoding='utf-8') as f:
    f.write(html_final)
print('index.html atualizado com sucesso!')


# -----------------------------------------------------------------------------
# 2. ATUALIZAÇÃO DO STYLE.CSS
# -----------------------------------------------------------------------------
with open(CAMINHO_CSS, 'r', encoding='utf-8') as f:
    css = f.read()

css_norm = css.replace('\r\n', '\n')

# 2.1 Substituir .mesa-viewport pelo novo cone de iluminação e penumbra
antigo_mesa_viewport = """.mesa-viewport {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 12px 20px 18px 20px;
  background: 
    radial-gradient(ellipse at 45% 35%, var(--cor-mesa-iluminada) 0%, var(--cor-fundo-mesa) 62%, var(--cor-mesa-borda) 100%),
    repeating-linear-gradient(90deg, rgba(30, 22, 14, 0.04) 0px, rgba(30, 22, 14, 0.04) 2px, transparent 2px, transparent 10px);
}"""

novo_mesa_viewport = """.mesa-viewport {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 12px 20px 18px 20px;
  position: relative;
  overflow: hidden;
  background: 
    /* Cone focal de iluminação da luminária de leitura (Ticket 19) */
    radial-gradient(ellipse 75% 65% at 52% 42%, rgba(255, 246, 224, 0.13) 0%, rgba(220, 195, 155, 0.05) 50%, transparent 72%),
    /* Penumbra periférica densa das bordas da bancada */
    radial-gradient(ellipse 110% 95% at 50% 50%, transparent 58%, rgba(26, 18, 12, 0.45) 82%, rgba(14, 10, 6, 0.82) 100%),
    /* Tampo de madeira encerada com veio */
    radial-gradient(ellipse at 45% 35%, var(--cor-mesa-iluminada) 0%, var(--cor-fundo-mesa) 62%, var(--cor-mesa-borda) 100%),
    repeating-linear-gradient(90deg, rgba(30, 22, 14, 0.04) 0px, rgba(30, 22, 14, 0.04) 2px, transparent 2px, transparent 10px);
}

/* Micro-oscilação analógica de voltagem (flicker de filamento incandescente) */
@keyframes flickerVoltagemMesa {
  0%, 100% { filter: brightness(1); }
  42% { filter: brightness(0.97); }
  43% { filter: brightness(1.015); }
  44% { filter: brightness(0.955); }
  45% { filter: brightness(1); }
  78% { filter: brightness(0.975); }
  79% { filter: brightness(1); }
}

body.em-crise-urgente .mesa-viewport,
body.fase-3 .mesa-viewport {
  animation: flickerVoltagemMesa 14s infinite ease-in-out;
}"""

if antigo_mesa_viewport in css_norm:
    css_norm = css_norm.replace(antigo_mesa_viewport, novo_mesa_viewport, 1)

# 2.2 Atualizar .mesa-investigacao e adereços de mesa
antigo_mesa_investigacao = """.mesa-investigacao {
  flex: 1;
  display: flex;
  gap: 24px;
  min-height: 0;
  align-items: stretch;
}"""

novo_mesa_investigacao = """.mesa-investigacao {
  flex: 1;
  display: flex;
  gap: 24px;
  min-height: 0;
  align-items: stretch;
  position: relative;
}

/* ==========================================================================
   ADEREÇOS DIEGÉTICOS DE MESA VIVA (TICKET 19)
   ========================================================================== */
.adereco-mesa {
  position: absolute;
  pointer-events: none;
}

/* Halo de xícara de café frio com borda capilar e respingos secos */
.adereco-mancha-cafe {
  bottom: -4px;
  right: 14px;
  width: 150px;
  height: 150px;
  mix-blend-mode: multiply;
  transform: rotate(18deg);
  opacity: 0.88;
  z-index: 2;
}

.adereco-mancha-cafe svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Clipe metálico avulso caído na bancada de madeira */
.adereco-clipe-solto {
  bottom: 10px;
  left: calc(54% - 24px);
  width: 26px;
  height: 50px;
  transform: rotate(-24deg);
  opacity: 0.92;
  z-index: 8;
}

.adereco-clipe-solto svg {
  width: 100%;
  height: 100%;
  display: block;
}"""

if antigo_mesa_investigacao in css_norm:
    css_norm = css_norm.replace(antigo_mesa_investigacao, novo_mesa_investigacao, 1)

# 2.3 Atualizar .palco-central com micro-rotação
antigo_palco_central = """.palco-central {
  flex: 1.18;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  min-height: 0;
}"""

novo_palco_central = """.palco-central {
  flex: 1.18;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  min-height: 0;
  transform: rotate(-0.15deg);
  transform-origin: 50% 120px;
  transition: transform 0.25s ease;
}"""

if antigo_palco_central in css_norm:
    css_norm = css_norm.replace(antigo_palco_central, novo_palco_central, 1)

# 2.4 Atualizar .folha-narrativa com rotação, sombras de descolamento e o grampo oxidado
antigo_folha_narrativa = """.folha-narrativa {
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
  display: flex;
  flex-direction: column;
  padding: 30px 42px 28px 42px;
  min-height: 0;
  height: 100%;
  position: relative;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.folha-narrativa.folha-transicao {
  opacity: 0.25;
  transform: translateY(4px);
}"""

novo_folha_narrativa = """.folha-narrativa {
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
  display: flex;
  flex-direction: column;
  padding: 30px 42px 28px 42px;
  min-height: 0;
  height: 100%;
  position: relative;
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

if antigo_folha_narrativa in css_norm:
    css_norm = css_norm.replace(antigo_folha_narrativa, novo_folha_narrativa, 1)

# 2.5 Atualizar tipografia editorial de linotipo em .corpo-narrativa p
antigo_corpo_p = """.corpo-narrativa p {
  font-family: var(--fonte-editorial);
  font-size: 22px;
  line-height: 1.75;
  color: #1A1917;
  margin-bottom: 22px;
  text-align: left;
}"""

novo_corpo_p = """.corpo-narrativa p {
  font-family: var(--fonte-editorial);
  font-size: 22px;
  line-height: 1.70;
  color: #1A1917;
  margin-bottom: 18px;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  text-indent: 1.5em;
}

.corpo-narrativa p:first-of-type {
  text-indent: 0;
}"""

if antigo_corpo_p in css_norm:
    css_norm = css_norm.replace(antigo_corpo_p, novo_corpo_p, 1)

if '\r\n' in css:
    css_final = css_norm.replace('\n', '\r\n')
else:
    css_final = css_norm

with open(CAMINHO_CSS, 'w', encoding='utf-8') as f:
    f.write(css_final)
print('style.css atualizado com sucesso!')

