# -*- coding: utf-8 -*-
"""
Script de atualização segura para o Ticket 18 em renderer.js
"""
import os

CAMINHO_RENDERER = 'renderer.js'

with open(CAMINHO_RENDERER, 'r', encoding='utf-8') as f:
    js = f.read()

novo_trecho = """// ==========================================================================
// TELA DE RELAÇÕES & VÍNCULOS (ABA 3 - TICKET 18: RETRATOS 3x4 DE PRONTUÁRIO)
// ==========================================================================
function gerarSvgRetratoFallback(tipoAvatar) {
  // Retrato antropométrico com réguas de altura (estilo fichamento policial e militar de 1950/60)
  return `
    <svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; background:#C5BDAF;">
      <!-- Fundo milimetrado e régua antropométrica -->
      <line x1="0" y1="20" x2="90" y2="20" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="18" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.80m</text>
      <line x1="0" y1="40" x2="90" y2="40" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="38" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.70m</text>
      <line x1="0" y1="60" x2="90" y2="60" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="58" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.60m</text>
      <line x1="0" y1="80" x2="90" y2="80" stroke="#8F8372" stroke-width="0.8" stroke-dasharray="2 2"/>
      <text x="4" y="78" font-family="'Courier Prime', monospace" font-size="6" fill="#6E6354">1.50m</text>
      <!-- Silhueta fotográfica documental -->
      <circle cx="45" cy="42" r="18" fill="#3D352B"/>
      <ellipse cx="45" cy="96" rx="34" ry="26" fill="#2E2720"/>
      <!-- Placa de identificação no peito -->
      <rect x="18" y="88" width="54" height="16" fill="#E5DFC9" stroke="#1C1610" stroke-width="1.2"/>
      <text x="45" y="98" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="bold" text-anchor="middle" fill="#1C1610" letter-spacing="0.6">DOPS / SSP-PE</text>
    </svg>
  `;
}

function gerarSvgRetrato(tipoAvatar) {
  return gerarSvgRetratoFallback(tipoAvatar);
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
      id: 'severino',
      prontuario: 'REGISTRO PORTUÁRIO Nº 04.812/P • DOCAS DO RECIFE',
      papel: 'VÍNCULO PATERNO • CAIS DE SANTO ANTÔNIO',
      nome: 'Mestre Severino (Teu Pai)',
      status: `Nível ${valPai} • ${espPai.rotulo.toUpperCase()}`,
      desc: 'Veterano das docas do Recife. A sua confiança define se a família estará unida quando o cerco fechar.',
      classe: 'personagem-aliado',
      avatar: 'pai',
      foto: 'artes/retratos/retrato_severino.webp',
      tipoCarimbo: 'carimbo-azul',
      carimboTextoSuperior: 'CAPITANIA DOS PORTOS • PE',
      carimboCentro: 'MATRICULADO',
      carimboTextoInferior: 'CAIS DO RECIFE • 1958'
    },
    {
      id: 'helena',
      prontuario: 'PRONTUÁRIO DOPS/PE Nº 11.405-C • VIGILÂNCIA',
      papel: 'MOVIMENTO ESTUDANTIL • VÁRZEA',
      nome: 'Helena & Gráfica Clandestina',
      status: `Influência: ${estado.recursosVolateis.influencia} • ${espInf.rotulo.toUpperCase()}`,
      desc: 'Articuladora das oficinas de alfabetização e panfletagem noturna nos arredores da Várzea e Boa Vista.',
      classe: 'personagem-aliado',
      avatar: 'aliado',
      foto: 'artes/retratos/retrato_helena.webp',
      tipoCarimbo: 'carimbo-vermelho',
      carimboTextoSuperior: 'POLÍCIA CIVIL DO ESTADO DE PE',
      carimboCentro: 'INVESTIGADA',
      carimboTextoInferior: 'DOPS • ORDEM POLÍTICA'
    },
    {
      id: 'sindicato',
      prontuario: 'REGISTRO DRT/PE Nº 082 • FEDERAÇÃO OPERÁRIA',
      papel: 'TRABALHADORES & VIZINHANÇA',
      nome: 'Sindicato & Moradores da Madalena',
      status: `Moral Popular: ${estado.recursosVolateis.moral_popular} • ${espMor.rotulo.toUpperCase()}`,
      desc: 'A solidariedade acumulada entre estivadores, ferroviários e vizinhos de bairro nas horas de escassez.',
      classe: 'personagem-protagonista',
      avatar: 'protagonista',
      foto: 'artes/retratos/retrato_sindicato.webp',
      tipoCarimbo: 'carimbo-verde',
      carimboTextoSuperior: 'FEDERAÇÃO OPERÁRIA DE PE',
      carimboCentro: 'SINDICALIZADO',
      carimboTextoInferior: 'DELEGACIA REG. TRABALHO'
    },
    {
      id: 'dops',
      prontuario: 'INQUÉRITO POLICIAL-MILITAR • SSP/DOPS-PE Nº 001/64',
      papel: 'APARATO DE VIGILÂNCIA • RUA DA UNIÃO',
      nome: 'Delegacia do D.O.P.S. / PE',
      status: `Suspeita: ${estado.recursosVolateis.suspeita_dops}/10 • ${espSusp.rotulo.toUpperCase()}`,
      desc: 'Investigadores e arquivos políticos do estado. Ao atingir 10 de suspeita, uma batida compulsória é deflagrada.',
      classe: 'personagem-antagonista',
      avatar: 'dops',
      foto: 'artes/retratos/retrato_dops.webp',
      tipoCarimbo: 'carimbo-vermelho',
      carimboTextoSuperior: 'SECRETARIA DE SEGURANÇA PÚBLICA',
      carimboCentro: 'CONFIDENCIAL',
      carimboTextoInferior: 'D.O.P.S. • ARQUIVO MORTO'
    }
  ];

  elGaleriaPersonagens.innerHTML = listaRelacoes.map((p, idx) => `
    <div class="cartao-personagem ${p.classe}">
      <div class="prontuario-foto-coluna">
        <div class="clipe-metalico-foto" aria-hidden="true" title="Fixação metálica de prontuário">
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12 V30 C5 33 9 35 12 33 C15 31 15 27 15 23 V7 C15 3 9 3 9 7 V25 C9 27 11 28 12 27 C13 26 13 24 13 21 V12" stroke="#5A6166" stroke-width="2.6" stroke-linecap="round" fill="none" filter="drop-shadow(1px 2px 2px rgba(18,12,6,0.5))"/>
            <path d="M5 12 V30 C5 33 9 35 12 33 C15 31 15 27 15 23 V7 C15 3 9 3 9 7 V25" stroke="#D3DCDE" stroke-width="1.2" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <div class="retrato-moldura-3x4">
          <img src="${p.foto}" alt="Retrato 3x4: ${p.nome}" class="foto-3x4-arquivo" onerror="this.onerror=null; this.parentElement.innerHTML=gerarSvgRetratoFallback('${p.avatar}');" />
        </div>
        <div class="carimbo-circular-dops ${p.tipoCarimbo}" aria-hidden="true">
          <svg viewBox="0 0 76 76" width="76" height="76">
            <circle cx="38" cy="38" r="35" stroke="currentColor" stroke-width="1.8" fill="none" stroke-dasharray="3 1.5"/>
            <circle cx="38" cy="38" r="27" stroke="currentColor" stroke-width="1" fill="none"/>
            <path id="carimbo-arc-top-${idx}" d="M 14 38 A 24 24 0 0 1 62 38" fill="none"/>
            <text font-family="'Courier Prime', monospace" font-size="5.8" font-weight="bold" fill="currentColor" letter-spacing="0.8">
              <textPath href="#carimbo-arc-top-${idx}" startOffset="50%" text-anchor="middle">
                ${p.carimboTextoSuperior}
              </textPath>
            </text>
            <text x="38" y="42" font-family="'Courier Prime', monospace" font-size="7.5" font-weight="900" text-anchor="middle" fill="currentColor" letter-spacing="1">
              ${p.carimboCentro}
            </text>
            <path id="carimbo-arc-bot-${idx}" d="M 62 38 A 24 24 0 0 1 14 38" fill="none"/>
            <text font-family="'Courier Prime', monospace" font-size="5.2" font-weight="bold" fill="currentColor" letter-spacing="0.6">
              <textPath href="#carimbo-arc-bot-${idx}" startOffset="50%" text-anchor="middle">
                ${p.carimboTextoInferior}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <div class="personagem-info">
        <div class="personagem-topo-linha">
          <span class="personagem-prontuario-num">${p.prontuario}</span>
          <span class="personagem-papel-tag">${p.papel}</span>
        </div>
        <span class="personagem-nome">${p.nome}</span>
        <span class="personagem-status">${p.status}</span>
        <p class="personagem-desc">${p.desc}</p>
      </div>
    </div>
  `).join('');
}
"""

js_norm = js.replace('\r\n', '\n')
start_tag = '// ==========================================================================\n// TELA DE RELAÇÕES & VÍNCULOS (ABA 3)'
end_tag = '// ==========================================================================\n// TELA DE CRONOLOGIA & DIÁRIO DE DECISÕES (ABA 4 - TICKET 17)'

idx_start = js_norm.find(start_tag)
idx_end = js_norm.find(end_tag)

if idx_start == -1:
    # Tenta com caracteres não acentuados se houver diferença de encoding
    start_tag_alt = '// TELA DE RELA'
    idx_start = js_norm.find(start_tag_alt)
    if idx_start != -1:
        # retrocede até o divisor de linhas
        idx_start = js_norm.rfind('// ===', 0, idx_start)

if idx_end == -1:
    end_tag_alt = '// TELA DE CRONOLOGIA'
    idx_end = js_norm.find(end_tag_alt)
    if idx_end != -1:
        idx_end = js_norm.rfind('// ===', 0, idx_end)

if idx_start != -1 and idx_end != -1:
    novo_js_norm = js_norm[:idx_start] + novo_trecho + '\n' + js_norm[idx_end:]
    if '\r\n' in js:
        novo_js_norm = novo_js_norm.replace('\n', '\r\n')
    with open(CAMINHO_RENDERER, 'w', encoding='utf-8') as f:
        f.write(novo_js_norm)
    print('renderer.js atualizado com sucesso!')
else:
    print(f'ERRO: tags nao encontradas em renderer.js (idx_start={idx_start}, idx_end={idx_end})')

