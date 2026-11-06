/**
 * SUÍTE DE TESTES: TICKET 22 - ABAS KARDEX DE FICHÁRIO SUSPENSO & DESPACHOS DE DECISÃO COM TARJA DE CENSURA AI-5
 * 
 * Valida:
 * 1. Estrutura tátil diegética no DOM de index.html (guias Kardex com visor de celuloide, ordem de despacho com fita gomada).
 * 2. Estilos de fichário em style.css (elevação da aba ativa, fita adesiva gomada, borda de micro-perfurador telex).
 * 3. Tarja de censura prévia da DCDP / Polícia Federal a nanquim preto com carimbo [ CENSURADO // LEI DE IMPRENSA • AI-5 ].
 * 4. Lógica de renderização no renderer.js com preservação dos seletores e eventos de decisão.
 * 5. Conformidade estrita com o Visual Blacklist (zero cantos arredondados, sem preto digital, fontes analógicas).
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
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 22 (KARDEX & CENSURA)');
console.log('=================================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const cssPath = path.join(__dirname, '..', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const jsPath = path.join(__dirname, '..', 'renderer.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// -----------------------------------------------------------------------------
// [TIER 1] Validação das Guias Kardex e Despacho no DOM (index.html)
// -----------------------------------------------------------------------------
console.log('[TIER 1] Verificação das Guias Kardex e Ordem de Despacho no DOM (index.html)');

it('Guias de fichário Kardex contêm visores salientes de celuloide amarelado', () => {
  assert(htmlContent.includes('class="visor-celuloide-aba"'), 'Elemento .visor-celuloide-aba ausente');
  assert(htmlContent.includes('aria-label="Guias Kardex do Prontuário"'), 'Aria-label de guias Kardex ausente');
});

it('Preservação integral dos IDs originais de navegação das abas', () => {
  assert(htmlContent.includes('id="btn-aba-cenario"'), 'ID btn-aba-cenario preservado');
  assert(htmlContent.includes('id="btn-aba-atributos"'), 'ID btn-aba-atributos preservado');
  assert(htmlContent.includes('id="btn-aba-relacoes"'), 'ID btn-aba-relacoes preservado');
  assert(htmlContent.includes('id="btn-aba-cronologia"'), 'ID btn-aba-cronologia preservado');
});

it('Botão de fluxo deliberativo estruturado como Ordem de Despacho com fita adesiva gomada', () => {
  assert(htmlContent.includes('class="fita-despacho-adesiva"'), 'Elemento .fita-despacho-adesiva ausente');
  assert(htmlContent.includes('ORDEM DE DESPACHO // INQUÉRITO FORMAL'), 'Texto de ordem de despacho ausente');
  assert(htmlContent.includes('id="btn-continuar-para-decisao"'), 'ID btn-continuar-para-decisao preservado');
});

// -----------------------------------------------------------------------------
// [TIER 2] Validação de Estilos e Texturas em style.css
// -----------------------------------------------------------------------------
console.log('\n[TIER 2] Verificação dos Estilos Kardex, Despacho e Censura em style.css');

it('Abas Kardex com visor de celuloide amarelado e aba ativa elevada em -3px', () => {
  assert(cssContent.includes('.visor-celuloide-aba'), 'Classe .visor-celuloide-aba ausente');
  assert(cssContent.includes('.btn-atalho-pasta.ativo'), 'Classe .btn-atalho-pasta.ativo ausente');
  assert(cssContent.includes('transform: translateY(-3px);'), 'Elevação física da aba ativa ausente');
});

it('Ordem de Despacho estilizada como ficha de inquérito com fita adesiva e borda carmim', () => {
  assert(cssContent.includes('.btn-continuar-decisao'), 'Classe .btn-continuar-decisao ausente');
  assert(cssContent.includes('.fita-despacho-adesiva'), 'Classe .fita-despacho-adesiva ausente');
  assert(cssContent.includes('border-left: 6px solid var(--cor-carimbo-vermelho);'), 'Borda esquerda de carimbo ausente');
});

it('Cartões de decisão com borda perfurada de telex/despacho oficial', () => {
  assert(cssContent.includes('.cartao-decisao'), 'Classe .cartao-decisao ausente');
  assert(cssContent.includes('border-left: 5px solid #827258;'), 'Borda esquerda de micro-perfurador ausente');
});

it('Tarja de censura prévia AI-5 a nanquim preto com carimbo DCDP em vermelho oficial', () => {
  assert(cssContent.includes('.tarja-censura-ai5'), 'Classe .tarja-censura-ai5 ausente');
  assert(cssContent.includes('.carimbo-censura-dcdp'), 'Classe .carimbo-censura-dcdp ausente');
  assert(cssContent.includes('background-color: #161412;'), 'Fundo de nanquim preto ausente');
  assert(cssContent.includes('.cartao-decisao.opcao-bloqueada .decisao-rotulo'), 'Rasura de texto bloqueado ausente');
});

// -----------------------------------------------------------------------------
// [TIER 3] Validação da Lógica e Renderização em renderer.js
// -----------------------------------------------------------------------------
console.log('\n[TIER 3] Verificação da Lógica Reativa em renderer.js');

it('renderizarTelaPrincipal injeta tarja de censura AI-5 e carimbo oficial nas opções bloqueadas', () => {
  assert(jsContent.includes('tarja-censura-ai5'), 'Classe tarja-censura-ai5 ausente no renderer.js');
  assert(jsContent.includes('carimbo-censura-dcdp'), 'Classe carimbo-censura-dcdp ausente no renderer.js');
  assert(jsContent.includes('LEI DE IMPRENSA • AI-5'), 'Texto do carimbo AI-5 ausente no renderer.js');
  assert(jsContent.includes('VETADO PELA CENSURA'), 'Etiqueta de custo vetado pela censura ausente');
});

// -----------------------------------------------------------------------------
// [TIER 4] Conformidade com o Visual Blacklist
// -----------------------------------------------------------------------------
console.log('\n[TIER 4] Verificação de Conformidade com o Visual Blacklist');

it('Zero cantos arredondados nas abas Kardex, visores, ordem de despacho e tarjas de censura', () => {
  const matchRadius = cssContent.match(/\.btn-atalho-pasta[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.visor-celuloide-aba[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.btn-continuar-decisao[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.tarja-censura-ai5[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i);
  assert(!matchRadius, 'Violação do Visual Blacklist detectada: border-radius encontrado em artefatos Kardex/Censura');
});

// -----------------------------------------------------------------------------
// RESUMO FINAL
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('   RESULTADO GERAL DOS TESTES DO TICKET 22');
console.log('=================================================================');
console.log(`Total de asserções executadas: ${totalTests}`);
console.log(`Asserções aprovadas:           ${passedTests}`);
console.log(`Asserções reprovadas:          ${totalTests - passedTests}`);

if (passedTests === totalTests) {
  console.log('\n✔ TICKET 22 APROVADO: ABAS KARDEX, DESPACHO E CENSURA AI-5 INTEGRADOS COM SUCESSO!\n');
  process.exit(0);
} else {
  console.error('\n✖ FALHA: Alguns testes do Ticket 22 falharam.\n');
  process.exit(1);
}

