// ==========================================================================
// TESTE AUTOMATIZADO: TICKET 28 — MENU PRINCIPAL DIEGÉTICO & GAVETEIRO
// ==========================================================================

const assert = require('assert');
const fs = require('fs');
const path = require('path');

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
console.log("   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 28 (MENU & GAVETEIRO)");
console.log("=================================================================\n");

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf-8');
const renderer = fs.readFileSync(path.join(__dirname, '../renderer.js'), 'utf-8');

// -----------------------------------------------------------------------------
// [TIER 1] Verificação dos Elementos e Acessibilidade no DOM (index.html)
// -----------------------------------------------------------------------------
console.log("[TIER 1] Verificação dos Elementos e Acessibilidade no DOM (index.html)");

test("Tela de Menu Principal (#tela-menu-principal) e pasta diegética existem", () => {
  assert(html.includes('id="tela-menu-principal"'), "Elemento #tela-menu-principal deve existir");
  assert(html.includes('class="pasta-menu-capa"'), "Capa da pasta de arquivo deve existir");
  assert(html.includes('role="dialog"'), "Menu deve ter role dialog");
  assert(html.includes('aria-modal="true"'), "Menu deve ter aria-modal");
});

test("Botões fundamentais do Menu Principal estão presentes", () => {
  assert(html.includes('id="btn-menu-continuar"'), "Botão Continuar deve existir");
  assert(html.includes('id="btn-menu-novo-jogo"'), "Botão Novo Prontuário deve existir");
  assert(html.includes('id="btn-menu-gaveteiro"'), "Botão Gaveteiro deve existir");
  assert(html.includes('id="btn-menu-manual"'), "Botão Manual deve existir");
});

test("Modal do Gaveteiro de Arquivos (#modal-gaveteiro-arquivos) está presente", () => {
  assert(html.includes('id="modal-gaveteiro-arquivos"'), "Modal do gaveteiro deve existir");
  assert(html.includes('id="gaveteiro-lista-slots"'), "Grid de slots deve existir");
  assert(html.includes('id="btn-fechar-gaveteiro"'), "Botão de fechar gaveteiro deve existir");
  assert(html.includes('id="btn-gaveteiro-voltar-menu"'), "Botão de voltar ao menu deve existir");
});

test("Botão de atalho rápido na barra superior (#btn-menu-arquivo) está configurado", () => {
  assert(html.includes('id="btn-menu-arquivo"'), "Botão de arquivo deve estar na barra de sistema");
  assert(html.includes('btn-dymo-ambar'), "Botão deve ter o estilo diegético Dymo Âmbar");
  assert(html.includes('[ESC] ARQUIVO'), "Deve sinalizar o atalho [ESC]");
});

test("Modais de Manual de Regras e Confirmação de Novo Jogo presentes no DOM", () => {
  assert(html.includes('id="modal-manual-regras"'), "Modal manual deve existir");
  assert(html.includes('id="modal-confirmacao-novo-jogo"'), "Modal confirmação deve existir");
  assert(html.includes('id="btn-confirmar-novo-jogo"'), "Botão de confirmar novo jogo deve existir");
  assert(html.includes('id="btn-cancelar-novo-jogo"'), "Botão de cancelar novo jogo deve existir");
});

// -----------------------------------------------------------------------------
// [TIER 2] Verificação das Regras e Animações em style.css
// -----------------------------------------------------------------------------
console.log("\n[TIER 2] Verificação das Regras e Animações em style.css");

test("Estilização da pasta confidencial e gaveteiro metálico implementados", () => {
  assert(css.includes('.tela-menu-principal'), "Classe .tela-menu-principal deve existir");
  assert(css.includes('.pasta-menu-capa'), "Classe .pasta-menu-capa deve existir");
  assert(css.includes('.modal-gaveteiro-arquivos'), "Classe .modal-gaveteiro-arquivos deve existir");
  assert(css.includes('.gaveteiro-painel-metalico'), "Classe .gaveteiro-painel-metalico deve existir");
  assert(css.includes('.btn-dymo-ambar'), "Classe .btn-dymo-ambar deve existir");
});

test("Conformidade estrita com Visual Blacklist (zero border-radius e zero #FFFFFF)", () => {
  // Isola a seção do Ticket 28 no CSS
  const inicioTicket28 = css.indexOf('TICKET 28: MENU PRINCIPAL DIEGÉTICO');
  assert(inicioTicket28 !== -1, "Comentário de demarcação do Ticket 28 deve existir no CSS");
  const trechoTicket28 = css.substring(inicioTicket28);

  const borderRadiusMatch = trechoTicket28.match(/border-radius:\s*([1-9][0-9]*px)/i);
  assert.strictEqual(borderRadiusMatch, null, `Encontrado border-radius moderno proibido no Ticket 28: ${borderRadiusMatch ? borderRadiusMatch[0] : ''}`);

  const whiteMatch = trechoTicket28.match(/(#ffffff|#fff\b)/i);
  assert.strictEqual(whiteMatch, null, `Encontrado #FFFFFF proibido no Ticket 28: ${whiteMatch ? whiteMatch[0] : ''}`);
});

// -----------------------------------------------------------------------------
// [TIER 3] Verificação da Lógica e Controladores no renderer.js
// -----------------------------------------------------------------------------
console.log("\n[TIER 3] Verificação da Lógica e Controladores no renderer.js");

test("Funções de controle do Menu Principal expostas globalmente", () => {
  assert(renderer.includes('window.atualizarStatusMenuPrincipal = atualizarStatusMenuPrincipal'));
  assert(renderer.includes('window.fecharMenuPrincipal = fecharMenuPrincipal'));
  assert(renderer.includes('window.abrirMenuPrincipal = abrirMenuPrincipal'));
  assert(renderer.includes('window.iniciarNovoProntuario = iniciarNovoProntuario'));
});

test("Funções do Gaveteiro e renderização dinâmica dos slots implementadas", () => {
  assert(renderer.includes('window.abrirGaveteiroArquivos = abrirGaveteiroArquivos'));
  assert(renderer.includes('window.fecharGaveteiroArquivos = fecharGaveteiroArquivos'));
  assert(renderer.includes('function renderizarSlotsGaveteiro()'));
  assert(renderer.includes('saveManager.listarSlots()'));
});

test("Mapeamento da tecla Escape para controle diegético de gaveteiro e modais", () => {
  assert(renderer.includes("e.key === 'Escape'"));
  assert(renderer.includes('fecharManualRegras()'));
  assert(renderer.includes('fecharGaveteiroArquivos()'));
  assert(renderer.includes('abrirGaveteiroArquivos()'));
});

test("Atalhos rápidos de teclado no Menu Principal ([Enter], [N], [G], [M])", () => {
  assert(renderer.includes("e.key === 'n' || e.key === 'N'"));
  assert(renderer.includes("e.key === 'g' || e.key === 'G'"));
  assert(renderer.includes("e.key === 'm' || e.key === 'M'"));
});

test("Abertura com confirmação defensiva para Novo Prontuário", () => {
  assert(renderer.includes('function abrirConfirmacaoNovoJogo()'));
  assert(renderer.includes('iniciarNovoProntuario()'));
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

