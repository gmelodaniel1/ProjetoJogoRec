const fs = require('fs');
const path = require('path');
const { carregarTodosEventos } = require('../src/narrative-parser');

const rootDir = path.resolve(__dirname, '..');
const pastaConteudo = path.join(rootDir, 'conteudo');

function compilarEventosParaWeb() {
  const resultado = carregarTodosEventos(pastaConteudo);

  if (resultado.erros && resultado.erros.length > 0) {
    console.warn('[BUILD-WEB] Avisos de validação encontrados:');
    resultado.erros.forEach(e => console.warn('  -', e.mensagem));
  }

  // Normaliza caminhos para relativos (evita expor caminhos absolutos locais na web)
  const eventosLimpos = {};
  for (const [id, ev] of Object.entries(resultado.eventos)) {
    eventosLimpos[id] = {
      ...ev,
      arquivoOrigem: ev.arquivoOrigem
        ? path.relative(rootDir, ev.arquivoOrigem).replace(/\\/g, '/')
        : ''
    };
  }

  const payload = {
    eventos: eventosLimpos,
    totalCarregados: Object.keys(eventosLimpos).length,
    erros: []
  };

  const jsonString = JSON.stringify(payload, null, 2);

  // 1. Gera conteudo/eventos.json (para fetch HTTP se necessário)
  const caminhoJson = path.join(pastaConteudo, 'eventos.json');
  fs.writeFileSync(caminhoJson, jsonString, 'utf-8');

  // 2. Gera conteudo/eventos-bundle.js (funciona em GitHub Pages e também via file:// sem erro de CORS)
  const caminhoBundle = path.join(pastaConteudo, 'eventos-bundle.js');
  const conteudoJs = `// Arquivo gerado automaticamente por scripts/build-web.js\nwindow.EVENTOS_PRECARREGADOS = ${jsonString};\n`;
  fs.writeFileSync(caminhoBundle, conteudoJs, 'utf-8');

  console.log(`[BUILD-WEB] ✔ ${payload.totalCarregados} eventos compilados com sucesso em:`);
  console.log(`  - ${path.relative(rootDir, caminhoBundle)}`);
  console.log(`  - ${path.relative(rootDir, caminhoJson)}`);
  return payload;
}

if (require.main === module) {
  compilarEventosParaWeb();
}

module.exports = { compilarEventosParaWeb };

