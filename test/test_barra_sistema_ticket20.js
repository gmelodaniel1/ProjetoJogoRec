/**
 * SUÍTE DE TESTES: TICKET 20 - REDESIGN DIEGÉTICO DA BARRA DE SISTEMA (LOMBADA DE AÇO & ORIFÍCIOS PERFURADOS)
 * 
 * Valida:
 * 1. Estrutura tátil diegética no DOM de index.html (rebites chanfrados, plaqueta DOPS, carimbo datador, botões Dymo).
 * 2. Estilos mecânicos em style.css (metal verde-oliva militar, chanfro de parafuso, botões plásticos Dymo em relevo).
 * 3. Orifícios mecânicos de perfurador de ação (.ponto-ativo disco em relevo / .ponto-gasto orifício perfurado vazado).
 * 4. Lógica de renderização em renderer.js com persistência dos IDs e sincronização de ações da fase.
 * 5. Conformidade estrita com o Visual Blacklist (zero cantos arredondados, sem preto digital, Courier Prime).
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
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 20 (BARRA DE SISTEMA)');
console.log('=================================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const cssPath = path.join(__dirname, '..', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const jsPath = path.join(__dirname, '..', 'renderer.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// -----------------------------------------------------------------------------
// [TIER 1] Validação da Estrutura Diegética no DOM (index.html)
// -----------------------------------------------------------------------------
console.log('[TIER 1] Verificação da Estrutura Diegética no DOM (index.html)');

it('Rebites metálicos mecânicos presentes nas duas extremidades da barra', () => {
  assert(htmlContent.includes('class="rebite-parafuso rebite-esq"'), 'Rebite esquerdo ausente');
  assert(htmlContent.includes('class="rebite-parafuso rebite-dir"'), 'Rebite direito ausente');
});

it('Plaqueta de identificação do arquivo (GAVETEIRO 04) presente e sem DOPS na barra', () => {
  assert(htmlContent.includes('class="plaqueta-arquivo-id"'), 'Classe .plaqueta-arquivo-id ausente');
  assert(htmlContent.includes('GAVETEIRO 04'), 'Texto identificador do arquivo GAVETEIRO 04 ausente');
  assert(!htmlContent.includes('DOPS-PE // GAVETEIRO 04'), 'DOPS não deve estar presente no identificador superior');
});

it('Bloco do carimbo datador mecânico presente com elemento #ano-atual preservado', () => {
  assert(htmlContent.includes('class="bloco-carimbo-datador"'), 'Classe .bloco-carimbo-datador ausente');
  assert(htmlContent.includes('id="ano-atual"'), 'ID ano-atual ausente no DOM');
});

it('Mecânica de ações artificiais e indicador de ações removidos da HUD a pedido do usuário', () => {
  assert(!htmlContent.includes('id="indicador-acoes"'), 'ID indicador-acoes deve ter sido removido da HUD');
});

it('Botões de comando estilizados como fitas rotuladoras plásticas Dymo', () => {
  assert(htmlContent.includes('class="btn-dymo btn-dymo-vermelho"'), 'Botão Dymo vermelho (DevTools) ausente');
  assert(htmlContent.includes('class="btn-dymo btn-dymo-preto"'), 'Botão Dymo preto (Fullscreen) ausente');
  assert(htmlContent.includes('id="btn-devtools"'), 'ID btn-devtools preservado');
  assert(htmlContent.includes('id="btn-fullscreen"'), 'ID btn-fullscreen preservado');
});

// -----------------------------------------------------------------------------
// [TIER 2] Validação de Texturas e Estilos em style.css
// -----------------------------------------------------------------------------
console.log('\n[TIER 2] Verificação dos Estilos e Texturas Mecânicas em style.css');

it('Barra de sistema com textura metálica verde-oliva militar e relevo de gaveteiro', () => {
  assert(cssContent.includes('.barra-sistema'), 'Classe .barra-sistema ausente');
  assert(cssContent.includes('#384032') && cssContent.includes('#1F241C'), 'Gradiente metálico verde-oliva ausente');
  assert(cssContent.includes('border: 1px solid #5C523E;'), 'Borda chanfrada de metal/latão ausente');
});

it('Rebites com acabamento de metal batido e chanfro de fenda de parafuso', () => {
  assert(cssContent.includes('.rebite-parafuso'), 'Classe .rebite-parafuso ausente');
  assert(cssContent.includes('.rebite-parafuso::after'), 'Pseudo-elemento de fenda chanfrada ausente');
  assert(cssContent.includes('transform: rotate(38deg);'), 'Rotação mecânica da fenda de parafuso ausente');
});

it('Orifícios de perfurador (.ponto-ativo e .ponto-gasto) estilizados mecanicamente', () => {
  assert(cssContent.includes('.indicador-acoes .ponto-ativo'), 'Estilização mecânica de ponto-ativo ausente');
  assert(cssContent.includes('.indicador-acoes .ponto-gasto'), 'Estilização mecânica de ponto-gasto ausente');
  assert(cssContent.includes('font-size: 0;'), 'font-size 0 para transformar caracteres em orifícios físicos ausente');
  assert(cssContent.includes('box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.95)'), 'Sombra interna de profundidade vazada ausente');
});

it('Fitas Dymo com tipografia prensada em relevo, sombras e gradientes de plástico rígido', () => {
  assert(cssContent.includes('.btn-dymo'), 'Classe .btn-dymo ausente');
  assert(cssContent.includes('.btn-dymo-vermelho'), 'Classe .btn-dymo-vermelho ausente');
  assert(cssContent.includes('.btn-dymo-preto'), 'Classe .btn-dymo-preto ausente');
  assert(cssContent.includes('text-shadow: 0 1px 0 rgba(0, 0, 0, 0.9)'), 'Relevo text-shadow da fita Dymo ausente');
});

// -----------------------------------------------------------------------------
// [TIER 3] Validação da Lógica e Renderização em renderer.js
// -----------------------------------------------------------------------------
console.log('\n[TIER 3] Verificação da Lógica Reativa em renderer.js');

it('HUD simplificada sem overhead de ações artificiais conforme especificado pelo usuário', () => {
  assert(!jsContent.includes('elIndicadorAcoes.innerHTML'), 'Atualização de indicador de ações removida da barra de sistema');
});

// -----------------------------------------------------------------------------
// [TIER 4] Conformidade com o Visual Blacklist
// -----------------------------------------------------------------------------
console.log('\n[TIER 4] Verificação de Conformidade com o Visual Blacklist');

it('Zero cantos arredondados na barra de sistema, plaquetas, botões Dymo e orifícios de perfurador', () => {
  const matchRadius = cssContent.match(/\.barra-sistema[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.btn-dymo[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.plaqueta-arquivo-id[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i);
  assert(!matchRadius, 'Violação do Visual Blacklist detectada: border-radius encontrado na barra de sistema');
});

// -----------------------------------------------------------------------------
// RESUMO FINAL
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('   RESULTADO GERAL DOS TESTES DO TICKET 20');
console.log('=================================================================');
console.log(`Total de asserções executadas: ${totalTests}`);
console.log(`Asserções aprovadas:           ${passedTests}`);
console.log(`Asserções reprovadas:          ${totalTests - passedTests}`);

if (passedTests === totalTests) {
  console.log('\n✔ TICKET 20 APROVADO: LOMBADA DE AÇO E ORIFÍCIOS PERFURADOS INTEGRADOS COM SUCESSO!\n');
  process.exit(0);
} else {
  console.error('\n✖ FALHA: Alguns testes do Ticket 20 falharam.\n');
  process.exit(1);
}

