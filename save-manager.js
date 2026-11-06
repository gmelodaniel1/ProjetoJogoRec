// ==========================================================================
// SAVE-MANAGER.JS — SISTEMA DE PERSISTÊNCIA DETERMINÍSTICA & SLOTS DE ARQUIVO
// ==========================================================================

const VERSAO_SCHEMA_SAVE = 1;

const SLOTS_DISPONIVEIS = ['auto_save', 'slot_1', 'slot_2', 'slot_3'];

const NOMES_PADRAO_SLOTS = {
  auto_save: 'Salvamento Automático (Última Ação)',
  slot_1: 'Prontuário de Arquivo I',
  slot_2: 'Prontuário de Arquivo II',
  slot_3: 'Prontuário de Arquivo III'
};

// Armazenamento em memória defensivo para testes em Node.js ou ambientes sem localStorage
class MemoryStorage {
  constructor() {
    this.dados = new Map();
  }
  getItem(chave) {
    return this.dados.has(chave) ? this.dados.get(chave) : null;
  }
  setItem(chave, valor) {
    this.dados.set(chave, String(valor));
  }
  removeItem(chave) {
    this.dados.delete(chave);
  }
  clear() {
    this.dados.clear();
  }
  get length() {
    return this.dados.size;
  }
}

class SaveManager {
  constructor({ store = null, storage = null, prefix = 'aguas_de_ferro_' } = {}) {
    this.store = store;
    this.prefix = prefix;

    if (storage) {
      this.storage = storage;
    } else if (typeof window !== 'undefined' && window.localStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = new MemoryStorage();
    }
  }

  // Gera a chave interna com prefixo de isolamento
  _obterChaveSave(slotId) {
    return `${this.prefix}save_${slotId}`;
  }

  _obterChaveMeta(slotId) {
    return `${this.prefix}meta_${slotId}`;
  }

  // Formata timestamp em data e hora legível (padrão brasileiro)
  _formatarDataHora(timestamp) {
    try {
      const d = new Date(timestamp);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const ano = d.getFullYear();
      const hora = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${dia}/${mes}/${ano} às ${hora}:${min}`;
    } catch {
      return 'Data Indisponível';
    }
  }

  // Salva o estado atual do CharacterStateStore e contexto da sessão em um slot
  salvar(slotId, contextoSessao = {}, nomePersonalizado = null) {
    if (!slotId || !SLOTS_DISPONIVEIS.includes(slotId)) {
      return { sucesso: false, erro: `Slot '${slotId}' inválido. Slots permitidos: ${SLOTS_DISPONIVEIS.join(', ')}` };
    }

    if (!this.store) {
      return { sucesso: false, erro: 'Instância de CharacterStateStore não associada ao SaveManager.' };
    }

    try {
      const estado = this.store.getState();
      const agora = Date.now();
      const idade = this.store.getIdade();
      const etapaVida = this.store.getEtapaVida();

      const tituloCena = contextoSessao.tituloCena || 
        (contextoSessao.modoVisual === 'evento' && contextoSessao.eventoAtivoId 
          ? `Ocorrência: ${contextoSessao.eventoAtivoId}` 
          : `Dossiê — ${etapaVida.nome}`);

      const metadados = {
        slotId,
        nomeSlot: nomePersonalizado || NOMES_PADRAO_SLOTS[slotId] || `Arquivo ${slotId}`,
        timestamp: agora,
        dataFormatada: this._formatarDataHora(agora),
        anoAtual: estado.anoAtual || 1948,
        idade: idade,
        faseAtual: estado.faseAtual || 1,
        condicaoSocial: estado.condicaoSocial || 'Desconhecida',
        totalDecisoes: (estado.historicoDecisoes || []).length,
        tituloCena,
        resumoAtributos: {
          astucia: estado.atributosFixos?.astucia ?? 0,
          sangue_frio: estado.atributosFixos?.sangue_frio ?? 0,
          oficio: estado.atributosFixos?.oficio ?? 0,
          presenca: estado.atributosFixos?.presenca ?? 0,
          capital: estado.recursosVolateis?.capital ?? 0,
          suspeita_dops: estado.recursosVolateis?.suspeita_dops ?? 0
        },
        versaoSchema: VERSAO_SCHEMA_SAVE
      };

      const payload = {
        versaoSchema: VERSAO_SCHEMA_SAVE,
        metadados,
        estado,
        sessao: {
          eventoAtivoId: contextoSessao.eventoAtivoId || null,
          modoVisual: contextoSessao.modoVisual || 'dossie',
          deliberacaoAberta: Boolean(contextoSessao.deliberacaoAberta),
          abaPalcoAtiva: contextoSessao.abaPalcoAtiva || 'aba-cenario',
          diarioDecisoes: contextoSessao.diarioDecisoes || []
        }
      };

      // Gravação atômica dos dados completos e do índice rápido de metadados
      const jsonPayload = JSON.stringify(payload);
      const jsonMeta = JSON.stringify(metadados);

      this.storage.setItem(this._obterChaveSave(slotId), jsonPayload);
      this.storage.setItem(this._obterChaveMeta(slotId), jsonMeta);

      return {
        sucesso: true,
        slotId,
        metadados
      };
    } catch (err) {
      console.error(`[SAVE-MANAGER] Falha ao salvar no slot '${slotId}':`, err);
      return { sucesso: false, erro: err.message };
    }
  }

  // Carrega e valida um slot específico
  carregar(slotId) {
    if (!slotId || !SLOTS_DISPONIVEIS.includes(slotId)) {
      return { sucesso: false, erro: `Slot '${slotId}' inválido.` };
    }

    try {
      const bruto = this.storage.getItem(this._obterChaveSave(slotId));
      if (!bruto) {
        return { sucesso: false, erro: `Prontuário '${slotId}' não encontrado no arquivo.` };
      }

      const payload = JSON.parse(bruto);

      // Validação defensiva de integridade
      if (!payload || typeof payload !== 'object') {
        return { sucesso: false, erro: 'Formato do arquivo corrompido.' };
      }

      if (!payload.estado || typeof payload.estado !== 'object') {
        return { sucesso: false, erro: 'Dados do prontuário ausentes ou corrompidos.' };
      }

      return {
        sucesso: true,
        slotId,
        dados: payload
      };
    } catch (err) {
      console.error(`[SAVE-MANAGER] Falha ao ler slot '${slotId}':`, err);
      return { sucesso: false, erro: `Erro ao decodificar arquivo: ${err.message}` };
    }
  }

  // Obtém apenas os metadados de um slot de forma rápida (sem carregar o estado inteiro)
  obterMetadados(slotId) {
    try {
      const metaBruto = this.storage.getItem(this._obterChaveMeta(slotId));
      if (metaBruto) {
        return JSON.parse(metaBruto);
      }
      // Fallback para recuperar metadados diretamente do save completo se o índice meta falhar
      const saveBruto = this.storage.getItem(this._obterChaveSave(slotId));
      if (saveBruto) {
        const payload = JSON.parse(saveBruto);
        return payload.metadados || null;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Verifica se o slot existe e possui dados gravados
  existeSlot(slotId) {
    return Boolean(this.storage.getItem(this._obterChaveSave(slotId)));
  }

  // Exclui o prontuário gravado em um slot
  excluirSlot(slotId) {
    try {
      this.storage.removeItem(this._obterChaveSave(slotId));
      this.storage.removeItem(this._obterChaveMeta(slotId));
      return { sucesso: true, slotId };
    } catch (err) {
      return { sucesso: false, erro: err.message };
    }
  }

  // Lista todos os 4 slots com seus respectivos estados e metadados
  listarSlots() {
    return SLOTS_DISPONIVEIS.map(slotId => {
      const preenchido = this.existeSlot(slotId);
      const metadados = preenchido ? this.obterMetadados(slotId) : null;

      return {
        slotId,
        nomePadrao: NOMES_PADRAO_SLOTS[slotId],
        preenchido,
        metadados
      };
    });
  }

  // Identifica o slot com o timestamp mais recente (para a ação "Continuar Investigação")
  obterSlotMaisRecente() {
    const slots = this.listarSlots().filter(s => s.preenchido && s.metadados);
    if (slots.length === 0) return null;

    slots.sort((a, b) => (b.metadados.timestamp || 0) - (a.metadados.timestamp || 0));
    return slots[0];
  }

  // Limpa todos os registros do jogo no armazenamento
  limparTodos() {
    SLOTS_DISPONIVEIS.forEach(slotId => {
      this.excluirSlot(slotId);
    });
    return { sucesso: true };
  }

  // Exporta um slot para JSON string legível (backup pelo jogador)
  exportarParaJson(slotId) {
    const res = this.carregar(slotId);
    if (!res.sucesso) return null;
    return JSON.stringify(res.dados, null, 2);
  }

  // Importa um JSON externo para um slot
  importarDeJson(slotId, jsonString) {
    try {
      const payload = JSON.parse(jsonString);
      if (!payload || !payload.estado) {
        return { sucesso: false, erro: 'JSON de prontuário inválido ou incompatível.' };
      }

      payload.slotId = slotId;
      if (payload.metadados) payload.metadados.slotId = slotId;

      this.storage.setItem(this._obterChaveSave(slotId), JSON.stringify(payload));
      if (payload.metadados) {
        this.storage.setItem(this._obterChaveMeta(slotId), JSON.stringify(payload.metadados));
      }

      return { sucesso: true, slotId };
    } catch (err) {
      return { sucesso: false, erro: `Falha na importação: ${err.message}` };
    }
  }
}

// Suporte para exportação CommonJS (Node/Electron) e carregamento direto no browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SaveManager,
    MemoryStorage,
    SLOTS_DISPONIVEIS,
    NOMES_PADRAO_SLOTS,
    VERSAO_SCHEMA_SAVE
  };
} else {
  window.SaveManager = SaveManager;
  window.MemoryStorage = MemoryStorage;
  window.SLOTS_DISPONIVEIS = SLOTS_DISPONIVEIS;
  window.NOMES_PADRAO_SLOTS = NOMES_PADRAO_SLOTS;
  window.VERSAO_SCHEMA_SAVE = VERSAO_SCHEMA_SAVE;
}
