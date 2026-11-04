// ==========================================================================
// ENGINE.JS — MOTOR DETERMINÍSTICO DE REGRAS E CHECAGEM DE REQUISITOS
// Inspirado no modelo de The Life and Suffering of Sir Brante
// ==========================================================================

const NOMES_AMIGAVEIS = {
  astucia: 'ASTÚCIA',
  sangue_frio: 'SANGUE-FRIO',
  oficio: 'OFÍCIO',
  presenca: 'PRESENÇA',
  capital: 'CAPITAL',
  influencia: 'INFLUÊNCIA',
  suspeita_dops: 'SUSPEITA DOPS',
  moral_popular: 'MORAL POPULAR',
  relacao_pai: 'VÍNCULO PATERNO',
  honra_familiar: 'HONRA FAMILIAR',
  condicao_social: 'CONDIÇÃO SOCIAL',
  condicaoSocial: 'CONDIÇÃO SOCIAL'
};

class DeterministicEngine {
  constructor(stateStore) {
    this.store = stateStore;
  }

  // Avalia um único requisito individual contra o estado do jogador
  avaliarRequisitoIndividual(estado, chave, regra) {
    // 1. Identifica onde está o valor no estado
    let valorAtual = undefined;
    let nomeFormatado = NOMES_AMIGAVEIS[chave] || chave.replace(/_/g, ' ').toUpperCase();

    if (chave in estado.atributosFixos) {
      valorAtual = estado.atributosFixos[chave];
    } else if (chave in estado.recursosVolateis) {
      valorAtual = estado.recursosVolateis[chave];
    } else if (chave in estado.parentesco) {
      valorAtual = estado.parentesco[chave];
    } else if (chave === 'condicao_social' || chave === 'condicaoSocial') {
      valorAtual = estado.condicaoSocial;
    }

    if (valorAtual === undefined) {
      return {
        atendido: false,
        chave,
        motivo: `Atributo ou condição '${chave}' desconhecida no prontuário.`
      };
    }

    // 2. Comparação de Condição Social (String)
    if (chave === 'condicao_social' || chave === 'condicaoSocial') {
      const atendido = String(valorAtual).toLowerCase().includes(String(regra).toLowerCase());
      return {
        atendido,
        chave,
        rotulo: `Condição Social: ${regra}`,
        motivo: atendido ? null : `Requer Condição Social: ${regra} (Atual: ${valorAtual})`
      };
    }

    // 3. Comparação Numérica (Atributos e Recursos)
    // Suporta número simples (ex: { astucia: 2 } => >= 2) ou objeto { min: 2, max: 4 }
    let atendido = false;
    let descricaoRequerida = '';

    if (typeof regra === 'number') {
      atendido = valorAtual >= regra;
      descricaoRequerida = `>= ${regra}`;
    } else if (typeof regra === 'object' && regra !== null) {
      const min = regra.min !== undefined ? regra.min : -Infinity;
      const max = regra.max !== undefined ? regra.max : Infinity;
      atendido = valorAtual >= min && valorAtual <= max;
      if (regra.min !== undefined && regra.max !== undefined) {
        descricaoRequerida = `entre ${min} e ${max}`;
      } else if (regra.min !== undefined) {
        descricaoRequerida = `>= ${min}`;
      } else {
        descricaoRequerida = `<= ${max}`;
      }
    } else if (typeof regra === 'string') {
      // Suporte a strings como "< 5", ">= 3"
      if (regra.startsWith('<=')) {
        const val = Number(regra.replace('<=', '').trim());
        atendido = valorAtual <= val;
        descricaoRequerida = `<= ${val}`;
      } else if (regra.startsWith('>=')) {
        const val = Number(regra.replace('>=', '').trim());
        atendido = valorAtual >= val;
        descricaoRequerida = `>= ${val}`;
      } else if (regra.startsWith('<')) {
        const val = Number(regra.replace('<', '').trim());
        atendido = valorAtual < val;
        descricaoRequerida = `< ${val}`;
      } else if (regra.startsWith('>')) {
        const val = Number(regra.replace('>', '').trim());
        atendido = valorAtual > val;
        descricaoRequerida = `> ${val}`;
      } else {
        const val = Number(regra);
        atendido = valorAtual >= val;
        descricaoRequerida = `>= ${val}`;
      }
    }

    return {
      atendido,
      chave,
      valorAtual,
      descricaoRequerida,
      rotulo: `${nomeFormatado} ${descricaoRequerida}`,
      motivo: atendido ? null : `Requer ${nomeFormatado} ${descricaoRequerida} (Tens ${valorAtual})`
    };
  }

  // Avalia todos os requisitos de uma opção de escolha
  avaliarOpcao(opcao, estado = null) {
    const estadoAtual = estado || this.store.getState();
    const requisitos = opcao.requisitos || {};
    const chavesRequisitos = Object.keys(requisitos);

    if (chavesRequisitos.length === 0) {
      return {
        disponivel: true,
        requisitos: [],
        motivoBloqueio: null
      };
    }

    const avaliacoes = chavesRequisitos.map(chave => {
      return this.avaliarRequisitoIndividual(estadoAtual, chave, requisitos[chave]);
    });

    const todasAtendidas = avaliacoes.every(a => a.atendido);
    const primeiraFalha = avaliacoes.find(a => !a.atendido);

    return {
      disponivel: todasAtendidas,
      requisitos: avaliacoes,
      motivoBloqueio: primeiraFalha ? primeiraFalha.motivo : null
    };
  }

  // Executa uma decisão de forma determinística e atômica
  executarDecisao(evento, opcaoId) {
    const estadoAtual = this.store.getState();
    const opcao = evento.metadata.opcoes.find(o => o.id === opcaoId);

    if (!opcao) {
      throw new Error(`Opção com id '${opcaoId}' não encontrada no evento '${evento.metadata.id}'.`);
    }

    // Checagem determinística estrita
    const avaliacao = this.avaliarOpcao(opcao, estadoAtual);
    if (!avaliacao.disponivel) {
      throw new Error(`Escolha bloqueada: ${avaliacao.motivoBloqueio}`);
    }

    // 1. Gasta ações do dossiê (se o evento consumir cotas de ação)
    const custoAcao = evento.metadata.custo_acoes !== undefined ? Number(evento.metadata.custo_acoes) : 1;
    if (custoAcao > 0) {
      this.store.consumirAcao(custoAcao);
    }

    // 2. Aplica efeitos nas variáveis
    const deltas = this.store.aplicarEfeitos(opcao.efeitos || {});

    // 2.1 Se o evento especificar avanço ou alvo de ano sem estar nos efeitos
    if (!opcao.efeitos?.avanco_ano && !opcao.efeitos?.ano_alvo) {
      if (evento.metadata.avanco_ano) {
        this.store.avancarAno(evento.metadata.avanco_ano);
      } else if (evento.metadata.ano_alvo) {
        this.store.setAnoAtual(evento.metadata.ano_alvo);
      }
    }

    // 2.2 Se for na Fase 3 (Cheia de 75), aplica o avanço do rio e das horas
    if (evento.metadata.consumo_tempo_horas || evento.metadata.elevacao_rio) {
      this.store.aplicarConsumoCheia(
        evento.metadata.consumo_tempo_horas || 0,
        evento.metadata.elevacao_rio || 0
      );
    }

    // 3. Registra no histórico do prontuário
    this.store.registrarDecisao(evento.metadata.id, opcao.id, opcao.carimbo);

    // 4. Se for o clímax da fase, avança automaticamente para a próxima fase
    let avancouFase = false;
    if (evento.metadata.tipo === 'climax_obrigatorio') {
      this.store.avancarFase();
      avancouFase = true;
    }

    return {
      sucesso: true,
      eventoId: evento.metadata.id,
      opcaoId: opcao.id,
      carimbo: opcao.carimbo || 'REGISTRADO',
      deltas,
      proximoEventoId: opcao.proximo_evento || null,
      avancouFase
    };
  }

  // Verifica se o jogador atende aos requisitos de acesso de um evento
  verificarAcessoEvento(evento, estado = null) {
    const estadoAtual = estado || this.store.getState();
    const reqs = evento.metadata.requisitos_acesso || {};
    const chaves = Object.keys(reqs);

    if (chaves.length === 0) {
      return { permitido: true, motivo: null };
    }

    for (const chave of chaves) {
      const avaliacao = this.avaliarRequisitoIndividual(estadoAtual, chave, reqs[chave]);
      if (!avaliacao.atendido) {
        return { permitido: false, motivo: avaliacao.motivo };
      }
    }

    return { permitido: true, motivo: null };
  }

  // Verifica se o estado do jogador atingiu um limiar crítico de crise extrema
  verificarGatilhoCrise(estado = null) {
    const estadoAtual = estado || this.store.getState();
    const recursos = estadoAtual.recursosVolateis;

    // 1. Limiar Máximo de Suspeita do DOPS (10/10)
    if (recursos.suspeita_dops >= 10) {
      return {
        tipo: 'suspeita_maxima',
        criseId: 'crise_urgente_batida_dops',
        motivo: 'Suspeita Policial atingiu o limite crítico (10/10). O DOPS cercou teu esconderijo.'
      };
    }

    // 2. Limiar de Falência / Miséria (Capital <= 0)
    if (recursos.capital <= 0) {
      return {
        tipo: 'falencia_capital',
        criseId: 'crise_urgente_miseria_despejo',
        motivo: 'Teu Capital zerou por completo. Oficiais de justiça emitiram ordem de penhora e despejo.'
      };
    }

    return null;
  }

  // Retorna os eventos disponíveis no Dossiê da fase atual
  obterEventosDossie(eventosMap, estado = null) {
    const estadoAtual = estado || this.store.getState();
    const fase = Number(estadoAtual.faseAtual);

    // 1. PRIORIDADE ABSOLUTA: Sequestro por Evento de Crise Forçado
    const crise = this.verificarGatilhoCrise(estadoAtual);
    if (crise) {
      const eventoCrise = eventosMap[crise.criseId];
      return {
        tipoDossie: 'crise_sequestrada',
        faseAtual: fase,
        motivoCrise: crise.motivo,
        eventosDisponiveis: eventoCrise ? [eventoCrise] : []
      };
    }

    const eventosFase = Object.values(eventosMap).filter(ev => Number(ev.metadata.fase) === fase);

    // Identifica quais eventos já foram concluídos no histórico
    const concluidosIds = new Set(estadoAtual.historicoDecisoes.map(h => h.eventoId));

    // Se as ações da fase se esgotaram, o dossiê libera exclusivamente o clímax histórico
    if (estadoAtual.acoesRestantesFase <= 0) {
      const eventosClimax = eventosFase.filter(ev => ev.metadata.tipo === 'climax_obrigatorio' && !concluidosIds.has(ev.metadata.id));
      return {
        tipoDossie: 'climax',
        faseAtual: fase,
        acoesRestantes: 0,
        eventosDisponiveis: eventosClimax
      };
    }

    // Se ainda há ações, lista os eventos de dossiê pendentes
    // Aplica filtragem temporal determinística:
    // 1. Eventos com ano definido maior que o ano atual NUNCA são exibidos antecipadamente
    // 2. Se existirem eventos pendentes cujo ano corresponde exatamente ao ano atual, prioriza esses (progressão ano a ano)
    // 3. Caso não haja eventos para o ano exato, exibe os eventos pendentes com ano <= anoAtual ordenados cronologicamente
    const anoAtual = Number(estadoAtual.anoAtual) || 1948;

    let pendentesFase = eventosFase
      .filter(ev => ev.metadata.tipo === 'dossie' && !concluidosIds.has(ev.metadata.id))
      .filter(ev => !ev.metadata.ano || Number(ev.metadata.ano) <= anoAtual);

    const eventosAnoAtual = pendentesFase.filter(ev => Number(ev.metadata.ano) === anoAtual);
    if (eventosAnoAtual.length > 0) {
      pendentesFase = eventosAnoAtual;
    } else {
      pendentesFase.sort((a, b) => (Number(a.metadata.ano) || 0) - (Number(b.metadata.ano) || 0));
    }

    const eventosDisponiveis = pendentesFase.map(ev => {
      const acesso = this.verificarAcessoEvento(ev, estadoAtual);
      return {
        ...ev,
        acessoPermitido: acesso.permitido,
        motivoBloqueioAcesso: acesso.motivo
      };
    });

    return {
      tipoDossie: 'agenda',
      faseAtual: fase,
      acoesRestantes: estadoAtual.acoesRestantesFase,
      acoesTotais: estadoAtual.acoesTotaisFase,
      eventosDisponiveis
    };
  }
}

// Suporte para exportação CommonJS (Node/Electron) e carregamento direto no browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DeterministicEngine };
} else {
  window.DeterministicEngine = DeterministicEngine;
}
