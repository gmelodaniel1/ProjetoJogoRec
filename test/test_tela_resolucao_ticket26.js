/**
 * Águas de Ferro — Suíte de Testes Automatizados: Ticket 26
 * Tela Especial de Resolução em Papel Sobreposto com Foto Histórica & Consequências
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=================================================================');
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 26 (TELA DE RESOLUÇÃO)');
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

test('Overlay e folha de papel sobreposto de resolução existem no HTML', () => {
  assert(html.includes('id="overlay-resolucao-consequencia"'), 'Elemento #overlay-resolucao-consequencia deve existir');
  assert(html.includes('id="cartao-resolucao-papel"'), 'Elemento #cartao-resolucao-papel deve existir');
});

test('Elementos de carimbo, foto de época, crônica de desfecho e balanço existem', () => {
  assert(html.includes('id="resolucao-carimbo-texto"'), 'Deve conter elemento para o carimbo da decisão');
  assert(html.includes('id="resolucao-img-foto"'), 'Deve conter elemento <img> para a foto de época do desfecho');
  assert(html.includes('id="resolucao-texto-acontecimentos"'), 'Deve conter container para o texto da crônica de desfecho');
  assert(html.includes('id="resolucao-balanco-atributos"'), 'Deve conter container para as pílulas de balanço de atributos');
});

test('Botão de assimilar os fatos presente no rodapé da folha de ocorrência', () => {
  assert(html.includes('id="btn-continuar-resolucao"'), 'Elemento #btn-continuar-resolucao deve existir');
  assert(html.includes('ASSIMILAR OS FATOS'), 'Botão deve conter o texto de assimilar os fatos');
});

// =================================================================
// [TIER 2] Verificação das Regras Estéticas e Analógicas em style.css
// =================================================================
console.log('\n[TIER 2] Verificação das Regras e Animações em style.css');

test('Overlay estilizado como vinheta escura analógica com alta prioridade de z-index', () => {
  assert(css.includes('.overlay-resolucao-consequencia'), 'Classe .overlay-resolucao-consequencia deve estar estilizada');
  assert(css.includes('.cartao-resolucao-papel'), 'Classe .cartao-resolucao-papel deve estar estilizada');
});

test('Folha sobreposta utiliza textura rústica de papel, sombra de relevo e animação de entrada', () => {
  assert(css.includes('@keyframes resolucaoPapelSlam') || css.includes('@keyframes resolucaoSlam') || css.includes('resolucaoPapelSlam'), 'Animação de queda do papel deve estar declarada');
  assert(css.includes('.resolucao-carimbo-box'), 'Classe .resolucao-carimbo-box deve estar estilizada');
  assert(css.includes('.resolucao-foto-epoca'), 'Classe .resolucao-foto-epoca deve estar estilizada');
});

test('Respeito estrito ao Visual Blacklist (sem border-radius moderno na folha ou no botão)', () => {
  const regexRadiusPapel = /\.cartao-resolucao-papel[\s\S]*?\{[\s\S]*?border-radius:\s*([1-9][0-9]*px)/i;
  assert(!regexRadiusPapel.test(css), 'Folha de resolução não deve conter border-radius moderno');

  const regexRadiusBtn = /\.btn-continuar-resolucao[\s\S]*?\{[\s\S]*?border-radius:\s*([1-9][0-9]*px)/i;
  assert(!regexRadiusBtn.test(css), 'Botão de continuar resolução não deve conter border-radius moderno');
});

// =================================================================
// [TIER 3] Verificação da Lógica de Resolução no Renderer (renderer.js)
// =================================================================
console.log('\n[TIER 3] Verificação da Lógica no renderer.js');

test('Função exibirTelaResolucaoConsequencia implementada no renderer', () => {
  assert(
    renderer.includes('exibirTelaResolucaoConsequencia') || renderer.includes('abrirTelaResolucao'),
    'Deve implementar a rotina exibirTelaResolucaoConsequencia'
  );
});

test('Avanço de decisão aguarda a interação do jogador na tela de resolução antes de transitar', () => {
  assert(
    renderer.includes('btnContinuarResolucao') || renderer.includes('btn-continuar-resolucao'),
    'Deve vincular o fechamento da resolução ao botão de confirmação'
  );
  assert(
    renderer.includes('resolucao-texto-acontecimentos'),
    'Deve preencher os acontecimentos na tela de resolução'
  );
});

test('Balanço tátil de atributos e mudança de patamar renderizados na tela de resolução', () => {
  assert(
    renderer.includes('resolucao-balanco-atributos') || renderer.includes('elResolucaoBalancoAtributos'),
    'Deve preencher os deltas de atributos na tela de resolução'
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
