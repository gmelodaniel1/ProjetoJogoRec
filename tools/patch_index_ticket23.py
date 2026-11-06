import re

with open(r'C:\Users\AdminUser\Desktop\Jogo Recife\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '<!-- 2. TELA DE ATRIBUTOS & RECURSOS (FICHA DO PRONTUÁRIO) -->'
end_str = '<!-- 3. TELA DE RELAÇÕES & VÍNCULOS (FAMÍLIA, PERSONAGENS E FACÇÕES) -->'

novo_bloco = '''<!-- 2. TELA DE ATRIBUTOS & RECURSOS (FICHA DO PRONTUÁRIO) -->
          <div class="aba-palco" id="aba-atributos">
            <div class="pasta-arquivo-tela prontuario-manila-container">
              <!-- GUIA/ORELHA DE ARQUIVO SUSPENSO KARDEX/MANILA -->
              <div class="guia-pasta-manila" aria-hidden="true">
                <span class="guia-furo-reforco">○</span>
                <span class="etiqueta-guia">DOPS-PE // PRONTUÁRIO INDIVIDUAL N° 1958/04 • ARQUIVO VIVO</span>
              </div>

              <!-- CABEÇALHO OFICIAL DE INVESTIGAÇÃO POLICIAL -->
              <header class="pasta-cabecalho prontuario-cabecalho-oficial">
                <div class="prontuario-cabecalho-textos">
                  <span class="pasta-Selo pasta-selo-oficial">SECRETARIA DE SEGURANÇA PÚBLICA DE PERNAMBUCO // DEPARTAMENTO DE ORDEM POLÍTICA E SOCIAL</span>
                  <h2 class="pasta-titulo pasta-titulo-formulario">FICHA DE QUALIFICAÇÃO & ANTECEDENTES SOCIAIS</h2>
                  <div class="prontuario-registro-topo">
                    <span class="rotulo-registro">LIVRO DE ANTECEDENTES:</span> <span class="num-prontuario">VOL. IV / FOLHA 88</span> &nbsp;•&nbsp;
                    <span class="rotulo-registro">CLASSIFICAÇÃO:</span> <span class="carimbo-sigiloso">[ CONFIDENCIAL ]</span>
                  </div>
                </div>
                <button class="btn-voltar-cenario" data-fechar-aba>← VOLTAR AO CENÁRIO</button>
              </header>

              <div class="pasta-corpo">
                <!-- CONDIÇÃO SOCIAL COM CLICHÊ TIPOGRÁFICO -->
                <div class="bloco-condicao-social">
                  <div class="rotulo-secao-pasta rotulo-com-sub">
                    <span>QUALIFICAÇÃO SOCIAL DE ORIGEM</span>
                    <span class="codigo-formulario-dops">FORM. DOPS/PE-02</span>
                  </div>
                  <div class="linha-cliche-pontilhada" aria-hidden="true">........................................................................................................................</div>
                  <div class="valor-condicao-destaque datilografia-impacto" id="val-condicao-social">Filho de Estivador (Mocambo)</div>
                  <p class="desc-condicao-social" id="desc-condicao-social">
                    Criado entre as palafitas e os armazéns do Cais de Santo Antônio. Conhece a língua dos estivadores e os atalhos do mangue, mas enfrenta portas fechadas nos salões da elite.
                  </p>
                  <div class="linha-cliche-pontilhada" aria-hidden="true">........................................................................................................................</div>
                </div>

                <!-- ATRIBUTOS PESSOAIS FIXOS -->
                <div class="ficha-bloco prontuario-ficha-secao">
                  <div class="grampo-ficha-prontuario" aria-hidden="true"></div>
                  <div class="rotulo-secao-pasta rotulo-com-sub">
                    <span>ATRIBUTOS FORMATIVOS (ESPECTRO DE CAPACIDADE)</span>
                    <span class="carimbo-rubrica-secao">[ REVISADO ]</span>
                  </div>
                  <div class="grade-atributos-detalhada">
                    <div class="item-atributo-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-attr">ASTÚCIA</span>
                        <span class="valor-attr" id="attr-astucia">2</span>
                      </div>
                      <div class="slot-espectro" id="espectro-astucia"></div>
                      <p class="attr-explicacao">Leitura de rua, malícia política, dissimulação e improviso em situações de risco.</p>
                    </div>

                    <div class="item-atributo-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-attr">SANGUE-FRIO</span>
                        <span class="valor-attr" id="attr-sangue-frio">1</span>
                      </div>
                      <div class="slot-espectro" id="espectro-sangue-frio"></div>
                      <p class="attr-explicacao">Frieza sob interrogatório policial, cerco militar ou pânico coletivo.</p>
                    </div>

                    <div class="item-atributo-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-attr">OFÍCIO</span>
                        <span class="valor-attr" id="attr-oficio">2</span>
                      </div>
                      <div class="slot-espectro" id="espectro-oficio"></div>
                      <p class="attr-explicacao">Domínio técnico do trabalho manual, máquinas, tipografia e navegação.</p>
                    </div>

                    <div class="item-atributo-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-attr">PRESENÇA</span>
                        <span class="valor-attr" id="attr-presenca">0</span>
                      </div>
                      <div class="slot-espectro" id="espectro-presenca"></div>
                      <p class="attr-explicacao">Voz de comando, oratória em assembleias e autoridade moral perante o povo.</p>
                    </div>
                  </div>
                </div>

                <!-- RECURSOS VOLÁTEIS & VIGILÂNCIA -->
                <div class="ficha-bloco prontuario-ficha-secao">
                  <div class="grampo-ficha-prontuario" aria-hidden="true"></div>
                  <div class="rotulo-secao-pasta rotulo-com-sub">
                    <span>RECURSOS VOLÁTEIS & VIGILÂNCIA</span>
                    <span class="carimbo-rubrica-secao">[ FISCALIZAÇÃO ]</span>
                  </div>
                  <div class="grade-recursos-detalhada">
                    <div class="item-recurso-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-recurso">CAPITAL</span>
                        <span class="valor-recurso" id="rec-capital">Cr$ 40</span>
                      </div>
                      <div class="slot-espectro" id="espectro-capital"></div>
                      <p class="attr-explicacao">Economias em Cruzeiros. Se cair a Cr$ 0, dispara crise de despejo e penúria.</p>
                    </div>

                    <div class="item-recurso-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-recurso">INFLUÊNCIA</span>
                        <span class="valor-recurso" id="rec-influencia">1</span>
                      </div>
                      <div class="slot-espectro" id="espectro-influencia"></div>
                      <p class="attr-explicacao">Favores políticos, contatos sindicais, jornalísticos e eclesiásticos no Recife.</p>
                    </div>

                    <div class="item-recurso-detalhado recurso-alerta">
                      <div class="attr-linha-topo">
                        <span class="rotulo-recurso">SUSPEITA DOPS</span>
                        <span class="valor-recurso" id="rec-suspeita">2 / 10</span>
                      </div>
                      <div class="slot-espectro" id="espectro-suspeita"></div>
                      <p class="attr-explicacao">Atenção dos investigadores na Rua da União. Em 10/10 ocorre batida policial.</p>
                    </div>

                    <div class="item-recurso-detalhado">
                      <div class="attr-linha-topo">
                        <span class="rotulo-recurso">MORAL POPULAR</span>
                        <span class="valor-recurso" id="rec-moral">3</span>
                      </div>
                      <div class="slot-espectro" id="espectro-moral"></div>
                      <p class="attr-explicacao">Confiança e solidariedade dos trabalhadores, vizinhos e companheiros.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          '''

idx1 = content.find(start_str)
idx2 = content.find(end_str)

if idx1 == -1 or idx2 == -1:
    raise Exception("Não encontrou os delimitadores em index.html")

novo_conteudo = content[:idx1] + novo_bloco + content[idx2:]

with open(r'C:\Users\AdminUser\Desktop\Jogo Recife\index.html', 'w', encoding='utf-8') as f:
    f.write(novo_conteudo)

print("index.html atualizado com sucesso!")

