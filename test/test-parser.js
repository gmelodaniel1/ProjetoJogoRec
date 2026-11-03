const path = require('path');
const { parseEventFile, carregarTodosEventos } = require('../src/narrative-parser');

console.log("=== INICIANDO TESTE DO NARRATIVE PARSER ===");

const pastaConteudo = path.join(__dirname, '..', 'conteudo');
const resultado = carregarTodosEventos(pastaConteudo);

console.log(`Eventos carregados: ${resultado.totalCarregados}`);
console.log(`Erros encontrados: ${resultado.erros.length}`);

if (resultado.erros.length > 0) {
  console.error("ERROS:", resultado.erros);
  process.exit(1);
}

const evento1 = resultado.eventos['ev_f1_01_patio_das_oficinas'];
if (!evento1) {
  console.error("ERRO: ev_f1_01_patio_das_oficinas não encontrado!");
  process.exit(1);
}

console.log("\n[OK] Metadados carregados com sucesso:");
console.log(`- Título: ${evento1.metadata.titulo}`);
console.log(`- Ano: ${evento1.metadata.ano}`);
console.log(`- Total de Opções: ${evento1.metadata.opcoes.length}`);
console.log(`- Opção 1: ${evento1.metadata.opcoes[0].rotulo} (Carimbo: ${evento1.metadata.opcoes[0].carimbo})`);

// Verifica se os grifos semânticos foram aplicados
const contemGrifoBairro = evento1.corpoHtml.includes('class="grifo-bairro">Santo Antônio</span>');
const contemGrifoFaccao = evento1.corpoHtml.includes('class="grifo-faccao">DOPS</span>');

console.log(`\n[OK] Grifo de Bairro aplicado: ${contemGrifoBairro}`);
console.log(`[OK] Grifo de Facção/DOPS aplicado: ${contemGrifoFaccao}`);

if (!contemGrifoBairro || !contemGrifoFaccao) {
  console.error("FALHA: Grifos semânticos automáticos não foram aplicados corretamente no HTML!");
  process.exit(1);
}

console.log("\n=== TESTE CONCLUÍDO COM 100% DE SUCESSO! ===");

