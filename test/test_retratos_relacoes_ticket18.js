/**
 * SUÍTE DE TESTES: TICKET 18 - RETRATOS 3x4 DE PRONTUÁRIO POLICIAL NA ABA DE RELAÇÕES
 * 
 * Valida:
 * 1. Existência e integridade dos 4 retratos 3x4 noir no acervo local (artes/retratos/).
 * 2. Estrutura tátil diegética em style.css (moldura 3x4, borda baritada, clipe niquelado, carimbo meio a meio).
 * 3. Lógica do renderer.js (metadados de inquérito/prontuário, caminhos WebP, SVG de carimbos e fallback antropométrico).
 * 4. Conformidade estrita com o Visual Blacklist (sem border-radius, tipografia analógica, paleta histórica).
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
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 18 (RETRATOS 3x4)');
console.log('=================================================================\n');

// -----------------------------------------------------------------------------
// [TIER 1] Validação de Ativos de Imagem em artes/retratos/
// -----------------------------------------------------------------------------
console.log('[TIER 1] Verificação dos Ativos Fotográficos Noir em artes/retratos/');

const dirRetratos = path.join(__dirname, '..', 'artes', 'retratos');

const retratosEsperados = [
  { id: 'severino', arquivo: 'retrato_severino.webp', ref: 'Mestre Severino (Pai / Cais)' },
  { id: 'helena', arquivo: 'retrato_helena.webp', ref: 'Helena (Movimento Estudantil / Gráfica)' },
  { id: 'sindicato', arquivo: 'retrato_sindicato.webp', ref: 'Sindicato & Operários da Madalena' },
  { id: 'dops', arquivo: 'retrato_dops.webp', ref: 'Delegacia do DOPS / Aparato Repressor' }
];

retratosEsperados.forEach(item => {
  it(`Retrato fotográfico existe no disco: ${item.arquivo} (${item.ref})`, () => {
    const caminho = path.join(dirRetratos, item.arquivo);
    assert(fs.existsSync(caminho), `Arquivo não encontrado: ${caminho}`);
    const stats = fs.statSync(caminho);
    assert(stats.size > 10000, `Arquivo muito pequeno (${stats.size} bytes), pode estar corrompido`);
    assert(stats.size < 150000, `Arquivo muito grande (${stats.size} bytes), excede limite orçamentário`);
  });
});

// -----------------------------------------------------------------------------
// [TIER 2] Validação de Estilos e Texturas em style.css
// -----------------------------------------------------------------------------
console.log('\n[TIER 2] Verificação da Especificação Tátil em style.css');

const cssPath = path.join(__dirname, '..', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

it('Estilo de coluna de prontuário (.prontuario-foto-coluna) implementado com largura de 86px', () => {
  assert(cssContent.includes('.prontuario-foto-coluna'), 'Classe .prontuario-foto-coluna ausente');
  assert(cssContent.includes('width: 86px;'), 'Largura de 86px ausente na coluna de foto');
});

it('Clipe metálico niquelado (.clipe-metalico-foto) com posicionamento diegético e z-index superior', () => {
  assert(cssContent.includes('.clipe-metalico-foto'), 'Classe .clipe-metalico-foto ausente');
  assert(cssContent.includes('z-index: 15;'), 'Clipe metálico deve ter z-index 15 para sobrepor foto e pasta');
  assert(cssContent.includes('pointer-events: none;'), 'Clipe metálico não deve bloquear eventos de cursor');
});

it('Moldura 3x4 (.retrato-moldura-3x4) em proporção clássica com borda de papel baritado', () => {
  assert(cssContent.includes('.retrato-moldura-3x4'), 'Classe .retrato-moldura-3x4 ausente');
  assert(cssContent.includes('width: 86px;'), 'Largura 86px ausente');
  assert(cssContent.includes('height: 114px;'), 'Altura 114px (proporção 3:4) ausente');
  assert(cssContent.includes('border: 3px solid #F4EFE6;'), 'Borda de papel baritado #F4EFE6 ausente');
});

it('Carimbo circular (.carimbo-circular-dops) com mix-blend-mode: multiply e rotação analógica', () => {
  assert(cssContent.includes('.carimbo-circular-dops'), 'Classe .carimbo-circular-dops ausente');
  assert(cssContent.includes('mix-blend-mode: multiply;'), 'mix-blend-mode multiply ausente no carimbo');
  assert(cssContent.includes('transform: rotate('), 'Rotação analógica do carimbo ausente');
  assert(cssContent.includes('.carimbo-circular-dops.carimbo-vermelho'), 'Variante carimbo-vermelho ausente');
  assert(cssContent.includes('.carimbo-circular-dops.carimbo-azul'), 'Variante carimbo-azul ausente');
  assert(cssContent.includes('.carimbo-circular-dops.carimbo-verde'), 'Variante carimbo-verde ausente');
});

it('Numeração de prontuário (.personagem-prontuario-num) com tipografia datilografada Courier Prime', () => {
  assert(cssContent.includes('.personagem-prontuario-num'), 'Classe .personagem-prontuario-num ausente');
  assert(cssContent.includes('font-family: var(--fonte-datilografada);'), 'Fonte datilografada ausente na numeração');
});

// -----------------------------------------------------------------------------
// [TIER 3] Validação de Lógica e Renderização em renderer.js
// -----------------------------------------------------------------------------
console.log('\n[TIER 3] Verificação da Lógica de Renderização em renderer.js');

const jsPath = path.join(__dirname, '..', 'renderer.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

it('Função gerarSvgRetratoFallback implementa réguas antropométricas de identificação', () => {
  assert(jsContent.includes('function gerarSvgRetratoFallback('), 'gerarSvgRetratoFallback não definida');
  assert(jsContent.includes('1.80m') && jsContent.includes('1.70m') && jsContent.includes('1.60m'), 'Marcas de régua de altura ausentes');
  assert(jsContent.includes('DOPS / SSP-PE'), 'Placa de identificação DOPS / SSP-PE ausente no fallback');
});

it('Compatibilidade retroativa: gerarSvgRetrato redireciona para gerarSvgRetratoFallback', () => {
  assert(jsContent.includes('function gerarSvgRetrato('), 'gerarSvgRetrato ausente');
  assert(jsContent.includes('return gerarSvgRetratoFallback(tipoAvatar);'), 'gerarSvgRetrato não redireciona corretamente');
});

it('renderizarTelaRelacoes injeta caminhos corretos das 4 fotografias 3x4', () => {
  assert(jsContent.includes('artes/retratos/retrato_severino.webp'), 'Caminho do retrato de Severino ausente');
  assert(jsContent.includes('artes/retratos/retrato_helena.webp'), 'Caminho do retrato de Helena ausente');
  assert(jsContent.includes('artes/retratos/retrato_sindicato.webp'), 'Caminho do retrato do Sindicato ausente');
  assert(jsContent.includes('artes/retratos/retrato_dops.webp'), 'Caminho do retrato do DOPS ausente');
});

it('renderizarTelaRelacoes injeta prontuários e numerações formais de arquivo', () => {
  assert(jsContent.includes('REGISTRO PORTUÁRIO Nº 04.812/P'), 'Prontuário de Severino ausente');
  assert(jsContent.includes('PRONTUÁRIO DOPS/PE Nº 11.405-C'), 'Prontuário de Helena ausente');
  assert(jsContent.includes('REGISTRO DRT/PE Nº 082'), 'Registro do Sindicato ausente');
  assert(jsContent.includes('SSP/DOPS-PE Nº 001/64'), 'Inquérito do DOPS ausente');
});

it('renderizarTelaRelacoes constrói carimbos circulares em SVG vetorial com textPath e arcos', () => {
  assert(jsContent.includes('carimbo-circular-dops'), 'Classe de carimbo circular ausente na renderização');
  assert(jsContent.includes('<textPath'), 'SVG textPath ausente para curvatura circular dos textos');
  assert(jsContent.includes('MATRICULADO'), 'Texto central de Severino ausente');
  assert(jsContent.includes('INVESTIGADA'), 'Texto central de Helena ausente');
  assert(jsContent.includes('SINDICALIZADO'), 'Texto central do Sindicato ausente');
  assert(jsContent.includes('CONFIDENCIAL'), 'Texto central do DOPS ausente');
});

it('Fallback defensivo de imagem com onerror configurado para injetar SVG antropométrico', () => {
  assert(jsContent.includes('gerarSvgRetratoFallback'), 'Chamada a gerarSvgRetratoFallback no onerror ausente');
  assert(jsContent.includes('this.onerror=null'), 'Proteção de loop infinito de onerror ausente');
});

// -----------------------------------------------------------------------------
// [TIER 4] Conformidade com o Visual Blacklist
// -----------------------------------------------------------------------------
console.log('\n[TIER 4] Verificação de Conformidade com o Visual Blacklist');

it('Zero cantos arredondados na moldura 3x4, coluna e cartões de prontuário', () => {
  const matchRadius = cssContent.match(/\.prontuario-foto-coluna[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.retrato-moldura-3x4[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i) ||
                     cssContent.match(/\.foto-3x4-arquivo[^{]*\{[^}]*border-radius:\s*([1-9][0-9]*px)/i);
  assert(!matchRadius, `Violação do Visual Blacklist detectada: border-radius encontrado em fotos de prontuário`);
});

// -----------------------------------------------------------------------------
// RESUMO FINAL
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('   RESULTADO GERAL DOS TESTES DO TICKET 18');
console.log('=================================================================');
console.log(`Total de asserções executadas: ${totalTests}`);
console.log(`Asserções aprovadas:           ${passedTests}`);
console.log(`Asserções reprovadas:          ${totalTests - passedTests}`);

if (passedTests === totalTests) {
  console.log('\n✔ TICKET 18 APROVADO: RETRATOS 3x4 E PRONTUÁRIO INTEGRADOS COM SUCESSO!\n');
  process.exit(0);
} else {
  console.error('\n✖ FALHA: Alguns testes do Ticket 18 falharam.\n');
  process.exit(1);
}

