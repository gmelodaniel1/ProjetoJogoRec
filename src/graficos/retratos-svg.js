/**
 * Águas de Ferro — Módulo Gerador de Retratos e Carimbos em SVG (src/graficos/retratos-svg.js)
 * 
 * Responsável pela geração dos retratos antropométricos 3x4 de prontuário policial (DOPS)
 * com réguas de altura e carimbos circulares burocráticos.
 */

function gerarSvgRetratoFallback(tipoAvatar) {
  // Retrato antropométrico com réguas de altura (estilo fichamento policial e militar de 1950/60)
  return `
    <svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; background:#C5BDAF;">
      <!-- Fundo milimetrado e régua antropométrica -->
      <line x1="0" y1="20" x2="90" y2="20" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="18" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.80m</text>
      <line x1="0" y1="40" x2="90" y2="40" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="38" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.70m</text>
      <line x1="0" y1="60" x2="90" y2="60" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="58" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.60m</text>
      <line x1="0" y1="80" x2="90" y2="80" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="78" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.50m</text>
      <!-- Silhueta fotográfica documental -->
      <circle cx="45" cy="42" r="18" fill="#3D352B"/>
      <ellipse cx="45" cy="96" rx="34" ry="26" fill="#2E2720"/>
      <!-- Placa de identificação no peito -->
      <rect x="18" y="88" width="54" height="16" fill="#E5DFC9" stroke="#1C1610" stroke-width="1.2"/>
      <text x="45" y="98" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="bold" text-anchor="middle" fill="#1C1610" letter-spacing="0.6">DOPS / SSP-PE</text>
    </svg>
  `;
}

function gerarSvgRetrato(tipoAvatar) {
  return gerarSvgRetratoFallback(tipoAvatar);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gerarSvgRetratoFallback,
    gerarSvgRetrato
  };
} else if (typeof window !== 'undefined') {
  window.gerarSvgRetratoFallback = gerarSvgRetratoFallback;
  window.gerarSvgRetratoFallbackModulo = gerarSvgRetratoFallback;
  window.gerarSvgRetrato = gerarSvgRetrato;
}
