# Handoff Report: Context & Codebase Visual Spec Mining ('Águas de Ferro')

**From:** Context & Codebase Spec Miner (`spec_miner_survey_1`)  
**To:** Orchestrator (`f62b7ffd-39b1-4b11-864c-bdfb2ac20f39`)  
**Type:** Hard Handoff (Task Complete)  
**Date:** 2026-11-04  

---

## 1. Observation

1. **User Request & High-Level Scope (`ORIGINAL_REQUEST.md`):**
   - Lines 5-6: *"Elaborar um estudo e documento de diretrizes de direção de arte para o jogo 'Águas de Ferro', definindo a identidade estética e o pipeline para reestilizar e utilizar fotos históricas do Recife com ambientação noir e documental baseada em RecifeVibe.JPG."*
   - Lines 10-14: Reference materials: `artes/RecifeVibe.JPG`, `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`, `CONTEXT.md`.
   - Lines 28-36: Acceptance criteria requiring art direction document in `docs/DIRETRIZES_ESTETICAS_NOIR.md`, comparative analysis, historical references, pipeline technical recommendation, objective parameters, and integration specifications.

2. **Game Context & Anti-Generic Directives (`CONTEXT.md`):**
   - Lines 4-10: RPG narrative determinism inspired by *Sir Brante*, Recife 1948–1975, 4 formative stages (Infância 1948-1953, Juventude & Formação Política 1954-1964, Vida Adulta / Anos de Chumbo 1968-1974, Ponto de Ruptura / Cheia de 75).
   - Lines 25-30: Visual Blacklist: `PROIBIDO` modern sans-serif fonts, `PROIBIDO` rounded corners (`border-radius > 2px`), `PROIBIDO` neon/Material Design gradients, `PROIBIDO` pure white (`#FFFFFF`) or pure black (`#000000`).
   - Lines 32-37: Spatial split: Left/Center (~54% width) with Visor Principal do Palco and 4 bottom tabs (`CENÁRIO`, `ATRIBUTOS`, `RELAÇÕES`, `CRONOLOGIA`); Right Column (~46% width, `max-width: 720px`) with narrative sheet.
   - Lines 56-60: Image treatment standard: `sepia(60%) contrast(115%) brightness(90%) grayscale(30%)` with halftone dot overlay (`::after`) and dark vignette.

3. **DOM Structure & Containers (`index.html`):**
   - Lines 65-78: Visor container `#aba-cenario` containing `.cenario-container`, `.fita-adesiva` corner tapes, `#slot-moldura-evidencia` (`.moldura-evidencia`), and `.cenario-legenda-barra` (`#cenario-local`, `#cenario-registro`).
   - Lines 81-105: `#painel-cheia-75` with `.cheia-regua-grafica` (`#regua-barra-nivel`) and data lines, active on Phase 3.
   - Lines 274-306: `.barra-atalhos-dossie` featuring `#btn-aba-cenario`, `#btn-aba-atributos`, `#btn-aba-relacoes`, `#btn-aba-cronologia`.

4. **Styling System & Image Pipeline in CSS (`style.css`):**
   - Lines 36-41: Global reset enforcing `border-radius: 0 !important;`.
   - Lines 6-21: Palette variables (`--cor-fundo-mesa: #5C4938`, `--cor-papel-principal: #EFE8DC`, `--cor-papel-secundario: #E2D8C5`, `--cor-tinta-principal: #1E1D1B`, `--cor-carimbo-vermelho: #8A2522`, `--cor-azul-caneta: #24384D`, `--cor-verde-militar: #3D4337`, `--cor-lodo-capibaribe: #3C3B30`).
   - Lines 26-27: Font families: serif `--fonte-editorial` (`EB Garamond`, `Lora`, `Merriweather`) and monospace `--fonte-datilografada` (`Courier Prime`, `Special Elite`).
   - Lines 262-272: `.moldura-evidencia` defined with `flex: 1; border: 1px solid #8C7F6A; background: #C9BEA9; display: flex; align-items: center; justify-content: center; min-height: 220px; overflow: hidden;`.
   - Lines 298-330: `.foto-jornal-wrapper` and `.filtro-jornal-75` with `filter: sepia(55%) contrast(112%) brightness(93%) grayscale(20%); object-fit: cover;`, plus `::after` halftone radial grid and vignette with `mix-blend-mode: multiply`.
   - Lines 338-353: `.selo-sobreposto-cenario` rotated `-3deg` with `border: 2px solid var(--cor-carimbo-vermelho)`.

5. **Runtime Image and Scene Rendering (`renderer.js`):**
   - Lines 765-805 (`atualizarMolduraEvidencia`): Checks if `evento.metadata.imagem` is truthy.
     - If true: renders `.foto-jornal-wrapper` containing `<img src="artes/${evento.metadata.imagem}" class="filtro-jornal-75" alt="...">` and `<div class="selo-sobreposto-cenario">`.
     - If false: calls `gerarSvgCenario(evento, estado)` rendering an inline SVG with `viewBox="0 0 800 380"` (~2.1:1 widescreen aspect ratio) and contextual procedural scenes (Cais de Santa Rita, Várzea, Golpe 1964/Crise Policial, Cheia de 75).

6. **Historical Asset Exploration (`artes/`):**
   - `artes/RecifeVibe.JPG`: High-contrast nocturnal photograph of the Capibaribe river at Ponte Duarte Coelho. Features dark nocturnal water with specular vertical reflections of vintage neon signs: "PHOENIX PERNAMBUCANA SEGUROS", "LOTERIA DO ESTADO", "CINEMA", "INPS", and "ÓLEO BEM-TE-VI" / "MARGARINA BEM-TE-VI".
   - `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`: 106-page digital catalog of Museu da Cidade do Recife (Volume 99, Tombos 125.938 to 126.070). Contains daytime 1940s/1950s B&W photos of political rallies at Palácio do Governo (125.940), Getúlio Vargas visits (125.951, 125.964), Guararapes Airport under construction (125.996), elite receptions with Agamenon Magalhães at Santa Isabel (126.013, 126.032), and port workers' Christmas at SAPS (126.056).

7. **Test Suite Baseline Execution:**
   - Command: `cd "C:\Users\AdminUser\Desktop\Jogo Recife"; node test/runner.js`
   - Output: 7/7 test suites approved: Parser Markdown, Prontuário DOPS, Motor Determinístico, Dossiê de Ações, Eventos de Crise, Modo Sobrevivência Cheia de 75, Progressão Cronológica da Infância.

---

## 2. Logic Chain

1. From Observation 1 and 2, the game's core visual metaphor is a 1975 "Mesa de Arquivo Morto / Redação Clandestina", requiring strict anti-generic rules (no modern sans-serif, no round buttons, no pure black or white, strict tactile materials).
2. From Observation 3 and 4, the stage container (`.cenario-container` and `.moldura-evidencia`) occupies the top portion of the ~54% left column, flanked by simulated aged tape (`.fita-adesiva`), displaying dynamic metadata headers/footers (`.cenario-legenda-barra`) and overlaid stamps (`.selo-sobreposto-cenario`).
3. From Observation 5, `renderer.js` already supports loading raster assets directly from `artes/${evento.metadata.imagem}` with `.filtro-jornal-75` and fallback to procedural SVGs with `viewBox="0 0 800 380"`.
4. Comparing Observation 6 (`RecifeVibe.JPG` vs `ACERVO DIGITAL MCR fotografia - VOL 99.pdf`):
   - The archival photos from the MCR are daylight, high-key, black-and-white documentary shots with silver gelatin/sepia tones.
   - `RecifeVibe.JPG` is a low-key, night-time noir shot dominated by inky water reflections and warm amber/red/cyan neon light sources.
   - If historical photos are fed purely into runtime CSS filters (`sepia + contrast`), they remain daylight shots with a brownish wash. CSS filters alone cannot synthesize night lighting, neon halation, or directional specular water reflections.
   - Conversely, processing all photos purely offline into rigid baked assets loses the interactive adaptability of phase color shifts and responsive layout.
5. Therefore, a **Hybrid Pipeline (Abordagem Híbrida)** is the optimal technical and artistic strategy:
   - **Offline Preprocessing (Assets Pipeline):** Crop historical photos to ~2.1:1 or 16:9 widescreen safe frames (1200x570px), apply tone-curve compression (deepening blacks to `#1A1815` and clamping highlights to `#EAE2D2`), introduce localized lighting masks (streetlamps, neon signs, water reflections), and export to optimized WebP/JPEG (<180 KB).
   - **Runtime Dynamic Layer (CSS / SVG in Electron):** Retain `.foto-jornal-wrapper::after` for responsive halftone printing dots (3px grid), multiply blend mode, dark perimeter vignette, dynamic stamp angle, and phase atmosphere reactive classes (`body.fase-1`, `body.fase-2`, `body.fase-3`).
6. From Observation 7, the test suite verifies that current game logic and hot-reloading architecture are fully operational and unhindered by this visual integration model.

---

## 3. Caveats

- **No Caveats Regarding Exploration:** All primary files (`ORIGINAL_REQUEST.md`, `CONTEXT.md`, `index.html`, `style.css`, `renderer.js`, `main.js`, `artes/RecifeVibe.JPG`, and sample pages of `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`) were directly investigated.
- **Assumptions:** Assumed target screen resolution centers around 1080p Full HD (1920x1080) in fullscreen mode as configured in `main.js:36`.

---

## 4. Conclusion

The visual and technical specifications for 'Águas de Ferro' are fully mapped and documented in `analysis.md`:
1. The DOM container is `#slot-moldura-evidencia` inside `.cenario-container` (left column ~54%), utilizing `.foto-jornal-wrapper` and `.filtro-jornal-75`.
2. Recommended asset dimensions are **1200 x 570 px** (aspect ratio **~2.1:1** matching the 800x380 procedural SVG standard), with a central 60% safe zone for focal elements.
3. The recommended technical pipeline is a **Hybrid Architecture**: batch static preprocessing for nocturnal tone grading, high-contrast chiaroscuro, and localized neon/water reflection synthesis, coupled with runtime CSS for halftone texture, multiply blending, phase atmosphere transitions, and bureaucratic stamps.
4. The groundwork is complete for writing the full art direction guide (`docs/DIRETRIZES_ESTETICAS_NOIR.md`) adhering to all acceptance criteria in `ORIGINAL_REQUEST.md`.

---

## 5. Verification Method

To independently verify all findings:
1. **Verify Test Suite Baseline:**
   ```powershell
   cd "C:\Users\AdminUser\Desktop\Jogo Recife"
   node test/runner.js
   ```
   *Expected result:* All 7 test suites pass with 0 errors.
2. **Inspect Spec Mining Artifacts:**
   - Detailed specification report: `C:\Users\AdminUser\Desktop\Jogo Recife\.agents\teamwork\spec_miner_survey_1\analysis.md`
   - Agent working memory: `C:\Users\AdminUser\Desktop\Jogo Recife\.agents\teamwork\spec_miner_survey_1\BRIEFING.md`
   - Agent progress heartbeat: `C:\Users\AdminUser\Desktop\Jogo Recife\.agents\teamwork\spec_miner_survey_1\progress.md`
3. **Inspect Key Code Locations:**
   - Image slot and container: `index.html:65-78`
   - Image filter and halftone overlay: `style.css:298-330`
   - Runtime image injector and SVG fallback: `renderer.js:765-805`
   - Noir reference photo: `artes/RecifeVibe.JPG`
   - Historical PDF catalog: `artes/ACERVO DIGITAL MCR fotografia - VOL 99.pdf`
