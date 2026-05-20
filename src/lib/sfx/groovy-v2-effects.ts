export const generateUFOHoverBuffer = (sampleRate: number, duration = 0.6): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // Linear glide upward
    const baseFreq = 220 + (progress * 180); 
    // Rapid laser-vibrato wobble (40 times a second)
    const wobble = Math.sin(2 * Math.PI * t * 40) * 35;
    
    phase += (2 * Math.PI * (baseFreq + wobble)) / sampleRate;
    
    // Smooth volume envelope that fades in and out gently
    const volume = 0.15 * Math.sin(progress * Math.PI);

    channelData[i] = Math.sin(phase) * volume;
  }
  return audioBuffer;
};

export const generateSpringJumpBuffer = (sampleRate: number, duration = 0.35): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // Hyperbolic curve upward for a snappy release
    const freq = 150 + Math.pow(progress, 3) * 600;
    phase += (2 * Math.PI * freq) / sampleRate;

    // Triangle wave for that hollow, physical "boing" tone
    const rawWave = Math.abs((phase % (2 * Math.PI)) / Math.PI - 1) * 2 - 1;
    
    // Tremolo: volume cycles up and down at 50Hz to create a metal-spring vibration
    const springTremolo = 0.5 + 0.5 * Math.sin(2 * Math.PI * t * 50);
    const volume = 0.18 * springTremolo * (1 - progress);

    channelData[i] = rawWave * volume;
  }
  return audioBuffer;
};

export const generateDropOffBuffer = (sampleRate: number, duration = 0.45): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // Exponential drop from bright treble down to a deep sub bass
    const freq = 800 * Math.exp(-progress * 2.5);
    phase += (2 * Math.PI * freq) / sampleRate;

    // Linear fade out so it vanishes organically into thin air
    const volume = 0.2 * (1 - progress);

    channelData[i] = Math.sin(phase) * volume;
  }
  return audioBuffer;
};

export const generateLaserBubbleBuffer = (sampleRate: number, duration = 0.04): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // Radical, lightning-fast downward pitch sweep
    const freq = 1500 * Math.exp(-progress * 6);
    phase += (2 * Math.PI * freq) / sampleRate;

    // Exponential volume drop-off so it sounds like a tight click
    const volume = 0.25 * Math.exp(-progress * 8);

    channelData[i] = Math.sin(phase) * volume;
  }
  return audioBuffer;
};
