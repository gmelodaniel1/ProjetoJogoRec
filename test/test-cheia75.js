const path = require('path');
const { CharacterStateStore } = require('../state-store');
const { DeterministicEngine } = require('../engine');
const { carregarTodosEventos } = require('../src/narrative-parser');

console.log("=== INICIANDO TESTE DO MODO SOBREVIVÊNCIA (CHEIA DE 75) ===");

const pastaConteudo = path.join(__dirname, '..', 'conteudo');
const carga = carregarTodosEventos(pastaConteudo);

const store = new CharacterStateStore({
  condicaoSocial: "Filho de Estivador (Mocambo)",
  faseAtual: 1,
  anoAtual: 1958,
  acoesRestantesFase: 3,
  acoesTotaisFase: 3,
  parentesco: { relacao_pai: 2, honra_familiar: 2 },
  atributosFixos: { astucia: 2, sangue_frio: 2, oficio: 2, presenca: 2 },
  recursosVolateis: { capital: 50, influencia: 2, suspeita_dops: 2, moral_popular: 4 },
  historicoDecisoes: []
});
const engine = new DeterministicEngine(store);

// Salto direto para a Fase 3 (Julho de 1975)
store.avancarFase(3);
const estadoFase3 = store.getState();

console.log(`[OK] Fase Ativa: ${estadoFase3.faseAtual} (Ano: ${estadoFase3.anoAtual})`);
console.log(`- Nível Inicial do Rio Capibaribe: ${estadoFase3.cheia75.nivelRioMetros} m (Esperado: 1.5)`);
console.log(`- Horas até o Pico: ${estadoFase3.cheia75.horasRestantes} h (Esperado: 18)`);

if (estadoFase3.faseAtual !== 3 || estadoFase3.cheia75.nivelRioMetros !== 1.5) {
  console.error("FALHA: Inicialização da Fase 3 incorreta!");
  process.exit(1);
}

// Teste 1: Executar evento da Madalena (Consome 4 horas e sobe 0.8m)
const eventoMadalena = carga.eventos['ev_f3_01_subida_aguas_madalena'];
if (!eventoMadalena) {
  console.error("FALHA: Evento ev_f3_01_subida_aguas_madalena não encontrado!");
  process.exit(1);
}

engine.executarDecisao(eventoMadalena, 'resgatar_arquivos_sindicais');
const estadoAposEvento1 = store.getState();

console.log("\n[OK] Decisão 1 executada (Resgate de Arquivos):");
console.log(`- Novo nível do rio: +${estadoAposEvento1.cheia75.nivelRioMetros} m (Esperado: 2.3)`);
console.log(`- Horas restantes: ${estadoAposEvento1.cheia75.horasRestantes} h (Esperado: 14)`);

if (estadoAposEvento1.cheia75.nivelRioMetros !== 2.3 || estadoAposEvento1.cheia75.horasRestantes !== 14) {
  console.error("FALHA: Cálculo hidrológico da Cheia de 75 incorreto!");
  process.exit(1);
}

// Teste 2: Executar evento do Boato de Tapacurá (Consome 5 horas e sobe 1.0m)
const eventoTapacura = carga.eventos['ev_f3_02_o_boato_de_tapacura'];
engine.executarDecisao(eventoTapacura, 'acalmar_a_multidao');
const estadoAposEvento2 = store.getState();

console.log("\n[OK] Decisão 2 executada (Pânico de Tapacurá):");
console.log(`- Novo nível do rio: +${estadoAposEvento2.cheia75.nivelRioMetros} m (Esperado: 3.3)`);
console.log(`- Horas restantes: ${estadoAposEvento2.cheia75.horasRestantes} h (Esperado: 9)`);

if (estadoAposEvento2.cheia75.nivelRioMetros !== 3.3 || estadoAposEvento2.cheia75.horasRestantes !== 9) {
  console.error("FALHA: Cálculo hidrológico do Boato de Tapacurá incorreto!");
  process.exit(1);
}

// Teste 3: Executar Clímax da Cheia de 75 (Alcança pico máximo)
const eventoClimaxCheia = carga.eventos['ev_f3_03_climax_recife_submerso'];
engine.executarDecisao(eventoClimaxCheia, 'sobrevivencia_silenciosa');
const estadoFinalCheia = store.getState();

console.log("\n[OK] Clímax Histórico executado (O Veredito das Águas):");
console.log(`- Nível do rio no clímax: +${estadoFinalCheia.cheia75.nivelRioMetros} m (Esperado: 4.5)`);
console.log(`- Pico da cheia atingido: ${estadoFinalCheia.cheia75.picoCheiaAtingido} (Esperado: true)`);

if (estadoFinalCheia.cheia75.nivelRioMetros !== 4.5 || !estadoFinalCheia.cheia75.picoCheiaAtingido) {
  console.error("FALHA: Clímax da cheia de 75 não atingiu pico esperado!");
  process.exit(1);
}

console.log("\n=== TESTE DO MODO SOBREVIVÊNCIA CONCLUÍDO COM 100% DE SUCESSO! ===");
