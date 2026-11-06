/**
 * Águas de Ferro — Módulo Gerador Procedural de Xilogravura & Darkest Dungeon (Ticket 30)
 * 
 * Gera silhuetas vetoriais em SVG imitando a técnica de matriz de madeira entalhada (xilogravura nordestina / cordel)
 * combinada com o chiaroscuro dramático e sombras pesadas de nanquim (estilo Darkest Dungeon).
 * Cada personagem é estruturado como um recorte físico de papel (Paper Mario) com margem marfim e sombra de relevo.
 */

// Paleta Canônica de Xilogravura & Papel
const CORES_XILO = {
  nanquim: '#0E0C0A',          // Preto de fumo / nanquim denso
  nanquimSombra: '#1A1612',    // Sombra profunda secundária
  entalheBranco: '#F8F5EE',    // Papel marfim cru revelado pelo corte da goiva
  entalheSutil: '#E2D5BA',     // Papel envelhecido para meios-tons
  urucum: '#8A2522',           // Vermelho-ferrugem de destaque (sindicato / DOPS)
  brasaAmbar: '#C97D28'        // Fagulha nos olhos em momentos de tensão
};

/**
 * Gera o SVG do Mestre Severino (Pai / Operário Ferroviário)
 * Fisionomia: Boné de maquinista/ferroviário, queixo quadrado e forte, bigode espesso,
 * cicatriz de oficina na bochecha, olhos mergulhados na sombra pesada da aba do boné.
 */
function gerarSvgSeverino(opcoes = {}) {
  const { expressao = 'grave', largura = 320, altura = 360 } = opcoes;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" width="${largura}" height="${altura}" class="xilogravura-svg-recorte" role="img" aria-label="Xilogravura de Mestre Severino">
      <defs>
        <!-- Filtro de textura de madeira entalhada -->
        <filter id="textura-madeira-xilo" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.15" numOctaves="2" result="ruidoMadeira"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" in="ruidoMadeira" result="ruidoOpaco"/>
          <feComposite in="SourceGraphic" in2="ruidoOpaco" operator="atop"/>
        </filter>

        <!-- Contorno de recorte de papel cartão (Paper Mario) -->
        <filter id="borda-papel-recorte" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#0E0C0A" flood-opacity="0.65"/>
        </filter>
      </defs>

      <!-- Grupo com silhueta base e contorno de papel cartão cru -->
      <g filter="url(#borda-papel-recorte)">
        
        <!-- BORDA EXTERNA DE CORTE DE PAPEL MARFIM (PAPER MARIO) -->
        <path d="M 65 350 L 50 250 L 70 190 L 85 145 L 80 110 L 115 65 L 170 50 L 235 60 L 260 95 L 255 130 L 268 185 L 285 245 L 270 350 Z" 
              fill="${CORES_XILO.entalheBranco}" stroke="${CORES_XILO.entalheBranco}" stroke-width="12" stroke-linejoin="bevel" stroke-linecap="square"/>
        
        <!-- CORPO PRINCIPAL EM NANQUIM MACIÇO (ESTILO DARKEST DUNGEON) -->
        <path d="M 65 350 L 50 250 L 70 190 L 85 145 L 80 110 L 115 65 L 170 50 L 235 60 L 260 95 L 255 130 L 268 185 L 285 245 L 270 350 Z" 
              fill="${CORES_XILO.nanquim}" filter="url(#textura-madeira-xilo)"/>

        <!-- BONÉ DE MAQUINISTA / FERROVIÁRIO (CORTES DE GOIVA) -->
        <!-- Copa do Boné -->
        <path d="M 115 65 Q 170 45 235 60 Q 255 85 250 105 L 95 105 Z" fill="${CORES_XILO.nanquim}"/>
        <path d="M 125 72 Q 170 58 225 68" stroke="${CORES_XILO.entalheBranco}" stroke-width="3" fill="none"/>
        <path d="M 135 82 Q 170 70 215 78" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5" fill="none"/>
        
        <!-- Aba Rígida do Boné (Projeta sombra maciça sobre os olhos) -->
        <path d="M 85 105 L 260 102 L 250 120 L 92 120 Z" fill="${CORES_XILO.entalheBranco}"/>
        <path d="M 90 108 L 255 105 L 246 117 L 96 117 Z" fill="${CORES_XILO.nanquim}"/>

        <!-- ROSTO: SOMBRA MACIÇA DARKEST DUNGEON (OLHOS MERGULHADOS NA ESCURIDÃO) -->
        <rect x="95" y="118" width="150" height="42" fill="${CORES_XILO.nanquim}" class="xilo-sombra-olhos"/>
        
        <!-- Fagulha sutil de reflexo ou corte de pupila oculta -->
        <circle cx="140" cy="132" r="1.8" fill="${expressao === 'tenso' ? CORES_XILO.brasaAmbar : CORES_XILO.entalheBranco}"/>
        <circle cx="200" cy="132" r="1.8" fill="${expressao === 'tenso' ? CORES_XILO.brasaAmbar : CORES_XILO.entalheBranco}"/>

        <!-- NARIZ ANGULAR ENTALHADO NA MADEIRA -->
        <polygon points="170,122 178,162 162,164" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="172,126 176,160 165,162" fill="${CORES_XILO.nanquim}"/>

        <!-- MAÇÃS DO ROSTO & HACHURAS DE GOIVA -->
        <line x1="108" y1="135" x2="128" y2="152" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>
        <line x1="112" y1="145" x2="132" y2="162" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>
        <line x1="232" y1="135" x2="212" y2="152" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>
        <line x1="228" y1="145" x2="208" y2="162" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>

        <!-- BIGODE ESPESSO DE FERROVIÁRIO (TRAÇOS MARCANTES DE XILO) -->
        <path d="M 140 178 Q 170 170 200 178 Q 215 195 195 200 Q 170 186 145 200 Q 125 195 140 178 Z" fill="${CORES_XILO.entalheBranco}"/>
        <!-- Ranhuras do Bigode -->
        <line x1="150" y1="184" x2="158" y2="194" stroke="${CORES_XILO.nanquim}" stroke-width="1.8"/>
        <line x1="162" y1="182" x2="168" y2="194" stroke="${CORES_XILO.nanquim}" stroke-width="1.8"/>
        <line x1="178" y1="182" x2="172" y2="194" stroke="${CORES_XILO.nanquim}" stroke-width="1.8"/>
        <line x1="190" y1="184" x2="182" y2="194" stroke="${CORES_XILO.nanquim}" stroke-width="1.8"/>

        <!-- QUEIXO QUADRADO & MANDÍBULA PESADA -->
        <path d="M 135 208 L 205 208 L 195 235 L 145 235 Z" fill="${CORES_XILO.entalheBranco}"/>
        <path d="M 138 211 L 202 211 L 192 232 L 148 232 Z" fill="${CORES_XILO.nanquim}"/>
        <line x1="155" y1="225" x2="185" y2="225" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>

        <!-- GOLA DE MACACÃO DE OPERÁRIO / CASACO DE LINHO GROSSO -->
        <polygon points="120,240 170,270 100,320" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="124,244 166,268 106,314" fill="${CORES_XILO.nanquim}"/>
        
        <polygon points="220,240 170,270 240,320" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="216,244 174,268 234,314" fill="${CORES_XILO.nanquim}"/>

        <!-- HACHURAS DE OMBRO E TECIDO RÚSTICO -->
        <line x1="75" y1="270" x2="95" y2="285" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>
        <line x1="70" y1="290" x2="90" y2="305" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>
        <line x1="68" y1="310" x2="88" y2="325" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>

        <line x1="245" y1="270" x2="225" y2="285" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>
        <line x1="250" y1="290" x2="230" y2="305" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>
        <line x1="252" y1="310" x2="232" y2="325" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>

        <!-- SELO DE GRAVURA MANUAL (ASSINATURA DO TALHE) -->
        <rect x="255" y="320" width="22" height="22" fill="${CORES_XILO.urucum}"/>
        <text x="266" y="336" font-family="'Courier Prime', 'Special Elite', monospace" font-size="12" font-weight="bold" fill="${CORES_XILO.entalheBranco}" text-anchor="middle">S</text>
      </g>
    </svg>
  `.trim();
}

/**
 * Gera o SVG do Delegado do DOPS (Agente do Estado / Repressão)
 * Fisionomia: Quepe militar afiado, óculos escuros de aros grossos, maxilar rígido e engravatado.
 */
function gerarSvgDelegadoDops(opcoes = {}) {
  const { expressao = 'severo', largura = 320, altura = 360 } = opcoes;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" width="${largura}" height="${altura}" class="xilogravura-svg-recorte" role="img" aria-label="Xilogravura do Delegado do DOPS">
      <defs>
        <filter id="borda-papel-recorte-dops" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#0E0C0A" flood-opacity="0.75"/>
        </filter>
      </defs>

      <g filter="url(#borda-papel-recorte-dops)">
        <!-- BORDA EXTERNA DE RECORTE MARFIM -->
        <path d="M 60 350 L 55 240 L 75 180 L 80 135 L 70 95 L 110 50 L 165 40 L 220 50 L 260 95 L 250 135 L 255 180 L 275 240 L 270 350 Z" 
              fill="${CORES_XILO.entalheBranco}" stroke="${CORES_XILO.entalheBranco}" stroke-width="12" stroke-linejoin="bevel" stroke-linecap="square"/>

        <!-- SILHUETA BASE EM NANQUIM -->
        <path d="M 60 350 L 55 240 L 75 180 L 80 135 L 70 95 L 110 50 L 165 40 L 220 50 L 260 95 L 250 135 L 255 180 L 275 240 L 270 350 Z" 
              fill="${CORES_XILO.nanquim}"/>

        <!-- QUEPE MILITAR COM BRASÃO DOURADO/FERRUGEM -->
        <polygon points="105,55 165,42 225,55 245,95 85,95" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="110,58 165,46 220,58 238,92 92,92" fill="${CORES_XILO.nanquim}"/>
        <!-- Brasão do DOPS -->
        <polygon points="165,65 174,78 156,78" fill="${CORES_XILO.urucum}"/>

        <!-- ABA RÍGIDA DO QUEPE -->
        <polygon points="80,95 250,95 240,112 90,112" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="84,97 246,97 236,110 94,110" fill="${CORES_XILO.nanquim}"/>

        <!-- SOMBRA MACIÇA DARKEST DUNGEON & ÓCULOS ESCUROS -->
        <rect x="90" y="112" width="150" height="40" fill="${CORES_XILO.nanquim}" class="xilo-sombra-olhos"/>
        
        <!-- Armação dos Óculos Escuros de Época -->
        <rect x="115" y="122" width="38" height="24" fill="${CORES_XILO.entalheBranco}"/>
        <rect x="118" y="125" width="32" height="18" fill="${CORES_XILO.nanquim}"/>
        <line x1="120" y1="127" x2="135" y2="141" stroke="${CORES_XILO.entalheBranco}" stroke-width="1.8"/>

        <rect x="175" y="122" width="38" height="24" fill="${CORES_XILO.entalheBranco}"/>
        <rect x="178" y="125" width="32" height="18" fill="${CORES_XILO.nanquim}"/>
        <line x1="180" y1="127" x2="195" y2="141" stroke="${CORES_XILO.entalheBranco}" stroke-width="1.8"/>

        <rect x="153" y="130" width="22" height="5" fill="${CORES_XILO.entalheBranco}"/>

        <!-- NARIZ FINO & SEVERO -->
        <polygon points="165,145 170,175 160,175" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="166,148 169,173 162,173" fill="${CORES_XILO.nanquim}"/>

        <!-- BOCA CÍNICA / SEVERA -->
        <line x1="140" y1="192" x2="190" y2="190" stroke="${CORES_XILO.entalheBranco}" stroke-width="3"/>
        <line x1="150" y1="202" x2="180" y2="202" stroke="${CORES_XILO.entalheBranco}" stroke-width="1.8"/>

        <!-- COLARINHO DUPLO ENGRAVATADO -->
        <polygon points="165,225 150,280 180,280" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="165,230 154,276 176,276" fill="${CORES_XILO.nanquim}"/>
        <!-- Gravata Fina Anos 60 -->
        <polygon points="163,240 167,240 172,340 158,340" fill="${CORES_XILO.urucum}"/>

        <!-- LAPELAS DO TERNO POLICIAL -->
        <polygon points="120,225 90,320 145,280" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="122,230 94,316 142,282" fill="${CORES_XILO.nanquim}"/>
        <polygon points="210,225 240,320 185,280" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="208,230 236,316 188,282" fill="${CORES_XILO.nanquim}"/>

        <!-- CARIMBO POLICIAL DE ENQUADRAMENTO -->
        <rect x="250" y="318" width="26" height="26" fill="${CORES_XILO.nanquim}" stroke="${CORES_XILO.urucum}" stroke-width="2"/>
        <text x="263" y="336" font-family="'Courier Prime', 'Special Elite', monospace" font-size="11" font-weight="900" fill="${CORES_XILO.urucum}" text-anchor="middle">PE</text>
      </g>
    </svg>
  `.trim();
}

/**
 * Gera o SVG Genérico para Personagens sem arte customizada
 */
function gerarSvgGenerico(opcoes = {}) {
  const { nome = 'Cidadão do Recife', largura = 320, altura = 360 } = opcoes;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" width="${largura}" height="${altura}" class="xilogravura-svg-recorte" role="img" aria-label="Xilogravura de ${nome}">
      <defs>
        <filter id="borda-papel-recorte-gen" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#0E0C0A" flood-opacity="0.65"/>
        </filter>
      </defs>

      <g filter="url(#borda-papel-recorte-gen)">
        <path d="M 70 350 L 60 250 L 80 180 L 95 130 L 120 70 L 170 55 L 220 70 L 245 130 L 260 180 L 280 250 L 270 350 Z" 
              fill="${CORES_XILO.entalheBranco}" stroke="${CORES_XILO.entalheBranco}" stroke-width="12" stroke-linejoin="bevel" stroke-linecap="square"/>

        <path d="M 70 350 L 60 250 L 80 180 L 95 130 L 120 70 L 170 55 L 220 70 L 245 130 L 260 180 L 280 250 L 270 350 Z" 
              fill="${CORES_XILO.nanquim}"/>

        <!-- SOMBRA MACIÇA DE OLHOS DARKEST DUNGEON -->
        <rect x="100" y="115" width="140" height="40" fill="${CORES_XILO.nanquim}" class="xilo-sombra-olhos"/>
        <line x1="135" y1="130" x2="148" y2="130" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>
        <line x1="192" y1="130" x2="205" y2="130" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>

        <polygon points="170,125 176,165 164,165" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="171,128 174,163 166,163" fill="${CORES_XILO.nanquim}"/>

        <line x1="145" y1="190" x2="195" y2="190" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>

        <!-- Hachuras de Xilo Rústica -->
        <line x1="110" y1="210" x2="130" y2="230" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>
        <line x1="105" y1="230" x2="125" y2="250" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>
        <line x1="210" y1="210" x2="190" y2="230" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>
        <line x1="215" y1="230" x2="195" y2="250" stroke="${CORES_XILO.entalheBranco}" stroke-width="2"/>
      </g>
    </svg>
  `.trim();
}

/**
 * Ponto de entrada central do gerador procedural de xilogravura
 */
function gerarSvgPersonagemXilogravura(personagemId, opcoes = {}) {
  const idNormalizado = String(personagemId || '').toLowerCase().trim();

  switch (idNormalizado) {
    case 'severino':
    case 'mestre_severino':
    case 'pai':
      return gerarSvgSeverino(opcoes);

    case 'delegado':
    case 'delegado_dops':
    case 'dops':
    case 'policia':
    case 'soldado':
      return gerarSvgDelegadoDops(opcoes);

    default:
      return gerarSvgGenerico({ nome: personagemId, ...opcoes });
  }
}

// Suporte para exportação CommonJS (Node.js/Testes) e carregamento direto no Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gerarSvgPersonagemXilogravura,
    gerarSvgSeverino,
    gerarSvgDelegadoDops,
    gerarSvgGenerico,
    CORES_XILO
  };
} else if (typeof window !== 'undefined') {
  window.gerarSvgPersonagemXilogravura = gerarSvgPersonagemXilogravura;
  window.CORES_XILO = CORES_XILO;
}

