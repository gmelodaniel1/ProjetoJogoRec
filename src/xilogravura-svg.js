/**
 * Águas de Ferro — Proxy de Compatibilidade Retroativa (src/xilogravura-svg.js)
 * 
 * O módulo canônico reside em `src/graficos/xilogravura-svg.js`.
 * Este arquivo assegura interoperabilidade e compatibilidade retroativa para suítes de testes e scripts existentes.
 */

let moduloGrafico = {};

if (typeof require === 'function') {
  try {
    moduloGrafico = require('./graficos/xilogravura-svg.js');
  } catch (e) {
    // Ambiente sem require nativo
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = moduloGrafico;
}

if (typeof window !== 'undefined') {
  if (moduloGrafico.gerarSvgPersonagemXilogravura) {
    window.gerarSvgPersonagemXilogravura = moduloGrafico.gerarSvgPersonagemXilogravura;
    window.CORES_XILO = moduloGrafico.CORES_XILO;
  }
}
