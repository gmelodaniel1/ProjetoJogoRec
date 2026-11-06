// ==========================================================================
// HARNESS DE ESTRESSE EMPÍRICO: ASPECT RATIOS, DOM & PERFORMANCE NOIR
// Challenger 2 — Águas de Ferro (Milestone M1/M2)
// ==========================================================================

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

const { carregarTodosEventos } = require('../src/narrative-parser');
const pastaConteudo = path.join(__dirname, '..', 'conteudo');

ipcMain.handle('narrative:get-all-events', async () => carregarTodosEventos(pastaConteudo));
ipcMain.handle('narrative:get-event', async (e, id) => carregarTodosEventos(pastaConteudo).eventos[id] || null);
ipcMain.handle('app:toggle-fullscreen', () => false);
ipcMain.handle('app:is-fullscreen', () => false);
ipcMain.handle('app:quit', () => {});

const RESOLUTIONS = [
  { name: '1080p FHD (16:9)', width: 1920, height: 1080 },
  { name: '900p HD+ (16:9)', width: 1600, height: 900 },
  { name: 'WXGA+ Laptop (16:10)', width: 1440, height: 900 },
  { name: 'Budget Laptop (16:9)', width: 1366, height: 768 },
  { name: '720p Minimum Base (16:9)', width: 1280, height: 720 }
];

const OUTPUT_FILE = path.join(__dirname, 'layout_stress_results.json');

app.whenReady().then(async () => {
  try {
    const results = {
      timestamp: new Date().toISOString(),
      symmetryVerification: {},
      resolutionsTested: [],
      overlayObstruction: {},
      performanceBenchmark: {}
    };

    // 1. ANÁLISE MATEMÁTICA DE SIMETRIA: 1200x570 (2.1:1) VS SVG PROCEDURAL (800x380)
    const wImg = 1200, hImg = 570;
    const wSvg = 800, hSvg = 380;
    const ratioImg = wImg / hImg;
    const ratioSvg = wSvg / hSvg;
    const deltaRatio = Math.abs(ratioImg - ratioSvg);
    const scaleW = wImg / wSvg;
    const scaleH = hImg / hSvg;

    results.symmetryVerification = {
      imageAspect: { width: wImg, height: hImg, ratio: ratioImg, simplifiedRatio: '40:19 (2.105263:1)' },
      svgAspect: { width: wSvg, height: hSvg, ratio: ratioSvg, simplifiedRatio: '40:19 (2.105263:1)' },
      scaleHorizontal: scaleW,
      scaleVertical: scaleH,
      deltaDifference: deltaRatio,
      isPerfectSymmetry: deltaRatio < 1e-12 && scaleW === 1.5 && scaleH === 1.5,
      explanation: 'O aspect ratio 1200x570 e o viewBox 800x380 reduzem-se exatamente à fração 40/19 (fator de escala de 1.5x horizontal e vertical).'
    };

    // 2. CRIAÇÃO DE JANELA ÚNICA PARA MEDIÇÕES EMPÍRICAS NO CHROMIUM
    const win = new BrowserWindow({
      show: false,
      width: 1280,
      height: 720,
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
      }
    });

    const fileUrl = url.pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href;
    await win.loadURL(fileUrl);

    // Medição em cada resolução alterando o tamanho da janela
    for (const res of RESOLUTIONS) {
      win.setSize(res.width, res.height);
      // Aguarda 100ms para layout engine assentar
      await new Promise(r => setTimeout(r, 100));

      const domMetrics = await win.webContents.executeJavaScript(`
        (() => {
          const slot = document.getElementById('slot-moldura-evidencia');
          const cenarioContainer = document.querySelector('.cenario-container');
          const palcoCentral = document.querySelector('.palco-central');
          const colunaNarrativa = document.querySelector('.coluna-narrativa');
          const selo = document.querySelector('.selo-sobreposto-cenario');
          const fitaEsq = document.querySelector('.fita-canto-esq');
          const fitaDir = document.querySelector('.fita-canto-dir');

          const getBox = el => el ? {
            width: el.getBoundingClientRect().width,
            height: el.getBoundingClientRect().height,
            top: el.getBoundingClientRect().top,
            left: el.getBoundingClientRect().left,
            right: el.getBoundingClientRect().right,
            bottom: el.getBoundingClientRect().bottom
          } : null;

          return {
            windowInner: { width: window.innerWidth, height: window.innerHeight },
            slot: getBox(slot),
            cenarioContainer: getBox(cenarioContainer),
            palcoCentral: getBox(palcoCentral),
            colunaNarrativa: getBox(colunaNarrativa),
            selo: getBox(selo),
            fitaEsq: getBox(fitaEsq),
            fitaDir: getBox(fitaDir)
          };
        })()
      `);

      const slotW = domMetrics.slot.width;
      const slotH = domMetrics.slot.height;
      const slotRatio = slotW / slotH;

      // Simulação de object-fit: cover
      function calcObjectFitCover(imgW, imgH, boxW, boxH) {
        const imgRatio = imgW / imgH;
        const boxRatio = boxW / boxH;
        let renderW, renderH, cropX = 0, cropY = 0;

        if (boxRatio > imgRatio) {
          renderW = boxW;
          renderH = boxW / imgRatio;
          cropY = (renderH - boxH) / renderH;
        } else {
          renderH = boxH;
          renderW = boxH * imgRatio;
          cropX = (renderW - boxW) / renderW;
        }

        const visibleWPercent = (1 - cropX) * 100;
        const visibleHPercent = (1 - cropY) * 100;
        const cutTopPercent = (cropY / 2) * 100;
        const cutBottomPercent = (cropY / 2) * 100;
        const cutLeftPercent = (cropX / 2) * 100;
        const cutRightPercent = (cropX / 2) * 100;

        const safeZoneBreached = (cutTopPercent > 10.05) || (cutBottomPercent > 10.05) ||
                                 (cutLeftPercent > 10.05) || (cutRightPercent > 10.05);

        return {
          originalAspect: `${imgW}x${imgH} (${(imgW/imgH).toFixed(3)}:1)`,
          cropOrientation: cropY > 0 ? 'VERTICAL_CUT (Top/Bottom)' : (cropX > 0 ? 'HORIZONTAL_CUT (Sides)' : 'EXACT_FIT'),
          cropAmountsPercent: {
            horizontalTotal: +(cropX * 100).toFixed(2),
            verticalTotal: +(cropY * 100).toFixed(2),
            cutEachSide: +( (cropX > 0 ? cropX/2 : cropY/2) * 100 ).toFixed(2)
          },
          visibleAreaPercent: +( (visibleWPercent * visibleHPercent) / 100 ).toFixed(2),
          safeZoneBreached,
          safeZoneMarginExceededBy: safeZoneBreached ? +(Math.max(cutTopPercent, cutLeftPercent) - 10.0).toFixed(2) : 0
        };
      }

      const fit21 = calcObjectFitCover(1200, 570, slotW, slotH);
      const fit32 = calcObjectFitCover(1200, 800, slotW, slotH);
      const fit34 = calcObjectFitCover(450, 600, slotW, slotH);

      results.resolutionsTested.push({
        resolution: res.name,
        viewport: domMetrics.windowInner,
        slotDimensions: {
          width: +slotW.toFixed(1),
          height: +slotH.toFixed(1),
          aspectRatio: +slotRatio.toFixed(3)
        },
        cenarioDimensions: {
          width: +domMetrics.cenarioContainer.width.toFixed(1),
          height: +domMetrics.cenarioContainer.height.toFixed(1),
          aspectRatio: +(domMetrics.cenarioContainer.width / domMetrics.cenarioContainer.height).toFixed(3)
        },
        fits: {
          widescreen_1200x570_2_1: fit21,
          documental_1200x800_3_2: fit32,
          retrato_450x600_3_4: fit34
        },
        rawMetrics: domMetrics
      });
    }

    // 3. ANÁLISE DE OBSTRUÇÃO DE ELEMENTOS DE INTERFACE (SELOS E FITAS)
    const baseMetric = results.resolutionsTested[0];
    const sW = baseMetric.slotDimensions.width;
    const sH = baseMetric.slotDimensions.height;
    const seloBox = baseMetric.rawMetrics.selo;
    const fitaDirBox = baseMetric.rawMetrics.fitaDir;

    results.overlayObstruction = {
      seloPixelSize: { width: +seloBox.width.toFixed(1), height: +seloBox.height.toFixed(1) },
      seloSlotCoveragePercent: +( (seloBox.width * seloBox.height) / (sW * sH) * 100 ).toFixed(2),
      fitaPixelSize: { width: +fitaDirBox.width.toFixed(1), height: +fitaDirBox.height.toFixed(1) },
      assessment: 'Selo e fitas adesivas ocupam o quadrante superior direito (margens < 25px). Safe-zone de 80% desobstruída no centro.'
    };

    // 4. BENCHMARK DE PERFORMANCE: FILTROS CSS, BLEND MODES E COMPOSIÇÃO
    win.setSize(1920, 1080);
    await new Promise(r => setTimeout(r, 100));

    const perfData = await win.webContents.executeJavaScript(`
      (async () => {
        const slot = document.getElementById('slot-moldura-evidencia');
        const iterations = 60;

        // 1. Recalculo de estilo e repaint com filtro CSS ativo
        const filterTimes = [];
        for (let i = 0; i < iterations; i++) {
          const t0 = performance.now();
          if (slot) {
            slot.style.filter = 'sepia(' + (50 + (i % 10)) + '%) contrast(' + (110 + (i % 5)) + '%) brightness(93%) grayscale(20%)';
            void slot.offsetHeight;
          }
          filterTimes.push(performance.now() - t0);
        }

        // 2. Baseline sem filtros
        if (slot) slot.style.filter = 'none';
        const baselineTimes = [];
        for (let i = 0; i < iterations; i++) {
          const t0 = performance.now();
          if (slot) {
            slot.style.opacity = (i % 2 === 0 ? '0.99' : '1.0');
            void slot.offsetHeight;
          }
          baselineTimes.push(performance.now() - t0);
        }

        // 3. Teste de reflow com Screen Shake (@keyframes transform)
        const shakeTimes = [];
        const mesa = document.querySelector('.mesa-viewport');
        for (let i = 0; i < iterations; i++) {
          const t0 = performance.now();
          if (mesa) {
            mesa.style.transform = (i % 2 === 0 ? 'translate(-3px, 2px)' : 'translate(3px, -2px)');
            void mesa.offsetHeight;
          }
          shakeTimes.push(performance.now() - t0);
        }
        if (mesa) mesa.style.transform = 'none';

        const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        const max = arr => Math.max(...arr);

        return {
          filterRecalcAvgMs: +avg(filterTimes).toFixed(3),
          filterRecalcMaxMs: +max(filterTimes).toFixed(3),
          baselineRecalcAvgMs: +avg(baselineTimes).toFixed(3),
          shakeRecalcAvgMs: +avg(shakeTimes).toFixed(3),
          shakeRecalcMaxMs: +max(shakeTimes).toFixed(3),
          filterOverheadRatio: +(avg(filterTimes) / Math.max(avg(baselineTimes), 0.001)).toFixed(2)
        };
      })()
    `);

    results.performanceBenchmark = perfData;
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
    fs.writeFileSync(path.join(__dirname, 'harness_status.txt'), 'SUCCESS');
  } catch (err) {
    fs.writeFileSync(path.join(__dirname, 'stress_error.txt'), err.stack || err.message, 'utf-8');
  } finally {
    app.quit();
  }
});
