// ==========================================================================
// TESTE DE VALIDAÇÃO E2E: DIRETRIZES DE DIREÇÃO DE ARTE & PIPELINE NOIR
// 'Águas de Ferro' — Verificação Integral dos Requisitos R1, R2 e R3
// ==========================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DOC_PATH = path.join(PROJECT_ROOT, 'docs', 'DIRETRIZES_ESTETICAS_NOIR.md');
const RUNNER_PATH = path.join(PROJECT_ROOT, 'test', 'runner.js');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

console.log(`${COLORS.bold}=================================================================${COLORS.reset}`);
console.log(`${COLORS.bold}   ÁGUAS DE FERRO — SUÍTE E2E: DIRETRIZES NOIR & PIPELINE TÉCNICO${COLORS.reset}`);
console.log(`${COLORS.bold}=================================================================${COLORS.reset}\n`);

let totalAsserts = 0;
let passedAsserts = 0;
let failedAsserts = 0;
const failureDetails = [];

function assert(condition, description, detailOnFail = '') {
  totalAsserts++;
  if (condition) {
    passedAsserts++;
    console.log(`  ${COLORS.green}✔${COLORS.reset} ${description}`);
  } else {
    failedAsserts++;
    console.log(`  ${COLORS.red}✖${COLORS.reset} ${description}`);
    if (detailOnFail) {
      console.log(`    ${COLORS.yellow}Detalhe:${COLORS.reset} ${detailOnFail}`);
    }
    failureDetails.push({ description, detailOnFail });
  }
}

function pollForDocument(filePath, maxAttempts = 5, delayMs = 500) {
  for (let i = 0; i < maxAttempts; i++) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) return true;
    }
    if (i < maxAttempts - 1) {
      const start = Date.now();
      while (Date.now() - start < delayMs) {
        // busy wait for synchronous test execution
      }
    }
  }
  return fs.existsSync(filePath);
}

// ==========================================================================
// TIER 1: VERIFICAÇÃO DE EXISTÊNCIA E INTEGRIDADE FÍSICA DO DOCUMENTO
// ==========================================================================
console.log(`${COLORS.cyan}[TIER 1] Verificação de Existência e Integridade do Documento Mestre${COLORS.reset}`);

const docExists = pollForDocument(DOC_PATH, 10, 500);
assert(docExists, `Arquivo de diretrizes existe em: docs/DIRETRIZES_ESTETICAS_NOIR.md`, `Arquivo não encontrado no caminho esperado: ${DOC_PATH}`);

let docContent = '';
let docStats = null;
if (docExists) {
  docStats = fs.statSync(DOC_PATH);
  assert(docStats.size >= 25000, `Tamanho do documento atesta profundidade canônica (${docStats.size} bytes >= 25.000 bytes)`, `Tamanho atual: ${docStats.size} bytes`);
  docContent = fs.readFileSync(DOC_PATH, 'utf-8');
  assert(docContent.length > 5000, `Leitura UTF-8 íntegra com ${docContent.length} caracteres`);
} else {
  console.error(`${COLORS.red}ABORTANDO TIERS 2-4: Documento docs/DIRETRIZES_ESTETICAS_NOIR.md inexistente.${COLORS.reset}`);
  process.exit(1);
}

// ==========================================================================
// TIER 2: COMPLETUDE ESTRUTURAL E MAPEAMENTO DE SEÇÕES (R1, R2, R3)
// ==========================================================================
console.log(`\n${COLORS.cyan}[TIER 2] Verificação Estrutural das Seções Canônicas (R1, R2, R3)${COLORS.reset}`);

const requiredSections = [
  {
    nome: "Título Canônico de Direção de Arte e Pipeline",
    padrao: /#\s*DIRETRIZES DE DIREÇÃO DE ARTE E PIPELINE NOIR DOCUMENTAL/i
  },
  {
    nome: "Seção 1: Sumário Executivo & Metáfora Conceitual",
    padrao: /##\s*1\.\s*SUMÁRIO EXECUTIVO/i
  },
  {
    nome: "Seção 2: Estudo de Direção de Arte e Identidade Noir Documental (R1)",
    padrao: /##\s*2\.\s*ESTUDO DE DIREÇÃO DE ARTE/i
  },
  {
    nome: "Seção 3: Arquitetura e Pipeline Técnico de Reestilização (R2)",
    padrao: /##\s*3\.\s*ARQUITETURA E PIPELINE TÉCNICO/i
  },
  {
    nome: "Seção 4: Especificação de Integração Visual com o Jogo (R3)",
    padrao: /##\s*4\.\s*ESPECIFICAÇÃO DE INTEGRAÇÃO VISUAL/i
  },
  {
    nome: "Seção 5: Conformidade com o Design System e Visual Blacklist",
    padrao: /##\s*5\.\s*CONFORMIDADE COM O DESIGN SYSTEM/i
  },
  {
    nome: "Seção 6: Conclusão e Validação Arquitetural",
    padrao: /##\s*6\.\s*CONCLUSÃO E VALIDAÇÃO/i
  }
];

requiredSections.forEach(sec => {
  assert(sec.padrao.test(docContent), `Seção presente: ${sec.nome}`);
});

// ==========================================================================
// TIER 3: VERIFICAÇÃO ESTÉTICA, FORENSE E HISTÓRICA (R1)
// ==========================================================================
console.log(`\n${COLORS.cyan}[TIER 3] Verificação Estética Forense & Histórica (RecifeVibe, MCR Vol 99 e 1958-1975)${COLORS.reset}`);

// Sub-teste 3.1: Desconstrução de RecifeVibe.JPG
const checkRecifeVibeName = docContent.includes('RecifeVibe.JPG');
assert(checkRecifeVibeName, `Referência explícita a RecifeVibe.JPG na direção de arte`);

const checkDimensions = /884\s*[x×]\s*609/i.test(docContent);
assert(checkDimensions, `Resolução e proporção exatas de RecifeVibe.JPG (884 × 609 px)`);

const checkColorimetry = /(88\.0|87|88).*64.*53/s.test(docContent) || docContent.includes('#584036') || docContent.includes('#574035');
assert(checkColorimetry, `Colorimetria média RGB calculada para RecifeVibe ([88, 64, 53] / #584036)`);

const checkLuminance = /lumin[âa]ncia.*70/i.test(docContent);
assert(checkLuminance, `Luminância média de clave baixa documentada (~70 / 255)`);

const checkBands = /BANDA 1.*BANDA 2.*BANDA 3/s.test(docContent) || (docContent.includes('Céu Noturno') && docContent.includes('Tabuleiro da Ponte') && docContent.includes('Águas do Rio'));
assert(checkBands, `Estruturação tripartida em faixas horizontais (Céu, Ponte/Néons, Espelho d'Água)`);

const checkNeons = (
  docContent.includes('Phoenix') &&
  docContent.includes('Bem-Te-Vi') &&
  docContent.includes('INPS')
);
assert(checkNeons, `Identificação dos néons de época: Phoenix Pernambucana, Óleo Bem-Te-Vi (#B24723) e INPS`);

const checkInpsAnchor = /INPS.*1966.*1967/s.test(docContent) || /Decreto.*72.*1966/s.test(docContent);
assert(checkInpsAnchor, `Âncora cronológica forense do letreiro INPS (pós-novembro de 1966) situando a foto na Fase 2/3`);

const checkWaterMirror = docContent.includes('Capibaribe') && /reflexo.*vertical|espelho.*l[íi]quido/i.test(docContent);
assert(checkWaterMirror, `Águas do Capibaribe descritas como espelho líquido com reflexos verticais rasgados`);

// Sub-teste 3.2: Acervo MCR Fotografia Vol 99
const checkMcrVolume = docContent.includes('ACERVO DIGITAL MCR') || docContent.includes('VOL 99');
assert(checkMcrVolume, `Referência direta ao ACERVO DIGITAL MCR fotografia - VOL 99`);

const checkMcrSpecs = docContent.includes('106') && (docContent.includes('113') || docContent.includes('113.171.754'));
assert(checkMcrSpecs, `Metadados físicos do acervo MCR (106 páginas, ~113 MB)`);

const checkBaryta = /baritado|gelatina e prata/i.test(docContent);
assert(checkBaryta, `Identificação físico-química dos registros: papel baritado de gelatina e prata`);

const requiredTombos = [
  { id: '125.938', desc: 'Desembarque de Vargas' },
  { id: '125.940', desc: 'Comício no Palácio do Governo' },
  { id: '125.996', desc: 'Obras do Aeroporto dos Guararapes' },
  { id: '126.023', desc: 'Manifestação Praça da República / Sindicatos (Noturno Canônico)' },
  { id: '126.056', desc: 'Natal dos Portuários no SAPS' }
];

requiredTombos.forEach(tombo => {
  assert(docContent.includes(tombo.id), `Catalogação do Tombo MCR ${tombo.id} (${tombo.desc})`);
});

// Sub-teste 3.3: Referências Históricas Complementares (1958-1975)
const checkBridges = (
  docContent.includes('Ponte Duarte Coelho') &&
  docContent.includes('Ponte Maurício de Nassau') &&
  docContent.includes('Val d\'Osne') &&
  docContent.includes('Ponte de Santa Isabel')
);
assert(checkBridges, `Topografia de pontes: Duarte Coelho, Maurício de Nassau (Val d'Osne) e Santa Isabel`);

const checkNeighborhoods = (
  docContent.includes('Rua da Aurora') &&
  docContent.includes('DOPS') &&
  docContent.includes('Diario de Pernambuco') &&
  docContent.includes('Mercado de São José') &&
  (docContent.includes('palafitas') || docContent.includes('mocambo'))
);
assert(checkNeighborhoods, `Cartografia dramática: Rua da Aurora, DOPS-PE, Diario de Pernambuco, São José e Palafitas`);

const checkFlood75 = (
  docContent.includes('1975') &&
  docContent.includes('Tapacurá') &&
  (docContent.includes('4,5') || docContent.includes('4.5')) &&
  docContent.includes('blecaute')
);
assert(checkFlood75, `Documentação da Grande Cheia de 75: cota +4,5m, pânico de Tapacurá e blecaute urbano`);

const checkVehicles = docContent.includes('Veraneio') && docContent.includes('Fusca');
assert(checkVehicles, `Frota automotiva de época: Veraneio (camburão DOPS) e Fusca`);

// Sub-teste 3.4: Quatro Pilares da Identidade Noir
const checkFourPillars = (
  docContent.includes('ILUMINAÇÃO') &&
  docContent.includes('PALETA') &&
  docContent.includes('TEXTURA') &&
  docContent.includes('COMPOSIÇÃO')
);
assert(checkFourPillars, `Definição formal dos 4 Pilares da Identidade Tropical Noir Documental`);

const checkLowKeyRatio = /70\/30|70%.*30%/i.test(docContent);
assert(checkLowKeyRatio, `Regra de iluminação 70/30 (70% sombras densas / 30% pontos de luz ativos)`);

const checkSwatches = ['#121817', '#1D2522', '#B24723', '#6C9CC0', '#D9A84E', '#3D4337', '#8A2522'].every(hex => docContent.includes(hex));
assert(checkSwatches, `Paleta cromática canônica completa com swatches hexadecimais históricos`);

// ==========================================================================
// TIER 4: PIPELINE TÉCNICO, PARÂMETROS OBJETIVOS E INTEGRAÇÃO DOM (R2 & R3)
// ==========================================================================
console.log(`\n${COLORS.cyan}[TIER 4] Verificação do Pipeline Técnico, Parâmetros e Integração DOM (R2 & R3)${COLORS.reset}`);

// Sub-teste 4.1: Comparativo Arquitetural
const checkComparison = (
  /estiliza[çc][ãa]o din[âa]mica|tempo de execu[çc][ãa]o/i.test(docContent) &&
  /pr[ée]-processamento/i.test(docContent) &&
  /h[íi]brid/i.test(docContent)
);
assert(checkComparison, `Comparativo técnico completo: Runtime vs Pré-processamento vs Modelo Híbrido`);

const checkHybridVerdict = /Arquitetura H[íi]brida.*RECOMENDA[ÇC][ÃA]O/i.test(docContent) || /Recomenda[çc][ãa]o.*H[íi]brida/i.test(docContent);
assert(checkHybridVerdict, `Recomendação definitiva fundamentada da Arquitetura Híbrida`);

const checkMemoryWarning = docContent.includes('113') && /mem[óo]ria|heap|2480/i.test(docContent);
assert(checkMemoryWarning, `Análise de restrição de memória RAM / heap (alerta sobre decodificação de scans 2500px)`);

const checkEmpiricalProof = (
  docContent.includes('132.8') ||
  docContent.includes('132') ||
  /m[ée]dia RGB saltou/i.test(docContent)
);
assert(checkEmpiricalProof, `Demonstração empírica quantitativa da falha de contraste em runtime puro`);

// Sub-teste 4.2: Fórmulas e Parâmetros
const checkScurveFormula = /S\(x\)|scurve|Curva S/i.test(docContent);
assert(checkScurveFormula, `Formulação matemática da Curva S sigmoidal não-linear para preservação de pretos`);

const checkGrainFormula = /M_\{?grain\}?|grain_mask|noise_sigma/i.test(docContent);
assert(checkGrainFormula, `Modelo matemático de grão de prata com ponderação parabólica nos meios-tons`);

const checkScripts = docContent.includes('process_archive_photos.py') || docContent.includes('process-photos-sharp.js');
assert(checkScripts, `Fornecimento de scripts operacionais de processamento (Python/Pillow ou Node/Sharp)`);

// Sub-teste 4.3: Filtros CSS e Modulação Dinâmica por Fase
const checkPhaseVariables = (
  docContent.includes('--foto-filtro-base') &&
  docContent.includes('body.fase-1') || docContent.includes(':root')
) && (
  docContent.includes('body.fase-2') &&
  docContent.includes('body.fase-3')
);
assert(checkPhaseVariables, `Especificação de variáveis CSS dinâmicas por fase (:root, body.fase-2, body.fase-3)`);

const checkFilterFunctions = ['sepia', 'contrast', 'brightness', 'hue-rotate'].every(fn => docContent.includes(fn));
assert(checkFilterFunctions, `Emprego de funções de filtro CSS essenciais (sepia, contrast, brightness, hue-rotate)`);

const checkCrisisState = docContent.includes('em-crise-urgente') || /crise.*urgente/i.test(docContent);
assert(checkCrisisState, `Modulação visual de emergência para estado de crise forçada do DOPS`);

// Sub-teste 4.4: Proporções, Aspect Ratios e DOM
const checkAspectRatios = (
  docContent.includes('1200') && docContent.includes('570') && docContent.includes('2.1:1')
) && (
  docContent.includes('1200') && docContent.includes('800') && docContent.includes('3:2')
) && (
  docContent.includes('450') && docContent.includes('600') && docContent.includes('3:4')
);
assert(checkAspectRatios, `Matriz de aspect ratios padronizados: 2.1:1 (1200x570), 3:2 (1200x800), 3:4 (450x600)`);

const checkSafeZone = /safe-zone|zona.*segura|80%/i.test(docContent);
assert(checkSafeZone, `Diretriz de Safe-Zone central de 80% e desobstrução dos cantos superiores`);

const checkDomElements = [
  '#slot-moldura-evidencia',
  '.cenario-container',
  '.foto-jornal-wrapper',
  '.filtro-jornal-75',
  '.selo-sobreposto-cenario'
].every(sel => docContent.includes(sel));
assert(checkDomElements, `Mapeamento com os elementos DOM do jogo (#slot-moldura-evidencia, .cenario-container, etc.)`);

// Sub-teste 4.5: Visual Blacklist (§2.1 CONTEXT.md)
const checkBlacklist = (
  /border-radius:\s*0/i.test(docContent) &&
  /sans-serif/i.test(docContent) &&
  /#000000|#FFFFFF/i.test(docContent)
);
assert(checkBlacklist, `Conformidade explícita com o Visual Blacklist (sem cantos arredondados, sem sans-serif, sem #000/#FFF)`);

// ==========================================================================
// TIER 5: NÃO-REGRESSÃO DA ENGINE DO JOGO (TEST RUNNER)
// ==========================================================================
console.log(`\n${COLORS.cyan}[TIER 5] Verificação de Não-Regressão da Engine (node test/runner.js)${COLORS.reset}`);

let runnerSuccess = false;
let runnerOutput = '';
try {
  runnerOutput = execSync(`node "${RUNNER_PATH}"`, {
    cwd: PROJECT_ROOT,
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  runnerSuccess = /TODAS AS \d+ SUÍTES DE TESTES FORAM APROVADAS COM SUCESSO/.test(runnerOutput);
} catch (err) {
  runnerSuccess = false;
  runnerOutput = err.stdout ? err.stdout.toString() : err.message;
}

assert(runnerSuccess, `Execução do runner central com 100% de aprovação (7/7 suítes originais)`, runnerOutput);

// ==========================================================================
// RELATÓRIO FINAL
// ==========================================================================
console.log(`\n${COLORS.bold}=================================================================${COLORS.reset}`);
console.log(`${COLORS.bold}   RESULTADO GERAL DA SUÍTE DE TESTES E2E${COLORS.reset}`);
console.log(`${COLORS.bold}=================================================================${COLORS.reset}`);
console.log(`Total de asserções executadas: ${totalAsserts}`);
console.log(`Asserções aprovadas:           ${COLORS.green}${passedAsserts}${COLORS.reset}`);
console.log(`Asserções reprovadas:          ${failedAsserts > 0 ? COLORS.red : COLORS.green}${failedAsserts}${COLORS.reset}`);

if (failedAsserts === 0) {
  console.log(`\n${COLORS.green}${COLORS.bold}✔ SUITE E2E APROVADA: DIRETRIZES ESTÉTICAS NOIR VALIDADAS COM SUCESSO!${COLORS.reset}\n`);
  process.exit(0);
} else {
  console.log(`\n${COLORS.red}${COLORS.bold}✖ SUITE E2E FALHOU COM ${failedAsserts} NÃO-CONFORMIDADES:${COLORS.reset}`);
  failureDetails.forEach((f, idx) => {
    console.log(`  ${idx + 1}. ${f.description}`);
    if (f.detailOnFail) console.log(`     ${f.detailOnFail}`);
  });
  console.log();
  process.exit(1);
}
