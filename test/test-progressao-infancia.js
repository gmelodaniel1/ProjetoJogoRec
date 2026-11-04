const path = require('path');
const { CharacterStateStore } = require('../state-store');
const { DeterministicEngine } = require('../engine');
const { carregarTodosEventos } = require('../src/narrative-parser');

console.log("=== INICIANDO TESTE DE PROGRESSÃO DA INFÂNCIA (1948–1953) ===");

const pastaConteudo = path.join(__dirname, '..', 'conteudo');
const carga = carregarTodosEventos(pastaConteudo);

if (carga.erros.length > 0) {
  console.error("FALHA ao carregar eventos:", carga.erros);
  process.exit(1);
}

const store = new CharacterStateStore(); // Inicia com padrão: 1948, Nascimento, Idade 0
const engine = new DeterministicEngine(store);

// 1. Verificação do Estado Inicial
console.log(`- Ano Inicial: ${store.getState().anoAtual} (Esperado: 1948)`);
console.log(`- Idade Inicial: ${store.getIdade()} (Esperado: 0)`);
console.log(`- Etapa Inicial: ${store.getEtapaVida().nome} (Esperado: Infância & Primeiros Passos)`);

if (store.getState().anoAtual !== 1948 || store.getIdade() !== 0 || store.getEtapaVida().id !== 'infancia') {
  console.error("FALHA: Estado inicial não começou no nascimento em 1948!");
  process.exit(1);
}

// 2. Ano 1948: Nascimento
const dossie1948 = engine.obterEventosDossie(carga.eventos);
if (dossie1948.eventosDisponiveis.length !== 1 || dossie1948.eventosDisponiveis[0].metadata.id !== 'ev_f1_1948_nascimento') {
  console.error("FALHA: Dossiê de 1948 não retornou exclusivamente o evento de nascimento!", dossie1948);
  process.exit(1);
}
console.log("[OK] Evento de 1948 localizado isoladamente no dossiê.");

engine.executarDecisao(dossie1948.eventosDisponiveis[0], 'choro_forte');
if (store.getState().anoAtual !== 1949 || store.getIdade() !== 1) {
  console.error(`FALHA: Transição para 1949 falhou! Ano: ${store.getState().anoAtual}, Idade: ${store.getIdade()}`);
  process.exit(1);
}
console.log("[OK] Transição 1948 ➔ 1949 concluída com sucesso (Idade: 1 ano).");

// 3. Sequência de 1949 a 1952
const eventosInfancia = [
  { ano: 1949, id: 'ev_f1_1949_primeiros_passos', opcao: 'segurar_ferramentas_pai' },
  { ano: 1950, id: 'ev_f1_1950_margens_do_rio', opcao: 'observar_movimento_aguas' },
  { ano: 1951, id: 'ev_f1_1951_pregoes_da_rua', opcao: 'imitar_pregoes_feira' },
  { ano: 1952, id: 'ev_f1_1952_primeiras_letras', opcao: 'desenhar_letras_tabua' }
];

for (const step of eventosInfancia) {
  const dossie = engine.obterEventosDossie(carga.eventos);
  if (dossie.eventosDisponiveis.length !== 1 || dossie.eventosDisponiveis[0].metadata.id !== step.id) {
    console.error(`FALHA: Evento do ano ${step.ano} não foi servido corretamente!`, dossie.eventosDisponiveis);
    process.exit(1);
  }
  engine.executarDecisao(dossie.eventosDisponiveis[0], step.opcao);
  console.log(`[OK] Ano ${step.ano} resolvido ➔ Avançou para ${store.getState().anoAtual} (Idade: ${store.getIdade()} anos).`);
}

// 4. Ano 1953: Fim da Infância e Salto para 1958
if (store.getState().anoAtual !== 1953 || store.getIdade() !== 5) {
  console.error(`FALHA: Ano esperado era 1953, obteve: ${store.getState().anoAtual}`);
  process.exit(1);
}

const dossie1953 = engine.obterEventosDossie(carga.eventos);
if (dossie1953.eventosDisponiveis[0].metadata.id !== 'ev_f1_1953_fim_da_infancia') {
  console.error("FALHA: Evento de fim da infância não retornado em 1953!");
  process.exit(1);
}

engine.executarDecisao(dossie1953.eventosDisponiveis[0], 'entrar_oficina_pai');

// Deve ter saltado para 1958
const estadoPosInfancia = store.getState();
console.log(`- Ano pós-infância: ${estadoPosInfancia.anoAtual} (Esperado: 1958)`);
console.log(`- Idade: ${store.getIdade()} anos (Esperado: 10 anos)`);
console.log(`- Etapa: ${store.getEtapaVida().nome} (Esperado: Juventude & Formação Política)`);
console.log(`- Ações de Fase preservadas: ${estadoPosInfancia.acoesRestantesFase} (Esperado: 4)`);

if (
  estadoPosInfancia.anoAtual !== 1958 ||
  store.getIdade() !== 10 ||
  store.getEtapaVida().id !== 'juventude' ||
  estadoPosInfancia.acoesRestantesFase !== 4
) {
  console.error("FALHA: Salto temporal da infância para a juventude (1958) inconsistente!");
  process.exit(1);
}

console.log("\n=== TESTE DE PROGRESSÃO DA INFÂNCIA CONCLUÍDO COM 100% DE SUCESSO! ===");

