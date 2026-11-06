// ==========================================================================
// TESTE AUTOMATIZADO: TICKET 27 — SISTEMA DE PERSISTÊNCIA, SAVE/LOAD & AUTO-SAVE
// ==========================================================================

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { CharacterStateStore, ESTADO_INICIAL_PADRAO } = require('../state-store.js');
const { 
  SaveManager, 
  MemoryStorage, 
  SLOTS_DISPONIVEIS, 
  NOMES_PADRAO_SLOTS,
  VERSAO_SCHEMA_SAVE 
} = require('../save-manager.js');

let aprovados = 0;
let reprovados = 0;

function test(descricao, fn) {
  try {
    fn();
    console.log(`  ✔ ${descricao}`);
    aprovados++;
  } catch (err) {
    console.error(`  ✖ FALHOU: ${descricao}`);
    console.error(`    -> ${err.message}`);
    reprovados++;
  }
}

console.log("=================================================================");
console.log("   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 27 (SAVE/LOAD)");
console.log("=================================================================\n");

// -----------------------------------------------------------------------------
// [TIER 1] Arquitetura, Módulo SaveManager e StorageAdapter
// -----------------------------------------------------------------------------
console.log("[TIER 1] Arquitetura, Módulo SaveManager e StorageAdapter");

test("SaveManager e MemoryStorage são exportados e instanciáveis", () => {
  assert.strictEqual(typeof SaveManager, 'function');
  assert.strictEqual(typeof MemoryStorage, 'function');
  const mem = new MemoryStorage();
  mem.setItem('teste', '123');
  assert.strictEqual(mem.getItem('teste'), '123');
  mem.removeItem('teste');
  assert.strictEqual(mem.getItem('teste'), null);
});

test("Slots padrão disponíveis contêm auto_save e os 3 slots manuais", () => {
  assert.deepStrictEqual(SLOTS_DISPONIVEIS, ['auto_save', 'slot_1', 'slot_2', 'slot_3']);
  assert.strictEqual(typeof NOMES_PADRAO_SLOTS.auto_save, 'string');
  assert.strictEqual(typeof NOMES_PADRAO_SLOTS.slot_1, 'string');
});

test("Rejeita salvamento em slots inválidos ou inexistentes", () => {
  const store = new CharacterStateStore();
  const manager = new SaveManager({ store, storage: new MemoryStorage() });
  const res = manager.salvar('slot_fantasma_invalido');
  assert.strictEqual(res.sucesso, false);
  assert(res.erro.includes("inválido"));
});

// -----------------------------------------------------------------------------
// [TIER 2] Serialização Completa & Metadados de Resumo Rápido
// -----------------------------------------------------------------------------
console.log("\n[TIER 2] Serialização Completa & Metadados de Resumo Rápido");

test("Serializa estado do CharacterStateStore e metadados de identificação", () => {
  const store = new CharacterStateStore();
  store.setCondicaoSocial("Tipógrafo da Rua do Imperador");
  store.setAnoAtual(1959);
  store.aplicarEfeitos({ astucia: 2, capital: 35, suspeita_dops: 4 });
  store.registrarDecisao("ev_f1_01_patio_das_oficinas", "apoiar_greve", "INSURGENTE");

  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  const res = manager.salvar('slot_1', {
    eventoAtivoId: 'ev_f1_02_panfletagem_na_varzea',
    modoVisual: 'evento',
    deliberacaoAberta: true,
    tituloCena: "Panfletagem na Várzea"
  });

  assert.strictEqual(res.sucesso, true);
  assert.strictEqual(res.slotId, 'slot_1');
  assert.strictEqual(res.metadados.anoAtual, 1959);
  assert.strictEqual(res.metadados.idade, 11);
  assert.strictEqual(res.metadados.condicaoSocial, "Tipógrafo da Rua do Imperador");
  assert.strictEqual(res.metadados.totalDecisoes, 1);
  assert.strictEqual(res.metadados.tituloCena, "Panfletagem na Várzea");
  assert.strictEqual(res.metadados.versaoSchema, VERSAO_SCHEMA_SAVE);
  assert.strictEqual(res.metadados.resumoAtributos.capital, 75); // 40 inicial + 35
  assert.strictEqual(res.metadados.resumoAtributos.suspeita_dops, 6); // 2 inicial + 4
});

test("obterMetadados recupera índice rápido sem precisar deserializar o payload inteiro", () => {
  const store = new CharacterStateStore();
  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  manager.salvar('auto_save', { tituloCena: "Dossiê da Juventude" });

  const meta = manager.obterMetadados('auto_save');
  assert(meta !== null);
  assert.strictEqual(meta.slotId, 'auto_save');
  assert.strictEqual(meta.tituloCena, "Dossiê da Juventude");
  assert(meta.dataFormatada.includes('/'));
});

test("listarSlots reflete fielmente slots preenchidos e vazios", () => {
  const store = new CharacterStateStore();
  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  manager.salvar('slot_2');

  const lista = manager.listarSlots();
  assert.strictEqual(lista.length, 4);

  const slot2 = lista.find(s => s.slotId === 'slot_2');
  assert.strictEqual(slot2.preenchido, true);
  assert(slot2.metadados !== null);

  const slot3 = lista.find(s => s.slotId === 'slot_3');
  assert.strictEqual(slot3.preenchido, false);
  assert.strictEqual(slot3.metadados, null);
});

// -----------------------------------------------------------------------------
// [TIER 3] Reidratação Determinística no CharacterStateStore
// -----------------------------------------------------------------------------
console.log("\n[TIER 3] Reidratação Determinística no CharacterStateStore");

test("store.carregarEstado reidrata fielmente todos os atributos e histórico", () => {
  const storeOriginal = new CharacterStateStore();
  storeOriginal.setCondicaoSocial("Alfaiate do Pátio do Terço");
  storeOriginal.setAnoAtual(1964);
  storeOriginal.aplicarEfeitos({ sangue_frio: 3, moral_popular: 2 });
  storeOriginal.registrarDecisao("ev_f1_03_climax_marco_1964", "resistir_ao_golpe", "CORAGEM");

  const dadosSerializados = storeOriginal.getState();

  const storeRestaurado = new CharacterStateStore();
  let ouvinteDisparado = false;
  storeRestaurado.subscribe((est, deltas) => {
    if (deltas && deltas.carregamento) {
      ouvinteDisparado = true;
    }
  });

  const sucesso = storeRestaurado.carregarEstado(dadosSerializados);
  assert.strictEqual(sucesso, true);
  assert.strictEqual(ouvinteDisparado, true);

  const estFinal = storeRestaurado.getState();
  assert.strictEqual(estFinal.condicaoSocial, "Alfaiate do Pátio do Terço");
  assert.strictEqual(estFinal.anoAtual, 1964);
  assert.strictEqual(estFinal.atributosFixos.sangue_frio, 4); // 1 inicial + 3
  assert.strictEqual(estFinal.recursosVolateis.moral_popular, 5); // 3 inicial + 2
  assert.strictEqual(estFinal.historicoDecisoes.length, 1);
  assert.strictEqual(estFinal.historicoDecisoes[0].carimbo, "CORAGEM");
});

test("Ciclo completo: salvar em slot -> carregar -> verificar integridade do payload", () => {
  const store = new CharacterStateStore();
  store.avancarFase(3); // Fase 3: Cheia de 75
  store.aplicarConsumoCheia(4, 0.8);

  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  manager.salvar('slot_3', {
    eventoAtivoId: 'ev_f3_01_subida_das_aguas_madalena',
    modoVisual: 'evento',
    deliberacaoAberta: false,
    diarioDecisoes: [{ eventoId: 'ev_f3_01', carimbo: 'VIGILÂNCIA' }]
  });

  const resCarregar = manager.carregar('slot_3');
  assert.strictEqual(resCarregar.sucesso, true);

  const { estado, sessao } = resCarregar.dados;
  assert.strictEqual(estado.faseAtual, 3);
  assert.strictEqual(estado.cheia75.nivelRioMetros, 2.3); // 1.5 inicial + 0.8
  assert.strictEqual(estado.cheia75.horasRestantes, 14); // 18 inicial - 4
  assert.strictEqual(sessao.eventoAtivoId, 'ev_f3_01_subida_das_aguas_madalena');
  assert.strictEqual(sessao.diarioDecisoes.length, 1);
});

// -----------------------------------------------------------------------------
// [TIER 4] Gestão de Múltiplos Slots & Slot Mais Recente
// -----------------------------------------------------------------------------
console.log("\n[TIER 4] Gestão de Múltiplos Slots & Slot Mais Recente");

test("obterSlotMaisRecente identifica o salvamento com maior timestamp", async () => {
  const store = new CharacterStateStore();
  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  manager.salvar('slot_1');
  
  // Pequena defasagem simulada de timestamp
  const payloadSlot2 = {
    versaoSchema: 1,
    metadados: { slotId: 'slot_2', timestamp: Date.now() + 5000 },
    estado: store.getState(),
    sessao: {}
  };
  storage.setItem(manager._obterChaveSave('slot_2'), JSON.stringify(payloadSlot2));
  storage.setItem(manager._obterChaveMeta('slot_2'), JSON.stringify(payloadSlot2.metadados));

  const maisRecente = manager.obterSlotMaisRecente();
  assert(maisRecente !== null);
  assert.strictEqual(maisRecente.slotId, 'slot_2');
});

test("excluirSlot e limparTodos expurgam os dados correspondentes", () => {
  const store = new CharacterStateStore();
  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  manager.salvar('slot_1');
  manager.salvar('slot_2');

  assert.strictEqual(manager.existeSlot('slot_1'), true);
  assert.strictEqual(manager.existeSlot('slot_2'), true);

  manager.excluirSlot('slot_1');
  assert.strictEqual(manager.existeSlot('slot_1'), false);
  assert.strictEqual(manager.existeSlot('slot_2'), true);

  manager.limparTodos();
  assert.strictEqual(manager.existeSlot('slot_2'), false);
  assert.strictEqual(storage.length, 0);
});

// -----------------------------------------------------------------------------
// [TIER 5] Exportação, Importação e Tratamento Defensivo de Erros
// -----------------------------------------------------------------------------
console.log("\n[TIER 5] Exportação, Importação e Tratamento Defensivo de Erros");

test("exportarParaJson e importarDeJson funcionam com integridade", () => {
  const store = new CharacterStateStore();
  store.setAnoAtual(1960);
  const storage = new MemoryStorage();
  const manager = new SaveManager({ store, storage });

  manager.salvar('slot_1');
  const jsonExportado = manager.exportarParaJson('slot_1');
  assert.strictEqual(typeof jsonExportado, 'string');

  const resImport = manager.importarDeJson('slot_3', jsonExportado);
  assert.strictEqual(resImport.sucesso, true);

  const resCarregado = manager.carregar('slot_3');
  assert.strictEqual(resCarregado.sucesso, true);
  assert.strictEqual(resCarregado.dados.estado.anoAtual, 1960);
});

test("Tratamento defensivo: JSON corrompido retorna erro amigável sem quebrar", () => {
  const storage = new MemoryStorage();
  const manager = new SaveManager({ storage });

  storage.setItem(manager._obterChaveSave('slot_1'), "{ json_invalido_e_quebrado...");

  const res = manager.carregar('slot_1');
  assert.strictEqual(res.sucesso, false);
  assert(res.erro.includes("Erro ao decodificar arquivo"));
});

// -----------------------------------------------------------------------------
// [TIER 6] Integração no DOM e no renderer.js
// -----------------------------------------------------------------------------
console.log("\n[TIER 6] Integração no DOM e no renderer.js");

test("save-manager.js está referenciado no index.html antes de renderer.js", () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
  assert(html.includes('<script src="save-manager.js"></script>'));
  const idxSave = html.indexOf('<script src="save-manager.js"></script>');
  const idxRenderer = html.indexOf('<script src="renderer.js"></script>');
  assert(idxSave !== -1 && idxRenderer !== -1, "Ambos os scripts devem estar no HTML");
  assert(idxSave < idxRenderer, "save-manager.js deve carregar antes de renderer.js");
});

test("renderer.js expõe saveManager, executarAutoSave e restaurarSessaoSalva", () => {
  const rendererCode = fs.readFileSync(path.join(__dirname, '../renderer.js'), 'utf-8');
  assert(rendererCode.includes('window.saveManager = saveManager'));
  assert(rendererCode.includes('window.executarAutoSave = executarAutoSave'));
  assert(rendererCode.includes('window.restaurarSessaoSalva = restaurarSessaoSalva'));
  assert(rendererCode.includes("saveManager.salvar('auto_save'"));
});

test("state-store.js possui o método carregarEstado implementado", () => {
  const storeCode = fs.readFileSync(path.join(__dirname, '../state-store.js'), 'utf-8');
  assert(storeCode.includes('carregarEstado(novoEstado)'));
});

// -----------------------------------------------------------------------------
// Consolidação dos Resultados
// -----------------------------------------------------------------------------
console.log("\n=================================================================");
console.log(`Testes Aprovados: ${aprovados} | Testes Reprovados: ${reprovados}`);
console.log("=================================================================\n");

if (reprovados > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
