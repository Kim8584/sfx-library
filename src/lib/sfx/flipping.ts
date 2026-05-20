export const generateFlippingAudioBuffer = (
  sampleRate: number,
  duration = 0.18 // 180ms gives that perfect, snappy tactile flip speed
): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);

  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // Frequency boundary properties
  const baseFreq = 150;    // Deep, structural body tone
  const peakFreq = 380;    // The peak of the rotation where it cuts the air faster

  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // 1. Create an arching pitch curve using Math.sin
    // The pitch rises as the card stands vertical, then falls as it lays flat again
    const arch = Math.sin(progress * Math.PI);
    const currentFreq = baseFreq + (peakFreq - baseFreq) * arch;

    // 2. Add a tiny, high-frequency "flutter" to simulate wind resistance during the spin
    const airFlutter = Math.sin(2 * Math.PI * t * 65) * 15;
    const finalFreq = Math.max(20, currentFreq + airFlutter);

    // 3. Track the phase to prevent digital popping
    phase += (2 * Math.PI * finalFreq) / sampleRate;

    // 4. Generate a sine wave for an ultra-smooth, premium material feel
    const rawWave = Math.sin(phase);

    // 5. Volume Envelope: 
    // Quick swell, a small dip during the air flutter, and a sharp, dampened clamp at the end
    let volumeEnvelope = Math.sin(progress * Math.PI) * 0.25;
    
    // Add an extra dampening factor to the second half to make the landing sound tight and solid
    if (progress > 0.7) {
      volumeEnvelope *= Math.pow((1 - progress) / 0.3, 2);
    }

    channelData[i] = rawWave * volumeEnvelope;
  }

  return audioBuffer;
};
