with open(r'C:\Users\AdminUser\Desktop\Jogo Recife\style.css', 'r', encoding='utf-8') as f:
    text = f.read()

s1 = '/* TELA 2: ATRIBUTOS & RECURSOS DETALHADOS */'
s2 = '/* TELA 3: RELAÇÕES, FAMÍLIA & CONTATOS */'

novo_bloco_tela2 = '''/* ==========================================================================
   TICKET 23: PRONTUÁRIO DE ATRIBUTOS EM PASTA MANILA SUSPENSA
   ========================================================================== */

#aba-atributos .pasta-arquivo-tela.prontuario-manila-container {
  background-color: #D2C4A8;
  background-image: 
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(130, 105, 75, 0.15) 100%),
    var(--textura-papel-grao);
  background-repeat: no-repeat, repeat;
  background-size: 100% 100%, 256px 256px;
  border: 1px solid #7D6E58;
  border-top: 6px solid #827258;
  position: relative;
  box-shadow: 
    0 12px 32px rgba(24, 18, 12, 0.55),
    inset 0 0 40px rgba(120, 95, 60, 0.18),
    inset 0 0 4px rgba(70, 50, 30, 0.25);
}

/* Orelha/Guia Saliente de Pasta Manila de Arquivo Suspenso */
.guia-pasta-manila {
  position: absolute;
  top: -24px;
  left: 28px;
  background-color: #CBBFA8;
  border: 1px solid #7D705C;
  border-bottom: 2px solid #827258;
  padding: 3px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  box-shadow: 0 -2px 6px rgba(28, 20, 12, 0.18);
}

.guia-furo-reforco {
  font-size: 10px;
  color: #615340;
  font-weight: bold;
}

.etiqueta-guia {
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1.2px;
  color: #241F1A;
  text-transform: uppercase;
}

/* Cabeçalho Oficial de Inquérito Policial */
.prontuario-cabecalho-oficial {
  background-color: #CFC2A9;
  border-bottom: 2px solid var(--cor-tinta-principal);
  padding: 18px 24px 14px 24px;
}

.prontuario-cabecalho-textos {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pasta-selo-oficial {
  display: block;
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: var(--cor-carimbo-vermelho);
  margin-bottom: 2px;
}

.pasta-titulo-formulario {
  font-family: var(--fonte-editorial);
  font-size: 26px;
  font-weight: 700;
  color: var(--cor-tinta-principal);
  line-height: 1.15;
  margin-bottom: 4px;
}

.prontuario-registro-topo {
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  color: var(--cor-tinta-desbotada);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.rotulo-registro {
  font-weight: bold;
  color: #5A4E3E;
}

.num-prontuario {
  font-weight: bold;
  color: var(--cor-tinta-principal);
  background-color: rgba(60, 48, 36, 0.08);
  padding: 1px 6px;
  border: 1px solid #B0A28C;
}

.carimbo-sigiloso {
  color: var(--cor-carimbo-vermelho);
  font-weight: bold;
  letter-spacing: 1px;
  border: 1px solid var(--cor-carimbo-vermelho);
  padding: 1px 5px;
  background-color: rgba(138, 37, 34, 0.06);
}

/* Linha de Clichê Pontilhada de Formulário Tipográfico */
.linha-cliche-pontilhada {
  font-family: var(--fonte-datilografada);
  font-size: 12px;
  color: #9C8E77;
  letter-spacing: 2.5px;
  line-height: 1;
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  margin: 4px 0;
}

.rotulo-com-sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.codigo-formulario-dops {
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  color: #7D705C;
  letter-spacing: 1px;
}

.carimbo-rubrica-secao {
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  color: var(--cor-carimbo-vermelho);
  letter-spacing: 1px;
  border: 1px solid var(--cor-carimbo-vermelho);
  padding: 1px 4px;
  background-color: rgba(138, 37, 34, 0.04);
}

/* Bloco de Condição Social com Fichamento */
.bloco-condicao-social {
  background-color: rgba(237, 230, 214, 0.95);
  border: 1px solid #B5A892;
  border-left: 4px solid var(--cor-azul-caneta);
  padding: 14px 18px;
  box-shadow: 0 1px 4px rgba(28, 20, 12, 0.1);
}

.valor-condicao-destaque {
  font-family: var(--fonte-editorial);
  font-size: 24px;
  font-weight: 700;
  color: var(--cor-tinta-principal);
  margin-bottom: 6px;
}

.datilografia-impacto {
  font-family: var(--fonte-datilografada);
  font-size: 22px;
  font-weight: 700;
  color: #1F1B16;
  letter-spacing: 0.5px;
  text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.15);
}

.desc-condicao-social {
  font-family: var(--fonte-editorial);
  font-size: 18px;
  line-height: 1.45;
  color: var(--cor-tinta-desbotada);
}

/* Ficha de Seção com Grampo Metálico Diegético */
.prontuario-ficha-secao {
  position: relative;
  background-color: rgba(237, 230, 214, 0.9);
  border: 1px solid #B5A892;
  padding: 14px 18px;
  box-shadow: 0 1px 4px rgba(28, 20, 12, 0.1);
}

.grampo-ficha-prontuario {
  position: absolute;
  top: 8px;
  right: 14px;
  width: 14px;
  height: 4px;
  background: #6B6256;
  border: 1px solid #38332C;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.grade-atributos-detalhada,
.grade-recursos-detalhada {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.item-atributo-detalhado,
.item-recurso-detalhado {
  background-color: var(--cor-papel-principal);
  border: 1px solid #BFB29B;
  padding: 12px 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
}

.attr-linha-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #D8CEB8;
  padding-bottom: 6px;
}

.rotulo-attr,
.rotulo-recurso {
  font-family: var(--fonte-datilografada);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  color: var(--cor-tinta-principal);
}

.valor-attr,
.valor-recurso {
  font-family: var(--fonte-datilografada);
  font-size: 20px;
  font-weight: bold;
  color: var(--cor-azul-caneta);
}

.attr-explicacao {
  font-family: var(--fonte-editorial);
  font-size: 16px;
  line-height: 1.35;
  color: var(--cor-tinta-desbotada);
}

.recurso-alerta {
  border-color: var(--cor-carimbo-vermelho);
  background: rgba(138, 37, 34, 0.08);
}

.recurso-alerta .valor-recurso {
  color: var(--cor-carimbo-vermelho);
}

'''

idx1 = text.find(s1)
idx2 = text.find(s2)
if idx1 == -1 or idx2 == -1:
    raise Exception("Não localizou s1 ou s2")

text = text[:idx1] + novo_bloco_tela2 + text[idx2:]

# Agora para o bloco de espectro e painel de consequências
s3 = '/* ==========================================================================\n   BARRA DE ESPECTRO QUALITATIVO (ESTILO SIR BRANTE)'
s4 = '/* PREVISÃO DETALHADA DE MUDANÇA NOS CARTÕES DE DECISÃO */'

idx3 = text.find(s3)
idx4 = text.find(s4)
if idx3 == -1 or idx4 == -1:
    raise Exception("Não localizou s3 ou s4")

novo_bloco_espectro_conseq = '''/* ==========================================================================
   TICKET 23: RÉGUA DE ESPECTRO QUALITATIVO ANALÓGICO COM CLICHÊ DE CHUMBO
   ========================================================================== */
.slot-espectro {
  width: 100%;
  margin: 3px 0 5px 0;
}

.barra-espectro-brante {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  width: 100%;
  background-color: #635746;
  border: 1px solid #4D4233;
  padding: 2px;
  box-shadow: inset 0 1px 3px rgba(20, 15, 10, 0.4);
}

.espectro-segmento {
  background-color: #D5CBBA;
  border: 1px solid #998C77;
  border-top: 2px solid #5A4E3E;
  padding: 4px 2px;
  text-align: center;
  font-family: var(--fonte-datilografada);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.4px;
  color: #665A4A;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.espectro-segmento.preenchido {
  background-color: #C0B49E;
  color: #26211A;
  border-color: #6E614E;
  border-top-color: #3B3327;
}

.espectro-segmento.ativo {
  font-weight: bold;
  border-width: 2px;
  transform: scaleY(1.08);
  z-index: 2;
  box-shadow: 0 2px 6px rgba(22, 16, 10, 0.4);
}

.espectro-segmento.ativo.tom-critico {
  background-color: var(--cor-carimbo-vermelho);
  border-color: #4A1210;
  color: #F7EFE2;
}

.espectro-segmento.ativo.tom-fraco {
  background-color: #8C4A27;
  border-color: #4F2713;
  color: #F7EFE2;
}

.espectro-segmento.ativo.tom-estavel {
  background-color: var(--cor-azul-caneta);
  border-color: #121E2B;
  color: #F7EFE2;
}

.espectro-segmento.ativo.tom-forte {
  background-color: #2B5438;
  border-color: #162B1D;
  color: #F7EFE2;
}

.espectro-segmento.ativo.tom-mestre {
  background-color: #1F472B;
  border-color: #0E2415;
  color: #F7EFE2;
}

/* ==========================================================================
   TICKET 23: PAINEL DE CONSEQUÊNCIAS ESTILO SEGUNDA VIA DE DESPACHO COM FITA GOMADA
   ========================================================================== */
.painel-consequencias-decisao {
  background-color: #E6DEC9;
  border: 2px solid #2B251F;
  border-left: 6px solid var(--cor-azul-caneta);
  padding: 18px 22px 16px 22px;
  margin-bottom: 24px;
  position: relative;
  box-shadow: 
    0 8px 22px rgba(28, 20, 12, 0.32),
    inset 0 0 25px rgba(130, 105, 70, 0.12);
}

/* Fita Adesiva Gomada Ressecada Fixando o Despacho */
.fita-conseq-adesiva {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%) rotate(-0.5deg);
  width: 140px;
  height: 22px;
  background: rgba(225, 205, 155, 0.72);
  border: 1px solid rgba(175, 150, 100, 0.55);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  pointer-events: none;
  z-index: 3;
}

.fita-conseq-adesiva::before,
.fita-conseq-adesiva::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(145, 120, 75, 0.6) 2px,
    rgba(145, 120, 75, 0.6) 4px
  );
}

.fita-conseq-adesiva::before {
  left: -2px;
}

.fita-conseq-adesiva::after {
  right: -2px;
}

.conseq-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px dashed #7D705C;
  padding-bottom: 10px;
  margin-bottom: 12px;
  gap: 12px;
}

.conseq-cabecalho-esq {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.conseq-carimbo-oficial {
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: var(--cor-carimbo-vermelho);
  border: 1px solid var(--cor-carimbo-vermelho);
  padding: 1px 6px;
  display: inline-block;
  align-self: flex-start;
  background-color: rgba(138, 37, 34, 0.05);
}

.conseq-titulo {
  font-family: var(--fonte-datilografada);
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1.2px;
  color: var(--cor-tinta-principal);
}

.conseq-escolha-origem {
  font-family: var(--fonte-editorial);
  font-size: 17px;
  color: var(--cor-tinta-principal);
  margin-bottom: 12px;
  line-height: 1.4;
  padding: 6px 10px;
  background-color: rgba(255, 255, 255, 0.4);
  border-left: 3px solid #8C7F6A;
}

.conseq-origem-rotulo {
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: bold;
  color: #5A4E3E;
  letter-spacing: 1px;
}

.conseq-evento-origem {
  font-size: 15px;
  font-style: italic;
  color: var(--cor-tinta-desbotada);
}

.btn-fechar-conseq {
  background: transparent;
  border: 1px solid #5A4E3E;
  color: #383025;
  font-family: var(--fonte-datilografada);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.8px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.btn-fechar-conseq:hover {
  background: #D4C8B2;
  color: var(--cor-tinta-principal);
  border-color: #2B251F;
}

.conseq-lista-mudancas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.conseq-item-linha {
  background-color: var(--cor-papel-principal);
  border: 1px solid #B5A892;
  border-left: 4px solid #6E614E;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 1px 3px rgba(28, 20, 12, 0.1);
}

.conseq-item-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-family: var(--fonte-datilografada);
  font-size: 13px;
}

.conseq-nome-delta {
  font-weight: bold;
  color: var(--cor-tinta-principal);
  letter-spacing: 0.5px;
}

.conseq-delta-pilula {
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid rgba(0, 0, 0, 0.35);
  display: inline-block;
  letter-spacing: 0.5px;
}

.conseq-delta-pilula.positivo {
  background-color: #23472F;
  color: #F7EFE2;
}

.conseq-delta-pilula.negativo {
  background-color: var(--cor-carimbo-vermelho);
  color: #F7EFE2;
}

.conseq-transicao-patamar {
  font-family: var(--fonte-datilografada);
  font-size: 13px;
  color: var(--cor-tinta-desbotada);
}

.conseq-transicao-patamar strong {
  color: var(--cor-tinta-principal);
}

.alerta-mudanca-patamar {
  display: inline-block;
  margin-left: 6px;
  padding: 2px 7px;
  font-size: 11px;
  font-weight: bold;
  border: 1px solid currentColor;
  letter-spacing: 0.5px;
}

.alerta-mudanca-patamar.subiu {
  color: #23472F;
  background-color: rgba(35, 71, 47, 0.12);
}

.alerta-mudanca-patamar.caiu {
  color: var(--cor-carimbo-vermelho);
  background-color: rgba(138, 37, 34, 0.12);
}

'''

text = text[:idx3] + novo_bloco_espectro_conseq + text[idx4:]

with open(r'C:\Users\AdminUser\Desktop\Jogo Recife\style.css', 'w', encoding='utf-8') as f:
    f.write(text)

print("style.css atualizado com sucesso!")

