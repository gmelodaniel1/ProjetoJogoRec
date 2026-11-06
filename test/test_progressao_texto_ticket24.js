/**
 * Águas de Ferro — Suíte de Testes Automatizados: Ticket 24
 * Progressão Cadenciada de Texto com Ritmo de Leitura (Estilo Disco Elysium)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=================================================================');
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 24 (PROGRESSÃO DE TEXTO)');
console.log('=================================================================\n');

let aprovados = 0;
let reprovados = 0;

function test(descricao, fn) {
  try {
    fn();
    console.log(`  ✔ ${descricao}`);
    aprovados++;
  } catch (err) {
    console.error(`  ✖ ${descricao}`);
    console.error(`    Erro: ${err.message}`);
    reprovados++;
  }
}

const htmlPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, '..', 'style.css');
const rendererPath = path.join(__dirname, '..', 'renderer.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const renderer = fs.readFileSync(rendererPath, 'utf8');

// =================================================================
// [TIER 1] Verificação dos Elementos no DOM (index.html)
// =================================================================
console.log('[TIER 1] Verificação dos Elementos no DOM (index.html)');

test('Container de narrativa e bloco de progressão de leitura existem no HTML', () => {
  assert(html.includes('id="corpo-narrativa"'), 'Elemento #corpo-narrativa deve existir');
  assert(html.includes('id="bloco-progredir-leitura"'), 'Elemento #bloco-progredir-leitura deve existir para conduzir a cadência');
});

test('Botão diegético de avançar leitura presente com indicação de tecla [Espaço ▾]', () => {
  assert(html.includes('id="btn-progredir-leitura"'), 'Elemento #btn-progredir-leitura deve existir');
  assert(html.includes('indicador-tecla-leitura') || html.includes('Espaço'), 'Deve conter indicativo de tecla de leitura (Espaço)');
});

test('Botão ou pílula discreta para ler tudo instantaneamente existe no HTML', () => {
  assert(html.includes('id="btn-ler-tudo"') || html.includes('btn-ler-tudo'), 'Elemento para ler tudo deve existir');
});

// =================================================================
// [TIER 2] Verificação das Regras e Animações em style.css
// =================================================================
console.log('\n[TIER 2] Verificação das Regras e Animações em style.css');

test('Classes de parágrafo beat e animação de surgimento de tinta definidas', () => {
  assert(css.includes('.paragrafo-beat'), 'Classe .paragrafo-beat deve existir no CSS');
  assert(css.includes('@keyframes surgimentoParagrafo') || css.includes('@keyframes animacaoParagrafo'), 'Animação de surgimento de parágrafo deve estar declarada');
});

test('Estilização analógica do botão de leitura e pílula de ler tudo', () => {
  assert(css.includes('.bloco-progredir-leitura'), 'Classe .bloco-progredir-leitura deve estar estilizada');
  assert(css.includes('.btn-progredir-leitura'), 'Classe .btn-progredir-leitura deve estar estilizada');
  assert(css.includes('.btn-ler-tudo'), 'Classe .btn-ler-tudo deve estar estilizada');
});

test('Respeito ao Visual Blacklist (sem cantos arredondados modernos nos botões de leitura)', () => {
  // Extrai o bloco .btn-progredir-leitura e confere ausência de border-radius arredondado moderno
  const regexRadius = /\.btn-progredir-leitura[\s\S]*?\{[\s\S]*?border-radius:\s*([1-9][0-9]*px)/i;
  assert(!regexRadius.test(css), 'Botão de leitura não deve ter border-radius moderno');
});

// =================================================================
// [TIER 3] Verificação da Lógica de Fatiamento e Navegação em renderer.js
// =================================================================
console.log('\n[TIER 3] Verificação da Lógica de Fatiamento e Navegação em renderer.js');

test('Função ou rotina de progressão gradual de parágrafos implementada', () => {
  assert(
    renderer.includes('iniciarProgressaoTexto') || renderer.includes('progredirLeitura'),
    'Deve implementar a rotina de progressão gradual de texto'
  );
});

test('Suporte a avanço por teclado (tecla Space / Enter)', () => {
  assert(
    renderer.includes('Space') || renderer.includes('keydown') || renderer.includes('event.key'),
    'Deve capturar evento de teclado para avançar parágrafos'
  );
});

test('Seção de deliberação (#secao-deliberacao-decisoes) só liberada após o término dos parágrafos', () => {
  assert(
    renderer.includes('secaoDeliberacao') || renderer.includes('secao-deliberacao-decisoes'),
    'Deve controlar a exibição da seção de deliberação condicionada ao fim da leitura'
  );
});

test('Funcionalidade de Ler Tudo implementada para revelação imediata', () => {
  assert(
    renderer.includes('btnLerTudo') || renderer.includes('lerTudo') || renderer.includes('revelarTodosParagrafos'),
    'Deve implementar o fluxo de revelação de todos os parágrafos ao clicar em ler tudo'
  );
});

// =================================================================
// RESULTADO FINAL
// =================================================================
console.log('\n=================================================================');
console.log(`Testes Aprovados: ${aprovados} | Testes Reprovados: ${reprovados}`);
console.log('=================================================================');

if (reprovados > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

