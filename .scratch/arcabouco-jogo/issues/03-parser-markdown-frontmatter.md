# 03: Parser de Roteiro em Markdown + Frontmatter YAML

**What to build:**
Módulo desacoplado de ingestão narrativa no Electron que escaneia arquivos `.md` na pasta `conteudo/`, processa o Frontmatter YAML estruturado (metadados do evento, requisitos de acesso, opções, efeitos em atributos, parentesco e condição social) e compila o corpo do texto Markdown em HTML semântico com destaque para bairros do Recife e facções.

**Blocked by:** 01: Shell Electron & Janela de Tela Cheia com IPC Seguro

**Status:** done

- [x] Parser de Frontmatter YAML lê e valida metadados: id, título, fase, ano, tipo, requisitos de acesso e opções.
- [x] O corpo Markdown é convertido em HTML semântico preservando quebras de parágrafo e ênfases.
- [x] Nomes de bairros e facções históricas recebem grifo sutil automático (estilo marca-texto desbotado ou sublinhado azul/vermelho).
- [x] Erros de sintaxe nos arquivos `.md` são capturados com mensagens de diagnóstico amigáveis.

