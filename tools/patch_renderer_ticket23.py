with open(r'C:\Users\AdminUser\Desktop\Jogo Recife\renderer.js', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''  elPainelConsequencias.style.display = 'block';
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
  `;'''

replacement = '''  elPainelConsequencias.style.display = 'block';
  elPainelConsequencias.innerHTML = `
    <div class="fita-conseq-adesiva" aria-hidden="true"></div>
    <div class="conseq-cabecalho">
      <div class="conseq-cabecalho-esq">
        <span class="conseq-carimbo-oficial">[ REGISTRADO EM PRONTUÁRIO // DOPS ]</span>
        <span class="conseq-titulo">❖ DESPACHO DO INQUÉRITO — RESULTADO: [${ultimaConsequenciaDecisao.carimbo}]</span>
      </div>
      <button class="btn-fechar-conseq" id="btn-fechar-conseq">✕ ARQUIVAR DESPACHO</button>
    </div>
    <div class="conseq-escolha-origem">
      <span class="conseq-origem-rotulo">AÇÃO REGISTRADA:</span> "${ultimaConsequenciaDecisao.opcaoRotulo}" <span class="conseq-evento-origem">(${ultimaConsequenciaDecisao.eventoTitulo})</span>
    </div>
    <div class="conseq-lista-mudancas">
      ${linhasHtml}
    </div>
  `;'''

if target not in text:
    raise Exception("Alvo não encontrado em renderer.js")

text = text.replace(target, replacement, 1)

with open(r'C:\Users\AdminUser\Desktop\Jogo Recife\renderer.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("renderer.js atualizado com sucesso!")

