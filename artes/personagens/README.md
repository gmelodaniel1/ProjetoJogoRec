# Diretório de Artes de Personagens (Recorte de Papel / Xilogravura)

Este diretório armazena as ilustrações e desenhos oficiais dos personagens de *Águas de Ferro*.

---

## 1. Como Funciona no Jogo

Quando um personagem tem fala direta no roteiro (ex: Mestre Severino em *Pátio das Oficinas*), o motor do jogo tenta carregar sua ilustração a partir desta pasta:
```yaml
# No cabeçalho (frontmatter) do evento em conteudo/fase_X/XX_nome.md:
personagens_cena:
  severino:
    nome: "Mestre Severino"
    subtitulo: "Teu Pai // Operário das Oficinas"
    arte: "personagens/severino.webp" # ou severino.png / severino.svg
    expressao_padrao: "grave"
```

Se o arquivo existir aqui, o jogo o exibe diretamente como um recorte de papel em plano médio com iluminação e sombras físicas.
Se o arquivo ainda não existir, o jogo utiliza automaticamente o fallback de silhueta procedural.

---

## 2. Recomendações de Formato e Resolução

Para que seus desenhos fiquem nítidos e imponentes na tela (escala em plano médio ~3x ampliada):

- **Enquadramento:** **Plano Médio / Busto** (da cintura/peito até o topo da cabeça/chapéu).
- **Proporção:** Aproximadamente **3:4** ou **1:1.3** vertical.
- **Resolução Recomendada:** Entre **800×1100 px** e **1200×1600 px**.
- **Fundo:** **Transparente** (canal Alfa em PNG ou WebP).
- **Borda de Papel Cartão:** 
  - Você pode desenhar seu próprio contorno irregular de corte de papel marfim cru (`#F8F5EE`), OU
  - Simplesmente salvar o recorte da figura com fundo transparente; o CSS do jogo aplica automaticamente a moldura marfim de corte e a sombra projetada de papel cartão (*Paper Mario*).
- **Estética Sugerida:**
  - Estilo Xilogravura / Cordel (linhas de goiva, entalhes fortes, hachuras rústicas).
  - Sombras pesadas de nanquim e olhar na penumbra (*Darkest Dungeon* / Noir clássico).
  - Tons: Nanquim escuro (`#0E0C0A`), papel cru (`#F8F5EE`) e toques ocasionais de urucum/ferrugem (`#8A2522`).

---

## 3. Nomes Padrão de Arquivos

| Personagem | Identificador | Arquivo Sugerido |
|---|---|---|
| **Mestre Severino** (Pai / Ferroviário) | `severino` | `artes/personagens/severino.png` (ou `.webp`) |
| **Delegado do DOPS** (Repressão Policial) | `delegado_dops` | `artes/personagens/delegado_dops.png` (ou `.webp`) |
| **Outros Personagens** | `[id_personagem]` | `artes/personagens/[id_personagem].png` |
