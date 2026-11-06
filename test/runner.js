// ==========================================================================
// RUNNER CENTRAL DE TESTES AUTOMATIZADOS — ÁGUAS DE FERRO
// ==========================================================================

const { execSync } = require('child_process');
const path = require('path');

const SUITES = [
  { nome: "Parser de Roteiro Markdown & Grifos Históricos", arquivo: "test-parser.js" },
  { nome: "Prontuário do DOPS & Gestor de Estado Reativo", arquivo: "test-state-store.js" },
  { nome: "Motor Determinístico & Checagem de Requisitos", arquivo: "test-engine.js" },
  { nome: "Sistema de Dossiê, Economia de Ações & Clímax", arquivo: "test-dossie.js" },
  { nome: "Sequestro de Agenda & Eventos de Crise Forçados", arquivo: "test-crise.js" },
  { nome: "Modo Sobrevivência da Cheia de 75 & Régua do Rio", arquivo: "test-cheia75.js" },
  { nome: "Progressão Cronológica da Infância (1948–1953)", arquivo: "test-progressao-infancia.js" },
  { nome: "Progressão Cadenciada de Texto — Estilo Disco Elysium (Ticket 24)", arquivo: "test_progressao_texto_ticket24.js" },
  { nome: "Schema & Crônicas de Desfecho Narrativo (Ticket 25)", arquivo: "test_desfechos_ticket25.js" },
  { nome: "Tela Especial de Resolução em Papel Sobreposto (Ticket 26)", arquivo: "test_tela_resolucao_ticket26.js" },
  { nome: "Sistema de Persistência, Save/Load & Auto-Save (Ticket 27)", arquivo: "test_persistencia_save_load_ticket27.js" },
  { nome: "Menu Principal Diegético & Gaveteiro de Arquivos (Ticket 28)", arquivo: "test_menu_gaveteiro_ticket28.js" },
  { nome: "Módulo de Áudio Sintetizado & Soundscape (Ticket 29)", arquivo: "test_audio_manager_ticket29.js" }
];

console.log("=================================================================");
console.log("   ÁGUAS DE FERRO — SUÍTE DE TESTES AUTOMATIZADOS DA ENGINE");
console.log("=================================================================\n");

let falhas = 0;
const inicioTotal = Date.now();

SUITES.forEach((suite, index) => {
  const caminhoScript = path.join(__dirname, suite.arquivo);
  process.stdout.write(`[${index + 1}/${SUITES.length}] Executando: ${suite.nome}... `);
  const inicioSuite = Date.now();

  try {
    execSync(`node "${caminhoScript}"`, { stdio: 'pipe' });
    const duracao = Date.now() - inicioSuite;
    console.log(`\x1b[32mAPROVADO\x1b[0m (${duracao}ms)`);
  } catch (error) {
    falhas++;
    console.log(`\x1b[31mFALHOU\x1b[0m`);
    console.error(`\n--- ERRO EM ${suite.arquivo} ---`);
    console.error(error.stdout ? error.stdout.toString() : error.message);
    console.error("----------------------------------\n");
  }
});

const tempoTotal = Date.now() - inicioTotal;
console.log("\n=================================================================");
if (falhas === 0) {
  console.log(`\x1b[32m✔ TODAS AS ${SUITES.length} SUÍTES DE TESTES FORAM APROVADAS COM SUCESSO!\x1b[0m`);
  console.log(`Tempo total de execução: ${tempoTotal}ms`);
  console.log("=================================================================\n");
  process.exit(0);
} else {
  console.error(`\x1b[31m✖ ${falhas} de ${SUITES.length} suítes de teste falharam!\x1b[0m`);
  console.log("=================================================================\n");
  process.exit(1);
}

