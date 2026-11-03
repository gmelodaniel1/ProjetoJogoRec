const path = require('path');
const { CharacterStateStore } = require('../state-store');
const { DeterministicEngine } = require('../engine');
const { carregarTodosEventos } = require('../src/narrative-parser');

console.log("=== INICIANDO TESTE DO SISTEMA DE DOSSIÊ E ECONOMIA DE AÇÕES ===");

const pastaConteudo = path.join(__dirname, '..', 'conteudo');
const carga = carregarTodosEventos(pastaConteudo);

if (carga.erros.length > 0) {
  console.error("ERRO ao carregar eventos:", carga.erros);
  process.exit(1);
}

const store = new CharacterStateStore({
  condicaoSocial: "Filho de Estivador (Mocambo)",
  faseAtual: 1,
  anoAtual: 1958,
  acoesRestantesFase: 2,
  acoesTotaisFase: 2,
  parentesco: { relacao_pai: 2, honra_familiar: 1 },
  atributosFixos: { astucia: 2, sangue_frio: 1, oficio: 2, presenca: 0 },
  recursosVolateis: { capital: 40, influencia: 1, suspeita_dops: 2, moral_popular: 3 },
  historicoDecisoes: []
});

const engine = new DeterministicEngine(store);

// Teste 1: Obter Dossiê com Ações Restantes (deve listar eventos do tipo 'dossie')
const dossie1 = engine.obterEventosDossie(carga.eventos);
console.log(`[OK] Tipo de Dossiê: ${dossie1.tipoDossie} (Esperado: 'agenda')`);
console.log(`- Eventos disponíveis: ${dossie1.eventosDisponiveis.length}`);
console.log(`- Ações restantes: ${dossie1.acoesRestantes}`);

if (dossie1.tipoDossie !== 'agenda' || dossie1.eventosDisponiveis.length === 0) {
  console.error("FALHA: Dossiê não retornou agenda de eventos de fase 1!");
  process.exit(1);
}

// Teste 2: Consumir ações resolvendo eventos de dossiê
const evento1 = carga.eventos['ev_f1_01_patio_das_oficinas'];
const res1 = engine.executarDecisao(evento1, 'aceitar_fardo');
console.log(`\n[OK] Evento 1 resolvido. Ações restantes: ${store.getState().acoesRestantesFase} (Esperado: 1)`);

const evento2 = carga.eventos['ev_f1_02_panfletagem_na_varzea'];
const res2 = engine.executarDecisao(evento2, 'vigiar_perimetro');
console.log(`[OK] Evento 2 resolvido. Ações restantes: ${store.getState().acoesRestantesFase} (Esperado: 0)`);

if (store.getState().acoesRestantesFase !== 0) {
  console.error("FALHA: Ações da fase deveriam estar esgotadas!");
  process.exit(1);
}

// Teste 3: Dossiê com Ações Esgotadas deve retornar Clímax Obrigatório
const dossieClimax = engine.obterEventosDossie(carga.eventos);
console.log(`\n[OK] Tipo de Dossiê após esgotar ações: ${dossieClimax.tipoDossie} (Esperado: 'climax')`);
console.log(`- Eventos de clímax disponíveis: ${dossieClimax.eventosDisponiveis.length}`);
console.log(`- Título do Clímax: ${dossieClimax.eventosDisponiveis[0].metadata.titulo}`);

if (
  dossieClimax.tipoDossie !== 'climax' ||
  dossieClimax.eventosDisponiveis[0].metadata.id !== 'ev_f1_03_climax_marco_1964'
) {
  console.error("FALHA: Clímax de 1964 não foi ativado após esgotar ações!");
  process.exit(1);
}

// Teste 4: Executar o Clímax e Avançar para a Fase 2 (Anos de Chumbo)
const eventoClimax = carga.eventos['ev_f1_03_climax_marco_1964'];
const resClimax = engine.executarDecisao(eventoClimax, 'queimar_arquivos');
const estadoFase2 = store.getState();

console.log(`\n[OK] Clímax resolvido. Nova Fase: ${estadoFase2.faseAtual} (Esperado: 2)`);
console.log(`- Novo Ano: ${estadoFase2.anoAtual} (Esperado: 1968)`);
console.log(`- Ações recarregadas para Fase 2: ${estadoFase2.acoesRestantesFase} (Esperado: 4)`);

if (
  estadoFase2.faseAtual !== 2 ||
  estadoFase2.anoAtual !== 1968 ||
  estadoFase2.acoesRestantesFase !== 4
) {
  console.error("FALHA: Transição para a Fase 2 incorreta!");
  process.exit(1);
}

console.log("\n=== TESTE DO SISTEMA DE DOSSIÊ CONCLUÍDO COM 100% DE SUCESSO! ===");

