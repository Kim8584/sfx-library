export const generateBoingSFXBuffer = (sampleRate: number, duration = 0.35): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // The pitch plunges deep in the first 25% of the sound, then launches up
    let currentFreq = 120;
    if (progress < 0.25) {
      currentFreq = 300 - (progress / 0.25) * 180; // Sharp drop to 120Hz
    } else {
      const bounceProgress = (progress - 0.25) / 0.75;
      currentFreq = 120 + (500 - 120) * Math.pow(bounceProgress, 2); // Exponential leap to 500Hz
    }

    // Add a slight retro vibrato wobble to the ring-out
    if (progress > 0.4) {
      currentFreq += Math.sin(2 * Math.PI * t * 18) * 25;
    }

    phase += (2 * Math.PI * currentFreq) / sampleRate;
    const wave = Math.sin(phase);

    // Fade out smoothly towards the end of the boing ring
    const volume = 0.25 * Math.sin(progress * Math.PI) * (1 - progress);

    channelData[i] = wave * volume;
  }
  return audioBuffer;
};

export const generateWhistlePopBuffer = (sampleRate: number, duration = 0.4): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  const popPoint = Math.floor(numSamples * 0.75); // The pop happens 75% through the slide
  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    if (i < popPoint) {
      // 1. The Whistle Slide Up
      const progress = i / popPoint;
      const freq = 400 + (1000 - 400) * Math.pow(progress, 2);
      phase += (2 * Math.PI * freq) / sampleRate;
      
      const volume = 0.12 * Math.sin(progress * Math.PI * 0.5);
      channelData[i] = Math.sin(phase) * volume;
    } else {
      // 2. The Pop Snap (Instant Release)
      const popT = (i - popPoint) / sampleRate;
      const popFreq = 1100 * Math.exp(-popT * 120);
      
      const wave = Math.abs(((popT * popFreq) % 1) - 0.5) * 4 - 1; // Snappy triangle pop
      channelData[i] = wave * 0.2 * Math.exp(-popT * 70);
    }
  }
  return audioBuffer;
};

export const generateZippingBuffer = (sampleRate: number, duration = 0.2): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // Fast exponential sweep up
    const freq = 80 * Math.pow(1200 / 80, progress);
    phase += (2 * Math.PI * freq) / sampleRate;

    // Sawtooth wave math for a buzzing friction texture
    const rawWave = (phase % (2 * Math.PI)) / Math.PI - 1;
    
    // Quick ramp up and heavy decay envelope
    const volume = 0.15 * Math.sin(progress * Math.PI) * Math.exp(-progress * 2);

    channelData[i] = rawWave * volume;
  }
  return audioBuffer;
};

export const generateLaserBlipBuffer = (sampleRate: number, duration = 0.06): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    const freq = 1800 * Math.exp(-t * 80); // Fast drop-off
    // Square wave math for that retro arcade bite
    const wave = Math.sin(2 * Math.PI * t * freq) >= 0 ? 1 : -1;

    const volume = 0.1 * Math.exp(-t * 50);
    channelData[i] = wave * volume;
  }
  return audioBuffer;
};
