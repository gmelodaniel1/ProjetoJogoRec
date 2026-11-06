/**
 * Águas de Ferro — Suíte de Testes Automatizados: Ticket 30
 * Personagens em Recorte de Papel (Paper Mario) com Estética Xilogravura & Darkest Dungeon
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=================================================================');
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 30 (PERSONAGENS XILO)');
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
const parserPath = path.join(__dirname, '..', 'src', 'narrative-parser.js');
const xiloPath = path.join(__dirname, '..', 'src', 'xilogravura-svg.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const renderer = fs.readFileSync(rendererPath, 'utf8');
const { parseEventFile } = require(parserPath);

// =================================================================
// [TIER 1] Schema & Parsing de Personagens e Oradores
// =================================================================
console.log('[TIER 1] Schema & Parsing de Personagens no Roteiro (src/narrative-parser.js)');

const eventoPatioPath = path.join(__dirname, '..', 'conteudo', 'fase_1', '01_patio_das_oficinas.md');
const parsedPatio = parseEventFile(eventoPatioPath);

test('Parser carrega evento sem erros e preserva compatibilidade retroativa', () => {
  assert(!parsedPatio.erro, 'Evento do Pátio das Oficinas deve compilar sem erros');
  assert(parsedPatio.metadata, 'Metadata do evento deve existir');
});

test('Parser suporta personagens_cena e beats_oradores na estrutura de metadados', () => {
  assert(parsedPatio.metadata.personagens_cena !== undefined, 'personagens_cena deve ser processado pelo parser');
  assert(Array.isArray(parsedPatio.metadata.beats_oradores), 'beats_oradores deve ser uma lista normalizada');
});

test('Parser normaliza beats_oradores e atribui orador Mestre Severino ao diálogo do pai', () => {
  const oradores = parsedPatio.metadata.beats_oradores;
  assert(oradores.length >= 2, 'Evento deve conter ao menos 2 beats mapeados');
  // Beat 0: narração de ambiente (null)
  assert.strictEqual(oradores[0], null, 'Primeiro beat (descrição do cais) deve ter orador null');
  // Beat 1: fala direta do pai ("Eles estão vindo...")
  assert.strictEqual(oradores[1], 'severino', 'Segundo beat (fala do pai) deve ter orador severino');
});

// =================================================================
// [TIER 2] Módulo Procedural de Xilogravura & Darkest Dungeon
// =================================================================
console.log('\n[TIER 2] Módulo Gerador Procedural de Xilogravura (src/xilogravura-svg.js)');

let xilogravuraModule = null;
try {
  xilogravuraModule = require(xiloPath);
} catch (e) {
  xilogravuraModule = null;
}

test('Módulo src/xilogravura-svg.js existe e exporta gerarSvgPersonagemXilogravura', () => {
  assert(fs.existsSync(xiloPath), 'Arquivo src/xilogravura-svg.js deve existir');
  assert(xilogravuraModule && typeof xilogravuraModule.gerarSvgPersonagemXilogravura === 'function',
    'Função gerarSvgPersonagemXilogravura deve ser exportada');
});

test('gerarSvgPersonagemXilogravura gera SVG vetorial válido para o Mestre Severino', () => {
  const svgSeverino = xilogravuraModule.gerarSvgPersonagemXilogravura('severino', { expressao: 'grave' });
  assert(typeof svgSeverino === 'string', 'Retorno deve ser uma string');
  assert(svgSeverino.includes('<svg'), 'Deve conter abertura de tag <svg');
  assert(svgSeverino.includes('</svg>'), 'Deve conter fechamento de tag </svg>');
  assert(svgSeverino.includes('viewBox='), 'Deve conter atributo viewBox');
  // Atributos de xilogravura e chiaroscuro Darkest Dungeon
  assert(svgSeverino.includes('xilo-sombra-olhos') || svgSeverino.includes('nanquim'),
    'Deve conter camadas de chiaroscuro / sombra nos olhos');
  assert(svgSeverino.includes('#F8F5EE') || svgSeverino.includes('borda-papel-recorte'),
    'Deve conter margem de corte de papel marfim #F8F5EE');
});

test('gerarSvgPersonagemXilogravura possui fallback defensivo para personagens genéricos', () => {
  const svgGenerico = xilogravuraModule.gerarSvgPersonagemXilogravura('personagem_desconhecido');
  assert(svgGenerico.includes('<svg'), 'Fallback deve gerar SVG válido');
  assert(svgGenerico.includes('</svg>'), 'Fallback deve fechar tag SVG');
});

// =================================================================
// [TIER 3] Estrutura no DOM (index.html)
// =================================================================
console.log('\n[TIER 3] Estrutura no DOM e Componentes de Palco (index.html)');

test('index.html contém a camada de sobreposição do personagem recortado no palco', () => {
  assert(html.includes('id="camada-personagem-recorte"') || html.includes('class="camada-personagem-recorte"'),
    'Deve conter camada-personagem-recorte no palco visual');
  assert(html.includes('id="personagem-figura-slot"'), 'Deve conter #personagem-figura-slot para injetar o recorte');
});

test('index.html contém o balão de fala e fita conectora de diálogo com a folha narrativa', () => {
  assert(html.includes('id="balao-fala-recorte"') || html.includes('class="balao-fala-recorte"'),
    'Deve conter balão de fala diegético no palco');
  assert(html.includes('id="orador-nome"'), 'Deve conter elemento #orador-nome');
  assert(html.includes('id="fita-conectora-dialogo"') || html.includes('class="fita-conectora-dialogo"'),
    'Deve conter elemento de fita conectora com a folha de diálogo');
});

// =================================================================
// [TIER 4] Estilização Visual & Conformidade com Diretrizes Noir
// =================================================================
console.log('\n[TIER 4] Estilização Visual & Conformidade Noir (style.css)');

test('style.css contém regras de estilização para o recorte de papel e balão conector', () => {
  assert(css.includes('.camada-personagem-recorte'), 'style.css deve definir .camada-personagem-recorte');
  assert(css.includes('.personagem-recorte-papel'), 'style.css deve definir .personagem-recorte-papel');
  assert(css.includes('.balao-fala-recorte'), 'style.css deve definir .balao-fala-recorte');
  assert(css.includes('.fita-conectora-dialogo'), 'style.css deve definir .fita-conectora-dialogo');
});

test('Conformidade estrita com Visual Blacklist nas novas regras (zero border-radius e zero #FFFFFF)', () => {
  const trechoTicket30Regex = /\/\* =+\s*TICKET 30:[\s\S]*?(?=\/\* =+|$)/i;
  const matchTrecho = css.match(trechoTicket30Regex);
  const trechoTicket30 = matchTrecho ? matchTrecho[0] : css;

  const borderRadiusMatch = trechoTicket30.match(/border-radius:\s*([1-9][0-9]*px)/i);
  assert.strictEqual(borderRadiusMatch, null, `Encontrado border-radius moderno proibido no Ticket 30: ${borderRadiusMatch ? borderRadiusMatch[0] : ''}`);

  const whiteMatch = trechoTicket30.match(/(#ffffff|#fff\b)/i);
  assert.strictEqual(whiteMatch, null, `Encontrado #FFFFFF proibido no Ticket 30: ${whiteMatch ? whiteMatch[0] : ''}`);
});

test('style.css define animação de entrada de papel e sombra projetada (drop shadow)', () => {
  assert(css.includes('drop-shadow') || css.includes('box-shadow'), 'Recorte de papel deve ter sombra projetada');
  assert(css.includes('@keyframes pousarPapel') || css.includes('@keyframes entradaRecortePapel'),
    'Deve existir animação tátil de entrada de papel');
});

// =================================================================
// [TIER 5] Lógica no Renderer & Integração com Áudio
// =================================================================
console.log('\n[TIER 5] Lógica no Renderer & Áudio Analógico (renderer.js)');

test('renderer.js define funções para controle do recorte de personagem por beat', () => {
  assert(renderer.includes('atualizarRecortePersonagem'), 'renderer.js deve conter atualizarRecortePersonagem');
  assert(renderer.includes('ocultarRecortePersonagem'), 'renderer.js deve conter ocultarRecortePersonagem');
});

test('renderer.js conecta somPapel() na entrada do recorte de personagem', () => {
  assert(renderer.includes('audioManager.somPapel()'), 'renderer.js deve disparar somPapel() ao apresentar o recorte');
});

test('renderer.js aplica escurecimento sutil ao cenário quando o personagem está ativo', () => {
  assert(renderer.includes('cenario-com-personagem') || renderer.includes('escurecerCenario'),
    'renderer.js deve alterar classe ou filtro do cenário ao fundo quando o personagem fala');
});

// =================================================================
// Conclusão da Suíte
// =================================================================
console.log('=================================================================');
console.log(`TOTAL DE TESTES TICKET 30: ${aprovados + reprovados}`);
console.log(`  ✔ APROVADOS:  ${aprovados}`);
console.log(`  ✖ REPROVADOS: ${reprovados}`);
console.log('=================================================================\n');

if (reprovados > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
