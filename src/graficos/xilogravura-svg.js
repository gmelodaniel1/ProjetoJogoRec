/**
 * Águas de Ferro — Módulo Gerador Procedural de Xilogravura & Darkest Dungeon (Ticket 30)
 * 
 * Gera silhuetas vetoriais em SVG imitando a técnica de matriz de madeira entalhada (xilogravura nordestina / cordel)
 * combinada com o chiaroscuro dramático e sombras pesadas de nanquim (estilo Darkest Dungeon).
 * Cada personagem é estruturado como um recorte físico de papel (Paper Mario) com margem marfim e sombra de relevo.
 * 
 * NOTA DE ARQUITETURA:
 * O gerador SVG funciona como fallback técnico limpo e representativo. Para ilustrações finais,
 * basta colocar os arquivos de imagem (PNG transparente, WebP ou SVG) na pasta `artes/personagens/`.
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
 * Gera o SVG do Mestre Severino (Pai / Operário Ferroviário) em Plano Médio Ampliado
 * Fisionomia: Boné de maquinista/ferroviário, ombros largos de operário, queixo duro e forte,
 * olhar mergulhado em sombra maciça de nanquim (Darkest Dungeon) e cortes limpos de goiva.
 */
function gerarSvgSeverino(opcoes = {}) {
  const { expressao = 'grave', largura = 500, altura = 650 } = opcoes;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="${largura}" height="${altura}" class="xilogravura-svg-recorte" role="img" aria-label="Xilogravura de Mestre Severino">
      <defs>
        <!-- Filtro de textura de fibra de madeira entalhada -->
        <filter id="textura-madeira-xilo" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.15" numOctaves="2" result="ruidoMadeira"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" in="ruidoMadeira" result="ruidoOpaco"/>
          <feComposite in="SourceGraphic" in2="ruidoOpaco" operator="atop"/>
        </filter>

        <!-- Filtro de relevo do papel recortado (Paper Mario) -->
        <filter id="borda-papel-recorte" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="4" dy="8" stdDeviation="8" flood-color="#0E0C0A" flood-opacity="0.75"/>
        </filter>
      </defs>

      <!-- Grupo com silhueta base e contorno de papel cartão cru -->
      <g filter="url(#borda-papel-recorte)">
        
        <!-- BORDA EXTERNA DE CORTE DE PAPEL MARFIM (PAPER MARIO) -->
        <path d="M 45 640 L 40 480 L 70 380 L 110 320 L 120 220 L 100 150 L 150 70 L 250 45 L 350 70 L 400 150 L 380 220 L 390 320 L 430 380 L 460 480 L 455 640 Z" 
              fill="${CORES_XILO.entalheBranco}" stroke="${CORES_XILO.entalheBranco}" stroke-width="16" stroke-linejoin="bevel" stroke-linecap="square"/>
        
        <!-- CORPO PRINCIPAL EM NANQUIM MACIÇO (ESTILO DARKEST DUNGEON) -->
        <path d="M 45 640 L 40 480 L 70 380 L 110 320 L 120 220 L 100 150 L 150 70 L 250 45 L 350 70 L 400 150 L 380 220 L 390 320 L 430 380 L 460 480 L 455 640 Z" 
              fill="${CORES_XILO.nanquim}" filter="url(#textura-madeira-xilo)"/>

        <!-- COPA DO BONÉ DE FERROVIÁRIO / MAQUINISTA -->
        <path d="M 145 75 Q 250 42 355 75 Q 385 110 375 145 L 125 145 Q 115 110 145 75 Z" fill="${CORES_XILO.nanquim}"/>
        <!-- Frisos de Entalhe na Copa do Boné -->
        <path d="M 165 85 Q 250 62 335 85" stroke="${CORES_XILO.entalheBranco}" stroke-width="4" fill="none"/>
        <path d="M 180 102 Q 250 82 320 102" stroke="${CORES_XILO.entalheBranco}" stroke-width="3" fill="none"/>

        <!-- ABA RÍGIDA DO BONÉ (PROJETA SOMBRA PROFUNDA SOBRE OS OLHOS) -->
        <polygon points="100,145 400,140 385,175 115,175" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="106,149 394,144 380,170 120,170" fill="${CORES_XILO.nanquim}"/>

        <!-- ROSTO: SOMBRA MACIÇA DARKEST DUNGEON (OLHOS MERGULHADOS NA ESCURIDÃO) -->
        <rect x="120" y="172" width="260" height="75" fill="${CORES_XILO.nanquim}" class="xilo-sombra-olhos"/>
        
        <!-- Fagulha sutil na penumbra -->
        <circle cx="200" cy="195" r="2.5" fill="${expressao === 'tenso' ? CORES_XILO.brasaAmbar : CORES_XILO.entalheBranco}"/>
        <circle cx="300" cy="195" r="2.5" fill="${expressao === 'tenso' ? CORES_XILO.brasaAmbar : CORES_XILO.entalheBranco}"/>

        <!-- LINHAS PURAS DE ENTALHE (CONTORNO DA FACE & QUEIXO QUADRADO) -->
        <polygon points="250,185 260,250 240,250" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="250,192 257,246 243,246" fill="${CORES_XILO.nanquim}"/>

        <!-- MANDÍBULA PESADA E QUEIXO DE OPERÁRIO -->
        <path d="M 190 310 L 310 310 L 295 355 L 205 355 Z" fill="${CORES_XILO.entalheBranco}"/>
        <path d="M 195 315 L 305 315 L 290 350 L 210 350 Z" fill="${CORES_XILO.nanquim}"/>
        <line x1="225" y1="335" x2="275" y2="335" stroke="${CORES_XILO.entalheBranco}" stroke-width="3"/>

        <!-- GOLA ROBUSTA DE CASACO DE OPERÁRIO FERROVIÁRIO -->
        <polygon points="175,370 250,420 145,510" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="181,376 244,416 153,502" fill="${CORES_XILO.nanquim}"/>
        
        <polygon points="325,370 250,420 355,510" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="319,376 256,416 347,502" fill="${CORES_XILO.nanquim}"/>

        <!-- ENTALHES RÚSTICOS NOS OMBROS (TEXTURA DE TECIDO GROSSO) -->
        <line x1="100" y1="430" x2="135" y2="455" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>
        <line x1="90" y1="465" x2="125" y2="490" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>
        <line x1="85" y1="500" x2="120" y2="525" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>
        <line x1="80" y1="535" x2="115" y2="560" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>

        <line x1="400" y1="430" x2="365" y2="455" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>
        <line x1="410" y1="465" x2="375" y2="490" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>
        <line x1="415" y1="500" x2="380" y2="525" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>
        <line x1="420" y1="535" x2="385" y2="560" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>

        <!-- SELO DE GRAVURA MANUAL (ASSINATURA DO TALHE) -->
        <rect x="390" y="565" width="34" height="34" fill="${CORES_XILO.urucum}"/>
        <text x="407" y="589" font-family="'Courier Prime', 'Special Elite', monospace" font-size="18" font-weight="bold" fill="${CORES_XILO.entalheBranco}" text-anchor="middle">S</text>
      </g>
    </svg>
  `.trim();
}

/**
 * Gera o SVG do Delegado do DOPS em Plano Médio Ampliado
 * Fisionomia: Quepe militar rígido com brasão, óculos escuros de época, gravata fina e terno escuro.
 */
function gerarSvgDelegadoDops(opcoes = {}) {
  const { expressao = 'severo', largura = 500, altura = 650 } = opcoes;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="${largura}" height="${altura}" class="xilogravura-svg-recorte" role="img" aria-label="Xilogravura do Delegado do DOPS">
      <defs>
        <filter id="borda-papel-recorte-dops" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="4" dy="8" stdDeviation="8" flood-color="#0E0C0A" flood-opacity="0.75"/>
        </filter>
      </defs>

      <g filter="url(#borda-papel-recorte-dops)">
        <!-- BORDA EXTERNA DE RECORTE MARFIM -->
        <path d="M 50 640 L 45 460 L 80 370 L 95 300 L 90 200 L 130 90 L 250 50 L 370 90 L 410 200 L 405 300 L 420 370 L 455 460 L 450 640 Z" 
              fill="${CORES_XILO.entalheBranco}" stroke="${CORES_XILO.entalheBranco}" stroke-width="16" stroke-linejoin="bevel" stroke-linecap="square"/>

        <!-- SILHUETA BASE EM NANQUIM -->
        <path d="M 50 640 L 45 460 L 80 370 L 95 300 L 90 200 L 130 90 L 250 50 L 370 90 L 410 200 L 405 300 L 420 370 L 455 460 L 450 640 Z" 
              fill="${CORES_XILO.nanquim}"/>

        <!-- QUEPE MILITAR COM BRASÃO -->
        <polygon points="140,95 250,65 360,95 390,150 110,150" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="148,100 250,72 352,100 380,144 120,144" fill="${CORES_XILO.nanquim}"/>
        <!-- Brasão do DOPS -->
        <polygon points="250,95 265,118 235,118" fill="${CORES_XILO.urucum}"/>

        <!-- ABA RÍGIDA DO QUEPE -->
        <polygon points="105,150 395,150 380,180 120,180" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="112,154 388,154 374,176 126,176" fill="${CORES_XILO.nanquim}"/>

        <!-- SOMBRA MACIÇA DARKEST DUNGEON & ÓCULOS ESCUROS -->
        <rect x="120" y="180" width="260" height="70" fill="${CORES_XILO.nanquim}" class="xilo-sombra-olhos"/>
        
        <!-- Armação dos Óculos Escuros de Época -->
        <rect x="160" y="195" width="60" height="40" fill="${CORES_XILO.entalheBranco}"/>
        <rect x="165" y="200" width="50" height="30" fill="${CORES_XILO.nanquim}"/>
        <line x1="168" y1="204" x2="192" y2="226" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>

        <rect x="280" y="195" width="60" height="40" fill="${CORES_XILO.entalheBranco}"/>
        <rect x="285" y="200" width="50" height="30" fill="${CORES_XILO.nanquim}"/>
        <line x1="288" y1="204" x2="312" y2="226" stroke="${CORES_XILO.entalheBranco}" stroke-width="2.5"/>

        <rect x="220" y="208" width="60" height="8" fill="${CORES_XILO.entalheBranco}"/>

        <!-- MANDÍBULA SEVERA -->
        <line x1="200" y1="310" x2="300" y2="306" stroke="${CORES_XILO.entalheBranco}" stroke-width="4"/>

        <!-- COLARINHO E GRAVATA FINA -->
        <polygon points="250,350 220,440 280,440" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="250,358 226,434 274,434" fill="${CORES_XILO.nanquim}"/>
        <!-- Gravata Estreita Anos 60 -->
        <polygon points="246,380 254,380 262,600 238,600" fill="${CORES_XILO.urucum}"/>

        <!-- LAPELAS DO TERNO POLICIAL -->
        <polygon points="175,350 120,530 215,450" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="178,358 126,524 210,454" fill="${CORES_XILO.nanquim}"/>
        <polygon points="325,350 380,530 285,450" fill="${CORES_XILO.entalheBranco}"/>
        <polygon points="322,358 374,524 290,454" fill="${CORES_XILO.nanquim}"/>

        <!-- CARIMBO POLICIAL DE ENQUADRAMENTO -->
        <rect x="390" y="560" width="40" height="40" fill="${CORES_XILO.nanquim}" stroke="${CORES_XILO.urucum}" stroke-width="3"/>
        <text x="410" y="587" font-family="'Courier Prime', 'Special Elite', monospace" font-size="16" font-weight="900" fill="${CORES_XILO.urucum}" text-anchor="middle">PE</text>
      </g>
    </svg>
  `.trim();
}

/**
 * Gera o SVG Genérico para Personagens sem arte customizada em Plano Médio Ampliado
 */
function gerarSvgGenerico(opcoes = {}) {
  const { nome = 'Cidadão do Recife', largura = 500, altura = 650 } = opcoes;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="${largura}" height="${altura}" class="xilogravura-svg-recorte" role="img" aria-label="Xilogravura de ${nome}">
      <defs>
        <filter id="borda-papel-recorte-gen" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="4" dy="8" stdDeviation="8" flood-color="#0E0C0A" flood-opacity="0.75"/>
        </filter>
      </defs>

      <g filter="url(#borda-papel-recorte-gen)">
        <path d="M 60 640 L 50 470 L 85 360 L 115 280 L 130 180 L 180 85 L 250 65 L 320 85 L 370 180 L 385 280 L 415 360 L 450 470 L 440 640 Z" 
              fill="${CORES_XILO.entalheBranco}" stroke="${CORES_XILO.entalheBranco}" stroke-width="16" stroke-linejoin="bevel" stroke-linecap="square"/>

        <path d="M 60 640 L 50 470 L 85 360 L 115 280 L 130 180 L 180 85 L 250 65 L 320 85 L 370 180 L 385 280 L 415 360 L 450 470 L 440 640 Z" 
              fill="${CORES_XILO.nanquim}"/>

        <!-- SOMBRA MACIÇA DE OLHOS DARKEST DUNGEON -->
        <rect x="150" y="180" width="200" height="65" fill="${CORES_XILO.nanquim}" class="xilo-sombra-olhos"/>
        <line x1="200" y1="205" x2="225" y2="205" stroke="${CORES_XILO.entalheBranco}" stroke-width="3"/>
        <line x1="275" y1="205" x2="300" y2="205" stroke="${CORES_XILO.entalheBranco}" stroke-width="3"/>

        <!-- Traços Angulares de Xilo -->
        <line x1="210" y1="310" x2="290" y2="310" stroke="${CORES_XILO.entalheBranco}" stroke-width="3.5"/>

        <!-- Hachuras de Xilo Rústica nos Ombros -->
        <line x1="120" y1="410" x2="160" y2="445" stroke="${CORES_XILO.entalheBranco}" stroke-width="3.5"/>
        <line x1="110" y1="450" x2="150" y2="485" stroke="${CORES_XILO.entalheBranco}" stroke-width="3.5"/>
        <line x1="380" y1="410" x2="340" y2="445" stroke="${CORES_XILO.entalheBranco}" stroke-width="3.5"/>
        <line x1="390" y1="450" x2="350" y2="485" stroke="${CORES_XILO.entalheBranco}" stroke-width="3.5"/>
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
