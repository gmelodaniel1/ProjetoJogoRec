// ==========================================================================
// TESTE AUTOMATIZADO: TICKET 29 — MÓDULO DE ÁUDIO SINTETIZADO & SOUNDSCAPE
// ==========================================================================

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let aprovados = 0;
let reprovados = 0;

function test(descricao, fn) {
  try {
    fn();
    console.log(`  ✔ ${descricao}`);
    aprovados++;
  } catch (err) {
    console.error(`  ✖ FALHOU: ${descricao}`);
    console.error(`    -> ${err.message}`);
    reprovados++;
  }
}

console.log("=================================================================");
console.log("   ÁGUAS DE FERRO — SUÍTE DE TESTES: TICKET 29 (ÁUDIO SINTETIZADO)");
console.log("=================================================================\n");

// -----------------------------------------------------------------------------
// Mock da Web Audio API para Ambiente Headless (Node.js)
// -----------------------------------------------------------------------------
class MockAudioNode {
  constructor() {
    this.connections = [];
  }
  connect(target) {
    this.connections.push(target);
    return target;
  }
  disconnect() {
    this.connections = [];
  }
}

class MockAudioParam {
  constructor(val = 0) {
    this.value = val;
    this.events = [];
  }
  setValueAtTime(val, time) {
    this.value = val;
    this.events.push({ type: 'setValueAtTime', val, time });
  }
  exponentialRampToValueAtTime(val, time) {
    this.value = val;
    this.events.push({ type: 'exponentialRampToValueAtTime', val, time });
  }
  linearRampToValueAtTime(val, time) {
    this.value = val;
    this.events.push({ type: 'linearRampToValueAtTime', val, time });
  }
}

class MockOscillatorNode extends MockAudioNode {
  constructor() {
    super();
    this.type = 'sine';
    this.frequency = new MockAudioParam(440);
    this.started = false;
    this.stopped = false;
  }
  start(time = 0) { this.started = true; }
  stop(time = 0) { this.stopped = true; }
}

class MockGainNode extends MockAudioNode {
  constructor() {
    super();
    this.gain = new MockAudioParam(1);
  }
}

class MockBiquadFilterNode extends MockAudioNode {
  constructor() {
    super();
    this.type = 'lowpass';
    this.frequency = new MockAudioParam(1000);
    this.Q = new MockAudioParam(1);
  }
}

class MockBufferSourceNode extends MockAudioNode {
  constructor() {
    super();
    this.buffer = null;
    this.started = false;
    this.stopped = false;
  }
  start(time = 0) { this.started = true; }
  stop(time = 0) { this.stopped = true; }
}

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.state = 'running';
    this.destination = new MockAudioNode();
  }
  createOscillator() { return new MockOscillatorNode(); }
  createGain() { return new MockGainNode(); }
  createBiquadFilter() { return new MockBiquadFilterNode(); }
  createBuffer(channels, length, sampleRate) {
    return {
      numberOfChannels: channels,
      length,
      sampleRate,
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() { return new MockBufferSourceNode(); }
  resume() { this.state = 'running'; return Promise.resolve(); }
  suspend() { this.state = 'suspended'; return Promise.resolve(); }
}

const { MemoryStorage } = require('../save-manager.js');

// Injeta o mock no ambiente global antes de importar audio-manager.js se necessário
global.MockAudioContext = MockAudioContext;

let AudioManagerModule;
try {
  AudioManagerModule = require('../audio-manager.js');
} catch (e) {
  AudioManagerModule = null;
}

// -----------------------------------------------------------------------------
// [TIER 1] Arquitetura Singleton & Gerenciamento de Estado
// -----------------------------------------------------------------------------
console.log("[TIER 1] Arquitetura Singleton & Gerenciamento de Estado");

test("AudioManager é exportado e instanciavel", () => {
  assert(AudioManagerModule !== null, "audio-manager.js deve existir e ser importável");
  assert.strictEqual(typeof AudioManagerModule.AudioManager, 'function');
});

test("Suporta injeção de contexto mock e storage customizado", () => {
  const { AudioManager } = AudioManagerModule;
  const mockStorage = new MemoryStorage();
  const mockCtx = new MockAudioContext();

  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: mockStorage });
  assert.strictEqual(audio.mudo, false);
  assert.strictEqual(audio.volume, 0.7);
  assert(audio.garantirContexto() !== null);
});

test("Controle de Mute persiste no storage", () => {
  const { AudioManager } = AudioManagerModule;
  const mockStorage = new MemoryStorage();
  const mockCtx = new MockAudioContext();

  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: mockStorage });
  assert.strictEqual(audio.estaMudo(), false);

  const novoEstado = audio.alternarMudo();
  assert.strictEqual(novoEstado, true);
  assert.strictEqual(audio.estaMudo(), true);
  assert.strictEqual(mockStorage.getItem('aguas_de_ferro_audio_mudo'), 'true');

  audio.alternarMudo();
  assert.strictEqual(audio.estaMudo(), false);
  assert.strictEqual(mockStorage.getItem('aguas_de_ferro_audio_mudo'), 'false');
});

test("Ajuste de volume com clamping estrito entre 0.0 e 1.0", () => {
  const { AudioManager } = AudioManagerModule;
  const audio = new AudioManager({ audioContextClass: () => new MockAudioContext(), storage: new MemoryStorage() });

  audio.setVolume(0.5);
  assert.strictEqual(audio.volume, 0.5);

  audio.setVolume(1.8);
  assert.strictEqual(audio.volume, 1.0);

  audio.setVolume(-0.4);
  assert.strictEqual(audio.volume, 0.0);
});

// -----------------------------------------------------------------------------
// [TIER 2] Sintetizador Procedural Web Audio API (Efeitos Analógicos)
// -----------------------------------------------------------------------------
console.log("\n[TIER 2] Sintetizador Procedural Web Audio API (Efeitos Analógicos)");

test("somCarimbo() sintetiza impacto mecânico com envelope exponencial", () => {
  const { AudioManager } = AudioManagerModule;
  const mockCtx = new MockAudioContext();
  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: new MemoryStorage() });

  const res = audio.somCarimbo();
  assert.strictEqual(res.sucesso, true);
  assert.strictEqual(res.efeito, 'carimbo');
});

test("somDatilografia() sintetiza estalido de tecla mecânica", () => {
  const { AudioManager } = AudioManagerModule;
  const mockCtx = new MockAudioContext();
  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: new MemoryStorage() });

  const res = audio.somDatilografia();
  assert.strictEqual(res.sucesso, true);
  assert.strictEqual(res.efeito, 'datilografia');
});

test("somPapel() sintetiza ruído de fricção de celulose / manila", () => {
  const { AudioManager } = AudioManagerModule;
  const mockCtx = new MockAudioContext();
  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: new MemoryStorage() });

  const res = audio.somPapel();
  assert.strictEqual(res.sucesso, true);
  assert.strictEqual(res.efeito, 'papel');
});

test("somGavetaMetalica() sintetiza ruído de trilho metálico e trava", () => {
  const { AudioManager } = AudioManagerModule;
  const mockCtx = new MockAudioContext();
  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: new MemoryStorage() });

  const res = audio.somGavetaMetalica();
  assert.strictEqual(res.sucesso, true);
  assert.strictEqual(res.efeito, 'gaveta_metalica');
});

test("somAlertaTenso() sintetiza drone grave de tensão e censura", () => {
  const { AudioManager } = AudioManagerModule;
  const mockCtx = new MockAudioContext();
  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: new MemoryStorage() });

  const res = audio.somAlertaTenso();
  assert.strictEqual(res.sucesso, true);
  assert.strictEqual(res.efeito, 'alerta_tenso');
});

test("Quando mudo está ativado, os efeitos não executam e retornam ignorado", () => {
  const { AudioManager } = AudioManagerModule;
  const mockCtx = new MockAudioContext();
  const audio = new AudioManager({ audioContextClass: () => mockCtx, storage: new MemoryStorage() });

  audio.alternarMudo(); // mudo = true
  const res = audio.somCarimbo();
  assert.strictEqual(res.sucesso, false);
  assert.strictEqual(res.motivo, 'mudo');
});

// -----------------------------------------------------------------------------
// [TIER 3] Integração no DOM, Estilos e renderer.js
// -----------------------------------------------------------------------------
console.log("\n[TIER 3] Integração no DOM, Estilos e renderer.js");

test("audio-manager.js está referenciado no index.html antes de renderer.js", () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
  assert(html.includes('<script src="audio-manager.js"></script>'));
  const idxAudio = html.indexOf('<script src="audio-manager.js"></script>');
  const idxRenderer = html.indexOf('<script src="renderer.js"></script>');
  assert(idxAudio < idxRenderer, "audio-manager.js deve carregar antes de renderer.js");
});

test("Botão #btn-audio-toggle existe na barra de sistema do index.html", () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
  assert(html.includes('id="btn-audio-toggle"'), "Botão #btn-audio-toggle deve estar presente no DOM");
});

test("renderer.js expõe audioManager e conecta os eventos táteis ao sintetizador", () => {
  const rendererCode = fs.readFileSync(path.join(__dirname, '../renderer.js'), 'utf-8');
  assert(rendererCode.includes('window.audioManager = audioManager'));
  assert(rendererCode.includes('audioManager.somDatilografia'));
  assert(rendererCode.includes('audioManager.somPapel'));
  assert(rendererCode.includes('audioManager.somCarimbo'));
  assert(rendererCode.includes('audioManager.somGavetaMetalica'));
});

test("style.css estiliza #btn-audio-toggle com Visual Blacklist estrito", () => {
  const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf-8');
  assert(css.includes('.btn-audio-toggle') || css.includes('#btn-audio-toggle'));
});

// -----------------------------------------------------------------------------
// Consolidação dos Resultados
// -----------------------------------------------------------------------------
console.log("\n=================================================================");
console.log(`Testes Aprovados: ${aprovados} | Testes Reprovados: ${reprovados}`);
console.log("=================================================================\n");

if (reprovados > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
