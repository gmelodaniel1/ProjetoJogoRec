const { CharacterStateStore } = require('../state-store');
const { DeterministicEngine } = require('../engine');

console.log("=== INICIANDO TESTE DO MOTOR DETERMINÍSTICO (ENGINE) ===");

const store = new CharacterStateStore({
  condicaoSocial: "Filho de Estivador (Mocambo)",
  faseAtual: 1,
  anoAtual: 1958,
  acoesRestantesFase: 3,
  acoesTotaisFase: 3,
  parentesco: { relacao_pai: 2 },
  atributosFixos: { astucia: 2, sangue_frio: 1, oficio: 2, presenca: 0 },
  recursosVolateis: { capital: 30, influencia: 1, suspeita_dops: 3, moral_popular: 2 },
  historicoDecisoes: []
});

const engine = new DeterministicEngine(store);

// Evento fictício para teste
const eventoMock = {
  metadata: {
    id: "ev_teste_01",
    titulo: "Incidente no Armazém",
    custo_acoes: 1,
    opcoes: [
      {
        id: "opcao_valida",
        rotulo: "Esgueirar-se pelas sombras",
        carimbo: "SUBVERSIVO",
        requisitos: { astucia: 2, suspeita_dops: "<= 5" },
        efeitos: { astucia: 1, suspeita_dops: 1 }
      },
      {
        id: "opcao_bloqueada_por_presenca",
        rotulo: "Comandar o pátio com autoridade",
        carimbo: "LÍDER",
        requisitos: { presenca: 2 },
        efeitos: { moral_popular: 3 }
      },
      {
        id: "opcao_bloqueada_por_classe",
        rotulo: "Recorrer a parentes na Usina",
        carimbo: "BURGUÊS",
        requisitos: { condicao_social: "Elite" },
        efeitos: { capital: 100 }
      }
    ]
  }
};

// Teste 1: Opção Válida
const avaliacao1 = engine.avaliarOpcao(eventoMock.metadata.opcoes[0]);
console.log(`[OK] Opção 1 Disponível: ${avaliacao1.disponivel} (Esperado: true)`);
if (!avaliacao1.disponivel) {
  console.error("FALHA: Opção válida foi marcada como indisponível!");
  process.exit(1);
}

// Teste 2: Opção Bloqueada por Atributo
const avaliacao2 = engine.avaliarOpcao(eventoMock.metadata.opcoes[1]);
console.log(`[OK] Opção 2 Bloqueada: ${!avaliacao2.disponivel} (Motivo: "${avaliacao2.motivoBloqueio}")`);
if (avaliacao2.disponivel || !avaliacao2.motivoBloqueio.includes("PRESENÇA")) {
  console.error("FALHA: Opção com Presença insuficiente deveria estar bloqueada!");
  process.exit(1);
}

// Teste 3: Opção Bloqueada por Condição Social
const avaliacao3 = engine.avaliarOpcao(eventoMock.metadata.opcoes[2]);
console.log(`[OK] Opção 3 Bloqueada por Classe: ${!avaliacao3.disponivel} (Motivo: "${avaliacao3.motivoBloqueio}")`);
if (avaliacao3.disponivel) {
  console.error("FALHA: Opção com condição social incompatível deveria estar bloqueada!");
  process.exit(1);
}

// Teste 4: Tentativa de forçar execução de opção bloqueada (deve lançar exceção)
let erroCapturado = false;
try {
  engine.executarDecisao(eventoMock, "opcao_bloqueada_por_presenca");
} catch (e) {
  erroCapturado = true;
  console.log(`[OK] Exceção bloqueadora capturada com sucesso: ${e.message}`);
}
if (!erroCapturado) {
  console.error("FALHA: Motor permitiu executar opção com pré-requisito não atendido!");
  process.exit(1);
}

// Teste 5: Execução válida e atômica
const resultadoTrans = engine.executarDecisao(eventoMock, "opcao_valida");
const estadoPos = store.getState();
console.log("\n[OK] Decisão válida executada:");
console.log(`- Ações restantes: ${estadoPos.acoesRestantesFase} (Esperado: 2)`);
console.log(`- Nova Astúcia: ${estadoPos.atributosFixos.astucia} (Esperado: 3)`);
console.log(`- Nova Suspeita DOPS: ${estadoPos.recursosVolateis.suspeita_dops} (Esperado: 4)`);
console.log(`- Histórico registrado: ${estadoPos.historicoDecisoes.length} itens`);

if (
  estadoPos.acoesRestantesFase !== 2 ||
  estadoPos.atributosFixos.astucia !== 3 ||
  estadoPos.recursosVolateis.suspeita_dops !== 4 ||
  estadoPos.historicoDecisoes.length !== 1
) {
  console.error("FALHA: Transição de estado pós-decisão incorreta!");
  process.exit(1);
}

console.log("\n=== TESTE DO MOTOR DETERMINÍSTICO CONCLUÍDO COM 100% DE SUCESSO! ===");

