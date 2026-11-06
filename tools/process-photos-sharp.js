/**
 * Pipeline de Processamento Noir via Sharp para 'Águas de Ferro'
 * Referência: docs/DIRETRIZES_ESTETICAS_NOIR.md (§3.4 Opção B)
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processPhotoSharp(inputPath, outputPath, width = 1200, height = 570) {
  try {
    const dir = path.dirname(outputPath);
    if (dir && dir !== '.' && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Matriz de divisão tonal baritada (sombras carvão, meios âmbar)
    // Exige entrada de 3 bandas (sRGB) correspondente às 3 colunas da matriz
    const colorRecombMatrix = [
      [0.98, 0.05, 0.02],
      [0.08, 0.90, 0.02],
      [0.02, 0.06, 0.82]
    ];

    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: sharp.strategy.entropy // Foca no centro de maior interesse visual
      })
      .grayscale()
      .toColourspace('srgb') // Converte mono (1 canal) de volta a sRGB (3 canais idênticos), permitindo a operação da matriz 3x3
      .linear(1.32, -22) // Aprofunda as sombras e eleva o contraste
      .recomb(colorRecombMatrix)
      .webp({ quality: 86, effort: 6 })
      .toFile(outputPath);

    console.log(`[Sharp] Asset gerado: ${outputPath} (${width}x${height})`);
  } catch (err) {
    console.error(`Erro ao processar ${inputPath}:`, err);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length >= 2) {
    const w = args[2] ? parseInt(args[2], 10) : 1200;
    const h = args[3] ? parseInt(args[3], 10) : 570;
    processPhotoSharp(args[0], args[1], w, h);
  } else {
    console.log('Uso: node tools/process-photos-sharp.js <origem.jpg> <destino.webp> [largura] [altura]');
  }
}

module.exports = { processPhotoSharp };

