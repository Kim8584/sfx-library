export const createPopSFX = (sampleRate: number, pitch = 600): AudioBuffer => {
  const duration = 0.08;
  const numSamples = Math.ceil(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const buffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    
    // Pitch Slide: 600Hz down to 150Hz
    const freq = pitch * Math.pow(150 / pitch, t / duration);
    
    // Waveform
    data[i] = Math.sin(2 * Math.PI * t * freq) * 0.3 * Math.exp(-t * 50);
  }
  return buffer;
};

export const createGlideSFX = (sampleRate: number, start = 220, end = 880): AudioBuffer => {
  const duration = 0.25;
  const numSamples = Math.ceil(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const buffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = start * Math.pow(end / start, t / duration);
    data[i] = Math.sin(2 * Math.PI * t * freq) * 0.15 * Math.sin(Math.PI * (t / duration));
  }
  return buffer;
};
