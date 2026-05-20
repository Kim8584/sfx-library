export const generateSlashingAudioBuffer = (
  sampleRate: number,
  duration = 0.15 // 150ms is the sweet spot for an ultra-fast, snappy slash
): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);

  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // Filter sweep parameters
  // The filter starts wide open (crisp highs) and slams shut down to the lows
  const startCutoff = 8000; 
  const endCutoff = 300;    

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // 1. Generate underlying raw white noise (the friction of the blade)
    const rawNoise = Math.random() * 2 - 1;

    // 2. Simulate a Biquad Lowpass Filter mathematically inside the loop
    // Calculate a hyper-fast exponential decay for the cutoff frequency
    const currentCutoff = startCutoff * Math.pow(endCutoff / startCutoff, progress);
    
    // Convert frequency to a normalized tuning factor between 0 and 1
    const alpha = Math.min(1, (2 * Math.PI * currentCutoff) / sampleRate);
    
    // Simple single-pole lowpass filter emulation to shape the static into a "whoosh"
    // We use a rolling average of the noise to smooth out the high frequencies over time
    let filteredSample = rawNoise * alpha;
    if (i > 0) {
      filteredSample += channelData[i - 1] * (1 - alpha);
    }

    // 3. Sharp Volume Envelope
    // An explosive attack that cuts to absolute silence exponentially
    const volumeEnvelope = Math.exp(-t * 28);

    // Write the shaped slice sound to the channel buffer
    channelData[i] = filteredSample * 0.4 * volumeEnvelope;
  }

  return audioBuffer;
};
