// ==========================================================================
// STATE-STORE.JS — GERENCIADOR DE ESTADO DO PERSONAGEM & PRONTUÁRIO DO DOPS
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

class CharacterStateStore {
  constructor(estadoInicial = null) {
    this.estado = JSON.parse(JSON.stringify(estadoInicial || ESTADO_INICIAL_PADRAO));
    this.ouvintes = [];
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

      // 1. Atributos Fixos
      if (chave in this.estado.atributosFixos) {
        const anterior = this.estado.atributosFixos[chave];
        const novo = Math.max(0, anterior + valorDelta);
        this.estado.atributosFixos[chave] = novo;
        deltas[chave] = { anterior, novo, delta: valorDelta, tipo: 'atributo' };
      }
      
      // 2. Recursos Voláteis
      else if (chave in this.estado.recursosVolateis) {
        const anterior = this.estado.recursosVolateis[chave];
        let novo = anterior + valorDelta;
        
        // Limites específicos de recursos
        if (chave === 'suspeita_dops') {
          novo = Math.max(0, Math.min(10, novo)); // Clamped 0 a 10
        } else if (chave === 'capital') {
          novo = Math.max(0, novo);
        }

        this.estado.recursosVolateis[chave] = novo;
        deltas[chave] = { anterior, novo, delta: valorDelta, tipo: 'recurso' };
      }

      // 3. Parentesco
      else if (chave in this.estado.parentesco) {
        const anterior = this.estado.parentesco[chave];
        const novo = anterior + valorDelta;
        this.estado.parentesco[chave] = novo;
        deltas[chave] = { anterior, novo, delta: valorDelta, tipo: 'parentesco' };
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
  module.exports = { CharacterStateStore, ESTADO_INICIAL_PADRAO };
} else {
  window.CharacterStateStore = CharacterStateStore;
  window.ESTADO_INICIAL_PADRAO = ESTADO_INICIAL_PADRAO;
}

