# 04: Sistema de Hot-Reloading de Roteiro em Tempo Real

**What to build:**
Observador de arquivos em tempo real no processo do Electron. Ao editar e salvar qualquer arquivo `.md` de roteiro no editor de texto, o motor recarrega o conteúdo imediatamente na tela sem reiniciar a janela e sem resetar os atributos/recursos atuais da partida.

**Blocked by:** 02: Design System da "Mesa de Arquivo Morto" & Tipografia Editorial, 03: Parser de Roteiro em Markdown + Frontmatter YAML

**Status:** done

- [x] Observador de sistema de arquivos monitora a pasta `conteudo/` recursivamente.
- [x] Alterações salvas em arquivos `.md` disparam evento IPC para o renderizador.
- [x] O renderizador atualiza o evento ativo na tela mantendo intactas as variáveis do jogador.
- [x] Indicador visual sutil ("Documento Atualizado") sinaliza a recarga.

