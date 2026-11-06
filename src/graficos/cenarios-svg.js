/**
 * Águas de Ferro — Módulo Gerador Procedural de Cenários em SVG (src/graficos/cenarios-svg.js)
 * 
 * Responsável pela geração dos quadros procedurais de cenário em SVG quando não houver
 * uma fotografia histórica de acervo disponível ou durante estados especiais de crise/cheia.
 */

function gerarSvgCenarioCheia75() {
  return `
    <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ceuChuva" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8A8472"/>
          <stop offset="60%" stop-color="#B8B09C"/>
          <stop offset="100%" stop-color="#6E6958"/>
        </linearGradient>
        <linearGradient id="aguaBarrenta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5E5946"/>
          <stop offset="100%" stop-color="#383529"/>
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#ceuChuva)"/>
      <g stroke="#5C5749" stroke-width="1" opacity="0.45">
        <line x1="80" y1="0" x2="40" y2="260"/><line x1="160" y1="0" x2="120" y2="260"/>
        <line x1="250" y1="0" x2="210" y2="260"/><line x1="340" y1="0" x2="300" y2="260"/>
        <line x1="430" y1="0" x2="390" y2="260"/><line x1="520" y1="0" x2="480" y2="260"/>
        <line x1="610" y1="0" x2="570" y2="260"/><line x1="710" y1="0" x2="670" y2="260"/>
      </g>
      <polygon points="60,220 110,165 160,220" fill="#4A4538"/>
      <rect x="70" y="220" width="80" height="60" fill="#3E3A2F"/>
      <polygon points="210,205 275,145 340,205" fill="#423D31"/>
      <rect x="225" y="205" width="100" height="70" fill="#363228"/>
      <rect x="340" y="195" width="460" height="12" fill="#2E2B23"/>
      <path d="M 360 195 Q 430 130 500 195 Q 570 130 640 195 Q 710 130 780 195" fill="none" stroke="#2E2B23" stroke-width="5"/>
      <line x1="185" y1="120" x2="195" y2="250" stroke="#29261F" stroke-width="4"/>
      <rect x="0" y="230" width="800" height="150" fill="url(#aguaBarrenta)"/>
      <path d="M 20 265 Q 90 255 160 265 T 320 265 T 480 265 T 640 265 T 790 265" fill="none" stroke="#8C856E" stroke-width="2"/>
      <path d="M 60 310 Q 150 300 240 310 T 420 310 T 600 310 T 760 310" fill="none" stroke="#78715C" stroke-width="1.5"/>
      <polygon points="440,275 540,275 520,295 460,295" fill="#24211B"/>
      <circle cx="475" cy="262" r="7" fill="#24211B"/>
      <rect x="468" y="268" width="14" height="10" fill="#24211B"/>
      <circle cx="505" cy="260" r="7" fill="#24211B"/>
      <rect x="498" y="266" width="14" height="11" fill="#24211B"/>
    </svg>
  `;
}

function gerarSvgCenarioClimax64() {
  return `
    <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ceuTenso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#9E917B"/>
          <stop offset="70%" stop-color="#CFC3AE"/>
          <stop offset="100%" stop-color="#8A7E6A"/>
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#ceuTenso)"/>
      <rect x="30" y="90" width="170" height="210" fill="#595143"/>
      <rect x="220" y="115" width="210" height="185" fill="#4A4337"/>
      <rect x="450" y="80" width="190" height="220" fill="#524A3D"/>
      <rect x="655" y="110" width="120" height="190" fill="#453E33"/>
      <g fill="#D8C9A3" opacity="0.65">
        <rect x="55" y="115" width="22" height="32"/><rect x="95" y="115" width="22" height="32"/><rect x="135" y="115" width="22" height="32"/>
        <rect x="480" y="110" width="24" height="35"/><rect x="525" y="110" width="24" height="35"/><rect x="570" y="110" width="24" height="35"/>
      </g>
      <rect x="0" y="290" width="800" height="90" fill="#363128"/>
      <rect x="260" y="245" width="170" height="48" fill="#26231D"/>
      <polygon points="285,245 315,215 395,215 415,245" fill="#26231D"/>
      <circle cx="295" cy="295" r="20" fill="#1A1814" stroke="#6E6454" stroke-width="3"/>
      <circle cx="395" cy="295" r="20" fill="#1A1814" stroke="#6E6454" stroke-width="3"/>
      <polygon points="430,260 760,210 760,320" fill="#EFE4C8" opacity="0.28"/>
    </svg>
  `;
}

function gerarSvgCenarioVarzea() {
  return `
    <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="380" fill="#B5A78F"/>
      <polygon points="150,280 165,95 190,95 205,280" fill="#473F34"/>
      <path d="M 178 90 Q 220 55 280 70 T 390 55" fill="none" stroke="#6E6353" stroke-width="14" opacity="0.45"/>
      <rect x="90" y="210" width="190" height="80" fill="#3D362C"/>
      <polygon points="75,210 185,155 295,210" fill="#332D24"/>
      <line x1="580" y1="290" x2="595" y2="130" stroke="#363027" stroke-width="7"/>
      <path d="M 595 130 Q 540 110 510 145 M 595 130 Q 650 105 680 140 M 595 130 Q 560 85 530 95 M 595 130 Q 635 85 665 100" fill="none" stroke="#363027" stroke-width="4"/>
      <circle cx="240" cy="245" r="35" fill="#E8D7A7" opacity="0.45"/>
      <rect x="233" y="235" width="14" height="22" fill="#E8D7A7"/>
      <rect x="0" y="285" width="800" height="95" fill="#2E2921"/>
    </svg>
  `;
}

function gerarSvgCenarioRecife58() {
  return `
    <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ceuRecife58" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C2B49B"/>
          <stop offset="65%" stop-color="#E0D5C1"/>
          <stop offset="100%" stop-color="#B0A086"/>
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#ceuRecife58)"/>
      <circle cx="630" cy="95" r="42" fill="#EFE6D5" opacity="0.7"/>
      <line x1="110" y1="230" x2="145" y2="75" stroke="#4A4236" stroke-width="5"/>
      <line x1="145" y1="75" x2="255" y2="115" stroke="#4A4236" stroke-width="4"/>
      <line x1="250" y1="115" x2="250" y2="185" stroke="#4A4236" stroke-width="2"/>
      <rect x="40" y="175" width="85" height="65" fill="#5C5243"/>
      <rect x="135" y="160" width="95" height="80" fill="#4F4639"/>
      <rect x="245" y="180" width="110" height="60" fill="#574D3F"/>
      <rect x="350" y="215" width="450" height="14" fill="#3D362C"/>
      <path d="M 380 235 Q 430 205 480 235 Q 530 205 580 235 Q 630 205 680 235 Q 730 205 780 235" fill="#4A4236"/>
      <rect x="0" y="235" width="800" height="145" fill="#7D715E"/>
      <path d="M 0 250 L 800 250" stroke="#524A3D" stroke-width="2"/>
      <polygon points="470,285 610,285 585,308 495,308" fill="#332D24"/>
      <rect x="520" y="265" width="45" height="20" fill="#473F34"/>
      <line x1="590" y1="265" x2="670" y2="265" stroke="#E0D5C1" stroke-width="2" opacity="0.6"/>
      <line x1="605" y1="280" x2="655" y2="280" stroke="#E0D5C1" stroke-width="2" opacity="0.5"/>
    </svg>
  `;
}

function gerarSvgCenario(evento = null, estado = {}) {
  const id = evento && evento.metadata ? evento.metadata.id : 'dossie';
  const faseAtual = (estado && estado.faseAtual) || 1;
  const ehFase3 = faseAtual === 3 || (id && id.includes('fase_3'));
  const ehCrise = evento && evento.metadata && evento.metadata.tipo === 'crise_urgente';
  const ehClimax64 = id && id.includes('marco_1964');
  const ehVarzea = id && id.includes('varzea');

  if (ehFase3) return gerarSvgCenarioCheia75();
  if (ehClimax64 || ehCrise) return gerarSvgCenarioClimax64();
  if (ehVarzea) return gerarSvgCenarioVarzea();
  return gerarSvgCenarioRecife58();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gerarSvgCenario,
    gerarSvgCenarioCheia75,
    gerarSvgCenarioClimax64,
    gerarSvgCenarioVarzea,
    gerarSvgCenarioRecife58
  };
} else if (typeof window !== 'undefined') {
  window.gerarSvgCenario = gerarSvgCenario;
  window.gerarSvgCenarioModulo = gerarSvgCenario;
}

