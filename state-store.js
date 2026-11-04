// ==========================================================================
// STATE-STORE.JS — GERENCIADOR DE ESTADO DO PERSONAGEM & ESPECTRO DE ATRIBUTOS
// Inspirado na progressão qualitativa de The Life and Suffering of Sir Brante
// ==========================================================================

const ESTADO_INICIAL_PADRAO = {
  condicaoSocial: "Filho de Estivador (Mocambo)",
  faseAtual: 1,
  anoAtual: 1958,
  acoesRestantesFase: 4,
  acoesTotaisFase: 4,
  
  // Parentesco e Vínculos Familiares
  parentesco: {
    relacao_pai: 2,
    honra_familiar: 1
  },

  // Atributos Fixos (Fase 1: Juventude)
  atributosFixos: {
    astucia: 2,
    sangue_frio: 1,
    oficio: 2,
    presenca: 0
  },

  // Recursos Voláteis (Fases 2 e 3)
  recursosVolateis: {
    capital: 40,
    influencia: 1,
    suspeita_dops: 2,
    moral_popular: 3
  },

  // Modo Sobrevivência (Fase 3: Cheia de Julho de 1975)
  cheia75: {
    nivelRioMetros: 1.5,
    horasRestantes: 18,
    picoCheiaAtingido: false
  },

  // Histórico de Decisões e Marcas
  historicoDecisoes: []
};

// Definição dos Espectros Qualitativos (estilo Sir Brante)
const DEFINICOES_ESPECTRO = {
  atributo_padrao: [
    { min: -Infinity, max: 0, rotulo: 'Cru', tom: 'critico' },
    { min: 1, max: 1, rotulo: 'Vacilante', tom: 'fraco' },
    { min: 2, max: 2, rotulo: 'Firme', tom: 'estavel' },
    { min: 3, max: 3, rotulo: 'Calejado', tom: 'forte' },
    { min: 4, max: Infinity, rotulo: 'Inabalável', tom: 'mestre' }
  ],
  capital: [
    { min: -Infinity, max: 0, rotulo: 'Miséria', tom: 'critico' },
    { min: 1, max: 20, rotulo: 'Cambaleante', tom: 'fraco' },
    { min: 21, max: 50, rotulo: 'Modesto', tom: 'estavel' },
    { min: 51, max: 80, rotulo: 'Firme', tom: 'forte' },
    { min: 81, max: Infinity, rotulo: 'Abastado', tom: 'mestre' }
  ],
  influencia: [
    { min: -Infinity, max: 0, rotulo: 'Isolado', tom: 'critico' },
    { min: 1, max: 1, rotulo: 'Fraca', tom: 'fraco' },
    { min: 2, max: 2, rotulo: 'Firme', tom: 'estavel' },
    { min: 3, max: 3, rotulo: 'Forte', tom: 'forte' },
    { min: 4, max: Infinity, rotulo: 'Eminente', tom: 'mestre' }
  ],
  suspeita_dops: [
    { min: -Infinity, max: 1, rotulo: 'Ignorado', tom: 'mestre' },
    { min: 2, max: 4, rotulo: 'Observado', tom: 'estavel' },
    { min: 5, max: 7, rotulo: 'Visado', tom: 'fraco' },
    { min: 8, max: 9, rotulo: 'Caçado', tom: 'critico' },
    { min: 10, max: Infinity, rotulo: 'Batida Iminente', tom: 'critico' }
  ],
  moral_popular: [
    { min: -Infinity, max: 0, rotulo: 'Desacreditado', tom: 'critico' },
    { min: 1, max: 2, rotulo: 'Cambaleante', tom: 'fraco' },
    { min: 3, max: 4, rotulo: 'Firme', tom: 'estavel' },
    { min: 5, max: 6, rotulo: 'Forte', tom: 'forte' },
    { min: 7, max: Infinity, rotulo: 'Bandeira Viva', tom: 'mestre' }
  ],
  parentesco_padrao: [
    { min: -Infinity, max: -2, rotulo: 'Rompido', tom: 'critico' },
    { min: -1, max: -1, rotulo: 'Cambaleante', tom: 'fraco' },
    { min: 0, max: 0, rotulo: 'Distante', tom: 'estavel' },
    { min: 1, max: 1, rotulo: 'Firme', tom: 'forte' },
    { min: 2, max: Infinity, rotulo: 'Leal', tom: 'mestre' }
  ]
};

function obterEspectro(chave, valor) {
  const num = Number(valor) || 0;
  let faixas = DEFINICOES_ESPECTRO.atributo_padrao;

  if (chave in DEFINICOES_ESPECTRO) {
    faixas = DEFINICOES_ESPECTRO[chave];
  } else if (chave === 'relacao_pai' || chave === 'honra_familiar') {
    faixas = DEFINICOES_ESPECTRO.parentesco_padrao;
  }

  let indiceAtivo = 0;
  for (let i = 0; i < faixas.length; i++) {
    if (num >= faixas[i].min && num <= faixas[i].max) {
      indiceAtivo = i;
      break;
    }
  }

  const faixaAtual = faixas[indiceAtivo];
  return {
    chave,
    valor: num,
    rotulo: faixaAtual.rotulo,
    tom: faixaAtual.tom,
    indice: indiceAtivo,
    totalFaixas: faixas.length,
    faixas: faixas.map((f, idx) => ({
      rotulo: f.rotulo,
      tom: f.tom,
      ativo: idx === indiceAtivo,
      preenchido: idx <= indiceAtivo
    }))
  };
}

class CharacterStateStore {
  constructor(estadoInicial = null) {
    this.estado = JSON.parse(JSON.stringify(estadoInicial || ESTADO_INICIAL_PADRAO));
    this.ouvintes = [];
  }

  static obterEspectro(chave, valor) {
    return obterEspectro(chave, valor);
  }

  obterEspectro(chave, valor) {
    return obterEspectro(chave, valor);
  }

  // Retorna uma cópia imutável do estado atual
  getState() {
    return JSON.parse(JSON.stringify(this.estado));
  }

  // Inscreve ouvintes para mudanças de estado
  subscribe(fn) {
    this.ouvintes.push(fn);
    // Notifica imediatamente com o estado atual
    fn(this.getState(), null);
    return () => {
      this.ouvintes = this.ouvintes.filter(cb => cb !== fn);
    };
  }

  // Notifica todos os ouvintes
  notificar(deltas = {}) {
    const estadoCopia = this.getState();
    this.ouvintes.forEach(fn => fn(estadoCopia, deltas));
  }

  // Aplica mutações de atributos e recursos de forma determinística
  aplicarEfeitos(efeitos = {}) {
    const deltas = {};

    for (const [chave, deltaNum] of Object.entries(efeitos)) {
      const valorDelta = Number(deltaNum);
      if (isNaN(valorDelta) || valorDelta === 0) continue;

      let anterior = undefined;
      let novo = undefined;
      let tipo = null;

      // 1. Atributos Fixos
      if (chave in this.estado.atributosFixos) {
        anterior = this.estado.atributosFixos[chave];
        novo = Math.max(0, anterior + valorDelta);
        this.estado.atributosFixos[chave] = novo;
        tipo = 'atributo';
      }
      // 2. Recursos Voláteis
      else if (chave in this.estado.recursosVolateis) {
        anterior = this.estado.recursosVolateis[chave];
        novo = anterior + valorDelta;
        if (chave === 'suspeita_dops') {
          novo = Math.max(0, Math.min(10, novo)); // Clamped 0 a 10
        } else if (chave === 'capital') {
          novo = Math.max(0, novo);
        }
        this.estado.recursosVolateis[chave] = novo;
        tipo = 'recurso';
      }
      // 3. Parentesco
      else if (chave in this.estado.parentesco) {
        anterior = this.estado.parentesco[chave];
        novo = anterior + valorDelta;
        this.estado.parentesco[chave] = novo;
        tipo = 'parentesco';
      }

      if (tipo !== null) {
        const espectroAnterior = obterEspectro(chave, anterior);
        const espectroNovo = obterEspectro(chave, novo);
        deltas[chave] = {
          anterior,
          novo,
          delta: valorDelta,
          tipo,
          espectroAnterior,
          espectroNovo,
          mudouPatamar: espectroAnterior.indice !== espectroNovo.indice,
          subiuPatamar: espectroNovo.indice > espectroAnterior.indice
        };
      }
    }

    this.notificar(deltas);
    return deltas;
  }

  // Define a condição social do personagem
  setCondicaoSocial(novaCondicao) {
    if (!novaCondicao) return;
    const anterior = this.estado.condicaoSocial;
    this.estado.condicaoSocial = novaCondicao;
    this.notificar({ condicaoSocial: { anterior, novo: novaCondicao, tipo: 'social' } });
  }

  // Gasta ação da fase atual
  consumirAcao(quantidade = 1) {
    const anterior = this.estado.acoesRestantesFase;
    const novo = Math.max(0, anterior - quantidade);
    this.estado.acoesRestantesFase = novo;
    this.notificar({ acoesRestantesFase: { anterior, novo, delta: -quantidade, tipo: 'acoes' } });
    return novo;
  }

  // Avança para a próxima fase histórica do jogo
  avancarFase(novaFase = null) {
    const anterior = this.estado.faseAtual;
    const faseAlvo = novaFase !== null ? Number(novaFase) : anterior + 1;
    this.estado.faseAtual = Math.min(3, faseAlvo);

    if (this.estado.faseAtual === 2) {
      this.estado.anoAtual = 1968;
      this.estado.acoesTotaisFase = 4;
      this.estado.acoesRestantesFase = 4;
    } else if (this.estado.faseAtual === 3) {
      this.estado.anoAtual = 1975;
      this.estado.acoesTotaisFase = 3;
      this.estado.acoesRestantesFase = 3;
      if (!this.estado.cheia75) {
        this.estado.cheia75 = { nivelRioMetros: 1.5, horasRestantes: 18, picoCheiaAtingido: false };
      }
    }

    this.notificar({
      faseAtual: { anterior, novo: this.estado.faseAtual, tipo: 'fase' },
      anoAtual: { novo: this.estado.anoAtual, tipo: 'ano' },
      acoesRestantesFase: { novo: this.estado.acoesRestantesFase, tipo: 'acoes' }
    });
    return this.estado.faseAtual;
  }

  // Aplica o avanço da enchente de 1975 (consumo de horas e elevação do Rio Capibaribe)
  aplicarConsumoCheia(horas = 0, elevacao = 0) {
    if (!this.estado.cheia75) {
      this.estado.cheia75 = { nivelRioMetros: 1.5, horasRestantes: 18, picoCheiaAtingido: false };
    }
    const cheia = this.estado.cheia75;
    const horasConsumidas = Number(horas) || 0;
    const elevacaoMetros = Number(elevacao) || 0;

    cheia.horasRestantes = Math.max(0, cheia.horasRestantes - horasConsumidas);
    cheia.nivelRioMetros = Number(Math.min(4.5, cheia.nivelRioMetros + elevacaoMetros).toFixed(2));
    if (cheia.nivelRioMetros >= 4.0 || cheia.horasRestantes <= 0) {
      cheia.picoCheiaAtingido = true;
    }

    this.notificar({
      cheia75: {
        horasRestantes: cheia.horasRestantes,
        nivelRioMetros: cheia.nivelRioMetros,
        picoCheiaAtingido: cheia.picoCheiaAtingido,
        tipo: 'cheia'
      }
    });
    return cheia;
  }

  // Registra decisão no prontuário histórico
  registrarDecisao(eventoId, opcaoId, carimbo) {
    this.estado.historicoDecisoes.push({
      eventoId,
      opcaoId,
      carimbo,
      timestamp: Date.now()
    });
  }

  // Reseta para o estado inicial
  reset() {
    this.estado = JSON.parse(JSON.stringify(ESTADO_INICIAL_PADRAO));
    this.notificar({ reset: true });
  }
}

// Suporte para exportação CommonJS (Node/Electron) e carregamento direto no browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CharacterStateStore, ESTADO_INICIAL_PADRAO, obterEspectro };
} else {
  window.CharacterStateStore = CharacterStateStore;
  window.ESTADO_INICIAL_PADRAO = ESTADO_INICIAL_PADRAO;
  window.obterEspectro = obterEspectro;
}
