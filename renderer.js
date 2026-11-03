// ==========================================================================
// RENDERER.JS — CICLO NARRATIVO, DOSSIÊ DA FASE & HOT-RELOADING
// ==========================================================================

let cacheEventos = {};
let eventoAtivoId = null; // null = exibindo o Dossiê da Fase
let modoVisual = 'dossie'; // 'dossie' | 'evento'

const store = new CharacterStateStore();
const engine = new DeterministicEngine(store);
window.personagemStore = store;
window.gameEngine = engine;

// Referências DOM - Barra Superior
const elEtiquetaFase = document.getElementById('etiqueta-fase');
const elAnoAtual = document.getElementById('ano-atual');
const elIndicadorAcoes = document.getElementById('indicador-acoes');
const btnFullscreen = document.getElementById('btn-fullscreen');

// Referências DOM - Folha Editorial / Narrativa
const elEdicao = document.getElementById('editorial-edicao');
const elData = document.getElementById('editorial-data');
const elManchete = document.getElementById('editorial-manchete');
const elLead = document.getElementById('editorial-lead');
const elCorpo = document.getElementById('corpo-narrativa');
const elListaDecisoes = document.getElementById('lista-decisoes');
const elDivisorDecisoes = document.querySelector('.divisor-decisoes');
const elNotificacao = document.getElementById('notificacao-hot-reload');
const elSlotEvidencia = document.getElementById('slot-moldura-evidencia');

// Referências DOM - Prontuário DOPS
const elCondicaoSocial = document.getElementById('val-condicao-social');
const elVinculoPai = document.getElementById('val-vinculo-pai');
const elHonraFamiliar = document.getElementById('val-honra-familiar');
const elAttrAstucia = document.getElementById('attr-astucia');
const elAttrSangueFrio = document.getElementById('attr-sangue-frio');
const elAttrOficio = document.getElementById('attr-oficio');
const elAttrPresenca = document.getElementById('attr-presenca');
const elRecCapital = document.getElementById('rec-capital');
const elRecInfluencia = document.getElementById('rec-influencia');
const elRecSuspeita = document.getElementById('rec-suspeita');
const elRecMoral = document.getElementById('rec-moral');

// Referências DOM - Painel da Cheia de 75 (Fase 3)
const elPainelCheia = document.getElementById('painel-cheia-75');
const elValNivelRio = document.getElementById('val-nivel-rio');
const elValHorasCheia = document.getElementById('val-horas-cheia');
const elValStatusTapacura = document.getElementById('val-status-tapacura');
const elReguaBarraNivel = document.getElementById('regua-barra-nivel');

const elementosContainers = {
  astucia: elAttrAstucia ? elAttrAstucia.parentElement : null,
  sangue_frio: elAttrSangueFrio ? elAttrSangueFrio.parentElement : null,
  oficio: elAttrOficio ? elAttrOficio.parentElement : null,
  presenca: elAttrPresenca ? elAttrPresenca.parentElement : null,
  capital: elRecCapital ? elRecCapital.parentElement : null,
  influencia: elRecInfluencia ? elRecInfluencia.parentElement : null,
  suspeita_dops: elRecSuspeita ? elRecSuspeita.parentElement : null,
  moral_popular: elRecMoral ? elRecMoral.parentElement : null,
  relacao_pai: elVinculoPai ? elVinculoPai.parentElement : null,
  honra_familiar: elHonraFamiliar ? elHonraFamiliar.parentElement : null
};

// ==========================================================================
// FEEDBACK TÁTIL & MICROINTERAÇÕES
// ==========================================================================
function animarDeltaBadge(chave, delta) {
  const container = elementosContainers[chave];
  if (!container) return;

  const badge = document.createElement('span');
  const ehPositivo = delta > 0;
  badge.className = `delta-badge ${ehPositivo ? 'delta-positivo' : 'delta-negativo'}`;
  badge.textContent = ehPositivo ? `+${delta}` : `${delta}`;

  container.appendChild(badge);
  setTimeout(() => badge.remove(), 1500);
}

function tocarSomCarimbo() {
  try {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtxClass) return;
    const audioCtx = new AudioCtxClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.11);
  } catch (e) {}
}

let emTransicao = false;
function executarAnimacaoCarimbo(botao, carimboTexto, callbackTransicao) {
  if (emTransicao) return;
  emTransicao = true;

  tocarSomCarimbo();

  const carimboEl = document.createElement('div');
  carimboEl.className = 'carimbo-slam';
  carimboEl.textContent = `[${carimboTexto || 'REGISTRADO'}]`;
  botao.appendChild(carimboEl);

  const viewport = document.querySelector('.mesa-viewport');
  if (viewport) {
    viewport.classList.add('screen-shake');
    setTimeout(() => viewport.classList.remove('screen-shake'), 100);
  }

  const folha = document.querySelector('.folha-narrativa');
  setTimeout(() => {
    if (folha) folha.classList.add('folha-transicao');
    setTimeout(() => {
      callbackTransicao();
      if (folha) folha.classList.remove('folha-transicao');
      emTransicao = false;
    }, 180);
  }, 240);
}

// ==========================================================================
// RENDERIZAÇÃO DO PRONTUÁRIO & BARRA DE ESTADO
// ==========================================================================
function atualizarProntuario(estado, deltas) {
  if (!estado) return;

  // Atualização de Fase e Atmosfera
  document.body.className = `fase-${estado.faseAtual}`;

  if (elEtiquetaFase) {
    const nomesFase = {
      1: "FASE 1: A FORMAÇÃO (1958–1964)",
      2: "FASE 2: OS ANOS DE CHUMBO (1968–1974)",
      3: "FASE 3: A CHEIA DE 75 (JULHO DE 1975)"
    };
    elEtiquetaFase.textContent = nomesFase[estado.faseAtual] || `FASE ${estado.faseAtual}`;
  }

  if (elAnoAtual) {
    elAnoAtual.textContent = `RECIFE, ${estado.anoAtual}`;
  }

  // Medidor Visual de Ações
  if (elIndicadorAcoes) {
    const restantes = estado.acoesRestantesFase;
    const totais = estado.acoesTotaisFase;
    let pontosHtml = '';
    for (let i = 0; i < totais; i++) {
      if (i < restantes) {
        pontosHtml += '<span class="ponto-ativo">●</span>';
      } else {
        pontosHtml += '<span class="ponto-gasto">○</span>';
      }
    }
    elIndicadorAcoes.innerHTML = `AÇÕES: ${pontosHtml} (${restantes}/${totais})`;
  }

  // Prontuário Social e Parentesco
  if (elCondicaoSocial) elCondicaoSocial.textContent = estado.condicaoSocial;
  if (elVinculoPai) {
    const valPai = estado.parentesco.relacao_pai;
    elVinculoPai.textContent = `Nível ${valPai} (${valPai >= 2 ? 'Leal' : valPai >= 0 ? 'Neutro' : 'Rompido'})`;
  }
  if (elHonraFamiliar) {
    elHonraFamiliar.textContent = `Nível ${estado.parentesco.honra_familiar}`;
  }

  // Atributos Fixos
  if (elAttrAstucia) elAttrAstucia.textContent = estado.atributosFixos.astucia;
  if (elAttrSangueFrio) elAttrSangueFrio.textContent = estado.atributosFixos.sangue_frio;
  if (elAttrOficio) elAttrOficio.textContent = estado.atributosFixos.oficio;
  if (elAttrPresenca) elAttrPresenca.textContent = estado.atributosFixos.presenca;

  // Recursos Voláteis
  if (elRecCapital) elRecCapital.textContent = `Cr$ ${estado.recursosVolateis.capital}`;
  if (elRecInfluencia) elRecInfluencia.textContent = estado.recursosVolateis.influencia;
  if (elRecSuspeita) {
    const susp = estado.recursosVolateis.suspeita_dops;
    elRecSuspeita.textContent = `${susp} / 10`;
    const containerSusp = elRecSuspeita.parentElement;
    if (containerSusp) {
      if (susp >= 6) containerSusp.classList.add('recurso-alerta');
      else containerSusp.classList.remove('recurso-alerta');
    }
  }
  if (elRecMoral) elRecMoral.textContent = estado.recursosVolateis.moral_popular;

  // Atualização dos Indicadores da Cheia de 75 (Fase 3)
  if (estado.cheia75 && elValNivelRio) {
    const cheia = estado.cheia75;
    elValNivelRio.textContent = `+${Number(cheia.nivelRioMetros).toFixed(2)} m`;
    if (elValHorasCheia) elValHorasCheia.textContent = `${cheia.horasRestantes} h`;
    
    if (elReguaBarraNivel) {
      const pct = Math.min(100, Math.max(10, (cheia.nivelRioMetros / 4.5) * 100));
      elReguaBarraNivel.style.height = `${pct}%`;
    }

    if (elValStatusTapacura) {
      if (cheia.nivelRioMetros >= 3.5) {
        elValStatusTapacura.textContent = 'PÂNICO GERAL';
      } else if (cheia.nivelRioMetros >= 2.0) {
        elValStatusTapacura.textContent = 'INUNDAÇÃO';
      } else {
        elValStatusTapacura.textContent = 'ALERTA';
      }
    }
  }

  // Animação de Deltas
  if (deltas && typeof deltas === 'object') {
    Object.entries(deltas).forEach(([chave, info]) => {
      if (info && typeof info.delta === 'number') {
        animarDeltaBadge(chave, info.delta);
      }
    });
  }
}

store.subscribe((estado, deltas) => {
  atualizarProntuario(estado, deltas);
});

// ==========================================================================
// MOLDURA DE EVIDÊNCIA & ESTAMPARIA PROCEDURAL (TICKET 10)
// ==========================================================================
function atualizarMolduraEvidencia(evento = null) {
  if (!elSlotEvidencia) return;

  const estado = store.getState();

  // 1. Caso haja imagem real definida e disponível na pasta artes/
  if (evento && evento.metadata && evento.metadata.imagem) {
    elSlotEvidencia.innerHTML = `
      <div class="foto-jornal-wrapper">
        <img src="artes/${evento.metadata.imagem}" class="filtro-jornal-75" alt="${evento.metadata.titulo || 'Evidência'}">
      </div>
    `;
    return;
  }

  // 2. Fallback Procedural em SVG/CSS
  const ano = evento ? evento.metadata.ano : estado.anoAtual;
  const idStr = evento ? evento.metadata.id : `F${estado.faseAtual}-G01`;
  const numProcesso = Math.abs(idStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 100)) % 899 + 100;
  const ehFase3 = estado.faseAtual === 3;

  elSlotEvidencia.innerHTML = `
    <div class="placeholder-arte-procedural">
      <div class="arte-cabecalho">REGISTRO DE INQUÉRITO N.º ${numProcesso}/${String(ano).slice(2)}</div>
      <div class="arte-carimbo-dops">${ehFase3 ? 'DEFESA CIVIL' : 'D.O.P.S. / PE'}</div>
      <div class="arte-detalhe-grafico">
        <div class="linha-estilizada"></div>
        <div class="arte-selo-confidencial">${ehFase3 ? 'CALAMIDADE CAPIBARIBE' : 'CONFIDENCIAL'}</div>
      </div>
      <div class="arte-rodape">ARQUIVO DE INVESTIGAÇÃO — RECIFE, ${ano}</div>
    </div>
  `;
}

// ==========================================================================
// RENDERIZAÇÃO DO DOSSIÊ DA FASE & SEQUESTRO DE CRISE (TICKETS 08 & 09)
// ==========================================================================
function renderizarDossie() {
  modoVisual = 'dossie';
  eventoAtivoId = null;
  atualizarMolduraEvidencia(null);

  const estadoAtual = store.getState();
  const infoDossie = engine.obterEventosDossie(cacheEventos, estadoAtual);

  // SEQUESTRO DE AGENDA POR CRISE URGENTE (TICKET 09)
  if (infoDossie.tipoDossie === 'crise_sequestrada' && infoDossie.eventosDisponiveis.length > 0) {
    abrirEvento(infoDossie.eventosDisponiveis[0].metadata.id);
    return;
  }

  if (elEdicao) elEdicao.textContent = `DOSSIÊ DE INVESTIGAÇÃO // FASE ${estadoAtual.faseAtual}`;
  if (elData) elData.textContent = `RECIFE, ${estadoAtual.anoAtual}`;
  if (elManchete) elManchete.textContent = "Índice de Incidentes & Ocorrências";
  if (elLead) elLead.textContent = "Consulta os inquéritos e agendas abertas na cidade antes que o curso dos acontecimentos históricos se precipite.";

  if (elDivisorDecisoes) elDivisorDecisoes.style.display = 'none';
  if (elListaDecisoes) elListaDecisoes.innerHTML = '';

  let htmlCorpo = '';

  if (infoDossie.tipoDossie === 'climax') {
    htmlCorpo += `
      <div class="banner-climax-dossie">
        <div class="banner-climax-titulo">⚠ O PONTO DE RUPTURA HISTÓRICA CHEGOU</div>
        <div class="banner-climax-desc">
          As tuas ações preparatórias neste período esgotaram-se. As forças militares e políticas tomaram as ruas do Recife. O evento de encerramento da fase é inevitável.
        </div>
      </div>
    `;
  }

  htmlCorpo += `<div class="lista-dossie-itens">`;

  if (infoDossie.eventosDisponiveis.length === 0) {
    htmlCorpo += `<p class="dossie-vazio">Nenhum inquérito pendente neste momento. Todos os arquivos foram arquivados.</p>`;
  } else {
    infoDossie.eventosDisponiveis.forEach(ev => {
      const meta = ev.metadata;
      const ehClimax = meta.tipo === 'climax_obrigatorio';
      const podeAcessar = ev.acessoPermitido !== false;

      htmlCorpo += `
        <div class="cartao-dossie-item ${ehClimax ? 'recurso-alerta' : ''}">
          <div class="dossie-info">
            <div class="dossie-meta">
              <span>ANO: ${meta.ano}</span> | 
              <span>${ehClimax ? 'CLÍMAX OBRIGATÓRIO' : `CUSTO: ${meta.custo_acoes || 1} AÇÃO`}</span>
              ${!podeAcessar ? ` | <span style="color: var(--cor-carimbo-vermelho)">BLOQUEADO: ${ev.motivoBloqueioAcesso}</span>` : ''}
            </div>
            <div class="dossie-titulo">${meta.titulo}</div>
          </div>
          <div>
            ${podeAcessar ? `
              <button class="btn-abrir-evento" data-evento-id="${meta.id}">
                ${ehClimax ? 'ENFRENTAR O DESTINO' : 'ABRIR ARQUIVO'}
              </button>
            ` : `
              <button class="btn-abrir-evento" disabled style="opacity: 0.5; cursor: not-allowed">
                ACESSO NEGADO
              </button>
            `}
          </div>
        </div>
      `;
    });
  }

  htmlCorpo += `</div>`;
  if (elCorpo) elCorpo.innerHTML = htmlCorpo;

  // Adiciona listeners para abrir eventos
  document.querySelectorAll('.btn-abrir-evento[data-evento-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.eventoId;
      abrirEvento(id);
    });
  });
}

// ==========================================================================
// RENDERIZAÇÃO DE UM EVENTO ESPECÍFICO
// ==========================================================================
function abrirEvento(eventoId) {
  const evento = cacheEventos[eventoId];
  if (!evento) {
    console.error(`Evento '${eventoId}' não encontrado no cache!`);
    renderizarDossie();
    return;
  }

  modoVisual = 'evento';
  eventoAtivoId = eventoId;
  renderizarEvento(evento);
}

function renderizarEvento(evento) {
  if (!evento || !evento.metadata) return;
  atualizarMolduraEvidencia(evento);

  const meta = evento.metadata;
  const estadoAtual = store.getState();

  if (elEdicao) {
    if (meta.tipo === 'crise_urgente') {
      elEdicao.innerHTML = `
        <span style="color: var(--cor-carimbo-vermelho); font-weight: bold; letter-spacing: 1.5px;">
          ⚠ SEQUESTRO DE AGENDA // EMERGÊNCIA COMPULSÓRIA
        </span>
      `;
    } else {
      elEdicao.innerHTML = `
        <button id="btn-voltar-ao-dossie" class="btn-voltar-dossie">← VOLTAR AO DOSSIÊ</button>
        <span>DOSSIÊ N.º ${meta.id} // FASE ${meta.fase}</span>
      `;
      const btnVoltar = document.getElementById('btn-voltar-ao-dossie');
      if (btnVoltar) {
        btnVoltar.addEventListener('click', () => renderizarDossie());
      }
    }
  }

  if (elData) elData.textContent = `RECIFE, ${meta.ano}`;
  if (elManchete) elManchete.textContent = meta.titulo;
  if (elLead) {
    if (meta.tipo === 'crise_urgente') {
      elLead.textContent = "Os teus recursos atingiram um limite intolerável. As autoridades ou credores cercaram teu destino.";
    } else if (meta.tipo === 'climax_obrigatorio') {
      elLead.textContent = "Marco Histórico Compulsório de Encerramento de Fase.";
    } else {
      elLead.textContent = "";
    }
  }
  if (elCorpo) elCorpo.innerHTML = evento.corpoHtml;

  if (elDivisorDecisoes) elDivisorDecisoes.style.display = 'block';

  // Renderiza opções determinísticas
  if (elListaDecisoes) {
    elListaDecisoes.innerHTML = '';
    const algarismosRomanos = ['I.', 'II.', 'III.', 'IV.', 'V.'];

    meta.opcoes.forEach((opcao, idx) => {
      const numRomano = algarismosRomanos[idx] || `${idx + 1}.`;
      const custoAcao = meta.custo_acoes || 1;
      const avaliacao = engine.avaliarOpcao(opcao, estadoAtual);

      let efeitosHtml = '';
      if (opcao.efeitos) {
        efeitosHtml = Object.entries(opcao.efeitos).map(([chave, val]) => {
          const sinal = val > 0 ? `+${val}` : `${val}`;
          const classeNegativa = (val < 0 && chave !== 'suspeita_dops') || (val > 0 && chave === 'suspeita_dops') ? 'efeito-negativo' : '';
          const nomeFormatado = chave.replace(/_/g, ' ').toUpperCase();
          return `<span class="efeito-item ${classeNegativa}">${sinal} ${nomeFormatado}</span>`;
        }).join('');
      }

      if (avaliacao.disponivel) {
        const botao = document.createElement('button');
        botao.className = 'cartao-decisao opcao-disponivel';
        botao.dataset.opcaoId = opcao.id;

        botao.innerHTML = `
          <div class="decisao-topo">
            <span class="decisao-numero">${numRomano}</span>
            <span class="decisao-rotulo">${opcao.rotulo}</span>
            <span class="etiqueta-custo">[${meta.tipo === 'climax_obrigatorio' ? 'CLÍMAX' : `${custoAcao} AÇÃO`}]</span>
          </div>
          ${opcao.descricao ? `<div class="decisao-descricao">${opcao.descricao}</div>` : ''}
          <div class="decisao-requisitos">
            <span class="req-item req-atendido">✓ CARIMBO: [${opcao.carimbo || 'REGISTRADO'}]</span>
          </div>
          ${efeitosHtml ? `<div class="decisao-efeitos">${efeitosHtml}</div>` : ''}
        `;

        botao.addEventListener('click', () => {
          if (emTransicao) return;
          try {
            executarAnimacaoCarimbo(botao, opcao.carimbo, () => {
              const res = engine.executarDecisao(evento, opcao.id);
              
              // Se há próximo evento encadeado direto, abre ele
              if (res.proximoEventoId && cacheEventos[res.proximoEventoId]) {
                abrirEvento(res.proximoEventoId);
              } else {
                // Caso contrário, volta ao Dossiê (ou clímax se esgotou ações)
                renderizarDossie();
              }
            });
          } catch (err) {
            console.error("Erro ao executar decisão:", err);
          }
        });

        elListaDecisoes.appendChild(botao);
      } else {
        const itemBloqueado = document.createElement('div');
        itemBloqueado.className = 'cartao-decisao opcao-bloqueada';
        itemBloqueado.dataset.opcaoId = opcao.id;

        itemBloqueado.innerHTML = `
          <div class="tarja-censura-faixa">BLOQUEADO</div>
          <div class="decisao-topo">
            <span class="decisao-numero">${numRomano}</span>
            <span class="decisao-rotulo">${opcao.rotulo}</span>
            <span class="etiqueta-custo">[BLOQUEADO]</span>
          </div>
          ${opcao.descricao ? `<div class="decisao-descricao">${opcao.descricao}</div>` : ''}
          <div class="decisao-requisitos">
            <span class="req-item req-falho">✗ BLOQUEADO: ${avaliacao.motivoBloqueio}</span>
          </div>
        `;

        elListaDecisoes.appendChild(itemBloqueado);
      }
    });
  }
}

// Notificação visual de hot-reload
let timerNotificacao = null;
function exibirNotificacaoHotReload(nome) {
  if (!elNotificacao) return;
  elNotificacao.textContent = `[ARQUIVO ATUALIZADO: ${nome || 'conteudo'}]`;
  elNotificacao.classList.add('visivel');
  if (timerNotificacao) clearTimeout(timerNotificacao);
  timerNotificacao = setTimeout(() => elNotificacao.classList.remove('visivel'), 2200);
}

// Inicialização
async function inicializarNarrativa() {
  if (!window.electronAPI) return;

  try {
    const dados = await window.electronAPI.getAllEvents();
    if (dados && dados.eventos) {
      cacheEventos = dados.eventos;
      // Inicia direto na visão de Dossiê da Fase 1!
      renderizarDossie();
    }

    // Hot-reloading
    window.electronAPI.onEventsUpdated((dadosAtualizados) => {
      console.log("[RENDERER] Eventos atualizados no disco.");
      if (dadosAtualizados && dadosAtualizados.eventos) {
        cacheEventos = dadosAtualizados.eventos;

        if (modoVisual === 'evento' && eventoAtivoId && cacheEventos[eventoAtivoId]) {
          renderizarEvento(cacheEventos[eventoAtivoId]);
          exibirNotificacaoHotReload(cacheEventos[eventoAtivoId].metadata.titulo);
        } else {
          renderizarDossie();
          exibirNotificacaoHotReload('Dossiê da Fase');
        }
      }
    });
  } catch (err) {
    console.error("Falha ao inicializar narrativa:", err);
  }
}

// Tela Cheia
async function atualizarStatusFullscreen() {
  if (window.electronAPI && btnFullscreen) {
    const isFull = await window.electronAPI.isFullscreen();
    btnFullscreen.textContent = isFull ? 'MODO JANELA' : 'TELA CHEIA';
  }
}

if (btnFullscreen && window.electronAPI) {
  btnFullscreen.addEventListener('click', async () => {
    await window.electronAPI.toggleFullscreen();
    atualizarStatusFullscreen();
  });
}

// ==========================================================================
// CONSOLE DE DEPURAÇÃO DO CRIADOR (TICKET 12)
// ==========================================================================
const elConsoleDepuracao = document.getElementById('console-depuracao');
const btnDevtools = document.getElementById('btn-devtools');
const btnFecharConsole = document.getElementById('btn-fechar-console');
const devSeletorEvento = document.getElementById('dev-seletor-evento');
const btnDevSaltarEvento = document.getElementById('btn-dev-saltar-evento');
const btnDevVoltarDossie = document.getElementById('btn-dev-voltar-dossie');
const btnDevCriseDops = document.getElementById('btn-dev-crise-dops');
const btnDevCriseFalencia = document.getElementById('btn-dev-crise-falencia');
const btnDevPularCheia = document.getElementById('btn-dev-pular-cheia');
const btnDevReset = document.getElementById('btn-dev-reset');

const devInpAstucia = document.getElementById('dev-input-astucia');
const devInpSangueFrio = document.getElementById('dev-input-sangue-frio');
const devInpOficio = document.getElementById('dev-input-oficio');
const devInpPresenca = document.getElementById('dev-input-presenca');
const devInpCapital = document.getElementById('dev-input-capital');
const devInpInfluencia = document.getElementById('dev-input-influencia');
const devInpSuspeita = document.getElementById('dev-input-suspeita');
const devInpMoral = document.getElementById('dev-input-moral');
const devInpClasse = document.getElementById('dev-input-classe');
const devInpPai = document.getElementById('dev-input-pai');
const devInpHonra = document.getElementById('dev-input-honra');

function sincronizarCamposConsole() {
  const est = store.getState();
  if (devInpAstucia) devInpAstucia.value = est.atributosFixos.astucia;
  if (devInpSangueFrio) devInpSangueFrio.value = est.atributosFixos.sangue_frio;
  if (devInpOficio) devInpOficio.value = est.atributosFixos.oficio;
  if (devInpPresenca) devInpPresenca.value = est.atributosFixos.presenca;
  if (devInpCapital) devInpCapital.value = est.recursosVolateis.capital;
  if (devInpInfluencia) devInpInfluencia.value = est.recursosVolateis.influencia;
  if (devInpSuspeita) devInpSuspeita.value = est.recursosVolateis.suspeita_dops;
  if (devInpMoral) devInpMoral.value = est.recursosVolateis.moral_popular;
  if (devInpClasse) devInpClasse.value = est.condicaoSocial;
  if (devInpPai) devInpPai.value = est.parentesco.relacao_pai;
  if (devInpHonra) devInpHonra.value = est.parentesco.honra_familiar;
}

function popularSeletorEventosDev() {
  if (!devSeletorEvento) return;
  devSeletorEvento.innerHTML = '';
  Object.values(cacheEventos).forEach(ev => {
    const opt = document.createElement('option');
    opt.value = ev.metadata.id;
    opt.textContent = `[Fase ${ev.metadata.fase} // ${ev.metadata.ano}] ${ev.metadata.titulo}`;
    devSeletorEvento.appendChild(opt);
  });
}

function toggleConsoleDepuracao() {
  if (!elConsoleDepuracao) return;
  const abrindo = !elConsoleDepuracao.classList.contains('aberto');
  if (abrindo) {
    sincronizarCamposConsole();
    popularSeletorEventosDev();
    elConsoleDepuracao.classList.add('aberto');
  } else {
    elConsoleDepuracao.classList.remove('aberto');
  }
}

if (btnDevtools) btnDevtools.addEventListener('click', toggleConsoleDepuracao);
if (btnFecharConsole) btnFecharConsole.addEventListener('click', toggleConsoleDepuracao);

// Atalho de Teclado F1
window.addEventListener('keydown', (e) => {
  if (e.key === 'F1') {
    e.preventDefault();
    toggleConsoleDepuracao();
  }
});

// Ações Rápidas de Simulação
if (btnDevSaltarEvento) {
  btnDevSaltarEvento.addEventListener('click', () => {
    const id = devSeletorEvento.value;
    if (id) {
      abrirEvento(id);
      toggleConsoleDepuracao();
    }
  });
}

if (btnDevVoltarDossie) {
  btnDevVoltarDossie.addEventListener('click', () => {
    renderizarDossie();
    toggleConsoleDepuracao();
  });
}

if (btnDevCriseDops) {
  btnDevCriseDops.addEventListener('click', () => {
    store.aplicarEfeitos({ suspeita_dops: 10 });
    renderizarDossie();
    toggleConsoleDepuracao();
  });
}

if (btnDevCriseFalencia) {
  btnDevCriseFalencia.addEventListener('click', () => {
    store.aplicarEfeitos({ capital: -999 });
    renderizarDossie();
    toggleConsoleDepuracao();
  });
}

if (btnDevPularCheia) {
  btnDevPularCheia.addEventListener('click', () => {
    store.avancarFase(3);
    renderizarDossie();
    toggleConsoleDepuracao();
  });
}

if (btnDevReset) {
  btnDevReset.addEventListener('click', () => {
    store.reset();
    renderizarDossie();
    toggleConsoleDepuracao();
  });
}

// Binds de inputs manuais no devtools
function bindInputNumerico(input, chaveStore, categoria) {
  if (!input) return;
  input.addEventListener('change', () => {
    const valor = Number(input.value) || 0;
    const est = store.getState();
    if (categoria === 'atributosFixos') {
      est.atributosFixos[chaveStore] = valor;
      store.estado.atributosFixos[chaveStore] = valor;
    } else if (categoria === 'recursosVolateis') {
      est.recursosVolateis[chaveStore] = valor;
      store.estado.recursosVolateis[chaveStore] = valor;
    } else if (categoria === 'parentesco') {
      est.parentesco[chaveStore] = valor;
      store.estado.parentesco[chaveStore] = valor;
    }
    store.notificar({ [chaveStore]: { novo: valor, tipo: 'dev' } });
    if (modoVisual === 'evento' && eventoAtivoId && cacheEventos[eventoAtivoId]) {
      renderizarEvento(cacheEventos[eventoAtivoId]);
    }
  });
}

bindInputNumerico(devInpAstucia, 'astucia', 'atributosFixos');
bindInputNumerico(devInpSangueFrio, 'sangue_frio', 'atributosFixos');
bindInputNumerico(devInpOficio, 'oficio', 'atributosFixos');
bindInputNumerico(devInpPresenca, 'presenca', 'atributosFixos');
bindInputNumerico(devInpCapital, 'capital', 'recursosVolateis');
bindInputNumerico(devInpInfluencia, 'influencia', 'recursosVolateis');
bindInputNumerico(devInpSuspeita, 'suspeita_dops', 'recursosVolateis');
bindInputNumerico(devInpMoral, 'moral_popular', 'recursosVolateis');
bindInputNumerico(devInpPai, 'relacao_pai', 'parentesco');
bindInputNumerico(devInpHonra, 'honra_familiar', 'parentesco');

if (devInpClasse) {
  devInpClasse.addEventListener('change', () => {
    store.setCondicaoSocial(devInpClasse.value);
    if (modoVisual === 'evento' && eventoAtivoId && cacheEventos[eventoAtivoId]) {
      renderizarEvento(cacheEventos[eventoAtivoId]);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  atualizarStatusFullscreen();
  inicializarNarrativa();
});
