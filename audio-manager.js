// ==========================================================================
// AUDIO-MANAGER.JS — SINTETIZADOR PROCEDURAL & SOUNDSCAPE ANALÓGICO
// ==========================================================================

const CHAVE_STORAGE_MUDO = 'aguas_de_ferro_audio_mudo';
const CHAVE_STORAGE_VOLUME = 'aguas_de_ferro_audio_volume';

class AudioManager {
  constructor({ audioContextClass = null, storage = null } = {}) {
    this.AudioContextClass = audioContextClass || 
      (typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null);

    this.storage = storage || 
      (typeof window !== 'undefined' && window.localStorage ? window.localStorage : null);

    this.ctx = null;
    this.masterGain = null;
    this.volume = 0.7;
    this.mudo = false;

    // Recupera configurações salvas
    if (this.storage) {
      try {
        const mudoSalvo = this.storage.getItem(CHAVE_STORAGE_MUDO);
        if (mudoSalvo !== null) {
          this.mudo = mudoSalvo === 'true';
        }
        const volSalvo = this.storage.getItem(CHAVE_STORAGE_VOLUME);
        if (volSalvo !== null) {
          const numVol = parseFloat(volSalvo);
          if (!isNaN(numVol)) {
            this.volume = Math.max(0.0, Math.min(1.0, numVol));
          }
        }
      } catch (_) {}
    }
  }

  // Inicializa preguiçosamente o AudioContext no primeiro gesto do usuário
  garantirContexto() {
    if (!this.ctx && this.AudioContextClass) {
      try {
        try {
          this.ctx = new this.AudioContextClass();
        } catch {
          this.ctx = typeof this.AudioContextClass === 'function' ? this.AudioContextClass() : null;
        }
        if (this.ctx) {
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.mudo ? 0 : this.volume, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      } catch (e) {
        console.warn("[AUDIO-MANAGER] Falha ao criar AudioContext:", e);
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  // Define o volume master com limiares defensivos (0.0 a 1.0)
  setVolume(novoVolume) {
    const vol = Math.max(0.0, Math.min(1.0, Number(novoVolume) || 0.0));
    this.volume = vol;

    if (this.masterGain && this.ctx && !this.mudo) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }

    if (this.storage) {
      try { this.storage.setItem(CHAVE_STORAGE_VOLUME, String(this.volume)); } catch (_) {}
    }
    return this.volume;
  }

  // Alterna o estado de mudo e persiste no armazenamento
  alternarMudo() {
    this.mudo = !this.mudo;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.mudo ? 0 : this.volume, this.ctx.currentTime);
    }

    if (this.storage) {
      try { this.storage.setItem(CHAVE_STORAGE_MUDO, String(this.mudo)); } catch (_) {}
    }
    return this.mudo;
  }

  estaMudo() {
    return this.mudo;
  }

  // Helper para criar buffer de ruído branco analógico
  _criarRuidoBuffer(duracaoSegundos) {
    if (!this.ctx) return null;
    const duracao = Math.max(0.01, duracaoSegundos);
    const sampleRate = this.ctx.sampleRate || 44100;
    const bufferSize = Math.floor(sampleRate * duracao);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // ---------------------------------------------------------------------------
  // 1. SOM DO CARIMBO: Impacto mecânico encorpado com amortecimento
  // ---------------------------------------------------------------------------
  somCarimbo() {
    if (this.mudo) return { sucesso: false, motivo: 'mudo' };
    const ctx = this.garantirContexto();
    if (!ctx) return { sucesso: false, motivo: 'sem_contexto' };

    try {
      const agora = ctx.currentTime;

      // Ganho do efeito conectado ao masterGain
      const gainEfeito = ctx.createGain();
      gainEfeito.connect(this.masterGain);

      // Oscilador 1: Onda Senoidal para impacto grave de corpo
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(125, agora);
      osc1.frequency.exponentialRampToValueAtTime(28, agora + 0.12);

      // Oscilador 2: Onda Triangular para ressonância e peso
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(80, agora);
      osc2.frequency.exponentialRampToValueAtTime(20, agora + 0.09);

      // Envelope de ganho do impacto
      gainEfeito.gain.setValueAtTime(0.55, agora);
      gainEfeito.gain.exponentialRampToValueAtTime(0.001, agora + 0.13);

      osc1.connect(gainEfeito);
      osc2.connect(gainEfeito);

      osc1.start(agora);
      osc2.start(agora);
      osc1.stop(agora + 0.14);
      osc2.stop(agora + 0.14);

      return { sucesso: true, efeito: 'carimbo' };
    } catch (e) {
      console.warn("[AUDIO-MANAGER] Erro ao sintetizar carimbo:", e);
      return { sucesso: false, erro: e.message };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. SOM DE DATILOGRAFIA: Estalido percussivo de tecla de máquina de escrever
  // ---------------------------------------------------------------------------
  somDatilografia() {
    if (this.mudo) return { sucesso: false, motivo: 'mudo' };
    const ctx = this.garantirContexto();
    if (!ctx) return { sucesso: false, motivo: 'sem_contexto' };

    try {
      const agora = ctx.currentTime;

      // Jitter aleatório para cada tecla soar orgânica
      const pitchOffset = (Math.random() - 0.5) * 160;
      const freqBase = 680 + pitchOffset;

      const gainEfeito = ctx.createGain();
      gainEfeito.connect(this.masterGain);

      // Oscilador percussivo metálico
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freqBase, agora);
      osc.frequency.exponentialRampToValueAtTime(320, agora + 0.035);

      // Envelope percussivo ultra-rápido (click mecânico)
      gainEfeito.gain.setValueAtTime(0.25, agora);
      gainEfeito.gain.exponentialRampToValueAtTime(0.001, agora + 0.035);

      osc.connect(gainEfeito);
      osc.start(agora);
      osc.stop(agora + 0.04);

      return { sucesso: true, efeito: 'datilografia' };
    } catch (e) {
      console.warn("[AUDIO-MANAGER] Erro ao sintetizar datilografia:", e);
      return { sucesso: false, erro: e.message };
    }
  }

  // ---------------------------------------------------------------------------
  // 3. SOM DE PAPEL: Fricção de celulose / virada de folha baritada
  // ---------------------------------------------------------------------------
  somPapel() {
    if (this.mudo) return { sucesso: false, motivo: 'mudo' };
    const ctx = this.garantirContexto();
    if (!ctx) return { sucesso: false, motivo: 'sem_contexto' };

    try {
      const agora = ctx.currentTime;
      const duracao = 0.18;

      const bufferRuido = this._criarRuidoBuffer(duracao);
      if (!bufferRuido) return { sucesso: false, motivo: 'buffer_falhou' };

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = bufferRuido;

      // Filtro passa-faixa para simular a textura de celulose
      const filtro = ctx.createBiquadFilter();
      filtro.type = 'bandpass';
      filtro.frequency.setValueAtTime(800, agora);
      filtro.frequency.linearRampToValueAtTime(1600, agora + 0.08);
      filtro.frequency.linearRampToValueAtTime(600, agora + duracao);
      filtro.Q.setValueAtTime(1.8, agora);

      const gainEfeito = ctx.createGain();
      gainEfeito.gain.setValueAtTime(0.01, agora);
      gainEfeito.gain.linearRampToValueAtTime(0.35, agora + 0.04);
      gainEfeito.gain.exponentialRampToValueAtTime(0.001, agora + duracao);

      noiseSource.connect(filtro);
      filtro.connect(gainEfeito);
      gainEfeito.connect(this.masterGain);

      noiseSource.start(agora);
      noiseSource.stop(agora + duracao);

      return { sucesso: true, efeito: 'papel' };
    } catch (e) {
      console.warn("[AUDIO-MANAGER] Erro ao sintetizar papel:", e);
      return { sucesso: false, erro: e.message };
    }
  }

  // ---------------------------------------------------------------------------
  // 4. SOM DE GAVETA METÁLICA: Deslize de trilho e trinco de fichário
  // ---------------------------------------------------------------------------
  somGavetaMetalica() {
    if (this.mudo) return { sucesso: false, motivo: 'mudo' };
    const ctx = this.garantirContexto();
    if (!ctx) return { sucesso: false, motivo: 'sem_contexto' };

    try {
      const agora = ctx.currentTime;

      // 1. Fricção metálica do trilho
      const duracaoFriccao = 0.16;
      const bufferRuido = this._criarRuidoBuffer(duracaoFriccao);

      if (bufferRuido) {
        const noise = ctx.createBufferSource();
        noise.buffer = bufferRuido;

        const filtro = ctx.createBiquadFilter();
        filtro.type = 'lowpass';
        filtro.frequency.setValueAtTime(650, agora);

        const gainNoise = ctx.createGain();
        gainNoise.gain.setValueAtTime(0.2, agora);
        gainNoise.gain.exponentialRampToValueAtTime(0.001, agora + duracaoFriccao);

        noise.connect(filtro);
        filtro.connect(gainNoise);
        gainNoise.connect(this.masterGain);

        noise.start(agora);
        noise.stop(agora + duracaoFriccao);
      }

      // 2. Trava metálica mecânica (clink) no final do curso
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, agora + 0.09);
      osc.frequency.exponentialRampToValueAtTime(450, agora + 0.16);

      const gainClink = ctx.createGain();
      gainClink.gain.setValueAtTime(0.001, agora);
      gainClink.gain.setValueAtTime(0.3, agora + 0.09);
      gainClink.gain.exponentialRampToValueAtTime(0.001, agora + 0.16);

      osc.connect(gainClink);
      gainClink.connect(this.masterGain);

      osc.start(agora + 0.09);
      osc.stop(agora + 0.17);

      return { sucesso: true, efeito: 'gaveta_metalica' };
    } catch (e) {
      console.warn("[AUDIO-MANAGER] Erro ao sintetizar gaveta:", e);
      return { sucesso: false, erro: e.message };
    }
  }

  // ---------------------------------------------------------------------------
  // 5. SOM DE ALERTA TENSO: Drone grave dissonante para AI-5 e censura
  // ---------------------------------------------------------------------------
  somAlertaTenso() {
    if (this.mudo) return { sucesso: false, motivo: 'mudo' };
    const ctx = this.garantirContexto();
    if (!ctx) return { sucesso: false, motivo: 'sem_contexto' };

    try {
      const agora = ctx.currentTime;
      const duracao = 0.85;

      const gainEfeito = ctx.createGain();
      gainEfeito.connect(this.masterGain);

      // Oscilador 1: Drone grave (46Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(46, agora);

      // Oscilador 2: Frequência ligeiramente desafinada (49.5Hz) gerando batimento dissonante
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(49.5, agora);

      // Filtro passa-baixa escuro
      const filtro = ctx.createBiquadFilter();
      filtro.type = 'lowpass';
      filtro.frequency.setValueAtTime(160, agora);
      filtro.frequency.linearRampToValueAtTime(90, agora + duracao);

      // Envelope de tensão lenta
      gainEfeito.gain.setValueAtTime(0.001, agora);
      gainEfeito.gain.linearRampToValueAtTime(0.4, agora + 0.15);
      gainEfeito.gain.exponentialRampToValueAtTime(0.001, agora + duracao);

      osc1.connect(filtro);
      osc2.connect(filtro);
      filtro.connect(gainEfeito);

      osc1.start(agora);
      osc2.start(agora);
      osc1.stop(agora + duracao);
      osc2.stop(agora + duracao);

      return { sucesso: true, efeito: 'alerta_tenso' };
    } catch (e) {
      console.warn("[AUDIO-MANAGER] Erro ao sintetizar alerta tenso:", e);
      return { sucesso: false, erro: e.message };
    }
  }
}

// Suporte para exportação CommonJS (Node/Electron) e carregamento direto no browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AudioManager, CHAVE_STORAGE_MUDO, CHAVE_STORAGE_VOLUME };
} else {
  window.AudioManager = AudioManager;
}
