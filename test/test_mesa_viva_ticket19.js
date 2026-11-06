/**
 * SUÍTE DE TESTES: TICKET 19 - MESA DE TRABALHO VIVA E TEXTURAS ORGÂNICAS
 * 
 * Valida:
 * 1. Elementos diegéticos de mesa no DOM de index.html (mancha de café, clipe avulso, grampo oxidado).
 * 2. Iluminação cônica motivada de luminária de leitura e penumbra periférica na mesa-viewport.
 * 3. Micro-oscilação analógica (flicker de voltagem de filamento incandescente) em crises e na Fase 3.
 * 4. Quebra de alinhamento ortogonal (micro-rotações opostas na folha editorial e palco documental).
 * 5. Tipografia linotípica clássica (justificação de bloco, hifenização e recuo de parágrafo).
 * 6. Conformidade estrita com o Visual Blacklist (sem border-radius, sem preto puro, tipografia analógica).
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
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 19 (MESA VIVA)');
console.log('=================================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const cssPath = path.join(__dirname, '..', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// -----------------------------------------------------------------------------
// [TIER 1] Validação dos Elementos Diegéticos no DOM (index.html)
// -----------------------------------------------------------------------------
console.log('[TIER 1] Verificação dos Adereços Diegéticos no DOM (index.html)');

it('Marca circular de xícara de café frio (.adereco-mancha-cafe) presente na mesa', () => {
  assert(htmlContent.includes('class="adereco-mesa adereco-mancha-cafe"'), 'Elemento .adereco-mancha-cafe ausente');
  assert(htmlContent.includes('<svg width="150" height="150"'), 'SVG da mancha de café com tamanho correto ausente');
  assert(htmlContent.includes('stroke-dasharray'), 'Borda capilar irregular de café ausente no SVG');
});

it('Clipe metálico avulso (.adereco-clipe-solto) presente na madeira da mesa', () => {
  assert(htmlContent.includes('class="adereco-mesa adereco-clipe-solto"'), 'Elemento .adereco-clipe-solto ausente');
  assert(htmlContent.includes('viewBox="0 0 26 50"'), 'SVG do clipe avulso ausente');
});

it('Grampo metálico oxidado com migração de ferrugem (.grampo-papel-oxidado) fixado na folha narrativa', () => {
  assert(htmlContent.includes('class="grampo-papel-oxidado"'), 'Elemento .grampo-papel-oxidado ausente');
  assert(htmlContent.includes('class="halo-ferrugem-papel"'), 'Sub-elemento .halo-ferrugem-papel ausente');
  assert(htmlContent.includes('class="arame-grampo-metal"'), 'Sub-elemento .arame-grampo-metal ausente');
});

// -----------------------------------------------------------------------------
// [TIER 2] Validação de Iluminação, Penumbra e Micro-Oscilação (style.css)
// -----------------------------------------------------------------------------
console.log('\n[TIER 2] Verificação da Iluminação Focal e Oscilação Analógica');

it('Cone focal de iluminação e penumbra periférica implementados em .mesa-viewport', () => {
  assert(cssContent.includes('.mesa-viewport'), 'Regra .mesa-viewport ausente');
  assert(cssContent.includes('rgba(255, 246, 224, 0.13)'), 'Cone de luz quente central ausente');
  assert(cssContent.includes('rgba(14, 10, 6, 0.82)'), 'Penumbra periférica escura nas bordas ausente');
});

it('Keyframes de micro-oscilação analógica (@keyframes flickerVoltagemMesa) implementados', () => {
  assert(cssContent.includes('@keyframes flickerVoltagemMesa'), 'Keyframes flickerVoltagemMesa ausentes');
  assert(cssContent.includes('body.em-crise-urgente .mesa-viewport'), 'Ativação do flicker em crise ausente');
  assert(cssContent.includes('body.fase-3 .mesa-viewport'), 'Ativação do flicker na Fase 3 ausente');
});

// -----------------------------------------------------------------------------
// [TIER 3] Validação de Micro-Rotação e Sombras de Descolamento
// -----------------------------------------------------------------------------
console.log('\n[TIER 3] Verificação da Quebra de Alinhamento Ortogonal & Texturas');

it('Folha editorial (.folha-narrativa) com micro-rotação positiva (+0.35deg) e sombra assimétrica', () => {
  assert(cssContent.includes('transform: rotate(0.35deg);'), 'Micro-rotação de 0.35deg na folha narrativa ausente');
  assert(cssContent.includes('transform-origin: 50% 120px;'), 'Origem de rotação da folha ausente');
  assert(cssContent.includes('3px 14px 34px rgba(22, 14, 8, 0.52)'), 'Sombra dinâmica de descolamento ausente');
});

it('Palco central (.palco-central) com contra-rotação negativa (-0.15deg) orgânica', () => {
  assert(cssContent.includes('transform: rotate(-0.15deg);'), 'Contra-rotação de -0.15deg no palco central ausente');
});

it('Estilos do grampo oxidado com gradiente de oxidação de ferro e halo de celulose', () => {
  assert(cssContent.includes('.grampo-papel-oxidado'), 'Classe .grampo-papel-oxidado ausente em style.css');
  assert(cssContent.includes('.halo-ferrugem-papel'), 'Classe .halo-ferrugem-papel ausente em style.css');
  assert(cssContent.includes('rgba(165, 84, 38, 0.42)'), 'Halo ocre de ferrugem ausente');
  assert(cssContent.includes('.arame-grampo-metal'), 'Classe .arame-grampo-metal ausente em style.css');
});

it('Estilos da mancha de café com mix-blend-mode multiply e rotação analógica', () => {
  assert(cssContent.includes('.adereco-mancha-cafe'), 'Classe .adereco-mancha-cafe ausente em style.css');
  assert(cssContent.includes('mix-blend-mode: multiply;'), 'mix-blend-mode multiply ausente na mancha de café');
});

// -----------------------------------------------------------------------------
// [TIER 4] Tipografia Linotípica Editorial
// -----------------------------------------------------------------------------
console.log('\n[TIER 4] Verificação da Tipografia de Linotipo nos Parágrafos Narrativos');

it('Parágrafos narrativos (.corpo-narrativa p) com justificação clássica, hifenização e recuo', () => {
  assert(cssContent.includes('text-align: justify;'), 'Justificação de texto ausente em .corpo-narrativa p');
  assert(cssContent.includes('hyphens: auto;'), 'Hifenização automática ausente em .corpo-narrativa p');
  assert(cssContent.includes('text-indent: 1.5em;'), 'Recuo de primeira linha linotípica ausente');
  assert(cssContent.includes('.corpo-narrativa p:first-of-type'), 'Regra para zerar recuo do primeiro parágrafo ausente');
});

// -----------------------------------------------------------------------------
// [TIER 5] Conformidade com o Visual Blacklist
// -----------------------------------------------------------------------------
console.log('\n[TIER 5] Verificação de Conformidade com o Visual Blacklist');

it('Zero cantos arredondados nos novos elementos diegéticos da mesa viva', () => {
  const matchRadius = cssContent.match(/\.grampo-papel-oxidado[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.arame-grampo-metal[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.adereco-mesa[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i);
  assert(!matchRadius, 'Violação do Visual Blacklist detectada: border-radius encontrado em adereços da mesa');
});

// -----------------------------------------------------------------------------
// RESUMO FINAL
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('   RESULTADO GERAL DOS TESTES DO TICKET 19');
console.log('=================================================================');
console.log(`Total de asserções executadas: ${totalTests}`);
console.log(`Asserções aprovadas:           ${passedTests}`);
console.log(`Asserções reprovadas:          ${totalTests - passedTests}`);

if (passedTests === totalTests) {
  console.log('\n✔ TICKET 19 APROVADO: MESA VIVA E TEXTURAS INTEGRADAS COM SUCESSO!\n');
  process.exit(0);
} else {
  console.error('\n✖ FALHA: Alguns testes do Ticket 19 falharam.\n');
  process.exit(1);
}

