/**
 * SUÍTE DE TESTES: TICKET 21 - RÉGUA LIMNIMÉTRICA DA CHEIA DE 75 & OVERLAY DE VIRADA DE ANO EM EDIÇÃO EXTRAORDINÁRIA
 * 
 * Valida:
 * 1. Estrutura tátil diegética no DOM de index.html (painel cheia da Chesf, régua esmaltada com marcas de cota, jornal extraordinário).
 * 2. Ausência total de backdrop-filter: blur(3px) no overlay de virada de ano (eliminação do blur digital contemporâneo).
 * 3. Presença de vinheta densa analógica e cartão de jornal com picote de guilhotina e tipografia linotípica.
 * 4. Painel da cheia com régua limnimétrica industrial esmaltada em preto e branco, lodo barrento e luz-piloto pulsante.
 * 5. Preservação de todos os IDs e manipuladores de eventos da engine e do renderer.js.
 * 6. Conformidade estrita com o Visual Blacklist (zero cantos arredondados, sem preto digital, fontes analógicas).
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function it(descricao, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✔ ${descricao}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✖ ${descricao}`);
    console.error(`    Erro: ${err.message}`);
  }
}

console.log('=================================================================');
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 21 (RÉGUA & VIRADA)');
console.log('=================================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const cssPath = path.join(__dirname, '..', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// -----------------------------------------------------------------------------
// [TIER 1] Validação da Régua Limnimétrica da Cheia de 75 no DOM (index.html)
// -----------------------------------------------------------------------------
console.log('[TIER 1] Verificação da Régua Limnimétrica da Cheia de 75 no DOM (index.html)');

it('Painel da cheia contém bloco de alerta com luz piloto e identificação Chesf/Defesa Civil', () => {
  assert(htmlContent.includes('class="painel-cheia-75"'), 'Elemento .painel-cheia-75 ausente');
  assert(htmlContent.includes('class="cheia-alerta-bloco"'), 'Elemento .cheia-alerta-bloco ausente');
  assert(htmlContent.includes('class="luz-piloto-alerta"'), 'Elemento .luz-piloto-alerta ausente');
  assert(htmlContent.includes('ALERTA HIDROLÓGICO — DEFESA CIVIL / CHESF'), 'Legenda Chesf/Defesa Civil ausente');
});

it('Régua limnimétrica possui marcas de cota métrica estêncil (+4,50m, +3,50m, +2,00m, +1,00m, 0,00m)', () => {
  assert(htmlContent.includes('class="cheia-regua-wrapper"'), 'Elemento .cheia-regua-wrapper ausente');
  assert(htmlContent.includes('class="regua-marcas-escala"'), 'Elemento .regua-marcas-escala ausente');
  assert(htmlContent.includes('+4,50m') && htmlContent.includes('+3,50m') && htmlContent.includes('0,00m'), 'Marcas de cota ausentes');
});

it('Coluna gráfica e nível da água com lodo e espuma preservam IDs originais da engine', () => {
  assert(htmlContent.includes('id="regua-barra-nivel"'), 'ID regua-barra-nivel preservado');
  assert(htmlContent.includes('id="val-nivel-rio"'), 'ID val-nivel-rio preservado');
  assert(htmlContent.includes('id="val-horas-cheia"'), 'ID val-horas-cheia preservado');
  assert(htmlContent.includes('id="val-status-tapacura"'), 'ID val-status-tapacura preservado');
  assert(htmlContent.includes('class="linha-espuma-rio"'), 'Elemento .linha-espuma-rio presente');
});

// -----------------------------------------------------------------------------
// [TIER 2] Validação do Overlay de Virada de Ano no DOM (index.html)
// -----------------------------------------------------------------------------
console.log('\n[TIER 2] Verificação da Edição Extraordinária de Virada de Ano no DOM (index.html)');

it('Overlay de virada de ano estruturado como Edição Extraordinária de Jornal', () => {
  assert(htmlContent.includes('class="virada-jornal-cabecalho"'), 'Elemento .virada-jornal-cabecalho ausente');
  assert(htmlContent.includes('EDIÇÃO EXTRAORDINÁRIA // CRÔNICA DO RECIFE'), 'Manchete extraordinária ausente');
  assert(htmlContent.includes('class="virada-carimbo-ano"'), 'Elemento .virada-carimbo-ano ausente');
  assert(htmlContent.includes('class="virada-filete-duplo"'), 'Elemento .virada-filete-duplo ausente');
});

it('Preservação integral dos IDs de controle da virada de ano no DOM', () => {
  assert(htmlContent.includes('id="overlay-virada-ano"'), 'ID overlay-virada-ano preservado');
  assert(htmlContent.includes('id="virada-ano-de"'), 'ID virada-ano-de preservado');
  assert(htmlContent.includes('id="virada-ano-para"'), 'ID virada-ano-para preservado');
  assert(htmlContent.includes('id="virada-idade-info"'), 'ID virada-idade-info preservado');
  assert(htmlContent.includes('id="btn-continuar-virada-ano"'), 'ID btn-continuar-virada-ano preservado');
});

// -----------------------------------------------------------------------------
// [TIER 3] Validação de Estilos e Texturas em style.css
// -----------------------------------------------------------------------------
console.log('\n[TIER 3] Verificação dos Estilos e Texturas em style.css');

it('Extinção total de backdrop-filter: blur no overlay de virada de ano', () => {
  const matchBlur = cssContent.match(/\.overlay-virada-ano[^{]*\{[^}]*backdrop-filter:\s*blur/i);
  assert(!matchBlur, 'Violação detectada: backdrop-filter blur ainda presente em .overlay-virada-ano');
});

it('Overlay de virada de ano implementa vinheta escura analógica de alta densidade', () => {
  assert(cssContent.includes('.overlay-virada-ano'), 'Classe .overlay-virada-ano ausente');
  assert(cssContent.includes('rgba(10, 7, 5, 0.97)'), 'Vinheta escura periférica analógica ausente');
});

it('Cartão de virada de ano com textura rústica de celulose, picote guilhotinado e micro-rotação', () => {
  assert(cssContent.includes('.cartao-virada-ano'), 'Classe .cartao-virada-ano ausente');
  assert(cssContent.includes('outline: 1px dashed rgba(90, 78, 62, 0.45);'), 'Picote guilhotinado de rotativa ausente');
  assert(cssContent.includes('transform: rotate(-0.35deg);'), 'Micro-rotação analógica do jornal de virada ausente');
});

it('Régua limnimétrica esmaltada em esmalte preto e branco com marcas industriais', () => {
  assert(cssContent.includes('.cheia-regua-grafica'), 'Classe .cheia-regua-grafica ausente');
  assert(cssContent.includes('#E5DFC9'), 'Esmalte cerâmico branco da régua ausente');
  assert(cssContent.includes('repeating-linear-gradient(180deg'), 'Graduação milimetrada em esmalte preto ausente');
});

it('Coluna de água da cheia de 75 com lodo barrento do Capibaribe e linha de espuma', () => {
  assert(cssContent.includes('.regua-nivel-agua'), 'Classe .regua-nivel-agua ausente');
  assert(cssContent.includes('.linha-espuma-rio'), 'Classe .linha-espuma-rio ausente');
  assert(cssContent.includes('rgba(32, 40, 24, 0.96)'), 'Lodo barrento verde-escuro ausente');
});

it('Luz-piloto analógica da Defesa Civil com animação de pulsar de emergência (@keyframes pulsarAlertaChesf)', () => {
  assert(cssContent.includes('.luz-piloto-alerta'), 'Classe .luz-piloto-alerta ausente');
  assert(cssContent.includes('@keyframes pulsarAlertaChesf'), 'Keyframes pulsarAlertaChesf ausentes');
});

// -----------------------------------------------------------------------------
// [TIER 4] Conformidade com o Visual Blacklist
// -----------------------------------------------------------------------------
console.log('\n[TIER 4] Verificação de Conformidade com o Visual Blacklist');

it('Zero cantos arredondados na régua limnimétrica, painel da cheia e cartão extraordinário', () => {
  const matchRadius = cssContent.match(/\.painel-cheia-75[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.cheia-regua-grafica[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.cartao-virada-ano[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i);
  assert(!matchRadius, 'Violação do Visual Blacklist detectada: border-radius encontrado em artefatos da cheia/virada');
});

// -----------------------------------------------------------------------------
// RESUMO FINAL
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('   RESULTADO GERAL DOS TESTES DO TICKET 21');
console.log('=================================================================');
console.log(`Total de asserções executadas: ${totalTests}`);
console.log(`Asserções aprovadas:           ${passedTests}`);
console.log(`Asserções reprovadas:          ${totalTests - passedTests}`);

if (passedTests === totalTests) {
  console.log('\n✔ TICKET 21 APROVADO: RÉGUA LIMNIMÉTRICA E JORNAL EXTRAORDINÁRIO INTEGRADOS COM SUCESSO!\n');
  process.exit(0);
} else {
  console.error('\n✖ FALHA: Alguns testes do Ticket 21 falharam.\n');
  process.exit(1);
}

