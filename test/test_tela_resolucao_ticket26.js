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
// [TIER 1] Verificação dos Elementos e Acessibilidade no DOM
// =================================================================
console.log('[TIER 1] Verificação dos Elementos e Acessibilidade no DOM (index.html)');

test('Overlay e folha de papel sobreposto de resolução existem no HTML', () => {
  assert(html.includes('id="overlay-resolucao-consequencia"'), 'Elemento #overlay-resolucao-consequencia deve existir');
  assert(html.includes('id="cartao-resolucao-papel"'), 'Elemento #cartao-resolucao-papel deve existir');
});

test('Acessibilidade estrita: role="dialog", aria-modal="true" e rotulagem descritiva', () => {
  assert(html.includes('role="dialog"'), 'Overlay deve possuir role="dialog"');
  assert(html.includes('aria-modal="true"'), 'Overlay deve possuir aria-modal="true"');
  assert(html.includes('aria-labelledby="resolucao-selo-oficial"'), 'Overlay deve apontar aria-labelledby para o selo oficial');
  assert(html.includes('aria-describedby="resolucao-texto-acontecimentos"'), 'Overlay deve apontar aria-describedby para os acontecimentos');
});

test('Elementos de carimbo, moldura de foto, crônica de desfecho e balanço existem', () => {
  assert(html.includes('id="resolucao-carimbo-box"'), 'Deve conter elemento para o box do carimbo da decisão');
  assert(html.includes('id="resolucao-carimbo-texto"'), 'Deve conter elemento para o carimbo da decisão');
  assert(html.includes('id="resolucao-moldura-foto"'), 'Deve conter container para moldura da foto');
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

test('Variações cromáticas do carimbo oficial implementadas no CSS', () => {
  assert(css.includes('.carimbo-tom-vermelho'), 'Deve estilizar carimbos de tom vermelho');
  assert(css.includes('.carimbo-tom-azul'), 'Deve estilizar carimbos de tom azul');
  assert(css.includes('.carimbo-tom-verde'), 'Deve estilizar carimbos de tom verde');
  assert(css.includes('.carimbo-tom-sepia'), 'Deve estilizar carimbos de tom sépia');
});

test('Suporte estilístico a fallback de ilustração procedural SVG na moldura fotográfica', () => {
  assert(css.includes('.resolucao-svg-fallback-wrapper'), 'Classe .resolucao-svg-fallback-wrapper deve estar estilizada');
});

test('Respeito estrito ao Visual Blacklist (zero border-radius e zero #FFFFFF)', () => {
  const regexRadiusPapel = /\.cartao-resolucao-papel[\s\S]*?\{[\s\S]*?border-radius:\s*([1-9][0-9]*px)/i;
  assert(!regexRadiusPapel.test(css), 'Folha de resolução não deve conter border-radius moderno');

  const regexRadiusBtn = /\.btn-continuar-resolucao[\s\S]*?\{[\s\S]*?border-radius:\s*([1-9][0-9]*px)/i;
  assert(!regexRadiusBtn.test(css), 'Botão de continuar resolução não deve conter border-radius moderno');

  const regexPureWhiteBtn = /\.btn-continuar-resolucao[\s\S]*?\{[\s\S]*?color:\s*#FFFFFF/i;
  assert(!regexPureWhiteBtn.test(css), 'Botão de continuar resolução não deve usar #FFFFFF puro');
  assert(!css.includes('color: #FFFFFF'), 'Zero uso de #FFFFFF absoluto em style.css');
});

// =================================================================
// [TIER 3] Verificação da Lógica e Robustez no Renderer (renderer.js)
// =================================================================
console.log('\n[TIER 3] Verificação da Lógica no renderer.js');

test('Caminho de fotografia com prefixo artes/ e fallback defensivo para SVG procedural', () => {
  assert(renderer.includes('artes/${meta.imagem}'), 'Deve prefixar o caminho da imagem com artes/');
  assert(renderer.includes('gerarSvgCenario(evento'), 'Deve acionar gerarSvgCenario em caso de ausência ou erro de imagem');
});

test('Leitura iconográfica de tombo_mcr fiel ao roteiro', () => {
  assert(renderer.includes('meta.tombo_mcr'), 'Deve utilizar tombo_mcr do metadata para a legenda do acervo');
});

test('Classificação tonal dinâmica do carimbo oficial e formatação segura', () => {
  assert(renderer.includes('obterClasseTomCarimbo'), 'Deve classificar carimbos por tom tonal correspondente');
  assert(renderer.includes('escaparHtml'), 'Deve higienizar strings injetadas');
});

test('Helper compartilhado descreverDelta elimina código duplicado e respeita polaridade invertida', () => {
  assert(renderer.includes('function descreverDelta'), 'Deve conter rotina compartilhada descreverDelta');
  assert(renderer.includes('ATRIBUTOS_POLARIDADE_INVERTIDA'), 'Deve identificar polaridade invertida (suspeita_dops)');
});

test('Ordem síncrona: resolucaoEmExibicao sinalizada antes de executarDecisao para adiar virada de ano', () => {
  const idxSinalizacao = renderer.indexOf('resolucaoEmExibicao = true;');
  const idxExecucao = renderer.indexOf('engine.executarDecisao(evento, opcao.id);');
  assert(idxSinalizacao !== -1 && idxExecucao !== -1, 'Ambas as instruções devem estar presentes');
  assert(idxSinalizacao < idxExecucao, 'resolucaoEmExibicao deve ser setada antes de engine.executarDecisao');
});

test('Avanço deliberado restrito: sem fechamento por clique no fundo ou Escape, apenas botão/Enter/Espaço', () => {
  assert(!renderer.includes('e.target === elOverlayResolucaoConsequencia'), 'Não deve permitir fechar a folha ao clicar no fundo da mesa');
  assert(!renderer.includes("e.key === 'Escape' && elOverlayResolucaoConsequencia"), 'Não deve fechar a resolução via tecla Escape');
});

test('Extinção da duplicação: painel lateral antigo é desativado pós-resolução', () => {
  assert(renderer.includes('ultimaConsequenciaDecisao = null;'), 'Deve limpar ultimaConsequenciaDecisao para não duplicar no próximo evento');
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
