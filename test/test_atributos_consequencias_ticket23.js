/**
 * Águas de Ferro — Suíte de Testes Automatizados: Ticket 23
 * Prontuário de Atributos em Pasta Manila Suspenso & Painel de Consequências com Clichê Tipográfico
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=================================================================');
console.log('   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 23 (ATRIBUTOS & DESPACHO)');
console.log('=================================================================\n');

let aprovados = 0;
let reprovados = 0;

function test(descricao, fn) {
  try {
    fn();
    console.log(`  ✔ ${descricao}`);
    aprovados++;
  } catch (err) {
    console.error(`  ✖ ${descricao}`);
    console.error(`    Erro: ${err.message}`);
    reprovados++;
  }
}

const htmlPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, '..', 'style.css');
const rendererPath = path.join(__dirname, '..', 'renderer.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const renderer = fs.readFileSync(rendererPath, 'utf8');

// =================================================================
// [TIER 1] Verificação do Prontuário em Pasta Manila no DOM (index.html)
// =================================================================
console.log('[TIER 1] Verificação do Prontuário em Pasta Manila no DOM (index.html)');

test('Aba de atributos contém o container de pasta manila suspensa', () => {
  assert(html.includes('id="aba-atributos"'), 'Elemento #aba-atributos deve existir');
  assert(html.includes('prontuario-manila-container'), 'Deve conter a classe prontuario-manila-container');
});

test('Guia/Orelha de arquivo suspenso presente com identificação DOPS-PE', () => {
  assert(html.includes('class="guia-pasta-manila"'), 'Deve conter a guia saliente de pasta manila');
  assert(html.includes('etiqueta-guia'), 'Deve conter a etiqueta de índice da guia');
  assert(html.includes('PRONTUÁRIO INDIVIDUAL'), 'Etiqueta deve identificar prontuário individual');
});

test('Cabeçalho oficial do prontuário presente com carimbo confidencial e selo DOPS', () => {
  assert(html.includes('prontuario-cabecalho-oficial'), 'Deve conter prontuario-cabecalho-oficial');
  assert(html.includes('pasta-selo-oficial'), 'Deve conter o selo oficial da Segurança Pública/DOPS');
  assert(html.includes('carimbo-sigiloso'), 'Deve conter carimbo de classificação sigilosa');
});

test('Bloco de condição social contém linhas pontilhadas de clichê tipográfico e código de formulário', () => {
  assert(html.includes('linha-cliche-pontilhada'), 'Deve conter linha de clichê pontilhada');
  assert(html.includes('codigo-formulario-dops'), 'Deve conter código oficial do formulário DOPS');
  assert(html.includes('id="val-condicao-social"'), 'Deve preservar #val-condicao-social');
  assert(html.includes('id="desc-condicao-social"'), 'Deve preservar #desc-condicao-social');
});

test('Preservação estrita de todos os IDs de Atributos e Recursos da Engine', () => {
  const idsEsperados = [
    'attr-astucia', 'espectro-astucia',
    'attr-sangue-frio', 'espectro-sangue-frio',
    'attr-oficio', 'espectro-oficio',
    'attr-presenca', 'espectro-presenca',
    'rec-capital', 'espectro-capital',
    'rec-influencia', 'espectro-influencia',
    'rec-suspeita', 'espectro-suspeita',
    'rec-moral', 'espectro-moral'
  ];
  idsEsperados.forEach(id => {
    assert(html.includes(`id="${id}"`), `ID essencial da engine ausente: #${id}`);
  });
});

test('Preservação do botão de retorno ao cenário com atributo data-fechar-aba', () => {
  assert(html.includes('class="btn-voltar-cenario" data-fechar-aba'), 'Botão de voltar com data-fechar-aba preservado');
});

// =================================================================
// [TIER 2] Verificação do Painel de Consequências no DOM e renderer.js
// =================================================================
console.log('\n[TIER 2] Verificação do Painel de Consequências no DOM e renderer.js');

test('Painel de consequências presente no DOM como elemento de despacho', () => {
  assert(html.includes('id="painel-consequencias-decisao"'), 'Elemento #painel-consequencias-decisao deve existir');
});

test('renderer.js injeta fita adesiva gomada diegética no painel de consequências', () => {
  assert(renderer.includes('fita-conseq-adesiva'), 'Deve injetar fita-conseq-adesiva');
});

test('renderer.js injeta carimbo oficial de registro do inquérito e botão de arquivar', () => {
  assert(renderer.includes('conseq-carimbo-oficial'), 'Deve injetar conseq-carimbo-oficial');
  assert(renderer.includes('btn-fechar-conseq'), 'Deve conter botão de arquivar despacho (#btn-fechar-conseq)');
});

// =================================================================
// [TIER 3] Verificação dos Estilos e Texturas em style.css
// =================================================================
console.log('\n[TIER 3] Verificação dos Estilos e Texturas em style.css');

test('Pasta manila com reforço superior e guia saliente posicionada no topo', () => {
  assert(css.includes('.prontuario-manila-container'), 'Deve estilizar o container manila');
  assert(css.includes('.guia-pasta-manila'), 'Deve estilizar a guia da pasta manila');
  assert(css.includes('top: -24px') || css.includes('top: -22px'), 'Guia manila deve sobressair da borda superior');
});

test('Linhas de clichê tipográfico pontilhadas com letter-spacing mecânico', () => {
  assert(css.includes('.linha-cliche-pontilhada'), 'Deve estilizar .linha-cliche-pontilhada');
  assert(css.includes('letter-spacing: 2.5px') || css.includes('letter-spacing: 2px'), 'Linha deve ter espaçamento mecânico');
});

test('Barras de espectro qualitativo estilizadas como réguas com clichê de chumbo', () => {
  assert(css.includes('.barra-espectro-brante'), 'Deve estilizar .barra-espectro-brante');
  assert(css.includes('.espectro-segmento'), 'Deve estilizar .espectro-segmento');
  assert(css.includes('.espectro-segmento.ativo'), 'Deve conter estilo destacado para segmento ativo');
});

test('Fita adesiva gomada do despacho com bordas denteadas e transparência analógica', () => {
  assert(css.includes('.fita-conseq-adesiva'), 'Deve estilizar a fita adesiva do painel de consequências');
  assert(css.includes('.fita-conseq-adesiva::before') && css.includes('.fita-conseq-adesiva::after'), 'Fita deve ter bordas rasgadas/denteadas');
});

// =================================================================
// [TIER 4] Verificação de Conformidade com o Visual Blacklist
// =================================================================
console.log('\n[TIER 4] Verificação de Conformidade com o Visual Blacklist');

test('Zero cantos arredondados na pasta manila, guia, régua de espectro e painel de consequências', () => {
  const trechosTicket23 = [
    '.prontuario-manila-container',
    '.guia-pasta-manila',
    '.barra-espectro-brante',
    '.espectro-segmento',
    '.painel-consequencias-decisao',
    '.fita-conseq-adesiva',
    '.conseq-delta-pilula'
  ];

  trechosTicket23.forEach(sel => {
    const regex = new RegExp(`${sel.replace('.', '\\.')}[^{]*\\{([^}]+)\\}`, 'g');
    let match;
    while ((match = regex.exec(css)) !== null) {
      const bloco = match[1];
      const brMatch = bloco.match(/border(?:-[a-z]+)*-radius\s*:\s*([^;]+);/i);
      if (brMatch) {
        const val = brMatch[1].trim();
        assert(val === '0' || val === '0px', `Seletor ${sel} viola o Visual Blacklist com border-radius: ${val}`);
      }
    }
  });
});

console.log('\n=================================================================');
console.log('   RESULTADO GERAL DOS TESTES DO TICKET 23');
console.log('=================================================================');
console.log(`Total de asserções executadas: ${aprovados + reprovados}`);
console.log(`Asserções aprovadas:           ${aprovados}`);
console.log(`Asserções reprovadas:          ${reprovados}`);

if (reprovados === 0) {
  console.log('\n✔ TICKET 23 APROVADO: PRONTUÁRIO MANILA E DESPACHO DE CONSEQUÊNCIAS INTEGRADOS COM SUCESSO!\n');
  process.exit(0);
} else {
  console.error('\n✖ FALHA NA VALIDAÇÃO DO TICKET 23.\n');
  process.exit(1);
}

