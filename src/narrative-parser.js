const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Configuração do Marked para saída limpa
marked.setOptions({
  gfm: true,
  breaks: true
});

// Dicionário Histórico de Entidades do Recife (1958–1975)
const ENTIDADES_HISTORICAS = {
  bairros: [
    'Santo Antônio', 'Boa Vista', 'São José', 'Cinco Pontas', 'Várzea', 
    'Casa Forte', 'Derby', 'Afogados', 'Madalena', 'Torre', 'Pina', 
    'Coelhos', 'Ilha do Leite', 'Encruzilhada', 'Arruda', 'Espinheiro'
  ],
  faccoes: [
    'DOPS', 'D\\.O\\.P\\.S\\.', 'Secretaria de Segurança Pública', 
    'União dos Ferroviários', 'Sindicato dos Estivadores', 'Sindicato',
    'Exército', 'Polícia Militar', 'Ação Popular', 'Comitê Central',
    'Censura Federal', 'Great Western'
  ],
  geografia: [
    'Rio Capibaribe', 'Capibaribe', 'Rio Beberibe', 'Beberibe',
    'Barragem de Tapacurá', 'Tapacurá', 'Ponte Duarte Coelho', 
    'Ponte Maurício de Nassau', 'Ponte de Ferro', 'Cais de Santa Rita'
  ]
};

// Agrupa todas as entidades por tipo e ordena por comprimento decrescente para evitar conflito/aninhamento
const ENTIDADES_PROCESSADAS = [];
ENTIDADES_HISTORICAS.bairros.forEach(b => ENTIDADES_PROCESSADAS.push({ termo: b, tipo: 'bairro' }));
ENTIDADES_HISTORICAS.faccoes.forEach(f => ENTIDADES_PROCESSADAS.push({ termo: f.replace(/\\/g, ''), tipo: 'faccao' }));
ENTIDADES_HISTORICAS.geografia.forEach(g => ENTIDADES_PROCESSADAS.push({ termo: g, tipo: 'rio' }));
ENTIDADES_PROCESSADAS.sort((a, b) => b.termo.length - a.termo.length);

// Aplica grifos semânticos e históricos de forma segura sem aninhamento de tags
function aplicarGrifosHistoricos(html) {
  let resultado = html;

  ENTIDADES_PROCESSADAS.forEach(({ termo, tipo }) => {
    const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Regex que evita casar dentro de atributos HTML ou tags já existentes
    const regex = new RegExp(`(?<!<[^>]*)(?<![\\wÀ-ÿ])(${escapado})(?![\\wÀ-ÿ])(?![^<]*>)`, 'gi');
    resultado = resultado.replace(regex, `<span class="grifo-${tipo}">$1</span>`);
  });

  return resultado;
}

// Validador estrito de esquema para os eventos de roteiro
function validarEsquemaEvento(data, filePath) {
  const erros = [];

  if (!data.id || typeof data.id !== 'string') {
    erros.push("Campo obrigatório 'id' ausente ou inválido.");
  }
  if (!data.titulo || typeof data.titulo !== 'string') {
    erros.push("Campo obrigatório 'titulo' ausente ou inválido.");
  }
  if (!data.fase || ![1, 2, 3].includes(Number(data.fase))) {
    erros.push("Campo 'fase' deve ser 1, 2 ou 3.");
  }
  if (!data.ano || isNaN(Number(data.ano))) {
    erros.push("Campo 'ano' numérico ausente ou inválido.");
  }
  if (!data.tipo || !['dossie', 'climax_obrigatorio', 'crise_urgente'].includes(data.tipo)) {
    erros.push("Campo 'tipo' deve ser 'dossie', 'climax_obrigatorio' ou 'crise_urgente'.");
  }

  if (!Array.isArray(data.opcoes) || data.opcoes.length === 0) {
    erros.push("O evento deve conter uma lista 'opcoes' com ao menos uma decisão.");
  } else {
    data.opcoes.forEach((opcao, index) => {
      if (!opcao.id || typeof opcao.id !== 'string') {
        erros.push(`Opção [${index}]: 'id' ausente ou inválido.`);
      }
      if (!opcao.rotulo || typeof opcao.rotulo !== 'string') {
        erros.push(`Opção [${index}]: 'rotulo' ausente ou inválido.`);
      }
    });
  }

  if (erros.length > 0) {
    throw new Error(`Falha de validação em [${path.basename(filePath)}]:\n  - ` + erros.join('\n  - '));
  }
}

// Faz o parse de um arquivo individual .md
function parseEventFile(filePath) {
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(rawContent);
    const data = parsed.data || {};
    
    // Normaliza campos default
    data.custo_acoes = data.custo_acoes !== undefined ? Number(data.custo_acoes) : 1;
    data.requisitos_acesso = data.requisitos_acesso || {};
    data.opcoes = data.opcoes || [];

    // Normaliza campo de múltiplas imagens/beats por cena
    if (Array.isArray(data.imagens)) {
      data.imagens = data.imagens.map(img => {
        if (typeof img === 'string') return { imagem: img, tombo_mcr: data.tombo_mcr || null };
        return img;
      });
    } else if (data.imagem) {
      data.imagens = [{ imagem: data.imagem, tombo_mcr: data.tombo_mcr || null }];
    } else {
      data.imagens = [];
    }

    // Valida o contrato do roteirista
    validarEsquemaEvento(data, filePath);

    // Processa opções e desfechos narrativos (Ticket 25)
    data.opcoes.forEach(opcao => {
      if (opcao.desfecho && typeof opcao.desfecho === 'string') {
        opcao.desfecho = opcao.desfecho.trim();
        opcao.desfechoHtml = aplicarGrifosHistoricos(marked.parse(opcao.desfecho).trim());
      } else {
        // Fallback diegético elegante quando o autor não redigiu desfecho explícito
        const carimboTexto = opcao.carimbo ? `[${opcao.carimbo}]` : '[REGISTRADO]';
        const textoBase = opcao.descricao
          ? `A decisão foi formalmente consumada sob o carimbo de ${carimboTexto}. ${opcao.descricao}`
          : `A resolução foi lavrada nos registros históricos da cidade sob a chancela de ${carimboTexto}.`;
        opcao.desfecho = textoBase;
        opcao.desfechoHtml = aplicarGrifosHistoricos(`<p>${textoBase}</p>`);
      }
    });

    // Converte Markdown e aplica estilização tipográfica
    const htmlBruto = marked.parse(parsed.content || '');
    const htmlFinal = aplicarGrifosHistoricos(htmlBruto);

    return {
      metadata: data,
      corpoHtml: htmlFinal,
      corpoTextoPuro: parsed.content.trim(),
      arquivoOrigem: filePath
    };
  } catch (error) {
    return {
      erro: true,
      mensagem: error.message,
      arquivoOrigem: filePath
    };
  }
}

// Escaneia recursivamente a pasta de conteúdo e compila todos os eventos
function carregarTodosEventos(baseDir) {
  const eventos = {};
  const erros = [];

  function escanearDiretorio(dir) {
    if (!fs.existsSync(dir)) return;

    const itens = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of itens) {
      const caminhoCompleto = path.join(dir, item.name);
      if (item.isDirectory()) {
        escanearDiretorio(caminhoCompleto);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        const resultado = parseEventFile(caminhoCompleto);
        if (resultado.erro) {
          erros.push(resultado);
        } else {
          eventos[resultado.metadata.id] = resultado;
        }
      }
    }
  }

  escanearDiretorio(baseDir);

  return {
    eventos,
    totalCarregados: Object.keys(eventos).length,
    erros
  };
}

module.exports = {
  parseEventFile,
  carregarTodosEventos,
  aplicarGrifosHistoricos
};

