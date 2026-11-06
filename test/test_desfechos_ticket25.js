/**
 * Águas de Ferro — Suíte de Testes Automatizados: Ticket 25
 * Schema & Redação das Crônicas de Desfecho nos Eventos Históricos
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { parseEventFile, carregarTodosEventos } = require('../src/narrative-parser');
const { compilarEventosParaWeb } = require('../scripts/build-web');

console.log('=================================================================');
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 25 (CRÔNICAS DE DESFECHO)');
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

const pastaConteudo = path.join(__dirname, '..', 'conteudo');

// =================================================================
// [TIER 1] Validação do Parser e Schema para o campo 'desfecho'
// =================================================================
console.log('[TIER 1] Validação do Parser e Schema para o campo desfecho');

test('Opções com desfecho explícito geram desfecho e desfechoHtml com grifos históricos', () => {
  const caminhoNascimento = path.join(pastaConteudo, 'fase_1', '00_infancia_1948_nascimento.md');
  const evento = parseEventFile(caminhoNascimento);
  assert(!evento.erro, 'Evento deve ser parseado sem erros');
  assert(Array.isArray(evento.metadata.opcoes), 'Evento deve conter lista de opções');

  evento.metadata.opcoes.forEach((opcao, idx) => {
    assert(opcao.desfecho && typeof opcao.desfecho === 'string', `Opção [${idx}] deve conter texto de desfecho`);
    assert(opcao.desfechoHtml && typeof opcao.desfechoHtml === 'string', `Opção [${idx}] deve conter desfechoHtml`);
    assert(opcao.desfecho.length > 20, `Desfecho da opção [${idx}] deve ser substancial e literário`);
  });
});

test('Opções sem desfecho explícito recebem fallback diegético automático', () => {
  // Cria um arquivo temporário em memória para testar fallback
  const tempPath = path.join(__dirname, 'temp_teste_evento_sem_desfecho.md');
  const tempMd = `---
id: "ev_teste_sem_desfecho"
titulo: "Teste Sem Desfecho"
fase: 1
ano: 1958
tipo: "dossie"
opcoes:
  - id: "opcao_a"
    rotulo: "Tomar uma atitude qualquer"
    descricao: "Consequência resumida aqui."
    carimbo: "TESTE"
---
Texto narrativo de teste.
`;
  try {
    fs.writeFileSync(tempPath, tempMd, 'utf8');
    const evento = parseEventFile(tempPath);
    assert(!evento.erro, 'Deve carregar evento temporário');
    const opcao = evento.metadata.opcoes[0];
    assert(opcao.desfecho && typeof opcao.desfecho === 'string', 'Fallback de desfecho deve ser gerado');
    assert(opcao.desfechoHtml && typeof opcao.desfechoHtml === 'string', 'Fallback de desfechoHtml deve ser gerado');
    assert(opcao.desfecho.includes('TESTE'), 'Fallback deve incorporar o carimbo da opção');
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
});

// =================================================================
// [TIER 2] Verificação da Cobertura de Desfechos nos Eventos da Fase 1
// =================================================================
console.log('\n[TIER 2] Verificação de Cobertura de Desfechos nos Eventos da Fase 1');

test('Todos os eventos da Fase 1 contêm desfechos literários em todas as opções (nos arquivos markdown)', () => {
  const matter = require('gray-matter');
  const carga = carregarTodosEventos(pastaConteudo);
  const eventosFase1 = Object.values(carga.eventos).filter(ev => Number(ev.metadata.fase) === 1);
  assert(eventosFase1.length >= 8, 'Fase 1 deve ter ao menos 8 eventos cadastrados');

  let totalOpcoes = 0;
  let totalComDesfechoNoMarkdown = 0;

  eventosFase1.forEach(ev => {
    const raw = fs.readFileSync(ev.arquivoOrigem, 'utf8');
    const parsedData = matter(raw).data;
    parsedData.opcoes.forEach(op => {
      totalOpcoes++;
      if (op.desfecho && op.desfecho.length > 25) {
        totalComDesfechoNoMarkdown++;
      }
    });
  });

  assert.strictEqual(
    totalComDesfechoNoMarkdown,
    totalOpcoes,
    `Todas as opções da Fase 1 devem possuir desfecho literário explícito no markdown (${totalComDesfechoNoMarkdown}/${totalOpcoes})`
  );
});

// =================================================================
// [TIER 3] Verificação do Web Bundle (scripts/build-web.js)
// =================================================================
console.log('\n[TIER 3] Verificação do Web Bundle');

test('Gerador de Web Bundle compila desfecho e desfechoHtml para eventos.json e eventos-bundle.js', () => {
  compilarEventosParaWeb();
  const jsonPath = path.join(pastaConteudo, 'eventos.json');
  const bundlePath = path.join(pastaConteudo, 'eventos-bundle.js');

  assert(fs.existsSync(jsonPath), 'eventos.json deve existir');
  assert(fs.existsSync(bundlePath), 'eventos-bundle.js deve existir');

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const ev1 = jsonData.eventos['ev_f1_1948_nascimento'];
  assert(ev1, 'Evento de nascimento deve estar presente no bundle');
  assert(ev1.metadata.opcoes[0].desfecho, 'Opção 0 de nascimento deve conter desfecho no bundle JSON');
  assert(ev1.metadata.opcoes[0].desfechoHtml, 'Opção 0 de nascimento deve conter desfechoHtml no bundle JSON');

  const bundleCode = fs.readFileSync(bundlePath, 'utf8');
  assert(bundleCode.includes('desfecho'), 'Bundle JS deve conter campo desfecho');
  assert(bundleCode.includes('desfechoHtml'), 'Bundle JS deve conter campo desfechoHtml');
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
