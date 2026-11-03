const path = require('path');
const { CharacterStateStore } = require('../state-store');
const { DeterministicEngine } = require('../engine');
const { carregarTodosEventos } = require('../src/narrative-parser');

console.log("=== INICIANDO TESTE DE SEQUESTRO POR EVENTOS DE CRISE (TICKET 09) ===");

const pastaConteudo = path.join(__dirname, '..', 'conteudo');
const carga = carregarTodosEventos(pastaConteudo);

const store = new CharacterStateStore({
  condicaoSocial: "Filho de Estivador (Mocambo)",
  faseAtual: 1,
  anoAtual: 1958,
  acoesRestantesFase: 2,
  acoesTotaisFase: 2,
  parentesco: { relacao_pai: 2, honra_familiar: 1 },
  atributosFixos: { astucia: 2, sangue_frio: 2, oficio: 2, presenca: 0 },
  recursosVolateis: { capital: 30, influencia: 1, suspeita_dops: 3, moral_popular: 2 },
  historicoDecisoes: []
});

const engine = new DeterministicEngine(store);

// Cenário 1: Estado seguro (sem crise)
const criseInicial = engine.verificarGatilhoCrise();
console.log(`[OK] Gatilho de crise em estado seguro: ${criseInicial} (Esperado: null)`);
if (criseInicial !== null) {
  console.error("FALHA: Crise disparada indevidamente em estado seguro!");
  process.exit(1);
}

// Cenário 2: Suspeita atinge o limiar crítico (10/10)
store.aplicarEfeitos({ suspeita_dops: 7 }); // Suspeita vai para 10
const criseSuspeita = engine.verificarGatilhoCrise();
console.log(`\n[OK] Gatilho de crise ativado: ${criseSuspeita.tipo} (Esperado: 'suspeita_maxima')`);
console.log(`- Crise ID: ${criseSuspeita.criseId}`);
console.log(`- Motivo: ${criseSuspeita.motivo}`);

if (!criseSuspeita || criseSuspeita.criseId !== 'crise_urgente_batida_dops') {
  console.error("FALHA: Crise de suspeita do DOPS não disparou!");
  process.exit(1);
}

// Sequestro do Dossiê
const dossieSequestrado = engine.obterEventosDossie(carga.eventos);
console.log(`[OK] Dossiê sequestrado: ${dossieSequestrado.tipoDossie} (Esperado: 'crise_sequestrada')`);
console.log(`- Evento compulsório: ${dossieSequestrado.eventosDisponiveis[0].metadata.titulo}`);

if (
  dossieSequestrado.tipoDossie !== 'crise_sequestrada' ||
  dossieSequestrado.eventosDisponiveis[0].metadata.id !== 'crise_urgente_batida_dops'
) {
  console.error("FALHA: Sequestro do dossiê falhou!");
  process.exit(1);
}

// Cenário 3: Resolução desesperada da crise (suborno do inspetor)
const eventoCrise = carga.eventos['crise_urgente_batida_dops'];
const resCrise = engine.executarDecisao(eventoCrise, 'subornar_inspetor');
const estadoPosCrise = store.getState();

console.log(`\n[OK] Crise resolvida:`);
console.log(`- Nova Suspeita DOPS: ${estadoPosCrise.recursosVolateis.suspeita_dops} (Esperado: 5)`);
console.log(`- Novo Capital: ${estadoPosCrise.recursosVolateis.capital} (Esperado: 5)`);

const criseResolvida = engine.verificarGatilhoCrise();
console.log(`[OK] Gatilho de crise pós-resolução: ${criseResolvida} (Esperado: null)`);

if (criseResolvida !== null || estadoPosCrise.recursosVolateis.suspeita_dops !== 5) {
  console.error("FALHA: Crise deveria estar neutralizada pós-resolução!");
  process.exit(1);
}

// Cenário 4: Limiar de Capital Zerado (Despejo)
store.aplicarEfeitos({ capital: -10 }); // Capital zera
const criseCapital = engine.verificarGatilhoCrise();
console.log(`\n[OK] Gatilho de falência: ${criseCapital.tipo} (Esperado: 'falencia_capital')`);
console.log(`- Crise ID: ${criseCapital.criseId} (Esperado: 'crise_urgente_miseria_despejo')`);

if (!criseCapital || criseCapital.criseId !== 'crise_urgente_miseria_despejo') {
  console.error("FALHA: Crise de miséria/despejo não disparou com capital zero!");
  process.exit(1);
}

console.log("\n=== TESTE DE SEQUESTRO DE CRISE CONCLUÍDO COM 100% DE SUCESSO! ===");

