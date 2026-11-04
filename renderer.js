// ==========================================================================
// RENDERER.JS — CICLO NARRATIVO, ESPECTROS SIR BRANTE, TELAS & HOT-RELOADING
// ==========================================================================

let cacheEventos = {};
let eventoAtivoId = null; // null = exibindo o Dossiê da Fase
let modoVisual = 'dossie'; // 'dossie' | 'evento'
let abaPalcoAtiva = 'aba-cenario';
let diarioDecisoes = []; // Registro cronológico das decisões tomadas na sessão
let ultimaConsequenciaDecisao = null; // Última alteração de atributos pós-decisão
let deliberacaoAberta = false; // Fluxo em dois tempos: false = lendo narrativa, true = deliberando escolhas

const store = new CharacterStateStore();
const engine = new DeterministicEngine(store);
window.personagemStore = store;
window.gameEngine = engine;

const NOMES_ATRIBUTOS_UI = {
  astucia: 'ASTÚCIA',
  sangue_frio: 'SANGUE-FRIO',
  oficio: 'OFÍCIO',
  presenca: 'PRESENÇA',
  capital: 'CAPITAL',
  influencia: 'INFLUÊNCIA',
  suspeita_dops: 'SUSPEITA DOPS',
  moral_popular: 'MORAL POPULAR',
  relacao_pai: 'RELAÇÃO COM O PAI',
  honra_familiar: 'HONRA FAMILIAR'
};

// Referências DOM - Barra Superior
const elEtiquetaFase = document.getElementById('etiqueta-fase');
const elAnoAtual = document.getElementById('ano-atual');
const elIndicadorAcoes = document.getElementById('indicador-acoes');
const btnFullscreen = document.getElementById('btn-fullscreen');

// Referências DOM - Transição de Virada de Ano (Ticket 15)
const elOverlayViradaAno = document.getElementById('overlay-virada-ano');
const elViradaAnoDe = document.getElementById('virada-ano-de');
const elViradaAnoPara = document.getElementById('virada-ano-para');
const elViradaIdadeInfo = document.getElementById('virada-idade-info');
const elBtnContinuarViradaAno = document.getElementById('btn-continuar-virada-ano');

// Referências DOM - Palco & Atalhos Inferiores
const elSlotEvidencia = document.getElementById('slot-moldura-evidencia');
const elCenarioLocal = document.getElementById('cenario-local');
const elCenarioRegistro = document.getElementById('cenario-registro');
const elGaleriaPersonagens = document.getElementById('galeria-personagens');
const elConteudoCronologia = document.getElementById('conteudo-cronologia');

const btnAbaCenario = document.getElementById('btn-aba-cenario');
const btnAbaAtributos = document.getElementById('btn-aba-atributos');
const btnAbaRelacoes = document.getElementById('btn-aba-relacoes');
const btnAbaCronologia = document.getElementById('btn-aba-cronologia');

const elResumoCenario = document.getElementById('resumo-atalho-cenario');
const elResumoAtributos = document.getElementById('resumo-atalho-atributos');
const elResumoRelacoes = document.getElementById('resumo-atalho-relacoes');
const elResumoCronologia = document.getElementById('resumo-atalho-cronologia');

// Referências DOM - Folha Editorial / Narrativa
const elEdicao = document.getElementById('editorial-edicao');
const elData = document.getElementById('editorial-data');
const elManchete = document.getElementById('editorial-manchete');
const elLead = document.getElementById('editorial-lead');
const elPainelConsequencias = document.getElementById('painel-consequencias-decisao');
const elCorpo = document.getElementById('corpo-narrativa');
const elBlocoContinuar = document.getElementById('bloco-continuar-decisao');
const elBtnContinuar = document.getElementById('btn-continuar-para-decisao');
const elSecaoDeliberacao = document.getElementById('secao-deliberacao-decisoes');
const elListaDecisoes = document.getElementById('lista-decisoes');
const elDivisorDecisoes = document.querySelector('.divisor-decisoes');
const elNotificacao = document.getElementById('notificacao-hot-reload');

// Referências DOM - Tela de Atributos & Relações
const elCondicaoSocial = document.getElementById('val-condicao-social');
const elDescCondicaoSocial = document.getElementById('desc-condicao-social');
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

// Slots de Espectro Visual
const elEspAstucia = document.getElementById('espectro-astucia');
const elEspSangueFrio = document.getElementById('espectro-sangue-frio');
const elEspOficio = document.getElementById('espectro-oficio');
const elEspPresenca = document.getElementById('espectro-presenca');
const elEspCapital = document.getElementById('espectro-capital');
const elEspInfluencia = document.getElementById('espectro-influencia');
const elEspSuspeita = document.getElementById('espectro-suspeita');
const elEspMoral = document.getElementById('espectro-moral');
const elEspPai = document.getElementById('espectro-pai');
const elEspHonra = document.getElementById('espectro-honra');

// Referências DOM - Painel da Cheia de 75 (Fase 3)
const elPainelCheia = document.getElementById('painel-cheia-75');
const elValNivelRio = document.getElementById('val-nivel-rio');
const elValHorasCheia = document.getElementById('val-horas-cheia');
const elValStatusTapacura = document.getElementById('val-status-tapacura');
const elReguaBarraNivel = document.getElementById('regua-barra-nivel');

const elementosContainers = {
  astucia: elAttrAstucia ? elAttrAstucia.closest('.item-atributo-detalhado') : null,
  sangue_frio: elAttrSangueFrio ? elAttrSangueFrio.closest('.item-atributo-detalhado') : null,
  oficio: elAttrOficio ? elAttrOficio.closest('.item-atributo-detalhado') : null,
  presenca: elAttrPresenca ? elAttrPresenca.closest('.item-atributo-detalhado') : null,
  capital: elRecCapital ? elRecCapital.closest('.item-recurso-detalhado') : null,
  influencia: elRecInfluencia ? elRecInfluencia.closest('.item-recurso-detalhado') : null,
  suspeita_dops: elRecSuspeita ? elRecSuspeita.closest('.item-recurso-detalhado') : null,
  moral_popular: elRecMoral ? elRecMoral.closest('.item-recurso-detalhado') : null,
  relacao_pai: elVinculoPai ? elVinculoPai.closest('.familia-stat-box') : null,
  honra_familiar: elHonraFamiliar ? elHonraFamiliar.closest('.familia-stat-box') : null
};

// ==========================================================================
// GERADOR VISUAL DA BARRA DE ESPECTRO (ESTILO SIR BRANTE)
// ==========================================================================
function gerarBarraEspectroHtml(chave, valor) {
  const esp = store.obterEspectro(chave, valor);
  const segmentos = esp.faixas.map(f => {
    const classes = [
      'espectro-segmento',
      f.preenchido ? 'preenchido' : '',
      f.ativo ? `ativo tom-${f.tom}` : ''
    ].filter(Boolean).join(' ');
    return `<span class="${classes}" title="${f.rotulo}">${f.rotulo}</span>`;
  }).join('');

  return `<div class="barra-espectro-brante">${segmentos}</div>`;
}

function obterValorChaveEstado(estado, chave) {
  if (chave in estado.atributosFixos) return estado.atributosFixos[chave];
  if (chave in estado.recursosVolateis) return estado.recursosVolateis[chave];
  if (chave in estado.parentesco) return estado.parentesco[chave];
  return 0;
}

// ==========================================================================
// NAVEGAÇÃO ENTRE AS TELAS DO PALCO (CENÁRIO, ATRIBUTOS, RELAÇÕES, CRONOLOGIA)
// ==========================================================================
function alternarAbaPalco(idAlvo) {
  if (abaPalcoAtiva === idAlvo && idAlvo !== 'aba-cenario') {
    idAlvo = 'aba-cenario';
  }
  abaPalcoAtiva = idAlvo;

  document.querySelectorAll('.aba-palco').forEach(aba => {
    aba.classList.toggle('ativa', aba.id === idAlvo);
  });

  document.querySelectorAll('.btn-atalho-pasta').forEach(btn => {
    btn.classList.toggle('ativo', btn.dataset.abaAlvo === idAlvo);
  });

  if (idAlvo === 'aba-relacoes') {
    renderizarTelaRelacoes();
  } else if (idAlvo === 'aba-cronologia') {
    renderizarTelaCronologia();
  }
}

document.querySelectorAll('.btn-atalho-pasta').forEach(btn => {
  btn.addEventListener('click', () => {
    alternarAbaPalco(btn.dataset.abaAlvo);
  });
});

document.querySelectorAll('[data-fechar-aba]').forEach(btn => {
  btn.addEventListener('click', () => {
    alternarAbaPalco('aba-cenario');
  });
});

// ==========================================================================
// FEEDBACK TÁTIL & MICROINTERAÇÕES
// ==========================================================================
function criarBadgeElemento(container, texto, ehPositivo) {
  if (!container) return;
  const badge = document.createElement('span');
  badge.className = `delta-badge ${ehPositivo ? 'delta-positivo' : 'delta-negativo'}`;
  badge.textContent = texto;
  container.appendChild(badge);
  setTimeout(() => badge.remove(), 1600);
}

function animarDeltaBadge(chave, infoDelta) {
  const delta = infoDelta.delta;
  const containerInterno = elementosContainers[chave];
  const ehPositivo = delta > 0;
  const ehBom = chave === 'suspeita_dops' ? !ehPositivo : ehPositivo;
  const sinal = delta > 0 ? `+${delta}` : `${delta}`;
  const nomeCurto = NOMES_ATRIBUTOS_UI[chave] || chave.replace(/_/g, ' ').toUpperCase();
  const rotuloNovo = infoDelta.espectroNovo ? ` [${infoDelta.espectroNovo.rotulo}]` : '';

  // 1. Anima dentro da respectiva ficha (Atributos ou Relações)
  criarBadgeElemento(containerInterno, `${sinal}${rotuloNovo}`, ehBom);

  // 2. Anima também no botão de atalho inferior para feedback imediato durante a cena
  const ehRelacao = chave === 'relacao_pai' || chave === 'honra_familiar';
  const btnAtalho = ehRelacao ? btnAbaRelacoes : btnAbaAtributos;
  criarBadgeElemento(btnAtalho, `${sinal} ${nomeCurto}`, ehBom);
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
// RENDERIZAÇÃO DO PRONTUÁRIO, ESPECTROS & BARRA DE ESTADO
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
    const idade = store.getIdade();
    const rotuloIdade = idade === 0 ? 'NASCIMENTO' : `${idade} ${idade === 1 ? 'ANO' : 'ANOS'}`;
    elAnoAtual.textContent = `RECIFE, ${estado.anoAtual} • ${rotuloIdade}`;
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
  if (elDescCondicaoSocial) {
    const descricoesClasse = {
      "Filho de Estivador (Mocambo)": "Criado entre as palafitas e os armazéns do Cais de Santo Antônio. Conhece a língua dos estivadores e os atalhos do mangue, mas enfrenta portas fechadas nos salões da elite.",
      "Classe Média do Derby": "Filho de funcionários públicos e bacharéis das imediações do Derby e Boa Vista. Circula entre redações de jornal e faculdades, equilibrando-se entre a ordem e a crítica.",
      "Elite Usineira de Casa Forte": "Herdeiro de famílias tradicionais ligadas aos antigos engenhos e solares de Casa Forte. Possui trânsito livre nos gabinetes oficiais, mas carrega a desconfiança dos sindicatos."
    };
    elDescCondicaoSocial.textContent = descricoesClasse[estado.condicaoSocial] || "";
  }

  const valPai = estado.parentesco.relacao_pai;
  const espPai = store.obterEspectro('relacao_pai', valPai);
  if (elVinculoPai) {
    elVinculoPai.textContent = `${valPai} • ${espPai.rotulo.toUpperCase()}`;
  }
  if (elEspPai) elEspPai.innerHTML = gerarBarraEspectroHtml('relacao_pai', valPai);

  const valHonra = estado.parentesco.honra_familiar;
  const espHonra = store.obterEspectro('honra_familiar', valHonra);
  if (elHonraFamiliar) {
    elHonraFamiliar.textContent = `${valHonra} • ${espHonra.rotulo.toUpperCase()}`;
  }
  if (elEspHonra) elEspHonra.innerHTML = gerarBarraEspectroHtml('honra_familiar', valHonra);

  // Atributos Fixos com Rótulo de Espectro e Barra Segmentada
  const mapAtributos = [
    { chave: 'astucia', elVal: elAttrAstucia, elEsp: elEspAstucia },
    { chave: 'sangue_frio', elVal: elAttrSangueFrio, elEsp: elEspSangueFrio },
    { chave: 'oficio', elVal: elAttrOficio, elEsp: elEspOficio },
    { chave: 'presenca', elVal: elAttrPresenca, elEsp: elEspPresenca }
  ];

  mapAtributos.forEach(({ chave, elVal, elEsp }) => {
    const v = estado.atributosFixos[chave];
    const esp = store.obterEspectro(chave, v);
    if (elVal) elVal.textContent = `${v} • ${esp.rotulo.toUpperCase()}`;
    if (elEsp) elEsp.innerHTML = gerarBarraEspectroHtml(chave, v);
  });

  // Recursos Voláteis com Rótulo de Espectro e Barra Segmentada
  const vCap = estado.recursosVolateis.capital;
  const espCap = store.obterEspectro('capital', vCap);
  if (elRecCapital) elRecCapital.textContent = `Cr$ ${vCap} • ${espCap.rotulo.toUpperCase()}`;
  if (elEspCapital) elEspCapital.innerHTML = gerarBarraEspectroHtml('capital', vCap);

  const vInf = estado.recursosVolateis.influencia;
  const espInf = store.obterEspectro('influencia', vInf);
  if (elRecInfluencia) elRecInfluencia.textContent = `${vInf} • ${espInf.rotulo.toUpperCase()}`;
  if (elEspInfluencia) elEspInfluencia.innerHTML = gerarBarraEspectroHtml('influencia', vInf);

  const vSusp = estado.recursosVolateis.suspeita_dops;
  const espSusp = store.obterEspectro('suspeita_dops', vSusp);
  if (elRecSuspeita) {
    elRecSuspeita.textContent = `${vSusp}/10 • ${espSusp.rotulo.toUpperCase()}`;
    const containerSusp = elRecSuspeita.closest('.item-recurso-detalhado');
    if (containerSusp) {
      if (vSusp >= 5) containerSusp.classList.add('recurso-alerta');
      else containerSusp.classList.remove('recurso-alerta');
    }
  }
  if (elEspSuspeita) elEspSuspeita.innerHTML = gerarBarraEspectroHtml('suspeita_dops', vSusp);

  const vMor = estado.recursosVolateis.moral_popular;
  const espMor = store.obterEspectro('moral_popular', vMor);
  if (elRecMoral) elRecMoral.textContent = `${vMor} • ${espMor.rotulo.toUpperCase()}`;
  if (elEspMoral) elEspMoral.innerHTML = gerarBarraEspectroHtml('moral_popular', vMor);

  // Resumos nos Botões de Atalho Inferiores
  if (elResumoAtributos) {
    elResumoAtributos.textContent = `Cr$ ${vCap} (${espCap.rotulo}) • Susp. ${vSusp}/10`;
  }
  if (elResumoRelacoes) {
    elResumoRelacoes.textContent = `Pai: ${espPai.rotulo} (${valPai}) • Honra: ${espHonra.rotulo}`;
  }
  if (elResumoCronologia) {
    const totalReg = Array.isArray(estado.historicoDecisoes) ? estado.historicoDecisoes.length : 0;
    elResumoCronologia.textContent = `Fase ${estado.faseAtual} • ${estado.anoAtual} (${totalReg} reg.)`;
  }

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

  renderizarTelaRelacoes();
  renderizarTelaCronologia();

  // Animação de Deltas
  if (deltas && typeof deltas === 'object') {
    Object.entries(deltas).forEach(([chave, info]) => {
      if (chave === 'anoAtual' && info && typeof info.delta === 'number' && info.delta !== 0) {
        if (elAnoAtual) {
          elAnoAtual.classList.add('ano-destaque');
          setTimeout(() => elAnoAtual.classList.remove('ano-destaque'), 1800);
        }
        exibirTransicaoViradaAno(info.anterior, info.novo, info.idade);
      } else if (info && typeof info.delta === 'number') {
        animarDeltaBadge(chave, info);
      }
    });
  }
}

function fecharTransicaoViradaAno() {
  if (!elOverlayViradaAno || elOverlayViradaAno.style.display === 'none') return;
  
  elOverlayViradaAno.classList.add('saindo');
  setTimeout(() => {
    elOverlayViradaAno.style.display = 'none';
    elOverlayViradaAno.classList.remove('saindo');
  }, 220);
}

function exibirTransicaoViradaAno(anoDe, anoPara, idade) {
  if (!elOverlayViradaAno) return;

  if (elViradaAnoDe) elViradaAnoDe.textContent = anoDe;
  if (elViradaAnoPara) elViradaAnoPara.textContent = anoPara;
  if (elViradaIdadeInfo) {
    elViradaIdadeInfo.textContent = idade === 0
      ? 'O protagonista acaba de nascer nas margens do Capibaribe'
      : `O protagonista completa ${idade} ${idade === 1 ? 'ano' : 'anos'} de idade`;
  }

  elOverlayViradaAno.classList.remove('saindo');
  elOverlayViradaAno.style.display = 'flex';
  tocarSomCarimbo();

  // Foco no botão de continuar para permitir assimilação deliberada e avanço por teclado
  if (elBtnContinuarViradaAno) {
    setTimeout(() => {
      try { elBtnContinuarViradaAno.focus(); } catch (_) {}
    }, 50);
  }
}

if (elBtnContinuarViradaAno) {
  elBtnContinuarViradaAno.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharTransicaoViradaAno();
  });
}

if (elOverlayViradaAno) {
  elOverlayViradaAno.addEventListener('click', (e) => {
    if (e.target === elOverlayViradaAno) {
      fecharTransicaoViradaAno();
    }
  });
}

window.addEventListener('keydown', (e) => {
  if (elOverlayViradaAno && elOverlayViradaAno.style.display === 'flex') {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      fecharTransicaoViradaAno();
    }
  }
});

store.subscribe((estado, deltas) => {
  atualizarProntuario(estado, deltas);
});

// ==========================================================================
// QUADRO DE CONSEQUÊNCIAS DA DECISÃO ANTERIOR (ESTILO SIR BRANTE)
// ==========================================================================
function renderizarPainelConsequencias() {
  if (!elPainelConsequencias) return;

  if (!ultimaConsequenciaDecisao || !ultimaConsequenciaDecisao.deltas) {
    elPainelConsequencias.style.display = 'none';
    elPainelConsequencias.innerHTML = '';
    return;
  }

  const entradas = Object.entries(ultimaConsequenciaDecisao.deltas).filter(
    ([, info]) => info && typeof info.delta === 'number' && info.espectroAnterior && info.espectroNovo
  );

  if (entradas.length === 0) {
    elPainelConsequencias.style.display = 'none';
    return;
  }

  const linhasHtml = entradas.map(([chave, info]) => {
    const nome = NOMES_ATRIBUTOS_UI[chave] || chave.replace(/_/g, ' ').toUpperCase();
    const sinal = info.delta > 0 ? `+${info.delta}` : `${info.delta}`;
    const ehBom = chave === 'suspeita_dops' ? info.delta < 0 : info.delta > 0;
    const classePilula = ehBom ? 'positivo' : 'negativo';

    const valAnt = chave === 'capital' ? `Cr$ ${info.anterior}` : info.anterior;
    const valNov = chave === 'capital' ? `Cr$ ${info.novo}` : info.novo;

    let badgeMudancaPatamar = '';
    if (info.mudouPatamar) {
      const subiuBom = chave === 'suspeita_dops' ? !info.subiuPatamar : info.subiuPatamar;
      const icone = info.subiuPatamar ? '▲' : '▼';
      const verbo = info.subiuPatamar ? 'SUBIU PARA' : 'CAIU PARA';
      badgeMudancaPatamar = `
        <span class="alerta-mudanca-patamar ${subiuBom ? 'subiu' : 'caiu'}">
          ${icone} ${verbo} ${info.espectroNovo.rotulo.toUpperCase()}!
        </span>
      `;
    }

    return `
      <div class="conseq-item-linha">
        <div class="conseq-item-topo">
          <div>
            <span class="conseq-nome-delta">${nome}</span>
            <span class="conseq-delta-pilula ${classePilula}">${sinal}</span>
            ${badgeMudancaPatamar}
          </div>
          <div class="conseq-transicao-patamar">
            ${valAnt} [${info.espectroAnterior.rotulo}] ➔ <strong>${valNov} [${info.espectroNovo.rotulo}]</strong>
          </div>
        </div>
        ${gerarBarraEspectroHtml(chave, info.novo)}
      </div>
    `;
  }).join('');

  elPainelConsequencias.style.display = 'block';
  elPainelConsequencias.innerHTML = `
    <div class="conseq-cabecalho">
      <span class="conseq-titulo">❖ IMPACTO DA TUA ÚLTIMA DECISÃO — CARIMBO [${ultimaConsequenciaDecisao.carimbo}]</span>
      <button class="btn-fechar-conseq" id="btn-fechar-conseq">✕ OCULTAR</button>
    </div>
    <div class="conseq-escolha-origem">
      "${ultimaConsequenciaDecisao.opcaoRotulo}" (${ultimaConsequenciaDecisao.eventoTitulo})
    </div>
    <div class="conseq-lista-mudancas">
      ${linhasHtml}
    </div>
  `;

  const btnFechar = document.getElementById('btn-fechar-conseq');
  if (btnFechar) {
    btnFechar.addEventListener('click', () => {
      ultimaConsequenciaDecisao = null;
      renderizarPainelConsequencias();
    });
  }
}

// ==========================================================================
// PREVISÃO DE REQUISITOS & MUDANÇAS NOS CARTÕES DE DECISÃO
// ==========================================================================
function gerarRequisitosDetalhadosHtml(opcao, avaliacao, estadoAtual) {
  let itens = [];

  if (avaliacao.requisitos && avaliacao.requisitos.length > 0) {
    avaliacao.requisitos.forEach(req => {
      const espAtual = store.obterEspectro(req.chave, req.valorAtual);
      if (req.atendido) {
        itens.push(`
          <div class="req-item req-atendido">
            ✓ EXIGE ${req.rotulo} — Tens <strong>${req.valorAtual} [${espAtual.rotulo}]</strong>
          </div>
        `);
      } else {
        itens.push(`
          <div class="req-item req-falho">
            ✗ BLOQUEADO: Exige ${req.rotulo} — Tens apenas <strong>${req.valorAtual} [${espAtual.rotulo}]</strong>
          </div>
        `);
      }
    });
  }

  if (avaliacao.disponivel) {
    itens.push(`
      <div class="req-item req-atendido">
        ✓ CARIMBO DE REGISTRO: <strong>[${opcao.carimbo || 'REGISTRADO'}]</strong>
      </div>
    `);
  }

  return itens.join('');
}

function gerarPrevisaoEfeitosHtml(efeitos, estadoAtual) {
  if (!efeitos || Object.keys(efeitos).length === 0) return '';

  return Object.entries(efeitos).map(([chave, deltaVal]) => {
    const delta = Number(deltaVal) || 0;
    if (delta === 0) return '';

    const atual = obterValorChaveEstado(estadoAtual, chave);
    let futuro = atual + delta;
    if (chave === 'suspeita_dops') futuro = Math.max(0, Math.min(10, futuro));
    else if (chave === 'capital' || chave in estadoAtual.atributosFixos) futuro = Math.max(0, futuro);

    const espAtual = store.obterEspectro(chave, atual);
    const espFuturo = store.obterEspectro(chave, futuro);
    const mudouPatamar = espAtual.indice !== espFuturo.indice;

    const sinal = delta > 0 ? `+${delta}` : `${delta}`;
    const ehNegativo = (delta < 0 && chave !== 'suspeita_dops') || (delta > 0 && chave === 'suspeita_dops');
    const nome = NOMES_ATRIBUTOS_UI[chave] || chave.replace(/_/g, ' ').toUpperCase();

    const strAtual = chave === 'capital' ? `Cr$ ${atual}` : atual;
    const strFuturo = chave === 'capital' ? `Cr$ ${futuro}` : futuro;

    const tagMudanca = mudouPatamar
      ? ` <strong>(${espFuturo.indice > espAtual.indice ? '▲' : '▼'} Muda p/ ${espFuturo.rotulo.toUpperCase()})</strong>`
      : '';

    return `
      <div class="efeito-transicao-item ${ehNegativo ? 'efeito-negativo' : ''}">
        <span class="efeito-transicao-esq">${ehNegativo ? '▼' : '▲'} ${nome} (${sinal})</span>
        <span class="efeito-transicao-dir">
          ${strAtual} [${espAtual.rotulo}] ➔ <strong>${strFuturo} [${espFuturo.rotulo}]</strong>${tagMudanca}
        </span>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// CENÁRIO FOTOGRÁFICO DE ÉPOCA (ABA 1)
// ==========================================================================
function gerarSvgCenario(evento, estado) {
  const id = evento && evento.metadata ? evento.metadata.id : 'dossie';
  const ehFase3 = estado.faseAtual === 3 || (id && id.includes('fase_3'));
  const ehCrise = evento && evento.metadata && evento.metadata.tipo === 'crise_urgente';
  const ehClimax64 = id && id.includes('marco_1964');
  const ehVarzea = id && id.includes('varzea');

  if (ehFase3) {
    return `
      <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceuChuva" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8A8472"/>
            <stop offset="60%" stop-color="#B8B09C"/>
            <stop offset="100%" stop-color="#6E6958"/>
          </linearGradient>
          <linearGradient id="aguaBarrenta" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5E5946"/>
            <stop offset="100%" stop-color="#383529"/>
          </linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#ceuChuva)"/>
        <g stroke="#5C5749" stroke-width="1" opacity="0.45">
          <line x1="80" y1="0" x2="40" y2="260"/><line x1="160" y1="0" x2="120" y2="260"/>
          <line x1="250" y1="0" x2="210" y2="260"/><line x1="340" y1="0" x2="300" y2="260"/>
          <line x1="430" y1="0" x2="390" y2="260"/><line x1="520" y1="0" x2="480" y2="260"/>
          <line x1="610" y1="0" x2="570" y2="260"/><line x1="710" y1="0" x2="670" y2="260"/>
        </g>
        <polygon points="60,220 110,165 160,220" fill="#4A4538"/>
        <rect x="70" y="220" width="80" height="60" fill="#3E3A2F"/>
        <polygon points="210,205 275,145 340,205" fill="#423D31"/>
        <rect x="225" y="205" width="100" height="70" fill="#363228"/>
        <rect x="340" y="195" width="460" height="12" fill="#2E2B23"/>
        <path d="M 360 195 Q 430 130 500 195 Q 570 130 640 195 Q 710 130 780 195" fill="none" stroke="#2E2B23" stroke-width="5"/>
        <line x1="185" y1="120" x2="195" y2="250" stroke="#29261F" stroke-width="4"/>
        <rect x="0" y="230" width="800" height="150" fill="url(#aguaBarrenta)"/>
        <path d="M 20 265 Q 90 255 160 265 T 320 265 T 480 265 T 640 265 T 790 265" fill="none" stroke="#8C856E" stroke-width="2"/>
        <path d="M 60 310 Q 150 300 240 310 T 420 310 T 600 310 T 760 310" fill="none" stroke="#78715C" stroke-width="1.5"/>
        <polygon points="440,275 540,275 520,295 460,295" fill="#24211B"/>
        <circle cx="475" cy="262" r="7" fill="#24211B"/>
        <rect x="468" y="268" width="14" height="10" fill="#24211B"/>
        <circle cx="505" cy="260" r="7" fill="#24211B"/>
        <rect x="498" y="266" width="14" height="11" fill="#24211B"/>
      </svg>
    `;
  }

  if (ehClimax64 || ehCrise) {
    return `
      <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceuTenso" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9E917B"/>
            <stop offset="70%" stop-color="#CFC3AE"/>
            <stop offset="100%" stop-color="#8A7E6A"/>
          </linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#ceuTenso)"/>
        <rect x="30" y="90" width="170" height="210" fill="#595143"/>
        <rect x="220" y="115" width="210" height="185" fill="#4A4337"/>
        <rect x="450" y="80" width="190" height="220" fill="#524A3D"/>
        <rect x="655" y="110" width="120" height="190" fill="#453E33"/>
        <g fill="#D8C9A3" opacity="0.65">
          <rect x="55" y="115" width="22" height="32"/><rect x="95" y="115" width="22" height="32"/><rect x="135" y="115" width="22" height="32"/>
          <rect x="480" y="110" width="24" height="35"/><rect x="525" y="110" width="24" height="35"/><rect x="570" y="110" width="24" height="35"/>
        </g>
        <rect x="0" y="290" width="800" height="90" fill="#363128"/>
        <rect x="260" y="245" width="170" height="48" fill="#26231D"/>
        <polygon points="285,245 315,215 395,215 415,245" fill="#26231D"/>
        <circle cx="295" cy="295" r="20" fill="#1A1814" stroke="#6E6454" stroke-width="3"/>
        <circle cx="395" cy="295" r="20" fill="#1A1814" stroke="#6E6454" stroke-width="3"/>
        <polygon points="430,260 760,210 760,320" fill="#EFE4C8" opacity="0.28"/>
      </svg>
    `;
  }

  if (ehVarzea) {
    return `
      <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="380" fill="#B5A78F"/>
        <polygon points="150,280 165,95 190,95 205,280" fill="#473F34"/>
        <path d="M 178 90 Q 220 55 280 70 T 390 55" fill="none" stroke="#6E6353" stroke-width="14" opacity="0.45"/>
        <rect x="90" y="210" width="190" height="80" fill="#3D362C"/>
        <polygon points="75,210 185,155 295,210" fill="#332D24"/>
        <line x1="580" y1="290" x2="595" y2="130" stroke="#363027" stroke-width="7"/>
        <path d="M 595 130 Q 540 110 510 145 M 595 130 Q 650 105 680 140 M 595 130 Q 560 85 530 95 M 595 130 Q 635 85 665 100" fill="none" stroke="#363027" stroke-width="4"/>
        <circle cx="240" cy="245" r="35" fill="#E8D7A7" opacity="0.45"/>
        <rect x="233" y="235" width="14" height="22" fill="#E8D7A7"/>
        <rect x="0" y="285" width="800" height="95" fill="#2E2921"/>
      </svg>
    `;
  }

  return `
    <svg class="cenario-svg-palco" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ceuRecife58" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C2B49B"/>
          <stop offset="65%" stop-color="#E0D5C1"/>
          <stop offset="100%" stop-color="#B0A086"/>
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#ceuRecife58)"/>
      <circle cx="630" cy="95" r="42" fill="#EFE6D5" opacity="0.7"/>
      <line x1="110" y1="230" x2="145" y2="75" stroke="#4A4236" stroke-width="5"/>
      <line x1="145" y1="75" x2="255" y2="115" stroke="#4A4236" stroke-width="4"/>
      <line x1="250" y1="115" x2="250" y2="185" stroke="#4A4236" stroke-width="2"/>
      <rect x="40" y="175" width="85" height="65" fill="#5C5243"/>
      <rect x="135" y="160" width="95" height="80" fill="#4F4639"/>
      <rect x="245" y="180" width="110" height="60" fill="#574D3F"/>
      <rect x="350" y="215" width="450" height="14" fill="#3D362C"/>
      <path d="M 380 235 Q 430 205 480 235 Q 530 205 580 235 Q 630 205 680 235 Q 730 205 780 235" fill="#4A4236"/>
      <rect x="0" y="235" width="800" height="145" fill="#7D715E"/>
      <path d="M 0 250 L 800 250" stroke="#524A3D" stroke-width="2"/>
      <polygon points="470,285 610,285 585,308 495,308" fill="#332D24"/>
      <rect x="520" y="265" width="45" height="20" fill="#473F34"/>
      <line x1="590" y1="265" x2="670" y2="265" stroke="#E0D5C1" stroke-width="2" opacity="0.6"/>
      <line x1="605" y1="280" x2="655" y2="280" stroke="#E0D5C1" stroke-width="2" opacity="0.5"/>
    </svg>
  `;
}

function atualizarMolduraEvidencia(evento = null) {
  if (!elSlotEvidencia) return;

  const estado = store.getState();
  const ano = evento && evento.metadata ? evento.metadata.ano : estado.anoAtual;
  const tituloCena = evento && evento.metadata ? evento.metadata.titulo.toUpperCase() : `ARQUIVO CENTRAL — FASE ${estado.faseAtual}`;
  const idStr = evento && evento.metadata ? evento.metadata.id : `FASE-${estado.faseAtual}`;
  const numProcesso = Math.abs(idStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 100)) % 899 + 100;

  if (elCenarioLocal) {
    elCenarioLocal.textContent = `${tituloCena} (RECIFE, ${ano})`;
  }
  if (elCenarioRegistro) {
    elCenarioRegistro.textContent = `REGISTRO N.º ${numProcesso}/${String(ano).slice(2)}`;
  }
  if (elResumoCenario) {
    elResumoCenario.textContent = evento && evento.metadata ? evento.metadata.titulo : `Recife, ${ano}`;
  }

  if (evento && evento.metadata && evento.metadata.imagem) {
    elSlotEvidencia.innerHTML = `
      <div class="foto-jornal-wrapper">
        <img src="artes/${evento.metadata.imagem}" class="filtro-jornal-75" alt="${evento.metadata.titulo || 'Cenário'}">
        <div class="selo-sobreposto-cenario">${estado.faseAtual === 3 ? 'DEFESA CIVIL / PE' : 'REGISTRO DE ACERVO'}</div>
      </div>
    `;
    return;
  }

  const svgCena = gerarSvgCenario(evento, estado);
  const carimboSelo = estado.faseAtual === 3
    ? 'CALAMIDADE — CHEIA DE 75'
    : (evento && evento.metadata && evento.metadata.tipo === 'crise_urgente' ? 'MANDADO DE CAPTURA' : 'ARQUIVO ICONOGRÁFICO // PE');

  elSlotEvidencia.innerHTML = `
    <div class="foto-jornal-wrapper">
      ${svgCena}
      <div class="selo-sobreposto-cenario">${carimboSelo}</div>
    </div>
  `;
}

// ==========================================================================
// TELA DE RELAÇÕES & VÍNCULOS (ABA 3)
// ==========================================================================
function gerarSvgRetrato(tipoAvatar) {
  if (tipoAvatar === 'pai') {
    return `
      <svg viewBox="0 0 60 72" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="72" fill="#C8BCA6"/>
        <circle cx="30" cy="26" r="12" fill="#4A4237"/>
        <rect x="16" y="13" width="28" height="6" fill="#2E2922"/>
        <path d="M 10 72 Q 30 44 50 72" fill="#383229"/>
      </svg>
    `;
  }
  if (tipoAvatar === 'militar' || tipoAvatar === 'dops') {
    return `
      <svg viewBox="0 0 60 72" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="72" fill="#BFB29B"/>
        <polygon points="14,18 46,18 42,10 18,10" fill="#2B3026"/>
        <rect x="12" y="17" width="36" height="4" fill="#1E211B"/>
        <circle cx="30" cy="29" r="11" fill="#4A4237"/>
        <rect x="21" y="25" width="7" height="4" fill="#1E1D1B"/>
        <rect x="32" y="25" width="7" height="4" fill="#1E1D1B"/>
        <path d="M 8 72 Q 30 45 52 72" fill="#2B3026"/>
      </svg>
    `;
  }
  if (tipoAvatar === 'aliado') {
    return `
      <svg viewBox="0 0 60 72" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="72" fill="#CCC0AA"/>
        <circle cx="30" cy="26" r="12" fill="#52483C"/>
        <path d="M 18 20 Q 30 10 42 20" fill="#29241E"/>
        <path d="M 10 72 Q 30 45 50 72" fill="#473E33"/>
      </svg>
    `;
  }
  return `
    <svg viewBox="0 0 60 72" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="72" fill="#D4C8B2"/>
      <circle cx="30" cy="26" r="12" fill="#3E372E"/>
      <path d="M 17 22 Q 30 11 43 22" fill="#24201B"/>
      <path d="M 9 72 Q 30 44 51 72" fill="#2E3640"/>
    </svg>
  `;
}

function renderizarTelaRelacoes() {
  if (!elGaleriaPersonagens) return;
  const estado = store.getState();
  const valPai = estado.parentesco.relacao_pai;
  const espPai = store.obterEspectro('relacao_pai', valPai);
  const espInf = store.obterEspectro('influencia', estado.recursosVolateis.influencia);
  const espMor = store.obterEspectro('moral_popular', estado.recursosVolateis.moral_popular);
  const espSusp = store.obterEspectro('suspeita_dops', estado.recursosVolateis.suspeita_dops);

  const listaRelacoes = [
    {
      papel: 'VÍNCULO PATERNO • CAIS DE SANTO ANTÔNIO',
      nome: 'Mestre Severino (Teu Pai)',
      status: `Nível ${valPai} • ${espPai.rotulo.toUpperCase()}`,
      desc: 'Veterano das docas do Recife. A sua confiança define se a família estará unida quando o cerco fechar.',
      classe: 'personagem-aliado',
      avatar: 'pai'
    },
    {
      papel: 'MOVIMENTO ESTUDANTIL • VÁRZEA',
      nome: 'Helena & Gráfica Clandestina',
      status: `Influência: ${estado.recursosVolateis.influencia} • ${espInf.rotulo.toUpperCase()}`,
      desc: 'Articuladora das oficinas de alfabetização e panfletagem noturna nos arredores da Várzea e Boa Vista.',
      classe: 'personagem-aliado',
      avatar: 'aliado'
    },
    {
      papel: 'TRABALHADORES & VIZINHANÇA',
      nome: 'Sindicato & Moradores da Madalena',
      status: `Moral Popular: ${estado.recursosVolateis.moral_popular} • ${espMor.rotulo.toUpperCase()}`,
      desc: 'A solidariedade acumulada entre estivadores, ferroviários e vizinhos de bairro nas horas de escassez.',
      classe: 'personagem-protagonista',
      avatar: 'protagonista'
    },
    {
      papel: 'APARATO DE VIGILÂNCIA • RUA DA UNIÃO',
      nome: 'Delegacia do D.O.P.S. / PE',
      status: `Suspeita: ${estado.recursosVolateis.suspeita_dops}/10 • ${espSusp.rotulo.toUpperCase()}`,
      desc: 'Investigadores e arquivos políticos do estado. Ao atingir 10 de suspeita, uma batida compulsória é deflagrada.',
      classe: 'personagem-antagonista',
      avatar: 'dops'
    }
  ];

  elGaleriaPersonagens.innerHTML = listaRelacoes.map(p => `
    <div class="cartao-personagem ${p.classe}">
      <div class="retrato-moldura">
        ${gerarSvgRetrato(p.avatar)}
      </div>
      <div class="personagem-info">
        <span class="personagem-papel-tag">${p.papel}</span>
        <span class="personagem-nome">${p.nome}</span>
        <span class="personagem-status">${p.status}</span>
        <p class="personagem-desc">${p.desc}</p>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// TELA DE CRONOLOGIA & DIÁRIO DE DECISÕES (ABA 4 - TICKET 17)
// ==========================================================================
function renderizarTelaCronologia() {
  if (!elConteudoCronologia) return;
  const estado = store.getState();
  const etapaAtual = store.getEtapaVida();
  const idadeAtual = store.getIdade();

  const etapasInfo = [
    {
      id: 'infancia',
      titulo: 'Infância & Primeiros Passos',
      faixaAnos: '1948–1953',
      faixaIdade: '0 aos 5 Anos',
      periodo: 'Recife, 1948–1953 • O mocambo, as palafitas e os primeiros laços de sangue'
    },
    {
      id: 'juventude',
      titulo: 'Juventude & Formação Política',
      faixaAnos: '1954–1964',
      faixaIdade: '6 aos 16 Anos',
      periodo: 'Recife, 1954–1964 • Cais do porto, comícios, alfabetização e o Golpe de 64'
    },
    {
      id: 'adulta',
      titulo: 'Vida Adulta / Anos de Chumbo',
      faixaAnos: '1968–1974',
      faixaIdade: '20 aos 26 Anos',
      periodo: 'Recife, 1968–1974 • AI-5, escolhas de carreira e sobrevivência sob o DOPS'
    },
    {
      id: 'ruptura',
      titulo: 'O Ponto de Ruptura / A Cheia',
      faixaAnos: 'Julho de 1975',
      faixaIdade: '27 Anos',
      periodo: 'Recife, Julho de 1975 • A cheia histórica do Capibaribe e o colapso'
    }
  ];

  const ordemEtapas = ['infancia', 'juventude', 'adulta', 'ruptura'];
  const indiceAtual = ordemEtapas.indexOf(etapaAtual.id);

  // RÉGUA VISUAL DA VIDA
  const htmlRegua = `
    <div class="regua-vida-container">
      <div class="regua-vida-cabecalho">
        <span class="regua-titulo">RÉGUA DA VIDA // PROGRESSÃO FORMATIVA</span>
        <span class="regua-marcador-idade">RECIFE, ${estado.anoAtual} • ${idadeAtual === 0 ? 'NASCIMENTO' : `${idadeAtual} ${idadeAtual === 1 ? 'ANO' : 'ANOS'}`}</span>
      </div>
      <div class="regua-vida-trilho">
        ${etapasInfo.map((e, idx) => {
          const ehAtiva = e.id === etapaAtual.id;
          const ehPassada = idx < indiceAtual;
          const classe = ehAtiva ? 'etapa-ativa' : (ehPassada ? 'etapa-passada' : 'etapa-futura');
          const badgeTxt = ehAtiva ? 'EM CURSO' : (ehPassada ? 'VIVIDA' : 'FUTURO');
          return `
            <div class="regua-segmento ${classe}">
              <div class="regua-segmento-topo">
                <span class="regua-segmento-anos">${e.faixaAnos}</span>
                <span class="regua-segmento-badge">${badgeTxt}</span>
              </div>
              <div class="regua-segmento-nome">${e.titulo}</div>
              <div class="regua-segmento-idade">${e.faixaIdade}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // LISTA DE PERÍODOS HISTÓRICOS
  const htmlFases = etapasInfo.map((f, idx) => {
    const ehAtiva = f.id === etapaAtual.id;
    const ehConcluida = idx < indiceAtual;
    const classe = ehAtiva ? 'fase-ativa' : (ehConcluida ? 'fase-concluida' : '');
    const rotuloStatus = ehAtiva ? 'EM CURSO' : (ehConcluida ? 'CONCLUÍDA' : 'FUTURO');

    return `
      <div class="cronologia-fase-card ${classe}">
        <div>
          <div class="cronologia-fase-titulo">${f.titulo}</div>
          <div class="cronologia-fase-periodo">${f.periodo}</div>
        </div>
        <span class="cronologia-fase-badge">${rotuloStatus}</span>
      </div>
    `;
  }).join('');

  // DIÁRIO DE ESCOLHAS
  let htmlDiario = '';
  if (diarioDecisoes.length === 0) {
    const idadeTxt = idadeAtual === 0 ? 'NASCIMENTO' : `${idadeAtual} ANOS`;
    htmlDiario = `
      <div class="cronologia-registro-item">
        <div class="cronologia-reg-topo">
          <span>RECIFE, ${estado.anoAtual} • ${idadeTxt}</span>
          <span>INÍCIO DE JORNADA</span>
        </div>
        <div class="cronologia-reg-titulo">Abertura do Prontuário</div>
        <div class="cronologia-reg-escolha">Nenhuma decisão carimbada ainda. Abre um arquivo no Dossiê à direita para registrar tua história.</div>
      </div>
    `;
  } else {
    htmlDiario = diarioDecisoes.map((item, idx) => {
      const rotIdade = item.idade === 0 ? 'NASCIMENTO' : `${item.idade} ${item.idade === 1 ? 'ANO' : 'ANOS'}`;
      return `
        <div class="cronologia-registro-item">
          <div class="cronologia-reg-topo">
            <span>#${idx + 1} • RECIFE, ${item.ano} (${rotIdade})</span>
            <span>CARIMBO: [${item.carimbo}]</span>
          </div>
          <div class="cronologia-reg-titulo">${item.eventoTitulo}</div>
          <div class="cronologia-reg-escolha">↳ Decisão: <strong>${item.opcaoRotulo}</strong></div>
        </div>
      `;
    }).join('');
  }

  elConteudoCronologia.innerHTML = `
    <div>
      ${htmlRegua}
    </div>
    <div>
      <div class="rotulo-secao-pasta">MARCOS HISTÓRICOS & ETAPAS DA VIDA</div>
      <div class="cronologia-fases-lista">${htmlFases}</div>
    </div>
    <div>
      <div class="rotulo-secao-pasta">DIÁRIO DE OCORRÊNCIAS & ESCOLHAS CARIMBADAS (${diarioDecisoes.length})</div>
      <div class="cronologia-diario-lista">${htmlDiario}</div>
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
  renderizarTelaRelacoes();
  renderizarTelaCronologia();
  renderizarPainelConsequencias();

  const estadoAtual = store.getState();
  const infoDossie = engine.obterEventosDossie(cacheEventos, estadoAtual);

  if (infoDossie.tipoDossie === 'crise_sequestrada' && infoDossie.eventosDisponiveis.length > 0) {
    abrirEvento(infoDossie.eventosDisponiveis[0].metadata.id);
    return;
  }

  const etapaVida = store.getEtapaVida();
  if (elEdicao) elEdicao.textContent = `ACERVO HISTÓRICO // ${etapaVida.nome.toUpperCase()}`;
  if (elData) elData.textContent = `RECIFE, ${estadoAtual.anoAtual}`;
  if (elManchete) elManchete.textContent = "Índice de Documentos & Ocorrências";
  if (elLead) elLead.textContent = "Consulta aos registros do acervo histórico do Recife antes que o curso do tempo se precipite.";

  if (elBlocoContinuar) elBlocoContinuar.style.display = 'none';
  if (elSecaoDeliberacao) elSecaoDeliberacao.style.display = 'none';
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
    htmlCorpo += `<p class="dossie-vazio">Nenhum documento pendente neste momento. Todos os registros foram catalogados.</p>`;
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
                ${ehClimax ? 'ENFRENTAR O DESTINO' : 'ABRIR PÁGINA'}
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

  // Sincroniza o ano histórico se o evento definir um ano específico
  if (evento.metadata && evento.metadata.ano) {
    const anoEvento = Number(evento.metadata.ano);
    if (!isNaN(anoEvento) && anoEvento !== store.getState().anoAtual) {
      store.setAnoAtual(anoEvento);
    }
  }

  modoVisual = 'evento';
  eventoAtivoId = eventoId;
  deliberacaoAberta = false;
  renderizarEvento(evento, false);
}

function renderizarEvento(evento, deliberacaoAbertaParam = null) {
  if (!evento || !evento.metadata) return;
  if (deliberacaoAbertaParam !== null) {
    deliberacaoAberta = deliberacaoAbertaParam;
  }

  atualizarMolduraEvidencia(evento);
  renderizarPainelConsequencias();

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
      const etapaVida = store.getEtapaVida();
      elEdicao.innerHTML = `
        <button id="btn-voltar-ao-dossie" class="btn-voltar-dossie">← VOLTAR AO DOSSIÊ</button>
        <span>${etapaVida.nome.toUpperCase()} // ${meta.ano}</span>
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

  // Configuração do Fluxo em Dois Tempos (Exposição ➔ Continuar ➔ Decisão)
  if (elBlocoContinuar) {
    elBlocoContinuar.style.display = deliberacaoAberta ? 'none' : 'flex';
    if (elBtnContinuar) {
      if (meta.tipo === 'climax_obrigatorio') {
        elBtnContinuar.innerHTML = `<span>ENFRENTAR O DESTINO HISTÓRICO</span><span class="seta-continuar">➔</span>`;
      } else if (meta.tipo === 'crise_urgente') {
        elBtnContinuar.innerHTML = `<span>RESPONDER À EMERGÊNCIA COMPULSÓRIA</span><span class="seta-continuar">➔</span>`;
      } else {
        elBtnContinuar.innerHTML = `<span>PESAR AS ESCOLHAS & DELIBERAR</span><span class="seta-continuar">➔</span>`;
      }

      elBtnContinuar.onclick = () => {
        tocarSomCarimbo();
        deliberacaoAberta = true;
        if (elBlocoContinuar) elBlocoContinuar.style.display = 'none';
        if (elSecaoDeliberacao) {
          elSecaoDeliberacao.style.display = 'block';
          setTimeout(() => {
            elSecaoDeliberacao.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 40);
        }
      };
    }
  }

  if (elSecaoDeliberacao) {
    elSecaoDeliberacao.style.display = deliberacaoAberta ? 'block' : 'none';
  }
  if (elDivisorDecisoes) elDivisorDecisoes.style.display = 'block';

  // Renderiza opções determinísticas com previsão de espectro estilo Sir Brante
  if (elListaDecisoes) {
    elListaDecisoes.innerHTML = '';
    const algarismosRomanos = ['I.', 'II.', 'III.', 'IV.', 'V.'];

    meta.opcoes.forEach((opcao, idx) => {
      const numRomano = algarismosRomanos[idx] || `${idx + 1}.`;
      const custoAcao = meta.custo_acoes || 1;
      const avaliacao = engine.avaliarOpcao(opcao, estadoAtual);

      const requisitosHtml = gerarRequisitosDetalhadosHtml(opcao, avaliacao, estadoAtual);
      const efeitosHtml = gerarPrevisaoEfeitosHtml(opcao.efeitos, estadoAtual);

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
            ${requisitosHtml}
          </div>
          ${efeitosHtml ? `<div class="decisao-efeitos">${efeitosHtml}</div>` : ''}
        `;

        botao.addEventListener('click', () => {
          if (emTransicao) return;
          try {
            executarAnimacaoCarimbo(botao, opcao.carimbo, () => {
              diarioDecisoes.push({
                ano: meta.ano,
                idade: store.getIdade(),
                eventoId: meta.id,
                eventoTitulo: meta.titulo,
                opcaoRotulo: opcao.rotulo,
                carimbo: opcao.carimbo || 'REGISTRADO'
              });

              const res = engine.executarDecisao(evento, opcao.id);
              
              ultimaConsequenciaDecisao = {
                eventoTitulo: meta.titulo,
                opcaoRotulo: opcao.rotulo,
                carimbo: res.carimbo,
                deltas: res.deltas
              };

              if (res.proximoEventoId && cacheEventos[res.proximoEventoId]) {
                abrirEvento(res.proximoEventoId);
              } else {
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
            ${requisitosHtml}
          </div>
          ${efeitosHtml ? `<div class="decisao-efeitos">${efeitosHtml}</div>` : ''}
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
      atualizarProntuario(store.getState(), null);
      renderizarDossie();
    }

    // Hot-reloading
    window.electronAPI.onEventsUpdated((dadosAtualizados) => {
      console.log("[RENDERER] Eventos atualizados no disco.");
      if (dadosAtualizados && dadosAtualizados.eventos) {
        cacheEventos = dadosAtualizados.eventos;

        if (modoVisual === 'evento' && eventoAtivoId && cacheEventos[eventoAtivoId]) {
          renderizarEvento(cacheEventos[eventoAtivoId], deliberacaoAberta);
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
const devInpAnoAtual = document.getElementById('dev-input-ano-atual');
const devInpAnoNasc = document.getElementById('dev-input-ano-nasc');

function sincronizarCamposConsole() {
  const est = store.getState();
  if (devInpAnoAtual) devInpAnoAtual.value = est.anoAtual;
  if (devInpAnoNasc) devInpAnoNasc.value = est.anoNascimento || 1948;
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

window.addEventListener('keydown', (e) => {
  if (e.key === 'F1') {
    e.preventDefault();
    toggleConsoleDepuracao();
  }
});

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
    diarioDecisoes = [];
    ultimaConsequenciaDecisao = null;
    store.reset();
    renderizarDossie();
    toggleConsoleDepuracao();
  });
}

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

if (devInpAnoAtual) {
  devInpAnoAtual.addEventListener('change', () => {
    store.setAnoAtual(devInpAnoAtual.value);
    if (modoVisual === 'evento' && eventoAtivoId && cacheEventos[eventoAtivoId]) {
      renderizarEvento(cacheEventos[eventoAtivoId]);
    }
  });
}

if (devInpAnoNasc) {
  devInpAnoNasc.addEventListener('change', () => {
    store.setAnoNascimento(devInpAnoNasc.value);
    if (modoVisual === 'evento' && eventoAtivoId && cacheEventos[eventoAtivoId]) {
      renderizarEvento(cacheEventos[eventoAtivoId]);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  atualizarStatusFullscreen();
  inicializarNarrativa();
});
