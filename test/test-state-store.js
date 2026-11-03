const { CharacterStateStore } = require('../state-store');

console.log("=== INICIANDO TESTE DO STATE STORE (PRONTUÁRIO DO DOPS) ===");

const store = new CharacterStateStore();
const inicial = store.getState();

console.log(`- Condição Social Inicial: ${inicial.condicaoSocial}`);
console.log(`- Astúcia: ${inicial.atributosFixos.astucia}`);
console.log(`- Suspeita DOPS: ${inicial.recursosVolateis.suspeita_dops}`);

let ultimosDeltas = null;
store.subscribe((estado, deltas) => {
  ultimosDeltas = deltas;
});

// Teste 1: Aplicação de efeitos positivos e negativos
const deltasAplicados = store.aplicarEfeitos({
  astucia: 1,
  capital: -15,
  suspeita_dops: 3,
  relacao_pai: -1
});

const estadoAtual = store.getState();
console.log("\n[OK] Efeitos aplicados:");
console.log(`- Nova Astúcia: ${estadoAtual.atributosFixos.astucia} (Esperado: 3)`);
console.log(`- Novo Capital: ${estadoAtual.recursosVolateis.capital} (Esperado: 25)`);
console.log(`- Nova Suspeita: ${estadoAtual.recursosVolateis.suspeita_dops} (Esperado: 5)`);
console.log(`- Relação com Pai: ${estadoAtual.parentesco.relacao_pai} (Esperado: 1)`);

if (
  estadoAtual.atributosFixos.astucia !== 3 ||
  estadoAtual.recursosVolateis.capital !== 25 ||
  estadoAtual.recursosVolateis.suspeita_dops !== 5 ||
  estadoAtual.parentesco.relacao_pai !== 1
) {
  console.error("FALHA: Cálculo de deltas inconsistente!");
  process.exit(1);
}

// Teste 2: Clamping de Suspeita do DOPS (Máximo 10)
store.aplicarEfeitos({ suspeita_dops: 20 });
const estadoClamped = store.getState();
console.log(`- Suspeita com Clamping: ${estadoClamped.recursosVolateis.suspeita_dops} (Esperado: 10)`);

if (estadoClamped.recursosVolateis.suspeita_dops !== 10) {
  console.error("FALHA: Clamping de Suspeita do DOPS falhou!");
  process.exit(1);
}

// Teste 3: Mudança de Condição Social
store.setCondicaoSocial("Líder Sindical dos Ferroviários");
if (store.getState().condicaoSocial !== "Líder Sindical dos Ferroviários") {
  console.error("FALHA: Alteração de condição social falhou!");
  process.exit(1);
}

console.log("\n=== TESTE DO STATE STORE CONCLUÍDO COM 100% DE SUCESSO! ===");

